import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useDashboard } from '@/features/dashboard';
import type { Kpi, KpiMetric } from '@/features/dashboard/types';
import { formatMoney } from '@/lib/format/money';
import { ArrowDownRight, ArrowUpRight } from 'lucide-react-native';
import { View } from 'react-native';

const METRICS: { key: KpiMetric; label: string; money?: boolean }[] = [
  { key: 'revenue_minor', label: 'Revenue', money: true },
  { key: 'tickets', label: 'Tickets sold' },
  { key: 'orders', label: 'Orders' },
  { key: 'rsvps', label: 'RSVPs' },
];

export function KpiGrid({ orgId }: { orgId: string }) {
  const { data, isLoading } = useDashboard(orgId, '30d');

  if (isLoading) {
    return (
      <View className="bg-card h-32 items-center justify-center rounded-2xl">
        <Spinner />
      </View>
    );
  }

  if (!data) return null;

  return (
    <View className="gap-3">
      <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
        Last 30 days
      </Text>
      <View className="gap-3">
        <View className="flex-row gap-3">
          <KpiTile label={METRICS[0].label} kpi={data.kpis.revenue_minor} money currency={data.currency} />
          <KpiTile label={METRICS[1].label} kpi={data.kpis.tickets} />
        </View>
        <View className="flex-row gap-3">
          <KpiTile label={METRICS[2].label} kpi={data.kpis.orders} />
          <KpiTile label={METRICS[3].label} kpi={data.kpis.rsvps} />
        </View>
      </View>
    </View>
  );
}

function KpiTile({
  label,
  kpi,
  money,
  currency,
}: {
  label: string;
  kpi: Kpi;
  money?: boolean;
  currency?: string;
}) {
  const value = money ? formatMoney(kpi.current, currency ?? 'NGN') : kpi.current.toLocaleString();
  const hasDelta = kpi.delta_pct !== null;
  const up = (kpi.delta_pct ?? 0) >= 0;

  return (
    <View className="bg-card flex-1 gap-1 rounded-2xl p-4">
      <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
        {label}
      </Text>
      <Text className="text-foreground font-sans-bold text-xl" numberOfLines={1}>
        {value}
      </Text>
      {hasDelta ? (
        <View className="flex-row items-center gap-1">
          <Icon
            as={up ? ArrowUpRight : ArrowDownRight}
            className={up ? 'text-emerald-600 size-3.5' : 'text-destructive size-3.5'}
            strokeWidth={2.5}
          />
          <Text className={`text-xs font-sans-medium ${up ? 'text-emerald-600' : 'text-destructive'}`}>
            {Math.abs(kpi.delta_pct ?? 0).toFixed(0)}%
          </Text>
        </View>
      ) : (
        <Text className="text-muted-foreground text-xs">—</Text>
      )}
    </View>
  );
}
