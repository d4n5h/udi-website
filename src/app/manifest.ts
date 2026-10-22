import type { MetadataRoute } from "next";
import { site } from "@/data/site-content";
import { assetPath } from "@/lib/asset-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Udi Shlomo — Drummer, Composer & Arranger",
    short_name: site.name,
    description: site.description,
    lang: "en",
    id: assetPath("/"),
    start_url: assetPath("/"),
    scope: assetPath("/"),
    display: "browser",
    background_color: "#14171f",
    theme_color: "#14171f",
    icons: [192, 512].map((size) => ({
      src: assetPath(`/icons/icon-${size}.png`),
      sizes: `${size}x${size}`,
      type: "image/png",
      purpose: "any",
    })),
  };
}
