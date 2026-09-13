import { randomUUID } from "node:crypto";

export type ClinicalWorkflowStatus = "INTEGRATION_NOT_CONFIGURED" | "MOCK_READY";

export interface ClinicalWorkflowReference {
  status: ClinicalWorkflowStatus;
  externalReference?: string;
}

/**
 * Rejuvonix-owned contract for an eventual regulated-provider adapter.
 * This deliberately contains no provider URL, authentication, payload, or
 * webhook assumptions.
 */
export interface ClinicalDataProvider {
  beginClinicalIntake(input: { patientReference: string; correlationId: string }): Promise<ClinicalWorkflowReference>;
}

class UnconfiguredClinicalProvider implements ClinicalDataProvider {
  async beginClinicalIntake(): Promise<ClinicalWorkflowReference> {
    return { status: "INTEGRATION_NOT_CONFIGURED" };
  }
}

class MockClinicalProvider implements ClinicalDataProvider {
  async beginClinicalIntake(): Promise<ClinicalWorkflowReference> {
    return { status: "MOCK_READY", externalReference: `local-mock-${randomUUID()}` };
  }
}

export function getClinicalDataProvider(): ClinicalDataProvider {
  const environment = process.env.APP_ENV ?? "local";
  return process.env.CLINICAL_PROVIDER === "mock" && (environment === "local" || environment === "test")
    ? new MockClinicalProvider()
    : new UnconfiguredClinicalProvider();
}

const prohibitedClinicalKeys = new Set([
  "clinicalAnswers", "symptoms", "medicalHistory", "allergies", "medications",
  "diagnoses", "clinicalNotes", "assessments", "prescriptions", "treatmentDecisions",
  "encounterNarrative",
]);

export function containsClinicalPayload(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  if (Array.isArray(value)) return value.some(containsClinicalPayload);
  return Object.entries(value).some(([key, child]) => prohibitedClinicalKeys.has(key) || containsClinicalPayload(child));
}
