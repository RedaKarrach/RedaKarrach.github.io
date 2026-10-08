/**
 * Post-build step for the GitHub Pages export in out/:
 *  1. Point Open Graph tags at opengraph-image.png and publish that copy, so
 *     link previews get a real image content type.
 *  2. Inject a Content-Security-Policy <meta> tag into every page, with a
 *     SHA-256 hash for each inline script of that page. GitHub Pages cannot
 *     send HTTP headers, and a meta policy cannot carry frame-ancestors or
 *     report-uri, so those are documented in the README instead.
 *  3. Write .nojekyll so the _next/ directory is served.
 *  4. Checks: no external scripts or stylesheets, no em dash in visible copy,
 *     security.txt not expired, no inline style attributes or <style> tags.
 */
import { createHash } from "node:crypto";
import { copyFile, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
let failed = false;
const fail = (msg) => {
  failed = true;
  console.error(`postbuild: ${msg}`);
};

async function* walk(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else yield full;
  }
}

const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;

function cspFor(html) {
  const hashes = new Set();
  for (const m of html.matchAll(scriptRe)) {
    if (!m[1].trim()) continue;
    hashes.add(`'sha256-${createHash("sha256").update(m[1], "utf8").digest("base64")}'`);
  }
  return [
    "default-src 'none'",
    `script-src 'self' ${[...hashes].sort().join(" ")}`,
    "style-src 'self'",
    "img-src 'self' data:",
    "font-src 'self'",
    "connect-src 'self'",
    "manifest-src 'self'",
    "base-uri 'none'",
    "form-action 'none'",
    "object-src 'none'",
    "upgrade-insecure-requests",
  ].join("; ");
}

// 1. Open Graph image with a real extension.
await copyFile(path.join(outDir, "opengraph-image"), path.join(outDir, "opengraph-image.png"));

let pages = 0;
for await (const file of walk(outDir)) {
  if (!file.endsWith(".html")) continue;
  let html = await readFile(file, "utf8");
  const rel = path.relative(root, file);

  html = html.replace(/(content="[^"]*\/opengraph-image)(\?[^"]*)?"/g, '$1.png"');

  // Checks that must run on the HTML before the meta tag is added.
  const external = [
    ...html.matchAll(/<(script|link)\b[^>]*\b(?:src|href)="(?:https?:)?\/\/[^"]+"[^>]*>/g),
  ].filter(
    (m) => m[1] === "script" || /rel="(?:stylesheet|preload|modulepreload|prefetch)"/.test(m[0]),
  );
  if (external.length) fail(`external resource in ${rel}: ${external.map((m) => m[0]).join(" ")}`);
  if (/\sstyle="/.test(html) || /<style[\s>]/.test(html)) fail(`inline style in ${rel}`);
  const text = html.replace(/<script[\s\S]*?<\/script>/g, "").replace(/<[^>]+>/g, " ");
  if (text.includes("—")) fail(`em dash in visible copy of ${rel}`);

  // 2. Meta CSP, first thing in <head> so it applies to everything after it.
  const meta = `<meta http-equiv="Content-Security-Policy" content="${cspFor(html)}">`;
  if (!html.includes("<head>")) fail(`no <head> in ${rel}`);
  html = html.replace("<head>", `<head>${meta}`);
  await writeFile(file, html);
  pages += 1;
}

// 3. GitHub Pages must not run Jekyll (it would hide _next/).
await writeFile(path.join(outDir, ".nojekyll"), "");

// 4. security.txt expiry.
const securityTxt = await readFile(path.join(outDir, ".well-known", "security.txt"), "utf8");
const expires = securityTxt.match(/^Expires:\s*(.+)$/m)?.[1];
if (!expires || new Date(expires).getTime() < Date.now()) {
  fail(`security.txt Expires is missing or in the past (${expires})`);
}

if (failed) process.exit(1);
console.log(
  `postbuild: CSP meta injected into ${pages} page(s), opengraph-image.png and .nojekyll written, checks passed`,
);
