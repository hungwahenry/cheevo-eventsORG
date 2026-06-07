import { Text } from '@/components/ui/text';
import type { BroadcastStatus } from '@/features/broadcasts/types';
import { View } from 'react-native';

const LABELS: Record<BroadcastStatus, string> = {
  queued: 'Queued',
  sending: 'Sending',
  sent: 'Sent',
  failed: 'Failed',
  cancelled: 'Cancelled',
};

const STYLES: Record<BroadcastStatus, { dot: string; text: string; bg: string }> = {
  sent: { dot: 'bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-600/10' },
  sending: { dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-500/10' },
  queued: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
  failed: { dot: 'bg-destructive', text: 'text-destructive', bg: 'bg-destructive/10' },
  cancelled: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
};

export function BroadcastStatusBadge({ status }: { status: BroadcastStatus }) {
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
