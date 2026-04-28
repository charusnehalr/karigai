import { describe, expect, it } from 'vitest';
import { createSafetyFlags } from '../src/safetyFlagging';
import { ImmutableAuditLog } from '../src/auditLog';

describe('safety flag and audit systems', () => {
  it('creates safety flags for required trigger reasons', () => {
    const flags = createSafetyFlags(
      {
        userId: 'user-1',
        asksForDiagnosis: true,
        asksForDosage: true,
        redFlagSymptom: true,
        dangerousWorkoutSymptom: true,
        severeCycleSymptom: true,
        aiValidationFailed: true
      },
      new Date('2026-04-28T08:00:00.000Z')
    );

    expect(flags).toHaveLength(6);
    expect(flags.every((flag) => flag.status === 'open')).toBe(true);
  });

  it('stores immutable audit chain with admin user ID', () => {
    const log = new ImmutableAuditLog();

    const first = log.append({ adminUserId: 'admin-1', action: 'admin_login' }, new Date('2026-04-28T08:00:00.000Z'));
    const second = log.append(
      { adminUserId: 'admin-1', action: 'rule_edit', metadata: { ruleId: 'hydration-1' } },
      new Date('2026-04-28T09:00:00.000Z')
    );

    expect(first.adminUserId).toBe('admin-1');
    expect(second.previousEventHash).toBe(first.eventHash);
    expect(log.list()).toHaveLength(2);
  });
});
