# BookLibrary Constitution

Version 1.0.0 — ratified 2026-10-28 — Team Lead: Abdelrhman Silem

Every phase spec, plan, task and pull request must comply with these articles.
If a rule must be broken, it is written in `Docs/Plan.md` under Decisions with a reason.

---

## Article I — The team must understand every line

1. No code is merged unless its author can explain what it does, why it exists and what breaks without it.
2. Every module has a matching file in `src/docs/` written **while** the code is written, not after.
3. AI-generated code is allowed, but it is reviewed line by line before the PR is opened.
4. A concept we cannot explain is removed, not commented.

## Article II — Front-end only

1. No backend, database, server secret or authenticated API.
2. All persistence is `localStorage`.
3. All remote data comes from the public Open Library API over HTTPS.
4. No API key is ever committed.

## Article III — Small and boring

1. Dependencies stay at: `react`, `react-dom`, `react-router-dom`. A new dependency needs a written
   justification in `Docs/Plan.md` and Team Lead approval.
2. Prefer a 40-line custom hook over a library.
3. No abstraction until the third repetition.
4. A component file above ~120 lines is a signal to split, not a rule to hide behind.

## Article IV — One source of truth

1. Colours, spacing and radii only from `src/styles/variables.css`.
2. All user-facing strings only from `src/locales/{ar,en}.js`.
3. All HTTP only from `src/services/openLibrary.js`.
4. All routes only from `src/App.jsx`.
5. Theme and language state only through their contexts.

## Article V — Every screen has four states

Loading, success, empty and error. A page that only handles success is not done.

## Article VI — Bilingual and bidirectional by default

1. No hard-coded `left`/`right`; logical CSS properties only.
2. No letter-spacing on Arabic text.
3. Arabic and English dictionaries must have identical key sets. A missing key is a bug.

## Article VII — Accessible by construction

Semantic HTML first, ARIA only when semantics are impossible, keyboard path for every action,
visible focus, contrast AA in both themes, `alt`/`label` everywhere.

## Article VIII — Honest documentation

1. `README.md` states exactly what works and what does not.
2. `Docs/Plan.md` reflects the real state of the project.
3. The contact form is labelled a demo — it must not pretend to send anything.
4. No borrowed code without a credit line.

## Article IX — Git discipline

1. `main` always builds.
2. Work happens on `feat/<phase>/<task>`, delivered by Pull Request.
3. Commit messages follow `type: short description`.
4. The Team Lead reviews every PR.

## Article X — Definition of done for a phase

A phase is done when: code merged, `src/docs/` updated, `specs/<phase>/tasks.md` all checked,
the build passes locally, and the Team Lead has seen it working.
