import { validatePlanResponse } from './responseValidator';

export const runChatPipeline = (candidate: unknown) => validatePlanResponse(candidate);
