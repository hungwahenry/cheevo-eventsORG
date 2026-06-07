import { Text } from '@/components/ui/text';
import type { OrderStatus } from '@/features/orders/types';
import { View } from 'react-native';

const LABELS: Record<OrderStatus, string> = {
  pending: 'Pending',
  paid: 'Paid',
  cancelled: 'Cancelled',
  refunded: 'Refunded',
  failed: 'Failed',
};

const STYLES: Record<OrderStatus, { dot: string; text: string; bg: string }> = {
  paid: { dot: 'bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-600/10' },
  pending: { dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-500/10' },
  refunded: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
  cancelled: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
  failed: { dot: 'bg-destructive', text: 'text-destructive', bg: 'bg-destructive/10' },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const s = STYLES[status];
  return (
    <View className={`flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1 ${s.bg}`}>
      <View className={`size-1.5 rounded-full ${s.dot}`} />
      <Text className={`font-sans-semibold text-[11px] uppercase tracking-wide ${s.text}`}>
        {LABELS[status]}
      </Text>
    </View>
  );
}
