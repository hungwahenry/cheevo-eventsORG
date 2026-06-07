import { Text } from '@/components/ui/text';
import { haptics } from '@/lib/haptics';
import { Pressable, View } from 'react-native';

export type FilterOption<T> = { label: string; value: T };

export function FilterPills<T extends string | undefined>({
  options,
  value,
  onChange,
}: {
  options: FilterOption<T>[];
  value: T;
  onChange: (value: T) => void;
}) {
  return (
    <View className="flex-row gap-2">
      {options.map((option) => {
        const active = value === option.value;
        return (
          <Pressable
            key={option.label}
            onPress={() => {
              haptics.select();
              onChange(option.value);
            }}
            className={`rounded-full px-3 py-1.5 ${active ? 'bg-primary' : 'bg-muted'}`}>
            <Text
              className={`font-sans-medium text-xs ${
                active ? 'text-primary-foreground' : 'text-muted-foreground'
              }`}>
              {option.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}
