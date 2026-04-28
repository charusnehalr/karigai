export const AI_RESPONSE_SCHEMA = {
  type: 'object',
  required: [
    'summary',
    'likelyContributors',
    'recommendedActions',
    'planChangeProposal',
    'safetyMessage',
    'shouldSeekMedicalHelp',
  ],
  properties: {
    summary: { type: 'string' },
    likelyContributors: {
      type: 'array',
      items: {
        type: 'object',
        required: ['factor', 'evidence', 'confidence'],
        properties: {
          factor: {
            enum: ['sleep', 'nutrition', 'cycle', 'hydration', 'workout_load', 'deficiency', 'stress', 'other'],
          },
          evidence: { type: 'string' },
          confidence: { enum: ['low', 'medium', 'high'] },
        },
      },
    },
    recommendedActions: {
      type: 'array',
      items: {
        type: 'object',
        required: ['action', 'reason', 'riskLevel'],
        properties: {
          action: { type: 'string' },
          reason: { type: 'string' },
          riskLevel: { enum: ['low', 'medium', 'high'] },
        },
      },
    },
    planChangeProposal: {
      type: 'object',
      required: ['shouldChangePlan', 'changeType', 'requiresUserApproval', 'details'],
      properties: {
        shouldChangePlan: { type: 'boolean' },
        changeType: { enum: ['workout', 'meal', 'water', 'recovery', 'none'] },
        requiresUserApproval: { type: 'boolean' },
        details: { type: 'string' },
      },
    },
    safetyMessage: { type: 'string' },
    shouldSeekMedicalHelp: { type: 'boolean' },
  },
};

export function validateStructuredResponse(response) {
  const required = AI_RESPONSE_SCHEMA.required;
  const missing = required.filter((key) => response?.[key] === undefined);
  if (missing.length) {
    throw new Error(`AI response missing required keys: ${missing.join(', ')}`);
  }

  if (!Array.isArray(response.likelyContributors) || !Array.isArray(response.recommendedActions)) {
    throw new Error('AI response contains invalid array fields.');
  }

  return true;
}
