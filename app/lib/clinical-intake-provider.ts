import type {IntakeProgram} from "./intake-contract";
import type {PatientIdentity} from "./patient-identity-provider";

export type ClinicalIntakeHandoff={externalReference:string;continueUrl:string};
export type ClinicalIntakeDraft={program:IntakeProgram;schemaVersion:number;answers:Record<string,unknown>};

export interface ClinicalIntakeProvider{
  readonly name:string;
  readonly enabled:boolean;
  createDraft(patient:PatientIdentity,draft:ClinicalIntakeDraft):Promise<ClinicalIntakeHandoff>;
}

class PendingEmberFlowClinicalIntakeProvider implements ClinicalIntakeProvider{
  readonly name="emberflow-clinic-accelerator";
  readonly enabled=false;
  async createDraft(){throw new Error("EmberFlow clinical intake has been selected but its approved connection details have not been configured.");}
}

export const clinicalIntakeProvider:ClinicalIntakeProvider=new PendingEmberFlowClinicalIntakeProvider();
