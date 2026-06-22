// prerender.mjs
// Build-time static prerender. Runs after `vite build`: serves dist/ locally,
// renders each sitemap route in Vercel-compatible headless Chromium, writes HTML.
import http from 'node:http';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import { join, dirname, extname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';
import chromium from '@sparticuz/chromium';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const HOST = '127.0.0.1';
const PORT = 4317;
const ORIGIN = `http://${HOST}:${PORT}`;

const MIME = {
  '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript',
  '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.gif': 'image/gif',
  '.ico': 'image/x-icon', '.woff': 'font/woff', '.woff2': 'font/woff2', '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8', '.xml': 'application/xml',
  '.webmanifest': 'application/manifest+json',
};

if (!existsSync(DIST)) {
  console.error('[prerender] dist/ not found — run "vite build" first.');
  process.exit(1);
}

const shell = await readFile(join(DIST, 'index.html'), 'utf-8');

function startServer() {
  return new Promise((resolve) => {
    const server = http.createServer(async (req, res) => {
      const pathname = decodeURIComponent(new URL(req.url, ORIGIN).pathname);
      const filePath = join(DIST, pathname);
      if (extname(pathname) && existsSync(filePath) && statSync(filePath).isFile()) {
        try {
          const data = await readFile(filePath);
          res.writeHead(200, { 'Content-Type': MIME[extname(pathname)] || 'application/octet-stream' });
          return res.end(data);
        } catch { /* fall through to shell */ }
      }
      res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(shell);
    });
    server.listen(PORT, HOST, () => resolve(server));
  });
}

async function getRoutes() {
  const routes = new Set(['/']);
  const sitemapPath = join(DIST, 'sitemap.xml');
  if (existsSync(sitemapPath)) {
    const xml = await readFile(sitemapPath, 'utf-8');
    for (const m of xml.matchAll(/<loc>([^<]+)<\/loc>/g)) {
      try { routes.add(new URL(m[1].trim()).pathname || '/'); } catch { /* skip */ }
    }
  }
  return [...routes];
}

const server = await startServer();
const routes = await getRoutes();
console.log(`[prerender] rendering ${routes.length} routes`);

chromium.setGraphicsMode = false;
const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(),
  headless: chromium.headless,
  defaultViewport: { width: 1280, height: 1800 },
});

let ok = 0;
let failed = 0;
for (const route of routes) {
  const page = await browser.newPage();
  try {
    await page.goto(`${ORIGIN}${route}`, { waitUntil: 'domcontentloaded', timeout: 45000 });
    await page.waitForFunction(() => {
      const root = document.getElementById('root');
      const text = root ? (root.innerText || '').trim() : '';
      return text.length > 120;
    }, { timeout: 45000 });
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let y = 0;
        const step = () => {
          window.scrollBy(0, 700);
          y += 700;
          if (y >= document.body.scrollHeight) { window.scrollTo(0, 0); resolve(); }
          else setTimeout(step, 40);
        };
        step();
      });
    });
    await new Promise((r) => setTimeout(r, 350));

    const html = await page.content();
    const outPath = route === '/' ? join(DIST, 'index.html') : join(DIST, route, 'index.html');
    await mkdir(dirname(outPath), { recursive: true });
    await writeFile(outPath, html, 'utf-8');
    console.log(`  ✓ ${route}`);
    ok++;
  } catch (err) {
    console.warn(`  ✗ ${route} — ${err.message}`);
    failed++;
  } finally {
    await page.close();
  }
}

await browser.close();
server.close();
console.log(`[prerender] done — ${ok} rendered, ${failed} failed`);
if (ok === 0) {
  console.error('[prerender] nothing rendered; failing build.');
  process.exit(1);
}
