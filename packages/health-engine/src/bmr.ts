export type SexAtBirth = 'female' | 'male';

export const calculateBmr = (weightKg: number, heightCm: number, ageYears: number, sexAtBirth: SexAtBirth): number => {
  const base = 10 * weightKg + 6.25 * heightCm - 5 * ageYears;
  const adjusted = sexAtBirth === 'female' ? base - 161 : base + 5;
  return Math.round(adjusted);
};
