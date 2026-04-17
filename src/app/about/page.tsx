"use client";

import { useState } from "react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function AboutPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
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
            <h2 className="text-h2 text-primary-text mb-4">Built From the Floor Up</h2>
            <p className="text-body-base text-secondary-text mb-4">
              AdaptiveFactory AI Solutions was founded by a precision metalforming industry veteran with deep operational experience in OEE measurement, capacity planning, and continuous improvement across high-volume stamping environments.
            </p>
            <p className="text-body-base text-secondary-text">
              EKAS was designed by someone who has lived the problem — not by a software team that studied it. The frustration with generic BI tools that visualize data without understanding manufacturing context, and AI systems that hallucinate answers without provenance, is what drove the architecture.
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
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
