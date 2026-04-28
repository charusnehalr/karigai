export type UnitSystem = 'metric' | 'imperial';

const LB_TO_KG = 0.45359237;
const IN_TO_CM = 2.54;

function toKg(weight: number, unit: UnitSystem): number {
  return unit === 'metric' ? weight : weight * LB_TO_KG;
}

function toCm(length: number, unit: UnitSystem): number {
  return unit === 'metric' ? length : length * IN_TO_CM;
}

export function calculateBMI(weightKg: number, heightCm: number): number {
  const m = heightCm / 100;
  return Number((weightKg / (m * m)).toFixed(2));
}

export function categorizeBMI(bmi: number): string {
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal';
  if (bmi < 30) return 'Overweight';
  return 'Obesity range';
}

export function calculateWHR(waistCm: number, hipCm: number): number {
  return Number((waistCm / hipCm).toFixed(2));
}

export function calculateWaistToHeightRatio(waistCm: number, heightCm: number): number {
  return Number((waistCm / heightCm).toFixed(2));
}

export function calculateBRI(waistCm: number, heightCm: number): number {
  const ratio = waistCm / (2 * Math.PI);
  const h = heightCm / 2;
  const value = 364.2 - 365.5 * Math.sqrt(1 - (ratio * ratio) / (h * h));
  return Number(value.toFixed(2));
}

export function calculateBMR(input: {
  sex: 'female' | 'male';
  weightKg: number;
  heightCm: number;
  ageYears: number;
}): number {
  const base = 10 * input.weightKg + 6.25 * input.heightCm - 5 * input.ageYears;
  return Math.round(base + (input.sex === 'male' ? 5 : -161));
}

export function calculateTDEE(bmr: number, activityLevel: 'low' | 'light' | 'moderate' | 'high'): number {
  const factors = { low: 1.2, light: 1.375, moderate: 1.55, high: 1.725 } as const;
  return Math.round(bmr * factors[activityLevel]);
}

export function calculateGoalPace(input: { currentWeightKg: number; targetWeightKg: number; timelineWeeks: number }) {
  const delta = input.targetWeightKg - input.currentWeightKg;
  return {
    weeklyKgChange: Number((delta / input.timelineWeeks).toFixed(2)),
    explanation: 'A gradual weekly pace supports sustainable wellness habits.'
  };
}

export function estimateInitialWeightLossTarget(input: { currentWeightKg: number; conditions: string[] }) {
  const hasPrediabetes = input.conditions.includes('prediabetes');
  const percent = hasPrediabetes ? 0.06 : 0.04;
  return {
    targetKg: Number((input.currentWeightKg * percent).toFixed(2)),
    explanation:
      hasPrediabetes
        ? 'Supportive target starts around 5-7% weight change with regular activity (non-diagnostic guidance).'
        : 'Initial modest target starts around 3-5% for sustainable progress.'
  };
}

export function calculateNutritionTargets(input: {
  tdee: number;
  goal: 'lose' | 'maintain' | 'gain';
  conditions: string[];
  dietType: 'balanced' | 'high-protein';
}) {
  const adjustment = input.goal === 'lose' ? -350 : input.goal === 'gain' ? 250 : 0;
  const calories = input.tdee + adjustment;
  const proteinRatio = input.dietType === 'high-protein' ? 0.3 : 0.25;
  return {
    calories,
    proteinG: Math.round((calories * proteinRatio) / 4),
    fatsG: Math.round((calories * 0.3) / 9),
    carbsG: Math.round((calories * (1 - proteinRatio - 0.3)) / 4),
    explanation: 'Targets are wellness-oriented estimates and should be personalized with a clinician when needed.'
  };
}

export function estimateCyclePhase(input: {
  lastPeriodStart: Date;
  cycleLength: number;
  periodLength: number;
  today: Date;
}) {
  const daysSince = Math.floor((input.today.getTime() - input.lastPeriodStart.getTime()) / 86400000);
  const day = ((daysSince % input.cycleLength) + input.cycleLength) % input.cycleLength;
  if (day < input.periodLength) return 'Menstrual';
  if (day < 13) return 'Follicular';
  if (day < 16) return 'Ovulation window';
  return 'Luteal';
}

export function estimateCycleConfidence(input: {
  cycleRegularity: 'regular' | 'irregular' | 'unsure';
  historicalCycles: number;
}) {
  const base = input.cycleRegularity === 'regular' ? 0.75 : input.cycleRegularity === 'irregular' ? 0.45 : 0.35;
  const adjusted = Math.min(0.95, base + input.historicalCycles * 0.02);
  return {
    score: Number(adjusted.toFixed(2)),
    explanation: 'Confidence improves with more logs; estimates are supportive and not diagnostic.'
  };
}

export function normalizeAnthro(input: {
  weight: number;
  height: number;
  waist: number;
  hip: number;
  unit: UnitSystem;
}) {
  return {
    weightKg: toKg(input.weight, input.unit),
    heightCm: toCm(input.height, input.unit),
    waistCm: toCm(input.waist, input.unit),
    hipCm: toCm(input.hip, input.unit)
  };
}
