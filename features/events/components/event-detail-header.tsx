import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEvent } from '@/features/events';
import { EventStatusBadge } from '@/features/events/components/event-status-badge';
import { useEventSales } from '@/features/events/sales/hooks';
import { formatMoney } from '@/lib/format/money';
import { haptics } from '@/lib/haptics';
import { router } from 'expo-router';
import { ArrowLeft, ScanLine } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function EventDetailHeader({ eventId }: { eventId: string }) {
  const { data: event } = useEvent(eventId);
  const { data: sales } = useEventSales(eventId);

  return (
    <View className="pt-safe-offset-4 border-border gap-3 border-b px-6 pb-4">
      <Pressable
        onPress={() => router.back()}
        hitSlop={12}
        className="active:bg-muted size-10 items-center justify-center rounded-full">
        <Icon as={ArrowLeft} className="text-foreground size-6" strokeWidth={1.75} />
      </Pressable>

      {event ? (
        <>
          <View className="gap-2">
            <EventStatusBadge status={event.status} />
            <Text
              className="text-foreground font-sans-extrabold text-2xl tracking-tight"
              numberOfLines={2}>
              {event.title}
            </Text>
          </View>

          {sales ? (
            <View className="flex-row gap-6">
              <Kpi label="Revenue" value={formatMoney(sales.revenue_minor, sales.currency)} />
              <Kpi label="Sold" value={sales.tickets_sold.toLocaleString()} />
              <Kpi label="Orders" value={sales.orders_count.toLocaleString()} />
            </View>
          ) : null}

          <Button
            size="lg"
            className="w-full"
            onPress={() => {
              haptics.select();
              router.push(`/event/${eventId}/scan`);
            }}>
            <Icon as={ScanLine} className="text-primary-foreground size-5" strokeWidth={2} />
            <Text>Check in at the door</Text>
          </Button>
        </>
      ) : (
        <View className="h-40 items-center justify-center">
          <Spinner />
        </View>
      )}
    </View>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <View className="gap-0.5">
      <Text className="text-muted-foreground font-sans-medium text-[11px] uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-foreground font-sans-bold text-base" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}
