import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useNetwork } from '@/lib/network';
import { WifiOff } from 'lucide-react-native';
import * as React from 'react';
import { View } from 'react-native';

export function OfflineScreen() {
  const { refresh } = useNetwork();
  const [isRetrying, setIsRetrying] = React.useState(false);

  const onRetry = React.useCallback(async () => {
    setIsRetrying(true);
    try {
      await refresh();
    } finally {
      setIsRetrying(false);
    }
  }, [refresh]);

  return (
    <View className="bg-background flex-1 items-center justify-center px-6">
      <EmptyState
        icon={WifiOff}
        tone="danger"
        title="No internet connection"
        message="cheevo needs an internet connection. Check your Wi-Fi or cellular data and try again."
        action={
          <View className="mt-4 w-full max-w-xs">
            <Button size="lg" className="w-full" disabled={isRetrying} onPress={onRetry}>
              {isRetrying ? (
                <Spinner size="sm" barClassName="bg-primary-foreground" />
              ) : (
                <Text>Try again</Text>
              )}
            </Button>
          </View>
        }
      />
    </View>
  );
}
