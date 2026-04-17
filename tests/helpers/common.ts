/**
 * Common Helper Functions for Playwright Tests
 * EKAS Manufacturing Intelligence Platform
 */

import { Page, expect } from '@playwright/test';

/**
 * Wait for page to fully load with network idle and hydration
 */
export async function waitForPageLoad(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
  // Additional wait for React hydration
  await page.waitForTimeout(500);
}

/**
 * Capture and return console errors from the page
 * Use this to detect JavaScript errors during page load
 */
export async function captureConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

/**
 * Set up console error listener and return the errors array
 */
export function setupConsoleErrorCapture(page: Page): string[] {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  return errors;
}

/**
 * Capture network failures (404, 500 errors)
 */
export async function captureNetworkFailures(page: Page): Promise<{ url: string; status: number }[]> {
  const failures: { url: string; status: number }[] = [];

  page.on('response', (response) => {
    const status = response.status();
    if (status >= 400) {
      failures.push({
        url: response.url(),
        status: status,
      });
    }
  });

  return failures;
}

/**
 * Set up network failure listener and return the failures array
 */
export function setupNetworkFailureCapture(page: Page): { url: string; status: number }[] {
  const failures: { url: string; status: number }[] = [];

  page.on('response', (response) => {
    const status = response.status();
    if (status >= 400) {
      failures.push({
        url: response.url(),
        status: status,
      });
    }
  });

  return failures;
}

/**
 * Check for placeholder content on the page
 * Returns true if placeholder content is found (BAD)
 */
export async function checkForPlaceholderContent(page: Page): Promise<{ found: boolean; matches: string[] }> {
  const placeholderPatterns = [
    /lorem ipsum/i,
    /coming soon/i,
    /\bTBD\b/i,
    /placeholder/i,
    /\[todo\]/i,
    /\[content here\]/i,
    /dummy text/i,
  ];

  const bodyText = await page.textContent('body') || '';
  const matches: string[] = [];

  for (const pattern of placeholderPatterns) {
    const match = bodyText.match(pattern);
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
 * Stabilize page for screenshot by waiting for animations and hiding dynamic content
 */
export async function stabilizeForScreenshot(page: Page): Promise<void> {
  await page.waitForLoadState('networkidle');

  // Wait for any animations to complete
  await page.waitForTimeout(1000);

  // Disable animations for consistent screenshots
  await page.addStyleTag({
    content: `
      *, *::before, *::after {
        animation-duration: 0s !important;
        animation-delay: 0s !important;
        transition-duration: 0s !important;
        transition-delay: 0s !important;
      }
    `
  });

  // Additional short wait for styles to apply
  await page.waitForTimeout(300);
}

/**
 * Assert that page loaded successfully with 200 status
 */
export async function assertPageLoadsSuccessfully(page: Page, url: string): Promise<void> {
  const response = await page.goto(url);
  expect(response?.status()).toBe(200);
  await waitForPageLoad(page);
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(page: Page, selector: string): Promise<boolean> {
  return await page.locator(selector).isVisible();
}
