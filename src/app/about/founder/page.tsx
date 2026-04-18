import type { Metadata} from "next";
import Link from "next/link";
import { User, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "Founder — EKAS by AdaptiveFactory",
  description: "Pat McCarthy, founder of AdaptiveFactory. 28 years in manufacturing operations, building EKAS from firsthand operational experience.",
};

export default function FounderPage() {
  return (
    <PageShell>
        {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <Link href="/about" className="inline-flex items-center gap-2 text-body-sm text-accent mb-6 hover:underline">
              <ChevronLeft size={16} />
              Back to About
            </Link>

            <span className="section-label">Founder</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Pat McCarthy
            </h1>
            <p className="text-body-lg text-secondary-text">
              Founder, AdaptiveFactory
            </p>
          </div>
        </section>

        {/* Background */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <h2 className="text-h2 text-primary-text mb-4">
              Background
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              28 years of experience in manufacturing operations, production planning, quality systems implementation, and plant operations. Holds a degree in Mechanical Engineering Technology. Direct operational experience in SME precision manufacturing — stamping, fabrication, and metalforming operations serving automotive and aerospace supply chains.
            </p>
            <p className="text-body-base text-secondary-text mb-4">
              EKAS is built on problems experienced firsthand — not learned from customer interviews. The founder understands what it means to answer to IATF 16949 auditors, respond to customer corrective action requests, and explain cost variance to finance teams who do not accept "we think" as an answer.
            </p>
            <p className="text-body-base text-secondary-text">
              The platform exists because manufacturing operations need governed metrics, full data provenance, and audit-ready documentation — not generic business intelligence dashboards that assume operational questions can be answered the same way as sales pipeline questions.
            </p>
          </div>
        </section>

        {/* Why EKAS Exists */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px]">
            <h2 className="text-h2 text-primary-text mb-4">
              Why EKAS Exists
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              Most manufacturing analytics platforms are built by people who learned about manufacturing from the outside. They talk to customers, they study the industry, they build dashboards. The result is a platform that looks right but does not meet the standard required when you answer to auditors, finance teams, and customer quality engineers.
            </p>
            <p className="text-body-base text-secondary-text">
              EKAS is different. It is built by someone who has lived in manufacturing operations. The governed metrics catalog, the EvidencePacket standard, the IATF 16949 audit trail — these are not features added because customers asked for them. They are the foundation of the platform because the founder knows they are not optional.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Connect on LinkedIn</h2>
            <p className="text-body-base text-secondary-text mb-6">
              The founder is available on LinkedIn for technical discussions and operational questions.
            </p>
            <a
              href="https://www.linkedin.com/in/patrick-mccarthy-manufacturing/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary inline-block"
            >
              View LinkedIn Profile
            </a>
          </div>
        </section>
      </PageShell>
  );
}
