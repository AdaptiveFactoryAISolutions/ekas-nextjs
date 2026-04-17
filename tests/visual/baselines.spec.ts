/**
 * Visual Regression Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Creates baseline screenshots and detects visual regressions
 */

import { test, expect } from '@playwright/test';
import { stabilizeForScreenshot, waitForPageLoad } from '../helpers/common';

/**
 * Pages to capture for visual regression testing
 */
const DESKTOP_PAGES = [
  { path: '/', name: 'homepage' },
  { path: '/platform', name: 'platform-hub' },
  { path: '/solutions', name: 'solutions-hub' },
  { path: '/industries', name: 'industries-hub' },
  { path: '/roles', name: 'roles-hub' },
  { path: '/demo', name: 'demo-page' },
  { path: '/about', name: 'about' },
  { path: '/security', name: 'security' },
  { path: '/solutions/downtime-reduction', name: 'solution-downtime' },
  { path: '/solutions/capacity-throughput', name: 'solution-capacity' },
  { path: '/solutions/scrap-quality-visibility', name: 'solution-scrap' },
  { path: '/solutions/cost-driver-analysis', name: 'solution-cost' },
  { path: '/solutions/multi-site-performance', name: 'solution-multisite' },
  { path: '/about/founder', name: 'founder' },
];

const MOBILE_PAGES = [
  { path: '/', name: 'homepage-mobile' },
  { path: '/platform', name: 'platform-hub-mobile' },
  { path: '/solutions', name: 'solutions-hub-mobile' },
  { path: '/demo', name: 'demo-page-mobile' },
];

test.describe('Visual Regression - Desktop', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  for (const pageInfo of DESKTOP_PAGES) {
    test(`${pageInfo.name} visual baseline`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await stabilizeForScreenshot(page);

      // Take full page screenshot
      await expect(page).toHaveScreenshot(`${pageInfo.name}.png`, {
        fullPage: true,
        maxDiffPixels: 100,
        timeout: 30000,
      });
    });
  }

  test('404 page visual baseline', async ({ page }) => {
    await page.goto('/this-page-does-not-exist');
    await stabilizeForScreenshot(page);

    await expect(page).toHaveScreenshot('404-page.png', {
      fullPage: true,
      maxDiffPixels: 100,
    });
  });
});

test.describe('Visual Regression - Mobile', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  for (const pageInfo of MOBILE_PAGES) {
    test(`${pageInfo.name} visual baseline`, async ({ page }) => {
      await page.goto(pageInfo.path);
      await stabilizeForScreenshot(page);

      // Take full page screenshot
      await expect(page).toHaveScreenshot(`${pageInfo.name}.png`, {
        fullPage: true,
        maxDiffPixels: 50, // Lower threshold for mobile
        timeout: 30000,
      });
    });
  }
});

test.describe('Visual Regression - Component Snapshots', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('Header component snapshot', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const header = page.locator('header, nav').first();
    await expect(header).toHaveScreenshot('header-component.png', {
      maxDiffPixels: 50,
    });
  });

  test('Footer component snapshot', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const footer = page.locator('footer').first();
    await expect(footer).toHaveScreenshot('footer-component.png', {
      maxDiffPixels: 50,
    });
  });

  test('Hero section snapshot', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Capture hero/above-fold section
    await expect(page).toHaveScreenshot('hero-section.png', {
      clip: { x: 0, y: 0, width: 1920, height: 800 },
      maxDiffPixels: 100,
    });
  });
});

test.describe('Visual Regression - Responsive Breakpoints', () => {
  const breakpoints = [
    { width: 1920, height: 1080, name: 'desktop-xl' },
    { width: 1366, height: 768, name: 'desktop-standard' },
    { width: 768, height: 1024, name: 'tablet' },
    { width: 375, height: 667, name: 'mobile' },
  ];

  for (const breakpoint of breakpoints) {
    test(`Homepage at ${breakpoint.name} (${breakpoint.width}x${breakpoint.height})`, async ({ page }) => {
      await page.setViewportSize({ width: breakpoint.width, height: breakpoint.height });

      await page.goto('/');
      await stabilizeForScreenshot(page);

      await expect(page).toHaveScreenshot(`homepage-${breakpoint.name}.png`, {
        fullPage: true,
        maxDiffPixels: breakpoint.width < 768 ? 50 : 100,
      });
    });
  }
});

test.describe('Visual Regression - Dark Mode (if implemented)', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('Homepage dark mode snapshot', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    // Try to detect and enable dark mode
    const darkModeToggle = page.locator('button[aria-label*="dark mode" i], button[aria-label*="theme" i]').first();

    if (await darkModeToggle.isVisible()) {
      await darkModeToggle.click();
      await page.waitForTimeout(500);

      await stabilizeForScreenshot(page);

      await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
        fullPage: true,
        maxDiffPixels: 100,
      });
    } else {
      // Check if dark mode is default
      const isDark = await page.evaluate(() => {
        return document.documentElement.classList.contains('dark') ||
               document.body.classList.contains('dark') ||
               window.matchMedia('(prefers-color-scheme: dark)').matches;
      });

      if (isDark) {
        await stabilizeForScreenshot(page);

        await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
          fullPage: true,
          maxDiffPixels: 100,
        });
      } else {
        test.skip();
      }
    }
  });
});

test.describe('Visual Regression - Hover States', () => {
  test.use({ viewport: { width: 1920, height: 1080 } });

  test('CTA button hover state', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const ctaButton = page.locator('button:has-text("Request a Demo"), a:has-text("Request a Demo")').first();

    if (await ctaButton.isVisible()) {
      await ctaButton.hover();
      await page.waitForTimeout(300);

      await expect(ctaButton).toHaveScreenshot('cta-button-hover.png', {
        maxDiffPixels: 20,
      });
    }
  });

  test('Nav link hover state', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const navLink = page.locator('nav a[href="/platform"]').first();

    if (await navLink.isVisible()) {
      await navLink.hover();
      await page.waitForTimeout(300);

      await expect(navLink).toHaveScreenshot('nav-link-hover.png', {
        maxDiffPixels: 20,
      });
    }
  });
});
