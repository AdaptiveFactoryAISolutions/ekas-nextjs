/* ═══════════════════════════════════════════════════════════
   RESOURCES HUB — /resources
   Design: Precision Engineering Aesthetic
   Everything you need to evaluate EKAS without a sales call.
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, FileText, Code2, Calculator, BookOpen
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

const resources = [
  {
    icon: FileText,
    title: "Capability Brief",
    desc: "The full overview of the platform and approach — what EKAS does, how it works, and why it's different. Available on request.",
    cta: "Request PDF",
    href: "#capability-brief",
    badge: "PDF",
    comingSoon: false,
    gated: true,
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
    icon: Calculator,
    title: "ROI Calculator",
    desc: "Model the payback of acting on governed losses — on your own numbers, with no sales call required.",
    cta: "Open",
    href: "/resources/roi-calculator",
    badge: "Interactive",
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
                ) : (res as any).gated ? (
                  <button onClick={openContact} className="block group text-left w-full">
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
                  </button>
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
