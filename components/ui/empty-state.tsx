import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { View } from 'react-native';

type Tone = 'muted' | 'primary' | 'danger';

type Props = {
  icon: LucideIcon;
  title: string;
  message?: string;
  tone?: Tone;
  action?: ReactNode;
  className?: string;
};

const CIRCLE: Record<Tone, string> = {
  muted: 'bg-muted',
  primary: 'bg-primary/10',
  danger: 'bg-destructive/10',
};

const ICON_COLOR: Record<Tone, string> = {
  muted: 'text-muted-foreground',
  primary: 'text-primary',
  danger: 'text-destructive',
};

export function EmptyState({ icon, title, message, tone = 'muted', action, className }: Props) {
  const circle = CIRCLE[tone];
  const iconColor = ICON_COLOR[tone];

  return (
    <View className={cn('items-center gap-3 px-6', className)}>
      <View className={cn('size-16 items-center justify-center rounded-full', circle)}>
        <Icon as={icon} className={cn('size-8', iconColor)} strokeWidth={2} />
      </View>
      <Text className="text-foreground font-sans-semibold text-center text-lg">{title}</Text>
      {message ? (
        <Text className="text-muted-foreground text-center text-sm">{message}</Text>
      ) : null}
      {action}
    </View>
  );
}
