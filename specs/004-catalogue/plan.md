# Phase 004 - Technical Plan

```
pages/Books.jsx
  useSearchParams()        -> ?q= and ?subject=
  useDebounce(query, 450)  -> debouncedQuery
  searchBooks({ query, subject, page, signal })
  state: { books, total, page } + loading / error / attempt
components/books/
  BookGrid  -> <ul> of BookCard
  BookCard  -> link + cover + title + author + year + favourite button
  BookCover -> <img> or placeholder (initial letter)
  SearchBar -> controlled form, submit + clear

pages/BookDetails.jsx
  useParams() -> id
  useFetch(signal => getBook(id, { signal }), [id])
  renders <article> with <dl> metadata, description, subjects, external link
```

Notes
- Pagination is "load more", not numbered pages: simpler state, no page math in the UI.
- `page === 1` replaces the list, later pages append to it.
- Changing the query or the subject resets to page 1 and clears the list.
- Favourites live in `FavouritesContext`, so the card and the detail page stay in sync.
- The detail page merges `/works/{id}.json` (description) with a `key:"/works/{id}"` search
  (author, year, cover), because the work endpoint does not carry those fields.