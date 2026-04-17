"use client";

import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function IndustriesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Industries</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Manufacturing Intelligence for Discrete Manufacturing Environments
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS is purpose-built for environments where downtime costs money, scrap erodes margin, and data fragmentation slows decisions.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <div className="space-y-6">
              {[
                { industry: "Metal Stamping", pain: "High-volume press environments with tight tolerances and scrap rate sensitivity.", fit: "EKAS connects press OEE, die performance, and material yield in one governed analytics layer." },
                { industry: "Automotive", pain: "Tier 1/2/3 suppliers operating under IATF 16949 with strict traceability requirements.", fit: "EKAS provides the audit trail, provenance architecture, and OEE governance automotive OEMs increasingly require." },
                { industry: "Aerospace & Defense", pain: "Precision manufacturing with strict traceability and compliance requirements.", fit: "Every answer traceable to source, every metric governed by deterministic logic." },
                { industry: "Medical Devices", pain: "Regulated environments where production visibility and quality traceability are non-negotiable.", fit: "Governed metrics with full provenance for environments where compliance is a requirement, not a preference." },
                { industry: "General Discrete Manufacturing", pain: "Mid-market manufacturers dealing with downtime, scrap, cost variance, and fragmented plant data.", fit: "One grounded decision layer across shifts, workcenters, and facilities." },
              ].map((item) => (
                <div key={item.industry} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{item.industry}</h3>
                  <p className="text-body-sm text-secondary-text mb-2">{item.pain}</p>
                  <p className="text-body-sm text-accent">{item.fit}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See How EKAS Fits Your Environment</h2>
            <p className="text-body-base text-secondary-text mb-8">Tell us about your operation. We'll show you what EKAS can do.</p>
            <button onClick={() => setDemoOpen(true)} className="btn-primary">Request a Demo</button>
          </div>
        </section>
      </PageShell>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
