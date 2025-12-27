# Contributing to GitCalm

## Code Review Policy
All changes must undergo a mandatory peer review before merging to `main`.

### Requirements
1.  **Pull Request**: Create a PR for every change. Direct pushes to `main` are blocked.
2.  **Reviewers**: At least 1 approval from a code owner is required.
3.  **CI Checks**: All GitHub Action checks (including `Security & Quality Check`) must pass.
    *   `npm audit` (0 vulnerabilities)
    *   `npm run lint`
    *   `npm run build`

### Security Checklist for Reviewers
- [ ] **Input Validation**: Are all inputs validated using Zod?
- [ ] **Authorization**: Does the route enforce `auth()` checks?
- [ ] **Secrets**: Are any new secrets properly added to `.env` and Vercel? (No hardcoded values)
- [ ] **Logs**: Did you verify no sensitive data is logged?

## Testing
- Run security unit tests: `npm test`
- Manually verify critical flows (Login, Integration Setup).
