"use client";

import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function RolesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  const roles = [
    {
      id: "plant-managers",
      title: "Plant Managers",
      definition: "Plant managers run daily operations, manage shift performance, and ensure production targets are met. They need real-time visibility into downtime, OEE, and quality losses to run shift reviews and prioritize improvement efforts.",
      capabilities: "Shift performance dashboards, downtime attribution, cost impact visibility, governed metrics that align with finance reporting."
    },
    {
      id: "operations-leaders",
      title: "Operations Leaders",
      definition: "Operations leaders set improvement priorities, allocate resources, and drive continuous improvement across workcenters. They need to identify underperforming shifts, track trends, and focus effort where operational losses drive the most cost variance.",
      capabilities: "Performance trending by shift and workcenter, OEE decomposition, cost driver analysis, improvement prioritization based on dollar impact."
    },
    {
      id: "manufacturing-engineering",
      title: "Manufacturing Engineering",
      definition: "Manufacturing engineers design processes, troubleshoot recurring failures, and link production events to documented risk assessments. They need to trace downtime to documented failure modes and validate root causes with production data.",
      capabilities: "Failure mode attribution, supports failure analysis workflows, root cause analysis with production event logs, engineering decision support with full data provenance."
    },
    {
      id: "quality-leaders",
      title: "Quality Leaders",
      definition: "Quality leaders track defect rates, manage non-conformances, and ensure compliance with IATF 16949, ISO 13485, and AS9100. They need full traceability from quality metrics back to source inspection data for customer and regulatory audits.",
      capabilities: "First Pass Yield tracking, defect trending by part and workcenter, full data provenance for audit trails, quality loss visibility with cost impact."
    },
    {
      id: "finance-leaders",
      title: "Finance Leaders",
      definition: "Finance leaders track cost variance, analyze margin drivers, and reconcile operational performance with financial results. They need governed cost attribution that connects operational losses to dollar impact with logic operations teams trust.",
      capabilities: "Cost variance tracking by workcenter and shift, burden rate infrastructure, operational loss quantification, governed metrics that align with ERP data."
    },
    {
      id: "executive-operations",
      title: "Executive / PE Operations",
      definition: "Executives and private equity operating partners oversee multi-site portfolios and need to compare facility performance with standardized metrics. They require portfolio-level visibility with governed definitions and full audit trails.",
      capabilities: "Multi-tenant architecture with site isolation, standardized metrics across facilities, portfolio intelligence, cross-site performance comparison."
    }
  ];

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
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
            <p className="text-body-base text-secondary-text mb-8">
              Bring a question your team asks every day. We'll show you how EKAS answers it.
            </p>
            <button onClick={() => setDemoOpen(true)} className="btn-primary">Request a Demo</button>
          </div>
        </section>
      </PageShell>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
