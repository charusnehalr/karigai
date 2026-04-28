import test from 'node:test';
import assert from 'node:assert/strict';
import { generateDeterministicPlan } from '../src/index.js';

test('generates deterministic plan for normal profile', () => {
  const out = generateDeterministicPlan({
    tdee: 2100,
    goal: 'lose',
    deficiencies: ['iron'],
    availableWorkoutOptions: ['walk', 'yoga'],
    weightKg: 70,
    currentCyclePhase: 'Luteal',
  });
  assert.equal(out.blocked, false);
  assert.equal(out.plan.dailyCalorieTarget, 1700);
  assert.equal(out.plan.weeklyWorkoutSchedule.length, 7);
});

test('blocked profile from red flag', () => {
  const out = generateDeterministicPlan({ symptoms: ['fainting'] });
  assert.equal(out.blocked, true);
});
