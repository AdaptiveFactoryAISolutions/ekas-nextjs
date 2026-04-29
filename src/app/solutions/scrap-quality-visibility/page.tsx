import Link from "next/link";
import { AlertTriangle, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Scrap & Quality Visibility",
  description: "Surface defect patterns and quality losses before they erode margin. Track FPY, defect patterns, and scrap units by part, machine, and shift.",
  path: "/solutions/scrap-quality-visibility",
});

export default function ScrapQualityVisibilityPage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/solutions" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Solutions
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <AlertTriangle size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Scrap & Quality Visibility
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Surface defect patterns and quality losses before they erode margin and reach your customer.
            </p>
          </div>
        </section>

        {/* The Scale */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Scale of This Problem</span>
            <p className="text-body-base text-secondary-text mb-3">
              Scrap cost for a mid-size precision stamping operation typically runs $800K–1.5M annually. The cost sits inside the ERP. Connecting it to the workcenter, the part number, the shift, and the machine that produced it requires EKAS.
            </p>
            <p className="text-fine" style={{ color: "#6a7a9a" }}>
              Industry benchmark — precision metal stamping operations. Not derived from any specific customer.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Problem</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Quality Losses Hide in Plain Sight Until They Show Up in Margin
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              Scrap, rework, and quality escapes represent direct margin erosion — but most plants discover the full impact only after the losses have compounded across shifts, parts, and production runs.
            </p>
            <p className="text-body-base text-secondary-text">
              Manual quality logs, disconnected inspection data, and delayed reporting mean defect patterns stay hidden until a customer complaint arrives or month-end scrap variance forces investigation.
            </p>
          </div>
        </section>

        {/* Common Blind Spots */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Common Blind Spots</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">
              What Teams Usually Miss
            </h2>
            <div className="space-y-3">
              {[
                "Defect patterns are logged manually, if they're logged at all",
                "Quality data is disconnected from production data — no clear link between part, machine, shift, and defect type",
                "First Pass Yield trends are calculated in spreadsheets days after production",
                "Failure modes are documented but never connected to live production events",
                "Small recurring defects compound into margin loss before anyone notices the pattern",
              ].map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg" style={{ background: "rgba(0,200,255,0.04)" }}>
                  <div className="w-1.5 h-1.5 rounded-full mt-2" style={{ background: "#00c8ff", flexShrink: 0 }} />
                  <span className="text-body-sm text-secondary-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How EKAS Helps</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">From Quality Losses to Defect Intelligence</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Track defect patterns by part, machine, and shift",
                  body: "See which defect types are recurring, where they're happening, and which parts are affected — automatically, not manually.",
                },
                {
                  title: "Monitor First Pass Yield in real time",
                  body: "Know your FPY by part number, workcenter, and shift — not days later in a spreadsheet.",
                },
                {
                  title: "Connect defects to documented failure modes",
                  body: "Link quality events to documented risk assessments and corrective actions in your failure analysis workflows.",
                },
                {
                  title: "Quantify quality loss impact",
                  body: "Track scrap units, rework hours, and quality hold time across machines, shifts, and production runs.",
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

        {/* Business Outcomes */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Business Outcomes</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-6">What You Get</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {[
                "Earlier detection of recurring defect patterns",
                "Faster response to quality escapes before they reach customers",
                "Clear visibility into scrap units and rework hours by part and machine",
                "Connection between production events and documented failure modes",
                "Governed First Pass Yield metrics for reporting and trend analysis",
                "Reduced margin erosion from undetected quality losses",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center mt-0.5" style={{ background: "rgba(0,200,255,0.12)", flexShrink: 0 }}>
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: "#00c8ff" }} />
                  </div>
                  <span className="text-body-sm text-secondary-text">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Quality Visibility in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring a quality challenge. We'll show you how EKAS surfaces defect patterns and connects them to root cause.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
