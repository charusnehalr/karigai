export interface RuleContext {
  bmi?: number;
  prediabetes?: boolean;
  activityMinutesWeekly?: number;
}

export interface RuleDecision {
  id: string;
  triggered: boolean;
  message: string;
}

export function evaluateLifestyleRules(context: RuleContext): RuleDecision[] {
  return [
    {
      id: 'prediabetes-activity-support',
      triggered: Boolean(context.prediabetes && (context.activityMinutesWeekly ?? 0) < 150),
      message: 'Supportive target: build toward at least 150 minutes/week of brisk walking or similar activity.'
    },
    {
      id: 'healthy-weight-loss',
      triggered: Boolean(context.prediabetes && (context.bmi ?? 0) >= 25),
      message: 'Supportive target: consider a gradual 5-7% weight reduction with clinician guidance.'
    }
  ];
}
