import { StatusBadge, type BadgeTone } from '@/components/ui/status-badge';
import type { EventStatus } from '@/features/events/types';

const CONFIG: Record<EventStatus, { tone: BadgeTone; label: string }> = {
  published: { tone: 'primary', label: 'Live' },
  draft: { tone: 'muted', label: 'Draft' },
  past: { tone: 'muted', label: 'Past' },
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
  const { tone, label } = CONFIG[status];
  return <StatusBadge tone={tone} label={label} />;
}
