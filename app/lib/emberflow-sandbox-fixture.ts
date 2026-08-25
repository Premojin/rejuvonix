import type {IntakeProgram} from "./intake-contract";

export type FictionalEmberFlowFixture={
  fixture:true;
  schemaVersion:number;
  program:IntakeProgram;
  patient:{externalReference:string;firstName:string;lastName:string;email:string;phone:string};
  assessment:{answers:Record<string,unknown>;disposition:"provider-review-required"};
  consents:[];
  uploads:[];
};

export function assertFictionalFixture(fixture:FictionalEmberFlowFixture):void{
  if(fixture.fixture!==true) throw new Error("Only marked fictional fixtures are allowed before sandbox approval.");
  if(!fixture.patient.email.endsWith("@example.com")) throw new Error("Fictional fixture email must use example.com.");
  if(!fixture.patient.externalReference.startsWith("fictional-")) throw new Error("Fictional patient references must be clearly marked.");
  if(fixture.consents.length||fixture.uploads.length) throw new Error("Consent acceptance and uploads are disabled in fictional pre-sandbox fixtures.");
  if(fixture.assessment.disposition!=="provider-review-required") throw new Error("Fixtures cannot simulate automated approval or denial.");
}
