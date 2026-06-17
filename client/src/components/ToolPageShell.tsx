/* ═══════════════════════════════════════════════════════════
   TOOL PAGE SHELL — shared wrapper for the interactive tool suite
   Design: Precision Engineering Aesthetic
   Reuses site tokens: hero-gradient, noise-overlay, section-label,
   font-display, btn-primary/secondary, oklch accent. Every tool page
   wraps its body in this shell so the suite stays visually consistent.
═══════════════════════════════════════════════════════════ */
import { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "wouter";
import { ArrowRight, Copy, Check, Download, Table2 } from "lucide-react";
import { useContactModal } from "@/components/ContactModal";

export function AnimSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function ToolHero({
  eyebrow,
  title,
  accent,
  intro,
}: {
  eyebrow: string;
  title: string;
  accent: string;
  intro: string;
}) {
  return (
    <section className="hero-gradient noise-overlay relative py-24 md:py-28">
      <div className="container relative z-10 max-w-3xl">
        <AnimSection>
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-6 transition-colors"
          >
            <ArrowRight className="w-4 h-4 rotate-180" /> Resources
          </Link>
          <span className="section-label mb-4 block">{eyebrow}</span>
          <h1 className="font-display text-4xl md:text-5xl font-semibold tracking-tight text-foreground leading-[1.05]">
            {title} <span className="text-[oklch(0.55_0.2_255)]">{accent}</span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{intro}</p>
        </AnimSection>
      </div>
    </section>
  );
}

export function ToolBottomCTA({
  heading,
  body,
  primaryLabel = "Request a Demo",
  secondaryHref = "/technical-overview",
  secondaryLabel = "Read the Technical Overview",
}: {
  heading: string;
  body: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  const { open: openContact } = useContactModal();
  return (
    <section className="py-16 bg-secondary/50">
      <div className="container text-center max-w-2xl mx-auto">
        <AnimSection>
          <h2 className="font-display text-2xl font-semibold text-foreground mb-4">{heading}</h2>
          <p className="text-muted-foreground leading-relaxed mb-8">{body}</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={openContact} className="btn-primary">
              {primaryLabel} <ArrowRight className="w-4 h-4" />
            </button>
            <Link href={secondaryHref} className="btn-secondary">
              {secondaryLabel} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </AnimSection>
      </div>
    </section>
  );
}

/* ── Copy-summary button ──────────────────────────────────────
   Copies a plain-text summary to the clipboard so evaluators can
   paste current inputs + results straight into an internal memo.
   `getSummary` is called at click time so the text always reflects
   the latest state. Shows a transient "Copied" confirmation and
   falls back to a hidden textarea when the async Clipboard API is
   unavailable (e.g. non-secure contexts). */
export function CopySummaryButton({
  getSummary,
  label = "Copy summary",
  className = "",
}: {
  getSummary: () => string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fallbackCopy = (text: string) => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  };

  const handleCopy = useCallback(async () => {
    const text = getSummary();
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        ok = true;
      } else {
        ok = fallbackCopy(text);
      }
    } catch {
      ok = fallbackCopy(text);
    }
    if (ok) {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [getSummary]);

  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-secondary active:scale-[0.97] ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-[oklch(0.55_0.18_150)]" /> Copied to clipboard
        </>
      ) : (
        <>
          <Copy className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}

/* Shared clipboard write with a non-secure-context fallback. */
async function writeClipboard(text: string): Promise<boolean> {
  const fallback = () => {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      return true;
    } catch {
      return false;
    }
  };
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
    return fallback();
  } catch {
    return fallback();
  }
}

/* ── Copy-as-Markdown button ──────────────────────────────────
   Copies a Markdown-formatted version of the summary so results
   paste cleanly into Notion / Confluence / GitHub / email. */
export function CopyMarkdownButton({
  getMarkdown,
  label = "Copy as Markdown",
  className = "",
}: {
  getMarkdown: () => string;
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleCopy = useCallback(async () => {
    const ok = await writeClipboard(getMarkdown());
    if (ok) {
      setCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    }
  }, [getMarkdown]);
  return (
    <button
      type="button"
      onClick={handleCopy}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-secondary active:scale-[0.97] ${className}`}
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 text-[oklch(0.55_0.18_150)]" /> Copied Markdown
        </>
      ) : (
        <>
          <Table2 className="h-4 w-4" /> {label}
        </>
      )}
    </button>
  );
}

/* ── Download-summary button ──────────────────────────────────
   Downloads the plain-text summary as a .txt file so an evaluator
   can attach it to an internal memo. `filename` should omit the
   extension; a timestamp keeps repeated downloads distinct. */
export function DownloadSummaryButton({
  getContent,
  filename,
  extension = "txt",
  mime = "text/plain;charset=utf-8",
  label,
  className = "",
}: {
  getContent: () => string;
  filename: string;
  extension?: string;
  mime?: string;
  label?: string;
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const handleDownload = useCallback(() => {
    try {
      const text = getContent();
      const blob = new Blob([text], { type: mime });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      const stamp = new Date().toISOString().slice(0, 10);
      a.href = url;
      a.download = `${filename}-${stamp}.${extension}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setTimeout(() => URL.revokeObjectURL(url), 1000);
      setDone(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setDone(false), 2000);
    } catch {
      /* no-op */
    }
  }, [getContent, filename, extension, mime]);
  return (
    <button
      type="button"
      onClick={handleDownload}
      aria-live="polite"
      className={`inline-flex items-center justify-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-semibold text-foreground transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-secondary active:scale-[0.97] ${className}`}
    >
      {done ? (
        <>
          <Check className="h-4 w-4 text-[oklch(0.55_0.18_150)]" /> Downloaded
        </>
      ) : (
        <>
          <Download className="h-4 w-4" /> {label ?? `Download (.${extension})`}
        </>
      )}
    </button>
  );
}

/* ── Combined summary toolbar ─────────────────────────────────
   Drop-in row that renders Copy (plain text), Copy as Markdown,
   and Download (.txt) using the tool's current state. Pass
   `getMarkdown` to enable the Markdown action (calculators);
   omit it for explorer-style tools that have no tabular form. */
export function ToolSummaryActions({
  getSummary,
  getMarkdown,
  filename,
  copyLabel = "Copy summary",
  className = "",
}: {
  getSummary: () => string;
  getMarkdown?: () => string;
  filename: string;
  copyLabel?: string;
  className?: string;
}) {
  return (
    <div className={`flex flex-wrap gap-2.5 ${className}`}>
      <CopySummaryButton getSummary={getSummary} label={copyLabel} />
      {getMarkdown && <CopyMarkdownButton getMarkdown={getMarkdown} />}
      {getMarkdown ? (
        <DownloadSummaryButton getContent={getMarkdown} filename={filename} extension="md" mime="text/markdown;charset=utf-8" />
      ) : (
        <DownloadSummaryButton getContent={getSummary} filename={filename} extension="txt" />
      )}
    </div>
  );
}

/* Small label for illustrative/synthetic data so nothing reads as a real customer metric. */
export function SyntheticBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-amber-300/60 bg-amber-50 px-2.5 py-1 text-[11px] font-semibold text-amber-700">
      <span className="h-1.5 w-1.5 rounded-full bg-amber-500" /> {children}
    </span>
  );
}
