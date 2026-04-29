import { defineConfig, devices } from '@playwright/test';

/**
 * EKAS B2B Website — Playwright Configuration
 *
 * Dual-target: BASE_URL controls whether tests hit local dev or live.
 *   - Local default: http://localhost:3001
 *   - Live: BASE_URL=https://adaptivefactory.ai
 *
 * The webServer block only fires when BASE_URL is unset (legacy `npm test`
 * compat). The dual-target QA scripts always set BASE_URL explicitly, so
 * Playwright will not race against an operator-managed dev server.
 *
 * Four breakpoint projects: 375 (mobile), 768 (tablet portrait),
 * 1024 (small laptop), 1440 (desktop). Existing chromium-desktop and
 * mobile-chrome projects are preserved for backward compatibility with
 * pre-existing specs in tests/{accessibility, navigation, ...}.
 */

const BASE_URL = process.env.BASE_URL || 'http://localhost:3001';
const isLive = BASE_URL.startsWith('https://');

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  // Retries: 1 local, 2 live (network flakiness on live targets).
  retries: process.env.CI ? 2 : (isLive ? 2 : 1),

  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { outputFolder: isLive ? 'playwright-report-live' : 'playwright-report-local', open: 'never' }],
    ['list'],
    ['json', { outputFile: isLive ? 'test-results/results-live.json' : 'test-results/results-local.json' }],
  ],

  use: {
    baseURL: BASE_URL,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  projects: [
    // Pre-existing projects — preserved so legacy specs continue to run.
    {
      name: 'chromium-desktop',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
        deviceScaleFactor: 1,
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 375, height: 667 },
      },
    },

    // QA-suite breakpoint projects.
    {
      name: 'mobile-375',
      use: { ...devices['Desktop Chrome'], viewport: { width: 375, height: 667 } },
    },
    {
      name: 'tablet-768',
      use: { ...devices['Desktop Chrome'], viewport: { width: 768, height: 1024 } },
    },
    {
      name: 'laptop-1024',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1024, height: 768 } },
    },
    {
      name: 'desktop-1440',
      use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } },
    },
  ],

  // Auto-start dev server only when BASE_URL is unset (legacy `npm test`).
  // Dual-target QA scripts always set BASE_URL, so this is skipped for them.
  webServer: process.env.BASE_URL
    ? undefined
    : {
        command: 'npm run dev',
        url: 'http://localhost:3000',
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        stdout: 'ignore',
        stderr: 'pipe',
      },
});
