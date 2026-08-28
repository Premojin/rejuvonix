import assert from "node:assert/strict";
import {access,readFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const manifest=JSON.parse(await readFile(path.join(root,"app/data/coa-manifest.json"),"utf8"));
const approved=new Set(["semaglutide","tirzepatide","tesamorelin","ss-31","pt-141"]);

for(const [slug,record] of Object.entries(manifest)){
  if(approved.has(slug)){
    assert.equal(record.status,"official-documentation",`${slug}: approved finished product must use official documentation`);
    assert.match(record.label,/COA not required/i,`${slug}: missing no-COA label`);
    assert.match(record.url??"",/^https:\/\//,`${slug}: official URL missing`);
    continue;
  }

  if(record.status==="coa-verified"){
    assert.match(record.url??"",/^\/documents\/coa\//,`${slug}: verified certificate must be a local file`);
    const target=path.join(root,"public",record.url.replace(/^\//,""));
    await access(target);
    assert.ok(record.sha256,`${slug}: verified certificate must retain a SHA-256 fingerprint`);
  }else{
    assert.equal(record.status,"pending-verification",`${slug}: unexpected documentation state`);
    assert.equal(record.url,undefined,`${slug}: pending item cannot expose a certificate URL`);
  }
}

console.log(`COA/document verification passed for ${Object.keys(manifest).length} protocols.`);
