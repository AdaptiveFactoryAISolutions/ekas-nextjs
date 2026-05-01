# 2026-05-01 — Pre-Flight Staging Report

## Files Staged

| File | Source | Destination | Lines |
|---|---|---|---|
| `2026-05-01_website_sop_audit_prompt.md` | `/home/pat/Downloads/` | `session_work/` | 451 |
| `2026-05-01_dataset_spec_prompt.md` | `/home/pat/Downloads/` | `session_work/` | 481 |

Both files moved successfully via `mv`. Source paths now empty for these filenames. File integrity (line count, header) matched expectations exactly.

## Verification Results

### Working Tree

- Branch: `main`
- Status: **DIRTY** — see *Notes for Pat* below
- Last commit: `f7a3d6d site: remove supplier-invoice content, correct founder degree, drop highly-regulated industry references`
- Build status: **NOT_TESTED** (skipped intentionally to avoid `next build` / `next dev` cache contention while dev server is running on port 3001; last green build observed during HALT-B verification of separate Quote Intelligence workstream a few minutes prior, against the same dependency lockfile, with no intervening `src/` edits)

### EKAS Production Repo

- Path checked: `/home/pat/EKAS/`
- Status: **DOES_NOT_EXIST**
- Schema sources located at expected path: **NO**

A broader sweep located three candidate repos that appear EKAS-related (each with `internal/orchestrator/src/api/models.py` and `internal/metrics-service/app/api/models.py` patterns):

- `/home/pat/ekas-pilot-deploy/`
- `/home/pat/AdaptiveFactory-Production/`
- `/home/pat/AdaptiveFactory-D1/`

The dataset spec prompt's `Working directory` line expects `/home/pat/EKAS/` for production schema reference. That path does not exist. One of the three candidates above is presumably canonical, but CC has not made that determination — Pat should either (a) clarify which is canonical, (b) symlink `/home/pat/EKAS` to it, or (c) revise the dataset spec prompt's expected path before invoking it.

## Bounded Prompt Readiness

| Prompt | Ready? | Blocker if not |
|---|---|---|
| Website SOP audit (`2026-05-01_website_sop_audit_prompt.md`) | **NO** | Working tree is dirty: untracked files `li-capture.mjs` and `li-login.mjs` at repo root, plus an out-of-band `src/app/platform/quote-intelligence/` directory currently held in `stash@{0} (QI HALT-B WIP)`. The SOP audit doesn't need EKAS production access, so once the working-tree state is resolved, this prompt is ready. |
| Dataset spec (`2026-05-01_dataset_spec_prompt.md`) | **NO** | Same working-tree blocker as above, plus the dataset spec prompt expects read access to `/home/pat/EKAS/` which does not exist. Both blockers must be resolved before this prompt can run. |

## Recommended Next Action

**Both prompts blocked.** Two distinct blockers, each easily resolved:

1. **Working tree cleanup.** Decide what to do with `li-capture.mjs` and `li-login.mjs` (commit, gitignore, delete, or stash). They are untracked and were not introduced by this prompt or the current Quote Intelligence workstream.

2. **EKAS production repo path.** Reconcile the dataset spec prompt's `/home/pat/EKAS/` expectation against the three candidate repos that actually exist. The simplest fix is a symlink: `ln -s /home/pat/AdaptiveFactory-D1 /home/pat/EKAS` (or whichever candidate is canonical). Alternatively, edit the dataset spec prompt's working-directory line before invoking it.

**Recommended invocation order once unblocked:** Website SOP audit first (smaller scope, doesn't require the production repo, produces an artifact that can gate subsequent code-touching work). Dataset spec second.

## Notes for Pat

- **`li-capture.mjs` and `li-login.mjs`** at the repo root are untracked. Filenames suggest LinkedIn-related scripts. CC did not create these, did not modify them, and did not commit them. They are still in the working tree.
- **`stash@{0}`** (`QI HALT-B WIP` on `main`) was created by CC at the start of this prompt to clear the QI workstream out of the way. It will be popped at the end of this prompt to restore your QI HALT-B state.
- **`stash@{1}`** (`WIP: demo form API wiring on demo/page.tsx (separate from Inventory 1)` on `fix/inventory-1-contradictions`) is pre-existing and unrelated to this session. CC did not touch it. Worth surfacing because dangling stashes accumulate; you may want to inspect and either pop or drop it eventually.
- **`/home/pat/EKAS B2B website/session_work/`** (parent-of-cwd, outside the git repo) exists with a separate `2026-05-01_website_content_corrections.md` file. This is **not** the same `session_work/` this prompt populates — that one is at `/home/pat/EKAS B2B website/ekas-nextjs/session_work/` (inside the repo). Both share a name. No collision occurred, but the duplication is worth noting so future prompts don't get the two confused.
- **Build skipped.** The pre-flight prompt's Step 3 build check was skipped to avoid `next build` writing into `.next/` while `next dev` is concurrently watching it on port 3001. Last green-build evidence came from HALT-B verification minutes ago (`Generating static pages (37/37)`, route table included `/platform/quote-intelligence`). No `src/` edits between then and now. If you want a fresh build verification, kill the dev server on 3001, run `npm run build`, and restart `npm run dev`.
