import { Icon } from '@/components/ui/icon';
import { IconInput } from '@/components/ui/icon-input';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { AttendeeRow } from '@/features/checkin/components/attendee-row';
import { useIssuedTickets, useRevokeTicket, useScanTicket } from '@/features/checkin';
import { holderName, type IssuedTicket, type IssuedTicketStatus } from '@/features/checkin/types';
import { haptics } from '@/lib/haptics';
import { useDebouncedValue } from '@/lib/use-debounced-value';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, Search, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, FlatList, Pressable, RefreshControl, View } from 'react-native';
import { toast } from 'sonner-native';

const FILTERS: { label: string; value: IssuedTicketStatus | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Valid', value: 'valid' },
  { label: 'Checked in', value: 'scanned' },
  { label: 'Revoked', value: 'revoked' },
];

export default function AttendeesScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [status, setStatus] = useState<IssuedTicketStatus | undefined>(undefined);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search.trim(), 350);

  const query = useIssuedTickets(id, status, debouncedSearch || undefined);
  const scan = useScanTicket(id);
  const revoke = useRevokeTicket(id);

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  function checkIn(ticket: IssuedTicket) {
    haptics.select();
    scan.mutate(ticket.code, {
      onSuccess: () => {
        haptics.success();
        toast.success(`Checked in ${holderName(ticket.holder)}`);
      },
      onError: () => haptics.error(),
    });
  }

  function confirmRevoke(ticket: IssuedTicket) {
    Alert.alert('Revoke ticket?', `This invalidates ${holderName(ticket.holder)}'s ticket.`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Revoke',
        style: 'destructive',
        onPress: () =>
          revoke.mutate(ticket.id, {
            onSuccess: () => {
              haptics.success();
              toast.success('Ticket revoked.');
            },
          }),
      },
    ]);
  }

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 gap-3 px-6 pb-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="active:bg-muted size-10 items-center justify-center rounded-full">
          <Icon as={ArrowLeft} className="text-foreground size-6" strokeWidth={1.75} />
        </Pressable>
        <View>
          <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
            {total.toLocaleString()} {total === 1 ? 'attendee' : 'attendees'}
          </Text>
          <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
            Attendees
          </Text>
        </View>

        <IconInput
          icon={Search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search name, email or code"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />

        <View className="flex-row gap-2">
          {FILTERS.map((f) => {
            const active = status === f.value;
            return (
              <Pressable
                key={f.label}
                onPress={() => {
                  haptics.select();
                  setStatus(f.value);
                }}
                className={`rounded-full px-3 py-1.5 ${active ? 'bg-primary' : 'bg-muted'}`}>
                <Text
                  className={`font-sans-medium text-xs ${
                    active ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {query.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <AttendeeRow
              ticket={item}
              onCheckIn={() => checkIn(item)}
              onRevoke={confirmRevoke}
              busy={scan.isPending && scan.variables === item.code}
            />
          )}
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 12 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={query.isRefetching} onRefresh={query.refetch} />
          }
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
          }}
          ListFooterComponent={
            query.isFetchingNextPage ? (
              <View className="py-4">
                <Spinner />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="mt-24 items-center gap-3 px-6">
              <View className="bg-muted size-16 items-center justify-center rounded-full">
                <Icon as={Users} className="text-muted-foreground size-8" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                No attendees
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                {debouncedSearch ? 'No matches for your search.' : 'No tickets issued yet.'}
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
