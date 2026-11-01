import { spawnSync } from "node:child_process";

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
process.exit(result.status ?? 1);
