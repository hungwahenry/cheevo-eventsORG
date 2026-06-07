import { useTicketScanner } from '@/features/checkin';
import { CameraPermissionGate } from '@/features/checkin/components/camera-permission-gate';
import { ScanOverlay } from '@/features/checkin/components/scan-overlay';
import { useEvent } from '@/features/events';
import { CameraView } from 'expo-camera';
import { router, useLocalSearchParams } from 'expo-router';
import { View } from 'react-native';

export default function EventScanScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: event } = useEvent(id);
  const { feedback, onScanned, scannedCount, totalCount } = useTicketScanner(id);

  return (
    <CameraPermissionGate>
      <View className="flex-1 bg-black">
        <CameraView
          style={{ flex: 1 }}
          facing="back"
          barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
          onBarcodeScanned={({ data }) => onScanned(data)}
        />
        <ScanOverlay
          title={event?.title ?? 'Check in'}
          scannedCount={scannedCount}
          totalCount={totalCount}
          feedback={feedback}
          onBack={() => router.back()}
        />
      </View>
    </CameraPermissionGate>
  );
}
