/**
 * Content-Security-Policy with SHA-256 hashes for every inline <script> in the
 * static export. Next.js emits a handful of inline bootstrap scripts
 * (`self.__next_f.push(...)`) whose content is deterministic for a given
 * source tree, so their hashes are committed in vercel.json.
 *
 *   node scripts/csp-hashes.mjs --write   # regenerate vercel.json from out/
 *   node scripts/csp-hashes.mjs --check   # fail if vercel.json is stale (used by `npm run build`)
 */
import { createHash } from "node:crypto";
import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const outDir = path.join(root, "out");
const vercelJson = path.join(root, "vercel.json");
const mode = process.argv.includes("--write") ? "write" : "check";

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(full);
    else if (entry.name.endsWith(".html")) yield full;
  }
}

const hashes = new Set();
const scriptRe = /<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi;
let inlineStyleAttrs = 0;
let styleTags = 0;
for await (const file of htmlFiles(outDir)) {
  const html = await readFile(file, "utf8");
  for (const m of html.matchAll(scriptRe)) {
    const body = m[1];
    if (!body.trim()) continue;
    hashes.add(`'sha256-${createHash("sha256").update(body, "utf8").digest("base64")}'`);
  }
  inlineStyleAttrs += (html.match(/\sstyle="/g) ?? []).length;
  styleTags += (html.match(/<style[\s>]/g) ?? []).length;
}

const scriptHashes = [...hashes].sort();

const csp = [
  "default-src 'none'",
  `script-src 'self' ${scriptHashes.join(" ")}`,
  // Inline style attributes are only produced client-side through the CSSOM
  // (which CSP does not govern); the exported HTML has none, so no 'unsafe-inline'.
  "style-src 'self'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "manifest-src 'self'",
  "base-uri 'none'",
  "form-action 'none'",
  "frame-ancestors 'none'",
  "object-src 'none'",
  "upgrade-insecure-requests",
].join("; ");

const config = {
  $schema: "https://openapi.vercel.sh/vercel.json",
  cleanUrls: true,
  trailingSlash: false,
  headers: [
    {
      source: "/(.*)",
      headers: [
        { key: "Content-Security-Policy", value: csp },
        { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
        { key: "X-Content-Type-Options", value: "nosniff" },
        { key: "X-Frame-Options", value: "DENY" },
        { key: "Referrer-Policy", value: "no-referrer" },
        {
          key: "Permissions-Policy",
          value:
            "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=(), interest-cohort=(), browsing-topics=()",
        },
        { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
        { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
        { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
      ],
    },
    {
      source: "/_next/static/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/screenshots/(.*)",
      headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
    },
    {
      source: "/.well-known/security.txt",
      headers: [{ key: "Content-Type", value: "text/plain; charset=utf-8" }],
    },
    {
      source: "/opengraph-image",
      headers: [{ key: "Content-Type", value: "image/png" }],
    },
  ],
};

const next = JSON.stringify(config, null, 2) + "\n";
console.log(
  `csp-hashes: ${scriptHashes.length} inline script hash(es); ${inlineStyleAttrs} inline style attribute(s); ${styleTags} <style> tag(s) in out/`,
);
if (inlineStyleAttrs > 0 || styleTags > 0) {
  console.warn(
    "csp-hashes: WARNING the export contains inline styles; style-src 'self' will block them.",
  );
}

if (mode === "write") {
  await writeFile(vercelJson, next);
  console.log("csp-hashes: vercel.json written");
} else {
  let current = "";
  try {
    current = await readFile(vercelJson, "utf8");
  } catch {
    current = "";
  }
  if (current !== next) {
    console.error(
      "csp-hashes: vercel.json is stale. Run `npm run csp` locally and commit the result so the CSP hashes match this build.",
    );
    process.exit(1);
  }
  console.log("csp-hashes: vercel.json matches this build");
}
