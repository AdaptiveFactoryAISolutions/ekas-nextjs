# EKAS Website SOP

**Owner:** Patrick Clay
**Status:** Draft v1.0 (2026-05-01)
**Scope:** `adaptivefactory.ai` (the EKAS Next.js site at `ekas-nextjs/`)
**Maintenance:** Quarterly audit, annual SOP review (see Section 9)

This document codifies how pages are built on the EKAS website. Every rule below is a yes/no gate. A page that fails any rule is not "live" — it ships only after the gate is satisfied or an explicit, dated waiver from the owner is recorded in the page's PR.

The SOP is derived from auditing the existing site. Where current pages diverge from the rules, the divergence is captured in the companion `docs/website_sop_remediation.md` — the SOP codifies the standard, not the average.

---

## Section 1 — Information Architecture Standards

**1.1 Hierarchy.** Every page has exactly one parent in the global nav structure (`src/config/navigation.ts`). Top-level routes (`/`, `/why-ekas`, `/about`, `/demo`, `/technical-overview`, `/roles`) are exempt — they are themselves parents.

**1.2 URL structure.** Routes use kebab-case (`/platform/quote-intelligence`, not `/platform/quoteIntelligence`). Routes have no trailing slash. Parallel content uses parallel structure (`/platform/<module>`, `/solutions/<problem>`, `/industries/<segment>`).

**1.3 File-tree mirroring.** Every page file path mirrors its URL: `/platform/financial-intelligence` → `src/app/platform/financial-intelligence/page.tsx`. No exceptions.

**1.4 Maximum depth.** Every page is reachable from the homepage in ≤2 clicks. (Homepage → top-level nav fly-out → page = 2 clicks; homepage → footer column → page = 1 click.)

**1.5 New page vs extend existing.** A new page is justified only when it represents a distinct concept that cannot be a section of an existing page without diluting the parent. New module pages, new solution pages, and new industry segments may justify their own page. New facets of the same concept extend the existing page.

**1.6 No near-duplicate content.** Two pages must not cover the same concept with substantially overlapping copy. If `/platform/<X>` and `/solutions/<Y>` are converging, one wraps the other.

---

## Section 2 — Discoverability Standards (the launch gate)

A page is **not live** until all of the following are satisfied:

**2.1 Flyout nav.** The page's slug is present in `src/config/navigation.ts` under the correct top-level section. Exception: action-only pages routed via modal (currently `/demo`) may live in nav as a button rather than a fly-out child, provided they are also reachable from the footer.

**2.2 Footer.** The page is linked from `src/components/layout/FooterSection.tsx` under the column that matches its nav section. Overview/index pages may link via column header. Sub-pages link individually.

**2.3 Sitemap.** The page is enumerated in `src/app/sitemap.ts` with priority calibrated by tier:
- Homepage: 1.0
- Top-level hub pages (Platform, Solutions, Industries, Why EKAS): 0.9
- Tier-2 sub-pages (platform modules, solution pages, industry pages): 0.7
- Tier-3 sub-pages (security/governance, security/data-handling, etc.): 0.6
- Tertiary content (About founder, FAQs, About): 0.5–0.6
- Demo / contact pages: 0.8

**2.4 Robots.** The page is allowed by `src/app/robots.ts`. (Current rule: allow `/` except `/api/`.)

**2.5 Cross-links.** The page is referenced from at least **2 distinct page files** beyond nav, footer, sitemap, and the page's own file. Mechanical test:

```bash
grep -rIn "\"<slug>\"" src/app/ --include="*.tsx" \
  | grep -v "src/app/<slug>/page.tsx" \
  | grep -v "src/app/sitemap.ts" \
  | awk -F: '{ print $1 }' | sort -u | wc -l
```

Result must be ≥2 (two or more distinct files beyond the page itself reference the slug). The standard `<Link href="/<parent>">Back to <Parent></Link>` counts as 1 — but it appears in only one file (the page itself, which is excluded), so it does not count toward the 2 unless other pages also link back. Tier-2 sub-pages should add at least one sibling cross-link to their conceptually closest peer.

**2.6 Reachability check.** Run all three greps below for the page's slug; each must return at least one match. PR reviewers paste the page's slug into `<slug>` and run from the `ekas-nextjs/` root:

```bash
grep -n "\"<slug>\"" src/config/navigation.ts          # check 1: nav presence
grep -n "\"<slug>\"" src/components/layout/FooterSection.tsx   # check 2: footer presence
grep -n "\"<slug>\"" src/app/sitemap.ts                # check 3: sitemap presence
```

A page with zero matches in any of the three is not "live" by Section 2 standards. (Note: a page in the footer via an anchor link only — e.g., `/roles#plant-managers` — counts as footer-present, but the anchor target page itself must also be in the sitemap and at least one of nav or footer at its full slug.)

**2.7 Symmetry rule (new).** If a Platform sub-page is in the nav, it is also in the footer, and vice versa. The same rule applies to Solutions sub-pages and Industries sub-pages. No "nav-only" or "footer-only" pages within a tier.

---

## Section 3 — Visual System Standards

Evaluated **section-by-section**, not page-as-a-whole. A page with one hero image and eight prose-only sections is non-compliant.

**3.1 Brand colors.** Navy background `#0A0E1A` / Cyan accent `#00C8FF` only. Off-brand color introduction requires updating `src/app/globals.css` color tokens and `tailwind.config.ts` simultaneously.

**3.2 Typography.** Rajdhani Bold for `<h1>`/`<h2>`/hero text (`var(--font-rajdhani)`). DM Sans for all body copy (`var(--font-dm-sans)`). Roboto Mono for technical labels, eyebrow `section-label` class, and code-style snippets (where used). No other fonts.

**3.3 Component primitives.** Use existing primitives: `PageShell`, `premium-card`, `gradient-card-outer/inner`, `btn-primary`, `btn-ghost`, `section-label`, `section-padding`, `text-h1`/`h2`/`h3`/`h4`, `text-body-lg`/`base`/`sm`, `text-fine`. Introducing a new primitive requires (a) at least 2 use sites at introduction, (b) addition to `globals.css` under the appropriate section, (c) note in the page-launch PR.

**3.4 Hero variants.** Two acceptable hero patterns:
- **Sub-page hero:** "Back to <Parent>" link → cyan icon-badge (Lucide, 24px, on `rgba(0,200,255,0.12)` circle) + `<h1>` left-aligned + `<p class="text-body-lg">` subtitle. Used by all platform/solutions/industries/security sub-pages.
- **Hub hero:** centered, no icon-badge, optionally an eyebrow `section-label`. Used by `/`, `/why-ekas`, `/platform`, `/solutions`, `/industries`, `/security` overview pages.
Choose one per page. Do not invent a third.

**3.5 Section visual-variety rule.** Every body section of a page (hero excluded) must satisfy at least one of:

(a) include a non-prose visual element — structured cards (premium-card grid), bullet lists with cyan dots, numbered step grid, structured data callout (e.g., EvidencePacket grid on /platform/ai-assistant), inline screenshot/diagram, accordion (`<details>`/`<summary>`), stat-number cards, or two-column "Before/After" / "Can/Cannot" cards; OR

(b) be no more than 100 words of body prose total (eyebrow + heading + body, summed).

A "section" = one `<section className="section-padding">` block. Long prose sections without a visual element are violations regardless of how high-quality the prose is — the constraint is on visual rhythm, not content quality. (Word count via: `grep -oE '[A-Za-z]+' <section block> | wc -l` for a fast PR-time approximation.)

**3.6 Reference visual elements.** The site already has the following visual-variety primitives baked in. Reuse them; do not reinvent:
- Stat-number 4-up grid (homepage Industry Benchmark)
- EvidencePacket structured callout (homepage + /platform/ai-assistant)
- Numbered "How It Works" 3-up (manufacturing-intelligence + document-intelligence)
- Two-column "Can / Cannot" or "Before / After" cards (ai-assistant Trust Boundaries; financial-intelligence Before/After)
- Bulleted callout-list with check icons + cyan-tint background (ai-assistant Why It's Different)
- FAQ accordion with `<details>` (homepage)
- Trust-strip 6-up with cyan dots (homepage)

**3.7 Imagery.** All imagery served via `next/image` (zero raw `<img>` tags — currently compliant). Public assets in `public/` should be ≤200 KB each unless an explicit waiver is recorded; oversized images degrade Core Web Vitals.

**3.8 Dark mode.** The site is dark-mode-only by design; the `darkMode: ["class"]` Tailwind setting and the dark-only background/foreground tokens are intentional. No light-mode variant. Pages must render correctly against the navy background.

---

## Section 4 — Content Standards

**4.1 Page structure pattern.** The dominant well-built pattern (codified from `/`, `/platform/ai-assistant`, `/platform/manufacturing-intelligence`):

> Hero → Problem framing → "What it is" / "What it does" → Capability detail (cards or structured grid) → How-it-works (numbered steps OR before/after) → Trust/Why-different → Closing CTA with action element.

A page may add sections (e.g., FAQ accordion, structured callout) but must not skip Problem framing or Closing CTA.

**4.2 Hero claim.** The hero must include exactly one primary value claim (the H1 + subtitle line). The H1 is the value claim or the page name. The subtitle is one sentence describing what the page is.

**4.3 Capability sections.** Cards or bulleted lists are required for capability/benefit enumeration. No "wall of prose" capability sections. If you have 3+ items to communicate, they go into a `premium-card` grid (1-4 columns depending on count) or a bullet-list-with-cyan-dot pattern.

**4.4 Closing CTA.** Every page closes with a CTA section that contains **at least one action element** — `<button class="btn-primary">` invoking the demo modal, an `<a class="btn-primary">` to a calendar/scoped form, or a specific `mailto:` with a `?subject=` parameter. Prose-only "Request a demo" closing sections are insufficient.

**4.5 Word count guidance.** Page lengths (TSX lines as proxy):
- Hub overview pages: 100–250 lines, 7+ sections.
- Tier-2 sub-pages (platform modules, solutions, industries): 130–250 lines, 5–9 sections.
- Tier-3 sub-pages (security/*): 100–150 lines, 4–6 sections.
- Tertiary pages (about, founder, FAQs): 80–160 lines, 3–6 sections.
Pages dramatically shorter than the floor (e.g., /about at 57 lines, /industries at 54 lines) likely fail Section 3.5 visual variety as well; either expand or merge.

**4.6 Industry-benchmark dollar figures.** Permitted with three conditions met simultaneously: (a) figure is from a published industry source (BCG, McKinsey, MTBF/MTTR studies, etc.) and the source is cited inline in `text-fine` color `#6a7a9a`; (b) figure is presented as a range or rounded benchmark, not a precise customer-derived number; (c) page includes the disclaimer "Not derived from any specific customer" within the same section. Example compliant pattern: `/solutions/downtime-reduction` lines 48-50.

**4.7 Tone.** Plain English, operator-first (operations leaders, plant managers, controllers — not BI analysts or developers). One sentence per claim; do not stack three modifiers on one noun. Avoid generic "AI-powered" / "next-generation" language; avoid passive voice in CTAs.

---

## Section 5 — Metadata and SEO Standards

**5.1 Helper required.** All page metadata MUST use the `pageMetadata()` helper from `@/lib/metadata`. Direct `export const metadata: Metadata = { ... }` is prohibited (the helper handles `title.absolute` correctly to avoid double-suffix bugs). Exception: the homepage uses root-layout metadata and is exempt.

**5.2 Required fields.** Every page's `pageMetadata()` call must include: `title` (page name only, no suffix), `description` (150–160 chars, value-claim-led), and `path` (the canonical route). Missing any field is a discoverability failure.

**5.3 Title format.** Pass only the page name as `title:`. The helper appends ` — EKAS by AdaptiveFactory` automatically and the root layout's template handles SEO. Hardcoding the suffix in `title:` will double-apply.

**5.4 Description length.** 150–160 characters, leading with a value claim. Truncated under 100 characters is too short; over 165 risks SERP truncation.

**5.5 Client components and metadata.** A `"use client"` page CANNOT export `metadata`. If a page must be a client component (form, interactive accordion, modal), split: keep `page.tsx` as a server component that re-exports `metadata`, and put the interactive UI in a client child component. Currently `/demo` and `/resources/faqs` violate this rule — see remediation report.

**5.6 OpenGraph image.** The root layout provides the default OG. Pages should specify a page-specific OG image only when (a) the page is a major hub or (b) the default does not represent the page well. A single category default (e.g., one for all platform sub-pages, one for all solutions) is acceptable. Per-page OG images are not required at this stage but the helper supports `ogImage` for future use.

**5.7 Canonical URL.** Every page's `pageMetadata({ path: "..." })` populates `alternates.canonical` automatically. The path must match the actual route exactly.

---

## Section 6 — Technical Standards

**6.1 Framework.** Next.js 15 App Router; React server components by default. Client components only when interactivity requires (state, event handlers, browser APIs).

**6.2 Components.** All pages render through `<PageShell>` (which provides `BackgroundAtmosphere`, `Navigation`, `FooterSection`, and `DemoRequestModal`). Exception: the homepage manually composes the same primitives so it can hold the demo-modal state at the page root for inline button triggers. A new exception requires a written justification.

**6.3 Images.** All imagery via `next/image`. Raw `<img>` tags are prohibited. External-domain images that cannot be optimized must use `unoptimized` prop with a `// reason: <why>` comment.

**6.4 External links.** External `<a>` tags use `target="_blank" rel="noopener noreferrer"` together — never one without the other. Currently only `/about/founder` (LinkedIn) does this; it is the reference pattern.

**6.5 Browser storage.** No `localStorage`, `sessionStorage`, or `IndexedDB` use unless wrapped in a `try/catch` with an SSR check. (Currently no usage exists; rule is forward-looking.)

**6.6 Build gate.** `npm run build` must pass with zero errors and zero new warnings before merge. `npm run lint` must pass. The build's `Generating static pages (N/N)` count must equal the count of public routes enumerated in `src/app/sitemap.ts` plus the framework auto-routes (`/_not-found`, `/robots.txt`, `/sitemap.xml`). A divergence between sitemap count and build-page count indicates either a missing sitemap entry or an unexpected page file — investigate before merge.

**6.7 Sitemap maintenance.** `src/app/sitemap.ts` is manually curated. Every PR that adds a new page MUST add the corresponding sitemap entry in the same commit. Drift between actual routes and sitemap entries is an acceptance failure.

**6.8 Imports.** Path aliases use `@/components/...`, `@/lib/...`, `@/config/...`, `@/app/...`. No relative paths beyond one parent (`../`) for cross-area imports.

---

## Section 7 — Compliance Standards

**7.1 IP firewall.** Zero references on public pages to: Pridgeon & Clay, P&C, the pilot customer's name, specific pilot-customer machine numbers (Machine 33X, Machine 9XX, Machine 25XX), or any pilot-customer-derived operational data. Verified via:
```
grep -irE "(pridgeon|p&c|pilot customer|machine 33[0-9]|machine 9[0-9]{2}|machine 25[0-9]{2})" src/app/ src/components/
```
Must return zero matches.

**7.2 Pricing leak.** Zero references on public pages to: EKAS subscription tier rates, ARR figures, payback periods, named discount magnitudes (founding %, escalation %, multi-year %), bundle pricing language, or any specific dollar amount labeled as an EKAS price. Verified via:
```
grep -irE '\$[0-9]{1,3}(,[0-9]{3})+|\b(ARR|payback|annual subscription|founding 20%|founding customer rate|bundle pricing)\b' src/app/ src/components/
```
Must return zero matches. Industry-benchmark dollar figures are exempt under Section 4.6.

**7.3 Pilot-customer-derived content.** All operational examples on public pages must be either (a) industry-benchmark figures with sourcing per Section 4.6, or (b) deliberately generic synthesized examples, or (c) anonymized to the point of no identifiability. Specific machine numbers tied to the pilot customer, dated production events tied to live ops, or quoted customer names from the pilot are prohibited.

**7.4 Pre-deploy live verification.** Every deploy that adds or modifies a public page must, post-deploy, run the IP firewall and pricing leak greps against the live URL via `curl https://adaptivefactory.ai/<route>`. Both must return zero matches before the PR is closed.

**7.5 IATF / regulatory claims.** Claims to support IATF 16949, ISO 22400-2, ISA-95, AIAG, or any other named standard must be qualified ("designed to support", "architected within", "follows methodology") rather than asserting certified compliance. Certification claims require a real certificate.

---

## Section 8 — Page Launch Checklist

A copy-pasteable checklist applied to every new page or major page rewrite before merge. Each item is a yes/no gate.

```markdown
## Page Launch Checklist — <route>

### Information Architecture (Section 1)
- [ ] Page has exactly one parent in src/config/navigation.ts
- [ ] URL is kebab-case, no trailing slash, parallel to siblings
- [ ] File path mirrors URL exactly
- [ ] Reachable from homepage in ≤2 clicks

### Discoverability (Section 2 — the gate)
- [ ] Linked from src/config/navigation.ts under correct section
- [ ] Linked from src/components/layout/FooterSection.tsx under correct column
- [ ] Listed in src/app/sitemap.ts with calibrated priority
- [ ] Referenced contextually from at least 2 related pages
- [ ] Symmetry: if in nav at this tier, also in footer (and vice versa)

### Visual System (Section 3)
- [ ] Uses brand colors only (navy + cyan)
- [ ] Uses approved fonts only (Rajdhani / DM Sans / Roboto Mono)
- [ ] Uses one of the two approved hero patterns
- [ ] Every body section (hero excluded) either includes a non-prose visual element OR is ≤100 words total
- [ ] No new component primitives introduced (or, if introduced, has 2+ use sites and is added to globals.css)
- [ ] All imagery via next/image
- [ ] Public assets are ≤200 KB unless waivered

### Content (Section 4)
- [ ] Hero has one primary value claim (H1 + one-sentence subtitle)
- [ ] Page follows the standard structural pattern (Section 4.1)
- [ ] Capability sections are carded/bulleted, not prose walls
- [ ] Closing CTA has at least one action element (button/link/scoped mailto)
- [ ] Page length within tier guidance (Section 4.5)
- [ ] Industry-benchmark dollar figures comply with Section 4.6

### Metadata (Section 5)
- [ ] Uses pageMetadata() helper (not direct Metadata export)
- [ ] title is page name only (no suffix)
- [ ] description is 150-160 chars, value-claim-led
- [ ] path matches the canonical route exactly
- [ ] If the page is interactive, server component re-exports metadata while client component hosts UI

### Technical (Section 6)
- [ ] Server component by default; client only where interactivity requires it
- [ ] Renders through PageShell (or has written exception)
- [ ] External links use target="_blank" rel="noopener noreferrer"
- [ ] npm run build passes with zero new warnings
- [ ] Sitemap entry added in same commit

### Compliance (Section 7)
- [ ] IP firewall grep returns zero matches
- [ ] Pricing leak grep returns zero matches
- [ ] No pilot-customer-derived content
- [ ] Standards claims are qualified appropriately
- [ ] Post-deploy live URL grep planned for the deploy verification step
```

---

## Section 9 — Maintenance Cadence

**9.1 Quarterly site audit.** Every quarter (Q1 anchor: end of January; recurring), run the inventory and discoverability matrix from this audit's Step 1 + Step 2. Compare against the SOP. Any new violations get added to the remediation report.

**9.2 Annual SOP review.** Every January, review this SOP for:
- Rules that have become unnecessary (delete)
- Rules that are routinely violated despite being in the SOP (either enforce or revise)
- New patterns that have emerged on the site that should be codified
- Rules that conflict with each other

The annual review produces a v-bumped version of this document with a dated changelog at the top.

**9.3 Amendment process.** Mid-cycle SOP amendments require:
- A PR that modifies `docs/website_sop.md`
- A note in the PR explaining the amendment rationale
- An updated version stamp at the top of this file
- Notification to other site contributors

**9.4 Remediation cadence.** The companion `docs/website_sop_remediation.md` is a living document. New violations land in it as discovered. Resolved violations are removed (with a "resolved <date>" note in the PR that fixes them).

---

## Appendix A — Reference Pages

These pages are the current reference implementations of the SOP. New pages should pattern-match against the closest reference:

- **Homepage `/`** — strongest visual variety, multi-section structure, working CTA button. Reference for "what a hub page can be".
- **`/platform/ai-assistant`** — strongest sub-page visual variety, structured EvidencePacket grid, Can/Cannot 2-up, callout-list. Reference for "platform module sub-page".
- **`/platform/manufacturing-intelligence`** — numbered How-It-Works 3-up + structured 4-up bullet-card grid. Reference for "platform foundational layer page".
- **`/platform/financial-intelligence`** — focused 5-section page with Before/After 2-up. Reference for "platform module sub-page where focus matters more than depth".

## Appendix B — Anti-Patterns

Specific violations observed in the audit that should not be repeated:

- **`/why-ekas` line 6** — direct `Metadata` export with hardcoded full title; will double-apply the root template suffix. Fix: use `pageMetadata({ title: "Why EKAS", ... })`.
- **`/demo`, `/resources/faqs`** — `"use client"` pages with no metadata export. Fix: split server/client per Section 5.5.
- **`/security/architecture`, `/security/data-handling`, `/security/governance`** — closing CTAs are prose-only with zero action elements. Fix: add a `<button>` to the demo modal or a scoped `mailto:` with subject parameter.
- **`/industries/automotive` lines 71–82 and `/industries/metal-stamping` (parallel section)** — both pages repeat the homepage "Built for Precision Manufacturing" deployment-proof prose block verbatim (the "purpose-built manufacturing intelligence platform for small and mid-size precision manufacturers..." paragraph and the two paragraphs that follow it). Three pages serving the same copy is a content-DRY violation and a search-cannibalization risk. Fix: trim the industry pages to industry-specific content (tier-2 child pages should not carry hub-tier copy). `/industries/industrial-manufacturing` does not have this duplication and can serve as the structural reference.
- **`ekas-logo-nav.png`** at 582 KB — oversized public asset. Fix: re-export at appropriate dimensions, target ≤200 KB.

End of SOP draft v1.0.
