import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Solutions",
  description: "Manufacturing intelligence organized by business problem — downtime, scrap, capacity, cost variance, and multi-site performance — not by software feature.",
  path: "/solutions",
});

export default function SolutionsPage() {
  const solutions = [
    {
      title: "Downtime Reduction",
      description: "See where time is lost, quantify downtime hours, and trace failure causes to root cause and corrective action.",
      href: "/solutions/downtime-reduction",
    },
    {
      title: "Scrap & Quality Visibility",
      description: "Surface defect patterns, quality losses, and First Pass Yield issues before they erode margin.",
      href: "/solutions/scrap-quality-visibility",
    },
    {
      title: "Capacity & Throughput",
      description: "Find where production flow is constrained and size capacity against actual OEE — not theoretical hours.",
      href: "/solutions/capacity-throughput",
    },
    {
      title: "Cost Driver Analysis",
      description: "Attribute labor, burden, machine, and material variance to the machine, workcenter, and shift that generated it.",
      href: "/solutions/cost-driver-analysis",
    },
    {
      title: "Multi-Site Performance",
      description: "Compare performance across facilities with consistent, governed metrics and a single source of truth.",
      href: "/solutions/multi-site-performance",
    },
  ];

  return (
    <PageShell>
      {/* Hero */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[860px] text-center">
            <span className="section-label">Solutions</span>
            <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
              Organized by Business Problem, Not Software Feature
            </h1>
            <p className="text-body-lg text-secondary-text">
              EKAS helps operations teams move faster on the issues that drive cost, delay output, and erode plant performance.
            </p>
          </div>
        </section>

        {/* Solutions Grid */}
        <section className="section-padding" style={{ background: "rgba(13,22,40,0.62)" }}>
          <div className="container max-w-[1100px]">
            <div className="text-center mb-12">
              <span className="section-label">Five Operational Outcomes</span>
              <h2 className="text-h2 text-primary-text mt-3">
                The Plant Problems EKAS Is Built to Solve
              </h2>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {solutions.map((solution) => (
                <Link key={solution.title} href={solution.href}>
                  <div className="premium-card h-full transition-all duration-200 cursor-pointer hover:scale-[1.02]">
                    <h3 className="text-h4 text-primary-text mb-2">{solution.title}</h3>
                    <p className="text-body-sm text-secondary-text">{solution.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
          <div className="container max-w-[640px] text-center">
            <h2 className="text-h2 text-primary-text mb-4">Bring One Plant Problem</h2>
            <p className="text-body-base text-secondary-text">
              We'll show you how EKAS approaches it with your data.
            </p>
          </div>
        </section>
    </PageShell>
  );
}
