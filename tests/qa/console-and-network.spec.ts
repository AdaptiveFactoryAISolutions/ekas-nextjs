/**
 * Suite 11 — Console and network catch-all.
 * For each canonical route:
 *  - Page load triggers zero console errors
 *  - All network requests during page load return < 400
 *  - No mixed-content warnings on HTTPS pages
 */
import { test, expect } from '@playwright/test';
import { ROUTES } from './helpers/routes';

test.describe('Console + network — every route', () => {
  for (const route of ROUTES) {
    test(`${route} — clean console + all network < 400`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const networkErrors: string[] = [];
      const mixedContentWarnings: string[] = [];

      page.on('console', (msg) => {
        const text = msg.text();
        if (msg.type() === 'error') consoleErrors.push(text);
        if (/mixed content/i.test(text)) mixedContentWarnings.push(text);
      });

      page.on('response', (resp) => {
        const status = resp.status();
        if (status >= 400 && resp.url() !== page.url()) {
          networkErrors.push(`${status} ${resp.url()}`);
        }
      });

      await page.goto(route, { waitUntil: 'networkidle' });

      expect(consoleErrors, `${route} console errors:\n${consoleErrors.join('\n')}`).toEqual([]);
      expect(networkErrors, `${route} sub-resource failures:\n${networkErrors.join('\n')}`).toEqual([]);
      expect(mixedContentWarnings, `${route} mixed-content warnings:\n${mixedContentWarnings.join('\n')}`).toEqual([]);
    });
  }
});
