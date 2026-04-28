"use client";

import Link from "next/link";
import { FileText, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export default function ReportingAnalyticsPage() {
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
                <FileText size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Reporting & Analytics
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Analytics grounded in governed metrics. Every calculation backed by full data provenance and role-based access control.
            </p>
          </div>
        </section>

        {/* Analytics Foundation */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Analytics Foundation</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Governed Metrics Enable Reliable Reporting
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              EKAS analytics are built on governed metrics: versioned SQL definitions with cryptographic hash verification and full data provenance. Every metric calculation includes which SQL definition executed, which data source provided the input, how many records were queried, and the UTC timestamp of calculation.
            </p>
            <p className="text-body-base text-secondary-text">
              This governed approach ensures analytics reliability. Finance and operations see the same numbers. Metrics are consistent across all reporting. No spreadsheet errors, no calculation drift, no disagreement on the source of truth.
            </p>
          </div>
        </section>

        {/* Provenance & Auditability */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Provenance & Auditability</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Every Number is Traceable
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              EKAS provides full data provenance on every metric. Trace any calculation back to source events, original data records, and the specific SQL definition that produced the result. This provenance architecture supports IATF 16949 traceability requirements and customer audit preparation.
            </p>
            <p className="text-body-base text-secondary-text">
              Provenance capsules include: SHA-256 hash of metric definition, catalog version, row count, query timestamp, and source system identifier. Audit trail is automatic, not optional.
            </p>
          </div>
        </section>

        {/* Role-Based Access */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Security & Access Control</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Role-Based Data Access
            </h2>
            <div className="space-y-3">
              {[
                "PostgreSQL Row-Level Security (RLS) enforces multi-tenant data isolation",
                "Role-based access control ensures users only see metrics authorized for their tenant and role",
                "All analytics queries are logged and auditable with full provenance tracking",
                "Enterprise security controls for data security and privacy",
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
            <h2 className="text-h2 text-primary-text mb-4">See Governed Analytics in Action</h2>
            <p className="text-body-base text-secondary-text">
              Tell us what metrics you track today. We will show you how EKAS governed metrics provide reliable analytics foundation with full data provenance.
            </p>
          </div>
        </section>
    </PageShell>
  );
}
