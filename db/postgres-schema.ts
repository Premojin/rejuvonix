import {
  index,
  jsonb,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

const timestamps = {
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  externalSubject: text("external_subject").notNull(),
  email: text("email").notNull(),
  status: text("status").notNull().default("active"),
  tenantId: text("tenant_id").notNull().default("staging"),
  ...timestamps,
}, (table) => [uniqueIndex("users_external_subject_uq").on(table.externalSubject), uniqueIndex("users_email_uq").on(table.email)]);

export const roles = pgTable("roles", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  scope: text("scope").notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("roles_name_uq").on(table.name)]);

export const permissions = pgTable("permissions", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  ...timestamps,
}, (table) => [uniqueIndex("permissions_name_uq").on(table.name)]);

export const userRoles = pgTable("user_roles", {
  userId: uuid("user_id").notNull().references(() => users.id),
  roleId: uuid("role_id").notNull().references(() => roles.id),
  assignedBy: uuid("assigned_by").references(() => users.id),
  assignedAt: timestamp("assigned_at", { withTimezone: true }).defaultNow().notNull(),
}, (table) => [primaryKey({ columns: [table.userId, table.roleId] })]);

export const rolePermissions = pgTable("role_permissions", {
  roleId: uuid("role_id").notNull().references(() => roles.id),
  permissionId: uuid("permission_id").notNull().references(() => permissions.id),
}, (table) => [primaryKey({ columns: [table.roleId, table.permissionId] })]);

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [uniqueIndex("sessions_token_hash_uq").on(table.tokenHash), index("sessions_user_idx").on(table.userId)]);

export const patients = pgTable("patients", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("active"),
  ...timestamps,
}, (table) => [uniqueIndex("patients_user_uq").on(table.userId)]);

export const patientProfiles = pgTable("patient_profiles", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.id),
  displayName: text("display_name").notNull(),
  preferredContactMethod: text("preferred_contact_method"),
  ...timestamps,
}, (table) => [uniqueIndex("patient_profiles_patient_uq").on(table.patientId)]);

export const consents = pgTable("consents", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.id),
  consentType: text("consent_type").notNull(),
  version: text("version").notNull(),
  status: text("status").notNull(),
  source: text("source").notNull(),
  captureChannel: text("capture_channel").notNull().default("web"),
  externalEvidenceReference: text("external_evidence_reference"),
  grantedAt: timestamp("granted_at", { withTimezone: true }).notNull(),
  revokedAt: timestamp("revoked_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [index("consents_patient_idx").on(table.patientId, table.consentType, table.createdAt)]);

export const clinicians = pgTable("clinicians", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").notNull().references(() => users.id),
  status: text("status").notNull().default("pending"),
  ...timestamps,
}, (table) => [uniqueIndex("clinicians_user_uq").on(table.userId)]);

export const appointments = pgTable("appointments", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.id),
  clinicianId: uuid("clinician_id").references(() => clinicians.id),
  status: text("status").notNull().default("requested"),
  scheduledAt: timestamp("scheduled_at", { withTimezone: true }),
  ...timestamps,
}, (table) => [index("appointments_patient_idx").on(table.patientId, table.scheduledAt), index("appointments_clinician_idx").on(table.clinicianId, table.scheduledAt)]);

/** Non-PHI workflow/reference state. Clinical records remain external. */
export const patientWorkflowStates = pgTable("patient_workflow_states", {
  id: uuid("id").defaultRandom().primaryKey(),
  patientId: uuid("patient_id").notNull().references(() => patients.id),
  workflowType: text("workflow_type").notNull(),
  status: text("status").notNull().default("not-started"),
  providerName: text("provider_name"),
  externalReference: text("external_reference"),
  ...timestamps,
}, (table) => [uniqueIndex("patient_workflow_states_patient_type_uq").on(table.patientId, table.workflowType), index("patient_workflow_states_external_idx").on(table.providerName, table.externalReference)]);

export const integrationReferences = pgTable("integration_references", {
  id: uuid("id").defaultRandom().primaryKey(),
  providerName: text("provider_name").notNull(),
  resourceType: text("resource_type").notNull(),
  externalReference: text("external_reference").notNull(),
  status: text("status").notNull(),
  idempotencyKey: text("idempotency_key"),
  ...timestamps,
}, (table) => [uniqueIndex("integration_references_provider_resource_external_uq").on(table.providerName, table.resourceType, table.externalReference), uniqueIndex("integration_references_idempotency_uq").on(table.idempotencyKey)]);

export const auditEvents = pgTable("audit_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: uuid("actor_id").notNull().references(() => users.id),
  action: text("action").notNull(),
  resourceType: text("resource_type").notNull(),
  resourceId: text("resource_id").notNull(),
  scope: text("scope"),
  outcome: text("outcome").notNull(),
  reason: text("reason"),
  requestId: text("request_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, string>>().notNull().default({}),
  ...timestamps,
}, (table) => [index("audit_events_actor_idx").on(table.actorId, table.createdAt), index("audit_events_resource_idx").on(table.resourceType, table.resourceId, table.createdAt)]);

export const accessEvents = pgTable("access_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: uuid("actor_id").notNull().references(() => users.id),
  patientId: uuid("patient_id").notNull().references(() => patients.id),
  action: text("action").notNull(),
  outcome: text("outcome").notNull(),
  reason: text("reason"),
  requestId: text("request_id").notNull(),
  ...timestamps,
}, (table) => [index("access_events_patient_idx").on(table.patientId, table.createdAt), index("access_events_actor_idx").on(table.actorId, table.createdAt)]);

export const securityEvents = pgTable("security_events", {
  id: uuid("id").defaultRandom().primaryKey(),
  actorId: uuid("actor_id").references(() => users.id),
  eventType: text("event_type").notNull(),
  outcome: text("outcome").notNull(),
  requestId: text("request_id").notNull(),
  metadata: jsonb("metadata").$type<Record<string, string>>().notNull().default({}),
  ...timestamps,
}, (table) => [index("security_events_type_idx").on(table.eventType, table.createdAt)]);

export const clinicalSchema = {
  users, roles, permissions, userRoles, rolePermissions, sessions,
  patients, patientProfiles, consents, clinicians, appointments,
  patientWorkflowStates, integrationReferences, auditEvents, accessEvents, securityEvents,
};
