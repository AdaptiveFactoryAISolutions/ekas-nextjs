import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Roles",
  description: "How EKAS serves plant managers, operations leaders, engineering, quality, finance, and executive teams with role-specific intelligence.",
  path: "/roles",
});

export default function RolesPage() {

  const roles = [
    {
      id: "plant-managers",
      title: "Plant Managers / Operations Directors",
      definition: "Plant managers run daily operations, manage shift performance, and ensure production targets are met. They need real-time visibility into downtime, OEE, and quality losses to run shift reviews and prioritize improvement efforts.",
      capabilities: "EKAS provides governed OEE metrics, downtime attribution, shift handoff intelligence, and cost variance visibility — all traceable to confirmed production data. Ask questions in plain language. Receive answers with full provenance. No dashboards to configure. No SQL required."
    },
    {
      id: "operations-leaders",
      title: "Operations Leaders",
      definition: "Operations leaders set improvement priorities, allocate resources, and drive continuous improvement across workcenters. They need to identify underperforming shifts, track trends, and focus effort where operational losses drive the most cost variance.",
      capabilities: "Performance trending by shift and workcenter, OEE decomposition, cost driver analysis, improvement prioritization based on dollar impact."
    },
    {
      id: "manufacturing-engineering",
      title: "Engineering / Process Engineering",
      definition: "Manufacturing engineers design processes, troubleshoot recurring failures, and link production events to documented risk assessments. They need to trace downtime to documented failure modes and validate root causes with production data.",
      capabilities: "Surface downtime patterns, failure modes, and process capability trends from confirmed production data. Connect production events to documented risk assessments and corrective actions. Query production history to support root cause analysis faster and with more confidence."
    },
    {
      id: "quality-leaders",
      title: "Quality Manager",
      definition: "Quality leaders track defect rates, manage non-conformances, and ensure compliance with IATF 16949 and other regulatory requirements. They need full traceability from quality metrics back to source inspection data for customer and regulatory audits.",
      capabilities: "Monitor First Pass Yield, defect patterns, and quality losses by part, machine, and shift. Connect quality events to documented failure modes. Track scrap units, rework hours, and quality hold time across production runs. IATF 16949 audit trail by design."
    },
    {
      id: "finance-leaders",
      title: "Plant Controller / Finance",
      definition: "Finance leaders track cost variance, analyze margin drivers, and reconcile operational performance with financial results. They need governed cost attribution that connects operational losses to dollar impact with logic operations teams trust.",
      capabilities: "Track scrap cost, downtime cost, and OEE efficiency loss by workcenter — from confirmed production data, any day, without waiting for period close. Cost variance reporting with full data lineage. Burden rate application tracked and auditable. EvidencePacket on every financial answer."
    },
    {
      id: "executive-operations",
      title: "Executive / PE Operations",
      definition: "Executives and private equity operating partners oversee multi-site portfolios and need to compare facility performance with standardized metrics. They require portfolio-level visibility with governed definitions and full audit trails.",
      capabilities: "Multi-tenant architecture with site isolation, standardized metrics across facilities, portfolio intelligence, cross-site performance comparison."
    }
  ];

  return (
    <PageShell>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Roles</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Relevant to Every Decision-Maker on the Floor and Above It
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS delivers role-specific answers so every team member — from the floor to the boardroom — gets the insight they need to act.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="space-y-8">
              {roles.map((role) => (
                <div key={role.id} id={role.id} className="premium-card scroll-mt-24">
                  <h3 className="text-h3 text-primary-text mb-3">{role.title}</h3>
                  <p className="text-body-base text-secondary-text mb-4">
                    {role.definition}
                  </p>
                  <div className="pt-3 border-t border-white/10">
                    <p className="text-fine text-accent mb-2">How EKAS Helps:</p>
                    <p className="text-body-sm text-secondary-text">
                      {role.capabilities}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See EKAS for Your Role</h2>
            <p className="text-body-base text-secondary-text">
              Bring a question your team asks every day. We'll show you how EKAS answers it.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
