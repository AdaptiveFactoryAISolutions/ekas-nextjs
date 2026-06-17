/* ═══════════════════════════════════════════════════════════
   TECHNICAL OVERVIEW — /technical-overview
   Design: Precision Engineering Aesthetic
   For IT Directors, data engineers — confidence, not jargon.
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight, Database, Code2, FileCheck, ShieldAlert,
  Server, Clock, Lock, Eye
} from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

const ARCH_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-technical-architecture-Bpw9yWQPN9TfL7bGRjUSSJ.webp";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const sections = [
  {
    icon: Database,
    title: "Reads your systems — read-only, no disruption",
    content: "EKAS connects to your ERP, MES, CMMS, and QMS through a read-only adapter — a YAML mapping that generates the queries it needs, with no custom code and no changes to your control systems. Connectors today include SAP, Epicor, Plex, and QAD; others are supported through the same pattern. EKAS does not connect to PLCs or controllers and makes no real-time streaming claims — it operates on your systems' production cycle.",
    badge: "Integration",
  },
  {
    icon: Code2,
    title: "Deterministic metrics — the AI never computes the number",
    content: "Every metric is computed in versioned SQL built to ISO 22400-2 (ratio-of-sums OEE, not average-of-averages). The AI's job is to understand your question and select the right metric and tools — it never calculates the result itself. That separation is why EKAS can't hallucinate a number.",
    badge: "Governance",
  },
  {
    icon: FileCheck,
    title: "Evidence on every answer",
    content: "Each result carries its full provenance: which SQL definition ran (with a cryptographic hash), which data source provided the input, how many records were queried, and the data coverage. The number and its receipts travel together.",
    badge: "Provenance",
  },
  {
    icon: ShieldAlert,
    title: "Controlled refusal",
    content: "When data coverage drops below the confidence floor, EKAS returns a structured refusal and what's missing — it does not approximate. A metric you can't trust is worse than no metric.",
    badge: "Honesty",
  },
  {
    icon: Server,
    title: "Deployment & security",
    content: "Deploy in your own environment (containerized) or in our AWS, with an air-gapped option for the most sensitive sites. Access is role-based and logged; the audit trail is automatic. The platform is designed to meet SOC 2 and ISO 27001 requirements.",
    badge: "Security",
  },
  {
    icon: Clock,
    title: "Data requirements",
    content: "No data-science team and no model training on your side. EKAS runs on the historical data you already have; roughly 90 days of history sharpens reliability trends. Forward-looking predictive features are on the roadmap and are introduced as they meet the same evidence standard as the core platform.",
    badge: "Requirements",
  },
];

export default function TechnicalOverview() {
  const { open: openContact } = useContactModal();

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient noise-overlay relative py-28 md:py-36">
        <div className="container relative z-10 max-w-3xl">
          <AnimSection>
            <span className="section-label mb-4 block">Technical Overview</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              How EKAS produces a number{" "}
              <span className="text-[oklch(0.55_0.2_255)]">it can prove.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              EKAS is governed by design: deterministic calculations, full provenance on every result, and a controlled refusal when the evidence isn't there. Here's the architecture behind that.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-16 bg-[oklch(0.12_0.03_255)]">
        <div className="container">
          <AnimSection>
            <div className="text-center mb-8">
              <span className="text-xs font-semibold uppercase tracking-[0.15em] text-[oklch(0.7_0.15_210)]">Platform Architecture</span>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
              <img
                src={ARCH_IMG}
                alt="EKAS Manufacturing Intelligence Platform Architecture — Source Systems → Governance Engine → Role-Based Views"
                className="w-full"
              />
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Technical Sections */}
      <section className="py-24 bg-background">
        <div className="container max-w-4xl">
          <div className="space-y-16">
            {sections.map((sec, i) => (
              <AnimSection key={sec.title} delay={i * 0.05}>
                <div className="flex gap-6 items-start">
                  {/* Icon column */}
                  <div className="hidden md:flex flex-col items-center shrink-0">
                    <div className="w-14 h-14 rounded-2xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center">
                      <sec.icon className="w-7 h-7 text-[oklch(0.55_0.2_255)]" />
                    </div>
                    {i < sections.length - 1 && (
                      <div className="w-px h-full min-h-[40px] bg-border mt-4" />
                    )}
                  </div>
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)] rounded-md">
                        {sec.badge}
                      </span>
                    </div>
                    <h3 className="font-display text-xl md:text-2xl font-semibold text-foreground tracking-tight mb-4">
                      {sec.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {sec.content}
                    </p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Named Integrations Callout */}
      <section className="py-16 bg-secondary/50">
        <div className="container max-w-4xl">
          <AnimSection>
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-1">
                <span className="section-label mb-3 block">Supported Connectors</span>
                <h3 className="font-display text-xl font-semibold text-foreground mb-3">Read-only adapters for your existing systems</h3>
                <p className="text-muted-foreground leading-relaxed">
                  EKAS connects through a standardized YAML mapping pattern. No custom code, no changes to your control systems.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                {["SAP", "Epicor", "Plex", "QAD"].map((name) => (
                  <div key={name} className="px-6 py-3 bg-white border border-border rounded-xl text-sm font-semibold text-foreground shadow-sm">
                    {name}
                  </div>
                ))}
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
              See the architecture on your data.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              We will walk through how EKAS connects to your systems, governs the metric definitions, and delivers provenance on every answer.
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
