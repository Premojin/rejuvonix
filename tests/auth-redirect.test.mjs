import assert from "node:assert/strict";
import test from "node:test";

const { getAuthLogoutUri, getAuthRedirectUri } = await import("../app/clinical/auth-redirect.mjs");

test("resolves production auth URLs from the production host", () => {
  const request = new Request("https://rejuvonix.com/api/v1/auth/config");
  assert.equal(getAuthRedirectUri(request), "https://rejuvonix.com/auth/callback");
  assert.equal(getAuthLogoutUri(request), "https://rejuvonix.com/");
});

test("retains staging auth URLs on the staging host", () => {
  const request = new Request("https://staging.rejuvonix.com/api/v1/auth/config");
  assert.equal(getAuthRedirectUri(request), "https://staging.rejuvonix.com/auth/callback");
  assert.equal(getAuthLogoutUri(request), "https://staging.rejuvonix.com/");
});

test("retains localhost auth URLs during local development", () => {
  const request = new Request("http://localhost:5173/api/v1/auth/config");
  assert.equal(getAuthRedirectUri(request), "http://localhost:5173/auth/callback");
  assert.equal(getAuthLogoutUri(request), "http://localhost:5173/");
});
