# Roles & Security Fly-out Navigation Specification
**Date:** 2026-04-17
**Status:** APPROVED FOR IMPLEMENTATION
**Based on:** roles_security_flyout_audit.md

---

## Executive Summary

This specification defines the complete fly-out navigation implementation for Roles and Security header items. Implementation uses two strategies:

- **Roles:** Hash link fly-out (6 destinations, content too thin for separate pages)
- **Security:** Separate page fly-out (3 destinations, content substantial enough for pages)

Both implementations maintain enterprise UX quality, accessibility standards, and consistency with existing fly-out patterns (Platform, Solutions, Industries).

---

## Final Fly-out Architecture

### Roles Fly-out (Hash Link Strategy)

**Parent:**
- Label: `Roles`
- Href: `/roles`
- Behavior: Button (opens fly-out on hover/click)

**Children (6):**

```typescript
{
  label: "Roles",
  href: "/roles",
  children: [
    {
      label: "Plant Managers",
      href: "/roles#plant-managers",
      description: "Real-time visibility into downtime, OEE, and quality losses",
    },
    {
      label: "Operations Leaders",
      href: "/roles#operations-leaders",
      description: "Performance trending and cost driver analysis",
    },
    {
      label: "Manufacturing Engineering",
      href: "/roles#manufacturing-engineering",
      description: "Failure mode attribution and root cause analysis",
    },
    {
      label: "Quality Leaders",
      href: "/roles#quality-leaders",
      description: "FPY tracking with full audit trail traceability",
    },
    {
      label: "Finance Leaders",
      href: "/roles#finance-leaders",
      description: "Cost variance tracking and operational loss quantification",
    },
    {
      label: "Executive / PE Operations",
      href: "/roles#executive-operations",
      description: "Portfolio intelligence across multi-site facilities",
    },
  ],
}
```

**Fly-out behavior:**
- Hover on "Roles" → fly-out opens after 150ms
- Click on "Roles" (desktop) → fly-out toggles
- Click on child link → navigates to `/roles` with hash scroll
- Escape key → closes fly-out

**Desktop presentation:**
- Single column layout
- 6 children visible
- Optional "View All Roles" link at bottom (since >3 children)
- Background: dark premium card style
- Animation: fade + slide (150ms)

**Mobile presentation:**
- Accordion behavior
- Tap "Roles" → expands children list
- Tap child → navigates with hash scroll
- ChevronDown icon rotation animation

### Security Fly-out (Separate Page Strategy)

**Parent:**
- Label: `Security`
- Href: `/security`
- Behavior: Button (opens fly-out on hover/click)

**Children (3):**

```typescript
{
  label: "Security",
  href: "/security",
  children: [
    {
      label: "Governance",
      href: "/security/governance",
      description: "Versioned metrics and full data provenance",
    },
    {
      label: "Data Handling",
      href: "/security/data-handling",
      description: "How production data is collected and protected",
    },
    {
      label: "Architecture",
      href: "/security/architecture",
      description: "AWS-native with SOC 2 Type II controls",
    },
  ],
}
```

**Fly-out behavior:**
- Hover on "Security" → fly-out opens after 150ms
- Click on "Security" (desktop) → fly-out toggles
- Click on child link → navigates to separate page
- Escape key → closes fly-out

**Desktop presentation:**
- Single column layout
- 3 children visible
- No "View All" link (only 3 children, <3 threshold)
- Background: dark premium card style
- Animation: fade + slide (150ms)

**Mobile presentation:**
- Accordion behavior
- Tap "Security" → expands children list
- Tap child → navigates to separate page
- ChevronDown icon rotation animation

---

## Implementation Plan

### Phase 1: Create Security Subsection Pages

**Three new pages required:**

1. **`/src/app/security/governance/page.tsx`**
   - Extract Governance section from security/page.tsx (lines 70-142)
   - PageShell wrapper
   - Hero: "Governance"
   - Section label: "Governance"
   - Title: "Governed Metrics, Auditable Calculations, and Full Provenance"
   - 3 premium cards:
     - Versioned Metric Definitions
     - Full Data Provenance
     - Role-Based Metric Access
   - Final CTA: "See Governance in Action"

2. **`/src/app/security/data-handling/page.tsx`**
   - Extract Data Handling section from security/page.tsx (lines 145-217)
   - PageShell wrapper
   - Hero: "Data Handling"
   - Section label: "Data Handling"
   - Title: "How Production Data is Collected, Stored, and Protected"
   - 3 premium cards:
     - Data Collection and Ingestion
     - Data Storage and Isolation
     - What EKAS Does Not Do
   - Final CTA: "Review Data Handling Practices"

3. **`/src/app/security/architecture/page.tsx`**
   - Extract Architecture section from security/page.tsx (lines 220-312)
   - PageShell wrapper
   - Hero: "Architecture"
   - Section label: "Architecture"
   - Title: "AWS-Native, Multi-Tenant, and SOC 2 Type II Controls"
   - 4 premium cards:
     - Authentication and Authorization
     - Infrastructure Security
     - Monitoring and Threat Detection
     - Compliance and Audit Readiness
   - Final CTA: "Request Security Packet"

### Phase 2: Update Security Overview Page

**Modify:** `/src/app/security/page.tsx`

**Keep:**
- Hero section
- Trust Model + Security Stack section (top two-column grid)
- Final CTA section

**Remove:**
- Governance section (now `/security/governance`)
- Data Handling section (now `/security/data-handling`)
- Architecture section (now `/security/architecture`)

**Add:**
- Link cards or preview section for 3 new child pages
- "Explore Security Topics" section with 3 cards linking to:
  - Governance
  - Data Handling
  - Architecture

### Phase 3: Update Navigation Configuration

**Modify:** `/src/config/navigation.ts`

**Change 1: Add Roles children**
```typescript
{
  label: "Roles",
  href: "/roles",
  children: [
    {
      label: "Plant Managers",
      href: "/roles#plant-managers",
      description: "Real-time visibility into downtime, OEE, and quality losses",
    },
    {
      label: "Operations Leaders",
      href: "/roles#operations-leaders",
      description: "Performance trending and cost driver analysis",
    },
    {
      label: "Manufacturing Engineering",
      href: "/roles#manufacturing-engineering",
      description: "Failure mode attribution and root cause analysis",
    },
    {
      label: "Quality Leaders",
      href: "/roles#quality-leaders",
      description: "FPY tracking with full audit trail traceability",
    },
    {
      label: "Finance Leaders",
      href: "/roles#finance-leaders",
      description: "Cost variance tracking and operational loss quantification",
    },
    {
      label: "Executive / PE Operations",
      href: "/roles#executive-operations",
      description: "Portfolio intelligence across multi-site facilities",
    },
  ],
},
```

**Change 2: Add Security children**
```typescript
{
  label: "Security",
  href: "/security",
  children: [
    {
      label: "Governance",
      href: "/security/governance",
      description: "Versioned metrics and full data provenance",
    },
    {
      label: "Data Handling",
      href: "/security/data-handling",
      description: "How production data is collected and protected",
    },
    {
      label: "Architecture",
      href: "/security/architecture",
      description: "AWS-native with SOC 2 Type II controls",
    },
  ],
},
```

**Remove:**
- Comments "// No children - single page with inline role sections"
- Comments "// No children - single page with hash-link subsections"

### Phase 4: Test and Validate

**Local build:**
```bash
npm run build
```

**Expected output:**
- 3 new routes compile successfully:
  - `/security/governance`
  - `/security/data-handling`
  - `/security/architecture`
- Total routes: 29 (was 26, +3)

**Manual testing:**
1. Desktop fly-out behavior
   - Hover on "Roles" opens fly-out
   - Hover on "Security" opens fly-out
   - Click on child navigates correctly
   - Escape closes fly-out
2. Mobile accordion behavior
   - Tap "Roles" expands accordion
   - Tap "Security" expands accordion
   - Tap child navigates correctly
3. Hash link scrolling
   - `/roles#plant-managers` scrolls to correct section
   - All 6 role hash links work
4. Accessibility
   - Keyboard navigation works
   - ARIA attributes present
   - Screen reader announces correctly

---

## Route Specification

### New Routes Added

**Security subsection pages (3):**
1. `/security/governance` - Governance page
2. `/security/data-handling` - Data Handling page
3. `/security/architecture` - Architecture page

**Roles hash links (6):**
1. `/roles#plant-managers` - Plant Managers section
2. `/roles#operations-leaders` - Operations Leaders section
3. `/roles#manufacturing-engineering` - Manufacturing Engineering section
4. `/roles#quality-leaders` - Quality Leaders section
5. `/roles#finance-leaders` - Finance Leaders section
6. `/roles#executive-operations` - Executive / PE Operations section

**Total new routes:** 3 pages + 6 hash links = 9 new destinations

### Updated Route Inventory

**Before:**
- Total pages: 26
- Total header nav destinations: 21 (7 parents + 14 children)
- Roles: Direct link (no fly-out)
- Security: Direct link (no fly-out)

**After:**
- Total pages: 29 (+3)
- Total header nav destinations: 30 (7 parents + 23 children)
- Roles: Fly-out with 6 children
- Security: Fly-out with 3 children

**Navigation exposure increase:**
- Before: 21/26 pages exposed (81%)
- After: 30/29 destinations exposed (103% - includes hash links)

---

## Visual Specifications

### Desktop Fly-out Panel

**Container:**
- Position: `absolute`, `left: 0`, `top: full`, `mt-2`
- Z-index: `50`
- Min-width: `220px`
- Max-width: `280px`

**Background:**
- Color: `rgba(8, 12, 22, 0.98)`
- Backdrop filter: `blur(24px)`
- Border: `1px solid rgba(0, 200, 255, 0.08)`
- Border radius: `8px`
- Padding: `24px`
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`

**Children list:**
- Layout: `space-y-3` (12px vertical spacing)
- Link font size: `14px`
- Link line height: `1.5`
- Link color: `#e8f4ff` (default), `#00c8ff` (hover)
- Description font size: `12px`
- Description color: `#8A9BBF`

**"View All" link (if >3 children):**
- Separator: `1px solid rgba(255, 255, 255, 0.06)`
- Margin: `16px 0`
- Font size: `13px`
- Color: `#8A9BBF` (default), `#00c8ff` (hover)
- Text align: `center`
- Font weight: `500`

**Animation:**
- Initial: `opacity: 0`, `y: -8`
- Animate: `opacity: 1`, `y: 0`
- Exit: `opacity: 0`, `y: -4`
- Duration: `150ms`
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Mobile Accordion

**Parent button:**
- Width: `100%`
- Flex layout: Label (left) + ChevronDown (right)
- Padding: `16px 0`
- Border-bottom: `1px solid rgba(255,255,255,0.06)`
- Font size: `16px` (base)
- Font weight: `500` (medium)
- Color: `#e8f4ff` (default), `#00c8ff` (active)

**ChevronDown icon:**
- Size: `18px`
- Rotation: `0deg` (collapsed), `180deg` (expanded)
- Transition: `200ms`

**Children container:**
- Initial: `height: 0`, `opacity: 0`
- Animate: `height: auto`, `opacity: 1`
- Exit: `height: 0`, `opacity: 0`
- Duration: `300ms`
- Easing: `ease-out`
- Overflow: `hidden`

**Child links:**
- Padding-left: `24px` (indented)
- Padding-vertical: `12px`
- Font size: `14px`
- Color: `#8A9BBF` (default), `#00c8ff` (active/hover)

---

## Accessibility Specification

### ARIA Attributes

**Parent nav button (with fly-out):**
```tsx
<button
  aria-expanded={isOpen}
  aria-haspopup="true"
  aria-controls="flyout-roles" // or "flyout-security"
  onKeyDown={handleKeyDown}
>
  Roles
</button>
```

**Fly-out panel:**
```tsx
<div
  id="flyout-roles" // or "flyout-security"
  role="region"
  aria-label="Roles submenu" // or "Security submenu"
>
  {children}
</div>
```

**Mobile accordion button:**
```tsx
<button
  aria-expanded={isExpanded}
  aria-controls="mobile-accordion-roles" // or "mobile-accordion-security"
>
  <span>Roles</span>
  <ChevronDown />
</button>
```

**Mobile accordion panel:**
```tsx
<div
  id="mobile-accordion-roles" // or "mobile-accordion-security"
  role="region"
  aria-label="Roles submenu" // or "Security submenu"
>
  {children}
</div>
```

### Keyboard Navigation

**Top-level navigation:**
- Tab: Move focus to next top-level item (closes any open fly-out)
- Shift+Tab: Move focus to previous top-level item

**Fly-out interaction:**
- Enter/Space on parent: Toggle fly-out open/close
- Escape: Close fly-out, return focus to parent
- Tab within fly-out: Move to first child link
- Tab from last child: Move to next top-level item (closes fly-out)

**Mobile accordion:**
- Enter/Space on parent: Toggle accordion open/close
- Tab: Move through visible child links when expanded

### Focus Management

**Fly-out opens:**
- Focus remains on parent button (does not auto-move to first child)
- User can Tab to first child or Escape to close

**Fly-out closes:**
- Focus returns to parent button
- Visual focus ring always visible

**Mobile accordion expands:**
- Focus remains on parent button
- User can Tab to first child

---

## Content Quality Standards

### Fly-out Descriptions

**Character length:** 40-60 characters (consistent with Platform, Solutions, Industries)

**Tone:** Enterprise, specific, value-prop focused

**EKAS terminology required:**
- Governed metrics
- Data provenance
- Audit trail traceability
- Portfolio intelligence
- Manufacturing Intelligence (capital M, capital I)
- First Pass Yield (FPY)
- OEE (not "overall equipment effectiveness")

**Prohibited terminology:**
- Generic SaaS wording ("Transform your business")
- Competitor language
- Vague claims ("Best-in-class")
- Consumer-focused tone

### Page Content Quality

**Security subsection pages:**
- Substantial content (70-95 lines per page)
- Specific technical claims (AWS services, SOC 2, IATF 16949)
- EKAS-specific architecture details
- Premium card layout with bullet points
- Technical depth appropriate for enterprise buyers

**Roles sections:**
- Clear role definition (~200 characters)
- Specific EKAS capabilities (~160 characters)
- Consistent structure across all roles
- Manufacturing-focused language

---

## Testing Checklist

### Build Testing
- [ ] `npm run build` completes successfully
- [ ] No TypeScript errors
- [ ] 3 new routes compile:
  - [ ] `/security/governance`
  - [ ] `/security/data-handling`
  - [ ] `/security/architecture`
- [ ] Total routes: 29 (was 26)

### Desktop Fly-out Testing
- [ ] Hover on "Roles" opens fly-out after 150ms
- [ ] Hover on "Security" opens fly-out after 150ms
- [ ] Fly-out stays open while hovering panel
- [ ] Fly-out closes after 200ms when mouse leaves
- [ ] Click outside closes fly-out
- [ ] Escape key closes fly-out
- [ ] Click on child link navigates correctly
- [ ] "View All Roles" link present (>3 children threshold met)
- [ ] No "View All Security" link (3 children, below threshold)

### Mobile Accordion Testing
- [ ] Tap "Roles" expands accordion
- [ ] Tap "Security" expands accordion
- [ ] ChevronDown rotates 180° on expand
- [ ] Tap child link navigates correctly
- [ ] Accordion collapses on navigation
- [ ] Visual spacing correct (24px indent)

### Keyboard Navigation Testing
- [ ] Tab through all top-level nav items
- [ ] Enter on "Roles" toggles fly-out
- [ ] Enter on "Security" toggles fly-out
- [ ] Space on "Roles" toggles fly-out
- [ ] Space on "Security" toggles fly-out
- [ ] Escape closes fly-out
- [ ] Focus returns to parent button on close
- [ ] Tab from parent enters first child when fly-out open
- [ ] Tab from last child moves to next top-level item

### Accessibility Testing
- [ ] All buttons have `aria-expanded` attribute
- [ ] All fly-out buttons have `aria-haspopup="true"`
- [ ] All panels have `role="region"`
- [ ] All panels have descriptive `aria-label`
- [ ] Focus indicators visible at all times
- [ ] No keyboard traps

### Hash Link Testing (Roles)
- [ ] `/roles#plant-managers` scrolls to correct section
- [ ] `/roles#operations-leaders` scrolls to correct section
- [ ] `/roles#manufacturing-engineering` scrolls to correct section
- [ ] `/roles#quality-leaders` scrolls to correct section
- [ ] `/roles#finance-leaders` scrolls to correct section
- [ ] `/roles#executive-operations` scrolls to correct section

### Route Testing (Security)
- [ ] `/security` loads overview page
- [ ] `/security/governance` loads governance page
- [ ] `/security/data-handling` loads data handling page
- [ ] `/security/architecture` loads architecture page
- [ ] All pages return HTTP 200
- [ ] All pages render without errors

---

## Deployment Specification

### Deployment Sequence

1. **Commit to main branch**
   - 3 new files (security subsection pages)
   - 2 modified files (security overview page, navigation config)
   - 0 deleted files
   - Commit message: "feat: add Roles and Security fly-out navigation"

2. **Push to main**
   - Triggers AWS Amplify build (production)
   - Build time: ~7-8 seconds (3 new routes)

3. **Cherry-pick to develop**
   - Same changes applied to staging branch
   - Triggers AWS Amplify build (staging)

4. **Validate deployments**
   - Staging: Test all fly-outs on https://develop.d3h2hbq3io3jju.amplifyapp.com
   - Production: Test all fly-outs on https://main.d3h2hbq3io3jju.amplifyapp.com
   - Verify 3 new routes accessible
   - Verify hash links scroll correctly
   - Verify fly-out interactions work

### Rollback Plan

**If issues found:**
1. Revert commit on main branch
2. Cherry-pick revert to develop branch
3. AWS Amplify auto-deploys previous version

**Common issues and fixes:**
- Hash links not scrolling: Check ID attributes on roles page sections
- Fly-out not opening: Check navigationConfig children arrays
- Build failure: Check TypeScript errors in new pages

---

## Success Criteria

### Functional Requirements
- ✅ Roles fly-out opens on hover/click
- ✅ Security fly-out opens on hover/click
- ✅ 6 role destinations accessible via fly-out
- ✅ 3 security destinations accessible via fly-out
- ✅ Hash links scroll to correct sections (roles)
- ✅ Separate pages load correctly (security)
- ✅ Mobile accordion works for both sections
- ✅ Keyboard navigation fully functional
- ✅ Accessibility attributes present

### Visual Requirements
- ✅ Consistent with existing fly-out style
- ✅ Premium dark theme maintained
- ✅ EKAS color scheme preserved (#00c8ff accent)
- ✅ Smooth animations, no flicker
- ✅ Proper spacing and typography

### Content Requirements
- ✅ EKAS terminology only
- ✅ No generic SaaS wording
- ✅ No competitor copying
- ✅ All descriptions 40-60 characters
- ✅ Enterprise-appropriate tone

### Performance Requirements
- ✅ Build completes in <10 seconds
- ✅ No bundle size increase >10KB
- ✅ Animations run at 60fps
- ✅ No layout shifts

### Accessibility Requirements
- ✅ ARIA attributes on all interactive elements
- ✅ Keyboard navigation works
- ✅ Screen reader support
- ✅ Focus management correct
- ✅ No keyboard traps

---

## Implementation Approval

**Specification status:** ✅ APPROVED FOR IMPLEMENTATION

**Implementation approach:**
1. Roles: Hash link fly-out (6 destinations)
2. Security: Separate page fly-out (3 destinations)

**Pages to create:** 3 (security subsections)
**Pages to modify:** 2 (security overview, navigation config)
**Components to modify:** 0 (existing fly-out system handles both strategies)

**Estimated implementation time:** 1-2 hours
**Testing time:** 30 minutes
**Total time to production:** 2-3 hours

---

**Specification finalized:** 2026-04-17
**Specified by:** Claude Code (Anthropic)
**Based on audit:** `roles_security_flyout_audit.md`
**Next step:** Implementation
