export type ConsentType =
  | 'terms'
  | 'privacy_policy'
  | 'health_data_processing'
  | 'ai_personalization'
  | 'device_sync'
  | 'cycle_tracking'
  | 'nutrition_tracking'
  | 'research_optional';

export interface GoalPlan {
  currentWeightKg: number;
  targetWeightKg: number;
  timelineWeeks: number;
}

export interface NutritionTarget {
  calories: number;
  proteinG: number;
  fatsG: number;
  carbsG: number;
  explanation: string;
}
