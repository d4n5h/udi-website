import { spawnSync } from "node:child_process";
import { cpSync, existsSync } from "node:fs";
import path from "node:path";

// Production is the custom domain at its root. Override both variables to build for another location.
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://udishlomomusic.com/",
  },
});

if (result.error) throw result.error;
if (result.status) process.exit(result.status);
const photos = path.join("public", "images", "facebook");
if (existsSync(photos)) {
  const base = (process.env.NEXT_PUBLIC_BASE_PATH ?? "").replace(/^\/+|\/+$/g, "");
  cpSync(photos, path.join("out", base, "images", "facebook"), { recursive: true });
}
process.exit(0);
