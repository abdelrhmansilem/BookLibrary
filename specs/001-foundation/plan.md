# Phase 001 — Technical Plan

## Steps
1. Scaffold with `npm create vite@latest -- --template react` (already done).
2. Replace the template CSS with `src/styles/variables.css` (tokens) and `src/styles/global.css`
   (reset, base typography, container, utility classes).
3. Write `src/locales/ar.js` and `src/locales/en.js` as plain objects; export `dictionaries = { ar, en }`.
4. `src/context/I18nContext.jsx`:
   - state `lang`, default from `localStorage` then `navigator.language.startsWith('ar') ? 'ar' : 'en'`;
   - `t(path)` resolves dotted keys with a fallback to English then to the key itself;
   - `useEffect` sets `document.documentElement.lang` and `.dir`, and saves to localStorage.
5. `src/context/ThemeContext.jsx`: state `theme`, default `localStorage` else
   `matchMedia('(prefers-color-scheme: dark)')`; `useEffect` sets `data-theme` and saves.
6. Wrap both providers in `src/main.jsx` around `<App />`.
7. Delete template assets that are not used (`App.css`, `react.svg`, counter demo).

## Files created
```
src/styles/variables.css
src/styles/global.css
src/locales/ar.js
src/locales/en.js
src/context/I18nContext.jsx
src/context/ThemeContext.jsx
src/main.jsx (rewritten)
src/App.jsx   (placeholder shell for P1)
```

## Decisions
- Custom i18n instead of i18next: 80 lines, one concept, zero dependencies.
- CSS Modules per component + one global stylesheet, because Vite supports both natively.
- Tokens live in `:root` and are overridden in `[data-theme="dark"]`; no JS colour logic.
