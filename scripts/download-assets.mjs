import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const assets = [
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/udi_logo-e1733386008798.png",
    "public/images/logo.png",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/12/cropped-Udi-SHlomo-wide-by-Bjorn-Ante-Roe-2-scaled-e1734011603555.jpg",
    "public/images/favicon.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/cropped-favicon.jpg",
    "public/images/favicon-square.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/12/Udi-SHlomo-wide-by-Bjorn-Ante-Roe-scaled.jpg",
    "public/images/hero-udi-wide.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/12/Photos-from-Ostrava.jpg-5.jpg",
    "public/images/ostrava-live.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/Udi-Transform.jpg",
    "public/images/gallery/udi-transform.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/DSC4284.jpg",
    "public/images/gallery/dsc4284.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/Photos-from-Ostrava.jpg-5.jpg",
    "public/images/gallery/ostrava.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/DSC4253.jpg",
    "public/images/gallery/dsc4253.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/DSC4267.jpg",
    "public/images/gallery/dsc4267.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/DSC4126.jpg",
    "public/images/gallery/dsc4126.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/Udi-Shlomo.-photo-Mikaela-Canborn.jpg",
    "public/images/gallery/mikaela-canborn.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/Trondheim-Jazzfest.jpg",
    "public/images/gallery/trondheim-jazzfest.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/IMG-20230420-WA0001.jpg",
    "public/images/gallery/img-20230420.jpg",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/11/udi-shlomo_metrum-jazz-club_poland__fot-.webp",
    "public/images/gallery/metrum-jazz-club.webp",
  ],
  [
    "https://udishlomomusic.com/wp-content/uploads/2024/12/Bandcamp-button-circle-black.svg",
    "public/images/icons/bandcamp-circle.svg",
  ],
];

async function downloadOne(url, destination) {
  const target = path.resolve(destination);
  await mkdir(path.dirname(target), { recursive: true });

  let lastError;
  for (let attempt = 1; attempt <= 3; attempt += 1) {
    try {
      const response = await fetch(url, {
        signal: AbortSignal.timeout(120000),
        headers: { "User-Agent": "udi-website-asset-mirror" },
      });
      if (!response.ok) {
        throw new Error(`${response.status} ${response.statusText}`);
      }
      const bytes = Buffer.from(await response.arrayBuffer());
      if (bytes.length < 100) {
        throw new Error(`file too small (${bytes.length} bytes)`);
      }
      await writeFile(target, bytes);
      console.log(`ok ${destination} (${bytes.length})`);
      return;
    } catch (error) {
      lastError = error;
      console.warn(`retry ${attempt} ${destination}: ${error.message}`);
    }
  }
  throw lastError;
}

for (const [url, destination] of assets) {
  await downloadOne(url, destination);
}
