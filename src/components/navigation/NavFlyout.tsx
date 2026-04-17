"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ReactNode } from "react";
import { NavChild } from "@/config/navigation";

interface NavFlyoutProps {
  children: NavChild[];
  isOpen: boolean;
  parentLabel: string;
  parentHref: string;
}

/**
 * Desktop fly-out submenu component
 * Opens on hover/click for navigation items with children
 * Includes keyboard navigation support
 */
const NavFlyout = ({ children, isOpen, parentLabel, parentHref }: NavFlyoutProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{
            duration: 0.15,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="absolute left-0 top-full mt-2 z-50"
          role="region"
          aria-label={`${parentLabel} submenu`}
          style={{
            minWidth: 220,
            maxWidth: 280,
          }}
        >
          <div
            style={{
              background: "rgba(8, 12, 22, 0.98)",
              backdropFilter: "blur(24px)",
              WebkitBackdropFilter: "blur(24px)",
              border: "1px solid rgba(0, 200, 255, 0.08)",
              borderRadius: 8,
              padding: 24,
              boxShadow: "0 8px 32px rgba(0, 0, 0, 0.4)",
            }}
          >
            {/* Child Links */}
            <ul className="space-y-3">
              {children.map((child) => (
                <li key={child.href}>
                  <Link
                    href={child.href}
                    className="block transition-colors duration-150"
                    style={{
                      fontSize: 14,
                      lineHeight: 1.5,
                      color: "#e8f4ff",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "#00c8ff";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "#e8f4ff";
                    }}
                  >
                    <div className="font-medium">{child.label}</div>
                    {child.description && (
                      <div
                        className="mt-1"
                        style={{
                          fontSize: 12,
                          color: "#8A9BBF",
                          lineHeight: 1.4,
                        }}
                      >
                        {child.description}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Optional "View All" link */}
            {children.length > 3 && (
              <>
                <div
                  className="my-4"
                  style={{
                    height: 1,
                    background: "rgba(255, 255, 255, 0.06)",
                  }}
                />
                <Link
                  href={parentHref}
                  className="block text-center transition-colors duration-150"
                  style={{
                    fontSize: 13,
                    color: "#8A9BBF",
                    fontWeight: 500,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = "#00c8ff";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = "#8A9BBF";
                  }}
                >
                  View All {parentLabel} →
                </Link>
              </>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default NavFlyout;
