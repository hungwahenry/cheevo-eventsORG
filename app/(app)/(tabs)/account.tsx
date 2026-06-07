import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCurrentUser, useSignOut } from '@/features/auth';
import { AccountHeader } from '@/features/account/components/account-header';
import { ProfileStats } from '@/features/account/components/profile-stats';
import { SettingsDivider, SettingsRow } from '@/features/account/components/settings-row';
import { KpiGrid } from '@/features/dashboard/components/kpi-grid';
import { router } from 'expo-router';
import { Bell, Download, Mail, Trash2 } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

export default function AccountScreen() {
  const user = useCurrentUser();
  const org = user?.organisations[0];
  const { signOut, isPending } = useSignOut();

  return (
    <View className="bg-background flex-1">
      <ScrollView
        contentContainerStyle={{ padding: 24, gap: 24 }}
        className="pt-safe-offset-4"
        showsVerticalScrollIndicator={false}>
        <AccountHeader org={org} email={user?.email} />

        {org ? <ProfileStats org={org} /> : null}
        {org ? <KpiGrid orgId={org.id} /> : null}

        <View className="bg-card overflow-hidden rounded-2xl">
          <SettingsRow
            icon={Bell}
            label="Notifications"
            onPress={() => router.push('/account/notifications')}
          />
          <SettingsDivider />
          <SettingsRow
            icon={Mail}
            label="Change email"
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

        <Button
          size="lg"
          variant="outline"
          className="w-full"
          disabled={isPending}
          onPress={signOut}>
          <Text>Sign out</Text>
        </Button>
      </ScrollView>
    </View>
  );
}
