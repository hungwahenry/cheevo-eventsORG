import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { UserAvatar } from '@/components/ui/user-avatar';
import { useEventRsvps } from '@/features/rsvps';
import { rsvpName } from '@/features/rsvps/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { useGlobalSearchParams } from 'expo-router';
import { CalendarCheck } from 'lucide-react-native';
import { FlatList, RefreshControl, View } from 'react-native';

export default function RsvpsTab() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const query = useEventRsvps(id);

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <View className="flex-1">
      {query.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="bg-card flex-row items-center gap-3 rounded-2xl p-4">
              <UserAvatar url={item.avatar_url} name={rsvpName(item)} size={40} />
              <View className="flex-1 gap-0.5">
                <Text className="text-foreground font-sans-semibold text-base" numberOfLines={1}>
                  {rsvpName(item)}
                </Text>
                <Text className="text-muted-foreground text-xs">
                  RSVP&apos;d · {formatShortDateTime(item.rsvped_at)}
                </Text>
              </View>
            </View>
          )}
          contentContainerStyle={{ padding: 24, gap: 12 }}
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
            <EmptyState
              icon={CalendarCheck}
              title="No RSVPs yet"
              message="People who RSVP to this event will show up here."
              className="mt-16"
            />
          }
        />
      )}
    </View>
  );
}
