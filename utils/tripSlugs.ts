import { Trip } from '../types';
import { slugify } from './slugify';

/** Ensure every trip has a stable, unique URL slug derived from its title. */
export function withTripSlugs(trips: Trip[]): Trip[] {
  const seen = new Set<string>();
  return trips.map((t) => {
    let slug = t.slug && t.slug.trim() ? t.slug : slugify(t.title);
    if (seen.has(slug)) slug = `${slug}-${t.id}`;
    seen.add(slug);
    return { ...t, slug };
  });
}
