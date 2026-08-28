export type CrmErrorCategory =
  | "INTEGRATION_NOT_CONFIGURED" | "AUTH_FAILED" | "AUTH_EXPIRED" | "FORBIDDEN"
  | "CONTACT_NOT_FOUND" | "VALIDATION_FAILED" | "RATE_LIMITED" | "PROVIDER_UNAVAILABLE"
  | "PROVIDER_TIMEOUT" | "PROVIDER_REJECTED" | "DUPLICATE_CONTACT" | "INVALID_PROVIDER_RESPONSE"
  | "WEBHOOK_VERIFICATION_FAILED" | "UNKNOWN_PROVIDER_ERROR";

export class CrmProviderError extends Error {
  public readonly category: CrmErrorCategory;
  public readonly context: { provider: string; operation: string; correlationId?: string };

  constructor(
    category: CrmErrorCategory,
    message: string,
    context: { provider: string; operation: string; correlationId?: string },
  ) {
    super(message);
    this.category = category;
    this.context = context;
    this.name = "CrmProviderError";
  }
}

export function toSafeCrmError(error: unknown, context: CrmProviderError["context"]): CrmProviderError {
  if (error instanceof CrmProviderError) return error;
  return new CrmProviderError("UNKNOWN_PROVIDER_ERROR", "The CRM provider request failed.", context);
}
