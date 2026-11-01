import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const width = 1200;
const height = 630;

export const shareCards = {
  home: {
    photo: "hero-udi-wide.jpg",
    position: "center 30%",
    kicker: "World jazz",
    line: "Drummer, composer and arranger",
    alt: "Udi Shlomo, jazz drummer, composer and arranger, standing between two cymbals",
  },
  about: {
    photo: "hero-udi-wide.jpg",
    position: "center 30%",
    kicker: "Biography",
    line: "From Kibbutz Nahshon to Trondheim",
    alt: "Udi Shlomo, jazz drummer, composer and arranger, standing between two cymbals",
  },
  music: {
    photo: "ostrava-live.jpg",
    position: "62% center",
    kicker: "Music",
    line: "Live video and recordings",
    alt: "Udi Shlomo playing a ride cymbal under blue stage light",
  },
  concerts: {
    photo: "gallery/trondheim-jazzfest.jpg",
    position: "center 40%",
    kicker: "Concerts",
    line: "Tour dates",
    alt: "Udi Shlomo playing drums in a dark suit at Trondheim Jazz Festival",
  },
  contact: {
    photo: "hero-udi-wide.jpg",
    position: "center 30%",
    kicker: "Booking",
    line: "Concerts, recordings and press",
    alt: "Udi Shlomo, jazz drummer, composer and arranger, standing between two cymbals",
  },
  epk: {
    photo: "hero-udi-wide.jpg",
    position: "center 30%",
    kicker: "Press kit",
    line: "Biography, reviews and live video",
    alt: "Udi Shlomo, jazz drummer, composer and arranger, standing between two cymbals",
  },
} as const;

export type ShareCard = keyof typeof shareCards;

export function shareImagePath(key: ShareCard) {
  return `social/${key}.jpg`;
}

export async function renderShareImage(key: ShareCard) {
  const card = shareCards[key];
  const [photo, display, sans] = await Promise.all([
    readFile(path.join(process.cwd(), "public/images", card.photo)),
    readFile(path.join(process.cwd(), "assets/fonts/fraunces-latin.ttf")),
    readFile(path.join(process.cwd(), "assets/fonts/jakarta-latin.ttf")),
  ]);
  const png = new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#14171f" }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`data:image/jpeg;base64,${photo.toString("base64")}`}
        alt=""
        width={width}
        height={height}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover", objectPosition: card.position }}
      />
      <div
        style={{
          position: "absolute",
          left: 48,
          bottom: 44,
          display: "flex",
          flexDirection: "column",
          background: "rgba(20,23,31,0.88)",
          padding: "26px 34px 28px",
        }}
      >
        <div style={{ display: "flex", fontFamily: "Jakarta", fontSize: 22, letterSpacing: 3, color: "#e3c49b", textTransform: "uppercase" }}>
          {card.kicker}
        </div>
        <div style={{ display: "flex", fontFamily: "Fraunces", fontWeight: 600, fontSize: 76, lineHeight: 1, color: "#f4f1ea", marginTop: 10 }}>
          Udi Shlomo
        </div>
        <div style={{ display: "flex", fontFamily: "Jakarta", fontSize: 28, color: "#f4f1ea", marginTop: 12 }}>
          {card.line}
        </div>
      </div>
    </div>,
    {
      width,
      height,
      fonts: [
        { name: "Fraunces", data: display, weight: 600 },
        { name: "Jakarta", data: sans, weight: 500 },
      ],
    },
  );
  // JPEG stays under WhatsApp's preview limit. The PNG from ImageResponse is about 1 MB and often never appears.
  return sharp(Buffer.from(await png.arrayBuffer())).jpeg({ quality: 76, mozjpeg: true }).toBuffer();
}
