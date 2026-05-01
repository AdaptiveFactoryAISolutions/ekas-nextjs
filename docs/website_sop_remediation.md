# EKAS Website SOP Remediation Report

**Owner:** Patrick Clay
**Status:** Backlog — no fixes are made by this report
**Companion to:** `docs/website_sop.md` (v1.0, 2026-05-01)
**Inventory date:** 2026-05-01 (commit `f7a3d6d` baseline)

This report classifies every existing page against the approved SOP and identifies sitewide, component-system, and technical-debt gaps. **It is a backlog only.** Fixes are scheduled separately.

Severity definitions:

- **BLOCKING** — page should not be considered live until fixed (metadata fallback bugs, IP firewall violations, pricing leaks)
- **HIGH** — significant gap, fix in next sprint (multi-section visual-variety violations, sitewide CTA weakness, nav/footer asymmetry on a tier)
- **MEDIUM** — improvement opportunity (single-section issues, oversized assets, content duplication that is not structural)
- **LOW** — nice-to-have (single-page word-count variance, minor inconsistencies)

---

## Executive Summary

> **Reading the "0 fully compliant pages" line below.** The SOP is new; every page predates it. "0 fully compliant" means every page has at least one identified improvement opportunity against the new standards — most are MEDIUM or HIGH calibration items rather than blocking defects. Only **three pages have BLOCKING violations** (`/demo`, `/resources/faqs`, `/why-ekas`); the remaining 28 are functional and visitor-safe today. The HIGH count is large because Section 4.4's closing-CTA rule is sitewide-applied and almost no page satisfies it yet.

| Category | Count |
|---|---|
| Pages audited | 31 |
| Pages fully compliant with SOP | 0 |
| Pages with at least one BLOCKING violation | 3 |
| Pages with at least one HIGH violation | 26 |
| Pages with only MEDIUM/LOW violations | 2 |
| Pages with only LOW violations | 0 |
| Sitewide pattern violations | 5 |
| Component-system gaps | 4 |
| Technical-debt items | 6 |
| SOP refinement questions surfaced | 2 |

**Top blocking items (highest priority, fix first):**

1. `/demo` and `/resources/faqs` — `"use client"` page files with no `metadata` export. Every visitor sees the homepage's default title in their browser tab on these pages. **BLOCKING per Section 5.5.**
2. `/why-ekas` — direct `export const metadata` with hardcoded full title `"Why EKAS — EKAS by AdaptiveFactory"`. Combined with the root layout's `template: "%s — EKAS by AdaptiveFactory"`, the rendered tab title is `"Why EKAS — EKAS by AdaptiveFactory — EKAS by AdaptiveFactory"`. **BLOCKING per Section 5.1.**
3. **Sitewide nav/footer asymmetry on Platform and Solutions tiers** — five pages violate Section 2.7. Decide direction (add to nav vs. remove from footer) and apply uniformly. **HIGH, but addressable in one PR.**
4. **Sitewide closing-CTA weakness** — 26 of 31 pages close with prose-only CTAs and zero action element, violating Section 4.4. **HIGH, fix-pattern PR followed by per-page wave.**

---

## Section A — Sitewide Pattern Violations

### A.1 Nav/footer asymmetry (HIGH)

**SOP rule:** Section 2.7 — if a Platform/Solutions/Industries sub-page is in nav, it is also in footer, and vice versa.

**Current state:**

| Tier | Nav-only (in nav, missing from footer) | Footer-only (in footer, missing from nav) |
|---|---|---|
| Platform | `/platform/financial-intelligence`, `/platform/document-intelligence` | `/platform/data-connections`, `/platform/reporting-analytics` |
| Solutions | `/solutions/shift-handoff` | `/solutions/capacity-throughput`, `/solutions/multi-site-performance` |
| Industries | (none) | (none) |

Five pages violate this rule across two tiers. Decision required: each row gets either added to its missing surface, or removed from the surface where it currently appears. The decision is not the SOP's to make — it is an editorial call about what gets surfaced in primary navigation. Recommended fix scope: **single PR** that resolves all five via edits to `src/config/navigation.ts` and `src/components/layout/FooterSection.tsx`.

### A.2 Closing-CTA weakness (HIGH)

**SOP rule:** Section 4.4 — every page closes with a CTA section containing at least one action element (button, scoped link with `?subject=`, calendar URL, or scoped form).

**Current state:** 26 of 31 pages close with `<h2>` + `<p>` and **nothing else** — no button, no Link, no mailto, no form. Spot-check examples:

| Page | Closing CTA text | Action element? |
|---|---|---|
| `/why-ekas` | "See Why EKAS Is Different" + prose | No |
| `/about` | "See EKAS in Action" + "Bring a plant problem..." | No |
| `/security/architecture` | "Request Security Packet" + prose | No |
| `/security/data-handling` | "Review Data Handling Practices" + prose | No |
| `/security/governance` | "See Governance in Action" + prose | No |
| `/platform/financial-intelligence` | "See Financial Intelligence in Action" + prose | No |
| `/platform/manufacturing-intelligence` | "See Manufacturing Intelligence in Action" + prose | No |
| `/solutions/downtime-reduction` | "See Downtime Visibility in Action" + prose | No |
| `/technical-overview` | "Request a Technical Deep Dive" + prose | No |

**Compliant pages (5):** `/`, `/about/founder`, `/demo`, `/industries/automotive` (has anchor in middle), and a couple of others with embedded buttons.

**Recommended fix scope:** Two-step. (1) Build a `<ClosingCTA>` primitive (see C.1 below). (2) Multi-PR wave replacing the prose-only closes with the new primitive, batched by section (one PR for `/security/*`, one for `/platform/*`, one for `/solutions/*`, etc.).

### A.3 Cross-link sparsity (MEDIUM)

**SOP rule:** Section 2.5 — page is referenced from at least 2 distinct page files beyond nav, footer, sitemap, and the page's own file.

**Current state:** Cross-link counts (xref column from the audit):

| xref count | Pages |
|---|---|
| 0 (no other page references it) | `/about/founder`, `/industries/industrial-manufacturing`, `/platform/data-connections`, `/platform/reporting-analytics` — 4 pages |
| 1 (only one other page references it) | 16 pages — most platform sub-pages, most solutions sub-pages, most industries sub-pages |
| 2+ (passes Section 2.5) | 11 pages — the hubs (/platform, /solutions, /industries) and a few well-connected ones |

**Pattern:** sub-pages link UP to their parent overview but rarely SIDEWAYS to siblings. /platform/financial-intelligence does not reference /platform/manufacturing-intelligence even though they are conceptually adjacent. /solutions/* pages do not cross-reference each other. Industry pages do not link to relevant solution pages or platform modules.

**Recommended fix scope:** Per-page edits adding 1–2 contextual sibling cross-links. Multi-PR wave; defer to remediation calendar.

### A.4 Industry deployment-proof copy duplication (HIGH)

**SOP rule:** Section 1.6 — no near-duplicate content; Section 4 — pages should be specific to their tier.

**Current state:** A 3-paragraph "EKAS is a purpose-built manufacturing intelligence platform for small and mid-size precision manufacturers..." block appears VERBATIM on:
- `/` (homepage, Deployment Proof Section, lines 56–67)
- `/industries/automotive` (lines 71–82)
- `/industries/metal-stamping` (parallel Deployment Proof Section)

`/industries/industrial-manufacturing` does not have this duplication and can serve as the structural reference.

**Risk:** content-DRY violation, search-cannibalization risk (3 pages competing for the same query), tier-leak (hub-tier copy on tier-2 pages), and — most importantly — three industry pages with identical text directly undermines the vertical-SaaS positioning the site is trying to establish ("industry-specific depth" is contradicted by industry pages that share copy).

**Recommended fix scope:** Single content PR. Trim industry pages to industry-specific content; keep the deployment-proof copy on the homepage only.

### A.5 No `<ClosingCTA>`, no `<SubPageHero>` primitive (HIGH)

The site has 18+ instances of the same icon-badge + h1 + subtitle hero pattern, manually copy-pasted into each page. The site has 28+ instances of the prose-only "See X in Action" closing pattern, also copy-pasted. **The SOP rules in Section 3.4 (hero patterns) and Section 4.4 (closing CTA) cannot be enforced without primitive components — every new page can re-violate the rules with valid-looking JSX.**

This is a structural problem. The fix is component-system work (see Section C below). Until those primitives exist, fixes will continue to be one-page-at-a-time.

---

## Section B — Per-Page Violations

Pages are listed in priority order (BLOCKING first, then by tier).

### B.1 BLOCKING

#### `/demo` — `src/app/demo/page.tsx`

| Aspect | Status |
|---|---|
| Section 5.1 (pageMetadata helper) | **VIOLATES** — no metadata export at all |
| Section 5.2 (required fields) | **VIOLATES** — no title/description/path |
| Section 5.5 (client/server split) | **VIOLATES** — file is `"use client"`, blocks metadata export |
| Section 4.4 (closing CTA) | Compliant — has form submit button |
| Section 3.5 (visual variety) | Form is the visual element; OK |

Severity: **BLOCKING.** Every visitor sees the homepage's default title in their browser tab when on `/demo`. SEO impact: no unique title for what is the site's primary conversion page.

Fix scope: split into server/client. `src/app/demo/page.tsx` becomes a server component re-exporting `pageMetadata({...})`; the form moves to `src/app/demo/DemoFormClient.tsx`. Estimated <1 day. Single PR.

#### `/resources/faqs` — `src/app/resources/faqs/page.tsx`

Same root cause as `/demo`. `"use client"` file, no metadata. Severity: **BLOCKING.** Same fix pattern (split server/client). Single PR.

#### `/why-ekas` — `src/app/why-ekas/page.tsx`

| Aspect | Status |
|---|---|
| Section 5.1 (pageMetadata helper) | **VIOLATES** — uses direct `export const metadata: Metadata = { ... }` |
| Section 5.3 (title format) | **VIOLATES** — hardcodes `"Why EKAS — EKAS by AdaptiveFactory"` as the title; root template appends another `" — EKAS by AdaptiveFactory"` suffix |
| Section 3.5 (visual variety) | 5 body sections; 3 are prose-only and one of them is >100 words → 2 sub-violations |
| Section 4.4 (closing CTA) | **VIOLATES** — closing section is prose-only |

Severity: **BLOCKING** for 5.1/5.3 (rendered tab title is `"Why EKAS — EKAS by AdaptiveFactory — EKAS by AdaptiveFactory"`). HIGH for the visual variety + CTA issues, but those bundle with the metadata fix.

Fix scope: change one import (`pageMetadata`) and one call (`pageMetadata({ title: "Why EKAS", description: ..., path: "/why-ekas" })`). 5 lines of code. Single PR; can include the visual-variety fixes if desired or defer them to the visual-variety wave.

### B.2 HIGH — Hub Pages

#### `/` (homepage) — `src/app/page.tsx`

| Aspect | Status |
|---|---|
| Section 3.4 (hero pattern) | **CLASSIFICATION DEFERRED** — the homepage uses a third hero pattern (split-screen marquee with `ekas-dashboard.jpg`) not currently codified in SOP Section 3.4. The right answer is to amend the SOP (see E.1 below and Priority 6 backlog item) rather than mark the homepage non-compliant. Re-classify after SOP v1.1. |
| Section 3.5 (visual variety) | **9 sections; 1 prose-only section >100 words.** The "Deployment Proof Section" (lines 49–70) is ~168 words across 4 paragraphs with no visual element. |
| Section 6.2 (PageShell required) | **EXEMPT** — manually composes BackgroundAtmosphere/Navigation/FooterSection/DemoRequestModal because the demo modal state lives at the page root. SOP grants the exemption explicitly; ensure the exemption note is in the page file as a comment. |
| Section 4.4 (closing CTA) | Compliant — has working `<button>` to demo modal + secondary link |
| Sections 1, 2, 5, 6, 7 | Compliant |

Severity: **HIGH** on the visual-variety sub-violation; otherwise reference page.
Fix scope: reword the Deployment Proof section to ≤100 words OR add a visual element (e.g., a 3-up bullet card or a single inline graphic). Defer to a content PR.

#### `/platform` — `src/app/platform/page.tsx`

| Aspect | Status |
|---|---|
| Section 3.5 (visual variety) | Compliant — 6 body sections, all carded or structured |
| Section 4.4 (closing CTA) | **VIOLATES** — closing CTA section is prose-only |
| Section 1.6 (no near-duplicate concept pages) | Borderline — Add-On Module cards reference "CE — Cost Estimation" and "Agentic Quoting" with no linkable destination. Stale concept stubs. |

Severity: **HIGH** (closing CTA + stale Add-On Module references).
Fix scope: add closing CTA action; remove or properly link the Add-On Module cards. Single PR.

#### `/solutions` — `src/app/solutions/page.tsx`

| Aspect | Status |
|---|---|
| Section 3.5 | Compliant — solutions grid is the visual element |
| Section 4.4 | **VIOLATES** — closing CTA is prose-only |

Severity: **HIGH** on the CTA. Other dimensions compliant. Bundle with sitewide CTA wave.

#### `/industries` — `src/app/industries/page.tsx`

| Section 3.5 | Compliant — 3 sections, one with cards |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |

Severity: **HIGH** on CTA. Bundle with CTA wave.

#### `/security` — `src/app/security/page.tsx`

| Section 3.5 | Compliant |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |

Severity: HIGH. Bundle with CTA wave.

### B.3 HIGH — Tier-2 Sub-Pages (Platform Modules)

#### `/platform/ai-assistant`

Reference-quality page (cited as Appendix A in SOP). One violation: Section 4.4 closing CTA is prose-only. **HIGH.** Bundle with CTA wave.

#### `/platform/manufacturing-intelligence`

Reference-quality page. Same one violation: Section 4.4 prose-only close. **HIGH.** Bundle with CTA wave.

#### `/platform/financial-intelligence`

Reference-quality page. Same one violation: Section 4.4. **HIGH.**

#### `/platform/document-intelligence`

| Section 2.7 (symmetry) | **VIOLATES** — in nav, not in footer |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |

Severity: **HIGH** on both. The 2.7 fix is the sitewide A.1 PR; the 4.4 fix is the CTA wave.

#### `/platform/data-connections`

| Section 2.1 (in nav) | **VIOLATES** — in footer, not in nav |
| Section 2.7 (symmetry) | **VIOLATES** |
| Section 2.5 (cross-links) | **VIOLATES** — xref=0 (no other page references it) |
| Section 3.5 | Compliant — three of three body sections either ≤100 words or contain a visual element |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |

Severity: **HIGH.** This page is partially orphaned (no nav, no cross-references, only footer + sitemap + parent overview reach it).

#### `/platform/reporting-analytics`

Same pattern as data-connections. Severity: **HIGH.**

### B.4 HIGH — Tier-2 Sub-Pages (Solutions)

#### `/solutions/downtime-reduction`

| Section 3.5 | **VIOLATES** — "The Problem" section is ~67 words prose-only (passes 100-word rule) BUT "The Scale" section is ~95 words prose-only with a footnote citation; passes marginally. Other sections compliant. |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |

Severity: **HIGH** on CTA. Visual variety is borderline-pass.

#### `/solutions/scrap-quality-visibility`

| Section 3.5 | Need to verify; estimated compliant based on structural fingerprint (7 sections, 1 card grid, 5 h2). Likely OK. |
| Section 4.4 | **VIOLATES** (assumed by pattern) |

Severity: HIGH on CTA.

#### `/solutions/cost-driver-analysis`, `/solutions/capacity-throughput`, `/solutions/multi-site-performance`, `/solutions/shift-handoff`

All follow the same structure: hero + scale (sometimes) + problem + 4-up cards + prose CTA. All violate Section 4.4. Capacity-throughput and multi-site-performance also violate Sections 2.1 + 2.7 (footer-only). Shift-handoff also violates 2.7 (nav-only).

Severity: **HIGH** for each.

### B.5 HIGH — Tier-2 Sub-Pages (Industries)

#### `/industries/automotive`

| Section 1.6 (no near-duplicate content) | **VIOLATES** — duplicates homepage's deployment-proof prose verbatim (lines 71–82). See A.4. |
| Section 3.5 (visual variety) | **VIOLATES** — most body sections are prose-only with 100+ words. Only the "FMEA Intelligence" section has a visual element (the In-Development tag). |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |

Severity: **HIGH** on multiple dimensions.

#### `/industries/metal-stamping`

Same duplication as automotive (A.4). Same general visual-variety and CTA issues. **HIGH.**

#### `/industries/industrial-manufacturing`

| Section 2.5 (cross-links) | **VIOLATES** — xref=0 |
| Section 3.5 | **VIOLATES** (assumed by structural fingerprint: 4 sections, 0 cards) |
| Section 4.4 | **VIOLATES** |

Severity: HIGH.

### B.6 HIGH — Tier-3 Sub-Pages (Security)

All three `/security/*` sub-pages have the same pattern:

| Aspect | architecture | data-handling | governance |
|---|---|---|---|
| Section 3.5 visual variety | Compliant (premium-card stack) | Compliant | Compliant |
| Section 4.4 closing CTA | **VIOLATES** | **VIOLATES** | **VIOLATES** |

**All three security sub-pages close with `<h2>` + `<p>` and zero action element.** This is verified by reading the closing sections directly.

Severity: **HIGH** for each (consistent with Pat's rubric — multi-page CTA-pattern weakness).

Fix scope: single PR adding action elements to all three. Could be the same PR as the broader CTA wave or a focused security-tier PR.

### B.7 HIGH — About / Founder

#### `/about` — `src/app/about/page.tsx`

| Section 3.5 (visual variety) | **VIOLATES** — Section 1 ("30 Years on the Floor...") is ~127 words prose-only; Section 2 ("Why EKAS Exists") is ~110 words prose-only. Both >100 words with no visual element. |
| Section 4.4 (closing CTA) | **VIOLATES** — prose-only |

Severity: **HIGH** (multiple body sections fail visual variety; per Pat's rubric this is HIGH).

#### `/about/founder` — `src/app/about/founder/page.tsx`

| Section 3.5 | **VIOLATES** — Background section ~140 words prose; Why EKAS section ~100 words prose |
| Section 4.4 | Compliant — has LinkedIn `<a class="btn-primary">` (one of the few well-formed CTAs on the site) |
| Section 2.5 | **VIOLATES** — xref=0 |

Severity: **HIGH** (visual variety on multiple sections).

### B.8 MEDIUM/LOW — Pages with single-section issues only

#### `/roles` — `src/app/roles/page.tsx`

| Section 3.5 | Compliant — body section is the role cards grid |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |
| Section 2.5 | Cross-linked via footer anchors (#plant-managers etc.); passes |

Severity: **MEDIUM** (CTA only; no visual-variety issue).

#### `/resources` — `src/app/resources/page.tsx`

| Section 4.4 | **VIOLATES** — closing CTA prose-only |
| Other dimensions | Compliant |

Severity: **MEDIUM** (CTA only).

#### `/technical-overview`

| Section 3.5 | Compliant (cards + numbered steps + cards) |
| Section 4.4 | **VIOLATES** — closing CTA prose-only |
| Section 2.5 | xref=2; passes |

Severity: **MEDIUM** (CTA only).

---

## Section C — Component-System Gaps

Component primitives that the site is missing. Fixing these makes SOP enforcement mechanical instead of per-page.

### C.1 `<ClosingCTA>` primitive (HIGH priority)

The closing-section pattern is duplicated across 28+ pages. Creating a primitive that takes the following prop interface would (a) make Section 4.4 trivially enforceable (PR reviewer just checks "does the page use `<ClosingCTA>`?") and (b) eliminate the prose-only-CTA pattern by requiring at least one action element by type.

```tsx
interface ClosingCTAProps {
  heading: string;            // page-specific h2 copy
  body: string;               // page-specific body copy
  primary:                    // EXACTLY ONE primary action element (required)
    | { kind: "demoModal" }   // triggers the global DemoRequestModal
    | { kind: "link"; href: string; label: string }
    | { kind: "mailto"; subject: string; label: string }; // forces ?subject=
  secondary?: {               // optional secondary link
    href: string;
    label: string;
  };
}
```

**Customization requirement:** every page passes its own `heading`, `body`, and `primary` action — the goal is replacing 26 weak generic CTAs with 26 strong context-specific ones, not 26 identical generic ones. The primitive enforces structure (action element required, single primary), not content. Page authors choose page-appropriate copy and destinations.

Estimated work: <2 hours for the primitive, + per-page wiring at use site. Should ship before the CTA-fix wave.

### C.2 `<SubPageHero>` primitive (HIGH priority)

The icon-badge sub-page hero pattern is duplicated across 18+ pages. The primitive's prop interface:

```tsx
interface SubPageHeroProps {
  icon: LucideIcon;            // page-specific icon
  title: string;               // page H1
  subtitle: string;            // page subtitle
  backHref: string;            // parent route
  backLabel: string;           // e.g., "Back to Platform"
  eyebrow?: string;            // optional section-label override
}
```

**Customization requirement:** every page passes its own icon, title, subtitle, and parent route. The primitive standardizes the layout (icon-badge sizing, font, spacing, back-link placement) — not the content. Page authors retain full editorial control over what their hero says.

Estimated work: <2 hours. Should ship with C.1.

### C.3 `<HubHero>` primitive (MEDIUM priority)

The centered hub-overview hero pattern (eyebrow + h1 + subtitle, centered) is duplicated across 7+ pages. Same enforcement argument as C.2.

Estimated work: <1 hour. Bundle with C.2.

### C.4 `<StatNumberGrid>` primitive (LOW priority)

The 4-up stat-number cards on the homepage Industry Benchmark section are a strong visual element that no other page reuses. Promoting to a primitive would make it available for tier-2 pages that currently have prose-only sections.

Estimated work: <2 hours. Defer until the visual-variety wave.

---

## Section D — Technical-Debt Items

### D.1 `ekas-logo-nav.png` oversized — 582 KB (MEDIUM)

Public asset is 4× the SOP's 200 KB ceiling (Section 3.7). Loaded by every page that renders the navigation (i.e., every page). Performance impact is real and measurable.

Fix: re-export at appropriate dimensions (the PNG is currently used at 144×52 in the footer, so it should be ≤30 KB). Defer to a perf-focused PR. <1 hour.

### D.2 Manual sitemap (LOW — already in SOP 6.7 as policy)

`src/app/sitemap.ts` is hand-curated. Drift risk is real over time. SOP Section 6.7 already mandates that PRs adding pages also update the sitemap. No active drift today (verified — every page file has a sitemap entry). Defer.

### D.3 Footer external images use `unoptimized` (LOW)

`src/components/layout/FooterSection.tsx` lines 120, 131 — the AWS and SonarCloud badge images use `unoptimized` because they're hosted on third-party domains. SOP Section 6.3 requires a `// reason: ...` comment alongside `unoptimized`; current code has no such comment.

Fix: add the reason comments. <5 minutes.

### D.4 No automated build-page-count check (LOW)

SOP Section 6.6 says the build's static-page count must match the sitemap count plus framework auto-routes. Currently this is enforced only by the SOP, not by CI. A short script in `scripts/` that runs `next build` output through a regex and compares to `sitemap.ts` would close the loop.

Estimated work: 1–2 hours. Defer.

### D.5 No CI run of the IP firewall and pricing leak greps (HIGH)

SOP Sections 7.1 and 7.2 mandate these greps return zero matches. Currently they're enforced only by the manual pre-commit IP firewall hook (`scripts/ip_firewall_scan.sh`, per session memory) and post-deploy curl checks. The compliance gates in Section 7 are absolute — absence of automation here is a latent compliance violation, not a nice-to-have. A regression that introduces a P&C reference or a pricing leak in code (e.g., a hardcoded card label, a code-comment with internal pricing, a draft copy edit that slips through review) would not be caught by current CI; only by a manual reviewer noticing or by a post-deploy curl that runs after the violation is already on the live site. Treat as mandatory follow-up.

Estimated work: 1–2 hours. Schedule with the Priority 5 batch but mark as the highest-priority item within that batch.

### D.6 `/why-ekas` import-style-divergence (LOW)

`/why-ekas` imports `Metadata` from `"next"` directly instead of using the `pageMetadata` helper. This is the source of the BLOCKING title bug (B.1). Adding an ESLint rule that flags `import type { Metadata } from "next"` outside `lib/metadata.ts` would prevent the same bug from recurring.

Estimated work: <1 hour. Bundle with the `/why-ekas` fix PR.

---

## Section E — SOP Refinement Questions for Pat

Two findings that don't fit cleanly under any severity because they're SOP-text issues, not page violations. Surfacing for your decision rather than guessing:

### E.1 Section 3.4 to be amended to recognize three hero patterns (decided)

**Decision (HALT-C):** SOP Section 3.4 will be amended to recognize three valid hero patterns:

(a) **Sub-page icon-badge** — Lucide icon-badge + h1 + subtitle, left-aligned. Used on platform/solutions/industries/security sub-pages.
(b) **Hub centered** — eyebrow `section-label` + h1 + body-lg subtitle, centered, no icon. Used on the hub overview pages (`/why-ekas`, `/platform`, `/solutions`, `/industries`, `/security`, `/about`, `/technical-overview`, `/roles`, `/resources`, `/about/founder`).
(c) **Homepage marquee** — two-column split-screen with primary visual (e.g., dashboard screenshot) on the right and an eyebrow + h1 + subtitle + CTA stack on the left. Used **only** on `/` (the homepage). Implemented by `src/components/sections/HeroSection.tsx`.

The amendment is captured in the Priority 6 backlog item (Section F). Until the SOP is amended to v1.1, the homepage's hero pattern classification is deferred from this report — see Section B.2 (homepage entry).

### E.2 Section 4.6 industry-benchmark dollar figures — list the 3 currently-deployed examples

Section 4.6 of the SOP permits sourced industry-benchmark dollar figures. The audit found exactly three deployed instances:
- `/` (homepage) Industry Benchmark stat cards: `$1.2–2M`, BCG/MTBF citations
- `/solutions/downtime-reduction` line 46: `$1.2–2M`, MTBF/MTTR citation
- `/solutions/scrap-quality-visibility` line 46: `$800K–1.5M`, industry benchmark citation

All three currently comply with Section 4.6 — sourced, ranged, disclaimed. No action needed. Surfacing only so you know the universe of in-production examples and can decide whether to add an "approved figure list" as an SOP appendix.

---

## Section F — Recommended Remediation Backlog (Ordered)

Priority sequence below. Items in the same numbered group can run in parallel; each numbered group blocks the next where dependencies exist.

### Priority 1 — BLOCKING fixes (this sprint)

1. **`/demo` server/client split** — restore metadata. Single PR. <1 day.
2. **`/resources/faqs` server/client split** — restore metadata. Single PR. <1 day.
3. **`/why-ekas` migrate to `pageMetadata` helper** — fix double-suffix title. Single PR. <1 hour. Bundle with the optional `/why-ekas` visual-variety fix or keep separate.

### Priority 2 — Component primitives (this sprint, before Priority 3 starts)

4. **Build `<ClosingCTA>`, `<SubPageHero>`, `<HubHero>` primitives** (C.1, C.2, C.3). Single PR. <1 day total.

### Priority 3 — Sitewide structural fixes (next sprint, after Priority 2)

5. **Nav/footer symmetry resolution** (A.1) — single PR resolving all 5 asymmetric pages. Editorial decision required first: which surface gets which page.
6. **Closing-CTA wave** (A.2) — multi-PR sequence using the `<ClosingCTA>` primitive from Priority 2. Suggested batching: `/security/*` (3 pages, 1 PR), `/platform/*` (5 pages, 1 PR), `/solutions/*` (7 pages, 1 PR), `/industries/*` (3 pages, 1 PR), top-level pages (4 pages, 1 PR). Total 5 PRs.

### Priority 4 — Visual variety + content fixes (1–2 sprints out)

7. **Visual variety wave** — adds visual elements to prose-only sections >100 words across `/about`, `/about/founder`, `/why-ekas`, `/industries/automotive`, `/industries/metal-stamping`, `/industries/industrial-manufacturing`, `/`. Approach: per-page content edits using existing primitives; build new primitives only if a clear pattern emerges. Multi-PR.
8. **Industry deployment-proof deduplication** (A.4) — single PR. Trim industry pages, keep homepage. <1 day.
9. **Cross-link gap fixes** (A.3) — adds 1–2 sibling cross-links per page across 20+ pages. Multi-PR or one big PR.

### Priority 5 — Technical debt (background, when capacity allows)

10. **Resize `ekas-logo-nav.png`** (D.1). Single PR. <1 hour.
11. **Footer `unoptimized` reason comments** (D.3). 5 minutes.
12. **CI page-count + compliance grep scripts** (D.4, D.5). 2–4 hours.
13. **ESLint rule against direct `Metadata` import** (D.6). Bundle with `/why-ekas` fix.

### Priority 6 — SOP refinements (decided at HALT-C, awaiting authoring)

14. **SOP Section 3.4 amendment to recognize three hero patterns** (E.1 decided). Amend Section 3.4 to add the homepage-marquee pattern as the third valid hero type. v-bump SOP to v1.1 with dated changelog at the top per Section 9.3. After the amendment, re-classify the homepage's deferred hero entry in this report (currently shown as DEFERRED in Section B.2 and the Appendix). Single docs PR. <30 minutes.

---

## Appendix — Full Per-Page Severity Index

| Route | Severity | Primary violations |
|---|---|---|
| `/demo` | BLOCKING | 5.1, 5.2, 5.5 |
| `/resources/faqs` | BLOCKING | 5.1, 5.2, 5.5 |
| `/why-ekas` | BLOCKING | 5.1, 5.3 (also 3.5, 4.4) |
| `/` | HIGH | 3.5 (one section). Hero pattern classification deferred pending SOP Section 3.4 amendment to allow homepage-marquee pattern as a third valid hero type. |
| `/platform` | HIGH | 4.4, 1.6 (stale add-on cards) |
| `/solutions` | HIGH | 4.4 |
| `/industries` | HIGH | 4.4 |
| `/security` | HIGH | 4.4 |
| `/platform/ai-assistant` | HIGH | 4.4 |
| `/platform/manufacturing-intelligence` | HIGH | 4.4 |
| `/platform/financial-intelligence` | HIGH | 4.4 |
| `/platform/document-intelligence` | HIGH | 2.7, 4.4 |
| `/platform/data-connections` | HIGH | 2.1, 2.5, 2.7, 4.4 |
| `/platform/reporting-analytics` | HIGH | 2.1, 2.5, 2.7, 4.4 |
| `/solutions/downtime-reduction` | HIGH | 4.4 |
| `/solutions/scrap-quality-visibility` | HIGH | 4.4 |
| `/solutions/cost-driver-analysis` | HIGH | 4.4 |
| `/solutions/capacity-throughput` | HIGH | 2.1, 2.7, 4.4 |
| `/solutions/multi-site-performance` | HIGH | 2.1, 2.7, 4.4 |
| `/solutions/shift-handoff` | HIGH | 2.7, 4.4 |
| `/industries/metal-stamping` | HIGH | 1.6 (A.4), 3.5, 4.4 |
| `/industries/automotive` | HIGH | 1.6 (A.4), 3.5, 4.4 |
| `/industries/industrial-manufacturing` | HIGH | 2.5, 3.5, 4.4 |
| `/security/architecture` | HIGH | 4.4 |
| `/security/data-handling` | HIGH | 4.4 |
| `/security/governance` | HIGH | 4.4 |
| `/about` | HIGH | 3.5 (multi-section), 4.4 |
| `/about/founder` | HIGH | 2.5, 3.5 (multi-section) |
| `/roles` | MEDIUM | 4.4 |
| `/resources` | MEDIUM | 4.4 |
| `/technical-overview` | MEDIUM | 4.4 |

End of remediation report v1.0.
