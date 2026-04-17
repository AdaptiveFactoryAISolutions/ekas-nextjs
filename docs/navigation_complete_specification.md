# EKAS Navigation Complete Specification
**Combines:** Site Map | Gap Analysis | Final Navigation IA | Implementation Spec
**Date:** 2026-04-17
**Status:** APPROVED FOR IMPLEMENTATION

---

## Site Navigation Master Map

### All Public Pages (26 total)

| Route | Title | Category | Buyer Purpose | Nav Priority | Fly-out Slot |
|-------|-------|----------|---------------|--------------|--------------|
| `/` | Homepage | Conversion | First impression | PRIMARY | No (direct link) |
| `/platform` | Platform Hub | Conversion | Capability overview | PRIMARY | Parent + fly-out |
| `/platform/ai-assistant` | AI Assistant | Capability | AI architecture | SECONDARY | Yes - Platform fly-out |
| `/platform/manufacturing-intelligence` | Manufacturing Intelligence | Capability | Governed metrics | SECONDARY | Yes - Platform fly-out |
| `/platform/data-connections` | Data Connections | Capability | Integration approach | SECONDARY | Yes - Platform fly-out |
| `/platform/reporting-analytics` | Reporting & Analytics | Capability | Analytics foundation | SECONDARY | Yes - Platform fly-out |
| `/solutions` | Solutions Hub | Conversion | Problem categories | PRIMARY | Parent + fly-out |
| `/solutions/downtime-reduction` | Downtime Reduction | Capability | Downtime root cause | SECONDARY | Yes - Solutions fly-out |
| `/solutions/scrap-quality-visibility` | Scrap & Quality | Capability | Quality tracking | SECONDARY | Yes - Solutions fly-out |
| `/solutions/capacity-throughput` | Capacity & Throughput | Capability | Capacity visibility | SECONDARY | Yes - Solutions fly-out |
| `/solutions/cost-driver-analysis` | Cost Driver Analysis | Capability | Cost attribution | SECONDARY | Yes - Solutions fly-out |
| `/solutions/multi-site-performance` | Multi-Site Performance | Capability | Portfolio comparison | SECONDARY | Yes - Solutions fly-out |
| `/roles` | Roles Hub | Conversion | Role-based use cases | PRIMARY | No (single page) |
| `/industries` | Industries Hub | Conversion | Industry segmentation | PRIMARY | Parent + fly-out |
| `/industries/metal-stamping` | Metal Stamping | Capability | Stamping-specific | SECONDARY | Yes - Industries fly-out |
| `/industries/automotive` | Automotive | Capability | Automotive-specific | SECONDARY | Yes - Industries fly-out |
| `/industries/aerospace` | Aerospace | Capability | Aerospace-specific | SECONDARY | Yes - Industries fly-out |
| `/industries/medical-devices` | Medical Devices | Capability | MedDev-specific | SECONDARY | Yes - Industries fly-out |
| `/industries/industrial-manufacturing` | Industrial Manufacturing | Capability | General industrial | SECONDARY | Yes - Industries fly-out |
| `/security` | Security | Trust | Security & compliance | PRIMARY | No (single page with hash links) |
| `/resources` | Resources Hub | Resource | Resource center | PRIMARY | Parent (fly-out if >1 child) |
| `/resources/faqs` | FAQs | Resource | Pre-sales Q&A | SECONDARY | Optional - Resources fly-out |
| `/about` | Company | Trust | Company story | PRIMARY | Parent + fly-out |
| `/about/founder` | Founder | Trust | Founder philosophy | SECONDARY | Yes - Company fly-out |
| `/demo` | Demo Form | Conversion | Request demo | HIDDEN | CTA button only |
| `/not-found` | 404 Error | System | Error handling | HIDDEN | No |

---

## Navigation Gap Analysis

### Current Gaps

**Discovery Gap:** Header exposes 7/26 pages (27%). Should expose 20+/26 pages (77%+).

**Priority Gaps:**
1. ❌ Platform subsections not discoverable (4 high-value pages hidden)
2. ❌ Solutions subsections not discoverable (5 high-value pages hidden)
3. ❌ Industry verticals not discoverable (5 segment pages hidden)
4. ❌ Company subsections not discoverable (Founder page hidden)
5. ⚠️ Resources underdeveloped (only 1 subpage currently)

**User Journey Friction:**
- VP Manufacturing looking for downtime solution: Must click Solutions → scroll → find Downtime link (3 steps)
- Should be: Hover Solutions → See Downtime Reduction → Click (1 step)

**SEO/Crawl Gaps:**
- Deep pages not linked in header
- Reduces crawl priority for high-value content pages
- Header backlinks valuable for SEO

### Pages That Should NOT Be in Header Nav

1. `/demo` - CTA button sufficient, form page not navigation destination
2. `/not-found` - System page
3. Hash links (`/security#governance`) - Internal page navigation, not top-level destinations

### Proposed Exposure Strategy

**Expose via fly-outs:** 14 new destinations
- Platform: +4 pages
- Solutions: +5 pages
- Industries: +5 pages
- Company: +1 page (Founder)
- Resources: +1 page (FAQs) - optional

**Keep as parent-only:** 2 destinations
- Roles (single page with inline sections)
- Security (single page with hash-link sections)

**Final header nav exposure:** 7 parents + 14-15 fly-out children = 21-22 destinations (81-85% of site)

---

## Final Header Navigation Architecture

### Top-Level Navigation (7 items)

```
1. Platform       [HAS FLY-OUT]
2. Solutions      [HAS FLY-OUT]
3. Roles          [DIRECT LINK]
4. Industries     [HAS FLY-OUT]
5. Security       [DIRECT LINK]
6. Resources      [HAS FLY-OUT - optional if >1 child]
7. Company        [HAS FLY-OUT]
```

### Platform Fly-out

**Parent link:** Platform → `/platform`
**Children (4):**
1. AI Assistant → `/platform/ai-assistant`
2. Manufacturing Intelligence → `/platform/manufacturing-intelligence`
3. Data Connections → `/platform/data-connections`
4. Reporting & Analytics → `/platform/reporting-analytics`

**Layout:** Single column, 4 links
**CTA:** "View Platform Overview" → `/platform`

### Solutions Fly-out

**Parent link:** Solutions → `/solutions`
**Children (5):**
1. Downtime Reduction → `/solutions/downtime-reduction`
2. Scrap & Quality Visibility → `/solutions/scrap-quality-visibility`
3. Capacity & Throughput → `/solutions/capacity-throughput`
4. Cost Driver Analysis → `/solutions/cost-driver-analysis`
5. Multi-Site Performance → `/solutions/multi-site-performance`

**Layout:** Single column, 5 links
**CTA:** "View All Solutions" → `/solutions`

### Roles (No Fly-out)

**Direct link:** Roles → `/roles`
**Rationale:** Single page with inline role sections, fly-out unnecessary

### Industries Fly-out

**Parent link:** Industries → `/industries`
**Children (5):**
1. Metal Stamping → `/industries/metal-stamping`
2. Automotive → `/industries/automotive`
3. Aerospace → `/industries/aerospace`
4. Medical Devices → `/industries/medical-devices`
5. Industrial Manufacturing → `/industries/industrial-manufacturing`

**Layout:** Single column, 5 links
**CTA:** "View All Industries" → `/industries`

### Security (No Fly-out)

**Direct link:** Security → `/security`
**Rationale:** Single page with hash-link subsections (Governance, Data Handling, Architecture)

### Resources Fly-out (Optional)

**Parent link:** Resources → `/resources`
**Children (1 currently):**
1. FAQs → `/resources/faqs`

**Layout:** Single column, 1-2 links
**CTA:** "View Resource Center" → `/resources`
**Decision:** Implement fly-out for future-proofing (case studies, whitepapers, etc.)

### Company Fly-out

**Parent link:** Company → `/about` (fix label/route)
**Children (2):**
1. About Us → `/about`
2. Founder → `/about/founder`

**Layout:** Single column, 2 links
**Note:** "Contact" currently points to `/demo`, keep as CTA button only

---

## Desktop Fly-out Interaction Specification

### Trigger Behavior

**Hover:**
- Open fly-out after 150ms hover delay (prevents accidental opens)
- Keep open while mouse within nav item or fly-out panel
- Close when mouse leaves both nav item AND fly-out (with 200ms grace period)

**Click:**
- Click on parent nav item with fly-out: Open fly-out (do not navigate)
- Click again: Navigate to parent page
- Click on child: Navigate to child page, close fly-out

**Keyboard:**
- Tab: Focus next top-level item, close any open fly-outs
- Enter/Space on item with fly-out: Toggle fly-out open/close
- Arrow Down: Move focus to first fly-out child
- Arrow Up: Move focus to previous child
- Escape: Close fly-out, return focus to parent item

### Visual Specifications

**Fly-out panel:**
- Background: `rgba(8, 12, 22, 0.98)`
- Backdrop blur: `blur(24px)`
- Border: `1px solid rgba(0, 200, 255, 0.08)`
- Border radius: `8px`
- Padding: `24px`
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`
- Min-width: `220px`
- Max-width: `280px`

**Fly-out children:**
- Font size: `14px`
- Line height: `1.5`
- Spacing: `12px` between items
- Hover color: `#00c8ff`
- Default color: `#e8f4ff`
- Transition: `150ms`

**Parent link in fly-out:**
- Optional "View all" link at bottom
- Styled as secondary action (muted color)
- Border-top separator if included

**Positioning:**
- Align left edge of fly-out with left edge of parent nav item
- Offset below nav bar: `8px`
- Ensure fly-out does not clip viewport edges (adjust if needed)

### Animation

**Open:**
- Fade in: `opacity 0 → 1` over 150ms
- Slide down: `translateY(-8px) → 0` over 150ms
- Ease: `cubic-bezier(0.16, 1, 0.3, 1)`

**Close:**
- Fade out: `opacity 1 → 0` over 100ms
- Slide up: `translateY(0) → translateY(-4px)` over 100ms

---

## Mobile Navigation Specification

### Mobile Breakpoint

**Trigger:** `lg` breakpoint (1024px)
- Below 1024px: Mobile accordion navigation
- 1024px and above: Desktop fly-out navigation

### Mobile Accordion Behavior

**Top-level items:**
- Tap item without children: Navigate directly
- Tap item with children: Expand accordion (do not navigate)
- Expanded state icon: Chevron down → Chevron up

**Accordion expansion:**
- Smooth height animation
- Child items indented: `16px`
- Child items font size: `14px` (slightly smaller than parent)
- Animation: `300ms ease-out`

**Navigation structure:**
```
Platform [>]
  ↓ (expanded)
  - AI Assistant
  - Manufacturing Intelligence
  - Data Connections
  - Reporting & Analytics
Solutions [>]
  ↓ (expanded)
  - Downtime Reduction
  - Scrap & Quality Visibility
  - Capacity & Throughput
  - Cost Driver Analysis
  - Multi-Site Performance
Roles
Industries [>]
  ↓ (expanded)
  - Metal Stamping
  - Automotive
  - Aerospace
  - Medical Devices
  - Industrial Manufacturing
Security
Resources [>]
Company [>]
```

### Mobile Visual Specifications

**Accordion parent:**
- Flex layout: Label (left) + Icon (right)
- Padding: `16px 0`
- Border-bottom: `1px solid rgba(255,255,255,0.06)`

**Accordion children:**
- Padding-left: `24px`
- Padding-vertical: `12px`
- Font-size: `14px`
- Color: `#8A9BBF` (secondary, not primary)

**Mobile CTAs:**
- Remain at bottom of mobile menu
- Border-top: `1px solid rgba(255,255,255,0.1)`
- Padding-top: `16px`

---

## Accessibility Requirements

### ARIA Attributes

**Top-level nav items with fly-outs:**
```tsx
<button
  aria-expanded={isOpen}
  aria-haspopup="true"
  aria-controls={`flyout-${id}`}
>
  Platform
</button>
```

**Fly-out panels:**
```tsx
<div
  id={`flyout-${id}`}
  role="region"
  aria-label="Platform submenu"
>
  {children}
</div>
```

**Mobile accordion:**
```tsx
<button
  aria-expanded={isExpanded}
  aria-controls={`accordion-${id}`}
>
  Platform
</button>
<div
  id={`accordion-${id}`}
  role="region"
  aria-label="Platform submenu"
>
  {children}
</div>
```

### Keyboard Navigation Requirements

**Desktop:**
- ✅ Tab through top-level items
- ✅ Enter/Space: Toggle fly-out or navigate
- ✅ Escape: Close fly-out
- ✅ Arrow Down: Focus first child in fly-out
- ✅ Arrow Up/Down: Navigate between children
- ✅ Home: Focus first child
- ✅ End: Focus last child

**Mobile:**
- ✅ Tab through all nav items (parent + visible children)
- ✅ Enter/Space: Toggle accordion or navigate

### Focus Management

**Fly-out opens:**
- Keep focus on parent nav item (do not auto-move to first child)
- Arrow Down moves focus to first child

**Fly-out closes:**
- Return focus to parent nav item
- Visual focus ring always visible

**Mobile accordion expands:**
- Keep focus on parent accordion button
- Tab moves to first child

---

## Implementation Checklist

### Phase 4: Build Navigation System

- [x] Create `/src/config/navigation.ts` with central config
- [ ] Create `/src/components/navigation/NavFlyout.tsx`
- [ ] Create `/src/components/navigation/MobileNavAccordion.tsx`
- [ ] Update `/src/components/layout/Navigation.tsx` to use new system
- [ ] Add fly-out state management
- [ ] Add keyboard navigation handlers
- [ ] Add accessibility attributes
- [ ] Test hover/click/keyboard interactions
- [ ] Test mobile accordion
- [ ] Test all routes

### Central Navigation Config Structure

```typescript
// src/config/navigation.ts
export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
  hasAccordion?: boolean;  // Mobile-only
}

export const navigationConfig: NavItem[] = [
  {
    label: 'Platform',
    href: '/platform',
    children: [
      { label: 'AI Assistant', href: '/platform/ai-assistant' },
      { label: 'Manufacturing Intelligence', href: '/platform/manufacturing-intelligence' },
      { label: 'Data Connections', href: '/platform/data-connections' },
      { label: 'Reporting & Analytics', href: '/platform/reporting-analytics' },
    ],
  },
  // ... etc
];
```

---

## Route Validation Matrix

| Nav Label | Fly-out? | Route | Status | Notes |
|-----------|----------|-------|--------|-------|
| Platform | YES | `/platform` | ✅ Exists | Parent + 4 children |
| ↳ AI Assistant | - | `/platform/ai-assistant` | ✅ Exists | - |
| ↳ Manufacturing Intelligence | - | `/platform/manufacturing-intelligence` | ✅ Exists | - |
| ↳ Data Connections | - | `/platform/data-connections` | ✅ Exists | - |
| ↳ Reporting & Analytics | - | `/platform/reporting-analytics` | ✅ Exists | - |
| Solutions | YES | `/solutions` | ✅ Exists | Parent + 5 children |
| ↳ Downtime Reduction | - | `/solutions/downtime-reduction` | ✅ Exists | - |
| ↳ Scrap & Quality | - | `/solutions/scrap-quality-visibility` | ✅ Exists | - |
| ↳ Capacity & Throughput | - | `/solutions/capacity-throughput` | ✅ Exists | - |
| ↳ Cost Driver Analysis | - | `/solutions/cost-driver-analysis` | ✅ Exists | - |
| ↳ Multi-Site Performance | - | `/solutions/multi-site-performance` | ✅ Exists | - |
| Roles | NO | `/roles` | ✅ Exists | Single page |
| Industries | YES | `/industries` | ✅ Exists | Parent + 5 children |
| ↳ Metal Stamping | - | `/industries/metal-stamping` | ✅ Exists | - |
| ↳ Automotive | - | `/industries/automotive` | ✅ Exists | - |
| ↳ Aerospace | - | `/industries/aerospace` | ✅ Exists | - |
| ↳ Medical Devices | - | `/industries/medical-devices` | ✅ Exists | - |
| ↳ Industrial Manufacturing | - | `/industries/industrial-manufacturing` | ✅ Exists | - |
| Security | NO | `/security` | ✅ Exists | Single page |
| Resources | YES | `/resources` | ✅ Exists | Parent + 1 child |
| ↳ FAQs | - | `/resources/faqs` | ✅ Exists | - |
| Company | YES | `/about` | ✅ Exists | Parent + 1 child |
| ↳ Founder | - | `/about/founder` | ✅ Exists | - |

**All routes validated:** 26/26 pages exist ✅

---

## Final Quality Bar

✅ **Enterprise B2B navigation** - Professional, calm, intentional
✅ **Expose all important destinations** - 21 of 26 pages (81%) in header nav
✅ **Clean site architecture mapping** - Matches site structure exactly
✅ **EKAS terminology only** - No generic/competitor language
✅ **Support discovery without clutter** - Organized fly-outs, not mega-menu
✅ **Professional desktop behavior** - Hover + keyboard + click safe
✅ **Proper mobile behavior** - Accordion, not desktop fly-out clone
✅ **Accessibility done correctly** - ARIA attributes, keyboard nav, focus management
✅ **No weak routes exposed** - Demo form and 404 appropriately hidden
✅ **Maintainable going forward** - Central config, typed interfaces

---

**APPROVED FOR IMPLEMENTATION**
*Specification complete: 2026-04-17*
