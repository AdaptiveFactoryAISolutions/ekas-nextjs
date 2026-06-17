/* ═══════════════════════════════════════════════════════════
   ROI CALCULATOR — /resources/roi-calculator
   Design: Precision Engineering Aesthetic
   Model the payback on your own numbers.
═══════════════════════════════════════════════════════════ */
import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import {
  ArrowRight, Calculator, DollarSign, Clock, TrendingUp,
  Factory, AlertTriangle
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

function InputField({ label, value, onChange, suffix, prefix, min, max, step, help }: {
  label: string; value: number; onChange: (v: number) => void;
  suffix?: string; prefix?: string; min?: number; max?: number; step?: number; help?: string;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-foreground mb-2">{label}</label>
      <div className="relative">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm font-medium">{prefix}</span>
        )}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          min={min}
          max={max}
          step={step || 1}
          className={`w-full px-4 py-3 bg-white border border-border rounded-xl text-foreground font-medium focus:outline-none focus:ring-2 focus:ring-[oklch(0.55_0.2_255_/_0.3)] focus:border-[oklch(0.55_0.2_255)] transition-all ${prefix ? "pl-8" : ""} ${suffix ? "pr-16" : ""}`}
        />
        {suffix && (
          <span className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">{suffix}</span>
        )}
      </div>
      {help && <p className="text-xs text-muted-foreground mt-1.5">{help}</p>}
    </div>
  );
}

export default function ROICalculator() {
  const { open: openContact } = useContactModal();

  // Input state
  const [presses, setPresses] = useState(10);
  const [currentOEE, setCurrentOEE] = useState(65);
  const [downtimeHoursPerWeek, setDowntimeHoursPerWeek] = useState(40);
  const [costPerDowntimeHour, setCostPerDowntimeHour] = useState(500);
  const [scrapRate, setScrapRate] = useState(3);
  const [annualRevenue, setAnnualRevenue] = useState(20);

  // Calculations
  const results = useMemo(() => {
    const annualDowntimeHours = downtimeHoursPerWeek * 50;
    const annualDowntimeCost = annualDowntimeHours * costPerDowntimeHour;

    // Conservative: EKAS helps recover 10-20% of downtime through governed visibility
    const recoveredDowntimePercent = 0.15;
    const recoveredHours = annualDowntimeHours * recoveredDowntimePercent;
    const downtimeSavings = recoveredHours * costPerDowntimeHour;

    // Scrap reduction: governed quality metrics help reduce scrap by 10-15%
    const scrapReductionPercent = 0.12;
    const annualScrapCost = (annualRevenue * 1_000_000) * (scrapRate / 100);
    const scrapSavings = annualScrapCost * scrapReductionPercent;

    // OEE improvement estimate
    const oeeImprovement = currentOEE * 0.05; // 5% relative improvement
    const newOEE = Math.min(currentOEE + oeeImprovement, 95);

    const totalAnnualSavings = downtimeSavings + scrapSavings;

    return {
      annualDowntimeCost,
      recoveredHours: Math.round(recoveredHours),
      downtimeSavings: Math.round(downtimeSavings),
      scrapSavings: Math.round(scrapSavings),
      totalAnnualSavings: Math.round(totalAnnualSavings),
      newOEE: Math.round(newOEE * 10) / 10,
      oeeImprovement: Math.round(oeeImprovement * 10) / 10,
    };
  }, [presses, currentOEE, downtimeHoursPerWeek, costPerDowntimeHour, scrapRate, annualRevenue]);

  const formatCurrency = (n: number) => {
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(0)}K`;
    return `$${n.toLocaleString()}`;
  };

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient noise-overlay relative py-24 md:py-32">
        <div className="container relative z-10 max-w-3xl">
          <AnimSection>
            <Link href="/resources" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Resources
            </Link>
            <span className="section-label mb-4 block">ROI Calculator</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Model the payback{" "}
              <span className="text-[oklch(0.55_0.2_255)]">on your numbers.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Enter your operation's parameters below. The estimates are conservative and based on the governed visibility EKAS provides — not guaranteed outcomes.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_400px] gap-12 max-w-5xl mx-auto">
            {/* Inputs */}
            <AnimSection>
              <div className="space-y-8">
                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <Factory className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                    Your Operation
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Number of presses / machines"
                      value={presses}
                      onChange={setPresses}
                      min={1}
                      max={500}
                      help="Total production assets in scope"
                    />
                    <InputField
                      label="Current OEE"
                      value={currentOEE}
                      onChange={setCurrentOEE}
                      suffix="%"
                      min={10}
                      max={99}
                      help="Overall Equipment Effectiveness"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <Clock className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                    Downtime
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Unplanned downtime"
                      value={downtimeHoursPerWeek}
                      onChange={setDowntimeHoursPerWeek}
                      suffix="hrs/week"
                      min={0}
                      max={500}
                      help="Total across all machines"
                    />
                    <InputField
                      label="Cost per downtime hour"
                      value={costPerDowntimeHour}
                      onChange={setCostPerDowntimeHour}
                      prefix="$"
                      suffix="/hr"
                      min={50}
                      max={10000}
                      step={50}
                      help="Fully loaded cost including labor"
                    />
                  </div>
                </div>

                <div>
                  <h2 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[oklch(0.55_0.2_255)]" />
                    Quality & Revenue
                  </h2>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Current scrap rate"
                      value={scrapRate}
                      onChange={setScrapRate}
                      suffix="%"
                      min={0}
                      max={30}
                      step={0.5}
                      help="As percentage of production"
                    />
                    <InputField
                      label="Annual revenue"
                      value={annualRevenue}
                      onChange={setAnnualRevenue}
                      prefix="$"
                      suffix="M"
                      min={1}
                      max={1000}
                      help="Approximate annual revenue"
                    />
                  </div>
                </div>
              </div>
            </AnimSection>

            {/* Results */}
            <AnimSection delay={0.15}>
              <div className="lg:sticky lg:top-[120px]">
                <div className="bg-[oklch(0.12_0.03_255)] rounded-2xl p-8 text-white">
                  <div className="flex items-center gap-3 mb-8">
                    <Calculator className="w-6 h-6 text-[oklch(0.7_0.15_210)]" />
                    <h3 className="font-display text-lg font-semibold">Estimated Annual Impact</h3>
                  </div>

                  {/* Total */}
                  <div className="mb-8 pb-8 border-b border-white/10">
                    <span className="text-xs font-semibold uppercase tracking-[0.15em] text-white/40 block mb-2">Estimated Total Savings</span>
                    <span className="font-display text-4xl font-semibold text-[oklch(0.7_0.15_210)]">
                      {formatCurrency(results.totalAnnualSavings)}
                    </span>
                    <span className="text-white/40 text-sm ml-2">/ year</span>
                  </div>

                  {/* Breakdown */}
                  <div className="space-y-6 mb-8">
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/60">Downtime recovery</span>
                        <span className="text-sm font-semibold text-white">{formatCurrency(results.downtimeSavings)}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-[oklch(0.7_0.15_210)] rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((results.downtimeSavings / results.totalAnnualSavings) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-xs text-white/40">{results.recoveredHours} hrs</span>
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-white/60">Quality improvement</span>
                        <span className="text-sm font-semibold text-white">{formatCurrency(results.scrapSavings)}</span>
                      </div>
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[oklch(0.55_0.2_255)] rounded-full transition-all duration-500"
                          style={{ width: `${Math.min((results.scrapSavings / results.totalAnnualSavings) * 100, 100)}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-white/10">
                      <span className="text-sm text-white/60">Projected OEE</span>
                      <span className="text-sm font-semibold text-white">{currentOEE}% → {results.newOEE}%</span>
                    </div>
                  </div>

                  {/* Disclaimer */}
                  <div className="flex items-start gap-2.5 p-3 bg-white/5 rounded-lg mb-6">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-white/50 leading-relaxed">
                      These are conservative estimates based on governed visibility improvements. EKAS does not guarantee ROI — you model your own estimate from the evidence.
                    </p>
                  </div>

                  <button onClick={openContact} className="w-full btn-primary justify-center">
                    Discuss Your Numbers <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 bg-secondary/50">
        <div className="container text-center max-w-2xl mx-auto">
          <AnimSection>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              Want to validate these numbers?
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-8">
              A 60-day pilot on your real data will show the actual governed metrics — no estimates needed.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={openContact} className="btn-primary">
                Request a Pilot <ArrowRight className="w-4 h-4" />
              </button>
              <Link href="/technical-overview" className="btn-secondary">
                Read the Technical Overview <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </AnimSection>
        </div>
      </section>
    </div>
  );
}
