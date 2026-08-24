import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { access } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const packs = [
  { index: "docs/AI_GOVERNANCE_INDEX.md", manifest: "docs/rejuvonix_ai_governance_v1.0.0/manifest.json" },
  { index: "docs/INTEGRATION_GOVERNANCE_INDEX.md", manifest: "docs/rejuvonix_api_integration_governance_v1.0.0/manifest.json" },
];

const documents = [];
for (const pack of packs) {
  const indexPath = path.join(root, pack.index);
  const manifestPath = path.join(root, pack.manifest);
  await access(indexPath);
  const index = await readFile(indexPath, "utf8");
  const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
  assert.match(index, /Document ID:/);
  assert.match(index, new RegExp(`\\*\\*Version:\\*\\* ${manifest.version.replaceAll(".", "\\.")}`));
  for (const relative of manifest.files) {
    const candidate = relative === "AI_GOVERNANCE_INDEX.md" || relative === "INTEGRATION_GOVERNANCE_INDEX.md"
      ? pack.index
      : relative.startsWith("docs/") ? path.join("docs", relative.slice("docs/".length)) : path.join("docs", relative);
    await access(path.join(root, candidate));
    documents.push(candidate);
  }
}

const experience = await readFile(path.join(root, "docs/ai/AGENT_EXPERIENCE_SPECIFICATION.md"), "utf8");
assert.match(experience, /Document ID:\*\* RAI-UX-002/);
assert.match(await readFile(path.join(root, "docs/AI_GOVERNANCE_INDEX.md"), "utf8"), /RAI-UX-002/);

const ids = [];
for (const relative of documents) {
  const content = await readFile(path.join(root, relative), "utf8");
  const match = content.match(/Document ID:\*\*\s*([A-Z0-9-]+)/);
  if (match) ids.push(match[1]);
}
assert.equal(new Set(ids).size, ids.length, `duplicate document IDs: ${ids}`);
console.log(`Governance validation passed: ${documents.length} indexed files, ${ids.length} document IDs.`);
