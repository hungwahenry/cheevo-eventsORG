import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCurrentUser, useSignOut } from '@/features/auth';
import { Building2 } from 'lucide-react-native';
import { Image, ScrollView, View } from 'react-native';

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
