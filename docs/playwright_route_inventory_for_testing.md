# Playwright Route Inventory for Testing - EKAS Manufacturing Intelligence

## Document Overview

This document provides a comprehensive inventory of all routes, links, and navigation elements on the EKAS B2B manufacturing intelligence website, classified by testing priority and depth. This inventory drives test coverage planning and prioritization.

**Version:** 1.0
**Last Updated:** 2026-04-16
**Total Routes:** 26 public routes
**Total Footer Links:** 27 (18 standard + 9 anchor links)
**Solution Hub Cards:** 5
**Technology Stack:** Next.js 15.1.0 + React 18.3.1 + TypeScript 5.8.3

---

## Route Classification Table

### Complete Route Inventory (26 Routes)

| Route | Type | Priority | Test Depth | Visual Baseline | Accessibility Scan | Rationale |
|-------|------|----------|------------|-----------------|-------------------|-----------|
| `/` | Homepage | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Entry point, critical first impression, hero messaging, primary CTA |
| `/platform` | Hub Page | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Main platform positioning, feature overview, core value prop |
| `/platform/manufacturing-intelligence` | Platform Detail | **P0** | **Deep** | Yes (Desktop) | Yes | Core product capability, governed metrics differentiation |
| `/platform/ai-assistant` | Platform Detail | **P0** | **Deep** | Yes (Desktop) | Yes | Key innovation feature, AI positioning |
| `/platform/data-connections` | Platform Detail | **P0** | **Deep** | Yes (Desktop) | Yes | Integration capabilities, technical credibility |
| `/platform/reporting-analytics` | Platform Detail | **P1** | Medium | No | Yes | Supporting feature, standard analytics positioning |
| `/solutions` | Hub Page | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Problem-first navigation, business value framing, hub card integrity critical |
| `/solutions/downtime-reduction` | Solution Detail | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | High-value use case, operational efficiency ROI |
| `/solutions/capacity-throughput` | Solution Detail | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | High-value use case, production optimization |
| `/solutions/scrap-quality-visibility` | Solution Detail | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | High-value use case, quality/waste reduction |
| `/solutions/cost-driver-analysis` | Solution Detail | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | CFO/finance audience, cost visibility |
| `/solutions/multi-site-performance` | Solution Detail | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Enterprise use case, scalability positioning |
| `/industries` | Hub Page | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Industry vertical targeting, domain expertise demonstration |
| `/industries/aerospace` | Industry Detail | **P1** | Medium | Yes (Desktop) | Yes | High-value vertical (IATF 16949, AS9100 compliance context) |
| `/industries/automotive` | Industry Detail | **P1** | Medium | No | Sample | High-volume vertical, IATF 16949 reference |
| `/industries/medical-devices` | Industry Detail | **P1** | Medium | No | Sample | Regulated vertical, quality/traceability focus |
| `/industries/metal-stamping` | Industry Detail | **P2** | Smoke | No | Sample | Specialized vertical, less traffic |
| `/industries/industrial-manufacturing` | Industry Detail | **P2** | Smoke | No | Sample | Generic vertical, catch-all category |
| `/roles` | Hub Page | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Role-based messaging, persona targeting, anchor link testing critical |
| `/security` | Security/Trust | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Trust/compliance page, IATF/ISO references, data governance, anchor links |
| `/demo` | Conversion Page | **P0** | **Deep** | Yes (Desktop + Mobile) | Yes | Primary conversion path, demo modal functionality critical |
| `/about` | Company Info | **P1** | Medium | No | Yes | Company credibility, team positioning |
| `/about/founder` | Team Detail | **P1** | Medium | Yes (Desktop) | Yes | Founder credibility, personal story, trust-building |
| `/resources` | Hub Page | **P1** | Medium | No | Yes | Content hub, future resource library |
| `/resources/faqs` | FAQ Page | **P1** | Medium | No | Yes | Common questions, support/sales enablement |
| `[unknown-route]` | 404 Error | **P0** | **Deep** | Yes (Desktop) | Yes | Error handling, branded recovery, UX fallback |

---

## Test Depth Definitions

### Deep Test Coverage

**Applied To:**
- Homepage (/)
- All hub pages (4): /platform, /solutions, /industries, /roles
- All solution detail pages (5)
- Top platform detail pages (3): manufacturing-intelligence, ai-assistant, data-connections
- Security page
- Demo page
- 404 error page

**Deep Test Includes:**
1. **Route Integrity:**
   - HTTP 200 status code
   - Page loads without errors
   - No unexpected redirects

2. **Content Assertions:**
   - H1 tag present and matches expected content
   - Key section headings rendered (H2/H3)
   - Specific content snippets verified (e.g., "governed metrics", "data provenance")
   - No placeholder content (regex: "lorem ipsum", "coming soon", "TBD", "placeholder")
   - No competitor brand leakage (regex: "MachineMetrics", "Sight Machine")

3. **Metadata Validation:**
   - Page title present, unique, follows format (e.g., "Page Name | EKAS")
   - Meta description present (120-160 characters)
   - Open Graph tags present (og:title, og:description, og:image)
   - H1 matches or complements page title

4. **Navigation Validation:**
   - Main nav visible and functional
   - Footer present and consistent
   - Breadcrumbs present (if applicable)

5. **Visual Regression:**
   - Full-page screenshot comparison (desktop 1920x1080)
   - Mobile screenshot comparison (375x667) for critical pages
   - Diff threshold: maxDiffPixels 100

6. **Accessibility:**
   - axe-core full scan
   - Zero critical violations (missing alt, contrast, labels)
   - Keyboard navigation spot check (where applicable)

7. **Console/Network Monitoring:**
   - Zero uncaught JavaScript errors
   - Zero failed network requests
   - No 404 asset requests

8. **Interaction Testing (where applicable):**
   - CTA buttons clickable
   - Modals open/close
   - Forms render properly

---

### Medium Test Coverage

**Applied To:**
- /platform/reporting-analytics
- /about
- /about/founder
- /resources
- /resources/faqs
- Top 2-3 industry detail pages (aerospace, automotive, medical-devices)

**Medium Test Includes:**
1. **Route Integrity:**
   - HTTP 200 status code
   - Page loads without errors

2. **Content Assertions:**
   - H1 tag present
   - No placeholder content (regex detection)
   - No brand leakage

3. **Metadata Validation:**
   - Page title present and unique
   - Meta description present

4. **Accessibility:**
   - axe-core scan on sample pages (not all)
   - Zero critical violations

5. **Console Monitoring:**
   - Zero uncaught errors

6. **Visual Regression:**
   - Optional (only on select pages like /about/founder)

**Not Included:**
- Detailed content assertions (specific section headings)
- Mobile visual regression
- Network request monitoring
- Interaction testing

---

### Smoke Test Coverage

**Applied To:**
- /industries/metal-stamping
- /industries/industrial-manufacturing

**Smoke Test Includes:**
1. **Route Integrity:**
   - HTTP 200 status code
   - Page renders without fatal errors

2. **Basic Content:**
   - H1 tag exists
   - Page title exists

3. **Console Check:**
   - No uncaught errors (fatal only)

**Not Included:**
- Content assertions
- Metadata validation
- Accessibility scans
- Visual regression
- Network monitoring

**Rationale:** These are lower-traffic industry verticals; full coverage not critical for Phase 1. Validates they load correctly without deep assertions.

---

## Hub Page Special Considerations

### Hub Pages (4 Total)

Hub pages are navigation nexuses with cards/links to detail pages. They require special attention to prevent self-reference bugs (e.g., solution hub card linking to /solutions instead of /solutions/downtime-reduction).

| Hub Page | Cards/Links | Special Tests |
|----------|-------------|---------------|
| `/solutions` | 5 solution cards | **Critical:** Verify each card links to correct solution detail page (not self-reference). Assert all 5 cards visible. |
| `/platform` | 4 platform feature cards | Verify each card links to correct platform detail page. Assert all 4 cards visible. |
| `/industries` | 5 industry cards | Verify each card links to correct industry detail page. Assert all 5 cards visible. |
| `/roles` | 6 role sections with anchor links | Verify anchor links from footer scroll to correct role section. Assert all 6 role sections rendered. |

**Hub Card Link Integrity Test (Critical for /solutions):**

```typescript
test('Solutions hub cards link correctly', async ({ page }) => {
  await page.goto('/solutions');

  // Verify 5 cards present
  const cards = page.locator('[data-testid="solution-card"]'); // or appropriate selector
  await expect(cards).toHaveCount(5);

  // Verify each card has unique href (not /solutions)
  const downtimeCard = page.locator('a:has-text("Downtime Reduction")');
  await expect(downtimeCard).toHaveAttribute('href', '/solutions/downtime-reduction');

  const capacityCard = page.locator('a:has-text("Capacity & Throughput")');
  await expect(capacityCard).toHaveAttribute('href', '/solutions/capacity-throughput');

  // ... repeat for all 5 solutions
});
```

---

## Anchor Link Inventory (9 Total)

Anchor links are footer links to specific sections on /roles and /security pages. They require scroll-to-section validation.

### Roles Page Anchor Links (6)

| Anchor Link | Target Section | Scroll Test |
|-------------|----------------|-------------|
| `/roles#plant-managers` | Plant Managers section | Verify URL includes hash, verify section scrolled into view |
| `/roles#operations-leaders` | Operations Leaders section | Verify URL includes hash, verify section scrolled into view |
| `/roles#manufacturing-engineering` | Manufacturing Engineering section | Verify URL includes hash, verify section scrolled into view |
| `/roles#quality-leaders` | Quality Leaders section | Verify URL includes hash, verify section scrolled into view |
| `/roles#finance-leaders` | Finance Leaders section | Verify URL includes hash, verify section scrolled into view |
| `/roles#executive-operations` | Executive Operations section | Verify URL includes hash, verify section scrolled into view |

### Security Page Anchor Links (3)

| Anchor Link | Target Section | Scroll Test |
|-------------|----------------|-------------|
| `/security#governance` | Governance & Compliance section | Verify URL includes hash, verify section scrolled into view |
| `/security#data-handling` | Data Handling section | Verify URL includes hash, verify section scrolled into view |
| `/security#architecture` | Architecture & Infrastructure section | Verify URL includes hash, verify section scrolled into view |

**Anchor Link Test Pattern:**

```typescript
test('Roles anchor links scroll correctly', async ({ page }) => {
  await page.goto('/roles#plant-managers');

  // Verify URL contains hash
  expect(page.url()).toContain('#plant-managers');

  // Verify section is in viewport (scrolled to)
  const section = page.locator('#plant-managers'); // or [data-section="plant-managers"]
  await expect(section).toBeInViewport();

  // Verify section header visible
  const heading = section.locator('h2');
  await expect(heading).toContainText('Plant Managers');
});
```

---

## Footer Link Inventory (27 Total)

### Standard Footer Links (18)

These are traditional navigation links to routes.

**Platform Section (5):**
- /platform
- /platform/manufacturing-intelligence
- /platform/ai-assistant
- /platform/data-connections
- /platform/reporting-analytics

**Solutions Section (6):**
- /solutions
- /solutions/downtime-reduction
- /solutions/capacity-throughput
- /solutions/scrap-quality-visibility
- /solutions/cost-driver-analysis
- /solutions/multi-site-performance

**Company Section (4):**
- /about
- /about/founder
- /security
- /demo

**Resources Section (2):**
- /resources
- /resources/faqs

**Legal Section (1):**
- (Assumed: /privacy or /terms if implemented, else N/A)

### Anchor Links in Footer (9)

- /roles#plant-managers
- /roles#operations-leaders
- /roles#manufacturing-engineering
- /roles#quality-leaders
- /roles#finance-leaders
- /roles#executive-operations
- /security#governance
- /security#data-handling
- /security#architecture

### Footer Test Strategy

**Test:** Iterate through all 27 footer links, verify each returns 200 status (or scrolls to section for anchor links).

```typescript
test('All footer links are valid', async ({ page }) => {
  await page.goto('/');

  const footerLinks = page.locator('footer a[href^="/"]'); // all internal links
  const linkCount = await footerLinks.count();

  expect(linkCount).toBeGreaterThanOrEqual(27); // may include duplicates/extras

  for (let i = 0; i < linkCount; i++) {
    const link = footerLinks.nth(i);
    const href = await link.getAttribute('href');

    if (href.includes('#')) {
      // Anchor link - verify target section exists
      await page.goto(href);
      expect(page.url()).toContain('#');
      // Additional: verify section in viewport
    } else {
      // Standard link - verify 200 status
      const response = await page.goto(href);
      expect(response?.status()).toBe(200);
    }
  }
});
```

---

## 404 Error Page Testing

### 404 Page Requirements

**Route:** Any unknown route (e.g., `/this-page-does-not-exist`)

**Test Coverage (Deep):**
1. **Route Behavior:**
   - Returns HTTP 404 status
   - Renders branded 404 page (not default Next.js error)

2. **Content Requirements:**
   - Page title: "404 - Page Not Found | EKAS" (or similar)
   - H1: "Page Not Found" or "404 Error"
   - User-friendly message explaining error
   - Recovery navigation (e.g., "Return to Homepage" link)

3. **Navigation:**
   - Main nav still functional
   - Footer still present
   - "Return to Homepage" link functional

4. **Metadata:**
   - Proper title tag (prevents "undefined" or default)
   - Meta robots: "noindex, nofollow" (prevent search indexing)

5. **Console/Network:**
   - No additional errors on 404 page itself
   - 404 page assets load successfully (CSS, JS)

6. **Visual Regression:**
   - Baseline screenshot of 404 page (ensures branded design)

**404 Test Pattern:**

```typescript
test('404 page renders correctly', async ({ page }) => {
  const response = await page.goto('/this-page-does-not-exist');

  // Verify 404 status
  expect(response?.status()).toBe(404);

  // Verify branded 404 page (not default)
  await expect(page.locator('h1')).toContainText(/404|Page Not Found/i);

  // Verify recovery link
  const homeLink = page.locator('a:has-text("Return to Homepage")');
  await expect(homeLink).toHaveAttribute('href', '/');

  // Verify page title
  await expect(page).toHaveTitle(/404.*EKAS/i);

  // Verify no additional console errors
  const consoleErrors = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  await page.waitForLoadState('networkidle');
  expect(consoleErrors).toHaveLength(0);
});
```

---

## CTA and Conversion Path Inventory

### Primary CTAs (By Page)

| Page | CTA Text | CTA Action | Test Priority |
|------|----------|------------|---------------|
| Homepage | "Request a Demo" | Opens demo modal | **P0** |
| Homepage | "Explore Platform" | Navigate to /platform | **P0** |
| /platform | "See It In Action" | Opens demo modal | **P0** |
| /solutions | "Explore Solutions" | Scroll to solution cards | **P1** |
| All solution detail pages | "Schedule a Demo" | Opens demo modal | **P0** |
| /demo | "Request Demo" (form submit) | Submit demo form | **P0** (validate form, stub submit) |
| /industries | "Learn More" (per industry) | Navigate to industry detail | **P1** |
| /security | "Contact Security Team" | Opens contact modal or mailto | **P1** |

### Demo Modal Testing (Critical P0)

**Test Coverage:**
1. **Modal Open/Close:**
   - CTA button triggers modal open
   - Modal overlay visible
   - Escape key closes modal
   - Click outside closes modal
   - Close button closes modal

2. **Form Fields:**
   - Name field present and required
   - Email field present and required
   - Company field present
   - Message/notes field present
   - Submit button present

3. **Form Validation:**
   - Email field validates format
   - Required fields enforced
   - Submit button disabled until valid

4. **Form Submission (Simulated):**
   - Submit button clickable when valid
   - Form submission triggers loading state
   - **Note:** Actual backend submission out of scope; verify button/form behavior only

**Demo Modal Test Pattern:**

```typescript
test('Demo modal opens and closes', async ({ page }) => {
  await page.goto('/');

  // Open modal
  await page.click('button:has-text("Request a Demo")');
  await expect(page.locator('[role="dialog"]')).toBeVisible();

  // Verify form fields
  await expect(page.locator('input[name="name"]')).toBeVisible();
  await expect(page.locator('input[name="email"]')).toBeVisible();

  // Close modal (Escape key)
  await page.keyboard.press('Escape');
  await expect(page.locator('[role="dialog"]')).not.toBeVisible();

  // Re-open and close with click outside
  await page.click('button:has-text("Request a Demo")');
  await expect(page.locator('[role="dialog"]')).toBeVisible();
  await page.click('body', { position: { x: 0, y: 0 } }); // click outside
  await expect(page.locator('[role="dialog"]')).not.toBeVisible();
});

test('Demo form validation', async ({ page }) => {
  await page.goto('/');
  await page.click('button:has-text("Request a Demo")');

  // Submit button should be disabled initially
  const submitBtn = page.locator('button[type="submit"]');
  await expect(submitBtn).toBeDisabled();

  // Fill invalid email
  await page.fill('input[name="email"]', 'invalid-email');
  await expect(submitBtn).toBeDisabled();

  // Fill valid email
  await page.fill('input[name="name"]', 'Test User');
  await page.fill('input[name="email"]', 'test@example.com');
  await expect(submitBtn).toBeEnabled();
});
```

---

## Mobile-Specific Route Considerations

### Mobile Navigation Testing

**Critical Test (P0):**
- Hamburger menu icon visible on mobile viewport (375x667)
- Hamburger click opens navigation drawer
- All nav links accessible in drawer
- Drawer close button functional
- Click outside drawer closes it

**Mobile-Specific Routes (Same 26 routes):**
- No mobile-only routes
- All routes must render responsively

**Mobile Test Priorities:**

| Route | Mobile Priority | Mobile Test Depth |
|-------|-----------------|-------------------|
| / (Homepage) | **P0** | Deep (visual baseline, nav test) |
| /solutions | **P0** | Deep (hub cards must be touch-friendly) |
| /platform | **P0** | Deep (hub cards must be touch-friendly) |
| /demo | **P0** | Deep (form must be usable on mobile) |
| All other routes | **P1** | Smoke (load, no overflow, nav works) |

**Mobile Overflow Test (All Routes):**

```typescript
test.describe('Mobile responsive tests', () => {
  test.use({ viewport: { width: 375, height: 667 } });

  test('No horizontal overflow on homepage', async ({ page }) => {
    await page.goto('/');

    const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
    const viewportWidth = await page.evaluate(() => window.innerWidth);

    expect(bodyWidth).toBeLessThanOrEqual(viewportWidth);
  });
});
```

---

## Content Integrity Test Patterns

### Placeholder Content Detection (P0)

**Test All Routes:**

```typescript
const placeholderPatterns = [
  /lorem ipsum/i,
  /coming soon/i,
  /\bTBD\b/i,
  /placeholder/i,
  /\[.*\]/,  // [TODO], [Content here]
  /dummy text/i,
];

test('No placeholder content on homepage', async ({ page }) => {
  await page.goto('/');
  const bodyText = await page.textContent('body');

  for (const pattern of placeholderPatterns) {
    expect(bodyText).not.toMatch(pattern);
  }
});
```

### Brand Leakage Detection (P0)

**Test All Routes:**

```typescript
const competitorBrands = [
  /MachineMetrics/i,
  /Sight Machine/i,
  /Plex Systems/i,  // add other competitors as needed
];

test('No competitor brand leakage on homepage', async ({ page }) => {
  await page.goto('/');
  const bodyText = await page.textContent('body');

  for (const brand of competitorBrands) {
    expect(bodyText).not.toMatch(brand);
  }
});
```

### Email Consistency Detection (P1)

**Test All Routes:**

```typescript
test('Email consistency across site', async ({ page }) => {
  await page.goto('/');

  const emailPattern = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}/gi;
  const bodyText = await page.textContent('body');
  const emails = bodyText.match(emailPattern) || [];

  // All emails should be pat@adaptivefactory.net
  for (const email of emails) {
    expect(email.toLowerCase()).toBe('pat@adaptivefactory.net');
  }
});
```

---

## Route Testing Execution Plan

### Phase 1A: Critical Path Routes (P0 - 15 routes)

**Execution Order:**
1. / (Homepage)
2. /platform
3. /solutions
4. /demo
5. /security
6. /roles
7. All 5 solution detail pages
8. Top 3 platform detail pages
9. 404 error page

**Deliverable:** 15 routes with deep test coverage, visual baselines, accessibility scans.

### Phase 1B: Supporting Routes (P1 - 7 routes)

**Execution Order:**
1. /industries (hub)
2. /industries/aerospace
3. /industries/automotive
4. /industries/medical-devices
5. /about
6. /about/founder
7. /resources
8. /resources/faqs

**Deliverable:** 7 routes with medium test coverage, sample accessibility scans.

### Phase 1C: Smoke Test Routes (P2 - 4 routes)

**Execution Order:**
1. /platform/reporting-analytics
2. /industries/metal-stamping
3. /industries/industrial-manufacturing

**Deliverable:** 3 routes with smoke test coverage (load + no errors).

### Total Phase 1: 26 routes tested

---

## Success Criteria Summary

### Route Coverage

- **26/26 routes tested** (100% coverage)
- **15 routes deep tested** (58% deep coverage)
- **7 routes medium tested** (27% medium coverage)
- **4 routes smoke tested** (15% smoke coverage)

### Link Coverage

- **27/27 footer links validated** (100% coverage)
- **9/9 anchor links scroll-tested** (100% coverage)
- **5/5 solution hub cards link-tested** (100% coverage)

### Content Coverage

- **0 placeholder content instances** (100% clean)
- **0 competitor brand leakage** (100% clean)
- **Email consistency enforced** (100% standardized)

### Conversion Coverage

- **Demo modal tested** (open, close, validation)
- **All primary CTAs validated** (link destinations)

---

## Maintenance and Updates

### Adding New Routes

**Process:**
1. Add route to inventory table (classify priority/depth)
2. Create test file in appropriate directory
3. Add to execution plan (Phase 1A/1B/1C)
4. Update total route count
5. Re-run full suite to validate no regressions

### Removing Routes

**Process:**
1. Archive test file (don't delete - may revert)
2. Update inventory table (mark as deprecated)
3. Update footer link inventory if affected
4. Update total route count

### Updating Test Depth

**Process:**
1. Review route analytics (if smoke test route gets high traffic, promote to medium/deep)
2. Update inventory table classification
3. Enhance test coverage as needed
4. Update execution plan

---

## Conclusion

This route inventory provides a complete, prioritized map of all testable routes, links, and navigation elements on the EKAS B2B manufacturing intelligence website. The 26 routes are classified into P0 (critical), P1 (high priority), and P2 (standard) with corresponding test depths (deep, medium, smoke) that balance comprehensive coverage with execution efficiency.

**Next Steps:**
1. Review test strategy document
2. Review risk matrix document
3. Begin Phase 1A implementation (15 critical routes)
4. Establish visual baselines
5. Execute full suite pre-deployment

---

**Document Maintenance:**
- Update when new routes added
- Update when routes deprecated
- Update when footer/navigation changes
- Review quarterly for relevance
