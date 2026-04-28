export type SafetyFlagReason =
  | 'red_flag_symptom'
  | 'ai_validation_failure'
  | 'diagnosis_request'
  | 'dosage_request'
  | 'dangerous_workout_symptom'
  | 'severe_cycle_symptom';

export type SafetyFlagStatus = 'open' | 'in_review' | 'resolved';

export type SafetyFlag = {
  id: string;
  userId: string;
  reason: SafetyFlagReason;
  createdAt: Date;
  status: SafetyFlagStatus;
  context: Record<string, unknown>;
};

export type AuditAction =
  | 'admin_login'
  | 'rule_edit'
  | 'ai_response_approval'
  | 'ai_response_block'
  | 'consent_update'
  | 'data_export'
  | 'account_deletion'
  | 'health_data_access';

export type AuditEvent = {
  id: string;
  adminUserId: string;
  action: AuditAction;
  createdAt: Date;
  metadata: Record<string, unknown>;
  previousEventHash?: string;
  eventHash: string;
};

export type RuleVersionStatus = 'live' | 'staged' | 'draft';

export type RuleDefinition = {
  id: string;
  category: string;
  name: string;
  version: number;
  status: RuleVersionStatus;
};
