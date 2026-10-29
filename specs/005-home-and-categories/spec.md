# Phase 005 - Home page and sections

## User stories
- **US-1** As a first-time visitor I understand what the site is within five seconds.
- **US-2** As a visitor I start a search straight from the hero.
- **US-3** As a visitor I see a mixed selection of books without searching first.
- **US-4** As a visitor I pick a section and land on its filtered book list.

## Acceptance criteria
1. The hero contains the tagline, a headline, a short text, a large search field and two buttons.
2. Submitting the hero search navigates to `/books?q=<term>`.
3. "Featured books" loads ten trending works and falls back to a fiction search if trending fails.
4. The section grid lists the six sections with a title and a one-line description in both languages.
5. `/categories` shows the same six sections in a full-page grid.
6. Every section card links to `/books?subject=<subject>`.
7. Each of these blocks renders loading, error-with-retry and content states.