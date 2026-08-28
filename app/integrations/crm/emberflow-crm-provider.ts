import { BaseCrmProvider, type CrmProviderConfig } from "./crm-provider.ts";
import type { CrmAppointmentReference, CrmContactReference, CrmProviderCapabilities, CrmWorkflowStatus } from "./crm-types.ts";
import { unknownCrmProviderCapabilities } from "./crm-types.ts";

/** Inactive contract placeholder. It deliberately contains no network behavior or EmberFlow assumptions. */
export class EmberFlowCrmProvider extends BaseCrmProvider {
  constructor(config: CrmProviderConfig) { super(config); }

  getCapabilities(): CrmProviderCapabilities { return unknownCrmProviderCapabilities(); }
  async createContact(): Promise<CrmContactReference> { return this.notConfigured("createContact"); }
  async findContact(): Promise<CrmContactReference | null> { return this.notConfigured("findContact"); }
  async updateContact(): Promise<CrmContactReference> { return this.notConfigured("updateContact"); }
  async getContact(): Promise<CrmContactReference> { return this.notConfigured("getContact"); }
  async getWorkflowStatus(): Promise<CrmWorkflowStatus> { return this.notConfigured("getWorkflowStatus"); }
  async getAppointment(): Promise<CrmAppointmentReference> { return this.notConfigured("getAppointment"); }
}
