export const MAIN_GLP_INTAKE_URL = "https://rejuvonix.com/eligibility";
export const PEPTIDE_INTAKE_URL = "https://rejuvonix.com/peptides/eligibility";
export const PATIENT_PORTAL_URL = "https://rejuvonix.com/patients/login";

export type IntakeType = "glp" | "peptide";

export function intakeUrl(intakeType: IntakeType): string {
  return intakeType === "glp" ? MAIN_GLP_INTAKE_URL : PEPTIDE_INTAKE_URL;
}
