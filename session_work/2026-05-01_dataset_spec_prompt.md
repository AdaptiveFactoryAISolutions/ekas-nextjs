# 2026-05-01 — EKAS Synthesized Dataset Specification

**Branch suggestion:** `feature/synthesized-dataset-spec`
**Working directory:** `/home/pat/EKAS B2B website/ekas-nextjs/` (with read access to `/home/pat/EKAS/` for production schema reference)
**Operating model:** Pat = Operator (final authority), Claude Architect = this prompt's author, Claude Code = executor
**Estimated scope:** Read EKAS production schema, draft one Markdown specification document, commit. **Zero data files are created in this prompt — only the specification.**
**Deploy target:** Not applicable. This is specification work.
**Estimated duration:** 1-2 CC sessions with three halt points for Pat's review.

**Prompt revision:** v1.0 (May 1, 2026)

---

## Purpose

The EKAS platform requires a comprehensive synthesized dataset that serves three purposes simultaneously:

1. **Website prototype data.** TypeScript modules consumed by the Quote Intelligence prototype and subsequent module prototypes (Cost Variance Engine, FMEA Knowledge, Predictive Maintenance, EBITDA Variance), the cross-module Analytics dashboard, and the AI Assistant chat — all rendered client-side in the Next.js website at `/home/pat/EKAS B2B website/ekas-nextjs/`.

2. **Demo system seed data.** SQL/JSON loaded into the production EKAS database when an approved prospect's demo tenant is provisioned. Demo tenants live for 7 days from first login (extendable to 14 max on prospect request) and run the actual EKAS production code against this dataset.

3. **The de facto specification of what EKAS data looks like.** The dataset captures the right entities, the right relationships, the right grain. It serves as a forcing function for ensuring the production data model is internally coherent.

This dataset must be:
- **IP-firewall-clean.** Plausibly any North American Tier 2 precision metal stamping operation. Not based on any specific real shop — explicitly not Pridgeon & Clay or any other identifiable customer.
- **Internally consistent across every dimension.** Every entity that should be related is related. Every record that should have history has history.
- **Authored against the production EKAS schema.** Not against a simplified prototype schema. The dataset is portable to the demo system without translation.
- **Persuasive under unguided exploration.** Sophisticated buyers will navigate anywhere in the demo system; the dataset has to hold up.

This prompt produces **the specification document** — `docs/synthesized_dataset_spec.md` — which describes what the dataset will contain, how it will be structured, what the IP firewall constraints are, and what the consistency rules are. **A subsequent prompt builds the actual data files against the approved specification.**

---

## Why Spec-Before-Build

The full dataset will contain:
- 40-60 machines across 2 facilities
- 8-12 customers (anonymized OEMs and Tier 1s)
- 150-250 active part numbers
- 300-500 quote history records over 24 months
- 24 months of OEE data at machine-shift grain
- Historical downtime events with reason codes
- 80-150 FMEA documents
- Maintenance history at the same time grain
- Cost structure data sufficient for EBITDA bridge analysis

If CC builds all of this in a single pass and then Pat reviews at the end, any structural problem requires rebuilding the entire dataset. By specifying first, Pat reviews structural decisions, then the build prompt produces records within an approved structure. Iteration happens at the level of individual records, not at the level of "the whole dataset is wrong."

---

## Hard Constraints

This prompt is **specification-only**. The following are absolute:

- **Zero seed data files created.** No JSON, no TypeScript constants, no SQL fixtures. Only the specification document in `docs/`.
- **Zero source code changes** in `src/` or any other production code path.
- **Zero deployment.** Documentation work only.
- **IP firewall absolute:** zero references to Pridgeon & Clay, P&C, specific real customer names, specific real machine numbers, specific real FMEA content from any source under copyright. The synthesized fictional company described in this spec must be deliberately constructed as a composite of public industry references — not derived from any specific real shop's operations.
- **No copyrighted content.** AIAG and AIAG-VDA FMEA content is copyrighted. The spec must describe FMEA content as "synthesized in AIAG-VDA 2019 style and structure" — never as direct excerpts from those publications.
- **Schema-faithful.** The spec must reference the actual EKAS production schema. If the production schema and the spec disagree, the production schema wins.

---

## Halt Points

CC halts at each of the following and waits for Pat's explicit go-ahead:

- **HALT-A** — After Step 1 (production schema audit). Confirms what the canonical schema actually is before any spec writing begins.
- **HALT-B** — After Step 4 (entity-by-entity specification draft). Pat reviews the structural decisions before they're finalized.
- **HALT-C** — After Step 6 (full spec document drafted) and before final commit. Pat reviews the complete document.

---

## Step 1 — Production Schema Audit (HALT-A after this step)

Read the EKAS production schema and report what you find. The schema lives in the EKAS production repository, separate from the website repo.

Pat will need to provide CC with read access to the EKAS production code. The expected location is `/home/pat/EKAS/` (the local clone of the production repo). If a different path is used, Pat will provide it.

### 1.1 Schema source files

Locate and inventory:
- Database migration files (typically `migrations/`, `db/migrations/`, or `agent_pipeline/migrations/`)
- ORM model definitions (if any)
- Schema documentation (typically `docs/schema.md` or similar)
- The PostgreSQL schemas in use: `iso22400`, `analytics`, `governance`, etc.

### 1.2 Entity inventory

For each schema in use, list every table and view. For each:
- Schema name and table name
- Primary key column(s)
- Foreign key relationships
- Approximate column count
- Description of the table's purpose if documented

### 1.3 Critical entity deep-read

Deep-read the following tables (these are the dataset's core entities):
- Machines / production foundation tables (likely in `iso22400` schema)
- Shifts / shift calendar (likely `analytics.dim_shift`, `analytics.fact_shift_calendar`, `governance.dim_shift_calendar`)
- Parts / SKUs
- Customers / sites
- Routings / operations
- OEE / production fact tables
- Downtime events (likely `governance.fact_downtime_events` and `governance.dim_downtime_reason`)
- FMEA storage (if a dedicated table or schema exists)
- Quote / RFQ tables (if they exist; if not, note as "to be designed")
- Maintenance history tables (if they exist; if not, note as "to be designed")

For each: report column names, types, foreign key references, and any constraints or check rules.

### 1.4 Schema gaps

Identify any entities that are needed for the prototype modules but **don't exist** in the production schema today. For each gap, propose:
- The new table/columns that would be needed
- Where it would fit in the existing schema structure
- Whether the gap should be filled before the dataset is built (recommended) or worked around in the dataset (not recommended)

This is the most important output of Step 1. The spec depends on knowing the schema; if the schema has gaps, those gaps must be flagged before spec writing begins.

### 1.5 Reference key constants

Re-confirm the EKAS-specific schema constants from the operating context:
- `machine_sk` is the unique machine identifier (NOT `machine_code`)
- `operation_number` requires `::text` cast when joining to VARCHAR columns
- `shift_sk` appears only in `iso22400.production_foundation`
- `shift_key` appears in `analytics.dim_shift`, `analytics.fact_shift_calendar`, `governance.fact_downtime_events`
- `oee_eligible` does NOT exist as a table
- `iso22400.metric_catalog` primary key is `metric_id` (not `kpi_id`)
- `governance.dim_shift_calendar`: 17,688 rows (2025-01-01 to 2027-12-31); buckets DAY=1/SWING=2/NIGHT=3/EXTENDED=4
- `parts_per_stroke` is permanently removed from scope

Report whether the schema as observed conforms to these constants. Flag any divergence.

### Step 1 output

Commit nothing. Report findings to Pat in this format:

```
PRODUCTION SCHEMA AUDIT

Schemas in use: <list>
Total tables/views: <N>

Critical entities present:
  Machines: <table reference>
  Shifts: <table reference>
  Parts: <table reference>
  Customers: <table reference>
  Routings: <table reference>
  OEE / production: <table reference>
  Downtime: <table reference>
  FMEA: <table reference, or "GAP — does not exist">
  Quotes/RFQs: <table reference, or "GAP — does not exist">
  Maintenance history: <table reference, or "GAP — does not exist">

Schema constants verified:
  machine_sk: <PASS/FAIL>
  operation_number cast: <PASS/FAIL>
  shift_sk vs shift_key separation: <PASS/FAIL>
  metric_catalog primary key: <PASS/FAIL>
  governance.dim_shift_calendar row count: <actual count>

Schema gaps identified:
  <list of entities the prototypes need but the schema lacks>

Recommended action on gaps:
  <FILL BEFORE DATASET (recommended) | WORK AROUND IN DATASET (not recommended) | per gap>

PROCEEDING to HALT-A. Awaiting Pat's go-ahead before drafting the dataset spec.
```

---

## Step 2 — Synthesized Company Profile (no halt)

Draft the top-level profile of the fictional company the dataset represents. This is the framing all subsequent entities populate.

The profile must specify:

- **Company name** (fictional, deliberately generic — propose 2-3 options for Pat to choose)
- **Geographic footprint:** 2 facilities — propose 1 in Michigan or another Great Lakes industrial state, 1 in Mexico (consistent with typical Tier 2 footprint). Propose specific city placements that are plausible without identifying any real shop.
- **Annual revenue:** in the $80M-$120M range (Tier 2 territory)
- **Customer mix:** breakdown by anonymized customer category (auto OEM, Tier 1 auto, off-highway equipment, appliance, industrial)
- **Process capability:** mix of progressive die stamping, transfer presses, secondary operations, assembly
- **Workforce:** headcount range, shift structure (likely 3-shift continuous operations)
- **Quality regime:** IATF 16949 certified, ISO 9001, customer-specific qualifications
- **Operational characteristics:** capacity utilization, fleet OEE baseline, scrap rate range — pick numbers that are realistic for healthy Tier 2 operations

Output: a 1-2 page narrative description of the synthesized company. This is the "world-building" pass.

---

## Step 3 — Volume and Granularity Targets (no halt)

Specify the exact volume and grain of each entity type the dataset will contain. This is the contract for the build prompt.

For each entity type below, specify the target count, the grain, and the source-of-truth pattern:

| Entity | Target Count | Grain | Notes |
|---|---|---|---|
| Facilities | 2 | per facility | Michigan + Mexico |
| Machines | 40-60 | per machine | Distribution by facility, by press tonnage range, by age |
| Customers | 8-12 | per customer | Anonymized — Customer A, Customer B, etc. |
| Customer programs | 25-40 | per program | Each customer has 2-5 active programs |
| Active parts in production | 150-250 | per part | Distributed across customer programs |
| Quote history records | 300-500 | per quote | 24 months span; mix of won/lost/in-progress |
| Routings (operation steps) | 600-1,000 | per routing step | ~3-5 ops per active part |
| OEE shift records | ~110,000 | per machine-shift | 50 machines × 24 months × 90 shifts/month avg |
| Downtime events | 8,000-12,000 | per event | Distributed across machine-shift OEE |
| Reason codes used | 80-130 | per code | Subset of full taxonomy |
| FMEAs | 80-150 | per FMEA | Coverage of major part families |
| Maintenance work orders | 1,500-2,500 | per WO | Mix of planned and unplanned |
| Cost burden rates | per machine, per facility | quarterly snapshots | 24 months |

Calibrate these numbers based on what the prototypes actually need. The numbers above are the architect's recommendation; CC may propose adjustments based on what the production schema reveals about realistic record counts.

For each entity, also specify:
- Is the entity deterministic (computed) or hand-curated?
- What's the primary key strategy (synthesized integer IDs, UUIDs, natural keys)?
- What's the relationship pattern to other entities?

---

## Step 4 — Entity-by-Entity Specification (HALT-B after this step)

For each entity in Step 3's volume list, draft the full specification:

### What the spec must include per entity

1. **Schema reference** — the exact production schema and table this entity populates
2. **Column-by-column generation rules** — for every column in the production schema, specify:
   - How the value is generated (literal, derived, randomized within range, drawn from a fixture pool)
   - What the realistic range or distribution is
   - What constraints govern it (referential integrity, check rules, business logic)
3. **Relationship rules** — what other entities this one references, and what the cardinality is
4. **Realism hooks** — what makes this entity authentic to a precision metal stamping shop
5. **IP firewall guards** — specific patterns to avoid that would risk leaking real-shop identity

### Example: Machine entity spec

```
ENTITY: Machine
Production schema: iso22400.machine (verify exact name in audit)
Target count: 40-60

Column generation rules:
- machine_sk (PK): synthesized integer IDs starting at 100, gaps allowed for realism
- machine_name: synthesized — pattern "PRESS-<NNN>-<facility>" or "CELL-<NNN>" for assembly cells
- machine_type: drawn from {progressive_stamping, transfer_press, blanking, secondary_op, assembly_cell, automation_cell}
- press_tonnage: realistic distribution — 100T, 200T, 300T, 400T, 600T, 800T, 1000T, with 200T-400T being most common
- facility_sk: FK to facility
- date_installed: distribution from 1995 to 2024, weighted toward 2005-2015
- nameplate_capacity_uph: realistic distribution by machine type
- status: most ACTIVE, a few INACTIVE for retired equipment

Relationships:
- 1:N to OEE shift records
- 1:N to maintenance work orders
- 1:N to downtime events (via shift records)
- N:M to parts (via routings)

Realism hooks:
- A few machines have detailed nicknames in their machine_name suggesting plant-floor culture (e.g., "PRESS-401-OldBetsy") — adds authenticity
- One or two machines flagged as "scheduled for replacement" status

IP firewall guards:
- No machine numbers in the 322, 309, 344, 919, 2519, 2571 series (these are flagged as P&C-related in operator memory)
- No machine names that include "Pridgeon," "Clay," "P&C," or any specific real shop's naming convention
- Naming pattern PRESS-<NNN> is generic enough to be unidentifiable
```

### Entities that require special attention

**FMEA entity.** Copyright concern. The spec must explicitly state that FMEA content is "synthesized in AIAG-VDA 2019 structural style" — using the standard FMEA columns (function, failure mode, effect, severity, occurrence, detection, RPN, recommended action) but with deliberately generic content. No verbatim excerpts from any AIAG publication. The synthesized FMEAs cover stamping process failure modes that are documented in publicly-available stamping industry literature and are not specific to any real shop's actual FMEA library.

**Quote / RFQ entity.** If the production schema has a gap here (no quote tables exist yet), the spec must identify what the quote entity needs to look like and propose schema additions. The quote entity needs columns for: customer, part description, RFQ date, target volume, target launch date, material spec, quoted price, quote status (in-progress, won, lost), actual outcome (margin if won, reason if lost), routing reference.

**Customer entity.** Highest IP firewall risk. Customer names must be deliberately generic: "Customer A," "Customer B," with descriptors like "North American auto OEM" or "European-headquartered Tier 1 supplier." No real customer names. No identifiable program names. The "Off-highway Equipment Mfr" descriptor cannot be specific enough to identify Caterpillar or John Deere — use "diversified industrial OEM" instead.

**Cost burden rate entity.** Cost data is sensitive. Burden rates should be in a believable but not specific range. Avoid burden rates that map to publicly-known stamping industry benchmarks for any specific shop. Wide ranges with synthesized noise are better than precise numbers.

### Step 4 output

No commit. Show the entity-by-entity spec to Pat in this format:

```
ENTITY SPECIFICATIONS COMPLETE

Entities specified: <N>
  <list with line counts>

Schema gaps requiring resolution:
  <list, with proposed schema additions>

IP firewall risk areas highlighted:
  - FMEA content authoring guardrails: <bullet summary>
  - Customer naming conventions: <bullet summary>
  - Machine numbering avoidances: <bullet summary>
  - Cost data ranges: <bullet summary>

Open questions for Pat:
  <list of decisions Pat needs to make>

PROCEEDING to HALT-B. Awaiting Pat's review before finalizing the spec document.
```

---

## Step 5 — Consistency Rules Cross-Cut (no halt)

Once entities are individually specified, define the cross-entity consistency rules. The dataset has to be deeply consistent — every entity that should be related is related, every record that should have history has history.

Examples of consistency rules:

- Every active part has at least one routing
- Every routing references machines that exist in the machine entity
- Every quote-won record produces actuals in the OEE history
- Every customer program has at least 2 active parts
- Every machine has at least 90 days of OEE shift records
- Every machine with maintenance work orders has corresponding downtime events
- FMEA coverage: every "high-volume" part has an FMEA; medium-volume parts have ~70% FMEA coverage; low-volume parts have ~30% FMEA coverage (matches realistic shop maturity)
- Every "lost quote" has a documented reason code drawn from a realistic taxonomy

The spec must include a "Consistency Checks" section that the build prompt will reference. After data is generated, these checks become validation queries that must pass before the dataset is considered complete.

---

## Step 6 — Adapter Architecture Specification (no halt)

Specify the two consumption patterns:

### 6.1 Website prototype consumption

The dataset is consumed as TypeScript modules in the Next.js website. Specify:

- Directory structure: `src/seed-data/<entity>.ts` per entity
- Strong typing: every entity has a TypeScript interface that matches the production schema column types
- Index file: `src/seed-data/index.ts` exports the full dataset
- Adapter functions: `getCurrentTenantData()`, `getMachineHistory(machine_sk)`, etc. — query helpers used by prototype components

### 6.2 Demo system consumption

The dataset is loaded into the production EKAS database when a demo tenant is provisioned. Specify:

- Source format: canonical JSON files in `seed-data-canonical/<entity>.json` (separate from the TypeScript modules — this is the source of truth)
- Loader script reference: a Python or SQL script in the EKAS production repo that loads the JSON into a fresh tenant scope
- Tenant cloning behavior: each demo tenant gets a freshly-cloned copy of the dataset with tenant_id rewritten to the new tenant
- Demo lifecycle: 7 days from first login, extendable to 14 max on prospect request, hard expiration after that

### 6.3 Single source of truth

The canonical JSON files are the source of truth. The TypeScript modules are derived from them via a build script. If the canonical JSON changes, the TypeScript modules regenerate. The website prototypes never edit TypeScript modules directly — they edit the canonical JSON.

The build script is out of scope for this prompt (separate workstream). The spec just commits to the architecture.

---

## Step 7 — Draft Final Specification Document (HALT-C after this step)

Assemble Steps 2-6 into the final specification document at `docs/synthesized_dataset_spec.md`.

The document structure:

1. Purpose and scope
2. The synthesized company profile (Step 2)
3. Volume and granularity targets (Step 3)
4. Entity-by-entity specifications (Step 4) — the bulk of the document
5. Cross-entity consistency rules (Step 5)
6. Adapter architecture (Step 6)
7. IP firewall constraints (consolidated from across the document)
8. Open questions and assumptions
9. Reference to the production schema audit findings (Step 1)

### Step 7 output

No commit yet. Show the complete spec to Pat in this format:

```
FINAL SPECIFICATION DRAFT COMPLETE

Document: docs/synthesized_dataset_spec.md
Total length: <N> lines / <N> words

Section 1 — Purpose and scope: <bullet summary>
Section 2 — Company profile: <bullet summary>
Section 3 — Volume targets: <table summary>
Section 4 — Entity specs: <N entities specified>
Section 5 — Consistency rules: <N rules>
Section 6 — Adapter architecture: <bullet summary>
Section 7 — IP firewall: <bullet summary>
Section 8 — Open questions: <N items>
Section 9 — Schema audit reference: <linked>

PROCEEDING to HALT-C. Awaiting Pat's final review before commit.
```

---

## Step 8 — Commit (after HALT-C approval)

Once Pat approves, commit:

```bash
git add docs/synthesized_dataset_spec.md
git commit -m "docs: synthesized dataset specification

Specifies the comprehensive synthesized dataset that serves both website
prototype consumption (TypeScript modules in src/seed-data/) and demo
system seed data (canonical JSON loaded per tenant into the production
EKAS database when a prospect's demo environment is provisioned).

Specifies entities, volumes, generation rules, cross-entity consistency
rules, adapter architecture, and IP firewall guardrails.

This document is specification only — no data files are created in this
commit. The dataset itself will be built in a subsequent prompt against
the approved spec.

Refs: 2026-05-01_dataset_spec_prompt.md"
```

Do not push.

Report to Pat:

```
COMMIT COMPLETE

Commit hash: <hash>
Files changed: 1
  + docs/synthesized_dataset_spec.md (<N> lines)

No source code changed. No data files created. No deploy triggered.

Branch is ready for Pat's review and push.

NEXT WORKSTREAM: a follow-up prompt builds the actual dataset against
this spec. That prompt will be authored separately and will reference
this spec as its primary input.

WORK COMPLETE.
```

---

## Failure Modes (How CC Should Handle Them)

**If the production schema cannot be located:** HALT and report. Pat needs to provide the path to the EKAS production repo.

**If the production schema has significant gaps:** Document the gaps in the schema audit. Recommend the gaps be filled before the dataset is built. Pat may decide to extend the schema first, or proceed with workarounds. Either path is acceptable as long as it's documented.

**If the schema constants from operator memory don't match the audited schema:** This is important. Report the divergence. The audited schema is canonical, but the divergence may indicate a stale memory entry that needs updating.

**If a spec section requires a Pat decision (e.g., company name choice):** Surface the decision in the "Open questions" section of the document and in the HALT-B report. Do not make consequential decisions unilaterally.

**If the dataset volume targets seem too high or too low:** Propose adjustments with rationale. The target counts in this prompt are starting points, not fixed values.

**If git status shows uncommitted changes at start of work:** HALT and report.

---

## Out of Scope for This Prompt

- Building any data files (separate prompt)
- Building the canonical-JSON-to-TypeScript adapter (separate workstream)
- Building the demo system tenant provisioning infrastructure (separate workstream)
- Building any prototype module (separate workstream)
- Deciding which prototype is built first (already decided: Quote Intelligence)
- Schema changes to the production EKAS repo (out of scope; flag gaps but do not modify)

---

## Operator Note for CC

This specification is the foundation for every prototype build that follows. Sloppy specification produces sloppy data. Take the time to make every entity spec testable: every column rule should be specific enough that a build prompt knows exactly what to generate.

The IP firewall constraints are not aspirational. They are absolute. When in doubt about whether a synthesized detail might be traceable to a real shop, choose the more generic option. The dataset will be navigated by sophisticated buyers in the demo system; subtle leaks will be noticed and create commercial liability.

The single most consequential decision in this spec is what entities exist and what their relationships are. Once those are locked, generation rules can iterate. If structural decisions are wrong, the dataset has to be rebuilt. Spend the deliberation budget on Sections 3-5; Sections 7-9 are mostly mechanical.
