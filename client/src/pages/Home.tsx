import { useRef, useState, useEffect, useMemo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Shield, Database, Brain, AlertTriangle,
  CheckCircle2, BarChart3, Clock, Zap, FileCheck, Play,
  ChevronRight, Layers, Lock, X, Search, Users, Activity
} from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import JsonLd from "@/components/JsonLd";

/* ─── Image Assets (each used ONCE) ─── */
const VIDEO_BG = "/manus-storage/precision-manufacturing_bd9fc972.mp4";
const DASHBOARD_MOCKUP = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-dashboard-mockup-5VjjBaD9F4gzh3mELmqDKS.webp";
const FACTORY_ILLUSTRATION = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-factory-illustration-YsJny7daCJ3aJbB7sMSD38.webp";
const CONNECTIVITY_DIAGRAM = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-connectivity-diagram-NjyD7RgUwThb2AhRdvnBQN.webp";
const METAL_STAMPING_HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/metal-stamping-hero-YTWTyts4WuNBxHzRLfWJTr.webp";

/* New governance-compliant images */
const EVIDENCE_PACKET_GOV = "/manus-storage/evidence-packet-governed_1e93765f.png";
const CLARIFICATION_UI = "/manus-storage/ekas-clarification-ui_3ab6239e.png";
const DEGRADED_CARD = "/manus-storage/ekas-degraded-card_9232cfce.png";
const ACTION_DRAFT = "/manus-storage/ekas-action-draft_3a8fc83e.png";
const ROLE_ANSWERS = "/manus-storage/ekas-role-answers_183ba462.png";

/* ─── Utility Components ─── */
function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function CountUp({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [isInView, target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

function VideoModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="video-modal-overlay"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            className="video-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            {/* EKAS Master Explainer Video */}
            <video autoPlay controls className="w-full aspect-video bg-black" src="/manus-storage/EKASMasterExplainer-ProductionScript_1080p_caption_b4739b59.mp4" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── Workflow Steps (each with a UNIQUE image) ─── */
const solutions = [
  {
    num: "01",
    title: "Frame the Question",
    desc: "Every governed decision starts with a well-framed question. EKAS defines the scope, time window, metric definitions, and evidence requirements before any analysis begins. When scope is ambiguous, the system asks clarifying questions instead of guessing.",
    icon: Search,
    image: CLARIFICATION_UI,
    cta: "Explore Question Framing",
  },
  {
    num: "02",
    title: "Gather Evidence",
    desc: "EKAS connects to structured manufacturing data from ERP, MES, CMMS, QMS, historians, and machine sources. Every data point is traced to its origin with stated coverage and gaps. Coverage below 80% is flagged amber.",
    icon: Database,
    image: EVIDENCE_PACKET_GOV,
    cta: "See Evidence Standards",
  },
  {
    num: "03",
    title: "Deliver Governed Answer",
    desc: "Every answer includes time window, ISA-95 scope, metric path, source coverage, and limitations. If data is incomplete, EKAS discloses the gap with a specific reason code from a fixed set of 22 — never a generic 'no data available.'",
    icon: FileCheck,
    image: DEGRADED_CARD,
    cta: "View Answer Standards",
  },
  {
    num: "04",
    title: "Role-Specific Recommendations",
    desc: "Five canonical roles — engineer, supervisor, maintenance, quality, and executive — each receive recommendations framed for their decision authority, risk tolerance, and operational context. Each persona has its own scope and visual accent.",
    icon: Users,
    image: ROLE_ANSWERS,
    cta: "View Role Workflows",
  },
  {
    num: "05",
    title: "Human-Approved Action",
    desc: "EKAS does not take autonomous action. Every recommendation requires human review, approval, and assignment before it becomes an operational decision. Action drafts carry a 'HUMAN APPROVAL REQUIRED' gate. Actions are tracked from assignment through completion.",
    icon: Lock,
    image: ACTION_DRAFT,
    cta: "Explore Action Governance",
  },
  {
    num: "06",
    title: "Verify Improvement",
    desc: "Did the action taken actually improve the targeted metric? EKAS governs the verification step — comparing before and after with controlled calculation logic over a governed time window. Outcomes are recorded and then verified, not fire-and-forget.",
    icon: Shield,
    image: DASHBOARD_MOCKUP,
    cta: "See Verification Workflows",
  },
];

export default function Home() {
  const [activeSolution, setActiveSolution] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const { open: openContact } = useContactModal();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSolution((prev) => (prev + 1) % solutions.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const productJsonLd = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "EKAS",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Cloud",
    "description": "EKAS is a governed manufacturing decision-intelligence platform that converts operational evidence into role-specific decisions, human-approved action workflows, and verified improvement.",
    "url": "https://adaptivefactory.ai",
    "provider": {
      "@type": "Organization",
      "name": "Adaptive Factory",
      "url": "https://adaptivefactory.ai"
    },
    "featureList": [
      "Governed OEE & metric definitions",
      "Role-specific decision intelligence",
      "Evidence provenance and audit trails",
      "Human-approved action workflows",
      "SAP, Epicor, Plex, QAD integration"
    ]
  }), []);

  return (
    <>
      <JsonLd data={productJsonLd} />
      <VideoModal isOpen={videoOpen} onClose={() => setVideoOpen(false)} />

      {/* ═══════════════════════════════════════════════════════════════
          HERO — Full viewport video with overlapping dashboard
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative min-h-[100vh] flex items-center overflow-hidden">
        {/* Video Background — reduced overlay so video is visible */}
        <div className="absolute inset-0">
          <video
            autoPlay loop muted playsInline
            className="w-full h-full object-cover scale-105"
            poster={METAL_STAMPING_HERO}
          >
            <source src={VIDEO_BG} type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-[oklch(0.08_0.03_255_/_0.92)] via-[oklch(0.08_0.03_255_/_0.7)] to-[oklch(0.08_0.03_255_/_0.4)]" />
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")" }} />
        </div>

        {/* Animated gradient orbs */}
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 right-1/3 w-[600px] h-[600px] bg-[oklch(0.55_0.2_255_/_0.1)] rounded-full blur-[150px]"
        />

        <div className="relative container py-32 z-10">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Left: Copy — 5 columns */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="lg:col-span-5"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.06] border border-white/[0.08] backdrop-blur-sm mb-8"
              >
                <div className="w-2 h-2 rounded-full bg-[oklch(0.65_0.2_255)] animate-pulse" />
                <span className="text-xs font-semibold text-white/70 tracking-wide">Enterprise Knowledge & Analytics System</span>
              </motion.div>

              <h1 className="font-display text-[3.2rem] md:text-[4rem] lg:text-[5rem] font-semibold text-white mb-8 leading-[0.92] tracking-tight">
                Governed{" "}
                <span className="text-gradient-animated">Manufacturing</span>
                <br />Decision
                <br />Intelligence.
              </h1>
              <p className="text-lg md:text-xl text-white/70 leading-relaxed mb-12 max-w-lg">
                EKAS helps enterprise manufacturers convert operational data into evidence-backed decisions, role-specific recommendations, human-approved action workflows, and verified improvement across sites, roles, and critical manufacturing metrics.
              </p>
              <p className="text-sm text-white/60 leading-relaxed mb-12 max-w-lg border-l-2 border-[oklch(0.55_0.2_255_/_0.4)] pl-4">
                <strong className="text-white/80">Governed</strong> means every metric has one controlled definition, every answer carries its evidence and limits, and every recommended action waits for human approval.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#cta" className="btn-primary">
                  Request an Executive Platform Review <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/platform">
                  <span className="inline-flex items-center gap-2 px-7 py-4 border-2 border-white/30 text-white font-display font-semibold text-sm rounded-lg hover:bg-white/[0.08] hover:border-white/50 transition-all duration-200 active:scale-[0.97] tracking-wide">
                    See the Evidence-to-Action Workflow
                  </span>
                </Link>
              </div>
            </motion.div>

            {/* Right: Dashboard screenshot — 7 columns */}
            <motion.div
              initial={{ opacity: 0, y: 80, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4, ease: [0.23, 1, 0.32, 1] }}
              className="hidden lg:block lg:col-span-7"
            >
              <div className="relative">
                <div className="dashboard-frame shadow-2xl shadow-[oklch(0.55_0.2_255_/_0.2)] animate-pulse-glow">
                  <img src={DASHBOARD_MOCKUP} alt="EKAS Governed Decision Dashboard" className="w-full rounded-xl" />
                </div>

                {/* Floating metric card — agnostic demo data per REF-001 */}
                <motion.div
                  initial={{ opacity: 0, y: 30, scale: 0.85 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 1.4, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute -bottom-10 -left-6 bg-white rounded-2xl p-5 shadow-2xl shadow-black/15 border border-gray-100/80"
                >
                  <p className="text-[9px] font-display font-semibold text-gray-400 tracking-wider mb-0.5">PRESS-014 · A-Shift · Last 24h</p>
                  <p className="text-4xl font-display font-semibold text-[oklch(0.55_0.2_255)] leading-none">87.2%</p>
                  <p className="text-[10px] text-gray-500 font-medium mt-1">OEE · Ratio-of-Sums</p>
                  <div className="flex items-center gap-1 mt-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    <span className="text-[10px] text-green-600 font-bold">Coverage 94%</span>
                  </div>
                </motion.div>

                {/* Floating alert card — agnostic machine naming */}
                <motion.div
                  initial={{ opacity: 0, x: 30, scale: 0.85 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ delay: 1.7, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
                  className="absolute -top-6 -right-6 bg-white rounded-xl p-4 shadow-xl shadow-black/10 border border-gray-100 max-w-[230px]"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-amber-500 animate-pulse" />
                    <span className="text-[10px] font-display font-semibold text-amber-600 tracking-wider">Coverage Warning</span>
                  </div>
                  <p className="text-[12px] text-gray-700 leading-snug font-medium">MILL-003 data coverage 72% — below 80% threshold</p>
                  <p className="text-[10px] text-gray-400 mt-1.5">Reason: INSUFFICIENT_COVERAGE</p>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Trust bar at bottom */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2, duration: 0.6 }}
          className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-[oklch(0.08_0.03_255_/_0.9)] via-[oklch(0.12_0.04_255_/_0.85)] to-[oklch(0.08_0.03_255_/_0.9)] backdrop-blur-xl border-t border-white/[0.08] py-6"
        >
          <div className="container">
            <div className="flex items-center justify-center gap-8 md:gap-14 flex-wrap">
              {["Governed Metrics", "Evidence-Backed", "Role-Specific", "Human-Approved", "Verified Outcomes"].map((item, i) => (
                <motion.span
                  key={item}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.2 + i * 0.1 }}
                  className="font-display text-[11px] font-semibold text-white/50 tracking-[0.15em] uppercase flex items-center gap-2.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.2_255_/_0.6)]" />
                  {item}
                </motion.span>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          VALUE PROPOSITION — What EKAS Is (with factory illustration)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-gradient-to-b from-[oklch(0.97_0.003_255)] to-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />

        <div className="container relative">
          <AnimSection>
            <div className="text-center max-w-4xl mx-auto mb-20">
              <p className="section-label mb-5">Executive Positioning</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-foreground mb-7 tracking-tight leading-[1.1]">
                The Decision Layer Between
                <br />
                <span className="text-gradient">Manufacturing Data and Operational Action</span>
              </h2>
              <p className="text-lg text-foreground/65 leading-relaxed max-w-2xl mx-auto">
                Enterprise manufacturers do not need another disconnected dashboard or generic AI assistant. They need a governed way to turn complex plant data into trusted decisions, accountable actions, and verified improvement. EKAS sits above and alongside existing manufacturing systems — SAP, Epicor, Plex, QAD, and other MES, ERP, historian, CMMS, and QMS environments — without replacing them as systems of record.
              </p>
            </div>
          </AnimSection>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <div className="relative">
                <div className="dashboard-frame shadow-2xl shadow-black/8">
                  <img src={FACTORY_ILLUSTRATION} alt="Connected factory with EKAS governance layer" className="w-full rounded-xl" />
                </div>
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-[oklch(0.55_0.2_255)] to-[oklch(0.45_0.2_255)] text-white rounded-xl px-6 py-4 shadow-xl shadow-[oklch(0.55_0.2_255_/_0.3)]"
                >
                  <p className="text-[10px] font-display font-semibold uppercase tracking-wider opacity-80">Governed Workflow</p>
                  <p className="text-xl font-display font-semibold">Frame → Verify</p>
                </motion.div>
              </div>
            </AnimSection>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {[
                { icon: Database, label: "Govern", title: "Governed Metric Truth", desc: "Manufacturing metrics require controlled definitions, calculation paths, and evidence rules. OEE/APQ are always ratio-of-sums, never average-of-averages, at every scope and window." },
                { icon: Shield, label: "Evidence", title: "Evidence Before Answers", desc: "Claims must be backed by evidence or clearly marked as limited. Every answer shows time window, ISA-95 scope, source coverage, and a provenance trail." },
                { icon: Users, label: "Roles", title: "Five Canonical Roles", desc: "Engineer, supervisor, maintenance, quality, and executive — each receives recommendations framed for their decision authority, risk tolerance, and operational context." },
                { icon: Brain, label: "Honesty", title: "No-Data Honesty", desc: "If the evidence is incomplete, EKAS discloses the limitation with a specific reason code from a fixed set of 22 — never a generic 'no data available.'" },
              ].map((card, i) => (
                <AnimSection key={card.label} delay={i * 0.12}>
                  <div className="feature-card h-full group">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[oklch(0.55_0.2_255_/_0.15)] to-[oklch(0.55_0.2_255_/_0.05)] flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                      <card.icon className="w-6 h-6 text-[oklch(0.55_0.2_255)]" />
                    </div>
                    <p className="section-label mb-2">{card.label}</p>
                    <h3 className="font-display text-base font-semibold text-foreground mb-3 tracking-tight">{card.title}</h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">{card.desc}</p>
                  </div>
                </AnimSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SIX-STEP WORKFLOW — Numbered accordion with UNIQUE screenshots
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.03)] rounded-full blur-[120px]" />

        <div className="container relative">
          <AnimSection>
            <div className="max-w-2xl mb-16">
              <p className="section-label mb-4">Core Capabilities</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-foreground mb-5 tracking-tight leading-[1.1]">
                Six-Step Governed
                <br />
                <span className="text-gradient">Decision Workflow</span>
              </h2>
              <p className="text-lg text-foreground/60 leading-relaxed">
                EKAS follows a governed decision workflow: Frame → Evidence → Answer → Recommend → Act → Verify. Every step is bounded by evidence rules, role context, and operational accountability.
              </p>
            </div>
          </AnimSection>

          <div className="grid lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-5 space-y-3">
              {solutions.map((s, i) => (
                <AnimSection key={s.num} delay={i * 0.08}>
                  <button
                    onClick={() => setActiveSolution(i)}
                    className={`w-full text-left p-6 rounded-xl transition-all duration-300 border group ${
                      activeSolution === i
                        ? "bg-white border-[oklch(0.55_0.2_255_/_0.2)] shadow-xl shadow-[oklch(0.55_0.2_255_/_0.08)]"
                        : "bg-transparent border-transparent hover:bg-white/80 hover:border-border"
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <span className={`font-display text-4xl font-semibold transition-colors duration-300 ${activeSolution === i ? "text-[oklch(0.55_0.2_255)]" : "text-gray-200 group-hover:text-gray-300"}`}>{s.num}</span>
                      <div className="flex-1">
                        <h3 className={`font-display text-base font-semibold tracking-tight transition-colors duration-300 ${activeSolution === i ? "text-foreground" : "text-foreground/60 group-hover:text-foreground"}`}>{s.title}</h3>
                        <AnimatePresence>
                          {activeSolution === i && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              <p className="text-sm text-foreground/55 leading-relaxed mt-3 mb-4">{s.desc}</p>
                              <Link href="/platform">
                                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-[oklch(0.55_0.2_255)] hover:underline">
                                  {s.cta} <ChevronRight className="w-3.5 h-3.5" />
                                </span>
                              </Link>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>
                    {activeSolution === i && (
                      <motion.div
                        className="mt-4 h-0.5 bg-gray-100 rounded-full overflow-hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <motion.div
                          className="h-full bg-[oklch(0.55_0.2_255)]"
                          initial={{ width: "0%" }}
                          animate={{ width: "100%" }}
                          transition={{ duration: 6, ease: "linear" }}
                          key={`progress-${activeSolution}`}
                        />
                      </motion.div>
                    )}
                  </button>
                </AnimSection>
              ))}
              <AnimSection delay={0.4}>
                <Link href="/platform">
                  <span className="inline-flex items-center gap-2 mt-4 ml-6 text-sm font-semibold text-[oklch(0.55_0.2_255)] hover:underline tracking-wide">
                    Explore the Full Platform <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              </AnimSection>
            </div>

            <AnimSection className="lg:col-span-7">
              <div className="sticky top-28">
                <div className="dashboard-frame shadow-2xl shadow-black/8 bg-white">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeSolution}
                      src={solutions[activeSolution].image}
                      alt={solutions[activeSolution].title}
                      className="w-full rounded-xl"
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.4 }}
                    />
                  </AnimatePresence>
                </div>
                <div className="flex gap-2 mt-6 justify-center">
                  {solutions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveSolution(i)}
                      className={`h-2 rounded-full transition-all duration-300 ${activeSolution === i ? "w-10 bg-[oklch(0.55_0.2_255)]" : "w-3 bg-gray-200 hover:bg-gray-300"}`}
                    />
                  ))}
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          SOCIAL PROOF — Split screen blue + video
      ═══════════════════════════════════════════════════════════════ */}
      <section className="overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[600px]">
          <div className="flex items-center p-12 lg:p-20 bg-gradient-to-br from-[oklch(0.55_0.2_255)] to-[oklch(0.42_0.2_255)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/[0.04] rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-white/[0.04] rounded-full translate-y-1/2 -translate-x-1/2" />

            <AnimSection className="relative z-10">
              <blockquote>
                <svg className="w-12 h-12 text-white/20 mb-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <p className="font-display text-2xl md:text-3xl lg:text-[2.2rem] font-semibold text-white leading-[1.25] mb-10">
                  The differentiator between AI value capture and AI investment waste is not the model. It is the discipline of governing decisions, evidence, and accountability as an operational system.
                </p>
                <footer className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="font-display font-semibold text-white text-sm">BCG</span>
                  </div>
                  <div>
                    <p className="font-display font-semibold text-white text-sm">BCG Build for the Future 2025</p>
                    <p className="text-white/50 text-sm mt-0.5">n = 1,250 senior executives</p>
                  </div>
                </footer>
              </blockquote>
            </AnimSection>
          </div>

          <div className="relative min-h-[400px] lg:min-h-0">
            <img src={METAL_STAMPING_HERO} alt="Precision manufacturing" className="w-full h-full object-cover absolute inset-0" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10 flex flex-col items-center justify-center gap-5">
              <button
                onClick={() => setVideoOpen(true)}
                className="group relative w-24 h-24 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center hover:bg-white/25 transition-all duration-300 hover:scale-110"
              >
                <div className="absolute inset-0 rounded-full border-2 border-white/20 animate-ping opacity-30" />
                <Play className="w-10 h-10 text-white fill-white ml-1" />
              </button>
              <p className="font-display text-sm font-semibold text-white/80 tracking-wide">Watch How It Works</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          THREE CORE PROBLEMS — Alternating background
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-36 bg-gradient-to-b from-white via-[oklch(0.97_0.003_255)] to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[oklch(0.55_0.2_255_/_0.04)] rounded-full blur-[120px]" />

        <div className="container relative">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-20">
              <p className="section-label mb-5">The Manufacturing Decision Gap</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-foreground mb-7 tracking-tight leading-[1.1]">
                Data Exists. Decisions Stall.
                <br />
                <span className="text-gradient">The governance layer is missing.</span>
              </h2>
              <p className="text-lg text-foreground/60 leading-relaxed max-w-2xl mx-auto">
                Enterprise manufacturers collect data across ERP, MES, CMMS, quality systems, historians, and machine sources. The information exists, but it is often fragmented, delayed, disputed, or missing the governed context needed to decide and act.
              </p>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: AlertTriangle, title: "Metrics Without Governance", desc: "Different reports show different versions of OEE, downtime, scrap, throughput, or maintenance performance. Without governed definitions and ratio-of-sums enforcement, meetings become debates about numbers instead of decisions.", num: "01" },
              { icon: Database, title: "Evidence Without Context", desc: "Production, quality, maintenance, and engineering teams work from different systems and assumptions. Recommendations lack the role context and evidence provenance needed to act with confidence.", num: "02" },
              { icon: Brain, title: "AI Without Accountability", desc: "Generic AI can sound confident even when source data is incomplete. Manufacturing decisions require bounded answers with specific reason codes, human approval gates, and verification against operational metrics.", num: "03" },
            ].map((item, i) => (
              <AnimSection key={item.title} delay={i * 0.15}>
                <div className="feature-card h-full relative overflow-hidden group">
                  <span className="absolute top-4 right-4 font-display text-8xl font-semibold text-[oklch(0.55_0.2_255_/_0.04)] group-hover:text-[oklch(0.55_0.2_255_/_0.1)] transition-colors duration-500">{item.num}</span>
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[oklch(0.55_0.2_255_/_0.12)] to-[oklch(0.55_0.2_255_/_0.04)] flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-[oklch(0.55_0.2_255)]" />
                    </div>
                    <h3 className="font-display text-lg font-semibold text-foreground mb-4 tracking-tight">{item.title}</h3>
                    <p className="text-[15px] text-foreground/60 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          TRACEABLE ANSWER — Dark section with governed EvidencePacket
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[oklch(0.12_0.03_255)] relative overflow-hidden noise-overlay">
        <motion.div
          animate={{ x: [0, 20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.07)] rounded-full blur-[120px]"
        />

        <div className="container relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <AnimSection>
              <p className="section-label mb-5" style={{ color: "oklch(0.65 0.2 255)" }}>Evidence Standard</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-semibold text-white mb-7 tracking-tight leading-[1.1]">
                What a Governed EKAS
                <br />
                <span className="text-[oklch(0.65_0.2_255)]">Decision Answer Looks Like</span>
              </h2>
              <p className="text-lg text-white/60 leading-relaxed mb-10">
                A governed manufacturing answer explains what the evidence supports, what it does not support, what limitations exist, and what should be verified next. Root cause remains a hypothesis unless evidence proves it.
              </p>

              {/* Q&A Demo with agnostic data */}
              <div className="bg-[oklch(0.09_0.02_255)] rounded-2xl p-7 border border-white/[0.06] shadow-xl">
                <div className="flex items-start gap-3 mb-5">
                  <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center shrink-0 border border-white/[0.06]">
                    <span className="text-[10px] font-display font-semibold text-white/50">Q</span>
                  </div>
                  <p className="text-sm text-white/70 italic pt-2">"Which workcenter at Millbrook Plant had the most unplanned downtime last week?"</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-full bg-[oklch(0.55_0.2_255_/_0.15)] flex items-center justify-center shrink-0 border border-[oklch(0.55_0.2_255_/_0.2)]">
                    <BarChart3 className="w-4 h-4 text-[oklch(0.65_0.2_255)]" />
                  </div>
                  <div className="bg-[oklch(0.14_0.025_255)] rounded-xl p-5 border border-white/[0.04] flex-1">
                    <p className="text-sm text-white/85 leading-relaxed">
                      <strong className="text-white">Workcenter 7</strong> shows the highest unplanned downtime for the selected period. The largest contributor appears to be hydraulic-related downtime on PRESS-014. This should be treated as a <span className="text-[oklch(0.65_0.2_255)] font-bold">candidate contributor</span>, not a confirmed root cause.
                    </p>
                    <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-white/40 border-t border-white/[0.04] pt-3">
                      <FileCheck className="w-3.5 h-3.5 text-[oklch(0.65_0.2_255)]" />
                      <span className="font-display font-semibold text-[oklch(0.65_0.2_255)] tracking-wider">Evidence</span>
                      <span>• source: reference.fact_production • window: May 19–25 2026 • coverage: 94% • 6,483 rows traced</span>
                    </div>
                    <div className="mt-2 text-xs text-amber-400/70">
                      <span className="font-bold">Limitation:</span> Manual downtime codes not validated against PLC signals. Why 3–5 requires additional evidence.
                    </div>
                  </div>
                </div>
              </div>
            </AnimSection>

            {/* Right: NEW governance-compliant EvidencePacket image */}
            <AnimSection delay={0.2}>
              <div className="relative">
                <div className="dashboard-frame shadow-2xl shadow-[oklch(0.55_0.2_255_/_0.1)]">
                  <img src={EVIDENCE_PACKET_GOV} alt="Governed EvidencePacket — operational metrics only, no financial claims" className="w-full rounded-xl" />
                </div>
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-5 -right-5 bg-white rounded-xl px-5 py-3 shadow-xl border border-gray-100"
                >
                  <div className="flex items-center gap-2">
                    <Lock className="w-4 h-4 text-[oklch(0.55_0.2_255)]" />
                    <span className="text-xs font-display font-semibold text-foreground">Audit-Ready</span>
                  </div>
                </motion.div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          STATS — Operational metrics only (no financial claims)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[oklch(0.985_0.002_255)] relative overflow-hidden">
        <div className="container relative">
          <AnimSection>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
              {[
                { target: 5, suffix: "", prefix: "", label: "Canonical Decision Roles", color: "text-[oklch(0.55_0.2_255)]" },
                { target: 6, suffix: "", prefix: "", label: "Governed Workflow Steps", color: "text-foreground" },
                { target: 22, suffix: "", prefix: "", label: "No-Data Reason Codes", color: "text-[oklch(0.55_0.2_255)]" },
                { target: 0, suffix: "", prefix: "", label: "Unsupported Financial Claims", color: "text-foreground" },
              ].map((stat) => (
                <div key={stat.label} className="group">
                  <div className={`font-display text-6xl md:text-8xl font-semibold ${stat.color} transition-transform duration-300 group-hover:scale-105`}>
                    <CountUp target={stat.target} suffix={stat.suffix} prefix={stat.prefix} />
                  </div>
                  <div className="w-12 h-0.5 bg-[oklch(0.55_0.2_255_/_0.3)] mx-auto mt-4 mb-3 rounded-full" />
                  <p className="text-sm text-foreground/60 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CONNECTIVITY — Integration architecture
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="container">
          <AnimSection>
            <div className="text-center max-w-3xl mx-auto mb-16">
              <p className="section-label mb-4">Integration Architecture</p>
              <h2 className="font-display text-4xl md:text-5xl lg:text-[3.2rem] font-semibold text-foreground mb-6 tracking-tight leading-[1.1]">
                Sits Above Your Existing Systems.
                <br />
                <span className="text-gradient">Does Not Replace Them.</span>
              </h2>
              <p className="text-lg text-foreground/60 leading-relaxed">
                EKAS connects via read-only adapters to SAP, Epicor, Plex, QAD, and other MES, ERP, CMMS, QMS, and historian systems. Those systems remain the systems of record. EKAS does not connect to PLCs or machine controllers and makes no real-time streaming claims — it operates on your systems' production data cycle.
              </p>
            </div>
          </AnimSection>

          <AnimSection delay={0.2}>
            <div className="dashboard-frame shadow-2xl shadow-black/6 bg-white p-8">
              <img src={CONNECTIVITY_DIAGRAM} alt="EKAS integration architecture" className="w-full rounded-xl" />
            </div>
          </AnimSection>

          <AnimSection delay={0.3} className="mt-20">
            <p className="text-center text-xs font-display uppercase tracking-[0.25em] text-foreground/40 mb-10 font-semibold">
              Connects to Your Existing Systems
            </p>
            <div className="overflow-hidden relative py-6">
              <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10" />
              <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10" />
              <div className="flex items-center gap-20 animate-marquee whitespace-nowrap">
                {["SAP", "Epicor", "Plex", "QAD", "MES", "CMMS", "QMS", "Historian", "SAP", "Epicor", "Plex", "QAD", "MES", "CMMS", "QMS", "Historian"].map((brand, i) => (
                  <span key={`${brand}-${i}`} className="font-display text-xl font-semibold text-foreground/15 tracking-wider uppercase hover:text-[oklch(0.55_0.2_255_/_0.6)] transition-colors duration-300">{brand}</span>
                ))}
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          CTA — Final conversion section
      ═══════════════════════════════════════════════════════════════ */}
      <section id="cta" className="py-32 bg-[oklch(0.97_0.003_255)]">
        <div className="container">
          <AnimSection>
            <div className="bg-gradient-to-br from-[oklch(0.12_0.03_255)] to-[oklch(0.06_0.02_255)] rounded-3xl p-12 md:p-24 text-center relative overflow-hidden noise-overlay border border-white/[0.05]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.15)] rounded-full blur-[180px]" />
              <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[oklch(0.45_0.2_280_/_0.08)] rounded-full blur-[120px]" />

              <div className="relative z-10">
                <p className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-[oklch(0.65_0.2_255)] mb-5">Executive Platform Review</p>
                <h2 className="font-display text-4xl md:text-5xl lg:text-[3.5rem] font-semibold text-white mb-8 tracking-tight leading-[1.1]">
                  Request an Executive
                  <br />
                  <span className="text-gradient-animated">Platform Review.</span>
                </h2>
                <p className="text-white/60 text-lg max-w-2xl mx-auto leading-relaxed mb-12">
                  Tell us about one operating challenge your team is trying to govern: OEE loss, downtime attribution, scrap, repeat failures, shift handoff, maintenance recurrence, quality containment, or cross-site metric alignment. We will show how EKAS frames the question, identifies the evidence required, and defines how the result should be verified.
                </p>
                <button onClick={openContact} className="btn-primary text-base px-12 py-6 shadow-2xl shadow-[oklch(0.55_0.2_255_/_0.4)]">
                  Request a Demo <ArrowRight className="w-5 h-5" />
                </button>
                <div className="flex items-center justify-center gap-8 mt-12 flex-wrap">
                  {["Governed decision workflows", "Human-approved actions", "Verified outcomes"].map((item) => (
                    <div key={item} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[oklch(0.65_0.2_255)]" />
                      <span className="text-sm text-white/50">{item}</span>
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
