# BookLibrary — Design System

The single source of truth for colours, type, spacing and component behaviour.
Every value here is implemented in `src/styles/variables.css` — if the code and this file
disagree, this file wins and the code is fixed.

---

## 1. Design principles

1. **The books are the interface.** Covers get the space; chrome is quiet.
2. **Calm surfaces.** Paper-like neutrals in light mode, deep ink in dark mode. No gradients on large areas.
3. **One accent.** Amber is used only for action and focus. If everything is highlighted, nothing is.
4. **Two directions by design.** Every layout decision must survive `dir="rtl"`. Use logical
   properties (`margin-inline`, `padding-inline`, `inset-inline`) instead of `left/right`.
5. **Contrast first.** Body text passes WCAG AA in both themes.

---

## 2. Colour

### Tokens (light theme — default)

| Token | Value | Use |
|---|---|---|
| `--color-bg` | `#f7f5f0` | page background (warm paper) |
| `--color-surface` | `#ffffff` | cards, navbar, inputs |
| `--color-surface-2` | `#efece4` | hover, skeleton, subtle panels |
| `--color-text` | `#1b1c1d` | primary text |
| `--color-text-muted` | `#5c6066` | secondary text, metadata |
| `--color-border` | `#e0dcd2` | dividers, card borders |
| `--color-primary` | `#1f3a5f` | brand, links, primary buttons (ink blue) |
| `--color-primary-hover` | `#2b4f7d` | hover state |
| `--color-primary-contrast` | `#ffffff` | text on primary |
| `--color-accent` | `#c8892b` | highlight, favourite active, badges |
| `--color-success` | `#2f7d5b` | success messages |
| `--color-danger` | `#b3392f` | errors, required fields |
| `--shadow-1` | `0 1px 2px rgba(27,28,29,.06)` | cards at rest |
| `--shadow-2` | `0 8px 24px rgba(27,28,29,.10)` | hover, navbar on scroll |

### Tokens (dark theme — `[data-theme="dark"]`)

| Token | Value |
|---|---|
| `--color-bg` | `#121417` |
| `--color-surface` | `#1a1d21` |
| `--color-surface-2` | `#23272c` |
| `--color-text` | `#ecebe7` |
| `--color-text-muted` | `#a0a6ad` |
| `--color-border` | `#2e3339` |
| `--color-primary` | `#7fa8d9` |
| `--color-primary-hover` | `#9dc0e8` |
| `--color-primary-contrast` | `#0f1216` |
| `--color-accent` | `#e0a44a` |
| `--shadow-1` | `0 1px 2px rgba(0,0,0,.40)` |
| `--shadow-2` | `0 8px 24px rgba(0,0,0,.55)` |

**Rule:** components never use a raw hex value. Only `var(--token)`.

---

## 3. Typography

| Role | Family | Size | Weight | Line-height |
|---|---|---|---|---|
| Display (hero) | Cairo / Inter | 40–48px `clamp()` | 700 | 1.15 |
| H1 | Cairo / Inter | 32px | 700 | 1.2 |
| H2 | Cairo / Inter | 24px | 700 | 1.25 |
| H3 | Cairo / Inter | 18px | 600 | 1.35 |
| Body | Cairo / Inter | 16px | 400 | 1.7 |
| Small / meta | Cairo / Inter | 14px | 400 | 1.5 |
| Caption | Cairo / Inter | 12px | 500 | 1.4 |

- Font stacks:
  - `--font-ar: "Cairo", "Segoe UI", system-ui, sans-serif`
  - `--font-en: "Inter", "Segoe UI", system-ui, sans-serif`
- The `<html lang>` value selects the stack (`:root[lang="ar"]`).
- Arabic body line-height is slightly larger (1.8) for legibility.
- Headings never use letter-spacing (it breaks Arabic joining).

---

## 4. Spacing & layout

```
--space-1: 4px    --space-2: 8px    --space-3: 12px   --space-4: 16px
--space-5: 24px   --space-6: 32px   --space-7: 48px   --space-8: 64px
```

- Page container: `max-width: 1200px`, inline padding `var(--space-5)` (mobile `var(--space-4)`).
- Section rhythm: `padding-block: var(--space-8)` desktop, `var(--space-6)` mobile.
- Grid gutters: `var(--space-5)`.

### Breakpoints (mobile first)

| Name | Min width | Layout |
|---|---|---|
| `sm` | 480px | 2 book columns |
| `md` | 768px | nav full, 3 columns |
| `lg` | 1024px | 4 columns, sidebar filters |
| `xl` | 1280px | 5 columns |

---

## 5. Radius, borders, shadows

| Token | Value | Use |
|---|---|---|
| `--radius-sm` | 8px | inputs, chips |
| `--radius-md` | 12px | cards, buttons |
| `--radius-lg` | 20px | modals, hero panels |
| `--border` | `1px solid var(--color-border)` | everywhere |
| `--shadow-1` / `--shadow-2` | see colour section | rest / hover |

---

## 6. Components

### Button
- Variants: `primary` (filled), `secondary` (outline), `ghost` (text only).
- Sizes: `sm` 32px, `md` 40px, `lg` 48px height.
- Radius `--radius-md`, padding-inline `--space-4`, font-weight 600.
- States: hover (colour shift + `--shadow-1`), active (translateY 1px), disabled (opacity .5,
  `cursor: not-allowed`), focus (`2px` outline in `--color-accent`, `2px` offset).

### Input / Textarea
- Height 40px (textarea free), radius `--radius-sm`, border `--border`.
- Focus: border `--color-primary` + ring `0 0 0 3px color-mix(in srgb, var(--color-primary) 20%, transparent)`.
- Error: border `--color-danger` + helper text below in `--color-danger`, 14px.

### BookCard
- Structure: cover (2:3 ratio) -> title (2 lines max, ellipsis) -> author (1 line, muted).
- Hover: lift `translateY(-2px)` + `--shadow-2`, cover zoom `scale(1.03)` inside `overflow:hidden`.
- Cover fallback: neutral panel with the title's first letter and a book icon.
- Whole card is one `<Link>`; the favourite button sits above it with its own `onClick`.

### Navbar
- Sticky top, `--color-surface` with `backdrop-filter: blur(8px)`.
- Height 64px desktop / 56px mobile.
- Contains: logo (book icon + wordmark), nav links, `ThemeToggle`, `LanguageToggle`, mobile menu button.
- Mobile: links collapse into a full-width drawer under the bar.
- `aria-current="page"` on the active link.

### BookGrid
- `display: grid; gap: var(--space-5)`, columns per breakpoint.
- Loading: 8 skeleton cards (no spinner for the grid; spinner only for page-level loads).
- Empty: icon + message + "clear search" button.

### CategoryCard
- Big label, one-line description, arrow icon that flips with `dir`.
- Background `--color-surface`, border, hover accent bar on the inline-start edge.

### Footer
- Three columns on desktop (about, links, credits), stacked on mobile.
- Contains the "data by Open Library" credit and the year.

### Toggles
- `ThemeToggle`: icon button, sun/moon, `aria-label` from the dictionary, 40×40px.
- `LanguageToggle`: text button showing the target language (`العربية` / `English`).

---

## 7. Motion

| Token | Value |
|---|---|
| `--transition-fast` | `120ms ease` |
| `--transition-base` | `220ms ease` |

- Animate only `transform`, `opacity`, `background-color`, `border-color`, `box-shadow`.
- Respect `@media (prefers-reduced-motion: reduce)`: set transitions to `none`.
- No parallax, no scroll-jacking.

---

## 8. Accessibility rules

- Every interactive element is reachable by keyboard in DOM order.
- Focus outline is never removed — only restyled.
- Icon-only buttons need `aria-label` from the dictionary.
- Images: meaningful `alt` for covers (`"Cover of {title}"`), `alt=""` for decoration.
- Form fields: `<label for>` + `aria-describedby` for errors.
- Colour is never the only signal (favourite uses icon + colour, errors use icon + text).
- Target size ≥ 40×40px.

---

## 9. RTL checklist

- [ ] No `left` / `right` in CSS — use `inset-inline`, `margin-inline`, `padding-inline`.
- [ ] Icons that imply direction (arrows) are mirrored with `[dir="rtl"] .icon-arrow { transform: scaleX(-1); }`.
- [ ] Numbers and years stay LTR inside Arabic text (`unicode-bidi: plaintext` where needed).
- [ ] Book titles returned in Latin script are displayed as-is (no forced translation).
- [ ] The language toggle updates `document.documentElement.lang` and `.dir`.

---

## 10. Naming conventions

| Kind | Convention | Example |
|---|---|---|
| CSS variables | `--color-*`, `--space-*`, `--radius-*`, `--font-*` | `--color-primary` |
| CSS Modules class | camelCase | `styles.bookCard` |
| Components | PascalCase file + component | `BookCard.jsx` |
| Hooks | `use` prefix | `useDebounce.js` |
| Context | `<Name>Context` + `use<Name>` | `ThemeContext`, `useTheme` |
| Translation keys | dotted, grouped | `nav.home`, `books.searchPlaceholder` |
