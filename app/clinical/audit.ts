export type AuditOutcome = "success" | "denied" | "failure";

export interface AuditEventInput {
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: AuditOutcome;
  requestId: string;
  scope?: string;
  reason?: string;
}

export interface AuditEvent extends AuditEventInput {
  id: string;
  occurredAt: string;
}

export function createAuditEvent(input: AuditEventInput, now = new Date()): AuditEvent {
  return {
    ...input,
    id: crypto.randomUUID(),
    occurredAt: now.toISOString(),
  };
}

export function createAccessEvent(input: AuditEventInput, now = new Date()): AuditEvent {
  return createAuditEvent({ ...input, action: `access:${input.action}` }, now);
}
