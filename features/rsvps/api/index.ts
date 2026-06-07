import type { RsvpsPage } from '@/features/rsvps/types';
import { api } from '@/lib/api';

export function listEventRsvps(eventId: string, page: number, perPage = 25): Promise<RsvpsPage> {
  return api.get<RsvpsPage>(`/organizer/events/${eventId}/rsvps`, {
    params: { page, per_page: perPage },
  });
}
