import { planResponseSchema, type PlanResponse } from './schemas/planResponse';

export const validatePlanResponse = (input: unknown): PlanResponse => planResponseSchema.parse(input);
