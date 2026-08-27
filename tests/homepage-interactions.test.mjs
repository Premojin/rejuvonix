import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");

test("all actionable homepage tiles are single semantic card links", async () => {
  const response = await worker.fetch(new Request("http://localhost/"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const html = await response.text();
  const destinations = {
    "Weight Loss": "/eligibility/weight-loss",
    Performance: "/eligibility/performance",
    "Sexual Health": "/eligibility/sexual-health",
    "Hair Restoration": "/eligibility/hair-restoration",
    "Skin Regeneration": "/eligibility/skin-restoration",
    "Compounded care": "/compounded",
  };
  for (const [name, href] of Object.entries(destinations)) {
    const escapedHref = href.replace(/[.*+?^${}()|[\\]\\]/g, "\\$&");
    const card = html.match(new RegExp(`<a class="program-card [^"]+" href="${escapedHref}"[\\s\\S]*?<\\/a>`));
    assert.ok(card, `${name} card link`);
    assert.equal((card[0].match(/<a\b/g) ?? []).length, 1, `${name} has no nested anchors`);
    assert.match(card[0], /program-card-link/);
  }
});

test("Your Goals menu excludes Longevity & Skin while the route remains available", async () => {
  const response = await worker.fetch(new Request("http://localhost/"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  const html = await response.text();
  assert.doesNotMatch(html, /href="\/goals\/longevity-skin"/);
  const route = await worker.fetch(new Request("http://localhost/goals/longevity-skin"), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
  assert.equal(route.status, 200);
});
