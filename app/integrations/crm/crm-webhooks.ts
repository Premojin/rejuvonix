import { CrmProviderError } from "./crm-errors.ts";

export type CrmWebhookVerificationMode = "HMAC" | "ASYMMETRIC_SIGNATURE" | "BEARER_SECRET" | "CUSTOM";

export interface CrmWebhookVerificationResult {
  verified: boolean;
  mode: CrmWebhookVerificationMode;
}

export interface CrmWebhookVerifier {
  verifyCrmWebhook(request: Request): Promise<CrmWebhookVerificationResult>;
}

export class UnconfiguredCrmWebhookVerifier implements CrmWebhookVerifier {
  async verifyCrmWebhook(): Promise<CrmWebhookVerificationResult> {
    throw new CrmProviderError("WEBHOOK_VERIFICATION_FAILED", "CRM webhook verification is not configured.", {
      provider: "crm",
      operation: "verifyCrmWebhook",
    });
  }
}
