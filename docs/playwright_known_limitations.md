# Playwright Known Limitations
# EKAS Manufacturing Intelligence Platform

**Date:** 2026-04-16
**Project:** EKAS B2B Website (Next.js 15)
**Test Framework:** Playwright

---

## Overview

This document outlines what cannot be reliably automated with Playwright E2E tests, known flaky patterns, areas requiring manual verification, and future enhancement opportunities for the EKAS test suite.

---

## What Cannot Be Tested Automatically

### 1. Actual Form Submissions to Live Backends

**Limitation:**
- Playwright tests cannot submit forms to live email services, CRM endpoints, or database writes without generating real production data.

**Why:**
- Form submissions trigger actual emails to pat@adaptivefactory.net
- Demo requests create CRM records (if integrated)
- Real backend calls generate analytics events and logs
- Requires credentials for third-party services (SendGrid, HubSpot, etc.)

**What IS Tested:**
- Form field validation (required fields, email format)
- Submit button enabled/disabled states
- Modal open/close behavior
- Form rendering and visibility
- Client-side validation messages

**Workaround for Testing:**
- Mock form submission endpoints in test environment
- Stub API responses with Playwright's `route.fulfill()`
- Verify form data is correctly formatted before submission

**Manual Verification Required:**
- Submit demo form in production and verify email receipt
- Check CRM for new lead entry
- Verify auto-responder email is sent

---

### 2. Third-Party Integration Functionality

**Limitation:**
- Google Analytics tracking, live chat widgets, cookie consent banners, marketing pixels cannot be fully tested.

**Why:**
- Requires live service accounts and API keys
- Generates noise in analytics dashboards
- Third-party widgets may have rate limits
- Analytics tracking is asynchronous and non-deterministic

**What IS Tested:**
- Script tags load successfully (200 status)
- Widget containers exist in DOM
- No console errors from third-party scripts

**What is NOT Tested:**
- Actual event tracking to Google Analytics
- Live chat connection to support team
- Cookie consent preferences saved correctly
- Marketing pixel fires

**Manual Verification Required:**
- Open browser console and verify GA events fire
- Test live chat widget manually
- Check cookie consent banner appears and persists

---

### 3. Backend API Performance and Load Testing

**Limitation:**
- E2E tests are not designed for performance or load testing.

**Why:**
- Playwright tests run sequentially or with limited parallelism
- Cannot simulate 100+ concurrent users
- Database query performance requires dedicated profiling tools
- Server-side rendering performance varies with infrastructure

**What IS Tested:**
- Pages load within reasonable timeout (30s)
- No infinite loading states
- Network requests complete successfully

**What is NOT Tested:**
- Page load time under heavy traffic
- Database query optimization
- CDN cache hit rates
- Server response time p95/p99

**Alternative Tools:**
- Lighthouse CI for performance budgets
- k6 or Artillery for load testing
- New Relic or Datadog for production monitoring

**Manual Verification Required:**
- Run Lighthouse audit on production
- Monitor page load times in production
- Load test with dedicated tools

---

### 4. Email Delivery and Template Rendering

**Limitation:**
- Cannot verify email delivery, inbox placement, or email client rendering.

**Why:**
- Email delivery requires live SMTP server
- Email clients (Gmail, Outlook) have different rendering engines
- Spam filtering is unpredictable
- Email tracking pixels require live infrastructure

**What IS Tested:**
- Email field format validation (must be valid email)
- Form submissions prepare email data correctly

**What is NOT Tested:**
- Email actually reaches inbox
- Email renders correctly in Gmail/Outlook
- Email contains correct content
- Email links work

**Alternative Tools:**
- Litmus or Email on Acid for email client testing
- Send test emails to real accounts

**Manual Verification Required:**
- Submit demo form and check inbox
- Verify email content and formatting
- Test email links

---

### 5. Cross-Browser Rendering (Safari/WebKit)

**Limitation:**
- Phase 1 test suite is Chromium-only (Chrome/Edge).

**Why:**
- WebKit (Safari) has rendering quirks that cause false positive visual regressions
- Font rendering, animation timing, shadow calculations differ
- Safari market share in B2B is lower (~15-20%)
- Test stability prioritized over browser breadth

**What IS Tested:**
- Chromium (Chrome, Edge) - covers 70%+ of B2B traffic
- Mobile Chrome on iOS (uses Chromium engine in Playwright)

**What is NOT Tested:**
- Safari-specific CSS bugs (flexbox, grid, backdrop-filter)
- Safari font rendering
- Safari JavaScript quirks

**Future Enhancement:**
- Add WebKit project to Playwright config
- Create Safari-specific visual baselines with adjusted tolerances
- Focus on Safari-specific bug patterns

**Manual Verification Required:**
- Test critical pages in Safari desktop and mobile
- Check for layout breaks, font rendering issues

---

### 6. Dynamic Personalization and A/B Testing

**Limitation:**
- Cannot test user-specific content, personalization, or A/B test variants.

**Why:**
- EKAS website is currently static content (no user accounts)
- A/B tests show random variants
- Personalization requires session/cookie management

**What IS Tested:**
- Default (non-personalized) content
- Static page content

**What is NOT Tested:**
- Personalized hero messaging
- A/B test variant rendering
- Geo-specific content

**Future Enhancement:**
- Add session management to tests
- Mock A/B test assignments
- Test both variants explicitly

**Manual Verification Required:**
- Test A/B variants manually
- Verify personalization logic

---

### 7. Real-Time Monitoring and Analytics

**Limitation:**
- Cannot verify real-time data updates, dashboards, or live analytics.

**Why:**
- EKAS website is marketing site, not platform UI
- No real-time data on public pages
- Analytics dashboards are authenticated

**What IS Tested:**
- Static content renders correctly

**What is NOT Tested:**
- Live data updates
- Dashboard visualizations (future platform feature)

**Manual Verification Required:**
- Test platform dashboards separately when implemented

---

## Known Flaky Test Patterns

### 1. Network-Dependent Tests

**Pattern:**
- Tests that depend on external APIs or CDN resources may fail intermittently.

**Examples:**
- Favicon loading from CDN
- Third-party script loading (analytics, fonts)

**Mitigation:**
- Retry failed network requests
- Filter external resources in failure checks
- Increase timeout for external resources

**Current Status:**
- External resource failures are filtered out in smoke tests
- Only internal resource failures cause test failure

---

### 2. Animation-Dependent Visual Tests

**Pattern:**
- Screenshots captured mid-animation can cause false positive diffs.

**Examples:**
- Hero section fade-in animation
- Modal slide-in animation

**Mitigation:**
- `stabilizeForScreenshot()` helper disables animations
- Wait for `networkidle` before capturing
- Additional 1s wait for animations to complete

**Current Status:**
- Animation CSS disabled in visual tests
- Baseline screenshots stable

---

### 3. Timing-Sensitive Tests

**Pattern:**
- Tests that depend on precise timing (e.g., hover states, transitions) may flake.

**Examples:**
- Hover state screenshots
- Modal open/close timing

**Mitigation:**
- Add explicit `waitForTimeout()` after interactions
- Use `waitForSelector()` instead of fixed timeouts
- Increase timeout tolerances

**Current Status:**
- Explicit waits added to all timing-sensitive tests
- 300-500ms waits after interactions

---

### 4. Mobile Menu Interactions

**Pattern:**
- Mobile hamburger menu may not open consistently across devices.

**Why:**
- Different mobile implementations (drawer, overlay, slide-in)
- CSS transitions vary in timing
- Touch event simulation may differ from real touch

**Mitigation:**
- Flexible selectors for mobile nav (multiple patterns)
- Wait for menu to be visible after clicking
- Graceful fallback if menu structure differs

**Current Status:**
- Mobile nav tests use flexible selectors
- Tests check for multiple menu patterns

---

### 5. Dynamic Content Tests

**Pattern:**
- Tests checking for specific text content may break if copy changes.

**Examples:**
- H1 text assertions
- Section heading checks

**Mitigation:**
- Use flexible regex patterns instead of exact matches
- Test for presence, not exact wording
- Separate content tests from structural tests

**Current Status:**
- Most content checks use regex (e.g., `/problem/i`)
- Exact text matching minimized

---

## Manual Verification Still Required

### Pre-Deployment Checklist

1. **Visual Design Review:**
   - [ ] Color accuracy matches brand guidelines
   - [ ] Typography is consistent across pages
   - [ ] Spacing and alignment is pixel-perfect
   - [ ] Images are high-quality and optimized
   - [ ] Dark premium design system is consistent

2. **Content Quality:**
   - [ ] All copy is proofread and approved
   - [ ] Manufacturing terminology is accurate
   - [ ] No typos or grammatical errors
   - [ ] Founder bio is accurate and approved
   - [ ] Company information is up-to-date

3. **Form Submissions:**
   - [ ] Submit demo form in production
   - [ ] Verify email received at pat@adaptivefactory.net
   - [ ] Check CRM for new lead (if integrated)
   - [ ] Test auto-responder email
   - [ ] Verify form data is correctly formatted

4. **Third-Party Integrations:**
   - [ ] Google Analytics tracking fires
   - [ ] Cookie consent banner appears
   - [ ] Live chat widget connects (if implemented)
   - [ ] Marketing pixels fire (if implemented)

5. **Browser Compatibility:**
   - [ ] Test in Safari desktop (latest)
   - [ ] Test in Safari mobile (iOS)
   - [ ] Test in Firefox (latest)
   - [ ] Test in Chrome (latest)
   - [ ] Test in Edge (latest)

6. **Performance:**
   - [ ] Run Lighthouse audit (score > 90)
   - [ ] Check page load times in production
   - [ ] Verify images are optimized
   - [ ] Check for render-blocking resources
   - [ ] Test on slow 3G network

7. **SEO:**
   - [ ] Verify sitemap.xml exists and is accurate
   - [ ] Check robots.txt is correct
   - [ ] Test structured data (if implemented)
   - [ ] Verify canonical URLs
   - [ ] Check for duplicate content

8. **Security:**
   - [ ] SSL certificate is valid
   - [ ] No mixed content warnings (HTTP on HTTPS)
   - [ ] Security headers are set (CSP, HSTS)
   - [ ] No exposed API keys or credentials
   - [ ] Form submissions are encrypted

9. **Accessibility:**
   - [ ] Manual keyboard navigation test
   - [ ] Screen reader test (NVDA, VoiceOver)
   - [ ] Color contrast spot check
   - [ ] Focus indicators visible
   - [ ] Alternative text is descriptive

10. **Legal/Compliance:**
    - [ ] Privacy policy is current
    - [ ] Terms of service are current
    - [ ] Cookie consent is GDPR-compliant (if EU traffic)
    - [ ] IATF/ISO references are accurate

---

## Future Enhancement Opportunities

### Phase 2: Enhanced Test Coverage

1. **API Contract Testing:**
   - If EKAS exposes a public API, add API contract tests
   - Test API endpoints with Playwright's request library
   - Verify response schemas and status codes

2. **Mock Form Submissions:**
   - Mock email/CRM endpoints in test environment
   - Verify form data is posted correctly
   - Test success/error states

3. **WebKit/Safari Testing:**
   - Add Safari-specific visual baselines
   - Test Safari-specific bugs (flexbox, grid)
   - Separate WebKit project in Playwright config

4. **Performance Testing:**
   - Integrate Lighthouse CI
   - Set performance budgets (LCP < 2.5s, FID < 100ms)
   - Fail tests if performance degrades

5. **Internationalization:**
   - If EKAS adds multi-language support
   - Test language switching
   - Verify translated content

6. **Authenticated Flows:**
   - When user accounts are added
   - Test login/logout flows
   - Test protected routes

7. **E2E User Journeys:**
   - Multi-step flows (browse > read > demo request)
   - Cart/checkout flows (if e-commerce added)
   - Search functionality (if added)

8. **Advanced Accessibility:**
   - Keyboard navigation automation
   - Focus trap testing (modals)
   - ARIA attribute validation

9. **Video Regression Testing:**
   - Record test runs as videos
   - Compare video frames for regressions
   - Useful for animation testing

10. **Visual Testing Enhancements:**
    - Pixel-perfect component screenshots
    - Storybook integration (if adopted)
    - Percy or Chromatic integration

---

### Phase 3: CI/CD Integration

1. **Nightly Regression Runs:**
   - Scheduled test runs every night
   - Email report to team
   - Catch regressions early

2. **PR-Based Smoke Tests:**
   - Run smoke tests on every pull request
   - Fast feedback (<3 minutes)
   - Block merge if smoke tests fail

3. **Visual Diff Reports:**
   - Auto-comment on PRs with visual diffs
   - Approve/reject visual changes
   - Track visual regression history

4. **Parallel Test Execution:**
   - Split tests across multiple machines
   - Reduce total execution time (8 min → 3 min)

5. **Test Report Dashboards:**
   - Centralized test result dashboard
   - Track flakiness over time
   - Historical pass/fail trends

---

## Maintenance Notes

### When to Update Tests

1. **Route Changes:**
   - Add new routes to `all-routes.spec.ts`
   - Update footer link tests if footer changes
   - Update navigation tests if nav structure changes

2. **Content Updates:**
   - Update visual baselines if design changes
   - Update content assertions if copy changes
   - Review regex patterns if terminology changes

3. **Form Changes:**
   - Update form tests if fields are added/removed
   - Update validation tests if rules change

4. **Dependency Updates:**
   - Update Playwright when new version releases
   - Update axe-core for latest accessibility rules
   - Test for breaking changes after updates

---

## Conclusion

This document outlines the boundaries of automated testing for the EKAS website. While the Playwright test suite is comprehensive, it is not a replacement for human judgment in design, content quality, and critical manual testing.

**Key Takeaways:**
- Automated tests cover structure, functionality, and regressions
- Manual testing is still required for visual design, content quality, and third-party integrations
- Known flaky patterns are mitigated with waits and flexible assertions
- Future enhancements will expand coverage as EKAS evolves

**Recommended Test Cadence:**
- **Pre-deployment:** Full Playwright suite + manual checklist
- **Post-deployment:** Smoke tests in production
- **Weekly:** Full regression suite
- **Monthly:** Manual browser compatibility and accessibility audit

---

**End of Known Limitations**
