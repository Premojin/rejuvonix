CREATE TABLE IF NOT EXISTS "patient_workflow_states" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"patient_id" uuid NOT NULL REFERENCES "patients"("id"),
	"workflow_type" text NOT NULL,
	"status" text DEFAULT 'not-started' NOT NULL,
	"provider_name" text,
	"external_reference" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "patient_workflow_states_patient_type_uq" UNIQUE("patient_id", "workflow_type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "integration_references" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"provider_name" text NOT NULL,
	"resource_type" text NOT NULL,
	"external_reference" text NOT NULL,
	"status" text NOT NULL,
	"idempotency_key" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "integration_references_provider_resource_external_uq" UNIQUE("provider_name", "resource_type", "external_reference"),
	CONSTRAINT "integration_references_idempotency_uq" UNIQUE("idempotency_key")
);
--> statement-breakpoint
ALTER TABLE "consents" ADD COLUMN IF NOT EXISTS "capture_channel" text DEFAULT 'web' NOT NULL;
--> statement-breakpoint
ALTER TABLE "consents" ADD COLUMN IF NOT EXISTS "external_evidence_reference" text;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "patient_workflow_states_external_idx" ON "patient_workflow_states" USING btree ("provider_name", "external_reference");
