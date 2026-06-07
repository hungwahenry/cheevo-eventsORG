import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import type { InboxNotification } from '@/features/notifications/types';
import { formatMoney } from '@/lib/format/money';
import {
  Banknote,
  CalendarClock,
  Flag,
  MailOpen,
  Megaphone,
  PartyPopper,
  type LucideIcon,
} from 'lucide-react-native';
import { Pressable, View } from 'react-native';

type Props = {
  notification: InboxNotification;
  onPress: () => void;
};

type Presentation = {
  icon: LucideIcon;
  title: string;
  body: string;
};

function presentationFor(notification: InboxNotification): Presentation {
  const data = notification.data as Record<string, any>;

  switch (notification.type) {
    case 'order.first_sale':
      return {
        icon: PartyPopper,
        title: 'First sale 🎉',
        body: 'One of your events just made its first sale.',
      };
    case 'payout.completed':
      return {
        icon: Banknote,
        title: 'Payout completed',
        body:
          data.amount_minor != null && data.currency
            ? `${formatMoney(data.amount_minor, data.currency)} paid to your bank.`
            : 'Your payout has been paid out.',
      };
    case 'payout.failed':
      return {
        icon: Banknote,
        title: 'Payout failed',
        body: data.reason ? String(data.reason) : 'A payout could not be completed.',
      };
    case 'comment.flagged':
      return {
        icon: Flag,
        title: 'Comment reported',
        body: 'A comment on your event was reported.',
      };
    case 'event.starting_soon':
      return {
        icon: CalendarClock,
        title: 'Event starts tomorrow',
        body: 'Finalise your setup before doors open.',
      };
    case 'broadcast.finished':
      return {
        icon: Megaphone,
        title: 'Broadcast sent',
        body: data.subject
          ? `"${data.subject}" reached ${data.sent_count ?? 0} recipients.`
          : 'Your broadcast finished sending.',
      };
    default:
      return { icon: MailOpen, title: 'Notification', body: '' };
  }
}

function relativeTime(iso: string): string {
  const date = new Date(iso);
  const diffSec = Math.max(1, Math.round((Date.now() - date.getTime()) / 1000));
  if (diffSec < 60) return `${diffSec}s`;
  const diffMin = Math.round(diffSec / 60);
  if (diffMin < 60) return `${diffMin}m`;
  const diffHr = Math.round(diffMin / 60);
  if (diffHr < 24) return `${diffHr}h`;
  const diffDay = Math.round(diffHr / 24);
  if (diffDay < 7) return `${diffDay}d`;
  return date.toLocaleDateString();
}

export function InboxRow({ notification, onPress }: Props) {
  const { icon, title, body } = presentationFor(notification);
  const isUnread = notification.read_at === null;

  return (
    <Pressable
      onPress={onPress}
      className={`flex-row gap-3 px-5 py-4 ${isUnread ? 'bg-card' : ''}`}>
      <View className="bg-muted size-10 items-center justify-center rounded-full">
        <Icon as={icon} className="text-foreground" size={18} strokeWidth={2} />
      </View>

      <View className="flex-1 gap-1">
        <View className="flex-row items-start justify-between gap-2">
          <Text
            className={`flex-1 text-sm ${isUnread ? 'font-sans-semibold' : 'font-sans-medium'}`}>
            {title}
          </Text>
          <Text className="text-muted-foreground text-xs">
            {relativeTime(notification.created_at)}
          </Text>
        </View>

        {body ? (
          <Text className="text-muted-foreground text-xs" numberOfLines={2}>
            {body}
          </Text>
        ) : null}
      </View>

      {isUnread ? <View className="bg-primary size-2 self-center rounded-full" /> : null}
    </Pressable>
  );
}
