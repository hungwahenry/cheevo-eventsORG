import { StatusBadge, type BadgeTone } from '@/components/ui/status-badge';
import type { IssuedTicketStatus } from '@/features/checkin/types';

const CONFIG: Record<IssuedTicketStatus, { tone: BadgeTone; label: string }> = {
  valid: { tone: 'muted', label: 'Valid' },
  scanned: { tone: 'primary', label: 'Checked in' },
  revoked: { tone: 'danger', label: 'Revoked' },
};

export function TicketStatusBadge({ status }: { status: IssuedTicketStatus }) {
  const { tone, label } = CONFIG[status];
  return <StatusBadge tone={tone} label={label} />;
}
