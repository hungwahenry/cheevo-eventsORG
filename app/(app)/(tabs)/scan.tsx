import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ScanLine } from 'lucide-react-native';
import { View } from 'react-native';

export default function ScanScreen() {
  return (
    <View className="bg-background flex-1 items-center justify-center px-6">
      <View className="bg-primary/10 size-16 items-center justify-center rounded-full">
        <Icon as={ScanLine} className="text-primary size-8" strokeWidth={2} />
      </View>
      <Text className="text-foreground font-sans-semibold mt-4 text-center text-lg">
        Door scanner
      </Text>
      <Text className="text-muted-foreground mt-1 text-center text-sm">
        Scan and check in tickets at the door. Coming in the next update.
      </Text>
    </View>
  );
}
