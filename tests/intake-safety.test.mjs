import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

test("PHI persistence remains disabled",async()=>{
  const hosting=JSON.parse(await readFile(new URL("../.openai/hosting.json",import.meta.url),"utf8"));
  assert.equal(hosting.d1,null);
  assert.equal(hosting.r2,null);
});

test("no raw public PHI intake API exists",async()=>{
  await assert.rejects(()=>readFile(new URL("../app/api/intake/route.ts",import.meta.url),"utf8"),error=>error?.code==="ENOENT");
  const workflow=await readFile(new URL("../app/api/v1/workflow/route.ts",import.meta.url),"utf8");
  assert.match(workflow,/APP_ENV === "local"/);
  assert.doesNotMatch(workflow,/answers|medicalHistory|diagnosis|prescription/);
});

test("automated Weight Loss dispositions remain disabled",async()=>{
  const source=await readFile(new URL("../app/lib/weight-loss-clinical-draft.ts",import.meta.url),"utf8");
  assert.match(source,/weightLossAutomatedDispositionRulesEnabled=false/);
  assert.doesNotMatch(source,/clinicalApproval:\s*"approved"/);
});

test("patient identity and clinical intake providers remain disabled",async()=>{
  const identity=await readFile(new URL("../app/lib/patient-identity-provider.ts",import.meta.url),"utf8");
  const intake=await readFile(new URL("../app/lib/clinical-intake-provider.ts",import.meta.url),"utf8");
  assert.match(identity,/readonly enabled=false/);
  assert.match(intake,/enabled: false/);
});

test("readiness approvals default to false",async()=>{
  const source=await readFile(new URL("../app/lib/intake-readiness.ts",import.meta.url),"utf8");
  assert.match(source,/phiHostingApproval:false/);
  assert.match(source,/counselApprovedPolicies:false/);
  assert.match(source,/clinicalProtocols:false/);
});

test("EmberFlow is selected but cannot transmit data",async()=>{
  const provider=await readFile(new URL("../app/lib/clinical-intake-provider.ts",import.meta.url),"utf8");
  const contract=await readFile(new URL("../app/lib/emberflow-connection-contract.ts",import.meta.url),"utf8");
  assert.match(provider,/clinicalDataProvider/);
  assert.doesNotMatch(provider,/baseUrl|auth headers|fetch\s*\(/);
  assert.match(contract,/emberFlowConnectionEnabled = false as const/);
  assert.doesNotMatch(contract,/\b(baseUrl|authenticationMethod|webhookEventNames|payload):/);
});

test("EmberFlow fixture is fictional and provider-review only",async()=>{
  const fixture=JSON.parse(await readFile(new URL("./fixtures/emberflow-fictional-intake.json",import.meta.url),"utf8"));
  assert.equal(fixture.fixture,true);
  assert.match(fixture.patient.externalReference,/^fictional-/);
  assert.match(fixture.patient.email,/@example\.com$/);
  assert.equal(fixture.assessment.disposition,"provider-review-required");
  assert.deepEqual(fixture.consents,[]);
  assert.deepEqual(fixture.uploads,[]);
});

test("Weight Loss clinical draft cannot submit",async()=>{
  const source=await readFile(new URL("../app/components/WeightLossClinicalDraft.tsx",import.meta.url),"utf8");
  assert.doesNotMatch(source,/fetch\s*\(/);
  assert.doesNotMatch(source,/localStorage|sessionStorage/);
  assert.match(source,/not submitted or saved/i);
});

test("simulated account remains session-local and fictional",async()=>{
  const source=await readFile(new URL("../app/components/SimulatedAccountFlow.tsx",import.meta.url),"utf8");
  assert.match(source,/sessionStorage/);
  assert.match(source,/@example\.com/);
  assert.doesNotMatch(source,/fetch\s*\(/);
  assert.doesNotMatch(source,/localStorage/);
  assert.match(source,/No account is created/);
  for(const stage of ["Assessment complete","Provider review pending","More information needed","Provider outcome","Pharmacy handoff","Follow-up","Reassessment & renewal"]){
    assert.match(source,new RegExp(stage));
  }
  assert.match(source,/No medication, dose or prescription is generated/);
});
