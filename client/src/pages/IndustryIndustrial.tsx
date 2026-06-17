/* ═══════════════════════════════════════════════════════════
   INDUSTRY DETAIL — INDUSTRIAL MANUFACTURING — /industries/industrial-manufacturing
   Design: Precision Engineering Aesthetic
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, Globe, Search, TrendingUp } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-industrial-mfg-hero-Cgo5PQ4N9NxkJuPegGgUdR.webp";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const capabilities = [
  {
    icon: Globe,
    title: "Cross-site comparability",
    desc: "One definition of OEE, downtime, and yield across every plant.",
  },
  {
    icon: Search,
    title: "Bottleneck visibility",
    desc: "Where throughput is actually lost, with the evidence behind it.",
  },
  {
    icon: TrendingUp,
    title: "Expansion on evidence",
    desc: "Prove it on one line, then roll the same governed metrics out.",
  },
];

export default function IndustryIndustrial() {
  const { open: openContact } = useContactModal();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Large industrial manufacturing plant" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="container relative z-10 pb-16 pt-32">
          <Link href="/industries" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Industries
          </Link>
          <span className="section-label text-[oklch(0.7_0.15_210)] mb-3 block">Industrial Manufacturing</span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl">
            One governed standard across a mixed, multi-site operation.
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            Heavy-tonnage presses, a varied part-mix, several plants — and metrics that mean something different at each one. EKAS applies a single governed definition everywhere, so performance is finally comparable.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimSection>
            <span className="section-label mb-3 block">What EKAS handles</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-12 max-w-xl">
              Governed metrics for complex operations.
            </h2>
          </AnimSection>
          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => (
              <AnimSection key={cap.title} delay={i * 0.08}>
                <div className="feature-card">
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mb-5">
                    <cap.icon className="w-6 h-6 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{cap.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-section py-24 relative">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <AnimSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              See EKAS across your sites.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Tell us about one operating challenge your team is trying to govern across plants. We will show how EKAS applies a single governed definition everywhere.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openContact} className="btn-primary">
                Request a Demo <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/technical-overview" className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Read the Technical Overview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
