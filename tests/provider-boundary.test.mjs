import assert from "node:assert/strict";
import test from "node:test";

const { containsClinicalPayload, getClinicalDataProvider } = await import("../app/clinical/provider.ts");

test("clinical workflow boundary rejects clinical payloads and exposes no provider contract", async () => {
  assert.equal(containsClinicalPayload({ goals: ["weight loss"], clinicalAnswers: { allergies: ["synthetic"] } }), true);
  assert.equal(containsClinicalPayload({ goals: ["weight loss"], workflow: "start" }), false);
  const result = await getClinicalDataProvider().beginClinicalIntake({ patientReference: "synthetic-patient", correlationId: "synthetic-request" });
  assert.equal(result.status, "INTEGRATION_NOT_CONFIGURED");
  assert.equal("externalReference" in result, false);
});
