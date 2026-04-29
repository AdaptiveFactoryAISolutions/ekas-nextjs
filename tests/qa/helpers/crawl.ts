import type { Page } from '@playwright/test';
import { RATE_LIMIT_DOMAINS } from './routes';

export interface DiscoveredLink {
  href: string;
  text: string;
  isInternal: boolean;
  hostname: string | null;
  pathname: string | null;
}

/**
 * Extract all <a href> links from a loaded page and classify them.
 * Strips fragment-only links ("#anchor"), mailto:, and tel: by default.
 */
export async function discoverLinks(
  page: Page,
  opts: { includeAnchors?: boolean } = {},
): Promise<DiscoveredLink[]> {
  const baseHostname = new URL(page.url()).hostname;
  const links = await page.$$eval('a[href]', (anchors, baseHost) => {
    return anchors.map((a) => {
      const href = a.getAttribute('href') || '';
      const text = (a.textContent || '').trim();
      let url: URL | null = null;
      try {
        url = new URL(href, window.location.href);
      } catch {
        return { href, text, hostname: null, pathname: null, isInternal: false };
      }
      return {
        href,
        text,
        hostname: url.hostname,
        pathname: url.pathname,
        isInternal: url.hostname === baseHost,
      };
    });
  }, baseHostname);

  return links.filter((l) => {
    if (!l.href) return false;
    if (l.href.startsWith('mailto:') || l.href.startsWith('tel:')) return false;
    if (!opts.includeAnchors && l.href.startsWith('#')) return false;
    return true;
  });
}

/**
 * Deduplicate links by full normalized href.
 * Keeps the first encounter's text (helps debugging).
 */
export function dedupeLinks(links: DiscoveredLink[]): DiscoveredLink[] {
  const seen = new Map<string, DiscoveredLink>();
  for (const l of links) {
    const key = `${l.hostname || ''}${l.pathname || ''}${l.href.includes('?') ? l.href.slice(l.href.indexOf('?')) : ''}`;
    if (!seen.has(key)) seen.set(key, l);
  }
  return Array.from(seen.values());
}

export function isRateLimitDomain(hostname: string | null): boolean {
  if (!hostname) return false;
  return RATE_LIMIT_DOMAINS.some((d) => hostname.endsWith(d));
}
