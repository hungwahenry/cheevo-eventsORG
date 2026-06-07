import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { UserAvatar } from '@/components/user-avatar';
import { TicketStatusBadge } from '@/features/checkin/components/ticket-status-badge';
import { holderName, type IssuedTicket } from '@/features/checkin/types';
import { formatTime } from '@/lib/format/datetime';
import { Pressable, View } from 'react-native';

type Props = {
  ticket: IssuedTicket;
  onCheckIn: (code: string) => void;
  onRevoke: (ticket: IssuedTicket) => void;
  busy: boolean;
};

export function AttendeeRow({ ticket, onCheckIn, onRevoke, busy }: Props) {
  const name = holderName(ticket.holder);

  return (
    <Pressable
      onLongPress={() => {
        if (ticket.status !== 'revoked') onRevoke(ticket);
      }}
      className="bg-card gap-3 rounded-2xl p-4">
      <View className="flex-row items-start justify-between gap-3">
        <View className="flex-1 flex-row items-center gap-3">
          <UserAvatar url={ticket.holder.avatar_url} name={name} size={40} />
          <View className="flex-1 gap-0.5">
            <Text className="text-foreground font-sans-semibold text-base" numberOfLines={1}>
              {name}
            </Text>
            <Text className="text-muted-foreground text-sm" numberOfLines={1}>
              {ticket.ticket_name}
            </Text>
          </View>
        </View>
        <TicketStatusBadge status={ticket.status} />
      </View>

      <View className="flex-row items-center justify-between gap-3">
        <Text className="text-muted-foreground flex-1 text-xs" numberOfLines={1}>
          #{ticket.code}
        </Text>
        {ticket.status === 'valid' ? (
          <Button size="sm" disabled={busy} onPress={() => onCheckIn(ticket.code)}>
            {busy ? (
              <Spinner size="sm" barClassName="bg-primary-foreground" />
            ) : (
              <Text>Check in</Text>
            )}
          </Button>
        ) : ticket.status === 'scanned' && ticket.scanned_at ? (
          <Text className="text-muted-foreground text-xs">
            Checked in · {formatTime(ticket.scanned_at)}
          </Text>
        ) : null}
      </View>
    </Pressable>
  );
}
