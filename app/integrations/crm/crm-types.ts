export type CrmCapabilityState = "UNKNOWN" | "SUPPORTED" | "NOT_SUPPORTED" | "NOT_CONFIGURED";

export interface CrmProviderCapabilities {
  contacts: CrmCapabilityState;
  contactSearch: CrmCapabilityState;
  contactUpdate: CrmCapabilityState;
  opportunities: CrmCapabilityState;
  pipelines: CrmCapabilityState;
  appointments: CrmCapabilityState;
  calendars: CrmCapabilityState;
  forms: CrmCapabilityState;
  funnels: CrmCapabilityState;
  workflows: CrmCapabilityState;
  webhooks: CrmCapabilityState;
  sms: CrmCapabilityState;
  email: CrmCapabilityState;
  phone: CrmCapabilityState;
  payments: CrmCapabilityState;
  memberships: CrmCapabilityState;
  customFields: CrmCapabilityState;
  customObjects: CrmCapabilityState;
  apiVersion: string | null;
  authModes: readonly string[];
}

export const unknownCrmProviderCapabilities = (): CrmProviderCapabilities => ({
  contacts: "UNKNOWN", contactSearch: "UNKNOWN", contactUpdate: "UNKNOWN",
  opportunities: "UNKNOWN", pipelines: "UNKNOWN", appointments: "UNKNOWN",
  calendars: "UNKNOWN", forms: "UNKNOWN", funnels: "UNKNOWN", workflows: "UNKNOWN",
  webhooks: "UNKNOWN", sms: "UNKNOWN", email: "UNKNOWN", phone: "UNKNOWN",
  payments: "UNKNOWN", memberships: "UNKNOWN", customFields: "UNKNOWN",
  customObjects: "UNKNOWN", apiVersion: null, authModes: [],
});

export type CrmWorkflowStatusCode =
  | "NEW" | "CONTACT_LINKED" | "ONBOARDING_STARTED" | "ONBOARDING_COMPLETE"
  | "HANDOFF_REQUIRED" | "HANDOFF_IN_PROGRESS" | "ACTIVE" | "FOLLOW_UP"
  | "CLOSED" | "FAILED" | "UNKNOWN";

export interface CrmWorkflowStatus {
  status: CrmWorkflowStatusCode;
  provider: string;
  externalContactId?: string;
  externalOpportunityId?: string;
  nextAction?: string;
}

export interface CrmContactReference {
  provider: string;
  externalContactId: string;
  localUserId: string;
  localPatientId?: string;
}

export interface CrmCommunicationConsent {
  marketingConsent: boolean;
  transactionalCommunicationConsent: boolean;
  privacyTermsConsent: boolean;
}

export interface ClinicalConsentReference {
  provider: string;
  externalReference: string;
  recordedAt: string;
}

export interface CrmContactInput {
  localUserId: string;
  localPatientId?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  leadSource?: string;
  programInterest?: string;
  localApplicationReference?: string;
  tags?: readonly string[];
  communicationConsent?: CrmCommunicationConsent;
}

export interface CrmOpportunityReference {
  provider: string;
  externalOpportunityId: string;
  externalContactId?: string;
}

export interface CrmPipelineReference {
  provider: string;
  externalPipelineId: string;
}

export interface CrmStageReference {
  provider: string;
  externalStageId: string;
  externalPipelineId?: string;
}

export interface CrmAppointmentReference {
  provider: string;
  externalAppointmentId: string;
  status: string;
  startAt?: string;
  endAt?: string;
  externalCalendarId?: string;
}

export interface PatientLifecycleStatus {
  onboardingStatus: CrmWorkflowStatusCode;
  crmStatus: CrmWorkflowStatusCode;
  appointmentStatus?: string;
  nextAction?: string;
  integrationStatus: "READY" | "INTEGRATION_NOT_CONFIGURED";
}
