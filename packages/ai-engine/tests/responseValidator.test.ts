import { describe, expect, it } from 'vitest';
import { validatePlanResponse } from '../src/responseValidator';

describe('AI schema validation', () => {
  it('accepts valid structured output', () => {
    const parsed = validatePlanResponse({
      summary: 'Weekly plan ready',
      recommendations: ['Walk 20 minutes daily'],
      safetyNotes: ['Not medical advice']
    });

    expect(parsed.summary).toBe('Weekly plan ready');
  });

  it('rejects invalid output', () => {
    expect(() => validatePlanResponse({ summary: '' })).toThrow();
  });
});
