/* ═══════════════════════════════════════════════════════════
   OEE METHODOLOGY EXPLORER — /resources/oee-methodology
   Design: Precision Engineering Aesthetic
   Same fleet data computed two ways: ratio-of-sums (ISO 22400 correct,
   EKAS) vs average-of-averages (the common, wrong shortcut). The
   divergence is the point. Ported from the user-supplied component and
   adapted to site tokens. Data is SYNTHETIC (Plant A) — labeled as such.
═══════════════════════════════════════════════════════════ */
import { useState, useMemo } from "react";
import { AnimSection, ToolHero, ToolBottomCTA, SyntheticBadge, ToolSummaryActions } from "@/components/ToolPageShell";

type Machine = {
  sk: string;
  name: string;
  goodParts: number;
  totalParts: number;
  plannedTime: number;
  runTime: number;
  idealRate: number;
};

const SEED: Machine[] = [
  { sk: "MCH-1042", name: "Press A-01", goodParts: 86400, totalParts: 92000, plannedTime: 9600, runTime: 7900, idealRate: 12.0 },
  { sk: "MCH-1043", name: "Press A-02", goodParts: 18200, totalParts: 21500, plannedTime: 9600, runTime: 6100, idealRate: 4.0 },
  { sk: "MCH-1051", name: "Press A-07", goodParts: 142000, totalParts: 149500, plannedTime: 9600, runTime: 8800, idealRate: 18.0 },
  { sk: "MCH-1066", name: "Press A-12", goodParts: 9800, totalParts: 13200, plannedTime: 9600, runTime: 5200, idealRate: 3.2 },
  { sk: "MCH-1071", name: "Press A-15", goodParts: 61000, totalParts: 64800, plannedTime: 9600, runTime: 8100, idealRate: 8.5 },
  { sk: "MCH-1088", name: "Press A-19", goodParts: 24500, totalParts: 31000, plannedTime: 9600, runTime: 7400, idealRate: 5.0 },
];

function machineMetrics(m: Machine) {
  const availability = m.runTime / m.plannedTime;
  const idealParts = m.idealRate * m.runTime;
  const performance = Math.min(m.totalParts / idealParts, 1);
  const quality = m.goodParts / m.totalParts;
  const oee = availability * performance * quality;
  return { availability, performance, quality, oee, idealParts };
}

const pct = (x: number) => `${(x * 100).toFixed(1)}%`;

function ResultCard({ label, sublabel, value, tone }: { label: string; sublabel: string; value: string; tone: "warn" | "good" | "accent" }) {
  const cls =
    tone === "warn"
      ? "bg-amber-50 border-amber-200"
      : tone === "good"
      ? "bg-teal-50 border-teal-200"
      : "bg-[oklch(0.12_0.03_255)] border-[oklch(0.12_0.03_255)]";
  const valCls = tone === "warn" ? "text-amber-600" : tone === "good" ? "text-teal-600" : "text-[oklch(0.7_0.16_255)]";
  const onDark = tone === "accent";
  return (
    <div className={`rounded-xl border p-5 ${cls}`}>
      <div className={`text-[13px] font-bold ${onDark ? "text-white/80" : "text-foreground"}`}>{label}</div>
      <div className={`text-[11.5px] mb-3 ${onDark ? "text-white/40" : "text-muted-foreground"}`}>{sublabel}</div>
      <div className={`font-display text-3xl font-extrabold tracking-tight ${valCls}`}>{value}</div>
    </div>
  );
}

export default function OEEMethodologyExplorer() {
  const [highlight, setHighlight] = useState<string | null>(null);
  const rows = useMemo(() => SEED.map((m) => ({ ...m, ...machineMetrics(m) })), []);
  const avgOfAvg = useMemo(() => rows.reduce((s, r) => s + r.oee, 0) / rows.length, [rows]);
  const ratioOfSums = useMemo(() => {
    const sumRun = rows.reduce((s, r) => s + r.runTime, 0);
    const sumPlanned = rows.reduce((s, r) => s + r.plannedTime, 0);
    const sumIdeal = rows.reduce((s, r) => s + r.idealParts, 0);
    const sumTotal = rows.reduce((s, r) => s + r.totalParts, 0);
    const sumGood = rows.reduce((s, r) => s + r.goodParts, 0);
    const A = sumRun / sumPlanned;
    const P = Math.min(sumTotal / sumIdeal, 1);
    const Q = sumGood / sumTotal;
    return { A, P, Q, oee: A * P * Q, sumGood, sumTotal };
  }, [rows]);
  const divergence = (avgOfAvg - ratioOfSums.oee) * 100;
  const misstates = divergence >= 0 ? "overstates" : "understates";

  const buildSummary = () =>
    [
      `OEE METHODOLOGY — RATIO-OF-SUMS vs AVERAGE-OF-AVERAGES`,
      `Generated ${new Date().toLocaleDateString()}`,
      `(Illustrative "Plant A" synthetic data)`,
      ``,
      `FLEET RESULT`,
      `• Ratio-of-sums (ISO 22400 correct, EKAS): ${pct(ratioOfSums.oee)}`,
      `• Average-of-averages (common shortcut): ${pct(avgOfAvg)}`,
      `• Gap: ${divergence > 0 ? "+" : ""}${divergence.toFixed(1)}pp — averaging ${misstates} OEE here`,
      ``,
      `RATIO-OF-SUMS COMPONENTS`,
      `• Availability: ${pct(ratioOfSums.A)}`,
      `• Performance: ${pct(ratioOfSums.P)}`,
      `• Quality: ${pct(ratioOfSums.Q)}`,
      ``,
      `PER-MACHINE OEE`,
      ...rows.map((r) => `• ${r.name} (${r.sk}): ${pct(r.oee)} — ${r.goodParts.toLocaleString()}/${r.totalParts.toLocaleString()} good/total`),
      ``,
      `METHOD: Ratio-of-sums totals good parts, total parts, run time, and planned time across machines before dividing. Averaging percentages weights a small press the same as a high-volume line; the direction of the error flips with your mix. EKAS never averages percentages.`,
    ].join("\n");

  const buildMarkdown = () => {
    const head = `| Machine | Good / Total | Avail. | Perf. | Quality | OEE |`;
    const sep = `| --- | --- | --- | --- | --- | --- |`;
    const body = rows.map(
      (r) => `| ${r.name} (${r.sk}) | ${r.goodParts.toLocaleString()} / ${r.totalParts.toLocaleString()} | ${pct(r.availability)} | ${pct(r.performance)} | ${pct(r.quality)} | ${pct(r.oee)} |`
    );
    const foot = `| **Fleet (ratio-of-sums)** | ${ratioOfSums.sumGood.toLocaleString()} / ${ratioOfSums.sumTotal.toLocaleString()} | ${pct(ratioOfSums.A)} | ${pct(ratioOfSums.P)} | ${pct(ratioOfSums.Q)} | **${pct(ratioOfSums.oee)}** |`;
    return [
      `## OEE Methodology — Ratio-of-Sums vs Average-of-Averages`,
      `_Generated ${new Date().toLocaleDateString()} — illustrative "Plant A" synthetic data_`,
      ``,
      `| Method | Fleet OEE |`,
      `| --- | --- |`,
      `| Ratio-of-sums (ISO 22400 correct, EKAS) | **${pct(ratioOfSums.oee)}** |`,
      `| Average-of-averages (common shortcut) | ${pct(avgOfAvg)} |`,
      `| Gap | ${divergence > 0 ? "+" : ""}${divergence.toFixed(1)}pp — averaging ${misstates} OEE here |`,
      ``,
      `### Per-machine detail`,
      head,
      sep,
      ...body,
      foot,
      ``,
      `> Ratio-of-sums totals good parts, total parts, run time, and planned time across machines before dividing. Averaging percentages weights a small press the same as a high-volume line; the direction of the error flips with your mix. EKAS never averages percentages.`,
    ].join("\n");
  };

  return (
    <div>
      <ToolHero
        eyebrow="Methodology · ISO 22400-2 · ADR-0309"
        title="The same data. Two answers."
        accent="Only one is correct."
        intro="Most tools average each machine's OEE together. That weights a tiny press the same as your highest-volume line, so the fleet number drifts from reality — sometimes high, sometimes low. EKAS sums the evidence first, then divides: the only method ISO 22400 supports."
      />

      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <AnimSection className="mb-6 flex items-center justify-between gap-3 flex-wrap">
            <ToolSummaryActions getSummary={buildSummary} getMarkdown={buildMarkdown} filename="ekas-oee-methodology" copyLabel="Copy comparison" />
            <SyntheticBadge>Synthetic "Plant A" data — illustrative</SyntheticBadge>
          </AnimSection>

          <AnimSection className="grid sm:grid-cols-3 gap-4 mb-10">
            <ResultCard label="Average-of-averages" sublabel="The common shortcut" value={pct(avgOfAvg)} tone="warn" />
            <ResultCard label="Ratio-of-sums" sublabel="EKAS · ISO 22400 correct" value={pct(ratioOfSums.oee)} tone="good" />
            <ResultCard label="Gap vs. correct method" sublabel={`Averaging ${misstates} OEE here`} value={`${divergence > 0 ? "+" : ""}${divergence.toFixed(1)}pp`} tone="accent" />
          </AnimSection>

          <AnimSection className="border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-[13px] min-w-[640px]">
                <thead>
                  <tr className="bg-secondary/60 text-right">
                    <th className="px-3.5 py-3 text-left text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Machine</th>
                    <th className="px-3.5 py-3 text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Good / Total</th>
                    <th className="px-3.5 py-3 text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Avail.</th>
                    <th className="px-3.5 py-3 text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Perf.</th>
                    <th className="px-3.5 py-3 text-[11px] font-bold text-muted-foreground tracking-wide uppercase">Quality</th>
                    <th className="px-3.5 py-3 text-[11px] font-bold text-[oklch(0.55_0.2_255)] tracking-wide uppercase">OEE</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr
                      key={r.sk}
                      onMouseEnter={() => setHighlight(r.sk)}
                      onMouseLeave={() => setHighlight(null)}
                      className="border-t border-border text-right transition-colors"
                      style={{ background: highlight === r.sk ? "oklch(0.55 0.2 255 / 0.06)" : undefined }}
                    >
                      <td className="px-3.5 py-3 text-left">
                        <div className="font-bold text-foreground">{r.name}</div>
                        <div className="text-[11px] text-muted-foreground font-mono">{r.sk}</div>
                      </td>
                      <td className="px-3.5 py-3 text-muted-foreground">{r.goodParts.toLocaleString()} / {r.totalParts.toLocaleString()}</td>
                      <td className="px-3.5 py-3 text-foreground/80">{pct(r.availability)}</td>
                      <td className="px-3.5 py-3 text-foreground/80">{pct(r.performance)}</td>
                      <td className="px-3.5 py-3 text-foreground/80">{pct(r.quality)}</td>
                      <td className="px-3.5 py-3 font-bold text-[oklch(0.55_0.2_255)]">{pct(r.oee)}</td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-[oklch(0.12_0.03_255)] text-white text-right">
                    <td className="px-3.5 py-3 text-left font-bold">Fleet (ratio-of-sums)</td>
                    <td className="px-3.5 py-3 text-white/70">{ratioOfSums.sumGood.toLocaleString()} / {ratioOfSums.sumTotal.toLocaleString()}</td>
                    <td className="px-3.5 py-3 text-white/70">{pct(ratioOfSums.A)}</td>
                    <td className="px-3.5 py-3 text-white/70">{pct(ratioOfSums.P)}</td>
                    <td className="px-3.5 py-3 text-white/70">{pct(ratioOfSums.Q)}</td>
                    <td className="px-3.5 py-3 font-extrabold text-[oklch(0.78_0.13_180)]">{pct(ratioOfSums.oee)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </AnimSection>

          <AnimSection className="mt-5 flex gap-3 p-4 bg-secondary/60 border border-border rounded-xl text-[12.5px] text-muted-foreground leading-relaxed">
            <span className="text-base text-[oklch(0.55_0.2_255)]">▦</span>
            <span>
              The fleet row sums good parts, total parts, run time, and planned time across all machines <em>before</em>{" "}
              dividing.               Averaging the six machine-OEE percentages instead yields {pct(avgOfAvg)} — a {Math.abs(divergence).toFixed(1)}pp
              gap that {misstates} the fleet, because averaging weights a 13k-part press the same as a 149k-part line.
              The direction of the error flips with your mix; only ratio-of-sums is reliable. EKAS never averages
              percentages. Synthetic Plant A data shown.
            </span>
          </AnimSection>
        </div>
      </section>

      <ToolBottomCTA
        heading="See ratio-of-sums on your own fleet."
        body="A 60-day pilot computes governed, ISO 22400-aligned OEE from your production records — and shows exactly where an averaged number would have misled you."
        primaryLabel="Request a Pilot"
        secondaryHref="/technical-overview"
        secondaryLabel="Read the Technical Overview"
      />
    </div>
  );
}
