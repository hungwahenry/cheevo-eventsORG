import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CalendarCheck, Receipt, Users, type LucideIcon } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

const TABS: Record<string, { label: string; icon: LucideIcon }> = {
  attendees: { label: 'Attendees', icon: Users },
  orders: { label: 'Orders', icon: Receipt },
  rsvps: { label: 'RSVPs', icon: CalendarCheck },
};

export function EventTabBar({ state, navigation, insets }: BottomTabBarProps) {
  return (
    <View
      className="bg-background border-border flex-row items-center justify-around border-t px-2 pt-2"
      style={{ paddingBottom: Math.max(insets.bottom, 10) }}>
      {state.routes.map((route, i) => {
        const tab = TABS[route.name];
        if (!tab) return null;

        const focused = state.index === i;

        return (
          <Pressable
            key={route.key}
            accessibilityRole="button"
            accessibilityState={focused ? { selected: true } : {}}
            accessibilityLabel={tab.label}
            onPress={() => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });
              if (!focused && !event.defaultPrevented) {
                navigation.navigate(route.name, route.params);
              }
            }}
            className={`h-10 flex-row items-center justify-center gap-1.5 rounded-full px-3 ${
              focused ? 'bg-primary' : ''
            }`}>
            <Icon
              as={tab.icon}
              className={focused ? 'text-primary-foreground' : 'text-muted-foreground'}
              size={20}
              strokeWidth={2}
            />
            {focused ? (
              <Text className="text-primary-foreground font-sans-semibold text-sm">{tab.label}</Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}
