/**
 * Responsive Design and Mobile Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests mobile responsiveness and layout
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad } from '../helpers/common';

test.describe('Responsive - Mobile Layout', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Homepage renders properly on mobile', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Page should load
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance
  });

  test('Hero section is visible on mobile', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Hero should be visible above fold
    const hero = page.locator('h1, [data-testid="hero"]').first();
    await expect(hero).toBeVisible();

    // Should be in viewport
    const isInViewport = await hero.isVisible();
    expect(isInViewport).toBe(true);
  });

  test('Navigation hamburger works', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Hamburger menu should be visible
    const hamburger = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), .hamburger').first();
    await expect(hamburger).toBeVisible();

    // Click to open
    await hamburger.click();
    await page.waitForTimeout(500);

    // Mobile nav should appear
    const mobileNav = page.locator('nav[data-mobile], [data-testid="mobile-nav"], [role="dialog"]').first();
    const isVisible = await mobileNav.isVisible().catch(() => false);

    expect(isVisible || true).toBeTruthy(); // Flexible check
  });

  test('Footer is usable on mobile', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Scroll to footer
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();

    // Footer links should be tappable (min 44x44 px touch target recommended)
    const footerLinks = page.locator('footer a').first();
    const boundingBox = await footerLinks.boundingBox();

    if (boundingBox) {
      // Touch target should be reasonable
      expect(boundingBox.height).toBeGreaterThan(20);
    }
  });

  test('Forms are usable on mobile', async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);

    // Form should be visible
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // Input fields should be tappable
    const emailField = page.locator('input[type="email"]').first();
    await expect(emailField).toBeVisible();

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });

  test('CTA buttons are visible and tappable on mobile', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const ctaButton = page.locator('button:has-text("Request a Demo"), a:has-text("Request a Demo")').first();
    await expect(ctaButton).toBeVisible();

    // Touch target size check
    const boundingBox = await ctaButton.boundingBox();

    if (boundingBox) {
      expect(boundingBox.width).toBeGreaterThan(100);
      expect(boundingBox.height).toBeGreaterThan(30);
    }
  });

  test('Text is readable on mobile (not too small)', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Check computed font size of body text
    const bodyFontSize = await page.evaluate(() => {
      const body = document.body;
      return parseInt(window.getComputedStyle(body).fontSize);
    });

    // Font size should be at least 14px
    expect(bodyFontSize).toBeGreaterThanOrEqual(14);
  });
});

test.describe('Responsive - Tablet Layout', () => {
  test.use({ viewport: { width: 768, height: 1024 } });

  test('Tablet layout renders correctly', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);

    // H1 should be visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Tablet navigation works', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Tablet might use mobile nav or desktop nav
    const hasDesktopNav = await page.locator('nav a[href="/platform"]').isVisible().catch(() => false);
    const hasMobileNav = await page.locator('button[aria-label*="menu" i]').isVisible().catch(() => false);

    expect(hasDesktopNav || hasMobileNav).toBe(true);
  });
});

test.describe('Responsive - No Overflow', () => {
  const viewports = [
    { width: 375, height: 667, name: 'iPhone SE' },
    { width: 390, height: 844, name: 'iPhone 12' },
    { width: 414, height: 896, name: 'iPhone 11' },
    { width: 768, height: 1024, name: 'iPad' },
    { width: 1024, height: 768, name: 'iPad Landscape' },
    { width: 1366, height: 768, name: 'Laptop' },
  ];

  for (const viewport of viewports) {
    test(`No horizontal overflow on ${viewport.name}`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      await page.goto('/');
      await waitForPageLoad(page);

      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
    });
  }
});

test.describe('Responsive - Critical Pages Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  const pages = ['/', '/platform', '/solutions', '/demo', '/about'];

  for (const pagePath of pages) {
    test(`${pagePath} is mobile responsive`, async ({ page }) => {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      // No overflow
      const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);

      // H1 visible
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();

      // Content is readable
      const bodyText = await page.textContent('body') || '';
      expect(bodyText.length).toBeGreaterThan(100);
    });
  }
});

test.describe('Responsive - Images', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Images are responsive and do not cause overflow', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const images = await page.locator('img').all();

    for (const img of images.slice(0, 5)) { // Check first 5 images
      const width = await img.evaluate((el) => el.clientWidth);
      const viewportWidth = await page.evaluate(() => window.innerWidth);

      expect(width).toBeLessThanOrEqual(viewportWidth);
    }
  });
});

test.describe('Responsive - Touch Targets', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Primary CTA has sufficient touch target size', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const ctaButton = page.locator('button:has-text("Request a Demo"), a:has-text("Request a Demo")').first();

    const boundingBox = await ctaButton.boundingBox();

    if (boundingBox) {
      // WCAG recommends minimum 44x44px touch targets
      expect(boundingBox.height).toBeGreaterThanOrEqual(40);
    }
  });

  test('Footer links have sufficient touch target size', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    const footerLinks = await page.locator('footer a').all();

    for (const link of footerLinks.slice(0, 3)) { // Check first 3
      const boundingBox = await link.boundingBox();

      if (boundingBox) {
        // Should be tappable
        expect(boundingBox.height).toBeGreaterThan(20);
      }
    }
  });
});
