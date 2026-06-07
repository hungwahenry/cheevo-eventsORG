import type { InboxPage } from '@/features/notifications/types';
import { api } from '@/lib/api';

export function listInboxNotifications(page: number, perPage = 20): Promise<InboxPage> {
  return api.get<InboxPage>('/notifications', { params: { page, per_page: perPage } });
}

export function getUnreadCount(): Promise<{ unread: number }> {
  return api.get<{ unread: number }>('/notifications/unread-count');
}

export function markNotificationRead(id: string): Promise<null> {
  return api.patch<null>(`/notifications/${id}/read`);
}

export function markAllNotificationsRead(): Promise<null> {
  return api.patch<null>('/notifications/read-all');
}

export function registerPushToken(token: string, deviceId: string | null): Promise<null> {
  return api.post<null>('/notifications/push-tokens', { token, device_id: deviceId });
}

export function unregisterPushToken(token: string): Promise<null> {
  return api.delete<null>('/notifications/push-tokens', { data: { token } });
}
