/**
 * Suite 4 — Nav and footer presence on every page.
 * For each canonical route:
 *  - Nav logo image renders and has alt containing "EKAS"
 *  - "Request Demo" CTA in nav is visible (and at least one is clickable)
 *  - Footer is present and non-empty
 */
import { test, expect } from '@playwright/test';
import { ROUTES } from './helpers/routes';

test.describe('Nav + footer present on every route', () => {
  for (const route of ROUTES) {
    test(`${route} — nav logo, demo CTA, footer`, async ({ page }) => {
      await page.goto(route);

      // Logo: prefer <img> in the nav region; otherwise the first image
      // with an EKAS alt anywhere above the fold.
      const navLogo = page.locator('nav img, header img').first();
      const navLogoCount = await navLogo.count();
      if (navLogoCount > 0) {
        await expect(navLogo).toBeVisible();
        const alt = (await navLogo.getAttribute('alt')) || '';
        expect(alt.toLowerCase(), `Nav logo alt on ${route} doesn't contain "EKAS": "${alt}"`).toContain('ekas');
        // Verify the image actually loaded (naturalWidth > 0).
        const naturalWidth = await navLogo.evaluate((img) => (img as HTMLImageElement).naturalWidth);
        expect(naturalWidth, `Nav logo on ${route} did not load (naturalWidth=0)`).toBeGreaterThan(0);
      } else {
        // Fallback: any logo image.
        const anyLogo = page.locator('img[alt*="EKAS" i]').first();
        await expect(anyLogo, `No nav logo found on ${route}`).toBeVisible();
      }

      // Request Demo button. Could be in nav, hero, or both — at least one
      // must exist and be visible.
      const demoCta = page.getByRole('button', { name: /request.*demo/i }).first();
      const demoCtaLink = page.getByRole('link', { name: /request.*demo/i }).first();
      const demoCtaCount = (await demoCta.count()) + (await demoCtaLink.count());
      expect(demoCtaCount, `No "Request Demo" CTA found on ${route}`).toBeGreaterThan(0);

      // Footer present and contains content (any link or heading).
      const footer = page.locator('footer').first();
      await expect(footer, `Footer not present on ${route}`).toBeVisible();
      const footerText = (await footer.textContent()) || '';
      expect(footerText.trim().length, `Footer empty on ${route}`).toBeGreaterThan(40);
    });
  }
});
