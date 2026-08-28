import {createHash} from "node:crypto";
import {copyFile,mkdir,readFile,writeFile} from "node:fs/promises";
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

if(!slug || (!localFile && !remoteUrl) || (localFile && remoteUrl)){
  console.error("usage: node scripts/import-coa.mjs --slug <protocol-slug> (--file <local-pdf-or-image> | --url <direct-certificate-url>) [--lot <lot>] [--lab <laboratory>] [--tested-at <date>]");
  process.exit(64);
}

const manifestPath=path.join(root,"app/data/coa-manifest.json");
const manifest=JSON.parse(await readFile(manifestPath,"utf8"));
const record=manifest[slug];
if(!record){throw new Error(`Unknown protocol slug: ${slug}`);}
if(record.status==="official-documentation"){throw new Error(`${slug} uses an FDA-approved finished-product documentation pathway; a COA is not required.`);}

let bytes;
let ext;
if(localFile){
  const source=path.resolve(localFile.replace(/^~(?=\/)/,process.env.HOME??"~"));
  bytes=await readFile(source);
  ext=path.extname(source).toLowerCase();
}else{
  const response=await fetch(remoteUrl,{redirect:"follow"});
  if(!response.ok) throw new Error(`Certificate download failed: HTTP ${response.status}`);
  bytes=Buffer.from(await response.arrayBuffer());
  const contentType=(response.headers.get("content-type")??"").toLowerCase();
  ext=contentType.includes("pdf")?".pdf":contentType.includes("png")?".png":contentType.includes("jpeg")?".jpg":path.extname(new URL(response.url).pathname).toLowerCase();
}

if(![".pdf",".png",".jpg",".jpeg",".webp"].includes(ext)) throw new Error(`Unsupported certificate format: ${ext||"unknown"}`);
const sha256=createHash("sha256").update(bytes).digest("hex");
const publicDir=path.join(root,"public/documents/coa");
await mkdir(publicDir,{recursive:true});
const filename=`${slug}-${sha256.slice(0,12)}${ext===".jpeg"?".jpg":ext}`;
const target=path.join(publicDir,filename);
await writeFile(target,bytes);

manifest[slug]={
  status:"coa-verified",
  label:"Certificate of Analysis",
  url:`/documents/coa/${filename}`,
  ...(lot?{lot}:{}),
  ...(testedAt?{testedAt}:{}),
  ...(laboratory?{source:laboratory}:{}),
  sha256,
};
await writeFile(manifestPath,`${JSON.stringify(manifest,null,2)}\n`);

// Keep source retrieval details out of the published/site package. This local log is gitignored.
const localLogPath=path.join(root,".coa-source-log.json");
let log={};
try{log=JSON.parse(await readFile(localLogPath,"utf8"));}catch{}
log[slug]={importedAt:new Date().toISOString(),source:remoteUrl??path.resolve(localFile),sha256,localDocument:`/documents/coa/${filename}`};
await writeFile(localLogPath,`${JSON.stringify(log,null,2)}\n`);

console.log(`Imported ${slug} certificate -> /documents/coa/${filename}`);
console.log(`SHA-256 ${sha256}`);
