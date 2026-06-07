import { useIssuedTicketCount, useScanTicket } from '@/features/checkin/hooks';
import { scanErrorFeedback, type ScanFeedback } from '@/features/checkin/scan-feedback';
import { holderName } from '@/features/checkin/types';
import { haptics } from '@/lib/haptics';
import { useRef, useState } from 'react';

const FEEDBACK_DURATION = 1800;

export function useTicketScanner(eventId: string) {
  const scan = useScanTicket(eventId, { silent: true });
  const { data: scannedCount } = useIssuedTicketCount(eventId, 'scanned');
  const { data: totalCount } = useIssuedTicketCount(eventId);

  const [feedback, setFeedback] = useState<ScanFeedback | null>(null);
  const lockRef = useRef(false);

  async function onScanned(code: string) {
    if (lockRef.current || !code) return;
    lockRef.current = true;

    try {
      const ticket = await scan.mutateAsync(code.trim());
      haptics.success();
      setFeedback({ kind: 'success', title: 'Checked in', message: holderName(ticket.holder) });
    } catch (e) {
      const fb = scanErrorFeedback(e);
      if (fb.kind === 'warning') haptics.warning();
      else haptics.error();
      setFeedback(fb);
    }

    setTimeout(() => {
      setFeedback(null);
      lockRef.current = false;
    }, FEEDBACK_DURATION);
  }

  return { feedback, onScanned, scannedCount, totalCount };
}
