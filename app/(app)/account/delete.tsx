import { ScreenHeader } from '@/components/ui/screen-header';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useDeleteAccount } from '@/features/account';
import { StepUpVerify } from '@/features/account/components/step-up-verify';
import { router } from 'expo-router';
import { TriangleAlert } from 'lucide-react-native';
import { ScrollView, View } from 'react-native';

const REMOVED = [
  'Your account, profile and login',
  'Organisations you own or belong to',
  'Events, tickets, orders and broadcasts tied to them',
];

export default function DeleteAccountScreen() {
  const account = useDeleteAccount();

  return (
    <View className="bg-background flex-1">
      <ScreenHeader title="Delete account" />

      <ScrollView
        contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 20 }}
        keyboardShouldPersistTaps="handled">
        {account.stage === 'confirm' ? (
          <View className="gap-5">
            <View className="bg-destructive/5 items-center gap-3 rounded-2xl p-6">
              <View className="bg-destructive/10 size-12 items-center justify-center rounded-full">
                <Icon as={TriangleAlert} className="text-destructive size-6" strokeWidth={2} />
              </View>
              <Text className="text-foreground font-sans-semibold text-center text-lg">
                Delete your account
              </Text>
              <Text className="text-muted-foreground text-center text-sm">
                This is permanent. Once your account is gone we can&apos;t get it back.
              </Text>
            </View>

            <View className="gap-2">
              <Text className="text-muted-foreground font-sans-semibold text-xs uppercase tracking-wide">
                What we&apos;ll remove
              </Text>
              <View className="bg-muted overflow-hidden rounded-2xl">
                {REMOVED.map((line, i) => (
                  <View
                    key={i}
                    className={`px-4 py-3 ${i < REMOVED.length - 1 ? 'border-border/60 border-b' : ''}`}>
                    <Text className="text-foreground text-sm">{line}</Text>
                  </View>
                ))}
              </View>
            </View>

            <Text className="text-muted-foreground text-center text-xs">
              You&apos;ll get a 6-digit code on your email to confirm.
            </Text>

            <View className="gap-2">
              <Button
                variant="destructive"
                size="lg"
                className="w-full"
                disabled={account.isStarting}
                onPress={account.start}>
                {account.isStarting ? (
                  <Spinner size="sm" barClassName="bg-white" />
                ) : (
                  <Text>Continue to delete</Text>
                )}
              </Button>
              <Button variant="outline" size="lg" className="w-full" onPress={() => router.back()}>
                <Text>Keep my account</Text>
              </Button>
            </View>
          </View>
        ) : null}

        {account.stage === 'verify' && account.nextFactor ? (
          <StepUpVerify
            factor={account.nextFactor}
            factorsTotal={account.factorsTotal}
            factorIndex={account.factorIndex}
            code={account.code}
            onChangeCode={account.setCode}
            onComplete={account.submitCode}
            onResend={account.resend}
            isVerifying={account.isVerifying}
          />
        ) : null}
      </ScrollView>
    </View>
  );
}
