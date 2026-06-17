/* ═══════════════════════════════════════════════════════════
   RESOURCES HUB — /resources
   Design: Precision Engineering Aesthetic
   Everything you need to evaluate EKAS without a sales call.
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, FileText, Code2, Calculator, BookOpen,
  TrendingDown, GitCompare, ShieldQuestion, ListTree, SlidersHorizontal, MessagesSquare
} from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const tools = [
  {
    icon: Calculator,
    title: "Governed Impact Model",
    desc: "Model the operational payback of acting on governed losses — on your own numbers, with every figure showing its arithmetic.",
    href: "/resources/roi-calculator",
    tag: "ROI",
  },
  {
    icon: TrendingDown,
    title: "Downtime Cost Builder",
    desc: "Build a defensible, fully-loaded cost per downtime hour from its parts, then see your annual recoverable exposure.",
    href: "/resources/downtime-cost-builder",
    tag: "Cost",
  },
  {
    icon: GitCompare,
    title: "OEE Methodology Explorer",
    desc: "The same fleet, two ways: ratio-of-sums (ISO 22400) vs average-of-averages. See how averaging inflates OEE.",
    href: "/resources/oee-methodology",
    tag: "Methodology",
  },
  {
    icon: ShieldQuestion,
    title: "Decision Integrity Demo",
    desc: "Ask the same question of EKAS and a typical BI tool. When evidence is missing, EKAS refuses — and says what's missing.",
    href: "/resources/decision-integrity",
    tag: "Demo",
  },
  {
    icon: ListTree,
    title: "Failure Taxonomy Browser",
    desc: "Search the governed failure-mode taxonomy. Every loss has a code, a detection rule, and an ISO 22400-aligned category.",
    href: "/resources/failure-taxonomy",
    tag: "Reference",
  },
  {
    icon: SlidersHorizontal,
    title: "Pilot Scope Configurator",
    desc: "Pick machines, data sources, and timeframe — and see exactly which governed metrics your 60-day pilot will deliver.",
    href: "/resources/pilot-scope",
    tag: "Pilot",
  },
  {
    icon: MessagesSquare,
    title: "Talk to EKAS",
    desc: "A short, honest conversation about your plant. The intake assistant tells you straight whether EKAS is a fit — and when it isn't yet.",
    href: "/resources/intake",
    tag: "Intake",
  },
];

const resources = [
  {
    icon: FileText,
    title: "Capability Brief",
    desc: "A one-page overview of the platform and approach — what EKAS does, how it works, how it connects, and how it handles security. No form required.",
    cta: "Download PDF",
    href: "https://dkcto6vm4oej9.cloudfront.net/manus-storage/ekas-capability-brief.pdf",
    badge: "PDF",
    comingSoon: false,
    download: true,
  },
  {
    icon: Code2,
    title: "Technical Overview",
    desc: "Architecture, governance engine, security posture, and deployment options — written for IT directors and data engineers.",
    cta: "Read",
    href: "/technical-overview",
    badge: "Page",
    comingSoon: false,
  },
  {
    icon: BookOpen,
    title: "Insights",
    desc: "Operator-written pieces on OEE methodology, governed AI, and ISO 22400-2 — practical, not academic.",
    cta: "Read",
    href: "#",
    badge: "Blog",
    comingSoon: true,
  },
];

export default function Resources() {
  const { open: openContact } = useContactModal();

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient noise-overlay relative py-28 md:py-36">
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <AnimSection>
            <span className="section-label mb-4 block">Resources</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
              The evidence behind{" "}
              <span className="text-[oklch(0.55_0.2_255)]">EKAS.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Everything you need to evaluate EKAS without a sales call.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Resource Cards */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {resources.map((res, i) => (
              <AnimSection key={res.title} delay={i * 0.08}>
                {res.comingSoon ? (
                  <div className="feature-card !p-8 relative opacity-80">
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-muted text-muted-foreground rounded-md">
                        Coming Soon
                      </span>
                    </div>
                    <div className="w-14 h-14 rounded-2xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mb-6">
                      <res.icon className="w-7 h-7 text-[oklch(0.55_0.2_255)]" />
                    </div>
                    <h3 className="font-display text-xl font-semibold text-foreground mb-3">{res.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">{res.desc}</p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground">
                      {res.cta} <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                ) : (res as any).download ? (
                  <a href={res.href} target="_blank" rel="noopener noreferrer" className="block group">
                    <div className="feature-card !p-8 relative">
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)] rounded-md">
                          {res.badge}
                        </span>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mb-6">
                        <res.icon className="w-7 h-7 text-[oklch(0.55_0.2_255)]" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-[oklch(0.55_0.2_255)] transition-colors">{res.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{res.desc}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.2_255)] group-hover:gap-3 transition-all duration-200">
                        {res.cta} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </a>
                ) : (
                  <Link href={res.href} className="block group">
                    <div className="feature-card !p-8 relative">
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)] rounded-md">
                          {res.badge}
                        </span>
                      </div>
                      <div className="w-14 h-14 rounded-2xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mb-6">
                        <res.icon className="w-7 h-7 text-[oklch(0.55_0.2_255)]" />
                      </div>
                      <h3 className="font-display text-xl font-semibold text-foreground mb-3 group-hover:text-[oklch(0.55_0.2_255)] transition-colors">{res.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">{res.desc}</p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.2_255)] group-hover:gap-3 transition-all duration-200">
                        {res.cta} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                )}
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Tools */}
      <section className="py-20 bg-secondary/30 border-y border-border">
        <div className="container">
          <AnimSection className="max-w-4xl mx-auto mb-12">
            <span className="section-label mb-3 block">Interactive Tools</span>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground tracking-tight">
              Pressure-test the claims yourself.
            </h2>
            <p className="mt-4 text-muted-foreground leading-relaxed max-w-2xl">
              Seven self-serve tools that model your numbers and show the methodology behind every figure — no form, no sales call. Some use clearly-labeled illustrative data.
            </p>
          </AnimSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {tools.map((t, i) => (
              <AnimSection key={t.title} delay={i * 0.06}>
                <Link href={t.href} className="block group h-full">
                  <div className="feature-card !p-6 h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center">
                        <t.icon className="w-6 h-6 text-[oklch(0.55_0.2_255)]" />
                      </div>
                      <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)] rounded-md">
                        {t.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2 group-hover:text-[oklch(0.55_0.2_255)] transition-colors">{t.title}</h3>
                    <p className="text-[13.5px] text-muted-foreground leading-relaxed mb-5 flex-1">{t.desc}</p>
                    <span className="inline-flex items-center gap-2 text-[13.5px] font-semibold text-[oklch(0.55_0.2_255)] group-hover:gap-3 transition-all duration-200">
                      Open tool <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </Link>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Link */}
      <section className="py-16 bg-secondary/50">
        <div className="container text-center max-w-2xl mx-auto">
          <AnimSection>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
              Have questions?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Our FAQ covers product, deployment, security, and commercial questions — written to give you real answers, not marketing.
            </p>
            <Link href="/resources/faqs" className="btn-secondary">
              Read the FAQs <ArrowRight className="w-4 h-4" />
            </Link>
          </AnimSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-section py-24 relative">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <AnimSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              Ready to evaluate EKAS?
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Tell us about one operating challenge. We will show how EKAS frames the question, identifies the evidence, and delivers a governed answer.
            </p>
            <button onClick={openContact} className="btn-primary">
              Request a Demo <ArrowRight className="w-4 h-4" />
            </button>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
