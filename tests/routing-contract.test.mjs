import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const routing = fs.readFileSync("app/components/routing.ts", "utf8");
const protocols = fs.readFileSync("app/components/protocol-data.ts", "utf8");
const authNav = fs.readFileSync("app/components/AuthNav.tsx", "utf8");
const page = fs.readFileSync("app/page.tsx", "utf8");
const compounded = fs.readFileSync("app/compounded/page.tsx", "utf8");
const detail = fs.readFileSync("app/protocols/[slug]/page.tsx", "utf8");
const activeUiFiles = [
  "app/page.tsx",
  "app/account/page.tsx",
  "app/components/AuthNav.tsx",
  "app/components/CognitoAuthEntry.tsx",
  "app/components/EligibilityFlow.tsx",
  "app/components/JinConnectedHealthExperience.tsx",
  "app/faq/page.tsx",
  "app/how-it-works/page.tsx",
  "app/membership/page.tsx",
  "app/support/page.tsx",
  "app/treatments/page.tsx",
];

test("production intake destinations are centralized", () => {
  assert.match(routing, /MAIN_GLP_INTAKE_URL\s*=\s*"https:\/\/patients\.rejuvonix\.com\/eligibility"/);
  assert.match(routing, /PEPTIDE_INTAKE_URL\s*=\s*"https:\/\/patients\.rejuvonix\.com\/eligibility"/);
  assert.match(routing, /PATIENT_PORTAL_URL\s*=\s*"https:\/\/patients\.rejuvonix\.com\/patients\/login"/);
});

test("GLP and peptide protocols classify to their correct intake", () => {
  assert.match(protocols, /\["semaglutide","tirzepatide","glp-1-microdose"\]\.includes\(protocol\.slug\)/);
  assert.match(detail, /intakeUrl\(protocol\.intakeType\)/);
});

test("GLP cards and patient portal use centralized destinations", () => {
  assert.match(page, /href=\{MAIN_GLP_INTAKE_URL\}/);
  assert.match(compounded, /href=\{MAIN_GLP_INTAKE_URL\}/);
  assert.match(authNav, /PATIENT_PORTAL_URL/);
  assert.doesNotMatch(authNav, />Account</);
});

test("active patient-facing links use the patients portal destinations", () => {
  const activeUi = activeUiFiles.map((file) => fs.readFileSync(file, "utf8")).join("\n");
  assert.match(activeUi, /https:\/\/patients\.rejuvonix\.com\/eligibility/);
  assert.match(activeUi, /https:\/\/patients\.rejuvonix\.com\/patients\/login/);
  assert.doesNotMatch(activeUi, /https:\/\/(?:www\.)?rejuvonix\.com\/(?:eligibility|patients\/login)/);
  assert.doesNotMatch(activeUi, /https:\/\/staging\.rejuvonix\.com\/(?:eligibility|patients\/login)/);
});
