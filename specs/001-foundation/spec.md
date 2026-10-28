# Phase 001 — Foundation

## User stories

- **US-1** As a developer, I clone the repo, run `npm install` and `npm run dev`, and see BookLibrary start.
- **US-2** As a developer, I find every colour, spacing and radius value in one variables file.
- **US-3** As a visitor, I switch between Arabic and English and the layout flips to RTL/LTR correctly.
- **US-4** As a visitor, I switch between dark and light, and my choice survives a refresh.

## Acceptance criteria

1. `npm run dev` and `npm run build` both succeed with no warnings in the console.
2. `src/styles/variables.css` defines every token from `Docs/design_system.md`, for both themes.
3. `<html>` receives `lang` and `dir` from the i18n context on every language change.
4. Theme is applied as `data-theme="dark"` on `<html>` and stored under `booklibrary.theme`.
5. Language is stored under `booklibrary.lang`; first visit follows `navigator.language`.
6. Both `src/locales/ar.js` and `src/locales/en.js` export the same key structure.
7. Google Fonts (Cairo, Inter) load with `display=swap`.
8. No dependency beyond react, react-dom, react-router-dom.
