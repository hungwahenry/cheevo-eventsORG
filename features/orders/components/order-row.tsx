import { Text } from '@/components/ui/text';
import { UserAvatar } from '@/components/ui/user-avatar';
import { OrderStatusBadge } from '@/features/orders/components/order-status-badge';
import { buyerName, type EventOrder } from '@/features/orders/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { formatMoney } from '@/lib/format/money';
import { haptics } from '@/lib/haptics';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

export function OrderRow({ order, eventId }: { order: EventOrder; eventId: string }) {
  return (
    <Pressable
      onPress={() => {
        haptics.select();
        router.push(`/event/${eventId}/orders/${order.id}`);
      }}
      className="bg-card active:bg-muted/40 gap-3 rounded-2xl p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 flex-row items-center gap-3">
          <UserAvatar url={order.buyer.avatar_url} name={buyerName(order.buyer)} size={40} />
          <View className="flex-1 gap-0.5">
            <Text className="text-foreground font-sans-semibold text-base" numberOfLines={1}>
              {buyerName(order.buyer)}
            </Text>
            <Text className="text-muted-foreground text-sm">
              {order.items_count} {order.items_count === 1 ? 'ticket' : 'tickets'}
            </Text>
          </View>
        </View>
        <OrderStatusBadge status={order.status} />
      </View>

      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-muted-foreground text-xs">
          {formatShortDateTime(order.created_at)}
        </Text>
        <Text className="text-foreground font-sans-medium text-sm">
          {formatMoney(order.total_minor, order.currency)}
        </Text>
      </View>
    </Pressable>
  );
}
