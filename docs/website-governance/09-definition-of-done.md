# Definition of Done
## When Is a Page Truly Complete?

**Purpose:** Explicit checklist for determining when a page is "done" and ready for production.

**Authority:** Lead Website Systems Engineer
**Enforcement:** Phase 5+ (page-by-page remediation)

---

## DEFINITION

A page is **DONE** only if it meets ALL criteria below:

---

## 1. INVENTORY & DOCUMENTATION

- [ ] Page exists in `02-page-inventory.md`
- [ ] Page has completed brief (using `03-page-brief-template.md`)
- [ ] Page class assigned (Conversion | Capability | Trust | Resource | Legal/Footer)
- [ ] Primary audience documented
- [ ] Page purpose stated in one sentence

---

## 2. GOVERNANCE COMPLIANCE

- [ ] Follows approved page template for page class (from `10-page-templates.md`)
- [ ] Uses EKAS-specific terminology (from `01-website-master-brief.md`)
- [ ] Avoids all banned language (verified against `05-banned-language.md`)
- [ ] Follows style guide (from `04-style-guide.md`)
- [ ] Passes all 10 approval gates (from `06-approval-checklist.md`)

---

## 3. CONTENT QUALITY

- [ ] Clear business purpose stated above fold
- [ ] Targets one primary audience
- [ ] Avoids unsupported capability claims
- [ ] Avoids generic SaaS filler language
- [ ] Avoids technical-paper overload
- [ ] Business problem → EKAS solution → Evidence structure
- [ ] Technical overflow removed and logged
- [ ] No placeholder content (no [TBD], [TODO], "coming soon")

---

## 4. PROOF & GROUNDING

- [ ] Every capability claim grounded in source documentation
- [ ] Implementation status disclosed where relevant
- [ ] Conservative wording used for partial/emerging capabilities
- [ ] No invented proof or customer outcomes
- [ ] Content decision log updated for all changes

---

## 5. CTA & NAVIGATION

- [ ] Clear primary CTA present
- [ ] CTA uses approved wording ("Request a Demo", etc.)
- [ ] CTA has context (explains why user should take action)
- [ ] Internal links functional (no broken links)
- [ ] Footer navigation consistent with site-wide standards

---

## 6. TECHNICAL STANDARDS

- [ ] Metadata complete (title, description)
- [ ] Heading hierarchy correct (H1 → H2 → H3, no skips)
- [ ] Paragraph length ≤ 4 sentences
- [ ] Sentence length ≤ 30 words average
- [ ] Active voice used (≥80% of sentences)
- [ ] Reading level: Flesch-Kincaid Grade 10-12

---

## 7. ORIGINALITY

- [ ] Zero copied competitor phrases
- [ ] Zero paraphrased competitor messaging
- [ ] Original EKAS terminology used throughout
- [ ] Passed originality check (Google search test)

---

## 8. EXECUTIVE READABILITY

- [ ] Can business leader understand in 2 minutes
- [ ] Scann able structure (headings, bullets, whitespace)
- [ ] No technical walkthrough required
- [ ] Manufacturing-specific language (not generic tech)

---

## 9. BUILD & VALIDATION

- [ ] Page builds successfully (no TypeScript errors)
- [ ] Page renders correctly in development
- [ ] Responsive design verified (mobile/tablet/desktop)
- [ ] No console errors or warnings
- [ ] Links tested and functional

---

## 10. APPROVAL

- [ ] All 10 gates passed (documented in page brief)
- [ ] Validation agents approved (Phase 2 audit)
- [ ] Manual review completed
- [ ] Final approval from Lead Website Systems Engineer
- [ ] Page marked ✅ APPROVED in `02-page-inventory.md`

---

## DONE CRITERIA BY PHASE

### Phase 3 (P0 Remediation)
- Critical issues fixed
- Build passing
- No placeholder pages

### Phase 4 (Family Standardization)
- Page follows family template
- Consistent structure with sibling pages

### Phase 5 (Page-by-Page Remediation)
- All 10 criteria above met
- Page brief completed
- All gates passed

### Phase 6 (SEO Cleanup)
- Metadata complete
- Heading hierarchy correct
- Internal links verified

### Phase 7 (Final Certification)
- All pages DONE
- Site-wide consistency verified
- Final certification report generated

---

## NOT DONE IF...

A page is **NOT DONE** if any of these are true:

- ❌ Contains placeholder sections
- ❌ Has unsupported capability claims
- ❌ Uses banned transformation language
- ❌ Fails any of the 10 approval gates
- ❌ Missing from page inventory
- ❌ No page brief completed
- ❌ Technical overflow present on buyer page
- ❌ CTA missing or uses prohibited wording
- ❌ Copied competitor language detected
- ❌ Build fails with page included

---

## DONE = READY FOR...

When a page meets all DONE criteria:

✅ **User factual validation** (stakeholder review)
✅ **Production deployment** (no blockers)
✅ **Public launch** (credible, original, grounded)

---

## ACCOUNTABILITY

**Who verifies DONE status?**
- Phase 2-5: Validation agents + manual review
- Phase 6: SEO audit + manual review
- Phase 7: Final certification review
- **Final Authority:** Lead Website Systems Engineer

**No shortcuts:** If criteria not met, page is NOT DONE.

---

**Document Status:** LOCKED for Phase 2+
**Maintained By:** Lead Website Systems Engineer
**Last Updated:** 2026-04-16
