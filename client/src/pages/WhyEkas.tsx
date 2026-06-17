import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useContactModal } from "@/components/ContactModal";
import {
  ArrowRight, CheckCircle2, ChevronDown, Shield, Clock,
  FileCheck, Layers, Lock, Server, Zap, Eye, Database
} from "lucide-react";

const CLARIFICATION_UI = "https://dkcto6vm4oej9.cloudfront.net/manus-storage/ekas-clarification-ui_728968cd.png";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-start justify-between gap-4 py-5 text-left group"
      >
        <span className="font-display text-sm md:text-base font-semibold text-foreground group-hover:text-[oklch(0.55_0.2_255)] transition-colors">
          {question}
        </span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground shrink-0 mt-0.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className="overflow-hidden"
          >
            <p className="text-sm text-muted-foreground leading-relaxed pb-5 pr-8">{answer}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const differentiators = [
  { icon: Layers, title: "Governed Metrics", desc: "EKAS governs how manufacturing metrics are defined, calculated, and interpreted — so teams operate from the same controlled truth." },
  { icon: FileCheck, title: "Evidence Standards", desc: "Every answer shows time window, scope, metric path, source coverage, and limitations. Root cause remains a hypothesis unless evidence proves it." },
  { icon: Shield, title: "Role-Specific Decision Support", desc: "Engineers, supervisors, maintenance, quality, and executives each receive governed decision support based on authority level and accountability scope." },
  { icon: Lock, title: "No-Data Honesty", desc: "If the data does not support a conclusion, EKAS states that clearly. A bounded answer with stated limitations is more useful than a confident unsupported one." },
  { icon: Clock, title: "Verification Workflows", desc: "EKAS governs the verification step: did the action taken actually improve the targeted metric? Recommendations without follow-up verification are incomplete decision cycles." },
  { icon: Zap, title: "Human-Approved Actions", desc: "EKAS does not take autonomous action. Every recommendation requires human review, approval, and verification before it becomes an operational decision." },
];

const processSteps = [
  { num: "01", title: "Discovery", duration: "Step 1", desc: "Tell us about one operating challenge your team is trying to govern. OEE loss, downtime attribution, scrap, repeat failures, shift handoff, or cross-site metric alignment." },
  { num: "02", title: "Pilot Readiness", duration: "Step 2", desc: "We assess data availability, system connectivity, and governance requirements. Define what evidence is needed and how the result should be verified." },
  { num: "03", title: "60-Day Pilot", duration: "Step 3", desc: "Deploy EKAS against one governed use case with representative manufacturing data. Measure decision quality, evidence coverage, and verification completion." },
  { num: "04", title: "Ongoing Subscription", duration: "Step 4", desc: "Expand governed decision workflows across additional use cases, roles, and sites. Continuous improvement measured against operational metrics." },
];

const faqs = [
  { q: "What is EKAS?", a: "EKAS (Enterprise Knowledge & Analytics System) is a governed manufacturing decision-intelligence platform. It helps enterprise manufacturers convert operational evidence into role-specific decisions, human-approved action workflows, and verified improvement." },
  { q: "How is EKAS different from a dashboard?", a: "Dashboards show data. EKAS governs how that data becomes decisions. It adds controlled metric definitions, evidence standards, stated limitations, role-specific decision support, human-approved actions, and verification workflows." },
  { q: "How is EKAS different from a generic AI chatbot?", a: "Generic AI can sound confident even when source data is incomplete. EKAS is designed for governed manufacturing decision support with no-data honesty, stated limitations, evidence standards, and human approval at every step." },
  { q: "What data does EKAS work with?", a: "EKAS connects to structured manufacturing data from ERP, MES, CMMS, QMS, historians, machine-data sources, databases, APIs, and structured files. Those systems remain the systems of record." },
  { q: "Does EKAS modify our source systems?", a: "No. EKAS reads from existing systems. It does not write back, modify source data, or install agents on production equipment. It governs how evidence is interpreted, not how data is stored." },
  { q: "Does EKAS claim ROI or financial savings?", a: "No. EKAS does not claim ROI, EBITDA, dollar savings, margin impact, revenue impact, or payback without a governed cost model. Operational improvement is measured against targeted metrics, not unsupported financial projections." },
  { q: "What roles does EKAS support?", a: "Engineers, supervisors, maintenance, quality, and executives each receive governed decision support based on their authority level, accountability scope, and operational context." },
  { q: "How do we get started?", a: "Request an Executive Platform Review. Tell us about one operating challenge your team is trying to govern, and we will show how EKAS frames the question, identifies the evidence required, and defines how the result should be verified." },
];

export default function WhyEkas() {
  const { open: openContact } = useContactModal();

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <AnimSection>
              <p className="section-label mb-3">Why EKAS Is Different</p>
              <h1 className="heading-xl text-5xl md:text-6xl text-foreground mb-6">
                Dashboards show data.
                <br />
                <span className="text-[oklch(0.55_0.2_255)]">EKAS governs decisions.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8 max-w-xl">
                Most plants already have dashboards. The harder problem is governing which number is right, what evidence supports it, what limitations exist, and what your team should do next — with human approval at every step.
              </p>
              <a href="#approach" className="inline-flex items-center gap-2 px-7 py-3.5 bg-[oklch(0.55_0.2_255)] text-white font-semibold text-sm rounded-lg hover:bg-[oklch(0.48_0.2_255)] transition-all duration-200 active:scale-[0.97] uppercase tracking-wide shadow-lg shadow-[oklch(0.55_0.2_255_/_0.2)]">
                See Engagement Model <ArrowRight className="w-4 h-4" />
              </a>
            </AnimSection>

            <AnimSection delay={0.2}>
              <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/10 border border-border">
                <img src={CLARIFICATION_UI} alt="EKAS Clarification UI — governed question framing" className="w-full" />
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* Differentiators */}
      <section className="py-24 bg-white">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="heading-xl text-4xl md:text-5xl text-foreground mb-5">
                What Makes EKAS Different
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EKAS is not a dashboard, not a generic chatbot, and not a replacement for your ERP, MES, or CMMS. It is the governed decision layer that controls how evidence becomes action — with human approval at every step.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
            {differentiators.map((d, i) => (
              <AnimSection key={d.title} delay={i * 0.08}>
                <div className="feature-card h-full">
                  <div className="w-11 h-11 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mb-4">
                    <d.icon className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{d.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach — Process Steps */}
      <section id="approach" className="py-24 bg-[oklch(0.15_0.03_255)] scroll-mt-20">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-[oklch(0.65_0.2_255)] mb-3">Engagement Model</p>
              <h2 className="heading-xl text-4xl md:text-5xl text-white mb-5">
                Discovery → Pilot Readiness → Pilot → Subscription
              </h2>
              <p className="text-lg text-white/60 leading-relaxed">
                EKAS is designed to start with one operating challenge your team is already trying to govern.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {processSteps.map((step, i) => (
              <AnimSection key={step.num} delay={i * 0.1}>
                <div className="bg-white/5 border border-white/10 rounded-xl p-6 h-full hover:bg-white/8 transition-all duration-300 hover:-translate-y-1">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="font-display text-2xl font-semibold text-[oklch(0.65_0.2_255)]">{step.num}</span>
                    <span className="text-[10px] font-display font-semibold uppercase tracking-wider text-white/40">{step.duration}</span>
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2">{step.title}</h3>
                  <p className="text-sm text-white/50 leading-relaxed">{step.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* Security & Compliance */}
      <section id="security" className="py-24 bg-white scroll-mt-20">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <h2 className="heading-xl text-4xl md:text-5xl text-foreground mb-5">
                Data Handling Principles
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EKAS is designed around read-only access, data sovereignty, and transparent evidence boundaries.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: Lock, title: "Read-Only Access", desc: "EKAS reads from existing systems. It does not write back, modify source data, or install agents on production equipment." },
              { icon: Shield, title: "Evidence Transparency", desc: "Every answer includes what data was used, what was not available, and what limitations apply to the conclusion." },
              { icon: Server, title: "Named Connectors & Compliance", desc: "SAP, Epicor, Plex, QAD, and other MES, ERP, CMMS, QMS, and historian systems via read-only adapters. Designed to meet SOC 2 and ISO 27001 requirements." },
            ].map((item, i) => (
              <AnimSection key={item.title} delay={i * 0.1}>
                <div className="feature-card h-full text-center">
                  <div className="w-14 h-14 rounded-2xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-7 h-7 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-24 bg-secondary scroll-mt-20">
        <div className="container">
          <AnimSection>
            <div className="max-w-3xl mx-auto">
              <h2 className="heading-xl text-3xl md:text-4xl text-foreground mb-10 text-center">
                Executive FAQ
              </h2>
              <div className="bg-white rounded-xl border border-border p-6 md:p-8 shadow-sm">
                {faqs.map((faq) => (
                  <FAQItem key={faq.q} question={faq.q} answer={faq.a} />
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 bg-white">
        <div className="container">
          <AnimSection>
            <div className="bg-[oklch(0.55_0.2_255)] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h2 className="heading-xl text-3xl md:text-4xl text-white mb-4">
                  Request an Executive Platform Review.
                </h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto mb-8">
                  Tell us about one operating challenge your team is trying to govern. We will show how EKAS frames the question, identifies the evidence required, and defines how the result should be verified.
                </p>
                <button
                  onClick={openContact}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[oklch(0.55_0.2_255)] font-bold text-base rounded-lg hover:bg-white/90 transition-all duration-200 active:scale-[0.97] shadow-xl uppercase tracking-wide cursor-pointer"
                >
                  Request Executive Platform Review <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
                  {["Governed decision workflows", "Human-approved actions", "Verified outcomes"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-white/80" />
                      <span className="text-sm text-white/80">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  );
}
