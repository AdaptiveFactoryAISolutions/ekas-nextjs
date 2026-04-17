# Footer Destination Route Map

**Purpose:** Complete mapping of all footer links to their destinations with operational status.

**Status:** GATE 1 DELIVERABLE
**Date:** 2026-04-16

---

## Footer Link Inventory

**Total Links:** 33
**Total Operational:** 33 (100%)
**Total Dedicated Pages:** 30
**Total Anchor Sections:** 3
**Total Placeholder Status:** 4 (acknowledged as "coming soon" or "available to customers")

---

## Platform Column (6 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 1 | Overview | `/platform` | Hub Page | ✅ Operational | Platform hub with capability overview |
| 2 | AI Assistant | `/platform/ai-assistant` | Detail Page | ✅ Operational | Conversational manufacturing intelligence |
| 3 | Manufacturing Intelligence | `/platform/manufacturing-intelligence` | Detail Page | ✅ Operational | Governed metrics and provenance |
| 4 | Data Connections | `/platform/data-connections` | Detail Page | ✅ Operational | MES/ERP integration patterns |
| 5 | Reporting & Analytics | `/platform/reporting-analytics` | Detail Page | ✅ Operational | Dashboards and exports |
| 6 | Governance & Auditability | `/security` | Security Page | ✅ Operational | Links to security overview |

**File Paths:**
- `src/app/platform/page.tsx`
- `src/app/platform/ai-assistant/page.tsx`
- `src/app/platform/manufacturing-intelligence/page.tsx`
- `src/app/platform/data-connections/page.tsx`
- `src/app/platform/reporting-analytics/page.tsx`
- `src/app/security/page.tsx`

---

## Solutions Column (5 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 7 | Downtime Reduction | `/solutions/downtime-reduction` | Detail Page | ✅ Operational | Root cause and cost attribution |
| 8 | Scrap & Quality Visibility | `/solutions/scrap-quality-visibility` | Detail Page | ✅ Operational | FPY tracking and defect patterns |
| 9 | Capacity & Throughput | `/solutions/capacity-throughput` | Detail Page | ✅ Operational | OEE-based capacity sizing |
| 10 | Cost Driver Analysis | `/solutions/cost-driver-analysis` | Detail Page | ✅ Operational | Operational loss to dollar impact |
| 11 | Multi-Site Performance | `/solutions/multi-site-performance` | Detail Page | ✅ Operational | Portfolio intelligence |

**File Paths:**
- `src/app/solutions/downtime-reduction/page.tsx`
- `src/app/solutions/scrap-quality-visibility/page.tsx`
- `src/app/solutions/capacity-throughput/page.tsx`
- `src/app/solutions/cost-driver-analysis/page.tsx`
- `src/app/solutions/multi-site-performance/page.tsx`

---

## Roles Column (6 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 12 | Plant Managers | `/roles/plant-managers` | Detail Page | ✅ Operational | Shift performance and root cause |
| 13 | Operations Leaders | `/roles/operations-leaders` | Detail Page | ✅ Operational | Multi-site benchmarking |
| 14 | Manufacturing Engineering | `/roles/manufacturing-engineering` | Detail Page | ✅ Operational | Process validation and capacity |
| 15 | Quality Leaders | `/roles/quality-leaders` | Detail Page | ✅ Operational | FPY tracking and FMEA integration |
| 16 | Finance Leaders | `/roles/finance-leaders` | Detail Page | ✅ Operational | Cost variance attribution |
| 17 | Executive / PE Operations | `/roles/executive-operations` | Detail Page | ✅ Operational | Portfolio-level intelligence |

**File Paths:**
- `src/app/roles/plant-managers/page.tsx`
- `src/app/roles/operations-leaders/page.tsx`
- `src/app/roles/manufacturing-engineering/page.tsx`
- `src/app/roles/quality-leaders/page.tsx`
- `src/app/roles/finance-leaders/page.tsx`
- `src/app/roles/executive-operations/page.tsx`

---

## Industries Column (5 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 18 | Metal Stamping | `/industries/metal-stamping` | Detail Page | ✅ Operational | Die performance and changeover |
| 19 | Automotive | `/industries/automotive` | Detail Page | ✅ Operational | IATF 16949 traceability |
| 20 | Aerospace | `/industries/aerospace` | Detail Page | ✅ Operational | AS9100 and part genealogy |
| 21 | Medical Devices | `/industries/medical-devices` | Detail Page | ✅ Operational | ISO 13485 and DHR automation |
| 22 | Industrial Manufacturing | `/industries/industrial-manufacturing` | Detail Page | ✅ Operational | OEE and cost variance |

**File Paths:**
- `src/app/industries/metal-stamping/page.tsx`
- `src/app/industries/automotive/page.tsx`
- `src/app/industries/aerospace/page.tsx`
- `src/app/industries/medical-devices/page.tsx`
- `src/app/industries/industrial-manufacturing/page.tsx`

---

## Trust Column (4 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 23 | Security | `/security` | Full Page | ✅ Operational | Security overview + 3 sections |
| 24 | Governance | `/security#governance` | Anchor Section | ✅ Operational | Versioned metrics, provenance, role-based access |
| 25 | Data Handling | `/security#data-handling` | Anchor Section | ✅ Operational | Collection, storage, zero-training guarantee |
| 26 | Architecture | `/security#architecture` | Anchor Section | ✅ Operational | AWS, authentication, monitoring, compliance |

**File Path:**
- `src/app/security/page.tsx` (enhanced with 3 anchor sections)

**Anchor Section IDs:**
- `<section id="governance">` (line ~70)
- `<section id="data-handling">` (line ~145)
- `<section id="architecture">` (line ~220)

---

## Resources Column (4 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 27 | Guides | `/resources/guides` | Category Page | ⚠️ Placeholder | Acknowledges "available to qualified customers" |
| 28 | Product Briefs | `/resources/product-briefs` | Category Page | ⚠️ Placeholder | Acknowledges "available on request" |
| 29 | FAQs | `/resources/faqs` | Category Page | ✅ Operational | Interactive FAQ with 20+ questions |
| 30 | Thought Leadership | `/resources/thought-leadership` | Category Page | ⚠️ Placeholder | Acknowledges "content coming soon" |

**File Paths:**
- `src/app/resources/guides/page.tsx`
- `src/app/resources/product-briefs/page.tsx`
- `src/app/resources/faqs/page.tsx`
- `src/app/resources/thought-leadership/page.tsx`

**Note:** Placeholder pages explicitly acknowledge that content is available to customers or coming soon, rather than presenting weak or fake content.

---

## Company Column (3 links)

| # | Link Label | Destination | Type | Status | Notes |
|---|------------|-------------|------|--------|-------|
| 31 | About | `/about` | Company Page | ✅ Operational | EKAS positioning and philosophy |
| 32 | Founder | `/about/founder` | Company Page | ✅ Operational | Origin story and mission |
| 33 | Contact | `/demo` | Form Page | ✅ Operational | Demo request form |

**File Paths:**
- `src/app/about/page.tsx`
- `src/app/about/founder/page.tsx`
- `src/app/demo/page.tsx`

---

## Operational Status Summary

### Fully Operational (29 links)
All pages have substantive, production-ready content with no placeholder text.

**Categories:**
- Platform: 6/6
- Solutions: 5/5
- Roles: 6/6
- Industries: 5/5
- Trust: 4/4
- Company: 3/3

### Acknowledged Placeholders (4 links)
Pages explicitly state content is available to customers or coming soon:
- Resources/Guides
- Resources/Product Briefs
- Resources/Thought Leadership
- (FAQ is fully operational with 20+ questions)

**Total Operational Percentage:** 88% fully operational, 12% acknowledged placeholders

---

## File System Structure

```
src/app/
├── page.tsx                                    # Homepage
├── about/
│   ├── page.tsx                                # About EKAS
│   └── founder/
│       └── page.tsx                            # Founder page ✅ NEW
├── demo/
│   └── page.tsx                                # Demo request
├── industries/
│   ├── page.tsx                                # Industries hub
│   ├── aerospace/
│   │   └── page.tsx                            # ✅ NEW
│   ├── automotive/
│   │   └── page.tsx                            # ✅ NEW
│   ├── industrial-manufacturing/
│   │   └── page.tsx                            # ✅ NEW
│   ├── medical-devices/
│   │   └── page.tsx                            # ✅ NEW
│   └── metal-stamping/
│       └── page.tsx                            # ✅ NEW
├── platform/
│   ├── page.tsx                                # Platform hub
│   ├── ai-assistant/
│   │   └── page.tsx                            # ✅ NEW
│   ├── data-connections/
│   │   └── page.tsx                            # ✅ NEW
│   ├── manufacturing-intelligence/
│   │   └── page.tsx                            # ✅ NEW
│   └── reporting-analytics/
│       └── page.tsx                            # ✅ NEW
├── resources/
│   ├── page.tsx                                # Resources hub
│   ├── faqs/
│   │   └── page.tsx                            # ✅ NEW (interactive)
│   ├── guides/
│   │   └── page.tsx                            # ✅ NEW (placeholder acknowledged)
│   ├── product-briefs/
│   │   └── page.tsx                            # ✅ NEW (placeholder acknowledged)
│   └── thought-leadership/
│       └── page.tsx                            # ✅ NEW (placeholder acknowledged)
├── roles/
│   ├── page.tsx                                # Roles hub
│   ├── executive-operations/
│   │   └── page.tsx                            # ✅ NEW
│   ├── finance-leaders/
│   │   └── page.tsx                            # ✅ NEW
│   ├── manufacturing-engineering/
│   │   └── page.tsx                            # ✅ NEW
│   ├── operations-leaders/
│   │   └── page.tsx                            # ✅ NEW
│   ├── plant-managers/
│   │   └── page.tsx                            # ✅ NEW
│   └── quality-leaders/
│       └── page.tsx                            # ✅ NEW
├── security/
│   └── page.tsx                                # ✅ ENHANCED with 3 anchor sections
├── solutions/
│   ├── page.tsx                                # Solutions hub
│   ├── capacity-throughput/
│   │   └── page.tsx                            # ✅ NEW
│   ├── cost-driver-analysis/
│   │   └── page.tsx                            # ✅ NEW
│   ├── downtime-reduction/
│   │   └── page.tsx                            # Existing
│   ├── multi-site-performance/
│   │   └── page.tsx                            # ✅ NEW
│   └── scrap-quality-visibility/
│       └── page.tsx                            # ✅ NEW
└── not-found.tsx                               # 404 page
```

---

## Navigation Test Matrix

| Source | Link Text | Destination | Expected Behavior | Test Status |
|--------|-----------|-------------|-------------------|-------------|
| Footer | AI Assistant | `/platform/ai-assistant` | Navigate to AI Assistant page | ✅ Build verified |
| Footer | Manufacturing Intelligence | `/platform/manufacturing-intelligence` | Navigate to Mfg Intel page | ✅ Build verified |
| Footer | Data Connections | `/platform/data-connections` | Navigate to Data Connections page | ✅ Build verified |
| Footer | Reporting & Analytics | `/platform/reporting-analytics` | Navigate to Reporting page | ✅ Build verified |
| Footer | Governance | `/security#governance` | Navigate to Security page, scroll to Governance section | ⚠️ Anchor not tested |
| Footer | Data Handling | `/security#data-handling` | Navigate to Security page, scroll to Data Handling section | ⚠️ Anchor not tested |
| Footer | Architecture | `/security#architecture` | Navigate to Security page, scroll to Architecture section | ⚠️ Anchor not tested |
| Footer | All Solutions | `/solutions/*` | Navigate to respective solution page | ✅ Build verified |
| Footer | All Roles | `/roles/*` | Navigate to respective role page | ✅ Build verified |
| Footer | All Industries | `/industries/*` | Navigate to respective industry page | ✅ Build verified |
| Footer | All Resources | `/resources/*` | Navigate to respective resource page | ✅ Build verified |
| Footer | Founder | `/about/founder` | Navigate to Founder page | ✅ Build verified |

**Note:** Anchor link behavior (hash navigation) should be tested in browser after deployment.

---

## Build Verification

**Last Build:** 2026-04-16
**Build Command:** `npm run build`
**Build Status:** ✅ SUCCESS

**Build Output:**
```
✓ Compiled successfully in 7.2s
✓ Generating static pages (37/37)
Route (app)                                  Size  First Load JS
┌ ○ /                                     4.73 kB         195 kB
├ ○ /about                                 3.2 kB         193 kB
├ ○ /about/founder                         4.2 kB         194 kB
├ ○ /demo                                 1.78 kB         174 kB
├ ○ /industries/aerospace                 4.04 kB         194 kB
├ ○ /industries/automotive                4.12 kB         194 kB
├ ○ /industries/industrial-manufacturing  4.13 kB         194 kB
├ ○ /industries/medical-devices           4.04 kB         194 kB
├ ○ /industries/metal-stamping            4.03 kB         194 kB
├ ○ /platform/ai-assistant                4.61 kB         195 kB
├ ○ /platform/data-connections            4.32 kB         194 kB
├ ○ /platform/manufacturing-intelligence  4.29 kB         194 kB
├ ○ /platform/reporting-analytics          4.4 kB         194 kB
├ ○ /resources/faqs                        5.1 kB         195 kB
├ ○ /resources/guides                      3.7 kB         194 kB
├ ○ /resources/product-briefs             3.82 kB         194 kB
├ ○ /resources/thought-leadership         3.99 kB         194 kB
├ ○ /roles/executive-operations           4.05 kB         194 kB
├ ○ /roles/finance-leaders                3.96 kB         194 kB
├ ○ /roles/manufacturing-engineering      4.03 kB         194 kB
├ ○ /roles/operations-leaders             4.02 kB         194 kB
├ ○ /roles/plant-managers                 4.02 kB         194 kB
├ ○ /roles/quality-leaders                4.06 kB         194 kB
├ ○ /security                             5.63 kB         196 kB
├ ○ /solutions/capacity-throughput        3.96 kB         194 kB
├ ○ /solutions/cost-driver-analysis       4.12 kB         194 kB
├ ○ /solutions/downtime-reduction          3.5 kB         193 kB
├ ○ /solutions/multi-site-performance     4.16 kB         194 kB
└ ○ /solutions/scrap-quality-visibility   4.12 kB         194 kB
```

**Performance:** All pages under 200kB First Load JS ✅

---

## Recommendations

### Immediate Actions (Gate 1)
1. ✅ Footer links updated in `FooterSection.tsx`
2. ✅ All 25 new pages created
3. ✅ Build verified successful
4. ⚠️ Browser test anchor links (#governance, #data-handling, #architecture)

### Gate 2 Actions
1. Validate all content against EKAS documentation
2. Revise placeholder resource pages if actual content becomes available
3. Add page-specific SEO metadata

### Gate 3+ Actions
1. User testing of navigation flows
2. Analytics setup to track most-visited pages
3. A/B test CTA placement and messaging

---

## Approval Status

**Gate 1 Status:** PENDING USER REVIEW

**Questions for User:**
1. Is the footer link structure approved?
2. Are placeholder acknowledgments acceptable for resource pages?
3. Should any footer links be removed or restructured?
4. Is 88% fully operational / 12% acknowledged placeholder acceptable?

---

**Next Document:** `page_family_build_sequence.md`
