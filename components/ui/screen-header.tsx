import { BackButton } from '@/components/ui/back-button';
import { Text } from '@/components/ui/text';
import type { ReactNode } from 'react';
import { View } from 'react-native';

type Props = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  right?: ReactNode;
  onBack?: () => void;
};

export function ScreenHeader({ eyebrow, title, subtitle, right, onBack }: Props) {
  return (
    <View className="pt-safe-offset-4 gap-3 px-6 pb-2">
      <View className="flex-row items-center justify-between gap-3">
        <BackButton onPress={onBack} />
        {right ?? null}
      </View>
      {eyebrow || title || subtitle ? (
        <View className="gap-0.5">
          {eyebrow ? (
            <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
              {eyebrow}
            </Text>
          ) : null}
          {title ? (
            <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
              {title}
            </Text>
          ) : null}
          {subtitle ? <Text className="text-muted-foreground text-sm">{subtitle}</Text> : null}
        </View>
      ) : null}
    </View>
  );
}
