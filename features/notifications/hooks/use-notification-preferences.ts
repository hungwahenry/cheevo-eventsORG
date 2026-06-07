import {
  getNotificationPreferences,
  updateNotificationPreferences,
} from '@/features/notifications/api';
import type {
  NotificationPreferences,
  PreferenceUpdate,
} from '@/features/notifications/types';
import { isApiError } from '@/lib/api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner-native';

export const notificationPreferencesKey = ['notifications', 'preferences'] as const;

export function useNotificationPreferences() {
  return useQuery<NotificationPreferences>({
    queryKey: notificationPreferencesKey,
    queryFn: getNotificationPreferences,
  });
}

export function useUpdateNotificationPreference() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (update: PreferenceUpdate) => updateNotificationPreferences([update]),
    onMutate: async (update) => {
      await queryClient.cancelQueries({ queryKey: notificationPreferencesKey });
      const previous = queryClient.getQueryData<NotificationPreferences>(notificationPreferencesKey);

      if (previous) {
        queryClient.setQueryData<NotificationPreferences>(notificationPreferencesKey, {
          ...previous,
          types: previous.types.map((t) =>
            t.type === update.type
              ? {
                  ...t,
                  channels: t.channels.map((c) =>
                    c.channel === update.channel ? { ...c, enabled: update.enabled } : c
                  ),
                }
              : t
          ),
        });
      }

      return { previous };
    },
    onError: (error, _u, context) => {
      if (context?.previous) {
        queryClient.setQueryData(notificationPreferencesKey, context.previous);
      }
      toast.error(isApiError(error) ? error.message : 'Could not save preference.');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: notificationPreferencesKey });
    },
  });
}
