import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { AccountHeader } from '@/features/account/components/account-header';
import { SettingsDivider, SettingsRow } from '@/features/account/components/settings-row';
import { useCurrentUser, useSignOut } from '@/features/auth';
import { openLegalPage } from '@/lib/legal';
import Constants from 'expo-constants';
import { router } from 'expo-router';
import { Bell, Download, FileText, Mail, ShieldCheck, Trash2 } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

const version = Constants.expoConfig?.version ?? '1.0.0';

export default function AccountScreen() {
  const user = useCurrentUser();
  const org = user?.organisations[0];
  const { signOut, isPending } = useSignOut();

  return (
    <View className="bg-background flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }} showsVerticalScrollIndicator={false}>
        <AccountHeader org={org} />

        <View className="mt-6 gap-6 px-6">
          <View className="bg-card overflow-hidden rounded-2xl">
            <SettingsRow
              icon={Bell}
              label="Notifications"
              onPress={() => router.push('/account/notifications')}
            />
            <SettingsDivider />
            <SettingsRow
              icon={Mail}
              label="Email"
              value={user?.email}
              onPress={() => router.push('/account/email')}
            />
            <SettingsDivider />
            <SettingsRow
              icon={Download}
              label="Export my data"
              onPress={() => router.push('/account/data-export')}
            />
            <SettingsDivider />
            <SettingsRow
              icon={Trash2}
              label="Delete account"
              tone="danger"
              onPress={() => router.push('/account/delete')}
            />
          </View>

          <View className="bg-card overflow-hidden rounded-2xl">
            <SettingsRow
              icon={FileText}
              label="Terms of Service"
              onPress={() => openLegalPage('terms')}
            />
            <SettingsDivider />
            <SettingsRow
              icon={ShieldCheck}
              label="Privacy Policy"
              onPress={() => openLegalPage('privacy')}
            />
          </View>

          <Button
            size="lg"
            variant="outline"
            className="w-full"
            disabled={isPending}
            onPress={signOut}>
            <Text>Sign out</Text>
          </Button>

          <Text className="text-muted-foreground text-center text-xs">
            cheevo organizer · v{version}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}
