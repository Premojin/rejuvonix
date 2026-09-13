export type CrmEventCategory =
  | "CONTACT_CREATED" | "CONTACT_UPDATED" | "OPPORTUNITY_UPDATED" | "WORKFLOW_UPDATED"
  | "APPOINTMENT_CREATED" | "APPOINTMENT_UPDATED" | "COMMUNICATION_STATUS_CHANGED"
  | "PAYMENT_UPDATED" | "PROVIDER_ERROR";

export interface CrmEvent {
  provider: string;
  eventId: string;
  eventType: CrmEventCategory;
  entityType: string;
  entityId: string;
  occurredAt: string;
  correlationId?: string;
}

export type CrmEventReceiptStatus = "RECEIVED" | "QUEUED" | "PROCESSING" | "PROCESSED" | "FAILED" | "IGNORED";

export interface CrmEventReceipt {
  provider: string;
  eventId: string;
  receivedAt: string;
  processedAt?: string;
  status: CrmEventReceiptStatus;
}

export function isDuplicateCrmEvent(event: Pick<CrmEvent, "provider" | "eventId">, seen: ReadonlySet<string>): boolean {
  return seen.has(`${event.provider}:${event.eventId}`);
}

export function crmEventKey(event: Pick<CrmEvent, "provider" | "eventId">): string {
  return `${event.provider}:${event.eventId}`;
}
