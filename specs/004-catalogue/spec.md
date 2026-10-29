# Phase 004 - Catalogue and book details

## User stories
- **US-1** As a visitor I type a word and see matching books from the real catalogue.
- **US-2** As a visitor I narrow the list by section without losing my search term.
- **US-3** As a visitor I open one book and see its cover, author, year, description and subjects.
- **US-4** As a visitor I mark a book as a favourite and find it again after a reload.

## Acceptance criteria
1. `/books` shows a grid of book cards; each card links to `/books/:id`.
2. The search box is debounced (450 ms) and never fires one request per keystroke.
3. The section filter writes `?subject=` into the URL, so the view is shareable and survives a reload.
4. "Load more" appends the next page and hides itself when the list is complete.
5. `/books/:id` renders title, author, year, cover, description and up to 10 subjects.
6. A book without a cover shows a readable placeholder, never a broken image.
7. A missing work shows a friendly "not found" state, not an error trace.
8. Favourite state is stored in `localStorage` under `booklibrary.favourites`.