"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { NavItem } from "@/config/navigation";
import { usePathname } from "next/navigation";

interface MobileNavAccordionProps {
  item: NavItem;
  onLinkClick: () => void;
}

/**
 * Mobile accordion navigation component
 * Expandable sections for nav items with children
 * Direct links for nav items without children
 */
const MobileNavAccordion = ({ item, onLinkClick }: MobileNavAccordionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const pathname = usePathname();
  const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
  const hasChildren = Boolean(item.children && item.children.length > 0);

  // If no children, render as direct link
  if (!hasChildren) {
    return (
      <Link
        href={item.href}
        className="block py-3 text-base font-medium transition-colors"
        style={{
          color: isActive ? "#00c8ff" : "#e8f4ff",
        }}
        onClick={onLinkClick}
      >
        {item.label}
      </Link>
    );
  }

  // If has children, render as accordion
  return (
    <div>
      {/* Accordion Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between py-3 text-base font-medium transition-colors"
        style={{
          color: isActive ? "#00c8ff" : "#e8f4ff",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
        }}
        aria-expanded={isExpanded}
        aria-controls={`mobile-accordion-${item.label}`}
      >
        <span>{item.label}</span>
        <motion.div
          animate={{ rotate: isExpanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      {/* Accordion Content */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            id={`mobile-accordion-${item.label}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            style={{ overflow: "hidden" }}
            role="region"
            aria-label={`${item.label} submenu`}
          >
            <div className="pb-2">
              {item.children?.map((child) => (
                <Link
                  key={child.href}
                  href={child.href}
                  className="block py-3 pl-6 text-sm transition-colors"
                  style={{
                    color: pathname === child.href ? "#00c8ff" : "#8A9BBF",
                  }}
                  onClick={onLinkClick}
                  onTouchStart={(e) => {
                    e.currentTarget.style.color = "#00c8ff";
                  }}
                  onTouchEnd={(e) => {
                    if (pathname !== child.href) {
                      e.currentTarget.style.color = "#8A9BBF";
                    }
                  }}
                >
                  {child.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileNavAccordion;
