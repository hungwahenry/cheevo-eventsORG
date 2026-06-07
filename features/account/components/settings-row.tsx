import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { haptics } from '@/lib/haptics';
import { ChevronRight, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

export function SettingsRow({
  icon,
  label,
  onPress,
  tone = 'default',
}: {
  icon: LucideIcon;
  label: string;
  onPress: () => void;
  tone?: 'default' | 'danger';
}) {
  const danger = tone === 'danger';

  return (
    <Pressable
      onPress={() => {
        haptics.select();
        onPress();
      }}
      className="active:bg-muted/40 flex-row items-center gap-3 p-4">
      <View
        className={`size-10 items-center justify-center rounded-xl ${
          danger ? 'bg-destructive/10' : 'bg-muted'
        }`}>
        <Icon as={icon} className={danger ? 'text-destructive size-5' : 'text-foreground size-5'} strokeWidth={2} />
      </View>
      <Text
        className={`font-sans-medium flex-1 text-base ${danger ? 'text-destructive' : 'text-foreground'}`}>
        {label}
      </Text>
      <Icon as={ChevronRight} className="text-muted-foreground size-5" />
    </Pressable>
  );
}

export function SettingsDivider() {
  return <View className="bg-border ml-16 h-px" />;
}
