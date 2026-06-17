/* ═══════════════════════════════════════════════════════════
   ROI CALCULATOR — /resources/roi-calculator
   Design: Precision Engineering Aesthetic
   EKAS Governed Impact Model — a transparent, assumption-driven
   operational savings model. Every dollar shows its arithmetic;
   OEE is DERIVED from downtime recovery (not hardcoded); outputs
   are ranges (conservative/expected/aggressive), not a point estimate.
   Ported from the user-supplied EKASImpactModel and adapted to the
   site design tokens (display font, oklch accent, dark result panel).
═══════════════════════════════════════════════════════════ */
import { useRef, useState, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, AlertTriangle } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import { ToolSummaryActions } from "@/components/ToolPageShell";

/* ---- Assumption bands (the only place "magic numbers" live, and they're visible to the user) ---- */
const SCENARIOS = {
  conservative: {
    label: "Conservative",
    downtimeRecovery: 0.1,
    scrapReduction: 0.15,
    note: "Lower-bound recovery. Use this number in a budget defense.",
  },
  expected: {
    label: "Expected",
    downtimeRecovery: 0.15,
    scrapReduction: 0.25,
    note: "Mid-case based on governed visibility improvements.",
  },
  aggressive: {
    label: "Aggressive",
    downtimeRecovery: 0.22,
    scrapReduction: 0.35,
    note: "Upper-bound. Requires disciplined response to surfaced evidence.",
  },
} as const;

type ScenarioKey = keyof typeof SCENARIOS;

const WEEKS_PER_YEAR = 52;
const SCHEDULED_HRS_PER_MACHINE = 6000;

const fmtUSD = (n: number) => {
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${Math.round(n / 1_000)}K`;
  return `$${Math.round(n).toLocaleString()}`;
};
const fmtUSDFull = (n: number) => `$${Math.round(n).toLocaleString()}`;
const fmtPP = (n: number) => `${n >= 0 ? "+" : ""}${n.toFixed(1)}pp`;

interface Inputs {
  machines: number;
  oee: number;
  downtimeHrsWeek: number;
  costPerHr: number;
  scrapRate: number;
  revenueM: number;
  marginPct: number;
  platformCost: number;
}

function compute(inputs: Inputs, scenario: ScenarioKey) {
  const { machines, oee, downtimeHrsWeek, costPerHr, scrapRate, revenueM, marginPct, platformCost } = inputs;
  const s = SCENARIOS[scenario];

  const revenue = revenueM * 1_000_000;
  const margin = marginPct / 100;

  // --- Downtime recovery ---
  const annualDowntimeHrs = downtimeHrsWeek * WEEKS_PER_YEAR;
  const recoveredHrs = annualDowntimeHrs * s.downtimeRecovery;
  const downtimeSavings = recoveredHrs * costPerHr;

  // --- Quality (flows through MARGIN, not revenue) ---
  const scrapReducedPP = scrapRate * s.scrapReduction;
  const qualitySavings = (scrapReducedPP / 100) * revenue * margin;

  // --- Total ---
  const total = downtimeSavings + qualitySavings;

  // --- Derived OEE lift (reconciles with downtime, not hardcoded) ---
  const totalScheduledHrs = SCHEDULED_HRS_PER_MACHINE * machines;
  const availabilityLift = totalScheduledHrs > 0 ? recoveredHrs / totalScheduledHrs : 0;
  const oeeLiftPP = availabilityLift * oee;
  const projectedOEE = oee + oeeLiftPP;

  // --- Payback (only if platform cost entered) ---
  const payback = platformCost > 0 && total > 0 ? (platformCost / total) * 12 : null; // months

  return {
    annualDowntimeHrs,
    recoveredHrs,
    downtimeSavings,
    scrapReducedPP,
    qualitySavings,
    total,
    oeeLiftPP,
    projectedOEE,
    payback,
    scenarioMeta: s,
  };
}

function AnimSection({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 30 }} animate={isInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ---- Input field adapted to site tokens ---- */
function NumInput({ value, onChange, prefix, suffix, step = 1, min = 0 }: {
  value: number | "";
  onChange: (v: number | "") => void;
  prefix?: string; suffix?: string; step?: number; min?: number;
}) {
  return (
    <div className="relative flex items-center h-11 bg-white border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[oklch(0.55_0.2_255_/_0.3)] focus-within:border-[oklch(0.55_0.2_255)] transition-all">
      {prefix && <span className="pl-3 text-muted-foreground text-sm font-semibold">{prefix}</span>}
      <input
        type="number"
        value={value}
        min={min}
        step={step}
        onChange={(e) => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        onFocus={(e) => e.target.select()}
        className="flex-1 min-w-0 bg-transparent border-none outline-none px-3 text-[15px] font-semibold text-foreground"
      />
      {suffix && <span className="pr-3 text-muted-foreground text-[13px] font-semibold whitespace-nowrap">{suffix}</span>}
    </div>
  );
}

function FieldShell({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-foreground">{label}</label>
      {children}
      {hint && <span className="text-[11.5px] text-muted-foreground">{hint}</span>}
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="section-label mb-3 block">{title}</div>
      <div className="flex flex-col gap-3.5">{children}</div>
    </div>
  );
}

function Grid({ children }: { children: React.ReactNode }) {
  return <div className="grid sm:grid-cols-2 gap-3.5">{children}</div>;
}

function ResultComponent({ label, value, sub, pct, color }: { label: string; value: number; sub: string; pct: number; color: string }) {
  return (
    <div className="mb-3.5">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-[13.5px] text-white/80 font-semibold">{label}</span>
        <span className="text-[15px] font-bold text-white">{fmtUSD(value)}</span>
      </div>
      <div className="h-[5px] bg-white/10 rounded-full overflow-hidden">
        <div className="h-full rounded-full transition-all duration-300" style={{ width: `${Math.max(pct * 100, 2)}%`, background: color }} />
      </div>
      <div className="text-[11px] text-white/40 mt-1">{sub}</div>
    </div>
  );
}

function MathLine({ label, formula, result }: { label: string; formula: string; result: string }) {
  return (
    <div className="flex justify-between gap-3 mb-2 text-[11.5px]">
      <div>
        <div className="text-white/80 font-bold mb-0.5">{label}</div>
        <div className="text-white/40 font-mono text-[10.5px]">{formula}</div>
      </div>
      <div className="text-[oklch(0.7_0.15_210)] font-bold whitespace-nowrap">{result}</div>
    </div>
  );
}

export default function ROICalculator() {
  const { open: openContact } = useContactModal();

  const [inputs, setInputs] = useState<Record<keyof Inputs, number | "">>({
    machines: 10,
    oee: 65,
    downtimeHrsWeek: 40,
    costPerHr: 500,
    scrapRate: 3,
    revenueM: 20,
    marginPct: 20,
    platformCost: 0,
  });
  const [scenario, setScenario] = useState<ScenarioKey>("conservative");
  const [showMath, setShowMath] = useState(false);
  const [showSensitivity, setShowSensitivity] = useState(false);

  const set = (k: keyof Inputs) => (v: number | "") => setInputs((p) => ({ ...p, [k]: v }));

  // Numeric view: empty/invalid fields read as 0 for the math only.
  const n = useMemo(() => {
    const out = {} as Inputs;
    (Object.keys(inputs) as (keyof Inputs)[]).forEach((k) => {
      const val = inputs[k];
      out[k] = val === "" || val == null ? 0 : Number(val);
    });
    return out;
  }, [inputs]);

  const r = useMemo(() => compute(n, scenario), [n, scenario]);

  const range = useMemo(() => {
    const lo = compute(n, "conservative").total;
    const hi = compute(n, "aggressive").total;
    return { lo, hi };
  }, [n]);

  const buildSummary = () => {
    const oeeLine = `${n.oee}% → ${r.projectedOEE.toFixed(1)}% (${fmtPP(r.oeeLiftPP)})`;
    return [
      `EKAS GOVERNED IMPACT MODEL — ESTIMATE SUMMARY`,
      `Generated ${new Date().toLocaleDateString()}`,
      ``,
      `OPERATION`,
      `• Machines in scope: ${n.machines}`,
      `• Current OEE: ${n.oee}%`,
      `• Unplanned downtime: ${n.downtimeHrsWeek} hrs/wk`,
      `• Cost per downtime hour: $${n.costPerHr.toLocaleString()}`,
      `• Scrap rate: ${n.scrapRate}%`,
      `• Annual revenue: ${fmtUSDFull(n.revenueM * 1e6)}`,
      `• Gross margin: ${n.marginPct}%`,
      n.platformCost > 0 ? `• Expected platform cost: $${n.platformCost.toLocaleString()}/yr` : `• Expected platform cost: not entered`,
      ``,
      `MODELED ANNUAL IMPACT`,
      `• Range (conservative → aggressive): ${fmtUSDFull(range.lo)} – ${fmtUSDFull(range.hi)} /yr`,
      `• Shown case (${r.scenarioMeta.label}): ${fmtUSDFull(r.total)} /yr`,
      `   – Downtime recovery: ${fmtUSDFull(r.downtimeSavings)} (${Math.round(r.recoveredHrs).toLocaleString()} hrs recovered)`,
      `   – Quality improvement: ${fmtUSDFull(r.qualitySavings)} (${fmtPP(-r.scrapReducedPP)} scrap, through margin)`,
      `• Projected OEE (derived): ${oeeLine}`,
      r.payback !== null ? `• Payback period: ${r.payback < 1 ? "< 1" : r.payback.toFixed(1)} months` : ``,
      ``,
      `ASSUMPTIONS (${r.scenarioMeta.label} band)`,
      `• Downtime recovery: ${(r.scenarioMeta.downtimeRecovery * 100).toFixed(0)}% of unplanned downtime`,
      `• Scrap reduction: ${(r.scenarioMeta.scrapReduction * 100).toFixed(0)}% relative`,
      ``,
      `NOTE: Estimates, not guarantees. EKAS does not claim or warrant any specific ROI, EBITDA, dollar savings, or payback. A 60-day pilot on real data replaces every estimate above with actual governed metrics.`,
    ]
      .filter((line) => line !== "")
      .join("\n");
  };

  // Markdown variant — pastes cleanly into Notion / Confluence / email.
  const buildMarkdown = () => {
    const rows: [string, string][] = [
      ["Machines in scope", `${n.machines}`],
      ["Current OEE", `${n.oee}%`],
      ["Unplanned downtime", `${n.downtimeHrsWeek} hrs/wk`],
      ["Cost per downtime hour", `$${n.costPerHr.toLocaleString()}`],
      ["Scrap rate", `${n.scrapRate}%`],
      ["Annual revenue", fmtUSDFull(n.revenueM * 1e6)],
      ["Gross margin", `${n.marginPct}%`],
      ["Expected platform cost", n.platformCost > 0 ? `$${n.platformCost.toLocaleString()}/yr` : "not entered"],
    ];
    const impact: [string, string][] = [
      ["Modeled range (conservative → aggressive)", `${fmtUSDFull(range.lo)} – ${fmtUSDFull(range.hi)} /yr`],
      [`Shown case (${r.scenarioMeta.label})`, `${fmtUSDFull(r.total)} /yr`],
      [" Downtime recovery", `${fmtUSDFull(r.downtimeSavings)} (${Math.round(r.recoveredHrs).toLocaleString()} hrs)`],
      [" Quality improvement", `${fmtUSDFull(r.qualitySavings)} (${fmtPP(-r.scrapReducedPP)} scrap)`],
      ["Projected OEE (derived)", `${n.oee}% → ${r.projectedOEE.toFixed(1)}% (${fmtPP(r.oeeLiftPP)})`],
    ];
    if (r.payback !== null) impact.push(["Payback period", `${r.payback < 1 ? "< 1" : r.payback.toFixed(1)} months`]);
    const toTable = (rs: [string, string][]) =>
      [`| Metric | Value |`, `| --- | --- |`, ...rs.map(([k, v]) => `| ${k} | ${v} |`)].join("\n");
    return [
      `## EKAS Governed Impact Model — Estimate Summary`,
      `_Generated ${new Date().toLocaleDateString()}_`,
      ``,
      `### Operation`,
      toTable(rows),
      ``,
      `### Modeled annual impact`,
      toTable(impact),
      ``,
      `> **Note:** Estimates, not guarantees. EKAS does not claim or warrant any specific ROI, EBITDA, dollar savings, or payback. A 60-day pilot on real data replaces every estimate above with actual governed metrics.`,
    ].join("\n");
  };

  const sensitivity = useMemo(() => {
    const recoveryRates = [0.08, 0.12, 0.16, 0.2];
    const costMultipliers = [0.6, 0.8, 1.0, 1.3];
    const baseCost = n.costPerHr;
    const annualDowntimeHrs = n.downtimeHrsWeek * WEEKS_PER_YEAR;
    const revenue = n.revenueM * 1_000_000;
    const margin = n.marginPct / 100;
    const qual = ((n.scrapRate * SCENARIOS.expected.scrapReduction) / 100) * revenue * margin;
    return recoveryRates.map((rr) => ({
      rr,
      cells: costMultipliers.map((cm) => {
        const cost = baseCost * cm;
        const dt = annualDowntimeHrs * rr * cost;
        return { cost, total: dt + qual };
      }),
    }));
  }, [n]);

  return (
    <div>
      {/* Hero */}
      <section className="hero-gradient noise-overlay relative py-24 md:py-32">
        <div className="container relative z-10 max-w-3xl">
          <AnimSection>
            <Link href="/resources" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors">
              <ArrowRight className="w-4 h-4 rotate-180" /> Resources
            </Link>
            <span className="section-label mb-4 block">Governed Impact Model</span>
            <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
              Model your operation.{" "}
              <span className="text-[oklch(0.55_0.2_255)]">See the arithmetic.</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Every figure below shows its formula and the assumptions behind it. Change them. EKAS won't pick the number for you — you model your own estimate from the evidence.
            </p>
          </AnimSection>
        </div>
      </section>

      {/* Calculator */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[1fr_420px] gap-12 max-w-5xl mx-auto items-start">
            {/* Inputs */}
            <AnimSection>
              <div className="flex flex-col gap-6">
                <Section title="Your operation">
                  <Grid>
                    <FieldShell label="Presses / machines in scope" hint="Total production assets">
                      <NumInput value={inputs.machines} onChange={set("machines")} />
                    </FieldShell>
                    <FieldShell label="Current OEE" hint="Overall Equipment Effectiveness">
                      <NumInput value={inputs.oee} onChange={set("oee")} suffix="%" />
                    </FieldShell>
                  </Grid>
                </Section>

                <Section title="Downtime">
                  <Grid>
                    <FieldShell label="Unplanned downtime" hint="Total across all machines">
                      <NumInput value={inputs.downtimeHrsWeek} onChange={set("downtimeHrsWeek")} suffix="hrs/wk" />
                    </FieldShell>
                    <FieldShell label="Cost per downtime hour" hint="Fully loaded, incl. labor">
                      <NumInput value={inputs.costPerHr} onChange={set("costPerHr")} prefix="$" suffix="/hr" step={50} />
                    </FieldShell>
                  </Grid>
                </Section>

                <Section title="Quality & revenue">
                  <Grid>
                    <FieldShell label="Current scrap rate" hint="As % of production">
                      <NumInput value={inputs.scrapRate} onChange={set("scrapRate")} suffix="%" step={0.1} />
                    </FieldShell>
                    <FieldShell label="Annual revenue" hint="Approximate">
                      <NumInput value={inputs.revenueM} onChange={set("revenueM")} prefix="$" suffix="M" />
                    </FieldShell>
                  </Grid>
                  <Grid>
                    <FieldShell label="Gross margin" hint="Scrap savings flow through margin, not revenue">
                      <NumInput value={inputs.marginPct} onChange={set("marginPct")} suffix="%" />
                    </FieldShell>
                    <FieldShell label="Expected platform cost" hint="Optional — enables payback. Leave 0 to skip.">
                      <NumInput value={inputs.platformCost} onChange={set("platformCost")} prefix="$" suffix="/yr" step={1000} />
                    </FieldShell>
                  </Grid>
                </Section>

                {/* Scenario toggle */}
                <Section title="Assumption band">
                  <div className="flex gap-2">
                    {(Object.entries(SCENARIOS) as [ScenarioKey, typeof SCENARIOS[ScenarioKey]][]).map(([key, s]) => (
                      <button
                        key={key}
                        onClick={() => setScenario(key)}
                        className={`flex-1 py-2.5 px-2 rounded-lg text-[13px] font-bold transition-all ${
                          scenario === key
                            ? "border-[1.5px] border-[oklch(0.55_0.2_255)] bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)]"
                            : "border border-border bg-white text-muted-foreground hover:border-[oklch(0.55_0.2_255_/_0.4)]"
                        }`}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                  <div className="text-[12.5px] text-muted-foreground mt-2.5 leading-relaxed">
                    <strong className="text-foreground/70">{r.scenarioMeta.note}</strong>
                    <br />
                    Recovery rate {(r.scenarioMeta.downtimeRecovery * 100).toFixed(0)}% of downtime · scrap cut{" "}
                    {(r.scenarioMeta.scrapReduction * 100).toFixed(0)}% relative.
                  </div>
                </Section>
              </div>
            </AnimSection>

            {/* Results */}
            <AnimSection delay={0.15}>
              <div className="lg:sticky lg:top-[120px]">
                <div className="bg-[oklch(0.12_0.03_255)] rounded-2xl p-7 text-white">
                  <div className="flex items-center gap-2 mb-5">
                    <span className="text-lg text-[oklch(0.7_0.15_210)]">▦</span>
                    <span className="font-display font-semibold text-base">Estimated Annual Impact</span>
                  </div>

                  {/* Headline as a RANGE */}
                  <div className="text-[11.5px] font-bold tracking-[0.1em] text-white/40 mb-1.5">
                    MODELED RANGE (CONSERVATIVE → AGGRESSIVE)
                  </div>
                  <div className="flex items-baseline gap-2 mb-1 flex-wrap">
                    <span className="font-display text-[34px] font-bold text-[oklch(0.7_0.15_210)] tracking-tight">{fmtUSD(range.lo)}</span>
                    <span className="text-xl text-white/40">–</span>
                    <span className="font-display text-[34px] font-bold text-[oklch(0.7_0.15_210)] tracking-tight">{fmtUSD(range.hi)}</span>
                    <span className="text-sm text-white/40">/yr</span>
                  </div>
                  <div className="text-[12.5px] text-white/50 mb-5">
                    Showing <strong className="text-white/80">{r.scenarioMeta.label.toLowerCase()}</strong> case:{" "}
                    <strong className="text-white">{fmtUSDFull(r.total)}</strong>/yr
                  </div>

                  {/* Components */}
                  <ResultComponent
                    label="Downtime recovery"
                    value={r.downtimeSavings}
                    sub={`${Math.round(r.recoveredHrs).toLocaleString()} hrs recovered`}
                    pct={r.total > 0 ? r.downtimeSavings / r.total : 0}
                    color="oklch(0.7 0.15 210)"
                  />
                  <ResultComponent
                    label="Quality improvement"
                    value={r.qualitySavings}
                    sub={`${fmtPP(-r.scrapReducedPP)} scrap, through margin`}
                    pct={r.total > 0 ? r.qualitySavings / r.total : 0}
                    color="oklch(0.55 0.2 255)"
                  />

                  {/* Derived OEE */}
                  <div className="flex justify-between items-center py-3.5 border-t border-white/10 mt-2">
                    <span className="text-[13.5px] text-white/50">Projected OEE (derived)</span>
                    <span className="text-sm font-bold text-white">
                      {n.oee}% → {r.projectedOEE.toFixed(1)}%{" "}
                      <span className="text-[oklch(0.7_0.15_210)] text-[12.5px]">({fmtPP(r.oeeLiftPP)})</span>
                    </span>
                  </div>

                  {/* Payback (conditional) */}
                  {r.payback !== null && (
                    <div className="flex justify-between items-center py-3.5 border-t border-white/10">
                      <span className="text-[13.5px] text-white/50">Payback period</span>
                      <span className={`text-sm font-bold ${r.payback <= 12 ? "text-[oklch(0.7_0.15_210)]" : "text-white"}`}>
                        {r.payback < 1 ? "< 1" : r.payback.toFixed(1)} months
                      </span>
                    </div>
                  )}

                  {/* Toggle: math */}
                  <button onClick={() => setShowMath((v) => !v)} className="w-full text-left text-[12.5px] font-semibold text-white/50 hover:text-white/80 transition-colors pt-2.5 pb-1">
                    {showMath ? "▾" : "▸"} How this is calculated
                  </button>
                  {showMath && (
                    <div className="bg-[oklch(0.08_0.02_255)] rounded-lg p-3.5 my-1">
                      <MathLine
                        label="Downtime"
                        formula={`${Math.round(r.annualDowntimeHrs).toLocaleString()} hrs/yr × ${(r.scenarioMeta.downtimeRecovery * 100).toFixed(0)}% recovered × $${n.costPerHr}/hr`}
                        result={fmtUSDFull(r.downtimeSavings)}
                      />
                      <MathLine
                        label="Quality"
                        formula={`${r.scrapReducedPP.toFixed(2)}pp scrap cut × ${fmtUSDFull(n.revenueM * 1e6)} rev × ${n.marginPct}% margin`}
                        result={fmtUSDFull(r.qualitySavings)}
                      />
                      <MathLine
                        label="OEE lift"
                        formula={`${Math.round(r.recoveredHrs).toLocaleString()} recovered hrs ÷ ${(SCHEDULED_HRS_PER_MACHINE * n.machines).toLocaleString()} scheduled hrs × ${n.oee}% OEE`}
                        result={fmtPP(r.oeeLiftPP)}
                      />
                      <div className="border-t border-white/10 mt-2 pt-2 flex justify-between font-bold text-[12px]">
                        <span className="text-white/80">Total ({r.scenarioMeta.label})</span>
                        <span className="text-[oklch(0.7_0.15_210)]">{fmtUSDFull(r.total)}/yr</span>
                      </div>
                    </div>
                  )}

                  {/* Toggle: sensitivity */}
                  <button onClick={() => setShowSensitivity((v) => !v)} className="w-full text-left text-[12.5px] font-semibold text-white/50 hover:text-white/80 transition-colors pt-1 pb-1">
                    {showSensitivity ? "▾" : "▸"} Sensitivity (recovery × cost/hr)
                  </button>
                  {showSensitivity && (
                    <div className="bg-[oklch(0.08_0.02_255)] rounded-lg p-3 my-1 overflow-x-auto">
                      <table className="w-full border-collapse text-[11px]">
                        <thead>
                          <tr>
                            <th className="py-1.5 px-1 text-white/40 font-bold text-left border-b border-white/10">recov ↓ / $hr →</th>
                            {sensitivity[0].cells.map((c, i) => (
                              <th key={i} className="py-1.5 px-1 text-white/40 font-bold text-center border-b border-white/10">${Math.round(c.cost)}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sensitivity.map((row) => (
                            <tr key={row.rr}>
                              <td className="py-1.5 px-1 text-white/40 font-bold text-center">{(row.rr * 100).toFixed(0)}%</td>
                              {row.cells.map((c, i) => {
                                const intensity = Math.min(c.total / (range.hi * 1.2 || 1), 1);
                                return (
                                  <td
                                    key={i}
                                    className="py-1.5 px-1 text-center text-white font-semibold rounded-sm"
                                    style={{ background: `oklch(0.55 0.2 255 / ${0.08 + intensity * 0.45})` }}
                                  >
                                    {fmtUSD(c.total)}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Disclaimer */}
                  <div className="flex items-start gap-2.5 p-3 bg-white/5 rounded-lg mt-4 mb-5">
                    <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <p className="text-xs text-white/50 leading-relaxed">
                      EKAS exists to reduce operational costs through governed manufacturing visibility. Figures shown are estimates, not guarantees — EKAS does not claim or warrant any specific ROI, EBITDA, dollar savings, or payback. You model your own estimate from the evidence; a 60-day pilot on your real data replaces every estimate above with actual governed metrics.
                    </p>
                  </div>

                  <ToolSummaryActions
                    getSummary={buildSummary}
                    getMarkdown={buildMarkdown}
                    filename="ekas-impact-model"
                    copyLabel="Copy summary"
                    className="mb-3 [&>button]:flex-1 [&>button]:!border-white/20 [&>button]:!bg-white/5 [&>button]:!text-white [&>button:hover]:!bg-white/10"
                  />
                  <button onClick={() => openContact(buildSummary())} className="w-full btn-primary justify-center">
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
              <button onClick={() => openContact(buildSummary())} className="btn-primary">
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
