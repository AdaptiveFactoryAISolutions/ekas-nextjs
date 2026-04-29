/**
 * Per-page metadata regression tests
 *
 * Locks in the SEO improvements made on 2026-04-29:
 *   - Every public page must have a unique <title>.
 *   - Every public page must have its own og:title (not the home one).
 *   - Description present and reasonable length.
 *   - Canonical link tag points at the page's own path.
 *   - sitemap.xml and robots.txt are served.
 */

import { test, expect } from "@playwright/test";

const PUBLIC_ROUTES = [
  "/",
  "/about",
  "/about/founder",
  "/platform",
  "/platform/ai-assistant",
  "/platform/data-connections",
  "/platform/document-intelligence",
  "/platform/financial-intelligence",
  "/platform/manufacturing-intelligence",
  "/platform/reporting-analytics",
  "/solutions",
  "/solutions/capacity-throughput",
  "/solutions/cost-driver-analysis",
  "/solutions/downtime-reduction",
  "/solutions/multi-site-performance",
  "/solutions/scrap-quality-visibility",
  "/solutions/shift-handoff",
  "/industries",
  "/industries/automotive",
  "/industries/industrial-manufacturing",
  "/industries/metal-stamping",
  "/roles",
  "/security",
  "/security/architecture",
  "/security/data-handling",
  "/security/governance",
  "/resources",
  "/resources/faqs",
  "/why-ekas",
  "/technical-overview",
  "/demo",
] as const;

const HOME_TITLE = "EKAS by AdaptiveFactory — Manufacturing AI That Refuses to Guess";

async function getMeta(page: import("@playwright/test").Page) {
  const title = await page.title();
  const description = await page
    .locator('meta[name="description"]')
    .getAttribute("content");
  const ogTitle = await page
    .locator('meta[property="og:title"]')
    .getAttribute("content");
  const ogDescription = await page
    .locator('meta[property="og:description"]')
    .getAttribute("content");
  const canonical = await page
    .locator('link[rel="canonical"]')
    .getAttribute("href");
  return { title, description, ogTitle, ogDescription, canonical };
}

test.describe("Per-page metadata", () => {
  for (const route of PUBLIC_ROUTES) {
    test(`${route} has its own metadata`, async ({ page }) => {
      const resp = await page.goto(route);
      expect(resp?.status()).toBe(200);

      const meta = await getMeta(page);

      expect(meta.title, `${route}: <title> missing`).toBeTruthy();
      expect(meta.description, `${route}: description missing`).toBeTruthy();
      expect(meta.canonical, `${route}: canonical missing`).toBeTruthy();
      expect(meta.ogTitle, `${route}: og:title missing`).toBeTruthy();
      expect(meta.ogDescription, `${route}: og:description missing`).toBeTruthy();

      expect(meta.description!.length).toBeGreaterThanOrEqual(80);
      expect(meta.description!.length).toBeLessThanOrEqual(280);

      expect(meta.title).toContain("EKAS");

      // Non-home pages must not silently inherit the home title.
      if (route !== "/") {
        expect(meta.title, `${route}: still using home title`).not.toBe(HOME_TITLE);
        expect(
          meta.ogTitle,
          `${route}: og:title still using home og:title`,
        ).not.toBe(HOME_TITLE);
      }
    });
  }

  test("titles are unique across all routes", async ({ page }) => {
    test.setTimeout(180_000);
    const seen = new Map<string, string>();
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route);
      const title = await page.title();
      const collidingRoute = seen.get(title);
      expect(
        collidingRoute,
        `Duplicate title between ${route} and ${collidingRoute}: "${title}"`,
      ).toBeUndefined();
      seen.set(title, route);
    }
  });

  test("og:title is unique across all routes", async ({ page }) => {
    test.setTimeout(180_000);
    const seen = new Map<string, string>();
    for (const route of PUBLIC_ROUTES) {
      await page.goto(route);
      const ogTitle = await page
        .locator('meta[property="og:title"]')
        .getAttribute("content");
      expect(ogTitle).toBeTruthy();
      const colliding = seen.get(ogTitle!);
      expect(
        colliding,
        `Duplicate og:title between ${route} and ${colliding}: "${ogTitle}"`,
      ).toBeUndefined();
      seen.set(ogTitle!, route);
    }
  });
});

test.describe("SEO infrastructure", () => {
  test("sitemap.xml is served and lists routes", async ({ page }) => {
    const resp = await page.goto("/sitemap.xml");
    expect(resp?.status()).toBe(200);
    const body = await page.content();
    expect(body).toContain("<urlset");
    expect(body).toContain("/why-ekas");
    expect(body).toContain("/platform");
    expect(body).toContain("/solutions");
  });

  test("robots.txt is served and references sitemap", async ({ page }) => {
    const resp = await page.request.get("/robots.txt");
    expect(resp.status()).toBe(200);
    const body = await resp.text();
    expect(body).toContain("Sitemap:");
    expect(body).toMatch(/User-Agent: \*/i);
  });
});
