import { EmptyState } from '@/components/ui/empty-state';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/ui/text';
import { TriangleAlert } from 'lucide-react-native';
import { View } from 'react-native';

type Props = {
  error: Error;
  retry: () => void;
};

export function AppErrorBoundary({ retry }: Props) {
  return (
    <View className="bg-background flex-1 items-center justify-center px-6">
      <EmptyState
        icon={TriangleAlert}
        tone="danger"
        title="Something went wrong"
        message="The app hit an unexpected error. Try again — if it keeps happening, please reach out."
        action={
          <View className="mt-4 w-full max-w-xs">
            <Button size="lg" className="w-full" onPress={retry}>
              <Text>Try again</Text>
            </Button>
          </View>
        }
      />
    </View>
  );
}
