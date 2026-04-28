import { z } from 'zod';

export const readHealthDataSchema = z.object({
  userId: z.string().min(1),
  start: z.string().datetime(),
  end: z.string().datetime()
});

export type ReadHealthDataRequest = z.infer<typeof readHealthDataSchema>;
