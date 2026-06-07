import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import {
  useInboxNotifications,
  useMarkAllRead,
  useMarkRead,
  useUnreadCount,
} from '@/features/notifications';
import { InboxRow } from '@/features/notifications/components/inbox-row';
import type { InboxNotification } from '@/features/notifications/types';
import { haptics } from '@/lib/haptics';
import { routeForNotification } from '@/lib/notification-routing';
import { router } from 'expo-router';
import { Bell } from 'lucide-react-native';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

export default function ActivityScreen() {
  const query = useInboxNotifications();
  const { data: unread } = useUnreadCount();
  const markRead = useMarkRead();
  const markAllRead = useMarkAllRead();

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];
  const unreadCount = unread?.unread ?? 0;

  function onPress(notification: InboxNotification) {
    haptics.select();
    if (notification.read_at === null) markRead.mutate(notification.id);
    const target = routeForNotification(
      notification.type,
      notification.data as Record<string, any>
    );
    if (target) router.push(target as never);
  }

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 flex-row items-center justify-between gap-3 px-6 pb-2">
        <View>
          <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
            Activity
          </Text>
          <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
            Notifications
          </Text>
        </View>
        {unreadCount > 0 ? (
          <Pressable onPress={() => markAllRead.mutate()} hitSlop={8}>
            <Text className="text-primary font-sans-semibold text-sm">Mark all read</Text>
          </Pressable>
        ) : null}
      </View>

      {query.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <InboxRow notification={item} onPress={() => onPress(item)} />}
          ItemSeparatorComponent={() => <View className="bg-border ml-16 h-px" />}
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 24 }}
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
                <Icon as={Bell} className="text-muted-foreground size-8" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                Nothing yet
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                Sales, orders, and payout updates will show up here.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
