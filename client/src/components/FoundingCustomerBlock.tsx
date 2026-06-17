/**
 * FoundingCustomerBlock — Founding-Customer Program section
 * Replaces logo walls / "in production pilot" credibility strips on Home, Platform, Why-EKAS.
 * Copy is exact as specified. Do NOT modify copy without explicit approval.
 * Design: Precision Engineering Aesthetic — deep navy, electric-blue accent, technical labels.
 */

import { ArrowRight } from "lucide-react";
import { StatusBadge } from "@/components/StatusBadge";
import { useContactModal } from "@/components/ContactModal";

interface FoundingCustomerBlockProps {
  /** Dark background variant (default) or light */
  variant?: "dark" | "light";
}

export function FoundingCustomerBlock({ variant = "dark" }: FoundingCustomerBlockProps) {
  const { open: openContact } = useContactModal();
  const isDark = variant === "dark";

  return (
    <section
      className={`relative py-20 overflow-hidden ${
        isDark
          ? "bg-[oklch(0.13_0.03_255)]"
          : "bg-[oklch(0.97_0.01_255)]"
      }`}
    >
      {/* Background orbs */}
      {isDark && (
        <>
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[oklch(0.55_0.2_255_/_0.06)] rounded-full blur-[120px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[oklch(0.55_0.2_255_/_0.04)] rounded-full blur-[100px] pointer-events-none" />
        </>
      )}

      <div className="container relative">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <p
              className={`text-[10px] font-display font-semibold uppercase tracking-[0.2em] ${
                isDark ? "text-[oklch(0.65_0.2_255)]" : "text-[oklch(0.45_0.2_255)]"
              }`}
            >
              Founding-Customer Program
            </p>
            <StatusBadge type="EARLY_ACCESS" />
            <span
              className={`text-[10px] font-display font-semibold uppercase tracking-[0.18em] ${
                isDark ? "text-white/30" : "text-foreground/30"
              }`}
            >
              Open
            </span>
          </div>

          {/* Body copy — exact as specified */}
          <div className={`space-y-5 text-base leading-relaxed ${isDark ? "text-white/70" : "text-foreground/70"}`}>
            <p className={`text-xl md:text-2xl font-display font-semibold leading-snug ${isDark ? "text-white" : "text-foreground"}`}>
              EKAS is not yet deployed in a live customer plant, and we won't pretend otherwise.
            </p>

            <p>
              The platform was built inside a working precision-stamping operation and validated against real production data — real machines, real downtime, real OEE — not synthetic benchmarks or lab assumptions.
            </p>

            <p>
              We're now opening a small founding-customer program for first live deployments. Founding customers get direct architect access, influence over the roadmap, and a governed-metric foundation proven against real manufacturing data before it reaches your floor. In exchange, we ask for engagement and honest feedback — not to be a reference until you've decided EKAS has earned it.
            </p>

            <p className={`font-medium ${isDark ? "text-white/90" : "text-foreground/90"}`}>
              If you want a vendor with a hundred logos, that isn't us yet. If you want a decision layer built by people who've run the floor, validated against real data, and honest enough to tell you where it stands — let's talk.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/founding-customers#apply"
              className="btn-primary"
            >
              Apply for the program <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="/resources/intake?context=founding"
              className={`inline-flex items-center gap-2 px-7 py-3.5 border-2 font-display font-semibold text-sm rounded-lg transition-all duration-200 active:scale-[0.97] uppercase tracking-wide ${
                isDark
                  ? "border-white/25 text-white/80 hover:bg-white/10"
                  : "border-foreground/20 text-foreground/70 hover:bg-foreground/5"
              }`}
            >
              Talk to the intake assistant
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
