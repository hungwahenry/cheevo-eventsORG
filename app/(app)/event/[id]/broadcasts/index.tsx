import { EmptyState } from '@/components/ui/empty-state';
import { ScreenHeader } from '@/components/ui/screen-header';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEventBroadcasts } from '@/features/broadcasts';
import { BroadcastRow } from '@/features/broadcasts/components/broadcast-row';
import { haptics } from '@/lib/haptics';
import { router, useGlobalSearchParams } from 'expo-router';
import { Megaphone, Plus } from 'lucide-react-native';
import { FlatList, RefreshControl, View } from 'react-native';

export default function BroadcastsScreen() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const query = useEventBroadcasts(id);

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

  return (
    <View className="bg-background flex-1">
      <ScreenHeader
        eyebrow={`${total.toLocaleString()} ${total === 1 ? 'broadcast' : 'broadcasts'}`}
        title="Broadcasts"
        right={
          <Button
            size="sm"
            onPress={() => {
              haptics.select();
              router.push(`/event/${id}/broadcasts/new`);
            }}>
            <Icon as={Plus} className="text-primary-foreground size-4" strokeWidth={2.25} />
            <Text>New</Text>
          </Button>
        }
      />

      {query.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <BroadcastRow broadcast={item} eventId={id} />}
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
            <EmptyState
              icon={Megaphone}
              title="No broadcasts yet"
              message="Email your attendees about updates. Tap New to send your first broadcast."
              className="mt-24"
              action={
                <Button
                  className="mt-2"
                  onPress={() => {
                    haptics.select();
                    router.push(`/event/${id}/broadcasts/new`);
                  }}>
                  <Icon as={Plus} className="text-primary-foreground size-4" strokeWidth={2.25} />
                  <Text>New broadcast</Text>
                </Button>
              }
            />
          }
        />
      )}
    </View>
  );
}
