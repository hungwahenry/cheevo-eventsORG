import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEventBroadcasts } from '@/features/broadcasts';
import { BroadcastRow } from '@/features/broadcasts/components/broadcast-row';
import { router, useGlobalSearchParams } from 'expo-router';
import { ArrowLeft, Megaphone } from 'lucide-react-native';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

export default function BroadcastsScreen() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const query = useEventBroadcasts(id);

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];
  const total = query.data?.pages[0]?.total ?? 0;

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
            {total.toLocaleString()} {total === 1 ? 'broadcast' : 'broadcasts'}
          </Text>
          <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
            Broadcasts
          </Text>
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
            <View className="mt-24 items-center gap-3 px-6">
              <View className="bg-muted size-16 items-center justify-center rounded-full">
                <Icon as={Megaphone} className="text-muted-foreground size-8" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                No broadcasts yet
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                Broadcasts you send from the web dashboard will appear here with their delivery
                status.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
