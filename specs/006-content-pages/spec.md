# Phase 006 - About, contact and in-app documentation

## User stories
- **US-1** As a visitor I can read what the project is, what it is built with, and who made it.
- **US-2** As a visitor I can send feedback and get clear validation messages.
- **US-3** As a team member I can open `/docs` and read how each part of the code works.

## Acceptance criteria
1. `/about` covers: what the project is, the technology list, the team table and the data source.
2. `/contact` validates name, email and message in the browser and reports one message per field.
3. The contact form states clearly that nothing is sent and no server is involved.
4. Every error message is translated and attached to its field with `aria-describedby`.
5. `/docs` lists eight documents in a sidebar and renders the selected one.
6. The documentation is Markdown stored in `src/docs/`, imported with `?raw`.
7. A Markdown renderer handles headings, paragraphs, lists, fenced code, bold, inline code and links.
8. Unknown routes render a 404 page with a way back home.