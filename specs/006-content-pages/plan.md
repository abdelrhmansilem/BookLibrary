# Phase 006 - Technical Plan

```
pages/About.jsx
  STACK[]  -> name + one-line reason
  TEAM[]   -> role key + name
  sections: what / stack / team table / data source

pages/Contact.jsx
  state: form { name, email, message }, errors{}, sent
  validate(): required, min length, email pattern, 500 char cap
  fields rendered from an array so the markup is not duplicated

pages/DocsPage.jsx
  import md from '../docs/0X-*.md?raw'
  DOCS[] = [{ id, content }]
  ?doc=<id> selects the document
  renderMarkdown(content) -> React nodes

utils/markdown.jsx
  renderMarkdown(md)  block parser  (fence, heading, list, paragraph)
  markdownTitle(md)   first H1, used as the sidebar label

pages/NotFound.jsx
  big 404, one sentence, one link home
```

Notes
- The Markdown renderer is about 90 lines and supports exactly the syntax our own files use.
  A dependency would have been larger than the parser.
- Markdown is imported with Vite's `?raw` suffix, so the files stay real `.md` files in the repo
  and still ship inside the bundle.
- The contact form is intentionally client-side only; validation is the exercise, not delivery.