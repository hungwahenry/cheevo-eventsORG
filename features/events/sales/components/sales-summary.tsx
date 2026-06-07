import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEventSales } from '@/features/events/sales/hooks';
import type { EventSales } from '@/features/events/sales/types';
import { formatMoney } from '@/lib/format/money';
import { View } from 'react-native';

export function SalesSummary({ eventId }: { eventId: string }) {
  const { data, isLoading } = useEventSales(eventId);

  if (isLoading || !data) {
    return (
      <View className="bg-card h-28 items-center justify-center rounded-2xl">
        <Spinner />
      </View>
    );
  }

  return (
    <View className="gap-3">
      <View className="flex-row gap-3">
        <StatTile label="Revenue" value={formatMoney(data.revenue_minor, data.currency)} wide />
        <StatTile label="Sold" value={data.tickets_sold.toLocaleString()} />
      </View>
      <View className="flex-row gap-3">
        <StatTile label="Orders" value={data.orders_count.toLocaleString()} />
        <StatTile label="Gross" value={formatMoney(data.gross_minor, data.currency)} wide />
      </View>

      {data.per_ticket.length > 0 ? <TicketBreakdown sales={data} /> : null}
    </View>
  );
}

function StatTile({ label, value, wide }: { label: string; value: string; wide?: boolean }) {
  return (
    <View className={`bg-card gap-1 rounded-2xl p-4 ${wide ? 'flex-[1.4]' : 'flex-1'}`}>
      <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-foreground font-sans-bold text-xl" numberOfLines={1}>
        {value}
      </Text>
    </View>
  );
}

function TicketBreakdown({ sales }: { sales: EventSales }) {
  return (
    <View className="bg-card gap-4 rounded-2xl p-4">
      <Text className="text-foreground font-sans-semibold text-sm">By ticket</Text>
      {sales.per_ticket.map((row) => (
        <View key={row.ticket_id} className="gap-1">
          <View className="flex-row items-center justify-between gap-3">
            <Text className="text-foreground flex-1 text-sm" numberOfLines={1}>
              {row.name}
            </Text>
            <Text className="text-foreground font-sans-medium text-sm">
              {formatMoney(row.revenue_minor, sales.currency)}
            </Text>
          </View>
          <Text className="text-muted-foreground text-xs">
            {row.sold_count.toLocaleString()}
            {row.quantity != null ? ` / ${row.quantity.toLocaleString()}` : ''} sold
          </Text>
        </View>
      ))}
    </View>
  );
}
