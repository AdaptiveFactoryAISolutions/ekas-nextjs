/**
 * Form and CTA Helper Functions
 * EKAS Manufacturing Intelligence Platform
 */

import { Page, expect } from '@playwright/test';

/**
 * Open demo modal by clicking CTA button
 */
export async function openDemoModal(page: Page): Promise<void> {
  // Look for demo CTA button (various patterns)
  const demoButton = page.locator('button:has-text("Request a Demo"), button:has-text("Schedule a Demo"), a:has-text("Request a Demo")').first();

  await expect(demoButton).toBeVisible();
  await demoButton.click();

  // Wait for modal to open
  await page.waitForTimeout(500);

  // Verify modal is visible
  const modal = page.locator('[role="dialog"], [data-testid="demo-modal"], .modal').first();
  await expect(modal).toBeVisible();
}

/**
 * Close demo modal
 */
export async function closeDemoModal(page: Page): Promise<void> {
  // Try multiple close methods

  // Method 1: Close button
  const closeButton = page.locator('[role="dialog"] button[aria-label*="close" i], [role="dialog"] button:has-text("Close")').first();

  if (await closeButton.isVisible()) {
    await closeButton.click();
    await page.waitForTimeout(500);
    return;
  }

  // Method 2: Escape key
  await page.keyboard.press('Escape');
  await page.waitForTimeout(500);
}

/**
 * Fill demo form with test data
 */
export async function fillDemoForm(page: Page, data: {
  name?: string;
  email?: string;
  company?: string;
  message?: string;
}): Promise<void> {
  const {
    name = 'Test User',
    email = 'test@example.com',
    company = 'Test Manufacturing Co.',
    message = 'I am interested in learning more about EKAS.'
  } = data;

  // Fill name field
  const nameField = page.locator('input[name="name"], input[type="text"]:visible').first();
  if (await nameField.isVisible()) {
    await nameField.fill(name);
  }

  // Fill email field
  const emailField = page.locator('input[name="email"], input[type="email"]:visible').first();
  if (await emailField.isVisible()) {
    await emailField.fill(email);
  }

  // Fill company field
  const companyField = page.locator('input[name="company"], input[name="organization"]:visible').first();
  if (await companyField.isVisible()) {
    await companyField.fill(company);
  }

  // Fill message/notes field
  const messageField = page.locator('textarea[name="message"], textarea[name="notes"]:visible').first();
  if (await messageField.isVisible()) {
    await messageField.fill(message);
  }
}

/**
 * Assert form validation works (required fields)
 */
export async function assertFormValidation(page: Page): Promise<void> {
  // Submit button should exist
  const submitButton = page.locator('button[type="submit"], button:has-text("Submit")').first();
  await expect(submitButton).toBeVisible();

  // Try to submit empty form (button may be disabled)
  const isDisabled = await submitButton.isDisabled();

  // If button is not disabled, clicking should trigger validation
  if (!isDisabled) {
    await submitButton.click();
    await page.waitForTimeout(500);

    // Check for validation messages
    const validationMessages = page.locator('[role="alert"], .error, .invalid-feedback');
    const count = await validationMessages.count();

    // Should have some validation feedback
    if (count === 0) {
      // Alternative: check for required fields with validation state
      const requiredFields = page.locator('input[required], textarea[required]');
      const requiredCount = await requiredFields.count();
      expect(requiredCount).toBeGreaterThan(0);
    }
  }
}

/**
 * Assert demo modal form fields are present
 */
export async function assertDemoFormFields(page: Page): Promise<void> {
  // Name field
  const nameField = page.locator('input[name="name"], input[type="text"]:visible, input[placeholder*="name" i]:visible').first();
  await expect(nameField).toBeVisible();

  // Email field
  const emailField = page.locator('input[name="email"], input[type="email"]:visible').first();
  await expect(emailField).toBeVisible();

  // Submit button
  const submitButton = page.locator('button[type="submit"], button:has-text("Submit")').first();
  await expect(submitButton).toBeVisible();
}

/**
 * Check if form can be submitted (validation passes)
 */
export async function canSubmitForm(page: Page): Promise<boolean> {
  const submitButton = page.locator('button[type="submit"]').first();

  if (!(await submitButton.isVisible())) {
    return false;
  }

  const isDisabled = await submitButton.isDisabled();
  return !isDisabled;
}

/**
 * Assert CTA button exists and is clickable
 */
export async function assertCTAButton(page: Page, buttonText: string): Promise<void> {
  const button = page.locator(`button:has-text("${buttonText}"), a:has-text("${buttonText}")`).first();

  await expect(button).toBeVisible();

  // Check if it's clickable (not disabled)
  const isDisabled = await button.isDisabled();
  expect(isDisabled).toBe(false);
}

/**
 * Click CTA and verify destination
 */
export async function clickCTAAndVerify(page: Page, buttonText: string, expectedUrl: string | RegExp): Promise<void> {
  const button = page.locator(`button:has-text("${buttonText}"), a:has-text("${buttonText}")`).first();

  await expect(button).toBeVisible();

  const href = await button.getAttribute('href');

  if (href) {
    // It's a link - verify href
    if (typeof expectedUrl === 'string') {
      expect(href).toContain(expectedUrl);
    } else {
      expect(href).toMatch(expectedUrl);
    }
  } else {
    // It's a button - click and verify navigation
    await button.click();
    await page.waitForLoadState('networkidle');

    if (typeof expectedUrl === 'string') {
      expect(page.url()).toContain(expectedUrl);
    } else {
      expect(page.url()).toMatch(expectedUrl);
    }
  }
}
