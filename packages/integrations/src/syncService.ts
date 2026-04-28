import type { PermissionStatus, TimeRange } from '@karigai/types/src/health';
import type { HealthDataProvider, TodayDashboardSummary } from './providers';
import { buildTodayDashboardSummary } from './providers';

export type SyncResult = {
  permissionStatus: PermissionStatus;
  dashboard: TodayDashboardSummary;
  connected: boolean;
};

export class HealthSyncService {
  private connected = false;

  constructor(private readonly provider: HealthDataProvider) {}

  async connect(): Promise<PermissionStatus> {
    const status = await this.provider.requestPermissions();
    this.connected = Object.values(status).some((permission) => permission === 'granted');
    return status;
  }

  async disconnect(): Promise<void> {
    await this.provider.disconnect();
    this.connected = false;
  }

  async syncToday(range: TimeRange): Promise<SyncResult> {
    const permissionStatus = await this.provider.getPermissionStatus();

    if (!this.connected) {
      return {
        permissionStatus,
        connected: false,
        dashboard: {
          steps: 0,
          sleepMinutes: 0,
          workoutMinutes: 0
        }
      };
    }

    const [steps, sleep, workouts, weights] = await Promise.all([
      this.provider.readSteps(range.start, range.end),
      this.provider.readSleep(range.start, range.end),
      this.provider.readWorkouts(range.start, range.end),
      this.provider.readWeight(range.start, range.end)
    ]);

    return {
      permissionStatus,
      connected: true,
      dashboard: buildTodayDashboardSummary(range, steps, sleep, workouts, weights)
    };
  }
}
