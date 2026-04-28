"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { navigationConfig, hasChildren, isActiveNavItem } from "@/config/navigation";
import NavFlyout from "@/components/navigation/NavFlyout";
import MobileNavAccordion from "@/components/navigation/MobileNavAccordion";

interface NavigationProps {
  onDemoClick: () => void;
}

const Navigation = ({ onDemoClick }: NavigationProps) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openFlyout, setOpenFlyout] = useState<string | null>(null);
  const pathname = usePathname();
  const flyoutTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle scroll effects
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenFlyout(null);
  }, [pathname]);

  // Close fly-out when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenFlyout(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle fly-out hover with delay
  const handleMouseEnter = (itemLabel: string, itemHasChildren: boolean) => {
    if (!itemHasChildren) return;

    // Clear any pending close timeout
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }

    // Open after small delay to prevent accidental triggers
    flyoutTimeoutRef.current = setTimeout(() => {
      setOpenFlyout(itemLabel);
    }, 150);
  };

  const handleMouseLeave = () => {
    // Clear any pending open timeout
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }

    // Close after grace period
    flyoutTimeoutRef.current = setTimeout(() => {
      setOpenFlyout(null);
    }, 200);
  };

  const handleFlyoutMouseEnter = () => {
    // Keep flyout open when hovering over it
    if (flyoutTimeoutRef.current) {
      clearTimeout(flyoutTimeoutRef.current);
      flyoutTimeoutRef.current = null;
    }
  };

  // Handle keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent, itemLabel: string, itemHasChildren: boolean) => {
    if (event.key === "Escape") {
      setOpenFlyout(null);
      return;
    }

    if (itemHasChildren && (event.key === "Enter" || event.key === " ")) {
      event.preventDefault();
      setOpenFlyout(openFlyout === itemLabel ? null : itemLabel);
    }
  };

  return (
    <nav
      ref={navRef}
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
          <Image src="/ekas-logo.svg" alt="EKAS" width={110} height={40} className="h-10" priority />
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-8">
          {navigationConfig.map((item) => {
            const itemHasChildren = hasChildren(item);
            const isActive = isActiveNavItem(item.href, pathname);
            const isFlyoutOpen = openFlyout === item.label;

            return (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item.label, itemHasChildren)}
                onMouseLeave={handleMouseLeave}
              >
                {itemHasChildren ? (
                  <>
                    <button
                      className="text-sm font-medium transition-colors duration-200"
                      style={{
                        color: isActive ? "#00c8ff" : "#e8f4ff",
                      }}
                      aria-expanded={isFlyoutOpen}
                      aria-haspopup="true"
                      onMouseEnter={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "#00c8ff";
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) {
                          e.currentTarget.style.color = "#e8f4ff";
                        }
                      }}
                      onKeyDown={(e) => handleKeyDown(e, item.label, itemHasChildren)}
                    >
                      {item.label}
                    </button>
                    <div onMouseEnter={handleFlyoutMouseEnter} onMouseLeave={handleMouseLeave}>
                      <NavFlyout
                        isOpen={isFlyoutOpen}
                        parentLabel={item.label}
                        parentHref={item.href}
                      >
                        {item.children!}
                      </NavFlyout>
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="text-sm font-medium transition-colors duration-200"
                    style={{
                      color: isActive ? "#00c8ff" : "#e8f4ff",
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#00c8ff";
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.color = "#e8f4ff";
                      }
                    }}
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
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
          aria-expanded={mobileOpen}
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
            <div className="container py-6 space-y-1">
              {navigationConfig.map((item) => (
                <MobileNavAccordion
                  key={item.href}
                  item={item}
                  onLinkClick={() => setMobileOpen(false)}
                />
              ))}

              <div className="pt-4 space-y-3 border-t border-white/10 mt-4">
                <button
                  onClick={() => {
                    setMobileOpen(false);
                    onDemoClick();
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
