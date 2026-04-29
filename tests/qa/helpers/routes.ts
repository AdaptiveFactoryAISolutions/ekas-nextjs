/**
 * Canonical 31-route list — must stay in sync with src/app/sitemap.ts.
 *
 * Why a duplicate of sitemap.ts: sitemap.ts is a Next.js MetadataRoute
 * function that requires the Next runtime to import. For Playwright tests
 * we keep a parallel literal list. If sitemap.ts changes, this file must
 * be updated to match (Suite 1 will catch drift via 200-checks).
 */

export const ROUTES = [
  '/',
  '/why-ekas',
  '/platform',
  '/platform/ai-assistant',
  '/platform/manufacturing-intelligence',
  '/platform/financial-intelligence',
  '/platform/document-intelligence',
  '/platform/data-connections',
  '/platform/reporting-analytics',
  '/solutions',
  '/solutions/downtime-reduction',
  '/solutions/scrap-quality-visibility',
  '/solutions/capacity-throughput',
  '/solutions/cost-driver-analysis',
  '/solutions/multi-site-performance',
  '/solutions/shift-handoff',
  '/industries',
  '/industries/metal-stamping',
  '/industries/automotive',
  '/industries/industrial-manufacturing',
  '/roles',
  '/security',
  '/security/governance',
  '/security/data-handling',
  '/security/architecture',
  '/technical-overview',
  '/resources',
  '/resources/faqs',
  '/about',
  '/about/founder',
  '/demo',
] as const;

export type Route = (typeof ROUTES)[number];

/**
 * Redirects configured in next.config.js.
 * Format: [source, destination, expectedStatus]
 */
export const REDIRECTS = [
  ['/industries/aerospace', '/industries', 308],
  ['/industries/medical-devices', '/industries', 308],
] as const;

/**
 * Subset for representative-page tests (Suite 5, Suite 10).
 * Chosen to span hub/leaf pages and the architectural variety.
 */
export const REPRESENTATIVE_ROUTES = [
  '/',
  '/why-ekas',
  '/industries',
  '/industries/metal-stamping',
  '/platform',
  '/platform/ai-assistant',
  '/solutions/downtime-reduction',
  '/technical-overview',
  '/security',
  '/about/founder',
] as const;

/**
 * Pages used for responsive-layout breakpoint testing.
 */
export const LAYOUT_ROUTES = [
  '/',
  '/why-ekas',
  '/platform',
  '/industries',
] as const;

/**
 * Domains that aggressively block automated HEAD requests.
 * External-link suite skips these and reports them for manual review.
 */
export const RATE_LIMIT_DOMAINS = [
  'linkedin.com',
  'twitter.com',
  'x.com',
  't.co',
];
