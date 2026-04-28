import { validatePlanResponse } from './responseValidator';

const unsafePromptPatterns = [/diagnos(e|is)/i, /(supplement|medication)\s+dose/i, /prescribe/i];

export const isUnsafePrompt = (prompt: string): boolean => unsafePromptPatterns.some((pattern) => pattern.test(prompt));

export const runChatPipeline = (candidate: unknown, prompt?: string) => {
  if (prompt && isUnsafePrompt(prompt)) {
    return {
      summary: 'I can share general wellness guidance, but I cannot provide diagnosis or dosage advice.',
      recommendations: ['Consider contacting a licensed clinician for personalized medical support.'],
      safetyNotes: ['This app does not diagnose or prescribe treatment.']
    };
  }

  return validatePlanResponse(candidate);
};
