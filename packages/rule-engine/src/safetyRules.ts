export type PlanInput = {
  calories: number;
  fastingHours: number;
  mentionsDiagnosis: boolean;
  prescribesMedication: boolean;
};

export const runSafetyRules = (input: PlanInput): string[] => {
  const issues: string[] = [];
  if (input.calories < 1200) issues.push('Calories below safe floor for this wellness app.');
  if (input.fastingHours > 14) issues.push('Fasting recommendation is too aggressive.');
  if (input.mentionsDiagnosis) issues.push('Diagnosis-like language is not allowed.');
  if (input.prescribesMedication) issues.push('Medication recommendations are not allowed.');
  return issues;
};
