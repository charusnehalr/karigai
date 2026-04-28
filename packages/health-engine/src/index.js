const ACTIVITY_FACTORS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  athlete: 1.9,
};

export function bmi(weightKg, heightCm) {
  const m = heightCm / 100;
  return weightKg / (m * m);
}

export function bmiCategory(bmiValue) {
  if (bmiValue < 18.5) return 'Underweight';
  if (bmiValue < 25) return 'Normal';
  if (bmiValue < 30) return 'Overweight';
  return 'Obesity';
}

export function whr(waistCm, hipCm) {
  return waistCm / hipCm;
}

export function waistToHeightRatio(waistCm, heightCm) {
  return waistCm / heightCm;
}

export function bri(waistCm, heightCm) {
  const hM = heightCm / 100;
  const wM = waistCm / 100;
  const ratio = wM / (2 * Math.PI);
  const sq = 1 - (ratio * ratio) / ((hM / 2) * (hM / 2));
  return 364.2 - 365.5 * Math.sqrt(Math.max(0, sq));
}

export function bmr({ sexAtBirth, weightKg, heightCm, ageYears }) {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  return sexAtBirth === 'male' ? base + 5 : base - 161;
}

export function tdee(bmrValue, activityLevel = 'light') {
  return bmrValue * (ACTIVITY_FACTORS[activityLevel] ?? ACTIVITY_FACTORS.light);
}

export function weeklyPace(goal) {
  if (goal === 'lose') return '-0.5 kg/week';
  if (goal === 'gain') return '+0.25 kg/week';
  return 'maintain';
}

export function estimateCyclePhase({ cycleDay, cycleLength = 28 }) {
  if (!cycleDay) return 'Unknown';
  if (cycleDay <= 5) return 'Menstrual';
  if (cycleDay <= Math.round(cycleLength * 0.5)) return 'Follicular';
  if (cycleDay <= Math.round(cycleLength * 0.58)) return 'Ovulatory';
  return 'Luteal';
}

export function analysisFromOnboarding(profile) {
  const bmiValue = bmi(profile.weightKg, profile.heightCm);
  const bmrValue = bmr(profile);
  return {
    bmi: bmiValue,
    bmiCategory: bmiCategory(bmiValue),
    whr: whr(profile.waistCm, profile.hipCm),
    waistToHeightRatio: waistToHeightRatio(profile.waistCm, profile.heightCm),
    bri: bri(profile.waistCm, profile.heightCm),
    bmr: bmrValue,
    tdee: tdee(bmrValue, profile.activityLevel),
    goal: profile.goal,
    targetWeightKg: profile.targetWeightKg,
    recommendedWeeklyPace: weeklyPace(profile.goal),
    estimatedCyclePhase: estimateCyclePhase(profile),
  };
}
