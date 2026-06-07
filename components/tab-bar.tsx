import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCurrentUser } from '@/features/auth';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { CalendarDays, ScanLine, Bell, UserRound, type LucideIcon } from 'lucide-react-native';
import { Image, Pressable, View } from 'react-native';

const TABS: Record<string, { label: string; icon: LucideIcon }> = {
  events: { label: 'Events', icon: CalendarDays },
  scan: { label: 'Scan', icon: ScanLine },
  activity: { label: 'Activity', icon: Bell },
  account: { label: 'Account', icon: UserRound },
};

export function TabBar({ state, navigation, insets }: BottomTabBarProps) {
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
            onLongPress={() => navigation.emit({ type: 'tabLongPress', target: route.key })}
            className={`h-10 flex-row items-center justify-center gap-1.5 rounded-full px-3 ${
              focused ? 'bg-primary' : ''
            }`}>
            <TabIcon route={route.name} icon={tab.icon} focused={focused} />
            {focused ? (
              <Text className="text-primary-foreground font-sans-semibold text-sm">{tab.label}</Text>
            ) : null}
          </Pressable>
        );
      })}
    </View>
  );
}

function tintClass(focused: boolean): string {
  return focused ? 'text-primary-foreground' : 'text-muted-foreground';
}

function TabIcon({ route, icon, focused }: { route: string; icon: LucideIcon; focused: boolean }) {
  if (route === 'account') return <OrgLogo fallback={icon} focused={focused} />;
  return <Icon as={icon} className={tintClass(focused)} size={22} strokeWidth={2} />;
}

function OrgLogo({ fallback, focused }: { fallback: LucideIcon; focused: boolean }) {
  const logoUrl = useCurrentUser()?.organisations[0]?.logo_url;
  if (!logoUrl) {
    return <Icon as={fallback} className={tintClass(focused)} size={22} strokeWidth={2} />;
  }

  const ringClass = focused ? 'border-primary-foreground' : 'border-muted-foreground';

  return (
    <View className={`size-6 overflow-hidden rounded-md border ${ringClass}`}>
      <Image source={{ uri: logoUrl }} style={{ flex: 1 }} resizeMode="cover" />
    </View>
  );
}
