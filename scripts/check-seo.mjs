import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";

const site = `${(process.env.NEXT_PUBLIC_SITE_URL || "https://udishlomomusic.com/").replace(/\/+$/, "")}/`;
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
  assert.ok(title.length >= 40 && title.length <= 60, `${route}: unsuitable title length ${title.length}`);
  assert.ok(!titles.has(title), `${route}: duplicate title`);
  titles.add(title);
  const description = meta("description") || "";
  assert.ok(description.length >= 110 && description.length <= 160, `${route}: unsuitable description length ${description.length}`);
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
  assert.equal(meta("og:image:type"), "image/png");
  assert.ok(meta("og:image:alt"));
  assert.equal(meta("og:type"), route === "about" ? "profile" : "website");
  if (route === "about") {
    assert.equal(meta("profile:first_name"), "Udi");
    assert.equal(meta("profile:last_name"), "Shlomo");
  }
  if (route === "contact") {
    assert.equal(meta("og:email"), "udi.shlomo.music@gmail.com");
    assert.ok(meta("og:phone_number")?.includes("410"));
  }
  assert.ok(meta("robots")?.includes("index, follow"));
  assert.ok(meta("googlebot")?.includes("max-image-preview:large"));
  assert.equal((html.match(/<h1\b/g) || []).length, 1, `${route}: exactly one main heading required`);
  assert.ok(links.some(tag => tag.rel === "icon" && tag.type === "image/svg+xml"));
  assert.ok(links.some(tag => tag.rel === "apple-touch-icon" && tag.sizes === "180x180"));
  const graphs = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)]
    .flatMap(([, data]) => JSON.parse(data)["@graph"]);
  assert.ok(graphs.some(node => node["@type"] === "Person" && node.name === "Udi Shlomo"));
  assert.ok(graphs.some(node => node["@id"] === `${url}#webpage` && node.url === url));
  if (route) assert.ok(graphs.some(node => node["@type"] === "BreadcrumbList" && node.itemListElement.length >= 2));
  if (route === "about") {
    const profile = graphs.find(node => node["@type"] === "ProfilePage");
    assert.equal(profile.mainEntity.name, "Udi Shlomo");
    assert.ok(profile.mainEntity.description.includes("Trondheim"));
  }
  if (route === "contact") {
    const contact = graphs.find(node => node["@type"] === "ContactPage").mainEntity;
    assert.equal(contact.email, "udi.shlomo.music@gmail.com");
    assert.equal(contact.telephone, "+47 410 64 044");
    assert.equal(contact.address.addressLocality, "Trondheim");
  }
  if (route === "music") {
    assert.ok(graphs.some(node => node["@type"] === "MusicAlbum" && node.name === "You & Me"));
    assert.ok(graphs.some(node => node["@type"] === "MusicGroup" && node.sameAs?.includes("https://open.spotify.com/artist/3x9Pa86pQ8yQ4XcvsuDgGu")));
  }
  if (!route) {
    assert.ok(graphs.some(node => node["@type"] === "MusicGroup" && node.genre === "World Jazz"));
    assert.ok(graphs.some(node => node.jobTitle?.includes("Drummer")));
  }
}

assert.ok(read("robots.txt").includes(`Sitemap: ${new URL("sitemap.xml", site).href}`));
const missing = read("404.html");
assert.ok(/name="robots" content="noindex/.test(missing), "404 must remain noindex");
assert.ok(!missing.includes('rel="canonical"'), "404 must not claim a homepage canonical");
assert.ok(missing.includes("<title>Page not found | Udi Shlomo</title>"), "404 needs its own title");
assert.match(missing, /name="description" content="This page is not on the Udi Shlomo website\./);
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
