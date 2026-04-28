import { describe, expect, it } from 'vitest';
import { getReminderPayload, shouldSendReminder } from '../src/reminders';

describe('reminder engine', () => {
  it('returns safe copy and deep links for each reminder type', () => {
    const payload = getReminderPayload('symptom_checkin');
    expect(payload.title).toBeTruthy();
    expect(payload.route).toBe('/cycle/check-in');
    expect(payload.lockScreenSafe).toBe(true);
    expect(payload.body.toLowerCase()).not.toContain('shame');
  });

  it('respects user enable/disable and quiet hours', () => {
    expect(
      shouldSendReminder(
        {
          type: 'water',
          enabled: true,
          quietHoursStart: '22:00',
          quietHoursEnd: '07:00'
        },
        23
      )
    ).toBe(false);

    expect(
      shouldSendReminder(
        {
          type: 'water',
          enabled: false,
          quietHoursStart: '22:00',
          quietHoursEnd: '07:00'
        },
        10
      )
    ).toBe(false);

    expect(
      shouldSendReminder(
        {
          type: 'water',
          enabled: true,
          quietHoursStart: '22:00',
          quietHoursEnd: '07:00'
        },
        14
      )
    ).toBe(true);
  });
});
