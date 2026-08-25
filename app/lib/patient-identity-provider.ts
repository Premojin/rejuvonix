export type PatientIdentity={subject:string;verifiedEmail:string;displayName:string|null};

export interface PatientIdentityProvider{
  readonly name:string;
  readonly enabled:boolean;
  getCurrentPatient(request:Request):Promise<PatientIdentity|null>;
  getSignInUrl(returnTo:string):Promise<string>;
}

class DisabledPatientIdentityProvider implements PatientIdentityProvider{
  readonly name="not-configured";
  readonly enabled=false;
  async getCurrentPatient(){return null;}
  async getSignInUrl(){throw new Error("Public patient authentication has not been approved or configured.");}
}

export const patientIdentityProvider:PatientIdentityProvider=new DisabledPatientIdentityProvider();
