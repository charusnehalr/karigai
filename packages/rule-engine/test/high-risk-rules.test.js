import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateRules, RULE_ENGINE_VERSION } from '../src/index.js';

const redFlags = [
  'chest pain during workout',
  'fainting',
  'dizziness with heavy bleeding',
  'severe abdominal pain',
  'missed period with pregnancy possibility',
  'shortness of breath with fatigue',
  'severe one-sided pelvic pain',
];

test('versioned results', () => {
  const result = evaluateRules({});
  assert.equal(result.version, RULE_ENGINE_VERSION);
});

for (const symptom of redFlags) {
  test(`red flag blocks planning: ${symptom}`, () => {
    const result = evaluateRules({ symptoms: [symptom] });
    assert.equal(result.status, 'blocked');
    assert.ok(result.results.some((r) => r.action === 'stop'));
  });
}

test('very low calories is blocked', () => {
  const result = evaluateRules({ dailyCalories: 1100 });
  assert.equal(result.status, 'blocked');
  assert.ok(result.results.some((r) => r.id === 'very-low-calorie-intake'));
});

test('eating disorder history is blocked', () => {
  const result = evaluateRules({ eatingDisorderHistory: true });
  assert.equal(result.status, 'blocked');
  assert.ok(result.results.some((r) => r.id === 'eating-disorder-history'));
});

test('danger glucose is blocked', () => {
  const result = evaluateRules({ glucoseMgDl: 350 });
  assert.equal(result.status, 'blocked');
  assert.ok(result.results.some((r) => r.id === 'blood-glucose-danger'));
});
