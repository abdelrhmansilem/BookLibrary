<div align="center">

# BookLibrary

**An online gallery of world literature — bilingual (AR/EN), dark mode ready.**
Built with React + Vite, powered by the Open Library API.

`React 19` · `Vite 8` · `React Router 7` · `CSS Modules` · `Vercel`

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

---

## Project structure

```
BookLibrary/
|-- Docs/            Plan.md, design_system.md
|-- specs/           Spec-Kit artefacts per phase
|-- src/
|   |-- components/  layout, books, ui, controls
|   |-- context/     theme, i18n, favourites
|   |-- docs/        documentation rendered in-app at /docs
|   |-- hooks/       useDebounce, useFetch
|   |-- locales/     ar.js, en.js
|   |-- pages/       Home, Books, BookDetails, Categories, About, Contact, Docs, NotFound
|   |-- services/    openLibrary.js (the only place that calls the API)
|   |-- styles/      variables.css, global.css
|   `-- utils/
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
| `specs/<phase>/` | spec, technical plan and task list per phase |
| `/docs` (in the running app) | how each part of the code works |

---

## Roadmap

| Phase | Scope | State |
|---|---|---|
| P0 | Foundation: tokens, i18n, theme, scaffold | in progress |
| P1 | Layout, navigation, routing | planned |
| P2 | Open Library data layer | planned |
| P3 | Books catalogue + book details | planned |
| P4 | Home + categories | planned |
| P5 | About, contact, in-app docs | planned |
| P6 | Polish and accessibility | planned |
| P7 | Vercel deployment | planned |

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
