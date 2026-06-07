import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { useCameraPermissions } from 'expo-camera';
import { router } from 'expo-router';
import { ArrowLeft, Camera } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Linking, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function CameraPermissionGate({ children }: { children: ReactNode }) {
  const insets = useSafeAreaInsets();
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View className="bg-background flex-1" />;
  }

  if (permission.granted) {
    return <>{children}</>;
  }

  return (
    <View className="bg-background flex-1">
      <View style={{ paddingTop: insets.top + 8 }} className="px-4">
        <Pressable
          onPress={() => router.back()}
          hitSlop={12}
          className="active:bg-muted size-10 items-center justify-center rounded-full">
          <Icon as={ArrowLeft} className="text-foreground size-6" strokeWidth={1.75} />
        </Pressable>
      </View>

      <View className="flex-1 items-center justify-center gap-3 px-6">
        <View className="bg-primary/10 size-16 items-center justify-center rounded-full">
          <Icon as={Camera} className="text-primary size-8" strokeWidth={2} />
        </View>
        <Text className="text-foreground font-sans-semibold text-center text-lg">
          Camera access needed
        </Text>
        <Text className="text-muted-foreground text-center text-sm">
          Allow camera access to scan and check in tickets at the door.
        </Text>
        <View className="mt-4 w-full max-w-xs">
          <Button
            size="lg"
            className="w-full"
            onPress={() => (permission.canAskAgain ? requestPermission() : Linking.openSettings())}>
            <Text>{permission.canAskAgain ? 'Allow camera' : 'Open settings'}</Text>
          </Button>
        </View>
      </View>
    </View>
  );
}
