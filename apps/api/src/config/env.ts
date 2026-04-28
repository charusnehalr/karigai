import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  API_PORT: z.coerce.number().int().min(1).max(65535).default(3000),
  DATABASE_URL: z.string().url(),
  SENTRY_DSN: z.string().url().optional(),
  OTEL_EXPORTER_OTLP_ENDPOINT: z.string().url().optional(),
  RATE_LIMIT_PER_MINUTE: z.coerce.number().int().min(30).default(120)
});

export type ApiEnv = z.infer<typeof envSchema>;

export const validateEnv = (input: Record<string, string | undefined>): ApiEnv => envSchema.parse(input);
