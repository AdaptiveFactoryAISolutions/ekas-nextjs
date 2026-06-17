/**
 * StatusBadge — EKAS capability-status communication system
 * Design: Precision Engineering Aesthetic (deep navy / electric-blue accent)
 *
 * Three badge types used consistently site-wide:
 *   LIVE        — shipping today
 *   ROADMAP     — committed, in development, not yet shipping
 *   EARLY_ACCESS — founding-customer / limited access program
 *   EXPLORING   — under evaluation, no commitment
 *
 * Usage:
 *   <StatusBadge type="LIVE" />
 *   <StatusBadge type="ROADMAP" />
 *   <StatusBadge type="EARLY_ACCESS" />
 *   <StatusBadge type="EXPLORING" />
 *   <StatusBadgeLegend />   ← render once per page that uses badges
 */

import React from "react";

export type BadgeType = "LIVE" | "ROADMAP" | "EARLY_ACCESS" | "EXPLORING";

interface StatusBadgeProps {
  type: BadgeType;
  className?: string;
}

const config: Record<
  BadgeType,
  { symbol: string; label: string; bg: string; border: string; text: string; dot: string }
> = {
  LIVE: {
    symbol: "●",
    label: "LIVE",
    bg: "bg-emerald-950/60",
    border: "border-emerald-700/60",
    text: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  ROADMAP: {
    symbol: "◆",
    label: "ROADMAP",
    bg: "bg-amber-950/60",
    border: "border-amber-700/60",
    text: "text-amber-400",
    dot: "",
  },
  EARLY_ACCESS: {
    symbol: "◆",
    label: "EARLY ACCESS",
    bg: "bg-[oklch(0.55_0.2_255_/_0.12)]",
    border: "border-[oklch(0.55_0.2_255_/_0.35)]",
    text: "text-[oklch(0.7_0.2_255)]",
    dot: "",
  },
  EXPLORING: {
    symbol: "○",
    label: "EXPLORING",
    bg: "bg-white/5",
    border: "border-white/20",
    text: "text-white/50",
    dot: "",
  },
};

export function StatusBadge({ type, className = "" }: StatusBadgeProps) {
  const c = config[type];
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border font-display font-semibold text-[10px] uppercase tracking-[0.18em] ${c.bg} ${c.border} ${c.text} ${className}`}
    >
      {type === "LIVE" ? (
        <span className="relative flex h-2 w-2 shrink-0">
          <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${c.dot} opacity-60`} />
          <span className={`relative inline-flex rounded-full h-2 w-2 ${c.dot}`} />
        </span>
      ) : (
        <span className="text-[11px] leading-none">{c.symbol}</span>
      )}
      {c.label}
    </span>
  );
}

/** Compact legend — render once on any page that uses badges */
export function StatusBadgeLegend({ dark = false }: { dark?: boolean }) {
  const textBase = dark ? "text-white/40" : "text-muted-foreground";
  const labelBase = dark ? "text-white/60" : "text-foreground/70";
  return (
    <div className={`flex flex-wrap items-center gap-x-5 gap-y-2 text-[10px] font-display font-semibold uppercase tracking-[0.14em] ${textBase}`}>
      <span className={`${labelBase} mr-1`}>Status:</span>
      {(["LIVE", "EARLY_ACCESS", "ROADMAP", "EXPLORING"] as BadgeType[]).map((t) => (
        <span key={t} className="flex items-center gap-1.5">
          <StatusBadge type={t} />
        </span>
      ))}
    </div>
  );
}
