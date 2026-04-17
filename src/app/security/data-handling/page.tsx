"use client";

import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function DataHandlingPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Data Handling</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              How Production Data is Collected, Stored, and Protected
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS connects to your MES, ERP, and SCADA systems to ingest production events, quality records, and downtime logs. All data is encrypted in transit and at rest, isolated by tenant, and never used for model training or cross-customer analytics.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <div className="space-y-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Data Collection and Ingestion</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  EKAS connects to production systems via read-only database queries, API calls, or file transfers. No data is written back to your MES or ERP. Ingestion runs on scheduled intervals; near real-time is supported for systems that expose event streams.
                </p>
                <ul className="space-y-2">
                  {[
                    "Read-only access to MES/ERP databases",
                    "TLS 1.3 encryption for all data transfer",
                    "No write permissions to production systems",
                    "Ingestion runs on defined schedule (hourly, daily, or event-driven)",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Data Storage and Isolation</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  Production data is stored in PostgreSQL with row-level security enforcing tenant isolation. 56 RLS policies ensure no customer can query another customer's data. Encryption at rest via AWS KMS with customer-managed keys.
                </p>
                <ul className="space-y-2">
                  {[
                    "PostgreSQL row-level security (56 tenant policies)",
                    "AWS KMS encryption at rest with CMK",
                    "No cross-tenant data access possible",
                    "Backup retention configurable per tenant",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">What EKAS Does Not Do</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  EKAS does not use your production data to train AI models, perform cross-customer analytics, or generate synthetic insights. Amazon Bedrock provides the LLM infrastructure with a zero-training-data guarantee. Your data is yours.
                </p>
                <ul className="space-y-2">
                  {[
                    "No model training on customer data",
                    "No cross-customer analytics or benchmarking",
                    "No data sharing with third parties",
                    "Amazon Bedrock zero-training-data contract",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Review Data Handling Practices</h2>
            <p className="text-body-base text-secondary-text">Our security packet includes detailed data flow diagrams and system access documentation.</p>
          </div>
        </section>
      </PageShell>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
