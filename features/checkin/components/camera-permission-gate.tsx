import { BackButton } from '@/components/back-button';
import { EmptyState } from '@/components/empty-state';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { useCameraPermissions } from 'expo-camera';
import { Camera } from 'lucide-react-native';
import type { ReactNode } from 'react';
import { Linking, View } from 'react-native';
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
        <BackButton />
      </View>

      <View className="flex-1 items-center justify-center">
        <EmptyState
          icon={Camera}
          tone="primary"
          title="Camera access needed"
          message="Allow camera access to scan and check in tickets at the door."
          action={
            <View className="mt-4 w-full max-w-xs">
              <Button
                size="lg"
                className="w-full"
                onPress={() =>
                  permission.canAskAgain ? requestPermission() : Linking.openSettings()
                }>
                <Text>{permission.canAskAgain ? 'Allow camera' : 'Open settings'}</Text>
              </Button>
            </View>
          }
        />
      </View>
    </View>
  );
}
