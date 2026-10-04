import { useEffect } from 'react';

const SITE_URL = 'https://www.voyageurseninde.fr';

interface SeoOptions {
  title: string;
  description?: string;
  path?: string;
}

function setMeta(selector: string, attr: string, value: string, create: () => HTMLElement) {
  let el = document.head.querySelector(selector);
  if (!el) {
    el = create();
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

export function useSeo({ title, description, path = '/' }: SeoOptions) {
  useEffect(() => {
    document.title = title;

    if (description) {
      setMeta('meta[name="description"]', 'content', description, () => {
        const meta = document.createElement('meta');
        meta.setAttribute('name', 'description');
        return meta;
      });
      setMeta('meta[property="og:description"]', 'content', description, () => {
        const meta = document.createElement('meta');
        meta.setAttribute('property', 'og:description');
        return meta;
      });
    }

    setMeta('meta[property="og:title"]', 'content', title, () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:title');
      return meta;
    });

    const canonicalUrl = `${SITE_URL}${path}`;
    setMeta('link[rel="canonical"]', 'href', canonicalUrl, () => {
      const link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      return link;
    });
    setMeta('meta[property="og:url"]', 'content', canonicalUrl, () => {
      const meta = document.createElement('meta');
      meta.setAttribute('property', 'og:url');
      return meta;
    });
  }, [title, description, path]);
}
