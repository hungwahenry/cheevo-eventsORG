import { Text } from '@/components/ui/text';
import type { Organisation } from '@/features/auth';
import { formatMonthYear } from '@/lib/format/datetime';
import { View } from 'react-native';

export function ProfileStats({ org }: { org: Organisation }) {
  return (
    <View className="bg-card flex-row rounded-2xl py-4">
      <Stat value={org.events_count.toLocaleString()} label="Events" />
      <View className="bg-border w-px" />
      <Stat value={org.subscribers_count.toLocaleString()} label="Subscribers" />
      <View className="bg-border w-px" />
      <Stat value={formatMonthYear(org.hosting_since) ?? '—'} label="Hosting since" />
    </View>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <View className="flex-1 items-center gap-0.5">
      <Text className="text-foreground font-sans-bold text-lg" numberOfLines={1}>
        {value}
      </Text>
      <Text className="text-muted-foreground text-xs">{label}</Text>
    </View>
  );
}
