export type EventStatus = 'draft' | 'published' | 'past';

export type EventImage = {
  id: string;
  url: string;
  sort_order: number;
};

export type EventFeature = {
  id: string;
  title: string;
  description: string | null;
  image_url: string | null;
  link: string | null;
  starts_at: string | null;
  ends_at: string | null;
  sort_order: number;
};

export type EventItem = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  starts_at: string | null;
  ends_at: string | null;
  timezone: string;
  venue_name: string | null;
  address: string | null;
  city: string | null;
  flyer_url: string | null;
  flyer_type: 'image' | 'video' | null;
  status: EventStatus;
  published_at: string | null;
  tickets_count: number;
  tickets_min_price: number | null;
  tickets_max_price: number | null;
  currency: string;
  rsvps_count: number;
  comments_count: number;
  tickets_sold: number;
  revenue_minor: number;
  created_at: string;
  images?: EventImage[];
  features?: EventFeature[];
};

export type EventsPage = {
  items: EventItem[];
  page: number;
  last_page: number;
  per_page: number;
  total: number;
};

export type EventStatusFilter = 'draft' | 'published' | 'past';
