import type { CrmContactInput } from "./crm-types.ts";

export type CrmDataDisposition = "ALLOWED" | "REQUIRES_CONSENT" | "PROHIBITED" | "UNKNOWN";

export const crmDataPolicy: Readonly<Record<string, CrmDataDisposition>> = {
  localUserId: "ALLOWED",
  localPatientId: "ALLOWED",
  firstName: "REQUIRES_CONSENT",
  lastName: "REQUIRES_CONSENT",
  email: "REQUIRES_CONSENT",
  phone: "REQUIRES_CONSENT",
  leadSource: "ALLOWED",
  programInterest: "REQUIRES_CONSENT",
  localApplicationReference: "ALLOWED",
  tags: "UNKNOWN",
  communicationConsent: "ALLOWED",
  marketingConsent: "REQUIRES_CONSENT",
  transactionalCommunicationConsent: "REQUIRES_CONSENT",
  privacyTermsConsent: "REQUIRES_CONSENT",
  symptoms: "PROHIBITED",
  medicalHistory: "PROHIBITED",
  diagnoses: "PROHIBITED",
  medications: "PROHIBITED",
  allergies: "PROHIBITED",
  clinicalNotes: "PROHIBITED",
  prescriptions: "PROHIBITED",
  treatmentPlans: "PROHIBITED",
  clinicalIntakeAnswers: "PROHIBITED",
};

const prohibitedKeys = new Set(Object.entries(crmDataPolicy).filter(([, value]) => value === "PROHIBITED").map(([key]) => key));
const allowedKeys = new Set(Object.entries(crmDataPolicy).filter(([, value]) => value !== "UNKNOWN" && value !== "PROHIBITED").map(([key]) => key));

export function validateCrmContactInput(value: unknown): CrmContactInput {
  if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("CRM contact input must be an object.");
  const input = value as Record<string, unknown>;
  for (const key of Object.keys(input)) {
    if (prohibitedKeys.has(key)) throw new Error(`CRM field is prohibited: ${key}`);
    if (!allowedKeys.has(key)) throw new Error(`CRM field is not allowlisted: ${key}`);
  }
  if (typeof input.localUserId !== "string" || input.localUserId.trim() === "") throw new Error("localUserId is required.");
  if (input.communicationConsent !== undefined) {
    const consent = input.communicationConsent;
    if (!consent || typeof consent !== "object" || Array.isArray(consent)) throw new Error("communicationConsent is invalid.");
    for (const key of Object.keys(consent)) {
      if (!["marketingConsent", "transactionalCommunicationConsent", "privacyTermsConsent"].includes(key)) throw new Error(`Consent field is not allowlisted: ${key}`);
    }
    for (const key of ["marketingConsent", "transactionalCommunicationConsent", "privacyTermsConsent"]) {
      if (typeof (consent as Record<string, unknown>)[key] !== "boolean") throw new Error(`communicationConsent.${key} is required.`);
    }
  }
  return value as CrmContactInput;
}

export function containsProhibitedCrmData(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(containsProhibitedCrmData);
  return Object.entries(value).some(([key, child]) => prohibitedKeys.has(key) || containsProhibitedCrmData(child));
}
