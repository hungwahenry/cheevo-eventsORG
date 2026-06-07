import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEventBroadcast } from '@/features/broadcasts';
import { BroadcastStatusBadge } from '@/features/broadcasts/components/broadcast-status-badge';
import { audienceLabel } from '@/features/broadcasts/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { router, useGlobalSearchParams } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';

export default function BroadcastDetailScreen() {
  const { id, broadcastId } = useGlobalSearchParams<{ id: string; broadcastId: string }>();
  const { data: broadcast, isLoading } = useEventBroadcast(id, broadcastId);

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 px-6 pb-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="active:bg-muted size-10 items-center justify-center rounded-full">
          <Icon as={ArrowLeft} className="text-foreground size-6" strokeWidth={1.75} />
        </Pressable>
      </View>

      {isLoading || !broadcast ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 20 }}
          showsVerticalScrollIndicator={false}>
          <View className="gap-3">
            <BroadcastStatusBadge status={broadcast.status} />
            <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
              {broadcast.subject}
            </Text>
            <Text className="text-muted-foreground text-sm">
              To {audienceLabel(broadcast.audience)}
            </Text>
          </View>

          <View className="flex-row gap-3">
            <Stat label="Recipients" value={broadcast.recipients_count} />
            <Stat label="Sent" value={broadcast.sent_count} />
            <Stat label="Failed" value={broadcast.failed_count} />
          </View>

          {broadcast.failure_reason ? (
            <View className="bg-destructive/10 rounded-2xl p-4">
              <Text className="text-destructive font-sans-medium text-sm">
                {broadcast.failure_reason}
              </Text>
            </View>
          ) : null}

          {broadcast.body_text ? (
            <View className="bg-card gap-2 rounded-2xl p-4">
              <Text className="text-foreground font-sans-semibold text-sm">Message</Text>
              <Text className="text-foreground text-sm leading-6">{broadcast.body_text}</Text>
            </View>
          ) : null}

          <View className="bg-card gap-3 rounded-2xl p-4">
            <Line label="Created" value={formatShortDateTime(broadcast.created_at) ?? '—'} />
            {broadcast.sent_at ? (
              <Line label="Sent" value={formatShortDateTime(broadcast.sent_at) ?? '—'} />
            ) : null}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <View className="bg-card flex-1 gap-1 rounded-2xl p-4">
      <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-foreground font-sans-bold text-xl">{value.toLocaleString()}</Text>
    </View>
  );
}

function Line({ label, value }: { label: string; value: string }) {
  return (
    <View className="flex-row items-center justify-between gap-3">
      <Text className="text-muted-foreground text-sm">{label}</Text>
      <Text className="text-foreground font-sans-medium text-sm">{value}</Text>
    </View>
  );
}
