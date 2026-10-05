import { Trip } from '../types';

// Trips store a free-text `region` label (e.g. "Nord", "Safari") that doesn't
// always match a Region's display `name` exactly, and must keep working even
// if an admin renames a region later. This maps each known region id to the
// raw trip.region values that belong to it, independent of display name.
const REGION_ALIASES: Record<string, string[]> = {
  rajasthan: ['rajasthan'],
  sud: ['inde du sud', 'sud', 'safari'],
  himalaya: ['himalaya'],
  nord: ['nord'],
  varanasi: ['khajuraho & varanasi'],
};

export function tripsForRegion(trips: Trip[], regionId: string): Trip[] {
  const aliases = REGION_ALIASES[regionId] ?? [regionId.toLowerCase()];
  return trips.filter((t) => aliases.includes(t.region.toLowerCase()));
}
