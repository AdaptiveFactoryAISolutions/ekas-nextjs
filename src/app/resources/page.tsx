import Link from "next/link";
import PageShell from "@/components/layout/PageShell";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  title: "Resources",
  description: "Briefs, guides, and FAQs for operations leaders evaluating grounded manufacturing intelligence — platform overview, role-based use cases, security, and governance.",
  path: "/resources",
});

const groups = [
  {
    label: "Start Here",
    description: "Position EKAS against the alternatives and understand the architecture in 10 minutes.",
    items: [
      { title: "Why EKAS", category: "Brief", body: "How EKAS compares to MES, BI, and generic AI — and where it draws the line.", href: "/why-ekas" },
      { title: "Platform Overview", category: "Brief", body: "The capability portfolio, the McKinsey Three Horizons sequencing, and what compounds over time.", href: "/platform" },
      { title: "Technical Overview", category: "Reference", body: "Architecture, data flow, standards compliance, and deployment options.", href: "/technical-overview" },
    ],
  },
  {
    label: "By Plant Problem",
    description: "Pick the issue you'd take to a demo today.",
    items: [
      { title: "Downtime Reduction", category: "Guide", body: "From delay and guesswork to traced failure causes and corrective action.", href: "/solutions/downtime-reduction" },
      { title: "Scrap & Quality Visibility", category: "Guide", body: "Surface defect patterns, FPY, and scrap units before they erode margin.", href: "/solutions/scrap-quality-visibility" },
      { title: "Cost Driver Analysis", category: "Guide", body: "Attribute labor, burden, machine, and material variance to where it was generated.", href: "/solutions/cost-driver-analysis" },
    ],
  },
  {
    label: "By Audience",
    description: "How EKAS serves the people who run the floor — and the ones answering for it.",
    items: [
      { title: "Role-Based Use Cases", category: "Guide", body: "Plant managers, operations, engineering, quality, finance, and executive views.", href: "/roles" },
      { title: "Industry Fit: Automotive Suppliers", category: "Brief", body: "IATF 16949 traceability and provenance for Tier 2 and below.", href: "/industries/automotive" },
      { title: "Industry Fit: Metal Stamping", category: "Brief", body: "Press OEE, die performance, and material yield for precision stamping.", href: "/industries/metal-stamping" },
    ],
  },
  {
    label: "Trust & Compliance",
    description: "How EKAS handles your data, governs metrics, and proves itself in audit.",
    items: [
      { title: "Security & Governance", category: "Reference", body: "Trust model, governed metrics, and the security stack at a glance.", href: "/security" },
      { title: "Governance", category: "Deep Dive", body: "Versioned definitions, full provenance, role-based access, zero-compromise releases.", href: "/security/governance" },
      { title: "Data Handling", category: "Deep Dive", body: "Read-only access, tenant isolation, and the zero-training-data guarantee.", href: "/security/data-handling" },
    ],
  },
];

export default function ResourcesPage() {
  return (
    <PageShell>
      <section className="section-padding" style={{ background: "rgba(10,14,26,0.92)" }}>
        <div className="container max-w-[860px] text-center">
          <span className="section-label">Resources</span>
          <h1 className="text-h1 text-primary-text mt-3 mb-4" style={{ fontFamily: "var(--font-rajdhani)" }}>
            Explore EKAS in Depth
          </h1>
          <p className="text-body-lg text-secondary-text">
            Briefs, guides, and references for operations leaders evaluating grounded manufacturing intelligence. Start with the section that matches where you are.
          </p>
          <div className="mt-6">
            <Link href="/resources/faqs" className="text-body-sm text-accent hover:underline">
              Skip to the FAQ →
            </Link>
          </div>
        </div>
      </section>

      {groups.map((group, idx) => (
        <section
          key={group.label}
          className="section-padding"
          style={{ background: idx % 2 === 0 ? "rgba(13,22,40,0.62)" : "rgba(10,14,26,0.92)" }}
        >
          <div className="container max-w-[1100px]">
            <div className="mb-10">
              <span className="section-label">{group.label}</span>
              <h2 className="text-h2 text-primary-text mt-3 mb-3">{group.label}</h2>
              <p className="text-body-base text-secondary-text max-w-[760px]">{group.description}</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item) => (
                <Link key={item.title} href={item.href}>
                  <div className="premium-card h-full cursor-pointer hover:scale-[1.01] transition-transform">
                    <span className="text-fine text-accent uppercase tracking-wider">{item.category}</span>
                    <h3 className="text-h4 text-primary-text mt-2 mb-2">{item.title}</h3>
                    <p className="text-body-sm text-secondary-text mb-4">{item.body}</p>
                    <span className="text-fine text-accent">Read →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section className="section-padding" style={{ background: "rgba(10,14,26,0.72)" }}>
        <div className="container max-w-[640px] text-center">
          <h2 className="text-h2 text-primary-text mb-4">Ready to See It in Action?</h2>
          <p className="text-body-base text-secondary-text">Bring a plant problem. We&apos;ll show you how EKAS approaches it.</p>
        </div>
      </section>
    </PageShell>
  );
}
