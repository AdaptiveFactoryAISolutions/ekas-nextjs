import type { Metadata } from "next";
import Link from "next/link";
import { Clock, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Downtime Reduction — EKAS by AdaptiveFactory",
  description: "Move from delay and guesswork to grounded answers. See where time is lost, quantify it, trace to root cause, and track trends over time.",
};

export default function DowntimeReductionPage() {
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
                <Clock size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Reduce Downtime with Faster Visibility
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Move from delay and guesswork to grounded answers that help operations and engineering teams act faster.
            </p>
          </div>
        </section>

        {/* The Scale */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Scale of This Problem</span>
            <p className="text-body-base text-secondary-text mb-3">
              Unplanned downtime costs a typical 2-shift precision metal stamping operation $1.2–2M annually. The figure is not disputed — it is rarely visible because nobody has built the calculation from confirmed shift data. EKAS makes this calculation automatic, daily, and traceable to source.
            </p>
            <p className="text-fine" style={{ color: "#6a7a9a" }}>
              Industry benchmark — precision metal stamping, MTBF/MTTR studies. Not derived from any specific customer.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Problem</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Downtime Is the Largest Controllable Loss in Most Plants
            </h2>
            <p className="text-body-base text-secondary-text">
              Every minute of unplanned downtime represents lost production capacity. Manual logs, delayed reports, and disconnected data sources mean downtime patterns stay hidden until aggregated in month-end reports.
            </p>
          </div>
        </section>

        {/* How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How EKAS Helps</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">From Lost Time to Grounded Answers</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "See where time is lost",
                  body: "Drill into downtime by machine, workcenter, shift, and failure category — automatically, not manually.",
                },
                {
                  title: "Quantify time lost",
                  body: "Track downtime hours by shift, machine, and cause category using governed time-tracking logic.",
                },
                {
                  title: "Trace to root cause",
                  body: "Connect downtime events to documented failure modes and corrective actions in your risk analysis workflows.",
                },
                {
                  title: "Track trends over time",
                  body: "See whether your top downtime drivers are improving or getting worse — with governed metrics, not guesswork.",
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

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Downtime Visibility in Action</h2>
            <p className="text-body-base text-secondary-text">
              Bring a downtime challenge. We'll show you how EKAS approaches it.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
