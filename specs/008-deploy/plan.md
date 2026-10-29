# Phase 008 - Technical Plan

```
vercel.json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

Steps
1. `npm run build` locally; confirm `dist/` is produced without warnings.
2. Import the GitHub repository in Vercel; the framework preset **Vite** is detected
   (`npm run build` / `dist`).
3. Keep `vercel.json` in the repository root so the rewrite applies to every deployment.
4. Connect the repository to the project so `main` deploys automatically.
5. Verify: home, `/books`, `/books/:id`, `/docs` and an unknown route on the live URL.
6. Add the live URL to `README.md`.

Notes
- `.gitignore` excludes `node_modules`, `dist`, local configuration files and local tooling output.
- The app needs no environment variables: Open Library is public and keyless.