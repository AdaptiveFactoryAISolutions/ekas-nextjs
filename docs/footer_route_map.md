# EKAS Footer Link Route Map

Complete mapping of all footer links to their destinations.

---

## Platform (6 links)

| Link Label | Route | File Path |
|------------|-------|-----------|
| Overview | `/platform` | `src/app/platform/page.tsx` |
| AI Assistant | `/platform/ai-assistant` | `src/app/platform/ai-assistant/page.tsx` |
| Manufacturing Intelligence | `/platform/manufacturing-intelligence` | `src/app/platform/manufacturing-intelligence/page.tsx` |
| Data Connections | `/platform/data-connections` | `src/app/platform/data-connections/page.tsx` |
| Reporting & Analytics | `/platform/reporting-analytics` | `src/app/platform/reporting-analytics/page.tsx` |
| Governance & Auditability | `/security` | `src/app/security/page.tsx` |

---

## Solutions (5 links)

| Link Label | Route | File Path |
|------------|-------|-----------|
| Downtime Reduction | `/solutions/downtime-reduction` | `src/app/solutions/downtime-reduction/page.tsx` |
| Scrap & Quality Visibility | `/solutions/scrap-quality-visibility` | `src/app/solutions/scrap-quality-visibility/page.tsx` |
| Capacity & Throughput | `/solutions/capacity-throughput` | `src/app/solutions/capacity-throughput/page.tsx` |
| Cost Driver Analysis | `/solutions/cost-driver-analysis` | `src/app/solutions/cost-driver-analysis/page.tsx` |
| Multi-Site Performance | `/solutions/multi-site-performance` | `src/app/solutions/multi-site-performance/page.tsx` |

---

## Roles (6 links)

| Link Label | Route | File Path |
|------------|-------|-----------|
| Plant Managers | `/roles/plant-managers` | `src/app/roles/plant-managers/page.tsx` |
| Operations Leaders | `/roles/operations-leaders` | `src/app/roles/operations-leaders/page.tsx` |
| Manufacturing Engineering | `/roles/manufacturing-engineering` | `src/app/roles/manufacturing-engineering/page.tsx` |
| Quality Leaders | `/roles/quality-leaders` | `src/app/roles/quality-leaders/page.tsx` |
| Finance Leaders | `/roles/finance-leaders` | `src/app/roles/finance-leaders/page.tsx` |
| Executive / PE Operations | `/roles/executive-operations` | `src/app/roles/executive-operations/page.tsx` |

---

## Industries (5 links)

| Link Label | Route | File Path |
|------------|-------|-----------|
| Metal Stamping | `/industries/metal-stamping` | `src/app/industries/metal-stamping/page.tsx` |
| Automotive | `/industries/automotive` | `src/app/industries/automotive/page.tsx` |
| Aerospace | `/industries/aerospace` | `src/app/industries/aerospace/page.tsx` |
| Medical Devices | `/industries/medical-devices` | `src/app/industries/medical-devices/page.tsx` |
| Industrial Manufacturing | `/industries/industrial-manufacturing` | `src/app/industries/industrial-manufacturing/page.tsx` |

---

## Trust (4 links)

| Link Label | Route | File Path | Note |
|------------|-------|-----------|------|
| Security | `/security` | `src/app/security/page.tsx` | Full page |
| Governance | `/security#governance` | `src/app/security/page.tsx` | Anchor section |
| Data Handling | `/security#data-handling` | `src/app/security/page.tsx` | Anchor section |
| Architecture | `/security#architecture` | `src/app/security/page.tsx` | Anchor section |

---

## Resources (4 links)

| Link Label | Route | File Path |
|------------|-------|-----------|
| Guides | `/resources/guides` | `src/app/resources/guides/page.tsx` |
| Product Briefs | `/resources/product-briefs` | `src/app/resources/product-briefs/page.tsx` |
| FAQs | `/resources/faqs` | `src/app/resources/faqs/page.tsx` |
| Thought Leadership | `/resources/thought-leadership` | `src/app/resources/thought-leadership/page.tsx` |

---

## Company (3 links)

| Link Label | Route | File Path |
|------------|-------|-----------|
| About | `/about` | `src/app/about/page.tsx` |
| Founder | `/about/founder` | `src/app/about/founder/page.tsx` |
| Contact | `/demo` | `src/app/demo/page.tsx` |

---

## Summary Statistics

- **Total Footer Links:** 33
- **Total Dedicated Pages:** 30 (excluding anchor sections)
- **Total Anchor Sections:** 3 (Governance, Data Handling, Architecture)
- **Total File Routes:** 37 (including homepage, 404, etc.)

---

## File System Structure

```
src/app/
├── page.tsx                                    (Homepage)
├── about/
│   ├── page.tsx                                (About overview)
│   └── founder/
│       └── page.tsx                            (Founder page)
├── demo/
│   └── page.tsx                                (Demo request)
├── industries/
│   ├── page.tsx                                (Industries hub)
│   ├── aerospace/
│   │   └── page.tsx
│   ├── automotive/
│   │   └── page.tsx
│   ├── industrial-manufacturing/
│   │   └── page.tsx
│   ├── medical-devices/
│   │   └── page.tsx
│   └── metal-stamping/
│       └── page.tsx
├── platform/
│   ├── page.tsx                                (Platform hub)
│   ├── ai-assistant/
│   │   └── page.tsx
│   ├── data-connections/
│   │   └── page.tsx
│   ├── manufacturing-intelligence/
│   │   └── page.tsx
│   └── reporting-analytics/
│       └── page.tsx
├── resources/
│   ├── page.tsx                                (Resources hub)
│   ├── faqs/
│   │   └── page.tsx
│   ├── guides/
│   │   └── page.tsx
│   ├── product-briefs/
│   │   └── page.tsx
│   └── thought-leadership/
│       └── page.tsx
├── roles/
│   ├── page.tsx                                (Roles hub)
│   ├── executive-operations/
│   │   └── page.tsx
│   ├── finance-leaders/
│   │   └── page.tsx
│   ├── manufacturing-engineering/
│   │   └── page.tsx
│   ├── operations-leaders/
│   │   └── page.tsx
│   ├── plant-managers/
│   │   └── page.tsx
│   └── quality-leaders/
│       └── page.tsx
├── security/
│   └── page.tsx                                (Security + anchor sections)
├── solutions/
│   ├── page.tsx                                (Solutions hub)
│   ├── capacity-throughput/
│   │   └── page.tsx
│   ├── cost-driver-analysis/
│   │   └── page.tsx
│   ├── downtime-reduction/
│   │   └── page.tsx
│   ├── multi-site-performance/
│   │   └── page.tsx
│   └── scrap-quality-visibility/
│       └── page.tsx
└── not-found.tsx                               (404 page)
```

All routes are statically generated at build time for optimal performance.
