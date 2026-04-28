export interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export function buildSafetySystemPrompt(): string {
  return 'Karigai AI gives wellness support and does not diagnose disease.';
}

export function summarizeConversation(messages: AIMessage[]): string {
  return messages.slice(-3).map((m) => `${m.role}: ${m.content}`).join('\n');
}
