# Phase 007 - Technical Plan

```
styles/variables.css   all tokens, light on :root, dark on [data-theme="dark"]
styles/global.css      reset, base typography, .container, .section, .visually-hidden
*.module.css           one file per component, logical properties only
                       (margin-inline-start, padding-inline, inset-inline-end)
```

Checklist used during the pass
- Replace every `left`/`right` with the logical equivalent so RTL needs no extra CSS.
- Mirror direction-only icons with `:root[dir="rtl"] .flip-rtl { transform: scaleX(-1) }`.
- Give each async block three states: loading, error with retry, empty.
- Add `aria-label` to icon buttons, `aria-pressed` to the favourite toggle.
- Keep one `<h1>` per page; section blocks start at `<h2>`.
- Test at 360, 768, 1024 and 1440 px in both themes and both directions.