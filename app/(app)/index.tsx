import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCurrentUser, useSignOut } from '@/features/auth';
import { View } from 'react-native';

export default function OrganizerHome() {
  const user = useCurrentUser();
  const { signOut, isPending } = useSignOut();
  const org = user?.organisations[0];

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-6 flex-1 px-6">
        <Text className="text-muted-foreground font-sans-medium text-sm">Welcome back</Text>
        <Text className="text-foreground font-sans-extrabold mt-1 text-3xl tracking-tight">
          {org?.name ?? 'cheevo'}
        </Text>
        <Text className="text-muted-foreground mt-3 text-base leading-6">
          Your organiser app is set up. Features land here next.
        </Text>

        <View className="pb-safe-offset-6 mt-auto">
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
    </View>
  );
}
