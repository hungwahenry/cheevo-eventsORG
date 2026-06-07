import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useSignOut } from '@/features/auth';
import { Building2 } from 'lucide-react-native';
import { View } from 'react-native';

export default function NotOrganizerScreen() {
  const { signOut, isPending } = useSignOut();

  return (
    <View className="bg-background flex-1 items-center justify-center px-6">
      <View className="bg-muted/40 items-center gap-3 rounded-2xl p-8">
        <View className="bg-primary/10 size-16 items-center justify-center rounded-full">
          <Icon as={Building2} className="text-primary size-8" strokeWidth={2} />
        </View>
        <Text className="text-foreground font-sans-semibold text-center text-xl">
          No organisation yet
        </Text>
        <Text className="text-muted-foreground text-center text-sm">
          This app is for event organisers. Create your organisation on the cheevo web dashboard,
          then sign back in here.
        </Text>
      </View>

      <View className="mt-6 w-full max-w-xs">
        <Button
          size="lg"
          variant="outline"
          className="w-full"
          disabled={isPending}
          onPress={signOut}>
          <Text>Sign out</Text>
        </Button>
      </View>
    </View>
  );
}
