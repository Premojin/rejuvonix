import {createHash,randomUUID} from "node:crypto";
import {mkdir,readFile,writeFile} from "node:fs/promises";
import path from "node:path";
import {fileURLToPath} from "node:url";

const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),"..");
const args=process.argv.slice(2);
const value=(name)=>{const i=args.indexOf(`--${name}`);return i>=0?args[i+1]:undefined;};
const slug=value("slug");
const localFile=value("file");
const remoteUrl=value("url");
const lot=value("lot");
const laboratory=value("lab");
const testedAt=value("tested-at");
const formulation=value("formulation");
const label=value("label")??"Batch certificate";

if(!slug || (!localFile && !remoteUrl) || (localFile && remoteUrl) || !lot || !laboratory || !testedAt || !formulation){
  console.error("usage: node scripts/import-coa.mjs --slug <protocol-slug> (--file <local-pdf> | --url <direct-certificate-url>) --lot <lot> --lab <laboratory> --tested-at <date> --formulation <description> [--label <batch-label>]");
  process.exit(64);
}

const manifestPath=path.join(root,"app/data/coa-manifest.json");
const manifest=JSON.parse(await readFile(manifestPath,"utf8"));
const record=manifest[slug];
if(!record) throw new Error(`Unknown protocol slug: ${slug}`);

let bytes;
if(localFile){
  const source=path.resolve(localFile.replace(/^~(?=\/)/,process.env.HOME??"~"));
  if(path.extname(source).toLowerCase()!==".pdf") throw new Error("V5 certificate library accepts original PDF certificates only.");
  bytes=await readFile(source);
}else{
  const response=await fetch(remoteUrl,{redirect:"follow"});
  if(!response.ok) throw new Error(`Certificate download failed: HTTP ${response.status}`);
  const contentType=(response.headers.get("content-type")??"").toLowerCase();
  if(!contentType.includes("pdf")&&!new URL(response.url).pathname.toLowerCase().endsWith(".pdf")) throw new Error("Downloaded certificate is not a PDF.");
  bytes=Buffer.from(await response.arrayBuffer());
}

const sha256=createHash("sha256").update(bytes).digest("hex");
for(const [existingSlug,existing] of Object.entries(manifest)){
  for(const batch of existing.batches??[]){
    if(batch.sha256===sha256) throw new Error(`This exact certificate is already stored for ${existingSlug}, lot ${batch.lot}.`);
  }
}

const safeLot=lot.toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");
const filename=`${slug}-${safeLot||sha256.slice(0,12)}.pdf`;
const publicDir=path.join(root,"public/documents/coa");
await mkdir(publicDir,{recursive:true});
const target=path.join(publicDir,filename);
await writeFile(target,bytes);

record.batches??=[];
record.batches.push({id:`${slug}-${safeLot||randomUUID().slice(0,8)}`,label,formulation,lot,laboratory,testedAt,url:`/documents/coa/${filename}`,sha256});
if(record.status!=="official-documentation"){
  record.status="coa-available";
  record.label="COA available";
}
await writeFile(manifestPath,`${JSON.stringify(manifest,null,2)}\n`);

const localLogPath=path.join(root,".coa-source-log.json");
let log=[];
try{log=JSON.parse(await readFile(localLogPath,"utf8"));if(!Array.isArray(log))log=[];}catch{}
log.push({slug,lot,importedAt:new Date().toISOString(),source:remoteUrl??path.resolve(localFile),sha256,localDocument:`/documents/coa/${filename}`});
await writeFile(localLogPath,`${JSON.stringify(log,null,2)}\n`);
console.log(`Imported ${slug} lot ${lot} -> /documents/coa/${filename}`);
console.log(`SHA-256 ${sha256}`);
