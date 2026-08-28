import type { CrmProvider } from "../crm-provider.ts";
import type { CrmAppointmentReference } from "../crm-types.ts";

export function getCrmAppointment(provider: CrmProvider, reference: CrmAppointmentReference): Promise<CrmAppointmentReference> {
  if (!provider.getAppointment) return Promise.reject(new Error("CRM appointment capability is not configured."));
  return provider.getAppointment(reference);
}
