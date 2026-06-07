import * as checkinApi from '@/features/checkin/api';
import type { IssuedTicketStatus } from '@/features/checkin/types';
import { eventSalesKey } from '@/features/events/sales/hooks';
import { useInfiniteQuery, useMutation, useQueryClient, type QueryClient } from '@tanstack/react-query';

export const issuedTicketsKey = (eventId: string, status?: IssuedTicketStatus, q?: string) =>
  ['organizer', 'event', eventId, 'issued-tickets', status ?? 'all', q?.trim() ?? ''] as const;

export function useIssuedTickets(eventId: string, status?: IssuedTicketStatus, q?: string) {
  return useInfiniteQuery({
    queryKey: issuedTicketsKey(eventId, status, q),
    queryFn: ({ pageParam }) => checkinApi.listIssuedTickets(eventId, pageParam, 25, status, q),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.last_page ? last.page + 1 : undefined),
  });
}

function invalidateEventTickets(qc: QueryClient, eventId: string) {
  qc.invalidateQueries({ queryKey: ['organizer', 'event', eventId, 'issued-tickets'] });
  qc.invalidateQueries({ queryKey: eventSalesKey(eventId) });
}

export function useScanTicket(eventId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => checkinApi.scanTicket(eventId, code),
    onSuccess: () => invalidateEventTickets(qc, eventId),
  });
}

export function useRevokeTicket(eventId: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ticketId: string) => checkinApi.revokeTicket(eventId, ticketId),
    onSuccess: () => invalidateEventTickets(qc, eventId),
  });
}
