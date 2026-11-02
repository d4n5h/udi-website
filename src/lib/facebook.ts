import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fetch as facebookFetch } from "undici";
import { facebookPage } from "@/data/site-content";
import { assetPath } from "@/lib/asset-path";

const ua =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/156.0.0.0 Safari/537.36";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export type FacebookPost = {
  id: string;
  href: string;
  date: string;
  label: string;
  text: string;
  image: string | null;
  width: number;
  height: number;
};

function pluginUrl() {
  const params = new URLSearchParams({
    href: facebookPage.href,
    tabs: "timeline",
    width: "500",
    height: "3200",
    small_header: "true",
    adapt_container_width: "true",
    hide_cover: "true",
    show_facepile: "false",
  });
  return `https://www.facebook.com/plugins/page.php?${params}`;
}

async function feedHtml() {
  const pageUrl = pluginUrl();
  const page = await facebookFetch(pageUrl, {
    headers: { "user-agent": ua, accept: "text/html", "accept-language": "en-US,en;q=0.9" },
    signal: AbortSignal.timeout(8000),
  });
  if (!page.ok) throw new Error(String(page.status));
  const html = await page.text();
  const token = html.match(/"LSD",\[\],\{"token":"([^"]+)"/)?.[1];
  const session = html.match(/"haste_session":"([^"]+)"/)?.[1];
  const hsi = html.match(/"hsi":"([^"]+)"/)?.[1];
  const revision = html.match(/"client_revision":(\d+)/)?.[1];
  if (!token || !session || !hsi || !revision) throw new Error("token");
  const config = {
    app_id: "776730922422337",
    href: facebookPage.href.replace(/\/$/, ""),
    width: 500,
    height: 3200,
    has_cta: false,
    has_small_header: true,
    has_adapt_container_width: true,
    has_cover: false,
    has_posts: false,
    tabs: "timeline",
    can_personalize: false,
    is_xfbml: false,
    referer_uri: "",
  };
  const feedUrl =
    "https://www.facebook.com/platform/plugin/tab/renderer/?key=timeline&config_json=" +
    `${encodeURIComponent(JSON.stringify(config))}&fb_dtsg_ag&__user=0&__a=1&__req=1` +
    `&__hs=${encodeURIComponent(session)}&dpr=1&__ccg=EXCELLENT&__rev=${revision}&__hsi=${hsi}&__sp=1`;
  const feed = await facebookFetch(feedUrl, {
    headers: {
      "user-agent": ua,
      accept: "*/*",
      "accept-language": "en-US,en;q=0.9",
      referer: pageUrl,
      "x-fb-lsd": token,
      "x-asbd-id": "359341",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
    },
    signal: AbortSignal.timeout(8000),
  });
  if (!feed.ok) throw new Error(String(feed.status));
  const data = JSON.parse((await feed.text()).replace(/^for \(;;\);/, "")) as {
    payload?: { content?: { markup?: { __html?: string } } };
  };
  const markup = data.payload?.content?.markup?.__html;
  if (!markup) throw new Error("feed");
  return markup;
}

function posted(unix: number) {
  const date = new Date(unix * 1000);
  return {
    date: date.toISOString().slice(0, 10),
    label: `${date.getUTCDate()} ${months[date.getUTCMonth()]} ${date.getUTCFullYear()}`,
  };
}

function postText(block: string) {
  const start = block.indexOf('data-testid="post_message"');
  if (start < 0) return "";
  const open = block.indexOf(">", start);
  const end = block.indexOf("_3x-2", open);
  const chunk = block.slice(open + 1, end > open ? end : open + 2500);
  const plain = chunk
    .replace(/<span class="text_exposed_hide">\.\.\.<\/span>/g, "")
    .replace(/<a class="see_more_link"[\s\S]*?<\/a>/g, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]*>/g, "")
    .replace(/<[^>]*$/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, " ");
  return plain
    .split("\n")
    .map((line) => line.replace(/[ \t]+/g, " ").trim())
    .filter(Boolean)
    .join("\n");
}

function jpegSize(buf: Buffer) {
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null;
  let offset = 2;
  while (offset + 8 < buf.length) {
    if (buf[offset] !== 0xff) return null;
    const marker = buf[offset + 1];
    const length = buf.readUInt16BE(offset + 2);
    if (marker === 0xc0 || marker === 0xc2) {
      return { height: buf.readUInt16BE(offset + 5), width: buf.readUInt16BE(offset + 7) };
    }
    offset += 2 + length;
  }
  return null;
}

async function saveImage(url: string) {
  const name = new URL(url).pathname.split("/").pop();
  if (!name?.endsWith(".jpg")) return null;
  try {
    const response = await facebookFetch(url, {
      headers: { "user-agent": ua, referer: "https://www.facebook.com/" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) return null;
    const bytes = Buffer.from(await response.arrayBuffer());
    const size = jpegSize(bytes);
    if (!size) return null;
    const dir = path.join(process.cwd(), "public", "images", "facebook");
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, name), bytes);
    return { src: assetPath(`/images/facebook/${name}`), ...size };
  } catch {
    return null;
  }
}

export async function loadFacebookPosts(): Promise<FacebookPost[]> {
  try {
    const html = await feedHtml();
    const slug = new URL(facebookPage.href).pathname.split("/").filter(Boolean)[0];
    const ids = [
      ...new Set([...html.matchAll(new RegExp(`/${slug}/posts/(pfbid[A-Za-z0-9]+)`, "g"))].map((match) => match[1])),
    ].slice(0, 4);
    const posts: FacebookPost[] = [];
    const saved = new Map<string, Awaited<ReturnType<typeof saveImage>>>();
    for (const [index, id] of ids.entries()) {
      const start = html.indexOf(id);
      const next = ids[index + 1] ? html.indexOf(ids[index + 1], start + id.length) : html.length;
      const block = html.slice(start, next);
      const unix = Number(block.match(/data-utime="(\d+)"/)?.[1]);
      if (!unix) continue;
      const text = postText(block);
      const imageUrl = [...block.matchAll(/<img[^>]+src="([^"]+)"/g)]
        .map((match) => match[1].replace(/&amp;/g, "&"))
        .find((src) => src.includes("scontent") && !src.includes("s50x50"));
      let image = imageUrl ? saved.get(imageUrl) : null;
      if (imageUrl && image === undefined) {
        image = await saveImage(imageUrl);
        saved.set(imageUrl, image);
      }
      posts.push({
        id,
        href: `https://www.facebook.com/${slug}/posts/${id}`,
        ...posted(unix),
        text,
        image: image?.src ?? null,
        width: image?.width ?? 0,
        height: image?.height ?? 0,
      });
    }
    return posts.filter((post) => post.text || post.image);
  } catch {
    return [];
  }
}
