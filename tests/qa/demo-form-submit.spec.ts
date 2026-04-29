/**
 * Suite 6 — Real demo-form submission through the SES+S3 pipeline.
 *
 * IMPORTANT: this test submits a REAL entry through /api/demo-request,
 * which dispatches via AWS SES. Retries are disabled to guarantee
 * exactly ONE real submission per target run (so the operator can match
 * one entry in the inbox per target).
 *
 * The wired form is the modal opened from the nav "Request a Demo"
 * button (DemoRequestModal). The /demo page form is a non-wired stub
 * that only console.logs — see findings report. This test deliberately
 * targets the modal.
 *
 * Modal fields:  firstName, lastName, email, company, jobTitle.
 * (No role/challenge fields on the modal; prompt-specified Role maps
 * to Job Title; Challenge has no field and is logged to test output.)
 */
import { test, expect } from '@playwright/test';

// Force exactly one submission — never retry SES sends.
test.describe.configure({ retries: 0 });

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';

const FIELDS = {
  firstName: 'Playwright',
  lastName: 'QA Test',
  email: 'pat+playwright-qa@adaptivefactory.net',
  company: 'QA Test Run',
  jobTitle: 'Automated Test',
};

test('submit one real demo form entry through SES+S3 pipeline', async ({ page }) => {
  test.setTimeout(60_000);

  const isLive = BASE_URL.startsWith('https://');
  const timestamp = new Date().toISOString();

  // Open the modal from any page that loads the nav.
  await page.goto('/');
  const navDemoButton = page.getByRole('button', { name: /request.*demo/i }).first();
  await expect(navDemoButton).toBeVisible();
  await navDemoButton.click();

  const modal = page.getByRole('dialog');
  await expect(modal, 'Demo modal did not open').toBeVisible({ timeout: 5_000 });

  await modal.getByLabel(/first.?name/i).fill(FIELDS.firstName);
  await modal.getByLabel(/last.?name/i).fill(FIELDS.lastName);
  await modal.getByLabel(/email/i).fill(FIELDS.email);
  await modal.getByLabel(/company/i).fill(FIELDS.company);
  await modal.getByLabel(/job.?title/i).fill(FIELDS.jobTitle);

  const challenge = `Automated test submission from Playwright QA suite. Generated ${timestamp} against ${BASE_URL}. Safe to delete.`;

  console.log(`[demo-form-submit] Target: ${BASE_URL} (${isLive ? 'live — will produce real email' : 'local — SES likely unavailable'})`);
  console.log(`[demo-form-submit] Submitting at ${timestamp}`);
  console.log(`[demo-form-submit] Identifier: ${FIELDS.email}`);
  console.log(`[demo-form-submit] (intended challenge note, no field on modal: ${challenge})`);

  // Capture the actual API response so we can distinguish "form is wired"
  // from "form submission succeeded server-side."
  const apiResponsePromise = page.waitForResponse(
    (resp) => resp.url().includes('/api/demo-request') && resp.request().method() === 'POST',
    { timeout: 30_000 },
  );

  const submit = modal.locator('button[type="submit"]').first();
  await expect(submit).toBeVisible();
  await submit.click();

  const apiResponse = await apiResponsePromise;
  const apiStatus = apiResponse.status();
  let apiBody: unknown = null;
  try { apiBody = await apiResponse.json(); } catch { /* ignore */ }
  console.log(`[demo-form-submit] API responded ${apiStatus}: ${JSON.stringify(apiBody)}`);

  if (isLive) {
    // Live: must see real success.
    expect(apiStatus, 'Live SES+S3 pipeline did not return 200').toBe(200);
    const success = modal.getByText(/request received/i);
    await expect(success, 'Success state not visible after live submit').toBeVisible({ timeout: 10_000 });
    console.log(`[demo-form-submit] Live success: real email dispatched to ${FIELDS.email}.`);
  } else {
    // Local: form must be wired; we only require that /api/demo-request
    // was reached and produced a structured response (200 OR 4xx/5xx with
    // an error body — both prove the form posts correctly). Local boxes
    // typically lack SES credentials, so an HTTP 500 here is expected.
    expect(
      [200, 400, 401, 403, 500, 502, 503].includes(apiStatus),
      `Local API call returned unexpected status ${apiStatus}`,
    ).toBe(true);

    const success = modal.getByText(/request received/i);
    const errorRegion = modal.getByText(/submission failed|please email pat/i);
    await expect(
      success.or(errorRegion).first(),
      'Neither success nor error state appeared after local submit',
    ).toBeVisible({ timeout: 10_000 });
    console.log(`[demo-form-submit] Local: form wiring confirmed (API ${apiStatus}, UI rendered ${apiStatus === 200 ? 'success' : 'error'} state).`);
  }
});
