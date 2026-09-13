import type {
  CrmAppointmentReference,
  CrmContactInput,
  CrmContactReference,
  CrmProviderCapabilities,
  CrmWorkflowStatus,
} from "./crm-types.ts";
import { CrmProviderError } from "./crm-errors.ts";

export type CrmProviderMode = "not_configured" | "mock" | "crm";
export type CrmAuthMode =
  | "NONE"
  | "API_KEY"
  | "BEARER_TOKEN"
  | "OAUTH_CLIENT_CREDENTIALS"
  | "OAUTH_AUTHORIZATION_CODE"
  | "LOCATION_TOKEN"
  | "PRIVATE_INTEGRATION_TOKEN"
  | "CUSTOM";

export interface CrmProviderConfig {
  provider: string;
  mode: CrmProviderMode;
  apiBaseUrl?: string;
  authMode: CrmAuthMode;
  tenantId?: string;
  locationId?: string;
  timeoutMs: number;
}

export interface CrmContactQuery {
  localUserId?: string;
  localPatientId?: string;
  externalContactId?: string;
  email?: string;
  phone?: string;
}

export interface CrmProvider {
  getCapabilities(): CrmProviderCapabilities;
  createContact(input: CrmContactInput): Promise<CrmContactReference>;
  findContact(query: CrmContactQuery): Promise<CrmContactReference | null>;
  updateContact(reference: CrmContactReference, patch: Partial<CrmContactInput>): Promise<CrmContactReference>;
  getContact(reference: CrmContactReference): Promise<CrmContactReference>;
  getWorkflowStatus(reference: CrmContactReference): Promise<CrmWorkflowStatus>;
  getAppointment?(reference: CrmAppointmentReference): Promise<CrmAppointmentReference>;
  healthCheck(): Promise<{ status: "READY" | "INTEGRATION_NOT_CONFIGURED"; provider: string }>;
}

export abstract class BaseCrmProvider implements CrmProvider {
  protected readonly config: CrmProviderConfig;

  protected constructor(config: CrmProviderConfig) { this.config = config; }

  abstract getCapabilities(): CrmProviderCapabilities;
  abstract createContact(input: CrmContactInput): Promise<CrmContactReference>;
  abstract findContact(query: CrmContactQuery): Promise<CrmContactReference | null>;
  abstract updateContact(reference: CrmContactReference, patch: Partial<CrmContactInput>): Promise<CrmContactReference>;
  abstract getContact(reference: CrmContactReference): Promise<CrmContactReference>;
  abstract getWorkflowStatus(reference: CrmContactReference): Promise<CrmWorkflowStatus>;

  async healthCheck(): Promise<{ status: "READY" | "INTEGRATION_NOT_CONFIGURED"; provider: string }> {
    return { status: "INTEGRATION_NOT_CONFIGURED", provider: this.config.provider };
  }

  protected notConfigured(operation: string): never {
    throw new CrmProviderError("INTEGRATION_NOT_CONFIGURED", "CRM integration is not configured.", {
      provider: this.config.provider,
      operation,
    });
  }
}
