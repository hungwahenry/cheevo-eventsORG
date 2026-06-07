import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Text } from '@/components/ui/text';

function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 1).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

type Props = {
  url?: string | null;
  name: string;
  size?: number;
};

export function UserAvatar({ url, name, size = 40 }: Props) {
  return (
    <Avatar alt={name} style={{ width: size, height: size }}>
      {url ? <AvatarImage source={{ uri: url }} /> : null}
      <AvatarFallback>
        <Text className="text-muted-foreground font-sans-semibold" style={{ fontSize: size * 0.38 }}>
          {initials(name)}
        </Text>
      </AvatarFallback>
    </Avatar>
  );
}
