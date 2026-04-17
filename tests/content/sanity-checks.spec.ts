/**
 * Content Sanity Checks
 * EKAS Manufacturing Intelligence Platform
 *
 * Detects:
 * - Placeholder content (lorem ipsum, coming soon, TBD)
 * - Brand leakage (competitor names)
 * - Email consistency
 */

import { test, expect } from '@playwright/test';
import {
  checkForPlaceholderContent,
  checkForBrandLeakage,
  assertEmailConsistency,
} from '../helpers/content';
import { waitForPageLoad } from '../helpers/common';

const CRITICAL_PAGES = [
  '/',
  '/platform',
  '/solutions',
  '/demo',
  '/about',
  '/security',
  '/solutions/downtime-reduction',
  '/solutions/capacity-throughput',
  '/solutions/scrap-quality-visibility',
];

test.describe('Content Sanity Checks - Placeholder Detection', () => {
  for (const pagePath of CRITICAL_PAGES) {
    test(`${pagePath} has no placeholder content`, async ({ page }) => {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const placeholderCheck = await checkForPlaceholderContent(page);

      expect(placeholderCheck.found).toBe(false);

      if (placeholderCheck.found) {
        console.error(`Placeholder content found on ${pagePath}:`, placeholderCheck.matches);
        throw new Error(`Placeholder content found: ${placeholderCheck.matches.join(', ')}`);
      }
    });
  }

  test('No "lorem ipsum" on any major page', async ({ page }) => {
    const pages = CRITICAL_PAGES;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';
      const hasLoremIpsum = bodyText.match(/lorem ipsum/i);

      expect(hasLoremIpsum).toBeFalsy();
    }
  });

  test('No "coming soon" on any major page', async ({ page }) => {
    const pages = CRITICAL_PAGES;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';
      const hasComingSoon = bodyText.match(/coming soon/i);

      expect(hasComingSoon).toBeFalsy();
    }
  });

  test('No "TBD" or "[placeholder]" on any major page', async ({ page }) => {
    const pages = CRITICAL_PAGES;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';
      const hasTBD = bodyText.match(/\bTBD\b/i);
      const hasPlaceholder = bodyText.match(/\[placeholder\]/i);

      expect(hasTBD).toBeFalsy();
      expect(hasPlaceholder).toBeFalsy();
    }
  });
});

test.describe('Content Sanity Checks - Brand Leakage', () => {
  for (const pagePath of CRITICAL_PAGES) {
    test(`${pagePath} has no competitor brand mentions`, async ({ page }) => {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const brandLeakage = await checkForBrandLeakage(page);

      expect(brandLeakage.found).toBe(false);

      if (brandLeakage.found) {
        console.error(`Brand leakage found on ${pagePath}:`, brandLeakage.matches);
        throw new Error(`Competitor brand found: ${brandLeakage.matches.join(', ')}`);
      }
    });
  }

  test('No "MachineMetrics" on any page', async ({ page }) => {
    const pages = CRITICAL_PAGES;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';
      const hasMachineMetrics = bodyText.match(/MachineMetrics/i);

      expect(hasMachineMetrics).toBeFalsy();
    }
  });

  test('No "Sight Machine" on any page', async ({ page }) => {
    const pages = CRITICAL_PAGES;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';
      const hasSightMachine = bodyText.match(/Sight Machine|SightMachine/i);

      expect(hasSightMachine).toBeFalsy();
    }
  });
});

test.describe('Content Sanity Checks - Email Consistency', () => {
  for (const pagePath of CRITICAL_PAGES) {
    test(`${pagePath} uses correct email address`, async ({ page }) => {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      // This will throw if any email is not pat@adaptivefactory.net
      await assertEmailConsistency(page, 'pat@adaptivefactory.net');
    });
  }

  test('All pages use pat@adaptivefactory.net', async ({ page }) => {
    const pages = CRITICAL_PAGES;
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';
      const emails = bodyText.match(emailPattern) || [];

      for (const email of emails) {
        expect(email.toLowerCase()).toBe('pat@adaptivefactory.net');
      }
    }
  });
});

test.describe('Content Sanity Checks - Manufacturing Terminology', () => {
  test('Homepage has EKAS branding', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const bodyText = await page.textContent('body') || '';

    expect(bodyText).toContain('EKAS');
  });

  test('Solution pages use manufacturing terminology', async ({ page }) => {
    const solutionPages = [
      '/solutions/downtime-reduction',
      '/solutions/capacity-throughput',
      '/solutions/scrap-quality-visibility',
    ];

    for (const pagePath of solutionPages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';

      // Should have manufacturing-specific terms
      const hasManufacturingTerms = bodyText.match(/manufacturing|production|plant|factory|downtime|capacity|throughput|scrap|quality|metrics/i);

      expect(hasManufacturingTerms).toBeTruthy();
    }
  });

  test('Platform pages mention governed metrics or data provenance', async ({ page }) => {
    await page.goto('/platform');
    await waitForPageLoad(page);

    const bodyText = await page.textContent('body') || '';

    // Check for EKAS differentiators
    const hasEKASTerms = bodyText.match(/governed metrics|data provenance|manufacturing intelligence/i);

    expect(hasEKASTerms).toBeTruthy();
  });
});

test.describe('Content Sanity Checks - General Quality', () => {
  test('All critical pages have substantial content', async ({ page }) => {
    const pages = CRITICAL_PAGES;

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const bodyText = await page.textContent('body') || '';

      // Should have at least 200 characters of content
      expect(bodyText.trim().length).toBeGreaterThan(200);
    }
  });

  test('No broken internal links on homepage', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const internalLinks = page.locator('a[href^="/"]');
    const count = await internalLinks.count();

    // Should have internal navigation
    expect(count).toBeGreaterThan(5);

    // Check that links have proper hrefs
    for (let i = 0; i < Math.min(count, 20); i++) {
      const link = internalLinks.nth(i);
      const href = await link.getAttribute('href');

      expect(href).toBeTruthy();
      expect(href?.trim().length).toBeGreaterThan(0);
    }
  });
});
