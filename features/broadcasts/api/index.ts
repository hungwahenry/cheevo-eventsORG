import type { Broadcast, BroadcastsPage } from '@/features/broadcasts/types';
import { api } from '@/lib/api';

export function listEventBroadcasts(
  eventId: string,
  page: number,
  perPage = 20
): Promise<BroadcastsPage> {
  return api.get<BroadcastsPage>(`/organizer/events/${eventId}/broadcasts`, {
    params: { page, per_page: perPage },
  });
}

export function getEventBroadcast(eventId: string, broadcastId: string): Promise<Broadcast> {
  return api.get<Broadcast>(`/organizer/events/${eventId}/broadcasts/${broadcastId}`);
}
