import type { ReminderPreference, ReminderType } from '@karigai/types/src/user';

export type ReminderPayload = {
  type: ReminderType;
  title: string;
  body: string;
  route: string;
  lockScreenSafe: boolean;
};

const reminderCatalog: Record<ReminderType, Omit<ReminderPayload, 'type'>> = {
  water: {
    title: 'Hydration check-in',
    body: 'Time for a water break if it feels right for you.',
    route: '/today/hydration',
    lockScreenSafe: true
  },
  meal_logging: {
    title: 'Meal log reminder',
    body: 'Log your meal when you have a moment.',
    route: '/today/meals',
    lockScreenSafe: true
  },
  workout: {
    title: 'Movement reminder',
    body: 'A gentle workout can be scheduled for today.',
    route: '/today/workouts',
    lockScreenSafe: true
  },
  symptom_checkin: {
    title: 'Daily check-in',
    body: 'Check in with how your body feels today.',
    route: '/cycle/check-in',
    lockScreenSafe: true
  },
  period_prediction: {
    title: 'Cycle reminder',
    body: 'Your cycle calendar has an upcoming window to review.',
    route: '/cycle/calendar',
    lockScreenSafe: true
  },
  weekly_review: {
    title: 'Weekly review',
    body: 'Your weekly wellness summary is ready.',
    route: '/insights/weekly',
    lockScreenSafe: true
  },
  low_adherence: {
    title: 'Gentle nudge',
    body: 'Small steps count. You can restart anytime.',
    route: '/today',
    lockScreenSafe: true
  }
};

export const getReminderPayload = (type: ReminderType): ReminderPayload => ({
  type,
  ...reminderCatalog[type]
});

export const isWithinQuietHours = (currentHour: number, quietStartHour: number, quietEndHour: number): boolean => {
  if (quietStartHour === quietEndHour) return false;
  if (quietStartHour < quietEndHour) {
    return currentHour >= quietStartHour && currentHour < quietEndHour;
  }
  return currentHour >= quietStartHour || currentHour < quietEndHour;
};

export const shouldSendReminder = (preference: ReminderPreference, currentHour: number): boolean => {
  if (!preference.enabled) return false;

  const quietStartHour = Number(preference.quietHoursStart.split(':')[0]);
  const quietEndHour = Number(preference.quietHoursEnd.split(':')[0]);

  return !isWithinQuietHours(currentHour, quietStartHour, quietEndHour);
};
