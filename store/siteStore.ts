import { useSyncExternalStore } from 'react';
import { SiteData } from '../types';
import { DEFAULT_SITE_DATA } from '../data/siteData';
import { withTripSlugs } from '../utils/tripSlugs';
import { withGuideSlugs } from '../utils/guideSlugs';

// ---------------------------------------------------------------------------
// Site content store
//
// Priority of data shown on the site:
//   1. Local working copy in localStorage (live admin edits / preview)
//   2. The published build-time JSON (data/site-data.json)
//
// The admin panel writes to localStorage so changes preview instantly in this
// browser. "Publishing" exports the JSON which a developer commits to make the
// changes live (and SEO-correct via the prerender step) for everyone.
// ---------------------------------------------------------------------------

const STORAGE_KEY = 'vei_site_data_v1';
const EVENT = 'vei-site-data-changed';

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Ensure a parsed object has every top-level collection so the UI never crashes. */
export function normalizeSiteData(input: Partial<SiteData> | null | undefined): SiteData {
  const base = DEFAULT_SITE_DATA;
  return {
    version: input?.version ?? base.version ?? 1,
    trips: withTripSlugs(Array.isArray(input?.trips) ? input!.trips : deepClone(base.trips)),
    themes: Array.isArray(input?.themes) ? input!.themes : deepClone(base.themes),
    regions: Array.isArray(input?.regions) ? input!.regions : deepClone(base.regions),
    guides: withGuideSlugs(Array.isArray(input?.guides) ? input!.guides : deepClone(base.guides)),
  };
}

let cache: SiteData | null = null;

function compute(): SiteData {
  if (typeof window === 'undefined') return DEFAULT_SITE_DATA;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) return normalizeSiteData(JSON.parse(raw));
  } catch {
    /* corrupt storage — fall back to published defaults */
  }
  return DEFAULT_SITE_DATA;
}

function getSnapshot(): SiteData {
  if (cache === null) cache = compute();
  return cache;
}

function getServerSnapshot(): SiteData {
  return DEFAULT_SITE_DATA;
}

const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      cache = null;
      emit();
    }
  };
  const onCustom = () => {
    cache = null;
    emit();
  };
  window.addEventListener('storage', onStorage);
  window.addEventListener(EVENT, onCustom);
  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', onStorage);
    window.removeEventListener(EVENT, onCustom);
  };
}

/** Read the current site data (defaults merged with any local working copy). */
export function loadSiteData(): SiteData {
  return getSnapshot();
}

/** Whether the admin has unpublished local edits in this browser. */
export function hasLocalEdits(): boolean {
  if (typeof window === 'undefined') return false;
  return window.localStorage.getItem(STORAGE_KEY) !== null;
}

/** Persist the working copy and notify all subscribers (this tab + others). */
export function saveSiteData(data: SiteData): void {
  const normalized = normalizeSiteData(data);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized));
  cache = normalized;
  window.dispatchEvent(new Event(EVENT));
}

/** Discard local edits and revert to the published defaults. */
export function resetSiteData(): void {
  window.localStorage.removeItem(STORAGE_KEY);
  cache = null;
  window.dispatchEvent(new Event(EVENT));
}

/** The pristine published data, ignoring any local working copy. */
export function publishedSiteData(): SiteData {
  return DEFAULT_SITE_DATA;
}

/** React hook — re-renders when the site data changes anywhere. */
export function useSiteData(): SiteData {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
