import { describe, expect, it } from 'vitest';
import { runSafetyRules } from '../src/safetyRules';

describe('safety rules', () => {
  it('flags unsafe recommendations', () => {
    const issues = runSafetyRules({
      calories: 900,
      fastingHours: 16,
      mentionsDiagnosis: true,
      prescribesMedication: true
    });

    expect(issues).toHaveLength(4);
  });
});
