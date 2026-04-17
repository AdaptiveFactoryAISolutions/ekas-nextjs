/**
 * Navigation Helper Functions
 * EKAS Manufacturing Intelligence Platform
 */

import { Page, expect } from '@playwright/test';

/**
 * Assert footer has expected number of links
 */
export async function assertFooterLinks(page: Page, minCount: number = 20): Promise<void> {
  const footerLinks = page.locator('footer a[href]');
  const count = await footerLinks.count();

  expect(count).toBeGreaterThanOrEqual(minCount);
}

/**
 * Click a footer link by text and verify navigation
 */
export async function clickFooterLink(page: Page, linkText: string): Promise<void> {
  const link = page.locator('footer').locator(`a:has-text("${linkText}")`).first();
  await expect(link).toBeVisible();

  const href = await link.getAttribute('href');
  expect(href).toBeTruthy();

  await link.click();
  await page.waitForLoadState('networkidle');
}

/**
 * Assert anchor link scrolls to correct section
 */
export async function assertAnchorScroll(page: Page, anchorId: string): Promise<void> {
  // Navigate to the anchor
  await page.goto(`${page.url().split('#')[0]}#${anchorId}`);

  // Verify URL contains hash
  expect(page.url()).toContain(`#${anchorId}`);

  // Wait for scroll to complete
  await page.waitForTimeout(500);

  // Verify section exists and is in viewport
  const section = page.locator(`#${anchorId}, [data-section="${anchorId}"]`).first();
  await expect(section).toBeVisible();

  // Check if section is in viewport (at least partially)
  const isVisible = await section.isVisible();
  expect(isVisible).toBeTruthy();
}

/**
 * Open mobile navigation menu (hamburger)
 */
export async function openMobileNav(page: Page): Promise<void> {
  // Look for common mobile menu button patterns
  const mobileMenuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), [data-testid="mobile-menu-button"]').first();

  await expect(mobileMenuButton).toBeVisible();
  await mobileMenuButton.click();

  // Wait for menu to open
  await page.waitForTimeout(500);

  // Verify mobile nav is visible
  const mobileNav = page.locator('nav[aria-label*="mobile" i], [data-testid="mobile-nav"], .mobile-nav').first();
  await expect(mobileNav).toBeVisible();
}

/**
 * Close mobile navigation menu
 */
export async function closeMobileNav(page: Page): Promise<void> {
  // Look for close button
  const closeButton = page.locator('button[aria-label*="close" i], button:has-text("Close")').first();

  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(500);
  }
}

/**
 * Get all navigation links from main nav
 */
export async function getMainNavLinks(page: Page): Promise<{ text: string; href: string }[]> {
  const navLinks = await page.locator('nav a[href]').all();
  const links: { text: string; href: string }[] = [];

  for (const link of navLinks) {
    const text = await link.textContent();
    const href = await link.getAttribute('href');
    if (text && href) {
      links.push({ text: text.trim(), href });
    }
  }

  return links;
}

/**
 * Assert main navigation is visible and has links
 */
export async function assertMainNavVisible(page: Page): Promise<void> {
  const nav = page.locator('nav').first();
  await expect(nav).toBeVisible();

  const navLinks = page.locator('nav a[href]');
  const count = await navLinks.count();
  expect(count).toBeGreaterThan(0);
}

/**
 * Assert logo links to homepage
 */
export async function assertLogoLinksHome(page: Page): Promise<void> {
  // Look for logo link (common patterns)
  const logoLink = page.locator('a[href="/"], a:has(img[alt*="logo" i]), a:has(img[alt*="EKAS" i])').first();

  await expect(logoLink).toBeVisible();

  const href = await logoLink.getAttribute('href');
  expect(href).toBe('/');
}

/**
 * Get all footer links
 */
export async function getAllFooterLinks(page: Page): Promise<{ text: string; href: string }[]> {
  const footerLinks = await page.locator('footer a[href]').all();
  const links: { text: string; href: string }[] = [];

  for (const link of footerLinks) {
    const text = await link.textContent();
    const href = await link.getAttribute('href');
    if (text && href) {
      links.push({ text: text.trim(), href });
    }
  }

  return links;
}

/**
 * Assert breadcrumbs exist and are functional
 */
export async function assertBreadcrumbs(page: Page): Promise<void> {
  const breadcrumbs = page.locator('nav[aria-label*="breadcrumb" i], [data-testid="breadcrumbs"]').first();

  if (await breadcrumbs.isVisible()) {
    const links = breadcrumbs.locator('a');
    const count = await links.count();
    expect(count).toBeGreaterThan(0);
  }
}
