import type { Metadata } from "next";
import Image from "next/image";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Platform — EKAS by AdaptiveFactory",
  description: "A manufacturing AI portfolio built on governed data, EvidencePacket provenance, and a nine-stage security pipeline. Each capability compounds over time.",
};

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

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {[
                {
                  title: "AI Assistant",
                  body: "Ask any manufacturing question in plain language. Every answer carries a full EvidencePacket tracing every number to its source record.",
                  href: "/platform/ai-assistant"
                },
                {
                  title: "Manufacturing Analytics",
                  body: "91 governed metrics across the ISA-95 hierarchy. OEE, downtime, FPY, and capacity — ISO 22400-2 ratio-of-sums enforced throughout.",
                  href: "/platform/manufacturing-intelligence"
                },
                {
                  title: "Financial Intelligence",
                  body: "Scrap cost, downtime cost, and OEE efficiency loss by workcenter — from confirmed production data, any day, without waiting for period close.",
                  href: "/platform/financial-intelligence"
                },
                {
                  title: "Document Intelligence",
                  body: "Supplier invoices, calibration certs, NCRs, work orders, and PPAP submissions — extracted, indexed, and queryable through the AI Assistant.",
                  href: "/platform/document-intelligence"
                },
                {
                  title: "Shift Handoff Intelligence",
                  body: "Structured shift briefings generated from live production data. Outgoing supervisors confirm. Incoming supervisors start informed.",
                  href: "/solutions/shift-handoff"
                },
              ].map((card) => (
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

        {/* In Development */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-3">
              <span className="section-label">In Development</span>
            </div>
            <h2 className="text-h2 text-primary-text text-center mb-4">What Is Being Built</h2>
            <p className="text-body-base text-secondary-text text-center mb-12 max-w-[760px] mx-auto">
              Named here so you can evaluate the trajectory of the platform, not just its current state.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "FMEA Intelligence",
                  body: "FMEA corpus indexed and connected to live production data. Ask about failure modes, causes, and corrective actions. Retrieval infrastructure built — corpus ingestion in progress."
                },
                {
                  title: "Predictive Maintenance ML",
                  body: "XGBoost-based failure prediction from rolling OEE and availability signals. Data accumulation phase active."
                },
                {
                  title: "Scrap Prediction",
                  body: "Scrap rate elevation prediction by part-machine combination before the production run starts."
                }
              ].map((card) => (
                <div key={card.title} className="premium-card opacity-60" style={{ borderColor: "rgba(255,165,0,0.3)" }}>
                  <div className="inline-block px-2 py-1 rounded mb-3" style={{ background: "rgba(255,165,0,0.15)", border: "1px solid rgba(255,165,0,0.3)" }}>
                    <span className="text-fine" style={{ color: "#ffa500" }}>In Development</span>
                  </div>
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
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
