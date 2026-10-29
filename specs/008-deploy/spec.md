# Phase 008 - Deployment

## User stories
- **US-1** As a team member I open one link and see the latest version of the site.
- **US-2** As a visitor I can open a deep link such as `/books/OL45804W` directly and it works.
- **US-3** As a team member I push to `main` and the site updates without manual steps.

## Acceptance criteria
1. The repository builds on Vercel with the Vite preset (`npm run build`, output `dist`).
2. `vercel.json` rewrites every path to `/index.html` so client-side routes resolve.
3. A direct request to `/books/OL45804W` returns the app, not a 404.
4. The GitHub repository is connected, so a push to `main` starts a production deployment.
5. No secret, token or local configuration file is committed.
6. `README.md` lists the live URL and the local run commands.