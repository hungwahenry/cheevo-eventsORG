import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Bell } from 'lucide-react-native';
import { View } from 'react-native';

export default function ActivityScreen() {
  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-4 px-6 pb-2">
        <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
          Activity
        </Text>
        <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">Activity</Text>
      </View>

      <View className="flex-1 items-center justify-center px-6">
        <View className="bg-muted size-16 items-center justify-center rounded-full">
          <Icon as={Bell} className="text-muted-foreground size-8" strokeWidth={2} />
        </View>
        <Text className="text-foreground font-sans-semibold mt-4 text-center text-lg">
          Nothing yet
        </Text>
        <Text className="text-muted-foreground mt-1 text-center text-sm">
          Sales, orders, and payout updates will show up here.
        </Text>
      </View>
    </View>
  );
}
