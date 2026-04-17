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

        {/* Governance Section */}
        <section id="governance" className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Governance</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Governed Metrics, Auditable Calculations, and Full Provenance
            </h2>
            <p className="text-body-base text-secondary-text mb-8">
              EKAS governance is built around deterministic, versioned metric definitions and full data lineage. Every calculation is traceable, auditable, and reproducible — critical for manufacturing environments that answer to finance teams, customer audits, and regulatory bodies.
            </p>

            <div className="space-y-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Versioned Metric Definitions</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  Every metric in EKAS — OEE, downtime tracking, First Pass Yield, capacity utilization — is defined in versioned SQL with a cryptographic hash. When metric logic changes, the version increments and the hash updates. Historic calculations remain tied to the definition that generated them.
                </p>
                <ul className="space-y-2">
                  {[
                    "SQL logic stored in version-controlled catalog",
                    "SHA-256 hash on every metric definition",
                    "Historic results tied to definition version",
                    "No silent drift in calculation methods",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Full Data Provenance</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  Every metric result includes the full provenance chain: which SQL definition executed, which data source provided the input, how many records were queried, and the UTC timestamp of calculation. Audit trail is automatic, not optional.
                </p>
                <ul className="space-y-2">
                  {[
                    "SQL hash and catalog version on every result",
                    "Data source, record count, and timestamp",
                    "Query execution plan logged for review",
                    "IATF 16949 audit trail by design",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Role-Based Metric Access</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  Not all metrics should be visible to all users. EKAS enforces role-based access to metric definitions, dashboards, and export capabilities. Plant managers see shift performance; executives see portfolio-level trends; finance sees cost attribution.
                </p>
                <ul className="space-y-2">
                  {[
                    "Role-based dashboard and report access",
                    "Metric visibility controlled by tenant policy",
                    "Query permissions enforced at database layer",
                    "Audit log of who accessed what, when",
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

        {/* Data Handling Section */}
        <section id="data-handling" className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Data Handling</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              How Production Data is Collected, Stored, and Protected
            </h2>
            <p className="text-body-base text-secondary-text mb-8">
              EKAS connects to your MES, ERP, and SCADA systems to ingest production events, quality records, and downtime logs. All data is encrypted in transit and at rest, isolated by tenant, and never used for model training or cross-customer analytics.
            </p>

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

        {/* Architecture Section */}
        <section id="architecture" className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Architecture</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              AWS-Native, Multi-Tenant, and SOC 2 Type II Controls
            </h2>
            <p className="text-body-base text-secondary-text mb-8">
              EKAS is deployed on AWS with a defense-in-depth security model. Authentication via AWS Cognito with MFA required. Tenant isolation enforced at the database, API, and infrastructure layers. Continuous monitoring via GuardDuty and CloudTrail.
            </p>

            <div className="space-y-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Authentication and Authorization</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  Users authenticate via AWS Cognito with MFA enforcement. JWT RS256 tokens signed with 4096-bit keys carry role-based claims. Token expiry is 1 hour; refresh requires re-authentication after 24 hours.
                </p>
                <ul className="space-y-2">
                  {[
                    "AWS Cognito with MFA required",
                    "JWT RS256 tokens, 4096-bit signing keys",
                    "Role-based access claims in JWT payload",
                    "1-hour token expiry, 24-hour max session",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Infrastructure Security</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  EKAS runs in private AWS VPC subnets with no direct internet access to database or compute instances. API Gateway enforces request validation and rate limiting. No SSH access to production (Zero-Port-22 policy).
                </p>
                <ul className="space-y-2">
                  {[
                    "Private VPC subnets, no public IP on database",
                    "API Gateway with request validation and throttling",
                    "Zero-Port-22 — no SSH access to production",
                    "AWS Systems Manager for secure instance access",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Monitoring and Threat Detection</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  AWS GuardDuty monitors for threats and anomalous behavior. CloudTrail logs every API call for audit and forensic review. Automated alerts for unauthorized access attempts, privilege escalation, or data exfiltration patterns.
                </p>
                <ul className="space-y-2">
                  {[
                    "AWS GuardDuty continuous threat detection",
                    "AWS CloudTrail full API audit log",
                    "Automated alerting for security events",
                    "Incident response playbooks documented",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                      <span className="text-body-sm text-secondary-text">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Compliance and Audit Readiness</h3>
                <p className="text-body-sm text-secondary-text mb-3">
                  EKAS is designed to support IATF 16949, ISO 13485, AS9100, and SOC 2 Type II compliance. Security packet documentation, penetration test results, and audit logs available for qualified enterprise customers.
                </p>
                <ul className="space-y-2">
                  {[
                    "SOC 2 Type II controls in place",
                    "IATF 16949 traceability by design",
                    "Security packet available on request",
                    "Annual penetration testing",
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
