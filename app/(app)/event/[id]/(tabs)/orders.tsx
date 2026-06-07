import { EmptyState } from '@/components/empty-state';
import { FilterPills, type FilterOption } from '@/components/filter-pills';
import { Spinner } from '@/components/ui/spinner';
import { useEventOrders } from '@/features/orders';
import { OrderRow } from '@/features/orders/components/order-row';
import type { OrderStatus } from '@/features/orders/types';
import { useGlobalSearchParams } from 'expo-router';
import { Receipt } from 'lucide-react-native';
import { useState } from 'react';
import { FlatList, RefreshControl, View } from 'react-native';

const FILTERS: FilterOption<OrderStatus | undefined>[] = [
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
        <FilterPills options={FILTERS} value={status} onChange={setStatus} />
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
            <EmptyState
              icon={Receipt}
              title="No orders"
              message="Orders will appear here as tickets sell."
              className="mt-16"
            />
          }
        />
      )}
    </View>
  );
}
