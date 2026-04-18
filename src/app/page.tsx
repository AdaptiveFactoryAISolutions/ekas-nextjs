"use client";

import { useState } from "react";
import BackgroundAtmosphere from "@/components/layout/BackgroundAtmosphere";
import Navigation from "@/components/layout/Navigation";
import FooterSection from "@/components/layout/FooterSection";
import HeroSection from "@/components/sections/HeroSection";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function HomePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <BackgroundAtmosphere />
      <Navigation onDemoClick={() => setDemoOpen(true)} />
      <main style={{ position: "relative", zIndex: 1, paddingTop: 80 }}>
        <HeroSection onDemoClick={() => setDemoOpen(true)} />

        {/* Trust Strip Section */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1100px] mx-auto">
              {[
                { label: "ISO 22400-2 Governed OEE" },
                { label: "EvidencePacket on Every Answer" },
                { label: "IATF 16949 Audit Trail" },
                { label: "ISA-95 Equipment Hierarchy" },
                { label: "Cloud or Fully Air-Gapped" },
                { label: "28 Years of Plant Floor Experience" },
              ].map((item) => (
                <div key={item.label} className="flex flex-col items-center text-center">
                  <div
                    className="w-11 h-11 rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: "rgba(0,200,255,0.08)",
                      border: "1px solid rgba(0,200,255,0.15)",
                    }}
                  >
                    <div className="w-2 h-2 rounded-full" style={{ background: "#00c8ff" }} />
                  </div>
                  <span className="text-fine text-secondary-text">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Deployment Proof Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)", borderTop: "1px solid rgba(0,200,255,0.1)" }}>
          <div className="container max-w-[1000px]">
            <div className="text-center mb-3">
              <span className="section-label">Built for Precision Manufacturing SMEs</span>
            </div>
            <div className="text-center max-w-[860px] mx-auto">
              <p className="text-body-base text-secondary-text mb-4">
                EKAS is a purpose-built manufacturing intelligence platform for small and mid-size precision manufacturers — stamping, fabrication, and metalforming shops that need enterprise-grade analytics without enterprise-grade overhead or implementation timelines.
              </p>
              <p className="text-body-base text-secondary-text mb-4">
                OEE calculations follow ISO 22400-2 methodology end-to-end — ratio-of-sums math, shift-aware availability, quality rollups tied to real scrap and rework data. Cost variance reporting runs nightly against your ERP and MES sources — no waiting for period close, no month-end surprises. Shift handoff intelligence surfaces anomalies across every shift, every line, every day, so the incoming team starts informed instead of reactive.
              </p>
              <p className="text-body-base text-secondary-text mb-4">
                Architected to support IATF 16949 quality workflows, CAPA traceability, and the data integrity standards automotive and aerospace supply chains require.
              </p>
              <p className="text-body-sm text-accent">
                Request a walkthrough of the live EKAS environment.
              </p>
            </div>
          </div>
        </section>

        {/* Problems Section */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-12">
              <span className="section-label">The Gap EKAS Fills</span>
              <h2 className="text-h2 text-primary-text mt-3 mb-4">
                Three Core Problems in Manufacturing Intelligence
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Ungoverned Metrics",
                  body: "Every team calculates OEE, downtime, and variance differently. Without versioned SQL and governed definitions, metrics drift and teams can't trust the numbers."
                },
                {
                  title: "No Data Provenance",
                  body: "When a metric changes, you can't trace it back to source data. Audit trails are incomplete, and traceability is manual. EKAS provides full provenance from answer to raw data."
                },
                {
                  title: "AI Without Manufacturing Context",
                  body: "Generic AI tools have no knowledge of your machines, your FMEA failure modes, your ISA-95 hierarchy, or your OEM quality requirements. They generate responses from training data — not from your production records. EKAS grounds every response in your data, your standards, and your operational context."
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Industry Benchmark Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-3">
              <span className="section-label">The Cost of the Status Quo</span>
            </div>
            <h2 className="text-h2 text-primary-text text-center mb-12">What Fragmented Manufacturing Intelligence Costs</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  number: "72–75%",
                  label: "Typical fleet OEE",
                  desc: "Industry benchmark for precision metal stamping, 2-shift operations. Every point below theoretical maximum output has a calculable dollar cost.",
                  source: "Industry benchmark — precision metal stamping. MTBF/MTTR studies."
                },
                {
                  number: "$1.2–2M",
                  label: "Annual unplanned downtime cost",
                  desc: "Benchmark for a typical 2-shift precision stamping operation. Rarely visible until someone builds the calculation from confirmed shift data.",
                  source: "Industry benchmark — discrete manufacturing downtime cost studies."
                },
                {
                  number: "8–16 hrs",
                  label: "Per week lost to manual reporting",
                  desc: "Typical management reporting burden in discrete manufacturing. EKAS reduces this to under one hour per week.",
                  source: "McKinsey State of AI 2025, n=1,993. Manufacturing operations studies."
                },
                {
                  number: "60%",
                  label: "of AI deployments generate no material value",
                  desc: "The difference is investment discipline and domain specificity — not the technology itself.",
                  source: "BCG Build for the Future 2025, n=1,250 executives."
                }
              ].map((stat) => (
                <div key={stat.label} className="premium-card">
                  <div className="text-4xl font-bold mb-2" style={{ color: "#00c8ff", fontFamily: "var(--font-rajdhani)" }}>
                    {stat.number}
                  </div>
                  <div className="text-h4 text-primary-text mb-3">{stat.label}</div>
                  <p className="text-body-sm text-secondary-text mb-3">{stat.desc}</p>
                  <p className="text-fine" style={{ color: "#6a7a9a" }}>{stat.source}</p>
                </div>
              ))}
            </div>

            <p className="text-fine text-center mt-6" style={{ color: "#6a7a9a" }}>
              All figures are industry benchmarks. Not derived from any specific customer.
            </p>
          </div>
        </section>

        {/* EvidencePacket Example Section */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <div className="text-center mb-3">
              <span className="section-label">What Evidence Means in Practice</span>
            </div>
            <h2 className="text-h2 text-primary-text text-center mb-8">This Is What a Traceable Answer Looks Like</h2>

            <div className="premium-card" style={{ background: "rgba(0,200,255,0.04)", border: "1px solid rgba(0,200,255,0.2)" }}>
              <div className="mb-1 text-fine text-accent">Example — Representative Data</div>

              <div className="mb-4 p-3 rounded" style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="text-body-sm font-semibold text-primary-text mb-2">Query:</div>
                <p className="text-body-sm text-secondary-text">"Which workcenter had the most unplanned downtime last week?"</p>
              </div>

              <div className="mb-4 p-3 rounded" style={{ background: "rgba(0,0,0,0.2)" }}>
                <div className="text-body-sm font-semibold text-primary-text mb-2">Response:</div>
                <p className="text-body-sm text-secondary-text">
                  Workcenter 7 had the most unplanned downtime last week — 14.3 hours across 4 separate events, all categorised as hydraulic fault. This is 3.2× Workcenter 7's 4-week rolling average. Machine M-112 within WC-7 contributed 8.4 of those hours.
                </p>
              </div>

              <div className="p-3 rounded" style={{ background: "rgba(0,200,255,0.08)" }}>
                <div className="text-body-sm font-semibold text-primary-text mb-2">EvidencePacket:</div>
                <div className="grid grid-cols-2 gap-2 text-fine text-secondary-text">
                  <div><span className="text-accent">Time window:</span> 7 days ending today</div>
                  <div><span className="text-accent">Scope:</span> Workcenter 7 — 8 of 8 machines covered</div>
                  <div><span className="text-accent">Grain:</span> Shift-level records</div>
                  <div><span className="text-accent">Record count:</span> 280 confirmed shifts</div>
                  <div><span className="text-accent">Coverage:</span> 100%</div>
                  <div><span className="text-accent">Source:</span> OEE metrics view (ISO 22400-2 ratio-of-sums)</div>
                </div>
              </div>
            </div>

            <p className="text-body-sm text-secondary-text mt-6 text-center">
              The 14.3 hours figure is computed from 280 shift-level records in the OEE metrics view. The EvidencePacket names every component of that computation. Every EKAS response includes this structure. Data shown is representative — your EvidencePacket reflects your production records.
            </p>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <div className="text-center mb-12">
              <span className="section-label">Common Questions</span>
              <h2 className="text-h2 text-primary-text mt-3">
                What Operations Teams Ask About EKAS
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  q: "How is EKAS different from our MES or BI tool?",
                  a: "EKAS does not replace your MES or ERP. It connects to your existing systems and applies governed metric definitions with full data provenance. Every calculation is traceable, versioned, and auditable — not ad hoc dashboards that drift over time.",
                },
                {
                  q: "What systems does EKAS connect to?",
                  a: "EKAS integrates with ERP systems, MES platforms, SCADA systems, and quality databases via read-only batch connection. Your source systems are never modified — EKAS only reads from them. If your manufacturing system exposes production data via database, API, or structured file export, EKAS can connect to it.",
                },
                {
                  q: "How long does implementation take?",
                  a: "A standard single-site pilot deployment reaches live production queries in four weeks. Week 1: environment setup and data connection. Weeks 2–3: metric validation against your confirmed production data. Week 4: user onboarding and go-live. The critical path is always data access — the platform itself deploys in days. Multi-site and complex integration engagements are scoped per project.",
                },
                {
                  q: "Is my production data secure?",
                  a: "All production data is encrypted in transit and at rest. Multi-tenant isolation is enforced at the database layer per user role and production site. A security packet covering architecture, data handling, and compliance controls is available within 24 hours of a qualification conversation.",
                },
                {
                  q: "Does EKAS support IATF 16949 and ISO compliance?",
                  a: "EKAS is designed to support IATF 16949 automotive quality requirements and the data provenance and audit trail requirements of regulated discrete manufacturing environments. Compliance documentation is available as part of the security packet provided within 24 hours of a qualification conversation.",
                },
                {
                  q: "What is an EvidencePacket?",
                  a: "An EvidencePacket is the provenance record attached to every EKAS response. It contains: the exact time window queried, the ISA-95 scope (site, workcenter, machine, or part), the data source, the record count, the coverage percentage, and the raw numerator and denominator values behind every calculated metric. If a number appears in an EKAS response, the EvidencePacket shows where it came from. If a number cannot be traced to a source record, it does not appear in the response.",
                },
                {
                  q: "What happens when EKAS cannot answer a question?",
                  a: "EKAS returns a structured response with a specific reason code — not a generic error and not an estimated answer presented as fact. Reasons include: time window has no data, entity could not be resolved to a known machine or workcenter, data quality issue detected in the source, or requested scope is outside the user's access permissions. Every structured response explains what was determined, what was not, and what the appropriate next step is.",
                },
                {
                  q: "Does EKAS replace our MES, ERP, or CMMS?",
                  a: "No. EKAS reads from your existing systems — it never writes to them. In any data conflict between your ERP record and an EKAS calculation, your ERP is authoritative. Scheduling stays in your MES. Work orders stay in your CMMS. Master data stays in your ERP. EKAS is the analytical intelligence layer.",
                },
              ].map((faq) => (
                <details key={faq.q} className="premium-card group">
                  <summary className="cursor-pointer list-none flex items-start justify-between gap-4">
                    <h3 className="text-h4 text-primary-text">{faq.q}</h3>
                    <svg
                      className="w-5 h-5 text-accent transition-transform group-open:rotate-180 flex-shrink-0 mt-1"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="text-body-sm text-secondary-text mt-3 pt-3 border-t border-white/10">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-6">
              <span className="section-label">Our Approach</span>
              <h2 className="text-h2 text-primary-text mt-3 mb-6">
                Our Approach
              </h2>
            </div>

            <div className="max-w-[860px] mx-auto mb-12">
              <p className="text-body-base text-secondary-text text-center">
                SME manufacturers have been burned before — by six-month MES implementations, six-figure consulting fees, and dashboards that never quite matched what was actually happening on the floor. EKAS is built to not be that. Here's what working with us looks like.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "2-Week Data Assessment",
                  body: "We start by reading your data, not rewriting your systems. Two weeks to inventory your ERP, MES, historian, and quality sources — identify what's clean, what's gapped, and what's silently lying. You get a written assessment with the OEE baseline, data integrity findings, and a concrete pilot scope before you commit to anything further.",
                },
                {
                  title: "30-Day Pilot Deployment",
                  body: "A bounded pilot on a defined scope — typically one production area or a target KPI set. Standard infrastructure, standard security posture (encrypted at rest and in transit, SSO, audit logging). Every calculation validated against ISO 22400-2 methodology before any number appears on a dashboard. If the pilot doesn't produce answers you can act on, you don't continue.",
                },
                {
                  title: "Governed Rollout",
                  body: "KPIs registered, definitions documented, data quality checks running nightly, findings surfaced when something drifts. Scale from one area to the full plant on your timeline — not on a Gantt chart written by a vendor who's never walked your floor. The system is architected to support IATF 16949, AS9100, and ISO 9001 quality workflows end-to-end.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>

            <p className="text-body-base text-secondary-text text-center max-w-[760px] mx-auto">
              No six-figure implementation. No data science team required. No waiting six months to see whether it works.
            </p>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">
              Bring One Plant Problem. We Will Show You How EKAS Approaches It.
            </h2>
            <p className="text-body-base text-secondary-text mb-8">
              A demonstration uses your operational context — the industry, process type, and business problem you describe. You will see how EKAS handles real manufacturing questions, how the EvidencePacket works, and what a governed answer looks like compared to a generic AI response.
            </p>
            <button onClick={() => setDemoOpen(true)} className="btn-primary mb-4">
              Request a Demonstration
            </button>
            <div>
              <a href="/resources/technical-overview" className="text-body-sm text-accent hover:underline">
                Read the Technical Overview →
              </a>
            </div>
          </div>
        </section>

        <FooterSection />
      </main>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
