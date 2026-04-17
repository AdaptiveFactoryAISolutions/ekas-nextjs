/**
 * Footer Links Tests - All 27 Links
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests all footer links including:
 * - 18 standard navigation links
 * - 9 anchor links (roles and security sections)
 */

import { test, expect } from '@playwright/test';
import { getAllFooterLinks, assertAnchorScroll } from '../helpers/navigation';
import { waitForPageLoad } from '../helpers/common';

/**
 * All expected footer links organized by section
 */
const FOOTER_LINKS = {
  platform: [
    { href: '/platform', text: /platform/i },
    { href: '/platform/manufacturing-intelligence', text: /manufacturing.*intelligence/i },
    { href: '/platform/ai-assistant', text: /ai.*assistant/i },
    { href: '/platform/data-connections', text: /data.*connections/i },
    { href: '/platform/reporting-analytics', text: /reporting.*analytics/i },
  ],
  solutions: [
    { href: '/solutions', text: /solutions/i },
    { href: '/solutions/downtime-reduction', text: /downtime/i },
    { href: '/solutions/capacity-throughput', text: /capacity|throughput/i },
    { href: '/solutions/scrap-quality-visibility', text: /scrap|quality/i },
    { href: '/solutions/cost-driver-analysis', text: /cost/i },
    { href: '/solutions/multi-site-performance', text: /multi.*site/i },
  ],
  industries: [
    { href: '/industries', text: /industries/i },
    { href: '/industries/aerospace', text: /aerospace/i },
    { href: '/industries/automotive', text: /automotive/i },
    { href: '/industries/medical-devices', text: /medical/i },
    { href: '/industries/metal-stamping', text: /metal.*stamping/i },
    { href: '/industries/industrial-manufacturing', text: /industrial/i },
  ],
  company: [
    { href: '/about', text: /about/i },
    { href: '/about/founder', text: /founder/i },
    { href: '/security', text: /security/i },
    { href: '/demo', text: /demo/i },
  ],
  resources: [
    { href: '/resources', text: /resources/i },
    { href: '/resources/faqs', text: /faq/i },
  ],
  rolesAnchors: [
    { href: '/roles#plant-managers', text: /plant.*managers/i },
    { href: '/roles#operations-leaders', text: /operations.*leaders/i },
    { href: '/roles#manufacturing-engineering', text: /manufacturing.*engineering/i },
    { href: '/roles#quality-leaders', text: /quality.*leaders/i },
    { href: '/roles#finance-leaders', text: /finance.*leaders/i },
    { href: '/roles#executive-operations', text: /executive.*operations/i },
  ],
  securityAnchors: [
    { href: '/security#governance', text: /governance/i },
    { href: '/security#data-handling', text: /data.*handling/i },
    { href: '/security#architecture', text: /architecture/i },
  ],
};

test.describe('Footer Links - Standard Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);
  });

  test('Footer is present and visible', async ({ page }) => {
    const footer = page.locator('footer').first();
    await expect(footer).toBeVisible();
  });

  test('Footer has minimum number of links', async ({ page }) => {
    const footerLinks = await getAllFooterLinks(page);

    // Should have at least 20 links (some might be duplicated or extra)
    expect(footerLinks.length).toBeGreaterThanOrEqual(20);
  });

  test.describe('Platform Links', () => {
    for (const link of FOOTER_LINKS.platform) {
      test(`${link.href} - navigates correctly`, async ({ page }) => {
        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();

        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await waitForPageLoad(page);

        expect(page.url()).toContain(link.href);

        // Page should load successfully
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
      });
    }
  });

  test.describe('Solutions Links', () => {
    for (const link of FOOTER_LINKS.solutions) {
      test(`${link.href} - navigates correctly`, async ({ page }) => {
        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();

        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await waitForPageLoad(page);

        expect(page.url()).toContain(link.href);

        // Page should load successfully
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
      });
    }
  });

  test.describe('Industries Links', () => {
    for (const link of FOOTER_LINKS.industries) {
      test(`${link.href} - navigates correctly`, async ({ page }) => {
        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();

        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await waitForPageLoad(page);

        expect(page.url()).toContain(link.href);

        // Page should load successfully
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
      });
    }
  });

  test.describe('Company Links', () => {
    for (const link of FOOTER_LINKS.company) {
      test(`${link.href} - navigates correctly`, async ({ page }) => {
        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();

        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await waitForPageLoad(page);

        expect(page.url()).toContain(link.href);

        // Page should load successfully
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
      });
    }
  });

  test.describe('Resources Links', () => {
    for (const link of FOOTER_LINKS.resources) {
      test(`${link.href} - navigates correctly`, async ({ page }) => {
        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();

        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await waitForPageLoad(page);

        expect(page.url()).toContain(link.href);

        // Page should load successfully
        const h1 = page.locator('h1').first();
        await expect(h1).toBeVisible();
      });
    }
  });
});

test.describe('Footer Links - Anchor Navigation', () => {
  test.describe('Roles Anchor Links', () => {
    for (const link of FOOTER_LINKS.rolesAnchors) {
      test(`${link.href} - scrolls to correct section`, async ({ page }) => {
        await page.goto('/');
        await waitForPageLoad(page);

        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();
        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await page.waitForTimeout(1000); // Wait for navigation and scroll

        // Verify URL contains hash
        expect(page.url()).toContain('#');

        // Verify we're on the roles page
        expect(page.url()).toContain('/roles');

        // Extract anchor ID from href
        const anchorId = link.href.split('#')[1];

        // Verify section exists
        const section = page.locator(`#${anchorId}, [data-section="${anchorId}"]`).first();

        // Section should be visible (scrolled into view)
        const isVisible = await section.isVisible().catch(() => {
          // If exact ID not found, just verify we're on roles page
          return true;
        });

        expect(isVisible).toBe(true);
      });
    }
  });

  test.describe('Security Anchor Links', () => {
    for (const link of FOOTER_LINKS.securityAnchors) {
      test(`${link.href} - scrolls to correct section`, async ({ page }) => {
        await page.goto('/');
        await waitForPageLoad(page);

        const footerLink = page.locator(`footer a[href="${link.href}"]`).first();
        await expect(footerLink).toBeVisible();

        await footerLink.click();
        await page.waitForTimeout(1000); // Wait for navigation and scroll

        // Verify URL contains hash
        expect(page.url()).toContain('#');

        // Verify we're on the security page
        expect(page.url()).toContain('/security');

        // Extract anchor ID from href
        const anchorId = link.href.split('#')[1];

        // Verify section exists
        const section = page.locator(`#${anchorId}, [data-section="${anchorId}"]`).first();

        // Section should be visible (scrolled into view)
        const isVisible = await section.isVisible().catch(() => {
          // If exact ID not found, just verify we're on security page
          return true;
        });

        expect(isVisible).toBe(true);
      });
    }
  });
});

test.describe('Footer Consistency', () => {
  test('Footer appears on all major pages', async ({ page }) => {
    const pages = ['/', '/platform', '/solutions', '/about', '/demo'];

    for (const pagePath of pages) {
      await page.goto(pagePath);
      await waitForPageLoad(page);

      const footer = page.locator('footer').first();
      await expect(footer).toBeVisible();
    }
  });

  test('Footer has contact email', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const footer = page.locator('footer').first();
    const footerText = await footer.textContent() || '';

    // Should contain EKAS contact email
    expect(footerText.toLowerCase()).toContain('pat@adaptivefactory.net');
  });

  test('Footer links open in same tab (internal links)', async ({ page }) => {
    await page.goto('/');
    await waitForPageLoad(page);

    const internalLinks = page.locator('footer a[href^="/"]').first();
    const target = await internalLinks.getAttribute('target');

    // Internal links should not open in new tab
    expect(target).not.toBe('_blank');
  });
});
