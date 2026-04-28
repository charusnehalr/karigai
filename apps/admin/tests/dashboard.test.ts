import { describe, expect, it } from 'vitest';
import { adminEndpoints, canTakeAction } from '../src';

describe('admin dashboard foundation', () => {
  it('uses real API endpoint paths', () => {
    expect(adminEndpoints.operationsOverview).toBe('/v1/admin/overview');
    expect(adminEndpoints.safetyQueue).toBe('/v1/admin/safety-flags');
  });

  it('supports role-based access decisions', () => {
    expect(canTakeAction('viewer', 'approve')).toBe(false);
    expect(canTakeAction('reviewer', 'approve')).toBe(true);
    expect(canTakeAction('manager', 'edit_rule')).toBe(true);
  });
});
