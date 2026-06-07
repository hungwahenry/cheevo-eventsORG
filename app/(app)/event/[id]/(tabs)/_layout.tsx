import { EventDetailHeader } from '@/features/events/components/event-detail-header';
import { EventTabBar } from '@/features/events/components/event-tab-bar';
import { Tabs, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function EventTabsLayout() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View className="bg-background flex-1">
      <EventDetailHeader eventId={id} />
      <View className="flex-1">
        <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <EventTabBar {...props} />}>
          <Tabs.Screen name="attendees" />
          <Tabs.Screen name="orders" />
          <Tabs.Screen name="rsvps" />
        </Tabs>
      </View>
    </View>
  );
}
