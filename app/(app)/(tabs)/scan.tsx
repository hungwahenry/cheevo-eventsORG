import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEvents } from '@/features/events';
import { EventStatusBadge } from '@/features/events/components/event-status-badge';
import { formatShortDateTime } from '@/lib/format/datetime';
import { haptics } from '@/lib/haptics';
import { router } from 'expo-router';
import { ChevronRight, ScanLine } from 'lucide-react-native';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

export default function ScanScreen() {
  const { data, isLoading, isRefetching, refetch } = useEvents(1);

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 px-6 pb-2">
        <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
          Check in
        </Text>
        <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
          Scan tickets
        </Text>
      </View>

      {isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          data={data?.items ?? []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => {
                haptics.select();
                router.push(`/event/${item.id}/scan`);
              }}
              className="bg-card active:bg-muted/40 flex-row items-center gap-3 rounded-2xl p-4">
              <View className="flex-1 gap-1">
                <Text className="text-foreground font-sans-semibold text-base" numberOfLines={1}>
                  {item.title}
                </Text>
                {item.starts_at ? (
                  <Text className="text-muted-foreground text-sm">
                    {formatShortDateTime(item.starts_at)}
                  </Text>
                ) : null}
              </View>
              <EventStatusBadge status={item.status} />
              <Icon as={ChevronRight} className="text-muted-foreground size-5" />
            </Pressable>
          )}
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 12 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={isRefetching} onRefresh={refetch} />}
          ListEmptyComponent={
            <View className="mt-24 items-center gap-3 px-6">
              <View className="bg-muted size-16 items-center justify-center rounded-full">
                <Icon as={ScanLine} className="text-muted-foreground size-8" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                No events to scan
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                Your events will appear here once they&apos;re created on the web dashboard.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
