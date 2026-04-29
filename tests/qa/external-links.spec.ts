/**
 * Suite 3 — External links.
 * For every external link discovered from the homepage:
 *   HEAD < 400 (or fall back to GET if HEAD is rejected).
 * Skips known rate-limit-prone domains (linkedin.com, twitter.com, x.com)
 * and reports them so the operator can manually verify.
 */
import { test, expect } from '@playwright/test';
import { dedupeLinks, discoverLinks, isRateLimitDomain } from './helpers/crawl';

test('external links from homepage all resolve', async ({ page, request }) => {
  test.setTimeout(180_000);

  await page.goto('/');
  const all = await discoverLinks(page);
  const external = dedupeLinks(all.filter((l) => !l.isInternal && (l.href.startsWith('http://') || l.href.startsWith('https://'))));

  const skipped: string[] = [];
  const failures: string[] = [];

  for (const link of external) {
    if (isRateLimitDomain(link.hostname)) {
      skipped.push(`${link.href} (rate-limit domain)`);
      continue;
    }

    let status: number | null = null;
    try {
      const head = await request.fetch(link.href, { method: 'HEAD', maxRedirects: 5, timeout: 15_000 });
      status = head.status();
      // Some servers reject HEAD with 4xx; retry with GET.
      if (status >= 400) {
        const got = await request.get(link.href, { maxRedirects: 5, timeout: 15_000 });
        status = got.status();
      }
    } catch (e) {
      failures.push(`${link.href} — fetch error: ${(e as Error).message}`);
      continue;
    }

    if (status >= 400) {
      failures.push(`${status} ${link.href}`);
    }
  }

  if (skipped.length) {
    console.warn(`External links skipped for manual review:\n  ${skipped.join('\n  ')}`);
  }

  expect(failures, `External link failures:\n${failures.join('\n')}`).toEqual([]);
});
