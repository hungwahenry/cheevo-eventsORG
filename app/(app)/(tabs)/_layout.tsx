import { TabBar } from '@/components/tab-bar';
import { Tabs } from 'expo-router';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }} tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen name="events" />
      <Tabs.Screen name="scan" />
      <Tabs.Screen name="activity" />
      <Tabs.Screen name="account" />
    </Tabs>
  );
}
