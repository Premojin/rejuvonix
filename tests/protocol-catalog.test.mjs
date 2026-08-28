import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

const source=await readFile(new URL("../app/components/protocol-data.ts",import.meta.url),"utf8");
const manifest=JSON.parse(await readFile(new URL("../app/data/coa-manifest.json",import.meta.url),"utf8"));
const protocolRegion=source.split("const baseProtocols: BaseProtocolItem[] = [")[1]?.split("];\n\nconst documentationManifest")[0]??"";
const slugs=[...protocolRegion.matchAll(/\{slug:\"([^\"]+)\"/g)].map((match)=>match[1]);

const approvedFinishedProducts=new Set(["semaglutide","tirzepatide","tesamorelin","ss-31","pt-141"]);

test("protocol catalog preserves five Rejuvonix goal filters",()=>{
  for(const slug of ["weight-loss","performance","sexual-health","hair-restoration","skin-regeneration"]){
    assert.match(source,new RegExp(`slug:\\"${slug}\\"`));
  }
});

test("protocol catalog contains 19 unique entries",()=>{
  assert.equal(slugs.length,19);
  assert.equal(slugs.length,new Set(slugs).size);
});

test("FDA-approved finished products use official documentation and do not require a COA",()=>{
  for(const slug of approvedFinishedProducts){
    const record=manifest[slug];
    assert.ok(record,`${slug}: manifest record missing`);
    assert.equal(record.status,"official-documentation",`${slug}: should use official documentation`);
    assert.match(record.label,/COA not required/i,`${slug}: label should state COA not required`);
    assert.match(record.url,/^https:\/\//,`${slug}: official documentation URL required`);
    assert.doesNotMatch(record.url,/\/documents\/coa\//,`${slug}: approved pathway must not use local COA`);
  }
});

test("non-approved items never render an unverified COA",()=>{
  for(const slug of slugs.filter((slug)=>!approvedFinishedProducts.has(slug))){
    const record=manifest[slug];
    assert.ok(record,`${slug}: manifest record missing`);
    if(record.status==="coa-verified"){
      assert.match(record.url??"",/^\/documents\/coa\//,`${slug}: verified COA must use a local immutable document`);
    }else{
      assert.equal(record.status,"pending-verification",`${slug}: non-approved item must remain pending until exact certificate match`);
      assert.equal(record.url,undefined,`${slug}: pending item must not expose a document URL`);
    }
  }
});

test("manifest contains one record for every protocol",()=>{
  assert.deepEqual(new Set(Object.keys(manifest)),new Set(slugs));
});
