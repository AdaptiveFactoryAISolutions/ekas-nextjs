/* ═══════════════════════════════════════════════════════════
   ROLES — /roles
   Design: Precision Engineering Aesthetic
   One governed platform. The view your role needs.
═══════════════════════════════════════════════════════════ */
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, HardHat, BarChart3, Wrench, ShieldCheck,
  DollarSign, Briefcase, ChevronRight
} from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-roles-hero-gEcNtKpsE99LLCNNgUiQ5V.webp";

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const roles = [
  {
    id: "plant-managers",
    icon: HardHat,
    title: "Plant Managers",
    color: "oklch(0.55 0.2 255)",
    desc: "Open to your plant's live OEE, the top three downtime reasons this shift, and the single action ranked highest by recovered minutes. Ask, in plain English, \"why was Line 3 down yesterday?\" and get the answer with the records behind it.",
    highlights: ["Live OEE by shift", "Top downtime contributors", "Natural-language questions", "Evidence-backed answers"],
  },
  {
    id: "operations-leaders",
    icon: BarChart3,
    title: "Operations Leaders",
    color: "oklch(0.5 0.18 200)",
    desc: "Compare lines and plants on one governed definition — no more reconciling three versions of OEE. See where the gaps are and the evidence behind each one.",
    highlights: ["Cross-site comparison", "Governed OEE definitions", "Gap analysis", "Evidence provenance"],
  },
  {
    id: "manufacturing-engineering",
    icon: Wrench,
    title: "Manufacturing Engineering",
    color: "oklch(0.55 0.22 150)",
    desc: "Drill from a top-line loss down to the individual events and the production records that produced them. Validate that a metric's definition matches the standard, because the formula is in version control.",
    highlights: ["Event-level drill-down", "Production record tracing", "Versioned metric definitions", "Standard validation"],
  },
  {
    id: "quality-leaders",
    icon: ShieldCheck,
    title: "Quality Leaders",
    color: "oklch(0.55 0.2 30)",
    desc: "Pull an audit-ready, IATF-aligned view of any metric, with its full calculation trail — the answer to \"how was this number produced?\" is built in.",
    highlights: ["IATF 16949 alignment", "Full calculation trail", "Audit-ready views", "Metric provenance"],
  },
  {
    id: "finance-leaders",
    icon: DollarSign,
    title: "Finance Leaders",
    color: "oklch(0.5 0.18 130)",
    desc: "See production losses tied to cost, with no figure that can't be traced back to the production record. Use the ROI calculator to model the payback of acting on a loss.",
    highlights: ["Loss-to-cost mapping", "Traceable figures", "ROI modeling", "Production record linkage"],
  },
  {
    id: "executive-operations",
    icon: Briefcase,
    title: "Executive / PE Operations",
    color: "oklch(0.45 0.2 280)",
    desc: "Track the AI portfolio: what's been verified, what's next, and the quarterly governance cadence — so the AI investment is disciplined, not a pile of point tools.",
    highlights: ["AI portfolio tracking", "Verification status", "Quarterly governance", "Investment discipline"],
  },
];

export default function Roles() {
  const { open: openContact } = useContactModal();
  const [activeRole, setActiveRole] = useState(roles[0].id);

  const scrollToRole = (id: string) => {
    setActiveRole(id);
    const el = document.getElementById(`role-${id}`);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[420px] flex items-end overflow-hidden">
        <img src={HERO_IMG} alt="Manufacturing professionals connected by one platform" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="container relative z-10 pb-16 pt-32">
          <AnimSection>
            <span className="section-label text-[oklch(0.7_0.15_210)] mb-3 block">Roles</span>
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold text-white tracking-tight leading-[1.1] max-w-3xl">
              One governed platform.{" "}
              <span className="text-[oklch(0.7_0.15_210)]">The view your role needs.</span>
            </h1>
            <p className="mt-6 text-lg text-white/70 leading-relaxed max-w-2xl">
              EKAS gives every role the same trusted numbers — presented for the decision that role actually makes. Below is what each person sees and can do.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Role Selector + Detail */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[320px_1fr] gap-8">
            {/* Sidebar nav */}
            <AnimSection>
              <nav className="space-y-1 lg:sticky lg:top-[120px]">
                {roles.map((role) => (
                  <button
                    key={role.id}
                    onClick={() => scrollToRole(role.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-left transition-all duration-200 group ${
                      activeRole === role.id
                        ? "bg-[oklch(0.55_0.2_255_/_0.08)] border border-[oklch(0.55_0.2_255_/_0.2)]"
                        : "hover:bg-secondary border border-transparent"
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                      activeRole === role.id
                        ? "bg-[oklch(0.55_0.2_255)] text-white"
                        : "bg-secondary text-muted-foreground group-hover:bg-[oklch(0.55_0.2_255_/_0.1)] group-hover:text-[oklch(0.55_0.2_255)]"
                    }`}>
                      <role.icon className="w-5 h-5" />
                    </div>
                    <span className={`text-sm font-semibold transition-colors ${
                      activeRole === role.id ? "text-foreground" : "text-muted-foreground group-hover:text-foreground"
                    }`}>
                      {role.title}
                    </span>
                    <ChevronRight className={`w-4 h-4 ml-auto transition-all ${
                      activeRole === role.id ? "text-[oklch(0.55_0.2_255)] opacity-100" : "opacity-0 group-hover:opacity-50"
                    }`} />
                  </button>
                ))}
              </nav>
            </AnimSection>

            {/* Detail panels — all roles rendered in the DOM at load (crawlable + skimmable) */}
            <div className="space-y-8">
              {roles.map((role) => (
                <motion.div
                  id={`role-${role.id}`}
                  key={role.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                  onViewportEnter={() => setActiveRole(role.id)}
                  className={`feature-card !p-8 md:!p-10 scroll-mt-[120px] transition-shadow duration-300 ${
                    activeRole === role.id ? "ring-2 ring-[oklch(0.55_0.2_255_/_0.25)]" : ""
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-2xl flex items-center justify-center" style={{ background: `${role.color}15` }}>
                      <role.icon className="w-7 h-7" style={{ color: role.color }} />
                    </div>
                    <div>
                      <span className="section-label block mb-1">Role View</span>
                      <h2 className="font-display text-2xl font-semibold text-foreground">{role.title}</h2>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-base mb-8">
                    {role.desc}
                  </p>

                  <div className="grid sm:grid-cols-2 gap-3 mb-8">
                    {role.highlights.map((h) => (
                      <div key={h} className="flex items-center gap-2.5 px-4 py-3 bg-secondary/60 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ background: role.color }} />
                        <span className="text-sm font-medium text-foreground">{h}</span>
                      </div>
                    ))}
                  </div>

                  <button onClick={openContact} className="inline-flex items-center gap-2 text-sm font-semibold text-[oklch(0.55_0.2_255)] hover:gap-3 transition-all duration-200">
                    See this view in a demo <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-navy-section py-24 relative">
        <div className="absolute inset-0 noise-overlay" />
        <div className="container relative z-10 text-center max-w-2xl mx-auto">
          <AnimSection>
            <h2 className="font-display text-3xl md:text-4xl font-semibold text-white tracking-tight mb-6">
              See the view built for your role.
            </h2>
            <p className="text-white/60 leading-relaxed mb-10">
              Tell us your role and one operating challenge. We will show you the governed view EKAS delivers for your decision authority.
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
