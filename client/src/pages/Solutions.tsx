import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useContactModal } from "@/components/ContactModal";
import {
  ArrowRight, CheckCircle2, Factory, Wrench, Cog,
  Users, TrendingUp, ClipboardCheck, DollarSign, BarChart3,
  Activity, Brain, Play, Radio, Zap, LineChart, Timer
} from "lucide-react";

const REALTIME_ANALYTICS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-realtime-analytics-YrnGo8fVqkWgEPdRU88UZL.webp";
const PREDICTIVE_INTELLIGENCE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-predictive-intelligence-dnJmfgYBaq5Z6LRxE8wyvR.webp";
const INTERACTIVE_DEMO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-interactive-demo-aUymJZdecS29FAZFy6GCeB.webp";
const METAL_STAMPING_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/metal-stamping-hero-YTWTyts4WuNBxHzRLfWJTr.webp";
const PRODUCTION_LINE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/production-line-HXJsVzJeh9T5uLAAa2QNm2.webp";
const QUALITY_INSPECTION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/quality-inspection-WbjNDZAP7qT8rkNRojpXW7.webp";


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

const industries = [
  {
    id: "downtime",
    icon: Factory,
    title: "Downtime Attribution Governance",
    subtitle: "Governed Contributor Identification",
    desc: "Govern how downtime contributors are identified, attributed, and verified. EKAS frames the question, shows what the evidence supports, states limitations, and defines the verification step.",
    features: [
      "Governed contributor identification by asset, shift, or event category",
      "Trend comparison against controlled rolling averages",
      "Stated limitations when data is incomplete or codes are unvalidated",
      "Recommended next investigation step with evidence requirements",
      "Verification workflow to confirm improvement against targeted metric",
    ],
    image: METAL_STAMPING_HERO,
  },
  {
    id: "oee",
    icon: Wrench,
    title: "OEE / APQ Governance",
    subtitle: "Controlled Metric Definitions and Interpretation",
    desc: "Govern how OEE is defined, calculated, and interpreted across shifts, lines, and sites. EKAS shows the controlled calculation path, what data feeds each component, where gaps exist, and what the metric does and does not prove.",
    features: [
      "Governed OEE calculation with controlled metric path transparency",
      "Availability, performance, and quality breakdown with evidence trails",
      "Source coverage and stated gaps for each component",
      "Stated limitations when shift or quality data is incomplete",
      "Role-specific interpretation governed by authority level",
    ],
    image: PRODUCTION_LINE,
  },
  {
    id: "quality",
    icon: Cog,
    title: "Quality-Loss Governance",
    subtitle: "Scrap, Rework, FPY Accountability",
    desc: "Govern how quality losses are attributed, investigated, and verified. EKAS connects quality data to production context with stated evidence coverage, limitations, and human-approved containment steps.",
    features: [
      "Governed scrap and rework contributor identification",
      "First-pass yield trending with controlled calculation logic",
      "Evidence-based connection between quality events and production conditions",
      "Stated confidence and limitations when quality data is incomplete",
      "Human-approved containment or investigation steps with verification",
    ],
    image: QUALITY_INSPECTION,
  },
];

const roles = [
  {
    icon: Users,
    title: "Supervisors",
    desc: "Governed shift performance context, handoff summaries, and unresolved items. Start each shift with evidence-backed operating awareness.",
    benefit: "Governed shift decision support",
  },
  {
    icon: TrendingUp,
    title: "Engineers",
    desc: "Governed root-cause investigation workflows with evidence boundaries. Understand what the data supports, what it does not, and what requires further investigation.",
    benefit: "Governed investigation workflows",
  },
  {
    icon: ClipboardCheck,
    title: "Quality Teams",
    desc: "Governed quality-loss attribution connected to production context. Scrap, rework, and FPY analysis with stated evidence coverage and human-approved containment.",
    benefit: "Governed quality decision workflows",
  },
  {
    icon: DollarSign,
    title: "Maintenance",
    desc: "Governed repeat-failure review, asset reliability context, and maintenance follow-up verification against targeted metrics.",
    benefit: "Governed reliability decision support",
  },
  {
    icon: BarChart3,
    title: "Executives",
    desc: "Portfolio-level operating summaries with evidence trails. Cross-plant comparisons using governed metric definitions. No unsupported financial claims.",
    benefit: "Governed portfolio decision support",
  },
];

export default function Solutions() {
  const [activeIndustry, setActiveIndustry] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      {/* Hero */}
      <section className="py-24 bg-secondary border-b border-border">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto">
              <p className="section-label mb-3">Governed Use Cases</p>
              <h1 className="heading-xl text-5xl md:text-6xl text-foreground mb-6">
                One operating challenge.
                <br />
                <span className="text-[oklch(0.55_0.2_255)]">One governed decision workflow.</span>
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                EKAS is designed to start with one operating challenge your team is already trying to govern. Below are examples of where enterprise manufacturing teams commonly begin.
              </p>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          INTELLIGENCE CAPABILITIES — What powers the solutions
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-white">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-14">
              <p className="section-label mb-3">Powered By</p>
              <h2 className="heading-xl text-3xl md:text-4xl text-foreground mb-4">
                Intelligence capabilities behind every solution
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Every EKAS solution is powered by three core intelligence capabilities that work together: real-time streaming analytics, predictive and prescriptive AI, and an interactive decision workflow you can experience firsthand.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Radio,
                color: "emerald",
                badge: "Live",
                title: "Real-Time Analytics",
                desc: "Data ingestion from SAP, Epicor, Plex, QAD, and other MES, ERP, CMMS, QMS, and historian systems. Metrics update on your systems' production data cycle.",
                features: ["Continuous OEE, throughput, quality calculation", "Live anomaly and drift detection", "Immediate threshold breach alerts"],
                image: REALTIME_ANALYTICS,
              },
              {
                icon: Brain,
                color: "amber",
                badge: "AI-Powered",
                title: "Predictive & Prescriptive",
                desc: "Forecast operational drift 7–21 days ahead. When predictions cross governed thresholds, receive prescriptive action recommendations with evidence trails.",
                features: ["7–21 day failure prediction horizon", "Severity-ranked prescriptive actions", "Governed confidence intervals"],
                image: PREDICTIVE_INTELLIGENCE,
              },
              {
                icon: Play,
                color: "blue",
                badge: "Interactive",
                title: "Guided Decision Workflow",
                desc: "Walk through the Frame → Evidence → Answer → Verify workflow interactively. See how EKAS handles your specific operating challenge in a live demo.",
                features: ["6-step guided product tour", "Configure with your own metrics", "See governed evidence in action"],
                image: INTERACTIVE_DEMO,
              },
            ].map((cap, i) => {
              const colorMap: Record<string, { bg: string; text: string; badgeBg: string; badgeBorder: string }> = {
                emerald: { bg: "bg-emerald-50", text: "text-emerald-600", badgeBg: "bg-emerald-50", badgeBorder: "border-emerald-200" },
                amber: { bg: "bg-amber-50", text: "text-amber-600", badgeBg: "bg-amber-50", badgeBorder: "border-amber-200" },
                blue: { bg: "bg-blue-50", text: "text-blue-600", badgeBg: "bg-blue-50", badgeBorder: "border-blue-200" },
              };
              const c = colorMap[cap.color];
              return (
                <AnimSection key={cap.title} delay={i * 0.12}>
                  <div className="feature-card h-full flex flex-col">
                    <div className="rounded-xl overflow-hidden border border-border mb-5 shadow-sm">
                      <img src={cap.image} alt={cap.title} className="w-full h-[180px] object-cover object-top" />
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-8 h-8 rounded-lg ${c.bg} flex items-center justify-center`}>
                        <cap.icon className={`w-4 h-4 ${c.text}`} />
                      </div>
                      <span className={`text-[10px] font-display font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${c.badgeBg} ${c.badgeBorder} ${c.text}`}>{cap.badge}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-2">{cap.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">{cap.desc}</p>
                    <div className="space-y-2">
                      {cap.features.map((f) => (
                        <div key={f} className="flex items-center gap-2">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${c.text} shrink-0`} />
                          <span className="text-xs text-muted-foreground">{f}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </AnimSection>
              );
            })}
          </div>

          <AnimSection>
            <div className="text-center mt-10">
              <button
                onClick={openContact}
                className="inline-flex items-center gap-2 px-7 py-3.5 bg-[oklch(0.55_0.2_255)] text-white font-display font-semibold text-sm rounded-lg hover:bg-[oklch(0.48_0.2_255)] transition-all duration-200 active:scale-[0.97] shadow-lg shadow-[oklch(0.55_0.2_255_/_0.2)] uppercase tracking-wide cursor-pointer"
              >
                Request a Live Demo <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* Industry Solutions — Tab-based with images */}
      <section id="use-cases" className="py-24 bg-[oklch(0.975_0.003_255)] border-y border-border scroll-mt-20">
        <div className="container">
          <AnimSection>
            <h2 className="heading-xl text-3xl md:text-4xl text-foreground mb-10 text-center">
              Common Starting Points
            </h2>
          </AnimSection>

          {/* Industry tabs */}
          <AnimSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {industries.map((ind, i) => (
                <button
                  key={ind.id}
                  onClick={() => setActiveIndustry(i)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-semibold uppercase tracking-wide transition-all duration-200 ${
                    activeIndustry === i
                      ? "bg-[oklch(0.55_0.2_255)] text-white shadow-lg shadow-[oklch(0.55_0.2_255_/_0.2)]"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <ind.icon className="w-4 h-4" />
                  {ind.title}
                </button>
              ))}
            </div>
          </AnimSection>

          {/* Industry content */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndustry}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              id={industries[activeIndustry].id}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div>
                  <p className="section-label mb-2">{industries[activeIndustry].subtitle}</p>
                  <h3 className="heading-xl text-3xl md:text-4xl text-foreground mb-4">
                    {industries[activeIndustry].title}
                  </h3>
                  <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                    {industries[activeIndustry].desc}
                  </p>
                  <ul className="space-y-3 mb-8">
                    {industries[activeIndustry].features.map((f) => (
                      <li key={f} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[oklch(0.55_0.2_255)] shrink-0 mt-0.5" />
                        <span className="text-sm text-foreground font-medium">{f}</span>
                      </li>
                    ))}
                  </ul>
                  <a href="#cta" className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.2_255)] hover:underline uppercase tracking-wide">
                    See how it works <ArrowRight className="w-4 h-4" />
                  </a>
                </div>
                <div className="rounded-2xl overflow-hidden border border-border shadow-xl">
                  <img src={industries[activeIndustry].image} alt={industries[activeIndustry].title} className="w-full h-[400px] object-cover" />
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* By Role — Blue accent section */}
      <section className="py-24 bg-[oklch(0.55_0.2_255)]">
        <div className="container">
          <AnimSection>
            <div className="text-center mb-14">
              <h2 className="heading-xl text-3xl md:text-4xl text-white mb-4">
                Governed Role-Specific Decision Support
              </h2>
              <p className="text-lg text-white/70 max-w-2xl mx-auto">
                Each role receives decision support governed by their authority level, accountability scope, and operational context. Same underlying evidence, different governed perspectives.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-5">
            {roles.map((role, i) => (
              <AnimSection key={role.title} delay={i * 0.1}>
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-6 h-full hover:bg-white/15 transition-all duration-300 hover:-translate-y-1">
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center mb-4">
                    <role.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-white mb-2">{role.title}</h3>
                  <p className="text-sm text-white/70 leading-relaxed mb-4">{role.desc}</p>
                  <p className="text-xs font-bold text-white/90 uppercase tracking-wide">{role.benefit}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="cta" className="py-24 bg-white">
        <div className="container">
          <AnimSection>
            <div className="bg-[oklch(0.15_0.03_255)] rounded-3xl p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-[oklch(0.55_0.2_255_/_0.15)] rounded-full blur-[80px]" />
              <div className="relative z-10">
                <h2 className="heading-xl text-3xl md:text-4xl text-white mb-4">
                  Request an Executive Platform Review
                </h2>
                <p className="text-white/60 text-lg max-w-xl mx-auto mb-8">
                  Tell us about one operating challenge your team is trying to govern. We will show how EKAS frames the question, identifies the evidence required, and defines how the result should be verified.
                </p>
                <button
                  onClick={openContact}
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[oklch(0.55_0.2_255)] text-white font-semibold text-base rounded-lg hover:bg-[oklch(0.48_0.2_255)] transition-all duration-200 active:scale-[0.97] shadow-xl shadow-[oklch(0.55_0.2_255_/_0.3)] uppercase tracking-wide cursor-pointer"
                >
                  Request Executive Platform Review <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>
    </>
  );
}
