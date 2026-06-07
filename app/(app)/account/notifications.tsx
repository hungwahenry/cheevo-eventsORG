import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import {
  useNotificationPreferences,
  useUpdateNotificationPreference,
} from '@/features/notifications';
import { PreferenceTypeRow } from '@/features/notifications/components/preference-type-row';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, ScrollView, View } from 'react-native';

export default function NotificationSettingsScreen() {
  const { data, isLoading } = useNotificationPreferences();
  const update = useUpdateNotificationPreference();

  const organizerTypes = data?.types.filter((t) => t.audience === 'organizer') ?? [];

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 px-6 pb-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="active:bg-muted size-10 items-center justify-center rounded-full">
          <Icon as={ArrowLeft} className="text-foreground size-6" strokeWidth={1.75} />
        </Pressable>
        <Text className="text-foreground font-sans-extrabold mt-2 text-2xl tracking-tight">
          Notifications
        </Text>
        <Text className="text-muted-foreground mt-1 text-sm">
          Choose how you hear about each update.
        </Text>
      </View>

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
