import * as broadcastsApi from '@/features/broadcasts/api';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';

export const broadcastsKey = (eventId: string) =>
  ['organizer', 'event', eventId, 'broadcasts'] as const;

export const broadcastKey = (eventId: string, broadcastId: string) =>
  ['organizer', 'event', eventId, 'broadcast', broadcastId] as const;

export function useEventBroadcasts(eventId: string) {
  return useInfiniteQuery({
    queryKey: broadcastsKey(eventId),
    queryFn: ({ pageParam }) => broadcastsApi.listEventBroadcasts(eventId, pageParam, 20),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.last_page ? last.page + 1 : undefined),
  });
}

export function useEventBroadcast(eventId: string, broadcastId: string) {
  return useQuery({
    queryKey: broadcastKey(eventId, broadcastId),
    queryFn: () => broadcastsApi.getEventBroadcast(eventId, broadcastId),
  });
}
