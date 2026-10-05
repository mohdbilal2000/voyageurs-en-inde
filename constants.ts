import { Trip, Theme, Region, Guide } from './types';
import { DEFAULT_SITE_DATA } from './data/siteData';

// All site content now lives in data/site-data.json (the single source of truth,
// edited through the /admin panel). These named exports are kept for backward
// compatibility and for build-time use (e.g. sitemap generation); prefer the
// `useSiteData()` hook in components so that live admin edits show up.
export const TRIPS: Trip[] = DEFAULT_SITE_DATA.trips;
export const THEMES: Theme[] = DEFAULT_SITE_DATA.themes;
export const REGIONS: Region[] = DEFAULT_SITE_DATA.regions;
export const GUIDES: Guide[] = DEFAULT_SITE_DATA.guides;
