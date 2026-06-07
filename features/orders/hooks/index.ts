import * as ordersApi from '@/features/orders/api';
import type { OrderStatus } from '@/features/orders/types';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const ordersKey = (eventId: string, status?: OrderStatus) =>
  ['organizer', 'event', eventId, 'orders', status ?? 'all'] as const;

export const orderKey = (eventId: string, orderId: string) =>
  ['organizer', 'event', eventId, 'order', orderId] as const;

export function useEventOrders(eventId: string, status?: OrderStatus) {
  return useInfiniteQuery({
    queryKey: ordersKey(eventId, status),
    queryFn: ({ pageParam }) => ordersApi.listEventOrders(eventId, pageParam, 20, status),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.last_page ? last.page + 1 : undefined),
  });
}

export function useEventOrder(eventId: string, orderId: string) {
  return useQuery({
    queryKey: orderKey(eventId, orderId),
    queryFn: () => ordersApi.getEventOrder(eventId, orderId),
  });
}
