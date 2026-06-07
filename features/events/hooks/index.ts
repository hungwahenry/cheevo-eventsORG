import * as eventsApi from '@/features/events/api';
import type { EventStatusFilter } from '@/features/events/types';
import { keepPreviousData, useQuery } from '@tanstack/react-query';

export const eventsKey = ['organizer', 'events'] as const;

export const eventsPageKey = (page: number, status?: EventStatusFilter) =>
  [...eventsKey, page, status ?? 'all'] as const;

export const eventKey = (id: string) => ['organizer', 'event', id] as const;

export function useEvents(page = 1, status?: EventStatusFilter) {
  return useQuery({
    queryKey: eventsPageKey(page, status),
    queryFn: () => eventsApi.listEvents(page, 20, status),
    placeholderData: keepPreviousData,
  });
}

export function useEvent(id: string) {
  return useQuery({
    queryKey: eventKey(id),
    queryFn: () => eventsApi.getEvent(id),
  });
}
