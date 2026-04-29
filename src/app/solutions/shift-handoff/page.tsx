import Link from "next/link";
import { RefreshCw, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Shift Handoff Intelligence",
  description: "Structured handoffs grounded in production data. Incoming supervisors start with facts, not assumptions.",
  path: "/solutions/shift-handoff",
});

export default function ShiftHandoffPage() {
  return (
    <PageShell>
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
                <RefreshCw size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Shift Handoff Intelligence
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Structured handoffs grounded in production data. Incoming supervisors start with facts, not assumptions.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Gap</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Shift Boundaries Are Where Context Gets Lost
            </h2>
            <p className="text-body-base text-secondary-text">
              Every shift transition is an information transfer problem. What failed, what was flagged, what was left unresolved, which machine is running poorly. Verbal handoffs compress and lose detail. Written logs depend on the discipline of the person leaving. The incoming supervisor starts partially blind and spends the first twenty minutes of their shift reconstructing what happened on the prior one.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1000px]">
            <div className="grid md:grid-cols-3 gap-6">
              {[
                {
                  title: "Automated Shift Summary",
                  body: "EKAS generates a structured shift briefing from confirmed production data: machines flagged, downtime events, OEE vs target, open quality issues, unresolved alerts. Generated from data — not manually compiled."
                },
                {
                  title: "Supervisor Confirmation",
                  body: "The outgoing supervisor reviews the EKAS-generated summary, adds context where needed, and confirms. The confirmed handoff becomes the incoming supervisor's structured starting point. Information transfer is complete and documented."
                },
                {
                  title: "Searchable Record",
                  body: "Every shift handoff is logged and queryable. Ask 'What was flagged on second shift three weeks ago?' and receive a grounded, sourced answer — not a search through paper logs."
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

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1000px]">
            <span className="section-label">Before / After</span>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">Before</h3>
                <p className="text-body-sm text-secondary-text">
                  Outgoing supervisor writes shift notes if time permits. Incoming supervisor asks around to find out what happened. Critical context is lost at every shift boundary. The same problems recur because there is no institutional record of what was tried.
                </p>
              </div>

              <div className="premium-card">
                <h3 className="text-h4 text-primary-text mb-3">After</h3>
                <p className="text-body-sm text-secondary-text">
                  EKAS generates the briefing from confirmed production data. Outgoing supervisor confirms. Incoming supervisor starts informed. Every shift boundary is documented, searchable, and part of the operational record.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See Shift Handoff Intelligence in Action</h2>
            <p className="text-body-base text-secondary-text">
              Request a demonstration to see how EKAS generates structured shift briefings from production data.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
