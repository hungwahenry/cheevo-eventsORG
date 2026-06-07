import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { View } from 'react-native';

export default function WelcomeScreen() {
  return (
    <View className="bg-background flex-1">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-primary font-sans-black text-6xl tracking-tight">cheevo</Text>
        <Text className="text-muted-foreground mt-2 text-base">for organisers</Text>
      </View>

      <View className="pb-safe-offset-6 gap-3 px-6">
        <View className="gap-2 pb-2">
          <Text className="text-foreground font-sans-extrabold text-3xl tracking-tight">
            Run your events on the go.
          </Text>
          <Text className="text-muted-foreground text-base leading-6">
            Scan tickets at the door, track sales, and manage your events from your pocket.
          </Text>
        </View>

        <Button size="lg" className="w-full" onPress={() => router.push('/email')}>
          <Text>Get started</Text>
        </Button>
      </View>
    </View>
  );
}
