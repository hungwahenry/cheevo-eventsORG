export type IssuedTicketStatus = 'valid' | 'scanned' | 'revoked';

export type IssuedTicketHolder = {
  email: string | null;
  username: string | null;
  display_name: string | null;
  avatar_url: string | null;
};

export type IssuedTicketScanner = {
  email: string | null;
  display_name: string | null;
};

export type IssuedTicket = {
  id: string;
  code: string;
  status: IssuedTicketStatus;
  ticket_name: string;
  order_id: string;
  scanned_at: string | null;
  created_at: string;
  holder: IssuedTicketHolder;
  scanned_by: IssuedTicketScanner | null;
  holder_event_tickets_count?: number | null;
};

export type IssuedTicketsPage = {
  items: IssuedTicket[];
  page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type ScanErrorCode =
  | 'ticket_already_scanned'
  | 'ticket_code_not_found'
  | 'ticket_revoked'
  | 'ticket_wrong_event';

export function holderName(holder: IssuedTicketHolder): string {
  return holder.display_name ?? holder.username ?? holder.email ?? 'Guest';
}
