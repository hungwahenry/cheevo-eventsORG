import { StatusBadge, type BadgeTone } from '@/components/status-badge';
import type { BroadcastStatus } from '@/features/broadcasts/types';

const CONFIG: Record<BroadcastStatus, { tone: BadgeTone; label: string }> = {
  sent: { tone: 'success', label: 'Sent' },
  sending: { tone: 'warning', label: 'Sending' },
  queued: { tone: 'muted', label: 'Queued' },
  failed: { tone: 'danger', label: 'Failed' },
  cancelled: { tone: 'muted', label: 'Cancelled' },
};

export function BroadcastStatusBadge({ status }: { status: BroadcastStatus }) {
  const { tone, label } = CONFIG[status];
  return <StatusBadge tone={tone} label={label} />;
}
