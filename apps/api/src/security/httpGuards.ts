export const secureHeaders = {
  'x-frame-options': 'DENY',
  'x-content-type-options': 'nosniff',
  'referrer-policy': 'strict-origin-when-cross-origin',
  'content-security-policy': "default-src 'self'"
};

export const isRateLimited = (
  requestCountInWindow: number,
  rateLimitPerMinute: number
): { limited: boolean; retryAfterSeconds?: number } => {
  if (requestCountInWindow <= rateLimitPerMinute) return { limited: false };
  return { limited: true, retryAfterSeconds: 60 };
};

export const privacySafeLog = (input: Record<string, unknown>): Record<string, unknown> => {
  const redacted = { ...input };
  if ('email' in redacted) redacted.email = '[REDACTED]';
  if ('phone' in redacted) redacted.phone = '[REDACTED]';
  if ('symptoms' in redacted) redacted.symptoms = '[SENSITIVE_HEALTH_DATA]';
  return redacted;
};
