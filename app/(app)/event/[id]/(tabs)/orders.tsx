import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useEventOrders } from '@/features/orders';
import { OrderRow } from '@/features/orders/components/order-row';
import type { OrderStatus } from '@/features/orders/types';
import { haptics } from '@/lib/haptics';
import { useGlobalSearchParams } from 'expo-router';
import { Receipt } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, Pressable, RefreshControl, View } from 'react-native';

const FILTERS: { label: string; value: OrderStatus | undefined }[] = [
  { label: 'All', value: undefined },
  { label: 'Paid', value: 'paid' },
  { label: 'Pending', value: 'pending' },
  { label: 'Refunded', value: 'refunded' },
];

export default function OrdersTab() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const [status, setStatus] = useState<OrderStatus | undefined>(undefined);
  const query = useEventOrders(id, status);

  const items = query.data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <View className="flex-1">
      <View className="px-6 pb-2 pt-4">
        <View className="flex-row gap-2">
          {FILTERS.map((f) => {
            const active = status === f.value;
            return (
              <Pressable
                key={f.label}
                onPress={() => {
                  haptics.select();
                  setStatus(f.value);
                }}
                className={`rounded-full px-3 py-1.5 ${active ? 'bg-primary' : 'bg-muted'}`}>
                <Text
                  className={`font-sans-medium text-xs ${
                    active ? 'text-primary-foreground' : 'text-muted-foreground'
                  }`}>
                  {f.label}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>

      {query.isLoading ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderRow order={item} eventId={id} />}
          contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 12 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={query.isRefetching} onRefresh={query.refetch} />
          }
          onEndReachedThreshold={0.4}
          onEndReached={() => {
            if (query.hasNextPage && !query.isFetchingNextPage) query.fetchNextPage();
          }}
          ListFooterComponent={
            query.isFetchingNextPage ? (
              <View className="py-4">
                <Spinner />
              </View>
            ) : null
          }
          ListEmptyComponent={
            <View className="mt-16 items-center gap-3 px-6">
              <View className="bg-muted size-16 items-center justify-center rounded-full">
                <Icon as={Receipt} className="text-muted-foreground size-8" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                No orders
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                Orders will appear here as tickets sell.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
