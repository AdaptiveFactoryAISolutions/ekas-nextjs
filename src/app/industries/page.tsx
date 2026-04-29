import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industries",
  description: "EKAS deployment depth across precision metal stamping, automotive Tier 2/3 suppliers, and discrete industrial manufacturing operations under regulated quality regimes.",
  path: "/industries",
});

export default function IndustriesPage() {
  return (
    <PageShell>
      <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Industries</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Industries
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS is purpose-built for SME manufacturers (fewer than 250 employees) in precision metal stamping, fabrication, and industrial manufacturing. Deep domain expertise in these verticals — not generic manufacturing platform coverage applied everywhere.
            </p>
            <p className="text-body-base text-secondary-text mt-4">
              EKAS lands first in precision metal stamping, where four conditions for AI value capture hold simultaneously: mission-critical OEE leverage, IATF 16949 quality regime, OEM parts-per-million threshold pressure, and emerging Scope 3 carbon reporting requirements. Adjacencies — precision machining, fabricated metal products, and discrete assembly — share data structures, KPI taxonomies, and OEM compliance requirements.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <div className="space-y-6">
              {[
                { industry: "Metal Stamping", pain: "High-volume press environments with tight tolerances and scrap rate sensitivity.", fit: "EKAS connects press OEE, die performance, and material yield in one governed analytics layer." },
                { industry: "Automotive", pain: "Tier 2 and below component suppliers operating under IATF 16949 with strict traceability requirements.", fit: "EKAS provides the audit trail, provenance architecture, and OEE governance automotive OEMs increasingly require." },
                { industry: "Industrial Manufacturing", pain: "Mid-market manufacturers dealing with downtime, scrap, cost variance, and fragmented plant data.", fit: "One grounded decision layer across shifts, workcenters, and facilities." },
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
            <p className="text-body-base text-secondary-text">Tell us about your operation. We'll show you what EKAS can do.</p>
          </div>
        </section>
    </PageShell>
  );
}
