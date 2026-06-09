import { EmptyState } from '@/components/ui/empty-state';
import { FilterPills, type FilterOption } from '@/components/ui/filter-pills';
import { IconInput } from '@/components/ui/icon-input';
import { Spinner } from '@/components/ui/spinner';
import { useIssuedTickets, useRevokeTicket, useScanTicket } from '@/features/checkin';
import { AttendeeRow } from '@/features/checkin/components/attendee-row';
import { holderName, type IssuedTicket, type IssuedTicketStatus } from '@/features/checkin/types';
import { haptics } from '@/lib/haptics';
import { useDebouncedValue } from '@/lib/use-debounced-value';
import { useGlobalSearchParams } from 'expo-router';
import { useManualRefresh } from '@/lib/use-manual-refresh';
import { Search, Users } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, FlatList, RefreshControl, View } from 'react-native';
import { toast } from 'sonner-native';

const FILTERS: FilterOption<IssuedTicketStatus | undefined>[] = [
  { label: 'All', value: undefined },
  { label: 'Valid', value: 'valid' },
  { label: 'Checked in', value: 'scanned' },
  { label: 'Revoked', value: 'revoked' },
];

export default function AttendeesTab() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const [status, setStatus] = useState<IssuedTicketStatus | undefined>(undefined);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebouncedValue(search.trim(), 350);

  const query = useIssuedTickets(id, status, debouncedSearch || undefined);
  const { refreshing, onRefresh } = useManualRefresh(query.refetch);
  const scan = useScanTicket(id);
  const revoke = useRevokeTicket(id);

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];

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
    <View className="flex-1">
      <View className="gap-3 px-6 pb-2 pt-4">
        <IconInput
          icon={Search}
          value={search}
          onChangeText={setSearch}
          placeholder="Search name, email or code"
          autoCapitalize="none"
          autoCorrect={false}
          returnKeyType="search"
        />
        <FilterPills options={FILTERS} value={status} onChange={setStatus} />
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
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
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
            <EmptyState
              icon={Users}
              title="No attendees"
              message={debouncedSearch ? 'No matches for your search.' : 'No tickets issued yet.'}
              className="mt-16"
            />
          }
        />
      )}
    </View>
  );
}
