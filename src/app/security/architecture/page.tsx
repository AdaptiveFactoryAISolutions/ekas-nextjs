"use client";

import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function ArchitecturePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Architecture</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              AWS-Native, Multi-Tenant, and SOC 2 Type II Controls
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS is deployed on AWS with a defense-in-depth security model. Authentication via AWS Cognito with MFA required. Tenant isolation enforced at the database, API, and infrastructure layers. Continuous monitoring via GuardDuty and CloudTrail.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
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

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Request Security Packet</h2>
            <p className="text-body-base text-secondary-text">Our security packet is available within 24 hours of a qualification conversation.</p>
          </div>
        </section>
      </PageShell>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
