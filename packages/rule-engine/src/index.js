export const RULE_ENGINE_VERSION = '1.0.0';

function outcome({ id, category, severity, message, action = 'continue', code }) {
  return { id, category, severity, message, action, code };
}

export function evaluateRules(input) {
  const results = [
    ...generalSafetyRules(input),
    ...pcosSupportiveRules(input),
    ...pcodSupportiveRules(input),
    ...prediabetesSupportiveRules(input),
    ...obesityRules(input),
    ...deficiencyRules(input),
    ...cyclePhaseRules(input),
    ...pregnancyRules(input),
    ...eatingDisorderRules(input),
    ...injuryRules(input),
    ...workoutRedFlagRules(input),
    ...aiSafetyRules(input),
  ];

  return {
    version: RULE_ENGINE_VERSION,
    status: results.some((r) => r.action === 'stop') ? 'blocked' : 'ok',
    results,
  };
}

export function generalSafetyRules({ dailyCalories }) {
  if (dailyCalories && dailyCalories < 1200) {
    return [outcome({ id: 'very-low-calorie-intake', category: 'General safety', severity: 'high', action: 'stop', code: 'MEDICAL_ESCALATE', message: 'Calorie target is too low for unsupervised wellness planning.' })];
  }
  return [];
}

export function pcosSupportiveRules({ conditions = [] }) {
  return conditions.includes('PCOS') ? [outcome({ id: 'pcos-lifestyle', category: 'PCOS-supportive lifestyle', severity: 'info', message: 'Prefer high-fiber carbs, resistance training, and stable meal timing.' })] : [];
}

export function pcodSupportiveRules({ conditions = [] }) {
  return conditions.includes('PCOD') ? [outcome({ id: 'pcod-lifestyle', category: 'PCOD-supportive lifestyle', severity: 'info', message: 'Support consistent sleep, moderate exercise, and lower refined sugars.' })] : [];
}

export function prediabetesSupportiveRules({ conditions = [] }) {
  return conditions.includes('prediabetes') ? [outcome({ id: 'prediabetes-lifestyle', category: 'Prediabetes-supportive lifestyle', severity: 'medium', message: 'Use lower glycemic load meals and post-meal movement.' })] : [];
}

export function obesityRules({ bmi }) {
  return bmi >= 30 ? [outcome({ id: 'high-bmi-handling', category: 'Obesity / high BMI handling', severity: 'medium', message: 'Begin with low-impact activity progression.' })] : [];
}

export function deficiencyRules({ deficiencies = [] }) {
  return deficiencies.map((d) => outcome({ id: `deficiency-${d.toLowerCase()}`, category: 'Deficiency-aware nutrition', severity: 'medium', message: `Increase dietary focus for ${d}.` }));
}

export function cyclePhaseRules({ cyclePhase }) {
  if (!cyclePhase) return [];
  return [outcome({ id: `cycle-phase-${cyclePhase.toLowerCase()}`, category: 'Cycle phase adjustment', severity: 'info', message: `Adjust intensity for ${cyclePhase} phase.` })];
}

export function pregnancyRules({ pregnancyStatus }) {
  if (['pregnant', 'postpartum', 'breastfeeding'].includes(pregnancyStatus)) {
    return [outcome({ id: 'pregnancy-postpartum-care', category: 'Pregnancy / postpartum / breastfeeding', severity: 'high', message: 'Use clinician-cleared exercise and nutrition ranges.' })];
  }
  return [];
}

export function eatingDisorderRules({ eatingDisorderHistory }) {
  return eatingDisorderHistory ? [outcome({ id: 'eating-disorder-history', category: 'Eating disorder risk', severity: 'high', action: 'stop', code: 'MENTAL_HEALTH_ESCALATE', message: 'Avoid restrictive plans and prompt professional support.' })] : [];
}

export function injuryRules({ injuryRestrictions = [] }) {
  return injuryRestrictions.length ? [outcome({ id: 'injury-restrictions', category: 'Injury restrictions', severity: 'high', message: `Exclude movements: ${injuryRestrictions.join(', ')}.` })] : [];
}

export function workoutRedFlagRules(input) {
  const flags = [];
  const s = input.symptoms ?? [];
  if (s.includes('chest pain during workout')) flags.push(outcome({ id: 'chest-pain', category: 'Workout red flags', severity: 'critical', action: 'stop', code: 'ER_NOW', message: 'Stop exercise and seek urgent care for chest pain.' }));
  if (s.includes('fainting')) flags.push(outcome({ id: 'fainting', category: 'Workout red flags', severity: 'critical', action: 'stop', code: 'ER_NOW', message: 'Fainting requires urgent medical assessment.' }));
  if (s.includes('dizziness with heavy bleeding')) flags.push(outcome({ id: 'dizziness-heavy-bleeding', category: 'Workout red flags', severity: 'critical', action: 'stop', code: 'URGENT_GYNE', message: 'Heavy bleeding with dizziness is urgent.' }));
  if (s.includes('severe abdominal pain')) flags.push(outcome({ id: 'severe-abdominal-pain', category: 'Workout red flags', severity: 'critical', action: 'stop', code: 'URGENT_CARE', message: 'Severe abdominal pain should be evaluated urgently.' }));
  if (s.includes('missed period with pregnancy possibility')) flags.push(outcome({ id: 'missed-period-pregnancy', category: 'Workout red flags', severity: 'high', action: 'stop', code: 'PREG_TEST', message: 'Pause high-intensity plans until pregnancy status is known.' }));
  if (s.includes('shortness of breath with fatigue')) flags.push(outcome({ id: 'sob-fatigue', category: 'Workout red flags', severity: 'high', action: 'stop', code: 'MEDICAL_REVIEW', message: 'Shortness of breath with fatigue needs medical review.' }));
  if (s.includes('severe one-sided pelvic pain')) flags.push(outcome({ id: 'one-sided-pelvic-pain', category: 'Workout red flags', severity: 'critical', action: 'stop', code: 'ER_NOW', message: 'Severe one-sided pelvic pain can be emergent.' }));
  if (input.glucoseMgDl && (input.glucoseMgDl < 54 || input.glucoseMgDl > 300)) flags.push(outcome({ id: 'blood-glucose-danger', category: 'Workout red flags', severity: 'critical', action: 'stop', code: 'GLUCOSE_DANGER', message: 'Dangerous glucose value logged; seek immediate medical advice.' }));
  return flags;
}

export function aiSafetyRules({ aiDraftText }) {
  if (!aiDraftText) return [];
  return [outcome({ id: 'wellness-disclaimer', category: 'AI response safety', severity: 'info', message: 'AI text must stay in wellness guidance and avoid diagnosis/treatment claims.' })];
}
