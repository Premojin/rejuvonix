import {sql} from "drizzle-orm";
import {index,integer,sqliteTable,text,uniqueIndex} from "drizzle-orm/sqlite-core";

// Dormant while `.openai/hosting.json` keeps D1 disabled. Medical answers are
// modeled as ciphertext so future persistence cannot casually store plaintext.
export const intakeSessions=sqliteTable("intake_sessions",{
  id:text("id").primaryKey(),subjectHash:text("subject_hash").notNull(),
  program:text("program",{enum:["weight-loss","performance","sexual-health","hair-restoration","skin-restoration"]}).notNull(),
  status:text("status",{enum:["draft","ready-for-review","submitted","under-review","closed"]}).notNull().default("draft"),
  schemaVersion:integer("schema_version").notNull(),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt:text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),submittedAt:text("submitted_at"),
},table=>[index("intake_sessions_subject_idx").on(table.subjectHash),index("intake_sessions_status_idx").on(table.status)]);

export const intakeAnswers=sqliteTable("intake_answers",{
  id:text("id").primaryKey(),sessionId:text("session_id").notNull().references(()=>intakeSessions.id,{onDelete:"cascade"}),
  fieldKey:text("field_key").notNull(),valueCiphertext:text("value_ciphertext").notNull(),
  encryptionKeyVersion:integer("encryption_key_version").notNull(),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt:text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
},table=>[uniqueIndex("intake_answers_session_field_uq").on(table.sessionId,table.fieldKey),index("intake_answers_session_idx").on(table.sessionId)]);

export const consentRecords=sqliteTable("consent_records",{
  id:text("id").primaryKey(),sessionId:text("session_id").notNull().references(()=>intakeSessions.id,{onDelete:"cascade"}),
  consentType:text("consent_type",{enum:["terms","privacy","telehealth","communications"]}).notNull(),
  documentVersion:text("document_version").notNull(),documentHash:text("document_hash").notNull(),
  accepted:integer("accepted",{mode:"boolean"}).notNull(),acceptedAt:text("accepted_at").notNull(),actorSubjectHash:text("actor_subject_hash").notNull(),
},table=>[index("consent_records_session_idx").on(table.sessionId),uniqueIndex("consent_records_session_type_version_uq").on(table.sessionId,table.consentType,table.documentVersion)]);

export const intakeAuditEvents=sqliteTable("intake_audit_events",{
  id:text("id").primaryKey(),sessionId:text("session_id").notNull().references(()=>intakeSessions.id,{onDelete:"cascade"}),
  eventType:text("event_type").notNull(),actorSubjectHash:text("actor_subject_hash").notNull(),metadataCiphertext:text("metadata_ciphertext"),
  encryptionKeyVersion:integer("encryption_key_version"),createdAt:text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
},table=>[index("intake_audit_events_session_idx").on(table.sessionId),index("intake_audit_events_created_idx").on(table.createdAt)]);
