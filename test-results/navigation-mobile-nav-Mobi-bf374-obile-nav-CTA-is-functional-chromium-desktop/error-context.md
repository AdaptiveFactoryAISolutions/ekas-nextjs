# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: navigation/mobile-nav.spec.ts >> Mobile Navigation >> Mobile nav CTA is functional
- Location: tests/navigation/mobile-nav.spec.ts:79:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator:  locator('button:has-text("Request a Demo"), a:has-text("Request a Demo")').first()
Expected: visible
Received: hidden
Timeout:  5000ms

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for locator('button:has-text("Request a Demo"), a:has-text("Request a Demo")').first()
    9 × locator resolved to <button class="btn-primary btn-sm">Request a Demo</button>
      - unexpected value "hidden"

```

# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - navigation [ref=e2]:
    - generic [ref=e3]:
      - link "EKAS Homepage" [ref=e4] [cursor=pointer]:
        - /url: /
        - img "EKAS" [ref=e5]
      - button "Toggle mobile menu" [ref=e6] [cursor=pointer]:
        - img [ref=e7]
  - main [ref=e8]:
    - generic [ref=e11]:
      - generic [ref=e12]:
        - generic [ref=e14]: Manufacturing Intelligence Platform
        - heading "Grounded Manufacturing Intelligence for Operations Leaders" [level=1] [ref=e15]
        - paragraph [ref=e16]: Answer plant questions, track time variance, and reduce downtime using traceable production data.
        - generic [ref=e17]:
          - button "Request a Demo →" [ref=e18] [cursor=pointer]
          - link "See the Platform" [ref=e19] [cursor=pointer]:
            - /url: /platform
        - generic [ref=e20]:
          - generic [ref=e21]:
            - img [ref=e22]
            - generic [ref=e24]: Built for manufacturing operations
          - generic [ref=e25]:
            - img [ref=e26]
            - generic [ref=e28]: Grounded in production data
          - generic [ref=e29]:
            - img [ref=e30]
            - generic [ref=e32]: Governed metrics and traceable answers
      - img "EKAS Platform Dashboard" [ref=e35]
    - generic [ref=e38]:
      - generic [ref=e42]: Manufacturing-Focused
      - generic [ref=e46]: Traceable Answers
      - generic [ref=e50]: Governed Metrics
      - generic [ref=e54]: Audit-Ready Workflows
      - generic [ref=e58]: Pilot-Ready Engagement
      - generic [ref=e62]: Built From Plant Experience
    - generic [ref=e64]:
      - generic [ref=e65]:
        - generic [ref=e66]: The Gap EKAS Fills
        - heading "Three Core Problems in Manufacturing Intelligence" [level=2] [ref=e67]
      - generic [ref=e68]:
        - generic [ref=e69]:
          - heading "Ungoverned Metrics" [level=3] [ref=e70]
          - paragraph [ref=e71]: Every team calculates OEE, downtime, and variance differently. Without versioned SQL and governed definitions, metrics drift and teams can't trust the numbers.
        - generic [ref=e72]:
          - heading "No Data Provenance" [level=3] [ref=e73]
          - paragraph [ref=e74]: When a metric changes, you can't trace it back to source data. Audit trails are incomplete, and traceability is manual. EKAS provides full provenance from answer to raw data.
        - generic [ref=e75]:
          - heading "Ungrounded AI Answers" [level=3] [ref=e76]
          - paragraph [ref=e77]: LLMs hallucinate when trained on production data. EKAS uses retrieval-only architecture with zero training, so every answer is grounded in your actual data with full citation.
    - generic [ref=e79]:
      - generic [ref=e80]:
        - generic [ref=e81]: Common Questions
        - heading "What Operations Teams Ask About EKAS" [level=2] [ref=e82]
      - generic [ref=e83]:
        - group [ref=e84]:
          - generic "How is EKAS different from our MES or BI tool?" [ref=e85] [cursor=pointer]:
            - heading "How is EKAS different from our MES or BI tool?" [level=3] [ref=e86]
            - img [ref=e87]
        - group [ref=e89]:
          - generic "What systems does EKAS connect to?" [ref=e90] [cursor=pointer]:
            - heading "What systems does EKAS connect to?" [level=3] [ref=e91]
            - img [ref=e92]
        - group [ref=e94]:
          - generic "How long does implementation take?" [ref=e95] [cursor=pointer]:
            - heading "How long does implementation take?" [level=3] [ref=e96]
            - img [ref=e97]
        - group [ref=e99]:
          - generic "Is my production data secure?" [ref=e100] [cursor=pointer]:
            - heading "Is my production data secure?" [level=3] [ref=e101]
            - img [ref=e102]
        - group [ref=e104]:
          - generic "Does EKAS support IATF 16949 and ISO compliance?" [ref=e105] [cursor=pointer]:
            - heading "Does EKAS support IATF 16949 and ISO compliance?" [level=3] [ref=e106]
            - img [ref=e107]
    - generic [ref=e110]:
      - heading "Bring One Plant Problem. We'll Show You How EKAS Approaches It." [level=2] [ref=e111]
      - paragraph [ref=e112]: See how grounded manufacturing intelligence can help your team move faster on downtime, time variance, quality losses, and production visibility.
      - button "Request a Demo" [ref=e114] [cursor=pointer]
    - generic [ref=e116]:
      - generic [ref=e117]:
        - generic [ref=e118]:
          - img "EKAS" [ref=e119]
          - paragraph [ref=e120]: Michigan, USA
          - paragraph [ref=e121]: pat@adaptivefactory.net
        - generic [ref=e122]:
          - paragraph [ref=e123]: Platform
          - list [ref=e124]:
            - listitem [ref=e125]:
              - link "Overview" [ref=e126] [cursor=pointer]:
                - /url: /platform
            - listitem [ref=e127]:
              - link "AI Assistant" [ref=e128] [cursor=pointer]:
                - /url: /platform/ai-assistant
            - listitem [ref=e129]:
              - link "Manufacturing Intelligence" [ref=e130] [cursor=pointer]:
                - /url: /platform/manufacturing-intelligence
            - listitem [ref=e131]:
              - link "Data Connections" [ref=e132] [cursor=pointer]:
                - /url: /platform/data-connections
            - listitem [ref=e133]:
              - link "Reporting & Analytics" [ref=e134] [cursor=pointer]:
                - /url: /platform/reporting-analytics
            - listitem [ref=e135]:
              - link "Governance & Auditability" [ref=e136] [cursor=pointer]:
                - /url: /security
        - generic [ref=e137]:
          - paragraph [ref=e138]: Solutions
          - list [ref=e139]:
            - listitem [ref=e140]:
              - link "Downtime Reduction" [ref=e141] [cursor=pointer]:
                - /url: /solutions/downtime-reduction
            - listitem [ref=e142]:
              - link "Scrap & Quality Visibility" [ref=e143] [cursor=pointer]:
                - /url: /solutions/scrap-quality-visibility
            - listitem [ref=e144]:
              - link "Capacity & Throughput" [ref=e145] [cursor=pointer]:
                - /url: /solutions/capacity-throughput
            - listitem [ref=e146]:
              - link "Cost Driver Analysis" [ref=e147] [cursor=pointer]:
                - /url: /solutions/cost-driver-analysis
            - listitem [ref=e148]:
              - link "Multi-Site Performance" [ref=e149] [cursor=pointer]:
                - /url: /solutions/multi-site-performance
        - generic [ref=e150]:
          - paragraph [ref=e151]: Roles
          - list [ref=e152]:
            - listitem [ref=e153]:
              - link "Plant Managers" [ref=e154] [cursor=pointer]:
                - /url: /roles#plant-managers
            - listitem [ref=e155]:
              - link "Operations Leaders" [ref=e156] [cursor=pointer]:
                - /url: /roles#operations-leaders
            - listitem [ref=e157]:
              - link "Manufacturing Engineering" [ref=e158] [cursor=pointer]:
                - /url: /roles#manufacturing-engineering
            - listitem [ref=e159]:
              - link "Quality Leaders" [ref=e160] [cursor=pointer]:
                - /url: /roles#quality-leaders
            - listitem [ref=e161]:
              - link "Finance Leaders" [ref=e162] [cursor=pointer]:
                - /url: /roles#finance-leaders
            - listitem [ref=e163]:
              - link "Executive / PE Operations" [ref=e164] [cursor=pointer]:
                - /url: /roles#executive-operations
        - generic [ref=e165]:
          - paragraph [ref=e166]: Industries
          - list [ref=e167]:
            - listitem [ref=e168]:
              - link "Metal Stamping" [ref=e169] [cursor=pointer]:
                - /url: /industries/metal-stamping
            - listitem [ref=e170]:
              - link "Automotive" [ref=e171] [cursor=pointer]:
                - /url: /industries/automotive
            - listitem [ref=e172]:
              - link "Aerospace" [ref=e173] [cursor=pointer]:
                - /url: /industries/aerospace
            - listitem [ref=e174]:
              - link "Medical Devices" [ref=e175] [cursor=pointer]:
                - /url: /industries/medical-devices
            - listitem [ref=e176]:
              - link "Industrial Manufacturing" [ref=e177] [cursor=pointer]:
                - /url: /industries/industrial-manufacturing
        - generic [ref=e178]:
          - paragraph [ref=e179]: Trust
          - list [ref=e180]:
            - listitem [ref=e181]:
              - link "Security" [ref=e182] [cursor=pointer]:
                - /url: /security
            - listitem [ref=e183]:
              - link "Governance" [ref=e184] [cursor=pointer]:
                - /url: /security#governance
            - listitem [ref=e185]:
              - link "Data Handling" [ref=e186] [cursor=pointer]:
                - /url: /security#data-handling
            - listitem [ref=e187]:
              - link "Architecture" [ref=e188] [cursor=pointer]:
                - /url: /security#architecture
        - generic [ref=e189]:
          - paragraph [ref=e190]: Resources
          - list [ref=e191]:
            - listitem [ref=e192]:
              - link "FAQs" [ref=e193] [cursor=pointer]:
                - /url: /resources/faqs
        - generic [ref=e194]:
          - paragraph [ref=e195]: Company
          - list [ref=e196]:
            - listitem [ref=e197]:
              - link "About" [ref=e198] [cursor=pointer]:
                - /url: /about
            - listitem [ref=e199]:
              - link "Founder" [ref=e200] [cursor=pointer]:
                - /url: /about/founder
            - listitem [ref=e201]:
              - link "Contact" [ref=e202] [cursor=pointer]:
                - /url: /demo
      - generic [ref=e204]:
        - paragraph [ref=e205]: EKAS is in active development. All pilot engagements are paid professional programs. AdaptiveFactory AI Solutions, Inc. is an independent Michigan C-corporation.
        - generic [ref=e206]:
          - generic [ref=e207]:
            - generic [ref=e208]: Infrastructure
            - img "Powered by AWS" [ref=e209]
          - generic [ref=e210]:
            - generic [ref=e211]: Code Quality
            - img "SonarCloud" [ref=e212]
      - paragraph [ref=e213]: © 2026 AdaptiveFactory AI Solutions, Inc.
  - button "Open Next.js Dev Tools" [ref=e219] [cursor=pointer]:
    - img [ref=e220]
  - alert [ref=e223]
```

# Test source

```ts
  1   | /**
  2   |  * Mobile Navigation Tests
  3   |  * EKAS Manufacturing Intelligence Platform
  4   |  *
  5   |  * Tests mobile navigation (hamburger menu) functionality
  6   |  */
  7   | 
  8   | import { test, expect } from '@playwright/test';
  9   | import { openMobileNav, closeMobileNav } from '../helpers/navigation';
  10  | import { waitForPageLoad } from '../helpers/common';
  11  | 
  12  | test.describe('Mobile Navigation', () => {
  13  |   test.use({ viewport: { width: 375, height: 667 } });
  14  | 
  15  |   test('Hamburger menu button is visible on mobile', async ({ page }) => {
  16  |     await page.goto('/');
  17  |     await waitForPageLoad(page);
  18  | 
  19  |     // Look for mobile menu button
  20  |     const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), [data-testid="mobile-menu-button"], button.hamburger').first();
  21  | 
  22  |     await expect(menuButton).toBeVisible();
  23  |   });
  24  | 
  25  |   test('Hamburger menu opens and closes', async ({ page }) => {
  26  |     await page.goto('/');
  27  |     await waitForPageLoad(page);
  28  | 
  29  |     // Find and click hamburger button
  30  |     const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), [data-testid="mobile-menu-button"], button.hamburger').first();
  31  | 
  32  |     await menuButton.click();
  33  |     await page.waitForTimeout(500);
  34  | 
  35  |     // Mobile nav should be visible
  36  |     const mobileNav = page.locator('nav[data-mobile], [data-testid="mobile-nav"], .mobile-menu, [role="dialog"]').first();
  37  | 
  38  |     // If mobile nav is in a dialog/drawer
  39  |     const isVisible = await mobileNav.isVisible().catch(() => false);
  40  | 
  41  |     if (isVisible) {
  42  |       // Try to close it
  43  |       const closeButton = page.locator('button[aria-label*="close" i], button:has-text("Close")').first();
  44  | 
  45  |       if (await closeButton.isVisible()) {
  46  |         await closeButton.click();
  47  |         await page.waitForTimeout(500);
  48  | 
  49  |         // Nav should be hidden
  50  |         const stillVisible = await mobileNav.isVisible().catch(() => false);
  51  |         expect(stillVisible).toBe(false);
  52  |       } else {
  53  |         // Try clicking outside or pressing Escape
  54  |         await page.keyboard.press('Escape');
  55  |         await page.waitForTimeout(500);
  56  |       }
  57  |     }
  58  |   });
  59  | 
  60  |   test('Mobile nav links are accessible', async ({ page }) => {
  61  |     await page.goto('/');
  62  |     await waitForPageLoad(page);
  63  | 
  64  |     // Open mobile menu
  65  |     const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), [data-testid="mobile-menu-button"], button.hamburger').first();
  66  | 
  67  |     if (await menuButton.isVisible()) {
  68  |       await menuButton.click();
  69  |       await page.waitForTimeout(500);
  70  | 
  71  |       // Find nav links (they might be in different containers on mobile)
  72  |       const navLinks = page.locator('a[href^="/"]').filter({ hasText: /Platform|Solutions|Industries|About|Demo/i });
  73  | 
  74  |       const count = await navLinks.count();
  75  |       expect(count).toBeGreaterThan(0);
  76  |     }
  77  |   });
  78  | 
  79  |   test('Mobile nav CTA is functional', async ({ page }) => {
  80  |     await page.goto('/');
  81  |     await waitForPageLoad(page);
  82  | 
  83  |     // Look for demo CTA (might be outside nav on mobile)
  84  |     const demoCTA = page.locator('button:has-text("Request a Demo"), a:has-text("Request a Demo")').first();
  85  | 
> 86  |     await expect(demoCTA).toBeVisible();
      |                           ^ Error: expect(locator).toBeVisible() failed
  87  |   });
  88  | 
  89  |   test('Mobile nav scrolls properly', async ({ page }) => {
  90  |     await page.goto('/');
  91  |     await waitForPageLoad(page);
  92  | 
  93  |     // Open mobile menu if it exists
  94  |     const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu")').first();
  95  | 
  96  |     if (await menuButton.isVisible()) {
  97  |       await menuButton.click();
  98  |       await page.waitForTimeout(500);
  99  | 
  100 |       // Mobile nav should be scrollable if content overflows
  101 |       const mobileNav = page.locator('nav[data-mobile], [data-testid="mobile-nav"], .mobile-menu').first();
  102 | 
  103 |       if (await mobileNav.isVisible()) {
  104 |         // Try to scroll within nav
  105 |         await mobileNav.evaluate((el) => {
  106 |           el.scrollTop = 100;
  107 |         }).catch(() => {
  108 |           // Scrolling might not be needed if content fits
  109 |         });
  110 |       }
  111 |     }
  112 |   });
  113 | 
  114 |   test('Mobile navigation works from different pages', async ({ page }) => {
  115 |     await page.goto('/solutions');
  116 |     await waitForPageLoad(page);
  117 | 
  118 |     // Mobile menu should work from any page
  119 |     const menuButton = page.locator('button[aria-label*="menu" i], button:has-text("Menu"), [data-testid="mobile-menu-button"]').first();
  120 | 
  121 |     if (await menuButton.isVisible()) {
  122 |       await menuButton.click();
  123 |       await page.waitForTimeout(500);
  124 | 
  125 |       // Should show navigation
  126 |       const hasVisibleNav = await page.locator('nav a[href="/"]').isVisible().catch(() => false);
  127 |       expect(hasVisibleNav || true).toBeTruthy(); // Flexible check
  128 |     }
  129 |   });
  130 | 
  131 |   test('No horizontal overflow on mobile homepage', async ({ page }) => {
  132 |     await page.goto('/');
  133 |     await waitForPageLoad(page);
  134 | 
  135 |     const bodyWidth = await page.evaluate(() => document.body.scrollWidth);
  136 |     const viewportWidth = await page.evaluate(() => window.innerWidth);
  137 | 
  138 |     expect(bodyWidth).toBeLessThanOrEqual(viewportWidth + 5); // 5px tolerance
  139 |   });
  140 | 
  141 |   test('Mobile footer is usable', async ({ page }) => {
  142 |     await page.goto('/');
  143 |     await waitForPageLoad(page);
  144 | 
  145 |     // Scroll to footer
  146 |     await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  147 |     await page.waitForTimeout(500);
  148 | 
  149 |     const footer = page.locator('footer').first();
  150 |     await expect(footer).toBeVisible();
  151 | 
  152 |     // Footer should have links
  153 |     const footerLinks = page.locator('footer a[href]');
  154 |     const count = await footerLinks.count();
  155 |     expect(count).toBeGreaterThan(5);
  156 |   });
  157 | });
  158 | 
```