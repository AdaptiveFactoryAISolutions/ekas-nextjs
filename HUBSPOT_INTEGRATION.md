# HubSpot Integration

## Summary

HubSpot free CRM is a non-destructive overlay on the existing demo-request
pipeline. The Next.js demo form continues to send to AWS SES + S3 exactly
as before; HubSpot is added as a fail-soft downstream sink for lead
capture, plus a tracking script that powers the HubSpot chatbot widget
on every page. Nothing was replaced — only added.

## Demo-request flow (post-integration)

A POST to `/api/demo-request` runs through six steps in this order. Each
step must succeed before the next runs, except the final HubSpot step,
which is fail-soft.

1. **Field validation** — required fields, lengths, types
   (`route.ts:212-245`)
2. **Consumer-email blocklist** — gmail, yahoo, hotmail, etc. blocked
   (`route.ts:33-38`, `route.ts:50-69`)
3. **Rate limit** — 3 requests / hour / IP, in-memory store
   (`route.ts:71-92`)
4. **SES email** — sent from `noreply@adaptivefactory.net` to
   `pat@adaptivefactory.net`, with the lead's email as Reply-To
   (`route.ts:113-156`)
5. **S3 archive** — JSON record to `adaptivefactory-leads` bucket,
   KMS-encrypted, partitioned by date (`route.ts:158-187`)
6. **HubSpot sync** — POST to HubSpot Forms Submissions API (v3),
   fail-soft (`route.ts:189-249`)

Steps 4 and 5 run in parallel (`Promise.all`). If either fails, the user
gets a 500 and is prompted to email pat@adaptivefactory.net directly.

Step 6 runs only after 4 and 5 succeed. If it fails, the error is logged
and the user still gets `{ ok: true }` — the lead is already captured in
SES + S3, so HubSpot is just downstream.

## Required environment variables

Set these in **AWS Amplify Console → App settings → Environment variables**
before merging to the Amplify-watched branch (`main`).

| Name | Value | Purpose |
|---|---|---|
| `HUBSPOT_PORTAL_ID` | `246054670` | Server-side, used by demo-request route handler |
| `HUBSPOT_FORM_GUID` | `b9d421ef-67a9-4613-99d2-9821f1fe2f96` | Server-side, identifies the "EKAS Demo Request — Server-Sync" form |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` | `246054670` | Client-side, gates the tracking script in `layout.tsx` |

**Optional:**

| Name | Value | Purpose |
|---|---|---|
| `HUBSPOT_FORMS_API_KEY` | (private app token) | Only needed if HubSpot rate-limits the unauthenticated Submissions API. Not currently used. |

The `NEXT_PUBLIC_` prefix is required for variables that need to be
inlined into the client bundle. Setting `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
to empty or unsetting it disables the tracking script (see "Disabling
the integration" below).

## HubSpot UI setup (already done for v1)

### Demo-request form

A form named **"EKAS Demo Request — Server-Sync"** exists at GUID
`b9d421ef-67a9-4613-99d2-9821f1fe2f96`. It was provisioned via the
Marketing Forms v3 API (not via the HubSpot UI) and contains seven
fields: `firstname`, `lastname`, `email`, `company`, `jobtitle`,
`phone`, `message`.

The route handler currently sends only the **first five** of those
fields, because the Next.js modal at `src/components/modals/DemoRequestModal.tsx`
only collects those five. The form's `phone` and `message` fields are
schema scaffolding for v2 — they remain perpetually empty in HubSpot
until the modal expands to collect them.

If you need to edit the form (e.g., change submit-button text, add
help text, reorder fields), use the HubSpot UI:

```
https://app-na2.hubspot.com/forms/246054670/editor/b9d421ef-67a9-4613-99d2-9821f1fe2f96/edit
```

### Chatbot (Phase 6 — manual setup)

The free HubSpot chatbot is configured entirely in the HubSpot UI. The
tracking script in `src/app/layout.tsx` is what loads the widget on the
site once the chatflow is published. Steps:

1. Navigate to **Marketing → Lead Capture → Chatflows → Create chatflow → Bot**
2. Name: **"EKAS Demo Booking Bot"**
3. Targeting: shows on all pages (or specifically `/` and any landing pages)
4. Display: bottom-right corner, brand color matching the dark navy of the site
5. Single flow:
   - Welcome: "Hi — looking to see EKAS in action?"
   - Quick reply: **"Book a demo"** → opens `/demo` page in a new tab
   - Quick reply: **"Just browsing"** → "Got it. Take a look around — the FAQ at the bottom of the page covers most questions."
6. **Save and publish** the chatflow.

After publishing, the chatbot starts appearing on the live site
automatically. No code change needed.

## Verifying the integration works

Once env vars are set and `feature/hubspot-integration` is merged to
`main`:

1. Wait for Amplify to finish the deploy. Confirm the build log says
   `.env.production` was written with the four HubSpot variables (names
   only, values redacted).
2. Submit a test demo request from `https://adaptivefactory.ai/demo`
   using a **business email** (not gmail/yahoo/etc — those are blocked).
3. Within ~30 seconds, verify each downstream:
   - **SES** — `pat@adaptivefactory.net` receives the demo-request notification email.
   - **S3** — A new JSON record appears in `s3://adaptivefactory-leads/demo-requests/YYYY/MM/DD/`.
   - **HubSpot CRM** — A new contact appears at `https://app-na2.hubspot.com/contacts/246054670`.
4. View the page source of any deployed page and confirm the script tag
   `<script id="hubspot-tracking" src="//js-na2.hs-scripts.com/246054670.js" ...>`
   is present.
5. Reload a page and confirm the chatbot widget renders bottom-right
   (only after Phase 6 chatflow is published).

If any of steps 3a–3c fails: check Amplify logs for `[demo-request]`
log lines. The submissionId is logged on every step, so you can trace
a single submission across SES → S3 → HubSpot.

## Failure modes

| Failure | What happens | What to do |
|---|---|---|
| HubSpot API down or returns 5xx | Request times out at 5s, error logged, lead still captured in SES + S3 | Nothing — design intent. Lead is safe. |
| HubSpot rate-limits the unauthenticated endpoint | 429 logged, lead still captured in SES + S3 | Set `HUBSPOT_FORMS_API_KEY` to a private app token and switch the route handler to the authenticated endpoint. |
| Tracking script blocked by ad blocker / browser privacy | No tracking events for that visitor. Chatbot does not appear. | Expected. Acceptable user behavior. Not a bug. |
| `HUBSPOT_PORTAL_ID` or `HUBSPOT_FORM_GUID` unset in Amplify | Server-side sync logs "skipped" and returns early. Lead still captured in SES + S3. | Set the env vars in Amplify Console and trigger a redeploy. |
| `NEXT_PUBLIC_HUBSPOT_PORTAL_ID` unset | Tracking script does not render. No chatbot. No tracking. | Set the env var in Amplify Console and trigger a redeploy. |
| Form GUID is wrong or the form was deleted in HubSpot | HubSpot returns 404, error logged, lead still captured in SES + S3 | Recreate the form in the HubSpot UI, copy its new GUID into `HUBSPOT_FORM_GUID`. |

## Disabling the integration

To turn off the integration completely without redeploying code:

1. **Server-side sync**: unset (or blank) either `HUBSPOT_PORTAL_ID` or
   `HUBSPOT_FORM_GUID` in Amplify env vars and redeploy. The
   `syncToHubSpot` function will log "skipped" and return early. SES +
   S3 capture continues normally.
2. **Tracking script + chatbot**: unset `NEXT_PUBLIC_HUBSPOT_PORTAL_ID`
   in Amplify env vars and redeploy. The `<Script>` tag will not render
   on any page.

To turn it off permanently, also revert the four commits on the
`feature/hubspot-integration` branch and remove the env vars.

## Future enhancements

Listed in priority order. Each is intentionally deferred from v1.

### v2 — hutk cookie inclusion (highest value)

The current integration captures leads but does not stitch them to
their prior browsing sessions. Adding the HubSpot tracking cookie
(`hutk`) to the server-side form submission upgrades the integration
from **"v1 = lead capture"** to **"v2 = lead intelligence"** by giving
HubSpot the visitor's full pre-form journey: which pages they viewed,
which campaign brought them in, how many sessions they had before
converting.

What gets lost without `hutk`:
- First-touch attribution (which marketing campaign / search term /
  referrer brought them)
- Multi-touch journey (which pages they viewed before submitting)
- Repeat-visit history (how many sessions before conversion)

Implementation requires reading `document.cookie` for the `hubspotutk`
cookie in the modal at submit time, sending it to the route handler in
the request body, and including it in the `context.hutk` field of the
HubSpot API payload. Estimated effort: ~10 lines across modal +
route.ts.

### v2 — extract `syncToHubSpot` to its own module

The current 59-line `syncToHubSpot` function lives inline in
`route.ts` for v1 simplicity. When v2 testing arrives, extract it to
`src/lib/integrations/hubspot-sync.ts` for unit-testability without
spinning up the full route handler.

### v2 — capture custom fields in modal

The HubSpot form was created with `firstname`, `lastname`, `email`,
`company`, `jobtitle`, `phone`, `message` (seven fields), but the
modal only collects five of those. If you want to also collect
`num_stamping_presses` and `current_mes_platform` for HubSpot CRM,
the steps are:
1. Create the two custom Contact properties in HubSpot UI (Settings → Properties → Create property)
2. Add the two fields to the existing form (UI editor)
3. Expand the modal's zod schema and inputs in `DemoRequestModal.tsx`
4. Expand `DemoRequestBody` in `route.ts` and add the two fields to the HubSpot POST body

### v3 — switch to authenticated Forms API

Only required if HubSpot rate-limits the unauthenticated Submissions
API endpoint. Set `HUBSPOT_FORMS_API_KEY` to a HubSpot private app
token and replace the unauthenticated endpoint with
`https://api.hubapi.com/marketing/v3/forms/{FORM_GUID}/submissions`
+ `Authorization: Bearer ${HUBSPOT_FORMS_API_KEY}` header.

## Future cleanup TODOs

These are pre-existing oddities surfaced during the integration but
intentionally not fixed in this PR (scope discipline).

- **Dead optional fields in `DemoRequestBody`**. The interface in
  `src/app/api/demo-request/route.ts` defines `phone?` and `message?`,
  but the modal at `src/components/modals/DemoRequestModal.tsx` does
  not render inputs for either. They are effectively dead code: no
  caller ever populates them. Either add inputs to the modal (and
  expand the HubSpot field list) or remove the fields from
  `DemoRequestBody` and the sanitization step. Don't fix in this PR.

## Known issues not introduced by this PR

- **`tests/content/sanity-checks.spec.ts:13`** imports
  `checkForPlaceholderContent` from `tests/helpers/content`, but that
  helper does not export the symbol. Running `npx tsc --noEmit`
  surfaces this as `TS2305`. The error is pre-existing on `main`,
  predates this integration, and does not affect `next build` (Next.js
  type-checks `src/` only, not `tests/`). Recorded here so a future
  reader running typecheck does not blame the HubSpot integration.

## Files modified by this integration

| File | Change |
|---|---|
| `.env.example` | +11 lines: HubSpot env-var placeholders |
| `src/app/api/demo-request/route.ts` | +73 lines: `syncToHubSpot` function and call site. Zero existing lines modified. |
| `src/app/layout.tsx` | +11 lines: `<Script>` import, env-var const, conditional script tag in `<body>`. One existing line modified (the body element) for formatting. |
| `HUBSPOT_INTEGRATION.md` | New file (this document) |
