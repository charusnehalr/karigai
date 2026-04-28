import { describe, expect, it } from 'vitest';
import { MockHealthDataProvider } from '@karigai/integrations/src';
import { HealthSyncService } from '@karigai/integrations/src/syncService';
import { buildTodayViewModel, validateOnboardingForm } from '../src';

describe('mobile smoke checks', () => {
  it('shows synced dashboard metrics when provider is connected', async () => {
    const service = new HealthSyncService(new MockHealthDataProvider(new Date('2026-04-28T11:00:00.000Z')));
    await service.connect();

    const viewModel = await buildTodayViewModel(service, {
      start: new Date('2026-04-28T00:00:00.000Z'),
      end: new Date('2026-04-28T23:59:59.999Z')
    });

    expect(viewModel.steps).toBeGreaterThan(0);
    expect(viewModel.showManualLoggingCta).toBe(false);
  });

  it('validates onboarding forms', () => {
    expect(
      validateOnboardingForm({
        age: 11,
        heightCm: 118,
        weightKg: 29,
        consentGiven: false
      }).length
    ).toBeGreaterThan(0);
  });
});
