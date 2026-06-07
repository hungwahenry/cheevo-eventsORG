import { isApiError } from '@/lib/api';

export type ScanFeedbackKind = 'success' | 'warning' | 'error';

export type ScanFeedback = {
  kind: ScanFeedbackKind;
  title: string;
  message: string;
};

export function scanErrorFeedback(error: unknown): ScanFeedback {
  if (isApiError(error)) {
    switch (error.code) {
      case 'ticket_already_scanned':
        return { kind: 'warning', title: 'Already checked in', message: error.message };
      case 'ticket_revoked':
        return { kind: 'error', title: 'Revoked ticket', message: error.message };
      case 'ticket_wrong_event':
        return { kind: 'error', title: 'Wrong event', message: error.message };
      case 'ticket_code_not_found':
        return { kind: 'error', title: 'Not recognised', message: error.message };
    }
    return { kind: 'error', title: 'Could not scan', message: error.message };
  }
  return { kind: 'error', title: 'Could not scan', message: 'Something went wrong. Try again.' };
}
