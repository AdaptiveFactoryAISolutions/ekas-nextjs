import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Governance",
  description: "Versioned metric definitions, full data provenance, role-based access, and zero-compromise release policy. Every calculation traceable to source.",
  path: "/security/governance",
});

export default function GovernancePage() {
  return (
    <PageShell>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Governance</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Governed Metrics, Auditable Calculations, and Full Provenance
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS governance is built around deterministic, versioned metric definitions and full data lineage. Every calculation is traceable, auditable, and reproducible — critical for manufacturing environments that answer to finance teams, customer audits, and regulatory bodies.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
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

        {/* Zero-Compromise QA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Release Quality</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Zero-Compromise Release Policy
            </h2>
            <p className="text-body-base text-secondary-text">
              EKAS enforces a four-tier defect classification. Priority 0 defects — incorrect financial results, access control violations, incorrect OEE calculations — block all releases until fully resolved. Every defect at any priority triggers documented root cause analysis, corrective action, and preventive measures, with an immutable audit trail.
            </p>
            <p className="text-body-base text-secondary-text mt-4">
              This standard exists because manufacturing teams make real operational decisions from EKAS outputs. A wrong cost figure or a bypassed access control is not a UX issue — it is an operational and compliance risk. The zero-compromise policy treats it accordingly.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Governance in Action</h2>
            <p className="text-body-base text-secondary-text">Bring a question about metric traceability. We'll show you the full provenance chain.</p>
          </div>
        </section>
      </PageShell>
  );
}
