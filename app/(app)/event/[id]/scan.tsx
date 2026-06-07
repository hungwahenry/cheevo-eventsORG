import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { ArrowLeft, ScanLine } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export default function EventScanScreen() {
  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 px-6 pb-2">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="active:bg-muted size-10 items-center justify-center rounded-full">
          <Icon as={ArrowLeft} className="text-foreground size-6" strokeWidth={1.75} />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-primary/10 size-16 items-center justify-center rounded-full">
          <Icon as={ScanLine} className="text-primary size-8" strokeWidth={2} />
        </View>
        <Text className="text-foreground font-sans-semibold mt-4 text-center text-lg">
          Door scanner
        </Text>
        <Text className="text-muted-foreground mt-1 text-center text-sm">
          Camera check-in is coming in the next update. For now, use Attendees to check guests in
          manually.
        </Text>
      </View>
    </View>
  );
}
