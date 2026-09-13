import assert from "node:assert/strict";
import test from "node:test";

const {
  containsProhibitedCrmData,
  crmDataPolicy,
  validateCrmContactInput,
} = await import("../app/integrations/crm/crm-data-policy.ts");
const { CrmProviderError } = await import("../app/integrations/crm/crm-errors.ts");
const { getCrmProvider, getCrmProviderConfig } = await import("../app/integrations/crm/crm-provider-factory.ts");
const { MockCrmProvider } = await import("../app/integrations/crm/mock-crm-provider.ts");

const baseConfig = {
  provider: "mock",
  mode: "mock",
  authMode: "NONE",
  timeoutMs: 5000,
};

test("CRM contact allowlist accepts non-clinical fields", () => {
  const input = validateCrmContactInput({
    localUserId: "synthetic-user-001",
    localPatientId: "synthetic-patient-001",
    firstName: "Synthetic",
    email: "synthetic@example.test",
    leadSource: "synthetic-test",
    communicationConsent: { marketingConsent: false, transactionalCommunicationConsent: true, privacyTermsConsent: true },
  });
  assert.equal(input.localUserId, "synthetic-user-001");
  assert.equal(crmDataPolicy.symptoms, "PROHIBITED");
});

test("CRM contact allowlist rejects unknown and clinical fields", () => {
  assert.throws(() => validateCrmContactInput({ localUserId: "synthetic-user-001", customField: "unknown" }), /not allowlisted/);
  assert.throws(() => validateCrmContactInput({ localUserId: "synthetic-user-001", symptoms: "not allowed" }), /prohibited/);
  assert.throws(() => validateCrmContactInput({ localUserId: "synthetic-user-001", communicationConsent: { marketingConsent: true, transactionalCommunicationConsent: true, privacyTermsConsent: true, clinicalConsent: true } }), /Consent field is not allowlisted/);
  assert.equal(containsProhibitedCrmData({ nested: { medications: ["synthetic"] } }), true);
});

test("CRM factory defaults to not_configured with no provider settings", () => {
  const config = getCrmProviderConfig({});
  assert.equal(config.mode, "not_configured");
  assert.equal("apiKey" in config, false);
  assert.equal("accessToken" in config, false);
  assert.equal("refreshToken" in config, false);
  assert.equal(getCrmProvider(config).getCapabilities().contacts, "UNKNOWN");
});

test("CRM mock is explicit, deterministic, and synthetic", async () => {
  const provider = getCrmProvider(baseConfig);
  assert.ok(provider instanceof MockCrmProvider);
  const reference = await provider.createContact({ localUserId: "synthetic-user-001" });
  assert.equal(reference.externalContactId, "synthetic-crm-contact-001");
  assert.equal((await provider.getWorkflowStatus(reference)).status, "CONTACT_LINKED");
});

test("CRM mode with incomplete configuration fails closed", () => {
  assert.throws(() => getCrmProvider({ ...baseConfig, mode: "crm", provider: "crm", authMode: "NONE" }), (error) => {
    assert.ok(error instanceof CrmProviderError);
    assert.equal(error.category, "INTEGRATION_NOT_CONFIGURED");
    return true;
  });
});

test("CRM provider skeleton has no active capabilities or network behavior", async () => {
  const provider = getCrmProvider({ ...baseConfig, mode: "crm", provider: "crm", apiBaseUrl: "https://synthetic.invalid", authMode: "BEARER_TOKEN" });
  assert.equal(provider.getCapabilities().contacts, "UNKNOWN");
  await assert.rejects(() => provider.createContact({ localUserId: "synthetic-user-001" }), (error) => {
    assert.ok(error instanceof CrmProviderError);
    assert.equal(error.category, "INTEGRATION_NOT_CONFIGURED");
    return true;
  });
});
