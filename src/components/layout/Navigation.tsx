"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface NavItem {
  label: string;
  href: string;
}

const navItems: NavItem[] = [
  { label: "Platform", href: "/platform" },
  { label: "Solutions", href: "/solutions" },
  { label: "Roles", href: "/roles" },
  { label: "Industries", href: "/industries" },
  { label: "Security", href: "/security" },
  { label: "Resources", href: "/resources" },
  { label: "Company", href: "/about" },
];

interface NavigationProps {
  onDemoClick?: () => void;
}

const Navigation = ({ onDemoClick }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <nav
      className="fixed top-0 left-0 right-0 transition-all duration-300"
      style={{
        height: 80,
        zIndex: 100,
        background: scrolled ? "rgba(8, 12, 22, 0.95)" : "rgba(8, 12, 22, 0.4)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: scrolled ? "1px solid rgba(0,200,255,0.08)" : "1px solid transparent",
      }}
    >
      <div className="container h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0" aria-label="EKAS Homepage">
          <img src="/ekas-logo.svg" alt="EKAS" className="h-10" />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium transition-colors duration-200"
              style={{
                color: pathname === item.href ? "#00c8ff" : "#e8f4ff",
              }}
              onMouseEnter={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.color = "#00c8ff";
                }
              }}
              onMouseLeave={(e) => {
                if (pathname !== item.href) {
                  e.currentTarget.style.color = "#e8f4ff";
                }
              }}
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/platform"
            className="text-sm font-medium transition-colors duration-200"
            style={{ color: "#8A9BBF" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "#00c8ff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "#8A9BBF")}
          >
            See the Platform
          </Link>
          <button
            onClick={onDemoClick}
            className="btn-primary btn-sm"
          >
            Request a Demo
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 rounded-md transition-colors"
          style={{ color: "#e8f4ff" }}
          aria-label="Toggle mobile menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden overflow-hidden"
            style={{
              background: "rgba(8, 12, 22, 0.98)",
              backdropFilter: "blur(24px)",
              borderTop: "1px solid rgba(0,200,255,0.08)",
            }}
          >
            <div className="container py-6 space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block py-3 text-base font-medium transition-colors"
                  style={{
                    color: pathname === item.href ? "#00c8ff" : "#e8f4ff",
                  }}
                  onClick={() => setMobileOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 space-y-3 border-t border-white/10">
                <Link
                  href="/platform"
                  className="btn-ghost w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  See the Platform
                </Link>
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onDemoClick?.();
                  }}
                  className="btn-primary w-full justify-center"
                >
                  Request a Demo
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navigation;
