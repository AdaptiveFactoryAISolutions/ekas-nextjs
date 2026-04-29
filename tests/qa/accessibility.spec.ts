/**
 * Suite 8 — Accessibility.
 * For every canonical route, run axe-core. Fail on any serious or
 * critical violation; log moderate/minor without failing.
 * color-contrast is disabled (frequent false positives on dark themes).
 */
import { test, expect } from '@playwright/test';
import { ROUTES } from './helpers/routes';
import { runAxe, severityCounts, summariseViolations } from './helpers/axe';

test.describe('axe-core scan per route', () => {
  for (const route of ROUTES) {
    test(`${route} — no serious or critical violations`, async ({ page }) => {
      await page.goto(route, { waitUntil: 'networkidle' });
      const result = await runAxe(page);
      const counts = severityCounts(result.violations);

      const blocking = result.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
      const nonBlocking = result.violations.filter((v) => v.impact === 'moderate' || v.impact === 'minor');

      if (nonBlocking.length) {
        console.warn(`${route} — ${nonBlocking.length} non-blocking violation(s):\n  ${summariseViolations(nonBlocking)}`);
      }

      expect(
        blocking.length,
        `${route} — ${counts.critical} critical + ${counts.serious} serious violation(s):\n  ${summariseViolations(blocking)}`,
      ).toBe(0);
    });
  }
});
