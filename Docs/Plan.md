# BookLibrary — Project Plan

> **Course:** Web Development (Front-End)
> **Type:** Team project — React Single Page Application
> **Team Lead:** Abdelrhman Silem
> **Status:** Approved — updated at the end of every phase
> **Last update:** 2026-10-28

---

## 1. Vision

**BookLibrary** is an online gallery of world literature. A visitor browses a real catalogue of
books pulled live from the **Open Library API**, searches in Arabic or English, moves between
sections (fiction, science, history, children...), opens a book page to see its cover, author,
description and subjects, and switches between **dark / light** and **Arabic / English (RTL)**
at any moment.

**Academic goal:** a **front-end only** project that is small enough to defend in a discussion.
Every single line must be understood by the team (the course rule for vibe coding). No feature is
added unless the team can explain the React concept behind it.

### Definition of Done
- [ ] Published on Vercel with a working public URL.
- [ ] Every page in section 5 exists and works.
- [ ] Arabic + English with correct RTL/LTR switching, persisted after reload.
- [ ] Dark + light theme, persisted after reload.
- [ ] Repo is clean: README, Docs/, specs/, .gitignore, no secrets.
- [ ] Every module explained in `src/docs/` and readable inside the site at `/docs`.

---

## 2. Scope

### In scope
| Item | Note |
|---|---|
| React SPA (Vite) | pages, routing, components, local state |
| Open Library API | free, no API key, CORS enabled, real book data |
| AR / EN + RTL | custom lightweight i18n via React Context (no extra library) |
| Dark / Light theme | CSS variables + Context + localStorage |
| Favourites (My Shelf) | localStorage only, no accounts |
| Responsive layout | mobile, tablet, desktop |
| Deployment | Vercel static hosting |
| Documentation | `Docs/`, `specs/`, `src/docs/` (shown in-app) |

### Out of scope (explicitly)
Backend, database, real authentication, admin panel, payments, PWA/offline, unit/e2e tests,
CI/CD beyond Vercel auto-deploy. Anything else goes to **Future Work** (section 14) — the project
must not grow beyond what the team can explain.

---

## 3. Technology Stack

| Layer | Choice | Why |
|---|---|---|
| Build | **Vite 8** | instant dev server, static build, near-zero config |
| UI | **React 19** | required by the course |
| Language | **JavaScript + JSX** | fewer moving parts than TS for a course project |
| Routing | **react-router-dom v7** | the standard SPA router; works with Vercel rewrites |
| Styling | **CSS Modules + CSS variables** | zero build step, theme switch is one attribute |
| i18n | **custom Context** (`I18nProvider`) | ~80 lines, fully explainable, no dependency |
| State | **React Context + hooks** | theme, language and favourites are simple global values |
| Data | **Open Library REST API** | real world books, no key, no cost |
| Icons | **inline SVG components** | no icon package, each icon is readable markup |
| Lint | **oxlint** | ships with the Vite template |
| Hosting | **Vercel** | static hosting + SPA rewrites |
| VCS | **GitHub** | agreed repository |

**Rejected on purpose:** Tailwind, Redux, Next.js, UI kits, i18next, axios.
Every one of them adds a concept the team would have to explain without adding academic value.

---

## 4. Architecture Overview

```
Browser (SPA)
 |
 index.html -> src/main.jsx
                 |
                 v
        <BrowserRouter>
                 |
                 v
        <I18nProvider>          language + dir (rtl/ltr) + t()
          <ThemeProvider>       theme + data-theme attribute
            <FavouritesProvider> ids saved in localStorage
              <App />
                 |
                 v
              <Layout>          Navbar + <Outlet /> + Footer
                 |
                 v
              <Routes>          /  /books  /books/:id  /categories  /about  /contact  /docs  *
                 |
                 v
             pages/*            fetch + render
                 |
                 v
        services/openLibrary.js ----> https://openlibrary.org
```

### Architecture rules
1. **Pages fetch, components render.** `BookCard` never calls the API; it receives props.
2. **One data module.** All HTTP lives in `services/openLibrary.js`. Nothing else calls `fetch`.
3. **All user-facing text comes from `locales/`.** No hard-coded Arabic or English inside JSX.
4. **Theme is CSS.** Switching dark mode flips `data-theme` on `<html>`; no re-render of the tree.
5. **Small files.** If a component passes ~120 lines it is split.
6. **No dead code.** Anything not used in the final demo is deleted before submission.

---

## 5. Pages

| # | Page | Route | What it contains |
|---|---|---|---|
| 1 | **Home** | `/` | Hero + search box + featured books row + quick category links + small "how it works" strip |
| 2 | **Books** | `/books` | Search field, subject filter, book grid, load-more pagination, loading/error/empty states |
| 3 | **Book Details** | `/books/:id` | Large cover, title, author, year, description, subjects, favourite button, back link |
| 4 | **Categories** | `/categories` | Cards for Fiction, Science, History, Children, Poetry, Philosophy -> each links to `/books?subject=...` |
| 5 | **About BookLibrary** | `/about` | What the project is, the stack, the team table, why we built it |
| 6 | **Contact** | `/contact` | Name / email / message with client-side validation, clearly labelled as a demo form (no backend) |
| 7 | **Docs** | `/docs` | The project documentation rendered inside the site from `src/docs/*.md` |
| 8 | **Not Found** | `*` | Friendly 404 with a link home |

**Shared components:** `Navbar`, `Footer`, `ThemeToggle`, `LanguageToggle`, `BookCard`,
`BookGrid`, `SearchBar`, `CategoryCard`, `Spinner`, `ErrorMessage`, `EmptyState`, `Pagination`,
`ScrollToTop`, `Button`, `Input`, `Textarea`.

---

## 6. Project Structure

```
BookLibrary/
|-- Docs/
|   |-- Plan.md                 <- this file
|   `-- design_system.md        <- colours, type, spacing, component rules
|-- specs/                      <- Spec-Kit artefacts, one folder per phase
|   |-- 000-constitution.md
|   |-- 001-foundation/{spec,plan,tasks}.md
|   |-- 002-layout/
|   |-- 003-data-layer/
|   |-- 004-books/
|   |-- 005-home-categories/
|   |-- 006-pages/
|   `-- 007-deploy/
|-- public/
|-- src/
|   |-- components/
|   |   |-- layout/     Navbar, Footer, Layout, ScrollToTop
|   |   |-- books/      BookCard, BookGrid, BookCover
|   |   |-- ui/         Button, Input, Textarea, Spinner, ErrorMessage, EmptyState, Pagination
|   |   `-- controls/   ThemeToggle, LanguageToggle
|   |-- context/        ThemeContext, I18nContext, FavouritesContext
|   |-- docs/           in-app documentation (markdown, loaded by /docs)
|   |-- hooks/          useDebounce, useFetch
|   |-- locales/        ar.js, en.js
|   |-- pages/          Home, Books, BookDetails, Categories, About, Contact, Docs, NotFound
|   |-- services/       openLibrary.js
|   |-- styles/         variables.css, global.css
|   |-- utils/          format.js
|   |-- App.jsx
|   `-- main.jsx
|-- index.html
|-- vercel.json
|-- package.json
`-- README.md
```

---

## 7. Data Layer

**Source:** Open Library (Internet Archive) — `https://openlibrary.org`, no key required.

| Need | Endpoint |
|---|---|
| Search / browse | `/search.json?q={query}&page={n}&limit=24` |
| Filter by subject | `/search.json?q=subject:{subject}&page={n}` |
| Work details | `/works/{id}.json` (id like `OL45804W`) |
| Cover image | `https://covers.openlibrary.org/b/id/{cover_i}-M.jpg` |

**Rules**
- Every request goes through `services/openLibrary.js`, with `AbortController` and a timeout.
- Raw API objects are normalised before they reach React:
  `{ id, title, author, year, cover, description, subjects }` by `normalizeBook()`.
- Missing data never breaks the UI: fallback title, placeholder cover, hidden description block.
- Every page handles three states: **loading**, **error + retry**, **empty**.
- Search input is debounced (~400ms) so we do not hammer the API on every keystroke.

---

## 8. Design System (summary)

Full detail in `Docs/design_system.md`.

- **Palette:** deep ink blue as the primary (books, paper, night), warm amber accent, neutral surfaces.
- **Themes:** `:root` (light) and `[data-theme="dark"]` (dark) in `variables.css`.
- **Fonts:** `Cairo` for Arabic, `Inter` for Latin, loaded from Google Fonts.
- **Spacing scale:** 4 / 8 / 12 / 16 / 24 / 32 / 48 / 64.
- **Radius:** 8 / 12 / 20. **Shadows:** two levels only.
- **Breakpoints:** 480 / 768 / 1024 / 1280 (mobile first).
- **Direction:** `<html dir="rtl" lang="ar">` for Arabic, `ltr`/`en` for English.

---

## 9. Implementation Plan (Phases)

Each phase is a deliverable with its own spec folder under `specs/`.

| Phase | Name | Output | Est. |
|---|---|---|---|
| **P0** | Foundation | Vite scaffold, Docs, design tokens, i18n + theme providers, folder skeleton | 2 days |
| **P1** | Layout & Navigation | Layout, Navbar, Footer, routes, 404, theme + language toggles | 2 days |
| **P2** | Data Layer | `openLibrary.js`, `useDebounce`, `useFetch`, loading/error states | 2 days |
| **P3** | Books | `/books` with search, subject filter, grid, pagination | 3 days |
| **P4** | Book Details | `/books/:id` with normalised details and favourite toggle | 2 days |
| **P5** | Home & Categories | `/` and `/categories` complete | 2 days |
| **P6** | About, Contact, Docs | `/about`, `/contact`, `/docs` (markdown rendered in-app) | 2 days |
| **P7** | Polish | responsive pass, accessibility, empty states, performance | 2 days |
| **P8** | Deploy & Handover | Vercel, README final, explanation rehearsal | 1 day |

**Total:** ~18 working days plus review time = **about 4 weeks**.
**Dependency chain:** P0 -> P1 -> P2 -> (P3 / P5 in parallel) -> P4 -> P6 -> P7 -> P8.

---

## 10. Spec-Kit Workflow

The project follows GitHub Spec-Kit's spec-driven development loop:

```
constitution -> specify -> clarify -> plan -> tasks -> implement
```

| Artifact | File |
|---|---|
| Project constitution (non-negotiable rules) | `specs/000-constitution.md` |
| What a phase must do (user stories + acceptance criteria) | `specs/<phase>/spec.md` |
| How we build it technically | `specs/<phase>/plan.md` |
| Atomic tasks with an owner | `specs/<phase>/tasks.md` |

We write these by hand instead of running the `specify` CLI: the project is small and the team
needs to read and defend every line.

---

## 11. Team & Ownership

| Role | Person | Responsibilities |
|---|---|---|
| **Team Lead / Architect** | Abdelrhman Silem | plan, architecture decisions, reviews, docs, deployment |
| Member 2 | TBD | Home page, Navbar/Footer, theme toggle |
| Member 3 | TBD | Books page, Book Details, data layer |
| Member 4 | TBD | Categories, About, Contact |
| Member 5 | TBD | i18n, design system, in-app Docs page, accessibility |

Fewer members: merge roles, but **the author of a feature is never its only reviewer**.

**Working rules**
- One branch per task: `feat/<phase>/<task>` -> Pull Request into `main`.
- The Team Lead reviews every PR before merge.
- Commit prefixes: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`.
- No direct pushes to `main` after P0.

---

## 12. Risk Register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Open Library slow or down | medium | medium | timeout + error state + retry button, in-memory cache |
| Incomplete API data (no cover/description) | high | low | `normalizeBook()` fallbacks, placeholder cover |
| Team cannot explain generated code | high | **high (grade)** | `src/docs/` written with the code, not after; rehearsal before submission |
| Scope creep | medium | medium | fixed out-of-scope list, weekly review |
| Rate limiting | low | medium | debounce + `limit=24` + no request per keystroke |
| Vercel 404 on refresh of a sub-route | medium | high | `vercel.json` SPA rewrite |

---

## 13. Quality Notes

- No `dangerouslySetInnerHTML`. Book descriptions from the API are rendered as plain text.
- Contact form does not send anything and says so in the UI.
- `rel="noopener noreferrer"` on every external link.
- `alt` on every image, `label` on every input, visible `:focus-visible` outline.
- Colour contrast checked in both themes (AA for body text).

---

## 14. Future Work (not delivered)

User accounts (Supabase), real contact backend, reading lists and ratings, PWA/offline,
PDF export of a shelf, Vitest + Playwright, GitHub Actions CI.

---

## 15. Documentation Deliverables

| File | Audience |
|---|---|
| `README.md` | anyone opening the repo: what, how to run, team, stack, live link |
| `Docs/Plan.md` | team + instructor: the whole plan |
| `Docs/design_system.md` | team: tokens and component rules |
| `specs/**` | team: phase by phase requirements and tasks |
| `src/docs/*.md` | team + visitor inside the site at `/docs`: how each part works |
