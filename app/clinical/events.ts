import type { NodePgDatabase } from "drizzle-orm/node-postgres";
import { accessEvents, auditEvents, securityEvents } from "../../db/postgres-schema";
import type { clinicalSchema } from "../../db/postgres-schema";

type ClinicalDb = NodePgDatabase<typeof clinicalSchema>;

export async function recordAudit(db: ClinicalDb, input: {
  actorId: string;
  action: string;
  resourceType: string;
  resourceId: string;
  outcome: string;
  requestId: string;
  scope?: string;
  reason?: string;
  metadata?: Record<string, string>;
}) {
  await db.insert(auditEvents).values({ ...input, metadata: input.metadata ?? {} });
}

export async function recordAccess(db: ClinicalDb, input: {
  actorId: string;
  patientId: string;
  action: string;
  outcome: string;
  requestId: string;
  reason?: string;
}) {
  await db.insert(accessEvents).values(input);
}

export async function recordSecurity(db: ClinicalDb, input: {
  actorId?: string;
  eventType: string;
  outcome: string;
  requestId: string;
  metadata?: Record<string, string>;
}) {
  await db.insert(securityEvents).values({ ...input, metadata: input.metadata ?? {} });
}
