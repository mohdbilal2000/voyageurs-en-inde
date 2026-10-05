import { Guide } from '../types';
import { slugify } from './slugify';

/** Ensure every guide has a stable, unique URL slug derived from its title. */
export function withGuideSlugs(guides: Guide[]): Guide[] {
  const seen = new Set<string>();
  return guides.map((g) => {
    let slug = g.slug && g.slug.trim() ? g.slug : slugify(g.title);
    if (seen.has(slug)) slug = `${slug}-${g.id}`;
    seen.add(slug);
    return { ...g, slug };
  });
}
