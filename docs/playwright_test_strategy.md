# Playwright Test Strategy - EKAS Manufacturing Intelligence Platform

## Document Overview

This document defines the comprehensive testing strategy for the EKAS B2B manufacturing intelligence website. EKAS is a production-ready Next.js application serving manufacturing industry professionals with governed metrics, data provenance, and manufacturing intelligence solutions.

**Version:** 1.0
**Last Updated:** 2026-04-16
**Contact:** pat@adaptivefactory.net

---

## Test Philosophy

### B2B Manufacturing Quality Standards

EKAS serves a professional manufacturing audience where trust, accuracy, and reliability are paramount. Our test strategy reflects:

- **Professional Excellence**: Manufacturing decision-makers expect flawless digital experiences. A broken link or missing page degrades trust in our platform capabilities.
- **Technical Accuracy**: Manufacturing professionals understand precision. Our site must reflect the same attention to detail we promise in our governed metrics.
- **Audit-Ready Quality**: Industries like aerospace and medical devices operate under IATF 16949 and ISO compliance regimes. Our quality processes must be equally rigorous.
- **Zero Tolerance for Errors**: In manufacturing, defects compound. A single console error on a critical page suggests systemic quality issues.

### Comprehensive Coverage Philosophy

This is **not** a minimal smoke test suite. EKAS is:
- Production-approved and ready for deployment
- Representing a complex B2B manufacturing domain
- Serving multiple industry verticals (aerospace, automotive, medical devices, metal stamping, industrial manufacturing)
- Offering 5 distinct solution categories with technical depth
- Targeting 6 manufacturing roles (plant managers, operations leaders, engineering, quality, finance, executive)

**Coverage Goals:**
- **100% route coverage**: All 26 public routes tested
- **100% footer link coverage**: All 27 footer links validated (including 9 anchor links)
- **100% solution hub card coverage**: All 5 solution cards verified (preventing self-reference bugs)
- **Comprehensive metadata validation**: Every page title, description, H1 verified
- **Multi-device validation**: Desktop (primary) and mobile (required secondary)
- **Accessibility baseline**: WCAG 2.1 AA compliance on all page types
- **Visual regression protection**: Full-page screenshots for homepage, hubs, and key detail pages

### Manufacturing Domain Considerations

**Technical Vocabulary Validation:**
- Manufacturing intelligence terminology must be precise
- References to IATF 16949, ISO standards must be accurate
- Industry-specific terms (OEE, downtime, scrap, capacity, throughput) require exact usage
- Data provenance and governed metrics positioning must be consistent

**B2B Buyer Journey:**
- Solution-first navigation (problems before features)
- Industry-specific validation (aerospace vs automotive vs medical devices)
- Role-based content targeting (plant manager vs CFO messaging)
- Demo/contact conversion paths are critical business functions

**Brand Integrity:**
- Zero tolerance for competitor brand leakage (e.g., "MachineMetrics")
- Zero tolerance for placeholder content ("lorem ipsum", "coming soon")
- Email consistency enforcement (pat@adaptivefactory.net throughout)
- Dark premium design system integrity

---

## Scope

### What WILL Be Tested

#### 1. Route Integrity (100% Coverage)
- All 26 public routes load successfully (200 status)
- Route-specific content rendering
- Proper error handling (404 page for unknown routes)
- No unexpected redirects

#### 2. Navigation Systems
- Desktop navigation menu (all links functional)
- Mobile navigation menu (hamburger, drawer, all links)
- Breadcrumb navigation where applicable
- Solution/industry/platform hub navigation patterns

#### 3. Footer (27 Links)
- All 18 standard footer links to routes
- All 9 anchor links to role/security sections
- Footer consistency across all pages
- Social/contact links if present

#### 4. Forms and CTAs
- Demo request modal (open, close, field validation)
- Contact form interactions
- Email field validation
- Required field enforcement
- **Form submission simulation** (button enabled, modal behavior)
- CTA link destinations verified

#### 5. Content Quality
- H1 presence and uniqueness
- Key section headings rendered
- No placeholder content (regex detection: "lorem ipsum", "coming soon", "placeholder", "TBD")
- No competitor brand leakage (regex detection: "MachineMetrics", "Sight Machine")
- Email consistency (pat@adaptivefactory.net validation)
- Solution hub card link integrity (prevent self-reference bugs)

#### 6. Metadata and SEO
- Page title present and unique
- Meta description present
- Open Graph tags where applicable
- Title format consistency
- No duplicate titles across routes

#### 7. Accessibility (WCAG 2.1 AA Baseline)
- axe-core automated scans on all page types
- Critical violations fail tests (missing alt text, insufficient contrast, missing labels)
- Keyboard navigation spot checks (navigation menu, forms, CTAs)
- Focus indicators visible
- Semantic HTML validation

#### 8. Visual Regression
- Full-page screenshots for:
  - Homepage (/)
  - All 4 hub pages (platform, solutions, industries, roles)
  - All 5 solution detail pages
  - Security page
  - Demo page
  - Founder page
- Viewport-specific baselines (desktop 1920x1080, mobile 375x667)
- Responsive layout verification

#### 9. Responsive Design
- Desktop: Chromium 1920x1080 (primary test environment)
- Mobile: Chrome/Pixel 375x667 (secondary but required)
- No horizontal overflow
- Touch-friendly CTAs and navigation
- Mobile-specific layout rendering

#### 10. Console and Network Monitoring
- Zero uncaught JavaScript errors on critical paths
- No failed asset requests (images, fonts, scripts)
- No 404 network requests
- No CORS errors
- Reasonable performance (no 10s+ page loads)

#### 11. 404 Error Handling
- Unknown routes render branded 404 page
- 404 page contains recovery navigation
- 404 page has proper meta tags
- No console errors on 404 page

### What CANNOT Be Reliably Tested (Out of Scope)

#### 1. Actual Form Submissions to Live Endpoints
- **Why:** Requires backend email service integration, CRM webhooks, or database writes
- **Mitigation:** We test form validation, modal behavior, button states, and simulate submission interactions
- **Future:** Mock API responses for submission flows

#### 2. Third-Party Integrations
- Analytics tracking (Google Analytics, Mixpanel, etc.)
- Live chat widgets
- Cookie consent banners
- External CRM/marketing automation webhooks
- **Why:** Requires live service accounts, generates noise in analytics, unpredictable availability
- **Mitigation:** Verify script tags load; actual tracking validation is manual QA

#### 3. Backend API Performance
- Data query performance
- Database connection pooling
- Server-side rendering performance under load
- **Why:** E2E tests are not load tests; requires dedicated performance testing tools

#### 4. Email Delivery
- Actual email receipt from demo/contact forms
- Email template rendering in mail clients
- **Why:** Requires live email infrastructure and inbox monitoring
- **Mitigation:** Validate email field formats and form submission readiness

#### 5. Dynamic Pricing or User-Specific Content
- Personalized content based on cookies/IP
- A/B test variant rendering
- **Why:** EKAS is currently static/public content; if personalization is added, requires session management in tests

#### 6. Cross-Browser Layout Pixel-Perfection
- **Why:** WebKit (Safari) rendering differences can cause false positives in visual regression
- **Mitigation:** Chromium-based browsers (Chrome, Edge) cover 70%+ of B2B traffic; Safari manual QA

---

## Desktop vs Mobile Coverage

### Primary Test Environment: Desktop (Chromium 1920x1080)

**Why Desktop First:**
- B2B manufacturing decision-makers primarily research on desktop workstations
- Complex data visualization and dashboards require desktop viewports
- 70%+ of B2B traffic is desktop-based

**Desktop Test Coverage:**
- All 26 routes fully tested
- Full navigation menu interaction
- Full-page visual regression baselines
- Complete accessibility scans
- Console/network monitoring

### Secondary Test Environment: Mobile (Chrome Mobile/Pixel 375x667)

**Why Mobile Required:**
- 25-30% of B2B research occurs on mobile/tablet
- Plant managers and operations leaders may browse on-floor (mobile)
- Responsive design is table-stakes for modern B2B

**Mobile Test Coverage:**
- All 26 routes load and render
- Mobile navigation (hamburger menu, drawer interaction)
- Touch-friendly CTA interaction
- No horizontal overflow
- Mobile-specific visual regression baselines
- Accessibility scans (viewport-agnostic)
- Console/network monitoring

**Mobile Simplifications:**
- Fewer detailed content assertions (smoke test depth)
- No separate mobile-only routes (same route set)

### Why Not WebKit (Safari) in Initial Implementation

**Decision:** Chromium-only for Phase 1

**Rationale:**
1. **Stability Over Breadth:** WebKit rendering engine has quirks that cause false positive visual regressions (font rendering, animation timing, shadow calculations)
2. **B2B Browser Share:** Chrome/Edge (Chromium) dominates B2B enterprise environments (70%+)
3. **Next.js Compatibility:** Next.js 15 is Chromium-optimized; Safari coverage is valuable but not critical
4. **Test Suite Maturity:** Establish stable baselines in Chromium before adding WebKit complexity
5. **Resource Efficiency:** Faster test runs, fewer false positives, clearer signal-to-noise

**Future WebKit Coverage:**
- Phase 2 consideration after Chromium suite is stable
- Safari-specific visual baselines with adjusted tolerances
- Focus on Safari-specific bugs (flexbox, grid, backdrop-filter)

---

## Visual Regression Approach

### Full-Page Screenshot Coverage

**Pages with Visual Baselines:**

**P0 (Critical) Pages:**
- `/` (Homepage - primary impression)
- `/platform` (Main platform hub)
- `/solutions` (Solution hub)
- `/industries` (Industry hub)
- `/roles` (Role hub)
- `/security` (Trust/compliance page)
- `/demo` (Conversion page)

**P1 (High Priority) Pages:**
- `/solutions/downtime-reduction` (Representative solution detail)
- `/solutions/capacity-throughput`
- `/solutions/scrap-quality-visibility`
- `/solutions/cost-driver-analysis`
- `/solutions/multi-site-performance`
- `/about/founder` (Team/credibility page)

**P2 (Standard) Pages:**
- Representative industry detail page (e.g., `/industries/aerospace`)
- `/resources/faqs`

**Viewports:**
- Desktop: 1920x1080 (Chromium)
- Mobile: 375x667 (Chrome Mobile)

### Stable Masking Strategy

**Dynamic Content to Mask:**
1. **Timestamps/Dates:** If footer or content shows "Last updated: [date]"
2. **Animation Frames:** CSS animations mid-transition (use `page.waitForLoadState('networkidle')`)
3. **Video/Media Elements:** Poster frames or loading states
4. **Third-Party Widgets:** Live chat, cookie banners (if present)
5. **Randomized Content:** Testimonial rotators, if implemented

**Masking Implementation:**
```typescript
await expect(page).toHaveScreenshot('homepage.png', {
  mask: [
    page.locator('[data-testid="footer-timestamp"]'),
    page.locator('.animation-container'),
  ],
  maxDiffPixels: 100,
});
```

### Update Baseline Workflow

**When to Update Baselines:**
1. **Intentional Design Changes:** Updated color scheme, typography, spacing
2. **Content Updates:** New solution added, updated imagery
3. **Layout Refactors:** Component restructuring, responsive breakpoint changes
4. **Dependency Updates:** Next.js/React updates that affect rendering

**Update Process:**
```bash
# Generate new baselines
npx playwright test --update-snapshots

# Review diff report
npx playwright show-report

# Commit updated baselines
git add tests/**/*.png
git commit -m "Update visual regression baselines: [reason]"
```

**Baseline Review Checklist:**
- Visual diff reviewed manually (not blind update)
- Changes match design intent
- No unintended regressions (color shifts, layout breaks)
- Mobile and desktop baselines updated together
- Documentation updated if visual standards change

### Tolerance Thresholds

**Philosophy:** Strict enough to catch real regressions, loose enough to avoid false positives.

**Threshold Configuration:**
- `maxDiffPixels: 100` (for full-page screenshots at 1920x1080)
  - Allows minor anti-aliasing differences
  - Catches meaningful layout shifts
- `maxDiffPixelRatio: 0.01` (1% difference threshold)
  - Appropriate for responsive layouts
  - Triggers on significant color/spacing changes

**Platform-Specific Adjustments:**
- Desktop (1920x1080): `maxDiffPixels: 100`
- Mobile (375x667): `maxDiffPixels: 50` (smaller viewport)

**Failure Investigation:**
1. Review `playwright-report/index.html` diff visualization
2. Check for intentional changes (new content, design updates)
3. Verify no layout breaks (horizontal overflow, collapsed sections)
4. If false positive: adjust mask or tolerance
5. If real regression: fix code, re-test

---

## Accessibility Approach

### axe-core Integration

**Tool:** `@axe-core/playwright` npm package

**Coverage:**
- Every page type gets at least one accessibility scan
- Homepage: full scan
- Hub pages (4): full scans
- Solution detail pages (5): full scans
- Industry detail pages: sample scan (1-2 pages)
- Forms: dedicated scan with interactions

**Implementation:**
```typescript
import { injectAxe, checkA11y } from 'axe-playwright';

test('Homepage accessibility', async ({ page }) => {
  await page.goto('/');
  await injectAxe(page);
  await checkA11y(page, null, {
    detailedReport: true,
    detailedReportOptions: { html: true },
  });
});
```

### WCAG 2.1 AA Baseline

**Standard:** WCAG 2.1 Level AA (industry standard for B2B compliance)

**Critical Violations (Test Failures):**
- Missing alt text on images
- Insufficient color contrast (< 4.5:1 for normal text, < 3:1 for large text)
- Missing form labels
- Missing page title
- Missing language attribute
- Keyboard inaccessible interactive elements

**Non-Critical Violations (Warnings Logged):**
- Missing ARIA landmarks (nice to have)
- Redundant ARIA roles
- Minor semantic HTML improvements

**Exclusions:**
- WCAG AAA (too strict for B2B commercial sites)
- Best practices suggestions (may conflict with design system)

### Manufacturing Domain Complexity Acknowledged

**Challenges:**
1. **Data Visualizations:** Charts, graphs, dashboards have accessibility limitations
   - Mitigation: Ensure text alternatives, data tables where feasible
2. **Technical Terminology:** Screen reader pronunciation of manufacturing terms
   - Mitigation: Proper ARIA labels for acronyms (OEE, IATF, ISO)
3. **Complex Tables:** Multi-dimensional data tables
   - Mitigation: Proper th/scope attributes, caption elements

**Pragmatic Approach:**
- Meet WCAG AA for all public marketing pages (current scope)
- Document known limitations for complex dashboards (future product pages)
- Prioritize keyboard navigation and color contrast (high ROI)

### Keyboard Navigation Spot Checks

**Manual Test Cases (Not Automated Yet):**
1. **Navigation Menu:**
   - Tab through all nav links
   - Enter key activates links
   - Focus indicators visible

2. **Demo Modal:**
   - Tab to CTA, Enter opens modal
   - Tab through form fields
   - Escape key closes modal
   - Focus trapped in modal

3. **Footer:**
   - Tab through all 27 footer links
   - Anchor links keyboard-accessible

**Future Automation:**
- Playwright can simulate keyboard events
- Verify focus order with `page.locator(':focus')`
- Validate focus trap in modals

---

## Release Gate Criteria

### P0 Failures: Zero Tolerance (Blocking)

**Must Pass Before Deployment:**
1. **Route Integrity:**
   - All 26 routes return 200 status
   - No unexpected redirects
   - Branded 404 page renders for unknown routes

2. **Navigation Integrity:**
   - All nav links functional (desktop and mobile)
   - Mobile hamburger menu opens and closes
   - Solution hub cards link correctly (no self-references)

3. **Footer Integrity:**
   - All 27 footer links return 200 status
   - All 9 anchor links scroll to correct sections

4. **Critical Console Errors:**
   - Zero uncaught exceptions on homepage
   - Zero uncaught exceptions on /solutions, /platform, /demo
   - Zero failed asset requests on critical paths

5. **Content Integrity:**
   - Zero placeholder content ("lorem ipsum", "coming soon")
   - Zero competitor brand leakage ("MachineMetrics")
   - Email consistency (pat@adaptivefactory.net)

6. **Metadata Baseline:**
   - All pages have title tag
   - All pages have H1

**Failure Threshold:** 0 P0 failures allowed

### P1 Failures: < 5% Allowed (Non-Blocking with Review)

**High Priority Issues:**
1. **Visual Regressions:**
   - Full-page screenshot diffs on homepage, hubs
   - Minor diffs < 5% acceptable if reviewed
   - Major layout breaks block deployment

2. **Accessibility Violations:**
   - Critical WCAG AA violations (missing alt, contrast)
   - Up to 5 violations acceptable if documented/scheduled
   - No violations on demo/contact forms

3. **Metadata Completeness:**
   - Missing meta descriptions on <5% of pages
   - Duplicate titles on non-critical pages

4. **Console Warnings:**
   - Non-critical console warnings on <5% of pages
   - No errors, only warnings

5. **Mobile Responsive:**
   - Minor overflow on <5% of pages (if not critical routes)
   - All critical routes perfect

**Failure Threshold:** < 5% of total P1 assertions can fail

### P2 Failures: Acceptable if Documented (Non-Blocking)

**Standard Quality Issues:**
1. **Content Assertions:**
   - Missing specific section headings on detail pages
   - Minor content variations from spec

2. **Industry Page Depth:**
   - Industry detail pages can be smoke-tested (not deep)
   - Full content assertions nice to have

3. **Minor Console Warnings:**
   - Non-critical warnings (e.g., third-party script warnings)
   - Performance suggestions

4. **Asset Optimization:**
   - Non-critical 404s (e.g., optional assets)
   - Non-blocking network warnings

**Failure Threshold:** < 20% of total P2 assertions can fail

### Release Decision Matrix

| Scenario | P0 Failures | P1 Failures | P2 Failures | Decision |
|----------|-------------|-------------|-------------|----------|
| Perfect | 0 | 0 | 0 | Deploy immediately |
| Excellent | 0 | 1-3 (< 5%) | 0-10 | Deploy with ticket for P1 fixes |
| Good | 0 | 4-6 (< 10%) | 10-20 | Deploy with review; P1s must be scheduled |
| Marginal | 0 | 7+ (> 10%) | 20+ | Hold deployment; fix critical P1s first |
| Blocking | 1+ | Any | Any | Block deployment; fix all P0s |

### Monitoring and Reporting

**Test Execution:**
- Full suite runs on pre-deployment (manual trigger)
- Nightly regression runs (automated, report-only)
- PR-based smoke tests (fast subset)

**Report Artifacts:**
- HTML report with screenshots (`playwright-report/index.html`)
- Visual diff gallery for regressions
- Accessibility violation summary
- Console error log export

**Stakeholder Communication:**
- Pass/fail status in deployment checklist
- Summary report: X/Y tests passed, P0/P1/P2 breakdown
- Link to detailed HTML report for investigation

---

## Test Execution Strategy

### Test Organization

**Directory Structure:**
```
tests/
├── e2e/
│   ├── routes/
│   │   ├── homepage.spec.ts
│   │   ├── platform-hub.spec.ts
│   │   ├── solutions-hub.spec.ts
│   │   ├── industries-hub.spec.ts
│   │   ├── roles-hub.spec.ts
│   │   └── ...
│   ├── navigation/
│   │   ├── main-nav.spec.ts
│   │   ├── footer.spec.ts
│   │   └── mobile-nav.spec.ts
│   ├── forms/
│   │   ├── demo-modal.spec.ts
│   │   └── contact-form.spec.ts
│   ├── accessibility/
│   │   └── a11y.spec.ts
│   ├── visual/
│   │   └── visual-regression.spec.ts
│   └── content/
│       ├── placeholder-detection.spec.ts
│       └── brand-integrity.spec.ts
└── playwright.config.ts
```

### Test Execution Modes

**Full Suite (Pre-Deployment):**
```bash
npx playwright test
# ~5-10 minutes, all routes, all projects (desktop + mobile)
```

**Fast Smoke Test (PR Validation):**
```bash
npx playwright test --grep @smoke
# ~2 minutes, critical paths only
```

**Visual Regression Only:**
```bash
npx playwright test tests/e2e/visual/
# ~3 minutes, screenshot comparison
```

**Accessibility Only:**
```bash
npx playwright test tests/e2e/accessibility/
# ~2 minutes, axe-core scans
```

### Continuous Integration

**GitHub Actions Workflow:**
- Trigger: Manual workflow dispatch (pre-deployment)
- Playwright container: `mcr.microsoft.com/playwright:v1.40.0`
- Parallel execution: 4 workers
- Artifact upload: HTML report, screenshots, traces
- Failure notification: Slack/email alert

**Future CI/CD:**
- Nightly regression runs
- PR-based smoke tests
- Visual diff reports in PR comments

---

## Success Metrics

### Test Suite Health

**Target Metrics:**
- **Pass Rate:** > 95% (P0 + P1 combined)
- **Execution Time:** < 10 minutes (full suite)
- **Flakiness Rate:** < 2% (tests pass 98%+ of the time without code changes)
- **Coverage:** 100% of public routes tested

### Quality Gates Enforced

**Deployment Checklist:**
- [ ] All 26 routes return 200 status
- [ ] All 27 footer links validated
- [ ] Zero placeholder content detected
- [ ] Zero critical console errors
- [ ] Zero critical accessibility violations
- [ ] Visual regressions reviewed and approved
- [ ] Mobile navigation functional
- [ ] Demo modal functional

### Continuous Improvement

**Review Cadence:**
- Monthly test suite review (update baselines, add new routes)
- Post-deployment validation (re-run suite against production URL)
- Quarterly accessibility audit (manual review + automated)

---

## Conclusion

This test strategy establishes EKAS as a quality-first B2B manufacturing platform with comprehensive, professional testing practices that match the precision we promise in our governed metrics product. The strategy balances thoroughness with pragmatism, prioritizes critical business paths, and provides clear release criteria.

**Next Steps:**
1. Review route inventory and risk matrix documents
2. Implement Phase 1 test suite
3. Establish baseline screenshots and accessibility benchmarks
4. Integrate with CI/CD pipeline
5. Execute pre-deployment validation

---

**Document Maintenance:**
- Update when new routes added
- Update when new integrations added (forms, APIs)
- Update when design system changes
- Review quarterly for relevance
