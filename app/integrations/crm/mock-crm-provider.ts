import { BaseCrmProvider, type CrmContactQuery, type CrmProviderConfig } from "./crm-provider.ts";
import { validateCrmContactInput } from "./crm-data-policy.ts";
import type {
  CrmAppointmentReference, CrmContactInput, CrmContactReference, CrmProviderCapabilities, CrmWorkflowStatus,
} from "./crm-types.ts";
import { unknownCrmProviderCapabilities } from "./crm-types.ts";

const mockContactId = "synthetic-crm-contact-001";

export class MockCrmProvider extends BaseCrmProvider {
  constructor(config: CrmProviderConfig) { super(config); }

  getCapabilities(): CrmProviderCapabilities {
    return {
      ...unknownCrmProviderCapabilities(),
      contacts: "SUPPORTED", contactSearch: "SUPPORTED", contactUpdate: "SUPPORTED",
      apiVersion: "synthetic-mock", authModes: ["NONE"],
    };
  }

  async createContact(input: CrmContactInput): Promise<CrmContactReference> {
    validateCrmContactInput(input);
    return { provider: "mock", externalContactId: mockContactId, localUserId: input.localUserId, localPatientId: input.localPatientId };
  }

  async findContact(query: CrmContactQuery): Promise<CrmContactReference | null> {
    return query.localUserId === "synthetic-user-001" || query.externalContactId === mockContactId
      ? { provider: "mock", externalContactId: mockContactId, localUserId: "synthetic-user-001", localPatientId: "synthetic-patient-001" }
      : null;
  }

  async updateContact(reference: CrmContactReference, patch: Partial<CrmContactInput>): Promise<CrmContactReference> {
    validateCrmContactInput({ localUserId: reference.localUserId, ...patch });
    return reference;
  }

  async getContact(reference: CrmContactReference): Promise<CrmContactReference> { return reference; }

  async getWorkflowStatus(reference: CrmContactReference): Promise<CrmWorkflowStatus> {
    return { status: "CONTACT_LINKED", provider: "mock", externalContactId: reference.externalContactId, nextAction: "synthetic-review" };
  }

  async getAppointment(reference: CrmAppointmentReference): Promise<CrmAppointmentReference> { return reference; }

  async healthCheck(): Promise<{ status: "READY"; provider: string }> { return { status: "READY", provider: "mock" }; }
}
