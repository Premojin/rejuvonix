import type { CrmProvider } from "../crm-provider.ts";
import { validateCrmContactInput } from "../crm-data-policy.ts";
import type { CrmContactInput, CrmContactReference } from "../crm-types.ts";

export async function linkCrmContact(provider: CrmProvider, input: CrmContactInput): Promise<CrmContactReference> {
  const safeInput = validateCrmContactInput(input);
  const existing = await provider.findContact({ localUserId: safeInput.localUserId, localPatientId: safeInput.localPatientId, email: safeInput.email, phone: safeInput.phone });
  return existing ?? provider.createContact(safeInput);
}
