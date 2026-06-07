import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { Organisation } from '@/features/auth';
import { Building2 } from 'lucide-react-native';
import { Image, View } from 'react-native';

export function AccountHeader({ org, email }: { org?: Organisation; email?: string | null }) {
  return (
    <View className="items-center gap-3">
      <OrgLogo logoUrl={org?.logo_url ?? null} />
      <View className="items-center gap-1">
        <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
          {org?.name ?? 'cheevo'}
        </Text>
        {email ? <Text className="text-muted-foreground text-sm">{email}</Text> : null}
      </View>
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
