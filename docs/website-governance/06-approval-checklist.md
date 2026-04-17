# EKAS Website Approval Checklist
## 10-Gate Approval Process for All Pages

**Document Version:** 1.0
**Date:** 2026-04-16
**Authority:** Lead Website Systems Engineer
**Mandatory:** NO PAGE may be approved without passing all 10 gates

---

## GATE OVERVIEW

Every page must pass **ALL 10 gates** before approval:

1. **Purpose** — Can page purpose be stated in one sentence?
2. **Audience** — Is there one primary audience?
3. **Relevance** — Does every section support buyer understanding, trust, or action?
4. **EKAS Brand Discipline** — Does page sound like EKAS, not generic SaaS?
5. **Technical Restraint** — Has technical overflow been removed?
6. **Proof Discipline** — Are all claims grounded?
7. **CTA Discipline** — Is next step clear and appropriate?
8. **Originality** — Is content original, not derivative?
9. **Executive Readability** — Can a business leader understand it quickly?
10. **Final Validation Readiness** — Is page ready for user factual validation?

**Result:** ❌ NOT APPROVED | ✅ APPROVED

---

## GATE 1: PURPOSE

### Question

**Can the page purpose be stated in one clear sentence?**

### Pass Criteria

- [ ] Purpose is stated in one sentence (not a paragraph)
- [ ] Purpose is specific (not "explain EKAS")
- [ ] Purpose aligns with page class
- [ ] Purpose supports buyer journey

### Example PASS:

"Explain the tool-first AI architecture to IT leaders evaluating EKAS for AI reliability."

### Example FAIL:

"This page provides information about EKAS and how it works." (Too vague)

### Enforcement

If purpose requires more than one sentence to explain, the page is doing too much. Simplify or split.

---

## GATE 2: AUDIENCE

### Question

**Is there one primary audience for this page?**

### Pass Criteria

- [ ] Page targets one primary persona
- [ ] Content level matches audience technical fluency
- [ ] Language appropriate for audience (manufacturing, IT, finance)
- [ ] Page solves audience-specific problem

### Primary Audiences:

1. VP Manufacturing / Plant Manager
2. IT/Data Leader
3. Quality/CI Manager
4. Finance Leader
5. Executive Operations

### Example PASS:

"Primary audience: IT Director concerned about AI explainability and data security."

### Example FAIL:

"For all manufacturing stakeholders." (Too broad, no focus)

### Enforcement

If page tries to serve multiple audiences equally, it serves none well. Pick one primary, acknowledge others secondarily.

---

## GATE 3: RELEVANCE

### Question

**Does every section on the page support buyer understanding, trust, or action?**

### Pass Criteria

- [ ] Every section has clear purpose
- [ ] No sections included "because we can"
- [ ] No feature dumping without context
- [ ] All content moves buyer toward decision or action

### Section Purpose Test:

Ask for each section: "Does this help the buyer..."
1. **Understand** EKAS capability?
2. **Trust** EKAS claims?
3. **Take action** (CTA)?

If answer is "no" to all three, remove section.

### Example PASS:

Section titled "How It Works" with 3-step architecture diagram → supports **understanding**

### Example FAIL:

Section listing 50 technical specifications without context → irrelevant to buyer decision

### Enforcement

Maximum 5 sections per page. If more sections needed, content is too complex or off-topic.

---

## GATE 4: EKAS BRAND DISCIPLINE

### Question

**Does the page sound like EKAS, not a generic SaaS vendor?**

### Pass Criteria

- [ ] Uses EKAS-specific terminology ("tool-first", "governed metrics", "controlled refusal")
- [ ] Avoids generic transformation language (see banned-language.md)
- [ ] Manufacturing-specific problems and outcomes
- [ ] Technical precision (not vague benefits)

### Brand Voice Test:

Could this page exist on a competitor website with their logo swapped in?
- **YES** → FAILS Gate 4 (too generic)
- **NO** → PASSES Gate 4 (EKAS-specific)

### Example PASS:

"EKAS eliminates AI hallucination through architectural constraint. The AI selects tools; SQL computes all results."

### Example FAIL:

"Our platform empowers you to unlock insights and transform your operations." (Generic SaaS)

### Enforcement

Run page through banned language grep. Any violations = automatic Gate 4 failure.

---

## GATE 5: TECHNICAL RESTRAINT

### Question

**Has technical overflow been removed from the buyer page?**

### Pass Criteria

- [ ] Technical depth appropriate for page class
- [ ] No architecture details on homepage
- [ ] One "How It Works" section maximum (detail pages)
- [ ] Technical overflow logged for later use

### Technical Depth by Page Class:

| Page Class | Max Technical Depth |
|------------|---------------------|
| Homepage | Zero (business language only) |
| Hub Pages | Architectural concepts only |
| Detail Pages | One "How It Works" section (3-4 sentences) |
| Security Page | Full technical specification (appropriate) |

### Example PASS:

Platform detail page with one "How It Works" section explaining 3-step process → appropriate depth

### Example FAIL:

Homepage with multi-paragraph explanation of PostgreSQL RLS internals → technical overflow

### Enforcement

If technical content exceeds guidelines, log in `07-technical-overflow-log.md` and remove from page.

---

## GATE 6: PROOF DISCIPLINE

### Question

**Are all claims grounded in documentation, codebase, or conservative wording?**

### Pass Criteria

- [ ] Every capability claim traceable to source
- [ ] No invented features or integrations
- [ ] Implementation status disclosed (10 production metrics, not 91)
- [ ] Conservative wording for partial capabilities

### Proof Source Hierarchy:

1. **Codebase reference** (strongest proof)
2. **Source documentation** (EKAS_Website_Content_Brief, etc.)
3. **Conservative wording** ("supports workflows" vs "pre-built integration")
4. **Removed** (if no proof available)

### Example PASS:

"10 production-ready metrics with 91 in development catalog" (documented status)

### Example FAIL:

"Pre-built connectors for SAP, Oracle, QAD, Plex" (not documented)

### Enforcement

Every capability claim must pass "Can we prove this?" test. If no, remove or soften wording.

---

## GATE 7: CTA DISCIPLINE

### Question

**Is the next step clear and appropriate for the page?**

### Pass Criteria

- [ ] CTA is specific (not "learn more")
- [ ] CTA matches page intent
- [ ] CTA has context (why take action)
- [ ] CTA uses approved wording

### Approved CTAs:

- "Request a Demo" (primary)
- "Request Pilot Deployment"
- "Explore [Section]" (hub pages)

### Banned CTAs:

- "Get Started"
- "Try for Free"
- "Sign Up"
- "Click Here"
- "Learn More"

### Example PASS:

"See how EKAS eliminates hallucination in your environment. Request a demo."

### Example FAIL:

"Learn more about our solution." (Vague, no context)

### Enforcement

Every page must have clear primary CTA. Generic CTAs fail Gate 7.

---

## GATE 8: ORIGINALITY

### Question

**Is the content original and not derivative of competitor language?**

### Pass Criteria

- [ ] Zero copied competitor phrases
- [ ] Zero paraphrased competitor messaging
- [ ] Original EKAS terminology throughout
- [ ] No competitor information architecture copying

### Originality Test:

Google search exact phrases from page:
- **Competitor site in results** → FAIL (copied)
- **Only EKAS site in results** → PASS (original)

### Example PASS:

"Manufacturing AI that refuses to guess" (unique EKAS positioning)

### Example FAIL:

"Connected factory analytics for Industry 4.0" (generic, found on multiple competitor sites)

### Enforcement

Manual review required. If content sounds like competitor template, rewrite with EKAS-specific language.

---

## GATE 9: EXECUTIVE READABILITY

### Question

**Can a business leader understand the page quickly without technical walkthrough?**

### Pass Criteria

- [ ] Lead paragraph states value in business terms
- [ ] Paragraphs ≤ 4 sentences
- [ ] Sentences ≤ 30 words
- [ ] No acronyms without definition (first use)
- [ ] Scann able structure (headings, bullets, whitespace)

### Readability Test:

Ask: "Can VP Manufacturing understand this in 2 minutes?"
- **YES** → PASS Gate 9
- **NO** → FAIL Gate 9 (too complex, technical, or dense)

### Example PASS:

Short paragraphs, clear headings, business problem → solution structure

### Example FAIL:

Dense text walls, technical jargon, no clear structure

### Enforcement

Flesch-Kincaid Grade Level 10-12 (executive-readable). Higher = too complex.

---

## GATE 10: FINAL VALIDATION READINESS

### Question

**Is the page ready for user factual validation?**

### Pass Criteria

- [ ] All 9 prior gates passed
- [ ] Page brief completed and filed
- [ ] Content decision log updated
- [ ] Technical overflow removed and logged
- [ ] Metadata complete (title, description)
- [ ] Build passes with page included

### Final Checks:

1. No [TBD] or [TODO] placeholders
2. No unsupported claims awaiting verification
3. No generic "coming soon" content
4. Page provides actual value to buyer

### Example PASS:

Complete page with all claims grounded, all gates passed, ready for user review

### Example FAIL:

Page has placeholder sections, unverified claims, or "coming soon" features

### Enforcement

Until Gate 10 passes, page is NOT APPROVED for production.

---

## APPROVAL WORKFLOW

### Step 1: Self-Assessment

Page author/remediator completes all 10 gate checks.

**Result:** Initial pass/fail per gate.

### Step 2: Validation Agent Audit

Automated agents check:
- Banned language presence
- Claim grounding
- CTA consistency
- Metadata completeness

**Result:** Agent-flagged issues logged.

### Step 3: Manual Review

Lead Website Systems Engineer reviews:
- Originality (competitor comparison)
- Executive readability
- Brand discipline
- Overall page quality

**Result:** Final approval or remediation required.

### Step 4: Final Approval

**If all gates pass:**
- Page marked ✅ APPROVED in page inventory
- Page eligible for production deployment
- Page brief filed in governance records

**If any gate fails:**
- Page marked ❌ NOT APPROVED in page inventory
- Remediation plan created
- Re-review after fixes

---

## GATE FAILURE SEVERITY

### Critical Failures (Must Fix Before Approval):

- **Gate 6** (Proof Discipline): Unsupported claims
- **Gate 8** (Originality): Copied competitor content
- **Gate 4** (Brand Discipline): Generic SaaS language

### High-Priority Failures (Should Fix Before Approval):

- **Gate 3** (Relevance): Irrelevant sections
- **Gate 5** (Technical Restraint): Technical overflow on buyer pages
- **Gate 7** (CTA Discipline): Weak or missing CTA

### Medium-Priority Failures (Can Fix Post-Approval):

- **Gate 9** (Readability): Minor readability issues
- **Gate 1/2** (Purpose/Audience): Needs refinement but functional

---

## DOCUMENTATION REQUIREMENTS

For every approved page, file:

1. **Page brief** (completed template from 03-page-brief-template.md)
2. **Gate status** (10/10 passes documented)
3. **Change log entry** (in 08-content-decision-log.md)
4. **Technical overflow** (if any, logged in 07-technical-overflow-log.md)

**Storage:** All documentation in `docs/website-governance/` or linked from page inventory.

---

## FINAL AUTHORITY

**Lead Website Systems Engineer** has final approval authority on all pages.

**No exceptions:** If a gate fails, page does not ship until fixed.

**No shortcuts:** All 10 gates must pass. No "good enough" approvals.

---

**Document Status:** LOCKED for Phase 2+
**Maintained By:** Lead Website Systems Engineer
**Last Updated:** 2026-04-16
**Enforcement:** Phase 2+ (validation agents + manual review)
