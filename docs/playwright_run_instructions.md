# Playwright Run Instructions
# EKAS Manufacturing Intelligence Platform

**Date:** 2026-04-16
**Project:** EKAS B2B Website (Next.js 15)
**Test Framework:** Playwright
**Node Version:** 18+ required

---

## Table of Contents

1. [Installation](#installation)
2. [Running Tests](#running-tests)
3. [Test Execution Modes](#test-execution-modes)
4. [Viewing Reports](#viewing-reports)
5. [Updating Visual Baselines](#updating-visual-baselines)
6. [Debugging Tests](#debugging-tests)
7. [Troubleshooting](#troubleshooting)
8. [CI/CD Integration](#cicd-integration)
9. [Best Practices](#best-practices)

---

## Installation

### Prerequisites

1. **Node.js 18+**
   ```bash
   node --version  # Should be v18.0.0 or higher
   ```

2. **npm or yarn**
   ```bash
   npm --version  # Should be 9.0.0 or higher
   ```

### Step 1: Install Dependencies

From the project root:

```bash
cd /home/pat/EKAS\ B2B\ website/ekas-nextjs

# Install all dependencies (including Playwright)
npm install
```

### Step 2: Install Playwright Browsers

Playwright requires browser binaries (Chromium, Firefox, WebKit). Install them:

```bash
# Install all browsers
npx playwright install

# Or install only Chromium (faster, recommended for first run)
npx playwright install chromium
```

### Step 3: Install axe-core Playwright

The accessibility tests require `@axe-core/playwright`:

```bash
npm install --save-dev @axe-core/playwright
```

### Step 4: Verify Installation

Run a simple test to verify everything is set up:

```bash
npx playwright test tests/smoke/all-routes.spec.ts --headed
```

If this runs successfully, you're ready to go!

---

## Running Tests

### Run All Tests (Full Suite)

**Command:**
```bash
npx playwright test
```

**What it does:**
- Runs all 14 spec files
- Runs on both `chromium-desktop` and `mobile-chrome` projects (if configured)
- Executes in parallel
- Generates HTML report in `playwright-report/`

**Estimated Time:** 8-12 minutes

**Output:**
```
Running 285 tests using 4 workers
  285 passed (10m 23s)

To open last HTML report run:
  npx playwright show-report
```

---

### Run Specific Test File

**Command:**
```bash
npx playwright test tests/smoke/all-routes.spec.ts
```

**Other examples:**
```bash
# Run footer tests
npx playwright test tests/footer/footer-links.spec.ts

# Run accessibility tests
npx playwright test tests/accessibility/axe-scans.spec.ts

# Run visual regression
npx playwright test tests/visual/baselines.spec.ts
```

---

### Run Tests in Headed Mode (See Browser)

**Command:**
```bash
npx playwright test --headed
```

**What it does:**
- Opens visible browser window
- You can watch tests execute
- Useful for debugging

---

### Run Tests in Debug Mode

**Command:**
```bash
npx playwright test --debug
```

**What it does:**
- Opens Playwright Inspector
- Pause before each action
- Step through tests line by line
- Inspect page state

**Recommended for:**
- Writing new tests
- Debugging failing tests
- Understanding test flow

---

### Run Single Test by Name

**Command:**
```bash
npx playwright test -g "Homepage loads successfully"
```

**What it does:**
- Runs only tests matching the pattern
- Use quotes for test names with spaces

**Examples:**
```bash
# Run all 404 tests
npx playwright test -g "404"

# Run all mobile tests
npx playwright test -g "mobile"

# Run specific solution page test
npx playwright test -g "Downtime Reduction"
```

---

## Test Execution Modes

### Mode 1: Fast Smoke Tests Only

**Purpose:** Quick validation of critical paths (CI/CD)
**Time:** 2-3 minutes

**Command:**
```bash
npx playwright test tests/smoke/
```

**What it tests:**
- All 26 routes load
- No console errors
- No placeholder content
- 404 page works

**When to use:**
- Before committing code
- Quick sanity check after changes
- CI pull request checks

---

### Mode 2: Category-Specific Tests

**Purpose:** Test specific feature areas

**Commands:**
```bash
# Navigation only
npx playwright test tests/navigation/

# Forms only
npx playwright test tests/forms/

# Accessibility only
npx playwright test tests/accessibility/

# Visual regression only
npx playwright test tests/visual/

# Responsive only
npx playwright test tests/responsive/

# Content checks only
npx playwright test tests/content/

# Metadata only
npx playwright test tests/metadata/

# Footer only
npx playwright test tests/footer/

# Solutions only
npx playwright test tests/solutions/
```

**When to use:**
- Working on specific feature
- Debugging category-specific issues
- Faster iteration during development

---

### Mode 3: Desktop Only

**Purpose:** Skip mobile tests for faster execution

**Command:**
```bash
npx playwright test --project=chromium-desktop
```

**Time:** 5-7 minutes

**When to use:**
- Desktop-focused development
- Don't need mobile validation
- Faster local testing

---

### Mode 4: Mobile Only

**Purpose:** Test mobile responsiveness only

**Command:**
```bash
npx playwright test --project=mobile-chrome
```

**Time:** 3-5 minutes

**When to use:**
- Mobile-focused development
- Responsive design testing
- Mobile-specific bugs

---

### Mode 5: Failed Tests Only (Retry)

**Purpose:** Re-run only tests that failed in last run

**Command:**
```bash
npx playwright test --last-failed
```

**When to use:**
- After fixing failing tests
- Quick verification of fixes
- Iterating on flaky tests

---

## Viewing Reports

### HTML Report

**Command:**
```bash
npx playwright show-report
```

**What it shows:**
- Pass/fail status for all tests
- Test duration
- Screenshots of failures
- Video recordings (if enabled)
- Detailed error messages
- Visual diff images

**Report Location:**
`playwright-report/index.html`

**Features:**
- Filter by status (passed, failed, flaky)
- Search tests by name
- View traces and screenshots
- Compare visual diffs

---

### JSON Report

**Purpose:** Machine-readable test results for CI/CD

**Command:**
```bash
cat test-results/results.json | jq
```

**Report Location:**
`test-results/results.json`

**When to use:**
- CI/CD integration
- Custom reporting dashboards
- Automated result parsing

---

### List Report (Terminal)

**Command:**
```bash
npx playwright test --reporter=list
```

**What it shows:**
- Real-time test execution in terminal
- Test names as they run
- Pass/fail status immediately

**When to use:**
- Watching tests run
- CI/CD logs
- Quick feedback

---

## Updating Visual Baselines

### When to Update Baselines

Update visual baselines when:
1. Design intentionally changed (new colors, fonts, spacing)
2. Content updated (new hero image, updated copy)
3. Layout refactored (component restructuring)
4. Playwright or Next.js version updated (rendering changes)

**DO NOT** update baselines blindly without reviewing diffs!

---

### Step 1: Run Visual Tests to See Diffs

```bash
npx playwright test tests/visual/
```

If visual tests fail, you'll see:
```
Error: Screenshot comparison failed:
  Expected: tests/visual/baselines.spec.ts-snapshots/homepage-chromium-desktop-linux.png
  Received: tests/visual/baselines.spec.ts-snapshots/homepage-chromium-desktop-linux-actual.png
  Diff: tests/visual/baselines.spec.ts-snapshots/homepage-chromium-desktop-linux-diff.png
```

---

### Step 2: Review Diffs

**Open HTML report to see visual diffs:**
```bash
npx playwright show-report
```

**Navigate to failed visual test and review:**
- Expected (baseline)
- Actual (new screenshot)
- Diff (highlighted differences)

**Ask yourself:**
- Is this diff intentional?
- Does it match design intent?
- Are there unintended regressions (color shifts, layout breaks)?

---

### Step 3: Update Baselines (if diffs are correct)

**Command:**
```bash
npx playwright test tests/visual/ --update-snapshots
```

**What it does:**
- Re-runs visual tests
- Replaces old baselines with new screenshots
- Commits new baselines to `tests/visual/baselines.spec.ts-snapshots/`

---

### Step 4: Commit Updated Baselines

```bash
git add tests/visual/baselines.spec.ts-snapshots/
git commit -m "Update visual baselines: [reason]"
```

**Example commit messages:**
```
Update visual baselines: new hero image
Update visual baselines: updated color scheme
Update visual baselines: Next.js 15 upgrade
```

---

### Update Specific Page Baseline

**Command:**
```bash
npx playwright test -g "homepage visual baseline" --update-snapshots
```

**When to use:**
- Only one page changed
- Don't want to update all baselines
- Iterating on specific page

---

## Debugging Tests

### Method 1: Playwright Inspector

**Command:**
```bash
npx playwright test --debug tests/forms/demo-modal.spec.ts
```

**Features:**
- Pause before each action
- Step through test line by line
- Inspect page DOM
- Execute commands in console
- Record new tests

**How to use:**
1. Test pauses at first action
2. Click "Step Over" to execute next line
3. Inspect page in browser
4. Click "Resume" to continue

---

### Method 2: Headed Mode with Slow Motion

**Command:**
```bash
npx playwright test --headed --slow-mo=1000 tests/navigation/
```

**What it does:**
- Opens visible browser
- Slows down each action by 1000ms
- Easy to see what's happening

**When to use:**
- Understanding test flow
- Presenting tests to team
- Recording test execution

---

### Method 3: Console Logging

**Add to test:**
```typescript
test('My test', async ({ page }) => {
  await page.goto('/');

  console.log('Current URL:', page.url());

  const h1Text = await page.locator('h1').textContent();
  console.log('H1 text:', h1Text);

  // ... rest of test
});
```

**View logs:**
```bash
npx playwright test tests/my-test.spec.ts --reporter=list
```

---

### Method 4: Screenshots on Failure

**Already enabled in `playwright.config.ts`:**
```typescript
use: {
  screenshot: 'only-on-failure',
}
```

**View screenshots:**
```bash
npx playwright show-report
```

Screenshots are saved in `test-results/` folder.

---

### Method 5: Pause Test Execution

**Add to test:**
```typescript
test('My test', async ({ page }) => {
  await page.goto('/');

  await page.pause(); // Test pauses here

  // ... rest of test
});
```

**What it does:**
- Opens Playwright Inspector
- Test execution pauses
- You can inspect page, execute commands

---

## Troubleshooting

### Issue: "Error: Browser not found"

**Cause:** Playwright browsers not installed

**Solution:**
```bash
npx playwright install
```

---

### Issue: "Error: baseURL is not set"

**Cause:** Development server not running

**Solution:**
1. **Option A:** Let Playwright start dev server (already configured)
   ```bash
   npx playwright test  # Will auto-start dev server
   ```

2. **Option B:** Start dev server manually
   ```bash
   # Terminal 1
   npm run dev

   # Terminal 2
   npx playwright test
   ```

---

### Issue: "Timeout exceeded"

**Cause:** Page taking too long to load

**Solutions:**

1. **Increase timeout:**
   ```bash
   npx playwright test --timeout=60000  # 60 seconds
   ```

2. **Check dev server is running:**
   ```bash
   curl http://localhost:3000
   ```

3. **Check network:**
   - Slow internet?
   - VPN interfering?
   - CDN resources blocked?

---

### Issue: "Visual regression test failed but images look identical"

**Cause:** Platform-specific rendering differences (Linux vs Mac)

**Solutions:**

1. **Update baselines on your platform:**
   ```bash
   npx playwright test tests/visual/ --update-snapshots
   ```

2. **Use higher diff tolerance:**
   Edit `tests/visual/baselines.spec.ts`:
   ```typescript
   maxDiffPixels: 200  // Increase from 100
   ```

---

### Issue: "axe-core errors: module not found"

**Cause:** `@axe-core/playwright` not installed

**Solution:**
```bash
npm install --save-dev @axe-core/playwright
```

---

### Issue: "Test passed locally but failed in CI"

**Causes and Solutions:**

1. **Different viewport sizes:**
   - CI may use different screen resolution
   - Update baselines in CI environment

2. **Network timeouts:**
   - CI may have slower network
   - Increase timeout in CI config

3. **Font rendering differences:**
   - CI may use different fonts
   - Disable font-dependent visual tests in CI

---

### Issue: "Flaky tests (pass sometimes, fail sometimes)"

**Causes and Solutions:**

1. **Animation timing:**
   - Add `await page.waitForTimeout(500)` after animations
   - Use `waitForLoadState('networkidle')`

2. **Network race conditions:**
   - Use `waitForResponse()` to wait for specific requests
   - Increase network timeout

3. **Async content loading:**
   - Wait for specific elements: `await expect(element).toBeVisible()`
   - Don't use fixed timeouts

---

## CI/CD Integration

### GitHub Actions Example

Create `.github/workflows/playwright.yml`:

```yaml
name: Playwright Tests

on:
  push:
    branches: [main, staging]
  pull_request:
    branches: [main]

jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: 18

      - name: Install dependencies
        run: npm ci

      - name: Install Playwright Browsers
        run: npx playwright install --with-deps

      - name: Run Playwright tests
        run: npx playwright test

      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
          retention-days: 30
```

---

### Running Tests on Specific Events

**On Pull Request (Smoke Tests Only):**
```yaml
- name: Run smoke tests
  run: npx playwright test tests/smoke/
```

**On Push to Main (Full Suite):**
```yaml
- name: Run full test suite
  run: npx playwright test
```

**Nightly Regression (Scheduled):**
```yaml
on:
  schedule:
    - cron: '0 2 * * *'  # 2 AM daily
```

---

### Environment Variables in CI

**Set BASE_URL for production testing:**
```yaml
- name: Run tests against production
  run: npx playwright test
  env:
    BASE_URL: https://ekas.adaptivefactory.net
```

**Disable video recording in CI (save space):**
```yaml
- name: Run tests
  run: npx playwright test
  env:
    PW_VIDEO: false
```

---

## Best Practices

### 1. Run Tests Before Committing

```bash
# Quick smoke test
npx playwright test tests/smoke/

# If smoke passes, commit
git commit -m "Your changes"
```

---

### 2. Update Baselines Carefully

**Always review diffs before updating:**
```bash
# Run visual tests
npx playwright test tests/visual/

# Review diffs in HTML report
npx playwright show-report

# Only update if diffs are intentional
npx playwright test tests/visual/ --update-snapshots
```

---

### 3. Use Headed Mode for Debugging

```bash
# See what's happening
npx playwright test --headed --slow-mo=500 tests/forms/
```

---

### 4. Test on Multiple Browsers Locally

```bash
# Test on all projects
npx playwright test --project=chromium-desktop --project=mobile-chrome
```

---

### 5. Keep Tests Fast

- Use `test.describe.configure({ mode: 'parallel' })` for parallelization
- Avoid unnecessary `waitForTimeout()` (use `waitForSelector()` instead)
- Run only relevant tests during development

---

### 6. Monitor Test Duration

```bash
# See slowest tests
npx playwright test --reporter=list | grep "ms"
```

Optimize tests that take > 30 seconds.

---

### 7. Clean Up Test Artifacts

```bash
# Remove old test results
rm -rf test-results/ playwright-report/

# Remove old screenshots
rm -rf tests/**/*-actual.png tests/**/*-diff.png
```

---

## Quick Reference

```bash
# Installation
npm install
npx playwright install

# Run all tests
npx playwright test

# Run specific file
npx playwright test tests/smoke/all-routes.spec.ts

# Run with UI
npx playwright test --ui

# Debug mode
npx playwright test --debug

# Headed mode
npx playwright test --headed

# Update visual baselines
npx playwright test tests/visual/ --update-snapshots

# View report
npx playwright show-report

# Run by pattern
npx playwright test -g "404"

# Desktop only
npx playwright test --project=chromium-desktop

# Mobile only
npx playwright test --project=mobile-chrome
```

---

## Support and Resources

**Playwright Documentation:**
- https://playwright.dev/

**axe-core Documentation:**
- https://github.com/dequelabs/axe-core-npm/tree/develop/packages/playwright

**EKAS Test Documentation:**
- `/docs/playwright_test_strategy.md`
- `/docs/playwright_test_coverage_report.md`
- `/docs/playwright_test_inventory.md`
- `/docs/playwright_known_limitations.md`

**Questions?**
Contact: pat@adaptivefactory.net

---

**End of Run Instructions**
