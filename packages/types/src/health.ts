export type HealthMetricSource = 'healthkit' | 'health-connect' | 'manual' | 'mock';

export type TimeRange = {
  start: Date;
  end: Date;
};

export type StepsSample = {
  source: HealthMetricSource;
  count: number;
  recordedAt: Date;
};

export type SleepSample = {
  source: HealthMetricSource;
  start: Date;
  end: Date;
  durationMinutes: number;
};

export type WorkoutSample = {
  source: HealthMetricSource;
  workoutType: 'walk' | 'run' | 'strength' | 'yoga' | 'cycling' | 'other';
  start: Date;
  end: Date;
  activeEnergyKcal?: number;
};

export type HeartRateSample = {
  source: HealthMetricSource;
  bpm: number;
  recordedAt: Date;
};

export type WeightSample = {
  source: HealthMetricSource;
  kg: number;
  recordedAt: Date;
};

export type HealthPermission =
  | 'steps.read'
  | 'sleep.read'
  | 'workouts.read'
  | 'heartRate.read'
  | 'weight.read'
  | 'activeEnergy.read';

export type PermissionState = 'granted' | 'denied' | 'unavailable' | 'unknown';

export type PermissionStatus = Record<HealthPermission, PermissionState>;
