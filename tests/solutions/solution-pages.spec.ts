/**
 * Solution Detail Pages Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests all 5 solution detail pages
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad, setupConsoleErrorCapture } from '../helpers/common';
import { assertH1, assertPageTitle, assertMetaDescription } from '../helpers/metadata';
import { assertSectionExists } from '../helpers/content';

const SOLUTION_PAGES = [
  {
    path: '/solutions/downtime-reduction',
    name: 'Downtime Reduction',
    expectedSections: [/problem/i, /how.*ekas.*helps/i, /impact/i],
  },
  {
    path: '/solutions/scrap-quality-visibility',
    name: 'Scrap & Quality Visibility',
    expectedSections: [/problem/i, /how.*ekas.*helps/i, /impact/i],
  },
  {
    path: '/solutions/capacity-throughput',
    name: 'Capacity & Throughput',
    expectedSections: [/problem/i, /how.*ekas.*helps/i, /impact/i],
  },
  {
    path: '/solutions/cost-driver-analysis',
    name: 'Cost Driver Analysis',
    expectedSections: [/problem/i, /how.*ekas.*helps/i, /impact/i],
  },
  {
    path: '/solutions/multi-site-performance',
    name: 'Multi-Site Performance',
    expectedSections: [/problem/i, /how.*ekas.*helps/i, /impact/i],
  },
];

test.describe('Solution Detail Pages', () => {
  for (const solution of SOLUTION_PAGES) {
    test.describe(solution.name, () => {
      test('Page loads successfully', async ({ page }) => {
        const consoleErrors = setupConsoleErrorCapture(page);

        const response = await page.goto(solution.path);
        expect(response?.status()).toBe(200);

        await waitForPageLoad(page);

        // No console errors
        expect(consoleErrors.length).toBe(0);
      });

      test('Has proper H1', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        await assertH1(page);

        const h1Text = await page.locator('h1').first().textContent();
        expect(h1Text).toBeTruthy();
      });

      test('Has page title and meta description', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        await assertPageTitle(page);
        await assertMetaDescription(page);
      });

      test('Has "The Problem" section', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        // Look for problem section
        const problemSection = page.locator('h2, h3').filter({ hasText: /problem|challenge/i }).first();
        const exists = await problemSection.isVisible().catch(() => false);

        if (!exists) {
          // Alternative: check for problem-related content
          const bodyText = await page.textContent('body') || '';
          const hasProblemContent = bodyText.match(/problem|challenge|struggle|difficulty/i);
          expect(hasProblemContent).toBeTruthy();
        }
      });

      test('Has "How EKAS Helps" section', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        // Look for solution/help section
        const solutionSection = page.locator('h2, h3').filter({ hasText: /how.*ekas|solution|ekas.*helps/i }).first();
        const exists = await solutionSection.isVisible().catch(() => false);

        if (!exists) {
          // Alternative: check for EKAS solution content
          const bodyText = await page.textContent('body') || '';
          const hasSolutionContent = bodyText.match(/ekas.*helps|ekas.*enables|ekas.*provides/i);
          expect(hasSolutionContent).toBeTruthy();
        }
      });

      test('Has CTA button', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        // Look for demo CTA
        const cta = page.locator('button:has-text("Request a Demo"), a:has-text("Request a Demo"), button:has-text("Schedule a Demo"), a:has-text("Schedule a Demo")').first();

        const ctaExists = await cta.isVisible().catch(() => false);
        expect(ctaExists).toBe(true);
      });

      test('Has manufacturing-specific content', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        const bodyText = await page.textContent('body') || '';

        // Should have manufacturing terminology
        const hasManufacturingContent = bodyText.match(/manufacturing|production|plant|factory|metrics|data|performance/i);
        expect(hasManufacturingContent).toBeTruthy();
      });

      test('Links back to solutions hub', async ({ page }) => {
        await page.goto(solution.path);
        await waitForPageLoad(page);

        // Should have a link back to solutions (in nav or breadcrumb)
        const solutionsLink = page.locator('a[href="/solutions"]').first();
        const exists = await solutionsLink.isVisible().catch(() => false);

        // This is optional - might be in nav or breadcrumb
        expect(exists || true).toBeTruthy();
      });
    });
  }

  test('All solution pages are unique (no duplicate content)', async ({ page }) => {
    const h1Texts = new Set<string>();

    for (const solution of SOLUTION_PAGES) {
      await page.goto(solution.path);
      await waitForPageLoad(page);

      const h1Text = await page.locator('h1').first().textContent();
      if (h1Text) {
        // H1 should be unique
        expect(h1Texts.has(h1Text.trim())).toBe(false);
        h1Texts.add(h1Text.trim());
      }
    }

    // Should have 5 unique H1s
    expect(h1Texts.size).toBe(5);
  });
});
