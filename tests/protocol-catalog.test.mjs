import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

const source=await readFile(new URL("../app/components/protocol-data.ts",import.meta.url),"utf8");
const marker="export const protocols: ProtocolItem[] = ";
const start=source.indexOf(marker)+marker.length;
const end=source.indexOf(";\n\nexport const findProtocol",start);
const protocols=JSON.parse(source.slice(start,end));

const goalSlugs=["weight-loss","performance","sexual-health","hair-restoration","skin-regeneration"];

test("protocol catalog preserves five Rejuvonix goal filters",()=>{
  for(const slug of goalSlugs) assert.match(source,new RegExp(`slug:\"${slug}\"`));
  for(const slug of goalSlugs) assert.ok(protocols.some((protocol)=>protocol.goals.includes(slug)),`expected protocols for ${slug}`);
});

test("protocol slugs are unique",()=>{
  const slugs=protocols.map((protocol)=>protocol.slug);
  assert.equal(slugs.length,19);
  assert.equal(slugs.length,new Set(slugs).size);
});

test("every protocol has specific clinical, regulatory and source content",()=>{
  for(const protocol of protocols){
    assert.ok(protocol.clinical?.overview?.length>40,`${protocol.slug}: overview missing`);
    assert.ok(protocol.clinical?.mechanism?.length>40,`${protocol.slug}: mechanism missing`);
    assert.ok(protocol.clinical?.evidenceContext?.length>40,`${protocol.slug}: evidence context missing`);
    assert.ok(protocol.clinical?.safetyPoints?.length>=3,`${protocol.slug}: safety points missing`);
    assert.ok(protocol.approval?.label,`${protocol.slug}: regulatory label missing`);
    assert.ok(protocol.references?.length>=1,`${protocol.slug}: supporting sources missing`);
  }
});

test("FDA-approved items use official product documentation and do not require a COA",()=>{
  const approved=protocols.filter((protocol)=>protocol.approval.status==="fda-approved");
  assert.deepEqual(approved.map((p)=>p.slug).sort(),["pt-141","semaglutide","ss-31","tesamorelin","tirzepatide"].sort());
  for(const protocol of approved){
    assert.equal(protocol.documentation.status,"official-documentation",`${protocol.slug}: official documentation required`);
    assert.match(protocol.documentation.url,/^https:\/\//,`${protocol.slug}: official URL required`);
    assert.equal(protocol.bioPivotCoa.status,"not-required",`${protocol.slug}: approved finished product must not require COA`);
    assert.equal(protocol.bioPivotCoa.url,undefined,`${protocol.slug}: COA URL should not be attached to approved finished product pathway`);
  }
});

test("non-FDA BioPivot items never get an unverified COA URL",()=>{
  for(const protocol of protocols.filter((p)=>p.approval.status!=="fda-approved")){
    if(protocol.bioPivotCoa.url) assert.equal(protocol.bioPivotCoa.status,"verified",`${protocol.slug}: COA URL requires verified status`);
    if(protocol.documentation.status==="coa-verified"){
      assert.equal(protocol.bioPivotCoa.status,"verified",`${protocol.slug}: verified COA document requires exact BioPivot verification`);
      const href=protocol.bioPivotCoa.importedUrl??protocol.bioPivotCoa.url??"";
      assert.match(href,/^(https:\/\/biopivot\.co|\/documents\/biopivot-coa\/)/);
      assert.ok((protocol.bioPivotCoa.sourceUrl??protocol.bioPivotCoa.url??"").startsWith("https://biopivot.co"),`${protocol.slug}: verified COA requires original BioPivot source trace`);
    }
  }
});

test("no third-party substitute vendor COAs were introduced",()=>{
  const forbidden=["finebiolabs.com","alderabiolabs.com","peptidetrust.org","vialworks.co.uk","atomiklabz.com"];
  const urls=protocols.flatMap((p)=>[p.documentation.url,p.bioPivotCoa.url,...p.references.map((r)=>r.url)]).filter(Boolean);
  for(const url of urls){
    for(const host of forbidden) assert.ok(!url.includes(host),`substitute vendor source found: ${url}`);
  }
});


test("COA import fields remain closed until exact BioPivot verification",()=>{
  for(const protocol of protocols){
    if(protocol.approval.status==="fda-approved"){
      assert.equal(protocol.bioPivotCoa.status,"not-required");
      assert.equal(protocol.bioPivotCoa.importedUrl,undefined);
      continue;
    }
    if(protocol.bioPivotCoa.status!=="verified"){
      assert.equal(protocol.bioPivotCoa.importedUrl,undefined,`${protocol.slug}: pending item cannot expose imported COA`);
      assert.equal(protocol.bioPivotCoa.sourceUrl,undefined,`${protocol.slug}: pending item cannot claim a matched BioPivot source`);
    }
  }
});
