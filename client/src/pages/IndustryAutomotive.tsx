/* ═══════════════════════════════════════════════════════════
   INDUSTRY DETAIL — AUTOMOTIVE — /industries/automotive
   Design: Precision Engineering Aesthetic
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, ArrowLeft, ShieldCheck, BarChart3, Target } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-automotive-hero-fsXLYMofERQEKMzUDwxrFV.webp";

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
    icon: ShieldCheck,
    title: "IATF 16949 audit trail by design",
    desc: "Every metric defined once, in version control, with full provenance.",
  },
  {
    icon: BarChart3,
    title: "Capacity planning on a true OEE",
    desc: "So your commitments to the OEM start from a number you can defend.",
  },
  {
    icon: Target,
    title: "Downtime and quality-loss truth",
    desc: "Single source of truth across lines, de-duplicated and traceable.",
  },
];

export default function IndustryAutomotive() {
  const { open: openContact } = useContactModal();

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[480px] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Automotive manufacturing facility" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
        <div className="container relative z-10 pb-16 pt-32">
          <Link href="/industries" className="inline-flex items-center gap-2 text-white/60 hover:text-white text-sm mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> All Industries
          </Link>
          <span className="section-label text-[oklch(0.7_0.15_210)] mb-3 block">Automotive</span>
          <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl">
            Metrics that survive a Tier-1 supplier review.
          </h1>
          <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
            When your customer's supplier-quality team asks how a number was calculated, EKAS has the answer — the exact definition, the data, and the evidence.
          </p>
        </div>
      </section>

      {/* Capabilities */}
      <section className="py-24 bg-background">
        <div className="container">
          <AnimSection>
            <span className="section-label mb-3 block">What EKAS handles for automotive suppliers</span>
            <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-12 max-w-xl">
              Governed metrics for automotive accountability.
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
              See EKAS on your automotive data.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Tell us about one operating challenge your team is trying to govern. We will show how EKAS frames the question and delivers a governed answer.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openContact} className="btn-primary">
                Request a Demo <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/resources/roi-calculator" className="btn-secondary border-white/30 text-white hover:bg-white/10 hover:border-white/50">
                Run the ROI Calculator <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
