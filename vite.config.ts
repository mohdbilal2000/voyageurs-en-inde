import path from 'path';
import { writeFileSync } from 'fs';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { TRIPS } from './constants';

const SITE_URL = 'https://www.voyageurseninde.fr';

function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const staticRoutes = ['/', '/conseils', '/a-propos'];
      const tripRoutes = TRIPS.map((t) => `/circuits/${t.slug}`);
      const urls = [...staticRoutes, ...tripRoutes];
      const today = new Date().toISOString().slice(0, 10);

      const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
        .map(
          (u) => `  <url>\n    <loc>${SITE_URL}${u}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>${u === '/' ? '1.0' : '0.8'}</priority>\n  </url>`
        )
        .join('\n')}\n</urlset>\n`;

      writeFileSync(path.resolve(__dirname, 'dist/sitemap.xml'), xml, 'utf-8');
      console.log(`[sitemap] wrote ${urls.length} URLs to dist/sitemap.xml`);
    },
  };
}

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react(), sitemapPlugin()],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
