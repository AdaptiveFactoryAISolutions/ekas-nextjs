/* ═══════════════════════════════════════════════════════════
   FAILURE TAXONOMY BROWSER — /resources/failure-taxonomy
   Design: Precision Engineering Aesthetic
   Searchable/filterable view of the failure-mode taxonomy. Signals
   classification depth a slide can't. Representative subset of the
   130-mode taxonomy, grouped by ISO 22400-aligned loss categories.
   Ported from the user-supplied component, adapted to site tokens.
   Data is a representative SUBSET — labeled as such.
═══════════════════════════════════════════════════════════ */
import { useState, useMemo } from "react";
import { Search } from "lucide-react";
import { AnimSection, ToolHero, ToolBottomCTA, SyntheticBadge } from "@/components/ToolPageShell";

const CATEGORIES = [
  { id: "availability", label: "Availability loss", color: "oklch(0.55 0.2 255)" },
  { id: "performance", label: "Performance loss", color: "oklch(0.5 0.2 295)" },
  { id: "quality", label: "Quality loss", color: "oklch(0.7 0.13 180)" },
  { id: "planned", label: "Planned / scheduled", color: "oklch(0.55 0.02 255)" },
] as const;

type Mode = { code: string; cat: string; mode: string; detect: string; note: string };

const SUBSET: Mode[] = [
  { code: "AV-014", cat: "availability", mode: "Unplanned mechanical breakdown", detect: "Run-state drop > threshold", note: "Press crash, ram seizure" },
  { code: "AV-021", cat: "availability", mode: "Tooling failure mid-run", detect: "Cycle interrupt + tool fault flag", note: "Punch/die fracture" },
  { code: "AV-033", cat: "availability", mode: "Material starvation", detect: "Coil-end signal, no feed", note: "Upstream supply gap" },
  { code: "AV-047", cat: "availability", mode: "Operator-absent idle", detect: "Idle > shift-gap window", note: "Manning / break overrun" },
  { code: "AV-052", cat: "availability", mode: "Electrical / control fault", detect: "PLC fault code captured", note: "Drive trip, sensor fault" },
  { code: "PF-008", cat: "performance", mode: "Reduced speed run", detect: "Actual rate < ideal rate", note: "Deliberate slowdown, wear" },
  { code: "PF-016", cat: "performance", mode: "Micro-stops", detect: "Stop < 5 min, auto-recover", note: "Misfeed, jam clear" },
  { code: "PF-024", cat: "performance", mode: "Startup ramp loss", detect: "Sub-rate window post-changeover", note: "Warm-up, first-off checks" },
  { code: "QL-005", cat: "quality", mode: "Dimensional out-of-tolerance", detect: "SPC out-of-control signal", note: "Drift, tool wear" },
  { code: "QL-012", cat: "quality", mode: "Surface defect / burr", detect: "Inspection reject code", note: "Die condition" },
  { code: "QL-019", cat: "quality", mode: "Startup scrap", detect: "Reject cluster post-changeover", note: "Setup parts" },
  { code: "QL-027", cat: "quality", mode: "Material defect inbound", detect: "Lot-linked reject pattern", note: "Coil quality, traceable to lot" },
  { code: "PL-003", cat: "planned", mode: "Scheduled changeover", detect: "Planned changeover event", note: "Not an OEE loss when scheduled" },
  { code: "PL-009", cat: "planned", mode: "Preventive maintenance", detect: "PM calendar event", note: "Excluded from availability loss" },
];

export default function FailureTaxonomyBrowser() {
  const [query, setQuery] = useState("");
  const [activeCat, setActiveCat] = useState<string>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    /* string filter — no Set iteration */
    return SUBSET.filter((m) => {
      const catOk = activeCat === "all" || m.cat === activeCat;
      const qOk =
        !q ||
        m.mode.toLowerCase().includes(q) ||
        m.code.toLowerCase().includes(q) ||
        m.note.toLowerCase().includes(q) ||
        m.detect.toLowerCase().includes(q);
      return catOk && qOk;
    });
  }, [query, activeCat]);

  const catColor = (id: string) => CATEGORIES.find((c) => c.id === id)?.color ?? "oklch(0.55 0.2 255)";

  return (
    <div>
      <ToolHero
        eyebrow="Failure Taxonomy · 130 governed modes"
        title="Every loss has a name, a detection rule,"
        accent="and a category."
        intro={`EKAS classifies downtime and scrap against a governed 130-mode taxonomy — so "the machine was down" becomes an attributable, queryable cause. A representative slice is shown below.`}
      />

      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <AnimSection className="flex gap-3 mb-4 flex-wrap items-center">
            <div className="flex items-center flex-1 min-w-[280px] h-11 bg-white border border-border rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[oklch(0.55_0.2_255_/_0.3)] focus-within:border-[oklch(0.55_0.2_255)] transition-all">
              <Search className="w-4 h-4 text-muted-foreground ml-3.5" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search modes, codes, detection rules…"
                className="flex-1 min-w-0 bg-transparent border-none outline-none px-3 text-[14px] text-foreground"
              />
            </div>
            <SyntheticBadge>Representative subset</SyntheticBadge>
          </AnimSection>

          <AnimSection className="flex flex-wrap gap-2 mb-6">
            <Chip on={activeCat === "all"} onClick={() => setActiveCat("all")} color="oklch(0.55 0.02 255)">
              All
            </Chip>
            {CATEGORIES.map((c) => (
              <Chip key={c.id} on={activeCat === c.id} onClick={() => setActiveCat(c.id)} color={c.color}>
                {c.label}
              </Chip>
            ))}
          </AnimSection>

          <div className="flex flex-col gap-2">
            {filtered.map((m) => (
              <AnimSection key={m.code}>
                <div
                  className="grid grid-cols-[80px_1fr] sm:grid-cols-[92px_1fr_1fr] gap-4 items-center px-4 py-3.5 bg-white border border-border rounded-xl"
                  style={{ borderLeft: `3px solid ${catColor(m.cat)}` }}
                >
                  <div className="font-mono font-bold text-[13px]" style={{ color: catColor(m.cat) }}>
                    {m.code}
                  </div>
                  <div>
                    <div className="text-[14px] font-bold text-foreground">{m.mode}</div>
                    <div className="text-[12px] text-muted-foreground mt-0.5">{m.note}</div>
                  </div>
                  <div className="col-span-2 sm:col-span-1 border-t sm:border-t-0 border-border pt-2 sm:pt-0">
                    <div className="text-[10.5px] font-bold text-muted-foreground tracking-wide mb-0.5">DETECTION</div>
                    <div className="text-[12.5px] text-foreground/70 font-mono">{m.detect}</div>
                  </div>
                </div>
              </AnimSection>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center text-muted-foreground text-[14px]">
                No modes match. Try a broader term — the full taxonomy has 130.
              </div>
            )}
          </div>

          <div className="mt-4 text-[12.5px] text-muted-foreground">
            Showing {filtered.length} of a representative subset · full governed taxonomy: 130 modes, ISO 22400-aligned.
          </div>
        </div>
      </section>

      <ToolBottomCTA
        heading="Map your losses to the governed taxonomy."
        body="A 60-day pilot classifies your actual downtime and scrap against the full 130-mode taxonomy — turning vague stoppages into attributable, queryable causes."
        primaryLabel="Request a Pilot"
        secondaryHref="/technical-overview"
        secondaryLabel="Read the Technical Overview"
      />
    </div>
  );
}

function Chip({ on, onClick, color, children }: { on: boolean; onClick: () => void; color: string; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-2 rounded-full text-[12.5px] font-semibold whitespace-nowrap transition-all border"
      style={
        on
          ? { borderColor: color, color, background: `color-mix(in oklch, ${color} 10%, white)` }
          : { borderColor: "oklch(0.92 0.01 255)", color: "oklch(0.55 0.02 255)", background: "white" }
      }
    >
      {children}
    </button>
  );
}
