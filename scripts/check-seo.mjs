import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const site = `${(process.env.NEXT_PUBLIC_SITE_URL || "https://d4n5h.github.io/udi-website/").replace(/\/+$/, "")}/`;
const routes = ["", "about", "music", "concerts", "contact", "epk"];
const titles = new Set();
const descriptions = new Set();
const decode = (text) => text.replaceAll("&amp;", "&").replaceAll("&quot;", '"').replaceAll("&#x27;", "'");
const attrs = (tag) => Object.fromEntries([...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, key, value]) => [key, decode(value)]));
const read = (file) => readFileSync(`out/${file}`, "utf8");
const sitemap = read("sitemap.xml");
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, value]) => value);
assert.equal(locations.length, routes.length, "Sitemap must contain exactly the public pages");

for (const route of routes) {
  const html = read(`${route ? `${route}/` : ""}index.html`);
  const head = html.match(/<head>([\s\S]*?)<\/head>/)?.[1];
  assert.ok(head, `${route}: missing head`);
  const title = decode(head.match(/<title>(.*?)<\/title>/)?.[1] || "");
  const metas = [...head.matchAll(/<meta\s[^>]*>/g)].map(([tag]) => attrs(tag));
  const meta = (key) => metas.find(tag => tag.name === key || tag.property === key)?.content;
  const links = [...head.matchAll(/<link\s[^>]*>/g)].map(([tag]) => attrs(tag));
  const url = new URL(route ? `${route}/` : "", site).href;
  assert.ok(title.length >= 25 && title.length <= 65, `${route}: unsuitable title length`);
  assert.ok(!titles.has(title), `${route}: duplicate title`);
  titles.add(title);
  const description = meta("description") || "";
  assert.ok(description.length >= 100 && description.length <= 170, `${route}: unsuitable description length`);
  assert.ok(!descriptions.has(description), `${route}: duplicate description`);
  descriptions.add(description);
  assert.equal(links.filter(tag => tag.rel === "canonical").length, 1, `${route}: one canonical required`);
  assert.equal(links.find(tag => tag.rel === "canonical")?.href, url, `${route}: incorrect canonical`);
  assert.ok(locations.includes(url), `${route}: canonical missing from sitemap`);
  assert.equal(meta("og:url"), url);
  assert.equal(meta("og:title"), title);
  assert.equal(meta("og:description"), description);
  assert.equal(meta("twitter:title"), title);
  assert.equal(meta("twitter:description"), description);
  assert.equal(meta("twitter:card"), "summary_large_image");
  assert.equal(meta("og:image"), new URL("social-card.png", site).href);
  assert.equal(meta("twitter:image"), meta("og:image"));
  assert.equal(meta("og:image:width"), "1200");
  assert.equal(meta("og:image:height"), "630");
  assert.ok(meta("og:image:alt"));
  assert.ok(meta("robots")?.includes("index, follow"));
  assert.ok(meta("googlebot")?.includes("max-image-preview:large"));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: exactly one main heading required`);
  assert.ok(links.some(tag => tag.rel === "icon" && tag.type === "image/svg+xml"));
  assert.ok(links.some(tag => tag.rel === "apple-touch-icon" && tag.sizes === "180x180"));
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(([, data]) => JSON.parse(data)["@graph"]);
  assert.ok(graphs.some(node => node["@type"] === "Person" && node.name === "Udi Shlomo"));
  assert.ok(graphs.some(node => node["@id"] === `${url}#webpage` && node.url === url));
  if (route) assert.ok(graphs.some(node => node["@type"] === "BreadcrumbList"));
}

assert.ok(read("robots.txt").includes(`Sitemap: ${new URL("sitemap.xml", site).href}`));
assert.ok(/name="robots" content="noindex"/.test(read("404.html")), "404 must remain noindex");
assert.ok(!read("404.html").includes('rel="canonical"'), "404 must not claim a homepage canonical");
const manifest = JSON.parse(read("manifest.webmanifest"));
assert.equal(new URL(manifest.start_url, site).href, site);
for (const icon of manifest.icons) {
  assert.ok(existsSync(`out/icons/${icon.src.split("/").at(-1)}`));
}
const image = readFileSync("out/social-card.png");
assert.equal(image.subarray(1, 4).toString(), "PNG");
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
const favicon = readFileSync("out/favicon.ico");
assert.equal(favicon.readUInt16LE(2), 1);
assert.equal(favicon.readUInt16LE(4), 3);
console.log("SEO verified: unique titles/descriptions, canonicals, social cards, JSON-LD, headings, sitemap, robots, manifest and favicons.");
