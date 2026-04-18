import type { Metadata } from "next";
import PageShell from "@/components/layout/PageShell";

export const metadata: Metadata = {
  title: "About — EKAS by AdaptiveFactory",
  description: "Built by someone who understands manufacturing operations. 28 years of plant floor experience solving problems experienced firsthand.",
};

export default function AboutPage() {
  return (
    <PageShell>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Company</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Built by Someone Who Understands Plant Operations
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS exists because manufacturing decisions deserve better than generic dashboards and ungrounded AI outputs.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[760px]">
            <h2 className="text-h2 text-primary-text mb-4">Built by Someone Who Understands Manufacturing Operations</h2>
            <p className="text-body-base text-secondary-text mb-4">
              EKAS is built by someone who has worked in manufacturing operations for 28 years — not someone who learned about manufacturing from customer interviews. The platform is informed by real operational challenges, real audit requirements, and real compliance constraints that exist in SME (Small and Medium-sized Enterprise) manufacturers — stamping, fabrication, and metalforming operations serving automotive, aerospace, appliance, and industrial supply chains.
            </p>
            <p className="text-body-base text-secondary-text">
              The founder of AdaptiveFactory holds a degree in Mechanical Engineering Technology and has direct experience in production planning, quality systems implementation, and plant operations. EKAS is the platform they built to solve problems they have experienced firsthand — not problems they researched from the outside.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[760px]">
            <h2 className="text-h2 text-primary-text mb-4">Why EKAS Exists</h2>
            <p className="text-body-base text-secondary-text mb-4">
              Most manufacturing AI fails for one reason: it treats the plant floor like a generic data problem. EKAS was built with the conviction that manufacturing intelligence must be grounded in real production data, governed by deterministic logic, and traceable to source.
            </p>
            <p className="text-body-base text-secondary-text">
              The goal is not to add another dashboard. The goal is to give operations, engineering, quality, and finance teams a faster, more trustworthy way to answer the questions they already ask every day — without requiring data science skills, manual report assembly, or blind trust in AI outputs.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">See EKAS in Action</h2>
            <p className="text-body-base text-secondary-text">Bring a plant problem. We'll show you how EKAS approaches it.</p>
          </div>
        </section>
      </PageShell>
  );
}
