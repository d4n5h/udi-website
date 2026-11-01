import { renderShareImage } from "@/lib/share-image";

export const dynamic = "force-static";

export async function GET() {
  const jpeg = await renderShareImage("home");
  return new Response(new Uint8Array(jpeg), { headers: { "Content-Type": "image/jpeg" } });
}
