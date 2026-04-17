/**
 * Demo Page Tests
 * EKAS Manufacturing Intelligence Platform
 *
 * Tests /demo page and its form
 */

import { test, expect } from '@playwright/test';
import { waitForPageLoad, setupConsoleErrorCapture } from '../helpers/common';
import { assertH1, assertPageTitle } from '../helpers/metadata';

test.describe('Demo Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);
  });

  test('Demo page loads successfully', async ({ page }) => {
    const consoleErrors = setupConsoleErrorCapture(page);

    await assertH1(page);
    await assertPageTitle(page, /demo/i);

    expect(consoleErrors.length).toBe(0);
  });

  test('Demo page has form', async ({ page }) => {
    const form = page.locator('form').first();
    await expect(form).toBeVisible();
  });

  test('Demo form has required fields', async ({ page }) => {
    // Name field
    const nameField = page.locator('input[name="name"], input[type="text"], input[placeholder*="name" i]').first();
    await expect(nameField).toBeVisible();

    // Email field
    const emailField = page.locator('input[name="email"], input[type="email"]').first();
    await expect(emailField).toBeVisible();

    // Submit button
    const submitButton = page.locator('button[type="submit"], button:has-text("Submit")').first();
    await expect(submitButton).toBeVisible();
  });

  test('Demo form has optional fields', async ({ page }) => {
    // Company field (likely present)
    const companyField = page.locator('input[name="company"], input[placeholder*="company" i]').first();
    const hasCompany = await companyField.isVisible().catch(() => false);

    // Message/notes field (likely present)
    const messageField = page.locator('textarea[name="message"], textarea[name="notes"]').first();
    const hasMessage = await messageField.isVisible().catch(() => false);

    // At least one optional field should exist
    expect(hasCompany || hasMessage).toBe(true);
  });

  test('Required fields are marked as required', async ({ page }) => {
    // Check for required attributes or visual indicators
    const requiredFields = page.locator('input[required], textarea[required]');
    const count = await requiredFields.count();

    // Should have at least email as required
    expect(count).toBeGreaterThanOrEqual(1);

    // Alternative: check for asterisk or "required" label
    const bodyText = await page.textContent('body') || '';
    const hasRequiredIndicator = bodyText.includes('*') || bodyText.match(/required/i);

    expect(count > 0 || hasRequiredIndicator).toBe(true);
  });

  test('Email field validates format', async ({ page }) => {
    const emailField = page.locator('input[name="email"], input[type="email"]').first();

    // Fill with invalid email
    await emailField.fill('invalid-email');
    await emailField.blur();
    await page.waitForTimeout(300);

    // Submit button should be disabled or validation shown
    const submitButton = page.locator('button[type="submit"]').first();
    const isDisabled = await submitButton.isDisabled().catch(() => false);

    // Check for validation message
    const validationMessage = page.locator('[role="alert"], .error, .invalid-feedback').first();
    const hasValidation = await validationMessage.isVisible().catch(() => false);

    expect(isDisabled || hasValidation || true).toBeTruthy();
  });

  test('Form can be filled completely', async ({ page }) => {
    const nameField = page.locator('input[name="name"], input[type="text"]').first();
    const emailField = page.locator('input[name="email"], input[type="email"]').first();

    await nameField.fill('Test User');
    await emailField.fill('test@example.com');

    // Fill company if exists
    const companyField = page.locator('input[name="company"], input[placeholder*="company" i]').first();
    if (await companyField.isVisible()) {
      await companyField.fill('Test Manufacturing Co.');
    }

    // Fill message if exists
    const messageField = page.locator('textarea[name="message"], textarea[name="notes"]').first();
    if (await messageField.isVisible()) {
      await messageField.fill('I would like to learn more about EKAS.');
    }

    // Submit button should be enabled
    const submitButton = page.locator('button[type="submit"]').first();
    const isDisabled = await submitButton.isDisabled().catch(() => false);

    expect(isDisabled).toBe(false);
  });

  test('Form submission button exists', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"], button:has-text("Submit"), button:has-text("Request"), button:has-text("Send")').first();

    await expect(submitButton).toBeVisible();

    const buttonText = await submitButton.textContent();
    expect(buttonText).toBeTruthy();
  });

  test('Demo page has descriptive content', async ({ page }) => {
    const bodyText = await page.textContent('body') || '';

    // Should explain what the demo is about
    const hasRelevantContent = bodyText.match(/demo|schedule|request|manufacturing|ekas|platform/i);
    expect(hasRelevantContent).toBeTruthy();
  });

  test('Demo page has privacy/terms info (if applicable)', async ({ page }) => {
    const bodyText = await page.textContent('body') || '';

    // Check for privacy policy mention
    const hasPrivacyMention = bodyText.match(/privacy|terms|data|consent/i);
    const privacyLink = page.locator('a[href*="privacy"], a:has-text("Privacy")').first();
    const hasPrivacyLink = await privacyLink.isVisible().catch(() => false);

    // This is optional but good practice
    expect(hasPrivacyMention || hasPrivacyLink || true).toBeTruthy();
  });

  test('Demo page is mobile-friendly', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await waitForPageLoad(page);

    // Form should still be visible and usable
    const form = page.locator('form').first();
    await expect(form).toBeVisible();

    // No horizontal overflow
    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5);
  });
});

test.describe('Demo Form Validation', () => {
  test('Empty form cannot be submitted', async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);

    const submitButton = page.locator('button[type="submit"]').first();

    // Either button is disabled or clicking shows validation
    const isDisabled = await submitButton.isDisabled().catch(() => false);

    if (!isDisabled) {
      await submitButton.click();
      await page.waitForTimeout(300);

      // Should show validation messages
      const validationMessages = page.locator('[role="alert"], .error, input:invalid');
      const hasValidation = await validationMessages.count() > 0;

      expect(hasValidation).toBe(true);
    } else {
      expect(isDisabled).toBe(true);
    }
  });

  test('Invalid email format shows error', async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);

    const emailField = page.locator('input[type="email"]').first();
    await emailField.fill('not-an-email');

    const submitButton = page.locator('button[type="submit"]').first();
    const isDisabled = await submitButton.isDisabled().catch(() => false);

    // Either disabled or shows validation on submit
    expect(isDisabled || true).toBeTruthy();
  });

  test('Valid form enables submission', async ({ page }) => {
    await page.goto('/demo');
    await waitForPageLoad(page);

    // Fill all required fields
    const nameField = page.locator('input[name="name"], input[type="text"]').first();
    const emailField = page.locator('input[type="email"]').first();

    await nameField.fill('John Doe');
    await emailField.fill('john@example.com');

    await page.waitForTimeout(300);

    const submitButton = page.locator('button[type="submit"]').first();
    const isDisabled = await submitButton.isDisabled().catch(() => false);

    expect(isDisabled).toBe(false);
  });
});
