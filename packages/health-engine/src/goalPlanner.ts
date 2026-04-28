export type WellnessGoal = 'maintain' | 'fat_loss' | 'muscle_gain';

export const planCaloriesByGoal = (tdee: number, goal: WellnessGoal): number => {
  if (goal === 'fat_loss') return Math.max(1200, tdee - 300);
  if (goal === 'muscle_gain') return tdee + 250;
  return tdee;
};
