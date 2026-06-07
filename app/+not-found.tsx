import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router, Stack } from 'expo-router';
import { Compass } from 'lucide-react-native';
import { View } from 'react-native';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Not found' }} />
      <View className="bg-background flex-1 items-center justify-center px-6">
        <EmptyState
          icon={Compass}
          title="Page not found"
          message="We couldn't find that screen. It may have moved."
          action={
            <View className="mt-4 w-full max-w-xs">
              <Button size="lg" className="w-full" onPress={() => router.replace('/')}>
                <Text>Go home</Text>
              </Button>
            </View>
          }
        />
      </View>
    </>
  );
}
