import { Text } from '@/components/ui/text';
import { View } from 'react-native';

export type BadgeTone = 'primary' | 'success' | 'warning' | 'danger' | 'muted';

const TONES: Record<BadgeTone, { dot: string; text: string; bg: string }> = {
  primary: { dot: 'bg-primary', text: 'text-primary', bg: 'bg-primary/10' },
  success: { dot: 'bg-emerald-600', text: 'text-emerald-700', bg: 'bg-emerald-600/10' },
  warning: { dot: 'bg-amber-500', text: 'text-amber-600', bg: 'bg-amber-500/10' },
  danger: { dot: 'bg-destructive', text: 'text-destructive', bg: 'bg-destructive/10' },
  muted: { dot: 'bg-muted-foreground', text: 'text-muted-foreground', bg: 'bg-muted' },
};

export function StatusBadge({ tone, label }: { tone: BadgeTone; label: string }) {
  const t = TONES[tone];
  return (
    <View className={`flex-row items-center gap-1.5 self-start rounded-full px-2.5 py-1 ${t.bg}`}>
      <View className={`size-1.5 rounded-full ${t.dot}`} />
      <Text className={`font-sans-semibold text-[11px] uppercase tracking-wide ${t.text}`}>
        {label}
      </Text>
    </View>
  );
}
