CREATE TABLE `consent_records` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`consent_type` text NOT NULL,
	`document_version` text NOT NULL,
	`document_hash` text NOT NULL,
	`accepted` integer NOT NULL,
	`accepted_at` text NOT NULL,
	`actor_subject_hash` text NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `intake_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `consent_records_session_idx` ON `consent_records` (`session_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `consent_records_session_type_version_uq` ON `consent_records` (`session_id`,`consent_type`,`document_version`);--> statement-breakpoint
CREATE TABLE `intake_answers` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`field_key` text NOT NULL,
	`value_ciphertext` text NOT NULL,
	`encryption_key_version` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `intake_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE UNIQUE INDEX `intake_answers_session_field_uq` ON `intake_answers` (`session_id`,`field_key`);--> statement-breakpoint
CREATE INDEX `intake_answers_session_idx` ON `intake_answers` (`session_id`);--> statement-breakpoint
CREATE TABLE `intake_audit_events` (
	`id` text PRIMARY KEY NOT NULL,
	`session_id` text NOT NULL,
	`event_type` text NOT NULL,
	`actor_subject_hash` text NOT NULL,
	`metadata_ciphertext` text,
	`encryption_key_version` integer,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	FOREIGN KEY (`session_id`) REFERENCES `intake_sessions`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE INDEX `intake_audit_events_session_idx` ON `intake_audit_events` (`session_id`);--> statement-breakpoint
CREATE INDEX `intake_audit_events_created_idx` ON `intake_audit_events` (`created_at`);--> statement-breakpoint
CREATE TABLE `intake_sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`subject_hash` text NOT NULL,
	`program` text NOT NULL,
	`status` text DEFAULT 'draft' NOT NULL,
	`schema_version` integer NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`updated_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
	`submitted_at` text
);
--> statement-breakpoint
CREATE INDEX `intake_sessions_subject_idx` ON `intake_sessions` (`subject_hash`);--> statement-breakpoint
CREATE INDEX `intake_sessions_status_idx` ON `intake_sessions` (`status`);