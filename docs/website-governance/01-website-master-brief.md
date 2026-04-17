# EKAS Website Master Brief
## B2B Marketing Website Governance Document

**Document Version:** 1.0
**Date:** 2026-04-16
**Status:** LOCKED — Phase 1 Governance
**Authority:** Lead Website Systems Engineer
**Scope:** All 26 pages at `/home/pat/EKAS B2B website/ekas-nextjs`

---

## 1. POSITIONING

### 1.1 Primary Positioning Statement

**"Manufacturing AI That Refuses to Guess"**

EKAS is a manufacturing analytics platform where AI is **architecturally prohibited** from computing results. All metric calculations execute via ISO 22400-compliant SQL templates. When data coverage falls below 95%, EKAS refuses to answer and provides remediation steps.

### 1.2 What EKAS Is

- Manufacturing analytics platform
- Tool-first AI architecture (AI selects queries, SQL computes)
- ISO 22400-compliant metric catalog
- PostgreSQL RLS multi-tenant database
- Controlled refusal system (7-rule quality enforcement)
- Provenance on every answer (SHA-256 hash, catalog version, row count)

### 1.3 What EKAS Is Not

- NOT a general-purpose AI assistant
- NOT a BI dashboard builder
- NOT a low-code platform
- NOT SaaS-only (deployable on-premise/cloud)
- NOT estimating or approximating answers
- NOT hiding SQL execution from users

---

## 2. TARGET AUDIENCES

### 2.1 Primary: VP Manufacturing / Plant Manager

**Profile:**
- Mid-market discrete manufacturers (50-500 employees)
- Tier 2/3 automotive/aerospace suppliers
- Currently using spreadsheets for OEE/downtime tracking
- Fear AI "black box" that can't be verified

**Pain Points:**
- Manual weekly/monthly reporting compilation
- No real-time visibility into root causes
- Regulatory pressure for traceable calculations
- Spreadsheet errors leading to incorrect decisions

**Buying Triggers:**
- Customer audits demanding analytics maturity
- Lost production time from delayed root cause analysis
- IATF 16949 / AS9100 compliance pressure

### 2.2 Secondary: IT/Data Leader

**Concerns:**
- Data security and multi-tenant isolation
- Integration complexity with legacy ERP/MES
- Vendor lock-in
- AI explainability

**Decision Criteria:**
- PostgreSQL-based (familiar, portable)
- Docker/container deployment option
- API-first architecture
- Zero hardcoded credentials

### 2.3 Tertiary: Quality/CI Manager

**Use Cases:**
- Downtime Pareto analysis
- FPY tracking by machine/shift
- OEE component drill-down
- Quality trend detection

**Success Metrics:**
- Time to root cause (hours → minutes)
- Downtime categorization accuracy

---

## 3. APPROVED TERMINOLOGY

### 3.1 Core Terms (Use Consistently)

- **Manufacturing AI** (not "AI-powered manufacturing solution")
- **Tool-first architecture** (not "agentic AI" on buyer pages)
- **Controlled refusal** (not "error handling")
- **Provenance** (not "audit trail" or "lineage")
- **Governed metrics** (not "KPIs")
- **ISO 22400-compliant** (specific standard, not generic "standards-compliant")
- **PostgreSQL RLS** (specific technology, not "database security")
- **Zero-compromise quality** (not "high quality" or "enterprise-grade")

### 3.2 Approved Technical References

When technical detail is appropriate:
- SHA-256 hash
- SQL templates
- Catalog versioning
- 7-rule quality enforcement
- 95% data coverage threshold
- ISA-95 taxonomy
- IATF 16949 / AS9100 (regulatory standards)

### 3.3 Approved Business Language

- **Root cause** (not "insights")
- **Real-time** (when accurate)
- **Traceable calculations** (not "transparent AI")
- **Manufacturing intelligence** (not "business intelligence")
- **Pilot deployment** (not "trial" or "demo")

---

## 4. MESSAGE BOUNDARIES

### 4.1 What EKAS Claims

**Documented Capabilities:**
- 10 production-ready metrics (91 in development)
- Tool-first architecture where AI never computes
- Controlled refusal when data quality insufficient
- SHA-256 hash provenance on responses
- PostgreSQL RLS multi-tenant isolation (56 policies documented)
- ISO 22400-2:2014 metric alignment
- 7-rule quality enforcement at runtime
- Read-only integration philosophy
- ISA-95 normalization layer

**Documented Implementation Status:**
- Production deployment with pilot customers
- 140+ React UI components
- 1,800+ test files, 300+ test functions
- 100+ API endpoints
- Mid-market manufacturers (Tier 2/3 focus)

### 4.2 What EKAS Does NOT Claim

**Prohibited Claims:**
- Specific customer names (unless approved)
- Specific ROI percentages or savings numbers
- "AI-powered insights" (too vague)
- Pre-built connectors for specific vendors (unless documented)
- Dashboard builder functionality (not documented)
- Scheduled reporting/export features (not documented)
- Specific bottleneck identification algorithms (not documented)
- FMEA integration as a product feature (failure analysis workflows only)
- Predictive maintenance (not in scope)
- Machine learning model training (opposite of architecture)

### 4.3 Wording Discipline

**Conservative Phrasing Required:**
- "Supports failure analysis workflows" (NOT "FMEA integration")
- "Connects to manufacturing data sources" (NOT "pre-built connectors")
- "Analytics foundation" (NOT "dashboard builder")
- "10 production-ready metrics" (NOT "91 metrics")
- "Initial pilot customers" (NOT "dozens of customers")

---

## 5. APPROVED CTA APPROACH

### 5.1 Primary CTA

**Wording:** "Request a Demo"
**Alternative:** "Request Pilot Deployment"
**Target:** `/demo` page (contact form)

### 5.2 Secondary CTA

**Wording:** "Explore Platform"
**Target:** `/platform` hub page

### 5.3 Prohibited CTAs

- "Try for Free" (no free tier documented)
- "Get Started" (too vague, implies self-serve)
- "Sign Up" (not SaaS self-serve)
- "Buy Now" (not transactional sales)
- "Schedule a Call" (not primary flow)

---

## 6. TONE RULES

### 6.1 Voice Characteristics

**Manufacturing Discipline:**
- Precise (not approximate)
- Confident (not apologetic)
- Technical when appropriate (not dumbed down)
- Direct (not conversational)

**Business Focus:**
- Problem → Solution → Evidence
- No hype, no exaggeration
- Manufacturing-specific language
- Executive-readable

### 6.2 Sentence Discipline

**Prefer:**
- Active voice
- Short sentences (15-20 words average)
- Concrete nouns
- Specific examples

**Avoid:**
- Passive voice ("is powered by")
- Run-on sentences (>30 words)
- Abstract benefits ("unlock value")
- Generic transformation language

### 6.3 Paragraph Length

- **Maximum:** 4 sentences
- **Ideal:** 2-3 sentences
- **Single sentence paragraphs:** Acceptable for emphasis

---

## 7. TRUST-BUILDING PRINCIPLES

### 7.1 Proof Over Claims

Every capability claim must be backed by:
- Codebase location reference
- Technical specification
- Implementation status disclosure
- OR conservative wording that doesn't overstate

### 7.2 No Invented Social Proof

**Prohibited:**
- Customer logos (unless approved)
- Testimonial quotes (unless documented)
- "Trusted by Fortune 500" (unless true)
- Generic industry statistics
- Inferred customer outcomes

### 7.3 Appropriate Social Proof

**Allowed:**
- "Production deployment with pilot customers"
- "Mid-market manufacturers" (documented target)
- "Tier 2/3 suppliers" (documented segment)
- Technical architecture details (verifiable)

---

## 8. PAGE CLASSES & CONTENT BOUNDARIES

### 8.1 Conversion Pages

**Definition:** Primary user entry/exit points
**Examples:** Homepage, /demo, /platform, /solutions
**Content Rules:**
- Clear value proposition above fold
- Business problem → EKAS solution → CTA
- Maximum 5 sections per page
- Zero technical overflow on homepage

### 8.2 Capability Pages

**Definition:** Product feature detail pages
**Examples:** /platform/ai-assistant, /solutions/downtime-reduction
**Content Rules:**
- Lead with business outcome, not feature list
- Include "How It Works" technical section (appropriate depth)
- Show, don't just tell (architecture diagrams encouraged)
- Every claim grounded in documentation

### 8.3 Trust Pages

**Definition:** Security, compliance, about
**Examples:** /security, /about, /about/founder
**Content Rules:**
- Factual, no marketing fluff
- Specific standards/certifications only if achieved
- Philosophy over biography on founder page

### 8.4 Resource Pages

**Definition:** FAQ, guides (if created)
**Examples:** /resources/faqs
**Content Rules:**
- Practical buyer questions only
- Answers must be verifiable
- No placeholder content (delete if empty)

### 8.5 Legal/Footer Pages

**Definition:** Privacy, terms, accessibility
**Examples:** Links in footer (not currently scoped)
**Content Rules:**
- Legal standard language
- Contact information consistency

---

## 9. ORIGINALITY REQUIREMENTS

### 9.1 Prohibited Sources

**NEVER copy, paraphrase, or derive from:**
- MachineMetrics website
- Plex website
- Epicor website
- Tulip website
- Sight Machine website
- Any competitor information architecture
- Generic SaaS template sites

### 9.2 Allowed Inspiration Sources

**May study for layout/structure patterns only:**
- Stripe (payment clarity)
- Linear (product-led messaging)
- Vercel (developer focus)

**But ALL content must be:**
- Original EKAS terminology
- Manufacturing-specific language
- Traceable to EKAS source documentation

### 9.3 Originality Verification

Every page must pass:
- Zero copied competitor phrases
- Zero generic SaaS template language
- 100% alignment with EKAS positioning document

---

## 10. TECHNICAL RESTRAINT POLICY

### 10.1 Technical Overflow Definition

**Technical overflow = content that belongs in documentation, not on buyer page:**
- Implementation details beyond buyer decision-making
- Architecture deep-dives for non-technical buyers
- API specifications
- Database schema details
- Multi-paragraph technology explanations

### 10.2 Overflow Handling Process

When technical content exceeds page purpose:
1. Log in `07-technical-overflow-log.md`
2. Mark with rationale for removal
3. Tag for potential use in: technical brief, FAQ, documentation, case study

### 10.3 Appropriate Technical Depth by Page Class

**Homepage:** Zero technical detail
**Platform Hub:** Architectural concepts only
**Platform Detail Pages:** One "How It Works" section (3-4 sentences)
**Solution Pages:** Problem → Capability → Evidence (technical proof allowed)
**Security Page:** Full technical specification (appropriate for IT buyer)

---

## 11. EXECUTIVE SUMMARY

This website serves **mid-market manufacturing executives** evaluating a **no-compromise manufacturing analytics platform**. Every page must:

1. **State clear business purpose** in one sentence
2. **Target one primary audience**
3. **Use EKAS-specific terminology** (not generic SaaS language)
4. **Ground all claims** in source documentation
5. **Avoid technical overflow** on buyer pages
6. **Maintain manufacturing discipline** (precise, not approximate)
7. **Provide clear next step** (CTA)
8. **Pass originality check** (zero copied competitor language)

**Governance Authority:** No page may be published without passing all 10 approval gates defined in `06-approval-checklist.md`.

**Status:** LOCKED for Phase 2+ work.

---

**Document Owner:** Lead Website Systems Engineer
**Last Updated:** 2026-04-16
**Next Review:** Upon completion of Phase 7 (Final Certification)
