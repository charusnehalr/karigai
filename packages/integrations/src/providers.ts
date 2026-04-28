import type {
  HeartRateSample,
  PermissionStatus,
  StepsSample,
  SleepSample,
  TimeRange,
  WeightSample,
  WorkoutSample
} from '@karigai/types/src/health';

export type HealthDataProvider = {
  requestPermissions(): Promise<PermissionStatus>;
  getPermissionStatus(): Promise<PermissionStatus>;
  readSteps(start: Date, end: Date): Promise<StepsSample[]>;
  readSleep(start: Date, end: Date): Promise<SleepSample[]>;
  readWorkouts(start: Date, end: Date): Promise<WorkoutSample[]>;
  readHeartRate(start: Date, end: Date): Promise<HeartRateSample[]>;
  readWeight(start: Date, end: Date): Promise<WeightSample[]>;
  disconnect(): Promise<void>;
};

export type TodayDashboardSummary = {
  steps: number;
  sleepMinutes: number;
  workoutMinutes: number;
  activeEnergyKcal?: number;
  latestWeightKg?: number;
};

const sum = (values: number[]): number => values.reduce((acc, current) => acc + current, 0);

export const buildTodayDashboardSummary = (
  range: TimeRange,
  steps: StepsSample[],
  sleep: SleepSample[],
  workouts: WorkoutSample[],
  weights: WeightSample[]
): TodayDashboardSummary => {
  const inRange = <T extends { recordedAt?: Date; start?: Date; end?: Date }>(sample: T): boolean => {
    const from = sample.recordedAt ?? sample.start;
    const to = sample.recordedAt ?? sample.end;
    if (!from || !to) return false;
    return from >= range.start && to <= range.end;
  };

  const rangeSteps = steps.filter(inRange);
  const rangeSleep = sleep.filter(inRange);
  const rangeWorkouts = workouts.filter(inRange);
  const rangeWeights = weights.filter(inRange);

  const latestWeight = rangeWeights.sort((a, b) => b.recordedAt.getTime() - a.recordedAt.getTime())[0];

  return {
    steps: sum(rangeSteps.map((sample) => sample.count)),
    sleepMinutes: sum(rangeSleep.map((sample) => sample.durationMinutes)),
    workoutMinutes: sum(rangeWorkouts.map((sample) => (sample.end.getTime() - sample.start.getTime()) / 60000)),
    activeEnergyKcal: sum(rangeWorkouts.map((sample) => sample.activeEnergyKcal ?? 0)) || undefined,
    latestWeightKg: latestWeight?.kg
  };
};
