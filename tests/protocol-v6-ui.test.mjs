import assert from "node:assert/strict";
import test from "node:test";
import {access,readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const read=(p)=>readFile(path.join(root,p),"utf8");

const card=await read("app/components/ProtocolCard.tsx");
const data=await read("app/components/protocol-data.ts");
const index=await read("app/protocols/page.tsx");
const shelf=await read("app/components/ProtocolShelf.tsx");
const detail=await read("app/protocols/[slug]/page.tsx");
const home=await read("app/page.tsx");
const compounded=await read("app/compounded/page.tsx");
const css=(await read("app/protocols.css"))+(await read("app/revamp.css"))+(await read("app/detail-pages.css"));

test("V6 supplied bottle assets are packaged locally",async()=>{
  for(const file of ["public/v6/compounded-medication-generic.png","public/v6/semaglutide-2.5mg-ml.png","public/v6/tirzepatide-5mg-0.5ml.png","public/v6/glp1-microdose-500mcg-ml.png"]){await access(path.join(root,file));}
});

test("protocol cards include bottle, price, trust lines and named CTA",()=>{
  assert.match(card,/protocol-card-visual/);
  assert.match(card,/protocol\.priceLabel/);
  assert.match(card,/Reviewed by a licensed provider/);
  assert.match(card,/Compounded in a U\.S\. pharmacy/);
  assert.match(card,/View \{protocol\.name\}/);
  assert.match(card,/hasCompoundedPharmacy/);
  assert.match(data,/from \$239\/mo/);
  assert.match(data,/from \$199\/mo/);
  assert.match(data,/from \$159\/mo/);
});

test("protocol library and goal collections use horizontal shelves and compact trust strip",()=>{
  assert.match(shelf,/protocol-scroll-track/);
  assert.match(detail,/protocol-scroll-track/);
  assert.match(index,/ProtocolTrustStrip/);
  assert.match(detail,/ProtocolTrustStrip/);
  assert.match(css,/scroll-snap-type:x/);
});

test("protocol detail hero uses floating bottle and goal orbit with lower related-goals row",()=>{
  assert.match(detail,/protocol-hero-product/);
  assert.match(detail,/protocol-floating-goal/);
  assert.match(detail,/protocol-detail-lower/);
  assert.match(css,/protocolBottleFloat/);
});

test("homepage and compounded page both include Semaglutide, Tirzepatide and GLP-1 Microdose",()=>{
  for(const source of [home,compounded]){
    assert.match(source,/GLP-1 Microdose/);
    assert.match(source,/assessment/i);
  }
});

test("V7 GLP cards use the dedicated bottle assets and a dedicated visual zone",()=>{
  const source=home;
  for(const asset of ["semaglutide-2.5mg-ml.png","tirzepatide-5mg-0.5ml.png","glp1-microdose-500mcg-ml.png"]){assert.match(source,new RegExp(`/v6/${asset}`));}
  assert.equal((source.match(/glance-visual-zone/g)??[]).length,3);
  assert.equal((source.match(/glance-number/g)??[]).length,3);
});

test("V7 protocol detail uses a shared orbital halo track",()=>{
  assert.match(detail,/protocol-goal-orbit-track/);
  assert.match(css,/protocolNeckHalo/);
});

test("V7 catalog count and protocol shelf controls are data-driven and accessible",()=>{
  assert.match(detail,/\{items\.length\}/);
  assert.match(css,/protocol-shelf-arrow/);
});

test("Compound Care CTAs use the shared protocol CTA visual tokens",()=>{
  assert.match(css,/\.protocol-card-cta[^}]*border-radius:999px/);
  assert.match(css,/\.two-treatment-grid-v6 \.compounded-option-card>b[^}]*border-radius:999px/);
});

test("current compounded presentation uses the supplied generic vial and removes the duplicate treatment-options section",()=>{
  assert.match(home,/title:\"Compounded care\"[^\n]+v6\/compounded-medication-generic\.png/);
  assert.doesNotMatch(home,/Treatment options/);
  assert.match(compounded,/v6\/compounded-medication-generic\.png/);
});

test("numbered cards and protocol summaries retain the supplied bottle behind pulsing rings",()=>{
  assert.match(home,/glance-number/);
  assert.match(index,/protocol-count-ring/);
  assert.match(css,/compoundedNumberPulse/);
  assert.match(css,/protocolCountPulse/);
});

test("protocol assurance message follows the category navigation",()=>{
  assert.match(index,/protocol-filter-bar[\s\S]*<\/nav>[\s\S]*ProtocolTrustStrip/);
  assert.match(card,/Trustpilot/);
  assert.match(card,/HIPAA-compliant/);
});

test("goal identities are text-led and navigation receives aqua glow underline",()=>{
  assert.match(css,/protocol-goal-tags i\{padding:0!important;background:transparent!important/);
  assert.match(css,/protocol-filter-bar a:after/);
  assert.match(css,/box-shadow:0 0 9px rgba\(52,198,216,.8\)/);
  assert.match(css,/a:focus-visible/);
});
