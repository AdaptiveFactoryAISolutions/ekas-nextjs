# Content Decision Log
## All Meaningful Content Changes During Remediation

**Purpose:** Track every content change made during remediation process for accountability and reversibility.

**Status:** Phase 1 — Empty (will populate during Phase 2-5 remediation)

---

## LOG FORMAT

### Entry Template

**Date/Time:** YYYY-MM-DD HH:MM
**Page:** `/route/to/page`
**Change Made:** [Brief description of change]
**Reason:** [Why change was necessary]
**Source Grounding:** [Documentation reference or "removed - not grounded"]
**Gate Impact:** [Which approval gate(s) affected]
**Approval Status:** [Change approved by Lead Systems Engineer]

---

## DECISION LOG ENTRIES

### P0-1: Cost Quantification Overclaims Remediation (2026-04-16)

**Date/Time:** 2026-04-16 14:30
**Page:** `/solutions/cost-driver-analysis`
**Change Made:** Replaced "cost impact" with "time/resource impact" and "hour/unit impact"; replaced "dollar impact" with "time and resource quantification"
**Reason:** EBITDA Architecture shows cost quantification as [PARTIAL] status. Agent 1 identified cost quantification overclaims as P0 launch blocker.
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline) - removed unsupported capability claims
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:32
**Page:** `/solutions/downtime-reduction`
**Change Made:** Replaced "costs money" / "the real cost of downtime" with "represents lost production capacity" / "downtime patterns stay hidden"; changed card title from "Quantify the cost" to "Quantify time lost" with body focusing on "downtime hours"
**Reason:** Cost quantification overclaim - EBITDA Architecture [PARTIAL] status
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:34
**Page:** `/platform/manufacturing-intelligence`
**Change Made:** Replaced "downtime cost" with "downtime tracking" in hero text; changed "Cost Attribution" metrics from dollar-based to hour/unit-based ("Labor Hours by Workcenter", "Downtime Hour Impact", etc.); replaced "downtime cost" with "downtime hours" in feature list
**Reason:** Cost quantification overclaim across multiple sections
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:36
**Page:** `/platform/ai-assistant`
**Change Made:** Replaced example question "What did downtime cost us on 2nd shift last month?" with "How many hours of downtime did we experience on 2nd shift last month?"; replaced "What's driving cost variance" with "What's driving time variance"
**Reason:** Example questions implied cost calculation capability not fully supported
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:38
**Page:** `/` (homepage)
**Change Made:** Replaced "cost drivers" with "time variance" in final CTA section
**Reason:** Cost quantification overclaim
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:39
**Page:** HeroSection component
**Change Made:** Replaced "expose cost drivers" with "track time variance" in hero subheading
**Reason:** Cost quantification overclaim in primary messaging
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:41
**Page:** `/solutions` (hub page)
**Change Made:** Replaced "quantify the cost" with "quantify downtime hours" in Downtime Reduction card description
**Reason:** Cost quantification overclaim in solution description
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:43
**Page:** `/solutions/scrap-quality-visibility`
**Change Made:** Replaced "discover the full cost" with "discover the full impact"; changed "dollar cost of scrap, rework" to "scrap units, rework hours, and quality hold time"; changed "scrap and rework costs" to "scrap units and rework hours"
**Reason:** Cost quantification overclaims across multiple sections
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 14:45
**Page:** `/security`
**Change Made:** Replaced "downtime cost" with "downtime tracking" in Versioned Metric Definitions example
**Reason:** Cost quantification overclaim in governance example
**Source Grounding:** EBITDA Architecture - implementation status [PARTIAL]
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Summary P0-1:** 9 pages remediated, 14+ individual cost quantification claims replaced with hour/unit/time-based language. Build passing with zero errors.

---

### P0-2: Pre-Built Connector Overclaims Remediation (2026-04-16)

**Date/Time:** 2026-04-16 15:00
**Page:** `/` (homepage FAQ)
**Change Made:** Removed vendor-specific connector list (Plex, Epicor, DELMIA Apriso, SAP, Oracle, Microsoft Dynamics, Ignition, Wonderware, InfinityQS) and replaced with generic "MES platforms, ERP systems, SCADA systems, and quality databases"
**Reason:** Agent 1 identified pre-built connector overclaims as P0 launch blocker. Content Brief prohibits vendor-specific connector claims.
**Source Grounding:** Content Brief - connection approach is general-purpose, not vendor-specific
**Gate Impact:** Gate 6 (Proof Discipline) - removed unsupported capability claims
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 15:02
**Page:** `/resources/faqs`
**Change Made:** Removed vendor-specific connector list and replaced with generic language matching homepage FAQ; also fixed "downtime cost" → "downtime tracking" in first FAQ answer
**Reason:** Pre-built connector overclaim + cost quantification overclaim
**Source Grounding:** Content Brief - general-purpose connection approach
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Summary P0-2:** 2 pages remediated (homepage FAQ + resources/faqs), vendor-specific connector claims removed. Build passing with zero errors.

---

### P0-3: FMEA Integration Wording Verification (2026-04-16)

**Date/Time:** 2026-04-16 15:15
**Page:** All pages (Platform Hub, AI Assistant, Downtime Reduction, Mfg Intelligence)
**Change Made:** Verification only - no changes needed
**Reason:** Agent 1 flagged "FMEA integration" as banned term. Comprehensive search found zero instances of this phrase in source code. All pages already use approved alternatives: "failure analysis workflows", "documented failure modes", "risk analysis workflows"
**Source Grounding:** Banned Language List - "FMEA integration" prohibited, alternatives mandated
**Gate Impact:** Gate 4 (EKAS Brand Discipline) - brand-compliant language verified
**Approval Status:** Approved by Lead Systems Engineer

**Summary P0-3:** 0 remediations required. All 4 pages already compliant with governance standards. Build passing with zero errors.

---

### P0-4: Add Compliance Qualifiers (2026-04-16)

**Date/Time:** 2026-04-16 15:30
**Page:** `/platform/ai-assistant`
**Change Made:** Changed "IATF 16949 ready" to "Designed to support IATF 16949 compliance"
**Reason:** Agent 1 identified compliance overclaims. Stating certifications as fact vs "designed to support"
**Source Grounding:** Master Brief - conservative wording required for compliance claims
**Gate Impact:** Gate 6 (Proof Discipline) - compliance claims properly qualified
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 15:31
**Page:** `/platform/manufacturing-intelligence`
**Change Made:** Changed "IATF 16949 and ISO compliance built in" to "Designed to support IATF 16949 and ISO compliance"
**Reason:** Compliance overclaim without proper qualifier
**Source Grounding:** Master Brief - conservative wording required
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Date/Time:** 2026-04-16 15:32
**Page:** `/resources/faqs`
**Change Made:** Changed "It supports IATF 16949, ISO 13485, AS9100" to "It is designed to support IATF 16949, ISO 13485, AS9100"
**Reason:** Strengthen compliance qualifier from "supports" to "designed to support"
**Source Grounding:** Master Brief - conservative wording required
**Gate Impact:** Gate 6 (Proof Discipline)
**Approval Status:** Approved by Lead Systems Engineer

**Summary P0-4:** 3 pages remediated, compliance qualifiers strengthened. Build passing with zero errors.

---

### P0-5: Email Address Consistency (2026-04-16)

**Date/Time:** 2026-04-16 15:45
**Page:** DemoRequestModal component
**Change Made:** Standardized email address from `pat@adaptivefactoryaisolutions.com` to `pat@adaptivefactory.net` to match footer
**Reason:** Agent 4 identified email inconsistency as critical issue. Two different email addresses undermines trust and creates confusion.
**Source Grounding:** Trust consistency requirement - contact information must be uniform
**Gate Impact:** Gate 7 (CTA Discipline) - contact consistency verified
**Approval Status:** Approved by Lead Systems Engineer

**Summary P0-5:** 1 component remediated, email address standardized. Build passing with zero errors.

---

### P0-6: Remove "Learn More" CTA (2026-04-16)

**Date/Time:** 2026-04-16 15:47
**Page:** `/solutions` (hub page)
**Change Made:** Removed "Learn more →" text from solution cards (cards remain clickable via Link wrapper)
**Reason:** Agent 4 identified "Learn more" as governance-prohibited CTA. Banned Language List prohibits "Learn more" as too vague.
**Source Grounding:** Banned Language List - "Learn more" explicitly prohibited
**Gate Impact:** Gate 7 (CTA Discipline) - CTA violations removed
**Approval Status:** Approved by Lead Systems Engineer

**Summary P0-6:** 1 page remediated, banned CTA removed. Build passing with zero errors.

---

## PHASE 3 SUMMARY (P0 Remediations Complete)

**Total P0 Items:** 6
**Pages Remediated:** 15 unique pages
**Components Remediated:** 2 (HeroSection, DemoRequestModal)
**Individual Changes:** 30+ content modifications
**Build Status:** ✅ PASSING (28 routes, 0 errors)

**P0-1:** 9 pages - cost quantification claims replaced with hour/unit language
**P0-2:** 2 pages - vendor-specific connector claims removed
**P0-3:** 0 pages - verification only, already compliant
**P0-4:** 3 pages - compliance qualifiers strengthened
**P0-5:** 1 component - email address standardized
**P0-6:** 1 page - banned CTA removed

**Launch Blocker Status:** ✅ ALL P0 ISSUES RESOLVED

---

**Logging Rules:**

1. Log ALL meaningful changes (not typo fixes)
2. Include source grounding reference
3. Mark gate impact
4. Approved by Lead Systems Engineer

**Exempted from Log:**
- Typo corrections
- Punctuation fixes
- Minor formatting adjustments

**Must be Logged:**
- Content additions
- Content removals
- Wording changes
- Claim modifications
- Section restructuring
- CTA changes

---

**Last Updated:** 2026-04-16
**Maintained By:** Lead Website Systems Engineer
