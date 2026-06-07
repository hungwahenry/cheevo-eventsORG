import { StatusBadge, type BadgeTone } from '@/components/ui/status-badge';
import type { OrderStatus } from '@/features/orders/types';

const CONFIG: Record<OrderStatus, { tone: BadgeTone; label: string }> = {
  paid: { tone: 'success', label: 'Paid' },
  pending: { tone: 'warning', label: 'Pending' },
  refunded: { tone: 'muted', label: 'Refunded' },
  cancelled: { tone: 'muted', label: 'Cancelled' },
  failed: { tone: 'danger', label: 'Failed' },
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  const { tone, label } = CONFIG[status];
  return <StatusBadge tone={tone} label={label} />;
}
