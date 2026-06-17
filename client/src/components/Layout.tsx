import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { useContactModal } from "./ContactModal";

/* ─── Nav Link Data ─── */
const platformLinks = [
  { href: "/platform", label: "Platform Overview", desc: "Governed manufacturing decision-intelligence platform" },
  { href: "/roles", label: "Role-Based Views", desc: "One platform — the view your role needs" },
  { href: "/technical-overview", label: "Technical Overview", desc: "Architecture, governance, and security" },
];

const solutionLinks = [
  { href: "/solutions", label: "Use Cases", desc: "Starting points for governed decisions" },
  { href: "/industries", label: "Industries", desc: "Metal Stamping, Automotive, Industrial" },
  { href: "/industries/metal-stamping", label: "Metal Stamping", desc: "Built inside a precision stamping operation", indent: true },
  { href: "/industries/automotive", label: "Automotive", desc: "Metrics that survive a Tier-1 review", indent: true },
  { href: "/industries/industrial-manufacturing", label: "Industrial Manufacturing", desc: "One governed standard, multi-site", indent: true },
];

const resourceLinks = [
  { href: "/resources", label: "Resources Hub", desc: "Everything to evaluate EKAS without a sales call" },
  { href: "/resources/roi-calculator", label: "ROI Calculator", desc: "Model the payback on your own numbers" },
  { href: "/resources/faqs", label: "FAQs", desc: "Product, deployment, security, and commercial" },
  { href: "/technical-overview", label: "Technical Overview", desc: "Architecture, governance, and security" },
];

const companyLinks = [
  { href: "/why-ekas", label: "Why EKAS Is Different", desc: "Governed decisions vs. dashboards vs. generic AI" },
  { href: "/why-ekas#approach", label: "Engagement Model", desc: "Discovery → Pilot Readiness → Pilot → Subscription" },
  { href: "/why-ekas#faq", label: "Executive FAQ", desc: "Decision quality, evidence discipline, governance" },
];

type NavLink = { href: string; label: string; desc: string; indent?: boolean };

function NavDropdown({ label, links, open, onOpen, onClose }: { label: string; links: NavLink[]; open: boolean; onOpen: () => void; onClose: () => void }) {
  return (
    <div className="relative" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className="flex items-center gap-1.5 text-[13px] font-medium text-foreground/70 hover:text-foreground transition-colors py-2 tracking-wide">
        {label}
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
            className="absolute top-full left-0 mt-1 w-80 bg-white border border-border rounded-xl shadow-2xl shadow-black/8 overflow-hidden z-50"
          >
            <div className="p-2">
              {links.map((link, i) => (
                <Link
                  key={`${link.href}-${i}`}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg hover:bg-secondary transition-colors group/item ${link.indent ? "ml-4" : ""}`}
                >
                  <span className={`text-sm font-medium text-foreground group-hover/item:text-[oklch(0.55_0.2_255)] transition-colors ${link.indent ? "text-xs" : ""}`}>
                    {link.indent && <ChevronRight className="w-3 h-3 inline mr-1 text-muted-foreground" />}
                    {link.label}
                  </span>
                  <span className="block text-xs text-muted-foreground mt-0.5">{link.desc}</span>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ─── Mobile Accordion ─── */
function MobileSection({ title, links }: { title: string; links: NavLink[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-2 text-sm font-medium text-foreground">
        {title}
        <ChevronDown className={`w-4 h-4 text-muted-foreground transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pl-4 pb-2 space-y-1">
              {links.filter(l => !l.indent).map((link, i) => (
                <Link key={`${link.href}-${i}`} href={link.href} className="block py-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors">
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [location] = useLocation();
  const { open: openContact } = useContactModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-[oklch(0.48_0.2_255)] via-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] text-white text-center py-2.5 px-4 text-xs font-medium tracking-wide">
        <span>EKAS — Enterprise Knowledge & Analytics System</span>
        <span className="mx-2 text-white/30">|</span>
        <Link href="/platform" className="underline hover:no-underline font-semibold">
          See the Evidence-to-Action Workflow →
        </Link>
      </div>

      {/* Navigation */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "bg-white/98 backdrop-blur-xl border-b border-border shadow-sm" : "bg-white/95 backdrop-blur-md"}`}>
        <div className="container flex items-center justify-between h-[72px]">
          {/* EKAS Product Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <svg className="h-9 w-9 shrink-0" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="oklch(0.55 0.2 255)" strokeWidth="1.5" strokeDasharray="3 2.5" opacity="0.6" />
              <rect x="11" y="11" width="7.5" height="7.5" rx="2" fill="oklch(0.55 0.2 255)" />
              <rect x="21.5" y="11" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.55 0.2 255)" strokeWidth="0.8" />
              <rect x="11" y="21.5" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.55 0.2 255)" strokeWidth="0.8" />
              <rect x="21.5" y="21.5" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.55 0.2 255)" strokeWidth="0.8" />
              <circle cx="20" cy="20" r="1.8" fill="oklch(0.55 0.2 255)" />
              <circle cx="20" cy="11" r="1.2" fill="oklch(0.55 0.2 255)" />
              <circle cx="29" cy="20" r="1.2" fill="oklch(0.55 0.2 255)" />
            </svg>
            <div className="h-7 w-px bg-[oklch(0.55_0.2_255)] opacity-40" />
            <div className="flex items-baseline">
              <span className="font-display text-2xl font-extrabold tracking-tight text-[oklch(0.55_0.2_255)]">E</span>
              <span className="font-display text-2xl font-extrabold tracking-tight text-foreground">KAS</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-7">
            <NavDropdown
              label="Platform"
              links={platformLinks}
              open={openDropdown === "platform"}
              onOpen={() => setOpenDropdown("platform")}
              onClose={() => setOpenDropdown(null)}
            />
            <NavDropdown
              label="Solutions"
              links={solutionLinks}
              open={openDropdown === "solutions"}
              onOpen={() => setOpenDropdown("solutions")}
              onClose={() => setOpenDropdown(null)}
            />
            <NavDropdown
              label="Resources"
              links={resourceLinks}
              open={openDropdown === "resources"}
              onOpen={() => setOpenDropdown("resources")}
              onClose={() => setOpenDropdown(null)}
            />
            <NavDropdown
              label="Company"
              links={companyLinks}
              open={openDropdown === "company"}
              onOpen={() => setOpenDropdown("company")}
              onClose={() => setOpenDropdown(null)}
            />
          </nav>

          {/* Primary CTA */}
          <div className="hidden lg:flex items-center">
            <button onClick={openContact} className="px-6 py-2.5 text-sm font-semibold bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] text-white rounded-lg hover:shadow-xl hover:shadow-[oklch(0.55_0.2_255_/_0.3)] hover:-translate-y-0.5 transition-all duration-200 active:scale-[0.97] flex items-center gap-2 shadow-lg shadow-[oklch(0.55_0.2_255_/_0.15)]">
              Request a Demo <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Toggle */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden p-2 text-foreground">
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden border-t border-border bg-white overflow-hidden"
            >
              <div className="container py-6 space-y-2">
                <MobileSection title="Platform" links={platformLinks} />
                <MobileSection title="Solutions" links={solutionLinks} />
                <MobileSection title="Resources" links={resourceLinks} />
                <MobileSection title="Company" links={companyLinks} />
                <div className="pt-4 border-t border-border flex flex-col gap-3">
                  <button onClick={openContact} className="block text-center px-4 py-3 text-sm font-semibold bg-gradient-to-r from-[oklch(0.55_0.2_255)] to-[oklch(0.48_0.2_255)] text-white rounded-lg">
                    Request a Demo
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Content */}
      <main>{children}</main>

      {/* Footer */}
      <footer className="bg-[oklch(0.12_0.03_255)] text-white pt-20 pb-8 relative">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.55_0.2_255_/_0.4)] to-transparent" />
        <div className="container">
          <div className="grid md:grid-cols-5 gap-10 mb-12">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="mb-3 flex items-center gap-2.5">
                <svg className="h-8 w-8 shrink-0" viewBox="0 0 40 40" fill="none">
                  <circle cx="20" cy="20" r="17" stroke="oklch(0.7 0.15 210)" strokeWidth="1.5" strokeDasharray="3 2.5" opacity="0.5" />
                  <rect x="11" y="11" width="7.5" height="7.5" rx="2" fill="oklch(0.7 0.15 210)" />
                  <rect x="21.5" y="11" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.7 0.15 210)" strokeWidth="0.8" />
                  <rect x="11" y="21.5" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.7 0.15 210)" strokeWidth="0.8" />
                  <rect x="21.5" y="21.5" width="7.5" height="7.5" rx="2" fill="oklch(0.25 0.05 255)" stroke="oklch(0.7 0.15 210)" strokeWidth="0.8" />
                  <circle cx="20" cy="20" r="1.8" fill="oklch(0.7 0.15 210)" />
                  <circle cx="20" cy="11" r="1.2" fill="oklch(0.7 0.15 210)" />
                  <circle cx="29" cy="20" r="1.2" fill="oklch(0.7 0.15 210)" />
                </svg>
                <div className="h-6 w-px bg-white/20" />
                <div className="flex items-baseline">
                  <span className="font-display text-xl font-extrabold tracking-tight text-[oklch(0.7_0.15_210)]">E</span>
                  <span className="font-display text-xl font-extrabold tracking-tight text-white/90">KAS</span>
                </div>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-[11px] text-white/35">by</span>
                <img
                  src="https://dkcto6vm4oej9.cloudfront.net/manus-storage/logo-white-transparent-500w_e898b30d.png"
                  alt="Adaptive Factory AI Solutions"
                  className="h-6 w-auto opacity-50"
                />
              </div>
              <p className="text-sm text-white/50 leading-relaxed">
                Governed manufacturing decision intelligence.
              </p>
            </div>
            {/* Platform */}
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/80 mb-4">Platform</h4>
              <div className="space-y-2.5">
                <Link href="/platform" className="block text-sm text-white/50 hover:text-white transition-colors">Platform Overview</Link>
                <Link href="/roles" className="block text-sm text-white/50 hover:text-white transition-colors">Role-Based Views</Link>
                <Link href="/technical-overview" className="block text-sm text-white/50 hover:text-white transition-colors">Technical Overview</Link>
              </div>
            </div>
            {/* Solutions */}
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/80 mb-4">Solutions</h4>
              <div className="space-y-2.5">
                <Link href="/solutions" className="block text-sm text-white/50 hover:text-white transition-colors">Use Cases</Link>
                <Link href="/industries/metal-stamping" className="block text-sm text-white/50 hover:text-white transition-colors">Metal Stamping</Link>
                <Link href="/industries/automotive" className="block text-sm text-white/50 hover:text-white transition-colors">Automotive</Link>
                <Link href="/industries/industrial-manufacturing" className="block text-sm text-white/50 hover:text-white transition-colors">Industrial Manufacturing</Link>
              </div>
            </div>
            {/* Resources */}
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/80 mb-4">Resources</h4>
              <div className="space-y-2.5">
                <Link href="/resources" className="block text-sm text-white/50 hover:text-white transition-colors">Resources Hub</Link>
                <Link href="/resources/roi-calculator" className="block text-sm text-white/50 hover:text-white transition-colors">ROI Calculator</Link>
                <Link href="/resources/faqs" className="block text-sm text-white/50 hover:text-white transition-colors">FAQs</Link>
              </div>
            </div>
            {/* Company */}
            <div>
              <h4 className="font-display text-xs font-semibold uppercase tracking-[0.12em] text-white/80 mb-4">Company</h4>
              <div className="space-y-2.5">
                <Link href="/why-ekas" className="block text-sm text-white/50 hover:text-white transition-colors">Why EKAS Is Different</Link>
                <Link href="/why-ekas#approach" className="block text-sm text-white/50 hover:text-white transition-colors">Engagement Model</Link>
                <Link href="/why-ekas#faq" className="block text-sm text-white/50 hover:text-white transition-colors">Executive FAQ</Link>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <p className="text-xs text-white/40">&copy; {new Date().getFullYear()} Adaptive Factory AI Solutions. All rights reserved.</p>
              <Link href="/privacy" className="text-xs text-white/40 hover:text-white/70 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="text-xs text-white/40 hover:text-white/70 transition-colors">Terms of Service</Link>
            </div>
            <p className="text-xs text-white/40 max-w-lg text-right">EKAS does not claim ROI, EBITDA, dollar savings, margin impact, revenue impact, or payback without a governed cost model. Demo examples use representative manufacturing data.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
