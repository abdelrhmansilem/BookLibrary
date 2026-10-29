# Phase 007 - Polish, responsiveness and accessibility

## User stories
- **US-1** As a visitor on a phone I can use every page without zooming or horizontal scrolling.
- **US-2** As a visitor using a keyboard I can reach and see every control.
- **US-3** As a visitor who prefers reduced motion I am not forced through animations.
- **US-4** As a visitor I keep my language and theme after a reload.

## Acceptance criteria
1. Layout works from 360 px to 1440 px with no horizontal scroll.
2. The grid steps 2 / 3 / 4 / 5 columns; the desktop navbar collapses into a drawer below 900 px.
3. The drawer closes on route change and on `Escape`, and the trigger exposes `aria-expanded`.
4. Icon-only buttons have `aria-label`; every image has a meaningful `alt`.
5. `:focus-visible` is visible on every interactive element in both themes.
6. `prefers-reduced-motion` disables transitions and slows the spinner.
7. Theme and language are persisted in `localStorage` and restored before first paint.
8. Every page has exactly one `<h1>`; headings do not skip levels.
9. Colour contrast passes AA in the light and the dark palette.