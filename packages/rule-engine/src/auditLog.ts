import { createHash } from 'node:crypto';
import type { AuditAction, AuditEvent } from '@karigai/types/src/admin';

export type AuditEventInput = {
  adminUserId: string;
  action: AuditAction;
  metadata?: Record<string, unknown>;
};

export class ImmutableAuditLog {
  private events: AuditEvent[] = [];

  append(input: AuditEventInput, now: Date = new Date()): AuditEvent {
    const previousEvent = this.events[this.events.length - 1];
    const payload = `${input.adminUserId}|${input.action}|${JSON.stringify(input.metadata ?? {})}|${now.toISOString()}|${
      previousEvent?.eventHash ?? ''
    }`;
    const eventHash = createHash('sha256').update(payload).digest('hex');

    const event: AuditEvent = {
      id: `${input.adminUserId}:${now.getTime()}:${this.events.length}`,
      adminUserId: input.adminUserId,
      action: input.action,
      createdAt: now,
      metadata: input.metadata ?? {},
      previousEventHash: previousEvent?.eventHash,
      eventHash
    };

    this.events = [...this.events, event];
    return event;
  }

  list(): readonly AuditEvent[] {
    return this.events;
  }
}
