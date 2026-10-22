import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

// Rasterize the vector master; no photograph or generated artwork is modified.
const svg = await readFile("public/icons/favicon.svg");
await mkdir("public/icons", { recursive: true });
for (const size of [32, 48, 180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon" : `icon-${size}`;
  await sharp(svg).resize(size, size).png().toFile(`public/icons/${name}.png`);
}

// ICO directory entries can contain PNG frames. Include small, crisp tab sizes.
const sizes = [16, 32, 48];
const frames = await Promise.all(sizes.map(size => sharp(svg).resize(size, size).png().toBuffer()));
const header = Buffer.alloc(6 + 16 * frames.length);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(frames.length, 4);
let offset = header.length;
frames.forEach((frame, i) => {
  const entry = 6 + i * 16;
  header[entry] = sizes[i];
  header[entry + 1] = sizes[i];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});
await writeFile("src/app/favicon.ico", Buffer.concat([header, ...frames]));
console.log("Generated favicon.ico, PNG favicons, touch icon and manifest icons.");
