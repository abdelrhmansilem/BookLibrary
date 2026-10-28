# Phase 002 — Technical Plan

1. `src/components/layout/Layout.jsx` = `<Navbar/> <main><Outlet/></main> <Footer/>`.
2. `src/App.jsx` declares `<Routes>` with `Layout` as the parent route.
3. `Navbar.jsx`: logo `Link`, `NavLink` list, `ThemeToggle`, `LanguageToggle`, burger button.
   - `useState` for `open`; `useLocation` effect closes the drawer on route change.
4. `ThemeToggle.jsx` / `LanguageToggle.jsx`: icon/text buttons calling their context.
5. `ScrollToTop.jsx`: `useEffect` on `pathname` -> `window.scrollTo(0,0)`.
6. `NotFound.jsx`: centred panel + link home.
7. CSS Modules per component; logical properties only.

## Risks
- Navbar overflow with long Arabic labels -> truncate labels, keep 4 main links + "more".
