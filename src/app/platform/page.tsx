import Image from "next/image";
import PageShell from "@/components/layout/PageShell";
import TermDefList from "@/components/sections/TermDefList";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Platform",
  description: "A manufacturing AI portfolio built on governed data, EvidencePacket provenance, and a nine-stage security pipeline. Each capability compounds over time.",
  path: "/platform",
});

const coreCapabilities = [
  {
    title: "AI Assistant",
    body: "Ask any manufacturing question in plain language. Every answer carries a full EvidencePacket tracing every number to its source record.",
    href: "/platform/ai-assistant",
  },
  {
    title: "Manufacturing Analytics",
    body: "91 governed metrics across the ISA-95 hierarchy. OEE, downtime, FPY, and capacity — ISO 22400-2 ratio-of-sums enforced throughout.",
    href: "/platform/manufacturing-intelligence",
  },
  {
    title: "Financial Intelligence",
    body: "Scrap cost, downtime cost, and OEE efficiency loss by workcenter — from confirmed production data, any day, without waiting for period close.",
    href: "/platform/financial-intelligence",
  },
  {
    title: "Document Intelligence",
    body: "Supplier invoices, calibration certs, NCRs, work orders, and PPAP submissions — extracted, indexed, and queryable through the AI Assistant.",
    href: "/platform/document-intelligence",
  },
  {
    title: "Shift Handoff Intelligence",
    body: "Structured shift briefings generated from live production data. Outgoing supervisors confirm. Incoming supervisors start informed.",
    href: "/solutions/shift-handoff",
  },
];

const addOnModules = [
  {
    title: "CE — Cost Estimation",
    body: "Tooling cost models (T1–T5 die complexity), should-cost analysis, and scenario simulation.",
  },
  {
    title: "Agentic Quoting",
    body: "Autonomous RFQ ingestion, quote generation, and margin-aware pricing.",
  },
  {
    title: "FMEA / Quality",
    body: "Failure mode and effects analysis with integrated quality metrics.",
  },
  {
    title: "Predictive Maintenance",
    body: "Anomaly detection, machine-health scoring, downtime forecasting.",
  },
  {
    title: "EBITDA / Financial Variance",
    body: "Real-time financial cost variance and EBITDA architecture.",
  },
];

const horizonCards = [
  {
    title: "Horizon 1 — Extend & Defend",
    allocation: "70% of investment focus",
    body: "Quick wins. Certain returns. Proven data. Pays for the portfolio. Six capabilities live or near-live, including OEE diagnostics, downtime root cause, cost variance attribution, shift handoff intelligence.",
  },
  {
    title: "Horizon 2 — Build & Scale",
    allocation: "20% of investment focus",
    body: "Emerging differentiators. Moderate risk. Six capabilities in design or build, with deeper plant-context grounding and longer feedback loops than Horizon 1.",
  },
  {
    title: "Horizon 3 — Create Options",
    allocation: "10% of investment focus",
    body: "Transformational bets. Higher risk. Four capabilities funded only after Horizon 1 generates documented returns.",
  },
];

const selectionCriteria: ReadonlyArray<readonly [string, string]> = [
  ["Strategic Relevance", "does the capability advance a named business priority?"],
  ["Measurable Impact", "can success be defined in dollar terms before investment?"],
  ["Feasibility", "can it be built with available technology, skills, and budget within a defined timeframe?"],
  ["Data Readiness", "is the required data accessible, structured, accurate, and of sufficient volume?"],
  ["Regulatory Implications", "can compliance obligations (IATF 16949, EU AI Act, OEM contractual) be met within timeline and budget?"],
];

export default function PlatformPage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Platform</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              A Manufacturing AI Portfolio — Not a Point Solution
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS is a coordinated set of intelligence capabilities built on a single governed data layer, a single evidence standard, and a single security pipeline. Each capability delivers immediate value. Together they compound: every shift of production data makes every capability more accurate and more specific to your operation.
            </p>
          </div>
        </section>

        {/* Screenshot */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <div className="premium-card overflow-hidden">
              <Image
                src="/ekas-dashboard.jpg"
                alt="EKAS Platform"
                width={1000}
                height={600}
                className="w-full h-auto"
                priority
              />
            </div>
          </div>
        </section>

        {/* Core Capabilities */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-12">
              <span className="section-label">Core Capabilities</span>
              <h2 className="text-h2 text-primary-text mt-3">What EKAS Delivers</h2>
            </div>

            <p className="text-body-base text-secondary-text text-center mb-8 max-w-[760px] mx-auto">
              Every customer starts with the Core EKAS platform. Each Foundation, Professional, or Enterprise tier includes the intelligence layer described below.
            </p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {coreCapabilities.map((card) => (
                <a key={card.title} href={card.href} className="premium-card block hover:border-accent/30 transition-all">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text mb-3">{card.body}</p>
                  <span className="text-fine text-accent">Learn more →</span>
                </a>
              ))}
            </div>

            <div className="premium-card" style={{ background: "rgba(0,0,0,0.2)" }}>
              <h3 className="text-h3 text-primary-text mb-4">What EKAS Is Not</h3>
              <p className="text-body-base text-secondary-text">
                EKAS does not replace your MES, ERP, CMMS, or QMS. It reads from them. In any data conflict between your ERP and an EKAS calculation, your ERP wins. Scheduling, work orders, master data, and execution remain in your existing systems. EKAS is the analytical intelligence layer.
              </p>
            </div>
          </div>
        </section>

        {/* Modules — add-on capability beyond the Core platform */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-3">
              <span className="section-label">Modules</span>
            </div>
            <h2 className="text-h2 text-primary-text text-center mb-4">Add-On Modules</h2>
            <p className="text-body-base text-secondary-text text-center mb-12 max-w-[760px] mx-auto">
              Add capability without adding vendors. Each module is purchased separately and integrates natively with your Core EKAS platform.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {addOnModules.map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* AI Portfolio Management — Three Horizons + Five Criteria + Governance + Markowitz */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-3">
              <span className="section-label">AI Portfolio Management</span>
            </div>
            <h2 className="text-h2 text-primary-text text-center mb-6">How EKAS Sequences AI Investment</h2>

            <div className="max-w-[860px] mx-auto mb-12">
              <p className="text-body-base text-secondary-text mb-4">
                EKAS organizes 16 AI capabilities across the McKinsey Three Horizons framework — a strategic allocation discipline introduced by Baghai, Coley & White in 1999. Each horizon serves a distinct purpose, and each capability scores against five selection criteria before receiving active investment.
              </p>
              <p className="text-body-base text-secondary-text">
                The framework prevents the most common AI failure mode: organizations that pursue interesting use cases without a coherent selection framework, producing a collection of disconnected pilots that collectively deliver no measurable business value.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {horizonCards.map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-1">{card.title}</h3>
                  <p className="text-fine text-accent mb-3">{card.allocation}</p>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>

            <div className="max-w-[860px] mx-auto mb-12">
              <h3 className="text-h3 text-primary-text mb-4">Five-criteria scoring before investment</h3>
              <p className="text-body-base text-secondary-text mb-6">
                Every capability is scored against five criteria before it enters the active portfolio. Capabilities below the scoring threshold do not receive investment, regardless of how interesting they appear.
              </p>
              <TermDefList items={selectionCriteria} />
            </div>

            <div className="max-w-[860px] mx-auto mb-12">
              <h3 className="text-h3 text-primary-text mb-4">Governance cadence</h3>
              <p className="text-body-base text-secondary-text mb-6">
                EKAS embeds a quarterly governance cadence into the customer engagement, with binary decision criteria at every layer.
              </p>
              <div className="grid grid-cols-[120px_1fr] gap-x-6 gap-y-3">
                <div className="text-h4 text-accent">Weekly</div>
                <div className="text-body-sm text-secondary-text">Which initiatives are blocked? What unblocks them?</div>
                <div className="text-h4 text-accent">Monthly</div>
                <div className="text-body-sm text-secondary-text">Are returns tracking projections? Any capability ready to accelerate?</div>
                <div className="text-h4 text-accent">Quarterly</div>
                <div className="text-body-sm text-secondary-text">Full portfolio rebalancing — invest more, hold, kill, or add?</div>
                <div className="text-h4 text-accent">Annually</div>
                <div className="text-body-sm text-secondary-text">Strategy review. Validate horizon allocations. Seed new options.</div>
              </div>
            </div>

            <p className="text-body-base text-secondary-text text-center max-w-[860px] mx-auto">
              The portfolio approach traces to Markowitz's Modern Portfolio Theory (1952), awarded the Nobel Memorial Prize in Economic Sciences in 1990. The core insight: a rational investor doesn't pursue the single highest-return option, but assembles a collection of options that maximize return for a given level of risk. EKAS applies the same logic to AI investment in precision manufacturing.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See It in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring a plant problem. We'll show you how EKAS approaches it.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
