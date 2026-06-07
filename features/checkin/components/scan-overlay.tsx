import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ScanFeedbackCard } from '@/features/checkin/components/scan-feedback-card';
import type { ScanFeedback } from '@/features/checkin/scan-feedback';
import { ArrowLeft, ScanLine } from 'lucide-react-native';
import { Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

type Props = {
  title: string;
  scannedCount?: number;
  totalCount?: number;
  feedback: ScanFeedback | null;
  onBack: () => void;
};

export function ScanOverlay({ title, scannedCount, totalCount, feedback, onBack }: Props) {
  const insets = useSafeAreaInsets();

  return (
    <View
      pointerEvents="box-none"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
      <View style={{ paddingTop: insets.top + 8 }} className="flex-row items-center gap-3 px-4">
        <Pressable
          onPress={onBack}
          hitSlop={12}
          className="size-10 items-center justify-center rounded-full bg-black/40">
          <Icon as={ArrowLeft} className="size-6 text-white" strokeWidth={2} />
        </Pressable>
        <View className="flex-1">
          <Text className="font-sans-semibold text-base text-white" numberOfLines={1}>
            {title}
          </Text>
          <Text className="text-xs text-white/70">
            {(scannedCount ?? 0).toLocaleString()} / {(totalCount ?? 0).toLocaleString()} checked in
          </Text>
        </View>
      </View>

      <View className="flex-1 items-center justify-center">
        <View className="size-64 rounded-3xl border-2 border-white/80" />
      </View>

      <View style={{ paddingBottom: insets.bottom + 16 }} className="items-center px-6">
        {feedback ? (
          <ScanFeedbackCard feedback={feedback} />
        ) : (
          <View className="flex-row items-center gap-2 rounded-full bg-black/40 px-4 py-2">
            <Icon as={ScanLine} className="size-4 text-white" strokeWidth={2} />
            <Text className="text-sm text-white">Point at a ticket QR code</Text>
          </View>
        )}
      </View>
    </View>
  );
}
