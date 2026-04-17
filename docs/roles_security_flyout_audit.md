# Roles & Security Fly-out Navigation Audit
**Date:** 2026-04-17
**Status:** AUDIT COMPLETE

---

## Executive Summary

Current navigation implementation exposes Roles and Security as direct links without fly-out submenus. This creates inconsistency with Platform, Solutions, Industries, and Company sections which all have fly-outs exposing child destinations.

**Current State:**
- ✅ Platform: 1 parent + 4 children (fly-out implemented)
- ✅ Solutions: 1 parent + 5 children (fly-out implemented)
- ❌ **Roles: Direct link only (no fly-out)**
- ✅ Industries: 1 parent + 5 children (fly-out implemented)
- ❌ **Security: Direct link only (no fly-out)**
- ✅ Resources: 1 parent + 1 child (fly-out implemented)
- ✅ Company: 1 parent + 2 children (fly-out implemented)

**Gap:** Roles and Security are treated as single-page destinations despite having substantial subsections that could improve discoverability and information scent.

---

## Current Navigation Configuration

### Roles Configuration (src/config/navigation.ts:84-87)
```typescript
{
  label: "Roles",
  href: "/roles",
  // No children - single page with inline role sections
}
```

**Current behavior:** Direct link to `/roles` page
**Fly-out status:** ❌ None
**Comment:** "single page with inline role sections"

### Security Configuration (src/config/navigation.ts:119-123)
```typescript
{
  label: "Security",
  href: "/security",
  // No children - single page with hash-link subsections
}
```

**Current behavior:** Direct link to `/security` page
**Fly-out status:** ❌ None
**Comment:** "single page with hash-link subsections"

---

## Roles Page Content Audit

**Page:** `/src/app/roles/page.tsx` (98 lines)

### Current Structure

**Hero section:**
- Title: "Relevant to Every Decision-Maker on the Floor and Above It"
- Description: Role-specific answers from floor to boardroom

**Role sections** (6 total, inline on single page):

1. **Plant Managers** (id: `plant-managers`)
   - Definition: 169 characters - Daily operations, shift performance, production targets
   - Capabilities: 161 characters - Shift dashboards, downtime attribution, cost impact, governed metrics
   - **Content quality:** ✅ Strong (specific EKAS value prop)

2. **Operations Leaders** (id: `operations-leaders`)
   - Definition: 224 characters - Improvement priorities, resource allocation, continuous improvement
   - Capabilities: 184 characters - Performance trending, OEE decomposition, cost driver analysis
   - **Content quality:** ✅ Strong (specific EKAS value prop)

3. **Manufacturing Engineering** (id: `manufacturing-engineering`)
   - Definition: 215 characters - Process design, troubleshooting, risk assessment linkage
   - Capabilities: 181 characters - Failure mode attribution, root cause analysis, engineering decision support
   - **Content quality:** ✅ Strong (specific EKAS value prop)

4. **Quality Leaders** (id: `quality-leaders`)
   - Definition: 228 characters - Defect tracking, non-conformances, compliance (IATF 16949, ISO 13485, AS9100)
   - Capabilities: 176 characters - FPY tracking, defect trending, full traceability, audit trails
   - **Content quality:** ✅ Strong (specific EKAS value prop)

5. **Finance Leaders** (id: `finance-leaders`)
   - Definition: 214 characters - Cost variance, margin drivers, operational/financial reconciliation
   - Capabilities: 169 characters - Cost variance tracking, burden rate infrastructure, governed metrics
   - **Content quality:** ✅ Strong (specific EKAS value prop)

6. **Executive / PE Operations** (id: `executive-operations`)
   - Definition: 215 characters - Multi-site portfolio oversight, standardized metrics
   - Capabilities: 163 characters - Multi-tenant architecture, standardized metrics, portfolio intelligence
   - **Content quality:** ✅ Strong (specific EKAS value prop)

### Content Suitability for Fly-out

**Strengths:**
- All 6 roles have clear EKAS-specific value propositions
- Each role section is ~350-400 characters total (definition + capabilities)
- Consistent structure across all roles
- Strong information scent (user can predict what they'll find)
- EKAS terminology used throughout (governed metrics, provenance, traceability)

**Weaknesses:**
- Content for each role is relatively short (~400 characters)
- All roles currently inline on single page (no separate pages)
- No deep-dive content per role (just description + capabilities list)

**Recommendation:**
- **Option A:** Use hash links for fly-out (e.g., `/roles#plant-managers`, `/roles#operations-leaders`)
  - Pro: Quick implementation, content already structured with IDs
  - Pro: Content length appropriate for inline sections
  - Con: Hash links less discoverable than separate pages
  - Con: Inconsistent with other fly-outs (Platform, Solutions go to separate pages)

- **Option B:** Create separate pages for each role
  - Pro: Consistent with existing fly-out pattern
  - Pro: Better SEO (6 indexable pages vs 1)
  - Pro: Room to expand content per role
  - Con: Current content thin for 6 separate pages
  - Con: Requires creating 6 new pages

**Decision:** Use hash links (Option A) for Roles fly-out. Rationale:
1. Current content (~400 chars per role) is too thin for separate pages
2. Creating 6 new pages with thin content lowers site quality
3. Hash links maintain information scent while avoiding weak destination exposure
4. User explicitly said: "If any child destination is weak, improve or hide it rather than exposing it poorly"

---

## Security Page Content Audit

**Page:** `/src/app/security/page.tsx` (326 lines)

### Current Structure

**Hero section:**
- Title: "Governance and Trust Designed for Serious Manufacturing Environments"
- Description: Credible operational answers, controlled access, enterprise-ready review

**Top section (no id):**
- **Trust Model** (left column): Data Grounding, Governance & Traceability, Access Control, Auditability
- **Security Stack** (right column): 8 security controls (Bedrock, Cognito, JWT, KMS, etc.)
- **Content quality:** ✅ Strong (specific technical claims)
- **Content length:** ~50 lines
- **Suitable as:** "Security Overview" fly-out destination

**Section: Governance** (id: `governance`, lines 70-142)
- Title: "Governed Metrics, Auditable Calculations, and Full Provenance"
- Description: ~160 characters on deterministic, versioned metric definitions
- **3 detailed cards:**
  1. Versioned Metric Definitions (~180 chars + 4 bullet points)
  2. Full Data Provenance (~180 chars + 4 bullet points)
  3. Role-Based Metric Access (~180 chars + 4 bullet points)
- **Content quality:** ✅ Very Strong (deep technical detail, EKAS-specific)
- **Content length:** ~73 lines (substantial)
- **Suitable as:** Separate page `/security/governance`

**Section: Data Handling** (id: `data-handling`, lines 145-217)
- Title: "How Production Data is Collected, Stored, and Protected"
- Description: ~220 characters on data collection, encryption, isolation
- **3 detailed cards:**
  1. Data Collection and Ingestion (~190 chars + 4 bullet points)
  2. Data Storage and Isolation (~170 chars + 4 bullet points)
  3. What EKAS Does Not Do (~200 chars + 4 bullet points)
- **Content quality:** ✅ Very Strong (specific claims, Amazon Bedrock guarantee)
- **Content length:** ~73 lines (substantial)
- **Suitable as:** Separate page `/security/data-handling`

**Section: Architecture** (id: `architecture`, lines 220-312)
- Title: "AWS-Native, Multi-Tenant, and SOC 2 Type II Controls"
- Description: ~200 characters on defense-in-depth, Cognito MFA, GuardDuty
- **4 detailed cards:**
  1. Authentication and Authorization (~180 chars + 4 bullet points)
  2. Infrastructure Security (~170 chars + 4 bullet points)
  3. Monitoring and Threat Detection (~180 chars + 4 bullet points)
  4. Compliance and Audit Readiness (~180 chars + 4 bullet points)
- **Content quality:** ✅ Very Strong (SOC 2, IATF 16949, AWS services)
- **Content length:** ~93 lines (very substantial)
- **Suitable as:** Separate page `/security/architecture`

### Content Suitability for Fly-out

**Strengths:**
- All 3 subsections have substantial content (70-95 lines each)
- Deep technical detail suitable for enterprise buyers
- EKAS-specific claims (governed metrics, Amazon Bedrock, tenant isolation)
- Strong information architecture (Governance → Data → Infrastructure)
- Each section stands alone as complete topic coverage

**Weaknesses:**
- Currently all on single long page (326 lines)
- No current separate pages for subsections

**Recommendation:**
- **Option A:** Use hash links for fly-out (e.g., `/security#governance`, `/security#data-handling`)
  - Pro: Quick implementation, sections already have IDs
  - Con: Long page scroll (326 lines)
  - Con: Inconsistent with other fly-outs
  - Con: Hash links less discoverable

- **Option B:** Create separate pages for each section
  - Pro: Consistent with existing fly-out pattern
  - Pro: Content is substantial enough (70-95 lines per section)
  - Pro: Better SEO (3 indexable pages vs 1)
  - Pro: Reduces main security page length
  - Pro: Each section is enterprise-grade content quality
  - Con: Requires creating 3 new pages and moving content

**Decision:** Create separate pages (Option B) for Security fly-out. Rationale:
1. Each section has 70-95 lines of substantial content
2. Content quality is enterprise-grade (SOC 2, IATF 16949, specific AWS services)
3. Consistent with Platform/Solutions/Industries pattern
4. Better information scent (user knows exactly where they're going)
5. Each section stands alone as complete topic coverage

---

## Proposed Fly-out Structure

### Roles Fly-out (Hash Link Strategy)

**Parent:** Roles → `/roles`

**Children (6):**
1. Plant Managers → `/roles#plant-managers`
2. Operations Leaders → `/roles#operations-leaders`
3. Manufacturing Engineering → `/roles#manufacturing-engineering`
4. Quality Leaders → `/roles#quality-leaders`
5. Finance Leaders → `/roles#finance-leaders`
6. Executive / PE Operations → `/roles#executive-operations`

**Optional:** "View All Roles" link → `/roles`

**Fly-out descriptions (derived from page content):**
- Plant Managers: "Real-time visibility into downtime, OEE, and quality losses"
- Operations Leaders: "Performance trending and cost driver analysis"
- Manufacturing Engineering: "Failure mode attribution and root cause analysis"
- Quality Leaders: "FPY tracking with full audit trail traceability"
- Finance Leaders: "Cost variance tracking and operational loss quantification"
- Executive / PE Operations: "Portfolio intelligence across multi-site facilities"

### Security Fly-out (Separate Pages Strategy)

**Parent:** Security → `/security` (becomes overview/hub page)

**Children (3):**
1. Governance → `/security/governance` (NEW PAGE)
2. Data Handling → `/security/data-handling` (NEW PAGE)
3. Architecture → `/security/architecture` (NEW PAGE)

**Optional:** "View Security Overview" link → `/security`

**Fly-out descriptions (derived from page content):**
- Governance: "Versioned metrics and full data provenance"
- Data Handling: "How production data is collected and protected"
- Architecture: "AWS-native with SOC 2 Type II controls"

---

## Existing Fly-out Pattern Analysis

### Platform Fly-out (Reference Implementation)

**Pattern observed:**
```typescript
{
  label: "Platform",
  href: "/platform",
  children: [
    {
      label: "AI Assistant",
      href: "/platform/ai-assistant",
      description: "Conversational interface with grounded answers",
    },
    // ... 3 more children
  ],
}
```

**Key characteristics:**
- Parent href: `/platform` (hub page exists)
- Children hrefs: `/platform/*` (separate pages exist)
- Descriptions: 40-60 characters, value-prop focused
- Count: 4 children
- Fly-out behavior: Hover to open, click to navigate

### Solutions Fly-out (Reference Implementation)

**Pattern observed:**
```typescript
{
  label: "Solutions",
  href: "/solutions",
  children: [
    {
      label: "Downtime Reduction",
      href: "/solutions/downtime-reduction",
      description: "Root cause analysis and downtime attribution",
    },
    // ... 4 more children
  ],
}
```

**Key characteristics:**
- Parent href: `/solutions` (hub page exists)
- Children hrefs: `/solutions/*` (separate pages exist)
- Descriptions: 45-60 characters, outcome-focused
- Count: 5 children
- Fly-out behavior: Hover to open, click to navigate

### Industries Fly-out (Reference Implementation)

**Pattern observed:**
```typescript
{
  label: "Industries",
  href: "/industries",
  children: [
    {
      label: "Metal Stamping",
      href: "/industries/metal-stamping",
      description: "Press OEE, die performance, and material yield",
    },
    // ... 4 more children
  ],
}
```

**Key characteristics:**
- Parent href: `/industries` (hub page exists)
- Children hrefs: `/industries/*` (separate pages exist)
- Descriptions: 40-60 characters, industry-specific capabilities
- Count: 5 children
- Fly-out behavior: Hover to open, click to navigate

**Pattern consistency:**
- All existing fly-outs use separate pages (not hash links)
- All descriptions 40-60 characters
- All children follow parent path structure
- Fly-out count ranges from 1-5 children

---

## Route Exposure Validation

### Current Route Inventory

**Existing pages (26 total):**
- ✅ `/` (Homepage)
- ✅ `/platform` + 4 children
- ✅ `/solutions` + 5 children
- ✅ `/roles` (single page, no children)
- ✅ `/industries` + 5 children
- ✅ `/security` (single page, no children)
- ✅ `/resources` + 1 child
- ✅ `/about` + 1 child (`/about/founder`)
- ✅ `/demo` (CTA destination, not in nav)

**Routes to add for Roles (hash links):**
- `/roles#plant-managers` (existing ID)
- `/roles#operations-leaders` (existing ID)
- `/roles#manufacturing-engineering` (existing ID)
- `/roles#quality-leaders` (existing ID)
- `/roles#finance-leaders` (existing ID)
- `/roles#executive-operations` (existing ID)

**Routes to add for Security (new pages):**
- `/security/governance` (NEW PAGE REQUIRED)
- `/security/data-handling` (NEW PAGE REQUIRED)
- `/security/architecture` (NEW PAGE REQUIRED)

**Total new pages required:** 3 (all Security subsections)
**Total hash link destinations:** 6 (all Roles subsections)

---

## Content Migration Requirements

### Roles Page
**No changes required** - Keep all role sections inline, add hash link fly-out navigation only

### Security Page
**Content to extract:**

1. **`/security/governance` page**
   - Extract lines 70-142 from current security/page.tsx
   - Section: Governance
   - Title: "Governed Metrics, Auditable Calculations, and Full Provenance"
   - Content: 3 cards (Versioned Metric Definitions, Full Data Provenance, Role-Based Metric Access)

2. **`/security/data-handling` page**
   - Extract lines 145-217 from current security/page.tsx
   - Section: Data Handling
   - Title: "How Production Data is Collected, Stored, and Protected"
   - Content: 3 cards (Data Collection and Ingestion, Data Storage and Isolation, What EKAS Does Not Do)

3. **`/security/architecture` page**
   - Extract lines 220-312 from current security/page.tsx
   - Section: Architecture
   - Title: "AWS-Native, Multi-Tenant, and SOC 2 Type II Controls"
   - Content: 4 cards (Authentication and Authorization, Infrastructure Security, Monitoring and Threat Detection, Compliance and Audit Readiness)

**Security overview page** (main `/security` page):
- Keep hero section
- Keep "Trust Model" and "Security Stack" section
- Remove Governance, Data Handling, Architecture sections (now separate pages)
- Add links to new child pages in content
- Keep final CTA section

---

## Desktop Fly-out Behavior Requirements

### Hover Interaction
- ✅ 150ms delay before opening (prevent accidental triggers)
- ✅ 200ms grace period before closing (allow mouse movement)
- ✅ Fly-out stays open while hovering parent or panel
- ✅ Click outside closes fly-out

### Keyboard Navigation
- ✅ Enter/Space: Toggle fly-out open/close
- ✅ Escape: Close fly-out
- ✅ Tab: Navigate through top-level items (closes fly-outs)

### Visual Specifications
- Background: `rgba(8, 12, 22, 0.98)` with `blur(24px)`
- Border: `1px solid rgba(0, 200, 255, 0.08)`
- Border radius: `8px`
- Padding: `24px`
- Shadow: `0 8px 32px rgba(0, 0, 0, 0.4)`
- Min-width: `220px`, Max-width: `280px`
- Font size: `14px` (children), `12px` (descriptions)
- Color: `#e8f4ff` (default), `#00c8ff` (hover), `#8A9BBF` (descriptions)

### Animation
- Open: Fade + slide down (150ms, ease-out)
- Close: Fade + slide up (100ms)

**Status:** ✅ Already implemented via NavFlyout.tsx component

---

## Mobile Accordion Behavior Requirements

### Interaction
- ✅ Tap item without children: Navigate directly
- ✅ Tap item with children: Expand accordion
- ✅ ChevronDown rotates 180° on expand
- ✅ Height animation: 300ms ease-out

### Visual Specifications
- Parent padding: `16px 0`
- Child padding-left: `24px`
- Child padding-vertical: `12px`
- Child font-size: `14px`
- Border-bottom: `1px solid rgba(255,255,255,0.06)`

**Status:** ✅ Already implemented via MobileNavAccordion.tsx component

---

## Accessibility Requirements

### ARIA Attributes Required
- ✅ `aria-expanded` on parent buttons with fly-outs
- ✅ `aria-haspopup="true"` on parent buttons
- ✅ `aria-controls` linking button to fly-out panel ID
- ✅ `role="region"` on fly-out panels
- ✅ `aria-label` describing submenu content

### Keyboard Navigation Required
- ✅ Tab through top-level items
- ✅ Enter/Space to toggle fly-out
- ✅ Escape to close fly-out
- ✅ Focus management (stays on parent, doesn't auto-move to children)

**Status:** ✅ Already implemented in Navigation.tsx and component architecture

---

## Implementation Requirements Summary

### Navigation Configuration Changes
1. Update `src/config/navigation.ts`:
   - Add `children` array to Roles item (6 hash link children)
   - Add `children` array to Security item (3 separate page children)

### New Pages Required (3 total)
1. `src/app/security/governance/page.tsx` - Extract from security/page.tsx lines 70-142
2. `src/app/security/data-handling/page.tsx` - Extract from security/page.tsx lines 145-217
3. `src/app/security/architecture/page.tsx` - Extract from security/page.tsx lines 220-312

### Existing Pages to Modify (1 total)
1. `src/app/security/page.tsx` - Remove extracted sections, convert to overview/hub page

### Components to Modify (0 total)
- ✅ NavFlyout.tsx - No changes needed (already handles children array)
- ✅ MobileNavAccordion.tsx - No changes needed (already handles children array)
- ✅ Navigation.tsx - No changes needed (already reads from navigationConfig)

---

## Quality Bar

### Enterprise UX Requirements
- ✅ Consistent behavior across all fly-out sections
- ✅ Smooth animations, no flicker
- ✅ Hover delays prevent accidental opens
- ✅ Click-safe and keyboard-safe
- ✅ Premium visual quality (dark theme, blur, shadows)
- ✅ EKAS color scheme preserved

### Information Architecture Requirements
- ✅ Strong information scent (user can predict destination content)
- ✅ No weak/thin destinations exposed
- ✅ Consistent with existing fly-out pattern
- ✅ All important subsections discoverable
- ✅ EKAS terminology only (no generic SaaS wording)

### Accessibility Requirements
- ✅ ARIA attributes on all interactive elements
- ✅ Keyboard navigation fully functional
- ✅ Screen reader support via roles and labels
- ✅ Focus management correct
- ✅ No keyboard traps

---

## Risks and Mitigation

### Risk: Hash links for Roles inconsistent with other fly-outs
**Impact:** Low
**Mitigation:** Hash links are standard web pattern, users understand them. Acceptable tradeoff to avoid exposing thin content as separate pages.

### Risk: Breaking existing security page inbound links
**Impact:** Medium
**Mitigation:** Keep hash links working (`/security#governance`, `/security#data-handling`, `/security#architecture`). Add redirects or scroll-to-section logic if needed.

### Risk: SEO impact from moving security content to separate pages
**Impact:** Low (positive)
**Mitigation:** Separate pages improve SEO (3 indexable pages vs 1). Each page can have focused meta descriptions.

### Risk: Build time increase from 3 new pages
**Impact:** Low
**Mitigation:** Pages are static, minimal build time impact. Current build ~7s, expect <1s increase.

---

## Next Steps

1. ✅ **Complete audit** (this document)
2. ⏭️ **Define final fly-out structure** (roles_security_flyout_spec.md)
3. ⏭️ **Create 3 new Security pages** (governance, data-handling, architecture)
4. ⏭️ **Update Security overview page** (remove extracted sections)
5. ⏭️ **Update navigation config** (add children arrays for Roles and Security)
6. ⏭️ **Test locally** (npm run build, verify all routes)
7. ⏭️ **Validate accessibility** (keyboard nav, ARIA attributes)
8. ⏭️ **Document implementation** (roles_security_flyout_implementation_report.md)
9. ⏭️ **Deploy to staging** (develop branch)
10. ⏭️ **Deploy to production** (main branch)

---

**Audit completed:** 2026-04-17
**Audited by:** Claude Code (Anthropic)
**Next document:** `roles_security_flyout_spec.md`
