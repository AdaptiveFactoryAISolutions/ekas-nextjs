# Playwright Test Inventory
# EKAS Manufacturing Intelligence Platform

**Date:** 2026-04-16
**Project:** EKAS B2B Website (Next.js 15)
**Test Framework:** Playwright
**Total Files:** 19 TypeScript files (14 spec files + 5 helper files)

---

## Test File Inventory

### Helper Files (5 files)

#### 1. `tests/helpers/common.ts`
**Purpose:** Common utility functions for all tests
**Functions:**
- `waitForPageLoad(page)` - Wait for DOM and network idle
- `setupConsoleErrorCapture(page)` - Capture JavaScript errors
- `setupNetworkFailureCapture(page)` - Capture 404/500 responses
- `checkForPlaceholderContent(page)` - Detect lorem ipsum, TBD, etc.
- `stabilizeForScreenshot(page)` - Disable animations for screenshots
- `assertPageLoadsSuccessfully(page, url)` - Assert 200 status
- `isInViewport(page, selector)` - Check element visibility

**Lines:** ~130 lines

---

#### 2. `tests/helpers/metadata.ts`
**Purpose:** Metadata and SEO helper functions
**Functions:**
- `assertPageTitle(page, expectedPattern)` - Check page title
- `assertMetaDescription(page, minLength)` - Check meta description
- `assertH1(page, expectedText)` - Check H1 exists and matches
- `checkFavicon(page)` - Verify favicon loads
- `getMetaTags(page)` - Get all meta tags
- `assertOpenGraphTags(page)` - Check OG tags
- `assertLanguageAttribute(page, expectedLang)` - Check lang attribute
- `createTitleTracker()` - Track duplicate titles

**Lines:** ~140 lines

---

#### 3. `tests/helpers/navigation.ts`
**Purpose:** Navigation and link helper functions
**Functions:**
- `assertFooterLinks(page, minCount)` - Check footer link count
- `clickFooterLink(page, linkText)` - Click and verify navigation
- `assertAnchorScroll(page, anchorId)` - Verify anchor scrolls
- `openMobileNav(page)` - Open hamburger menu
- `closeMobileNav(page)` - Close mobile menu
- `getMainNavLinks(page)` - Get all nav links
- `assertMainNavVisible(page)` - Check nav is visible
- `assertLogoLinksHome(page)` - Verify logo link
- `getAllFooterLinks(page)` - Get all footer links
- `assertBreadcrumbs(page)` - Check breadcrumbs

**Lines:** ~140 lines

---

#### 4. `tests/helpers/forms.ts`
**Purpose:** Form and CTA helper functions
**Functions:**
- `openDemoModal(page)` - Open demo modal
- `closeDemoModal(page)` - Close demo modal
- `fillDemoForm(page, data)` - Fill form fields
- `assertFormValidation(page)` - Check required fields
- `assertDemoFormFields(page)` - Verify form fields exist
- `canSubmitForm(page)` - Check if form is submittable
- `assertCTAButton(page, buttonText)` - Check CTA exists
- `clickCTAAndVerify(page, buttonText, expectedUrl)` - Click and verify

**Lines:** ~160 lines

---

#### 5. `tests/helpers/content.ts`
**Purpose:** Content integrity helper functions
**Functions:**
- `assertEmailConsistency(page, expectedEmail)` - Check all emails match
- `checkForBrandLeakage(page)` - Detect competitor brands
- `assertManufacturingTerminology(page)` - Verify EKAS terms
- `assertContentPresent(page, contentPattern)` - Check for content
- `assertSectionExists(page, headingText)` - Check section by heading
- `getAllHeadings(page)` - Get all h1, h2, h3
- `assertContentStructure(page)` - Verify proper structure
- `checkImagesHaveAlt(page)` - Count missing alt text
- `checkInternalLinks(page)` - Check for broken links

**Lines:** ~150 lines

---

### Spec Files (14 files)

#### 1. `tests/smoke/all-routes.spec.ts`
**Purpose:** Smoke tests for all 26 public routes
**Routes Tested:** 26 routes (see below)
**Tests:** ~30 tests

**Test Coverage:**
- Each route loads with 200 status
- Each route has visible H1
- No console errors
- No network failures
- No placeholder content
- 404 page renders correctly
- 404 page has navigation and footer

**Routes:**
1. `/` - Homepage
2. `/about` - About
3. `/about/founder` - Founder
4. `/demo` - Demo
5. `/security` - Security
6. `/platform` - Platform Hub
7. `/platform/manufacturing-intelligence` - Manufacturing Intelligence
8. `/platform/ai-assistant` - AI Assistant
9. `/platform/data-connections` - Data Connections
10. `/platform/reporting-analytics` - Reporting Analytics
11. `/solutions` - Solutions Hub
12. `/solutions/downtime-reduction` - Downtime Reduction
13. `/solutions/scrap-quality-visibility` - Scrap Quality Visibility
14. `/solutions/capacity-throughput` - Capacity Throughput
15. `/solutions/cost-driver-analysis` - Cost Driver Analysis
16. `/solutions/multi-site-performance` - Multi-Site Performance
17. `/industries` - Industries Hub
18. `/industries/aerospace` - Aerospace
19. `/industries/automotive` - Automotive
20. `/industries/medical-devices` - Medical Devices
21. `/industries/metal-stamping` - Metal Stamping
22. `/industries/industrial-manufacturing` - Industrial Manufacturing
23. `/roles` - Roles Hub
24. `/resources` - Resources Hub
25. `/resources/faqs` - FAQs
26. `/contact` - Contact (optional)

**Lines:** ~190 lines

---

#### 2. `tests/navigation/desktop-nav.spec.ts`
**Purpose:** Desktop navigation menu tests
**Tests:** ~10 tests

**Test Coverage:**
- Main navigation is visible
- Logo links to homepage
- All main nav links are clickable
- Request a Demo CTA is present
- Platform/Solutions/Industries links work
- Navigation persists across pages
- Active route highlighting

**Desktop Only:** Yes (1920x1080)
**Lines:** ~130 lines

---

#### 3. `tests/navigation/mobile-nav.spec.ts`
**Purpose:** Mobile navigation (hamburger menu) tests
**Tests:** ~10 tests

**Test Coverage:**
- Hamburger menu button visible
- Hamburger menu opens and closes
- Mobile nav links accessible
- Mobile CTA functional
- Mobile nav scrolls properly
- Works from different pages
- No horizontal overflow on mobile homepage
- Mobile footer is usable

**Mobile Only:** Yes (375x667)
**Lines:** ~120 lines

---

#### 4. `tests/footer/footer-links.spec.ts`
**Purpose:** All footer links (27 total) including anchor links
**Tests:** ~35 tests

**Test Coverage:**
- Footer is present and visible
- Minimum number of links (20+)
- **Platform Links (5):** All tested individually
- **Solutions Links (6):** All tested individually
- **Industries Links (6):** All tested individually
- **Company Links (4):** All tested individually
- **Resources Links (2):** All tested individually
- **Roles Anchor Links (6):** All tested for scrolling
- **Security Anchor Links (3):** All tested for scrolling
- Footer consistency across pages
- Footer has contact email
- Internal links open in same tab

**Desktop + Mobile:** Desktop primary
**Lines:** ~230 lines

---

#### 5. `tests/solutions/solution-hub.spec.ts`
**Purpose:** Solutions hub page (/solutions)
**Tests:** ~10 tests

**Test Coverage:**
- Hub page loads successfully
- All 5 solution cards present
- **CRITICAL:** Cards do NOT self-reference /solutions
- Downtime Reduction card links correctly
- Scrap & Quality Visibility card links correctly
- Capacity & Throughput card links correctly
- Cost Driver Analysis card links correctly
- Multi-Site Performance card links correctly
- Hub has CTA
- Hub has descriptive content

**Critical Bug Check:** Prevents self-referencing card links
**Lines:** ~150 lines

---

#### 6. `tests/solutions/solution-pages.spec.ts`
**Purpose:** All 5 solution detail pages
**Tests:** ~25 tests (5 pages × 5 tests each)

**Pages Tested:**
1. `/solutions/downtime-reduction`
2. `/solutions/scrap-quality-visibility`
3. `/solutions/capacity-throughput`
4. `/solutions/cost-driver-analysis`
5. `/solutions/multi-site-performance`

**Test Coverage (per page):**
- Page loads successfully (200 status)
- Has proper H1
- Has page title and meta description
- Has "The Problem" section
- Has "How EKAS Helps" section
- Has CTA button
- Has manufacturing-specific content
- Links back to solutions hub

**Plus:** All pages have unique H1s (no duplicates)
**Lines:** ~160 lines

---

#### 7. `tests/forms/demo-modal.spec.ts`
**Purpose:** Demo request modal functionality
**Tests:** ~15 tests

**Test Coverage:**
- Modal opens from homepage CTA
- Modal closes with Escape key
- Modal closes with close button
- Modal has required form fields
- Email format validation
- Required fields enforced
- Form becomes submittable when valid
- Modal opens from solution pages
- Modal is keyboard accessible

**Desktop + Mobile:** Both tested
**Lines:** ~200 lines

---

#### 8. `tests/forms/demo-page.spec.ts`
**Purpose:** Demo page (/demo) and its form
**Tests:** ~15 tests

**Test Coverage:**
- Demo page loads successfully
- Page has form
- Form has required fields (name, email, submit)
- Form has optional fields (company, message)
- Required fields are marked
- Email field validates format
- Form can be filled completely
- Form submission button exists
- Page has descriptive content
- Page has privacy/terms info
- Page is mobile-friendly
- Empty form cannot be submitted
- Invalid email shows error
- Valid form enables submission

**Desktop + Mobile:** Both tested
**Lines:** ~180 lines

---

#### 9. `tests/content/sanity-checks.spec.ts`
**Purpose:** Content integrity checks (placeholder, brand, email)
**Tests:** ~30 tests

**Test Coverage:**
- **Placeholder Detection:**
  - No "lorem ipsum" on any page
  - No "coming soon" on any page
  - No "TBD" or "[placeholder]" on any page
  - Tested on all 9 critical pages

- **Brand Leakage:**
  - No "MachineMetrics" on any page
  - No "Sight Machine" on any page
  - Tested on all 9 critical pages

- **Email Consistency:**
  - All emails are pat@adaptivefactory.net
  - Tested on all 9 critical pages

- **Manufacturing Terminology:**
  - Homepage has EKAS branding
  - Solution pages use manufacturing terms
  - Platform pages mention governed metrics

- **General Quality:**
  - All pages have substantial content
  - No broken internal links on homepage

**Critical Pages:** /, /platform, /solutions, /demo, /about, /security, /solutions/downtime-reduction, /solutions/capacity-throughput, /solutions/scrap-quality-visibility
**Lines:** ~180 lines

---

#### 10. `tests/metadata/seo-basics.spec.ts`
**Purpose:** Metadata and SEO validation
**Tests:** ~35 tests

**Test Coverage:**
- **Page Titles:**
  - All 13 major pages have titles
  - Titles are unique (no duplicates)
  - Titles follow consistent format
  - Reasonable length

- **Meta Descriptions:**
  - All 13 major pages have descriptions
  - Reasonable length (50-200 chars)

- **H1 Tags:**
  - All 13 major pages have H1
  - Each page has exactly one H1
  - H1s are meaningful

- **Language and HTML:**
  - HTML has lang="en"
  - Viewport meta tag present

- **Open Graph:**
  - Homepage has OG tags
  - OG type specified

- **Favicon:**
  - Site has favicon
  - Favicon loads successfully

- **Structure:**
  - Proper heading hierarchy
  - Solution pages have sections

**Pages Tested:** 13 major pages
**Lines:** ~200 lines

---

#### 11. `tests/accessibility/axe-scans.spec.ts`
**Purpose:** WCAG 2.1 AA accessibility testing with axe-core
**Tests:** ~25 tests

**Test Coverage:**
- **axe-core Scans on 13 Pages:**
  - Zero critical violations
  - Zero serious violations
  - Tested: /, /platform, /solutions, /industries, /roles, /demo, /about, /security, all 5 solution pages

- **Specific Checks:**
  - All images have alt text
  - Form inputs have labels
  - Buttons have accessible names
  - Links have accessible names
  - Page has main landmark
  - Page has navigation landmark
  - Color contrast is sufficient

- **Form Accessibility:**
  - Demo form has proper labels

- **Navigation Accessibility:**
  - Navigation is keyboard accessible

- **Mobile Accessibility:**
  - Mobile homepage accessible
  - Mobile navigation accessible

- **404 Accessibility:**
  - 404 page has no critical violations

**WCAG Level:** AA (2.1)
**Lines:** ~220 lines

---

#### 12. `tests/visual/baselines.spec.ts`
**Purpose:** Visual regression testing with screenshots
**Tests:** ~25 tests

**Test Coverage:**
- **Desktop Full-Page (14 pages):**
  - Homepage, all 4 hubs, all 5 solution pages, demo, about, security, founder, 404

- **Mobile Full-Page (4 pages):**
  - Homepage, platform hub, solutions hub, demo page

- **Component Snapshots:**
  - Header, footer, hero section

- **Responsive Breakpoints:**
  - Desktop XL (1920x1080)
  - Desktop Standard (1366x768)
  - Tablet (768x1024)
  - Mobile (375x667)

- **Dark Mode (if implemented):**
  - Homepage dark mode

- **Hover States:**
  - CTA button hover
  - Nav link hover

**Configuration:**
- Full-page screenshots
- Animations disabled
- maxDiffPixels: 100 (desktop), 50 (mobile)

**Lines:** ~190 lines

---

#### 13. `tests/responsive/mobile-checks.spec.ts`
**Purpose:** Mobile responsiveness and layout
**Tests:** ~30 tests

**Test Coverage:**
- **Mobile Layout (375x667):**
  - Homepage renders properly
  - Hero section visible
  - Navigation hamburger works
  - Footer is usable
  - Forms are usable
  - CTA buttons visible and tappable
  - Text is readable (min 14px)

- **Tablet Layout (768x1024):**
  - Layout renders correctly
  - Navigation works

- **No Overflow Tests (6 viewports):**
  - iPhone SE, iPhone 12, iPhone 11
  - iPad, iPad Landscape
  - Laptop

- **Critical Pages Mobile:**
  - 5 critical pages tested

- **Responsive Images:**
  - Images don't cause overflow

- **Touch Targets:**
  - CTA has sufficient size (44x44px)
  - Footer links have sufficient size

**Lines:** ~200 lines

---

#### 14. `tests/responsive/404-page.spec.ts`
**Purpose:** 404 error page comprehensive tests
**Tests:** ~15 tests

**Test Coverage:**
- 404 displays for unknown routes
- Is branded (not default Next.js)
- Has page title
- Has recovery link to homepage
- Has navigation
- Has footer
- No console errors on 404 page
- Recovery link works
- Is mobile responsive
- Multiple 404s work correctly
- Meta tags prevent indexing (noindex)
- Desktop rendering
- Accessibility

**Lines:** ~140 lines

---

## File Organization Summary

```
tests/
├── helpers/                          (5 files, ~720 lines)
│   ├── common.ts                     (~130 lines)
│   ├── metadata.ts                   (~140 lines)
│   ├── navigation.ts                 (~140 lines)
│   ├── forms.ts                      (~160 lines)
│   └── content.ts                    (~150 lines)
│
├── smoke/                            (1 file, ~190 lines)
│   └── all-routes.spec.ts            (~190 lines)
│
├── navigation/                       (2 files, ~250 lines)
│   ├── desktop-nav.spec.ts           (~130 lines)
│   └── mobile-nav.spec.ts            (~120 lines)
│
├── footer/                           (1 file, ~230 lines)
│   └── footer-links.spec.ts          (~230 lines)
│
├── solutions/                        (2 files, ~310 lines)
│   ├── solution-hub.spec.ts          (~150 lines)
│   └── solution-pages.spec.ts        (~160 lines)
│
├── forms/                            (2 files, ~380 lines)
│   ├── demo-modal.spec.ts            (~200 lines)
│   └── demo-page.spec.ts             (~180 lines)
│
├── content/                          (1 file, ~180 lines)
│   └── sanity-checks.spec.ts         (~180 lines)
│
├── metadata/                         (1 file, ~200 lines)
│   └── seo-basics.spec.ts            (~200 lines)
│
├── accessibility/                    (1 file, ~220 lines)
│   └── axe-scans.spec.ts             (~220 lines)
│
├── visual/                           (1 file, ~190 lines)
│   └── baselines.spec.ts             (~190 lines)
│
└── responsive/                       (2 files, ~340 lines)
    ├── mobile-checks.spec.ts         (~200 lines)
    └── 404-page.spec.ts              (~140 lines)
```

---

## Total Line Count

| Category | Files | Lines |
|----------|-------|-------|
| Helper Files | 5 | ~720 |
| Spec Files | 14 | ~2,490 |
| **TOTAL** | **19** | **~3,210** |

---

## Test Distribution by Category

| Category | Tests | Lines |
|----------|-------|-------|
| Smoke Tests | ~30 | ~190 |
| Navigation | ~20 | ~250 |
| Footer | ~35 | ~230 |
| Solutions | ~35 | ~310 |
| Forms | ~30 | ~380 |
| Content | ~30 | ~180 |
| Metadata | ~35 | ~200 |
| Accessibility | ~25 | ~220 |
| Visual | ~25 | ~190 |
| Responsive | ~45 | ~340 |
| **TOTAL** | **~310** | **~2,490** |

---

## Desktop vs Mobile Coverage

| Viewport | Primary Test Files | Tests |
|----------|-------------------|-------|
| Desktop (1920x1080) | 9 files | ~180 tests |
| Mobile (375x667) | 5 files | ~80 tests |
| Both | All files | ~50 tests |
| **TOTAL** | **14 spec files** | **~310 tests** |

---

## Routes Tested by File

| File | Routes Covered |
|------|----------------|
| all-routes.spec.ts | All 26 routes |
| footer-links.spec.ts | All 26 routes (via footer links) |
| solution-hub.spec.ts | 1 route (/solutions) |
| solution-pages.spec.ts | 5 routes (all solution pages) |
| demo-page.spec.ts | 1 route (/demo) |
| seo-basics.spec.ts | 13 major routes |
| axe-scans.spec.ts | 13 major routes |
| baselines.spec.ts | 14 desktop + 4 mobile routes |
| mobile-checks.spec.ts | 5 critical routes |
| 404-page.spec.ts | Unknown routes (404) |

---

## Conclusion

This inventory documents a comprehensive Playwright test suite with:
- **19 TypeScript files** (14 spec + 5 helper)
- **~3,210 lines of code**
- **~310 individual tests**
- **100% route coverage** (all 26 routes)
- **100% footer link coverage** (all 27 links)
- **Full category coverage** (smoke, navigation, footer, solutions, forms, content, metadata, accessibility, visual, responsive)

The test suite is well-organized, modular, and follows TypeScript best practices with reusable helper functions.

---

**End of Test Inventory**
