import { ScreenHeader } from '@/components/ui/screen-header';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';
import { Text } from '@/components/ui/text';
import { useExportData } from '@/features/account';
import { ScrollView, View } from 'react-native';

const INCLUDED = [
  'Your account and profile',
  'Organisations you own or belong to',
  'Events, orders, tickets and broadcasts',
];

export default function DataExportScreen() {
  const { exportData, isExporting } = useExportData();

  return (
    <View className="bg-background flex-1">
      <ScreenHeader title="Export my data" />

      <ScrollView contentContainerStyle={{ padding: 24, paddingTop: 8, gap: 16 }}>
        <Text className="text-muted-foreground text-sm leading-6">
          We&apos;ll generate a JSON file with everything we have on you. Save it, email it to
          yourself, or hand it to another service.
        </Text>

        <View className="gap-2">
          <Text className="text-muted-foreground font-sans-semibold text-xs uppercase tracking-wide">
            What&apos;s included
          </Text>
          <View className="bg-muted overflow-hidden rounded-2xl">
            {INCLUDED.map((line, i) => (
              <View
                key={i}
                className={`px-4 py-3 ${i < INCLUDED.length - 1 ? 'border-border/60 border-b' : ''}`}>
                <Text className="text-foreground text-sm">{line}</Text>
              </View>
            ))}
          </View>
        </View>

        <Button size="lg" className="w-full" disabled={isExporting} onPress={exportData}>
          {isExporting ? (
            <Spinner size="sm" barClassName="bg-primary-foreground" />
          ) : (
            <Text>Export</Text>
          )}
        </Button>
      </ScrollView>
    </View>
  );
}
