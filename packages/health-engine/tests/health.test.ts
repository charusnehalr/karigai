import { describe, expect, it } from 'vitest';
import { calculateBmi, calculateBmr, calculateBri, calculateTdee, calculateWhr, estimateCyclePhase, planCaloriesByGoal } from '../src';

describe('health engine metrics', () => {
  it('calculates BMI', () => {
    expect(calculateBmi(60, 165)).toBe(22.04);
  });

  it('calculates WHR', () => {
    expect(calculateWhr(75, 95)).toBe(0.79);
  });

  it('calculates BRI', () => {
    expect(calculateBri(80, 165)).toBeTypeOf('number');
  });

  it('calculates BMR', () => {
    expect(calculateBmr(60, 165, 30, 'female')).toBe(1320);
  });

  it('calculates TDEE', () => {
    expect(calculateTdee(1320, 'moderate')).toBe(2046);
  });

  it('estimates cycle phase', () => {
    expect(estimateCyclePhase(2)).toBe('menstrual');
    expect(estimateCyclePhase(12)).toBe('ovulatory');
  });

  it('plans calories by goal with floor', () => {
    expect(planCaloriesByGoal(1400, 'fat_loss')).toBe(1200);
  });
});
