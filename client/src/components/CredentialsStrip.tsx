/* ═══════════════════════════════════════════════════════════
   CredentialsStrip — consolidated standards & credentials
   Design: Precision Engineering Aesthetic
   IMPORTANT: This strip only restates credentials already
   claimed elsewhere on the site. Do NOT add unverified claims.
   Each item links to where the claim is substantiated.
═══════════════════════════════════════════════════════════ */
import { Award, ShieldCheck, FileCheck, Database } from "lucide-react";
import { Link } from "wouter";

type Credential = {
  icon: typeof Award;
  label: string;
  detail: string;
  href: string;
};

const credentials: Credential[] = [
  {
    icon: Award,
    label: "BCG Build for the Future 2025",
    detail: "Referenced research, n = 1,250 senior executives",
    href: "/why-ekas",
  },
  {
    icon: FileCheck,
    label: "IATF 16949-aligned",
    detail: "Audit trail and versioned definitions by design",
    href: "/resources/faqs",
  },
  {
    icon: ShieldCheck,
    label: "SOC 2 & ISO 27001",
    detail: "Designed to meet control requirements; status on request",
    href: "/technical-overview",
  },
  {
    icon: Database,
    label: "Read-only named connectors",
    detail: "SAP, Epicor, Plex, QAD via read-only adapters",
    href: "/platform",
  },
];

export default function CredentialsStrip({
  variant = "light",
}: {
  variant?: "light" | "dark";
}) {
  const isDark = variant === "dark";
  return (
    <section
      className={`py-10 border-y ${
        isDark
          ? "bg-[oklch(0.12_0.025_255)] border-white/[0.08]"
          : "bg-[oklch(0.985_0.002_255)] border-border"
      }`}
      aria-label="Standards and credentials"
    >
      <div className="container">
        <p
          className={`section-label mb-6 text-center ${
            isDark ? "text-white/45" : ""
          }`}
        >
          Standards &amp; Credentials
        </p>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-px rounded-2xl overflow-hidden">
          {credentials.map((c) => (
            <Link
              key={c.label}
              href={c.href}
              className={`group flex flex-col gap-2 p-5 transition-colors ${
                isDark
                  ? "bg-[oklch(0.12_0.025_255)] hover:bg-white/[0.04]"
                  : "bg-white hover:bg-[oklch(0.97_0.005_255)]"
              }`}
            >
              <c.icon
                className="w-5 h-5 text-[oklch(0.55_0.2_255)] shrink-0"
                strokeWidth={1.75}
              />
              <span
                className={`font-display text-sm font-semibold leading-snug ${
                  isDark ? "text-white" : "text-foreground"
                }`}
              >
                {c.label}
              </span>
              <span
                className={`text-xs leading-relaxed ${
                  isDark ? "text-white/45" : "text-muted-foreground"
                }`}
              >
                {c.detail}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
