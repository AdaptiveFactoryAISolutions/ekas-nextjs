/* ═══════════════════════════════════════════════════════════
   DOWNTIME COST BUILDER — /resources/downtime-cost-builder
   Design: Precision Engineering Aesthetic
   Builds a fully-loaded cost-per-downtime-hour from its parts (lost
   contribution margin + idle labor + absorbed overhead) so the number
   is defensible, then shows annual recoverable exposure across a
   recovery × cost grid. Ported from the user-supplied DowntimeCostBuilder
   and adapted to site design tokens (display font, oklch accent, dark panel).
═══════════════════════════════════════════════════════════ */
import { useState, useMemo } from "react";
import { ArrowRight } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import { AnimSection, ToolHero, ToolBottomCTA, ToolSummaryActions } from "@/components/ToolPageShell";

const WEEKS = 52;
const fmtUSD = (n: number) =>
  n >= 1000 ? `$${Math.round(n / 1000)}K` : `$${Math.round(n).toLocaleString()}`;
const fmtFull = (n: number) => `$${Math.round(n).toLocaleString()}`;

function Part({
  label,
  value,
  set,
  hint,
}: {
  label: string;
  value: number | "";
  set: (v: number | "") => void;
  hint: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[13px] font-semibold text-foreground">{label}</label>
      <div className="flex items-center h-11 bg-white border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[oklch(0.55_0.2_255_/_0.3)] focus-within:border-[oklch(0.55_0.2_255)] transition-all">
        <span className="pl-3 text-muted-foreground text-sm font-semibold">$</span>
        <input
          type="number"
          value={value}
          onChange={(e) => set(e.target.value === "" ? "" : Number(e.target.value))}
          onFocus={(e) => e.target.select()}
          className="flex-1 min-w-0 bg-transparent border-none outline-none px-3 text-[15px] font-semibold text-foreground"
        />
        <span className="pr-3 text-muted-foreground text-[13px]">/hr</span>
      </div>
      <span className="text-[11.5px] text-muted-foreground">{hint}</span>
    </div>
  );
}

export default function DowntimeCostBuilder() {
  const { open: openContact } = useContactModal();
  const [lostMargin, setLostMargin] = useState<number | "">(320);
  const [labor, setLabor] = useState<number | "">(110);
  const [overhead, setOverhead] = useState<number | "">(70);
  const [downtimeHrsWeek, setDowntimeHrsWeek] = useState<number | "">(40);

  const num = (v: number | "") => (v === "" ? 0 : Number(v));
  const costPerHr = num(lostMargin) + num(labor) + num(overhead);
  const annualHrs = num(downtimeHrsWeek) * WEEKS;
  const annualExposure = annualHrs * costPerHr;

  const grid = useMemo(() => {
    const recoveryRates = [0.1, 0.15, 0.2, 0.25];
    const costs = [costPerHr * 0.7, costPerHr * 0.85, costPerHr, costPerHr * 1.2];
    return recoveryRates.map((rr) => ({
      rr,
      cells: costs.map((c) => ({ cost: c, recovered: annualHrs * rr * c })),
    }));
  }, [costPerHr, annualHrs]);

  const maxCell = Math.max(1, ...grid.flatMap((r) => r.cells.map((c) => c.recovered)));

  const buildSummary = () =>
    [
      `EKAS DOWNTIME COST BUILDER — SUMMARY`,
      `Generated ${new Date().toLocaleDateString()}`,
      ``,
      `COST PER DOWNTIME HOUR (FULLY LOADED): ${fmtFull(costPerHr)}/hr`,
      `• Lost contribution margin: $${num(lostMargin)}/hr`,
      `• Idle labor still paid: $${num(labor)}/hr`,
      `• Fixed overhead absorbed: $${num(overhead)}/hr`,
      ``,
      `ANNUAL EXPOSURE`,
      `• Unplanned downtime: ${num(downtimeHrsWeek)} hrs/wk (${annualHrs.toLocaleString()} hrs/yr)`,
      `• Total annual exposure: ${fmtFull(annualExposure)}`,
      ``,
      `RECOVERABLE EXPOSURE (illustrative, at $${Math.round(costPerHr)}/hr)`,
      `• At 10% recovery: ${fmtFull(annualHrs * 0.1 * costPerHr)}/yr`,
      `• At 15% recovery: ${fmtFull(annualHrs * 0.15 * costPerHr)}/yr`,
      `• At 20% recovery: ${fmtFull(annualHrs * 0.2 * costPerHr)}/yr`,
      `• At 25% recovery: ${fmtFull(annualHrs * 0.25 * costPerHr)}/yr`,
      ``,
      `NOTE: Exposure, not a guarantee. Recovery depends on your team's response to surfaced evidence. EKAS does not claim or warrant any specific ROI, dollar savings, or payback.`,
    ].join("\n");

  const buildMarkdown = () => {
    const parts: [string, string][] = [
      ["Lost contribution margin", `$${num(lostMargin)}/hr`],
      ["Idle labor still paid", `$${num(labor)}/hr`],
      ["Fixed overhead absorbed", `$${num(overhead)}/hr`],
      ["**Fully-loaded cost / hr**", `**${fmtFull(costPerHr)}/hr**`],
      ["Unplanned downtime", `${num(downtimeHrsWeek)} hrs/wk (${annualHrs.toLocaleString()} hrs/yr)`],
      ["**Total annual exposure**", `**${fmtFull(annualExposure)}**`],
    ];
    const rec: [string, string][] = [0.1, 0.15, 0.2, 0.25].map((rr) => [
      `${(rr * 100).toFixed(0)}% recovery`,
      `${fmtFull(annualHrs * rr * costPerHr)}/yr`,
    ]);
    const toTable = (rs: [string, string][], h1: string, h2: string) =>
      [`| ${h1} | ${h2} |`, `| --- | --- |`, ...rs.map(([k, v]) => `| ${k} | ${v} |`)].join("\n");
    return [
      `## EKAS Downtime Cost Builder — Summary`,
      `_Generated ${new Date().toLocaleDateString()}_`,
      ``,
      toTable(parts, "Component", "Value"),
      ``,
      `### Recoverable exposure (illustrative, at $${Math.round(costPerHr)}/hr)`,
      toTable(rec, "Recovery rate", "Annual"),
      ``,
      `> **Note:** Exposure, not a guarantee. Recovery depends on your team's response to surfaced evidence. EKAS does not claim or warrant any specific ROI, dollar savings, or payback.`,
    ].join("\n");
  };

  return (
    <div>
      <ToolHero
        eyebrow="Downtime Cost Builder"
        title="What is an hour of downtime"
        accent="actually worth?"
        intro="Most shops quote a single number they can't defend. Build it from its parts instead — lost contribution margin, idle labor you still pay, and the fixed overhead you still absorb."
      />

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto items-start">
            {/* Inputs */}
            <AnimSection>
              <div className="flex flex-col gap-4">
                <Part label="Lost contribution margin" value={lostMargin} set={setLostMargin} hint="Margin on parts not made" />
                <Part label="Idle labor still paid" value={labor} set={setLabor} hint="Operators on the clock during stoppage" />
                <Part label="Fixed overhead absorbed" value={overhead} set={setOverhead} hint="Depreciation, facility, allocated cost" />
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-foreground">Unplanned downtime</label>
                  <div className="flex items-center h-11 bg-white border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[oklch(0.55_0.2_255_/_0.3)] focus-within:border-[oklch(0.55_0.2_255)] transition-all">
                    <input
                      type="number"
                      value={downtimeHrsWeek}
                      onChange={(e) => setDowntimeHrsWeek(e.target.value === "" ? "" : Number(e.target.value))}
                      onFocus={(e) => e.target.select()}
                      className="flex-1 min-w-0 bg-transparent border-none outline-none px-3 text-[15px] font-semibold text-foreground"
                    />
                    <span className="pr-3 text-muted-foreground text-[13px]">hrs/wk</span>
                  </div>
                  <span className="text-[11.5px] text-muted-foreground">Total across machines in scope</span>
                </div>
              </div>
            </AnimSection>

            {/* Result panel */}
            <AnimSection delay={0.15}>
              <div className="lg:sticky lg:top-[120px] bg-[oklch(0.12_0.03_255)] rounded-2xl p-7 text-white">
                <div className="section-label text-white/50 mb-2">Fully-loaded cost per hour</div>
                <div className="font-display text-4xl font-bold text-[oklch(0.6_0.18_255)] tracking-tight">
                  {fmtFull(costPerHr)}
                  <span className="text-base text-white/40 font-normal">/hr</span>
                </div>
                <div className="text-[12.5px] text-white/40 font-mono mt-1 mb-5">
                  ${num(lostMargin)} margin + ${num(labor)} labor + ${num(overhead)} overhead
                </div>

                <div className="flex justify-between py-3.5 border-t border-white/10">
                  <span className="text-[13.5px] text-white/60">Annual downtime hours</span>
                  <span className="text-sm font-bold">{annualHrs.toLocaleString()} hrs</span>
                </div>
                <div className="flex justify-between py-3.5 border-t border-white/10">
                  <span className="text-[13.5px] text-white/60">Total annual exposure</span>
                  <span className="text-base font-extrabold text-[oklch(0.78_0.13_180)]">{fmtFull(annualExposure)}</span>
                </div>

                <ToolSummaryActions
                  getSummary={buildSummary}
                  getMarkdown={buildMarkdown}
                  filename="ekas-downtime-cost"
                  copyLabel="Copy summary"
                  className="mt-6 mb-3 [&>button]:flex-1 [&>button]:!border-white/20 [&>button]:!bg-white/5 [&>button]:!text-white [&>button:hover]:!bg-white/10"
                />
                <button onClick={() => openContact(buildSummary())} className="w-full btn-primary justify-center">
                  Discuss Your Numbers <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </AnimSection>
          </div>

          {/* Sensitivity */}
          <AnimSection className="max-w-5xl mx-auto mt-14">
            <div className="section-label mb-1">Recoverable exposure — recovery rate × cost/hr</div>
            <p className="text-[12.5px] text-muted-foreground mb-4 max-w-2xl">
              What governed visibility could reclaim annually, across plausible assumptions. You pick the cell you'd defend.
            </p>
            <div className="border border-border rounded-xl overflow-hidden">
              <table className="w-full border-collapse text-[13px]">
                <thead>
                  <tr className="bg-secondary/60">
                    <th className="px-3 py-3 text-left text-[11px] font-bold text-muted-foreground tracking-wide">recovery ↓ / cost →</th>
                    {grid[0].cells.map((c, i) => (
                      <th key={i} className="px-3 py-3 text-center text-[11px] font-bold text-muted-foreground tracking-wide">
                        {fmtFull(c.cost)}/hr
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {grid.map((row) => (
                    <tr key={row.rr} className="border-t border-border">
                      <td className="px-3 py-3 text-left font-bold text-muted-foreground">{(row.rr * 100).toFixed(0)}%</td>
                      {row.cells.map((c, i) => {
                        const intensity = c.recovered / maxCell;
                        return (
                          <td
                            key={i}
                            className="px-3 py-3 text-center font-bold text-foreground"
                            style={{ background: `oklch(0.55 0.2 255 / ${0.06 + intensity * 0.4})` }}
                          >
                            {fmtUSD(c.recovered)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[12.5px] text-muted-foreground leading-relaxed">
              Exposure, not a guarantee. EKAS surfaces where downtime originates; recovery depends on your team's
              response. EKAS does not claim or warrant any specific ROI, dollar savings, or payback.
            </p>
          </AnimSection>
        </div>
      </section>

      <ToolBottomCTA
        heading="Turn this estimate into a governed number."
        body="A 60-day pilot replaces every assumption above with your plant's actual fully-loaded downtime cost — attributable to the failure mode that caused it."
        primaryLabel="Request a Pilot"
        secondaryHref="/solutions"
        secondaryLabel="See Downtime Attribution"
      />
    </div>
  );
}
