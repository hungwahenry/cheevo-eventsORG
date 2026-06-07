import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { router } from 'expo-router';
import { CalendarCheck, QrCode, TrendingUp, type LucideIcon } from 'lucide-react-native';
import { Image, useWindowDimensions, View } from 'react-native';

const LOGO = require('@/assets/images/logo.png');
const LOGO_RATIO = 1024 / 300;

type Highlight = { icon: LucideIcon; title: string; subtitle: string };

const HIGHLIGHTS: Highlight[] = [
  { icon: QrCode, title: 'Scan at the door', subtitle: 'Check guests in with a quick QR scan.' },
  { icon: TrendingUp, title: 'Track sales live', subtitle: 'Watch tickets and revenue as they land.' },
  {
    icon: CalendarCheck,
    title: 'Manage on the go',
    subtitle: 'Your events and orders, in your pocket.',
  },
];

export default function WelcomeScreen() {
  const { width } = useWindowDimensions();
  const logoWidth = Math.min(width * 0.56, 230);

  return (
    <View className="bg-background flex-1">
      <View className="pt-safe-offset-8 flex-1 px-6">
        <View className="flex-1 justify-center gap-10">
          <View className="gap-6">
            <Image
              source={LOGO}
              style={{ width: logoWidth, height: logoWidth / LOGO_RATIO }}
              resizeMode="contain"
              accessibilityLabel="cheevo organizers"
            />
            <Text className="text-foreground font-sans-black text-4xl leading-tight tracking-tight">
              Run your events{'\n'}from anywhere.
            </Text>
          </View>

          <View className="gap-5">
            {HIGHLIGHTS.map((item) => (
              <View key={item.title} className="flex-row items-center gap-4">
                <View className="bg-primary/10 size-11 items-center justify-center rounded-2xl">
                  <Icon as={item.icon} className="text-primary size-5" strokeWidth={2} />
                </View>
                <View className="flex-1 gap-0.5">
                  <Text className="text-foreground font-sans-semibold text-base">{item.title}</Text>
                  <Text className="text-muted-foreground text-sm leading-5">{item.subtitle}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </View>

      <View className="pb-safe-offset-6 gap-4 px-6">
        <Button size="lg" className="w-full" onPress={() => router.push('/email')}>
          <Text>Get started</Text>
        </Button>
        <Text className="text-muted-foreground text-center text-xs leading-5">
          New to cheevo? Set up your organisation at cheevo.events
        </Text>
      </View>
    </View>
  );
}
