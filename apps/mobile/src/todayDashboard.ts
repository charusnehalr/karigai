import { HealthSyncService } from '@karigai/integrations/src';
import type { TimeRange } from '@karigai/types/src/health';

export const buildTodayViewModel = async (service: HealthSyncService, range: TimeRange) => {
  const syncResult = await service.syncToday(range);
  return {
    ...syncResult.dashboard,
    showManualLoggingCta: !syncResult.connected
  };
};
