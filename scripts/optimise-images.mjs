/**
 * Converts the raw PNG screenshots in .raw-shots/ into AVIF and WebP at two
 * widths, and records their intrinsic dimensions so <img> tags can declare
 * width/height (no layout shift). Run with `npm run images`.
 */
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const src = path.join(root, ".raw-shots");
const outDir = path.join(root, "public", "screenshots", "soc-lab");
const manifest = path.join(root, "src", "content", "screenshots.json");
const WIDTHS = [1600, 640];

await mkdir(outDir, { recursive: true });
const files = (await readdir(src)).filter((f) => f.toLowerCase().endsWith(".png")).sort();
const sizes = {};

for (const file of files) {
  const stem = file.replace(/\.png$/i, "");
  // Read through Node for the same reason as the writes below.
  const image = sharp(await readFile(path.join(src, file)));
  const meta = await image.metadata();
  const scale = Math.min(1, WIDTHS[0] / meta.width);
  sizes[stem] = {
    w: Math.round(meta.width * scale),
    h: Math.round(meta.height * scale),
  };
  for (const w of WIDTHS) {
    const resized = image.clone().resize({ width: w, withoutEnlargement: true });
    // Write through Node rather than libvips: the native writer cannot see
    // virtualised AppData paths on Windows, Node can.
    await writeFile(
      path.join(outDir, `${stem}-${w}.avif`),
      await resized.clone().avif({ quality: 55, effort: 6 }).toBuffer(),
    );
    await writeFile(
      path.join(outDir, `${stem}-${w}.webp`),
      await resized.clone().webp({ quality: 78 }).toBuffer(),
    );
  }
  console.log(`${stem}: ${sizes[stem].w}x${sizes[stem].h}`);
}

await writeFile(manifest, JSON.stringify(sizes, null, 2) + "\n");
console.log(`wrote ${manifest}`);
