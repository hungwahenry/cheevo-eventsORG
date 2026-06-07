export type SalesPerTicket = {
  ticket_id: string;
  name: string;
  sold_count: number;
  quantity: number | null;
  revenue_minor: number;
};

export type EventSales = {
  currency: string;
  gross_minor: number;
  fees_minor: number;
  revenue_minor: number;
  orders_count: number;
  tickets_sold: number;
  per_ticket: SalesPerTicket[];
};
