import { access, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const gallery = [
  "dsc4284.jpg",
  "ostrava.jpg",
  "dsc4253.jpg",
  "dsc4267.jpg",
  "dsc4126.jpg",
  "mikaela-canborn.jpg",
  "trondheim-jazzfest.jpg",
  "img-20230420.jpg",
];

async function exists(file) {
  try {
    await access(file);
    return true;
  } catch {
    return false;
  }
}

async function webp(input, output, edge, quality) {
  const meta = await sharp(input).rotate().metadata();
  const landscape = meta.width >= meta.height;
  const buffer = await sharp(input)
    .rotate()
    .resize({
      width: landscape ? edge : undefined,
      height: landscape ? undefined : edge,
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality })
    .toBuffer();
  const info = await sharp(buffer).metadata();
  await mkdir(path.dirname(output), { recursive: true });
  await writeFile(output, buffer);
  return { output, width: info.width, height: info.height, bytes: buffer.length };
}

const results = [];

for (const name of gallery) {
  const input = path.join("public/images/gallery", name);
  if (!(await exists(input))) continue;
  const base = name.replace(/\.jpe?g$/i, ".webp");
  const full = await webp(input, path.join("public/images/gallery", base), 1600, 78);
  const thumb = await webp(input, path.join("public/images/gallery/thumbs", base), 640, 68);
  await rm(input);
  results.push({ full, thumb });
}

const singles = [
  ["public/images/hero-udi-wide.jpg", "public/images/hero-udi-wide.webp", 2200, 78],
  ["public/images/ostrava-live.jpg", "public/images/ostrava-live.webp", 1600, 75],
  ["public/images/gallery/udi-transform.jpg", "public/images/gallery/udi-transform.webp", 1400, 78],
];

for (const [input, output, edge, quality] of singles) {
  if (!(await exists(input))) continue;
  results.push(await webp(input, output, edge, quality));
  await rm(input);
}

for (const file of ["public/images/favicon.jpg", "public/images/favicon-square.jpg"]) {
  if (!(await exists(file))) continue;
  const buffer = await sharp(file)
    .rotate()
    .resize(192, 192, { fit: "cover" })
    .jpeg({ quality: 60, mozjpeg: true })
    .toBuffer();
  try {
    await writeFile(file, buffer);
    results.push({ output: file, bytes: buffer.length });
  } catch (error) {
    console.warn(`skip ${file}: ${error.message}`);
  }
}

console.log(JSON.stringify(results, null, 2));
