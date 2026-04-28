"use client";

import Link from "next/link";
import { TrendingUp, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export default function CapacityThroughputPage() {
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
                <TrendingUp size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Capacity & Throughput Analysis
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Find where production flow is constrained and size capacity against actual OEE — not theoretical hours.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Problem</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Capacity Planning Needs Actual Performance Data
            </h2>
            <p className="text-body-base text-secondary-text">
              Planning based on theoretical capacity can lead to missed commitments when actual throughput is constrained by downtime, changeovers, and quality holds that never appear in the theoretical model.
            </p>
          </div>
        </section>

        {/* How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How EKAS Helps</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">Track OEE and Capacity Visibility</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Track OEE components",
                  body: "Monitor availability, performance, and quality losses with full provenance back to source data.",
                },
                {
                  title: "Visibility into capacity constraints",
                  body: "See where throughput is limited by tracking actual performance against theoretical capacity.",
                },
                {
                  title: "Governed metrics across workcenters",
                  body: "Apply consistent OEE calculations so capacity is measured the same way across equipment and shifts.",
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
            <h2 className="text-h2 text-primary-text mb-4">See Capacity Analysis in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring a capacity challenge. We'll show you how EKAS sizes real capacity against actual performance.
            </p>
          </div>
        </section>
    </PageShell>
  );
}
