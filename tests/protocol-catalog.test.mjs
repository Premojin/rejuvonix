import assert from "node:assert/strict";
import test from "node:test";
import {readFile} from "node:fs/promises";

const source=await readFile(new URL("../app/components/protocol-data.ts",import.meta.url),"utf8");

test("protocol catalog preserves five Rejuvonix goal filters",()=>{
  for(const slug of ["weight-loss","performance","sexual-health","hair-restoration","skin-regeneration"]){
    assert.match(source,new RegExp(`slug:\\"${slug}\\"`));
  }
});

test("COA URLs are not introduced without explicit verified status",()=>{
  const entries=[...source.matchAll(/documentation:\{([^}]*)\}/g)].map((match)=>match[1]);
  assert.ok(entries.length>=19,"expected mapped BioPivot protocol inventory");
  for(const entry of entries){
    if(/url:/.test(entry)) assert.match(entry,/status:\"coa-verified\"/);
  }
});

test("protocol slugs are unique",()=>{
  const region=source.split("export const protocols: ProtocolItem[] = [")[1]?.split("];\n\nexport const findProtocol")[0]??"";
  const slugs=[...region.matchAll(/\{slug:\"([^\"]+)\"/g)].map((match)=>match[1]);
  assert.equal(slugs.length,new Set(slugs).size);
});
