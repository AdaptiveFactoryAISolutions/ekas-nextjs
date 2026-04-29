import type { MetadataRoute } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://ekas.adaptivefactory.net";

const ROUTES = [
  { path: "/", priority: 1.0 },
  { path: "/why-ekas", priority: 0.9 },
  { path: "/platform", priority: 0.9 },
  { path: "/platform/ai-assistant", priority: 0.7 },
  { path: "/platform/manufacturing-intelligence", priority: 0.7 },
  { path: "/platform/financial-intelligence", priority: 0.7 },
  { path: "/platform/document-intelligence", priority: 0.7 },
  { path: "/platform/data-connections", priority: 0.6 },
  { path: "/platform/reporting-analytics", priority: 0.6 },
  { path: "/solutions", priority: 0.9 },
  { path: "/solutions/downtime-reduction", priority: 0.7 },
  { path: "/solutions/scrap-quality-visibility", priority: 0.7 },
  { path: "/solutions/capacity-throughput", priority: 0.7 },
  { path: "/solutions/cost-driver-analysis", priority: 0.7 },
  { path: "/solutions/multi-site-performance", priority: 0.7 },
  { path: "/solutions/shift-handoff", priority: 0.7 },
  { path: "/industries", priority: 0.8 },
  { path: "/industries/metal-stamping", priority: 0.7 },
  { path: "/industries/automotive", priority: 0.7 },
  { path: "/industries/industrial-manufacturing", priority: 0.7 },
  { path: "/roles", priority: 0.7 },
  { path: "/security", priority: 0.7 },
  { path: "/security/governance", priority: 0.6 },
  { path: "/security/data-handling", priority: 0.6 },
  { path: "/security/architecture", priority: 0.6 },
  { path: "/technical-overview", priority: 0.7 },
  { path: "/resources", priority: 0.6 },
  { path: "/resources/faqs", priority: 0.6 },
  { path: "/about", priority: 0.6 },
  { path: "/about/founder", priority: 0.5 },
  { path: "/demo", priority: 0.8 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map(({ path, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: "weekly" as const,
    priority,
  }));
}
