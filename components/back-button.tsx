import { Icon } from '@/components/ui/icon';
import { cn } from '@/lib/utils';
import { router } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable } from 'react-native';

export function BackButton({
  onPress,
  variant = 'default',
}: {
  onPress?: () => void;
  variant?: 'default' | 'overlay';
}) {
  const overlay = variant === 'overlay';

  return (
    <Pressable
      onPress={onPress ?? (() => router.back())}
      hitSlop={12}
      className={cn(
        'size-10 items-center justify-center rounded-full',
        overlay ? 'bg-black/40' : 'active:bg-muted'
      )}>
      <Icon
        as={ArrowLeft}
        className={cn('size-6', overlay ? 'text-white' : 'text-foreground')}
        strokeWidth={overlay ? 2 : 1.75}
      />
    </Pressable>
  );
}
