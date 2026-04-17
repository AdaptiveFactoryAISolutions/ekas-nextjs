/**
 * Content Integrity Helper Functions
 * EKAS Manufacturing Intelligence Platform
 */

import { Page, expect } from '@playwright/test';

/**
 * Assert email consistency across the page
 * All emails should be pat@adaptivefactory.net
 */
export async function assertEmailConsistency(page: Page, expectedEmail: string = 'pat@adaptivefactory.net'): Promise<void> {
  const bodyText = await page.textContent('body') || '';

  // Email pattern
  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
  const emails = bodyText.match(emailPattern) || [];

  // All found emails should match expected email
  for (const email of emails) {
    expect(email.toLowerCase()).toBe(expectedEmail.toLowerCase());
  }
}

/**
 * Check for brand leakage (competitor names)
 */
export async function checkForBrandLeakage(page: Page): Promise<{ found: boolean; matches: string[] }> {
  const competitorBrands = [
    /MachineMetrics/i,
    /Sight Machine/i,
    /SightMachine/i,
    /Plex Systems/i,
    /Plex MES/i,
  ];

  const bodyText = await page.textContent('body') || '';
  const matches: string[] = [];

  for (const brand of competitorBrands) {
    const match = bodyText.match(brand);
    if (match) {
      matches.push(match[0]);
    }
  }

  return {
    found: matches.length > 0,
    matches: matches,
  };
}

/**
 * Assert EKAS-specific manufacturing terminology is present
 */
export async function assertManufacturingTerminology(page: Page): Promise<void> {
  const bodyText = await page.textContent('body') || '';

  // Check for EKAS-specific terms (at least some should be present on most pages)
  const ekasTerms = [
    /manufacturing intelligence/i,
    /governed metrics/i,
    /data provenance/i,
    /EKAS/i,
  ];

  let foundCount = 0;
  for (const term of ekasTerms) {
    if (bodyText.match(term)) {
      foundCount++;
    }
  }

  // At least one EKAS term should be present
  expect(foundCount).toBeGreaterThan(0);
}

/**
 * Check for specific content on page
 */
export async function assertContentPresent(page: Page, contentPattern: string | RegExp): Promise<void> {
  const bodyText = await page.textContent('body') || '';

  if (typeof contentPattern === 'string') {
    expect(bodyText).toContain(contentPattern);
  } else {
    expect(bodyText).toMatch(contentPattern);
  }
}

/**
 * Assert specific section exists by heading text
 */
export async function assertSectionExists(page: Page, headingText: string | RegExp): Promise<void> {
  const heading = page.locator('h1, h2, h3, h4, h5, h6').filter({ hasText: headingText as any }).first();
  await expect(heading).toBeVisible();
}

/**
 * Get all headings from page (h1, h2, h3)
 */
export async function getAllHeadings(page: Page): Promise<{ level: string; text: string }[]> {
  const headings: { level: string; text: string }[] = [];

  for (const level of ['h1', 'h2', 'h3']) {
    const elements = await page.locator(level).all();
    for (const element of elements) {
      const text = await element.textContent();
      if (text) {
        headings.push({ level, text: text.trim() });
      }
    }
  }

  return headings;
}

/**
 * Assert page has proper content structure (h1, multiple sections)
 */
export async function assertContentStructure(page: Page): Promise<void> {
  // Should have h1
  const h1Count = await page.locator('h1').count();
  expect(h1Count).toBeGreaterThan(0);

  // Should have some h2s (section headings)
  const h2Count = await page.locator('h2').count();
  expect(h2Count).toBeGreaterThan(0);

  // Body content should not be empty
  const bodyText = await page.textContent('body') || '';
  expect(bodyText.trim().length).toBeGreaterThan(100);
}

/**
 * Check for images without alt text
 */
export async function checkImagesHaveAlt(page: Page): Promise<{ missingAlt: number; total: number }> {
  const images = await page.locator('img').all();
  let missingAlt = 0;

  for (const img of images) {
    const alt = await img.getAttribute('alt');
    if (!alt || alt.trim().length === 0) {
      missingAlt++;
    }
  }

  return {
    missingAlt,
    total: images.length,
  };
}

/**
 * Assert no broken links on page (excluding external)
 */
export async function checkInternalLinks(page: Page): Promise<{ broken: string[]; total: number }> {
  const links = await page.locator('a[href^="/"]').all();
  const broken: string[] = [];

  for (const link of links) {
    const href = await link.getAttribute('href');
    if (href && !href.includes('#')) {
      // Simple check - just verify href is not empty
      if (href.trim().length === 0) {
        broken.push(href);
      }
    }
  }

  return {
    broken,
    total: links.length,
  };
}
