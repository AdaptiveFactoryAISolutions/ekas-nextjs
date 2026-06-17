/* ═══════════════════════════════════════════════════════════
   INDUSTRIES OVERVIEW — /industries
   Design: Precision Engineering Aesthetic
   Palette: brand blue oklch(0.55 0.2 255), navy oklch(0.15 0.03 255)
   Typography: Space Grotesk display, IBM Plex Sans body
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Factory, Car, Wrench } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

const METAL_STAMPING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-metal-stamping-hero-HAUCQEHfHX8oRDdoFKHKjD.webp";
const AUTOMOTIVE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-automotive-hero-fsXLYMofERQEKMzUDwxrFV.webp";
const INDUSTRIAL_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-industrial-mfg-hero-Cgo5PQ4N9NxkJuPegGgUdR.webp";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const industries = [
  {
    slug: "/industries/metal-stamping",
    icon: Factory,
    title: "Metal Stamping",
    tagline: "Built inside a precision stamping operation",
    desc: "Multi-out tooling, companion parts, press tonnage, hit-rate variance, die-changeover downtime — EKAS models the realities of a precision stamping operation, not a textbook machine cell.",
    img: METAL_STAMPING_IMG,
  },
  {
    slug: "/industries/automotive",
    icon: Car,
    title: "Automotive",
    tagline: "Metrics that survive a Tier-1 supplier review",
    desc: "When your customer's supplier-quality team asks how a number was calculated, EKAS has the answer — the exact definition, the data, and the evidence.",
    img: AUTOMOTIVE_IMG,
  },
  {
    slug: "/industries/industrial-manufacturing",
    icon: Wrench,
    title: "Industrial Manufacturing",
    tagline: "One governed standard across a mixed, multi-site operation",
    desc: "Heavy-tonnage presses, a varied part-mix, several plants — and metrics that mean something different at each one. EKAS applies a single governed definition everywhere.",
    img: INDUSTRIAL_IMG,
  },
];

export default function Industries() {
  const { open: openContact } = useContactModal();

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient noise-overlay relative py-28 md:py-36">
        <div className="container relative z-10 text-center max-w-3xl mx-auto">
          <AnimSection>
            <span className="section-label mb-4 block">Industries</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Built for precision manufacturing —{" "}
              <span className="text-[oklch(0.55_0.2_255)]">tuned to your standards.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              EKAS governs the metrics your industry is judged on, mapped to the standards your customers and auditors expect. We went deep in precision metal stamping first — the hardest place to govern OEE, because multi-out tooling, companion parts, and hit-rate variance break textbook formulas. The same governed foundation now extends across discrete manufacturing. We earn each vertical by proving the metrics survive its audits, not by claiming coverage we haven't validated.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Industry Cards */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="space-y-20">
            {industries.map((ind, i) => (
              <AnimSection key={ind.slug} delay={i * 0.1}>
                <Link href={ind.slug} className="block group">
                  <div className={`grid md:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? "md:direction-rtl" : ""}`}>
                    {/* Image */}
                    <div className={`relative overflow-hidden rounded-2xl ${i % 2 === 1 ? "md:order-2" : ""}`}>
                      <div className="aspect-[16/10] overflow-hidden rounded-2xl">
                        <img
                          src={ind.img}
                          alt={ind.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                      </div>
                      {/* Overlay gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-2xl" />
                      <div className="absolute bottom-6 left-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg text-white text-sm font-semibold">
                          <ind.icon className="w-4 h-4" />
                          {ind.title}
                        </span>
                      </div>
                    </div>
                    {/* Content */}
                    <div className={`${i % 2 === 1 ? "md:order-1" : ""}`}>
                      <span className="section-label mb-3 block">{ind.title}</span>
                      <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground tracking-tight mb-4">
                        {ind.tagline}
                      </h2>
                      <p className="text-muted-foreground leading-relaxed mb-6">
                        {ind.desc}
                      </p>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.2_255)] group-hover:gap-3 transition-all duration-200">
                        Explore {ind.title} <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </div>
                </Link>
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
              See how EKAS governs your industry's metrics.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Tell us about one operating challenge your team is trying to govern. We will show how EKAS frames the question, identifies the evidence required, and defines how the result should be verified.
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
