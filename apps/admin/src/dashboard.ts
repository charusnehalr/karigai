export type AdminRole = 'viewer' | 'reviewer' | 'manager';

export const canTakeAction = (role: AdminRole, action: 'approve' | 'revise' | 'block' | 'edit_rule'): boolean => {
  if (role === 'manager') return true;
  if (role === 'reviewer') return action !== 'edit_rule';
  return false;
};

export type AdminEndpoints = {
  operationsOverview: '/v1/admin/overview';
  ruleManager: '/v1/admin/rules';
  aiResponseReview: '/v1/admin/ai-review';
  safetyQueue: '/v1/admin/safety-flags';
};

export const adminEndpoints: AdminEndpoints = {
  operationsOverview: '/v1/admin/overview',
  ruleManager: '/v1/admin/rules',
  aiResponseReview: '/v1/admin/ai-review',
  safetyQueue: '/v1/admin/safety-flags'
};

export const toAdminAuditEvent = (adminUserId: string, action: string) => ({
  adminUserId,
  action,
  createdAt: new Date().toISOString()
});
