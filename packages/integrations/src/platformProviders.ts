import type {
  HeartRateSample,
  PermissionStatus,
  StepsSample,
  SleepSample,
  WeightSample,
  WorkoutSample
} from '@karigai/types/src/health';
import type { HealthDataProvider } from './providers';

export type NativeHealthBridge = {
  requestPermissions(): Promise<PermissionStatus>;
  getPermissionStatus(): Promise<PermissionStatus>;
  readSteps(start: string, end: string): Promise<StepsSample[]>;
  readSleep(start: string, end: string): Promise<SleepSample[]>;
  readWorkouts(start: string, end: string): Promise<WorkoutSample[]>;
  readHeartRate(start: string, end: string): Promise<HeartRateSample[]>;
  readWeight(start: string, end: string): Promise<WeightSample[]>;
  disconnect(): Promise<void>;
};

class BridgeBackedProvider implements HealthDataProvider {
  constructor(private readonly bridge: NativeHealthBridge) {}

  requestPermissions(): Promise<PermissionStatus> {
    return this.bridge.requestPermissions();
  }

  getPermissionStatus(): Promise<PermissionStatus> {
    return this.bridge.getPermissionStatus();
  }

  readSteps(start: Date, end: Date): Promise<StepsSample[]> {
    return this.bridge.readSteps(start.toISOString(), end.toISOString());
  }

  readSleep(start: Date, end: Date): Promise<SleepSample[]> {
    return this.bridge.readSleep(start.toISOString(), end.toISOString());
  }

  readWorkouts(start: Date, end: Date): Promise<WorkoutSample[]> {
    return this.bridge.readWorkouts(start.toISOString(), end.toISOString());
  }

  readHeartRate(start: Date, end: Date): Promise<HeartRateSample[]> {
    return this.bridge.readHeartRate(start.toISOString(), end.toISOString());
  }

  readWeight(start: Date, end: Date): Promise<WeightSample[]> {
    return this.bridge.readWeight(start.toISOString(), end.toISOString());
  }

  disconnect(): Promise<void> {
    return this.bridge.disconnect();
  }
}

export class IOSHealthKitProvider extends BridgeBackedProvider {
  static readonly id = 'healthkit';
}

export class AndroidHealthConnectProvider extends BridgeBackedProvider {
  static readonly id = 'health-connect';
}
