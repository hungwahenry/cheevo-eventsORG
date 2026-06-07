import { Icon } from '@/components/ui/icon';
import { OtpInput } from '@/components/ui/otp-input';
import { Text } from '@/components/ui/text';
import type { StepUpFactor } from '@/features/step-up';
import { ShieldCheck } from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type Props = {
  factor: StepUpFactor;
  factorsTotal: number;
  factorIndex: number;
  code: string;
  onChangeCode: (value: string) => void;
  onComplete: (value: string) => void;
  onResend: () => void;
  isVerifying: boolean;
};

export function StepUpVerify({
  factor,
  factorsTotal,
  factorIndex,
  code,
  onChangeCode,
  onComplete,
  onResend,
  isVerifying,
}: Props) {
  return (
    <View className="gap-5">
      {factorsTotal > 1 ? (
        <View className="gap-2">
          <View className="flex-row items-center gap-2">
            {Array.from({ length: factorsTotal }).map((_, i) => {
              const active = i + 1 === factorIndex;
              const done = i + 1 < factorIndex;
              return (
                <View
                  key={i}
                  className={`h-1.5 flex-1 rounded-full ${
                    active ? 'bg-primary' : done ? 'bg-primary/60' : 'bg-muted'
                  }`}
                />
              );
            })}
          </View>
          <Text className="text-muted-foreground font-sans-semibold text-center text-xs uppercase tracking-wide">
            Step {factorIndex} of {factorsTotal}
          </Text>
        </View>
      ) : null}

      <View className="bg-muted/40 items-center gap-3 rounded-2xl p-6">
        <View className="bg-primary/10 size-12 items-center justify-center rounded-full">
          <Icon as={ShieldCheck} className="text-primary size-6" strokeWidth={2} />
        </View>
        <Text className="text-foreground font-sans-semibold text-center text-lg">
          Enter your code
        </Text>
        <Text className="text-muted-foreground text-center text-sm">
          We sent a 6-digit code to{' '}
          <Text className="text-foreground font-sans-medium">{factor.target_masked}</Text>.
        </Text>
      </View>

      <OtpInput value={code} onChangeText={onChangeCode} onComplete={onComplete} autoFocus />

      <Pressable onPress={onResend} hitSlop={8} className="self-center py-1" disabled={isVerifying}>
        <Text className="text-muted-foreground text-sm">
          Didn&apos;t get it?{' '}
          <Text className="text-primary font-sans-semibold text-sm">Resend code</Text>
        </Text>
      </Pressable>
    </View>
  );
}
