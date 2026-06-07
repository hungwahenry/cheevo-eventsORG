import { api } from '@/lib/api';

export function getDataExport(): Promise<unknown> {
  return api.get<unknown>('/attendee/data-export');
}
