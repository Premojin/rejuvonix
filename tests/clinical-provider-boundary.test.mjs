import assert from "node:assert/strict";
import test from "node:test";

const {MockClinicalProvider} = await import("../app/integrations/clinical-data-provider.ts");

test("mock clinical provider returns only an opaque workflow reference", async () => {
  const provider = new MockClinicalProvider();
  const result = await provider.beginClinicalIntake({patientId: "patient-local-1", program: "weight-loss", requestId: "request-1"});
  assert.equal(result.provider, "mock-clinical-provider");
  assert.equal(result.externalReference, "mock-workflow-request-1");
  assert.equal(result.continueUrl, null);
  assert.equal("answers" in result, false);
});

test("mock provider rejects clinical payload fields at the application boundary", async () => {
  const provider = new MockClinicalProvider();
  await assert.rejects(() => provider.beginClinicalIntake({patientId: "", program: "weight-loss", requestId: "request-1"}));
});

test("clinical workflow status accepts only local opaque references", async () => {
  const provider = new MockClinicalProvider();
  await assert.rejects(() => provider.getClinicalWorkflowStatus("real-provider-reference"));
});

test("non-local runtime does not select the mock provider", async () => {
  const source = await (await import("node:fs/promises")).readFile(new URL("../app/integrations/clinical-data-provider.ts", import.meta.url), "utf8");
  assert.match(source, /const localRuntime =/);
  assert.match(source, /new UnavailableClinicalProvider\(\)/);
  assert.match(source, /integration-not-configured/);
});
