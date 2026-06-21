/* ═══════════════════════════════════════════════════════════
   INTAKE ASSISTANT — /resources/intake
   Design: Precision Engineering Aesthetic (matches site tokens)
   A human-feeling conversational intake that qualifies a prospect
   honestly, then captures contact + transcript. Talks to the EKAS
   Intake Proxy (FastAPI) — never to the model directly.

     browser → PROXY_URL → RunPod Ollama (Qwen3.6 35B)

   The proxy holds the model URL server-side, so when the pod
   restarts only the proxy env changes — this page never does.
   Reuses site shell (ToolHero / ToolBottomCTA / AnimSection),
   font-display + brand oklch(0.55 0.2 255), site easings & radii.
═══════════════════════════════════════════════════════════ */
import { useState, useRef, useEffect, useCallback } from "react";
import { Send, CheckCircle2, ShieldCheck, Loader2, ArrowDown, RotateCcw } from "lucide-react";
import { ToolHero, ToolBottomCTA } from "@/components/ToolPageShell";

// ───────────────────────────────────────────────────────────────────────────
// Point this at your running FastAPI proxy. In production this should be the
// proxy hosted on the EKAS EC2 host (behind the existing WAF/cert), e.g.
//   https://api.<your-domain>/intake
// For this preview it points at the sandbox proxy tunnel.
const PROXY_URL =
  (import.meta.env.VITE_PROXY_URL as string | undefined)?.replace(/\/$/, "") ||
  "https://8090-i0sqhe6ym8g7lofn5a9zx-b09e740d.us2.manus.computer";
// ───────────────────────────────────────────────────────────────────────────

const GREETING =
  "Hi, I'm Petra. Tell me what kind of operation you're running — stamping, machining, assembly, fabrication, or something else — and what problem you're trying to get under control first.";

const FOUNDING_GREETING =
  "Hi, I'm Petra. I can see you're interested in the Founding-Customer Program — thanks for taking the time. Tell me what kind of operation you're running — stamping, machining, assembly, fabrication, or something else — and what problem you're trying to get under control first.";

/** Read ?context=founding from the URL (works with Wouter's hash/history routing) */
function isFoudingContext(): boolean {
  try {
    return new URLSearchParams(window.location.search).get("context") === "founding";
  } catch {
    return false;
  }
}

type Msg = { role: "assistant" | "user"; content: string; at: number };

const now = () => Date.now();
function fmtTime(ts: number) {
  try {
    return new Date(ts).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  } catch {
    return "";
  }
}
type Contact = { name: string; company: string; email: string; phone: string };
type IntakeForm = Record<string, string>;
type Assessment = { fit?: string; rationale?: string; buying_signals?: string[] };

// Persist the in-progress conversation so a refresh or accidental navigation
// never loses someone's first interaction with us. Versioned key so future
// shape changes invalidate cleanly.
const STORE_KEY = "ekas_intake_session_v1";
type PersistedSession = {
  messages: Msg[];
  closeState: string | null;
  contact: Contact;
  showContact: boolean;
  contactSent: boolean;
  intakeForm: IntakeForm | null;
  assessment: Assessment | null;
};
function loadSession(): PersistedSession | null {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw) as PersistedSession;
    if (!Array.isArray(data?.messages) || data.messages.length === 0) return null;
    return data;
  } catch {
    return null;
  }
}

export default function IntakeAssistant() {
  // Detect founding-customer context from URL query param (?context=founding).
  // If the session was already in progress (restored from localStorage), keep
  // the saved session regardless of the context flag.
  const isFoundingCustomer = useRef(isFoudingContext());
  const saved = useRef<PersistedSession | null>(typeof window !== "undefined" ? loadSession() : null);
  const initialGreeting = isFoundingCustomer.current ? FOUNDING_GREETING : GREETING;
  const [messages, setMessages] = useState<Msg[]>(
    saved.current?.messages ?? [{ role: "assistant", content: initialGreeting, at: now() }],
  );
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [endpointDown, setEndpointDown] = useState(false);
  const [showContact, setShowContact] = useState(saved.current?.showContact ?? false);
  const [contact, setContact] = useState<Contact>(
    saved.current?.contact ?? { name: "", company: "", email: "", phone: "" },
  );
  const [contactSent, setContactSent] = useState(saved.current?.contactSent ?? false);
  // Count of replies that arrived while the viewer was scrolled away, surfaced on the pill.
  const [unread, setUnread] = useState(0);
  // Gate state echoed back to the proxy each turn, plus the structured record the
  // proxy releases ONLY when the intake is genuinely complete + confirmed.
  const [closeState, setCloseState] = useState<string | null>(saved.current?.closeState ?? null);
  const [intakeForm, setIntakeForm] = useState<IntakeForm | null>(saved.current?.intakeForm ?? null);
  const [assessment, setAssessment] = useState<Assessment | null>(saved.current?.assessment ?? null);
  const scrollRef = useRef<HTMLDivElement>(null);
  // The chat panel + input, so we can keep the viewer anchored to the conversation
  // and the cursor ready in the reply box once they start chatting.
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  // Remember if the viewer was already near the bottom BEFORE the latest update,
  // so we never yank them away while they're scrolled up reading earlier replies.
  const stickToBottom = useRef(true);
  // Show a floating "jump to latest" pill only when a new reply arrives while the
  // viewer is scrolled up reading earlier messages.
  const [showJump, setShowJump] = useState(false);

  // Keep the chat panel within the page viewport (not the inner message scroller)
  // so the user never types only to discover the page drifted away from the chat.
  const ensureChatInView = useCallback(() => {
    const panel = panelRef.current;
    if (!panel) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const rect = panel.getBoundingClientRect();
    const fullyVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
    // Only nudge the page if part of the panel is off-screen, to avoid jitter.
    if (!fullyVisible) {
      panel.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "center" });
    }
  }, []);

  // Once the user starts the conversation, keep the cursor in the reply box.
  const focusInput = useCallback(() => {
    const el = inputRef.current;
    if (el && !el.disabled) el.focus({ preventScroll: true });
  }, []);

  // Start a brand-new conversation, clearing the saved session.
  const restartConversation = useCallback(() => {
    try {
      localStorage.removeItem(STORE_KEY);
    } catch {
      /* ignore */
    }
    setMessages([{ role: "assistant", content: GREETING, at: now() }]);
    setInput("");
    setBusy(false);
    setEndpointDown(false);
    setShowContact(false);
    setContact({ name: "", company: "", email: "", phone: "" });
    setContactSent(false);
    setCloseState(null);
    setIntakeForm(null);
    setAssessment(null);
    setShowJump(false);
    setUnread(0);
    stickToBottom.current = true;
    requestAnimationFrame(() => focusInput());
  }, []);

  const trackScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight;
    const nearBottom = distanceFromBottom < 120;
    stickToBottom.current = nearBottom;
    // Once the viewer manually returns to the bottom, retire the pill + clear unread.
    if (nearBottom) {
      setShowJump(false);
      setUnread(0);
    }
  }, []);

  const scrollToBottom = useCallback((smooth = true) => {
    const el = scrollRef.current;
    if (!el) return;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    stickToBottom.current = true;
    setShowJump(false);
    // A single smooth scrollTo can settle short because content height shifts
    // mid-animation (images/layout) and the container also has CSS scroll-smooth.
    // Re-target scrollHeight over a few frames so we reliably land at the true bottom.
    if (reduce || !smooth) {
      el.scrollTop = el.scrollHeight;
      return;
    }
    setUnread(0);
    el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
    let frames = 0;
    const settle = () => {
      if (!scrollRef.current) return;
      const node = scrollRef.current;
      const remaining = node.scrollHeight - node.scrollTop - node.clientHeight;
      if (remaining > 4 && frames < 40) {
        frames += 1;
        node.scrollTo({ top: node.scrollHeight, behavior: "smooth" });
        requestAnimationFrame(settle);
      } else {
        // Snap any residual gap and retire the pill.
        node.scrollTop = node.scrollHeight;
        setShowJump(false);
        setUnread(0);
      }
    };
    requestAnimationFrame(settle);
  }, []);

  // Natural auto-scroll: smooth, and only when the viewer is already at the bottom.
  // If a new message arrives while the viewer is scrolled up, surface the jump pill
  // instead of yanking them down.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    if (stickToBottom.current) {
      const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
      el.scrollTo({ top: el.scrollHeight, behavior: reduce ? "auto" : "smooth" });
      setShowJump(false);
    } else {
      setShowJump(true);
    }
  }, [messages, busy, showContact, contactSent]);

  // When a reply arrives while the viewer is scrolled up, bump the unread count
  // so the pill can say exactly how many new messages are waiting.
  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === "assistant" && !stickToBottom.current) {
      setUnread((n) => n + 1);
    }
  }, [messages]);

  // Persist the session on every meaningful change so a refresh restores the chat.
  useEffect(() => {
    try {
      const payload: PersistedSession = {
        messages,
        closeState,
        contact,
        showContact,
        contactSent,
        intakeForm,
        assessment,
      };
      localStorage.setItem(STORE_KEY, JSON.stringify(payload));
    } catch {
      /* storage may be unavailable; never block the chat */
    }
  }, [messages, closeState, contact, showContact, contactSent, intakeForm, assessment]);

  // Auto-focus the reply box on load so the first message needs no extra click
  // (skipped once the conversation has already closed into the contact step).
  useEffect(() => {
    if (!contactSent && !showContact) {
      const id = requestAnimationFrame(() => focusInput());
      return () => cancelAnimationFrame(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When the assistant finishes replying, return the cursor to the reply box so the
  // user can keep typing in the chat without hunting for the input.
  useEffect(() => {
    if (!busy && !contactSent && messages.length > 1) {
      const id = requestAnimationFrame(() => focusInput());
      return () => cancelAnimationFrame(id);
    }
  }, [busy, contactSent, messages.length, focusInput]);

  // Honest status dot: probe pod reachability on load.
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`${PROXY_URL}/health`);
        const data = await res.json();
        if (!cancelled && !data?.ok) setEndpointDown(true);
      } catch {
        if (!cancelled) setEndpointDown(true);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const send = useCallback(async () => {
    const text = input.trim();
    if (!text || busy) return;
    setInput("");
    setEndpointDown(false);

    const next: Msg[] = [...messages, { role: "user", content: text, at: now() }];
    // The user just acted — always bring their own message into view AND keep the
    // chat panel anchored in the page so they're never left typing off-screen.
    stickToBottom.current = true;
    setMessages(next);
    setBusy(true);
    ensureChatInView();

    try {
      const res = await fetch(`${PROXY_URL}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: next,
          close_state: closeState,
          ...(isFoundingCustomer.current ? { context: "founding_customer" } : {}),
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const clean = data?.reply || "Sorry — could you say that another way?";
      setMessages((m) => [...m, { role: "assistant", content: clean, at: now() }]);
      // Carry the proxy's gate state forward so the deterministic completion gate
      // can advance across turns.
      setCloseState(data?.close_state ?? null);
      // The proxy releases the structured record + flips `complete` to true ONLY
      // when every required field is populated AND the customer has confirmed the
      // summary. That is the single trigger for the contact panel.
      if (data?.complete) {
        if (data?.form) setIntakeForm(data.form as IntakeForm);
        if (data?.assessment) setAssessment(data.assessment as Assessment);
        setShowContact(true);
      }
    } catch {
      // Fail like a human, not an error screen.
      setEndpointDown(true);
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content:
            "Petra is briefly offline. I don't want to waste your time — leave your details below and someone from the EKAS team will reach out directly to pick this up.",
          at: now(),
        },
      ]);
      setShowContact(true);
    } finally {
      setBusy(false);
      // Reply landed: re-anchor the chat and put the cursor back in the reply box
      // so the next message goes exactly where the user expects.
      ensureChatInView();
      requestAnimationFrame(() => focusInput());
    }
  }, [input, busy, messages, closeState, ensureChatInView, focusInput]);

  const submitContact = useCallback(async () => {
    if (!contact.name || !contact.email) return;
    try {
      await fetch(`${PROXY_URL}/lead`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contact, transcript: messages, form: intakeForm, assessment }),
      });
    } catch {
      // Even if persistence fails, never trap the prospect — confirm anyway.
    }
    setContactSent(true);
  }, [contact, messages, intakeForm, assessment]);

  const canSubmit = Boolean(contact.name && contact.email);

  return (
    <div>
      <ToolHero
        eyebrow="Talk to EKAS"
        title="Tell us about your"
        accent="operation."
        intro="A short, confident conversation with Petra, the EKAS discovery guide. Tell her about your operation — downtime, OEE trust, maintenance, quality, reporting — and she'll help you see the decision problem clearly and point you to the right EKAS capability and next step."
      />

      <section className="py-16 md:py-20 bg-background">
        <div className="container max-w-3xl">
          {/* Chat panel — styled as a native EKAS surface */}
          <div
            ref={panelRef}
            className="scroll-mt-24 rounded-2xl border border-border bg-white overflow-hidden shadow-[0_1px_2px_oklch(0.15_0.03_255_/_0.04),0_24px_60px_-20px_oklch(0.15_0.03_255_/_0.18)]"
          >
            {/* Brand accent rail */}
            <div className="h-1 bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)]" />

            {/* Header */}
            <div className="flex items-center gap-3 px-5 md:px-6 py-4 border-b border-border bg-[oklch(0.985_0.003_255)]">
              <EkasMark />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-[15px] tracking-tight text-navy leading-tight">
                  Petra · EKAS Discovery
                </div>
                <div className="text-[12.5px] text-muted-foreground mt-0.5">
                  {endpointDown
                    ? "Offline — leave your details below"
                    : busy
                      ? <span className="inline-flex items-center gap-1.5 text-[oklch(0.55_0.2_255)] font-medium"><span className="relative flex h-1.5 w-1.5"><span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-[oklch(0.55_0.2_255)] opacity-60" /><span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[oklch(0.55_0.2_255)]" /></span>typing…</span>
                      : "A few quick questions about your operation"}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span
                  className={`w-2 h-2 rounded-full ${endpointDown ? "bg-[oklch(0.72_0.16_65)]" : "bg-[oklch(0.62_0.17_155)]"}`}
                  style={{
                    boxShadow: endpointDown
                      ? "0 0 0 3px oklch(0.72 0.16 65 / 0.18)"
                      : "0 0 0 3px oklch(0.62 0.17 155 / 0.18)",
                  }}
                />
                <span className="text-[11px] font-semibold uppercase tracking-[0.06em] text-muted-foreground">
                  {endpointDown ? "Offline" : "Online"}
                </span>
                {(messages.length > 1 || contactSent) && (
                  <button
                    onClick={restartConversation}
                    className="ml-1 inline-flex items-center gap-1 rounded-full border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-muted-foreground transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] hover:text-foreground hover:border-[oklch(0.55_0.2_255_/_0.4)] active:scale-[0.97]"
                    aria-label="Start a new conversation"
                    title="Start a new conversation"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span className="hidden sm:inline">New chat</span>
                  </button>
                )}
              </div>
            </div>

            {/* Messages */}
            <div className="relative">
              <div
                ref={scrollRef}
                onScroll={trackScroll}
                className="h-[440px] overflow-y-auto overscroll-contain scroll-smooth px-5 md:px-6 py-6 flex flex-col gap-3.5"
                style={{ background: "radial-gradient(640px 320px at 50% -40%, oklch(0.55 0.2 255 / 0.06), transparent 70%)" }}
              >
                {messages.map((m, i) => (
                  <Bubble key={i} role={m.role} text={m.content} at={m.at} />
                ))}
                {busy && <Typing />}
              </div>

              {/* Jump-to-latest pill — only when scrolled up and a new reply landed */}
              <div
                className={`pointer-events-none absolute inset-x-0 bottom-3 flex justify-center transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                  showJump ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
                }`}
                aria-hidden={!showJump}
              >
                <button
                  onClick={() => scrollToBottom(true)}
                  tabIndex={showJump ? 0 : -1}
                  className={`pointer-events-auto inline-flex items-center gap-1.5 rounded-full pl-3 pr-3.5 py-1.5 text-[12px] font-semibold text-white bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] shadow-[0_8px_20px_-8px_oklch(0.55_0.2_255_/_0.6)] ring-1 ring-white/15 transition-transform duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.96] hover:-translate-y-0.5 ${
                    showJump ? "" : "invisible"
                  }`}
                >
                  <ArrowDown className="w-3.5 h-3.5" />
                  {unread > 1 ? `${unread} new messages` : "New message"}
                </button>
              </div>
            </div>

            {/* Contact capture */}
            {showContact && !contactSent && (
              <div className="px-5 md:px-6 py-5 border-t border-border bg-[oklch(0.985_0.003_255)] motion-safe:animate-[ekasreveal_0.42s_cubic-bezier(0.23,1,0.32,1)_both]">
                <div className="text-[12.5px] text-muted-foreground mb-3">
                  Where should the EKAS team reach you? (Name and email are enough.)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-3">
                  <Field placeholder="Name *" value={contact.name} onChange={(v) => setContact({ ...contact, name: v })} />
                  <Field placeholder="Company" value={contact.company} onChange={(v) => setContact({ ...contact, company: v })} />
                  <Field placeholder="Email *" value={contact.email} onChange={(v) => setContact({ ...contact, email: v })} />
                  <Field placeholder="Phone (optional)" value={contact.phone} onChange={(v) => setContact({ ...contact, phone: v })} />
                </div>
                <button
                  onClick={submitContact}
                  disabled={!canSubmit}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-[13.5px] font-semibold transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:cursor-not-allowed active:enabled:scale-[0.98] hover:enabled:-translate-y-0.5 text-white disabled:text-muted-foreground bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] disabled:bg-none disabled:bg-secondary shadow-lg shadow-[oklch(0.55_0.2_255_/_0.2)] disabled:shadow-none"
                >
                  Send to the EKAS team <Send className="w-3.5 h-3.5" />
                </button>
                <p className="mt-3 flex items-center gap-1.5 text-[11px] text-muted-foreground">
                  <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.55_0.2_255)]" />
                  Goes straight to the EKAS team — no list, no spam.
                </p>
              </div>
            )}

            {contactSent && (
              <div className="px-5 md:px-6 py-6 border-t border-border bg-[oklch(0.985_0.003_255)] motion-safe:animate-[ekasreveal_0.42s_cubic-bezier(0.23,1,0.32,1)_both]">
                <div className="flex items-start gap-3">
                  <span className="shrink-0 grid place-items-center w-9 h-9 rounded-full bg-[oklch(0.62_0.17_155_/_0.12)] ring-1 ring-[oklch(0.62_0.17_155_/_0.25)]">
                    <CheckCircle2 className="w-5 h-5 text-[oklch(0.62_0.17_155)]" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-[15px] tracking-tight text-navy">
                      Thank you{contact.name ? `, ${contact.name.split(" ")[0]}` : ""} — we appreciate your time.
                    </div>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">
                      Your details and this conversation are now with the EKAS team. A specialist will
                      reach out personally to scope a 60-day pilot on your operation — no automated drip,
                      no sales list. If anything changes in the meantime, just reply to their email.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-[11.5px] text-muted-foreground">
                      <span className="inline-flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.55_0.2_255)]" />
                        Kept with the EKAS team — never sold or shared.
                      </span>
                      <button
                        onClick={restartConversation}
                        className="inline-flex items-center gap-1 font-semibold text-[oklch(0.55_0.2_255)] underline-offset-2 hover:underline"
                      >
                        <RotateCcw className="w-3 h-3" /> Start another conversation
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Input */}
            {!contactSent && (
              <div className="flex gap-2.5 px-4 md:px-5 py-4 border-t border-border bg-white">
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      send();
                    }
                  }}
                  placeholder={busy ? "EKAS is replying…" : "Type your reply…"}
                  disabled={busy}
                  aria-label="Type your reply"
                  className="flex-1 rounded-xl border border-[oklch(0.88_0.008_255)] bg-white px-3.5 py-3 text-sm text-foreground outline-none transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-[oklch(0.55_0.2_255)] focus:ring-2 focus:ring-[oklch(0.55_0.2_255_/_0.25)] disabled:opacity-70"
                />
                <button
                  onClick={send}
                  disabled={busy || !input.trim()}
                  aria-label="Send message"
                  aria-busy={busy}
                  className="inline-flex items-center justify-center gap-2 rounded-xl px-5 text-sm font-semibold transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] disabled:cursor-not-allowed active:enabled:scale-[0.97] hover:enabled:-translate-y-0.5 text-white disabled:text-muted-foreground bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] disabled:bg-none disabled:bg-secondary shadow-lg shadow-[oklch(0.55_0.2_255_/_0.2)] disabled:shadow-none"
                >
                  {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  <span className="hidden sm:inline">{busy ? "Sending" : "Send"}</span>
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-center text-[12px] text-muted-foreground">
            This assistant qualifies fit honestly — including telling you when EKAS isn't the right fit yet.
          </p>
          <p className="mt-2 flex items-center justify-center gap-1.5 text-center text-[11.5px] text-muted-foreground">
            <ShieldCheck className="w-3.5 h-3.5 text-[oklch(0.55_0.2_255)] shrink-0" aria-hidden="true" />
            <span>
              Your conversation stays with the EKAS team and is used only to scope a potential pilot. We never sell or share it.
            </span>
          </p>
        </div>
      </section>

      <ToolBottomCTA
        heading="Prefer to talk to a person?"
        body="If you'd rather skip the chat, request a demo and a member of the EKAS team will reach out to scope a 60-day pilot on your operation."
        secondaryHref="/resources/pilot-scope"
        secondaryLabel="Configure a Pilot Scope"
      />
    </div>
  );
}

/* EKAS product mark — same geometry as the site header logo */
function EkasMark() {
  return (
    <svg className="h-9 w-9 shrink-0" viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="17" stroke="oklch(0.55 0.2 255)" strokeWidth="1.5" strokeDasharray="3 2.5" opacity="0.6" />
      <rect x="11" y="11" width="7.5" height="7.5" rx="2" fill="oklch(0.55 0.2 255)" />
      <rect x="21.5" y="11" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.55 0.2 255)" strokeWidth="0.8" />
      <rect x="11" y="21.5" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.55 0.2 255)" strokeWidth="0.8" />
      <rect x="21.5" y="21.5" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.55 0.2 255)" strokeWidth="0.8" />
      <circle cx="20" cy="20" r="1.8" fill="oklch(0.55 0.2 255)" />
      <circle cx="20" cy="11" r="1.2" fill="oklch(0.55 0.2 255)" />
      <circle cx="29" cy="20" r="1.2" fill="oklch(0.55 0.2 255)" />
    </svg>
  );
}

function Bubble({ role, text, at }: { role: "assistant" | "user"; text: string; at: number }) {
  const isUser = role === "user";
  return (
    <div
      className={`group flex w-full shrink-0 flex-col ${isUser ? "items-end" : "items-start"} motion-safe:animate-[ekasrise_0.36s_cubic-bezier(0.23,1,0.32,1)_both]`}
      style={{ ["--ekas-x" as string]: isUser ? "10px" : "-10px" }}
    >
      <div
        className={`w-fit max-w-[80%] px-3.5 py-2.5 text-sm leading-relaxed whitespace-pre-wrap break-words ${
          isUser
            ? "text-white bg-gradient-to-br from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] shadow-[0_6px_16px_-8px_oklch(0.55_0.2_255_/_0.5)] rounded-[14px_14px_4px_14px]"
            : "text-foreground bg-white border border-border shadow-[0_1px_2px_oklch(0.15_0.03_255_/_0.04)] rounded-[14px_14px_14px_4px]"
        }`}
      >
        {text}
      </div>
      <span
        className={`mt-1 px-1 text-[10.5px] tabular-nums text-muted-foreground opacity-0 max-h-0 overflow-hidden transition-all duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:opacity-70 group-hover:max-h-5 group-focus-within:opacity-70 group-focus-within:max-h-5 ${
          isUser ? "text-right" : "text-left"
        }`}
      >
        {isUser ? "You" : "EKAS"} · {fmtTime(at)}
      </span>
      <style>{`@keyframes ekasrise{from{opacity:0;transform:translate3d(var(--ekas-x,0),8px,0) scale(0.97)}to{opacity:1;transform:translate3d(0,0,0) scale(1)}}@keyframes ekasreveal{from{opacity:0;transform:translate3d(0,10px,0)}to{opacity:1;transform:translate3d(0,0,0)}}`}</style>
    </div>
  );
}

function Typing() {
  return (
    <div className="flex w-full shrink-0 justify-start items-end gap-2 motion-safe:animate-[ekasrise_0.36s_cubic-bezier(0.23,1,0.32,1)_both]">
      <span
        className="shrink-0 grid place-items-center w-7 h-7 rounded-full bg-[oklch(0.55_0.2_255_/_0.1)] ring-1 ring-[oklch(0.55_0.2_255_/_0.2)]"
        aria-hidden="true"
      >
        <span className="w-2 h-2 rounded-sm bg-[oklch(0.55_0.2_255)]" />
      </span>
      <div
        className="px-4 py-3 rounded-[14px_14px_14px_4px] bg-[oklch(0.975_0.004_255)] border border-border flex items-center gap-1.5"
        role="status"
        aria-label="EKAS is typing"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="w-1.5 h-1.5 rounded-full bg-[oklch(0.55_0.2_255)] motion-safe:animate-[ekasbounce_1.1s_infinite_ease-in-out]"
            style={{ animationDelay: `${i * 0.16}s` }}
          />
        ))}
        <style>{`@keyframes ekasbounce{0%,70%,100%{opacity:0.3;transform:translateY(0)}35%{opacity:1;transform:translateY(-3px)}}`}</style>
      </div>
    </div>
  );
}

function Field({ placeholder, value, onChange }: { placeholder: string; value: string; onChange: (v: string) => void }) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={placeholder}
      className="rounded-lg border border-[oklch(0.88_0.008_255)] bg-white px-3 py-2.5 text-[13px] text-foreground outline-none transition-all duration-150 ease-[cubic-bezier(0.23,1,0.32,1)] focus:border-[oklch(0.55_0.2_255)] focus:ring-2 focus:ring-[oklch(0.55_0.2_255_/_0.25)]"
    />
  );
}
