const activityFactors = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  high: 1.725
} as const;

export type ActivityLevel = keyof typeof activityFactors;

export const calculateTdee = (bmr: number, activity: ActivityLevel): number => Math.round(bmr * activityFactors[activity]);
