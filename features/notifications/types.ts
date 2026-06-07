export type InboxNotificationType =
  | 'order.first_sale'
  | 'payout.completed'
  | 'payout.failed'
  | 'comment.flagged'
  | 'event.starting_soon'
  | 'broadcast.finished'
  | 'order.daily_digest'
  | string;

export type InboxNotification = {
  id: string;
  type: InboxNotificationType;
  data: Record<string, unknown>;
  read_at: string | null;
  created_at: string;
};

export type InboxPage = {
  items: InboxNotification[];
  page: number;
  last_page: number;
  per_page: number;
  total: number;
};
