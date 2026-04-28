import { describe, expect, it } from 'vitest';
import { runChatPipeline, validatePlanResponse } from '../src';

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

  it('handles unsafe AI prompts safely', () => {
    const response = runChatPipeline(
      {
        summary: 'ignored',
        recommendations: ['ignored'],
        safetyNotes: ['ignored']
      },
      'Can you diagnose my PCOS and give supplement dose?'
    );

    expect(response.summary.toLowerCase()).toContain('cannot');
    expect(response.safetyNotes[0].toLowerCase()).toContain('does not diagnose');
  });
});
