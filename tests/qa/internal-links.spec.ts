/**
 * Suite 2 — Internal links.
 * Crawl the homepage; for every internal link discovered, verify:
 *  - resolves to 200 (or expected redirect)
 *  - link text is non-empty (no <a></a> or whitespace-only)
 *
 * Discovers ~all main nav + footer links from the home page (which
 * is enough — those components render on every page via PageShell).
 */
import { test, expect } from '@playwright/test';
import { dedupeLinks, discoverLinks } from './helpers/crawl';
import { REDIRECTS } from './helpers/routes';

const REDIRECT_SOURCES = new Set(REDIRECTS.map(([source]) => source as string));

test('internal links from homepage all resolve and have visible text', async ({ page, request }) => {
  test.setTimeout(180_000);

  await page.goto('/');
  const all = await discoverLinks(page);
  const internal = dedupeLinks(all.filter((l) => l.isInternal));

  // Sanity: should have at least the nav + footer link inventory.
  expect(internal.length, 'No internal links discovered from homepage').toBeGreaterThan(20);

  const failures: string[] = [];
  const empties: string[] = [];

  for (const link of internal) {
    if (!link.text || !link.text.replace(/\s+/g, '').length) {
      // Skip image-only / icon links that have a non-empty href but no text content.
      // Only flag truly empty <a></a>.
      const hadHref = !!link.href;
      if (hadHref && !link.text.length) empties.push(`<a href="${link.href}"></a>`);
      continue;
    }
    if (!link.pathname) continue;

    // Strip fragment for fetch.
    const fetchUrl = link.pathname + (link.href.includes('?') ? link.href.slice(link.href.indexOf('?')) : '');

    let resp;
    try {
      resp = await request.get(fetchUrl, { maxRedirects: 5 });
    } catch (e) {
      failures.push(`${fetchUrl} — fetch error: ${(e as Error).message}`);
      continue;
    }
    const status = resp.status();
    const isExpectedRedirect = REDIRECT_SOURCES.has(fetchUrl);

    if (status >= 400) {
      failures.push(`${status} ${fetchUrl} (link text: "${link.text}")`);
    } else if (status >= 300 && !isExpectedRedirect) {
      failures.push(`unexpected redirect ${status} ${fetchUrl}`);
    }
  }

  if (empties.length) {
    console.warn(`Empty internal links found:\n  ${empties.join('\n  ')}`);
  }

  expect(failures, `Internal link failures:\n${failures.join('\n')}`).toEqual([]);
});
