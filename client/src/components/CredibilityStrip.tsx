/**
 * CredibilityStrip — "Built on standards, not promises"
 * Replaces logo walls and "in production pilot" credibility strips on Home, Platform, Why-EKAS.
 * Chip copy is exact as specified. Do NOT modify without explicit approval.
 * Design: Precision Engineering Aesthetic — deep navy, electric-blue accent, technical labels.
 */

interface CredibilityStripProps {
  variant?: "dark" | "light";
}

const CHIPS = [
  "Validated against real stamping production data",
  "ISO 22400-2 metric methodology",
  "IATF 16949–aligned",
  "Deterministic SQL — no guessed numbers",
  "Designed to meet SOC 2 / ISO 27001",
  "Read-only integration: SAP · Epicor · Plex · QAD",
];

export function CredibilityStrip({ variant = "dark" }: CredibilityStripProps) {
  const isDark = variant === "dark";

  return (
    <section
      className={`py-14 border-t ${
        isDark
          ? "bg-[oklch(0.11_0.03_255)] border-white/10"
          : "bg-[oklch(0.97_0.01_255)] border-foreground/10"
      }`}
    >
      <div className="container">
        {/* Title */}
        <p
          className={`text-[10px] font-display font-semibold uppercase tracking-[0.22em] mb-6 ${
            isDark ? "text-[oklch(0.65_0.2_255)]" : "text-[oklch(0.45_0.2_255)]"
          }`}
        >
          Built on standards, not promises
        </p>

        {/* Chips */}
        <div className="flex flex-wrap gap-2.5">
          {CHIPS.map((chip) => (
            <span
              key={chip}
              className={`inline-flex items-center px-3.5 py-1.5 rounded-full text-[11px] font-display font-semibold uppercase tracking-[0.12em] border transition-colors ${
                isDark
                  ? "bg-white/5 border-white/15 text-white/60 hover:bg-white/10 hover:text-white/80"
                  : "bg-[oklch(0.55_0.2_255_/_0.06)] border-[oklch(0.55_0.2_255_/_0.2)] text-[oklch(0.35_0.15_255)] hover:bg-[oklch(0.55_0.2_255_/_0.1)]"
              }`}
            >
              {chip}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
