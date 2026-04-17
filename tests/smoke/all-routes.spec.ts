/**
 * Smoke Tests - All 26 Routes
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests every public route for:
 * - Successful load (200 status)
 * - Visible H1 or hero heading
 * - No console errors
 * - No network failures (404/500)
 * - No placeholder content
 */

import { test, expect } from '@playwright/test';
import {
  waitForPageLoad,
  setupConsoleErrorCapture,
  setupNetworkFailureCapture,
  checkForPlaceholderContent,
} from '../helpers/common';
import { assertH1 } from '../helpers/metadata';

/**
 * All 26 routes to test
 */
const ALL_ROUTES = [
  // Core pages
  { path: '/', name: 'Homepage' },
  { path: '/about', name: 'About' },
  { path: '/about/founder', name: 'Founder' },
  { path: '/demo', name: 'Demo' },
  { path: '/security', name: 'Security' },

  // Platform hub and details
  { path: '/platform', name: 'Platform Hub' },
  { path: '/platform/manufacturing-intelligence', name: 'Manufacturing Intelligence' },
  { path: '/platform/ai-assistant', name: 'AI Assistant' },
  { path: '/platform/data-connections', name: 'Data Connections' },
  { path: '/platform/reporting-analytics', name: 'Reporting Analytics' },

  // Solutions hub and details
  { path: '/solutions', name: 'Solutions Hub' },
  { path: '/solutions/downtime-reduction', name: 'Downtime Reduction' },
  { path: '/solutions/scrap-quality-visibility', name: 'Scrap Quality Visibility' },
  { path: '/solutions/capacity-throughput', name: 'Capacity Throughput' },
  { path: '/solutions/cost-driver-analysis', name: 'Cost Driver Analysis' },
  { path: '/solutions/multi-site-performance', name: 'Multi-Site Performance' },

  // Industries hub and details
  { path: '/industries', name: 'Industries Hub' },
  { path: '/industries/aerospace', name: 'Aerospace' },
  { path: '/industries/automotive', name: 'Automotive' },
  { path: '/industries/medical-devices', name: 'Medical Devices' },
  { path: '/industries/metal-stamping', name: 'Metal Stamping' },
  { path: '/industries/industrial-manufacturing', name: 'Industrial Manufacturing' },

  // Roles and Resources
  { path: '/roles', name: 'Roles Hub' },
  { path: '/resources', name: 'Resources Hub' },
  { path: '/resources/faqs', name: 'FAQs' },

  // Additional pages (if they exist)
  { path: '/contact', name: 'Contact', optional: true },
];

test.describe('Smoke Tests - All Routes', () => {
  test.describe.configure({ mode: 'parallel' });

  for (const route of ALL_ROUTES) {
    test(`${route.name} (${route.path}) loads successfully`, async ({ page }) => {
      // Set up console error and network failure tracking
      const consoleErrors = setupConsoleErrorCapture(page);
      const networkFailures = setupNetworkFailureCapture(page);

      // Navigate to route
      const response = await page.goto(route.path);

      // If optional and 404, skip test
      if (route.optional && response?.status() === 404) {
        test.skip();
        return;
      }

      // Assert 200 status
      expect(response?.status()).toBe(200);

      // Wait for page to fully load
      await waitForPageLoad(page);

      // Assert H1 or hero heading exists
      await assertH1(page);

      // Check for placeholder content
      const placeholderCheck = await checkForPlaceholderContent(page);
      expect(placeholderCheck.found).toBe(false);
      if (placeholderCheck.found) {
        console.error(`Placeholder content found on ${route.path}:`, placeholderCheck.matches);
      }

      // Assert no console errors
      expect(consoleErrors.length).toBe(0);
      if (consoleErrors.length > 0) {
        console.error(`Console errors on ${route.path}:`, consoleErrors);
      }

      // Assert no network failures (filter out common false positives)
      const realFailures = networkFailures.filter(f => {
        // Filter out external resources that might fail
        return !f.url.includes('google') &&
               !f.url.includes('facebook') &&
               !f.url.includes('analytics') &&
               !f.url.includes('cdn') &&
               f.url.includes(page.url().split('/').slice(0, 3).join('/'));
      });

      expect(realFailures.length).toBe(0);
      if (realFailures.length > 0) {
        console.error(`Network failures on ${route.path}:`, realFailures);
      }
    });
  }

  test('All routes are accessible', async ({ page }) => {
    const results: { path: string; status: number; passed: boolean }[] = [];

    for (const route of ALL_ROUTES) {
      if (route.optional) continue;

      const response = await page.goto(route.path);
      const status = response?.status() || 0;
      const passed = status === 200;

      results.push({ path: route.path, status, passed });
    }

    // All non-optional routes should return 200
    const failures = results.filter(r => !r.passed);
    expect(failures.length).toBe(0);

    if (failures.length > 0) {
      console.error('Failed routes:', failures);
    }
  });
});

test.describe('404 Error Page', () => {
  test('404 page renders correctly for unknown routes', async ({ page }) => {
    const consoleErrors = setupConsoleErrorCapture(page);

    // Navigate to non-existent page
    const response = await page.goto('/this-page-does-not-exist');

    // Should return 404 status
    expect(response?.status()).toBe(404);

    await waitForPageLoad(page);

    // Should have branded 404 content (either "404" or "not found" in h1)
    const h1 = page.locator('h1').first();
    const h1Text = await h1.textContent();

    const is404Page = h1Text?.match(/404|not found|page.*not.*found/i);
    expect(is404Page).toBeTruthy();

    // Page title should indicate error
    const title = await page.title();
    expect(title.match(/404|not found/i)).toBeTruthy();

    // Should have a way to get back home
    const homeLink = page.locator('a[href="/"]').first();
    await expect(homeLink).toBeVisible();

    // No console errors on 404 page itself
    expect(consoleErrors.length).toBe(0);
  });

  test('404 page has navigation and footer', async ({ page }) => {
    await page.goto('/does-not-exist-either');

    // Main nav should still be present
    const nav = page.locator('nav').first();
    await expect(nav).toBeVisible();

    // Footer should still be present
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });
});
