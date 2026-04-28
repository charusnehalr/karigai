import { describe, expect, it } from 'vitest';
import {
  calculateBMI,
  categorizeBMI,
  calculateWHR,
  calculateWaistToHeightRatio,
  calculateBRI,
  calculateBMR,
  calculateTDEE,
  calculateGoalPace,
  estimateInitialWeightLossTarget,
  calculateNutritionTargets,
  estimateCyclePhase,
  estimateCycleConfidence,
  normalizeAnthro
} from './index';

describe('health engine', () => {
  it('calculates core metrics', () => {
    expect(calculateBMI(70, 170)).toBeCloseTo(24.22, 2);
    expect(categorizeBMI(28)).toBe('Overweight');
    expect(calculateWHR(80, 100)).toBe(0.8);
    expect(calculateWaistToHeightRatio(80, 170)).toBe(0.47);
    expect(calculateBRI(80, 170)).toBeTypeOf('number');
  });

  it('calculates metabolism and goal pacing', () => {
    expect(calculateBMR({ sex: 'female', weightKg: 65, heightCm: 165, ageYears: 30 })).toBeGreaterThan(1000);
    expect(calculateTDEE(1400, 'moderate')).toBe(2170);
    expect(calculateGoalPace({ currentWeightKg: 80, targetWeightKg: 70, timelineWeeks: 20 }).weeklyKgChange).toBe(-0.5);
  });

  it('supports prediabetes-safe targets', () => {
    const target = estimateInitialWeightLossTarget({ currentWeightKg: 90, conditions: ['prediabetes'] });
    expect(target.targetKg).toBeCloseTo(5.4, 1);
  });

  it('creates nutrition targets', () => {
    const plan = calculateNutritionTargets({ tdee: 2200, goal: 'lose', conditions: [], dietType: 'balanced' });
    expect(plan.calories).toBe(1850);
    expect(plan.proteinG).toBeGreaterThan(100);
  });

  it('estimates cycle and confidence', () => {
    const phase = estimateCyclePhase({
      lastPeriodStart: new Date('2026-04-01'),
      cycleLength: 28,
      periodLength: 5,
      today: new Date('2026-04-14')
    });
    expect(phase).toBe('Ovulation window');

    const confidence = estimateCycleConfidence({ cycleRegularity: 'regular', historicalCycles: 5 });
    expect(confidence.score).toBeGreaterThan(0.8);
  });

  it('normalizes imperial units', () => {
    const normalized = normalizeAnthro({ weight: 154, height: 67, waist: 30, hip: 39, unit: 'imperial' });
    expect(normalized.weightKg).toBeCloseTo(69.8, 1);
    expect(normalized.heightCm).toBeCloseTo(170.18, 2);
  });
});
