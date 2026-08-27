import test from "node:test";
import assert from "node:assert/strict";

const { authorize } = await import("../app/clinical/authorization.ts");

const patientA = { id: "patient-a", roles: ["Patient"], active: true, tenantId: "staging" };
const clinicianA = { id: "clinician-a", roles: ["Clinician"], active: true, tenantId: "staging" };
const support = { id: "support-a", roles: ["Support"], active: true, tenantId: "staging" };

test("patient object isolation denies another patient's resource", () => {
  const decision = authorize(patientA, { action: "read", scope: "own", resource: { type: "patient", id: "patient-b", ownerId: "patient-b", tenantId: "staging" } });
  assert.equal(decision.allowed, false);
});

test("clinician assignment boundary denies an unassigned patient", () => {
  const decision = authorize(clinicianA, { action: "read", scope: "assigned-patient", resource: { type: "patient", id: "patient-b", assignedClinicianIds: ["clinician-b"], tenantId: "staging" } });
  assert.equal(decision.allowed, false);
});

test("support cannot access clinical resources", () => {
  const decision = authorize(support, { action: "read", scope: "support-limited", resource: { type: "encounter", id: "encounter-a", tenantId: "staging" } });
  assert.equal(decision.allowed, false);
});

test("administrator clinical access is not implied", () => {
  const decision = authorize({ id: "admin-a", roles: ["Administrator"], active: true, tenantId: "staging" }, { action: "read", scope: "administrative", resource: { type: "patient", id: "patient-a", tenantId: "staging" } });
  assert.equal(decision.allowed, false);
});
