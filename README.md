<div align="center">

# BookLibrary

**An online gallery of world literature — bilingual (AR/EN), dark mode ready.**
Built with React + Vite, powered by the Open Library API.

`React 19` · `Vite 8` · `React Router 7` · `CSS Modules` · `Vercel`

**Live:** https://booklibrary-roan.vercel.app

</div>

---

## What is BookLibrary?

BookLibrary is a front-end web application that lets a visitor browse a real catalogue of world
books, search in **Arabic or English**, explore them by section, and read a full page for every
book (cover, author, year, description, subjects).

It is a university team project for the Web Development course. **Front-end only** — no backend,
no database, no accounts. Everything the browser needs comes from the public
[Open Library API](https://openlibrary.org/developers/api) and `localStorage`.

### Features

- Search books by title, author or subject — against live data.
- Browse by section: fiction, science, history, children, poetry, philosophy.
- Book page with cover, metadata, description and subjects.
- Full **Arabic / English** interface with correct **RTL / LTR** switching.
- **Dark / light** theme, persisted between visits.
- Favourites saved in the browser.
- Responsive layout from 360px to desktop.
- In-app documentation at `/docs`.
- Graceful loading, empty and error states on every page.

---

## Getting started

```bash
git clone https://github.com/abdelrhmansilem/BookLibrary.git
cd BookLibrary
npm install
npm run dev
```

Open the printed URL (usually `http://localhost:5173`).

```bash
npm run build     # production build into dist/
npm run preview   # serve the production build locally
npm run lint      # oxlint
```

**Requirements:** Node.js 20+ and npm 10+.

### Lint notes

`npm run lint` (oxlint) reports **0 errors**. Five warnings remain, all intentional and easy to
defend in a discussion:

- `react/only-export-components` in the three context files — a provider and its `useX()` hook are
  exported from the same file on purpose; splitting them would add three files for no gain.
- `react/set-state-in-effect` in `Books.jsx` — changing the search term or the section resets the
  page to 1 and clears the list. The reset is the point of the effect, and the in-flight request is
  aborted by the cleanup.
- `react/set-state-in-effect` in `Navbar.jsx` — the mobile drawer closes on every route change,
  including the ones that do not come from a click inside the drawer (browser back, deep link).

---

## Project structure

```
BookLibrary/
|-- Docs/            Plan.md, design_system.md
|-- specs/           Spec-Kit artefacts, one folder per phase
|-- src/
|   |-- components/  layout, books, ui, controls
|   |-- context/     theme, i18n, favourites
|   |-- data/        the six sections
|   |-- docs/        documentation rendered in-app at /docs
|   |-- hooks/       useDebounce, useFetch
|   |-- locales/     ar.js, en.js
|   |-- pages/       Home, Books, BookDetails, Categories, About, Contact, Docs, NotFound
|   |-- services/    openLibrary.js (the only place that calls the API)
|   |-- styles/      variables.css, global.css
|   `-- utils/       format.js, markdown.jsx
|-- public/
|-- index.html
|-- vercel.json
`-- package.json
```

---

## Documentation

| Document | Contents |
|---|---|
| [`Docs/Plan.md`](Docs/Plan.md) | vision, scope, stack, architecture, pages, phases, risks |
| [`Docs/design_system.md`](Docs/design_system.md) | colour tokens, typography, spacing, component rules |
| [`specs/000-constitution.md`](specs/000-constitution.md) | the rules every phase must respect |
| `specs/001-foundation` … `specs/008-deploy` | spec, technical plan and task list per phase |
| `/docs` (in the running app) | how each part of the code works |

---

## Roadmap

| Phase | Scope | Spec-Kit folder | State |
|---|---|---|---|
| P0 | Foundation: tokens, i18n, theme, scaffold | `specs/001-foundation` | done |
| P1 | Layout, navigation, routing | `specs/002-layout` | done |
| P2 | Open Library data layer | `specs/003-data-layer` | done |
| P3 | Books catalogue + book details | `specs/004-catalogue` | done |
| P4 | Home page and sections | `specs/005-home-and-categories` | done |
| P5 | About, contact, in-app docs | `specs/006-content-pages` | done |
| P6 | Polish, responsiveness, accessibility | `specs/007-polish` | done |
| P7 | Vercel deployment | `specs/008-deploy` | done |

---

## Deployment

The site is deployed on Vercel with the Vite preset (`npm run build` → `dist`).
`vercel.json` rewrites every path to `/index.html`, so a deep link such as
`/books/OL45804W` loads the app instead of returning a 404.

The GitHub repository is connected to the Vercel project: every push to `main`
produces a new production deployment.

---

## Team

| Role | Name |
|---|---|
| Team Lead / Architecture / Docs | Abdelrhman Silem |
| Member | _TBD_ |
| Member | _TBD_ |
| Member | _TBD_ |

---

## Data credit

Book data and covers are provided by [Open Library](https://openlibrary.org), an initiative of the
Internet Archive. BookLibrary stores no book content of its own.

## License

MIT — see [LICENSE](LICENSE).