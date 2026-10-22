import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const dynamic = "force-static";

export async function GET() {
  const photo = await readFile(path.join(process.cwd(), "public/images/hero-udi-wide.jpg"));
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", background: "#14171f", color: "#f4f1ea" }}>
      {/* Existing artist photography; the card is rendered at build time. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={`data:image/jpeg;base64,${photo.toString("base64")}`} alt="" width={1200} height={630}
        style={{ position: "absolute", width: "100%", height: "100%", objectFit: "cover" }} />
      <div style={{ display: "flex", position: "absolute", inset: 0, background: "linear-gradient(0deg, rgba(0,0,0,0.9), transparent 75%)" }} />
      <div style={{ display: "flex", flexDirection: "column", position: "absolute", left: 64, bottom: 56 }}>
        <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>Udi Shlomo</div>
        <div style={{ fontSize: 27, marginTop: 12 }}>Drummer · Composer · Arranger</div>
        <div style={{ fontSize: 21, marginTop: 16, color: "#e3c49b" }}>World jazz · Trondheim, Norway</div>
      </div>
    </div>,
    { width: 1200, height: 630 },
  );
}
