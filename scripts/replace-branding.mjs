#!/usr/bin/env node
/**
 * One-time script: replace ClawPilot branding with ClawPilot across the codebase.
 * Order matters; we replace longest/most specific first to avoid double-replace.
 */
import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { glob } from "glob";

const ROOT = join(process.cwd());
const SKIP_DIRS = ["node_modules", ".git", "dist", "out", "bin", ".turbo", "coverage", "npm/dist"];
const TEXT_EXT = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs", ".json", ".md", ".yml", ".yaml",
  ".html", ".css", ".scss", ".svg", ".xml", ".env", ".mdc", ".csv"
]);

const replacements = [
  ["abhiramvishal", "abhiramvishal"],
  ["clawpilot", "clawpilot"],
  ["ClawPilot", "ClawPilot"],
  ["ClawPilot", "ClawPilot"],
  ["clawpilot", "clawpilot"],
  ["clawpilot", "clawpilot"],
  ["clawpilot", "clawpilot"],
  ["ClawPilot", "ClawPilot"],
];

async function main() {
  const files = await glob("**/*", { cwd: ROOT, nodir: true, ignore: ["**/node_modules/**", "**/.git/**", "**/dist/**", "**/out/**", "**/bin/**", "**/.turbo/**", "**/coverage/**", "**/npm/dist/**"] });
  let total = 0;
  for (const rel of files) {
    const ext = rel.slice(rel.lastIndexOf("."));
    if (!TEXT_EXT.has(ext) && !rel.endsWith("/package.json") && !rel.match(/\.(json|md|yml|yaml|env)$/)) continue;
    const abs = join(ROOT, rel);
    let content;
    try {
      content = readFileSync(abs, "utf8");
    } catch {
      continue;
    }
    let next = content;
    for (const [from, to] of replacements) {
      next = next.split(from).join(to);
    }
    if (next !== content) {
      writeFileSync(abs, next, "utf8");
      total++;
      console.log(rel);
    }
  }
  console.log(`Done. Updated ${total} files.`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
