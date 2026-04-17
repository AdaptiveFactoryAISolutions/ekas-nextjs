"use client";

import { useState } from "react";
import Link from "next/link";
import { BarChart3, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function ManufacturingIntelligencePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/platform" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Platform
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <BarChart3 size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Manufacturing Intelligence
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Governed metrics, deterministic computation, and traceable provenance for every production calculation.
            </p>
          </div>
        </section>

        {/* What It Is */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">What It Is</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              The Foundation of Every EKAS Capability
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              Manufacturing Intelligence is the analytical core of EKAS. It transforms raw production events from your MES, ERP, and shop floor systems into governed, auditable metrics that drive operational decisions.
            </p>
            <p className="text-body-base text-secondary-text">
              Every metric calculation in EKAS — OEE, downtime tracking, First Pass Yield, capacity utilization — is executed through versioned SQL logic with full data provenance. No estimation. No interpolation. No black box.
            </p>
          </div>
        </section>

        {/* Core Metrics */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Core Metrics</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-8">
              What Manufacturing Intelligence Calculates
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "OEE & Equipment Performance",
                  metrics: ["Overall Equipment Effectiveness", "Availability", "Performance", "Quality", "Unplanned Downtime", "Changeover Time"],
                },
                {
                  title: "Quality & Yield",
                  metrics: ["First Pass Yield", "Scrap Rate", "Rework Rate", "Defect Density", "Quality Hold Time", "Failure Mode Frequency"],
                },
                {
                  title: "Cost Attribution",
                  metrics: ["Labor Hours by Workcenter", "Burden Hour Tracking", "Material Variance", "Downtime Hour Impact", "Scrap Unit Tracking", "Unit Production Time"],
                },
                {
                  title: "Capacity & Throughput",
                  metrics: ["Available Capacity (OEE-adjusted)", "Effective Throughput", "Bottleneck Analysis", "Utilization by Shift", "Product Mix Capacity", "Constraint Identification"],
                },
              ].map((category) => (
                <div key={category.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-3">{category.title}</h3>
                  <ul className="space-y-2">
                    {category.metrics.map((metric) => (
                      <li key={metric} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                        <span className="text-body-sm text-secondary-text">{metric}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How It Works</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">
              From Raw Production Data to Governed Metrics
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  step: "1",
                  title: "Data ingestion from MES/ERP",
                  body: "Production events, quality records, downtime logs, and cost data flow from your existing systems into the EKAS data model.",
                },
                {
                  step: "2",
                  title: "Governed SQL executes calculation",
                  body: "Versioned metric definitions compute performance, quality, and cost metrics using deterministic logic — no estimation or black box calculation.",
                },
                {
                  step: "3",
                  title: "Results return with provenance",
                  body: "Every metric includes the SQL hash, catalog version, data source, record count, and timestamp for full auditability.",
                },
              ].map((item) => (
                <div key={item.step} className="premium-card">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center mb-3" style={{ background: "rgba(0,200,255,0.12)" }}>
                    <span className="text-body-sm font-bold" style={{ color: "#00c8ff" }}>{item.step}</span>
                  </div>
                  <h3 className="text-h4 text-primary-text mb-2">{item.title}</h3>
                  <p className="text-body-sm text-secondary-text">{item.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why It Matters */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Why It Matters</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Governed Metrics You Can Trust
            </h2>
            <div className="space-y-3">
              {[
                "Every calculation is versioned and auditable — no surprises when metric definitions change",
                "Full data lineage from production event to final metric — trace every number back to source",
                "Consistent logic across all facilities — multi-site performance becomes comparable",
                "Finance and operations use the same calculation — no more disagreement on OEE or downtime hours",
                "Designed to support IATF 16949 and ISO compliance — traceability and governance by design",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "rgba(0,200,255,0.04)" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                  <span className="text-body-sm text-secondary-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Manufacturing Intelligence in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring a metric calculation challenge. We will show you how EKAS computes it with governed logic and full provenance.
            </p>
          </div>
        </section>
      </PageShell>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
