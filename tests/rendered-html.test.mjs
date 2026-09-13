import assert from "node:assert/strict";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");

test("renders the public home page metadata and content", async () => {
  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>Rejuvonix \| Online Weight Care<\/title>/i);
  assert.match(html, /Personalized(?:<[^>]+>|\s)+care(?:<[^>]+>|\s)+for(?:<[^>]+>|\s)+how you(?:<[^>]+>|\s)+want to live\./i);
  assert.match(html, /Explore online pathways for weight loss/i);
  assert.doesNotMatch(html, /<span class="mega-column mega-existing">[\s\S]*Longevity &amp; Skin/i);
});

test("exposes a non-sensitive health response", async () => {
  const response = await worker.fetch(
    new Request("http://localhost/api/health", {
      headers: { accept: "application/json" },
    }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );

  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { status: "ok" });
});
