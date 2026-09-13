import type { CrmProvider } from "../crm-provider.ts";
import { CrmProviderError } from "../crm-errors.ts";
import type { CrmContactReference, PatientLifecycleStatus } from "../crm-types.ts";

export async function getPatientLifecycleStatus(provider: CrmProvider, reference?: CrmContactReference): Promise<PatientLifecycleStatus> {
  if (!reference) return { onboardingStatus: "NEW", crmStatus: "UNKNOWN", integrationStatus: "INTEGRATION_NOT_CONFIGURED" };
  try {
    const status = await provider.getWorkflowStatus(reference);
    return { onboardingStatus: status.status, crmStatus: status.status, nextAction: status.nextAction, integrationStatus: "READY" };
  } catch (error) {
    if (error instanceof CrmProviderError && error.category === "INTEGRATION_NOT_CONFIGURED") {
      return { onboardingStatus: "NEW", crmStatus: "UNKNOWN", integrationStatus: "INTEGRATION_NOT_CONFIGURED" };
    }
    throw error;
  }
}
