import { generateDeterministicPlan } from '../../../packages/plan-engine/src/index.js';

const PLAN_STORE = [];

export async function postPlansGenerate(req, res) {
  try {
    const generated = generateDeterministicPlan(req.body);
    const versionedPlan = {
      id: `plan_${PLAN_STORE.length + 1}`,
      version: PLAN_STORE.length + 1,
      createdAt: new Date().toISOString(),
      ...generated,
    };
    PLAN_STORE.push(versionedPlan);
    return res.status(200).json(versionedPlan);
  } catch (error) {
    return res.status(500).json({ error: 'PLAN_GENERATION_FAILED', message: error.message });
  }
}

export function _debugPlans() {
  return PLAN_STORE;
}
