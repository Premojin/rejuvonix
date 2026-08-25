import type {IntakeProgram} from "../lib/intake-contract";

/**
 * Rejuvonix's internal boundary for a regulated clinical provider.
 *
 * This interface intentionally contains only application-level workflow
 * concepts. It does not describe EmberFlow endpoints, payloads, or auth.
 */
export type ClinicalWorkflowRequest = {
  patientId: string;
  program: IntakeProgram;
  requestId: string;
};

export type ClinicalWorkflowReference = {
  provider: string;
  externalReference: string;
  workflowStatus: "awaiting-provider-configuration" | "handoff-ready";
  continueUrl: string | null;
};

export interface ClinicalDataProvider {
  readonly name: string;
  readonly mode: "mock" | "external";
  beginClinicalIntake(request: ClinicalWorkflowRequest): Promise<ClinicalWorkflowReference>;
  getClinicalWorkflowStatus(reference: string): Promise<ClinicalWorkflowReference>;
}

function assertWorkflowRequest(request: ClinicalWorkflowRequest): void {
  if (!request.patientId.trim()) throw new Error("A patient application reference is required.");
  if (!request.requestId.trim()) throw new Error("A workflow request ID is required.");
  if (!request.program.trim()) throw new Error("A workflow program is required.");
}

/**
 * Local-only provider. It returns opaque synthetic references and never accepts
 * or stores clinical answers. It must not be presented as an EmberFlow call.
 */
export class MockClinicalProvider implements ClinicalDataProvider {
  readonly name = "mock-clinical-provider";
  readonly mode = "mock" as const;

  async beginClinicalIntake(request: ClinicalWorkflowRequest): Promise<ClinicalWorkflowReference> {
    assertWorkflowRequest(request);
    return {
      provider: this.name,
      externalReference: `mock-workflow-${request.requestId}`,
      workflowStatus: "awaiting-provider-configuration",
      continueUrl: null,
    };
  }

  async getClinicalWorkflowStatus(reference: string): Promise<ClinicalWorkflowReference> {
    if (!reference.startsWith("mock-workflow-")) throw new Error("Unknown local workflow reference.");
    return {
      provider: this.name,
      externalReference: reference,
      workflowStatus: "awaiting-provider-configuration",
      continueUrl: null,
    };
  }
}

export const clinicalDataProvider: ClinicalDataProvider = new MockClinicalProvider();
