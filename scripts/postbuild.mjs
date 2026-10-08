/**
 * Post-build checks on the static export:
 *  - no external script or stylesheet references (no third-party code);
 *  - no em dash in visible copy;
 *  - security.txt Expires is in the future.
 */
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
let failed = false;

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

for await (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;
  const html = await readFile(file, "utf8");
  // Scripts and stylesheets must come from this origin only. Metadata links
  // (rel="author", canonical, alternate) are not executable and are allowed.
  const external = [
    ...html.matchAll(/<(script|link)\b[^>]*\b(?:src|href)="(?:https?:)?\/\/[^"]+"[^>]*>/g),
  ].filter(
    (m) => m[1] === "script" || /rel="(?:stylesheet|preload|modulepreload|prefetch)"/.test(m[0]),
  );
  if (external.length) {
    failed = true;
    console.error(
      `postbuild: external resource in ${path.relative(root, file)}:`,
      external.map((m) => m[0]),
    );
  }
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  if (text.includes("\u2014")) {
    failed = true;
    console.error(`postbuild: em dash found in visible copy of ${path.relative(root, file)}`);
  }
}

const securityTxt = await readFile(path.join(outDir, ".well-known", "security.txt"), "utf8");
const expires = securityTxt.match(/^Expires:\s*(.+)$/m)?.[1];
if (!expires || new Date(expires).getTime() < Date.now()) {
  failed = true;
  console.error(`postbuild: security.txt Expires is missing or in the past (${expires})`);
}

if (failed) process.exit(1);
console.log("postbuild: checks passed");
