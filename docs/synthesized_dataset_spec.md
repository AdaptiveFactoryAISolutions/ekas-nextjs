# EKAS Synthesized Dataset Specification

**Status:** Draft v0.1 (HALT-B working draft, 2026-05-01)
**Owner:** Patrick Clay
**Companion to / extends:** `/home/pat/AdaptiveFactory-Production/docs/REF-001_Reference_Dataset_Specification.md` v1.0

---

## Framing

This specification is a **layered extension of REF-001 v1.0**, covering the commercial-relationship and quote-intelligence entities that REF-001 deliberately scopes out, with an explicit precision-stamping configuration overlay on the REF-001 generic-discrete-manufacturing base.

REF-001 defines the manufacturing-operations core (machines, parts, shifts, OEE, downtime, work orders, maintenance) at 80 machines / 11 work centers / 400 parts / 24 months / 6 process types in a generic discrete manufacturing positioning. Per REF-001 § 2 the generic positioning is canonical: "Layered industry-specific demo scripts can be built on top later for PMA/FABTECH audiences; reverse is not possible."

This spec adds:
- The commercial-relationship layer: customer programs, quotes/RFQs (gap), routing templates (gap), burden rate snapshots (gap), FMEA library (gap)
- A precision-stamping **configuration overlay** that names machines, customers, routings, and FMEA content in stamping-industry vernacular for the precision-stamping demo audience

The architectural rule: **structural decisions are configuration-agnostic; configuration overlays are discrete and replaceable.** A future CNC-heavy or assembly-heavy configuration can be added without changing the structural spec.

---

## 1. Purpose and Scope

This dataset serves three purposes:

1. **Website prototype data** — TypeScript modules consumed by the Next.js website (`/home/pat/EKAS B2B website/ekas-nextjs/`) for the Quote Intelligence prototype and subsequent module prototypes
2. **Demo system seed data** — canonical JSON loaded into the production EKAS database when an approved prospect's demo tenant is provisioned
3. **De facto specification of EKAS data shape** — forcing function for production schema coherence

Out of scope of THIS spec:
- The data files themselves (subsequent build prompt)
- The canonical-JSON-to-TypeScript adapter (separate workstream)
- Demo system tenant provisioning infrastructure (separate workstream)
- Production schema migrations to fill the gaps identified here (treated as completed assumption per Clarification 3 — generation rules reference proposed columns directly)

---

## 2. Synthesized Company Profile

### 2.1 Base — Generic Discrete Manufacturer (per REF-001 positioning)

The base profile is what REF-001 specifies and any configuration overlay inherits:

- **Company type:** Privately-held mid-market discrete manufacturer
- **Annual revenue:** $80M–$120M (Tier 2 territory)
- **Sites:** 2 (one US-based, one Mexico-based)
- **Workcenters:** 11 (per REF-001 § 3)
- **Machines:** 80 across 6 process types (stamping, CNC, welding, assembly, paint, QA — per REF-001 § 2 process mix)
- **Active parts:** 400 distributed across customer programs
- **Workforce:** ~500 employees, three crews of ~120 operators, 3-shift continuous operations Monday–Friday with selective Saturday OT
- **Quality regime:** IATF 16949 certified, ISO 9001:2015, automotive customer-specific qualifications (PPAP submissions, customer audit cadence)
- **Operational baseline:** Fleet OEE in the 68–78% range (REF-001 calibration), scrap rate 1.8–4.2% by part family, on-time-delivery 92–97%

### 2.2 Precision-Stamping Configuration Overlay

When the dataset is configured for the precision-stamping demo audience (PMA, FABTECH, automotive supply chain prospects), the following overlays apply on top of the base:

- **Process mix emphasis** (still inheriting REF-001's 6 process types, but with precision-stamping flavor in machine naming and routing emphasis):
  - Stamping/Press machines weighted toward progressive die operations (the 18 stamping machines REF-001 specifies). Emphasis on 200–400 ton presses with some 600–1000 ton heavy presses.
  - Transfer presses, blanking presses, and secondary operations explicitly distinguished in machine_type
  - Assembly stations (REF-001's 20) framed as automotive component assembly cells
- **Customer mix** (anonymized descriptors leaning automotive/industrial):
  - North American auto OEMs (2–3): "Customer A — North American Auto OEM (Detroit-Three)", "Customer C — North American Auto OEM (transplant)"
  - European-headquartered Tier 1 suppliers (2): "Customer B — European-Headquartered Tier 1 (auto)", "Customer F — European-Headquartered Tier 1 (auto, electrification focus)"
  - Diversified industrial OEMs (2): "Customer D — Diversified Industrial OEM (off-highway)", "Customer G — Diversified Industrial OEM (commercial vehicle)"
  - Appliance manufacturer (1): "Customer E — Major Appliance Manufacturer"
  - Other industrial (1–2): "Customer H — HVAC Component Manufacturer"
- **Workforce framing:** unionized Michigan-area workforce at the US site, non-union at the Mexico site, IATF-aligned quality engineering team, dedicated tooling engineering function
- **Quality regime emphasis:** customer-specific quality requirements typical of automotive Tier 2 (PPAP Level 3 standard, customer corrective action tracking, quarterly business reviews with major OEM customers)
- **Operational characteristics:** chronic capacity pressure on 3-shift presses, characteristic stamping-industry margin compression on multi-year contracts, multi-customer machine sharing (machines run multiple parts across customer programs)

### 2.3 Geographic Footprint (locked at HALT-B)

**US site:** **Toledo / Northwest Ohio industrial corridor** (selected at HALT-B). Site descriptor in dataset: `site_code = "US-1"`, `site_name = "Northwest Ohio Operations"`. The specific suburb or street address is not encoded — the descriptor is broad enough to include dozens of plausible shops in the corridor while preserving Great Lakes industrial framing and reasonable fingerprinting margin.

**Mexico site:** **Bajío region** (selected at HALT-B). Site descriptor in dataset: `site_code = "MX-1"`, `site_name = "Bajío Operations"`. Specific city (Guanajuato, Querétaro, San Luis Potosí, etc.) is not encoded — the region hosts many similar shops, so fingerprinting risk is low at the regional level.

Decision recorded: Grand Rapids forbidden per IP firewall (`database/synthetic/verify_ip_firewall.py`).

Alternative city options considered at HALT-B (Detroit metro suburb, Cleveland-area suburb) are documented in § 8 should reconfiguration be needed for a future demo audience.

### 2.4 Naming and Identity Conventions (locked at HALT-B)

- **Company name:** **Northstar Precision Manufacturing** (selected at HALT-B). The "Northstar" framing is geographically broad enough for any Great Lakes location; "Precision Manufacturing" preserves REF-001's generic-discrete positioning while supporting the precision-stamping configuration overlay.
- **Site descriptors in the dataset** (per § 2.3): site_code `US-1` + site_name `Northwest Ohio Operations`; site_code `MX-1` + site_name `Bajío Operations`. Site descriptors do not embed the company name, so a future configuration could rename the company without rewriting site data.
- **Forbidden terms (per IP firewall, canonical from `database/synthetic/verify_ip_firewall.py`):** `Pridgeon`, `P&C`, `Grand Rapids`, `site_business_id 1000`, machine codes `309/322/327/335/344`. Forbidden across all entity values, all comments in seed files, all column descriptions, all configuration files. Section 7 consolidates the operational checklist.

---

## 3. Volume and Granularity Targets

### 3.1 Inherited from REF-001 (base layer)

| Entity | REF-001 target | Grain | Notes |
|---|---|---|---|
| Sites | 2 | per site | Inherits REF-001 § 3 |
| Work centers | 11 | per work center | Inherits REF-001 § 3 |
| Machines | 80 | per machine | Inherits REF-001 § 3 distribution: 18 stamping / 16 CNC / 12 welding / 20 assembly / 8 paint-finishing / 6 QA-inspection |
| Active parts | 400 | per part | Inherits REF-001 § 3 |
| Shifts | 3 | per shift definition | Day / Afternoon / Night per REF-001 § 5 |
| Shift calendar rows | ~17,688 | per (date, shift) | Per REF-001 § 4.1; 24 months × 3 shifts |
| Operators | 120 | per operator | REF-001 § 3 (demo persona layer) |
| OEE / production records | per machine × shift × part × date | per record | Computed from REF-001 § 3 generation parameters |
| Downtime events | per machine × event | per event | REF-001 § 4.2 |
| Work orders | ~8,000 | per WO | REF-001 § 3 |
| PM compliance events | per task × occurrence | per event | REF-001 § 4.2 |
| Maintenance cost | per machine × month × category | per record | REF-001 § 4.2 |
| History depth | 24 months | 2024-05-01 → 2026-04-30 | REF-001 § 3 |

### 3.2 New entities specified by THIS spec (extension layer)

| Entity | Target Count | Grain | Schema home (per Clarification: extend existing) |
|---|---|---|---|
| Customers | 8–12 (precision-stamping config: 9) | per customer | `erp.customer` (existing — populate with synthesized rows) |
| Customer programs | 25–40 (precision-stamping config: 30) | per program | `erp.dim_customer_program` (NEW gap entity) |
| Quote / RFQ records | 300–500 (precision-stamping config: 400) | per quote | `erp.fact_quote` (NEW gap entity) |
| Routing templates | one per active part = 400 | per part | `mfg.dim_routing_template` (NEW gap entity) |
| Routing steps (operations within routings) | 800–1,400 (3–5 ops per routing × 400 routings) | per (routing × operation) | `mfg.bridge_part_routing_step` (NEW gap entity) |
| FMEA documents | 80–150 (precision-stamping config: 100) | per FMEA | `governance.dim_fmea_document` (NEW gap entity) |
| FMEA failure modes | 600–1,500 (typically 6–15 per FMEA) | per failure mode | `governance.fact_fmea_failure_mode` (NEW gap entity) |
| Burden rate snapshots | 80 machines × 8 quarters = 640 | per (machine × quarter) | `mfg.fact_burden_rate_snapshot` (NEW gap entity) |
| Reason codes used | 80–130 of full taxonomy | per code | `governance.dim_failure_taxonomy` (existing — populate subset) |

### 3.3 Calibration note

Volume targets revised upward from the prompt's original 40-60 machines / 150-250 parts / 300-500 quotes to align with REF-001's 80/400 base. The revised volumes:
- Quotes scaled to 300–500 (independent of part count — multiple quotes per active part over 24 months, plus quotes that didn't win)
- FMEAs scaled to 80–150 (covers ~25–35% of the 400 active parts at full FMEA depth, with high-volume parts covered most thoroughly)
- Routing steps scaled to 800–1,400 (3–5 ops per part × 400 parts; precision-stamping configuration uses 3-op average since progressive die stamps + secondary op + assembly is a typical routing)
- Burden rate snapshots scaled to 640 (80 machines × 8 quarters of 24-month history)

---

## 4. Entity-by-Entity Specifications

This section describes the structural contract for every entity. **Configuration-specific generation rules** are called out separately under each entity where they differ from generic.

### 4.1 Inherited entities (no re-spec needed; reference REF-001)

The following entities inherit their structure unchanged from REF-001 § 4. Generation rules for these entities are REF-001's responsibility; this spec specifies only configuration overlays:

- `analytics.dim_site` — REF-001 § 4.1
- `analytics.dim_work_center` — REF-001 § 4.1
- `analytics.dim_machine` — REF-001 § 4.1
- `analytics.dim_part` — REF-001 § 4.1
- `analytics.dim_shift` — REF-001 § 4.1
- `analytics.dim_operation` — REF-001 § 4.1 (with `operation_number::text` cast convention)
- `analytics.dim_downtime_reason` — REF-001 § 4.1
- `analytics.dim_shift_calendar` — REF-001 § 4.1 (canonical location; the operator-memory reference to `governance.dim_shift_calendar` is location drift)
- `mfg.fact_production` — REF-001 § 4.2
- `mfg.fact_downtime` — REF-001 § 4.2
- `mfg.fact_quality` — REF-001 § 4.2
- `mfg.fact_work_order` — REF-001 § 4.2
- `mfg.fact_pm_compliance` — REF-001 § 4.2
- `mfg.fact_maintenance_cost` — REF-001 § 4.2

#### Configuration overlays for inherited entities

**`analytics.dim_machine` — precision-stamping overlay:**
- `machine_code` pattern for the 18 stamping/press machines: `{site}-PRESS-{NNN}` (e.g., "US1-PRESS-101"), with NNN from a non-protected pool (excludes 309/322/327/335/344). Recommended pool: 100–199 for US site progressive dies, 200–299 for US site transfer presses, 300–399 for US site secondary ops (excluding the 309/322/327/335/344 codes), 400–499 for assembly cells, 500+ for Mexico site equivalents.
- `machine_name` for stamping machines: descriptive plant-floor names such as "North Press Line 1", "Heavy Press Bay", "Transfer Press 2"; small share (~3 of 80) get plant-floor nicknames suggesting culture (e.g., "Big Bertha", "Old Reliable") for realism without identifying any specific shop's actual nicknames.
- `machine_type` enum values: `progressive_stamping`, `transfer_press`, `blanking_press`, `secondary_op`, `cnc_machining`, `welding_cell`, `assembly_cell`, `paint_finishing`, `qa_inspection` (extends REF-001's process_type categorization with stamping subdivisions).
- `nameplate_rate_per_hour`: distribution per machine type — progressive stamping 600–2,400 strokes/hr (note: rate, not parts; parts depend on die), CNC 8–40 cycles/hr, welding 30–180 cycles/hr, assembly 60–600 cycles/hr.
- IP firewall guard: never use machine codes 309, 322, 327, 335, 344. Never use machine names referencing "Pridgeon", "Clay", "P&C", "Grand Rapids", or any specific known stamping-shop named piece of equipment.

**`analytics.dim_part` — precision-stamping overlay:**
- `part_code` pattern: synthesized with prefix indicating part family — `BRKT-####` (brackets), `RNFR-####` (reinforcements), `PNL-####` (panels), `BSE-####` (base plates), `CLP-####` (clips/clamps), `HSG-####` (housings), `STMP-####` (generic stamped components). 4-digit numeric portion drawn from a wide range with gaps for realism (no leading-zeros consistency required).
- `part_name`: descriptive technical names such as "Reinforcement, Front Bumper, Inner", "Bracket, Engine Mount, RH"; never include OEM-specific program names.
- `part_family`: aligned with `part_code` prefix (Bracket, Reinforcement, Panel, Base, Clip, Housing, Generic Stamping). Used for FMEA coverage rules and burden rate calibration.
- IP firewall guard: never include OEM program names (e.g., never "F-150 frame bracket" or "RAM tailgate hinge"). Use functional descriptors only.

**`analytics.dim_downtime_reason` — precision-stamping overlay:**
- Subset of REF-001's reason taxonomy emphasizing stamping-process failure modes: tooling change, die wear, material misfeed, press fault, hydraulic fault, sensor fault, air supply, scrap removal, planned PM, planned changeover, unplanned mechanical, unplanned electrical, quality hold, material shortage, operator-related (PPE/safety reasons), shift handoff, end-of-run cleanout. ~80–130 reason codes total drawn from this taxonomy; some codes used heavily, some used once or twice for realism.

### 4.2 New entity — Customer (extending existing `erp.customer`)

**Schema home:** `erp.customer` (existing table — populate with 9 synthesized rows; no migration needed)

**Existing column generation rules:**
- `customer_id`: synthesized integer IDs starting at 1001, gaps allowed (1001, 1003, 1004, 1006, 1007, 1009, 1010, 1012, 1014). **Forbidden value: 1000** (per IP firewall).
- `customer_code`: `CUST-A`, `CUST-B`, ..., `CUST-I` (9 customers in precision-stamping config) — explicitly anonymized
- `customer_name`: descriptive anonymized names — "Customer A — North American Auto OEM (Detroit-Three)", "Customer B — European-Headquartered Tier 1 (auto)", etc. (per § 2.2 customer mix)
- `customer_type`: enum drawn from {`auto_oem_north_american`, `auto_oem_european`, `auto_tier1`, `industrial_oem_diversified`, `appliance_oem`, `commercial_vehicle_oem`, `hvac_oem`, `general_industrial`}
- `country_code`: USA / MEX / DEU / JPN / KOR per customer headquarters
- `credit_limit`: $5M–$50M range, scaled to customer revenue/program-volume implied by the customer descriptor
- `is_active`: 8 of 9 customers ACTIVE; 1 customer INACTIVE for realism (a wound-down program)
- `created_at`: distributed across 2018–2024 to imply customer relationships of varying tenure

**IP firewall guards:**
- Never use real OEM names (no Ford/GM/Stellantis/Toyota/Honda/etc.)
- Never use real Tier 1 names (no Magna/Adient/Aisin/Bosch/etc.)
- Customer descriptors must be generic enough that the universe of "North American Auto OEM (Detroit-Three)" includes 3+ candidates (Ford, GM, Stellantis) — never narrow to a single identifiable customer
- The "Off-highway Equipment Mfr" descriptor would narrow toward Caterpillar/John Deere — instead use "diversified industrial OEM (off-highway)" which includes those plus Kubota, Volvo, Komatsu, etc.

### 4.3 New entity — Customer Program (NEW gap entity, GAP 2)

**Schema home:** `erp.dim_customer_program` (new table — gap migration assumed completed)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| program_sk | bigint PK | Surrogate key |
| program_id | text UNIQUE | Business code, e.g., "PROG-A-1" |
| customer_id | integer FK | References `erp.customer.customer_id` |
| program_name | text | Descriptive, e.g., "Customer A Compact SUV Floor Pan Reinforcements" |
| program_status | text | Enum: `active`, `launching`, `EOP`, `wound_down` |
| launch_date | date | When SOP started (or planned) |
| end_of_production_date | date | Planned EOP, NULL if open-ended |
| annual_volume_target | integer | Combined target across all parts in the program |
| contract_price_down_pct | numeric(5,2) | Annual price-down rate (e.g., 2.50, 3.00, 3.50) |
| created_at | timestamptz | |

**Generation rules:**
- 30 programs (precision-stamping config) distributed across 8 active customers (each customer has 2–5 active programs)
- `program_id` pattern: `PROG-{customer_letter}-{N}` (e.g., PROG-A-1, PROG-A-2, PROG-B-1, ...)
- `program_status`: 22 active, 4 launching, 3 EOP, 1 wound_down (matches realistic Tier 2 portfolio mix)
- `launch_date`: distributed 2018–2026 with newer launches concentrated 2024–2026
- `contract_price_down_pct`: typical automotive 2.0–3.5%, industrial OEM 1.0–2.5%, appliance 1.5–3.0%; realistic distribution
- `annual_volume_target`: scaled by customer type — auto OEM programs 200K–2M units/year, industrial OEM programs 50K–500K units/year, appliance 100K–1M units/year

**Relationship rules:**
- Many parts (~13 average per program) belong to one program; a part belongs to exactly one program at a time
- Many quotes reference one program (a quote is FOR a part being added to a program, OR for a re-source of an existing part)
- Programs are referenced by `analytics.dim_part` via a new `program_sk` FK (extension to dim_part assumed complete)

**Configuration overlays:**
- Precision-stamping configuration uses program_name patterns referencing automotive/industrial vehicle programs in deliberately generic terms ("Compact SUV Floor Pan", "Pickup Truck Reinforcement Family", "Off-Highway Frame Components", "Electric Crossover Battery Tray") — never specific real OEM program names

**IP firewall guards:**
- Never use real OEM program names (no "F-150 platform", "RAM 1500 program", "Silverado HD program", etc.)
- Never use real-shop-specific program codes
- Vehicle descriptors generic enough to include 3+ real programs

### 4.4 New entity — Quote / RFQ (NEW gap entity, GAP 1)

**Schema home:** `erp.fact_quote` (new table — gap migration assumed completed)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| quote_sk | bigint PK | Surrogate |
| quote_id | text UNIQUE | Business code, e.g., "Q-2024-0142" |
| customer_id | integer FK | References `erp.customer.customer_id` |
| program_sk | bigint FK | References `erp.dim_customer_program.program_sk`; NULL if speculative quote |
| part_code | text | May reference an existing or new part |
| rfq_received_date | date | When the RFQ landed |
| quote_submitted_date | date | When quote went out (NULL if still in progress) |
| target_annual_volume | integer | Volume the customer projects |
| target_launch_date | date | Customer's planned SOP for the part |
| material_spec | text | E.g., "HSLA Grade 50, 1.6mm" |
| quoted_unit_price_usd | numeric(18,4) | Unit price in the quote |
| quoted_tooling_cost_usd | numeric(18,2) | One-time tooling cost |
| total_quoted_value_usd | numeric(18,2) | unit_price × target_annual_volume × estimated_program_years |
| quote_status | text | Enum: `in_progress`, `submitted`, `won`, `lost`, `expired`, `withdrawn` |
| won_date | date | NULL if not won |
| lost_date | date | NULL if not lost |
| lost_reason_code | text | Enum: `price`, `capacity`, `quality_concern`, `relationship`, `incumbent_retained`, `program_cancelled`, `other`; NULL if not lost |
| competitor_price_usd | numeric(18,4) | Competitor's price when known (typically only on losses); NULL otherwise |
| routing_id | bigint FK | References `mfg.dim_routing_template.routing_sk` |
| quoted_margin_pct | numeric(5,2) | Estimated margin at quote time |
| created_at | timestamptz | |

**Generation rules (precision-stamping configuration, 400 records over 24 months):**
- Status distribution: 220 won, 130 lost, 30 in_progress, 15 expired, 5 withdrawn
- Won quotes: lost_date NULL, won_date populated, lost_reason_code NULL
- Lost quotes: won_date NULL, lost_date populated, lost_reason_code populated, competitor_price populated ~60% of the time (the customer rarely shares competitor prices with losers, but sometimes does in the post-loss debrief)
- Quoted prices: scaled by part complexity (calculated from routing) and material spec
- Quoted margin distribution: 14–22% on won quotes, 8–18% on lost quotes (suggesting some lost quotes were lost on price even when margin was thin)
- `quoted_tooling_cost_usd`: $20K–$500K depending on die complexity tier (T1 simple → T5 complex multi-stage progressive)
- 24-month distribution: ~17 quotes/month on average, with realistic seasonality (slower around major OEM annual shutdowns Dec–Jan and July)

**Relationship rules:**
- Each quote references exactly one customer and at most one program (NULL allowed for speculative quotes)
- Each quote that wins should produce at least one part in `analytics.dim_part` and corresponding `mfg.fact_production` rows beginning around `won_date + 90 days` (typical PPAP-to-SOP timing); enforced by consistency rule § 5
- Each quote references exactly one routing template

**Configuration overlays:**
- Precision-stamping configuration: `material_spec` heavily references stamping-relevant materials — HSLA grades 50/60/80, DP590/780/980 dual-phase, mild steel CRS grades, CRS 1006/1008/1010, aluminum 5754/6111, stainless 304/430 for select trim parts

**IP firewall guards:**
- Quoted prices in realistic but range-based patterns; no quoted price that maps to a publicly-known stamping-industry benchmark for a specific OEM program
- Never reference specific real RFQ events or named program launches
- Quote IDs synthesized; not derived from any real shop's quote numbering convention

### 4.5 New entity — Routing Template (NEW gap entity, GAP 5)

**Schema home:** `mfg.dim_routing_template` (new table — gap migration assumed completed; per Pat's refinement, mfg schema not analytics)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| routing_sk | bigint PK | Surrogate |
| routing_id | text UNIQUE | Business code, e.g., "RT-BRKT-0042-R1" |
| part_sk | bigint FK | References `analytics.dim_part.part_sk` |
| routing_revision | integer | 1 for initial, increments on engineering changes |
| status | text | Enum: `active`, `superseded`, `draft` |
| effective_from | date | |
| effective_to | date | NULL for current |
| total_estimated_cycle_seconds | numeric | Sum across all routing steps |
| die_complexity_tier | text | Enum: `T1`, `T2`, `T3`, `T4`, `T5` (REF-001 conventions for tooling complexity) |
| created_at | timestamptz | |

**Generation rules:**
- 400 routing templates (one per active part); ~5% of parts have a superseded prior revision for realism
- `die_complexity_tier`: distribution 15% T1 (simple blank), 30% T2, 30% T3, 20% T4, 5% T5 (highly complex multi-stage progressive)
- `total_estimated_cycle_seconds`: 2–25 sec for stamping-only routings, 30–180 sec for routings with secondary ops or assembly steps

### 4.6 New entity — Routing Step bridge (NEW gap entity, GAP 5 part 2)

**Schema home:** `mfg.bridge_part_routing_step` (new table — gap migration assumed completed)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| routing_step_sk | bigint PK | Surrogate |
| routing_sk | bigint FK | References `mfg.dim_routing_template` |
| sequence_number | integer | Order within the routing (10, 20, 30, ...) |
| operation_number | integer | Joins to `analytics.dim_operation` via `::text` cast |
| machine_type_required | text | Enum from `dim_machine.machine_type` |
| ideal_cycle_seconds_at_step | numeric | Step-specific cycle time |
| setup_minutes_at_step | numeric | Step setup time |
| scrap_allowance_pct | numeric(5,2) | Expected scrap at this step |

**Generation rules:**
- 800–1,400 routing steps (3–5 steps per routing template × 400 routings; precision-stamping configuration averages 3.2 steps because progressive die stamps + secondary op + occasional assembly is typical)
- `sequence_number`: 10, 20, 30, ... convention (allows insertion gaps)

### 4.7 New entity — FMEA Document (NEW gap entity, GAP 3 part 1)

**Schema home:** `governance.dim_fmea_document` (new table — gap migration assumed completed; governance schema home per Pat's refinement)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| fmea_sk | bigint PK | Surrogate |
| fmea_id | text UNIQUE | Business code, e.g., "FMEA-BRKT-0042" |
| part_family | text | OR the specific part_sk if part-level |
| process_or_design | text | Enum: `process_FMEA`, `design_FMEA`; for stamping configuration, mostly process |
| fmea_revision | integer | |
| revision_date | date | |
| status | text | Enum: `draft`, `approved`, `under_review`, `superseded` |
| document_owner_role | text | Enum role (synthesized — never a real person's name): "Quality Engineer", "Process Engineer", "Tooling Engineer" |
| aiag_vda_version | text | "AIAG-VDA 2019" (the structural standard followed) |
| created_at | timestamptz | |

**Generation rules (precision-stamping configuration, 100 FMEAs):**
- Coverage rule: every "high-volume" part family has a process FMEA (high-volume = top 30% by quoted annual volume); medium-volume part families have ~70% FMEA coverage; low-volume part families have ~30% FMEA coverage
- 95 process FMEAs, 5 design FMEAs (representative — some shops do limited design FMEA work for design-controlled parts)
- Status distribution: 80 approved, 12 under_review, 6 draft, 2 superseded

### 4.8 New entity — FMEA Failure Mode (NEW gap entity, GAP 3 part 2)

**Schema home:** `governance.fact_fmea_failure_mode` (new table — gap migration assumed completed)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| failure_mode_sk | bigint PK | Surrogate |
| fmea_sk | bigint FK | References `governance.dim_fmea_document` |
| function_description | text | What the operation/function should accomplish |
| failure_mode_text | text | What can go wrong |
| failure_effect_text | text | Consequences (defect, customer impact, safety) |
| severity_score | integer | 1–10 per AIAG-VDA |
| occurrence_score | integer | 1–10 |
| detection_score | integer | 1–10 |
| rpn | integer | severity × occurrence × detection (computed) |
| recommended_action_text | text | |
| action_status | text | Enum: `open`, `in_progress`, `closed`, `verified` |
| created_at | timestamptz | |

**Generation rules (precision-stamping configuration, ~600–1,500 failure modes):**
- 6–15 failure modes per FMEA (average ~10)
- Failure mode content covers stamping-industry process failures documented in publicly-available stamping literature: slug pull, die cracking, tooling wear, splits, wrinkles, draw marks, misfeed, double-strike, scrap caught in die, sensor failure, hydraulic fault, lubrication starvation, material variation, improper coil set-up, end-of-coil splice issues, secondary op mislocation
- Severity / occurrence / detection scores realistic per AIAG-VDA scoring rubrics
- RPN distribution: most 12–80, some 80–200 (action priorities), few above 200 (high-priority CAPA candidates)
- Action status: 50% closed, 25% verified, 15% in_progress, 10% open

**IP firewall / copyright guards (HIGH IMPORTANCE):**
- All failure mode content authored "in AIAG-VDA 2019 structural style" using the standard 7-column FMEA structure — but content is synthesized from publicly-available stamping process literature, NOT direct excerpts from any AIAG publication
- No verbatim text from any AIAG-VDA document
- No verbatim text from any specific real shop's FMEA library
- Function descriptions, failure modes, effects, and recommended actions are generic enough to apply to any progressive die stamping operation

### 4.9 New entity — Burden Rate Snapshot (NEW gap entity, GAP 4)

**Schema home:** `mfg.fact_burden_rate_snapshot` (new table — gap migration assumed completed)

**Proposed schema:**
| Column | Type | Notes |
|---|---|---|
| burden_rate_sk | bigint PK | Surrogate |
| machine_sk | bigint FK | References `analytics.dim_machine` |
| site_sk | bigint FK | References `analytics.dim_site` |
| snapshot_quarter | text | "YYYY-Q[1-4]", e.g., "2025-Q3" |
| labor_burden_per_hour_usd | numeric(8,2) | Direct labor + benefits + supervision |
| facility_burden_per_hour_usd | numeric(8,2) | Facility allocation |
| machine_burden_per_hour_usd | numeric(8,2) | Equipment depreciation + maintenance allocation |
| total_burden_per_hour_usd | numeric(8,2) | GENERATED column: labor + facility + machine |
| currency_code | text | Default 'USD' |
| effective_from | date | |
| effective_to | date | NULL for current |

**Generation rules (precision-stamping configuration, 640 records = 80 machines × 8 quarters):**
- US site rates: labor $35–55/hr, facility $15–28/hr, machine $25–110/hr (depending on press tonnage and age) — typical Tier 2 USD ranges
- Mexico site rates: labor $8–14/hr, facility $6–12/hr, machine $20–95/hr (machine rates similar to US since equipment cost is comparable)
- Quarterly drift: small inflation-driven increases (1–2% per quarter on labor, 0.5–1% on facility/machine), plus occasional step changes for major repairs or facility investments
- Total burden ranges plausible for Tier 2 stamping but not pinned to any publicly-known industry benchmark for any specific shop

---

---

## 5. Cross-Entity Consistency Rules

Every consistency rule below is **runnable as a SQL or programmatic check** after data generation. The build prompt's validation step executes every rule and refuses to commit a dataset that fails any. Rule IDs use the `CR-NN` format. Expected result for each rule: zero rows returned (rules are written as "find the violations"; passing means nothing is found).

Rules reference proposed columns from the new entities (per Clarification 3, the spec describes them as if migrations have landed). The build script's validation harness implements the same checks against the actual generated dataset.

### 5.1 Structural integrity

**CR-01 — Every routing template references an existing part.**
```sql
SELECT r.routing_id
FROM mfg.dim_routing_template r
LEFT JOIN analytics.dim_part p ON p.part_sk = r.part_sk
WHERE p.part_sk IS NULL;
```

**CR-02 — Every routing step references an operation that exists in `analytics.dim_operation`.**
```sql
SELECT s.routing_step_sk
FROM mfg.bridge_part_routing_step s
LEFT JOIN analytics.dim_operation o
  ON o.operation_code::text = s.operation_number::text
WHERE o.operation_code IS NULL;
```

**CR-03 — Every routing step references a routing template that exists.**
```sql
SELECT s.routing_step_sk
FROM mfg.bridge_part_routing_step s
LEFT JOIN mfg.dim_routing_template r ON r.routing_sk = s.routing_sk
WHERE r.routing_sk IS NULL;
```

**CR-04 — Every quote references an existing customer.**
```sql
SELECT q.quote_id
FROM erp.fact_quote q
LEFT JOIN erp.customer c ON c.customer_id = q.customer_id
WHERE c.customer_id IS NULL;
```

**CR-05 — Every quote references either no program (speculative) or an existing program.**
```sql
SELECT q.quote_id
FROM erp.fact_quote q
LEFT JOIN erp.dim_customer_program p ON p.program_sk = q.program_sk
WHERE q.program_sk IS NOT NULL AND p.program_sk IS NULL;
```

**CR-06 — Every customer program references an existing customer.**
```sql
SELECT p.program_id
FROM erp.dim_customer_program p
LEFT JOIN erp.customer c ON c.customer_id = p.customer_id
WHERE c.customer_id IS NULL;
```

**CR-07 — Every active part is linked to exactly one program.** (GAP 5b — `analytics.dim_part.program_sk` FK column, bundled with GAP 2's migration.)
```sql
SELECT part_sk
FROM analytics.dim_part
WHERE effective_to IS NULL
  AND program_sk IS NULL;
```

**CR-08 — Every machine has a burden rate snapshot covering every quarter in the 24-month window.**
```sql
WITH expected AS (
  SELECT m.machine_sk, q.snapshot_quarter
  FROM analytics.dim_machine m
  CROSS JOIN (VALUES
    ('2024-Q3'),('2024-Q4'),('2025-Q1'),('2025-Q2'),
    ('2025-Q3'),('2025-Q4'),('2026-Q1'),('2026-Q2')
  ) AS q(snapshot_quarter)
  WHERE m.effective_to IS NULL
)
SELECT e.machine_sk, e.snapshot_quarter
FROM expected e
LEFT JOIN mfg.fact_burden_rate_snapshot b
  ON b.machine_sk = e.machine_sk AND b.snapshot_quarter = e.snapshot_quarter
WHERE b.burden_rate_sk IS NULL;
```

**CR-09 — Every quote references an existing routing template.**
```sql
SELECT q.quote_id
FROM erp.fact_quote q
LEFT JOIN mfg.dim_routing_template r ON r.routing_sk = q.routing_id
WHERE r.routing_sk IS NULL;
```

### 5.2 Coverage rules

**CR-10 — Every active machine has at least 90 days of OEE production records.**
```sql
SELECT m.machine_sk, COUNT(DISTINCT p.date_sk) AS days_with_data
FROM analytics.dim_machine m
LEFT JOIN mfg.fact_production p ON p.machine_sk = m.machine_sk
WHERE m.effective_to IS NULL
GROUP BY m.machine_sk
HAVING COUNT(DISTINCT p.date_sk) < 90;
```

**CR-11 — Every won quote produces at least one production record on its part beginning within 90 days of `won_date`.**
```sql
SELECT q.quote_id, q.won_date, p.part_sk
FROM erp.fact_quote q
JOIN analytics.dim_part p ON p.part_code = q.part_code
LEFT JOIN mfg.fact_production fp
  ON fp.part_sk = p.part_sk
  AND fp.date_sk BETWEEN q.won_date AND q.won_date + INTERVAL '180 days'
WHERE q.quote_status = 'won'
  AND q.won_date IS NOT NULL
GROUP BY q.quote_id, q.won_date, p.part_sk
HAVING COUNT(fp.production_sk) = 0;
```

**CR-12 — Every active customer has at least one active program.**
```sql
SELECT c.customer_id
FROM erp.customer c
LEFT JOIN erp.dim_customer_program p
  ON p.customer_id = c.customer_id AND p.program_status = 'active'
WHERE c.is_active = true
GROUP BY c.customer_id
HAVING COUNT(p.program_sk) = 0;
```

**CR-13 — FMEA coverage: every part_family with at least one part in the top-30% by quoted annual volume has a process FMEA in approved status.**
```sql
WITH top_30_families AS (
  SELECT DISTINCT p.part_family
  FROM analytics.dim_part p
  JOIN erp.fact_quote q ON q.part_code = p.part_code
  WHERE q.quote_status = 'won'
  ORDER BY q.target_annual_volume DESC
  LIMIT (SELECT ceil(0.30 * COUNT(DISTINCT part_family))::int FROM analytics.dim_part)
)
SELECT t.part_family
FROM top_30_families t
LEFT JOIN governance.dim_fmea_document f
  ON f.part_family = t.part_family
  AND f.process_or_design = 'process_FMEA'
  AND f.status = 'approved'
WHERE f.fmea_sk IS NULL;
```

**CR-14 — Every approved FMEA has between 6 and 15 failure modes.**
```sql
SELECT f.fmea_id, COUNT(fm.failure_mode_sk) AS mode_count
FROM governance.dim_fmea_document f
LEFT JOIN governance.fact_fmea_failure_mode fm ON fm.fmea_sk = f.fmea_sk
WHERE f.status = 'approved'
GROUP BY f.fmea_id
HAVING COUNT(fm.failure_mode_sk) NOT BETWEEN 6 AND 15;
```

**CR-15 — Every machine with at least one corrective work order has at least one corresponding downtime event in the same 30-day window.**
```sql
SELECT wo.work_order_sk
FROM mfg.fact_work_order wo
LEFT JOIN mfg.fact_downtime d
  ON d.machine_sk = wo.machine_sk
  AND d.start_ts BETWEEN wo.created_ts - INTERVAL '15 days'
                     AND wo.created_ts + INTERVAL '15 days'
WHERE wo.wo_type = 'corrective'
  AND d.downtime_sk IS NULL;
```

### 5.3 Outcome and validity rules

**CR-16 — Every won quote has `won_date` populated and `lost_date` / `lost_reason_code` NULL.**
```sql
SELECT quote_id
FROM erp.fact_quote
WHERE quote_status = 'won'
  AND (won_date IS NULL OR lost_date IS NOT NULL OR lost_reason_code IS NOT NULL);
```

**CR-17 — Every lost quote has `lost_date` and `lost_reason_code` populated, `won_date` NULL.**
```sql
SELECT quote_id
FROM erp.fact_quote
WHERE quote_status = 'lost'
  AND (lost_date IS NULL OR lost_reason_code IS NULL OR won_date IS NOT NULL);
```

**CR-18 — Quoted margin on won quotes falls within 14–22% (per § 4.4 generation rules).**
```sql
SELECT quote_id, quoted_margin_pct
FROM erp.fact_quote
WHERE quote_status = 'won'
  AND (quoted_margin_pct < 14 OR quoted_margin_pct > 22);
```

**CR-19 — RPN on every FMEA failure mode equals severity × occurrence × detection.**
```sql
SELECT failure_mode_sk
FROM governance.fact_fmea_failure_mode
WHERE rpn <> (severity_score * occurrence_score * detection_score);
```

**CR-20 — Burden rate components sum: `total_burden_per_hour_usd = labor + facility + machine` (within rounding tolerance).**
```sql
SELECT burden_rate_sk
FROM mfg.fact_burden_rate_snapshot
WHERE ABS(total_burden_per_hour_usd
  - (labor_burden_per_hour_usd + facility_burden_per_hour_usd + machine_burden_per_hour_usd))
  > 0.01;
```

**CR-21 — Effective-dating sanity on every Type-2 dimension row.**
```sql
SELECT 'dim_machine' AS table_name, machine_sk AS row_id
FROM analytics.dim_machine
WHERE effective_to IS NOT NULL AND effective_from >= effective_to;
-- (UNION ALL with the same pattern for any other Type-2-history table populated by this dataset)
```

### 5.4 IP firewall consistency rules (mechanical pre-commit gates)

These rules are also reproduced in Section 7 as the consolidated build-prompt checklist; restating them here gives them rule-IDs that the validation harness can reference.

**CR-22 — No protected machine codes appear in any text field of `analytics.dim_machine`.**
```sql
SELECT machine_sk, machine_code, machine_name, display_name
FROM analytics.dim_machine
WHERE machine_code ~ '\m(309|322|327|335|344)\M'
   OR machine_name ~ '\m(309|322|327|335|344)\M'
   OR display_name ~ '\m(309|322|327|335|344)\M';
```

**CR-23 — `customer_id = 1000` does not appear in `erp.customer` or any FK reference.**
```sql
SELECT 'erp.customer' AS source, customer_id::text AS value
FROM erp.customer WHERE customer_id = 1000
UNION ALL
SELECT 'erp.fact_quote', quote_id FROM erp.fact_quote WHERE customer_id = 1000
UNION ALL
SELECT 'erp.dim_customer_program', program_id FROM erp.dim_customer_program WHERE customer_id = 1000;
```

**CR-24 — No forbidden text patterns in any text/varchar column** (programmatic check, not single SQL — runs across all string columns of all populated tables).

Forbidden patterns: `Pridgeon`, `P&C`, `Grand Rapids`, plus the OEM/Tier-1/program names enumerated in § 7.1.

**CR-25 — No raw OEM program names in `erp.dim_customer_program.program_name` or `analytics.dim_part.part_name`** (e.g., F-150, Silverado, RAM 1500, Wrangler, Camry, Corolla, Civic, Accord, Mustang). Programmatic check; pattern list maintained in § 7.

---

## 6. Adapter Architecture

Three distinct concerns; this section keeps them separate.

### 6.1 Configuration overlay mechanism

**Configuration files live at `seed-data-canonical/configurations/<config-name>.json`.** Each file fully specifies the overlay applied on top of the REF-001 base entity definitions and this spec's entity-by-entity column rules.

**Two configurations at v1.0:**

| Configuration | Purpose | Positioning |
|---|---|---|
| `generic.json` | REF-001 base, no overlay applied | Generic discrete manufacturing per REF-001 § 2 |
| `precision-stamping.json` | Applies the precision-stamping overlay defined in § 2.2 of this spec | Precision metal stamping Tier 2 (PMA, FABTECH, automotive supply chain demos) |

Future configurations (`cnc-heavy.json`, `assembly-heavy.json`, `aerospace-targeted.json`) added by creating new files; no change to this spec, no change to entity column rules, no change to consistency checks.

**Build script signature:**

```bash
generate-dataset --configuration <name> [--output <dir>] [--seed <int>] [--validate]
```

- `--configuration` (required): name of the configuration (without `.json`)
- `--output`: directory for canonical JSON output; default `seed-data-canonical/`
- `--seed`: deterministic seed for the random generator; default to a fixed value so the dataset is reproducible
- `--validate`: run all CR-NN consistency rules + IP firewall greps after generation; refuse to write if any check fails

**Configuration schema** (TypeScript notation; the build script enforces this schema before generating):

```typescript
interface DatasetConfiguration {
  name: string;                        // "generic" | "precision-stamping" | <future>
  version: string;                     // "1.0"
  base_layer_reference: string;        // path to REF-001 spec for inheritance

  identity: {
    company_name: string;              // "Northstar Precision Manufacturing"
    site_descriptors: Array<{
      site_code: string;               // "US-1"
      site_name: string;               // "Northwest Ohio Operations"
      country_code: string;            // "USA"
      region_descriptor: string;       // "Northwest Ohio industrial corridor"
    }>;
  };

  naming_patterns: {
    machine_code: string;              // e.g., "{site}-PRESS-{NNN}"
    machine_code_pool: number[];       // e.g., [100..199, 200..299, 400..499] minus forbidden codes
    part_code_prefixes: string[];      // e.g., ["BRKT", "RNFR", "PNL", "BSE", "CLP", "HSG", "STMP"]
    program_id: string;                // e.g., "PROG-{customer_letter}-{N}"
    quote_id: string;                  // e.g., "Q-{YYYY}-{NNNN}"
    fmea_id: string;                   // e.g., "FMEA-{family}-{NNNN}"
    routing_id: string;                // e.g., "RT-{family}-{NNNN}-R{rev}"
  };

  customer_descriptors: Array<{
    customer_code: string;             // "CUST-A"
    descriptor: string;                // "North American Auto OEM (Detroit-Three)"
    customer_type: string;             // enum value; see § 4.2
    country_code: string;
    is_active: boolean;
    program_count_target: number;      // 2-5 per customer
  }>;

  process_emphasis: {
    machine_type_distribution: Record<string, number>;     // % weights summing to 1.0
    press_tonnage_distribution?: Record<string, number>;   // configuration-specific
    routing_step_count_distribution: Record<number, number>; // {3: 0.4, 4: 0.4, 5: 0.2}
  };

  fmea_emphasis: {
    process_failure_categories: string[];     // ["slug pull", "die wear", "splits", ...]
    severity_distribution: number[];          // 10-bucket distribution summing to 1.0
    occurrence_distribution: number[];
    detection_distribution: number[];
    process_to_design_ratio: [number, number]; // [process_pct, design_pct] e.g., [95, 5]
  };

  material_emphasis: string[];                // ["HSLA Grade 50", "DP590", "DP780", ...]

  cost_band_overrides?: {
    [site_code: string]: {
      labor_per_hour_usd_range: [number, number];
      facility_per_hour_usd_range: [number, number];
      machine_per_hour_usd_range: [number, number];
    };
  };

  ip_firewall_additions?: {
    forbidden_codes: string[];
    forbidden_text_patterns: string[];
  };
}
```

The configuration schema is canonical. The build script validates configuration files against the schema before generating; misconfigured files fail before any data is written.

**Configuration content files (pointers, not full content here):**

- `seed-data-canonical/configurations/generic.json` — minimal overlay; uses REF-001 defaults for naming patterns, generic customer descriptors with no industry emphasis, neutral company name, balanced machine_type_distribution per REF-001 § 2.
- `seed-data-canonical/configurations/precision-stamping.json` — full overlay matching § 2.2 of this spec: Northstar Precision Manufacturing, Toledo + Bajío sites, 9 customers per § 4.2, stamping-emphasis machine distribution, stamping-emphasis FMEA categories, HSLA/DP material emphasis, Tier 2 stamping cost bands.

### 6.2 Website prototype consumption (TypeScript modules)

The dataset is consumed as TypeScript modules in the Next.js website (`/home/pat/EKAS B2B website/ekas-nextjs/`).

**Layout:**

```
src/seed-data/
├── index.ts                      # exports the full dataset
├── types.ts                      # TypeScript interfaces matching the production schema
├── sites.ts                      # analytics.dim_site rows
├── work_centers.ts               # analytics.dim_work_center
├── machines.ts                   # analytics.dim_machine
├── parts.ts                      # analytics.dim_part (with program_sk per GAP 5b)
├── shifts.ts                     # analytics.dim_shift
├── shift_calendar.ts             # analytics.dim_shift_calendar
├── operations.ts                 # analytics.dim_operation
├── downtime_reasons.ts           # analytics.dim_downtime_reason
├── customers.ts                  # erp.customer
├── customer_programs.ts          # erp.dim_customer_program
├── quotes.ts                     # erp.fact_quote
├── routing_templates.ts          # mfg.dim_routing_template
├── routing_steps.ts              # mfg.bridge_part_routing_step
├── fmea_documents.ts             # governance.dim_fmea_document
├── fmea_failure_modes.ts         # governance.fact_fmea_failure_mode
├── burden_rate_snapshots.ts      # mfg.fact_burden_rate_snapshot
├── production.ts                 # mfg.fact_production
├── downtime.ts                   # mfg.fact_downtime
├── quality.ts                    # mfg.fact_quality
├── work_orders.ts                # mfg.fact_work_order
├── pm_compliance.ts              # mfg.fact_pm_compliance
├── maintenance_cost.ts           # mfg.fact_maintenance_cost
└── adapters/
    ├── current-tenant.ts         # getCurrentTenantData()
    ├── machine-history.ts        # getMachineHistory(machine_sk)
    ├── part-routing.ts           # getPartRouting(part_sk)
    ├── quote-history.ts          # getQuoteHistory(customer_id?)
    ├── fmea-by-part.ts           # getFmeaForPart(part_sk)
    └── burden-rate.ts            # getBurdenRate(machine_sk, quarter)
```

**Strong typing:** every entity has a TypeScript interface in `types.ts` matching the production schema column types exactly. Numbers are `number`, dates are `string` in ISO-8601 format (per JSON convention), bigints are `string` (avoiding JS Number precision issues for IDs > 2^53), nullable columns are `T | null` (not `T | undefined`).

**Adapters:** small query helpers consumed by prototype components. Each adapter is a pure function; no I/O, no module-level mutable state. Adapters never edit the data; data edits happen by editing canonical JSON and regenerating.

**Direct edits prohibited:** TypeScript modules in `src/seed-data/` are auto-generated from canonical JSON. Edits to TypeScript files are reverted on next build. PR reviewers reject any commit that edits `src/seed-data/*.ts` without a corresponding canonical JSON change.

### 6.3 Demo system consumption (canonical JSON + loader)

The dataset is loaded into the production EKAS database when a demo tenant is provisioned.

**Source format:** canonical JSON files at `seed-data-canonical/<entity>.json`. UTF-8 encoded, pretty-printed for git-readability. One file per entity matching § 6.2's TypeScript module names.

**Loader script:** lives in the production EKAS repo (`AdaptiveFactory-Production/`). Out of scope for this spec to author. The loader's contract:
- Reads canonical JSON files from `seed-data-canonical/`
- INSERTs into freshly-cloned tenant scope, with `tenant_id` rewritten per the new tenant
- Respects FK ordering: dimensions before facts; specifically `analytics.dim_*` → `erp.customer` → `erp.dim_customer_program` → `analytics.dim_part` (with program_sk populated) → `mfg.dim_routing_template` → `mfg.bridge_part_routing_step` → facts (`fact_production`, `fact_downtime`, `fact_quality`, `fact_quote`, `fact_burden_rate_snapshot`, `fact_work_order`, `fact_pm_compliance`, `fact_maintenance_cost`) → governance (`dim_fmea_document` → `fact_fmea_failure_mode`)
- Validates loaded data with the same CR-NN rules from § 5

**Tenant lifecycle:**
- 7 days from first login (default)
- Extendable to 14 days max on prospect request
- Hard expiration after 14 days; demo tenant data is dropped, not retained

### 6.4 Single source of truth

**Canonical JSON files are the source of truth.** TypeScript modules are derived. If they disagree, the canonical JSON wins.

```
seed-data-canonical/configurations/<config>.json   ── config overlay
                          +
seed-data-canonical/<entity>.json                  ── entity rows (after configuration applied)
                          ↓
    generate-dataset --configuration <config>
                          ↓
    1. validates configuration against schema
    2. generates entity rows by applying overlay to REF-001 base + this spec's entity rules
    3. writes canonical JSON files
    4. runs CR-NN consistency rules
    5. runs § 7 IP firewall greps
    6. if validation passes: emits TypeScript modules to src/seed-data/
    7. if validation fails: refuses to write any file; reports the failures
```

The build script and the loader are out of scope for this spec (separate workstreams). This spec commits to the architecture; subsequent prompts implement.

---

## 7. IP Firewall Constraints (Consolidated Operational Checklist)

This section consolidates every IP firewall guardrail identified across entity specs into one operational checklist. **The build prompt's pre-commit gate runs every check below; any check that returns >0 matches fails the build.**

This section is the single canonical reference for the build prompt and any future remediation. If a guardrail conflicts with anything elsewhere in this spec, this section wins.

### 7.1 Forbidden literal patterns (zero matches required across all generated data and config files)

**Codes (regex with word boundaries):**

| Pattern | Source | Reason |
|---|---|---|
| `\b309\b`, `\b322\b`, `\b327\b`, `\b335\b`, `\b344\b` | `verify_ip_firewall.py` | Protected machine codes (Customer-001 reference) |
| `\b1000\b` as `customer_id` or `site_business_id` value | `verify_ip_firewall.py` | Protected customer / site business ID |

**Text patterns (case-insensitive):**

| Pattern | Source | Reason |
|---|---|---|
| `Pridgeon` | `verify_ip_firewall.py` | Customer-001 name |
| `P&C` | `verify_ip_firewall.py` | Customer-001 abbreviation |
| `Grand Rapids` | `verify_ip_firewall.py` | Customer-001 location |

**OEM names (any major OEM — comprehensive list maintained in `precision-stamping.json` config; sample below):**

`Ford`, `General Motors`, `GM Corporation`, `Stellantis`, `Chrysler`, `RAM`, `Jeep`, `Dodge`, `Toyota`, `Honda`, `Nissan`, `Hyundai`, `Kia`, `BMW`, `Mercedes-Benz`, `Volkswagen`, `Tesla`, `Volvo`, `Subaru`, `Mazda`, `Caterpillar`, `John Deere`, `Komatsu`, `Kubota`, `Volvo Construction`, `JLG`, `Whirlpool`, `GE Appliances`, `Electrolux`, `Frigidaire`, `LG Electronics`, `Samsung Appliance`.

**Tier 1 supplier names:**

`Magna`, `Adient`, `Lear`, `Faurecia`, `Aisin`, `Denso`, `Bosch`, `ZF`, `Continental`, `Bridgestone`, `Goodyear`, `Gentex`, `BorgWarner`, `Eaton`, `Cummins`, `Delphi`, `Aptiv`, `Visteon`, `Harman`, `Tower International`, `Martinrea`, `Cosma`.

**OEM program names:**

`F-150`, `F-250`, `F-350`, `F-Series`, `Silverado`, `Sierra`, `RAM 1500`, `RAM 2500`, `Wrangler`, `Cherokee`, `Grand Cherokee`, `Camry`, `Corolla`, `RAV4`, `Civic`, `Accord`, `CR-V`, `Mustang`, `Challenger`, `Charger`, `Pilot`, `Highlander`, `Tahoe`, `Escalade`, `Suburban`. (List extended in `precision-stamping.json` config.)

### 7.2 Numerical pattern guards

- **Quoted prices:** no quoted unit price or total quote value that maps to a publicly-known stamping-industry benchmark for any specific OEM program. Build script generates prices from material spec + complexity tier + customer type; no specific OEM-program pricing references.
- **Burden rates:** ranges only; specific values within the ranges synthesized via deterministic seed; no specific value that matches a publicly-disclosed Tier 2 stamping shop rate.
- **Customer credit limits:** ranges only; never specific values matching known Tier 2 financial disclosures.
- **Volume targets:** annual_volume_target on programs uses round figures (200000, 300000, 1500000) deliberately; no figure that matches a specific publicly-known program volume.

### 7.3 Copyright handling (FMEA content — § 4.8)

- All FMEA content authored "in AIAG-VDA 2019 structural style" using the standard 7-column scoring (function / failure mode / effect / severity / occurrence / detection / RPN / action)
- **Zero verbatim text from any AIAG-VDA publication.** Failure mode descriptions, effect descriptions, and recommended actions all synthesized fresh from publicly-available stamping process literature
- **Zero verbatim text from any specific real shop's FMEA library**
- Function descriptions, failure modes, effects, and recommended actions generic enough to apply to any progressive die stamping operation
- AIAG-VDA copyright attribution in seed file headers references the structural standard, never embeds publication content

### 7.4 Fingerprinting risk patterns

- **Site descriptors:** `Northwest Ohio Operations` and `Bajío Operations` — region-level only, no specific city, no specific street address
- **Customer descriptors:** universe of candidates ≥3 for every descriptor (e.g., "Detroit-Three" includes Ford/GM/Stellantis; "European-Headquartered Tier 1 (auto)" includes Bosch/Continental/ZF/etc.)
- **Program descriptors:** generic vehicle / equipment categories, never specific OEM program names
- **Machine names:** ~3 of 80 machines get plant-floor nicknames following a pattern (`Big Bertha`, `Old Reliable`) — these patterns are generic enough that no specific real shop's nickname is replicated
- **FMEA document owners:** roles only (`Quality Engineer`, `Process Engineer`, `Tooling Engineer`); no person names

### 7.5 Operational pre-commit checklist (executable)

The build script runs the following checks before writing any output. Any failure aborts the build:

```bash
# Run from seed-data-canonical/ after generation, before commit
# Any non-empty result for any of these greps fails the build.

# 7.5.1 — Protected codes (word-boundary)
grep -rIE '\b(309|322|327|335|344)\b' . \
  --include='*.json' --include='*.ts' --include='*.md' \
  | grep -v '^\./configurations/.*forbidden_codes'    # exclude the firewall config itself

# 7.5.2 — customer_id 1000 or site_business_id 1000
grep -rIE '"customer_id"\s*:\s*1000|"site_business_id"\s*:\s*1000' .

# 7.5.3 — Forbidden text patterns (case-insensitive)
grep -irIE '(pridgeon|\bP&C\b|grand rapids)' . \
  --include='*.json' --include='*.ts' --include='*.md'

# 7.5.4 — OEM names (case-insensitive, word-boundary)
grep -irE '\b(ford|general motors|gm corporation|stellantis|chrysler|toyota|honda|nissan|hyundai|kia|bmw|mercedes-benz|volkswagen|tesla|caterpillar|john deere|komatsu|kubota|whirlpool|ge appliances|electrolux|frigidaire)\b' . \
  --include='*.json' --include='*.ts'

# 7.5.5 — OEM program names
grep -irE '\b(f-150|f-250|f-350|f-series|silverado|sierra|ram 1500|ram 2500|wrangler|cherokee|grand cherokee|camry|corolla|rav4|civic|accord|cr-v|mustang|challenger|charger|pilot|highlander|tahoe|escalade|suburban)\b' . \
  --include='*.json' --include='*.ts'

# 7.5.6 — Tier 1 supplier names
grep -irE '\b(magna|adient|lear|faurecia|aisin|denso|bosch|zf|continental|gentex|borgwarner|eaton|cummins|delphi|aptiv|visteon|harman|tower international|martinrea|cosma)\b' . \
  --include='*.json' --include='*.ts'
```

The greps above are the scannable form. The exhaustive canonical pattern list — what the build script's grep gate actually exercises — lives in § 7.6 below. Manual review is a fallback, never a substitute, for the executable gate.

### 7.6 Forbidden Pattern Reference Tables (deep reference for build-prompt grep gate)

This section embeds the exhaustive pattern lists in grep-ready regex form. The build script's pre-commit gate runs the full set; non-empty match on any pattern aborts the build. Patterns assume `grep -irE` invocation (case-insensitive, extended regex). Word boundaries (`\b`) are explicit to prevent false matches on substrings.

#### 7.6.1 Customer-001 specific patterns

These are the top-priority guards from `database/synthetic/verify_ip_firewall.py` plus the West Michigan municipal additions (Kentwood, Wyoming MI) which are adjacent to Grand Rapids and would imply the pilot site.

```regex
\b(309|322|327|335|344)\b                               # protected machine codes
\b(Pridgeon|P&C)\b                                      # company name + abbreviation
\b(Grand Rapids|Kentwood|Wyoming\s+MI|Wyoming,\s+MI)\b  # West Michigan municipal references
"customer_id"\s*:\s*1000                                # specific customer_id
"site_business_id"\s*:\s*1000                           # specific site business id
```

#### 7.6.2 Detroit-Three OEM names

```regex
\b(Ford|Ford Motor( Company)?|FoMoCo|Lincoln|Mercury)\b
\b(General Motors|GM Corporation|GM Inc|Chevrolet|Chevy|GMC|Cadillac|Buick|Oldsmobile|Pontiac|Saturn)\b
\b(Stellantis|Chrysler|FCA|Fiat Chrysler|Dodge|Jeep|RAM|Mopar|SRT|Eagle|Plymouth)\b
```

#### 7.6.3 Other major OEM names (Asian + European)

```regex
\b(Toyota|Lexus|Scion|Daihatsu|Hino)\b
\b(Honda|Acura)\b
\b(Nissan|Infiniti|Datsun)\b
\b(Hyundai|Kia|Genesis)\b
\b(Mazda|Subaru|Mitsubishi|Suzuki|Isuzu)\b
\b(Volkswagen|VW|Audi|Porsche|Bentley|Bugatti|Lamborghini|SEAT|Skoda)\b
\b(BMW|MINI|Rolls-Royce|Rolls Royce)\b
\b(Mercedes-Benz|Mercedes Benz|Daimler|Smart|Maybach|AMG)\b
\b(Tesla|Rivian|Lucid|Polestar)\b
\b(Volvo Cars|Volvo XC|Volvo S\d{2}|Volvo V\d{2})\b
\b(Jaguar|Land Rover|Range Rover|JLR)\b
\b(Renault|Peugeot|Citroen|Citroën|Opel|Vauxhall|Alfa Romeo|Maserati|Ferrari|Lancia)\b
```

#### 7.6.4 Off-highway equipment OEMs

```regex
\b(Caterpillar|\bCAT Inc|\bCat Industrial)\b
\b(John Deere|Deere\s*&\s*Company|Deere & Co)\b
\b(Komatsu|Komatsu America)\b
\b(AGCO|Massey Ferguson|Fendt|Valtra|Challenger Tractor|Gleaner)\b
\b(Doosan|Bobcat|Doosan Infracore|Doosan Bobcat)\b
\b(Volvo CE|Volvo Construction|Volvo Trucks|Mack Trucks)\b
\b(Liebherr|Hitachi Construction|Hitachi Mining)\b
\b(Kubota)\b
\b(CNH Industrial|Case IH|Case Construction|New Holland|Iveco)\b
\b(Yanmar|Manitou|JCB|Wirtgen|Vermeer|Sandvik|Terex|Genie)\b
\b(Paccar|Peterbilt|Kenworth|Freightliner|Western Star|Navistar|International Trucks)\b
```

#### 7.6.5 Appliance OEMs

```regex
\b(Whirlpool|KitchenAid|Maytag|JennAir|Jenn-Air|Amana|Roper|Gladiator GarageWorks)\b
\b(GE Appliances|Haier|Hotpoint|Monogram|Café Appliances|Profile Appliances)\b
\b(Electrolux|Frigidaire|Kelvinator|Westinghouse Appliance|AEG)\b
\b(BSH|Bosch Home|Siemens Home|Gaggenau|Thermador|Neff)\b
\b(LG Home|LG Appliance|LG Electronics)\b
\b(Samsung Home|Samsung Appliance|Samsung Electronics Home)\b
\b(Sub-Zero|Wolf Appliance|Miele|Viking Range|U-Line|Marvel Refrigeration|Fisher\s*&\s*Paykel)\b
```

Note on `Bosch`: appears in both auto Tier 1 (§ 7.6.6) and appliance (BSH brand, § 7.6.5). The grep `\bBosch\b` matches both — that is the intended behavior.

#### 7.6.6 Tier 1 stamping/automotive suppliers

```regex
# European-headquartered
\b(Magna|Magna International|Cosma|Cosma International|Magna Cosma|Magna Steyr)\b
\b(Gestamp|Gestamp Automoción)\b
\b(Benteler|Benteler International|Benteler Automotive)\b
\b(Kirchhoff|Kirchhoff Automotive)\b
\b(Faurecia|Forvia)\b
\b(ThyssenKrupp|Thyssen Krupp|TK Steel)\b
\b(Voestalpine)\b
\b(Schaeffler|Schaeffler Group)\b
\b(Continental Tire|Continental AG|Continental Automotive)\b
\b(ZF|ZF Friedrichshafen|ZF Group)\b
\b(Bosch|Robert Bosch)\b
\b(Mahle|MAHLE Group)\b
\b(Mubea)\b
\b(Brose)\b
\b(Hella)\b
\b(Webasto)\b
\b(Eberspächer|Eberspaecher)\b
\b(Marquardt)\b

# North American
\b(Linamar|Linamar Corporation)\b
\b(Martinrea|Martinrea International)\b
\b(Tower International|Tower Automotive|Aludyne)\b
\b(Magna Cosma)\b
\b(Dura|Dura Automotive)\b
\b(Shape Corp|Shape Corporation)\b
\b(Flex-N-Gate)\b
\b(American Axle|AAM|American Axle\s*&\s*Manufacturing)\b
\b(Dana Inc|Dana Incorporated|Dana Holding|Spicer)\b
\b(BorgWarner)\b
\b(Eaton|Eaton Corporation)\b
\b(Cummins|Cummins Inc|Cummins Engine)\b
\b(Federal-Mogul|Federal Mogul)\b
\b(Tenneco|Walker Manufacturing)\b
\b(IAC Group|International Automotive Components)\b

# Asian-headquartered
\b(Aisin|Aisin Seiki|Aisin Group|Aisin AW|Advics)\b
\b(Denso|Denso Manufacturing|Denso Corporation)\b
\b(Yachiyo|Yachiyo Industry|Yachiyo of America)\b
\b(F-Tech|F\.Tech)\b
\b(Sungwoo Hitech|Sungwoo)\b
\b(Hyundai Mobis|Mobis)\b
\b(Hyundai Steel)\b
\b(Toyota Boshoku|Toyoda Boshoku)\b
\b(Toyota Industries|TICO)\b
\b(NHK Spring|Nippon Hatsujo)\b
\b(Bridgestone|Bridgestone Americas)\b
\b(Sumitomo|Sumitomo Rubber|Sumitomo Wiring)\b
\b(Yokohama Tire|Yokohama Rubber)\b

# Other notable
\b(Gentex|Gentex Corporation)\b
\b(Aptiv|Delphi Technologies|Delphi Automotive)\b
\b(Visteon)\b
\b(Harman|Harman International)\b
\b(Lear|Lear Corporation)\b
\b(Adient)\b
\b(Yanfeng|Yanfeng Automotive)\b
```

#### 7.6.7 Stamped-part program code patterns (vehicle/equipment programs)

```regex
# Ford F-Series and Ford Motor Co programs
\b(F-150|F-250|F-350|F-450|F-550|F-650|F-750|F-Series|Super Duty|F-Max)\b
\b(F-150 Lightning|Lightning EV|F-150 Raptor|Raptor R)\b
\b(Ranger|Ranger Raptor|Maverick|Bronco|Bronco Sport|Bronco Raptor)\b
\b(Mustang|Mustang Mach-E|Mach-E|Mustang Dark Horse|Mustang GT500)\b
\b(Edge|Escape|Explorer|Expedition|Expedition Max|Transit|Transit Connect|E-Transit)\b
\b(Lobo)\b   # F-150 in Mexico market
\b(Crown Vic|Crown Victoria|Taurus|Fusion|Fiesta|Focus|EcoSport|Flex)\b
\b(Lincoln Navigator|Lincoln Aviator|Lincoln Nautilus|Lincoln Corsair|Lincoln MKZ|Lincoln MKC|Lincoln MKX|Lincoln MKS)\b

# GM programs
\b(Silverado|Silverado 1500|Silverado 2500|Silverado 3500|Silverado HD|Silverado EV)\b
\b(Sierra|Sierra 1500|Sierra HD|Sierra Denali|Sierra EV)\b
\b(Tahoe|Suburban|Yukon|Yukon XL|Yukon Denali|Escalade|Escalade ESV|Escalade IQ)\b
\b(Colorado|Canyon|S-10|Avalanche|Trailblazer|Trax|Equinox|Terrain|Blazer|Blazer EV|Acadia|Enclave|Encore|Encore GX)\b
\b(Hummer EV|Hummer H2|Hummer H3)\b
\b(Camaro|Corvette|Corvette E-Ray|Corvette Stingray|Corvette Z06|Camaro ZL1|Camaro SS)\b
\b(Cruze|Malibu|Impala|Sonic|Spark|Volt|Bolt|Bolt EUV)\b
\b(Cadillac CT4|Cadillac CT5|Cadillac CT6|Cadillac XT4|Cadillac XT5|Cadillac XT6|Cadillac Lyriq|Cadillac Celestiq|Cadillac SRX|Cadillac CTS|Cadillac ATS)\b

# Stellantis programs
\b(RAM 1500|RAM 2500|RAM 3500|RAM HD|RAM TRX|RAM Rampage|RAM ProMaster|RAM ProMaster City)\b
\b(Wrangler|Wrangler 4xe|Wrangler Rubicon|Wrangler Sahara|Wrangler Unlimited)\b
\b(Cherokee|Grand Cherokee|Grand Cherokee L|Grand Cherokee 4xe)\b
\b(Wagoneer|Grand Wagoneer|Wagoneer S)\b
\b(Gladiator|Compass|Renegade|Patriot|Liberty|Commander)\b
\b(Charger|Challenger|Durango|300|Pacifica|Voyager|Hornet|Magnum|Avenger|Caliber|Caravan|Town\s*&\s*Country)\b

# Toyota / Honda / Nissan / Hyundai / Kia programs (high-volume NA stamping work)
\b(Tundra|Tacoma|4Runner|Sequoia|Land Cruiser|Highlander|RAV4|Camry|Corolla|Prius|Sienna|Avalon|C-HR|Venza|GR Corolla|GR86|Supra)\b
\b(Civic|Accord|Ridgeline|Pilot|Passport|Odyssey|CR-V|HR-V|Insight|Element|Crosstour|Type R|Civic Si)\b
\b(Frontier|Titan|Titan XD|Pathfinder|Armada|Murano|Rogue|Altima|Maxima|Sentra|Versa|Kicks|Ariya|Leaf|GT-R|370Z|Z)\b
\b(Sorento|Telluride|Carnival|Sportage|Soul|Forte|K5|Optima|Stinger|EV6|Niro|Rio|Sedona)\b
\b(Palisade|Tucson|Santa Fe|Santa Cruz|Sonata|Elantra|Kona|Veloster|Venue|Ioniq|Ioniq 5|Ioniq 6|Genesis G70|Genesis G80|Genesis G90|Genesis GV70|Genesis GV80)\b

# Subaru
\b(Outback|Ascent|Forester|Crosstrek|Impreza|Legacy|WRX|BRZ|Solterra)\b

# Common platform references (Tier 2 stamping work uses these)
\b(T1XX|T1\b|GMT900|GMT800|GMT400|D-segment|D2|DT|DS|F-segment|U-segment|H-segment)\b   # platform codes
\b(LEAF|MOMA|TNGA|GA-K|GA-L|GA-N|MQB|MEB|EVA|EVA2|J1|MLB|MSB|i-MMD)\b   # platform/architecture codes
```

#### 7.6.8 Reaffirmation: protected machine codes

For reference and grep-checklist completeness:

```regex
\b(309|322|327|335|344)\b
```

Source: `/home/pat/AdaptiveFactory-Production/database/synthetic/verify_ip_firewall.py`. These five codes are the canonical protected machine code list. The numbers 919 / 2519 / 2571 from the original prompt are operator-memory drift and are NOT in the production firewall.

#### 7.6.9 Combined grep gate (executable form for the build script)

The build script concatenates the patterns above into a single check. Reference implementation:

```bash
#!/usr/bin/env bash
# build-prompt pre-commit gate. Runs from seed-data-canonical/.
# Exits non-zero on any match.

set -e

PATTERNS_FILE="$(mktemp)"
trap "rm -f $PATTERNS_FILE" EXIT

cat > "$PATTERNS_FILE" <<'EOF'
\b(309|322|327|335|344)\b
\b(Pridgeon|P&C)\b
\b(Grand Rapids|Kentwood|Wyoming\s+MI|Wyoming,\s+MI)\b
"customer_id"\s*:\s*1000
"site_business_id"\s*:\s*1000
\b(Ford|Ford Motor( Company)?|FoMoCo|Lincoln|Mercury)\b
\b(General Motors|GM Corporation|GM Inc|Chevrolet|Chevy|GMC|Cadillac|Buick|Oldsmobile|Pontiac|Saturn)\b
\b(Stellantis|Chrysler|FCA|Fiat Chrysler|Dodge|Jeep|RAM|Mopar|SRT|Eagle|Plymouth)\b
# ... (full list per § 7.6.2 through § 7.6.7) ...
EOF

if grep -irIEf "$PATTERNS_FILE" \
    --include='*.json' --include='*.ts' --include='*.md' \
    --exclude-dir='configurations' \
    .; then
    echo "IP FIREWALL VIOLATION — see matches above. Build aborted."
    exit 1
fi

echo "IP firewall: PASS"
```

The `--exclude-dir='configurations'` flag is critical: the configuration files themselves contain the forbidden-pattern lists in their `ip_firewall_additions` field, and scanning those would cause false-positive self-matches. Configuration files are independently validated against the configuration schema (§ 6.1), not against the firewall greps.

---

## 8. Open Questions and Assumptions

### 8.1 Items deferred outside this spec

- **REF-001 Section 4.1 corrigendum needed.** REF-001 prose claims "shift_sk aliased as shift_key in the live DB per existing convention." No ADR or migration supports this; the architectural-constants-audit doc explicitly lists `shift_sk` as canonical. Resolution: small REF-001 corrigendum PR removing the shift_key alias claim. Out of scope for this spec.

- **Schema migrations for the 5 gaps + GAP 5b.** This spec describes all six new entities/columns as if migrations have landed (per Clarification 3). Migration sequencing recommendation (most-coupled-to-existing first):

  1. `mfg.dim_routing_template` + `mfg.bridge_part_routing_step` (GAP 5)
  2. `mfg.fact_burden_rate_snapshot` (GAP 4)
  3. `analytics.dim_part` add `program_sk` FK column (GAP 5b — column extension, bundled with GAP 2's migration)
  4. `erp.dim_customer_program` (GAP 2)
  5. `erp.fact_quote` (GAP 1) — depends on routing FK from step 1
  6. `governance.dim_fmea_document` + `governance.fact_fmea_failure_mode` (GAP 3)

- **Future consideration: promote `material_spec` to `mfg.dim_material`.** Currently `material_spec` is free text on `erp.fact_quote` (per HALT-B Q6a confirmation). If cross-customer material analysis becomes a feature requirement, promote to a structured `mfg.dim_material` with `steel_grade`, `gauge_mm`, `supplier_grade`, `certification_type` fields. **Out of scope for v1.0.**

- **Build script and loader implementation.** § 6 describes the architecture; implementation lives in separate workstreams (`scripts/generate-dataset.py` for the build script, demo-tenant loader in production EKAS repo).

- **Future configurations (CNC-heavy, assembly-heavy, aerospace).** § 6.1 contemplates them; they are added by creating new `<name>.json` files in `seed-data-canonical/configurations/`. No structural spec changes required. Authoring future configurations is a separate prompt.

- **CR-21 (effective-dating sanity) is currently `dim_machine`-only.** REF-001 populates Type-2 history only on `dim_machine` for the reference dataset; other dimensions (`dim_site`, `dim_work_center`, `dim_part`, `dim_shift`, `dim_operation`, `dim_downtime_reason`, etc.) populate single rows with `effective_to = NULL`. Customer adapter ingestion may populate Type-2 elsewhere. **When future workstreams populate Type-2 history on additional dimensions, extend CR-21 to enumerate those tables.** Until then, expanding CR-21 to enumerate dimensions that trivially pass would clutter the rule set without adding signal.

- **Alternative city options for future demo audiences.** HALT-B selected Toledo / NW Ohio for the precision-stamping configuration. Detroit metro suburb (Plymouth, Sterling Heights, Auburn Hills) and Cleveland-area suburb (Solon, Mentor) remain documented options. A future "automotive-OEM-emphasis" configuration could select Detroit metro; a future "diversified-industrial-emphasis" configuration could select Cleveland-area. The structural spec is configuration-independent.

### 8.2 Assumptions explicit in this spec

- The five gap migrations land before the dataset is built (per Clarification 3)
- REF-001 v1.0 § 4 entity model is canonical for inherited entities; this spec adds, never overrides
- Production schema constants per HALT-A audit: `machine_sk` PK, `operation_number ::text` cast, `metric_id` PK, `parts_per_stroke` removed, `oee_eligible` does not exist, `dim_shift_calendar` lives in `analytics` (not `governance`)
- IP firewall canonical from production script `database/synthetic/verify_ip_firewall.py`
- "Generic" and "precision-stamping" are the only two configurations at v1.0; future configurations added without structural-spec changes
- TypeScript modules in `src/seed-data/` are auto-generated; direct edits are reverted on next build
- Demo tenant data is dropped (not retained) at expiration

---

## 9. Schema Audit Reference

The full schema audit was conducted at HALT-A (2026-05-01). Summary of findings relevant to this spec:

**11 schemas in production:** `analytics`, `audit`, `dq`, `erp`, `governance`, `isa95`, `iso22400`, `mfg`, `public`, `reference`, `validation`. (Original prompt mentioned 3; corrected to 11 from the canonical schema_snapshot at `tests/baseline_artifacts/2025-12-09_94metrics_complete/schema_snapshot.sql`.)

**Schemas this spec writes to:**

- `analytics` — dimensions inherited from REF-001; `dim_part.program_sk` extension (GAP 5b)
- `erp` — `customer` (existing), `dim_customer_program` (new GAP 2), `fact_quote` (new GAP 1)
- `mfg` — facts inherited from REF-001; `dim_routing_template` + `bridge_part_routing_step` (new GAP 5); `fact_burden_rate_snapshot` (new GAP 4)
- `governance` — `dim_fmea_document` + `fact_fmea_failure_mode` (new GAP 3)

**Schema constants verified:**

| Constant | Status |
|---|---|
| `machine_sk` is the canonical machine identifier (not `machine_code`) | PASS |
| `operation_number` requires `::text` cast on join | PASS |
| `iso22400.metric_catalog` PK is `metric_id` (not `kpi_id`) | PASS |
| `parts_per_stroke` permanently removed | PASS |
| `iso22400.oee_eligible` does not exist as a table or view | PASS |
| `shift_sk` is canonical (not `shift_key`) | PASS — defaulted per Clarification 1; REF-001 corrigendum noted in § 8.1 |
| `dim_shift_calendar` lives in `analytics` (operator memory said `governance`) | LOCATION DRIFT — corrected to `analytics.dim_shift_calendar` |
| `governance.dim_shift_calendar` row count "17,688 (2025-01-01 to 2027-12-31)" with bucket constants DAY=1/SWING=2/NIGHT=3/EXTENDED=4 | UNVERIFIED at HALT-A; row count matches REF-001 prose ("~17,688 rows for 24 months × 3 shifts"); bucket constants not located in current migrations. If consistency rules require verification, surface separately. |

**IP firewall canonical source:** `database/synthetic/verify_ip_firewall.py` in the production repo. Section 7 of this spec consolidates the operational checklist derived from that script plus the additional fingerprinting and copyright guards identified in entity specs.

End of specification draft v0.1.
