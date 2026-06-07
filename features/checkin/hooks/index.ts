import * as checkinApi from '@/features/checkin/api';
import type { IssuedTicketStatus } from '@/features/checkin/types';
import { eventSalesKey } from '@/features/events/sales/hooks';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient,
  type QueryClient,
} from '@tanstack/react-query';

const ticketsRoot = (eventId: string) => ['organizer', 'event', eventId, 'issued-tickets'] as const;

export const issuedTicketsKey = (eventId: string, status?: IssuedTicketStatus, q?: string) =>
  [...ticketsRoot(eventId), 'list', status ?? 'all', q?.trim() ?? ''] as const;

export const issuedTicketCountKey = (eventId: string, status?: IssuedTicketStatus) =>
  [...ticketsRoot(eventId), 'count', status ?? 'all'] as const;

export function useIssuedTickets(eventId: string, status?: IssuedTicketStatus, q?: string) {
  return useInfiniteQuery({
    queryKey: issuedTicketsKey(eventId, status, q),
    queryFn: ({ pageParam }) => checkinApi.listIssuedTickets(eventId, pageParam, 25, status, q),
    initialPageParam: 1,
    getNextPageParam: (last) => (last.page < last.last_page ? last.page + 1 : undefined),
  });
}

export function useIssuedTicketCount(eventId: string, status?: IssuedTicketStatus) {
  return useQuery({
    queryKey: issuedTicketCountKey(eventId, status),
    queryFn: () => checkinApi.listIssuedTickets(eventId, 1, 1, status).then((p) => p.total),
  });
}

function invalidateEventTickets(qc: QueryClient, eventId: string) {
  qc.invalidateQueries({ queryKey: ticketsRoot(eventId) });
  qc.invalidateQueries({ queryKey: eventSalesKey(eventId) });
}

export function useScanTicket(eventId: string, opts?: { silent?: boolean }) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (code: string) => checkinApi.scanTicket(eventId, code),
    meta: opts?.silent ? { silent: true } : undefined,
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
