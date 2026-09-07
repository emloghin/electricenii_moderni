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

### 2026-09-07 — Spec-kit workflow run for Design #3 of 5

Ran specify → plan → tasks (clarify skipped — no genuine ambiguity, resolved via
assumptions A-001..A-011; analyse skipped per charter).

- **Feature created** via `create-new-feature.ps1 -Json -ShortName "design-3-homepage"`
  → `specs/003-design-3-homepage/` (FEATURE_NUM 003). Repo stayed on `main`.
- **Constitution amended to v1.1.0** — this was a real gap, not duplicated work:
  Principle IV said *"sample content is plausible and clearly replaceable"*,
  which actively permitted the fabricated projects/testimonials the project now
  forbids (see commits d138c2f / d930de0). Added standalone **Principle V —
  Content Honesty (NON-NEGOTIABLE)**: only the one real project (founder's
  passive house, Piatra Neamț) and the one real testimonial may be shown; no
  invented projects/clients/statistics/counts/experience/certifications/awards,
  not even as "sample" content; single entries render as intentional flagship /
  spotlight. Former Principle V (DoD) renumbered VI. Changelog block added.
- **Spec** `specs/003-design-3-homepage/spec.md` — 4 user stories (homepage in one
  scroll P1; owner compares Designs 1/2/3 P1; same content, no data-model churn
  P1; coverage + honest credibility P2), 23 functional requirements (FR-001..004
  coexistence/immutability, FR-018 content honesty), 11 success criteria
  (SC-004 = Designs 1+2 unchanged, SC-008 = grep proves zero D1/D2 tokens,
  SC-010 = "three different studios", SC-011 = exactly one project + one
  testimonial, zero unbacked claims), 11 assumptions.
- **Plan** `specs/003-design-3-homepage/plan.md` — same additive sibling pattern
  as Design 2, third application, zero refactoring. Opens with an explicit
  **🔒 immutable files** section listing all 17 Design 1 files, all Design 2
  files, the whole content/asset/config layer, plus an "allowed change /
  forbidden" table for the only two touchable pre-existing files
  (`src/styles/global.css` additive `d3-*` tokens, `src/pages/designs.astro`
  one array entry). Decisions D-001..D-013: sibling page (rejected a Tailwind
  `dark:` variant on Design 1 — Design 3 is a different layout system, not a dark
  recolor); `src/components/design3/` importing nothing from other designs;
  `d3-*` tokens in the single shared `@theme`; new `Design3Layout.astro`;
  Sora + Manrope (no mono, no serif); CSS-only dark/lime overlay over the reused
  blueprint SVG; `.d3-glow` / `.d3-sheen` textures; luminosity-based depth model;
  **bento composition rule** (featured tile spans 2×2 so odd tile counts never
  strand); honesty-in-copy rules. Constitution Check: PASS (all six principles).
- **Tasks** `specs/003-design-3-homepage/tasks.md` — 35 tasks (T001–T035) in 6
  phases: Setup & guardrails (incl. a pre-change baseline build) → Foundational
  (tokens/utilities/layout/primitives) → US1 homepage bands → US4 coverage +
  contact + footer → assembly, Design 1/2 regression check (T031), isolation grep
  audit (T032), content-as-data + honesty proof with throwaway files (T033) →
  **impeccable-design gate (T034, 7 points + 2 additions: distinct identity,
  content honesty)** and final build/preview verification (T035 = DoD).

**Visual identity chosen for Design 3: "Curent Premium"** — dark, premium,
product-launch/tech-brand feel ("curent" as light in the dark). Fully dark page:
obsidian `#08090B` base, graphite `#12141A` tiles, abyss `#040406` footer;
electric lime `#C8F94E` primary with a sparing cyan `#4FD6E8` secondary
(`clasic` → lime, `smart` → cyan); chalk/mist text. Uniform medium radii
(16/20/12px "soft-square") — never Design 2's pills, never Design 1's sharp
corners. Depth from **luminosity** (`.d3-sheen` top-lit gradient + lime glow on
the primary CTA), not hairlines (D1) and not warm drop shadows (D2). Sora
(geometric display, large + tight) + Manrope (grotesque body); uppercase
wide-tracking micro-labels as eyebrows; **no mono, no serif, no section
indices**. Layout signature = **bento grid**: centered hero with glow + factual
spec strip, unequal service tiles, wide despre panel with label-only fact tiles,
one immersive flagship project panel, a single oversized spotlight quote, county
chip panel, and the page's only lime-filled band for contact (single brightest
focal point). Section rhythm `py-24 md:py-32` — a third distinct spacing scale.

**Coexistence**: `/` (D1) + `/design-2` (D2) untouched; D3 at `/design-3`;
`/designs` gains exactly one array entry. Remaining candidates for Designs 4–5:
bold brutalist, minimal Swiss/Scandinavian light, high-contrast safety/industrial.

**Learnings (added this run)**
- Content-honesty is now structural, not editorial: because only one project and
  one testimonial exist, each design's proiecte/testimoniale sections must be
  *designed for N=1* (flagship panel, spotlight quote) while still degrading
  upward when entries are added. Spec'd as the default state, not an edge case.
- A dark-first design is the biggest perceptual jump available after two
  light-background designs — worth spending Design 3 on rather than saving.
- Bento grids need an explicit composition rule (which tile spans 2×2, and what
  happens with odd counts) written into the plan, or the implementer produces a
  stranded tile at some breakpoint.
- The working tree had uncommitted in-flight work (optional `video`/`videoTitle`
  project fields + a design-neutral `src/components/shared/VideoEmbed.astro`).
  Folded it in as spec A-012 / plan D-014 / task T021 instead of ignoring it, and
  added an explicit "frozen ≠ revert" note so Builder leaves other people's WIP
  alone. `shared/` is now the one sanctioned cross-design import — it belongs to
  no design, so it cannot be a per-design regression surface.

### 2026-09-07 — Spec-kit workflow run for Design #4 of 5

Ran specify -> plan -> tasks (clarify skipped -- three prior designs give enough
precedent; every open question resolved via assumptions A-001..A-011. Analyse
skipped per charter).

- **Feature created** via `create-new-feature.ps1 -Json -ShortName "design-4-homepage"`
  -> `specs/004-design-4-homepage/` (FEATURE_NUM 004). Repo stayed on `main`.
  Note: the script now *requires* a positional description argument in addition
  to `-ShortName`, otherwise it errors with a usage message.
- **Spec** `specs/004-design-4-homepage/spec.md` -- 4 user stories (homepage in
  one scroll P1; owner compares four designs P1; same content / no data-model
  churn P1; coverage + honest credibility P2), 23 functional requirements
  (FR-001..005 coexistence/immutability incl. Design 3, FR-017 anti-DNA rules,
  FR-018 content honesty, FR-019 N=1-as-intentional), 11 success criteria
  (SC-004 = Designs 1/2/3 unchanged, SC-008 = grep proves zero D1/D2/D3 tokens,
  SC-010 = "four different studios", SC-011 = exactly one project + one
  testimonial with zero unbacked claims), 11 assumptions. Includes a normative
  "Visual concept" section (palette table, type, shape language, layout pattern,
  N=1 rules) so Builder cannot drift.
- **Plan** `specs/004-design-4-homepage/plan.md` -- same additive sibling pattern,
  fourth application, zero refactoring. Opens with the explicit **immutable
  files** section now covering Designs 1, 2 **and 3** (pages, layouts, whole
  component folders), the shared content/asset/config layer, plus the
  allowed/forbidden table for the only two touchable pre-existing files
  (`src/styles/global.css` additive `d4-*`, `src/pages/designs.astro` one entry).
  Adds a **Sequencing gate** (Principle III): planning may run ahead, but Builder
  may not start implementation until Design 3 builds and passes its QA gate.
  Decisions D-001..D-018, exact token values, exact type scale, exact grid.
  Constitution Check: PASS on all six principles.
- **Tasks** `specs/004-design-4-homepage/tasks.md` -- 35 tasks (T001-T035) in 6
  phases: Setup & guardrails (sequencing gate + baseline build + `git status`
  snapshot so other agents' WIP is distinguishable) -> Foundational
  (tokens/utilities/layout/primitives) -> US1 bands -> US4 coverage/contact/footer
  + page + `/designs` entry -> proofs (D1/D2/D3 regression T029, isolation grep
  T030, content-as-data + honesty T031, **N=1 composition check T032**,
  responsive T033) -> **impeccable-design gate (T034, 7 points + 2 additions:
  distinct identity, content honesty)** and DoD build/preview (T035).

**Visual identity chosen for Design 4: "Lumina Nordica"** -- Scandinavian/Swiss
editorial minimalism; the argument is restraint and negative space. Light,
near-monochrome page: snow `#FCFCFA` base, paper `#F1F2ED` alternate bands, mist
`#E4E6DF` for rules/media plates; single muted **sage** accent `#7C9885` (deep
`#4F6B58`) used only for strokes, eyebrows, thin rules and faint tints -- never a
large saturated fill, which is what keeps it clear of Design 2's deep forest
green. Ink `#1C201D` is both body text and the one solid-filled CTA. Type =
**Outfit at light weights (300/400)** for display + **DM Sans** body; no mono
(D1), no serif (D2), not Sora/Manrope (D3); headings never above `font-medium`.

**Shape language is the strongest differentiator: no cards and no shadows at
all.** Services, coverage and contact sit directly on the page, separated by
full-bleed 1px hairline rules and whitespace. Only two radii exist: 20px media
plates and 10px buttons -- no pills (D2), no sharp hairline boxes (D1), no bento
tiles (D3). Depth comes from band contrast + rules + space, not from borders,
drop shadows or glow. Icons are hand-drawn inline 1.5px line art in sage.
Layout signature = a **two-column editorial index grid**: 12 columns, a left
label column (cols 1-3, eyebrow + light section title) and a content column
(cols 5-12), producing a strong vertical alignment spine. Rhythm `py-28 md:py-40`
-- a fourth, distinctly roomier spacing scale.

**Coexistence**: `/` (D1), `/design-2` (D2), `/design-3` (D3) untouched; D4 at
`/design-4`; `/designs` gains exactly one array entry. Remaining candidates for
Design 5: bold brutalist, high-contrast safety/industrial (black + safety
yellow). Note the industrial direction now has *less* headroom than it looks --
it would be the second dark, high-energy accent-on-black identity after D3, so
brutalist (or an oversized-typography poster style on a light ground) is the
safer remaining pick.

**Learnings (added this run)**
- The N=1 lesson from Designs 1/2 is now written into the plan as a named
  decision (D-016) with the actual destructuring pattern
  (`const [flagship, ...rest] = sorted`) plus an explicit ban on rendering a
  one-item multi-column grid, and it gets its own verification task (T032) rather
  than living only inside the QA gate. Telling Builder "design for one" in prose
  was not enough on earlier designs; giving the code shape *and* a separate
  checkpoint is.
- Section headings must be singular where the data is singular
  ("Proiect de referinta", "Cuvantul fondatorului") -- plural headings above one
  item are what made earlier designs read as unfinished, independent of layout.
- With four identities allocated, the palette space is genuinely tight
  (blue+amber, terracotta+forest, lime+cyan on black, sage on near-white). The
  practical escape valve for Design 5 is to differentiate on **shape language and
  type scale** rather than hue.
- Freezing a design that is still *in flight* (D3) needs an extra instruction
  beyond "do not modify": also **do not read or copy from** it, because its files
  are unstable -- and "frozen != revert" so nobody undoes another agent's WIP.
- Recording a `git status` snapshot as an early task (T003) is the cheap way to
  keep the later regression diff (T029) readable when other agents have
  uncommitted work in the same tree.
