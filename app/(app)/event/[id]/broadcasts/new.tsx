import { ScreenHeader } from '@/components/ui/screen-header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { Textarea } from '@/components/ui/textarea';
import { useCreateBroadcast, useSendTestBroadcast } from '@/features/broadcasts';
import { SUBJECT_MAX, textToHtml, type BroadcastAudience } from '@/features/broadcasts/types';
import { isApiError } from '@/lib/api';
import { haptics } from '@/lib/haptics';
import { router, useGlobalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { toast } from 'sonner-native';

const AUDIENCES: { label: string; value: BroadcastAudience }[] = [
  { label: 'Ticket holders', value: 'ticket_holders' },
  { label: 'RSVPers', value: 'rsvpers' },
  { label: 'Both', value: 'both' },
];

export default function NewBroadcastScreen() {
  const { id } = useGlobalSearchParams<{ id: string }>();
  const [audience, setAudience] = useState<BroadcastAudience>('ticket_holders');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const create = useCreateBroadcast(id);
  const test = useSendTestBroadcast(id);

  const canSubmit = subject.trim().length >= 3 && message.trim().length >= 3;

  function onValidationError(error: unknown) {
    if (isApiError(error) && error.isValidation) {
      toast.error(error.message);
    }
  }

  function sendTest() {
    if (!canSubmit) {
      toast.error('Add a subject and message first.');
      return;
    }
    haptics.select();
    test.mutate(
      { audience, subject: subject.trim(), body_html: textToHtml(message) },
      {
        onSuccess: () => toast.success('Test sent to your email.'),
        onError: onValidationError,
      }
    );
  }

  function send() {
    if (!canSubmit) {
      toast.error('Add a subject and message first.');
      return;
    }
    haptics.select();
    create.mutate(
      { audience, subject: subject.trim(), body_html: textToHtml(message) },
      {
        onSuccess: () => {
          haptics.success();
          toast.success('Broadcast queued.');
          router.back();
        },
        onError: onValidationError,
      }
    );
  }

  return (
    <View className="bg-background flex-1">
      <ScreenHeader />

      <KeyboardAwareScrollView
        bottomOffset={24}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 20 }}>
        <Text className="text-foreground font-sans-extrabold text-2xl tracking-tight">
          New broadcast
        </Text>

        <View className="gap-2">
          <Text className="text-foreground font-sans-medium text-sm">Audience</Text>
          <View className="flex-row gap-2">
            {AUDIENCES.map((a) => {
              const active = audience === a.value;
              return (
                <Pressable
                  key={a.value}
                  onPress={() => {
                    haptics.select();
                    setAudience(a.value);
                  }}
                  className={`rounded-full px-3 py-2 ${active ? 'bg-primary' : 'bg-muted'}`}>
                  <Text
                    className={`font-sans-medium text-xs ${
                      active ? 'text-primary-foreground' : 'text-muted-foreground'
                    }`}>
                    {a.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View className="gap-2">
          <Text className="text-foreground font-sans-medium text-sm">Subject</Text>
          <Input
            value={subject}
            onChangeText={setSubject}
            placeholder="What's this about?"
            maxLength={SUBJECT_MAX}
            returnKeyType="next"
          />
        </View>

        <View className="gap-2">
          <Text className="text-foreground font-sans-medium text-sm">Message</Text>
          <Textarea
            value={message}
            onChangeText={setMessage}
            placeholder="Write your message to attendees…"
            maxLength={4500}
            className="min-h-40"
          />
          <Text className="text-muted-foreground text-xs">
            Sent as an email to the selected audience.
          </Text>
        </View>

        <View className="gap-3">
          <Button disabled={!canSubmit || create.isPending} onPress={send} size="lg">
            {create.isPending ? (
              <Spinner size="sm" barClassName="bg-primary-foreground" />
            ) : (
              <Text>Send broadcast</Text>
            )}
          </Button>
          <Button
            variant="outline"
            disabled={!canSubmit || test.isPending}
            onPress={sendTest}
            size="lg">
            {test.isPending ? <Spinner size="sm" /> : <Text>Send test to me</Text>}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </View>
  );
}
