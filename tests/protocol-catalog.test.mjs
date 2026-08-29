import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

const source=await readFile(new URL("../app/components/protocol-data.ts",import.meta.url),"utf8");
const manifestText=await readFile(new URL("../app/data/coa-manifest.json",import.meta.url),"utf8");
const manifest=JSON.parse(manifestText);
const protocolRegion=source.split("const baseProtocols: BaseProtocolItem[] = [")[1]?.split("];\n\nconst documentationManifest")[0]??"";
const slugs=[...protocolRegion.matchAll(/\{slug:"([^"]+)"/g)].map((match)=>match[1]);
const approvedFinishedProducts=new Set(["semaglutide","tirzepatide","tesamorelin","ss-31","pt-141"]);

const batches=Object.entries(manifest).flatMap(([slug,record])=>(record.batches??[]).map((batch)=>({slug,...batch})));

test("protocol catalog preserves five Rejuvonix goal filters",()=>{
  for(const slug of ["weight-loss","performance","sexual-health","hair-restoration","skin-regeneration"]){
    assert.match(source,new RegExp(`slug:\\"${slug}\\"`));
  }
});

test("protocol catalog contains 20 unique entries including the full GLP-1 Microdose record",()=>{
  assert.equal(slugs.length,20);
  assert.equal(slugs.length,new Set(slugs).size);
  assert.match(source,/slug:\"glp-1-microdose\"/);
});

test("FDA-approved finished products retain official primary documentation without requiring a COA",()=>{
  for(const slug of approvedFinishedProducts){
    const record=manifest[slug];
    assert.ok(record,`${slug}: manifest record missing`);
    assert.equal(record.status,"official-documentation",`${slug}: should use official documentation as primary source`);
    assert.match(record.url,/^https:\/\//,`${slug}: official documentation URL required`);
    assert.doesNotMatch(record.url,/\/documents\/coa\//,`${slug}: primary approved-product document must not be a local COA`);
  }
});

test("supplied COAs are represented as batch-specific local documents",()=>{
  assert.equal(batches.length,19,"expected all 19 distinct supplied certificate files to be mapped");
  assert.equal(new Set(batches.map((batch)=>batch.sha256)).size,19,"certificate binaries should be unique after true-duplicate removal");
  for(const batch of batches){
    assert.match(batch.url,/^\/documents\/coa\/.*\.pdf$/i,`${batch.slug}/${batch.id}: local certificate path required`);
    assert.ok(batch.lot&&batch.laboratory&&batch.formulation&&batch.testedAt,`${batch.slug}/${batch.id}: batch metadata incomplete`);
  }
});

test("multi-part certificate packages remain grouped under one batch",()=>{
  for(const [slug,lot] of [["nad-plus","LG52243282"],["sermorelin","LG52241285"],["glutathione","ProRx062625-1"]]){
    const batch=(manifest[slug].batches??[]).find((item)=>item.lot===lot);
    assert.ok(batch,`${slug}/${lot}: batch missing`);
    assert.equal(batch.parts?.length,2,`${slug}/${lot}: expected Part 1 and Part 2 companion links`);
    assert.ok(batch.parts.every((part)=>part.url.startsWith(`${batch.url}#page=`)),`${slug}/${lot}: parts must remain within the same original PDF package`);
  }
});

test("no obsolete COA verification status is exposed in the protocol manifest",()=>{
  assert.doesNotMatch(manifestText,/pending-verification|COA pending verification|COA not verified/i);
});

test("manifest contains one record for every protocol",()=>{
  assert.deepEqual(new Set(Object.keys(manifest)),new Set(slugs));
});
