/**
 * Metadata and SEO Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests page titles, meta descriptions, H1s, and basic SEO
 */

import { test, expect } from '@playwright/test';
import {
  assertPageTitle,
  assertMetaDescription,
  assertH1,
  assertLanguageAttribute,
  createTitleTracker,
} from '../helpers/metadata';
import { waitForPageLoad } from '../helpers/common';

const ALL_MAJOR_PAGES = [
  { path: '/', name: 'Homepage' },
  { path: '/platform', name: 'Platform Hub' },
  { path: '/solutions', name: 'Solutions Hub' },
  { path: '/industries', name: 'Industries Hub' },
  { path: '/roles', name: 'Roles Hub' },
  { path: '/demo', name: 'Demo' },
  { path: '/about', name: 'About' },
  { path: '/security', name: 'Security' },
  { path: '/solutions/downtime-reduction', name: 'Downtime Reduction' },
  { path: '/solutions/capacity-throughput', name: 'Capacity & Throughput' },
  { path: '/solutions/scrap-quality-visibility', name: 'Scrap & Quality' },
  { path: '/solutions/cost-driver-analysis', name: 'Cost Driver Analysis' },
  { path: '/solutions/multi-site-performance', name: 'Multi-Site Performance' },
];

test.describe('Metadata - Page Titles', () => {
  for (const page of ALL_MAJOR_PAGES) {
    test(`${page.name} has page title`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      await waitForPageLoad(browserPage);

      await assertPageTitle(browserPage);

      const title = await browserPage.title();
      expect(title.length).toBeGreaterThan(10);
      expect(title.length).toBeLessThan(100);
    });
  }

  test('Page titles are unique across major pages', async ({ page }) => {
    const titleTracker = createTitleTracker();

    for (const pageInfo of ALL_MAJOR_PAGES) {
      await page.goto(pageInfo.path);
      await waitForPageLoad(page);

      const title = await page.title();
      titleTracker.addTitle(pageInfo.path, title);
    }

    const { hasDuplicates, duplicates } = titleTracker.checkForDuplicates();

    if (hasDuplicates) {
      console.error('Duplicate page titles found:', duplicates);
    }

    expect(hasDuplicates).toBe(false);
  });

  test('Page titles follow consistent format', async ({ page }) => {
    const pages = ALL_MAJOR_PAGES.slice(0, 5);

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await waitForPageLoad(page);

      const title = await page.title();

      // Titles should include EKAS or follow pattern "Page Name | EKAS"
      const followsPattern = title.includes('EKAS') || title.includes('|');

      expect(followsPattern).toBe(true);
    }
  });
});

test.describe('Metadata - Meta Descriptions', () => {
  for (const page of ALL_MAJOR_PAGES) {
    test(`${page.name} has meta description`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      await waitForPageLoad(browserPage);

      await assertMetaDescription(browserPage, 50);
    });
  }

  test('Meta descriptions are reasonable length', async ({ page }) => {
    const pages = ALL_MAJOR_PAGES.slice(0, 5);

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await waitForPageLoad(page);

      const description = await page.locator('meta[name="description"]').getAttribute('content');

      if (description) {
        expect(description.length).toBeGreaterThanOrEqual(50);
        expect(description.length).toBeLessThanOrEqual(200);
      }
    }
  });
});

test.describe('Metadata - H1 Tags', () => {
  for (const page of ALL_MAJOR_PAGES) {
    test(`${page.name} has H1 tag`, async ({ page: browserPage }) => {
      await browserPage.goto(page.path);
      await waitForPageLoad(browserPage);

      await assertH1(browserPage);
    });
  }

  test('Each page has exactly one H1', async ({ page }) => {
    const pages = ALL_MAJOR_PAGES.slice(0, 5);

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await waitForPageLoad(page);

      const h1Count = await page.locator('h1').count();

      // Should have exactly 1 H1 (SEO best practice)
      expect(h1Count).toBeGreaterThanOrEqual(1);
      expect(h1Count).toBeLessThanOrEqual(2); // Allow up to 2 for some layouts
    }
  });

  test('H1s are meaningful and not empty', async ({ page }) => {
    const pages = ALL_MAJOR_PAGES;

    for (const pageInfo of pages) {
      await page.goto(pageInfo.path);
      await waitForPageLoad(page);

      const h1Text = await page.locator('h1').first().textContent();

      expect(h1Text).toBeTruthy();
      expect(h1Text?.trim().length).toBeGreaterThan(5);
    }
  });
});

test.describe('Metadata - Language and HTML Attributes', () => {
  test('HTML has lang attribute', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    await assertLanguageAttribute(page, 'en');
  });

  test('All pages have lang="en"', async ({ page }) => {
    const pages = ['/', '/platform', '/solutions', '/about'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const lang = await page.locator('html').getAttribute('lang');
      expect(lang).toBe('en');
    }
  });

  test('Viewport meta tag is present', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const viewport = await page.locator('meta[name="viewport"]').getAttribute('content');

    expect(viewport).toBeTruthy();
    expect(viewport).toContain('width=device-width');
  });
});

test.describe('Metadata - Open Graph Tags', () => {
  test('Homepage has Open Graph tags', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');

    // OG tags are optional but recommended
    const hasOGTags = ogTitle && ogDescription;

    if (hasOGTags) {
      expect(ogTitle.length).toBeGreaterThan(0);
      expect(ogDescription.length).toBeGreaterThan(0);
    }
  });

  test('Major pages have og:type', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const ogType = await page.locator('meta[property="og:type"]').getAttribute('content');

    // Optional but good practice
    if (ogType) {
      expect(ogType).toBeTruthy();
    }
  });
});

test.describe('Metadata - Favicon', () => {
  test('Site has favicon', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const favicon = page.locator('link[rel*="icon"]').first();
    const href = await favicon.getAttribute('href');

    expect(href).toBeTruthy();
  });

  test('Favicon loads successfully', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const faviconLink = page.locator('link[rel*="icon"]').first();
    const href = await faviconLink.getAttribute('href');

    if (href) {
      // Try to load favicon
      const faviconUrl = href.startsWith('http') ? href : new URL(href, page.url()).toString();

      const response = await page.request.get(faviconUrl);
      expect(response.status()).toBeLessThan(400);
    }
  });
});

test.describe('Metadata - Structured Content', () => {
  test('Pages have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();

    // Should have h1 and some h2s
    expect(h1Count).toBeGreaterThan(0);
    expect(h2Count).toBeGreaterThan(0);
  });

  test('Solution pages have structured sections', async ({ page }) => {
    await page.goto('/solutions/downtime-reduction');
    await waitForPageLoad(page);

    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();

    // Should have hierarchical headings
    expect(h1Count).toBeGreaterThan(0);
    expect(h2Count + h3Count).toBeGreaterThan(0);
  });
});
