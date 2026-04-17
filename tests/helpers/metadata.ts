/**
 * Metadata and SEO Helper Functions
 * EKAS Manufacturing Intelligence Platform
 */

import { Page, expect } from '@playwright/test';

/**
 * Assert that page title exists and optionally matches a pattern
 */
export async function assertPageTitle(page: Page, expectedPattern?: string | RegExp): Promise<void> {
  const title = await page.title();

  // Title should not be empty
  expect(title).toBeTruthy();
  expect(title.length).toBeGreaterThan(0);

  // If pattern provided, match it
  if (expectedPattern) {
    if (typeof expectedPattern === 'string') {
      expect(title).toContain(expectedPattern);
    } else {
      expect(title).toMatch(expectedPattern);
    }
  }
}

/**
 * Assert that meta description exists and has reasonable length
 */
export async function assertMetaDescription(page: Page, minLength: number = 50): Promise<void> {
  const description = await page.locator('meta[name="description"]').getAttribute('content');

  expect(description).toBeTruthy();
  if (description) {
    expect(description.length).toBeGreaterThanOrEqual(minLength);
    expect(description.length).toBeLessThanOrEqual(200); // SEO best practice max
  }
}

/**
 * Assert that H1 exists and is meaningful (not empty)
 */
export async function assertH1(page: Page, expectedText?: string | RegExp): Promise<void> {
  const h1 = page.locator('h1').first();

  // H1 should exist
  await expect(h1).toBeVisible();

  // H1 should have text content
  const h1Text = await h1.textContent();
  expect(h1Text).toBeTruthy();
  expect(h1Text?.trim().length).toBeGreaterThan(0);

  // If expected text provided, verify it
  if (expectedText) {
    if (typeof expectedText === 'string') {
      expect(h1Text).toContain(expectedText);
    } else {
      expect(h1Text).toMatch(expectedText);
    }
  }
}

/**
 * Check that favicon loads successfully
 */
export async function checkFavicon(page: Page): Promise<void> {
  const faviconLink = page.locator('link[rel*="icon"]').first();
  const href = await faviconLink.getAttribute('href');

  expect(href).toBeTruthy();

  // Try to load the favicon
  if (href) {
    const faviconUrl = href.startsWith('http') ? href : new URL(href, page.url()).toString();
    const response = await page.request.get(faviconUrl);
    expect(response.status()).toBeLessThan(400);
  }
}

/**
 * Get all meta tags from page
 */
export async function getMetaTags(page: Page): Promise<Record<string, string>> {
  const metaTags: Record<string, string> = {};

  const metas = await page.locator('meta').all();
  for (const meta of metas) {
    const name = await meta.getAttribute('name') || await meta.getAttribute('property');
    const content = await meta.getAttribute('content');
    if (name && content) {
      metaTags[name] = content;
    }
  }

  return metaTags;
}

/**
 * Assert Open Graph tags exist
 */
export async function assertOpenGraphTags(page: Page): Promise<void> {
  const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
  const ogDescription = await page.locator('meta[property="og:description"]').getAttribute('content');

  expect(ogTitle).toBeTruthy();
  expect(ogDescription).toBeTruthy();
}

/**
 * Assert page has proper language attribute
 */
export async function assertLanguageAttribute(page: Page, expectedLang: string = 'en'): Promise<void> {
  const htmlLang = await page.locator('html').getAttribute('lang');
  expect(htmlLang).toBe(expectedLang);
}

/**
 * Check for duplicate page titles across multiple pages
 */
export function createTitleTracker(): {
  addTitle: (url: string, title: string) => void;
  checkForDuplicates: () => { hasDuplicates: boolean; duplicates: Record<string, string[]> };
} {
  const titleMap = new Map<string, string[]>();

  return {
    addTitle: (url: string, title: string) => {
      if (!titleMap.has(title)) {
        titleMap.set(title, []);
      }
      titleMap.get(title)?.push(url);
    },
    checkForDuplicates: () => {
      const duplicates: Record<string, string[]> = {};
      let hasDuplicates = false;

      for (const [title, urls] of titleMap.entries()) {
        if (urls.length > 1) {
          duplicates[title] = urls;
          hasDuplicates = true;
        }
      }

      return { hasDuplicates, duplicates };
    }
  };
}
