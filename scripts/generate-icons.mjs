import { writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const face = await sharp("public/images/hero-udi-wide.webp")
  .extract({ left: 415, top: 0, width: 1238, height: 1238 })
  .toBuffer();
await mkdir("public/icons", { recursive: true });
for (const size of [32, 48, 180, 192, 512]) {
  const name = size === 180 ? "apple-touch-icon" : `icon-${size}`;
  await sharp(face).resize(size, size).png().toFile(`public/icons/${name}.png`);
}

const sizes = [16, 32, 48];
const frames = await Promise.all(
  sizes.map((size) => sharp(face).resize(size, size).ensureAlpha().png().toBuffer()),
);
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
