/**
 * Suite 5 — Demo modal regression (PR #3 lock-in).
 * On every representative page, the nav "Request Demo" button must:
 *   1. Open a modal containing form fields.
 *   2. Have a close affordance (Escape or X).
 *   3. Re-open after closing.
 */
import { test, expect } from '@playwright/test';
import { REPRESENTATIVE_ROUTES } from './helpers/routes';

test.describe('Demo modal opens and closes on representative pages', () => {
  for (const route of REPRESENTATIVE_ROUTES) {
    test(`${route} — modal open/close/re-open`, async ({ page }) => {
      await page.goto(route);

      const trigger = page.getByRole('button', { name: /request.*demo/i }).first();
      await expect(trigger).toBeVisible();

      // First open.
      await trigger.click();
      const modal = page.getByRole('dialog');
      await expect(modal, `Modal did not open on ${route}`).toBeVisible({ timeout: 5_000 });

      // Modal should contain form fields (at least one input).
      const inputCount = await modal.locator('input, select, textarea').count();
      expect(inputCount, `Modal has no form fields on ${route}`).toBeGreaterThan(0);

      // Close via Escape.
      await page.keyboard.press('Escape');
      await expect(modal, `Modal did not close on Escape on ${route}`).not.toBeVisible({ timeout: 5_000 });

      // Re-open.
      await trigger.click();
      await expect(modal, `Modal did not re-open on ${route}`).toBeVisible({ timeout: 5_000 });

      // Close again to clean up.
      await page.keyboard.press('Escape');
    });
  }
});
