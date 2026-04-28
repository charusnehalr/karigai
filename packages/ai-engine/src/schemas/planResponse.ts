import { z } from 'zod';

export const planResponseSchema = z.object({
  summary: z.string().min(1),
  recommendations: z.array(z.string()),
  safetyNotes: z.array(z.string())
});

export type PlanResponse = z.infer<typeof planResponseSchema>;
