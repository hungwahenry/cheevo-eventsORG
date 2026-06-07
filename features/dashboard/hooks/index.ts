import { getDashboard } from '@/features/dashboard/api';
import type { DashboardRange } from '@/features/dashboard/types';
import { useQuery } from '@tanstack/react-query';

export const dashboardKey = (orgId: string, range: DashboardRange) =>
  ['organizer', 'dashboard', orgId, range] as const;

export function useDashboard(orgId: string, range: DashboardRange = '30d') {
  return useQuery({
    queryKey: dashboardKey(orgId, range),
    queryFn: () => getDashboard(orgId, range),
    enabled: !!orgId,
  });
}
