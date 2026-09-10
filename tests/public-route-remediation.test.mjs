import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const routing = fs.readFileSync("app/components/routing.ts", "utf8");
const patientPage = fs.readFileSync("app/patients/login/page.tsx", "utf8");
const peptidePage = fs.readFileSync("app/peptides/eligibility/page.tsx", "utf8");

test("public route files and centralized URLs are aligned", () => {
  assert.match(fs.readFileSync("app/eligibility/page.tsx", "utf8"), /EligibilityProgramSelector/);
  assert.match(patientPage, /\.\.\/\.\.\/sign-in\/page/);
  assert.match(peptidePage, /EligibilityFlow/);
  assert.match(routing, /PATIENT_PORTAL_URL\s*=\s*"https:\/\/rejuvonix\.com\/patients\/login"/);
  assert.match(routing, /PEPTIDE_INTAKE_URL\s*=\s*"https:\/\/rejuvonix\.com\/peptides\/eligibility"/);
});

test("patient login reuses the existing patient Cognito boundary", () => {
  assert.equal(patientPage.includes("useState"), false);
  assert.equal(patientPage.includes("authorizationEndpoint"), false);
  const signInPage = fs.readFileSync("app/sign-in/page.tsx", "utf8");
  assert.match(signInPage, /api\/v1\/auth\/config/);
  assert.match(signInPage, /Patient sign in/);
  assert.doesNotMatch(patientPage, /admin|clinician|practitioner|operations/i);
});

test("peptide entry reuses governed eligibility without adding PHI fields", () => {
  assert.match(peptidePage, /program="performance"/);
  assert.match(peptidePage, /Peptide eligibility \/ intake/);
  assert.doesNotMatch(peptidePage, /useState|<input|<textarea|<select|medical history|allerg|symptom|diagnos|medication/i);
});
