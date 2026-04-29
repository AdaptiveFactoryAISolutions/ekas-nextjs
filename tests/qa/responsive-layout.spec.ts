/**
 * Suite 10 — Responsive layout at four breakpoints.
 * On a representative subset of pages:
 *  - No horizontal scrollbar (page width matches viewport width)
 *  - Hero text is readable (visible, not overlapping with image)
 *  - Card grid column count matches the breakpoint:
 *      375px → 1 column
 *      768px → 2 columns
 *      1024px → 2-3 columns
 *      1440px → 3-4 columns
 *
 * Uses bounding-box positions (not pixel screenshots) to infer column
 * count, since pixel comparisons are too brittle.
 */
import { test, expect } from '@playwright/test';
import { LAYOUT_ROUTES } from './helpers/routes';

// expectedCols ranges intentionally span both 3- and 4-column grids at
// the wider breakpoints. The site has at least one 4-stat banner row
// (e.g. "What Fragmented Manufacturing Intelligence Costs" on /) that
// is a valid lg:grid-cols-4 layout from 1024px up.
const BREAKPOINTS = [
  { name: '375', width: 375, height: 667, expectedCols: [1] },
  { name: '768', width: 768, height: 1024, expectedCols: [1, 2] },
  { name: '1024', width: 1024, height: 768, expectedCols: [2, 3, 4] },
  { name: '1440', width: 1440, height: 900, expectedCols: [2, 3, 4] },
];

for (const bp of BREAKPOINTS) {
  test.describe(`@${bp.name}`, () => {
    test.use({ viewport: { width: bp.width, height: bp.height } });

    for (const route of LAYOUT_ROUTES) {
      test(`${route} — no horizontal scroll, hero visible`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'networkidle' });

        const docWidth = await page.evaluate(() => document.documentElement.scrollWidth);
        const viewportWidth = bp.width;
        // Allow a small fudge for scrollbar widths.
        expect(docWidth, `Horizontal scroll on ${route} @${bp.name}: doc=${docWidth} vp=${viewportWidth}`).toBeLessThanOrEqual(viewportWidth + 2);

        const h1 = page.locator('h1').first();
        await expect(h1, `H1 not visible on ${route} @${bp.name}`).toBeVisible();
        const box = await h1.boundingBox();
        expect(box, `H1 bounding box null on ${route} @${bp.name}`).not.toBeNull();
        expect(box!.width, `H1 width zero on ${route} @${bp.name}`).toBeGreaterThan(0);
      });

      test(`${route} — card grid column count matches breakpoint`, async ({ page }) => {
        await page.goto(route, { waitUntil: 'networkidle' });

        // Find the first responsive card grid by walking grid containers
        // and picking the one with the most cards. Skips standalone
        // `.premium-card` instances used as hero illustrations or
        // example cards (e.g. the EvidencePacket example on /).
        const gridHandle = await page.evaluateHandle(() => {
          const grids = Array.from(document.querySelectorAll('.grid'));
          let best: Element | null = null;
          let bestCount = 0;
          for (const g of grids) {
            const cards = g.querySelectorAll(':scope > a > .premium-card, :scope > .premium-card');
            // Some sites wrap the card in <Link> -> <a>, so check direct
            // and one-level-deep children.
            const direct = g.querySelectorAll(':scope > .premium-card').length;
            const linked = g.querySelectorAll(':scope > a .premium-card').length;
            const total = Math.max(cards.length, direct + linked);
            if (total > bestCount) { best = g; bestCount = total; }
          }
          return best;
        });
        const grid = gridHandle.asElement();
        if (!grid) {
          test.skip(true, `${route} @${bp.name}: no card grid found on page`);
          return;
        }

        const boxes: Array<{ x: number; y: number }> = await grid.evaluate((el) => {
          const containers = Array.from(el.querySelectorAll(':scope > *'));
          return containers.map((c) => {
            const card = c.classList?.contains('premium-card') ? c : c.querySelector('.premium-card');
            const target = card || c;
            const r = (target as HTMLElement).getBoundingClientRect();
            return { x: r.x, y: r.y };
          });
        });

        if (boxes.length < 2) {
          test.skip(true, `${route} @${bp.name}: card grid has <2 children`);
          return;
        }

        // First-row Y: cluster within ±20px of the topmost card.
        const minY = Math.min(...boxes.map((b) => b.y));
        const firstRow = boxes.filter((b) => b.y - minY < 20);
        const cols = firstRow.length;

        expect(
          bp.expectedCols.includes(cols),
          `${route} @${bp.name}: first-row card count = ${cols}, expected one of ${JSON.stringify(bp.expectedCols)}`,
        ).toBe(true);
      });
    }
  });
}
