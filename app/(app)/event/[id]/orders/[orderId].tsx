import { ScreenHeader } from '@/components/screen-header';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { UserAvatar } from '@/components/user-avatar';
import { useEventOrder } from '@/features/orders';
import { OrderStatusBadge } from '@/features/orders/components/order-status-badge';
import { buyerName } from '@/features/orders/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { formatMoney } from '@/lib/format/money';
import { useGlobalSearchParams } from 'expo-router';
import { ScrollView, View } from 'react-native';

export default function OrderDetailScreen() {
  const { id, orderId } = useGlobalSearchParams<{ id: string; orderId: string }>();
  const { data: order, isLoading } = useEventOrder(id, orderId);

  return (
    <View className="bg-background flex-1">
      <ScreenHeader />

      {isLoading || !order ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 20 }}
          showsVerticalScrollIndicator={false}>
          <View className="gap-3">
            <OrderStatusBadge status={order.status} />
            <View className="flex-row items-center gap-3">
              <UserAvatar url={order.buyer.avatar_url} name={buyerName(order.buyer)} size={48} />
              <View className="flex-1 gap-0.5">
                <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
                  {buyerName(order.buyer)}
                </Text>
                {order.buyer.email ? (
                  <Text className="text-muted-foreground text-sm" numberOfLines={1}>
                    {order.buyer.email}
                  </Text>
                ) : null}
              </View>
            </View>
          </View>

          {order.items && order.items.length > 0 ? (
            <View className="bg-card gap-4 rounded-2xl p-4">
              <Text className="text-foreground font-sans-semibold text-sm">Tickets</Text>
              {order.items.map((item) => (
                <View key={item.id} className="flex-row items-center justify-between gap-3">
                  <View className="flex-1">
                    <Text className="text-foreground text-sm" numberOfLines={1}>
                      {item.ticket_name}
                    </Text>
                    <Text className="text-muted-foreground text-xs">
                      {item.quantity} × {formatMoney(item.unit_price_minor, order.currency)}
                    </Text>
                  </View>
                  <Text className="text-foreground font-sans-medium text-sm">
                    {formatMoney(item.subtotal_minor, order.currency)}
                  </Text>
                </View>
              ))}
            </View>
          ) : null}

          <View className="bg-card gap-3 rounded-2xl p-4">
            <Line label="Subtotal" value={formatMoney(order.subtotal_minor, order.currency)} />
            <Line label="Fees" value={formatMoney(order.fees_minor, order.currency)} />
            <View className="border-border border-t" />
            <Line label="Total" value={formatMoney(order.total_minor, order.currency)} strong />
          </View>

          <View className="bg-card gap-3 rounded-2xl p-4">
            <Line label="Placed" value={formatShortDateTime(order.created_at) ?? '—'} />
            {order.paid_at ? (
              <Line label="Paid" value={formatShortDateTime(order.paid_at) ?? '—'} />
            ) : null}
            {order.refunded_at ? (
              <Line label="Refunded" value={formatShortDateTime(order.refunded_at) ?? '—'} />
            ) : null}
            {order.cancelled_at ? (
              <Line label="Cancelled" value={formatShortDateTime(order.cancelled_at) ?? '—'} />
            ) : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function Line({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Text className="text-muted-foreground text-sm">{label}</Text>
      <Text className={`text-foreground text-sm ${strong ? 'font-sans-bold' : 'font-sans-medium'}`}>
        {value}
      </Text>
    </View>
  );
}
