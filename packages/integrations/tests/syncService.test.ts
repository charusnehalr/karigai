import { describe, expect, it } from 'vitest';
import { HealthSyncService } from '../src/syncService';
import { MockHealthDataProvider } from '../src/mockProvider';

describe('HealthSyncService', () => {
  const range = {
    start: new Date('2026-04-28T00:00:00.000Z'),
    end: new Date('2026-04-28T23:59:59.999Z')
  };

  it('syncs steps, sleep, workouts and weight for today dashboard', async () => {
    const provider = new MockHealthDataProvider(new Date('2026-04-28T10:00:00.000Z'));
    const service = new HealthSyncService(provider);

    await service.connect();
    const result = await service.syncToday(range);

    expect(result.connected).toBe(true);
    expect(result.dashboard.steps).toBeGreaterThan(0);
    expect(result.dashboard.sleepMinutes).toBeGreaterThan(0);
    expect(result.dashboard.workoutMinutes).toBeGreaterThan(0);
    expect(result.dashboard.activeEnergyKcal).toBeGreaterThan(0);
    expect(result.dashboard.latestWeightKg).toBeGreaterThan(0);
  });

  it('allows manual logging fallback when permissions are refused/disconnected', async () => {
    const provider = new MockHealthDataProvider(new Date('2026-04-28T10:00:00.000Z'));
    const service = new HealthSyncService(provider);

    await service.connect();
    await service.disconnect();

    const result = await service.syncToday(range);

    expect(result.connected).toBe(false);
    expect(result.dashboard.steps).toBe(0);
    expect(result.dashboard.sleepMinutes).toBe(0);
  });
});
