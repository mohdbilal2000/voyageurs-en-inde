import path from 'path';
import { writeFileSync } from 'fs';
import { defineConfig, loadEnv, Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { TRIPS, REGIONS, THEMES } from './constants';

const SITE_URL = 'https://www.voyageurseninde.fr';

function llmsTxtPlugin(): Plugin {
  return {
    name: 'generate-llms-txt',
    apply: 'build',
    closeBundle() {
      const tripLines = TRIPS.map(
        (t) => `- [${t.title}](${SITE_URL}/circuits/${t.slug}): ${t.duration}, à partir de ${t.price}€/pers. — ${t.description}`
      ).join('\n');

      const regionLines = REGIONS.map(
        (r) => `- [${r.name}](${SITE_URL}/destinations/${r.id}): tous les circuits sur mesure au ${r.name}`
      ).join('\n');

      const themeLines = THEMES.map(
        (t) => `- [${t.name}](${SITE_URL}/themes/${t.id}): tous les circuits sur le thème ${t.name}`
      ).join('\n');

      const content = `# Voyageurs en Inde

> Agence francophone de voyages sur mesure en Inde depuis 2008. Circuits privatifs au Rajasthan, Kerala, Himalaya et dans tout le sous-continent indien, avec guides francophones et conciergerie 24/7. Basée à Agra, Inde.

## Pages principales

- [Accueil](${SITE_URL}/): présentation de l'agence et liste de tous les circuits
- [Conseils de voyage](${SITE_URL}/conseils): guides pratiques (visa, météo, culture) pour préparer un voyage en Inde
- [L'Agence](${SITE_URL}/a-propos): histoire, valeurs et équipe de Voyageurs en Inde
- [Politique de Confidentialité](${SITE_URL}/politique-de-confidentialite)
- [Conditions Générales de Vente](${SITE_URL}/conditions-generales-de-vente)
- [Mentions Légales](${SITE_URL}/mentions-legales)

## Destinations

${regionLines}

## Thématiques

${themeLines}

## Circuits disponibles

${tripLines}

## Contact

- Téléphone / WhatsApp: +91 750 583 3393
- Email: voyageurseninde@gmail.com
- Adresse: 45 Sai Vihar, Pushpanjali Puram, Phase 1, Taj Nagar, Phase 2, Agra 282001, Inde
`;

      writeFileSync(path.resolve(__dirname, 'dist/llms.txt'), content, 'utf-8');
      console.log('[llms.txt] wrote dist/llms.txt');
    },
  };
}

function sitemapPlugin(): Plugin {
  return {
    name: 'generate-sitemap',
    apply: 'build',
    closeBundle() {
      const staticRoutes = ['/', '/conseils', '/a-propos', '/politique-de-confidentialite', '/conditions-generales-de-vente', '/mentions-legales'];
      const tripRoutes = TRIPS.map((t) => `/circuits/${t.slug}`);
      const regionRoutes = REGIONS.map((r) => `/destinations/${r.id}`);
      const themeRoutes = THEMES.map((t) => `/themes/${t.id}`);
      const urls = [...staticRoutes, ...regionRoutes, ...themeRoutes, ...tripRoutes];
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
      plugins: [react(), sitemapPlugin(), llmsTxtPlugin()],
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
