"use client";

import Link from "next/link";
import { DollarSign, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export default function CostDriverAnalysisPage() {
  return (
    <PageShell>
      {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Solutions
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <DollarSign size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Cost Driver Analysis
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Attribute labor, burden, machine, and material variance to the workcenter, shift, and operational event that generated it.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Problem</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Margin Leaks Through Operational Losses You Can't See
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              Most plants know their month-end cost variance. What they don't know is which machines, shifts, and operational events drove it. By the time variance shows up in financial reports, the losses have already compounded and the opportunity to intervene is gone.
            </p>
            <p className="text-body-base text-secondary-text">
              Without real-time connection between operational performance and time/resource impact, teams can't prioritize improvement effort where it matters most.
            </p>
          </div>
        </section>

        {/* How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How EKAS Helps</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">Cost Infrastructure and Variance Tracking</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Burden rate infrastructure in place",
                  body: "EKAS cost model architecture supports labor, burden, and material cost tracking with full provenance (documented in EBITDA Architecture).",
                },
                {
                  title: "Cost variance tracking operational",
                  body: "Connect operational losses to hour/unit impact using governed burden rates and standardized cost logic.",
                },
                {
                  title: "Dollar quantification capabilities",
                  body: "Infrastructure exists for cost attribution; ongoing enhancement per EBITDA documentation to enable comprehensive dollar quantification workflows.",
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
            <h2 className="text-h2 text-primary-text mb-4">See Cost Driver Analysis in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring a cost variance challenge. We'll show you how EKAS connects operational losses to time and resource quantification.
            </p>
          </div>
        </section>
    </PageShell>
  );
}
