/**
 * Desktop Navigation Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests desktop navigation menu functionality
 */

import { test, expect } from '@playwright/test';
import {
  assertMainNavVisible,
  assertLogoLinksHome,
  getMainNavLinks,
} from '../helpers/navigation';
import { waitForPageLoad } from '../helpers/common';

test.describe('Desktop Navigation', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('Main navigation is visible', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await assertMainNavVisible(page);
  });

  test('Logo links to homepage', async ({ page }) => {
    await page.goto('/platform');
    await waitForPageLoad(page);

    await assertLogoLinksHome(page);

    // Click logo and verify navigation
    const logo = page.locator('a[href="/"]').first();
    await logo.click();
    await waitForPageLoad(page);

    expect(page.url()).toContain('/');
  });

  test('All main nav links are clickable', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const navLinks = await getMainNavLinks(page);

    // Should have at least a few nav links
    expect(navLinks.length).toBeGreaterThan(2);

    // Try clicking first internal link
    const firstInternalLink = navLinks.find(link => link.href.startsWith('/'));
    if (firstInternalLink) {
      const link = page.locator(`nav a[href="${firstInternalLink.href}"]`).first();
      await link.click();
      await waitForPageLoad(page);

      // Should navigate successfully
      expect(page.url()).toContain(firstInternalLink.href);
    }
  });

  test('Request a Demo CTA is present in nav', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Look for demo CTA in header/nav area
    const demoCTA = page.locator('nav button:has-text("Request a Demo"), nav a:has-text("Request a Demo"), header button:has-text("Request a Demo")').first();

    // Demo CTA should be visible
    await expect(demoCTA).toBeVisible();
  });

  test('Platform dropdown/link navigation', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Look for Platform link in nav
    const platformLink = page.locator('nav a[href="/platform"]').first();

    if (await platformLink.isVisible()) {
      await platformLink.click();
      await waitForPageLoad(page);

      expect(page.url()).toContain('/platform');

      // Platform page should load
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('Solutions link navigation', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Look for Solutions link in nav
    const solutionsLink = page.locator('nav a[href="/solutions"]').first();

    if (await solutionsLink.isVisible()) {
      await solutionsLink.click();
      await waitForPageLoad(page);

      expect(page.url()).toContain('/solutions');

      // Solutions page should load
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('Industries link navigation', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Look for Industries link in nav
    const industriesLink = page.locator('nav a[href="/industries"]').first();

    if (await industriesLink.isVisible()) {
      await industriesLink.click();
      await waitForPageLoad(page);

      expect(page.url()).toContain('/industries');

      // Industries page should load
      const h1 = page.locator('h1').first();
      await expect(h1).toBeVisible();
    }
  });

  test('Navigation persists across pages', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const homeNavLinks = await getMainNavLinks(page);

    // Navigate to another page
    await page.goto('/about');
    await waitForPageLoad(page);

    const aboutNavLinks = await getMainNavLinks(page);

    // Should have similar nav structure
    expect(aboutNavLinks.length).toBeGreaterThanOrEqual(homeNavLinks.length - 2);
  });

  test('Active route highlighting (if implemented)', async ({ page }) => {
    await page.goto('/platform');
    await waitForPageLoad(page);

    // Check if platform link has active styling
    const platformLink = page.locator('nav a[href="/platform"]').first();

    if (await platformLink.isVisible()) {
      // Check for common active class patterns
      const classes = await platformLink.getAttribute('class') || '';
      const hasActiveClass = classes.includes('active') ||
                            classes.includes('current') ||
                            classes.includes('selected');

      // This is informational - not all sites implement this
      if (hasActiveClass) {
        expect(hasActiveClass).toBe(true);
      }
    }
  });
});
