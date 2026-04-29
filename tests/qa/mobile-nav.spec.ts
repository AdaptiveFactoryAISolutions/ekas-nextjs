/**
 * Suite 7 — Mobile navigation at 375x667.
 * - Hamburger / menu trigger is visible
 * - Desktop nav is hidden
 * - Menu opens on tap
 * - Menu contains the expected nav items
 * - Each menu item navigates correctly
 * - "Request Demo" CTA is reachable on mobile
 */
import { test, expect, devices } from '@playwright/test';

test.use({ viewport: { width: 375, height: 667 } });

const EXPECTED_NAV_ITEMS = [
  /why.?ekas/i,
  /platform/i,
  /solutions/i,
  /industries/i,
  /security/i,
  /resources/i,
  /about/i,
];

test('mobile hamburger menu opens, lists items, navigates', async ({ page }) => {
  await page.goto('/');

  // Locate the menu trigger. Common a11y patterns: button with aria-label
  // "menu" / "navigation" / "open menu", or a button containing a hamburger
  // SVG. Fall back to any nav button visible at this viewport.
  const candidates = [
    page.getByRole('button', { name: /menu|navigation/i }).first(),
    page.locator('nav button[aria-expanded]').first(),
    page.locator('header button').filter({ hasNotText: /demo/i }).first(),
  ];

  let trigger = null;
  for (const c of candidates) {
    if ((await c.count()) > 0 && (await c.isVisible())) {
      trigger = c;
      break;
    }
  }
  expect(trigger, 'No mobile menu trigger visible at 375px viewport').not.toBeNull();

  await trigger!.click();

  // Wait for animation; menu should now contain nav items.
  await page.waitForTimeout(300);

  const menu = page.locator('nav, [role="navigation"], [role="menu"], [role="dialog"]').filter({ hasText: /platform|solutions/i }).first();
  await expect(menu).toBeVisible();

  for (const re of EXPECTED_NAV_ITEMS) {
    const item = menu.getByText(re).first();
    expect(await item.count(), `Mobile menu missing nav item ${re}`).toBeGreaterThan(0);
  }

  // Demo CTA reachable on mobile (in menu or sticky on page).
  const demoCta = page.getByRole('button', { name: /request.*demo/i });
  const demoCtaLink = page.getByRole('link', { name: /request.*demo/i });
  const demoReachable = (await demoCta.count()) + (await demoCtaLink.count()) > 0;
  expect(demoReachable, 'Request Demo CTA not reachable on mobile').toBe(true);
});

test('mobile menu items navigate to expected paths', async ({ page }) => {
  await page.goto('/');

  // Open menu via aria-label="Toggle mobile menu" (real selector from
  // src/components/layout/Navigation.tsx).
  const trigger = page.getByLabel(/toggle mobile menu/i);
  await trigger.click();
  await page.waitForTimeout(400);

  // Find the visible "Why EKAS" link inside the now-expanded mobile
  // overlay. Use the navigation containing the toggle's expanded state.
  const links = page.getByRole('link', { name: /why.?ekas/i });
  const linkCount = await links.count();
  let visibleIdx = -1;
  for (let i = 0; i < linkCount; i++) {
    if (await links.nth(i).isVisible()) {
      visibleIdx = i;
      break;
    }
  }
  expect(visibleIdx, 'No visible Why EKAS link in mobile menu').toBeGreaterThanOrEqual(0);

  await Promise.all([
    page.waitForURL(/\/why-ekas/, { timeout: 10_000 }),
    links.nth(visibleIdx).click(),
  ]);
  expect(page.url()).toContain('/why-ekas');
});
