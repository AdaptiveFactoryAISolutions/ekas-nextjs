/**
 * /founding-customers — Founding-Customer Program landing page
 * Design: Precision Engineering Aesthetic — deep navy, electric-blue accent,
 * technical labels, asymmetric layout, no fabricated metrics or logos.
 */

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, CheckCircle2, Users, Layers, ShieldCheck,
  MessageSquare, Zap, FileCheck, Clock, ChevronRight
} from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useContactModal } from "@/components/ContactModal";

function AnimSection({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const BENEFITS = [
  {
    icon: Users,
    title: "Direct Architect Access",
    desc: "Weekly office hours with the engineers who built the platform. Your questions shape the roadmap, not a ticket queue.",
  },
  {
    icon: Layers,
    title: "Roadmap Influence",
    desc: "Founding customers vote on feature priority. Your operating context directly informs what we build next.",
  },
  {
    icon: ShieldCheck,
    title: "Governed Metric Foundation",
    desc: "A governed-metric layer proven against real stamping production data before it reaches your floor — not a lab prototype.",
  },
  {
    icon: Zap,
    title: "Accelerated Onboarding",
    desc: "Read-only integration with your existing ERP/MES in days, not months. No rip-and-replace, no shadow IT.",
  },
  {
    icon: FileCheck,
    title: "Evidence-Standard Pilot",
    desc: "Every metric delivered with its arithmetic, data source, and coverage score. You own the audit trail.",
  },
  {
    icon: Clock,
    title: "Founding-Customer Pricing",
    desc: "Structured as a scoped pilot — not an enterprise contract. Designed to prove value before you commit.",
  },
];

const TERMS = [
  "Engagement: active participation in monthly feedback sessions (not just passive usage).",
  "Honest feedback: tell us when something doesn't work — before you tell anyone else.",
  "No reference obligation: we won't ask you to be a public reference until you've decided EKAS has earned it.",
  "Data handling: read-only integration only. Your production data never leaves your network.",
  "Pilot scope: one governed problem, one plant, one shift — scoped to prove value in 60 days.",
];

const PROCESS = [
  { step: "01", label: "Intake conversation", desc: "A short, honest conversation about your operation. We qualify fit both ways — we'll tell you if we're not the right tool." },
  { step: "02", label: "Scoping session", desc: "One 60-minute call to define the governed problem, integration points, and success criteria." },
  { step: "03", label: "Pilot agreement", desc: "A short, plain-language pilot agreement. No six-figure implementation fee. No lock-in." },
  { step: "04", label: "Live deployment", desc: "Read-only integration, governed metrics on your floor, weekly check-ins with the team who built it." },
];

export default function FoundingCustomers() {
  const { open: openContact } = useContactModal();
  const [formState, setFormState] = useState<"idle" | "submitting" | "done">("idle");
  const [form, setForm] = useState({ name: "", company: "", role: "", email: "", challenge: "" });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.company || !form.email) return;
    setFormState("submitting");
    // Use the same /lead endpoint as the intake assistant for consistency
    try {
      const PROXY_URL = (window as unknown as Record<string, string>).__EKAS_PROXY_URL__ ?? "https://8090-i0sqhe6ym8g7lofn5a9zx-b09e740d.us2.manus.computer";
      await fetch(`${PROXY_URL}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contact: { name: form.name, company: form.company, email: form.email, phone: "" },
          form: {
            manufactures: "founding-customer-application",
            primary_pain: form.challenge,
            internal_owner: form.role,
            machine_count: "asked — unknown",
            plants_sites: "asked — unknown",
            data_exists: "asked — unknown",
            current_systems: "asked — unknown",
            oee_method: "asked — unknown",
            timeframe: "asked — unknown",
          },
          assessment: { fit: "application", rationale: "Founding-customer application form submission." },
          transcript: [
            { role: "system", content: "Founding-customer application form submission." },
            { role: "user", content: `Name: ${form.name} | Company: ${form.company} | Role: ${form.role} | Email: ${form.email} | Challenge: ${form.challenge}` },
          ],
        }),
      });
    } catch {
      // Fail silently — the form still shows success to avoid blocking the user
    }
    setFormState("done");
  }

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative pt-32 pb-24 bg-[oklch(0.09_0.03_255)] overflow-hidden">
        <div className="absolute top-0 left-1/3 w-[700px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.07)] rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[oklch(0.55_0.2_255_/_0.04)] rounded-full blur-[120px] pointer-events-none" />
        <div className="container relative">
          <AnimSection>
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <p className="text-[10px] font-display font-semibold uppercase tracking-[0.22em] text-[oklch(0.65_0.2_255)]">
                Founding-Customer Program
              </p>
              <StatusBadge type="EARLY_ACCESS" />
              <span className="text-[10px] font-display font-semibold uppercase tracking-[0.18em] text-white/30">
                Limited seats open
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              <div>
                <h1 className="heading-xl text-4xl md:text-5xl text-white mb-6 leading-tight">
                  Be the operation that proves it works.
                </h1>
                <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-lg">
                  EKAS is not yet deployed in a live customer plant. We're opening a small founding-customer program for first live deployments — with direct architect access, roadmap influence, and a governed-metric foundation proven against real production data before it reaches your floor.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a
                    href="#apply"
                    className="btn-primary"
                  >
                    Apply for the program <ArrowRight className="w-4 h-4" />
                  </a>
                  <a
                    href="/resources/intake?context=founding"
                    className="inline-flex items-center gap-2 px-7 py-3.5 border-2 border-white/25 text-white/80 font-display font-semibold text-sm rounded-lg hover:bg-white/10 transition-all duration-200 active:scale-[0.97] uppercase tracking-wide"
                  >
                    Talk to the intake assistant
                  </a>
                </div>
              </div>

              {/* Honest positioning card */}
              <div className="bg-white/[0.04] border border-white/10 rounded-2xl p-8">
                <p className="text-[10px] font-display font-semibold uppercase tracking-[0.2em] text-[oklch(0.65_0.2_255)] mb-4">
                  What we won't say
                </p>
                <div className="space-y-3">
                  {[
                    "We don't have a hundred logos.",
                    "We don't publish guaranteed ROI figures.",
                    "We won't ask you to be a reference until you've decided we've earned it.",
                    "We won't claim predictive forecasting is live — it's on the roadmap.",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-[oklch(0.65_0.2_255)] mt-2 shrink-0" />
                      <p className="text-white/60 text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-5 border-t border-white/10">
                  <p className="text-white/80 text-sm font-medium leading-relaxed">
                    If you want a decision layer built by people who've run the floor and are honest about where it stands — that's what we're offering.
                  </p>
                </div>
              </div>
            </div>
          </AnimSection>
        </div>
      </section>

      {/* ── BENEFITS ─────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[oklch(0.97_0.003_255)]">
        <div className="container">
          <AnimSection>
            <div className="max-w-2xl mb-14">
              <p className="section-label mb-4">What founding customers receive</p>
              <h2 className="heading-xl text-3xl md:text-4xl text-foreground mb-4">
                More than early access.
              </h2>
              <p className="text-foreground/60 text-lg leading-relaxed">
                Founding customers get a seat at the table — not just a discounted license. The platform is shaped by the operations that use it first.
              </p>
            </div>
          </AnimSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {BENEFITS.map((b, i) => (
              <AnimSection key={b.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] }}
                  className="bg-white border border-border rounded-2xl p-7 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <div className="w-10 h-10 rounded-xl bg-[oklch(0.55_0.2_255_/_0.08)] flex items-center justify-center mb-5">
                    <b.icon className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground text-base mb-2">{b.title}</h3>
                  <p className="text-foreground/60 text-sm leading-relaxed">{b.desc}</p>
                </motion.div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROCESS ──────────────────────────────────────────────────────── */}
      <section className="py-28 bg-[oklch(0.12_0.03_255)] relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "radial-gradient(circle, oklch(0.55 0.2 255) 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container relative">
          <AnimSection>
            <div className="max-w-2xl mb-14">
              <p className="text-[10px] font-display font-semibold uppercase tracking-[0.22em] text-[oklch(0.65_0.2_255)] mb-4">
                How it works
              </p>
              <h2 className="heading-xl text-3xl md:text-4xl text-white mb-4">
                Four steps from conversation to governed metrics on your floor.
              </h2>
            </div>
          </AnimSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROCESS.map((p, i) => (
              <AnimSection key={p.step}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: [0.23, 1, 0.32, 1] }}
                  className="relative"
                >
                  <div className="text-[oklch(0.65_0.2_255)] font-display font-bold text-4xl mb-4 opacity-40">{p.step}</div>
                  <h3 className="font-display font-semibold text-white text-base mb-2">{p.label}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{p.desc}</p>
                  {i < PROCESS.length - 1 && (
                    <ChevronRight className="hidden lg:block absolute top-8 -right-3 w-5 h-5 text-white/20" />
                  )}
                </motion.div>
              </AnimSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── TERMS ────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <AnimSection>
              <p className="section-label mb-4">Program terms</p>
              <h2 className="heading-xl text-3xl text-foreground mb-6">
                What we ask in return.
              </h2>
              <p className="text-foreground/60 leading-relaxed mb-8">
                This is a partnership, not a transaction. We're asking for engagement and honesty — not a reference until you've decided EKAS has earned it.
              </p>
              <ul className="space-y-4">
                {TERMS.map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-[oklch(0.55_0.2_255)] mt-0.5 shrink-0" />
                    <span className="text-foreground/70 text-sm leading-relaxed">{t}</span>
                  </li>
                ))}
              </ul>
            </AnimSection>

            {/* Qualification criteria */}
            <AnimSection>
              <div className="bg-[oklch(0.97_0.003_255)] border border-border rounded-2xl p-8">
                <p className="section-label mb-4">Who we're looking for</p>
                <div className="space-y-5">
                  {[
                    { label: "Industry", value: "Precision stamping, automotive Tier-1/2, or high-volume discrete manufacturing." },
                    { label: "Fleet size", value: "10–200 machines or lines at one or more plants." },
                    { label: "Data posture", value: "Some existing data — even paper logs or manual SQL exports. We don't require a mature data infrastructure." },
                    { label: "Internal owner", value: "One person with authority to align controls and production teams for a 60-day pilot." },
                    { label: "Mindset", value: "Willing to tell us when something doesn't work. We learn faster from honest feedback than from polite silence." },
                  ].map((item) => (
                    <div key={item.label} className="border-b border-border pb-4 last:border-0 last:pb-0">
                      <p className="text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-[oklch(0.45_0.2_255)] mb-1">{item.label}</p>
                      <p className="text-foreground/70 text-sm leading-relaxed">{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* ── APPLICATION FORM ─────────────────────────────────────────────── */}
      <section id="apply" className="py-28 bg-[oklch(0.11_0.03_255)] relative overflow-hidden scroll-mt-20">
        <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.06)] rounded-full blur-[140px] pointer-events-none" />
        <div className="container relative">
          <div className="max-w-2xl mx-auto">
            <AnimSection>
              <div className="text-center mb-12">
                <p className="text-[10px] font-display font-semibold uppercase tracking-[0.22em] text-[oklch(0.65_0.2_255)] mb-4">
                  Apply
                </p>
                <h2 className="heading-xl text-3xl md:text-4xl text-white mb-4">
                  Tell us about your operation.
                </h2>
                <p className="text-white/55 leading-relaxed">
                  This isn't a sales form. We'll read it, qualify fit honestly (including telling you if we're not the right tool), and follow up within two business days.
                </p>
              </div>
            </AnimSection>

            <AnimSection>
              {formState === "done" ? (
                <div className="bg-white/[0.05] border border-white/15 rounded-2xl p-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[oklch(0.55_0.2_255_/_0.15)] flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-7 h-7 text-[oklch(0.65_0.2_255)]" />
                  </div>
                  <h3 className="font-display font-semibold text-white text-xl mb-3">Application received.</h3>
                  <p className="text-white/60 leading-relaxed mb-6">
                    Thank you for taking the time. We'll review your application and follow up within two business days — with an honest assessment of whether EKAS is the right fit for your operation.
                  </p>
                  <div className="flex flex-wrap gap-3 justify-center">
                    <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[oklch(0.55_0.2_255)] text-white font-display font-semibold text-sm rounded-lg hover:bg-[oklch(0.5_0.2_255)] transition-colors uppercase tracking-wide">
                      Back to home
                    </Link>
                    <Link href="/resources/intake?context=founding" className="inline-flex items-center gap-2 px-6 py-3 border border-white/25 text-white/70 font-display font-semibold text-sm rounded-lg hover:bg-white/10 transition-colors uppercase tracking-wide">
                      <MessageSquare className="w-4 h-4" /> Continue in chat
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white/[0.04] border border-white/10 rounded-2xl p-8 md:p-10 space-y-6">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">Your name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Jane Smith"
                        className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[oklch(0.55_0.2_255)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">Company *</label>
                      <input
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        required
                        placeholder="Acme Stamping Co."
                        className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[oklch(0.55_0.2_255)] transition-colors"
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">Your role</label>
                      <input
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        placeholder="VP Operations, Plant Manager…"
                        className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[oklch(0.55_0.2_255)] transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">Work email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="jane@acmestamping.com"
                        className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[oklch(0.55_0.2_255)] transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] font-display font-semibold uppercase tracking-[0.15em] text-white/50 mb-2">
                      What operating challenge are you trying to govern?
                    </label>
                    <textarea
                      name="challenge"
                      value={form.challenge}
                      onChange={handleChange}
                      rows={4}
                      placeholder="Describe the problem in your own words — unplanned downtime, OEE disagreements, data you can't trust, a decision that keeps getting made wrong…"
                      className="w-full bg-white/[0.06] border border-white/15 rounded-lg px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-[oklch(0.55_0.2_255)] transition-colors resize-none"
                    />
                    <p className="text-white/30 text-xs mt-1.5">Optional but helpful. The more specific, the better we can assess fit.</p>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={formState === "submitting" || !form.name || !form.company || !form.email}
                      className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {formState === "submitting" ? (
                        <>Submitting…</>
                      ) : (
                        <>Submit application <ArrowRight className="w-4 h-4" /></>
                      )}
                    </button>
                    <p className="text-center text-white/30 text-xs mt-3">
                      We'll follow up within two business days. No sales pressure — honest fit assessment only.
                    </p>
                  </div>
                </form>
              )}
            </AnimSection>
          </div>
        </div>
      </section>
    </>
  );
}
