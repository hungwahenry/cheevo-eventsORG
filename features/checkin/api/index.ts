import type {
  IssuedTicket,
  IssuedTicketsPage,
  IssuedTicketStatus,
} from '@/features/checkin/types';
import { api } from '@/lib/api';

export function listIssuedTickets(
  eventId: string,
  page: number,
  perPage = 25,
  status?: IssuedTicketStatus,
  q?: string
): Promise<IssuedTicketsPage> {
  return api.get<IssuedTicketsPage>(`/organizer/events/${eventId}/issued-tickets`, {
    params: {
      page,
      per_page: perPage,
      ...(status ? { status } : {}),
      ...(q ? { q } : {}),
    },
  });
}

export function getIssuedTicket(eventId: string, ticketId: string): Promise<IssuedTicket> {
  return api.get<IssuedTicket>(`/organizer/events/${eventId}/issued-tickets/${ticketId}`);
}

export function scanTicket(eventId: string, code: string): Promise<IssuedTicket> {
  return api.post<IssuedTicket>(`/organizer/events/${eventId}/issued-tickets/scan`, { code });
}

export function revokeTicket(eventId: string, ticketId: string): Promise<IssuedTicket> {
  return api.post<IssuedTicket>(
    `/organizer/events/${eventId}/issued-tickets/${ticketId}/revoke`,
    {}
  );
}
