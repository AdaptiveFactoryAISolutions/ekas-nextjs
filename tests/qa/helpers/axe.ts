import AxeBuilder from '@axe-core/playwright';
import type { Page } from '@playwright/test';

/**
 * Run an axe-core scan on the current page.
 * Skips color-contrast (frequent false positives on dark themes).
 */
export async function runAxe(page: Page) {
  const builder = new AxeBuilder({ page })
    .disableRules(['color-contrast']);
  return builder.analyze();
}

export function severityCounts(violations: any[]) {
  const counts = { minor: 0, moderate: 0, serious: 0, critical: 0 };
  for (const v of violations) {
    const impact = v.impact as keyof typeof counts;
    if (impact in counts) counts[impact] += 1;
  }
  return counts;
}

export function summariseViolations(violations: any[]): string {
  if (!violations.length) return 'no violations';
  return violations
    .map(
      (v) =>
        `${v.impact ?? 'unknown'} | ${v.id}: ${v.help} (${v.nodes?.length ?? 0} node${v.nodes?.length === 1 ? '' : 's'})`,
    )
    .join('\n  ');
}
