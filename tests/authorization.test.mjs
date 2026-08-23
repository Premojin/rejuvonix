import assert from "node:assert/strict";
import test from "node:test";

const { authorize } = await import("../app/clinical/authorization.ts");
const { createAccessEvent, createAuditEvent } = await import("../app/clinical/audit.ts");
const { grantConsent, revokeConsent } = await import("../app/clinical/consent.ts");

test("patient access is limited to the patient's own record", () => {
  const patient = { id: "patient-1", roles: ["Patient"], active: true };
  assert.equal(authorize(patient, { action: "read", scope: "own", resource: { type: "patient-profile", id: "patient-1", ownerId: "patient-1" } }).allowed, true);
  assert.equal(authorize(patient, { action: "read", scope: "own", resource: { type: "patient-profile", id: "patient-2", ownerId: "patient-2" } }).allowed, false);
});

test("clinician access requires assignment and support cannot read encounters", () => {
  const clinician = { id: "clinician-1", roles: ["Clinician"], active: true };
  assert.equal(authorize(clinician, { action: "read", scope: "assigned-patient", resource: { type: "encounter", id: "enc-1", assignedClinicianIds: ["clinician-1"] } }).allowed, true);
  assert.equal(authorize(clinician, { action: "read", scope: "assigned-patient", resource: { type: "encounter", id: "enc-2", assignedClinicianIds: ["clinician-2"] } }).allowed, false);
  const support = { id: "support-1", roles: ["Support"], active: true };
  assert.equal(authorize(support, { action: "read", scope: "support-limited", resource: { type: "encounter", id: "enc-1" } }).allowed, false);
});

test("administrator does not inherit clinical access and break-glass is explicit", () => {
  const admin = { id: "admin-1", roles: ["Administrator"], active: true };
  assert.equal(authorize(admin, { action: "read", scope: "administrative", resource: { type: "encounter", id: "enc-1" } }).allowed, false);
  assert.equal(authorize(admin, { action: "break-glass", scope: "administrative", reason: "Synthetic incident review", resource: { type: "encounter", id: "enc-1" } }).allowed, true);
  assert.equal(authorize(admin, { action: "break-glass", scope: "administrative", resource: { type: "encounter", id: "enc-1" } }).allowed, false);
});

test("audit and consent primitives are append-oriented", () => {
  const now = new Date("2026-08-23T00:00:00.000Z");
  const event = createAuditEvent({ actorId: "patient-1", action: "record:read", resourceType: "patient-profile", resourceId: "patient-1", outcome: "success", requestId: "req-1" }, now);
  const access = createAccessEvent({ actorId: "clinician-1", action: "read", resourceType: "encounter", resourceId: "enc-1", outcome: "success", requestId: "req-2" }, now);
  assert.equal(event.occurredAt, now.toISOString());
  assert.equal(access.action, "access:read");
  const granted = grantConsent({ id: "consent-1", patientId: "patient-1", consentType: "telehealth", version: "v1", source: "synthetic-test" }, now);
  const revoked = revokeConsent(granted, now);
  assert.equal(granted.status, "granted");
  assert.equal(revoked.status, "revoked");
});
