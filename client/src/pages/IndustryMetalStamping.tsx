/* ═══════════════════════════════════════════════════════════
   INDUSTRY DETAIL — METAL STAMPING — /industries/metal-stamping
   Design: Precision Engineering Aesthetic
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, CheckCircle2, Factory, Gauge, Clock, ShieldCheck } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-metal-stamping-hero-HAUCQEHfHX8oRDdoFKHKjD.webp";

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
    icon: Gauge,
    title: "OEE that respects multi-out tooling",
    desc: "Performance measured against what the die actually produces, ISO 22400-2 ratio-of-sums.",
  },
  {
    icon: Clock,
    title: "Die-changeover and short-run downtime",
    desc: "Captured, categorized, and de-duplicated so your losses are real.",
  },
  {
    icon: Factory,
    title: "Hit-rate and tonnage context",
    desc: "Losses tied to the conditions that caused them.",
  },
  {
    icon: ShieldCheck,
    title: "Audit-ready quality",
    desc: "First-pass yield and scrap traceable to the production record for IATF 16949 reviews.",
  },
];

export default function IndustryMetalStamping() {
  const { open: openContact } = useContactModal();

  return (
    <div>
      {/* Hero with background image */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Precision metal stamping factory" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="container relative z-10 pb-16 pt-32">
          <Link href="/industries" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Industries
          </Link>
          <span className="section-label text-[oklch(0.7_0.15_210)] mb-3 block">Metal Stamping</span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl">
            Governed intelligence, built around how a stamping plant actually runs.
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            Multi-out tooling, companion parts, press tonnage, hit-rate variance, die-changeover downtime — EKAS models the realities of a precision stamping operation, not a textbook machine cell.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimSection>
            <span className="section-label mb-3 block">What EKAS handles for stampers</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-12 max-w-xl">
              Built for the realities of precision stamping.
            </h2>
          </AnimSection>
          <div className="grid md:grid-cols-2 gap-6">
            {capabilities.map((cap, i) => (
              <AnimSection key={cap.title} delay={i * 0.08}>
                <div className="feature-card flex gap-5">
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center shrink-0">
                    <cap.icon className="w-6 h-6 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold text-foreground mb-2">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{cap.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why it fits */}
      <section className="py-20 bg-secondary/50">
        <div className="container max-w-3xl">
          <AnimSection>
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-8 h-8 text-[oklch(0.55_0.2_255)] shrink-0 mt-1" />
              <div>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">Why it fits</h3>
                <p className="text-muted-foreground leading-relaxed text-lg">
                  EKAS was built inside a precision stamping operation. The starting assumptions are a stamper's, not a generalist's.
                </p>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-section py-24 relative">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <AnimSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              See EKAS on your stamping data.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Tell us about one operating challenge your stamping operation is trying to govern. We will show how EKAS frames the question and delivers a governed answer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openContact} className="btn-primary">
                Request a Demo <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={openContact} className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Download the Capability Brief <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
