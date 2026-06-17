/* ═══════════════════════════════════════════════════════════
   TALK TO EKAS — site-wide floating action button
   Design: Precision Engineering Aesthetic (matches site tokens)
   - Persistent entry point to the intake assistant (/resources/intake)
   - Brand gradient oklch(0.55 0.2 255) → oklch(0.48 0.2 255)
   - Hides itself on the intake page (no self-link)
   - Appears after a small scroll so it never fights the hero
   - Respects prefers-reduced-motion
═══════════════════════════════════════════════════════════ */
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";
import { MessageSquareText } from "lucide-react";

const INTAKE_PATH = "/resources/intake";

export default function TalkToEkasFAB() {
  const [location] = useLocation();
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const onScroll = () => setShown(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Never show the button on the intake page itself.
  if (location === INTAKE_PATH) return null;

  return (
    <Link
      href={INTAKE_PATH}
      aria-label="Talk to EKAS — start a short intake conversation"
      className={`group fixed bottom-5 right-5 z-[60] inline-flex items-center gap-2.5 rounded-full pl-4 pr-5 py-3.5 text-sm font-semibold text-white
        bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)]
        shadow-[0_10px_30px_-8px_oklch(0.55_0.2_255_/_0.55)]
        transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]
        hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-10px_oklch(0.55_0.2_255_/_0.6)]
        active:scale-[0.97]
        motion-safe:will-change-transform
        ${shown ? "opacity-100 translate-y-0 pointer-events-auto" : "opacity-0 translate-y-3 pointer-events-none"}`}
    >
      {/* Live pulse dot */}
      <span className="relative flex h-2.5 w-2.5 shrink-0">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-white" />
      </span>
      <MessageSquareText className="w-4 h-4 shrink-0" aria-hidden="true" />
      <span>Talk to EKAS</span>
    </Link>
  );
}
