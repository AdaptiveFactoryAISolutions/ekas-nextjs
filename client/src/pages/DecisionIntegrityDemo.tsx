/* ═══════════════════════════════════════════════════════════
   DECISION INTEGRITY DEMO — /resources/decision-integrity
   Design: Precision Engineering Aesthetic
   Shows EKAS returning "insufficient evidence + what's missing" where a
   typical BI tool fabricates a confident number. The contrast IS the pitch.
   Ported from the user-supplied component and adapted to site tokens.
   Example outputs are ILLUSTRATIVE — labeled as such.
═══════════════════════════════════════════════════════════ */
import { useState } from "react";
import { AnimSection, ToolHero, ToolBottomCTA, SyntheticBadge, ToolSummaryActions } from "@/components/ToolPageShell";

type Q = {
  q: string;
  ekas: { verdict: "answered" | "refused"; body: string; missing?: string[]; action?: string };
  bi: { body: string };
};

const QUESTIONS: Q[] = [
  {
    q: "What was OEE on Press A-07 last Tuesday?",
    ekas: { verdict: "answered", body: "78.4% (A 91.6% × P 89.1% × Q 96.0%). 3 shifts, 0 data gaps. Ratio-of-sums over 17,280 cycles." },
    bi: { body: "78% — looks healthy!" },
  },
  {
    q: "Why did scrap spike on Line 3 in week 19?",
    ekas: {
      verdict: "refused",
      body: "Insufficient evidence to attribute cause.",
      missing: [
        "Tool-change events not logged for 2 of 3 machines that week",
        "Operator IDs missing on 41% of scrap records",
        "No material lot linkage on the affected SKUs",
      ],
      action: "Enable tool-change capture + lot genealogy to make this answerable.",
    },
    bi: { body: "Scrap rose 2.3% due to operator error during the night shift." },
  },
  {
    q: "Will we hit the Q3 capacity target at current OEE?",
    ekas: {
      verdict: "refused",
      body: "Cannot project — required inputs are stale or absent.",
      missing: [
        "Demand forecast last updated 94 days ago (90-day threshold exceeded)",
        "No planned-downtime calendar for 2 of 5 cells",
      ],
      action: "Refresh demand forecast and load the downtime calendar; EKAS will then model it.",
    },
    bi: { body: "Yes — you're on track to hit 103% of target." },
  },
  {
    q: "What's our true cost per part on MCH-1042?",
    ekas: { verdict: "answered", body: "$0.412/part (verified). Labor, machine rate, and yield-adjusted material all linked. Excludes overhead allocation — flagged as out of governed scope." },
    bi: { body: "$0.38/part" },
  },
];

export default function DecisionIntegrityDemo() {
  const [active, setActive] = useState(0);
  const item = QUESTIONS[active];
  const refused = item.ekas.verdict === "refused";

  const buildSummary = () =>
    [
      `EKAS DECISION INTEGRITY — ILLUSTRATIVE EXAMPLE`,
      `Generated ${new Date().toLocaleDateString()}`,
      ``,
      `QUESTION: ${item.q}`,
      ``,
      `EKAS [${refused ? "INSUFFICIENT EVIDENCE" : "VERIFIED"}]`,
      `${item.ekas.body}`,
      ...(item.ekas.missing ? [``, `What's missing:`, ...item.ekas.missing.map((m) => `   – ${m}`)] : []),
      ...(item.ekas.action ? [``, `Next step: ${item.ekas.action}`] : []),
      ``,
      `TYPICAL BI DASHBOARD (always answers): ${item.bi.body}`,
      `   – No evidence shown, no confidence interval, no way to verify.`,
      ``,
      `NOTE: Illustrative responses. In a pilot, EKAS produces these verdicts against your real data and data-quality state.`,
    ].join("\n");

  const buildMarkdown = () =>
    [
      `## EKAS Decision Integrity — Illustrative Example`,
      `_Generated ${new Date().toLocaleDateString()}_`,
      ``,
      `**Question:** ${item.q}`,
      ``,
      `### EKAS — ${refused ? "Insufficient evidence" : "Verified"}`,
      `${item.ekas.body}`,
      ...(item.ekas.missing ? [``, `**What's missing:**`, ...item.ekas.missing.map((m) => `- ${m}`)] : []),
      ...(item.ekas.action ? [``, `**Next step:** ${item.ekas.action}`] : []),
      ``,
      `### Typical BI dashboard (always answers)`,
      `${item.bi.body}`,
      ``,
      `_No evidence shown, no confidence interval, no way to verify._`,
      ``,
      `> Illustrative responses. In a pilot, EKAS produces these verdicts against your real data and data-quality state.`,
    ].join("\n");

  return (
    <div>
      <ToolHero
        eyebrow="Decision Integrity"
        title={`A tool that says "I don't know" is worth more`}
        accent="than one that guesses."
        intro="Ask the same question of EKAS and a typical BI dashboard. When the evidence isn't there, EKAS refuses — and tells you exactly what's missing to make the answer trustworthy."
      />

      <section className="py-20 bg-background">
        <div className="container max-w-5xl">
          <AnimSection className="mb-6 flex items-center justify-between flex-wrap gap-3">
            <span className="text-[13px] font-semibold text-muted-foreground">Pick a question:</span>
            <div className="flex items-center gap-3 flex-wrap">
              <ToolSummaryActions getSummary={buildSummary} getMarkdown={buildMarkdown} filename="ekas-decision-integrity" copyLabel="Copy example" />
              <SyntheticBadge>Illustrative responses</SyntheticBadge>
            </div>
          </AnimSection>

          <AnimSection className="flex flex-wrap gap-2 mb-8">
            {QUESTIONS.map((qq, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`px-3.5 py-2 rounded-full text-[13px] font-semibold text-left transition-all ${
                  active === i
                    ? "border-[1.5px] border-[oklch(0.55_0.2_255)] bg-[oklch(0.55_0.2_255_/_0.08)] text-[oklch(0.55_0.2_255)]"
                    : "border border-border bg-white text-muted-foreground hover:border-[oklch(0.55_0.2_255_/_0.4)]"
                }`}
              >
                {qq.q}
              </button>
            ))}
          </AnimSection>

          <AnimSection className="grid md:grid-cols-2 gap-4">
            {/* Typical BI */}
            <div className="border border-border rounded-2xl overflow-hidden opacity-95">
              <div className="px-4 py-3 bg-secondary/60 border-b border-border flex justify-between items-center">
                <span className="font-bold text-[13px] text-muted-foreground">Typical BI dashboard</span>
                <span className="text-[11px] text-muted-foreground">always answers</span>
              </div>
              <div className="px-4 py-5">
                <div className="text-[15px] text-foreground leading-relaxed">{item.bi.body}</div>
                <div className="mt-3.5 text-[11.5px] text-orange-700 bg-orange-50 border border-orange-200 rounded-lg px-2.5 py-2">
                  No evidence shown. No confidence interval. No way to verify.
                </div>
              </div>
            </div>

            {/* EKAS */}
            <div className="rounded-2xl overflow-hidden bg-[oklch(0.12_0.03_255)] text-white">
              <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center">
                <span className="font-bold text-[13px]">EKAS</span>
                <span className={`text-[11px] font-bold tracking-wide ${refused ? "text-amber-400" : "text-[oklch(0.78_0.13_180)]"}`}>
                  {refused ? "◇ INSUFFICIENT EVIDENCE" : "● VERIFIED"}
                </span>
              </div>
              <div className="px-4 py-5">
                <div className={`text-[15px] leading-relaxed ${refused ? "text-amber-400 font-bold" : "text-white font-semibold"}`}>
                  {item.ekas.body}
                </div>
                {item.ekas.missing && (
                  <div className="mt-3.5">
                    <div className="text-[11px] font-bold text-white/50 tracking-wide mb-2">WHAT'S MISSING</div>
                    {item.ekas.missing.map((m, i) => (
                      <div key={i} className="flex gap-2 text-[12.5px] text-white/80 mb-1.5 leading-relaxed">
                        <span className="text-amber-400">—</span>
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                )}
                {item.ekas.action && (
                  <div className="mt-3.5 text-[12.5px] text-[oklch(0.78_0.13_180)] bg-[oklch(0.2_0.06_180_/_0.4)] border border-[oklch(0.4_0.1_180_/_0.5)] rounded-lg px-3 py-2.5 leading-relaxed">
                    → {item.ekas.action}
                  </div>
                )}
              </div>
            </div>
          </AnimSection>

          <AnimSection className="mt-5 text-[12.5px] text-muted-foreground leading-relaxed max-w-3xl">
            Illustrative responses. In a pilot, EKAS produces these verdicts against your real data and data-quality
            state — the refusals are as valuable as the answers, because they tell you precisely where your shop-floor
            instrumentation has gaps.
          </AnimSection>
        </div>
      </section>

      <ToolBottomCTA
        heading="Watch EKAS refuse to guess on your data."
        body="In a 60-day pilot, every answer ships with its evidence — and every refusal ships with the exact data gap you'd need to close."
        primaryLabel="Request a Pilot"
        secondaryHref="/why-ekas"
        secondaryLabel="Why EKAS Governs Decisions"
      />
    </div>
  );
}
