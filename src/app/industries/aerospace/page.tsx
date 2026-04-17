"use client";

import { useState } from "react";
import Link from "next/link";
import { Plane, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function AerospacePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
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
                <Plane size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                EKAS for Aerospace Manufacturing
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text mb-8">
              Aerospace manufacturing operations require full traceability and audit-ready documentation for AS9100 compliance.
            </p>

            <button onClick={() => setDemoOpen(true)} className="btn-primary">
              Request a Demo
            </button>
          </div>
        </section>

        {/* Industry Context & How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <h2 className="text-h2 text-primary-text mb-4">
              Aerospace Manufacturing and EKAS Platform Applicability
            </h2>
            <p className="text-body-base text-secondary-text mb-6">
              Aerospace manufacturing operations face strict traceability requirements for AS9100 and NADCAP compliance. EKAS platform capabilities apply through governed metrics with full data provenance, production event traceability, and audit-ready documentation architecture.
            </p>

            <div className="p-4 rounded-lg mb-6" style={{ background: "rgba(0,200,255,0.04)" }}>
              <p className="text-body-sm font-semibold text-primary-text mb-2">Compliance Support</p>
              <p className="text-body-sm text-secondary-text">
                AS9100 and NADCAP requirements: EKAS provenance architecture includes production lot, machine, operator, timestamp, and calculation hash for every metric. This supports part genealogy documentation, process provenance, nonconformance tracking, and quality event audit trails required for aerospace customer and regulatory compliance.
              </p>
            </div>

            <p className="text-body-base text-secondary-text">
              General platform applicability: Governed metric definitions, data provenance from answer to source, multi-tenant architecture for multi-facility operations, OEE tracking, quality loss visibility, and cost variance tracking with burden rate infrastructure.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See EKAS for Aerospace</h2>
            <p className="text-body-base text-secondary-text mb-8">
              Request a demo to see how EKAS provenance and traceability architecture supports AS9100 compliance.
            </p>
            <button onClick={() => setDemoOpen(true)} className="btn-primary">
              Request a Demo
            </button>
          </div>
        </section>
      </PageShell>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
