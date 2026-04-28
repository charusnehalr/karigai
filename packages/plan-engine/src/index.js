import { evaluateRules } from '../../rule-engine/src/index.js';

export function generateDeterministicPlan(input) {
  const ruleCheck = evaluateRules(input);
  if (ruleCheck.status === 'blocked') {
    return {
      blocked: true,
      ruleCheck,
      explanation: 'Plan generation stopped by safety rules.',
    };
  }

  const dailyCalories = Math.round((input.tdee ?? 2000) + goalAdjustment(input.goal));
  const protein = Math.round((dailyCalories * 0.3) / 4);
  const carbs = Math.round((dailyCalories * 0.4) / 4);
  const fats = Math.round((dailyCalories * 0.3) / 9);

  const plan = {
    weeklyNutritionTargets: {
      calories: dailyCalories * 7,
      proteinG: protein * 7,
      carbsG: carbs * 7,
      fatsG: fats * 7,
    },
    dailyCalorieTarget: dailyCalories,
    macroTargets: { proteinG: protein, carbsG: carbs, fatsG: fats },
    microPriorityTargets: input.deficiencies ?? [],
    waterTargetLiters: input.weightKg ? Number((input.weightKg * 0.033).toFixed(1)) : 2.2,
    weeklyWorkoutSchedule: deterministicWorkoutSchedule(input.availableWorkoutOptions ?? ['walk', 'strength']),
    dailyWorkout: '30 minutes planned movement',
    backupWorkout: '20 minute brisk walk',
    dailyChecklist: ['log breakfast', 'drink water', 'complete workout', 'log symptoms', 'log period if needed', 'evening check-in'],
    cycleAwareNotes: input.currentCyclePhase ? [`Training tuned for ${input.currentCyclePhase} phase.`] : [],
    safetyNotes: ruleCheck.results.map((r) => r.message),
  };

  return {
    blocked: false,
    ruleCheck,
    plan,
    explanation: 'Deterministic calorie/macro formulas + rules-based adjustments were applied.',
  };
}

function goalAdjustment(goal) {
  if (goal === 'lose') return -400;
  if (goal === 'gain') return 250;
  return 0;
}

function deterministicWorkoutSchedule(options) {
  const base = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  return base.map((day, idx) => ({ day, workout: options[idx % options.length] }));
}
