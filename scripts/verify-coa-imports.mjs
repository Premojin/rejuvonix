import assert from "node:assert/strict";
import {access,readFile} from "node:fs/promises";
import {createHash} from "node:crypto";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const manifest=JSON.parse(await readFile(path.join(root,"app/data/coa-manifest.json"),"utf8"));
const approved=new Set(["semaglutide","tirzepatide","tesamorelin","ss-31","pt-141"]);
let batchCount=0;
const seenFiles=new Map();

for(const [slug,record] of Object.entries(manifest)){
  assert.ok(Array.isArray(record.batches),`${slug}: batches must be an array`);
  if(approved.has(slug)){
    assert.equal(record.status,"official-documentation",`${slug}: approved finished product must retain official documentation as the primary source`);
    assert.match(record.url??"",/^https:\/\//,`${slug}: official URL missing`);
  }else if(record.batches.length){
    assert.equal(record.status,"coa-available",`${slug}: supplied batch certificate should be marked COA available`);
  }else{
    assert.equal(record.status,"quality-documentation",`${slug}: non-certificate item should use neutral quality-documentation state`);
    assert.equal(record.url,undefined,`${slug}: neutral quality state must not expose an unrelated document URL`);
  }

  for(const batch of record.batches){
    batchCount++;
    assert.ok(batch.id&&batch.formulation&&batch.lot&&batch.laboratory&&batch.testedAt,`${slug}: incomplete batch metadata`);
    assert.match(batch.url??"",/^\/documents\/coa\/[a-z0-9][a-z0-9._-]*\.pdf$/i,`${slug}/${batch.id}: batch certificate must be a local PDF`);
    const target=path.join(root,"public",batch.url.replace(/^\//,""));
    await access(target);
    const bytes=await readFile(target);
    const actual=createHash("sha256").update(bytes).digest("hex");
    assert.equal(actual,batch.sha256,`${slug}/${batch.id}: SHA-256 mismatch`);
    const prior=seenFiles.get(actual);
    if(prior && prior!==batch.url) throw new Error(`Duplicate certificate bytes stored under two paths: ${prior} and ${batch.url}`);
    seenFiles.set(actual,batch.url);
    for(const part of batch.parts??[]){
      assert.ok(part.label,`${slug}/${batch.id}: part label missing`);
      assert.ok(part.url.startsWith(`${batch.url}#page=`),`${slug}/${batch.id}: companion part must point to a page of the same immutable PDF`);
    }
  }
}

assert.equal(batchCount,19,"expected 19 distinct supplied batch certificate files");
assert.equal(seenFiles.size,19,"expected 19 unique certificate binaries");
console.log(`COA/document verification passed for ${Object.keys(manifest).length} protocols and ${batchCount} batch certificates.`);
