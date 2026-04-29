/**
 * Suite 9 — Metadata.
 * The full per-page metadata regression spec lives at
 * tests/metadata/per-page-metadata.spec.ts (landed in PR #8). This
 * file is a thin re-runner / breadcrumb so the QA suite explicitly
 * surfaces metadata coverage when it runs.
 *
 * The spec referenced here checks unique <title>, OG title, canonical,
 * description length, sitemap.xml, and robots.txt across all 30 routes.
 */
import { test, expect } from '@playwright/test';

test('metadata coverage is delegated to tests/metadata/per-page-metadata.spec.ts', async () => {
  // Intentional no-op — the npm e2e scripts include
  // tests/metadata/per-page-metadata.spec.ts in the test path so the
  // assertions still run. This breadcrumb keeps the QA-suite directory
  // self-documenting.
  expect(true).toBe(true);
});
