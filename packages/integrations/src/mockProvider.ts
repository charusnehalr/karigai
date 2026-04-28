import type {
  HeartRateSample,
  PermissionStatus,
  StepsSample,
  SleepSample,
  WeightSample,
  WorkoutSample
} from '@karigai/types/src/health';
import type { HealthDataProvider } from './providers';

const grantedPermissions: PermissionStatus = {
  'steps.read': 'granted',
  'sleep.read': 'granted',
  'workouts.read': 'granted',
  'heartRate.read': 'granted',
  'weight.read': 'granted',
  'activeEnergy.read': 'granted'
};

export class MockHealthDataProvider implements HealthDataProvider {
  private readonly now: Date;
  private connected = true;

  constructor(now: Date = new Date()) {
    this.now = now;
  }

  async requestPermissions(): Promise<PermissionStatus> {
    return grantedPermissions;
  }

  async getPermissionStatus(): Promise<PermissionStatus> {
    return this.connected
      ? grantedPermissions
      : Object.fromEntries(Object.keys(grantedPermissions).map((key) => [key, 'unknown'])) as PermissionStatus;
  }

  async readSteps(start: Date, end: Date): Promise<StepsSample[]> {
    return [{ source: 'mock', count: this.connected ? 6200 : 0, recordedAt: boundedDate(this.now, start, end) }];
  }

  async readSleep(start: Date, end: Date): Promise<SleepSample[]> {
    return [
      {
        source: 'mock',
        start,
        end: boundedDate(this.now, start, end),
        durationMinutes: this.connected ? 430 : 0
      }
    ];
  }

  async readWorkouts(start: Date, end: Date): Promise<WorkoutSample[]> {
    const workoutEnd = boundedDate(this.now, start, end);
    return [
      {
        source: 'mock',
        workoutType: 'walk',
        start,
        end: workoutEnd,
        activeEnergyKcal: this.connected ? 230 : 0
      }
    ];
  }

  async readHeartRate(_start: Date, _end: Date): Promise<HeartRateSample[]> {
    return [{ source: 'mock', bpm: this.connected ? 76 : 0, recordedAt: this.now }];
  }

  async readWeight(_start: Date, _end: Date): Promise<WeightSample[]> {
    return [{ source: 'mock', kg: this.connected ? 61.8 : 0, recordedAt: this.now }];
  }

  async disconnect(): Promise<void> {
    this.connected = false;
  }
}

const boundedDate = (date: Date, start: Date, end: Date): Date => {
  if (date < start) return start;
  if (date > end) return end;
  return date;
};
