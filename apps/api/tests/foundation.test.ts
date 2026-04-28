import { describe, expect, it } from 'vitest';
import { isRateLimited, privacySafeLog, validateEnv } from '../src';

describe('api production foundations', () => {
  it('validates required environment variables', () => {
    const env = validateEnv({
      NODE_ENV: 'production',
      API_PORT: '3001',
      DATABASE_URL: 'https://db.example.com',
      RATE_LIMIT_PER_MINUTE: '90'
    });

    expect(env.NODE_ENV).toBe('production');
    expect(env.API_PORT).toBe(3001);
  });

  it('applies rate limiting and privacy-safe logging', () => {
    expect(isRateLimited(100, 90).limited).toBe(true);
    expect(isRateLimited(20, 90).limited).toBe(false);

    const log = privacySafeLog({
      email: 'user@example.com',
      symptoms: 'heavy bleeding',
      action: 'sync_health'
    });

    expect(log.email).toBe('[REDACTED]');
    expect(log.symptoms).toBe('[SENSITIVE_HEALTH_DATA]');
  });
});
