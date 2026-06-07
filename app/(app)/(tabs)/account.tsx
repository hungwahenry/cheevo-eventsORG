import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCurrentUser, useSignOut } from '@/features/auth';
import { haptics } from '@/lib/haptics';
import { router } from 'expo-router';
import { Bell, Building2, ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Image, Pressable, ScrollView, View } from 'react-native';

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
        <View className="items-center gap-3">
          <OrgLogo logoUrl={org?.logo_url ?? null} />
          <View className="items-center gap-1">
            <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
              {org?.name ?? 'cheevo'}
            </Text>
            {user?.email ? (
              <Text className="text-muted-foreground text-sm">{user.email}</Text>
            ) : null}
          </View>
        </View>

        <View className="bg-card overflow-hidden rounded-2xl">
          <SettingsRow
            icon={Bell}
            label="Notifications"
            onPress={() => router.push('/account/notifications')}
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

function SettingsRow({
  icon,
  label,
  onPress,
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={() => {
        haptics.select();
        onPress();
      }}
      className="active:bg-muted/40 flex-row items-center gap-3 p-4">
      <View className="bg-muted size-10 items-center justify-center rounded-xl">
        <Icon as={icon} className="text-foreground size-5" strokeWidth={2} />
      </View>
      <Text className="text-foreground font-sans-medium flex-1 text-base">{label}</Text>
      <Icon as={ChevronRight} className="text-muted-foreground size-5" />
    </Pressable>
  );
}

function OrgLogo({ logoUrl }: { logoUrl: string | null }) {
  if (!logoUrl) {
    return (
      <View className="bg-muted size-24 items-center justify-center rounded-2xl">
        <Icon as={Building2} className="text-muted-foreground size-10" strokeWidth={2} />
      </View>
    );
  }

  return (
    <View className="border-border size-24 overflow-hidden rounded-2xl border">
      <Image source={{ uri: logoUrl }} style={{ flex: 1 }} resizeMode="cover" />
    </View>
  );
}
