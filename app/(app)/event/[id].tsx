import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEvent } from '@/features/events';
import { EventStatusBadge } from '@/features/events/components/event-status-badge';
import { SalesSummary } from '@/features/events/sales/components/sales-summary';
import { formatShortDateTime } from '@/lib/format/datetime';
import { haptics } from '@/lib/haptics';
import { router, useLocalSearchParams } from 'expo-router';
import { ArrowLeft, MapPin, ScanLine } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';
import { toast } from 'sonner-native';

export default function EventDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event, isLoading } = useEvent(id);

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

      {isLoading || !event ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 20 }}
          showsVerticalScrollIndicator={false}>
          <View className="gap-3">
            <EventStatusBadge status={event.status} />
            <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
              {event.title}
            </Text>
            <View className="gap-1.5">
              {event.starts_at ? (
                <Text className="text-muted-foreground text-sm">
                  {formatShortDateTime(event.starts_at)}
                </Text>
              ) : null}
              {event.venue_name ?? event.city ? (
                <View className="flex-row items-center gap-1.5">
                  <Icon as={MapPin} className="text-muted-foreground size-4" />
                  <Text className="text-muted-foreground text-sm">
                    {event.venue_name ?? event.city}
                  </Text>
                </View>
              ) : null}
            </View>
          </View>

          <Button
            size="lg"
            className="w-full"
            onPress={() => {
              haptics.select();
              toast('Door scanning lands in the next update.');
            }}>
            <Icon as={ScanLine} className="text-primary-foreground size-5" strokeWidth={2} />
            <Text>Check in at the door</Text>
          </Button>

          <SalesSummary eventId={event.id} />
        </ScrollView>
      )}
    </View>
  );
}
