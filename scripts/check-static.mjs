import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import path from "node:path";

const root = path.resolve("out");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "/udi-website";
const pages = ["", "about", "music", "concerts", "contact", "epk"];

for (const page of pages) {
  assert.ok(existsSync(path.join(root, page, "index.html")), `Missing page: /${page}`);
}
assert.ok(existsSync(path.join(root, "404.html")), "Missing 404 page");
assert.ok(existsSync(path.join(root, ".nojekyll")), "Missing .nojekyll");
assert.ok(!existsSync(path.join(root, "api")), "The export must not depend on API routes");

let checked = 0;
for (const file of readdirSync(root, { recursive: true })) {
  if (!file.endsWith(".html")) continue;
  const html = readFileSync(path.join(root, file), "utf8");
  assert.ok(!html.includes("TURBOPACK_CHUNK_BASE_PATH="), "Obsolete HTML rewrite found");
  for (const match of html.matchAll(/\b(?:href|src)="(\/(?!\/)[^"]*)"/g)) {
    const url = new URL(match[1].replaceAll("&amp;", "&"), "https://example.test");
    assert.ok(url.pathname.startsWith(`${basePath}/`), `${file}: path outside basePath: ${url.pathname}`);
    const target = path.join(root, decodeURIComponent(url.pathname.slice(basePath.length)));
    assert.ok(existsSync(target), `${file}: missing target ${url.pathname}`);
    if (statSync(target).isDirectory()) {
      assert.ok(existsSync(path.join(target, "index.html")), `${file}: missing directory index ${url.pathname}`);
    }
    checked++;
  }
}
const contact = readFileSync(path.join(root, "contact", "index.html"), "utf8");
assert.ok(contact.includes("Open Email Draft"), "Contact page must explain email draft behavior");
console.log(`Verified ${pages.length} pages, 404, .nojekyll and ${checked} local links/assets under ${basePath || "/"}.`);

await import("./check-seo.mjs");
