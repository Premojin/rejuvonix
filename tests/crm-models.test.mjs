import assert from "node:assert/strict";
import test from "node:test";

const { crmEventKey, isDuplicateCrmEvent } = await import("../app/integrations/crm/crm-events.ts");
const { getPatientLifecycleStatus } = await import("../app/integrations/crm/services/crm-status-service.ts");
const { CrmProviderError } = await import("../app/integrations/crm/crm-errors.ts");
const { UnconfiguredCrmWebhookVerifier } = await import("../app/integrations/crm/crm-webhooks.ts");

test("CRM event idempotency uses provider and event ID", () => {
  const event = { provider: "mock", eventId: "event-001" };
  assert.equal(crmEventKey(event), "mock:event-001");
  assert.equal(isDuplicateCrmEvent(event, new Set(["mock:event-001"])), true);
  assert.equal(isDuplicateCrmEvent(event, new Set()), false);
});

test("status service returns normalized unavailable state without a CRM reference", async () => {
  const status = await getPatientLifecycleStatus({ getWorkflowStatus: async () => { throw new Error("not used"); } }, undefined);
  assert.deepEqual(status, { onboardingStatus: "NEW", crmStatus: "UNKNOWN", integrationStatus: "INTEGRATION_NOT_CONFIGURED" });
});

test("unconfigured webhook verification fails closed", async () => {
  await assert.rejects(() => new UnconfiguredCrmWebhookVerifier().verifyCrmWebhook(new Request("https://example.test/webhook")), (error) => {
    assert.ok(error instanceof CrmProviderError);
    assert.equal(error.category, "WEBHOOK_VERIFICATION_FAILED");
    return true;
  });
});
