"use client";

import { useState } from "react";
import { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function PlatformPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Platform</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              A Manufacturing Intelligence Layer Built for Operational Decisions
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS helps teams move from fragmented production data to grounded answers, governed metrics, and faster action.
            </p>
          </div>
        </section>

        {/* Screenshot */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <div className="premium-card overflow-hidden">
              <img src="/ekas-dashboard.jpg" alt="EKAS Platform" className="w-full" />
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

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  title: "Conversational Manufacturing Intelligence",
                  body: "Ask operational questions in plain language and get grounded, traceable answers from your production data.",
                },
                {
                  title: "Operational Analytics",
                  body: "OEE, downtime, quality, capacity, and cost analytics with drill-down across your equipment hierarchy.",
                },
                {
                  title: "KPI & Exception Visibility",
                  body: "Performance thresholds, trend deviations, and anomalies across shifts and workcenters.",
                },
                {
                  title: "Root-Cause Support",
                  body: "Trace failures to documented failure modes. Connect live events to corrective actions.",
                },
                {
                  title: "Reporting & Decision Workflows",
                  body: "Shift briefings, executive summaries, and cost variance reports generated from governed data.",
                },
                {
                  title: "Role-Aware Views",
                  body: "Each role sees the metrics and answers relevant to their decisions — no noise, no clutter.",
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

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See It in Action</h2>
            <p className="text-body-base text-secondary-text mb-8">
              Bring a plant problem. We'll show you how EKAS approaches it.
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
