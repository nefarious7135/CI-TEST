# Pull Request Guideline (Playwright + TypeScript)

## 1) Principle

- All changes to `main` must go through Pull Request (PR).
- PR must pass CI and be reviewed/approved before merging.

## 2) Branch Workflow

1. Create a branch from `main`
2. Commit on your branch
3. Push branch
4. Open PR to `main`
5. Fix issues from CI / review
6. Merge when all checks pass and approvals are done

## 3) PR Title (Required)

### Sprint

Format:
`Sprint_<number> <type>: <short description>`

Examples:

- `Sprint_1 feature: login flow`
- `Sprint_1 fix: flaky web-form test`
- `Sprint_2 chore: update CI`
- `Sprint_1 refactor: page objects`

### Hotfix

Format:
`Hotfix: <short description>`

Example:

- `Hotfix: login crash`

> PR naming is enforced by `PR Naming Check`. Invalid titles will fail CI.

## 4) Required Checks (CI)

PR must pass:

- `quality`: format:check + lint + typecheck
- `smoke`: test:smoke
- `PR Naming Check`

## 5) Reviewer Checklist (Playwright)

- Prefer stable locators: `getByRole`, `getByLabel`
- Avoid `waitForTimeout()` as a workaround
- No `test.only` / `describe.only`
- Assertions (`expect`) should be meaningful
- Keep changes focused (avoid unrelated edits)

## 6) Before Creating PR (Recommended Local Run)

Run locally:

- `npm run format`
- `npm run lint`
- `npm run typecheck`
- `npm run test:smoke`
