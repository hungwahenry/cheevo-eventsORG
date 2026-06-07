import * as salesApi from '@/features/events/sales/api';
import { useQuery } from '@tanstack/react-query';

export const eventSalesKey = (eventId: string) =>
  ['organizer', 'event', eventId, 'sales'] as const;

export function useEventSales(eventId: string) {
  return useQuery({
    queryKey: eventSalesKey(eventId),
    queryFn: () => salesApi.getEventSales(eventId),
  });
}
