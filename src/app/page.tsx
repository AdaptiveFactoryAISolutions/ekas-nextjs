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
      <main style={{ position: "relative", zIndex: 1 }}>
        <HeroSection onDemoClick={() => setDemoOpen(true)} />

        {/* Trust Strip Section */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 max-w-[1100px] mx-auto">
              {[
                { label: "Manufacturing-Focused" },
                { label: "Traceable Answers" },
                { label: "Governed Metrics" },
                { label: "Audit-Ready Workflows" },
                { label: "Pilot-Ready Engagement" },
                { label: "Built From Plant Experience" },
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

        {/* Problems Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
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
                  title: "Ungrounded AI Answers",
                  body: "LLMs hallucinate when trained on production data. EKAS uses retrieval-only architecture with zero training, so every answer is grounded in your actual data with full citation."
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

        {/* FAQ Section */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
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
                  a: "EKAS integrates with MES platforms, ERP systems, SCADA systems, and quality databases. If your manufacturing system exposes production data via database, API, or file export, EKAS can connect.",
                },
                {
                  q: "How long does implementation take?",
                  a: "Typical deployment ranges from 6 to 12 weeks depending on data source complexity and multi-site scope. Proof-of-concept deployments can be operational in 2-4 weeks for single-site environments.",
                },
                {
                  q: "Is my production data secure?",
                  a: "Yes. All data is encrypted in transit (TLS 1.3) and at rest (AWS KMS). Multi-tenant isolation is enforced via PostgreSQL row-level security. EKAS operates under SOC 2 Type II controls with annual audits. Your data is never used for model training or shared with third parties.",
                },
                {
                  q: "Does EKAS support IATF 16949 and ISO compliance?",
                  a: "Yes. EKAS is designed to support IATF 16949, ISO 13485, AS9100, and FDA 21 CFR Part 11. Every metric calculation includes full data provenance and audit trail required for customer and regulatory audits.",
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

        {/* Final CTA Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">
              Bring One Plant Problem. We'll Show You How EKAS Approaches It.
            </h2>
            <p className="text-body-base text-secondary-text">
              See how grounded manufacturing intelligence can help your team move faster on downtime, time variance, quality losses, and production visibility.
            </p>
          </div>
        </section>

        <FooterSection />
      </main>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
