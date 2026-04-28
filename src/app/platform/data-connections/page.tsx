"use client";

import Link from "next/link";
import { Database, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export default function DataConnectionsPage() {
  return (
    <PageShell>
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
                <Database size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Data Connections
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Secure, read-only integration with manufacturing data sources. Real production data flows into EKAS with full provenance tracking and tenant isolation.
            </p>
          </div>
        </section>

        {/* Integration Philosophy */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Integration Architecture</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Read-Only Data Integration
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              EKAS integrates with manufacturing data sources through secure, read-only connections. Our integration architecture supports major MES, ERP, SCADA, and shop floor systems while maintaining strict tenant isolation and data provenance tracking.
            </p>
            <p className="text-body-base text-secondary-text">
              Data flows into EKAS, normalized to ISA-95 equipment hierarchy structure, and made available for governed metric calculation. Every data point includes full provenance: which source system provided it, when it was collected, and how many records were queried.
            </p>
          </div>
        </section>

        {/* Data Normalization */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Data Normalization</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              From Disparate Systems to Unified Model
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              Every manufacturing system has different field names, data structures, and event models. EKAS normalizes incoming data to ISA-95 equipment hierarchy (Site → Department → Workcenter → Machine) and standardized event types.
            </p>
            <p className="text-body-base text-secondary-text">
              The result: consistent, governed metrics across all facilities and systems, with full data provenance on every calculation.
            </p>
          </div>
        </section>

        {/* Security & Compliance */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Security & Compliance</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Read-Only, Audited, and Encrypted
            </h2>
            <div className="space-y-3">
              {[
                "Read-only database access — EKAS never writes to your production systems",
                "Encrypted data transfer via TLS 1.3 for all connections",
                "All queries logged and auditable with full provenance tracking",
                "PostgreSQL Row-Level Security (RLS) for multi-tenant data isolation",
                "Enterprise security controls and IATF 16949 traceability support",
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
            <h2 className="text-h2 text-primary-text mb-4">Discuss Your Integration Requirements</h2>
            <p className="text-body-base text-secondary-text">
              Tell us about your manufacturing systems and data sources. We will walk you through EKAS integration architecture and security approach.
            </p>
          </div>
        </section>
    </PageShell>
  );
}
