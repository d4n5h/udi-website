import { spawnSync } from "node:child_process";

// The workflow supplies the actual Pages path (also supports a custom domain).
const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], {
  stdio: "inherit",
  env: {
    ...process.env,
    NEXT_PUBLIC_BASE_PATH: process.env.NEXT_PUBLIC_BASE_PATH ?? "/udi-website",
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL ?? "https://d4n5h.github.io/udi-website/",
  },
});

if (result.error) throw result.error;
process.exit(result.status ?? 1);
