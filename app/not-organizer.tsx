import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useSignOut } from '@/features/auth';
import { Building2 } from 'lucide-react-native';
import { View } from 'react-native';

export default function NotOrganizerScreen() {
  const { signOut, isPending } = useSignOut();

  return (
    <View className="bg-background flex-1 items-center justify-center px-6">
      <EmptyState
        icon={Building2}
        tone="primary"
        title="No organisation yet"
        message="This app is for event organisers. Create your organisation on the cheevo web dashboard, then sign back in here."
        action={
          <View className="mt-3 w-full max-w-xs">
            <Button
              size="lg"
              variant="outline"
              className="w-full"
              disabled={isPending}
              onPress={signOut}>
              <Text>Sign out</Text>
            </Button>
          </View>
        }
      />
    </View>
  );
}
