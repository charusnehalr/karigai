import { api } from '../api/client';
import { evaluatePromptSafety } from './ruleEngine';
import { validateStructuredResponse } from './aiSchema';

const INTENTS = [
  'fatigue',
  'cravings',
  'workout adjustment',
  'meal explanation',
  'cycle pattern',
  'weight plateau',
  'water/hydration',
  'sleep',
  'missed period',
  'cramps',
  'general plan question',
];

export function classifyIntent(message) {
  const lower = message.toLowerCase();
  const match = INTENTS.find((intent) => lower.includes(intent.split('/')[0]));
  return match || 'general plan question';
}

export async function runChatPipeline(userMessage, contextProvider) {
  const intent = classifyIntent(userMessage);
  const safetyGate = evaluatePromptSafety({ intent, message: userMessage });

  if (!safetyGate.allowed) {
    return {
      summary: safetyGate.reason,
      likelyContributors: [],
      recommendedActions: [
        {
          action: 'Use non-diagnostic wellness guidance and consult a licensed clinician for diagnosis or medication questions.',
          reason: 'Safety policy restrictions',
          riskLevel: 'low',
        },
      ],
      planChangeProposal: {
        shouldChangePlan: false,
        changeType: 'none',
        requiresUserApproval: true,
        details: 'No direct plan modification from blocked medical request.',
      },
      safetyMessage: 'If symptoms are severe, seek urgent care.',
      shouldSeekMedicalHelp: true,
    };
  }

  const userContext = await contextProvider(intent);
  const payload = { message: userMessage, intent, context: userContext, mode: 'structured_json' };
  const aiResponse = await api.ai.sendMessage(payload);

  validateStructuredResponse(aiResponse);
  return aiResponse;
}
