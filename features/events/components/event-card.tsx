import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { EventStatusBadge } from '@/features/events/components/event-status-badge';
import type { EventItem } from '@/features/events/types';
import { formatShortDateTime } from '@/lib/format/datetime';
import { formatMoney } from '@/lib/format/money';
import { haptics } from '@/lib/haptics';
import { router } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import { ImageIcon, MapPin, Play, Ticket } from 'lucide-react-native';
import { useMemo } from 'react';
import { Image, Pressable, View } from 'react-native';

export function EventCard({ event }: { event: EventItem }) {
  const when = formatShortDateTime(event.starts_at);
  const where = event.venue_name ?? event.city;

  return (
    <Pressable
      onPress={() => {
        haptics.select();
        router.push(`/event/${event.id}/attendees`);
      }}
      className="bg-card active:bg-muted/40 gap-3 rounded-2xl p-4">
      <View className="flex-row gap-3">
        <FlyerThumb url={event.flyer_url} type={event.flyer_type} />
        <View className="flex-1 gap-1.5">
          <View className="flex-row items-start justify-between gap-3">
            <Text className="text-foreground font-sans-semibold flex-1 text-base" numberOfLines={2}>
              {event.title}
            </Text>
            <EventStatusBadge status={event.status} />
          </View>
          {when ? <Text className="text-muted-foreground text-sm">{when}</Text> : null}
          {where ? (
            <View className="flex-row items-center gap-1.5">
              <Icon as={MapPin} className="text-muted-foreground size-3.5" />
              <Text className="text-muted-foreground text-sm" numberOfLines={1}>
                {where}
              </Text>
            </View>
          ) : null}
        </View>
      </View>

      <View className="border-border flex-row items-center gap-4 border-t pt-3">
        <View className="flex-row items-center gap-1.5">
          <Icon as={Ticket} className="text-muted-foreground size-4" />
          <Text className="text-foreground font-sans-medium text-sm">
            {event.tickets_sold.toLocaleString()} sold
          </Text>
        </View>
        <Text className="text-foreground font-sans-medium text-sm">
          {formatMoney(event.revenue_minor, event.currency)}
        </Text>
      </View>
    </Pressable>
  );
}

const FLYER = { width: 72, height: 96, borderRadius: 12 } as const;

function FlyerThumb({ url, type }: { url: string | null; type: 'image' | 'video' | null }) {
  if (!url) {
    return (
      <View className="bg-muted items-center justify-center" style={FLYER}>
        <Icon as={ImageIcon} className="text-muted-foreground size-6" strokeWidth={1.75} />
      </View>
    );
  }
  if (type === 'video') {
    return <VideoThumb url={url} />;
  }
  return <Image source={{ uri: url }} style={FLYER} resizeMode="cover" />;
}

function VideoThumb({ url }: { url: string }) {
  const source = useMemo(() => ({ uri: url, useCaching: true }), [url]);
  const player = useVideoPlayer(source, (p) => {
    p.muted = true;
  });

  return (
    <View className="bg-muted overflow-hidden" style={FLYER}>
      <VideoView
        player={player}
        style={{ width: '100%', height: '100%' }}
        contentFit="cover"
        nativeControls={false}
        allowsPictureInPicture={false}
      />
      <View className="absolute inset-0 items-center justify-center">
        <View className="size-7 items-center justify-center rounded-full bg-black/45">
          <Icon as={Play} className="size-3.5 text-white" strokeWidth={2.5} />
        </View>
      </View>
    </View>
  );
}
