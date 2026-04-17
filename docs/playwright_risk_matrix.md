# Playwright Risk Matrix - EKAS Manufacturing Intelligence Platform

## Document Overview

This document identifies, categorizes, and prioritizes all testable risks for the EKAS B2B manufacturing intelligence website. Risks are organized by category (route/link integrity, forms/CTAs, visual regression, accessibility, SEO/metadata, content quality, responsive design, console/network) with severity ratings and corresponding test coverage strategies.

**Version:** 1.0
**Last Updated:** 2026-04-16
**Total Risk Categories:** 9
**Technology Stack:** Next.js 15.1.0 + React 18.3.1 + TypeScript 5.8.3
**Deployment Status:** Production-approved, pre-deployment testing

---

## Risk Severity Definitions

### P0 (Critical - Blocking)
- **Impact:** Breaks core user journey, damages brand trust, prevents conversions
- **Examples:** Broken routes, broken demo CTA, placeholder content visible, competitor brand leakage
- **Test Requirement:** 100% test coverage, zero failures allowed in deployment
- **Business Impact:** Lost sales opportunities, reputational damage, unprofessional appearance

### P1 (High - Non-Blocking with Review)
- **Impact:** Degrades user experience, reduces SEO effectiveness, creates accessibility barriers
- **Examples:** Missing metadata, accessibility violations, visual regressions, mobile overflow
- **Test Requirement:** Comprehensive coverage, < 5% failures acceptable if documented
- **Business Impact:** Reduced search visibility, accessibility compliance risk, UX friction

### P2 (Standard - Acceptable with Documentation)
- **Impact:** Minor quality issues, nice-to-have improvements, non-critical warnings
- **Examples:** Minor console warnings, asset optimization, content variations
- **Test Requirement:** Sample coverage, < 20% failures acceptable
- **Business Impact:** Minimal user impact, internal quality standards

---

## 1. Route and Link Integrity Risks

### Route Load Failures

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Homepage (/) fails to load | **P0** | Very Low | Catastrophic | Deployment error, DNS issue, build failure | Deep test, HTTP 200 assertion |
| Solution hub (/solutions) fails to load | **P0** | Very Low | Critical | Routing config error, build issue | Deep test, HTTP 200 assertion |
| Platform hub (/platform) fails to load | **P0** | Very Low | Critical | Routing config error, build issue | Deep test, HTTP 200 assertion |
| Demo page (/demo) fails to load | **P0** | Very Low | Critical | Primary conversion path broken | Deep test, HTTP 200 assertion |
| Security page (/security) fails to load | **P0** | Low | High | Trust page unavailable, compliance concern | Deep test, HTTP 200 assertion |
| Solution detail pages fail to load (5 routes) | **P0** | Low | High | Dynamic routing error, missing content | Deep test all 5, HTTP 200 assertion |
| Industry detail pages fail to load (5 routes) | **P1** | Low | Medium | Less critical paths, but still customer-facing | Medium/smoke test, HTTP 200 |
| About/Resources pages fail to load | **P1** | Very Low | Medium | Supporting content, lower traffic | Medium test, HTTP 200 assertion |

**Mitigation Strategy:**
- Test all 26 routes for HTTP 200 status
- Monitor build process for route generation errors
- Validate Next.js dynamic routing configuration
- Test both static and dynamic routes

**Test Implementation:**
```typescript
const routes = [
  '/', '/platform', '/solutions', '/industries', '/roles', '/security', '/demo',
  '/solutions/downtime-reduction', '/solutions/capacity-throughput', // ... all 26
];

routes.forEach(route => {
  test(`Route ${route} loads successfully`, async ({ page }) => {
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
  });
});
```

---

### Solution Hub Card Self-Reference Bug

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Solution hub card links to /solutions (self) instead of /solutions/downtime-reduction | **P0** | Low (recently fixed) | High | Component prop error, href misconfiguration | Deep test with explicit href assertions |

**Historical Context:**
- This bug was previously discovered and fixed
- High risk of regression during refactoring
- Breaks primary navigation pattern (hub → detail)

**Test Implementation:**
```typescript
test('Solution hub cards do not self-reference', async ({ page }) => {
  await page.goto('/solutions');

  // Verify 5 solution cards present
  const cards = page.locator('[data-testid="solution-card"]');
  await expect(cards).toHaveCount(5);

  // Assert each card has unique href (NOT /solutions)
  const downtimeHref = await page.locator('a:has-text("Downtime Reduction")').getAttribute('href');
  expect(downtimeHref).toBe('/solutions/downtime-reduction');
  expect(downtimeHref).not.toBe('/solutions');

  const capacityHref = await page.locator('a:has-text("Capacity")').getAttribute('href');
  expect(capacityHref).toBe('/solutions/capacity-throughput');
  expect(capacityHref).not.toBe('/solutions');

  // Repeat for all 5 solution cards
});
```

---

### Footer Link Failures (27 Links)

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Footer link returns 404 | **P0** | Low | High | Route renamed/removed, typo in href | Test all 27 footer links for 200 status |
| Footer link points to external 404 | **P0** | Very Low | High | External dependency broken | Test external links (if any) |
| Footer inconsistent across pages | **P1** | Low | Medium | Component not properly shared | Verify footer on 3+ sample pages |

**Footer Link Inventory:**
- 18 standard route links (platform, solutions, company, resources sections)
- 9 anchor links to /roles and /security sections

**Test Implementation:**
```typescript
test('All footer links return 200 status', async ({ page }) => {
  await page.goto('/');

  const footerLinks = page.locator('footer a[href^="/"]');
  const count = await footerLinks.count();

  for (let i = 0; i < count; i++) {
    const href = await footerLinks.nth(i).getAttribute('href');

    if (!href.includes('#')) {
      // Standard route link
      const response = await page.goto(href);
      expect(response?.status()).toBe(200);
    }
  }
});
```

---

### Anchor Link Scroll Failures (9 Links)

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Anchor link does not scroll to target section | **P1** | Medium | Medium | Missing ID on target section, smooth scroll conflict | Test all 9 anchor links for viewport visibility |
| Anchor link URL does not include hash | **P1** | Low | Low | Router configuration error | Verify URL contains hash after navigation |
| Target section does not exist | **P0** | Very Low | High | Content removed, ID changed | Verify target element exists |

**Anchor Link Inventory:**
- /roles#plant-managers
- /roles#operations-leaders
- /roles#manufacturing-engineering
- /roles#quality-leaders
- /roles#finance-leaders
- /roles#executive-operations
- /security#governance
- /security#data-handling
- /security#architecture

**Test Implementation:**
```typescript
const anchorLinks = [
  { url: '/roles#plant-managers', sectionId: 'plant-managers' },
  { url: '/roles#operations-leaders', sectionId: 'operations-leaders' },
  // ... all 9 anchor links
];

anchorLinks.forEach(({ url, sectionId }) => {
  test(`Anchor link ${url} scrolls to section`, async ({ page }) => {
    await page.goto(url);

    // Verify URL contains hash
    expect(page.url()).toContain(`#${sectionId}`);

    // Verify section scrolled into viewport
    const section = page.locator(`#${sectionId}`);
    await expect(section).toBeInViewport();
  });
});
```

---

### 404 Page Non-Functional

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Unknown route shows default Next.js error instead of branded 404 | **P1** | Low | Medium | Custom 404 page not configured | Test unknown route, assert branded content |
| 404 page has broken navigation (no recovery path) | **P1** | Low | Medium | 404 page missing nav/footer | Verify nav/footer present on 404 |
| 404 page has console errors | **P0** | Low | High | Error in 404 page component | Console monitoring on 404 page |

**Test Implementation:**
```typescript
test('404 page renders branded error', async ({ page }) => {
  const response = await page.goto('/this-route-does-not-exist');

  expect(response?.status()).toBe(404);
  await expect(page.locator('h1')).toContainText(/404|Page Not Found/i);
  await expect(page).toHaveTitle(/404.*EKAS/i);

  // Verify recovery link
  await expect(page.locator('a:has-text("Return to Homepage")')).toHaveAttribute('href', '/');
});
```

---

## 2. Footer and Navigation Risks

### Desktop Navigation Failures

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Main nav menu does not render | **P0** | Very Low | Catastrophic | Component error, CSS issue | Verify nav visible on all pages |
| Nav link broken (404) | **P0** | Low | Critical | Route renamed, typo | Test all nav links for 200 status |
| Nav link inconsistent across pages | **P1** | Low | Medium | Nav not shared component | Sample 3+ pages, verify nav consistency |
| Dropdown/mega menu broken (if applicable) | **P1** | Low | Medium | JavaScript error, hover state | Test dropdown interaction |

**Test Implementation:**
```typescript
test('Main navigation renders on all pages', async ({ page }) => {
  const testRoutes = ['/', '/platform', '/solutions', '/demo'];

  for (const route of testRoutes) {
    await page.goto(route);
    await expect(page.locator('nav')).toBeVisible();

    // Verify key nav links present
    await expect(page.locator('nav a:has-text("Platform")')).toBeVisible();
    await expect(page.locator('nav a:has-text("Solutions")')).toBeVisible();
  }
});
```

---

### Mobile Navigation Failures

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Hamburger menu does not open | **P0** | Low | Critical | JavaScript error, event handler broken | Mobile test, click hamburger, verify drawer opens |
| Mobile nav drawer does not close | **P0** | Low | High | Close button broken, click-outside broken | Mobile test, verify close methods |
| Mobile nav links broken | **P0** | Low | Critical | Links not clickable in drawer | Mobile test, click nav link, verify navigation |
| Mobile nav obscures content | **P1** | Low | Medium | Z-index issue, fixed positioning | Visual regression on mobile |

**Test Implementation:**
```typescript
test.describe('Mobile navigation', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Hamburger menu opens and closes', async ({ page }) => {
    await page.goto('/');

    // Verify hamburger visible
    const hamburger = page.locator('[aria-label="Open menu"]'); // or data-testid
    await expect(hamburger).toBeVisible();

    // Open menu
    await hamburger.click();
    const drawer = page.locator('[role="dialog"]'); // or nav drawer selector
    await expect(drawer).toBeVisible();

    // Verify nav links in drawer
    await expect(drawer.locator('a:has-text("Platform")')).toBeVisible();

    // Close menu
    await page.locator('[aria-label="Close menu"]').click();
    await expect(drawer).not.toBeVisible();
  });
});
```

---

### CTA Link Inconsistency

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Primary CTA points to wrong destination | **P0** | Low | Critical | Href misconfigured | Test all primary CTAs for correct href |
| CTA text inconsistent ("Request Demo" vs "Schedule Demo") | **P1** | Medium | Low | Copy variation | Content assertion on key pages |
| CTA not clickable (disabled, covered) | **P0** | Low | High | CSS z-index, button disabled | Click test on all CTAs |

**Test Implementation:**
```typescript
test('Primary CTAs link correctly', async ({ page }) => {
  await page.goto('/');

  const demoCTA = page.locator('button:has-text("Request a Demo")');
  await expect(demoCTA).toBeVisible();
  await expect(demoCTA).toBeEnabled();

  // Verify CTA action (opens modal)
  await demoCTA.click();
  await expect(page.locator('[role="dialog"]')).toBeVisible();
});
```

---

## 3. Form and CTA Interaction Risks

### Demo Modal Failures

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Demo CTA does not open modal | **P0** | Low | Critical | Event handler broken, modal component error | Click test, verify modal visible |
| Modal does not close (Escape, click outside, close button) | **P0** | Low | High | Event handlers broken | Test all close methods |
| Modal form fields missing | **P0** | Very Low | Critical | Form component error | Verify all fields present |
| Modal submit button always disabled | **P0** | Low | Critical | Validation logic broken | Fill form, verify submit enabled |
| Modal overlays entire page (z-index) | **P1** | Low | Medium | CSS issue | Visual regression, verify overlay |

**Test Implementation:**
```typescript
test('Demo modal opens, validates, and closes', async ({ page }) => {
  await page.goto('/');

  // Open modal
  await page.click('button:has-text("Request a Demo")');
  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible();

  // Verify fields
  await expect(modal.locator('input[name="name"]')).toBeVisible();
  await expect(modal.locator('input[name="email"]')).toBeVisible();

  // Verify submit disabled initially
  const submitBtn = modal.locator('button[type="submit"]');
  await expect(submitBtn).toBeDisabled();

  // Fill form
  await modal.locator('input[name="name"]').fill('Test User');
  await modal.locator('input[name="email"]').fill('test@example.com');
  await expect(submitBtn).toBeEnabled();

  // Close with Escape
  await page.keyboard.press('Escape');
  await expect(modal).not.toBeVisible();
});
```

---

### Form Validation Failures

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Email field accepts invalid email | **P1** | Low | Medium | Validation regex broken | Test invalid email formats |
| Required fields not enforced | **P1** | Low | Medium | Validation logic missing | Submit empty form, verify error |
| Form submits without validation | **P0** | Very Low | High | Submit handler bypasses validation | Test submit with invalid data |
| Error messages not displayed | **P1** | Low | Medium | Error state not rendered | Trigger error, verify message visible |

**Test Implementation:**
```typescript
test('Form validation enforces required fields', async ({ page }) => {
  await page.goto('/demo');

  const submitBtn = page.locator('button[type="submit"]');
  await expect(submitBtn).toBeDisabled();

  // Fill name only (email required)
  await page.fill('input[name="name"]', 'Test User');
  await expect(submitBtn).toBeDisabled();

  // Fill invalid email
  await page.fill('input[name="email"]', 'invalid-email');
  await expect(submitBtn).toBeDisabled(); // should still be disabled

  // Fill valid email
  await page.fill('input[name="email"]', 'test@example.com');
  await expect(submitBtn).toBeEnabled();
});
```

---

### Form Submission Failures (Out of Scope for E2E)

| Risk | Severity | Test Coverage | Mitigation |
|------|----------|---------------|------------|
| Backend endpoint returns 500 error | **P0** | Out of scope (requires live backend) | Manual testing, integration tests |
| Email not sent to recipient | **P1** | Out of scope (requires email service) | Manual testing, email service monitoring |
| Form data not saved to CRM | **P1** | Out of scope (requires CRM integration) | Manual testing, CRM webhook monitoring |

**E2E Scope:**
- Verify form fields render
- Verify validation logic
- Verify submit button enabled when valid
- **Do NOT test actual backend submission** (stub/mock or skip)

---

### CTA Dead Link

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| CTA button links to 404 route | **P0** | Low | Critical | Href typo, route removed | Test all CTA hrefs for 200 status |
| CTA button links to external 404 | **P0** | Very Low | Critical | External resource moved/removed | Test external CTA links |

**Test Implementation:**
```typescript
test('All CTA links are valid', async ({ page }) => {
  await page.goto('/');

  const ctas = page.locator('a.cta-button'); // or appropriate selector
  const count = await ctas.count();

  for (let i = 0; i < count; i++) {
    const href = await ctas.nth(i).getAttribute('href');
    if (href?.startsWith('/')) {
      const response = await page.goto(href);
      expect(response?.status()).toBe(200);
    }
  }
});
```

---

## 4. Visual Regression Risks

### Layout Breakage Undetected

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| CSS change breaks homepage layout | **P1** | Medium | High | Refactor, dependency update, CSS conflict | Full-page screenshot baseline |
| Hub page card grid breaks | **P1** | Medium | High | Flexbox/grid CSS change | Full-page screenshot baseline |
| Solution detail page layout shifts | **P1** | Low | Medium | Content change, CSS update | Full-page screenshot baseline |
| Footer layout breaks | **P1** | Low | Medium | CSS change, responsive breakpoint | Footer region screenshot |

**Test Implementation:**
```typescript
test('Homepage visual regression', async ({ page }) => {
  await page.goto('/');
  await page.waitForLoadState('networkidle');

  await expect(page).toHaveScreenshot('homepage-desktop.png', {
    fullPage: true,
    maxDiffPixels: 100,
  });
});
```

**Visual Baseline Coverage:**
- Homepage (/, desktop + mobile)
- All 4 hub pages (desktop + mobile)
- All 5 solution detail pages (desktop)
- Security page (desktop)
- Demo page (desktop)
- 404 page (desktop)

---

### Mobile Responsive Overflow

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Horizontal overflow on mobile (scrollbar) | **P1** | Medium | Medium | Fixed-width element, large image | Mobile viewport test, check scrollWidth |
| Content cut off on mobile | **P1** | Medium | Medium | Insufficient padding, absolute positioning | Mobile visual baseline |
| Touch targets too small (< 48px) | **P1** | Low | Medium | Button/link sizing | Accessibility scan (touch target size) |

**Test Implementation:**
```typescript
test.describe('Mobile responsive tests', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('No horizontal overflow on mobile homepage', async ({ page }) => {
    await page.goto('/');

    const scrollWidth = await page.evaluate(() => document.body.scrollWidth);
    const clientWidth = await page.evaluate(() => document.body.clientWidth);

    expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
  });
});
```

---

### Dark Theme Regression

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Dark theme colors change unexpectedly | **P1** | Low | Medium | CSS variable update, theme config change | Visual baseline (inherent in screenshots) |
| Contrast insufficient after color change | **P1** | Low | High | Theme color adjusted without contrast check | Accessibility scan (color contrast) |
| Light theme leakage in dark mode | **P1** | Very Low | Medium | Component not using theme variables | Visual baseline comparison |

**Mitigation:**
- Visual regression baselines capture current dark theme
- Accessibility scans validate contrast ratios
- Manual review of theme changes before baseline update

---

## 5. Accessibility Risks

### Critical WCAG Violations

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Images missing alt text | **P1** | Low | High | Developer oversight, dynamic images | axe-core scan (detects missing alt) |
| Insufficient color contrast (< 4.5:1) | **P1** | Low | High | Design choice, theme color change | axe-core scan (contrast check) |
| Form inputs missing labels | **P1** | Low | High | Developer oversight, ARIA labels missing | axe-core scan (form label check) |
| Missing page title | **P0** | Very Low | Critical | Meta tag missing, SEO impact | Metadata test (title assertion) |
| Missing language attribute (html lang="en") | **P1** | Very Low | Medium | HTML boilerplate missing | axe-core scan (language check) |

**Test Implementation:**
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('Homepage accessibility (WCAG AA)', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);

  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
    rules: {
      // Enforce critical rules
      'color-contrast': { enabled: true },
      'image-alt': { enabled: true },
      'label': { enabled: true },
    },
  });
});
```

---

### Keyboard Navigation Broken

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Nav links not keyboard-accessible | **P2** | Very Low | Medium | Non-semantic HTML (div instead of a) | Keyboard nav spot check |
| Modal focus trap broken (can tab out) | **P1** | Low | Medium | Focus management logic missing | Modal keyboard test |
| No visible focus indicators | **P1** | Low | High | CSS removes outline, no custom focus style | axe-core scan + visual check |
| Tab order illogical | **P2** | Low | Low | DOM order does not match visual order | Manual keyboard nav test |

**Test Implementation (Manual Spot Check):**
```typescript
test('Demo modal traps focus', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("Request a Demo")');

  const modal = page.locator('[role="dialog"]');
  await expect(modal).toBeVisible();

  // Tab through modal elements
  await page.keyboard.press('Tab');
  const focusedElement = await page.locator(':focus');

  // Verify focus is within modal
  const isInsideModal = await modal.locator(':focus').count() > 0;
  expect(isInsideModal).toBe(true);
});
```

---

### Missing Alt Text

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Decorative images have unnecessary alt text | **P2** | Low | Low | Developer adds alt="" when should be alt="" | axe-core best practices (informational) |
| Informative images missing alt text | **P1** | Low | High | Developer oversight | axe-core scan (critical violation) |
| Logo missing alt text | **P1** | Very Low | High | SVG logo without title/aria-label | axe-core scan |

**Mitigation:**
- axe-core automatically detects missing alt text (critical violation)
- Review all images in baseline screenshots
- Establish alt text guidelines in component library

---

## 6. SEO and Metadata Risks

### Missing Page Titles

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Page title tag missing | **P1** | Low | High | Next.js Head component missing, SEO impact | Test all routes for title presence |
| Page title is "undefined" or default | **P1** | Low | High | Variable not interpolated | Assert title content is meaningful |
| Title too long (> 60 characters) | **P2** | Low | Low | SEO best practice violation | Assert title length |

**Test Implementation:**
```typescript
const routes = ['/', '/platform', '/solutions', /* all 26 routes */];

routes.forEach(route => {
  test(`Route ${route} has page title`, async ({ page }) => {
    await page.goto(route);
    const title = await page.title();

    expect(title).toBeTruthy();
    expect(title).not.toBe('undefined');
    expect(title).toContain('EKAS'); // or brand name
    expect(title.length).toBeLessThan(70); // SEO best practice
  });
});
```

---

### Duplicate Page Titles

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Multiple pages share same title | **P1** | Medium | Medium | Copy-paste error, template not updated | Collect all titles, assert uniqueness |
| Title does not match page content | **P1** | Low | Medium | Title template error | Manual review + test H1 correlation |

**Test Implementation:**
```typescript
test('All page titles are unique', async ({ page }) => {
  const routes = ['/', '/platform', '/solutions', /* all 26 */];
  const titles = [];

  for (const route of routes) {
    await page.goto(route);
    const title = await page.title();
    titles.push({ route, title });
  }

  // Check for duplicates
  const titleSet = new Set(titles.map(t => t.title));
  expect(titleSet.size).toBe(titles.length); // All unique
});
```

---

### Missing H1

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Page missing H1 heading | **P1** | Low | High | Content structure error, SEO/a11y impact | Test all routes for H1 presence |
| Multiple H1 tags on page | **P1** | Low | Medium | HTML structure error (should be one H1) | Test H1 count = 1 |
| H1 is empty or placeholder | **P0** | Very Low | High | Template error, content missing | Assert H1 text is meaningful |

**Test Implementation:**
```typescript
test('Homepage has single, meaningful H1', async ({ page }) => {
  await page.goto('/');

  const h1Elements = page.locator('h1');
  await expect(h1Elements).toHaveCount(1);

  const h1Text = await h1Elements.textContent();
  expect(h1Text).toBeTruthy();
  expect(h1Text).not.toMatch(/lorem ipsum|coming soon|placeholder/i);
});
```

---

### Missing Meta Descriptions

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Meta description missing | **P1** | Low | Medium | Next.js Head missing meta tag, SEO impact | Test all routes for meta description |
| Meta description too short (< 120 chars) | **P2** | Low | Low | SEO best practice | Assert description length |
| Meta description duplicate across pages | **P1** | Low | Medium | Template reuse | Collect all descriptions, check uniqueness |

**Test Implementation:**
```typescript
test('Homepage has meta description', async ({ page }) => {
  await page.goto('/');

  const description = await page.locator('meta[name="description"]').getAttribute('content');
  expect(description).toBeTruthy();
  expect(description.length).toBeGreaterThan(100); // SEO best practice
});
```

---

## 7. Content Quality and Sanity Risks

### Placeholder Content Visible

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| "Lorem ipsum" text visible on production site | **P0** | Very Low | Catastrophic | Content not finalized, deployment oversight | Regex scan all routes for "lorem ipsum" |
| "Coming soon" or "TBD" visible | **P0** | Low | Critical | Incomplete content deployment | Regex scan for "coming soon", "TBD" |
| "[Placeholder]" or "[TODO]" visible | **P0** | Very Low | Critical | Developer placeholder not removed | Regex scan for bracket patterns |
| "Dummy text" or "Sample content" | **P0** | Very Low | Critical | Test content not replaced | Regex scan for common placeholder terms |

**Test Implementation:**
```typescript
const placeholderPatterns = [
  /lorem ipsum/i,
  /\bcoming soon\b/i,
  /\bTBD\b/,
  /\bplaceholder\b/i,
  /\[.*?\]/,  // [TODO], [Content here], etc.
  /dummy text/i,
  /sample content/i,
];

const routes = ['/', '/platform', '/solutions', /* all 26 */];

routes.forEach(route => {
  test(`Route ${route} has no placeholder content`, async ({ page }) => {
    await page.goto(route);
    const bodyText = await page.textContent('body');

    for (const pattern of placeholderPatterns) {
      expect(bodyText).not.toMatch(pattern);
    }
  });
});
```

---

### Competitor Brand Leakage

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| "MachineMetrics" visible on site | **P0** | Very Low | Catastrophic | Copy-paste from old content, rebrand incomplete | Regex scan all routes for "MachineMetrics" |
| Other competitor brand names visible | **P0** | Very Low | Critical | Comparison content not removed | Regex scan for competitor brands |

**Competitor Brands to Detect:**
- MachineMetrics (primary concern - previous brand)
- Sight Machine
- Plex Systems
- (Add others as needed)

**Test Implementation:**
```typescript
const competitorBrands = [
  /MachineMetrics/i,
  /Sight Machine/i,
  /Plex Systems/i,
];

routes.forEach(route => {
  test(`Route ${route} has no competitor brand leakage`, async ({ page }) => {
    await page.goto(route);
    const bodyText = await page.textContent('body');

    for (const brand of competitorBrands) {
      expect(bodyText).not.toMatch(brand);
    }
  });
});
```

---

### Email Inconsistency

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Multiple email addresses used (not standardized) | **P1** | Low | Medium | Copy-paste error, old email not updated | Extract all emails, assert all match pat@adaptivefactory.net |
| Email typo (e.g., pat@adaptivefacotry.net) | **P1** | Very Low | High | Typo in email field | Regex validation of all emails |

**Test Implementation:**
```typescript
test('Email consistency across site', async ({ page }) => {
  const routes = ['/', '/platform', '/demo', '/about', '/security'];
  const standardEmail = 'pat@adaptivefactory.net';

  for (const route of routes) {
    await page.goto(route);
    const bodyText = await page.textContent('body');

    // Extract all email addresses
    const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
    const emails = bodyText.match(emailPattern) || [];

    for (const email of emails) {
      expect(email.toLowerCase()).toBe(standardEmail);
    }
  }
});
```

---

### Manufacturing Terminology Accuracy

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| IATF 16949 misspelled or referenced incorrectly | **P2** | Low | Low | Typo, copy error | Grep for "IATF", manual review |
| OEE terminology misused | **P2** | Low | Low | Content error | Manual review (out of E2E scope) |
| "Governed metrics" inconsistent usage | **P1** | Low | Medium | Copy variation | Grep for "governed metric", standardize |

**Mitigation:**
- E2E tests can detect spelling via regex
- Domain expertise review required for technical accuracy
- Establish glossary of approved terms

---

## 8. Responsive Design Risks

### Horizontal Overflow on Mobile

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Fixed-width element causes horizontal scroll | **P1** | Medium | Medium | CSS width: 1200px instead of max-width | Mobile viewport test, check scrollWidth |
| Large image not responsive | **P1** | Low | Medium | Image without max-width: 100% | Mobile visual baseline |
| Table overflow on mobile | **P1** | Low | Medium | Data table without horizontal scroll | Mobile test + visual check |

**Test Implementation:**
```typescript
test.describe('Mobile overflow tests', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  const routes = ['/', '/platform', '/solutions', '/demo'];

  routes.forEach(route => {
    test(`No horizontal overflow on ${route}`, async ({ page }) => {
      await page.goto(route);

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);

      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1); // +1 for rounding
    });
  });
});
```

---

### Mobile Navigation Broken

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Hamburger menu not visible on mobile | **P0** | Low | Critical | CSS media query error, display: none | Mobile test, verify hamburger visible |
| Mobile nav drawer does not open | **P0** | Low | Critical | JavaScript error, event handler | Mobile test, click hamburger, verify drawer |
| Mobile nav links not tappable (too small) | **P1** | Low | Medium | Touch target < 48x48px | Accessibility scan (touch target size) |

**Covered in Navigation Risks (Section 2) with mobile-specific tests.**

---

### Forms Unusable on Mobile

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Input fields too small on mobile | **P1** | Low | Medium | Font size < 16px (causes zoom on iOS) | Mobile visual baseline |
| Submit button off-screen or cut off | **P1** | Low | High | Fixed positioning error | Mobile form test, verify submit visible |
| Form validation messages overlap fields | **P1** | Low | Medium | Absolute positioning error | Mobile form test + visual |

**Test Implementation:**
```typescript
test.describe('Mobile form usability', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('Demo form usable on mobile', async ({ page }) => {
    await page.goto('/demo');

    // Verify all form fields visible
    await expect(page.locator('input[name="name"]')).toBeVisible();
    await expect(page.locator('input[name="email"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();

    // Verify submit button in viewport (not cut off)
    await expect(page.locator('button[type="submit"]')).toBeInViewport();
  });
});
```

---

## 9. Console and Network Risks

### Uncaught JavaScript Errors

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Uncaught error on homepage | **P0** | Low | Critical | JavaScript bug, React error | Console monitoring on / |
| Uncaught error on demo page | **P0** | Low | Critical | Form submission error, validation bug | Console monitoring on /demo |
| Uncaught error on solution pages | **P0** | Low | High | Component error, data fetch error | Console monitoring on all solution pages |
| Non-critical errors on low-traffic pages | **P1** | Low | Medium | Edge case error | Console monitoring on sample pages |

**Test Implementation:**
```typescript
test('No console errors on homepage', async ({ page }) => {
  const consoleErrors = [];

  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  expect(consoleErrors).toHaveLength(0);
});
```

---

### Failed Asset Requests

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| Image 404 (broken image on page) | **P1** | Low | Medium | Image path typo, image deleted | Network monitoring, filter 404s |
| Font 404 (fallback font renders) | **P1** | Low | Medium | Font path error, CDN issue | Network monitoring |
| CSS 404 (unstyled content) | **P0** | Very Low | Catastrophic | Build error, deployment issue | Network monitoring, critical asset |
| JavaScript 404 (site broken) | **P0** | Very Low | Catastrophic | Build error, deployment issue | Network monitoring, critical asset |

**Test Implementation:**
```typescript
test('No failed asset requests on homepage', async ({ page }) => {
  const failedRequests = [];

  page.on('response', response => {
    if (!response.ok() && response.status() !== 304) { // Ignore cache hits
      failedRequests.push({
        url: response.url(),
        status: response.status(),
      });
    }
  });

  await page.goto('/');
  await page.waitForLoadState('networkidle');

  // Filter out acceptable failures (e.g., optional analytics)
  const criticalFailures = failedRequests.filter(req => {
    return !req.url.includes('analytics') && !req.url.includes('tracking');
  });

  expect(criticalFailures).toHaveLength(0);
});
```

---

### CORS Errors

| Risk | Severity | Likelihood | Impact | Root Cause | Test Coverage |
|------|----------|------------|--------|------------|---------------|
| CORS error loading external resource | **P1** | Low | Medium | External API misconfigured, CDN error | Console monitoring for CORS messages |
| CORS error on font/image CDN | **P1** | Low | Medium | CDN CORS headers missing | Network monitoring |

**Mitigation:**
- Console monitoring detects CORS errors
- Ensure external resources have proper CORS headers
- Test with production-like environment

---

## Risk Prioritization Matrix

### P0 Risks: Zero Tolerance (Must Fix Before Deployment)

| Risk | Category | Test Coverage |
|------|----------|---------------|
| Any route returns non-200 status | Route Integrity | All 26 routes tested |
| Solution hub card self-reference | Navigation | Explicit href assertions |
| Footer link 404 | Navigation | All 27 footer links tested |
| Placeholder content visible | Content Quality | Regex scan all routes |
| Competitor brand leakage | Content Quality | Regex scan all routes |
| Demo CTA broken | Forms/CTAs | Modal open/close tests |
| Missing page title | SEO/Metadata | All routes tested |
| Uncaught error on critical pages | Console/Network | Console monitoring (/, /demo, /solutions, /platform) |
| Mobile nav broken | Navigation | Mobile hamburger test |
| 404 page shows default error | Route Integrity | 404 test with branded assertion |

**Deployment Gate:** Zero P0 failures allowed.

---

### P1 Risks: < 5% Tolerance (Non-Blocking with Review)

| Risk | Category | Test Coverage |
|------|----------|---------------|
| Visual regression on key pages | Visual | Full-page screenshots (homepage, hubs) |
| Critical accessibility violations | Accessibility | axe-core scans (missing alt, contrast) |
| Missing meta description | SEO/Metadata | All routes tested |
| Duplicate page titles | SEO/Metadata | Uniqueness test |
| Horizontal overflow mobile | Responsive | Mobile viewport tests |
| Anchor link scroll failure | Navigation | 9 anchor links tested |
| Email inconsistency | Content Quality | Email extraction and validation |
| Failed asset requests | Console/Network | Network monitoring |

**Deployment Gate:** < 5% P1 failures acceptable if documented and scheduled for fix.

---

### P2 Risks: < 20% Tolerance (Acceptable with Documentation)

| Risk | Category | Test Coverage |
|------|----------|---------------|
| Minor console warnings | Console/Network | Console monitoring (warnings only) |
| Keyboard nav tab order | Accessibility | Manual spot checks |
| Content variation from spec | Content Quality | Sample content assertions |
| SEO best practice deviations | SEO/Metadata | Title length, description length |
| Manufacturing terminology accuracy | Content Quality | Manual domain expert review |

**Deployment Gate:** < 20% P2 failures acceptable; document and prioritize in backlog.

---

## Risk Mitigation Summary

### High-Impact Risk Mitigation

**Route Integrity:**
- Test all 26 routes for HTTP 200 status
- Test solution hub card hrefs explicitly (prevent self-reference)
- Test all 27 footer links for 200 status
- Test all 9 anchor links for scroll behavior
- Test 404 error page for branded rendering

**Content Quality:**
- Regex scan all routes for placeholder content (lorem ipsum, coming soon, TBD)
- Regex scan all routes for competitor brand leakage (MachineMetrics, etc.)
- Extract and validate email consistency (pat@adaptivefactory.net)

**Forms and Conversion:**
- Test demo modal open/close/validation on all CTA pages
- Test form field presence and validation logic
- Test CTA link destinations (all primary CTAs)

**Visual and Responsive:**
- Full-page screenshot baselines for homepage, hubs, solution pages
- Mobile viewport tests for overflow, nav, forms
- Visual diff threshold: maxDiffPixels 100

**Accessibility:**
- axe-core scans on all page types (homepage, hubs, detail pages, forms)
- WCAG 2.1 AA baseline (missing alt, contrast, labels)
- Keyboard navigation spot checks (nav, modals, forms)

**SEO and Metadata:**
- Test all routes for page title presence, uniqueness
- Test all routes for meta description presence
- Test all routes for H1 presence (single, meaningful)

**Console and Network:**
- Monitor console errors on all critical routes (/, /demo, /solutions, /platform)
- Monitor network requests for failed assets (404s, CORS errors)
- Zero tolerance for uncaught errors on critical paths

---

## Continuous Risk Assessment

### Monthly Review

**Risk Re-Evaluation:**
- Review test failure trends (which risks are actualizing?)
- Update likelihood ratings based on historical data
- Add new risks as features/content added

**Test Coverage Adjustment:**
- Promote high-actualizing risks to stricter coverage (P1 → P0)
- Demote low-actualizing risks to lighter coverage (P1 → P2)
- Add new test cases for emerging risks

### Post-Deployment Validation

**Production Smoke Test:**
- Re-run P0 test suite against production URL
- Verify all routes return 200
- Verify no console errors on critical pages
- Verify demo modal functional

**Incident Review:**
- If production issue occurs, add corresponding test to prevent recurrence
- Update risk likelihood ratings based on actual incidents

---

## Conclusion

This risk matrix identifies 50+ distinct risks across 9 categories (route/link integrity, navigation, forms/CTAs, visual regression, accessibility, SEO/metadata, content quality, responsive design, console/network). Risks are prioritized P0 (zero tolerance), P1 (< 5% tolerance), and P2 (< 20% tolerance) with corresponding test coverage strategies.

**Key Risk Areas:**
1. **P0 (Blocking):** Route integrity, placeholder content, brand leakage, demo CTA, mobile nav, console errors
2. **P1 (High Priority):** Visual regression, accessibility, metadata, responsive, anchor links
3. **P2 (Standard):** Minor warnings, content variations, SEO best practices

**Test Suite Coverage:**
- 26/26 routes tested for integrity
- 27/27 footer links validated
- 9/9 anchor links scroll-tested
- 5/5 solution hub cards link-verified
- Full visual regression baselines (15+ pages)
- Comprehensive accessibility scans (axe-core on all page types)
- Console/network monitoring on all critical paths

**Next Steps:**
1. Review test strategy and route inventory documents
2. Implement Phase 1 test suite based on this risk matrix
3. Establish baseline screenshots and accessibility benchmarks
4. Execute pre-deployment validation
5. Monitor post-deployment and update risk matrix based on actuals

---

**Document Maintenance:**
- Update when new features/routes added
- Update when incidents occur in production
- Update when test coverage expanded
- Review quarterly for risk re-evaluation
