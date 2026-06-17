/**
 * Centralized SEO metadata for every route.
 *
 * NOTE (human action required): set SITE_URL to the real production domain once
 * known. It is used for canonical + og:url so search engines and link previews
 * resolve to the correct page. Until the custom domain is bound, this defaults
 * to the Manus-published domain pattern; update it after publishing.
 */
export const SITE_URL = "https://ekas.manus.space";

export const DEFAULT_OG_IMAGE =
  "https://d2xsxph8kpxj0f.cloudfront.net/310519663721473839/3PrY7bBgJ4ifdWrhBj5kmo/ekas-dashboard-mockup-5VjjBaD9F4gzh3mELmqDKS.webp";

export interface RouteMeta {
  /** Unique <title> — target 50–60 characters. */
  title: string;
  /** Meta description — target 140–160 characters. */
  description: string;
  /** Optional per-route social image; falls back to DEFAULT_OG_IMAGE. */
  image?: string;
}

/**
 * Keyed by exact route path (matches App.tsx routes).
 */
export const ROUTE_META: Record<string, RouteMeta> = {
  "/": {
    title: "EKAS — Governed Manufacturing Decision Intelligence",
    description:
      "EKAS gives every plant, role, and shift one governed definition of every metric — with the evidence behind it, the limits stated, and human approval before any action.",
  },
  "/platform": {
    title: "EKAS Platform — The Governed Decision Layer",
    description:
      "The governed decision layer between your manufacturing systems and your team: controlled metric definitions, evidence-backed answers, and human-approved action workflows.",
  },
  "/solutions": {
    title: "EKAS Solutions — Governed Manufacturing Use Cases",
    description:
      "OEE loss, downtime attribution, scrap, repeat failures, and cross-site metric alignment — governed use cases that turn plant data into trusted, role-specific decisions.",
  },
  "/why-ekas": {
    title: "Why EKAS Is Different — Decision Integrity",
    description:
      "EKAS proves, not guesses: every number is traceable to its source data, every answer states its limits, and every recommended action waits for human approval.",
  },
  "/industries": {
    title: "Industries — Precision Manufacturing Analytics | EKAS",
    description:
      "EKAS governs the metrics your industry is judged on, mapped to the standards your customers and auditors expect — from precision metal stamping to discrete manufacturing.",
  },
  "/industries/metal-stamping": {
    title: "Metal Stamping Analytics — Governed OEE | EKAS",
    description:
      "EKAS models the realities of a precision stamping operation: multi-out tooling, companion parts, press tonnage, hit-rate variance, and die-changeover downtime.",
  },
  "/industries/automotive": {
    title: "Automotive Manufacturing Analytics | EKAS",
    description:
      "Metrics that survive a Tier-1 supplier review. When supplier quality asks how a number was calculated, EKAS shows the exact definition, the data, and the evidence.",
  },
  "/industries/industrial-manufacturing": {
    title: "Industrial Manufacturing Analytics | EKAS",
    description:
      "One governed metric standard across a mixed, multi-site operation. EKAS applies a single governed definition for OEE, downtime, and quality at every plant.",
  },
  "/roles": {
    title: "Role-Based Views — One Governed Platform | EKAS",
    description:
      "Plant managers, operations, engineering, quality, finance, and executives each get the same trusted numbers — presented for the decision that role actually makes.",
  },
  "/technical-overview": {
    title: "Technical Overview — EKAS Architecture & Security",
    description:
      "How EKAS connects: read-only adapters to SAP, Epicor, Plex, and QAD; ISO 22400-2 grain; ISA-95 hierarchy; SOC 2 / ISO 27001-aligned controls; air-gapped option.",
  },
  "/resources": {
    title: "Resources & Interactive Tools | EKAS",
    description:
      "Interactive tools for evaluating EKAS: model ROI, build a defensible downtime cost, explore OEE methodology and the failure taxonomy, and configure a 60-day pilot.",
  },
  "/resources/faqs": {
    title: "EKAS FAQs — Product, Security & Commercial Answers",
    description:
      "Honest answers on what 'governed' means, what EKAS connects to, data security, SOC 2 / ISO 27001 status, IATF 16949, pricing, and how long to value.",
  },
  "/resources/roi-calculator": {
    title: "Manufacturing ROI Calculator | EKAS",
    description:
      "Estimate the operational impact of governed decision intelligence. A conservative, transparent calculator for OEE, downtime, and quality-loss recovery scenarios.",
  },
  "/resources/downtime-cost-builder": {
    title: "Downtime Cost Builder — Cost Per Hour | EKAS",
    description:
      "Build a defensible, fully-loaded cost per downtime hour from lost margin, idle labor, and absorbed overhead — then see your annual recoverable exposure.",
  },
  "/resources/oee-methodology": {
    title: "OEE Methodology Explorer — ISO 22400 | EKAS",
    description:
      "See the same fleet data computed two ways: ratio-of-sums (ISO 22400 correct) versus average-of-averages. The divergence shows how averaging OEE inflates the number.",
  },
  "/resources/decision-integrity": {
    title: "Decision Integrity Demo — Refuses to Guess | EKAS",
    description:
      "Compare EKAS to a typical BI dashboard. When evidence is missing, EKAS refuses and states exactly what's missing — instead of fabricating a confident number.",
  },
  "/resources/failure-taxonomy": {
    title: "Failure Taxonomy Browser — 130 Modes | EKAS",
    description:
      "Search the governed failure-mode taxonomy. Every loss has a code, a detection rule, and an ISO 22400-aligned category — so downtime becomes an attributable cause.",
  },
  "/resources/pilot-scope": {
    title: "Pilot Scope Configurator — 60-Day Pilot | EKAS",
    description:
      "Configure your 60-day EKAS pilot. Pick machines, data sources, and timeframe, and see exactly which governed metrics the pilot will measure and deliver.",
  },
  "/resources/intake": {
    title: "Talk to EKAS — Intake Assistant",
    description:
      "A short, honest conversation about your operation. The EKAS intake assistant tells you straight whether EKAS is a fit and what a 60-day pilot would measure — no sales script.",
  },
  "/privacy": {
    title: "Privacy Policy | EKAS by Adaptive Factory",
    description:
      "How Adaptive Factory AI Solutions collects, uses, and protects information for the EKAS governed manufacturing decision-intelligence platform.",
  },
  "/terms": {
    title: "Terms of Service | EKAS by Adaptive Factory",
    description:
      "The terms governing use of the EKAS website and platform provided by Adaptive Factory AI Solutions.",
  },
};

/** Fallback used for unknown routes (e.g., 404). */
export const FALLBACK_META: RouteMeta = {
  title: "EKAS — Governed Manufacturing Decision Intelligence",
  description:
    "EKAS is a governed manufacturing decision-intelligence platform that turns operational evidence into trusted, role-specific, human-approved decisions.",
};
