import { errorResponse, json, requirePrincipal } from "../../../_lib/http";
import { getCrmProvider } from "../../../../../integrations/crm/crm-provider-factory";
import { getPatientLifecycleStatus } from "../../../../../integrations/crm/services/crm-status-service";
import { CrmProviderError } from "../../../../../integrations/crm/crm-errors";

export const dynamic = "force-dynamic";

/** Application status contract only; it never exposes CRM objects or payloads. */
export async function GET(request: Request): Promise<Response> {
  const id = request.headers.get("x-correlation-id") ?? crypto.randomUUID();
  try {
    const { principal, correlationId } = await requirePrincipal(request);
    const status = await getPatientLifecycleStatus(getCrmProvider(), { provider: "crm", externalContactId: "unlinked", localUserId: principal.id });
    return json({ data: status }, 200, correlationId);
  } catch (error) {
    if (error instanceof CrmProviderError && error.category === "INTEGRATION_NOT_CONFIGURED") {
      return json({ data: { onboardingStatus: "NEW", crmStatus: "UNKNOWN", integrationStatus: "INTEGRATION_NOT_CONFIGURED" } }, 200, id);
    }
    return errorResponse(error, id);
  }
}
