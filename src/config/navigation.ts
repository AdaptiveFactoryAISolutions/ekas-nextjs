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
    label: "Platform",
    href: "/platform",
    children: [
      {
        label: "AI Assistant",
        href: "/platform/ai-assistant",
        description: "Conversational interface with grounded answers",
      },
      {
        label: "Manufacturing Intelligence",
        href: "/platform/manufacturing-intelligence",
        description: "Governed metrics with full provenance",
      },
      {
        label: "Data Connections",
        href: "/platform/data-connections",
        description: "Read-only integration with MES and ERP systems",
      },
      {
        label: "Reporting & Analytics",
        href: "/platform/reporting-analytics",
        description: "Production-ready dashboards and reports",
      },
    ],
  },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "Downtime Reduction",
        href: "/solutions/downtime-reduction",
        description: "Root cause analysis and downtime attribution",
      },
      {
        label: "Scrap & Quality Visibility",
        href: "/solutions/scrap-quality-visibility",
        description: "Quality loss tracking and FPY monitoring",
      },
      {
        label: "Capacity & Throughput",
        href: "/solutions/capacity-throughput",
        description: "Capacity planning with actual OEE data",
      },
      {
        label: "Cost Driver Analysis",
        href: "/solutions/cost-driver-analysis",
        description: "Cost attribution by workcenter and shift",
      },
      {
        label: "Multi-Site Performance",
        href: "/solutions/multi-site-performance",
        description: "Portfolio-level performance comparison",
      },
    ],
  },
  {
    label: "Roles",
    href: "/roles",
    // No children - single page with inline role sections
  },
  {
    label: "Industries",
    href: "/industries",
    children: [
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
        label: "Aerospace",
        href: "/industries/aerospace",
        description: "Precision manufacturing with strict traceability",
      },
      {
        label: "Medical Devices",
        href: "/industries/medical-devices",
        description: "Regulated environments with compliance requirements",
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
    // No children - single page with hash-link subsections
  },
  {
    label: "Resources",
    href: "/resources",
    children: [
      {
        label: "FAQs",
        href: "/resources/faqs",
        description: "Frequently asked questions",
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    children: [
      {
        label: "About Us",
        href: "/about",
        description: "Built from plant operations experience",
      },
      {
        label: "Founder",
        href: "/about/founder",
        description: "Why EKAS exists",
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
