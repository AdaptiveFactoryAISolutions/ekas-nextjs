/**
 * Accessibility Tests with axe-core
 * EKAS Manufacturing Intelligence Platform
 *
 * WCAG 2.1 AA compliance testing
 */

import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import { waitForPageLoad } from '../helpers/common';

/**
 * Pages to scan for accessibility
 */
const PAGES_TO_SCAN = [
  { path: '/', name: 'Homepage' },
  { path: '/platform', name: 'Platform Hub' },
  { path: '/solutions', name: 'Solutions Hub' },
  { path: '/industries', name: 'Industries Hub' },
  { path: '/roles', name: 'Roles Hub' },
  { path: '/demo', name: 'Demo Page' },
  { path: '/about', name: 'About' },
  { path: '/security', name: 'Security' },
  { path: '/solutions/downtime-reduction', name: 'Downtime Solution' },
  { path: '/solutions/capacity-throughput', name: 'Capacity Solution' },
  { path: '/solutions/scrap-quality-visibility', name: 'Scrap Solution' },
  { path: '/solutions/cost-driver-analysis', name: 'Cost Solution' },
  { path: '/solutions/multi-site-performance', name: 'Multi-Site Solution' },
];

test.describe('Accessibility - axe-core Scans', () => {
  for (const pageInfo of PAGES_TO_SCAN) {
    test(`${pageInfo.name} has no critical accessibility violations`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await waitForPageLoad(page);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();

      // Filter to critical and serious violations
      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical'
      );

      const seriousViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'serious'
      );

      // Log violations for debugging
      if (criticalViolations.length > 0) {
        console.error(`Critical violations on ${pageInfo.path}:`, criticalViolations);
      }

      if (seriousViolations.length > 0) {
        console.warn(`Serious violations on ${pageInfo.path}:`, seriousViolations);
      }

      // Fail on critical violations
      expect(criticalViolations).toHaveLength(0);

      // Fail on serious violations
      expect(seriousViolations).toHaveLength(0);
    });
  }

  test('Homepage accessibility detailed scan', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const accessibilityScanResults = await new AxeBuilder({ page }).analyze();

    // Check specific rules
    const colorContrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    const missingAltTextViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'image-alt'
    );

    const missingLabelsViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'label' || v.id === 'aria-label'
    );

    // These are critical for manufacturing B2B site
    expect(colorContrastViolations).toHaveLength(0);
    expect(missingAltTextViolations).toHaveLength(0);
    expect(missingLabelsViolations).toHaveLength(0);
  });

  test('Demo form is accessible', async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Forms must have proper labels
    const formViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'label' || v.id === 'aria-required-attr'
    );

    expect(formViolations).toHaveLength(0);
  });

  test('Navigation is keyboard accessible', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    // Navigation must be keyboard accessible
    const keyboardViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'keyboard' || v.id === 'focus-order'
    );

    expect(keyboardViolations).toHaveLength(0);
  });

  test('404 page is accessible', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await waitForPageLoad(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical'
    );

    expect(criticalViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Specific Checks', () => {
  test('All images have alt text', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const images = await page.locator('img').all();

    for (const img of images) {
      const alt = await img.getAttribute('alt');

      // Alt can be empty string for decorative images, but must exist
      expect(alt !== null).toBe(true);
    }
  });

  test('Form inputs have labels or aria-labels', async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);

    const inputs = await page.locator('input, textarea, select').all();

    for (const input of inputs) {
      const id = await input.getAttribute('id');
      const ariaLabel = await input.getAttribute('aria-label');
      const ariaLabelledBy = await input.getAttribute('aria-labelledby');

      // Input should have label via id, aria-label, or aria-labelledby
      if (id) {
        const label = page.locator(`label[for="${id}"]`);
        const hasLabel = await label.count() > 0;

        expect(hasLabel || ariaLabel !== null || ariaLabelledBy !== null).toBe(true);
      } else {
        expect(ariaLabel !== null || ariaLabelledBy !== null).toBe(true);
      }
    }
  });

  test('Buttons have accessible names', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const buttons = await page.locator('button').all();

    for (const button of buttons) {
      const text = await button.textContent();
      const ariaLabel = await button.getAttribute('aria-label');

      // Button should have text or aria-label
      expect((text && text.trim().length > 0) || ariaLabel !== null).toBe(true);
    }
  });

  test('Links have accessible names', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const links = await page.locator('a').all();

    for (const link of links) {
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const title = await link.getAttribute('title');

      // Link should have text, aria-label, or title
      expect((text && text.trim().length > 0) || ariaLabel !== null || title !== null).toBe(true);
    }
  });

  test('Page has main landmark', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const main = page.locator('main, [role="main"]').first();
    const hasMain = await main.count() > 0;

    expect(hasMain).toBe(true);
  });

  test('Page has navigation landmark', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const nav = page.locator('nav, [role="navigation"]').first();
    const hasNav = await nav.count() > 0;

    expect(hasNav).toBe(true);
  });

  test('Color contrast is sufficient', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .analyze();

    const contrastViolations = accessibilityScanResults.violations.filter(
      (v) => v.id === 'color-contrast'
    );

    // Log violations for review
    if (contrastViolations.length > 0) {
      console.warn('Color contrast violations:', contrastViolations);
    }

    expect(contrastViolations).toHaveLength(0);
  });
});

test.describe('Accessibility - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Mobile homepage is accessible', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .analyze();

    const criticalViolations = accessibilityScanResults.violations.filter(
      (v) => v.impact === 'critical'
    );

    expect(criticalViolations).toHaveLength(0);
  });

  test('Mobile navigation is accessible', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Open mobile menu if it exists
    const menuButton = page.locator('button[aria-label*="menu" i]').first();

    if (await menuButton.isVisible()) {
      await menuButton.click();
      await page.waitForTimeout(500);

      const accessibilityScanResults = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa'])
        .analyze();

      const criticalViolations = accessibilityScanResults.violations.filter(
        (v) => v.impact === 'critical'
      );

      expect(criticalViolations).toHaveLength(0);
    }
  });
});
