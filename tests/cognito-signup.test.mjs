import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const signup = fs.readFileSync("app/sign-up/page.tsx", "utf8");
const signupForm = fs.readFileSync("app/components/PatientSignupForm.tsx", "utf8");
const signupApi = fs.readFileSync("app/api/v1/auth/signup/route.ts", "utf8");
const confirmApi = fs.readFileSync("app/api/v1/auth/signup/confirm/route.ts", "utf8");
const resendApi = fs.readFileSync("app/api/v1/auth/signup/resend/route.ts", "utf8");
const account = fs.readFileSync("app/account/page.tsx", "utf8");
const eligibility = fs.readFileSync("app/components/EligibilityFlow.tsx", "utf8");
const selector = fs.readFileSync("app/components/EligibilityProgramSelector.tsx", "utf8");
const signIn = fs.readFileSync("app/sign-in/page.tsx", "utf8");
const callback = fs.readFileSync("app/auth/callback/page.tsx", "utf8");
const recovery = fs.readFileSync("app/forgot-password/page.tsx", "utf8");
const authProvider = fs.readFileSync("app/components/AuthProvider.tsx", "utf8");
const authNav = fs.readFileSync("app/components/AuthNav.tsx", "utf8");

test("signup uses the existing Cognito boundary", () => {
  assert.match(signup, /PatientSignupForm/);
  for (const field of ["First Name", "Last Name", "Email Address", "Mobile Phone Number", "Password", "Confirm Password", "Terms of Use", "Privacy Policy"]) assert.match(signupForm, new RegExp(field));
  assert.match(signupForm, /given-name/);
  assert.match(signupForm, /family-name/);
  assert.match(signupForm, /Create Account/);
  assert.match(signupForm, /verificationCode/);
  assert.match(signupForm, /one-time-code/);
  assert.match(signupForm, /Resend code/);
  assert.match(signupApi, /AWSCognitoIdentityProviderService.SignUp/);
  assert.match(signupApi, /given_name/);
  assert.match(signupApi, /family_name/);
  assert.match(signupApi, /phone_number/);
  assert.doesNotMatch(signup, /SimulatedAccountFlow|demo account|sessionStorage/i);
  assert.doesNotMatch(signupForm, /role|clinician|administrator|medical history|symptom|diagnos|medication/i);
  assert.doesNotMatch(signupApi, /console\.(log|error)/i);
  assert.match(confirmApi, /AWSCognitoIdentityProviderService\.ConfirmSignUp/);
  assert.match(confirmApi, /ConfirmationCode/);
  assert.match(resendApi, /AWSCognitoIdentityProviderService\.ResendConfirmationCode/);
});

test("patient authentication UX uses verified session state", () => {
  assert.match(signIn, /Sign in to Rejuvonix/);
  assert.match(signIn, /forgot-password/);
  assert.match(signIn, /sign-up/);
  assert.match(callback, /api\/v1\/auth\/me/);
  assert.doesNotMatch(callback, /authenticated=1/);
  assert.match(authProvider, /api\/v1\/auth\/me/);
  assert.match(authProvider, /INVALID_AUTHENTICATION/);
  assert.match(authNav, /Signed in/);
  assert.match(authNav, /Sign out/);
});

test("password recovery remains Cognito-owned", () => {
  assert.match(recovery, /Forgot your password/);
  assert.match(recovery, /Cognito/);
  assert.match(fs.readFileSync("app/components/CognitoRecoveryEntry.tsx", "utf8"), /loginEndpoint/);
  assert.doesNotMatch(recovery, /password.*input|verification.*input/i);
});

test("account and eligibility no longer link into the demo flow", () => {
  assert.match(account, /\/api\/v1\/auth\/me/);
  assert.match(account, /\/api\/v1\/auth\/signout/);
  assert.doesNotMatch(account, /SimulatedAccountFlow|DemoAccountDashboard|sessionStorage|demo/i);
  assert.match(eligibility, /href="\/sign-up"/);
  assert.match(eligibility, /href="\/patients\/login"/);
  assert.doesNotMatch(eligibility, /Create demo account|Sign in to demo|simulated member dashboard/);
});

test("assessment selector links each program to its own assessment route", () => {
  assert.match(selector, /const assessmentUrl=\(programSlug:string\)=>`\/eligibility\/\$\{programSlug\}`/);
  assert.match(selector, /href=\{assessmentUrl\(program\.slug\)\}/g);
  assert.doesNotMatch(selector, /intakeUrl\(/);
});
