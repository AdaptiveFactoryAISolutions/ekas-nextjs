/**
 * Suite 1 — Routes and redirects.
 * For every canonical route: 200, has <title>, has meta description,
 * no console errors during navigation, no 404 sub-resources in the
 * response. Plus the two redirects in next.config.js.
 */
import { test, expect } from '@playwright/test';
import { ROUTES, REDIRECTS } from './helpers/routes';

test.describe('Routes — base health', () => {
  for (const route of ROUTES) {
    test(`${route} — 200 + title + description + no console errors`, async ({ page, request }) => {
      const consoleErrors: string[] = [];
      const failedAssets: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') consoleErrors.push(msg.text());
      });
      page.on('response', (resp) => {
        const status = resp.status();
        if (status >= 400 && resp.url() !== page.url()) {
          failedAssets.push(`${status} ${resp.url()}`);
        }
      });

      const resp = await page.goto(route, { waitUntil: 'networkidle' });
      expect(resp?.status(), `Route ${route} did not return 200`).toBe(200);

      const title = await page.title();
      expect(title.trim().length, `Route ${route} has empty <title>`).toBeGreaterThan(0);

      const description = await page
        .locator('meta[name="description"]')
        .getAttribute('content');
      expect(description, `Route ${route} missing meta description`).toBeTruthy();
      expect(description!.trim().length).toBeGreaterThan(0);

      expect(consoleErrors, `Route ${route} produced console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
      expect(failedAssets, `Route ${route} loaded with failed sub-resources:\n${failedAssets.join('\n')}`).toEqual([]);
    });
  }
});

test.describe('Redirects', () => {
  for (const [source, destination, expectedStatus] of REDIRECTS) {
    test(`${source} -> ${destination} (${expectedStatus})`, async ({ request }) => {
      // Check the raw status without following redirects, then verify
      // the destination resolves once followed.
      const raw = await request.fetch(source, { maxRedirects: 0 });
      expect(raw.status(), `${source} should redirect with ${expectedStatus}`).toBe(expectedStatus);

      const location = raw.headers()['location'];
      expect(location).toBeTruthy();
      const dest = new URL(location!, raw.url()).pathname;
      expect(dest).toBe(destination);

      // And the followed redirect lands at a 200.
      const followed = await request.get(source);
      expect(followed.status()).toBe(200);
    });
  }
});
