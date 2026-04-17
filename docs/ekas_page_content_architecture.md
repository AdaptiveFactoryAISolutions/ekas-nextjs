# EKAS Page Content Architecture

**Purpose:** Define the complete page structure, content principles, and quality standards for the EKAS website.

**Status:** GATE 1 DELIVERABLE
**Date:** 2026-04-16

---

## Site Information Architecture

### Primary Navigation Structure

```
/                           (Homepage)
├── /platform               (Platform hub)
│   ├── /ai-assistant
│   ├── /manufacturing-intelligence
│   ├── /data-connections
│   └── /reporting-analytics
├── /solutions              (Solutions hub)
│   ├── /downtime-reduction
│   ├── /scrap-quality-visibility
│   ├── /capacity-throughput
│   ├── /cost-driver-analysis
│   └── /multi-site-performance
├── /roles                  (Roles hub)
│   ├── /plant-managers
│   ├── /operations-leaders
│   ├── /manufacturing-engineering
│   ├── /quality-leaders
│   ├── /finance-leaders
│   └── /executive-operations
├── /industries             (Industries hub)
│   ├── /metal-stamping
│   ├── /automotive
│   ├── /aerospace
│   ├── /medical-devices
│   └── /industrial-manufacturing
├── /security               (Security & Trust)
│   ├── #governance         (anchor)
│   ├── #data-handling      (anchor)
│   └── #architecture       (anchor)
├── /resources              (Resources hub)
│   ├── /guides
│   ├── /product-briefs
│   ├── /faqs
│   └── /thought-leadership
├── /about                  (About hub)
│   └── /founder
└── /demo                   (Demo request)
```

**Total Pages:** 37 (including hubs and 404)
**Total Routes:** 34 unique destinations
**Anchor Sections:** 3 (security sub-topics)

---

## Page Family Definitions

### 1. Hub Pages (6 pages)
**Purpose:** Navigation and category overview
**Examples:** `/platform`, `/solutions`, `/roles`, `/industries`, `/resources`, `/about`

**Standard Structure:**
- Hero with category description
- Overview of sub-pages (card grid)
- Why this category matters
- CTA to explore or request demo

**Content Principles:**
- Brief, high-level category introduction
- Clear navigation to detail pages
- No duplicate content from detail pages
- Focus on helping user choose their path

---

### 2. Platform Detail Pages (4 pages)
**Purpose:** Explain specific EKAS platform capabilities
**Examples:** AI Assistant, Manufacturing Intelligence, Data Connections, Reporting & Analytics

**Standard Structure:**
- Hero with capability name and value proposition
- "What It Is" - conceptual explanation
- Key features or metrics (card grid or list)
- "How It Works" - process or technical approach
- "Why It Matters" - benefits and trust factors
- CTA

**Content Principles:**
- Technical but accessible
- Focus on governed metrics and provenance
- Avoid feature lists without explanation
- Emphasize deterministic computation over AI magic
- Manufacturing-specific terminology

**Content Depth:** 1000-1500 words per page

---

### 3. Solution Detail Pages (5 pages)
**Purpose:** Explain how EKAS solves specific manufacturing problems
**Examples:** Downtime Reduction, Scrap & Quality, Capacity, Cost Drivers, Multi-Site

**Standard Structure:**
- Hero with problem statement
- "The Problem" - pain point description
- "Common Blind Spots" - what teams usually miss (5 items)
- "How EKAS Helps" - 4 capabilities in card grid
- "Business Outcomes" - 6 benefits in list format
- CTA

**Content Principles:**
- Problem-first, solution-second
- Specific manufacturing scenarios
- Avoid generic "improve efficiency" claims
- Connect operational losses to business impact
- Use manufacturing domain terminology

**Content Depth:** 800-1200 words per page

---

### 4. Role Detail Pages (6 pages)
**Purpose:** Speak to specific manufacturing roles about relevant capabilities
**Examples:** Plant Managers, Operations Leaders, Mfg Engineering, Quality, Finance, Executives

**Standard Structure:**
- Hero with role-specific value proposition
- "Challenges You Face" - 5 role-specific pain points
- "How EKAS Helps" - 4 role-relevant capabilities
- "Typical Use Cases" - 4 scenarios in detail
- CTA

**Content Principles:**
- Use role-specific language and priorities
- Focus on day-to-day workflows
- Avoid generic benefits - be role-specific
- Reference tools and processes the role uses
- Show understanding of role's pressures

**Content Depth:** 800-1000 words per page

---

### 5. Industry Detail Pages (5 pages)
**Purpose:** Address industry-specific compliance, terminology, and use cases
**Examples:** Metal Stamping, Automotive, Aerospace, Medical Devices, Industrial

**Standard Structure:**
- Hero with industry positioning
- "Industry Challenges" - 5 industry-specific pain points
- "How EKAS Helps" - 4 industry-specific capabilities
- "Typical Use Cases" - 4 industry scenarios
- CTA

**Content Principles:**
- Industry-specific terminology and standards
- Compliance focus (IATF 16949, AS9100, ISO 13485, etc.)
- Industry-specific equipment and processes
- Regulatory and customer audit context
- Traceability and provenance emphasis

**Content Depth:** 800-1000 words per page

---

### 6. Resource Category Pages (4 pages)
**Purpose:** Provide access to guides, briefs, FAQs, thought leadership
**Examples:** Guides, Product Briefs, FAQs, Thought Leadership

**Standard Structure:**
- Hero with resource category description
- "What You'll Find" - content type overview
- Content listing or placeholder acknowledgment
- CTA to access or request

**Content Principles:**
- Acknowledge placeholder status where content doesn't exist yet
- Provide clear expectation of what content will be available
- Offer alternative (demo request) if content not public
- FAQs should be interactive and comprehensive

**Content Depth:** 500-1000 words (FAQs: 1500+ words)

---

### 7. Security & Trust Pages (1 page + 3 sections)
**Purpose:** Address security, compliance, governance concerns
**Example:** `/security` with #governance, #data-handling, #architecture anchors

**Standard Structure:**
- Hero with trust positioning
- Trust Model + Security Stack overview
- Governance section (versioned metrics, provenance, role-based access)
- Data Handling section (collection, storage, zero-training guarantee)
- Architecture section (AWS, authentication, monitoring, compliance)
- CTA

**Content Principles:**
- Technical credibility without jargon
- Specific security controls, not generic claims
- Compliance frameworks explicitly named
- Zero-training-data guarantee prominent
- Audit trail and provenance emphasis

**Content Depth:** 2000+ words (most detailed page)

---

### 8. Company Pages (2 pages)
**Purpose:** About EKAS, founder story, contact
**Examples:** `/about`, `/about/founder`, `/demo`

**Standard Structure:**
- About: Company positioning, what EKAS believes, why it exists
- Founder: Origin story, philosophy, mission
- Demo: Simple form with clear CTA

**Content Principles:**
- Focus on *why* EKAS exists (governed metrics gap)
- Founder page emphasizes philosophy, not biography
- No generic corporate filler
- Clear, opinionated positioning
- Demo form simple and professional

**Content Depth:** 600-800 words (About/Founder), minimal (Demo)

---

## Content Quality Standards

### Writing Principles

#### ✅ REQUIRED
- **Precision:** Specific claims with clear scope
- **Manufacturing Context:** ISA-95, ISO, IATF terminology
- **Technical Credibility:** How things work, not just what they do
- **Commercial Discipline:** Value proposition, not feature list
- **Provenance Focus:** Governed metrics, audit trail, traceability
- **Problem-First:** Address pain before presenting solution

#### ❌ PROHIBITED
- **Plagiarism:** No copying from competitors or reference sites
- **Generic Fluff:** "Unlock insights", "empower teams", "leverage"
- **Unsubstantiated Claims:** No metrics or ROI without source
- **Jargon Without Explanation:** Define or avoid
- **Weak Placeholders:** "Lorem ipsum" or "coming soon" without context
- **Marketing Hyperbole:** "Revolutionary", "game-changing", etc.

---

### Tone and Voice

**Voice Characteristics:**
- **Authoritative:** Manufacturing expertise, not beginner-friendly softness
- **Direct:** Clear statements, minimal preamble
- **Technical:** Not afraid of SQL, versioning, hashing, provenance
- **Opinionated:** Governed metrics are required, not optional
- **Respectful:** Acknowledges manufacturing complexity

**Tone Characteristics:**
- **Serious:** Manufacturing is consequential (safety, finance, audits)
- **Confident:** EKAS knows the problem and the solution
- **Measured:** No overselling, no hype
- **Practical:** Focus on operational reality, not theoretical benefits

**Example Good Tone:**
> "Every metric calculation includes full data provenance: which SQL definition executed, which data source provided the input, how many records were queried, and the UTC timestamp of calculation. Audit trail is automatic, not optional."

**Example Bad Tone:**
> "Unlock powerful insights with our revolutionary AI that empowers your team to leverage real-time data for game-changing operational excellence!"

---

### Visual Design Standards

#### Component Usage

**From EKAS Design System (globals.css):**

**Typography:**
- `text-h1` - Page titles (Rajdhani font)
- `text-h2` - Section headers
- `text-h3` - Subsection headers
- `text-h4` - Card titles
- `text-body-lg` - Hero descriptions
- `text-body-base` - Standard body text
- `text-body-sm` - Secondary text, card bodies
- `text-fine` - Small labels, captions

**Colors:**
- `text-primary-text` - #e0f0ff (main headings)
- `text-secondary-text` - #a0c0d8 (body text)
- `text-muted-text` - #6a7a9a (deemphasized)
- `text-accent` - #00c8ff (links, highlights)

**Components:**
- `premium-card` - Primary content cards
- `section-padding` - Standard vertical spacing
- `container` - Page width constraint
- `btn-primary` - CTA buttons
- `section-label` - Small category labels

**Backgrounds:**
- `rgba(10,14,26,0.92)` - Dark sections
- `rgba(13,22,40,0.62)` - Mid-tone sections
- `rgba(0,200,255,0.04)` - Subtle accent backgrounds

#### Layout Patterns

**Section Alternation:**
```
Hero (dark)
  ↓
Content Section (mid-tone)
  ↓
Content Section (dark)
  ↓
Content Section (mid-tone)
  ↓
CTA (dark/subtle)
```

**Card Grids:**
- 2-column on tablet (`md:grid-cols-2`)
- 3-column on desktop (`lg:grid-cols-3`)
- Consistent gap spacing (`gap-6`)

**Max Widths:**
- Content-focused pages: `max-w-[860px]`
- Card grids: `max-w-[1100px]`
- Hero sections: `max-w-[640px]` (centered)

---

## Page Component Inventory

### Reusable Components

1. **PageShell** (`src/components/layout/PageShell.tsx`)
   - Wraps all pages
   - Includes Navigation, BackgroundAtmosphere, FooterSection
   - Handles demo modal state

2. **DemoRequestModal** (`src/components/modals/DemoRequestModal.tsx`)
   - Form for demo requests
   - Used on every page
   - React Hook Form + Zod validation

3. **Navigation** (`src/components/layout/Navigation.tsx`)
   - Sticky header
   - Mobile menu
   - Active route highlighting

4. **FooterSection** (`src/components/layout/FooterSection.tsx`)
   - 7-column footer
   - 33 links across 7 categories
   - Company info and badges

5. **BackgroundAtmosphere** (`src/components/layout/BackgroundAtmosphere.tsx`)
   - Particle canvas animation
   - Dark premium aesthetic
   - Low-key, not distracting

---

## Content Templates

### Platform Detail Page Template

```tsx
<PageShell>
  {/* Hero */}
  <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
    <div className="container max-w-[860px]">
      <Link href="/platform">← Back to Platform</Link>
      <h1>{Capability Name}</h1>
      <p className="text-body-lg">{Value Proposition}</p>
      <button>Request a Demo</button>
    </div>
  </section>

  {/* What It Is */}
  <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
    <div className="container max-w-[860px]">
      <span className="section-label">What It Is</span>
      <h2>{Conceptual Title}</h2>
      <p>{Explanation paragraph 1}</p>
      <p>{Explanation paragraph 2}</p>
    </div>
  </section>

  {/* Key Features/Metrics */}
  <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
    <div className="container max-w-[1100px]">
      <span className="section-label">Features</span>
      <h2>{Feature Category Title}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {/* Feature cards */}
      </div>
    </div>
  </section>

  {/* How It Works */}
  <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
    <div className="container max-w-[860px]">
      <span className="section-label">How It Works</span>
      <h2>{Process Title}</h2>
      {/* Process steps */}
    </div>
  </section>

  {/* Why It Matters */}
  <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
    <div className="container max-w-[860px]">
      <span className="section-label">Why It Matters</span>
      <h2>{Benefits Title}</h2>
      {/* Benefits list */}
    </div>
  </section>

  {/* CTA */}
  <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
    <div className="container max-w-[640px] text-center">
      <h2>{CTA Title}</h2>
      <p>{CTA Description}</p>
      <button>Request a Demo</button>
    </div>
  </section>
</PageShell>
```

Similar templates exist for Solutions, Roles, and Industries with minor structural variations.

---

## Content Review Checklist

Before marking a page "complete," verify:

### Content Quality
- [ ] Zero plagiarism from competitors
- [ ] 100% EKAS terminology (governed metrics, provenance, grounded)
- [ ] Manufacturing-specific language where appropriate
- [ ] No generic AI filler phrases
- [ ] Claims are either documented or clearly scoped as capabilities
- [ ] Problem-first structure (not feature-first)

### Visual Quality
- [ ] Uses EKAS design system components exclusively
- [ ] No custom styling outside globals.css tokens
- [ ] Section background alternation (dark/mid/dark/mid)
- [ ] Consistent typography hierarchy
- [ ] Proper spacing and max-width constraints
- [ ] Premium dark aesthetic preserved

### Technical Quality
- [ ] Page builds successfully with zero errors
- [ ] All links functional (internal navigation)
- [ ] "use client" directive where needed (interactive components)
- [ ] TypeScript types correct
- [ ] Performance: First Load JS < 200kB

### Navigation Quality
- [ ] Back link functional (detail pages)
- [ ] Footer links point to correct destination
- [ ] Internal links use Next.js Link component
- [ ] CTA buttons trigger demo modal

---

## Approval Status

**Gate 1 Status:** PENDING USER REVIEW

**Questions for User:**
1. Is the page structure and information architecture approved?
2. Are content quality standards sufficient?
3. Should any page families be removed or restructured?
4. Are visual design standards acceptable?

---

**Next Document:** `footer_destination_route_map.md`
