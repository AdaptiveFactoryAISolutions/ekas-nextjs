/* ═══════════════════════════════════════════════════════════
   ARCHITECTURE DIAGRAM — "Foundation first. Intelligence on top."
   Design: Precision Engineering Aesthetic
   Native, responsive, animated rebuild of the EKAS stack diagram.
   Accent system:
     - brand blue  oklch(0.55 0.2 255)   → core / engines / metrics
     - green       oklch(0.7 0.17 155)   → governed action (top)
     - amber       oklch(0.72 0.15 70)    → connected data foundation
   Layout flows bottom → top: source systems feed up into governed action.
   On mobile the layers stack vertically; arrows point upward throughout.
═══════════════════════════════════════════════════════════ */
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUp } from "lucide-react";

const BRAND = "oklch(0.55 0.2 255)";
const BRAND_SOFT = "oklch(0.55 0.2 255 / 0.07)";
const BRAND_BORDER = "oklch(0.6 0.18 240 / 0.45)";
const GREEN = "oklch(0.72 0.17 155)";
const AMBER = "oklch(0.74 0.15 70)";

const ease = [0.23, 1, 0.32, 1] as const;

/* A single animated row wrapper that reveals on scroll */
function Layer({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Upward connector arrow between layers */
function Connector() {
  return (
    <div className="flex justify-center py-2" aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scaleY: 0.4 }}
        whileInView={{ opacity: 1, scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, ease }}
        className="flex flex-col items-center origin-bottom"
      >
        <ArrowUp className="w-4 h-4 text-white/30" strokeWidth={2.5} />
      </motion.div>
    </div>
  );
}

type CardProps = {
  title: string;
  sub?: string;
  accent?: string;
  accentText?: string;
  titleColor?: string;
  border?: string;
  bg?: string;
  size?: "sm" | "md" | "lg";
};

function Box({
  title,
  sub,
  accent,
  accentText,
  titleColor,
  border = "oklch(1 0 0 / 0.1)",
  bg = "oklch(1 0 0 / 0.03)",
  size = "md",
}: CardProps) {
  const pad = size === "lg" ? "px-6 py-6 md:py-7" : size === "sm" ? "px-4 py-4" : "px-5 py-5";
  return (
    <div
      className={`relative rounded-xl ${pad} h-full transition-colors duration-300`}
      style={{ background: bg, border: `1px solid ${border}` }}
    >
      {accent && (
        <div
          className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.15em] mb-1.5"
          style={{ color: accentText ?? accent }}
        >
          {accent}
        </div>
      )}
      <div
        className={`font-display tracking-tight ${titleColor ? "" : "text-white"} ${
          size === "lg" ? "text-xl md:text-2xl font-semibold" : "text-sm md:text-base font-semibold"
        }`}
        style={titleColor ? { color: titleColor } : undefined}
      >
        {title}
      </div>
      {sub && (
        <div className="mt-1 text-xs md:text-[13px] text-white/55 leading-relaxed">{sub}</div>
      )}
    </div>
  );
}

/* Small section caption that sits between layers */
function Caption({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-center pt-6 pb-3">
      <span className="text-[10px] md:text-[11px] font-semibold uppercase tracking-[0.18em] text-[oklch(0.7_0.15_210)]">
        {children}
      </span>
    </div>
  );
}

const metricFamilies = [
  { title: "OEE", sub: "avail · perf · quality" },
  { title: "Downtime", sub: "130-mode taxonomy" },
  { title: "Quality", sub: "FPY · scrap · COPQ" },
  { title: "Reliability", sub: "MTBF · MTTR" },
  { title: "Capacity & cost", sub: "utilization · variance" },
];

const engines = [
  { title: "Financial intelligence", sub: "EBITDA bridge · CFDI" },
  { title: "Scenario planning", sub: "Monte Carlo what-if" },
  { title: "Document processing", sub: "OCR · 8 doc types" },
  { title: "Ask EKAS", sub: "plain English, cited" },
];

const sources = [
  "Machines · PLCs",
  "ERP / MES / QMS",
  "Sensors · historians",
  "Quality systems",
];

export default function ArchitectureDiagram() {
  return (
    <div className="relative">
      {/* ── Layer 1: Governed action (top of stack) ── */}
      <Layer delay={0}>
        <Box
          title="Governed action"
          sub="Acts only on cited numbers · every action human-approved"
          accent="Automate"
          accentText={GREEN}
          titleColor={GREEN}
          border="oklch(0.72 0.17 155 / 0.4)"
          bg="oklch(0.72 0.17 155 / 0.06)"
          size="lg"
        />
      </Layer>

      <Connector />
      <Caption>What it measures — standards-based metric families</Caption>

      {/* ── Layer 2: Metric families ── */}
      <Layer delay={0.05}>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {metricFamilies.map((m) => (
            <Box
              key={m.title}
              title={m.title}
              sub={m.sub}
              border={BRAND_BORDER}
              bg={BRAND_SOFT}
              size="sm"
            />
          ))}
        </div>
      </Layer>

      <Connector />
      <Caption>How it reasons — engines</Caption>

      {/* ── Layer 3: Reasoning engines ── */}
      <Layer delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {engines.map((e) => (
            <Box
              key={e.title}
              title={e.title}
              sub={e.sub}
              border={BRAND_BORDER}
              bg={BRAND_SOFT}
              size="sm"
            />
          ))}
        </div>
      </Layer>

      <Connector />

      {/* ── Layer 4: Analytical core ── */}
      <Layer delay={0}>
        <Box
          title="Machine learning · digital twins · agentic AI"
          sub="deep analysis on deterministic data · refuses to guess"
          accent="Analytical core"
          accentText="oklch(0.7 0.15 210)"
          border={BRAND_BORDER}
          bg="oklch(0.55 0.2 255 / 0.1)"
          size="lg"
        />
      </Layer>

      <Connector />

      {/* ── Layer 5: Connected data foundation (amber) ── */}
      <Layer delay={0}>
        <Box
          title="Connected data foundation"
          sub="ISO 22400-2 grain · ISA-95 hierarchy · ratio-of-sums · every number traceable"
          titleColor={AMBER}
          border="oklch(0.74 0.15 70 / 0.45)"
          bg="oklch(0.74 0.15 70 / 0.07)"
          size="lg"
        />
      </Layer>

      <Connector />

      {/* ── Layer 6: Deterministic ingestion ── */}
      <Layer delay={0}>
        <Box
          title="Deterministic ingestion"
          sub="structured, automated · no manual data collection"
          border="oklch(1 0 0 / 0.12)"
          bg="oklch(1 0 0 / 0.04)"
          size="md"
        />
      </Layer>

      <Connector />

      {/* ── Layer 7: Source systems (base) ── */}
      <Layer delay={0.05}>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {sources.map((s) => (
            <div
              key={s}
              className="rounded-xl px-4 py-4 text-center font-display text-sm font-semibold text-white/90"
              style={{
                background: "oklch(0.2 0.03 255 / 0.6)",
                border: "1px solid oklch(1 0 0 / 0.08)",
              }}
            >
              {s}
            </div>
          ))}
        </div>
      </Layer>
    </div>
  );
}
