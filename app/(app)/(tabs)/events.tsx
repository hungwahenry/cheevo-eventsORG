import { EmptyState } from '@/components/ui/empty-state';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useCurrentUser } from '@/features/auth';
import { useEvents } from '@/features/events';
import { EventCard } from '@/features/events/components/event-card';
import { useManualRefresh } from '@/lib/use-manual-refresh';
import { CalendarX } from 'lucide-react-native';
import { FlatList, RefreshControl, View } from 'react-native';

export default function EventsHome() {
  const user = useCurrentUser();
  const org = user?.organisations[0];
  const { data, isLoading, refetch } = useEvents(1);
  const { refreshing, onRefresh } = useManualRefresh(refetch);

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 px-6 pb-2">
        <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
          Events
        </Text>
        <Text
          className="text-foreground font-sans-extrabold text-2xl tracking-tight"
          numberOfLines={1}>
          {org?.name ?? 'cheevo'}
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
          renderItem={({ item }) => <EventCard event={item} />}
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 12 }}
          showsVerticalScrollIndicator={false}
          refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
          ListEmptyComponent={
            <EmptyState
              icon={CalendarX}
              title="No events yet"
              message="Create your first event on the cheevo web dashboard. It'll show up here."
              className="mt-24"
            />
          }
        />
      )}
    </View>
  );
}
