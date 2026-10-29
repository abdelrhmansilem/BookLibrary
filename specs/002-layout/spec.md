# Phase 002 — Layout and navigation

## User stories
- **US-1** As a visitor I can reach every page from the navbar on desktop and mobile.
- **US-2** As a visitor I always see where I am (active link).
- **US-3** As a visitor I can change theme and language from anywhere in one click.
- **US-4** As a visitor opening a wrong URL I get a friendly 404, not a blank page.

## Acceptance criteria
1. Routes exist: `/`, `/books`, `/books/:id`, `/categories`, `/about`, `/contact`, `/docs`, `*`.
2. Navbar is sticky, collapses into a drawer under 768px, closes on navigation.
3. Active route link is marked with `aria-current="page"` and a visible style.
4. `ScrollToTop` resets scroll on every route change.
5. Footer shows the Open Library credit, the current year and team credit.
6. `404` page has a message in both languages and a button back to `/`.
7. Keyboard: Tab order follows visual order; Escape closes the mobile drawer.
