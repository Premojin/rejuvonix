import assert from "node:assert/strict";
import fs from "node:fs";
import test from "node:test";

const { default: worker } = await import("../dist/server/index.js");
const siteChrome = fs.readFileSync("app/components/SiteChrome.tsx", "utf8");
const protocolsCss = fs.readFileSync("app/protocols.css", "utf8");

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
  assert.doesNotMatch(html, /LegitScript|legitscript\.com|static\.legitscript\.com/i);
  assert.match(html, /HIPAA compliant crest/i);
  assert.match(html, /Compounded in USA/i);
});

test("trust marks preserve the remaining certification items without LegitScript", () => {
  assert.doesNotMatch(siteChrome, /LegitScript|legitscript\.com|static\.legitscript\.com/i);
  assert.equal((siteChrome.match(/className="protocol-trust-mark"/g) ?? []).length, 2);
  assert.match(siteChrome, /src="\/hipaa-crest\.png"/i);
  assert.match(siteChrome, /src="\/compounded-usa-crest\.png"/i);
  assert.match(siteChrome, /Compounded in USA\*/i);
  assert.match(protocolsCss, /\.detail-footer>\.protocol-footer-trust\{grid-template-columns:repeat\(2,/);
  assert.match(protocolsCss, /@media\(max-width:900px\)\{\.detail-footer>\.protocol-footer-trust\{grid-template-columns:repeat\(2,/);
  assert.match(protocolsCss, /@media\(max-width:680px\)\{\.detail-footer>\.protocol-footer-trust\{grid-template-columns:minmax\(0,1fr\)/);
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
