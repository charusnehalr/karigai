const HIGH_RISK_INTENTS = new Set(['missed period', 'cramps']);

export function buildSafetyFlags({ symptomLog, cycleEvent }) {
  const severePain = (symptomLog?.painScore || 0) >= 8;
  const heavyBleeding = symptomLog?.flow === 'heavy' || symptomLog?.flow === 'very-heavy';
  const dizziness = Boolean(symptomLog?.dizziness);
  const missedPeriod = cycleEvent?.type === 'missed_period';

  return {
    severePain,
    heavyBleeding,
    dizziness,
    missedPeriod,
    requiresBanner: severePain || heavyBleeding || dizziness,
    requiresClinicalPrompt: severePain || dizziness || missedPeriod,
  };
}

export function evaluatePromptSafety({ intent, message }) {
  const lower = message.toLowerCase();
  const medicationRequest = lower.includes('dose') || lower.includes('prescribe');
  const diagnosisRequest = lower.includes('diagnose') || lower.includes('what condition do i have');

  if (medicationRequest || diagnosisRequest) {
    return {
      allowed: false,
      reason: 'The assistant cannot diagnose or prescribe medication/supplement doses.',
    };
  }

  return {
    allowed: true,
    elevatedRisk: HIGH_RISK_INTENTS.has(intent),
  };
}

export function cycleConfidenceTag(variabilityDays) {
  if (variabilityDays >= 8) return { label: 'low', score: 0.35 };
  if (variabilityDays >= 4) return { label: 'medium', score: 0.65 };
  return { label: 'high', score: 0.9 };
}
