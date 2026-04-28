import type { SafetyFlag, SafetyFlagReason } from '@karigai/types/src/admin';

export type SafetySignalInput = {
  userId: string;
  asksForDiagnosis?: boolean;
  asksForDosage?: boolean;
  redFlagSymptom?: boolean;
  dangerousWorkoutSymptom?: boolean;
  severeCycleSymptom?: boolean;
  aiValidationFailed?: boolean;
  context?: Record<string, unknown>;
};

const reasonFromInput = (input: SafetySignalInput): SafetyFlagReason[] => {
  const reasons: SafetyFlagReason[] = [];

  if (input.redFlagSymptom) reasons.push('red_flag_symptom');
  if (input.aiValidationFailed) reasons.push('ai_validation_failure');
  if (input.asksForDiagnosis) reasons.push('diagnosis_request');
  if (input.asksForDosage) reasons.push('dosage_request');
  if (input.dangerousWorkoutSymptom) reasons.push('dangerous_workout_symptom');
  if (input.severeCycleSymptom) reasons.push('severe_cycle_symptom');

  return reasons;
};

export const createSafetyFlags = (input: SafetySignalInput, now: Date = new Date()): SafetyFlag[] => {
  const reasons = reasonFromInput(input);

  return reasons.map((reason, index) => ({
    id: `${input.userId}:${reason}:${now.getTime()}:${index}`,
    userId: input.userId,
    reason,
    createdAt: now,
    status: 'open',
    context: input.context ?? {}
  }));
};
