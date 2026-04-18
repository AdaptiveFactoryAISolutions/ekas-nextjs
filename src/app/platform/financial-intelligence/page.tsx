import type { Metadata } from "next";
import Link from "next/link";
import { DollarSign, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Financial Intelligence — EKAS by AdaptiveFactory",
  description: "Manufacturing cost variance from confirmed production data. Scrap cost, downtime cost, and OEE efficiency loss — available any day, not just period close.",
};

export default function FinancialIntelligencePage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/platform" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Platform
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <DollarSign size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Financial Intelligence
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Manufacturing cost variance from confirmed production data. Available any day, any shift — not just at period close.
            </p>
          </div>
        </section>

        {/* What It Computes */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">What It Computes</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-8">
              Three Categories of Manufacturing Cost Variance
            </h2>
            <p className="text-body-base text-secondary-text mb-6">
              Computed directly from confirmed operational data, without requiring ERP financial module integration. All calculations use governance-approved rates registered at deployment.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Scrap Cost",
                  body: "Quantity scrapped × standard machine hours × site burden rate. By workcenter, by part, by shift. Every figure traceable to individual production records."
                },
                {
                  title: "Downtime Cost",
                  body: "Unplanned downtime hours × burden rate, by workcenter and machine. Ranked by dollar impact — not by hours or complaint recency."
                },
                {
                  title: "OEE Efficiency Loss",
                  body: "The cost of running below theoretical maximum output, by workcenter. Connects OEE percentage directly to dollar impact for operations and management reporting."
                }
              ].map((card) => (
                <div key={card.title} className="premium-card">
                  <h3 className="text-h4 text-primary-text mb-2">{card.title}</h3>
                  <p className="text-body-sm text-secondary-text">{card.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EvidencePacket */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">EvidencePacket on Financial Answers</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Every Cost Figure Traced to Source
            </h2>
            <p className="text-body-base text-secondary-text">
              A Finance Controller asking for cost variance receives the answer alongside its EvidencePacket: the time period queried, the data sources, the burden rate applied, and the record count behind the calculation. The figure is not an estimate — it is computed from the same production records the operations team uses, with full provenance available for audit.
            </p>
          </div>
        </section>

        {/* Before and After */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Before and After</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-8">
              From Period Close to On Demand
            </h2>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Before</h3>
                <p className="text-body-sm text-secondary-text">
                  Manufacturing cost variance requires the ERP period close. Finance reconciles OEE data from operations with cost data from finance: 1–3 days of effort per reporting cycle. The number that arrives is accurate to the period, not to the shift or the day.
                </p>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">After</h3>
                <p className="text-body-sm text-secondary-text">
                  EKAS computes cost variance on demand. Ask on a Tuesday at 10am — the answer reflects the most recent production data with full traceability. Finance and operations are looking at the same number from the same source. No reconciliation.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Supplier Invoice Extraction */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Supplier Invoice Extraction</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Invoice Processing — 20-Minute Manual Entry to 2-Minute Review
            </h2>
            <p className="text-body-base text-secondary-text">
              Supplier invoices arrive by email or file delivery. EKAS extracts all required fields — invoice number, vendor, date, total, currency, line items, PO reference — in seconds. The Finance Controller reviews extracted fields, confirms or corrects, and the data is ready for ERP entry. The manual keying step is replaced by a 2-minute review. Every extraction is logged with full audit trail.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Financial Intelligence in Action</h2>
            <p className="text-body-base text-secondary-text">
              Request a demonstration to see how EKAS computes cost variance from confirmed production data.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
