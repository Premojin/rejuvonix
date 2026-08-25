import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request(`http://localhost${pathname}`, {
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

  return response;
}

test("renders Rejuvonix production metadata", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  assert.match(await response.text(), /<title>Rejuvonix \| Provider-Guided Wellness Online<\/title>/i);
});

test("renders all five assessment starting routes", async () => {
  const response = await render("/eligibility");
  assert.equal(response.status, 200);
  const html = await response.text();
  for (const route of ["weight-loss","performance","sexual-health","hair-restoration","skin-restoration"]) {
    assert.match(html, new RegExp(`href=["']/eligibility/${route}["']`, "i"));
  }
});

test("renders a program-specific assessment", async () => {
  const response = await render("/eligibility/performance");
  assert.equal(response.status, 200);
  assert.match(await response.text(), /Build a clearer picture of your performance goals/i);
});

test("assessment completion offers simulated account routes",async()=>{
  const source=await readFile(new URL("../app/components/EligibilityFlow.tsx",import.meta.url),"utf8");
  assert.match(source,/href="\/sign-up"/);
  assert.match(source,/href="\/sign-in"/);
  assert.match(source,/href="\/account\?assessment=complete"/);
  assert.match(source,/Assessment preview complete/);
});

test("renders pre-launch policy framework routes",async()=>{
  for(const [route,expected] of [["/privacy","Real patient information is not being accepted"],["/terms","Informational and simulated use only"],["/telehealth-consent","No telehealth consent is collected"],["/disclaimer","Education and access are separate from medical care"],["/accessibility","A clear experience for more people"]]){
    const response=await render(route);
    assert.equal(response.status,200);
    assert.match(await response.text(),new RegExp(expected,"i"));
  }
});

test("homepage omits fictional testimonials and links policy pages",async()=>{
  const response=await render("/");
  const html=await response.text();
  assert.doesNotMatch(html,/Sample review|What patients are saying/i);
  for(const route of ["privacy","terms","telehealth-consent","disclaimer","accessibility"]){
    assert.match(html,new RegExp(`href=["']/${route}["']`,"i"));
  }
});
