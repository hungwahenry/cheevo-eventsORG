import type { EventSales } from '@/features/events/sales/types';
import { api } from '@/lib/api';

export function getEventSales(eventId: string): Promise<EventSales> {
  return api.get<EventSales>(`/organizer/events/${eventId}/sales`);
}
