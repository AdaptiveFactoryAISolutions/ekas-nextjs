# 2026-05-01 — Website SOP Audit and Documentation

**Branch suggestion:** `feature/website-sop-audit`
**Working directory:** `/home/pat/EKAS B2B website/ekas-nextjs/`
**Operating model:** Pat = Operator (final authority), Claude Architect = this prompt's author, Claude Code = executor
**Estimated scope:** Full-site read-only audit; two new Markdown documents committed; **zero source code changes**.
**Deploy target:** Not applicable. This is documentation work. No deploy.
**Estimated duration:** 1-2 CC sessions with three halt points for Pat's review.

**Prompt revision:** v1.0 (May 1, 2026)

---

## Purpose

The adaptivefactory.ai website has grown organically. Recent work surfaced two structural problems:

1. The Quote Intelligence page exists at `/platform/quote-intelligence` but cannot be discovered through the flyout nav, footer, or related platform pages. A page that exists but cannot be navigated to is a discoverability failure.
2. There is no written Standard Operating Procedure (SOP) governing how pages are built, what discoverability standards must be met before a page is considered "live," what visual variety is required, what CTA patterns are acceptable, and what compliance gates exist (IP firewall, pricing leaks, pilot-customer-derived content).

Without a written SOP, every page review is opinion. With a written SOP derived from auditing the existing site, every page review becomes "page X violates SOP rule Y."

This prompt produces two artifacts:

- **`docs/website_sop.md`** — the written SOP document, derived from auditing patterns that already exist in the site, codifying both what's working and what should be required going forward.
- **`docs/website_sop_remediation.md`** — a remediation report listing every page that does not currently comply with the SOP, with severity classifications and recommended fix scope. **This is a backlog document only — no fixes are made in this prompt.**

---

## Hard Constraints

This prompt is **observation-and-documentation only**. The following are absolute:

- **Zero source code changes.** No edits to `src/`, `public/`, `next.config.*`, `tailwind.config.*`, `package.json`, or any TypeScript/JSX/CSS file. Only file creation in `docs/` is permitted.
- **Zero deployment.** No `git push`, no Amplify trigger, no production touches.
- **Zero remediation.** Identify violations. Do not fix them. The remediation report is a backlog, not a work order.
- **No paraphrasing of brand assets, marketing copy, or page content.** When excerpting page content for the audit, quote verbatim with file path attribution.
- **Halt and report rather than fix anything outside scope.** If broken imports, build errors, or untracked changes are encountered, log them in the remediation report and continue. Do not fix.
- **IP firewall:** standard rules apply — no Pridgeon & Clay or P&C references in any committed document, no pilot-customer-specific machine numbers or operational data.

If at any point the work seems to require code changes to complete, **HALT and report**. The right answer is to expand the remediation report, not to start fixing.

---

## Halt Points

CC halts at each of the following and waits for Pat's explicit go-ahead:

- **HALT-A** — After Step 1 (full-site inventory). Confirms inventory completeness and scope before deep analysis.
- **HALT-B** — After Step 4 (SOP draft). Pat reviews the proposed SOP rules before they're used to flag violations in the remediation report.
- **HALT-C** — After Step 5 (remediation report drafted) and before final commit. Pat reviews both documents before they land in the repo.

---

## Step 1 — Full-Site Inventory (HALT-A after this step)

Build a complete inventory of the site. No analysis yet — just observation.

### 1.1 Page inventory

Walk `src/app/` and produce a hierarchical list of every page. For each page, capture:
- Route slug (e.g., `/platform/quote-intelligence`)
- File path
- Page title (from metadata or first H1)
- Meta description (if present)
- OpenGraph image (if present)
- Approximate line count of the page file
- Date last modified: `git log -1 --format=%cs <path>`

Out-of-scope routes to flag and skip:
- Any `/api/*` routes
- Any `/_*` Next.js internals
- Any `not-found.tsx`, `loading.tsx`, `error.tsx`

### 1.2 Component inventory

List every component in `src/components/` and `src/app/_components/` (or wherever components live). For each:
- Component name
- File path
- Whether it appears to be a layout primitive (Card, Hero, Section, CTA, Button, etc.) or a page-specific component
- Usages count: `grep -rIn "ComponentName" src/ | wc -l`

### 1.3 Configuration inventory

Capture (read-only) the contents and structure of:
- `src/config/navigation.ts` (or wherever the main nav config lives)
- The footer component or footer config
- `src/app/sitemap.ts` and `src/app/robots.ts`
- `src/app/layout.tsx` (root layout — note default metadata, OG defaults, font setup)
- `tailwind.config.*` (design tokens — colors, fonts, spacing scale)
- `src/app/globals.css` or equivalent global stylesheet

### 1.4 Routing structure

Produce a tree view of `src/app/` showing the full route hierarchy. Mark which routes are platform sub-pages, which are top-level, which are content/marketing, and which appear orphaned (file exists but not referenced anywhere).

### 1.5 Asset inventory

List `public/` contents. Note:
- Images and their apparent purposes (OG images, logos, hero images, diagrams)
- Any obviously unused files (orphans)
- Any pricing-leak risks (PDFs, screenshots that might contain pricing strings)

### Step 1 output

Commit nothing yet. Report findings to Pat in this format:

```
SITE INVENTORY

Pages found: <N>
  Platform sub-pages: <N> at routes <list>
  Solutions sub-pages: <N> at routes <list>
  Industries sub-pages: <N> at routes <list>
  Top-level pages: <N> at routes <list>
  Other: <N> at routes <list>
  Orphan pages (file exists, no link found in nav/footer/sitemap): <N> at routes <list>

Components found: <N>
  Layout primitives: <list with file paths>
  Page-specific components: <count>

Config files reviewed:
  Navigation: <path>, <N> top-level sections, <total nav items>
  Footer: <path>, <N> columns, <total footer items>
  Sitemap: <path>, <N> entries, priorities used: <list>
  Robots: <path>, summary
  Tailwind tokens: <colors defined>, <fonts defined>, <custom spacing>
  Global CSS: <path>, summary of custom rules

Asset inventory:
  Images in public/: <N>
  Potential orphans: <list, or "none">
  Pricing-leak risks: <list, or "none">

PROCEEDING to HALT-A. Awaiting Pat's go-ahead before deep analysis.
```

---

## Step 2 — Six-Dimensional Audit (after HALT-A approval)

Now analyze the inventory across six dimensions. Capture observations as factual statements grounded in the inventory — not opinions, not recommendations. Recommendations come in Step 4.

### Dimension 1 — Information Architecture

For each page in the inventory:
- What is its parent in the navigation hierarchy?
- What is its role (overview, sub-page, action, content)?
- Does it have child pages?
- Does its position in the file tree match its position in the URL structure?

Identify:
- Pages whose URL structure is inconsistent with their nav structure
- Pages with no clear parent
- Pages with redundant or near-duplicate content (e.g., two pages both covering "cost estimation")
- Sections of the site that exist but aren't reachable from the homepage in 2 clicks or fewer

### Dimension 2 — Discoverability

For each page, run six discoverability checks. For each check, record PASS / FAIL / N/A:

1. **Flyout nav:** `grep -n "<page-slug>" src/config/navigation.ts` — is the page linked?
2. **Footer:** Locate the footer component and grep for the slug — is the page linked?
3. **Sitemap:** Is the page in `src/app/sitemap.ts`? With what priority?
4. **Robots:** Is the page allowed by `robots.ts`?
5. **Cross-links from related pages:** `grep -rIn "<page-slug>" src/app/ --include="*.tsx" --include="*.ts" --include="*.mdx"` — is the page referenced by at least 2 related pages?
6. **Homepage entry point:** Is the page reachable from the homepage in ≤2 clicks via either nav or homepage content?

Produce a discoverability matrix: rows = pages, columns = the six checks. Identify every cell that is FAIL.

### Dimension 3 — Visual System

For each page in the platform/solutions/industries sections:
- What visual elements appear (hero image, diagram, screenshot, illustration, table, callout, mockup)?
- Or is the page 100% prose?
- Does the page use the same component primitives as other pages, or introduce one-off components?

Identify:
- Pages that are 100% prose (no visual variety)
- Pages that introduce one-off components instead of reusing primitives
- Pages where the visual system feels inconsistent with the site's overall design language

### Dimension 4 — Content Patterns

For each platform/solutions/industries page:
- What is the structural pattern (hero → problem → solution → capabilities → CTA, or something else)?
- Approximate word count of the page body
- What CTA pattern is used at the close (single CTA, dual CTA, multi-step form, etc.)?
- What's the metadata pattern (title length, description length, OG image present)?

Identify:
- Pages that significantly diverge from the dominant structural pattern
- Pages that are unusually long or unusually short relative to peer pages
- Pages with weak CTA patterns (mailto-only, generic "Contact Us")
- Pages with missing or default metadata

### Dimension 5 — Technical Patterns

Inspect:
- Is component reuse consistent across pages, or are there pages that should be using primitives but aren't?
- Are images served with `next/image` or with raw `<img>` tags?
- Are external links handled consistently (target="_blank" + rel="noopener" + visual cue)?
- Is metadata consistent between page-level `metadata` exports and root layout defaults?
- Is the sitemap auto-generated from routes or manually curated?
- Is `robots.ts` configured intentionally or default?

### Dimension 6 — Compliance Patterns

For each page:
- IP firewall scan: `grep -irE "(pridgeon|p&c|pilot customer|machine 33[0-9]|machine 9[0-9]{2}|machine 25[0-9]{2})" <page-file>` — should return zero matches.
- Pricing leak scan: `grep -irE "(\\\$[0-9]|ARR|payback|annual subscription|founding 20%|founding customer rate|bundle pricing)" <page-file>` — should return zero matches on public pages.
- Pilot-customer-derived content: any specific machine numbers, dates tied to live operational issues, or quoted customer names that aren't from the synthesized dataset.

Identify any compliance violations.

### Step 2 output

No commit yet. Internal working notes only. Proceed directly to Step 3.

---

## Step 3 — Pattern Synthesis (no halt)

Synthesize the audit into the patterns that exist in the site today:

- What discoverability standard does the existing site (mostly) meet? Where does it fall short?
- What content patterns are dominant? What are the divergences?
- What component primitives exist and are reused? What are the gaps?
- What CTA patterns work?
- What does a "well-built page" look like in this codebase, by example?
- What does a "broken or incomplete page" look like in this codebase, by example?

The output of Step 3 is the working evidence base for Step 4. No commit.

---

## Step 4 — Draft the SOP (HALT-B after this step)

Produce `docs/website_sop.md` as a draft. **Do not commit yet.** Show the draft to Pat for review.

The SOP must cover, at minimum:

### Section 1 — Information Architecture Standards
- Hierarchy rules (every page has a clear parent in the nav structure)
- URL structure conventions (kebab-case, no trailing slashes, parallel structure for parallel content)
- Maximum depth from homepage (every page reachable in ≤3 clicks)
- Rules for when to create a new page vs. extend an existing one

### Section 2 — Discoverability Standards (the gate)
A page is not "live" until it satisfies all of the following:
- Linked from main nav flyout under correct section
- Linked from footer under correct column
- Listed in `sitemap.ts` with appropriate priority
- Referenced contextually from at least 2 related pages
- Reachable from homepage in ≤2 clicks
- Has unique, non-default meta title and meta description
- Has OpenGraph image (specific or category default — not the site-wide default)

### Section 3 — Visual System Standards
- Every page must have at least one visual element that is not body prose (diagram, screenshot, mockup, illustration, structured table, or callout block)
- Pages must use existing component primitives — new primitives require justification
- Brand colors: Navy #1E3A4A, Cyan #00C8FF — no off-brand color introduction without an updated tokens file
- Typography: Rajdhani Bold for headings, DM Sans Light for body, Roboto Mono for technical labels
- Dark mode is the default; pages must render correctly in dark mode

### Section 4 — Content Standards
- Page structure pattern: hero → problem framing → solution → capabilities → engagement path → CTA
- Hero must include a single primary value claim
- Capability sections should be scannable (bulleted or carded, not long prose paragraphs)
- Closing CTA must be specific (calendar link, scoped form, or specific email subject) — generic mailto is insufficient
- Body word count guidance based on observed peer-page lengths

### Section 5 — Metadata and SEO Standards
- Title format: `<Page Title> | EKAS by AdaptiveFactory` (or whatever pattern the audit identifies as dominant)
- Description: 150-160 characters, value-claim-led
- OpenGraph image required, sized correctly
- Canonical URL set
- Sitemap priority by page tier (homepage 1.0, platform overview 0.9, platform sub-pages 0.7, etc. — calibrate to what the audit finds)

### Section 6 — Technical Standards
- All images served via `next/image` (no raw `<img>` except where justified)
- External links use `target="_blank" rel="noopener noreferrer"` and a visual cue
- No browser storage APIs (`localStorage`, `sessionStorage`) per Anthropic artifact constraints if relevant
- Component primitives import path standardization
- Build must pass `npm run build` and `npm run lint` with zero warnings before merge

### Section 7 — Compliance Standards
- IP firewall: zero references to Pridgeon & Clay, P&C, specific pilot-customer machine numbers, or identifiable pilot-customer operational data
- Pricing leak: no public-page references to specific dollar amounts, ARR figures, payback periods, or named discount magnitudes (founding %, escalation %, multi-year %)
- Pilot-customer-derived content: anonymized only, with synthesized examples that are deliberately generic
- Pre-deploy verification: live URL grep against forbidden strings as the final gate

### Section 8 — Page Launch Checklist (the operationalization)
A copy-pasteable checklist that can be applied to any new page before merge. Each item is a yes/no gate. The checklist is the operational version of Sections 1-7.

### Section 9 — Maintenance Cadence
- Quarterly site audit against the SOP
- Annual review of the SOP itself for relevance and completeness
- Process for proposing SOP amendments

### Step 4 output

Commit nothing. Show the draft SOP to Pat in the chat with this format:

```
SOP DRAFT COMPLETE

Section 1 — Information Architecture: <bullet summary>
Section 2 — Discoverability: <bullet summary>
Section 3 — Visual System: <bullet summary>
Section 4 — Content: <bullet summary>
Section 5 — Metadata/SEO: <bullet summary>
Section 6 — Technical: <bullet summary>
Section 7 — Compliance: <bullet summary>
Section 8 — Page Launch Checklist: <N items>
Section 9 — Maintenance Cadence: <bullet summary>

Total length: <N> lines / <N> words

PROCEEDING to HALT-B. Awaiting Pat's review of SOP rules before drafting the remediation report against them.
```

If Pat requests changes to the SOP, iterate until approved. Do not proceed to Step 5 until Pat explicitly approves the SOP draft.

---

## Step 5 — Draft the Remediation Report (HALT-C after this step)

Once the SOP is approved, produce `docs/website_sop_remediation.md` as a draft.

The report classifies every existing page against the approved SOP. For each page, list:

- Page route and file path
- SOP sections it complies with
- SOP sections it violates, with specific violations
- Severity: BLOCKING (page should not be considered live), HIGH (significant gap, fix in next sprint), MEDIUM (improvement opportunity), LOW (nice-to-have)
- Recommended fix scope (single PR, multi-PR, requires-design-decision)

Also include:

- Sitewide patterns that violate the SOP (not page-specific)
- Component-system gaps the audit revealed (missing primitives, one-off components that should be promoted to primitives)
- Technical-debt items that are SOP-adjacent (build warnings, accessibility gaps, image optimization opportunities)

End the report with a recommended remediation backlog, ordered by severity and dependency. Identify which items should bundle together into single PRs.

### Step 5 output

Commit nothing yet. Show the draft remediation report to Pat in the chat with this format:

```
REMEDIATION REPORT DRAFT COMPLETE

Pages audited: <N>
Pages fully compliant with SOP: <N>
Pages with BLOCKING violations: <N>
Pages with HIGH violations: <N>
Pages with MEDIUM violations: <N>
Pages with LOW violations only: <N>

Sitewide violations: <N>
Component-system gaps identified: <N>
Technical-debt items: <N>

Top blocking items (highest priority):
  1. <item with page reference>
  2. <item with page reference>
  3. <item with page reference>
  ...

PROCEEDING to HALT-C. Awaiting Pat's review of remediation report before final commit of both documents.
```

---

## Step 6 — Commit (after HALT-C approval)

Once Pat approves both documents, commit them in a single commit:

```bash
git add docs/website_sop.md docs/website_sop_remediation.md
git commit -m "docs: website SOP and remediation report

Establishes site-wide SOP covering information architecture, discoverability,
visual system, content, metadata, technical, and compliance standards.

Section 8 provides the operational page-launch checklist applied to all
new pages before merge.

Companion remediation report identifies SOP violations across existing
pages with severity classifications. Report is a backlog only — no fixes
are made in this commit.

Refs: 2026-05-01_website_sop_audit_prompt.md"
```

Do not push. Pat handles push and any follow-up branch management.

Report to Pat:

```
COMMIT COMPLETE

Commit hash: <hash>
Files changed: 2
  + docs/website_sop.md (<N> lines)
  + docs/website_sop_remediation.md (<N> lines)

No source code changed. No deploy triggered.

Branch is ready for Pat's review and push.

WORK COMPLETE.
```

---

## Failure Modes (How CC Should Handle Them)

**If the inventory in Step 1 reveals more pages than expected:** This is normal for a site that's grown organically. Proceed and report the count.

**If a page file exists but is not referenced anywhere:** Mark it ORPHAN in the inventory. Do not delete. The remediation report will recommend whether to delete or to integrate.

**If discoverability checks return ambiguous results:** When a page is mentioned in nav config but the link goes to a different slug, mark the discoverability check as FAIL with a note.

**If the SOP draft conflicts with what already exists:** This is by design. The SOP codifies what the site SHOULD do, even if the site doesn't currently do it. The remediation report captures the gap.

**If Pat requests SOP changes that conflict with audit findings:** Pat is the operator. Implement the change and note in the document where Pat's directive overrode the audit-derived recommendation.

**If git status shows uncommitted changes at start of work:** HALT and report. Do not proceed until the working tree is clean (Pat may need to stash or commit existing work first).

**If `npm run build` fails before work begins:** HALT and report. The audit can proceed against a broken build, but Pat needs to know the build is broken.

---

## Out of Scope for This Prompt

- Code changes of any kind
- Deploy actions of any kind
- Fixes to identified violations
- Decisions about which violations to fix first (that's a follow-up Pat-led decision)
- Anything related to the synthesized dataset, prototype builds, or demo system (separate workstreams)

---

## Operator Note for CC

This prompt produces decision-quality documents. Do not treat it as a list-making exercise. The SOP must be specific enough to be operational — every rule must be testable as a yes/no gate. The remediation report must be specific enough to be actionable — every violation must reference a specific file path, line number where applicable, and the SOP section it violates.

When in doubt, err on the side of more specificity, more file references, more grep-able evidence. The documents will be cited in future PRs and used to gate future page deploys. Vagueness now costs operational time later.
