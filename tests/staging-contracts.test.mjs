import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function fetchWorker(path, init = {}) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("contract", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`, init),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("homepage exposes critical navigation and experience sections", async () => {
  const response = await fetchWorker("/");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const marker of ["Treatments", "How it works", "Personalized care for how you want to live.", "The Rejuvonix program", "Check my eligibility"]) {
    assert.match(html, new RegExp(marker.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")));
  }
});

test("homepage includes review carousel controls and responsive navigation markup", async () => {
  const response = await fetchWorker("/");
  const html = await response.text();
  assert.match(html, /aria-label="Previous experience"/);
  assert.match(html, /aria-label="Next experience"/);
  assert.match(html, /aria-label="Toggle menu"/);
});

test("homepage eligibility dialog retains its accessibility safeguards", async () => {
  const [pageSource, globalStyles] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(pageSource, /setTimeout\(\(\) => setQuizOpen\(true\)/);
  assert.match(pageSource, /role="dialog"/);
  assert.match(pageSource, /aria-modal="true"/);
  assert.match(pageSource, /aria-labelledby="quiz-title"/);
  assert.match(pageSource, /aria-describedby=/);
  assert.match(pageSource, /event\.key === "Escape"/);
  assert.match(pageSource, /event\.key !== "Tab"/);
  assert.match(pageSource, /modalCloseRef\.current\?\.focus\(\)/);
  assert.match(pageSource, /document\.body\.style\.overflow = "hidden"/);
  assert.match(pageSource, /document\.body\.style\.overflow = ""/);
  assert.match(pageSource, /Question \{step \+ 1\} of 3/);
  assert.match(pageSource, /Do not enter real health information/);
  assert.match(globalStyles, /\.quiz-modal\{min-height:100%/);
  assert.match(globalStyles, /\.quiz-modal\{min-height:100%[^}]*overflow-y:auto/);
  assert.match(globalStyles, /prefers-reduced-motion:reduce/);
});

test("unknown public route returns a not-found response", async () => {
  const response = await fetchWorker("/does-not-exist");
  assert.equal(response.status, 404);
});

test("health endpoint remains minimal and non-sensitive", async () => {
  const response = await fetchWorker("/api/health", { headers: { accept: "application/json" } });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
  assert.equal(response.headers.get("set-cookie"), null);
});

test("security headers are present on public responses", async () => {
  const response = await fetchWorker("/");
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "DENY");
  assert.match(response.headers.get("content-security-policy") ?? "", /frame-ancestors 'none'/);
});
