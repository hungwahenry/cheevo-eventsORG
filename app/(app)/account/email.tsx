import { ScreenHeader } from '@/components/ui/screen-header';
import { Button } from '@/components/ui/button';
import { IconInput } from '@/components/ui/icon-input';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useChangeEmail } from '@/features/account';
import { StepUpVerify } from '@/features/account/components/step-up-verify';
import { Mail } from 'lucide-react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { View } from 'react-native';

export default function ChangeEmailScreen() {
  const account = useChangeEmail();

  return (
    <View className="bg-background flex-1">
      <ScreenHeader title="Change email" />

      <KeyboardAwareScrollView
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 20 }}>
        {account.stage === 'collect' ? (
          <View className="gap-5">
            <Text className="text-muted-foreground text-sm leading-6">
              We&apos;ll send a code to your current email, then to your new one. Both must check out
              before we make the switch.
            </Text>

            <View className="gap-2">
              <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
                Current
              </Text>
              <View className="bg-muted rounded-2xl px-4 py-3">
                <Text className="text-foreground text-sm" numberOfLines={1}>
                  {account.user?.email}
                </Text>
              </View>
            </View>

            <View className="gap-2">
              <Text className="text-muted-foreground font-sans-medium text-xs uppercase tracking-wide">
                New
              </Text>
              <IconInput
                icon={Mail}
                value={account.newEmail}
                onChangeText={account.setNewEmail}
                placeholder="you@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect={false}
                autoFocus
                returnKeyType="go"
                onSubmitEditing={account.start}
              />
            </View>

            <Button size="lg" className="w-full" disabled={account.isStarting} onPress={account.start}>
              {account.isStarting ? (
                <Spinner size="sm" barClassName="bg-primary-foreground" />
              ) : (
                <Text>Continue</Text>
              )}
            </Button>
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
      </KeyboardAwareScrollView>
    </View>
  );
}
