import { Text } from '@/components/ui/text';
import type { EventStatus } from '@/features/events/types';
import { View } from 'react-native';

const LABELS: Record<EventStatus, string> = {
  draft: 'Draft',
  published: 'Live',
  past: 'Past',
};

const STYLES: Record<EventStatus, { dot: string; text: string; bg: string }> = {
  published: { dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/10' },
  draft: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
  past: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
};

export function EventStatusBadge({ status }: { status: EventStatus }) {
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
