import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Organisation } from '@/features/auth';
import { formatMonthYear } from '@/lib/format/datetime';
import { formatCompact } from '@/lib/format/number';
import { Building2, MapPin } from 'lucide-react-native';
import { Image, View } from 'react-native';

export function AccountHeader({ org }: { org?: Organisation }) {
  const since = formatMonthYear(org?.hosting_since ?? null);
  const stats = [
    org ? `${formatCompact(org.subscribers_count)} subscribers` : null,
    org ? `${formatCompact(org.events_count)} events` : null,
    since ? `Since ${since}` : null,
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <View className="gap-3">
      <View className="bg-muted aspect-[3/1] w-full">
        {org?.cover_url ? (
          <Image
            source={{ uri: org.cover_url }}
            style={{ width: '100%', height: '100%' }}
            resizeMode="cover"
          />
        ) : null}
      </View>

      <View className="-mt-12 px-5">
        <View className="border-background bg-background size-24 overflow-hidden rounded-2xl border-4">
          <View className="bg-muted size-full items-center justify-center">
            {org?.logo_url ? (
              <Image
                source={{ uri: org.logo_url }}
                style={{ width: '100%', height: '100%' }}
                resizeMode="cover"
              />
            ) : (
              <Icon as={Building2} className="text-muted-foreground size-9" strokeWidth={2} />
            )}
          </View>
        </View>
      </View>

      <View className="gap-0.5 px-5">
        <Text className="text-foreground font-sans-bold text-2xl tracking-tight">
          {org?.name ?? 'cheevo'}
        </Text>
        {org?.slug ? <Text className="text-muted-foreground text-sm">@{org.slug}</Text> : null}
        {stats ? <Text className="text-muted-foreground mt-1 text-xs">{stats}</Text> : null}
        {org?.city ? (
          <View className="mt-0.5 flex-row items-center gap-1">
            <Icon as={MapPin} className="text-muted-foreground size-3.5" strokeWidth={2} />
            <Text className="text-muted-foreground text-xs">{org.city}</Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}
