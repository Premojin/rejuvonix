import assert from "node:assert/strict";
import test from "node:test";

const { getAuthLogoutUri, getAuthRedirectUri } = await import("../app/clinical/auth-redirect.mjs");

test("resolves production auth URLs from the production host", () => {
  const request = new Request("https://rejuvonix.com/api/v1/auth/config");
  assert.equal(getAuthRedirectUri(request), "https://rejuvonix.com/auth/callback");
  assert.equal(getAuthLogoutUri(request), "https://rejuvonix.com/");
});

test("rejects the retired staging host", () => {
  const request = new Request("https://staging.rejuvonix.com/api/v1/auth/config");
  assert.throws(() => getAuthRedirectUri(request), /Authentication host is not configured/);
  assert.throws(() => getAuthLogoutUri(request), /Authentication host is not configured/);
});

test("retains localhost auth URLs during local development", () => {
  const request = new Request("http://localhost:5173/api/v1/auth/config");
  assert.equal(getAuthRedirectUri(request), "http://localhost:5173/auth/callback");
  assert.equal(getAuthLogoutUri(request), "http://localhost:5173/");
});
