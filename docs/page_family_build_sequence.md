# Page Family Build Sequence

**Purpose:** Define the gate-controlled build sequence for all EKAS website pages with dependencies and approval checkpoints.

**Status:** GATE 1 DELIVERABLE
**Date:** 2026-04-16

---

## Build Sequence Overview

### Sequencing Rationale

The EKAS website build follows a dependency-driven sequence:

1. **Foundation First:** Core navigation and design system
2. **Footer Destinations:** Operationalize all footer links (primary user journey)
3. **Detail Pages by Family:** Build related pages together for consistency
4. **Hub Page Enhancement:** Improve navigation hubs after detail pages exist
5. **Homepage Refinement:** Final polish once all destinations are known
6. **Hardening:** SEO, performance, deployment prep

**Current Status:** Phase 1 complete (25 pages), entering Gate 2.

---

## Phase 1: Foundation & Footer Destinations ✅ COMPLETE

### Status: 100% Complete (37 pages built)

**Objective:** Establish core site infrastructure and operationalize all footer links.

**Deliverables:**
- [x] Core layout components (Navigation, Footer, PageShell)
- [x] Design system migration (globals.css)
- [x] Homepage with FAQ section
- [x] All hub pages (Platform, Solutions, Roles, Industries, Resources, About)
- [x] 25 new footer destination pages
- [x] Security page enhanced with 3 anchor sections
- [x] Build verification successful

**Pages Created in Phase 1:**

#### Core Pages (12)
1. `/` - Homepage
2. `/platform` - Platform hub
3. `/solutions` - Solutions hub
4. `/roles` - Roles hub
5. `/industries` - Industries hub
6. `/resources` - Resources hub
7. `/about` - About EKAS
8. `/security` - Security & Trust
9. `/demo` - Demo request
10. `/solutions/downtime-reduction` - Downtime solution (original)
11. `/not-found` - 404 page
12. `/*` - Additional original pages

#### New Footer Destination Pages (25)
**Platform Detail Pages (4):**
13. `/platform/ai-assistant`
14. `/platform/manufacturing-intelligence`
15. `/platform/data-connections`
16. `/platform/reporting-analytics`

**Solution Detail Pages (4):**
17. `/solutions/scrap-quality-visibility`
18. `/solutions/capacity-throughput`
19. `/solutions/cost-driver-analysis`
20. `/solutions/multi-site-performance`

**Role Detail Pages (6):**
21. `/roles/plant-managers`
22. `/roles/operations-leaders`
23. `/roles/manufacturing-engineering`
24. `/roles/quality-leaders`
25. `/roles/finance-leaders`
26. `/roles/executive-operations`

**Industry Detail Pages (5):**
27. `/industries/metal-stamping`
28. `/industries/automotive`
29. `/industries/aerospace`
30. `/industries/medical-devices`
31. `/industries/industrial-manufacturing`

**Resource Category Pages (4):**
32. `/resources/guides`
33. `/resources/product-briefs`
34. `/resources/faqs`
35. `/resources/thought-leadership`

**Company Pages (1):**
36. `/about/founder`

**Security Enhancements (1):**
37. `/security` - Enhanced with 3 anchor sections (#governance, #data-handling, #architecture)

**Build Status:** ✅ All pages build successfully, 37 routes generated

**Approval Status:** ✅ Phase 1 complete, awaiting Gate 2 approval

---

## Phase 2: Documentation Validation & Content Audit 📋 GATE 2

### Status: NOT STARTED (Awaiting Gate 1 Approval)

**Objective:** Validate all existing content against EKAS documentation and ensure quality standards.

**Entry Criteria:**
- Gate 1 exit criteria met
- All planning documents reviewed
- User approval received

**Deliverables:**
1. **EKAS Documentation Inventory**
   - Catalog all available EKAS source documents
   - Map documents to website pages
   - Identify content gaps

2. **Content Audit Report**
   - Review all 37 pages for plagiarism
   - Verify EKAS terminology compliance
   - Check manufacturing-specificity
   - Validate against source documentation

3. **Content Gap Analysis**
   - Identify pages with insufficient documentation support
   - Flag placeholder content for revision or removal
   - Determine which pages need content sourcing

4. **EKAS Terminology Glossary**
   - Extract approved EKAS terms from documentation
   - Create terminology reference for content writers
   - Ensure consistent usage across all pages

5. **Content Revision Plan**
   - Prioritize pages needing revision
   - Assign documentation sources to each page
   - Create revision schedule

**Estimated Duration:** 3-5 days

**Exit Criteria:**
- All documentation cataloged
- All pages audited for quality
- Content gaps identified and plan created
- Terminology glossary approved
- User approval to proceed to Phase 3

**Risk Mitigation:**
- If significant content gaps found, may require content creation hold
- If documentation insufficient, may need to reduce page scope
- If plagiarism detected, immediate revision required

**Approval Checkpoint:** USER APPROVAL REQUIRED

---

## Phase 3: Hub Page Enhancement 🔄 GATE 3a

### Status: NOT STARTED

**Objective:** Improve navigation hub pages now that detail pages exist.

**Entry Criteria:**
- Gate 2 complete
- Content audit passed
- User approval received

**Target Pages (6 pages):**
1. `/platform` - Link to new platform detail pages
2. `/solutions` - Link to all 5 solution pages
3. `/roles` - Link to all 6 role pages
4. `/industries` - Link to all 5 industry pages
5. `/resources` - Link to all 4 resource pages
6. `/about` - Link to founder page

**Enhancement Tasks:**
- Add card grid with links to detail pages
- Remove duplicate content now on detail pages
- Improve category overview copy
- Ensure visual consistency with detail pages
- Add "Why this category matters" section

**Estimated Duration:** 1-2 days

**Exit Criteria:**
- All hub pages enhanced
- Navigation flows tested
- Build successful
- User approval received

**Approval Checkpoint:** USER APPROVAL REQUIRED

---

## Phase 4: Homepage Refinement 🏠 GATE 3b

### Status: NOT STARTED

**Objective:** Polish homepage now that all destinations are known.

**Entry Criteria:**
- Phase 3 complete
- All destination pages finalized
- User approval received

**Target Pages (1 page):**
1. `/` - Homepage

**Enhancement Tasks:**
- Review hero messaging for clarity
- Update "Problems" section to align with solution pages
- Ensure FAQ section covers key questions
- Verify all internal links functional
- Optimize CTAs based on user journey
- Add trust signals if appropriate

**Estimated Duration:** 1 day

**Exit Criteria:**
- Homepage messaging finalized
- All links verified
- User approval received

**Approval Checkpoint:** USER APPROVAL REQUIRED

---

## Phase 5: Internal Link Audit & Navigation QA ✅ GATE 3c

### Status: NOT STARTED

**Objective:** Verify all internal navigation and cross-linking works correctly.

**Entry Criteria:**
- Phases 3a and 3b complete
- All pages built
- User approval received

**Audit Tasks:**
1. **Footer Link Testing**
   - Test all 33 footer links
   - Verify anchor links (#governance, etc.) scroll correctly
   - Check mobile footer functionality

2. **Primary Navigation Testing**
   - Test main nav dropdowns (if implemented)
   - Verify active route highlighting
   - Check mobile menu

3. **Internal Cross-Links**
   - Verify "Back to [Hub]" links on detail pages
   - Check CTA links to /demo
   - Test related page suggestions (if implemented)

4. **Build Verification**
   - Run production build
   - Check for broken links
   - Verify 404 handling

**Estimated Duration:** 1 day

**Exit Criteria:**
- All links tested and functional
- No broken links
- Navigation flows smooth
- User approval received

**Approval Checkpoint:** USER APPROVAL REQUIRED

---

## Phase 6: Commercial & Content Quality Review 📝 GATE 4

### Status: NOT STARTED

**Objective:** Final content quality review before hardening.

**Entry Criteria:**
- Gate 3 complete (all phases)
- All pages built and linked
- User approval received

**Review Areas:**

1. **Content Quality Audit**
   - Zero plagiarism verification (run Copyscape or similar)
   - EKAS terminology compliance check
   - Manufacturing-specificity review
   - No generic AI filler check
   - Commercial messaging clarity

2. **Value Proposition Clarity**
   - Governed metrics positioning clear on every page
   - Data provenance emphasized consistently
   - Differentiation from competitors evident
   - Target audience alignment verified

3. **Call-to-Action Optimization**
   - CTA placement reviewed
   - CTA messaging tested
   - Demo request flow optimized
   - Conversion funnel validated

4. **Messaging Consistency**
   - Tone and voice consistent across all pages
   - No contradictory claims
   - Terminology usage consistent
   - Visual design uniform

**Deliverables:**
- Content quality audit report
- Plagiarism scan results
- Messaging consistency review
- Value proposition assessment
- Revision recommendations (if any)

**Estimated Duration:** 2-3 days

**Exit Criteria:**
- Zero plagiarism confirmed
- 100% EKAS terminology compliance
- Commercial positioning approved
- All revisions completed
- User approval received

**Approval Checkpoint:** USER APPROVAL REQUIRED

---

## Phase 7: Final Hardening & Deployment Prep 🚀 GATE 5

### Status: NOT STARTED

**Objective:** Prepare site for production deployment.

**Entry Criteria:**
- Gate 4 complete
- All quality issues resolved
- User approval received

**Hardening Tasks:**

1. **SEO Metadata Implementation**
   - Add page-specific `<title>` tags
   - Add meta descriptions
   - Add OpenGraph tags for social sharing
   - Add canonical URLs
   - Generate sitemap.xml
   - Add robots.txt

2. **Performance Optimization**
   - Image optimization (if images added)
   - Code splitting verification
   - Bundle size analysis
   - First Load JS < 200kB confirmed for all pages
   - Lighthouse audit (target: 90+ performance score)

3. **AWS Deployment Configuration**
   - Verify standalone output setting
   - Test AWS Amplify deployment (or ECS/EC2 as chosen)
   - Configure environment variables
   - Set up domain and SSL
   - Test staging deployment

4. **Final Build Verification**
   - Production build successful
   - All 37 pages generate correctly
   - No build errors or warnings (except acceptable img warnings)
   - Static export verified

5. **Documentation Finalization**
   - Update all docs with final page counts
   - Create deployment runbook
   - Document environment setup
   - Create handoff documentation

**Deliverables:**
1. SEO metadata implementation report
2. Performance optimization report
3. AWS deployment configuration
4. Final build verification report
5. Deployment runbook
6. Handoff documentation package

**Estimated Duration:** 3-5 days

**Exit Criteria:**
- All metadata implemented
- Performance targets met
- AWS deployment tested
- All documentation complete
- User final approval received
- Production deployment successful

**Approval Checkpoint:** USER FINAL APPROVAL REQUIRED

---

## Build Sequence Dependencies

```
Phase 1: Foundation & Footer Destinations ✅ COMPLETE
    ↓
Gate 1 Approval Required → Planning Docs Review
    ↓
Phase 2: Documentation Validation 📋 WAITING
    ↓
Gate 2 Approval Required → Content Audit Review
    ↓
Phase 3a: Hub Page Enhancement 🔄 WAITING
    ↓
Phase 3b: Homepage Refinement 🏠 WAITING
    ↓
Phase 3c: Internal Link Audit ✅ WAITING
    ↓
Gate 3 Approval Required → Navigation QA Review
    ↓
Phase 4: Commercial Quality Review 📝 WAITING
    ↓
Gate 4 Approval Required → Content Quality Sign-off
    ↓
Phase 5: Final Hardening 🚀 WAITING
    ↓
Gate 5 Approval Required → Deployment Approval
    ↓
Production Deployment ✅
```

---

## Risk Management

### Phase-Specific Risks

**Phase 2 Risks:**
- Insufficient EKAS documentation → Content scope reduction required
- Plagiarism detected → Immediate content revision required
- Terminology inconsistency → Glossary enforcement needed

**Phase 3 Risks:**
- Hub pages create content duplication → Detail pages may need revision
- Navigation complexity → May need simplified IA
- User journey unclear → May need UX consultation

**Phase 4 Risks:**
- Messaging inconsistency discovered late → Rework required
- Commercial positioning weak → Messaging overhaul needed
- CTA conversion poor → Funnel redesign required

**Phase 5 Risks:**
- Performance targets not met → Code optimization required
- AWS deployment issues → Infrastructure troubleshooting
- SEO implementation complex → May need SEO consultant

---

## Success Metrics by Phase

### Phase 1 (Complete)
- ✅ 37 pages built
- ✅ 0 build errors
- ✅ 33/33 footer links operational
- ✅ Performance: All pages < 200kB First Load JS

### Phase 2 (Pending)
- Target: 100% documentation coverage where possible
- Target: 0 plagiarism instances
- Target: 100% EKAS terminology compliance

### Phase 3 (Pending)
- Target: All hub pages improved
- Target: Homepage messaging finalized
- Target: 0 broken internal links

### Phase 4 (Pending)
- Target: Commercial positioning approved
- Target: 0 quality issues
- Target: Messaging consistency 100%

### Phase 5 (Pending)
- Target: Lighthouse performance score 90+
- Target: Production deployment successful
- Target: All documentation complete

---

## Current Program Status

**Current Phase:** Gate 1 Complete, Awaiting User Approval
**Next Phase:** Phase 2 - Documentation Validation & Content Audit
**Pages Built:** 37
**Build Status:** ✅ Successful
**Uncontrolled Generation:** ❌ STOPPED
**Gate Control:** ✅ ACTIVE

**Immediate Next Actions:**
1. User review of Gate 1 planning documents
2. User approval to proceed to Gate 2
3. EKAS documentation package provision (if available)
4. Content audit execution

---

## Gate Progression Checklist

Before proceeding to each gate, verify:

### Gate 1 → Gate 2
- [ ] All planning documents created
- [ ] Page architecture approved
- [ ] Build sequence validated
- [ ] User approval received

### Gate 2 → Gate 3
- [ ] Documentation audit complete
- [ ] Content quality verified
- [ ] Terminology glossary approved
- [ ] Content gaps addressed
- [ ] User approval received

### Gate 3 → Gate 4
- [ ] All hub pages enhanced
- [ ] Homepage refined
- [ ] Internal links verified
- [ ] Navigation flows tested
- [ ] User approval received

### Gate 4 → Gate 5
- [ ] Content quality audit passed
- [ ] Zero plagiarism confirmed
- [ ] Commercial positioning approved
- [ ] All revisions complete
- [ ] User approval received

### Gate 5 → Production
- [ ] SEO metadata implemented
- [ ] Performance targets met
- [ ] AWS deployment tested
- [ ] Documentation complete
- [ ] User final approval received

---

**Program Status:** GATE-CONTROLLED, AWAITING GATE 1 APPROVAL

**No further page generation will occur until:**
1. Gate 1 planning documents are reviewed and approved
2. Gate 2 documentation validation is complete
3. Explicit user approval is given for each subsequent phase
