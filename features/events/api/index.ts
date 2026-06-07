import type { EventItem, EventsPage, EventStatusFilter } from '@/features/events/types';
import { api } from '@/lib/api';

export function listEvents(
  page: number,
  perPage = 20,
  status?: EventStatusFilter,
  q?: string
): Promise<EventsPage> {
  return api.get<EventsPage>('/organizer/events', {
    params: {
      page,
      per_page: perPage,
      ...(status ? { status } : {}),
      ...(q ? { q } : {}),
    },
  });
}

export function getEvent(id: string): Promise<EventItem> {
  return api.get<EventItem>(`/organizer/events/${id}`);
}
