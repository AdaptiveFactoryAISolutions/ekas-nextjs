"use client";

import { useState } from "react";
import Link from "next/link";
import { User, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function FounderPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/about" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to About
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <User size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Our Founder
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text mb-8">
              EKAS exists to fill a gap: manufacturing operations need governed metrics and data provenance.
            </p>
          </div>
        </section>

        {/* Philosophy */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Philosophy</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Core Principles
            </h2>
            <div className="space-y-4">
              {[
                {
                  principle: "Governed metrics are not optional",
                  detail: "If finance and operations calculate OEE differently, someone is wrong — or the metric is ungoverned. Manufacturing needs versioned, auditable calculation logic, not ad hoc dashboards.",
                },
                {
                  principle: "AI should orchestrate, not calculate",
                  detail: "Language models are excellent at understanding questions and selecting analytical tools. They are not reliable calculators. Deterministic SQL should execute the math; AI should make it accessible.",
                },
                {
                  principle: "Data provenance is not a feature — it is a requirement",
                  detail: "Every metric result must carry the full lineage: which SQL executed, which data source provided input, how many records were queried, and when. Anything less is not enterprise-grade.",
                },
                {
                  principle: "Manufacturing is too important to guess",
                  detail: "Production decisions have financial, operational, and safety consequences. Estimation, interpolation, and black-box calculation are unacceptable in environments that answer to audits and shareholders.",
                },
              ].map((item) => (
                <div key={item.principle} className="p-4 rounded-lg" style={{ background: "rgba(0,200,255,0.04)" }}>
                  <p className="text-body-sm font-semibold text-primary-text mb-1">{item.principle}</p>
                  <p className="text-body-sm text-secondary-text">{item.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See the Philosophy in Practice</h2>
            <p className="text-body-base text-secondary-text mb-8">
              Request a demo to see how governed metrics and data provenance work in manufacturing operations.
            </p>
            <button onClick={() => setDemoOpen(true)} className="btn-primary">
              Request a Demo
            </button>
          </div>
        </section>
      </PageShell>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
