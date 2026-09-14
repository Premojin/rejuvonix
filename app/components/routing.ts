export const MAIN_GLP_INTAKE_URL = "/eligibility/weight-loss";
export const PEPTIDE_INTAKE_URL = "/peptides/eligibility";
export const PATIENT_PORTAL_URL = "/patients/login";

export type IntakeType = "glp" | "peptide";

export function intakeUrl(intakeType: IntakeType): string {
  return intakeType === "glp" ? MAIN_GLP_INTAKE_URL : PEPTIDE_INTAKE_URL;
}
