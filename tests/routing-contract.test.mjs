import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const routing = fs.readFileSync("app/components/routing.ts", "utf8");
const protocols = fs.readFileSync("app/components/protocol-data.ts", "utf8");
const siteChrome = fs.readFileSync("app/components/SiteChrome.tsx", "utf8");
const page = fs.readFileSync("app/page.tsx", "utf8");
const compounded = fs.readFileSync("app/compounded/page.tsx", "utf8");
const detail = fs.readFileSync("app/protocols/[slug]/page.tsx", "utf8");

test("production intake destinations are centralized", () => {
  assert.match(routing, /MAIN_GLP_INTAKE_URL\s*=\s*"https:\/\/rejuvonix\.com\/eligibility"/);
  assert.match(routing, /PEPTIDE_INTAKE_URL\s*=\s*"https:\/\/rejuvonix\.com\/peptides\/eligibility"/);
  assert.match(routing, /PATIENT_PORTAL_URL\s*=\s*"https:\/\/rejuvonix\.com\/patients\/login"/);
});

test("GLP and peptide protocols classify to their correct intake", () => {
  assert.match(protocols, /\["semaglutide","tirzepatide","glp-1-microdose"\]\.includes\(protocol\.slug\)/);
  assert.match(detail, /intakeUrl\(protocol\.intakeType\)/);
});

test("GLP cards and patient portal use centralized destinations", () => {
  assert.match(page, /href=\{MAIN_GLP_INTAKE_URL\}/);
  assert.match(compounded, /href=\{MAIN_GLP_INTAKE_URL\}/);
  assert.match(siteChrome, /PATIENT_PORTAL_URL/);
  assert.doesNotMatch(siteChrome, />Account</);
});
