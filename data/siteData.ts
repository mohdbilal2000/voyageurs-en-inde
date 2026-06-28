import raw from './site-data.json';
import { SiteData } from '../types';

// The published, build-time source of truth for all site content.
// Edited via the /admin panel and published by replacing this JSON file.
export const DEFAULT_SITE_DATA = raw as unknown as SiteData;
