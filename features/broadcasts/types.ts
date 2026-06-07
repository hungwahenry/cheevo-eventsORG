export type BroadcastAudience = 'ticket_holders' | 'rsvpers' | 'both';

export type BroadcastStatus = 'queued' | 'sending' | 'sent' | 'failed' | 'cancelled';

export type Broadcast = {
  id: string;
  audience: BroadcastAudience;
  subject: string;
  body_html: string;
  body_text: string;
  recipients_count: number;
  sent_count: number;
  failed_count: number;
  status: BroadcastStatus;
  failure_reason: string | null;
  sent_at: string | null;
  created_at: string;
};

export type BroadcastsPage = {
  items: Broadcast[];
  page: number;
  last_page: number;
  per_page: number;
  total: number;
};

const AUDIENCE_LABELS: Record<BroadcastAudience, string> = {
  ticket_holders: 'Ticket holders',
  rsvpers: 'RSVPers',
  both: 'Ticket holders & RSVPers',
};

export function audienceLabel(audience: BroadcastAudience): string {
  return AUDIENCE_LABELS[audience];
}

export type CreateBroadcastInput = {
  audience: BroadcastAudience;
  subject: string;
  body_html: string;
};

export const SUBJECT_MAX = 120;
export const BODY_MAX = 5000;

function escapeHtml(value: string): string {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function textToHtml(text: string): string {
  return text
    .trim()
    .split(/\n{2,}/)
    .map((para) => para.trim())
    .filter(Boolean)
    .map((para) => `<p>${escapeHtml(para).replace(/\n/g, '<br>')}</p>`)
    .join('');
}
