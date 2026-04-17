# EKAS Website Style Guide
## Writing Standards for B2B Manufacturing Audience

**Document Version:** 1.0
**Date:** 2026-04-16
**Authority:** Lead Website Systems Engineer
**Scope:** All website copy (pages, CTAs, metadata)

---

## 1. TONE & VOICE

### 1.1 Voice Characteristics

**EKAS Voice = Manufacturing Discipline:**

✅ **Precise** (not approximate)
- "10 production-ready metrics" (specific)
- NOT "dozens of metrics" (vague)

✅ **Confident** (not apologetic)
- "EKAS refuses to guess"
- NOT "EKAS tries not to guess"

✅ **Technical when appropriate** (not dumbed down)
- "PostgreSQL RLS" (specific technology)
- "SHA-256 hash" (specific algorithm)
- Appropriate for IT audience

✅ **Direct** (not conversational)
- "Request a demo"
- NOT "Let's chat about your needs"

---

### 1.2 Business-First Writing

**Problem → Solution → Evidence**

Every capability section follows this structure:
1. **Problem:** State specific manufacturing pain point
2. **Solution:** Explain how EKAS addresses it
3. **Evidence:** Provide technical proof or implementation detail

**Example:**
- Problem: "Manual shift handoff takes 35 minutes, risks information loss"
- Solution: "EKAS provides shift briefing queries grounded in production events"
- Evidence: "Queries execute against ISA-95 normalized data with provenance"

---

## 2. SENTENCE DISCIPLINE

### 2.1 Sentence Length Rules

**Target:** 15-20 words average
**Maximum:** 30 words (break into two if longer)
**Minimum:** 5 words (avoid choppy fragments except for emphasis)

**Test:** If reader must re-read sentence to understand, it's too complex.

---

### 2.2 Active Voice Preference

✅ **GOOD (Active):**
- "EKAS executes all calculations via SQL"
- "The AI selects tools"
- "PostgreSQL RLS enforces tenant isolation"

❌ **AVOID (Passive):**
- "All calculations are executed by SQL"
- "Tools are selected by the AI"
- "Tenant isolation is enforced by RLS"

**Exception:** Passive voice acceptable when actor is unknown or irrelevant:
- "Data is normalized to ISA-95 taxonomy" (normalization process is focus, not actor)

---

### 2.3 Concrete Nouns

✅ **GOOD (Concrete):**
- downtime events
- quality metrics
- shift briefing
- root cause
- provenance hash

❌ **AVOID (Abstract):**
- insights
- intelligence (unless "manufacturing intelligence")
- value
- transformation
- journey

---

## 3. PARAGRAPH LENGTH

### 3.1 Maximum Paragraph Length

**Rule:** 4 sentences maximum
**Ideal:** 2-3 sentences
**Single-sentence paragraphs:** Acceptable for emphasis

**Example of good paragraph:**
```
EKAS eliminates AI hallucination through architectural constraint. The AI selects SQL queries but never computes results. All metric calculations execute via deterministic SQL templates with catalog versioning.
```
(3 sentences, clear progression)

---

### 3.2 Paragraph Breaks

Use paragraph breaks to:
- Separate distinct ideas
- Create visual breathing room
- Emphasize key points
- Improve scannability

**Rule:** If page has long text walls, break into shorter paragraphs or bullet lists.

---

## 4. FORMATTING STANDARDS

### 4.1 Heading Hierarchy

**H1:** One per page (page title)
- Rajdhani Bold, 36-48px
- Example: "Manufacturing AI That Refuses to Guess"

**H2:** Major sections
- Rajdhani Bold, 28-32px
- Example: "Tool-First Architecture"

**H3:** Subsections
- DM Sans Regular, 20-24px
- Example: "How It Works"

**Never skip levels:** H1 → H2 → H3 (not H1 → H3)

---

### 4.2 Bullet Lists

**When to use:**
- 3+ related items
- Feature lists
- Step-by-step processes
- Benefit summaries

**Formatting:**
- Lead-in sentence ending with colon
- Parallel structure (all items start same way)
- 1-2 lines per bullet maximum
- No more than 7 bullets in a list

**Example:**
```
EKAS provides three core capabilities:
- Governed metrics with ISO 22400 compliance
- Controlled refusal when data quality insufficient
- Provenance on every answer (SHA-256 hash)
```

---

### 4.3 Bold & Emphasis

**Use bold for:**
- Key terms on first mention
- Capability names
- Section labels
- Numbers/statistics

**Example:** "EKAS includes **10 production-ready metrics** with **91 in development**."

**AVOID:**
- Bolding entire sentences
- Overuse (reduces impact)
- Bold + italic combination

---

### 4.4 Code/Technical Formatting

**Use monospace font for:**
- Database names: `PostgreSQL`
- Technical specs: `SHA-256`
- Code references: `SELECT * FROM metrics`
- File paths: `/platform/ai-assistant`

**NOT for:** General technical terms that are part of prose

---

## 5. CLARITY RULES

### 5.1 One Idea Per Sentence

❌ **BAD (Multiple ideas):**
"EKAS uses a tool-first architecture where the AI selects queries but SQL computes results, and this eliminates hallucination because the AI never performs calculations, which means answers are always deterministic."

✅ **GOOD (One idea each):**
"EKAS uses a tool-first architecture. The AI selects queries, but SQL computes all results. This eliminates hallucination—the AI never performs calculations."

---

### 5.2 Lead with Main Point

**Inverted pyramid:** Most important information first.

❌ **BAD (Buried lead):**
"In manufacturing environments where decisions impact production schedules and quality outcomes, having accurate analytics is critical, which is why EKAS refuses to answer when data quality is insufficient."

✅ **GOOD (Lead first):**
"EKAS refuses to answer when data quality is insufficient. In manufacturing, decisions impact production schedules and quality outcomes—accuracy is non-negotiable."

---

### 5.3 Eliminate Filler Words

**Remove these always:**
- Basically
- Essentially
- Actually
- Really
- Very
- Just
- Simply

**Example:**
- ❌ "EKAS is basically a tool that actually helps you..."
- ✅ "EKAS helps you..."

---

### 5.4 Specificity Over Generalization

❌ **VAGUE:**
- "Fast query execution"
- "Secure platform"
- "Easy integration"

✅ **SPECIFIC:**
- "Sub-second query execution for OEE metrics"
- "PostgreSQL RLS with 56 row-level security policies"
- "Read-only integration via ODBC/JDBC"

---

## 6. BUSINESS-FIRST LANGUAGE RULES

### 6.1 Prefer Business Terms Over Tech Jargon (On Buyer Pages)

| Instead of... | Use... | Context |
|---------------|--------|---------|
| "Agentic AI" | "Tool-first architecture" | Buyer pages |
| "LLM" | "AI" | Buyer pages (specify "LLM" only on tech pages) |
| "Semantic layer" | "Analytics foundation" | Buyer pages |
| "Data pipeline" | "Data connection" | Buyer pages |
| "Orchestration" | "Workflow" | Buyer pages |

**Exception:** Technical terms appropriate on `/platform/ai-assistant` and `/security` pages for IT audience.

---

### 6.2 Manufacturing-Specific Language

✅ **USE:**
- Root cause (not "insights")
- Downtime event (not "incident")
- Shift briefing (not "summary")
- Production schedule (not "timeline")
- Quality tracking (not "quality monitoring")
- Governed metrics (not "KPIs")

---

### 6.3 Avoid Transformation Language

❌ **BANNED WORDS:**
- Transform/transformation
- Unlock
- Empower
- Revolutionize
- Game-changing
- Cutting-edge
- Next-generation
- Leverage
- Synergy
- Disrupt

✅ **USE INSTEAD:**
- Replace (manual process → automated query)
- Improve (OEE visibility)
- Enable (real-time root cause identification)
- Eliminate (hallucination risk)

---

## 7. READABILITY STANDARDS

### 7.1 Target Reading Level

**Goal:** Executive-readable (Flesch-Kincaid Grade 10-12)

**Not:** Academic/technical paper (Grade 16+)
**Not:** Consumer marketing (Grade 6-8)

**Test:** VP Manufacturing with engineering background should understand without glossary.

---

### 7.2 Jargon Guidelines

**Manufacturing jargon:** Appropriate (target audience)
- OEE, FPY, scrap rate, downtime, root cause, shift handoff

**Quality jargon:** Appropriate (target audience)
- IATF 16949, AS9100, ISO 22400, FMEA, CAPA

**AI jargon:** Use sparingly, define if necessary
- "Tool-first architecture" (define on first use)
- "Provenance" (define on first use)

**Database jargon:** Only on technical trust pages
- PostgreSQL RLS, SHA-256, row-level security

---

### 7.3 Acronym Rules

**First use:** Spell out with acronym in parentheses
- "First Pass Yield (FPY)"
- "Overall Equipment Effectiveness (OEE)"

**Subsequent use:** Acronym only
- "FPY by machine and shift"
- "OEE component drill-down"

**Exception:** Well-known acronyms (AI, IT, ERP, MES) don't require spelling out.

---

## 8. CTA WRITING STANDARDS

### 8.1 Primary CTA Wording

**Standard:** "Request a Demo"

**Alternatives (if context requires):**
- "Request Pilot Deployment"
- "Explore Platform"
- "Explore [Section Name]"

**NEVER:**
- "Click here"
- "Learn more" (too vague)
- "Get started" (implies self-serve)
- "Try for free" (no free tier)

---

### 8.2 CTA Context

Always provide context before CTA:

❌ **BAD (No context):**
"Request a Demo"

✅ **GOOD (With context):**
"See how EKAS eliminates hallucination in your manufacturing environment. Request a demo."

---

## 9. METADATA STANDARDS

### 9.1 Page Titles

**Format:** `[Page Topic] | EKAS`

**Example:**
- "Tool-First AI Architecture | EKAS"
- "Downtime Reduction | EKAS"
- "Manufacturing AI That Refuses to Guess | EKAS"

**Length:** 50-60 characters (including " | EKAS")

---

### 9.2 Meta Descriptions

**Length:** 140-160 characters
**Format:** One clear sentence about page value
**Include:** Primary keyword, business outcome

**Example:**
"EKAS eliminates AI hallucination through tool-first architecture. The AI selects queries; SQL computes all results. Manufacturing-grade reliability."

---

## 10. CONSISTENCY CHECKLIST

Before publishing any page, verify:

- [ ] H1 → H2 → H3 hierarchy (no skipped levels)
- [ ] Paragraphs ≤ 4 sentences
- [ ] Sentences ≤ 30 words
- [ ] Active voice (≥80% of sentences)
- [ ] Zero banned transformation words
- [ ] Zero unsupported claims
- [ ] CTA has context
- [ ] Acronyms spelled out on first use
- [ ] Manufacturing-specific terminology used correctly
- [ ] Technical jargon appropriate for page class
- [ ] Readability: Executive-level (Grade 10-12)

---

**Document Status:** LOCKED for Phase 2+
**Maintained By:** Lead Website Systems Engineer
**Last Updated:** 2026-04-16
