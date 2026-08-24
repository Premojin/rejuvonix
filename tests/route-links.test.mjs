import assert from "node:assert/strict";
import test from "node:test";

const publicRoutes = [
  "/",
  "/compounded",
  "/faq",
  "/get-started",
  "/how-it-works",
  "/safety",
  "/sign-in",
  "/support",
  "/treatments",
  "/treatments/glp-1-injections",
  "/treatments/glp-1-tablets",
  "/treatments/wegovy-pill",
  "/treatments/wegovy-injection",
  "/treatments/zepbound-injection",
];

async function fetchWorker(path) {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("route-audit", `${process.pid}-${Date.now()}-${path}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${path}`),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

function internalLinks(html) {
  return [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)].map((match) => match[1]);
}

test("all canonical public routes render and invalid routes return 404", async () => {
  for (const route of publicRoutes) {
    const response = await fetchWorker(route);
    assert.equal(response.status, 200, `${route} should render successfully`);
  }

  const invalid = await fetchWorker("/treatments/not-a-real-treatment");
  assert.equal(invalid.status, 404);
});

test("public internal links resolve without broken routes or anchors", async () => {
  const broken = [];

  for (const route of publicRoutes) {
    const response = await fetchWorker(route);
    const html = await response.text();
    for (const href of internalLinks(html)) {
      if (href.startsWith("//") || href.startsWith("mailto:") || href.startsWith("tel:")) continue;
      const target = new URL(href, `http://localhost${route}`);
      if (target.origin !== "http://localhost") continue;

      if (target.pathname === new URL(`http://localhost${route}`).pathname && target.hash) {
        const anchor = target.hash.slice(1);
        if (!new RegExp(`(?:id|name)="${anchor.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`).test(html)) {
          broken.push(`${route} -> ${href} (missing anchor)`);
        }
        continue;
      }

      const targetResponse = await fetchWorker(`${target.pathname}${target.search}`);
      if (targetResponse.status >= 400) broken.push(`${route} -> ${href} (${targetResponse.status})`);
    }
  }

  assert.deepEqual(broken, []);
});

test("health remains minimal and public clinical portal paths are not exposed", async () => {
  const health = await fetchWorker("/api/health");
  assert.equal(health.status, 200);
  assert.deepEqual(await health.json(), { status: "ok" });

  for (const path of ["/patient", "/clinician", "/admin", "/operations"]) {
    const response = await fetchWorker(path);
    assert.equal(response.status, 404, `${path} is not an implemented public route`);
  }
});
