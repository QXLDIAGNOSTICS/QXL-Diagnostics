// Recompresses raster images under public/ in place — same file names,
// formats and pixel dimensions, so no code or layout changes are needed.
//
//   node scripts/compress-images.mjs            # compress
//   node scripts/compress-images.mjs --dry-run  # report only
//
// JPEGs are re-encoded with mozjpeg (quality 80, progressive, metadata
// stripped); PNGs are re-encoded losslessly at maximum compression. A file
// is only rewritten when the result is at least 10% smaller, so re-running
// is safe. The PWA icons are resized to the 192/512 px sizes manifest.json
// declares (the source files were far larger than declared).
import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const PUBLIC_DIR = path.resolve(import.meta.dirname, "..", "public");
const MIN_SAVING = 0.1;
const dryRun = process.argv.includes("--dry-run");
const ICON_SIZES = {
  "icons/app_logo-512x512.png": 512,
  "icons/app_logo-512x512.jpg": 512,
  "icons/app_logo-192x192.png": 192,
  "icons/app_logo-192x192.jpg": 192,
};

function* walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* walk(full);
    else if (/\.(jpe?g|png)$/i.test(entry.name)) yield full;
  }
}

async function recompress(file) {
  const input = fs.readFileSync(file);
  const meta = await sharp(input).metadata();
  const rel = path.relative(PUBLIC_DIR, file).split(path.sep).join("/");
  let pipeline = sharp(input).rotate();
  if (ICON_SIZES[rel]) {
    const size = ICON_SIZES[rel];
    pipeline = pipeline.resize(size, size, {
      fit: "contain",
      background: meta.hasAlpha ? { r: 0, g: 0, b: 0, alpha: 0 } : { r: 255, g: 255, b: 255, alpha: 1 },
    });
  }
  // Encode by actual content, not extension (some ".png" files hold JPEG data).
  const output =
    meta.format === "jpeg"
      ? await pipeline.jpeg({ quality: 80, progressive: true, mozjpeg: true }).toBuffer()
      : await pipeline.png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true }).toBuffer();
  const saving = 1 - output.length / input.length;
  return { rel, before: input.length, after: output.length, saving, output, forced: Boolean(ICON_SIZES[rel]) };
}

let totalBefore = 0;
let totalAfter = 0;
for (const file of walk(PUBLIC_DIR)) {
  const r = await recompress(file);
  const write = r.forced || r.saving >= MIN_SAVING;
  totalBefore += r.before;
  totalAfter += write ? r.after : r.before;
  if (!write) continue;
  console.log(
    `${(r.before / 1024).toFixed(0).padStart(6)}KB -> ${(r.after / 1024).toFixed(0).padStart(5)}KB  ${r.rel}`
  );
  if (!dryRun) fs.writeFileSync(file, r.output);
}
console.log(
  `\n${dryRun ? "[dry run] " : ""}${(totalBefore / 1048576).toFixed(1)}MB -> ${(totalAfter / 1048576).toFixed(1)}MB`
);
