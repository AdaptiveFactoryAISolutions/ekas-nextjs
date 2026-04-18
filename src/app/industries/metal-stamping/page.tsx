import type { Metadata } from "next";
import Link from "next/link";
import { Layers, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Metal Stamping — EKAS by AdaptiveFactory",
  description: "Press OEE, die performance, and material yield tracking for precision metal stamping operations.",
};

export default function MetalStampingPage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/industries" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Industries
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <Layers size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                EKAS for Metal Stamping
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Metal stamping operations track die performance, changeover time, and scrap by part with governed metrics and full data provenance.
            </p>
          </div>
        </section>

        {/* Industry Context & How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <h2 className="text-h2 text-primary-text mb-4">
              Metal Stamping and EKAS Platform Applicability
            </h2>
            <p className="text-body-base text-secondary-text mb-6">
              Metal stamping operations face challenges with die changeover tracking, press performance visibility, and scrap attribution. EKAS platform capabilities apply to stamping operations through OEE tracking by press, downtime attribution to dies and tooling, quality loss visibility by part, and governed metrics with full provenance.
            </p>

            <div className="p-4 rounded-lg mb-6" style={{ background: "rgba(0,200,255,0.04)" }}>
              <p className="text-body-sm font-semibold text-primary-text mb-2">Compliance Support</p>
              <p className="text-body-sm text-secondary-text">
                IATF 16949 and customer audit requirements: EKAS provenance and traceability architecture supports PPAP documentation, first article inspection traceability, and production event audit trails required for automotive customer compliance.
              </p>
            </div>

            <p className="text-body-base text-secondary-text">
              General platform applicability: Governed metric definitions, data provenance from answer to source, multi-tenant architecture for multi-facility stampers, and cost variance tracking with burden rate infrastructure.
            </p>
          </div>
        </section>

        {/* Deployment Proof */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Built for Precision Stampers</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Press OEE, Die Performance, and Yield Tracking — Governed by Design
            </h2>
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
        </section>

        {/* FMEA Intelligence */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">FMEA Intelligence</span>
            <div className="inline-block px-2 py-1 rounded mb-3" style={{ background: "rgba(255,165,0,0.15)", border: "1px solid rgba(255,165,0,0.3)" }}>
              <span className="text-fine" style={{ color: "#ffa500" }}>In Development</span>
            </div>
            <h2 className="text-h2 text-primary-text mb-4">
              Failure Mode Connection (In Development)
            </h2>
            <p className="text-body-base text-secondary-text">
              EKAS is building a capability to index your FMEA corpus and connect documented failure modes to live production events. Ask about causes, effects, and corrective actions — retrieval infrastructure is built, corpus ingestion is in progress.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See EKAS for Metal Stamping</h2>
            <p className="text-body-base text-secondary-text">
              Request a demo to see how EKAS platform capabilities apply to metal stamping operations.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
