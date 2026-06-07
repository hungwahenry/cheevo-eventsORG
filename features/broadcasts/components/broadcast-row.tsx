import { Text } from '@/components/ui/text';
import { BroadcastStatusBadge } from '@/features/broadcasts/components/broadcast-status-badge';
import { audienceLabel, type Broadcast } from '@/features/broadcasts/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { haptics } from '@/lib/haptics';
import { router } from 'expo-router';
import { Pressable, View } from 'react-native';

export function BroadcastRow({ broadcast, eventId }: { broadcast: Broadcast; eventId: string }) {
  return (
    <Pressable
      onPress={() => {
        haptics.select();
        router.push(`/event/${eventId}/broadcasts/${broadcast.id}`);
      }}
      className="bg-card active:bg-muted/40 gap-3 rounded-2xl p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 gap-0.5">
          <Text className="text-foreground font-sans-semibold text-base" numberOfLines={1}>
            {broadcast.subject}
          </Text>
          <Text className="text-muted-foreground text-sm">{audienceLabel(broadcast.audience)}</Text>
        </View>
        <BroadcastStatusBadge status={broadcast.status} />
      </View>

      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-muted-foreground text-xs">
          {formatShortDateTime(broadcast.sent_at ?? broadcast.created_at)}
        </Text>
        <Text className="text-muted-foreground text-xs">
          {broadcast.sent_count.toLocaleString()} sent
          {broadcast.failed_count > 0 ? ` · ${broadcast.failed_count.toLocaleString()} failed` : ''}
        </Text>
      </View>
    </Pressable>
  );
}
