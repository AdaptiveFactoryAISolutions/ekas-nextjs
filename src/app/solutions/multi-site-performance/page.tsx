"use client";

import { useState } from "react";
import Link from "next/link";
import { Building2, ChevronLeft } from "lucide-react";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function MultiSitePerformancePage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
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
                <Building2 size={24} style={{ color: "#00c8ff" }} />
              </div>
              <h1 className="text-h1 text-primary-text" style={{ fontFamily: "var(--font-rajdhani)" }}>
                Multi-Site Performance
              </h1>
            </div>

            <p className="text-body-lg text-secondary-text">
              Compare performance across facilities with consistent, governed metrics and a single source of truth.
            </p>
          </div>
        </section>

        {/* The Problem */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[860px]">
            <span className="section-label">The Problem</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-4">
              You Can't Compare What You Can't Measure Consistently
            </h2>
            <p className="text-body-base text-secondary-text mb-4">
              Multi-site operators and private equity portfolio managers face a common challenge: each facility calculates OEE, downtime, and cost metrics differently. What looks like good performance at one site may be measured completely differently at another.
            </p>
            <p className="text-body-base text-secondary-text">
              Without governed, standardized metrics across facilities, it's impossible to know which sites are actually underperforming, where best practices should be replicated, or where operational intervention is required.
            </p>
          </div>
        </section>

        {/* How EKAS Helps */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[1100px]">
            <span className="section-label">How EKAS Helps</span>
            <h2 className="text-h2 text-primary-text mt-3 mb-12">Multi-Tenant Architecture with Standardized Metrics</h2>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  title: "Standardized metrics across facilities",
                  body: "Apply governed OEE, downtime, and cost calculations consistently so every site is measured the same way.",
                },
                {
                  title: "Enables cross-site comparison",
                  body: "Compare facility performance using standardized metrics with full provenance and traceability.",
                },
                {
                  title: "Multi-tenant data architecture",
                  body: "PostgreSQL row-level security with 56 policies ensures site isolation while enabling portfolio-level visibility.",
                },
                {
                  title: "Supports best practice identification",
                  body: "Governed metrics help identify what high-performing facilities are doing differently.",
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
            <h2 className="text-h2 text-primary-text mb-4">See Multi-Site Intelligence in Action</h2>
            <p className="text-body-base text-secondary-text">
              Tell us about your portfolio. We'll show you how EKAS creates cross-facility visibility with governed metrics.
            </p>
          </div>
        </section>
      </PageShell>

      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
