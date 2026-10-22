import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const html = await readFile(path.join(root, "index.html"), "utf8").catch(() => {
  throw new Error("Build the site first with npm run build:static.");
});
const basePath = html.match(/(?:src|href)="([^"\s]*)\/_next\//)?.[1] ?? "";
const port = Number(process.env.PORT || 3000);
const types = {
  ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript",
  ".json": "application/json", ".txt": "text/plain", ".svg": "image/svg+xml",
  ".jpg": "image/jpeg", ".png": "image/png", ".webp": "image/webp",
  ".ico": "image/x-icon", ".woff2": "font/woff2", ".xml": "application/xml",
  ".webmanifest": "application/manifest+json",
};

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    if (basePath && url.pathname === "/") {
      response.writeHead(302, { Location: `${basePath}/` }).end();
      return;
    }
    if (!url.pathname.startsWith(`${basePath}/`)) throw new Error("Not found");
    const file = path.resolve(root, `.${decodeURIComponent(url.pathname.slice(basePath.length))}`);
    if (file !== root && !file.startsWith(`${root}${path.sep}`)) throw new Error("Not found");
    const info = await stat(file);
    if (info.isDirectory() && !url.pathname.endsWith("/")) {
      response.writeHead(301, { Location: `${url.pathname}/${url.search}` }).end();
      return;
    }
    const target = info.isDirectory() ? path.join(file, "index.html") : file;
    const content = await readFile(target);
    response.writeHead(200, { "Content-Type": types[path.extname(target)] || "application/octet-stream" });
    response.end(content);
  } catch {
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(await readFile(path.join(root, "404.html")).catch(() => "Not found"));
  }
}).listen(port, "127.0.0.1", () => {
  console.log(`Static preview: http://localhost:${port}${basePath}/`);
});
