# Phase 003 — Technical Plan

```
services/openLibrary.js
  BASE = 'https://openlibrary.org'
  COVER = 'https://covers.openlibrary.org/b/id'
  searchBooks()  -> /search.json?q=...&page=..&limit=24
  getBook(id)    -> /works/{id}.json
  normalizeBook(doc) -> Book
  coverUrl(id, size='M')
hooks/useDebounce.js
hooks/useFetch.js   -> { data, loading, error, retry }
utils/format.js     -> formatYear, truncate, firstLetter
```

Notes
- Search combines query and subject: `q = [query, subject && `subject:${subject}`].filter(Boolean).join(' ')`.
- Descriptions may be a string or `{ value }` — normalise both.
- A work may have no `covers` array -> `cover = null` -> `BookCover` placeholder.
