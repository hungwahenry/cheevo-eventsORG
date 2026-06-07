import { Text } from '@/components/ui/text';
import type { IssuedTicketStatus } from '@/features/checkin/types';
import { View } from 'react-native';

const LABELS: Record<IssuedTicketStatus, string> = {
  valid: 'Valid',
  scanned: 'Checked in',
  revoked: 'Revoked',
};

const STYLES: Record<IssuedTicketStatus, { dot: string; text: string; bg: string }> = {
  valid: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
  scanned: { dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/10' },
  revoked: { dot: 'bg-destructive', text: 'text-destructive', bg: 'bg-destructive/10' },
};

export function TicketStatusBadge({ status }: { status: IssuedTicketStatus }) {
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
