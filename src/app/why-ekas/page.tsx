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

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Portfolio framework, not feature checklist",
                  body: "EKAS organizes 16 AI capabilities across the McKinsey Three Horizons framework with structured selection criteria and quarterly governance. Features can be matched. Frameworks are different work.",
                },
                {
                  title: "Industry-specific depth",
                  body: "Built for precision metal stamping — ISO 22400-2 OEE methodology, AIAG 4th and AIAG-VDA 2019 FMEA grounding, IATF 16949 framework, OEM PPM threshold awareness. Depth that horizontal SaaS vendors cannot replicate without years of vertical investment.",
                },
                {
                  title: "Founder operational experience",
                  body: "Thirty years in precision metal stamping operations. Built by someone who has explained an EBITDA variance to a CFO and run an IATF audit at 11 PM, not someone who learned about manufacturing from customer interviews.",
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

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {[
                {
                  title: "Discovery",
                  subhead: "60–90 minute conversation",
                  body: "Structured fit assessment. Four conditions for EKAS success: data quality baseline, executive sponsor, operations–finance alignment opportunity, IATF 16949 compliance posture.",
                },
                {
                  title: "Pilot Readiness Assessment",
                  subhead: "8-week structured engagement",
                  body: "Data quality assessment. Three-priority initiative identification. Documented value model in dollar terms. Output is a gating decision: proceed to pilot or do not proceed.",
                },
                {
                  title: "60-Day Pilot",
                  subhead: "Live deployment",
                  body: "Three Horizon-1 capabilities deployed: shift handoff intelligence, downtime root cause, cost variance attribution. Weekly progress reviews against documented success criteria.",
                },
                {
                  title: "Ongoing Subscription",
                  subhead: "Quarterly portfolio governance",
                  body: "Subscription begins after pilot success gates trigger. Quarterly portfolio reviews. Continuous initiative scoring. New capabilities activated only after prior horizon generates documented returns.",
                },
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-1">{card.title}</h3>
                  <p className="text-fine text-accent mb-3">{card.subhead}</p>
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
