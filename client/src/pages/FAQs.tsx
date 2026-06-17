/* ═══════════════════════════════════════════════════════════
   FAQs — /resources/faqs
   Design: Precision Engineering Aesthetic
   Full FAQ set — Product, Deployment, Security, Commercial
═══════════════════════════════════════════════════════════ */
import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import JsonLd from "@/components/JsonLd";
import {
  ArrowRight, ChevronDown, Package, Server, ShieldCheck, DollarSign
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

function FAQItem({ question, answer, defaultOpen = false }: { question: string; answer: string; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-display text-sm md:text-base font-semibold text-foreground group-hover:text-[oklch(0.55_0.2_255)] transition-colors">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {/* Answer is always rendered in the DOM (crawlable + validates FAQ JSON-LD); CSS grid handles collapse */}
      <div
        className="grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className={`overflow-hidden transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}>
          <p className="text-sm text-muted-foreground leading-relaxed pb-5 pr-8">{answer}</p>
        </div>
      </div>
    </div>
  );
}

const categories = [
  {
    icon: Package,
    title: "Product",
    faqs: [
      {
        q: "What does \"governed\" mean?",
        a: "Every metric has one controlled definition, every answer carries its evidence and limits, and every recommended action waits for human approval.",
      },
      {
        q: "Is EKAS software or consulting?",
        a: "A software subscription. Implementation is included; an optional fixed-scope readiness assessment can precede a subscription, but you're buying a platform, not a retainer.",
      },
      {
        q: "Is EKAS a dashboard or a chatbot?",
        a: "Neither. It's a governed intelligence platform that answers questions with the production record behind every number.",
      },
      {
        q: "What's on the roadmap?",
        a: "Predictive maintenance and reliability forecasting, agentic quoting, and automated EBITDA dollar-attribution — each introduced as it reaches the platform's evidence and governance standard.",
      },
    ],
  },
  {
    icon: Server,
    title: "Deployment & Integration",
    faqs: [
      {
        q: "How long to value?",
        a: "First audit-traceable metric in about 30 days; proven during a 60-day pilot on your real data.",
      },
      {
        q: "What does onboarding require from us?",
        a: "Data-access credentials and about two hours a week during onboarding.",
      },
      {
        q: "What systems do you connect to?",
        a: "SAP, Epicor, Plex, QAD, and others via a read-only connection. EKAS reads from your MES/ERP/CMMS/QMS — it does not replace them.",
      },
      {
        q: "Do we need historical data?",
        a: "Yes — EKAS runs on the data you already have. About 90 days of history sharpens reliability trends. No data-science team required.",
      },
    ],
  },
  {
    icon: ShieldCheck,
    title: "Security & Compliance",
    faqs: [
      {
        q: "Is our data secure?",
        a: "Connections are read-only; EKAS runs in your environment or our AWS, with an air-gapped option; access is role-based and logged.",
      },
      {
        q: "Are you SOC 2 certified?",
        a: "EKAS is designed to meet SOC 2 and ISO 27001 control requirements, with role-based access, logged queries, and an air-gapped deployment option. Ask us directly where we are in formal certification — we'll give you the current status in writing, not a marketing claim.",
      },
      {
        q: "Does this help with IATF 16949?",
        a: "Yes — the audit trail and versioned definitions are built for IATF 16949 expectations by design.",
      },
    ],
  },
  {
    icon: DollarSign,
    title: "Commercial",
    faqs: [
      {
        q: "What does it cost?",
        a: "Pricing scales with your fleet size and the problem you start with. There's no six-figure implementation. Model your payback with the ROI calculator, or get a number in a short scoping conversation.",
      },
      {
        q: "Do you have customers?",
        a: "EKAS is not yet deployed in a live customer plant. The platform was built and validated inside a working precision-stamping operation against real production data — real machines, real downtime, real OEE — not synthetic benchmarks. We are now opening a small founding-customer program for first live deployments. If you want a vendor with a hundred logos, that isn’t us yet. If you want a decision layer built by people who’ve run the floor and are honest about where it stands, let’s talk.",
      },
      {
        q: "What about ROI?",
        a: "We don't publish guaranteed ROI figures. EKAS measures what's happening and shows the evidence — you model your own estimate.",
      },
    ],
  },
];

export default function FAQs() {
  const { open: openContact } = useContactModal();

  const faqJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": categories.flatMap(cat => cat.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    })))
  }), []);

  return (
    <div>
      <JsonLd data={faqJsonLd} />
      {/* Hero */}
      <section className="hero-gradient noise-overlay relative py-24 md:py-32">
        <div className="container relative z-10 max-w-3xl">
          <AnimSection>
            <Link href="/resources" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Resources
            </Link>
            <span className="section-label mb-4 block">FAQs</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Real answers.{" "}
              <span className="text-[oklch(0.55_0.2_255)]">Not marketing.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Product, deployment, security, and commercial questions — answered honestly.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-24 bg-background">
        <div className="container max-w-3xl">
          <div className="space-y-16">
            {categories.map((cat, i) => (
              <AnimSection key={cat.title} delay={i * 0.05}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center">
                    <cat.icon className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <h2 className="font-display text-xl font-semibold text-foreground">{cat.title}</h2>
                </div>
                <div className="bg-white border border-border rounded-xl px-6">
                  {cat.faqs.map((faq, fi) => (
                    <FAQItem key={faq.q} question={faq.q} answer={faq.a} defaultOpen={fi === 0} />
                  ))}
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
              Still have questions?
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              We'd rather answer them directly. Tell us about your operation and we'll show you how EKAS applies.
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
