export type ConsentStatus = "granted" | "revoked";

export interface ConsentRecord {
  id: string;
  patientId: string;
  consentType: string;
  version: string;
  status: ConsentStatus;
  source: string;
  grantedAt: string;
  revokedAt?: string;
}

export function grantConsent(input: Omit<ConsentRecord, "status" | "grantedAt" | "revokedAt">, now = new Date()): ConsentRecord {
  return { ...input, status: "granted", grantedAt: now.toISOString() };
}

export function revokeConsent(record: ConsentRecord, now = new Date()): ConsentRecord {
  if (record.status === "revoked") return record;
  return { ...record, status: "revoked", revokedAt: now.toISOString() };
}
