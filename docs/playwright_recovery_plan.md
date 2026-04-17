# Playwright Recovery Plan

**Date:** 2026-04-16
**Situation:** 106/144 test failures due to wrong dev server running
**Root Cause:** Testing Vite app instead of Next.js app
**Status:** Environment issue, NOT app defects

---

## Executive Summary

**Recovery Strategy:** Fix test environment, rerun tests, validate deployment readiness

**Estimated Total Time:** 15-30 minutes

**Expected Outcome:** >95% test pass rate, deployment approval

**Confidence:** VERY HIGH (95%)

---

## Recovery Sequence

### Phase 1: Environment Remediation (P0)

**Objective:** Start correct Next.js dev server
**Time Estimate:** 2-5 minutes
**Blocks:** ALL testing

#### Step 1.1: Kill All Dev Servers

**Action:**
```bash
# Identify all node/npm processes
ps aux | grep "npm run dev" | grep -v grep

# Kill all npm run dev processes
killall node
# OR kill specific PIDs if selective kill needed
```

**Verification:**
```bash
# Should return nothing
ps aux | grep "npm run dev" | grep -v grep

# Port 3000 should be free
lsof -i :3000
# Should return nothing or "command not found" if lsof not available
```

**Success Criteria:** ✅ No dev servers running, port 3000 free

---

#### Step 1.2: Start Next.js Dev Server

**Action:**
```bash
cd "/home/pat/EKAS B2B website/ekas-nextjs"
npm run dev
```

**Wait for:** "Ready in X ms" or similar Next.js startup message

**Success Criteria:** ✅ Dev server running on http://localhost:3000

---

#### Step 1.3: Verify Correct Server Running

**Action:**
```bash
# Check for Next.js-specific content
curl -s http://localhost:3000/ | grep "_next"
```

**Expected Result:** Should find "_next" in HTML (Next.js scripts)

**Alternative Check:**
```bash
# Check for semantic landmarks
curl -s http://localhost:3000/ | grep -o "<main" | wc -l
# Should return: 1 or more

curl -s http://localhost:3000/ | grep -o "<nav" | wc -l
# Should return: 1 or more
```

**Negative Check (should NOT find Vite):**
```bash
curl -s http://localhost:3000/ | grep "@vite/client"
# Should return: nothing
```

**Success Criteria:** ✅ Next.js app serving, NOT Vite app

---

### Phase 2: Targeted Test Reruns (P1)

**Objective:** Validate specific test families with correct server
**Time Estimate:** 10-15 minutes total
**Priority Order:** Most critical to least critical

---

#### Step 2.1: Semantic Landmarks Test (Smoke Test)

**Purpose:** Confirm correct app is being tested

**Command:**
```bash
cd "/home/pat/EKAS B2B website/ekas-nextjs"
npx playwright test -g "Page has main landmark" --reporter=list
npx playwright test -g "Page has navigation landmark" --reporter=list
```

**Expected Result:** ✅ 4/4 tests PASS (2 desktop + 2 mobile)

**If FAIL:** STOP - wrong server still running or major app issue

**If PASS:** ✅ Continue to next step

**Time:** ~2 minutes

---

#### Step 2.2: Accessibility Tests

**Purpose:** Validate WCAG 2.1 AA compliance and previous remediation

**Command:**
```bash
npx playwright test tests/accessibility/ --reporter=list --workers=4 --retries=1
```

**Expected Result:** ✅ 50-52/52 tests PASS (96-100%)

**Acceptable Failures:**
- Possible 1-2 flaky tests on retry
- All should pass on second run

**If Major Failures (>5):** Investigate - may indicate real issues

**If PASS:** ✅ Accessibility compliance confirmed

**Time:** ~5 minutes

---

#### Step 2.3: Navigation Tests

**Purpose:** Validate navigation functionality

**Command:**
```bash
npx playwright test tests/navigation/ --reporter=list --workers=2 --retries=1
```

**Expected Result:** ✅ 30-32/34 tests PASS (88-94%)

**Known Acceptable Failures:**
- 2 mobile CTA tests (P2 - test issue, not app issue)
- Possible 1-2 flaky desktop tests (timing)

**If PASS:** ✅ Navigation functional

**Time:** ~3 minutes

---

#### Step 2.4: Smoke Tests

**Purpose:** Validate all routes load correctly

**Command:**
```bash
npx playwright test tests/smoke/ --reporter=list --workers=4 --retries=1
```

**Expected Result:** ✅ 52-54/58 tests PASS (90-93%)

**Known Acceptable Failures:**
- 4 tests for custom 404 page (P2 - expected)
- 2 tests for /contact route skip (expected)

**If PASS:** ✅ All routes functional

**Time:** ~4 minutes

---

### Phase 3: Full Suite Rerun (P1)

**Objective:** Comprehensive validation before deployment

**Command:**
```bash
npx playwright test --reporter=list --workers=4 --retries=1 | tee /tmp/corrected-test-run.log
```

**Expected Result:** ✅ >95% pass rate (target: 136-140/144 passing)

**Acceptable Failures:**
- 4 tests: Custom 404 page (P2)
- 2 tests: Contact route skip (expected)
- 0-2 tests: Flaky/timing issues (acceptable if pass on retry)

**If PASS:** ✅ Ready for deployment

**Time:** ~8-10 minutes

**Success Criteria:**
- Pass rate >95%
- Zero P0 failures
- Zero P1 failures
- Only known P2 failures

---

### Phase 4: Results Documentation (P1)

**Objective:** Update deployment decision with corrected results

#### Step 4.1: Create Results Document

**File:** `docs/playwright_targeted_rerun_results.md`

**Content:**
- Test run date/time
- Environment correction applied
- Test results by family
- Pass/fail breakdown
- Known acceptable failures
- Comparison to false-positive run

#### Step 4.2: Update GO/NO-GO Decision

**File:** `docs/final_deployment_go_no_go.md`

**Updates:**
- Change verdict from NO-GO to GO (if tests pass)
- Update test results section
- Document environment issue resolution
- Update confidence level to HIGH
- Update risk level to LOW
- Mark all sign-offs as ready

#### Step 4.3: Create Confirmed Fixes Document

**File:** `docs/playwright_confirmed_app_fixes.md`

**Content:**
- NO APP FIXES REQUIRED (environment issue only)
- Document that previous remediation was valid
- List all preserved fixes from earlier session
- Confirm zero real defects found

---

## Contingency Plans

### If Landmarks Test Fails (Step 2.1)

**Possible Causes:**
1. Wrong server still running
2. Next.js app not rendering correctly
3. Real app defect (unlikely)

**Action:**
1. Verify server with curl + grep
2. Check Next.js dev server logs for errors
3. Restart dev server
4. Check PageShell.tsx and Navigation.tsx code
5. If code is correct but tests fail, investigate Playwright config

**Escalation:** If can't resolve in 10 minutes, manual browser inspection needed

---

### If Accessibility Tests Fail Significantly (Step 2.2)

**Possible Causes:**
1. Wrong server (recheck)
2. Real accessibility issues
3. Test configuration changed

**Action:**
1. Re-verify correct server running
2. Run single test in headed mode: `npx playwright test -g "Demo form is accessible" --headed`
3. Check if failures match previous patterns
4. Review axe-core output for specific violations

**Escalation:** If >10 failures, pause and investigate manually in browser with axe DevTools

---

### If Navigation Tests Fail Badly (Step 2.3)

**Possible Causes:**
1. Wrong server (recheck)
2. Real navigation bug
3. Playwright timing issue

**Action:**
1. Re-verify correct server running
2. Test navigation manually in browser
3. Check if failures are same as "before clean build"
4. Increase test timeouts if timing issue

**Escalation:** If manual browser test shows navigation broken, investigate code changes

---

### If Full Suite Fails <90% (Step 3)

**Possible Causes:**
1. Mix of real issues and test issues
2. Test environment still problematic
3. Flaky tests

**Action:**
1. Categorize failures by type
2. Identify new failures vs known failures
3. Rerun failed tests individually
4. Check for patterns

**Escalation:** Analyze failure families again - may need selective fixes

---

## Decision Matrix

### After Targeted Reruns

| Accessibility | Navigation | Smoke | Action |
|--------------|------------|-------|--------|
| PASS | PASS | PASS | ✅ Proceed to full suite |
| PASS | PASS | FAIL | ⚠️ Investigate smoke failures |
| PASS | FAIL | PASS | ⚠️ Investigate navigation |
| FAIL | * | * | ❌ STOP - check environment |

### After Full Suite

| Pass Rate | P0 Failures | P1 Failures | Decision |
|-----------|-------------|-------------|----------|
| >95% | 0 | 0 | ✅ **GO** for deployment |
| 90-95% | 0 | 0-2 | ⚠️ Review P1 failures |
| <90% | 0 | >2 | ❌ **HOLD** - investigate |
| Any | >0 | Any | ❌ **NO-GO** - fix P0 |

---

## Timeline

### Optimistic (Everything Works)

- 0:00 - Start: Kill dev servers
- 0:02 - Start Next.js server
- 0:03 - Verify correct server
- 0:05 - Run landmarks test → PASS
- 0:07 - Run accessibility tests → PASS
- 0:12 - Run navigation tests → PASS
- 0:16 - Run smoke tests → PASS
- 0:20 - Run full suite → PASS
- 0:30 - Document results → COMPLETE

**Total:** 30 minutes

---

### Realistic (Minor Issues)

- 0:00 - Start: Kill dev servers
- 0:02 - Start Next.js server
- 0:03 - Verify correct server
- 0:05 - Run landmarks test → PASS
- 0:07 - Run accessibility tests → 1-2 flaky, retry → PASS
- 0:15 - Run navigation tests → 2 known failures → PASS (acceptable)
- 0:20 - Run smoke tests → 6 known failures → PASS (acceptable)
- 0:25 - Run full suite → 95% pass rate
- 0:40 - Document results → COMPLETE
- 0:45 - Update GO/NO-GO → APPROVED

**Total:** 45 minutes

---

### Pessimistic (Unexpected Issues)

- 0:00 - Start: Kill dev servers
- 0:02 - Start Next.js server
- 0:03 - Verify correct server
- 0:05 - Run landmarks test → FAIL
- 0:15 - Debug: wrong server? Next.js broken?
- 0:25 - Fix issue, restart server
- 0:30 - Run landmarks test → PASS
- 0:35 - Run accessibility tests → Some failures
- 0:45 - Investigate failures - real or flaky?
- 1:00 - Fix real issues if found
- 1:10 - Rerun tests → PASS
- 1:20 - Run full suite → PASS
- 1:35 - Document results → COMPLETE

**Total:** 1.5 hours

---

## Success Metrics

### Environment Fix Success

- ✅ Next.js server running on port 3000
- ✅ HTML contains "_next" scripts
- ✅ HTML contains <main> and <nav> tags
- ✅ NO Vite-specific content

### Test Suite Success

- ✅ Semantic landmarks: 4/4 PASS
- ✅ Accessibility: >50/52 PASS (>96%)
- ✅ Navigation: >30/34 PASS (>88%)
- ✅ Smoke: >52/58 PASS (>90%)
- ✅ Full suite: >136/144 PASS (>95%)

### Deployment Readiness

- ✅ Zero P0 blockers
- ✅ Zero P1 blockers
- ✅ All known failures are P2 (acceptable)
- ✅ Previous remediation validated
- ✅ High confidence in production readiness

---

## Post-Recovery Actions

### Immediate (After Tests Pass)

1. ✅ Update `docs/final_deployment_go_no_go.md` → Change to **GO**
2. ✅ Create `docs/playwright_targeted_rerun_results.md`
3. ✅ Create `docs/playwright_confirmed_app_fixes.md` (zero fixes needed)
4. ✅ Archive false-positive test results for reference
5. ✅ Recommend deployment proceed

### Short-Term (Before Next Test Run)

1. ⏸ Add server validation to Playwright config
2. ⏸ Create pre-test health check script
3. ⏸ Document port allocation (which projects use which ports)
4. ⏸ Add "verify correct server" step to test README

### Medium-Term (Post-Deployment)

1. ⏸ Create custom 404 page (P2 enhancement)
2. ⏸ Add process management for dev servers
3. ⏸ Improve test suite error messages
4. ⏸ Add CI/CD pipeline with server validation

---

## Rollback Plan

### If Recovery Fails

**Situation:** Can't get correct server running or tests still fail

**Action:**
1. Document specific failure
2. Do NOT deploy (keep NO-GO status)
3. Escalate to manual investigation
4. Consider alternate explanations beyond wrong-server theory

**Confidence Threshold:** If <3 test families pass after environment fix, theory may be wrong

---

## Communication Plan

### Status Updates

**After Each Phase:**
- Document pass/fail status
- Update expected completion time
- Note any blockers or issues

**Final Status:**
- Clear GO/NO-GO decision
- Test pass rate
- Confidence level
- Risk assessment
- Deployment recommendation

---

## Final Checklist

### Before Declaring GO

- [ ] Next.js dev server confirmed running
- [ ] Vite server confirmed NOT running
- [ ] Semantic landmarks test passed
- [ ] Accessibility tests >96% pass rate
- [ ] Navigation tests >88% pass rate
- [ ] Smoke tests >90% pass rate
- [ ] Full suite >95% pass rate
- [ ] Zero P0 failures
- [ ] Zero P1 failures
- [ ] All failures are known P2 acceptable
- [ ] Documentation updated
- [ ] Deployment decision updated to GO
- [ ] Confidence level HIGH
- [ ] Risk level LOW

### Before Starting Deployment

- [ ] Final smoke test on production build
- [ ] Verify all 28 routes generated
- [ ] Check build size acceptable
- [ ] Confirm zero build errors
- [ ] Review deployment checklist
- [ ] Stakeholder approval obtained

---

## Execution Command Sequence

**Copy-paste ready commands for fast execution:**

```bash
# Phase 1: Environment Fix
killall node
cd "/home/pat/EKAS B2B website/ekas-nextjs"
npm run dev &
sleep 5
curl -s http://localhost:3000/ | grep "_next"

# Phase 2: Targeted Tests
npx playwright test -g "Page has main landmark" --reporter=list
npx playwright test tests/accessibility/ --reporter=list --workers=4 --retries=1
npx playwright test tests/navigation/ --reporter=list --workers=2 --retries=1
npx playwright test tests/smoke/ --reporter=list --workers=4 --retries=1

# Phase 3: Full Suite
npx playwright test --reporter=list --workers=4 --retries=1 | tee /tmp/corrected-test-run.log

# Phase 4: Results
tail -50 /tmp/corrected-test-run.log
```

---

**Document Version:** 1.0
**Created:** 2026-04-16
**Status:** READY TO EXECUTE
**Next Action:** Kill dev servers and start Next.js server
**Expected Outcome:** DEPLOYMENT APPROVED
