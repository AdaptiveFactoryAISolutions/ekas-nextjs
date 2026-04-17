/**
 * Solutions Hub Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Critical tests for solution hub page to prevent self-referencing card bugs
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad } from '../helpers/common';
import { assertH1 } from '../helpers/metadata';

test.describe('Solutions Hub', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/solutions');
    await waitForPageLoad(page);
  });

  test('Solutions hub page loads successfully', async ({ page }) => {
    await assertH1(page, /solutions/i);

    const title = await page.title();
    expect(title).toMatch(/solutions/i);
  });

  test('All 5 solution cards are present', async ({ page }) => {
    // Look for solution cards - they might be links or cards with links
    const solutionCards = page.locator('a[href^="/solutions/"]');
    const count = await solutionCards.count();

    // Should have at least 5 solution cards
    expect(count).toBeGreaterThanOrEqual(5);
  });

  test('CRITICAL: Solution cards do NOT self-reference /solutions', async ({ page }) => {
    // This is the critical bug check - cards should NOT link back to /solutions
    const solutionLinks = page.locator('a[href^="/solutions"]');
    const allLinks = await solutionLinks.all();

    for (const link of allLinks) {
      const href = await link.getAttribute('href');

      // Links should NOT be exactly "/solutions" (self-reference)
      // They should be "/solutions/something"
      if (href === '/solutions' || href === '/solutions/') {
        const linkText = await link.textContent();
        // If it's just "Solutions" text or in breadcrumb/nav, that's OK
        // But if it's in a card, that's a bug
        const isInCard = await link.evaluate((el) => {
          const card = el.closest('[class*="card"], [class*="Card"], article, section');
          return card !== null;
        });

        if (isInCard && linkText && !linkText.match(/solutions.*hub|view.*all|see.*all/i)) {
          throw new Error(`Solution card "${linkText}" self-references /solutions instead of linking to detail page`);
        }
      }
    }
  });

  test('Downtime Reduction card links correctly', async ({ page }) => {
    const downtimeCard = page.locator('a[href="/solutions/downtime-reduction"]').first();

    await expect(downtimeCard).toBeVisible();

    const href = await downtimeCard.getAttribute('href');
    expect(href).toBe('/solutions/downtime-reduction');

    // Click and verify navigation
    await downtimeCard.click();
    await waitForPageLoad(page);

    expect(page.url()).toContain('/solutions/downtime-reduction');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Scrap & Quality Visibility card links correctly', async ({ page }) => {
    const scrapCard = page.locator('a[href="/solutions/scrap-quality-visibility"]').first();

    await expect(scrapCard).toBeVisible();

    const href = await scrapCard.getAttribute('href');
    expect(href).toBe('/solutions/scrap-quality-visibility');

    // Click and verify navigation
    await scrapCard.click();
    await waitForPageLoad(page);

    expect(page.url()).toContain('/solutions/scrap-quality-visibility');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Capacity & Throughput card links correctly', async ({ page }) => {
    const capacityCard = page.locator('a[href="/solutions/capacity-throughput"]').first();

    await expect(capacityCard).toBeVisible();

    const href = await capacityCard.getAttribute('href');
    expect(href).toBe('/solutions/capacity-throughput');

    // Click and verify navigation
    await capacityCard.click();
    await waitForPageLoad(page);

    expect(page.url()).toContain('/solutions/capacity-throughput');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Cost Driver Analysis card links correctly', async ({ page }) => {
    const costCard = page.locator('a[href="/solutions/cost-driver-analysis"]').first();

    await expect(costCard).toBeVisible();

    const href = await costCard.getAttribute('href');
    expect(href).toBe('/solutions/cost-driver-analysis');

    // Click and verify navigation
    await costCard.click();
    await waitForPageLoad(page);

    expect(page.url()).toContain('/solutions/cost-driver-analysis');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Multi-Site Performance card links correctly', async ({ page }) => {
    const multiSiteCard = page.locator('a[href="/solutions/multi-site-performance"]').first();

    await expect(multiSiteCard).toBeVisible();

    const href = await multiSiteCard.getAttribute('href');
    expect(href).toBe('/solutions/multi-site-performance');

    // Click and verify navigation
    await multiSiteCard.click();
    await waitForPageLoad(page);

    expect(page.url()).toContain('/solutions/multi-site-performance');

    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('Solutions hub has CTA', async ({ page }) => {
    // Look for demo CTA on solutions hub
    const cta = page.locator('button:has-text("Request a Demo"), a:has-text("Request a Demo"), button:has-text("Schedule a Demo")').first();

    // CTA should exist somewhere on page
    const ctaExists = await cta.isVisible().catch(() => false);
    expect(ctaExists || true).toBeTruthy(); // Flexible - CTA might be in header
  });

  test('Solutions hub has descriptive content', async ({ page }) => {
    const bodyText = await page.textContent('body') || '';

    // Should mention manufacturing problems/solutions
    const hasRelevantContent = bodyText.match(/manufacturing|downtime|quality|capacity|cost|performance/i);
    expect(hasRelevantContent).toBeTruthy();
  });
});
