import type {
  Broadcast,
  BroadcastsPage,
  CreateBroadcastInput,
} from '@/features/broadcasts/types';
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

export function createBroadcast(eventId: string, input: CreateBroadcastInput): Promise<Broadcast> {
  return api.post<Broadcast>(`/organizer/events/${eventId}/broadcasts`, input);
}

export function sendTestBroadcast(eventId: string, input: CreateBroadcastInput): Promise<null> {
  return api.post<null>(`/organizer/events/${eventId}/broadcasts/test`, input);
}
