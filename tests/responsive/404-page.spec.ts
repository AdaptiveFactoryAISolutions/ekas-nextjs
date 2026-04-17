/**
 * 404 Error Page Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests custom 404 page and error handling
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad, setupConsoleErrorCapture } from '../helpers/common';

test.describe('404 Error Page', () => {
  test('404 page displays for unknown routes', async ({ page }) => {
    const response = await page.goto('/this-route-does-not-exist');

    expect(response?.status()).toBe(404);
  });

  test('404 page is branded (not default Next.js error)', async ({ page }) => {
    await page.goto('/nonexistent-page-123');
    await waitForPageLoad(page);

    const h1 = page.locator('h1').first();
    const h1Text = await h1.textContent();

    // Should have custom 404 messaging
    expect(h1Text).toMatch(/404|not found|page.*not.*found/i);

    // Page should have EKAS branding
    const bodyText = await page.textContent('body') || '';
    const hasEKAS = bodyText.includes('EKAS') || bodyText.includes('ekas');

    expect(hasEKAS).toBe(true);
  });

  test('404 page has page title', async ({ page }) => {
    await page.goto('/does-not-exist');
    await waitForPageLoad(page);

    const title = await page.title();

    expect(title).toBeTruthy();
    expect(title).toMatch(/404|not found/i);
  });

  test('404 page has recovery link to homepage', async ({ page }) => {
    await page.goto('/invalid-route');
    await waitForPageLoad(page);

    // Look for link back to homepage
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();

    const linkText = await homeLink.textContent();
    expect(linkText).toMatch(/home|back|return/i);
  });

  test('404 page has navigation', async ({ page }) => {
    await page.goto('/another-missing-page');
    await waitForPageLoad(page);

    // Main nav should still be present
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();
  });

  test('404 page has footer', async ({ page }) => {
    await page.goto('/missing');
    await waitForPageLoad(page);

    // Footer should still be present
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('404 page has no console errors', async ({ page }) => {
    const consoleErrors = setupConsoleErrorCapture(page);

    await page.goto('/not-a-real-page');
    await waitForPageLoad(page);

    // The 404 page itself should not cause errors
    expect(consoleErrors.length).toBe(0);
  });

  test('404 page recovery link works', async ({ page }) => {
    await page.goto('/fake-page');
    await waitForPageLoad(page);

    const homeLink = page.locator('a[href="/"]').first();
    await homeLink.click();
    await waitForPageLoad(page);

    // Should navigate to homepage
    expect(page.url()).toMatch(/\/$|\/$/);

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('404 page is mobile responsive', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/mobile-404-test');
    await waitForPageLoad(page);

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);

    // Content is visible
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Multiple 404s work correctly', async ({ page }) => {
    const nonexistentPages = [
      '/nope',
      '/not-here',
      '/missing-123',
      '/invalid/path/here',
    ];

    for (const path of nonexistentPages) {
      const response = await page.goto(path);
      expect(response?.status()).toBe(404);

      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('404 page meta tags prevent indexing', async ({ page }) => {
    await page.goto('/should-not-exist');
    await waitForPageLoad(page);

    // Check for noindex meta tag
    const metaRobots = await page.locator('meta[name="robots"]').getAttribute('content');

    if (metaRobots) {
      expect(metaRobots).toMatch(/noindex/i);
    }
  });
});

test.describe('404 Error Page - Desktop', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('404 page renders well on desktop', async ({ page }) => {
    await page.goto('/desktop-404-test');
    await waitForPageLoad(page);

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();

    // Should have recovery link
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();
  });
});

test.describe('404 Error Page - Accessibility', () => {
  test('404 page is accessible', async ({ page }) => {
    await page.goto('/accessibility-404-test');
    await waitForPageLoad(page);

    // Should have proper heading structure
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);

    // Links should be accessible
    const homeLink = page.locator('a[href="/"]').first();
    const linkText = await homeLink.textContent();
    expect(linkText).toBeTruthy();
  });
});
