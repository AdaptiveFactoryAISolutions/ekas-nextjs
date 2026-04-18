/**
 * EKAS Navigation Configuration
 * Central source of truth for all site navigation
 *
 * Last updated: 2026-04-17
 * Specification: docs/navigation_complete_specification.md
 */

export interface NavChild {
  label: string;
  href: string;
  description?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavChild[];
}

/**
 * Main site navigation configuration
 * Used by both desktop fly-out and mobile accordion navigation
 */
export const navigationConfig: NavItem[] = [
  {
    label: "Why EKAS",
    href: "/why-ekas",
  },
  {
    label: "Platform",
    href: "/platform",
    children: [
      {
        label: "Platform Overview",
        href: "/platform",
        description: "Manufacturing AI portfolio built on governed data",
      },
      {
        label: "AI Assistant",
        href: "/platform/ai-assistant",
        description: "Conversational interface with full provenance",
      },
      {
        label: "Manufacturing Intelligence",
        href: "/platform/manufacturing-intelligence",
        description: "91 governed metrics across ISA-95 hierarchy",
      },
      {
        label: "Financial Intelligence",
        href: "/platform/financial-intelligence",
        description: "Cost variance from confirmed production data",
      },
      {
        label: "Document Intelligence",
        href: "/platform/document-intelligence",
        description: "Extract and query manufacturing documents",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Solutions Overview",
        href: "/solutions",
        description: "Business outcomes from production intelligence",
      },
      {
        label: "Downtime Reduction",
        href: "/solutions/downtime-reduction",
        description: "Faster visibility into downtime patterns",
      },
      {
        label: "Scrap & Quality Visibility",
        href: "/solutions/scrap-quality-visibility",
        description: "Surface defect patterns before margin erosion",
      },
      {
        label: "Cost Driver Analysis",
        href: "/solutions/cost-driver-analysis",
        description: "Cost attribution by workcenter and shift",
      },
      {
        label: "Shift Handoff",
        href: "/solutions/shift-handoff",
        description: "Structured handoffs from production data",
      },
    ],
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
      {
        label: "Industries Overview",
        href: "/industries",
        description: "Discrete manufacturing with regulated quality",
      },
      {
        label: "Metal Stamping",
        href: "/industries/metal-stamping",
        description: "Press OEE, die performance, and material yield",
      },
      {
        label: "Automotive",
        href: "/industries/automotive",
        description: "IATF 16949 traceability and supplier requirements",
      },
      {
        label: "Industrial Manufacturing",
        href: "/industries/industrial-manufacturing",
        description: "General discrete manufacturing operations",
      },
    ],
  },
  {
    label: "Security",
    href: "/security",
    children: [
      {
        label: "Security Overview",
        href: "/security",
        description: "Enterprise security with cloud or air-gapped options",
      },
      {
        label: "Architecture",
        href: "/security/architecture",
        description: "Nine-stage security pipeline and deployment options",
      },
      {
        label: "Data Handling",
        href: "/security/data-handling",
        description: "How production data is collected and protected",
      },
      {
        label: "Governance",
        href: "/security/governance",
        description: "Versioned metrics and full data provenance",
      },
    ],
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "Technical Overview",
        href: "/technical-overview",
        description: "How EKAS works from question to provenance",
      },
      {
        label: "FAQs",
        href: "/resources/faqs",
        description: "Common questions about capabilities and deployment",
      },
      {
        label: "Roles",
        href: "/roles",
        description: "How EKAS serves each decision-maker",
      },
    ],
  },
  {
    label: "About",
    href: "/about",
    children: [
      {
        label: "About",
        href: "/about",
        description: "Built by someone who understands manufacturing",
      },
      {
        label: "Founder",
        href: "/about/founder",
        description: "28 years in manufacturing operations",
      },
    ],
  },
];

/**
 * Helper to check if a nav item has children (fly-out)
 */
export const hasChildren = (item: NavItem): boolean => {
  return Boolean(item.children && item.children.length > 0);
};

/**
 * Helper to find a nav item by href
 */
export const findNavItemByHref = (href: string): NavItem | undefined => {
  return navigationConfig.find((item) => item.href === href);
};

/**
 * Helper to check if current path matches nav item
 */
export const isActiveNavItem = (itemHref: string, currentPath: string): boolean => {
  if (itemHref === "/") {
    return currentPath === "/";
  }
  return currentPath.startsWith(itemHref);
};
