import Link from "next/link";
import { Wrench, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Industrial Manufacturing",
  description: "OEE tracking, downtime attribution, and cost variance for discrete manufacturing operations where traceability and audit readiness are requirements.",
  path: "/industries/industrial-manufacturing",
});

export default function IndustrialManufacturingPage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/industries" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to Industries
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center"
                style={{ background: "rgba(0,200,255,0.12)", border: "1px solid rgba(0,200,255,0.2)" }}
              >
                <Wrench size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                EKAS for Industrial Manufacturing
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Industrial manufacturing operations track OEE, downtime, and cost variance across machining, fabrication, and assembly operations.
            </p>
          </div>
        </section>

        {/* Industry Context & How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <h2 className="text-h2 text-primary-text mb-4">
              Industrial Manufacturing and EKAS Platform Applicability
            </h2>
            <p className="text-body-base text-secondary-text mb-6">
              Industrial manufacturing operations across machining, fabrication, and assembly face challenges with performance visibility, downtime attribution, and cost variance tracking. EKAS platform capabilities apply through governed metrics, OEE tracking, downtime attribution, quality loss visibility, and cost variance tracking with burden rate infrastructure.
            </p>

            <div className="p-4 rounded-lg mb-6" style={{ background: "rgba(0,200,255,0.04)" }}>
              <p className="text-body-sm font-semibold text-primary-text mb-2">Compliance Support</p>
              <p className="text-body-sm text-secondary-text">
                ISO 9001 and customer audit requirements: EKAS provenance and traceability architecture supports quality event documentation, process capability tracking, and audit trail requirements for customer quality system audits.
              </p>
            </div>

            <p className="text-body-base text-secondary-text">
              General platform applicability: Governed metric definitions, data provenance from answer to source, multi-tenant architecture for multi-facility operations, OEE tracking by workcenter and shift, quality loss visibility, and cost variance tracking with burden rate infrastructure.
            </p>
          </div>
        </section>

        {/* Current Focus */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">Current Focus</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              Built for Discrete Manufacturing with Regulated Quality
            </h2>
            <p className="text-body-base text-secondary-text">
              EKAS is purpose-built for discrete manufacturing operations where traceability, audit readiness, and governed metrics are compliance requirements — not nice-to-have features. Built for precision metal stamping, fabrication, and metalforming operations. If your operation has similar requirements — lot traceability, First Pass Yield tracking, customer audit readiness — EKAS applies directly.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See EKAS for Industrial Manufacturing</h2>
            <p className="text-body-base text-secondary-text">
              Request a demo to see how EKAS platform capabilities apply to industrial manufacturing operations.
            </p>
          </div>
        </section>
      </PageShell>
  );
}
