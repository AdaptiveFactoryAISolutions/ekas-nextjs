import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Why EKAS — EKAS by AdaptiveFactory",
  description: "EKAS delivers governed, traceable manufacturing intelligence with an evidence standard that most platforms cannot meet. Built for SME precision manufacturers, not BI teams.",
};

export default function WhyEkasPage() {
  return (
    <PageShell>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Why EKAS</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              The Standard Is Not Good Enough.
            </h1>
            <p className="text-body-lg text-secondary-text">
              Most manufacturing analytics platforms claim to deliver insights. EKAS delivers governed, traceable, provenance-backed intelligence built on confirmed production data — and enforces an evidence standard that most platforms cannot meet.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">What Makes EKAS Different</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Built for Manufacturing Operations, Not BI Teams
            </h2>
            <p className="text-body-base text-secondary-text mb-12">
              EKAS is designed for the people who run the plant floor — operations managers, plant controllers, quality directors — not for BI analysts who build dashboards. Every metric is ISO 22400-2 governed. Every answer includes full data lineage. Every failure mode reference connects to your risk documentation.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "EvidencePacket on Every Answer",
                  body: "No metric arrives without provenance. Every calculation includes the SQL definition used, the data source queried, the record count, and the calculation timestamp.",
                },
                {
                  title: "ISO 22400-2 Governed OEE",
                  body: "EKAS enforces ratio-of-sums OEE methodology across the ISA-95 equipment hierarchy. Not approximations — governed calculations with full audit trail.",
                },
                {
                  title: "Built on Confirmed Production Data",
                  body: "EKAS does not estimate or interpolate. Every metric is computed from confirmed shift data, not live-stream sensor readings or unvalidated MES estimates.",
                },
                {
                  title: "IATF 16949 Audit Trail by Design",
                  body: "Every query, every metric calculation, every data transformation is logged with full context. Designed for environments that answer to auditors and compliance officers.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">What EKAS Does Not Do</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Honest Scope
            </h2>
            <p className="text-body-base text-secondary-text mb-6">
              EKAS does not replace your ERP, MES, CMMS, or QMS. It does not schedule production. It does not generate work orders. It does not perform root cause analysis for you — it surfaces the data required to perform root cause analysis faster and with more confidence.
            </p>

            <div className="p-6 rounded-lg" style={{ background: "rgba(255,165,0,0.08)", border: "1px solid rgba(255,165,0,0.3)" }}>
              <p className="text-body-base text-secondary-text">
                EKAS is the analytical intelligence layer — not the execution layer. Scheduling, work orders, master data, and execution remain in your existing systems.
              </p>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">Who This Is Built For</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              Target Audience
            </h2>

            <div className="max-w-[860px] mx-auto mb-12">
              <p className="text-body-base text-secondary-text mb-4">
                EKAS is built for <strong>SME (Small and Medium-sized Enterprise) manufacturers</strong> — industrial firms typically employing fewer than 250 people, with limited turnover, producing goods by transforming raw materials or assembling components. These are the agile, essential shops that form the backbone of local and global supply chains, and they deserve analytics built for how they actually operate — not scaled-down versions of tools built for the Fortune 500.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "SME Precision Stamping & Metalforming Shops",
                  body: "High-mix, low-to-medium-volume operations running multiple presses with data fragmented across ERP, MES, and the shop floor. Press-level OEE, die performance, material yield, and First Pass Yield — delivered without the six-figure implementation fee enterprise MES platforms demand.",
                },
                {
                  title: "Tier 2 and Below Component Suppliers",
                  body: "Component manufacturers serving automotive, aerospace, appliance, HVAC, medical, and industrial customers. Answering to customer production portals, audit teams, and quarterly cost reduction expectations — with a fraction of the analyst headcount the tier above them has.",
                },
                {
                  title: "Discrete Manufacturers with Regulated Quality Requirements",
                  body: "Shops where traceability, audit readiness, and governed metrics are not optional — whether the driver is IATF 16949, AS9100, ISO 9001, or a customer-specific quality manual. Data integrity is a business requirement, not a nice-to-have.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Approach Section */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-6">
              <span className="section-label">Our Approach</span>
              <h2 className="text-h2 text-primary-text mt-3 mb-6">
                Our Approach
              </h2>
            </div>

            <div className="max-w-[860px] mx-auto mb-12">
              <p className="text-body-base text-secondary-text text-center">
                SME manufacturers have been burned before — by six-month MES implementations, six-figure consulting fees, and dashboards that never quite matched what was actually happening on the floor. EKAS is built to not be that. Here's what working with us looks like.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {[
                {
                  title: "2-Week Data Assessment",
                  body: "We start by reading your data, not rewriting your systems. Two weeks to inventory your ERP, MES, historian, and quality sources — identify what's clean, what's gapped, and what's silently lying. You get a written assessment with the OEE baseline, data integrity findings, and a concrete pilot scope before you commit to anything further.",
                },
                {
                  title: "30-Day Pilot Deployment",
                  body: "A bounded pilot on a defined scope — typically one production area or a target KPI set. Standard infrastructure, standard security posture (encrypted at rest and in transit, SSO, audit logging). Every calculation validated against ISO 22400-2 methodology before any number appears on a dashboard. If the pilot doesn't produce answers you can act on, you don't continue.",
                },
                {
                  title: "Governed Rollout",
                  body: "KPIs registered, definitions documented, data quality checks running nightly, findings surfaced when something drifts. Scale from one area to the full plant on your timeline — not on a Gantt chart written by a vendor who's never walked your floor. The system is architected to support IATF 16949, AS9100, and ISO 9001 quality workflows end-to-end.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>

            <p className="text-body-base text-secondary-text text-center max-w-[760px] mx-auto">
              No six-figure implementation. No data science team required. No waiting six months to see whether it works.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Why EKAS Is Different</h2>
            <p className="text-body-base text-secondary-text">
              Request a technical demonstration to see the EvidencePacket standard in action.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
