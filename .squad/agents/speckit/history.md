# Project Context

- **Project:** electricenii_moderni — Romanian electrician team presentation website
- **Created:** 2026-09-06
- **What we're building:** Presentation site for a team of electricians doing electrical installations in new houses, plus smart-home installs (Home Assistant integration) built on real experience (founder built a passive house with a smart electrical system). Target customers: Romania-wide, especially Neamt, Suceava, Iasi, Botosani.
- **Stack:** Astro + Tailwind CSS, static site, content in Markdown files, images for past-work gallery. Must follow Romanian (I7) electrical standards messaging. Site language: Romanian only.
- **Inspiration:** domtech.ro, elektrosmart.ro, and similar attractive Romanian trade sites.
- **Deliverable shape:** 5 distinct visual designs, shipped one at a time fully before starting the next. User picks a favorite, then adds custom content.
- **Definition of done:** the website runs. No robustness/scale/polish requirements beyond looking modern and responsive.

## Core Context

Agent SpecKit initialized and ready for work. Owns constitution → specify → plan → tasks → implement.

## Recent Updates

📌 Team initialized on 2026-09-06

### 2026-09-06 — Spec-kit workflow run for Design #1 of 5

Ran constitution → specify → plan → tasks (clarify and analyse deliberately skipped).

- **Constitution** `.specify/memory/constitution.md` filled from template, **v1.0.0**,
  ratified/amended 2026-09-06. Five principles: I. Radical Simplicity (YAGNI —
  static only, no backend/CMS/DB/auth/UI-kit); II. Content-as-Data
  (NON-NEGOTIABLE — Markdown collections, adding content never requires a code
  change); III. One Design at a Time (design N+1 blocked until N ships and is
  smoke-tested); IV. Romanian-Only + I7 messaging; V. DoD = builds and runs
  (no tests, no perf budgets). Plus Design Quality Bar and Development Workflow
  (spec → plan → tasks gating; SpecKit owns spec/plan/tasks, Builder owns code,
  Smoke owns verification).
- **Feature created** via `create-new-feature.ps1 -ShortName "design-1-homepage"`
  → `specs/001-design-1-homepage/`. Note: script sets `.specify/feature.json`
  and env vars but does **not** switch git branch (repo stayed on `main`).
- **Spec** `specs/001-design-1-homepage/spec.md` — 3 user stories (homepage in one
  scroll P1; owner edits content without code P1; coverage+credibility P2),
  22 functional requirements, 8 success criteria, 10 recorded assumptions
  (A-001..A-010) instead of NEEDS CLARIFICATION markers — no clarify round needed.
- **Plan** `specs/001-design-1-homepage/plan.md` — Astro 5 + Tailwind v4 via
  `astro add tailwind`, `src/content.config.ts` with zod schemas,
  `src/data/site.ts` for single-record site values, `astro:assets` +
  `image()` schema helper for portfolio images, flat `src/components/` with one
  component per homepage band. Constitution Check: PASS, no complexity to justify.
  Decisions D-001..D-008 recorded inline (no research.md/data-model.md needed).
- **Tasks** `specs/001-design-1-homepage/tasks.md` — 37 tasks (T001–T037) in 6
  phases: Setup → Foundational (tokens/layout/schemas) → US2 content →
  US1 homepage → US3 coverage+contact → Polish. Final task T037 = `npm run build`
  + `npm run preview` = Definition of Done.

**Visual identity chosen for Design 1: "Blueprint Tehnic"** — technical/blueprint
inspired. Navy `#0A1628` + blueprint blue `#1D5FA8` + white, single electric-amber
accent `#F5A524`. Sharp corners, 1px hairline borders instead of shadows, blueprint
grid motif, monospace section indices 01–06, Space Grotesk / Inter / JetBrains Mono.
Designs 2–5 must diverge clearly (candidates noted: warm editorial, dark premium,
soft rounded friendly, bold brutalist).

## Learnings

- `setup-tasks.ps1` only reports paths/`TASKS_TEMPLATE`; it does not copy the
  template. `setup-plan.ps1` **does** copy plan-template.md into the feature dir.
- Templates are copied verbatim; on Windows the `create` tool refuses existing
  files, so `Remove-Item` the template copy first, then write the filled version
  (keeps UTF-8 no-BOM, which matters for Romanian diacritics).
- Scaffolding Astro must happen *in place* without wiping `.specify/`, `.squad/`
  or `specs/` — called out explicitly in T001 so Builder doesn't destroy state.

### 2026-09-06 — Spec-kit workflow run for Design #2 of 5

Ran specify → plan → tasks (clarify skipped — spec had no genuine ambiguity,
resolved via assumptions A-001..A-010; analyse skipped per charter).

- **Feature created** via `create-new-feature.ps1 -Json -ShortName "design-2-homepage"`
  → `specs/002-design-2-homepage/` (FEATURE_NUM 002). Repo stayed on `main`
  (script sets `.specify/feature.json` + env vars only, as with Design 1).
- **Spec** `specs/002-design-2-homepage/spec.md` — 4 user stories (homepage in one
  scroll P1; **owner compares Design 1 vs Design 2** P1; same content / no
  data-model churn P1; coverage + credibility P2), 22 functional requirements
  (FR-001..FR-004 are coexistence/immutability rules), 10 success criteria
  (SC-004 = Design 1 unchanged, SC-008 = grep proves zero Design 1 tokens in
  Design 2, SC-010 = "looks like a different studio"), 10 assumptions.
- **Plan** `specs/002-design-2-homepage/plan.md` — additive sibling structure.
  Decisions D-001..D-009: sibling page over prop-driven theme variants (a theme
  prop would force edits to Design 1 components and couple 5 diverging designs);
  `src/components/design2/` namespace importing **nothing** from Design 1, not
  even `Container.astro`; `d2-*` prefixed tokens appended to the single shared
  Tailwind `@theme` (Tailwind v4 reads one theme, so prefixing beats a second
  stylesheet and makes the SC-008 grep trivial); new `Design2Layout.astro`
  mirroring the existing Google-Fonts `<link>` mechanism; existing project SVGs
  reused with a CSS-only warm overlay (no asset edits). Constitution Check: PASS.
- **Tasks** `specs/002-design-2-homepage/tasks.md` — 34 tasks (T001–T034) in 6
  phases: Setup & guardrails → Foundational (tokens/layout/primitives) →
  US1 homepage → US4 coverage+contact → US2/US3 coexistence proofs →
  Polish. Includes an explicit 🔒 immutable-file list at the top, a Design 1
  regression check (T027), a content-as-data proof across both designs (T028),
  an identity-divergence grep audit (T030), the **impeccable-design QA gate**
  (T033, with an added 8th check "reads as a different studio from Design 1"),
  and final build/preview verification (T034 = DoD).

**Visual identity chosen for Design 2: "Atelier Cald"** — warm, residential,
boutique-architecture-studio feel. Cream `#FBF7F1` / sand `#F2E8DA` surfaces,
terracotta `#C2703D` primary, forest green `#2F5D50` secondary, warm brown-black
`#33291F` text. Large radii (24/32px) + pill buttons, soft layered shadows
instead of hairline borders, Fraunces (serif display) + Nunito Sans (humanist
body), **no monospace, no section indices, no grid motif, no dark full-bleed
bands**. Layout rhythm is editorial/asymmetric: 7/5 hero split with an
overlapping badge, servicii as alternating wide rows, proiecte as featured +
list magazine layout, staggered testimonial cards, zone deservite as one floating
forest-green rounded panel.

**Coexistence design**: Design 1 keeps `/`; Design 2 lives at `/design-2`;
`/designs` is a neutral index page listing both (extendable one line per design).
Content layer (`src/content.config.ts`, `src/content/**`, `src/data/site.ts`,
`src/assets/projects/*`) is reused verbatim — no schema change. Only pre-existing
file Builder may touch is `src/styles/global.css`, additively.

**Context on the Design 1 rejection**: user said "this one does not work" but
`npm run build` succeeds and QA passed — treated as a design-preference
rejection (recorded as spec assumption A-010), so Design 2 deliberately targets
the opposite end of the style spectrum rather than tweaking Design 1.

**Learnings (added this run)**
- The 5-designs deliverable needs a coexistence pattern decided once: page per
  design + component folder per design + token prefix per design. Designs 3–5
  repeat it verbatim (`design3/`, `/design-3`, `d3-*`) with zero refactoring.
- Tailwind v4 has a single `@theme`; namespacing tokens per design is the
  cheapest way to keep designs isolated *and* keep the grep-based "no Design 1
  DNA leaked in" check mechanical.
- Writing an explicit 🔒 immutable-file list at the top of tasks.md is the
  clearest way to stop Builder from "improving" a shipped design in place.
