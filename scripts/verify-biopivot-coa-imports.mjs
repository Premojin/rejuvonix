import assert from "node:assert/strict";
import {access, readFile} from "node:fs/promises";
import {fileURLToPath} from "node:url";
import path from "node:path";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const source=await readFile(path.join(root,"app/components/protocol-data.ts"),"utf8");
const marker="export const protocols: ProtocolItem[] = ";
const start=source.indexOf(marker)+marker.length;
const end=source.indexOf(";\n\nexport const findProtocol",start);
const protocols=JSON.parse(source.slice(start,end));
const manifest=JSON.parse(await readFile(path.join(root,"docs/biopivot-coa-import-manifest-v3.json"),"utf8"));

assert.equal(manifest.items.length,protocols.length,"manifest must cover every protocol");
for(const protocol of protocols){
  const row=manifest.items.find((item)=>item.slug===protocol.slug);
  assert.ok(row,`${protocol.slug}: missing manifest row`);
  if(protocol.approval.status==="fda-approved"){
    assert.equal(protocol.bioPivotCoa.status,"not-required",`${protocol.slug}: FDA-approved finished product must not require COA`);
    assert.equal(row.importStatus,"not-required",`${protocol.slug}: manifest must mark COA not required`);
    continue;
  }
  if(protocol.bioPivotCoa.status==="verified"){
    assert.ok(protocol.bioPivotCoa.sourceUrl?.startsWith("https://biopivot.co")||protocol.bioPivotCoa.url?.startsWith("https://biopivot.co"),`${protocol.slug}: verified BioPivot COA requires BioPivot source trace`);
    const href=protocol.bioPivotCoa.importedUrl??protocol.bioPivotCoa.url;
    assert.ok(href,`${protocol.slug}: verified COA requires a document href`);
    if(protocol.bioPivotCoa.importedUrl){
      assert.ok(protocol.bioPivotCoa.importedUrl.startsWith("/documents/biopivot-coa/"),`${protocol.slug}: imported COA must live in controlled public directory`);
      await access(path.join(root,"public",protocol.bioPivotCoa.importedUrl.replace(/^\//,"")));
    }
  } else {
    assert.equal(protocol.bioPivotCoa.importedUrl,undefined,`${protocol.slug}: unverified COA must not have imported document`);
    assert.equal(protocol.bioPivotCoa.url,undefined,`${protocol.slug}: unverified COA must not have document URL`);
  }
}
console.log(`BioPivot COA import verification passed for ${protocols.length} protocols.`);
