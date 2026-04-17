"use client";

import { useState } from "react";
import Link from "next/link";
import { Car, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function AutomotivePage() {
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
                <Car size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                EKAS for Automotive Manufacturing
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Automotive manufacturing operations require full traceability and audit-ready documentation for IATF 16949 compliance.
            </p>
          </div>
        </section>

        {/* Industry Context & How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <h2 className="text-h2 text-primary-text mb-4">
              Automotive Manufacturing and EKAS Platform Applicability
            </h2>
            <p className="text-body-base text-secondary-text mb-6">
              Automotive manufacturing operations face traceability requirements from OEM customers and IATF 16949 auditors. EKAS platform capabilities apply through governed metrics with full data provenance, production event traceability, and audit-ready documentation architecture.
            </p>

            <div className="p-4 rounded-lg mb-6" style={{ background: "rgba(0,200,255,0.04)" }}>
              <p className="text-body-sm font-semibold text-primary-text mb-2">Compliance Support</p>
              <p className="text-body-sm text-secondary-text">
                IATF 16949, PPAP, and customer audit requirements: EKAS provenance architecture includes production lot, machine, operator, timestamp, and calculation hash for every metric. This supports customer corrective action requests (8D, SCAR), PPAP documentation, production event linkage for failure analysis workflows, and quality event audit trails.
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
            <h2 className="text-h2 text-primary-text mb-4">See EKAS for Automotive</h2>
            <p className="text-body-base text-secondary-text">
              Request a demo to see how EKAS provenance and traceability architecture supports IATF 16949 compliance.
            </p>
          </div>
        </section>
      </PageShell>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
