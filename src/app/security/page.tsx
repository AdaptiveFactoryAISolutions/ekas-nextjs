"use client";

import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function SecurityPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Security & Governance</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Governance and Trust Designed for Serious Manufacturing Environments
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS is built to support credible operational answers, controlled access, and enterprise-ready review.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-h3 text-primary-text mb-6">Trust Model</h3>
                <div className="space-y-4">
                  {[
                    { title: "Data Grounding", body: "Every answer comes from your production data. EKAS does not generate, estimate, or interpolate." },
                    { title: "Governance & Traceability", body: "Every response carries full provenance — SQL hash, catalog version, data source, record count, and UTC timestamp." },
                    { title: "Access Control", body: "Role-based access enforced cryptographically via JWT RS256 with 4096-bit keys. MFA required." },
                    { title: "Auditability", body: "IATF 16949 audit trail on every calculation. 146+ automated gate tests passing." },
                  ].map((item) => (
                    <div key={item.title} className="pb-4 border-b border-white/10 last:border-0">
                      <h4 className="text-h4 text-primary-text mb-1">{item.title}</h4>
                      <p className="text-body-sm text-secondary-text">{item.body}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-h3 text-primary-text mb-6">Security Stack</h3>
                <div className="space-y-2">
                  {[
                    "Amazon Bedrock — zero-training-data guarantee",
                    "AWS Cognito — MFA required, 1-hour token expiry",
                    "JWT RS256 — 4096-bit keys, role-based access",
                    "AWS KMS — 3 customer master keys",
                    "AWS CloudTrail — full API audit log",
                    "AWS GuardDuty — continuous threat detection",
                    "PostgreSQL RLS — 56 tenant isolation policies",
                    "Zero-Port-22 — no SSH access to production",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff" }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Security Topics Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-12">
              <span className="section-label">Explore Security Topics</span>
              <h2 className="text-h2 text-primary-text mt-3 mb-4">
                Deep Dive into EKAS Security Architecture
              </h2>
              <p className="text-body-base text-secondary-text">
                Review detailed documentation on how EKAS governs metrics, handles data, and implements defense-in-depth security.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <a href="/security/governance" className="premium-card block transition-all duration-200 hover:border-accent/30">
                <h3 className="text-h4 text-primary-text mb-3">Governance</h3>
                <p className="text-body-sm text-secondary-text mb-4">
                  Versioned metrics and full data provenance. Every calculation is traceable, auditable, and reproducible.
                </p>
                <span className="text-fine text-accent">Learn more →</span>
              </a>

              <a href="/security/data-handling" className="premium-card block transition-all duration-200 hover:border-accent/30">
                <h3 className="text-h4 text-primary-text mb-3">Data Handling</h3>
                <p className="text-body-sm text-secondary-text mb-4">
                  How production data is collected and protected. Read-only access, tenant isolation, zero-training-data guarantee.
                </p>
                <span className="text-fine text-accent">Learn more →</span>
              </a>

              <a href="/security/architecture" className="premium-card block transition-all duration-200 hover:border-accent/30">
                <h3 className="text-h4 text-primary-text mb-3">Architecture</h3>
                <p className="text-body-sm text-secondary-text mb-4">
                  AWS-native with SOC 2 Type II controls. Defense-in-depth security from authentication to infrastructure.
                </p>
                <span className="text-fine text-accent">Learn more →</span>
              </a>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Ready to Review the Architecture?</h2>
            <p className="text-body-base text-secondary-text">Our security packet is available within 24 hours of a qualification conversation.</p>
          </div>
        </section>
      </PageShell>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
