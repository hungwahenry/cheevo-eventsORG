import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { ScanFeedback } from '@/features/checkin/scan-feedback';
import { CheckCircle2, TriangleAlert, XCircle } from 'lucide-react-native';
import { View } from 'react-native';

const STYLES = {
  success: { bg: 'bg-emerald-600', icon: CheckCircle2 },
  warning: { bg: 'bg-amber-500', icon: TriangleAlert },
  error: { bg: 'bg-red-600', icon: XCircle },
} as const;

export function ScanFeedbackCard({ feedback }: { feedback: ScanFeedback }) {
  const style = STYLES[feedback.kind];

  return (
    <View className={`w-full flex-row items-center gap-3 rounded-2xl p-4 ${style.bg}`}>
      <Icon as={style.icon} className="size-7 text-white" strokeWidth={2} />
      <View className="flex-1">
        <Text className="font-sans-bold text-base text-white">{feedback.title}</Text>
        <Text className="text-sm text-white/90" numberOfLines={2}>
          {feedback.message}
        </Text>
      </View>
    </View>
  );
}
