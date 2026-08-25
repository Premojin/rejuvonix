import {clinicalIntakeProvider} from "./clinical-intake-provider";
import {patientIdentityProvider} from "./patient-identity-provider";

export type IntakeReadiness={ready:boolean;checks:{patientIdentity:boolean;clinicalIntake:boolean;phiHostingApproval:boolean;counselApprovedPolicies:boolean;clinicalProtocols:boolean}};

// These approvals must eventually come from controlled deployment settings or
// an approved administrative system. They are deliberately false in source.
export function getIntakeReadiness():IntakeReadiness{
  const checks={
    patientIdentity:patientIdentityProvider.enabled,
    clinicalIntake:clinicalIntakeProvider.enabled,
    phiHostingApproval:false,
    counselApprovedPolicies:false,
    clinicalProtocols:false,
  };
  return {ready:Object.values(checks).every(Boolean),checks};
}
