# EKAS Page Templates
## Standard Content Structures by Page Class

**Purpose:** Define consistent content structures for each page class to ensure quality and efficiency.

**Authority:** Lead Website Systems Engineer
**Usage:** Phase 4+ (standardization) and Phase 5+ (remediation)

---

## TEMPLATE INDEX

1. [Conversion Pages](#1-conversion-page-template)
2. [Capability Pages](#2-capability-page-template)
3. [Trust Pages](#3-trust-page-template)
4. [Resource Pages](#4-resource-page-template)
5. [Hub Pages](#5-hub-page-template)

---

## 1. CONVERSION PAGE TEMPLATE

**Page Class:** Conversion
**Examples:** `/` (homepage), `/demo`, `/platform` hub, `/solutions` hub

### Required Sections

#### Section 1: Hero / Above Fold
**Purpose:** Immediate positioning and value communication
**Max Length:** 3-4 sentences
**Required Elements:**
- H1: Page title (positioning statement)
- Subheadline: 1-2 sentences explaining core value
- Primary CTA button
- Optional: Trust strip (credentials, metrics)

**Example:**
```
H1: Manufacturing AI That Refuses to Guess

Subheadline: EKAS eliminates AI hallucination through architectural constraint. When data quality is insufficient, we refuse to answer—preventing manufacturing decisions based on incomplete information.

CTA: Request a Demo
```

#### Section 2: Problem / Pain Point
**Purpose:** State specific buyer problem
**Max Length:** 2-3 sentences
**Required Elements:**
- Business problem statement
- Concrete manifestation (time waste, risk, cost)
- Current state characterization

**Example:**
```
Manual shift handoffs take 35 minutes and risk information loss. Plant managers compile OEE reports weekly from spreadsheets. Root cause analysis requires hours of data investigation.
```

#### Section 3: Solution / How EKAS Addresses
**Purpose:** Position EKAS capability as solution
**Max Length:** 3-4 sentences
**Required Elements:**
- EKAS capability statement
- Differentiation (vs. manual or competitor)
- Business outcome

**Example:**
```
EKAS provides real-time manufacturing intelligence grounded in ISO 22400-compliant metrics. The tool-first architecture ensures AI never computes results—all calculations execute via deterministic SQL. Plant managers get root cause identification in minutes, not hours.
```

#### Section 4: Evidence / Trust
**Purpose:** Provide proof of capability
**Max Length:** 3-5 bullet points or diagram
**Required Elements:**
- Technical proof point
- Implementation detail
- OR concrete metric/statistic

**Example:**
```
- 10 production-ready metrics with provenance
- SHA-256 hash on every response
- PostgreSQL RLS multi-tenant isolation
- ISO 22400-2:2014 compliance
```

#### Section 5: CTA / Next Step
**Purpose:** Drive action
**Max Length:** 1-2 sentences + button
**Required Elements:**
- Context for CTA
- Primary CTA button
- Optional: Secondary CTA

**Example:**
```
See how EKAS eliminates hallucination in your manufacturing environment.

[Request a Demo]
```

---

## 2. CAPABILITY PAGE TEMPLATE

**Page Class:** Capability
**Examples:** `/platform/ai-assistant`, `/solutions/downtime-reduction`, `/industries/automotive`

### Required Sections

#### Section 1: Hero
**Purpose:** State capability name and business outcome
**Max Length:** 2-3 sentences
**Required Elements:**
- H1: Capability name
- Business outcome statement
- Target audience implicit

**Example:**
```
H1: Tool-First AI Architecture

EKAS eliminates AI hallucination by architecturally prohibiting the AI from computing results. All metric calculations execute via deterministic SQL—the AI's role is intent understanding and tool selection.
```

#### Section 2: Business Problem
**Purpose:** Explain buyer pain point this capability addresses
**Max Length:** 2-3 sentences
**Required Elements:**
- Specific manufacturing problem
- Current state characterization
- Business impact

**Example:**
```
Manufacturing executives fear AI "black box" recommendations that can't be verified. Incorrect analytics lead to poor production decisions. Regulatory frameworks (IATF 16949, AS9100) demand traceable calculations.
```

#### Section 3: How It Works
**Purpose:** Explain EKAS solution with appropriate technical detail
**Max Length:** 3-4 sentences OR diagram
**Required Elements:**
- Simplified process description
- Key differentiator highlighted
- Technical proof point

**Example:**
```
EKAS uses a 3-step process:
1. User asks manufacturing question
2. AI selects appropriate SQL query from catalog
3. PostgreSQL executes calculation and returns result with provenance

The AI never performs calculations—it only selects pre-validated SQL templates.
```

#### Section 4: Why It Matters
**Purpose:** Connect capability to business value
**Max Length:** 2-3 sentences
**Required Elements:**
- Risk mitigation
- Competitive advantage
- OR regulatory compliance

**Example:**
```
Tool-first architecture eliminates hallucination risk. Every answer is traceable to the SQL that produced it. Executives get manufacturing intelligence they can trust for production decisions.
```

#### Section 5: Technical Proof (Optional)
**Purpose:** Provide credibility for IT/technical buyers
**Max Length:** 3-5 bullet points
**Required Elements:**
- Implementation specifics
- Technical standards referenced
- Concrete metrics

**Example:**
```
- SHA-256 hash provenance on every response
- 7-rule quality enforcement at runtime
- 95% data coverage threshold
- Catalog versioning with golden test vectors
```

#### Section 6: CTA
**Purpose:** Drive action
**Max Length:** 1-2 sentences + button
**Required Elements:**
- Context specific to capability
- Primary CTA button

**Example:**
```
See the tool-first architecture in action.

[Request a Demo]
```

---

## 3. TRUST PAGE TEMPLATE

**Page Class:** Trust
**Examples:** `/security`, `/about`, `/about/founder`

### Required Sections

#### Section 1: Trust Statement
**Purpose:** Establish credibility immediately
**Max Length:** 2-3 sentences
**Required Elements:**
- Factual statement (not marketing)
- Specific standard or certification if applicable
- Transparency signal

**Example (Security):**
```
H1: Security Architecture & Compliance

EKAS implements PostgreSQL Row-Level Security (RLS) with 56 tenant isolation policies. Multi-tenant architecture ensures data separation at the database kernel level, not application filtering.
```

**Example (About):**
```
H1: About EKAS

EKAS is a manufacturing analytics platform built on the principle that AI should refuse to answer when data quality is insufficient. We prioritize correctness over availability.
```

#### Section 2-4: Evidence Sections
**Purpose:** Provide detailed proof
**Max Length:** Varies by trust page type
**Required Elements:**
- Specific technical details (security page)
- Philosophy explanation (about page)
- Factual biography (founder page, minimal)

#### Section 5: CTA
**Purpose:** Drive action
**Max Length:** 1-2 sentences + button
**Required Elements:**
- Context relevant to trust concern
- Primary CTA button

---

## 4. RESOURCE PAGE TEMPLATE

**Page Class:** Resource
**Examples:** `/resources/faqs`, `/resources` hub

### FAQ Page Structure

#### Section 1: Category Introduction
**Purpose:** Frame FAQ scope
**Max Length:** 1-2 sentences

#### Section 2: Accordion FAQ List
**Required Elements:**
- Interactive accordion component
- Questions grouped by category
- Answers: 2-4 sentences each
- Every answer grounded in documentation

#### Section 3: CTA
**Purpose:** Offer next step beyond FAQ
**Required Elements:**
- "Didn't find your answer?" context
- CTA to demo or contact

---

## 5. HUB PAGE TEMPLATE

**Page Class:** Conversion (hub variant)
**Examples:** `/platform`, `/solutions`, `/industries`, `/roles`, `/resources`

### Required Sections

#### Section 1: Hub Introduction
**Purpose:** Explain category and help user navigate
**Max Length:** 2-3 sentences
**Required Elements:**
- Category overview
- Value proposition for exploring
- Brief explanation of organization

**Example:**
```
H1: EKAS Platform Capabilities

EKAS provides four core platform capabilities: AI Assistant, Manufacturing Intelligence, Data Connections, and Reporting & Analytics. Each capability addresses a specific aspect of manufacturing intelligence.
```

#### Section 2: Navigation Cards
**Purpose:** Guide user to detail pages
**Max Length:** 1-2 sentences per card
**Required Elements:**
- Card per sub-page
- Card title (H3)
- 1-2 sentence description
- Link to detail page

**Example:**
```
[Card: AI Assistant]
Tool-first AI architecture that refuses to guess. AI selects queries; SQL computes results.
→ Learn More

[Card: Manufacturing Intelligence]
Governed metrics with ISO 22400 compliance and provenance on every answer.
→ Learn More
```

#### Section 3: CTA
**Purpose:** Alternative action for users not ready to explore
**Required Elements:**
- Context for CTA
- Primary CTA button

---

## CROSS-TEMPLATE STANDARDS

### Maximum Section Count
**Rule:** 5 sections maximum per page

**Enforcement:** If more sections needed, content is too complex or off-topic.

### Heading Hierarchy
**Rule:** H1 → H2 → H3 (never skip levels)

**Format:**
- H1: Page title (one per page)
- H2: Major section
- H3: Subsection

### Paragraph Length
**Rule:** 2-4 sentences per paragraph

**Maximum:** 4 sentences (break if longer)

### CTA Placement
**Rule:** Primary CTA must appear:
- Above fold (hero section)
- Below major content (final section)

**Optional:** Inline CTAs after key proof points

---

## TEMPLATE COMPLIANCE

### Phase 4 (Standardization)
- All page families standardized to templates
- Consistent structures within families
- Hub pages follow hub template

### Phase 5 (Remediation)
- Individual pages conform to templates
- Deviations documented and justified
- Template violations remediated

---

**Document Status:** LOCKED for Phase 2+
**Maintained By:** Lead Website Systems Engineer
**Last Updated:** 2026-04-16
