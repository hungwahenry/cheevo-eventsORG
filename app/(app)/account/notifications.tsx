import { ScreenHeader } from '@/components/ui/screen-header';
import { Spinner } from '@/components/ui/spinner';
import {
  useNotificationPreferences,
  useUpdateNotificationPreference,
} from '@/features/notifications';
import { PreferenceTypeRow } from '@/features/notifications/components/preference-type-row';
import { ScrollView, View } from 'react-native';

export default function NotificationSettingsScreen() {
  const { data, isLoading } = useNotificationPreferences();
  const update = useUpdateNotificationPreference();

  const organizerTypes = data?.types.filter((t) => t.audience === 'organizer') ?? [];

  return (
    <View className="bg-background flex-1">
      <ScreenHeader title="Notifications" subtitle="Choose how you hear about each update." />

      {isLoading || !data ? (
        <View className="flex-1 items-center justify-center">
          <Spinner size="lg" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingTop: 12, paddingBottom: 48 }}>
          {organizerTypes.map((type) => (
            <PreferenceTypeRow
              key={type.type}
              type={type}
              onToggle={(channel, enabled) =>
                update.mutate({ type: type.type, channel, enabled })
              }
            />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
