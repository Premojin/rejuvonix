CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"external_subject" text NOT NULL,
	"email" text NOT NULL,
	"status" text DEFAULT 'active' NOT NULL,
	"tenant_id" text DEFAULT 'staging' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "users_external_subject_uq" UNIQUE("external_subject"),
	CONSTRAINT "users_email_uq" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "roles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"scope" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "roles_name_uq" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "permissions" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "permissions_name_uq" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patients" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "users"("id"),
	"status" text DEFAULT 'active' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "patients_user_uq" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patient_profiles" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL REFERENCES "patients"("id"),
	"display_name" text NOT NULL,
	"preferred_contact_method" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "patient_profiles_patient_uq" UNIQUE("patient_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "clinicians" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL REFERENCES "users"("id"),
	"status" text DEFAULT 'pending' NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "clinicians_user_uq" UNIQUE("user_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appointments" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL REFERENCES "patients"("id"),
	"clinician_id" uuid REFERENCES "clinicians"("id"),
	"status" text DEFAULT 'requested' NOT NULL,
	"scheduled_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "consents" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL REFERENCES "patients"("id"),
	"consent_type" text NOT NULL,
	"version" text NOT NULL,
	"status" text NOT NULL,
	"source" text NOT NULL,
	"granted_at" timestamp with time zone NOT NULL,
	"revoked_at" timestamp with time zone,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_roles" (
	"user_id" uuid NOT NULL REFERENCES "users"("id"),
	"role_id" uuid NOT NULL REFERENCES "roles"("id"),
	"assigned_by" uuid REFERENCES "users"("id"),
	"assigned_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "user_roles_user_id_role_id_pk" PRIMARY KEY("user_id", "role_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "role_permissions" (
	"role_id" uuid NOT NULL REFERENCES "roles"("id"),
	"permission_id" uuid NOT NULL REFERENCES "permissions"("id"),
	CONSTRAINT "role_permissions_role_id_permission_id_pk" PRIMARY KEY("role_id", "permission_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "audit_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid NOT NULL REFERENCES "users"("id"),
	"action" text NOT NULL,
	"resource_type" text NOT NULL,
	"resource_id" text NOT NULL,
	"scope" text,
	"outcome" text NOT NULL,
	"reason" text,
	"request_id" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "access_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid NOT NULL REFERENCES "users"("id"),
	"patient_id" uuid NOT NULL REFERENCES "patients"("id"),
	"action" text NOT NULL,
	"outcome" text NOT NULL,
	"reason" text,
	"request_id" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "security_events" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"actor_id" uuid REFERENCES "users"("id"),
	"event_type" text NOT NULL,
	"outcome" text NOT NULL,
	"request_id" text NOT NULL,
	"metadata" jsonb DEFAULT '{}'::jsonb NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "user_roles_user_idx" ON "user_roles" USING btree ("user_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "role_permissions_role_idx" ON "role_permissions" USING btree ("role_id");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "appointments_patient_idx" ON "appointments" USING btree ("patient_id", "scheduled_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "appointments_clinician_idx" ON "appointments" USING btree ("clinician_id", "scheduled_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "consents_patient_idx" ON "consents" USING btree ("patient_id", "consent_type", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_events_actor_idx" ON "audit_events" USING btree ("actor_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "audit_events_resource_idx" ON "audit_events" USING btree ("resource_type", "resource_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "access_events_patient_idx" ON "access_events" USING btree ("patient_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "access_events_actor_idx" ON "access_events" USING btree ("actor_id", "created_at");
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "security_events_type_idx" ON "security_events" USING btree ("event_type", "created_at");
--> statement-breakpoint
INSERT INTO "roles" ("id", "name", "scope") VALUES
  ('00000000-0000-0000-0000-000000000001', 'Patient', 'own'),
  ('00000000-0000-0000-0000-000000000002', 'Clinician', 'assigned-patient'),
  ('00000000-0000-0000-0000-000000000003', 'Administrator', 'administrative'),
  ('00000000-0000-0000-0000-000000000004', 'Operations', 'administrative'),
  ('00000000-0000-0000-0000-000000000005', 'Support', 'support-limited'),
  ('00000000-0000-0000-0000-000000000006', 'Service', 'system')
ON CONFLICT ("name") DO UPDATE SET "scope" = EXCLUDED."scope", "updated_at" = now();
--> statement-breakpoint
INSERT INTO "permissions" ("id", "name") VALUES
  ('00000000-0000-0000-0001-000000000001', 'patient:read-own'),
  ('00000000-0000-0000-0001-000000000002', 'patient:update-own'),
  ('00000000-0000-0000-0001-000000000003', 'consent:manage-own'),
  ('00000000-0000-0000-0001-000000000004', 'appointment:request-own'),
  ('00000000-0000-0000-0001-000000000005', 'patient:read-assigned'),
  ('00000000-0000-0000-0001-000000000006', 'appointment:manage'),
  ('00000000-0000-0000-0001-000000000007', 'administration:manage')
ON CONFLICT ("name") DO NOTHING;
--> statement-breakpoint
INSERT INTO "role_permissions" ("role_id", "permission_id")
SELECT role_map."id", permission_map."id"
FROM (VALUES
  ('Patient', 'patient:read-own'),
  ('Patient', 'patient:update-own'),
  ('Patient', 'consent:manage-own'),
  ('Patient', 'appointment:request-own'),
  ('Clinician', 'patient:read-assigned'),
  ('Clinician', 'appointment:manage'),
  ('Administrator', 'administration:manage'),
  ('Operations', 'appointment:manage')
) AS mapping(role_name, permission_name)
JOIN "roles" role_map ON role_map."name" = mapping.role_name
JOIN "permissions" permission_map ON permission_map."name" = mapping.permission_name
ON CONFLICT DO NOTHING;
