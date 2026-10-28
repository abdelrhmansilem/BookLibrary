# Phase 003 — Data layer

## User stories
- **US-1** As a developer I call one function to search books and get clean objects.
- **US-2** As a visitor, a slow or failed API never leaves me on a blank screen.
- **US-3** As a visitor, typing in search does not fire a request per keystroke.

## Acceptance criteria
1. `searchBooks({ query, subject, page, limit, signal })` returns
   `{ books: Book[], total: number, page: number }`.
2. `getBook(id)` returns one normalised `Book` or throws a typed error.
3. `Book = { id, title, author, year, cover, description, subjects }` — every field always present,
   with `null`/placeholder fallbacks.
4. Requests abort cleanly (`AbortController`) and time out after 12s with a readable message.
5. `useDebounce(value, 400)` exists and is used by the search field.
6. Loading, error (with retry) and empty states are rendered by every consumer.
