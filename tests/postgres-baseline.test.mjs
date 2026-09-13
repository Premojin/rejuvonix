import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const sql = await readFile(new URL("../drizzle/postgres-baseline/0000_rejuvonix_non_phi_baseline.sql", import.meta.url), "utf8");
const tableNames = [...sql.matchAll(/CREATE TABLE IF NOT EXISTS "([^"]+)"/g)].map((match) => match[1]);
const expectedTables = [
  "users", "roles", "permissions", "patients", "patient_profiles",
  "clinicians", "appointments", "consents", "user_roles", "role_permissions",
  "audit_events", "access_events", "security_events",
];
const expectedRoles = ["Patient", "Clinician", "Administrator", "Operations", "Support", "Service"];
const expectedPermissions = [
  "patient:read-own", "patient:update-own", "consent:manage-own",
  "appointment:request-own", "patient:read-assigned", "appointment:manage",
  "administration:manage",
];

test("fresh baseline creates only the current non-PHI application tables", () => {
  assert.deepEqual(tableNames, expectedTables);
  assert.doesNotMatch(sql, /CREATE TABLE IF NOT EXISTS "(encounters|treatment_plans)"/);
  for (const forbidden of ["summary", "diagnosis", "symptoms", "allergies", "medications", "clinical_notes", "treatment_notes"]) {
    assert.doesNotMatch(sql, new RegExp(`"${forbidden}"`, "i"));
  }
});

test("identity and patient columns remain non-PHI", () => {
  for (const column of ["external_subject", "email", "status", "tenant_id", "display_name", "preferred_contact_method"]) {
    assert.match(sql, new RegExp(`"${column}"`));
  }
  for (const forbidden of ["password", "access_token", "refresh_token", "medical_history", "clinical_answers"]) {
    assert.doesNotMatch(sql, new RegExp(forbidden, "i"));
  }
});

test("authorization seed contains exact roles and least-privilege permissions", () => {
  for (const role of expectedRoles) assert.match(sql, new RegExp(`'${role}'`));
  for (const permission of expectedPermissions) assert.match(sql, new RegExp(`'${permission}'`));
  assert.doesNotMatch(sql, /\*|clinical:|encounter:|treatment:/i);
  assert.match(sql, /, 'Support', 'support-limited'\)/);
  assert.match(sql, /, 'Service', 'system'\)/);
  const mappings = sql.slice(sql.indexOf("FROM (VALUES"));
  assert.doesNotMatch(mappings, /\('Support'|\('Service'/);
});

test("historical migrations are not part of the fresh baseline stream", async () => {
  const journal = JSON.parse(await readFile(new URL("../drizzle/postgres-baseline/meta/_journal.json", import.meta.url), "utf8"));
  assert.deepEqual(journal.entries.map((entry) => entry.tag), ["0000_rejuvonix_non_phi_baseline"]);
  assert.equal(journal.entries[0].idx, 0);
});
