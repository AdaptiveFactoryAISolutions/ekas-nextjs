"use client";

import { useState } from "react";
import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import DemoRequestModal from "@/components/modals/DemoRequestModal";

export default function ResourcesPage() {
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <>
      <PageShell onDemoClick={() => setDemoOpen(true)}>
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Resources</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Explore EKAS in Depth
            </h1>
            <p className="text-body-lg text-secondary-text">
              Guides, product briefs, and technical explanations for operations leaders evaluating grounded manufacturing intelligence.
            </p>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "Platform Overview", category: "Brief", href: "/platform" },
                { title: "Downtime Reduction with EKAS", category: "Guide", href: "/solutions/downtime-reduction" },
                { title: "Role-Based Use Cases", category: "Guide", href: "/roles" },
                { title: "Industry Fit: Automotive Suppliers", category: "Brief", href: "/industries" },
                { title: "Governance and Auditability", category: "Brief", href: "/security" },
                { title: "Security & Trust", category: "Product Brief", href: "/security" },
              ].map((item) => (
                <Link key={item.title} href={item.href}>
                  <div className="premium-card h-full cursor-pointer hover:scale-[1.01] transition-transform">
                    <span className="text-fine text-accent uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-h4 text-primary-text mt-2">{item.title}</h3>
                    <span className="text-fine text-accent mt-4 inline-block">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Ready to See It in Action?</h2>
            <p className="text-body-base text-secondary-text">Bring a plant problem. We'll show you how EKAS approaches it.</p>
          </div>
        </section>
      </PageShell>
      <DemoRequestModal open={demoOpen} onClose={() => setDemoOpen(false)} />
    </>
  );
}
