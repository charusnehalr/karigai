export type ReminderType =
  | 'water'
  | 'meal_logging'
  | 'workout'
  | 'symptom_checkin'
  | 'period_prediction'
  | 'weekly_review'
  | 'low_adherence';

export type ReminderPreference = {
  type: ReminderType;
  enabled: boolean;
  quietHoursStart: string;
  quietHoursEnd: string;
};

export type UserProfile = {
  id: string;
  timezone: string;
  reminderPreferences: ReminderPreference[];
};
