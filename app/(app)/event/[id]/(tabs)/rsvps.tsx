import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEventRsvps } from '@/features/rsvps';
import { rsvpName } from '@/features/rsvps/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { useLocalSearchParams } from 'expo-router';
import { CalendarCheck } from 'lucide-react-native';
import { FlatList, RefreshControl, View } from 'react-native';

export default function RsvpsTab() {
  const { id } = useLocalSearchParams<{ id: string }>();
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
            <View className="bg-card gap-1 rounded-2xl p-4">
              <Text className="text-foreground font-sans-semibold text-base" numberOfLines={1}>
                {rsvpName(item)}
              </Text>
              <Text className="text-muted-foreground text-xs">
                RSVP&apos;d · {formatShortDateTime(item.rsvped_at)}
              </Text>
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
            <View className="mt-16 items-center gap-3 px-6">
              <View className="bg-muted size-16 items-center justify-center rounded-full">
                <Icon as={CalendarCheck} className="text-muted-foreground size-8" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                No RSVPs yet
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                People who RSVP to this event will show up here.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
