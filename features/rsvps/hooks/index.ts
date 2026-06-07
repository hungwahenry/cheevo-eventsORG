import * as rsvpsApi from '@/features/rsvps/api';
import { useInfiniteQuery } from '@tanstack/react-query';

export const rsvpsKey = (eventId: string) => ['organizer', 'event', eventId, 'rsvps'] as const;

export function useEventRsvps(eventId: string) {
  return useInfiniteQuery({
    queryKey: rsvpsKey(eventId),
    queryFn: ({ pageParam }) => rsvpsApi.listEventRsvps(eventId, pageParam, 25),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.last_page ? last.page + 1 : undefined),
  });
}
