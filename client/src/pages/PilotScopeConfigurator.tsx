/* ═══════════════════════════════════════════════════════════
   PILOT SCOPE CONFIGURATOR — /resources/pilot-scope
   Design: Precision Engineering Aesthetic
   User selects machines, data sources, timeframe → returns what the
   60-day pilot will MEASURE and DELIVER (scope, not dollars). The
   bottom-of-funnel converter. Ported from the user-supplied component,
   adapted to site tokens; "Request this pilot" → shared contact modal.
═══════════════════════════════════════════════════════════ */
import { useState, useMemo } from "react";
import { ArrowRight, Check } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";
import { AnimSection, ToolHero, ToolBottomCTA, ToolSummaryActions } from "@/components/ToolPageShell";

const DATA_SOURCES = [
  { id: "mes", label: "MES / production counts", unlocks: ["OEE (availability, performance, quality)", "Throughput by shift"] },
  { id: "downtime", label: "Downtime / fault logs", unlocks: ["Downtime Pareto by failure mode", "Mean time between failures"] },
  { id: "scrap", label: "Scrap / quality records", unlocks: ["Quality rate, governed", "Scrap cost by SKU"] },
  { id: "tool", label: "Tool-change events", unlocks: ["Changeover loss analysis", "Tool-life tracking"] },
  { id: "labor", label: "Labor / cost rates", unlocks: ["True cost per part", "Fully-loaded downtime cost"] },
];

const TIMEFRAMES = [
  { id: 30, label: "30 days", note: "Baseline only" },
  { id: 60, label: "60 days", note: "Recommended — baseline + trend" },
  { id: 90, label: "90 days", note: "Baseline + seasonality" },
];

export default function PilotScopeConfigurator() {
  const { open: openContact } = useContactModal();
  const [machines, setMachines] = useState(8);
  const [sources, setSources] = useState<string[]>(["mes", "downtime", "scrap"]);
  const [timeframe, setTimeframe] = useState(60);

  const toggle = (id: string) =>
    setSources((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const deliverables = useMemo(() => {
    const set = new Set<string>();
    DATA_SOURCES.forEach((d) => {
      if (sources.includes(d.id)) d.unlocks.forEach((u) => set.add(u));
    });
    return Array.from(set);
  }, [sources]);

  const readiness = useMemo(() => {
    const core = ["mes", "downtime", "scrap"];
    const haveCore = core.filter((c) => sources.includes(c)).length;
    if (haveCore < 2) return { color: "text-amber-600", border: "border-amber-300", bg: "bg-amber-50", text: "Add production + downtime sources for a meaningful baseline." };
    if (sources.length >= 4) return { color: "text-teal-700", border: "border-teal-300", bg: "bg-teal-50", text: "Strong scope — supports governed OEE and cause analysis." };
    return { color: "text-[oklch(0.5_0.2_255)]", border: "border-[oklch(0.55_0.2_255_/_0.4)]", bg: "bg-[oklch(0.55_0.2_255_/_0.06)]", text: "Good scope — covers the core governed metrics." };
  }, [sources]);

  const buildSummary = () => {
    const tf = TIMEFRAMES.find((t) => t.id === timeframe);
    const selectedSources = DATA_SOURCES.filter((d) => sources.includes(d.id)).map((d) => d.label);
    return [
      `EKAS PILOT SCOPE — CONFIGURATION`,
      `Generated ${new Date().toLocaleDateString()}`,
      ``,
      `SCOPE`,
      `• Machines in scope: ${machines}`,
      `• Pilot length: ${tf?.label ?? timeframe + " days"} (${tf?.note ?? ""})`,
      `• Data sources provided (${sources.length}):`,
      ...(selectedSources.length ? selectedSources.map((s) => `   – ${s}`) : [`   – none selected`]),
      ``,
      `GOVERNED METRICS DELIVERED`,
      ...(deliverables.length ? deliverables.map((d) => `• ${d}`) : [`• (select at least one data source)`]),
      ``,
      `READINESS: ${readiness.text}`,
      ``,
      `NOTE: Scope only. EKAS does not guarantee specific outcomes — the pilot reports your actual governed metrics.`,
    ].join("\n");
  };

  const buildMarkdown = () => {
    const tf = TIMEFRAMES.find((t) => t.id === timeframe);
    const selectedSources = DATA_SOURCES.filter((d) => sources.includes(d.id)).map((d) => d.label);
    const scope: [string, string][] = [
      ["Machines in scope", `${machines}`],
      ["Pilot length", `${tf?.label ?? timeframe + " days"} (${tf?.note ?? ""})`],
      ["Data sources provided", `${sources.length}`],
    ];
    const toTable = (rs: [string, string][]) =>
      [`| Field | Value |`, `| --- | --- |`, ...rs.map(([k, v]) => `| ${k} | ${v} |`)].join("\n");
    return [
      `## EKAS Pilot Scope — Configuration`,
      `_Generated ${new Date().toLocaleDateString()}_`,
      ``,
      toTable(scope),
      ``,
      `### Data sources provided`,
      ...(selectedSources.length ? selectedSources.map((s) => `- ${s}`) : [`- none selected`]),
      ``,
      `### Governed metrics delivered`,
      ...(deliverables.length ? deliverables.map((d) => `- ${d}`) : [`- (select at least one data source)`]),
      ``,
      `**Readiness:** ${readiness.text}`,
      ``,
      `> **Note:** Scope only. EKAS does not guarantee specific outcomes — the pilot reports your actual governed metrics.`,
    ].join("\n");
  };

  return (
    <div>
      <ToolHero
        eyebrow="Pilot Scope Configurator"
        title="Define your 60-day pilot."
        accent="See exactly what we'll measure."
        intro="No dollar promises — just scope. Pick what you can give us, and EKAS shows the governed metrics it will deliver from that evidence."
      />

      <section className="py-20 bg-background">
        <div className="container">
          <div className="grid lg:grid-cols-[1.1fr_1fr] gap-10 max-w-5xl mx-auto items-start">
            {/* Inputs */}
            <AnimSection className="flex flex-col gap-7">
              <div>
                <div className="section-label mb-3">Machines in scope</div>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min={1}
                    max={40}
                    value={machines}
                    onChange={(e) => setMachines(Number(e.target.value))}
                    className="flex-1 accent-[oklch(0.55_0.2_255)]"
                  />
                  <span className="font-display text-2xl font-bold min-w-[52px] text-right text-foreground">{machines}</span>
                </div>
                <div className="text-[11.5px] text-muted-foreground mt-1.5">Start narrow. A focused pilot proves faster.</div>
              </div>

              <div>
                <div className="section-label mb-3">Data sources you can provide</div>
                <div className="flex flex-col gap-2">
                  {DATA_SOURCES.map((d) => {
                    const on = sources.includes(d.id);
                    return (
                      <button
                        key={d.id}
                        onClick={() => toggle(d.id)}
                        className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-left transition-all border ${
                          on
                            ? "border-[1.5px] border-[oklch(0.55_0.2_255)] bg-[oklch(0.55_0.2_255_/_0.06)]"
                            : "border-border bg-white hover:border-[oklch(0.55_0.2_255_/_0.4)]"
                        }`}
                      >
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center shrink-0 ${
                            on ? "bg-[oklch(0.55_0.2_255)] text-white" : "border-[1.5px] border-border"
                          }`}
                        >
                          {on && <Check className="w-3 h-3" />}
                        </span>
                        <span className={`text-[13.5px] font-semibold ${on ? "text-[oklch(0.5_0.2_255)]" : "text-foreground/80"}`}>{d.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <div className="section-label mb-3">Pilot length</div>
                <div className="flex gap-2">
                  {TIMEFRAMES.map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTimeframe(t.id)}
                      className={`flex-1 py-3 px-2 rounded-xl text-center transition-all border ${
                        timeframe === t.id
                          ? "border-[1.5px] border-[oklch(0.55_0.2_255)] bg-[oklch(0.55_0.2_255_/_0.06)]"
                          : "border-border bg-white hover:border-[oklch(0.55_0.2_255_/_0.4)]"
                      }`}
                    >
                      <div className={`text-[14px] font-bold ${timeframe === t.id ? "text-[oklch(0.5_0.2_255)]" : "text-foreground/80"}`}>{t.label}</div>
                      <div className="text-[10.5px] text-muted-foreground mt-0.5">{t.note}</div>
                    </button>
                  ))}
                </div>
              </div>
            </AnimSection>

            {/* Output */}
            <AnimSection delay={0.15}>
              <div className="lg:sticky lg:top-[120px] bg-[oklch(0.12_0.03_255)] rounded-2xl p-7 text-white">
                <div className="font-display font-semibold text-base mb-1">Your pilot scope</div>
                <div className="text-[12.5px] text-white/40 mb-5">
                  {machines} machines · {timeframe} days · {sources.length} data sources
                </div>

                <div className="text-[11px] font-bold text-white/50 tracking-wide mb-2.5">GOVERNED METRICS DELIVERED</div>
                {deliverables.length === 0 ? (
                  <div className="text-[13px] text-amber-400">Select at least one data source to see deliverables.</div>
                ) : (
                  <div className="flex flex-col gap-1.5 mb-5">
                    {deliverables.map((d) => (
                      <div key={d} className="flex gap-2.5 text-[13px] text-white/85 leading-snug">
                        <Check className="w-4 h-4 text-[oklch(0.78_0.13_180)] shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className={`text-[12.5px] rounded-lg px-3 py-2.5 mb-5 leading-snug border bg-black/20 ${readiness.color} ${readiness.border}`}>
                  {readiness.text}
                </div>

                <ToolSummaryActions
                  getSummary={buildSummary}
                  getMarkdown={buildMarkdown}
                  filename="ekas-pilot-scope"
                  copyLabel="Copy scope"
                  className="mb-3 [&>button]:flex-1 [&>button]:!border-white/20 [&>button]:!bg-white/5 [&>button]:!text-white [&>button:hover]:!bg-white/10"
                />
                <button onClick={() => openContact(buildSummary())} className="w-full btn-primary justify-center">
                  Request This Pilot <ArrowRight className="w-4 h-4" />
                </button>
                <div className="text-[11px] text-white/40 text-center mt-3 leading-snug">
                  Scope only. EKAS does not guarantee specific outcomes — the pilot reports your actual governed metrics.
                </div>
              </div>
            </AnimSection>
          </div>
        </div>
      </section>

      <ToolBottomCTA
        heading="Ready to scope your pilot with our team?"
        body="Bring the configuration above to a working session. We'll confirm the data sources, connectors, and the governed metrics your 60-day pilot will deliver."
        primaryLabel="Request a Pilot"
        secondaryHref="/resources/roi-calculator"
        secondaryLabel="Model the Impact First"
      />
    </div>
  );
}
