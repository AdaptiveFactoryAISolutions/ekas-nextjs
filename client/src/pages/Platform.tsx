import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useContactModal } from "@/components/ContactModal";
import {
  ArrowRight, BarChart3, Clock, Zap, FileCheck, Shield,
  Database, Lock, CheckCircle2, Eye, Settings, Layers, TrendingUp,
  Activity, Brain, Play, Radio, Gauge, LineChart, Sparkles, Monitor
} from "lucide-react";

const DASHBOARD_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-dashboard-mockup-5VjjBaD9F4gzh3mELmqDKS.webp";
const REALTIME_ANALYTICS = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-realtime-analytics-YrnGo8fVqkWgEPdRU88UZL.webp";
const PREDICTIVE_INTELLIGENCE = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-predictive-intelligence-dnJmfgYBaq5Z6LRxE8wyvR.webp";
const INTERACTIVE_DEMO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-interactive-demo-aUymJZdecS29FAZFy6GCeB.webp";
const EVIDENCE_PACKET_GOV = "/manus-storage/evidence-packet-governed_1e93765f.png";
const CONNECTIVITY_DIAGRAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-connectivity-diagram-NjyD7RgUwThb2AhRdvnBQN.webp";
const ROLE_ANSWERS = "/manus-storage/ekas-role-answers_183ba462.png";
const ACTION_DRAFT = "/manus-storage/ekas-action-draft_3a8fc83e.png";
const DEGRADED_CARD = "/manus-storage/ekas-degraded-card_9232cfce.png";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const capabilities = [
  {
    id: "trusted-metrics",
    icon: BarChart3,
    title: "Governed Metrics",
    subtitle: "Controlled Definitions and Calculation Paths",
    desc: "EKAS governs how manufacturing metrics are defined, calculated, and interpreted — so teams operate from the same controlled truth instead of debating numbers.",
    features: [
      "Governed metric definitions for OEE, downtime, scrap, throughput",
      "Same calculation logic across shifts, lines, plants, and sites",
      "Metric path transparency — see how any number was derived",
      "Versioned definitions with change-control discipline",
    ],
    image: DASHBOARD_MOCKUP,
  },
  {
    id: "evidence",
    icon: Shield,
    title: "Evidence Standards",
    subtitle: "Decision-Grade Provenance and Limitations",
    desc: "A governed answer shows the time window, scope, metric path, source coverage, and limitations. If data does not support a conclusion, EKAS states that clearly. Root cause remains a hypothesis unless evidence proves it.",
    features: [
      "Time window, scope, and metric path for every answer",
      "Source coverage, data completeness, and stated gaps",
      "Explicit limitations and confidence boundaries",
      "No-data honesty — bounded answers over confident guesses",
    ],
    image: EVIDENCE_PACKET_GOV,
  },
  {
    id: "roles",
    icon: Layers,
    title: "Role-Specific Decision Support",
    subtitle: "Governed Guidance for Every Role",
    desc: "Engineers, supervisors, maintenance, quality, and executives each receive decision support governed by their role, authority level, and accountability scope.",
    features: [
      "Engineer: governed root-cause investigation workflows",
      "Supervisor: shift performance, handoff, and escalation context",
      "Maintenance: repeat-failure, reliability, and PM compliance review",
      "Executive: portfolio-level operating summaries with evidence trails",
    ],
    image: ROLE_ANSWERS,
  },
  {
    id: "verification",
    icon: FileCheck,
    title: "Verification Workflows",
    subtitle: "Confirm Actions Against Operational Metrics",
    desc: "EKAS governs the verification step: did the action taken actually improve the targeted metric? A recommendation without follow-up verification is an incomplete decision cycle.",
    features: [
      "Define expected improvement before action is taken",
      "Track targeted metric over a governed time window",
      "Compare before and after with controlled calculation logic",
      "Build institutional knowledge from verified outcomes",
    ],
    image: ACTION_DRAFT,
  },
];

export default function Platform() {
  const [activeTab, setActiveTab] = useState(0);
  const { open: openContact } = useContactModal();

  return (
    <>
      {/* ═══════════════════════════════════════════════════════════════
          HERO — Dark navy with gradient orbs and dashboard
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-28 md:py-36 overflow-hidden bg-[oklch(0.13_0.03_255)]">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.08)] rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 w-[400px] h-[400px] bg-[oklch(0.55_0.2_255_/_0.05)] rounded-full blur-[100px]" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
            >
              <p className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-[oklch(0.65_0.2_255)] mb-4">Platform</p>
              <h1 className="heading-xl text-4xl md:text-5xl lg:text-6xl text-white mb-6">
                The governed decision layer
                <br />
                <span className="text-[oklch(0.65_0.2_255)]">between your systems and your team</span>
              </h1>
              <p className="text-lg text-white/60 leading-relaxed mb-8 max-w-lg">
                EKAS is a governed manufacturing decision-intelligence platform. It converts operational evidence into role-specific decisions, human-approved action workflows, and verified improvement — without replacing your existing systems.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#cta" className="btn-primary">
                  Request Executive Platform Review <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#capabilities" className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/30 text-white font-display font-semibold text-sm rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-[0.97] uppercase tracking-wide">
                  See How It Works
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
              className="hidden lg:block"
            >
              <div className="relative">
                <div className="rounded-2xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10 ring-1 ring-white/5">
                  <img src={DASHBOARD_MOCKUP} alt="EKAS Platform" className="w-full" />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-white rounded-xl p-4 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[oklch(0.55_0.2_255_/_0.1)] flex items-center justify-center">
                      <Shield className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                    </div>
                    <div>
                      <p className="text-xs font-display font-semibold text-gray-400 uppercase tracking-wider">Governance</p>
                      <p className="text-sm font-display font-semibold text-foreground">100% Traceable</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CORE CAPABILITIES — Real-Time, Predictive, Interactive Demo
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-[oklch(0.55_0.2_255_/_0.03)] rounded-full blur-[100px]" />
        <div className="container relative">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="section-label mb-3">Core Intelligence Engine</p>
              <h2 className="heading-xl text-4xl md:text-5xl text-foreground mb-5">
                Real-time analytics.
                <br />
                <span className="text-[oklch(0.55_0.2_255)]">Predictive & prescriptive intelligence.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EKAS doesn't just govern decisions — it powers them with a streaming analytics engine, predictive models that forecast operational drift before it impacts production, and prescriptive recommendations that suggest the next best action.
              </p>
            </div>
          </AnimSection>

          {/* Real-Time Analytics */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
            <AnimSection>
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl ring-1 ring-black/5">
                <img src={REALTIME_ANALYTICS} alt="EKAS Real-Time Analytics Engine" className="w-full" />
              </div>
            </AnimSection>
            <AnimSection delay={0.15}>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 mb-5">
                <Radio className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-xs font-display font-semibold text-emerald-700 uppercase tracking-wider">Live Streaming</span>
              </div>
              <h3 className="heading-xl text-3xl md:text-4xl text-foreground mb-4">
                Real-Time Analytics Engine
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                EKAS processes streaming operational data from connected machines, sensors, and systems in real time. Metrics update continuously — not on refresh cycles or batch intervals. When conditions change, EKAS detects it immediately.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Activity, label: "Streaming Data Ingestion", desc: "Continuous processing from MES, historians, IoT sensors, and machine interfaces" },
                  { icon: Gauge, label: "Sub-Second Metric Updates", desc: "OEE, throughput, quality, and custom KPIs calculated in real time" },
                  { icon: Monitor, label: "Live Condition Monitoring", desc: "Immediate detection of drift, anomalies, and threshold breaches across all connected assets" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>

          {/* Predictive & Prescriptive */}
          <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">
            <AnimSection delay={0.15} className="order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 mb-5">
                <Brain className="w-3.5 h-3.5 text-amber-600" />
                <span className="text-xs font-display font-semibold text-amber-700 uppercase tracking-wider">AI-Powered</span>
              </div>
              <h3 className="heading-xl text-3xl md:text-4xl text-foreground mb-4">
                Predictive & Prescriptive Intelligence
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                EKAS forecasts operational drift 7–21 days ahead using time-series models trained on your production data. When a prediction crosses a governed threshold, EKAS generates prescriptive recommendations — specific, actionable steps with evidence provenance and stated confidence.
              </p>
              <div className="space-y-4">
                {[
                  { icon: LineChart, label: "Predictive Forecasting", desc: "7–21 day horizon for asset degradation, quality drift, and throughput decline" },
                  { icon: Sparkles, label: "Prescriptive Recommendations", desc: "AI-generated action plans with severity, impact assessment, and evidence trails" },
                  { icon: Shield, label: "Governed Confidence Bounds", desc: "Every prediction includes stated confidence intervals and data coverage" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-50 flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">{item.label}</p>
                      <p className="text-xs text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
            <AnimSection className="order-1 lg:order-2">
              <div className="rounded-2xl overflow-hidden border border-border shadow-2xl ring-1 ring-black/5">
                <img src={PREDICTIVE_INTELLIGENCE} alt="EKAS Predictive Intelligence" className="w-full" />
              </div>
            </AnimSection>
          </div>

          {/* Interactive Demo */}
          <AnimSection>
            <div className="bg-[oklch(0.13_0.03_255)] rounded-3xl p-8 md:p-12 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[oklch(0.55_0.2_255_/_0.08)] rounded-full blur-[100px]" />
              <div className="grid lg:grid-cols-2 gap-10 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[oklch(0.55_0.2_255_/_0.15)] border border-[oklch(0.55_0.2_255_/_0.3)] mb-5">
                    <Play className="w-3.5 h-3.5 text-[oklch(0.7_0.2_255)]" />
                    <span className="text-xs font-display font-semibold text-[oklch(0.7_0.2_255)] uppercase tracking-wider">Interactive Demo</span>
                  </div>
                  <h3 className="heading-xl text-3xl md:text-4xl text-white mb-4">
                    See the Decision Workflow in Action
                  </h3>
                  <p className="text-lg text-white/60 leading-relaxed mb-6">
                    Walk through a guided, interactive product tour. Frame a real manufacturing question, see how EKAS identifies evidence, produces a bounded answer, and defines the verification step — all in your browser.
                  </p>
                  <div className="flex flex-wrap gap-4">
                    <button
                      onClick={openContact}
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-[oklch(0.55_0.2_255)] text-white font-display font-semibold text-sm rounded-lg hover:bg-[oklch(0.48_0.2_255)] transition-all duration-200 active:scale-[0.97] shadow-xl shadow-[oklch(0.55_0.2_255_/_0.3)] uppercase tracking-wide cursor-pointer"
                    >
                      Request Live Demo <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5">
                  <img src={INTERACTIVE_DEMO} alt="EKAS Interactive Product Tour" className="w-full" />
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          ARCHITECTURE — How EKAS connects
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-[oklch(0.55_0.2_255_/_0.03)] rounded-full blur-[80px]" />

        <div className="container relative">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="section-label mb-3">Integration Architecture</p>
              <h2 className="heading-xl text-4xl md:text-5xl text-foreground mb-5">
                Sits above your existing systems.
                <br />
                <span className="text-[oklch(0.55_0.2_255)]">Does not replace them.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EKAS connects via read-only adapters to SAP, Epicor, Plex, QAD, and other MES, ERP, CMMS, QMS, and historian systems. Those systems remain the systems of record. EKAS does not connect to PLCs or machine controllers and makes no real-time streaming claims — it operates on your systems' production data cycle.
              </p>
            </div>
          </AnimSection>

          <AnimSection delay={0.2}>
            <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-white p-6">
              <img src={CONNECTIVITY_DIAGRAM} alt="EKAS Architecture" className="w-full rounded-xl" />
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { icon: Lock, title: "Read-Only Access", desc: "EKAS reads from existing systems. It does not write back, modify source data, or install agents on production equipment." },
              { icon: Database, title: "Named Connectors", desc: "SAP, Epicor, Plex, QAD, and other MES, ERP, CMMS, QMS, and historian systems via read-only adapters." },
              { icon: Settings, title: "Security & Compliance", desc: "Designed to meet SOC 2 and ISO 27001 requirements. Role-based access, logged queries, air-gapped deployment option." },
            ].map((item, i) => (
              <AnimSection key={item.title} delay={0.3 + i * 0.1}>
                <div className="feature-card h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mx-auto mb-4">
                    <item.icon className="w-6 h-6 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <h3 className="font-display text-base font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CAPABILITIES — Interactive deep-dive with tabs
      ═══════════════════════════════════════════════════════════════ */}
      <section id="capabilities" className="py-28 bg-[oklch(0.975_0.003_255)] border-y border-border">
        <div className="container">
          <AnimSection>
            <div className="max-w-2xl mb-14">
              <p className="section-label mb-3">Governance Architecture</p>
              <h2 className="heading-xl text-4xl md:text-5xl text-foreground mb-4">
                What makes EKAS different
                <br />
                <span className="text-[oklch(0.55_0.2_255)]">from dashboards and generic AI</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EKAS is not a dashboard, not a generic chatbot, and not a replacement for your ERP, MES, or CMMS. It is the governed decision layer that controls how evidence becomes action — with human approval at every step.
              </p>
            </div>
          </AnimSection>

          <div className="grid lg:grid-cols-12 gap-10 items-start">
            {/* Left: Capability tabs — 5 cols */}
            <div className="lg:col-span-5 space-y-2">
              {capabilities.map((cap, i) => (
                <AnimSection key={cap.id} delay={i * 0.08}>
                  <button
                    onClick={() => setActiveTab(i)}
                    className={`w-full text-left p-5 rounded-xl transition-all duration-300 border group ${
                      activeTab === i
                        ? "bg-white border-[oklch(0.55_0.2_255_/_0.2)] shadow-lg shadow-[oklch(0.55_0.2_255_/_0.06)]"
                        : "bg-transparent border-transparent hover:bg-white/80 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${activeTab === i ? "bg-[oklch(0.55_0.2_255)] text-white" : "bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)]"}`}>
                        <cap.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-display text-base font-semibold transition-colors ${activeTab === i ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"}`}>{cap.title}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{cap.subtitle}</p>
                        <AnimatePresence>
                          {activeTab === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-sm text-muted-foreground leading-relaxed mt-3">{cap.desc}</p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                  </button>
                </AnimSection>
              ))}
            </div>

            {/* Right: Detail panel — 7 cols */}
            <AnimSection className="lg:col-span-7">
              <div className="sticky top-28 space-y-6">
                <div className="rounded-2xl overflow-hidden border border-border shadow-xl bg-white ring-1 ring-black/5">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeTab}
                      src={capabilities[activeTab].image}
                      alt={capabilities[activeTab].title}
                      className="w-full"
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.4 }}
                    />
                  </AnimatePresence>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-xl p-6 border border-border shadow-sm"
                  >
                    <h4 className="font-display text-sm font-semibold text-foreground uppercase tracking-wide mb-4">Key Features</h4>
                    <div className="space-y-3">
                      {capabilities[activeTab].features.map((detail, i) => (
                        <div key={i} className="flex items-start gap-3">
                          <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.2_255)] shrink-0 mt-0.5" />
                          <span className="text-sm text-muted-foreground leading-relaxed">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THREE HORIZONS — Framework visualization
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-white">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="section-label mb-3">Decision Workflow</p>
              <h2 className="heading-xl text-4xl md:text-5xl text-foreground mb-5">
                From question to verified
                <br />
                <span className="text-[oklch(0.55_0.2_255)]">operating improvement.</span>
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                EKAS follows a structured decision workflow: frame the question, identify evidence, produce a bounded answer, recommend a next step, and verify the outcome.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                horizon: "01",
                title: "Frame",
                subtitle: "Frame the Question",
                items: ["Identify the operating question", "Define scope and time window", "Map to governed metric definitions", "Determine required data sources", "Set evidence boundaries"],
                color: "oklch(0.55 0.2 255)",
                bgColor: "oklch(0.55 0.2 255 / 0.06)",
              },
              {
                horizon: "02",
                title: "Answer",
                subtitle: "Produce Evidence-Backed Answer",
                items: ["Query structured manufacturing data", "Apply governed metric logic", "State what data supports", "State what data does not support", "Recommend next investigation step"],
                color: "oklch(0.45 0.18 255)",
                bgColor: "oklch(0.45 0.18 255 / 0.06)",
              },
              {
                horizon: "03",
                title: "Verify",
                subtitle: "Confirm the Outcome",
                items: ["Define expected improvement", "Track targeted metric over time", "Compare before and after", "Close the decision loop", "Build institutional knowledge"],
                color: "oklch(0.35 0.15 255)",
                bgColor: "oklch(0.35 0.15 255 / 0.06)",
              },
            ].map((h, i) => (
              <AnimSection key={h.horizon} delay={i * 0.12}>
                <div className="feature-card h-full relative overflow-hidden">
                  <span className="absolute top-4 right-4 font-display text-6xl font-semibold opacity-5">{h.horizon}</span>
                  <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: h.bgColor }}>
                      <span className="text-[10px] font-display font-semibold uppercase tracking-wider" style={{ color: h.color }}>{h.horizon} — {h.title}</span>
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-1">{h.subtitle}</h3>
                    <div className="space-y-2 mt-4">
                      {h.items.map((item) => (
                        <div key={item} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full" style={{ background: h.color }} />
                          <span className="text-sm text-muted-foreground">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          DATA PROVENANCE — Dark section with EvidencePacket
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[oklch(0.13_0.03_255)] relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[400px] h-[400px] bg-[oklch(0.55_0.2_255_/_0.06)] rounded-full blur-[100px]" />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <AnimSection>
              <div className="relative">
                <div className="rounded-2xl overflow-hidden border border-white/10 shadow-2xl ring-1 ring-white/5">
                  <img src={EVIDENCE_PACKET_GOV} alt="Governed EvidencePacket — operational metrics only" className="w-full" />
                </div>
                <div className="absolute -top-4 -right-4 bg-white rounded-xl px-4 py-2.5 shadow-xl border border-gray-100">
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[oklch(0.55_0.2_255)]" />
                    <span className="text-xs font-display font-semibold text-foreground">Audit-Ready</span>
                  </div>
                </div>
              </div>
            </AnimSection>

            <AnimSection delay={0.2}>
              <p className="text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-[oklch(0.65_0.2_255)] mb-4">No-Data Honesty</p>
              <h2 className="heading-xl text-4xl md:text-5xl text-white mb-5">
                Bounded Answers Over Confident Guesses
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-8">
                If the data does not support a conclusion, EKAS says so clearly. A bounded answer with stated limitations is more useful than a confident unsupported one.
              </p>
              <div className="space-y-4">
                {[
                  { icon: Eye, label: "Stated Limitations", desc: "Every answer includes what the data does and does not support" },
                  { icon: Shield, label: "Source Coverage", desc: "Shows which systems contributed data and which did not" },
                  { icon: Lock, label: "Verification Step", desc: "Recommends how to confirm the answer independently" },
                ].map((item) => (
                  <div key={item.label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-[oklch(0.55_0.2_255_/_0.15)] flex items-center justify-center shrink-0">
                      <item.icon className="w-4 h-4 text-[oklch(0.65_0.2_255)]" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.label}</p>
                      <p className="text-xs text-white/50">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA
      ═══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="py-28 bg-white">
        <div className="container">
          <AnimSection>
            <div className="bg-[oklch(0.55_0.2_255)] rounded-3xl p-12 md:p-20 text-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-[80px]" />
              <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/10 rounded-full blur-[60px]" />
              <div className="relative z-10">
                <h2 className="heading-xl text-3xl md:text-5xl text-white mb-6">
                  Request an Executive Platform Review
                </h2>
                <p className="text-white/80 text-lg max-w-xl mx-auto mb-10">
                  Tell us about one operating challenge your team is trying to govern. We will show how EKAS frames the question, identifies the evidence required, and defines how the result should be verified.
                </p>
                <button
                  onClick={openContact}
                  className="inline-flex items-center gap-2 px-10 py-4 bg-white text-[oklch(0.55_0.2_255)] font-display font-semibold text-base rounded-lg hover:bg-white/90 transition-all duration-200 active:scale-[0.97] shadow-xl uppercase tracking-wide cursor-pointer"
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
