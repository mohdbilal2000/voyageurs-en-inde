import raw from './site-data.json';
import { SiteData } from '../types';
import { withTripSlugs } from '../utils/tripSlugs';
import { withGuideSlugs } from '../utils/guideSlugs';

// The published, build-time source of truth for all site content.
// Edited via the /admin panel and published by replacing this JSON file.
const parsed = raw as unknown as SiteData;

export const DEFAULT_SITE_DATA: SiteData = {
  ...parsed,
  trips: withTripSlugs(parsed.trips),
  guides: withGuideSlugs(parsed.guides),
};
