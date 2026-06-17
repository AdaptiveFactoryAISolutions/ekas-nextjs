/**
 * StatusBadgeLegend — compact footer note for the Platform page.
 * Explains what each status badge means so engineers can read the page
 * with full transparency. Reinforces the EKAS honesty brand.
 * Design: Precision Engineering Aesthetic — subtle, technical, unobtrusive.
 */

import { StatusBadge } from "@/components/StatusBadge";

const LEGEND = [
  {
    type: "LIVE" as const,
    label: "Live",
    desc: "Available in the current platform build and in active use.",
  },
  {
    type: "ROADMAP" as const,
    label: "Roadmap",
    desc: "Committed to the product roadmap; not yet available in production.",
  },
  {
    type: "EARLY_ACCESS" as const,
    label: "Early Access",
    desc: "Available to founding customers and early-access partners only.",
  },
  {
    type: "EXPLORING" as const,
    label: "Exploring",
    desc: "Under research or evaluation; no delivery commitment yet.",
  },
];

interface StatusBadgeLegendProps {
  /** Light background (default) or dark */
  variant?: "light" | "dark";
}

export function StatusBadgeLegend({ variant = "light" }: StatusBadgeLegendProps) {
  const isDark = variant === "dark";

  return (
    <div
      className={`border rounded-xl px-6 py-5 ${
        isDark
          ? "bg-white/[0.03] border-white/10"
          : "bg-[oklch(0.97_0.003_255)] border-border"
      }`}
    >
      <p
        className={`text-[9px] font-display font-semibold uppercase tracking-[0.22em] mb-4 ${
          isDark ? "text-white/35" : "text-foreground/35"
        }`}
      >
        Feature status legend
      </p>
      <div className="flex flex-wrap gap-x-8 gap-y-3">
        {LEGEND.map((item) => (
          <div key={item.type} className="flex items-center gap-2.5 min-w-0">
            <StatusBadge type={item.type} />
            <span
              className={`text-xs leading-snug ${
                isDark ? "text-white/45" : "text-foreground/50"
              }`}
            >
              {item.desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
