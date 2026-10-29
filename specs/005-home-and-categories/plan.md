# Phase 005 - Technical Plan

```
data/categories.js
  CATEGORIES = [{ id, subject }]   // six sections, subject is what Open Library expects
  findCategory(id)

pages/Home.jsx
  hero (tagline, title, text, SearchBar size="lg", two links)
  featured  -> useFetch(signal => getTrendingBooks(10, { signal }))
  sections  -> <ul> of CategoryCard
  steps     -> static three-step explainer

pages/Categories.jsx
  same CATEGORIES, full-page grid

components/books/CategoryCard.jsx
  <Link to={`/books?subject=${encodeURIComponent(category.subject)}`}>
```

Notes
- The six sections are data, not translation keys: `id` selects the copy,
  `subject` is the query value. One array drives both pages.
- Section copy lives under `categories.items.<id>` in `ar.js` and `en.js`.
- `getTrendingBooks` catches anything except a timeout and retries with `subject:fiction`,
  so the home page is never empty because of one flaky endpoint.