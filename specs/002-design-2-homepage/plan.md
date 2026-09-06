# Implementation Plan: Design 2 — "Atelier Cald" Homepage

**Branch**: `002-design-2-homepage` | **Date**: 2026-09-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/002-design-2-homepage/spec.md`

## Summary

Add a second, visually independent homepage design to the existing static
Astro + Tailwind site, served at `/design-2`, without touching Design 1. Design 2
reuses the entire content layer unchanged (three Markdown collections +
`src/data/site.ts`) and only adds: a new namespaced token set in the shared
stylesheet, a new base layout, a new `src/components/design2/` component folder,
a new page, and a tiny `/designs` index page for comparing the finished designs.

Visual identity is "Atelier Cald": warm cream/sand surfaces, terracotta primary,
forest-green secondary, large corner radii, soft layered shadows, serif display
+ humanist sans, editorial/asymmetric section rhythm, no monospace, no grid
motif, no dark full-bleed bands. Done = `npm run build` exits 0, `/` still renders
Design 1 unchanged, and `/design-2` renders correctly at 375 / 768 / 1440px.

## Technical Context

**Language/Version**: TypeScript + Astro components; Node.js 20 LTS or newer

**Primary Dependencies**: Already installed — `astro` 5.x, `tailwindcss` v4 via
`@tailwindcss/vite`. **No new runtime dependency.** The only permitted optional
addition is a font source (self-hosted files or a single `<link>`); no UI kit, no
client framework, no animation library.

**Storage**: Filesystem only. The existing `src/content/` collections and
`src/data/site.ts` are consumed read-only. No schema change (spec FR-015).

**Testing**: None automated (constitution). Verification = `npm run build` exit 0,
`npm run preview`, a manual responsive visual check, and the impeccable-design
gate. Smoke testing is another agent's job.

**Target Platform**: Static hosting; modern browsers, mobile-first.

**Project Type**: Static marketing/presentation site, single package at repo root.

**Performance Goals**: No formal budget. Zero client-side framework JS; one small
inline script for the mobile menu; images through `astro:assets`.

**Constraints**: Romanian-only copy with correct diacritics; `lang="ro"`; UTF-8
without BOM; no horizontal overflow at 375px; **additions only** — Design 1's
files are immutable for this feature; shared `global.css` may only gain new
tokens/utilities, never have existing ones changed.

**Scale/Scope**: 1 new page + 1 design-index page, ~13 new components, 1 new
layout, ~14 new theme tokens, 0 new content files, 0 new dependencies.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Radical Simplicity (YAGNI) | PASS | No new dependency, no backend, no CMS, no UI kit. A second page and a component folder is the smallest structure that lets two designs coexist. |
| II. Content-as-Data | PASS | Collections and schemas reused verbatim; Design 2 components map over the same entries. Adding a `.md` file updates both designs. |
| III. One Design at a Time | PASS | Design 1 shipped, built and passed QA before this spec was written. Only Design 2 is planned here; Designs 3–5 wait. |
| IV. Romanian-Only, I7 Messaging | PASS | All new copy is Romanian; I7 and Home Assistant appear in hero/servicii/despre/footer. |
| V. DoD = builds and runs | PASS | Final task is `npm run build` + `npm run preview`; no test framework added. |
| Design Quality Bar | PASS | All tokens centralized in the `@theme` block under a `d2-*` namespace; mobile-first; no lorem ipsum; all required bands; nav degrades gracefully without JS. |

**Result**: No violations. Complexity Tracking left empty.

Post-design re-check: the design below adds no dependency, no runtime, no new
content source, and no change to Design 1. Still PASS.

## Phase 0 — Decisions (research)

No open unknowns; these are the settled technical decisions.

- **D-001 Coexistence strategy**: Design 2 is a *sibling page*, not a variant of
  Design 1's components. Route `/design-2` via `src/pages/design-2.astro`.
  Rejected alternatives: (a) a `?design=` query switch — impossible in a static
  build without JS; (b) prop-driven "theme" variants inside Design 1's existing
  components — would force edits to Design 1 files (violates FR-002) and would
  couple five diverging designs into one component set, which is the opposite of
  "five distinct studios"; (c) a second Astro project — duplicates the content
  layer and breaks Content-as-Data.
- **D-002 Component namespacing**: all Design 2 components live in
  `src/components/design2/`. Filenames may repeat Design 1's names (`Hero.astro`,
  `Services.astro`, …) because the folder disambiguates. Design 2 imports
  **nothing** from `src/components/*.astro` — not even `Container.astro` — so a
  future edit to a Design 1 primitive can never regress Design 2 and vice versa.
- **D-003 Token namespacing**: Design 2 tokens are appended to the existing
  `@theme` block in `src/styles/global.css` with a `d2-` prefix
  (`--color-d2-cream`, `--font-d2-display`, …). No existing token value is
  changed and no existing token is removed. Rationale: Tailwind v4 reads one
  theme; a second stylesheet would either duplicate the Tailwind import or
  require scoping tricks. Prefixing is simpler and makes SC-008's grep check
  trivial. Design-2-only utilities (`.d2-noise`, `.d2-glow`) are added in the same
  file's `@layer utilities`, alongside — not replacing — `.bg-blueprint-grid`.
- **D-004 Layout**: `src/layouts/Design2Layout.astro` — a new file, a near-copy of
  `BaseLayout.astro`'s head structure but with Design 2's body classes and font
  links. `BaseLayout.astro` is **not** modified and **not** reused (D-002
  rationale applies to layouts too).
- **D-005 Fonts**: display = **Fraunces** (warm, slightly quirky serif; soft
  optical feel), body = **Nunito Sans** (humanist, rounded terminals). Loaded the
  same way Design 1 loads its faces (whatever mechanism `BaseLayout.astro`
  already uses — inspect it and mirror it, do not introduce a second mechanism).
  Full fallback stacks: display → `ui-serif, Georgia, "Times New Roman", serif`;
  body → `ui-sans-serif, system-ui, sans-serif`. The design must survive a webfont
  failure (spec edge case).
- **D-006 Images**: existing SVGs in `src/assets/projects/` are reused (spec
  A-004). They are rendered inside a rounded-`2xl`/`3xl` frame with
  `overflow-hidden` and, if the blueprint palette clashes, a warm overlay
  (`bg-d2-clay/15` blend layer) applied in the card component. **No asset file is
  edited or replaced** — that would be a Design 1 regression.
- **D-007 Interactivity**: mobile menu via a small inline `<script>` toggling a
  class, self-contained in `design2/Header.astro`. No shared script file with
  Design 1. No framework, no Alpine.
- **D-008 Ordering & empty states**: identical rules to Design 1 — services by
  `order` asc, projects by `year` desc then `order`, testimonials by `order` asc;
  an empty collection renders nothing at all. Projects additionally split as
  `[featured, ...rest]` after sorting; when `rest` is empty the side list is
  omitted and the featured card widens (spec edge case).
- **D-009 Design index**: `src/pages/designs.astro` — a plain, deliberately
  neutral utility page (system fonts, simple cards) listing
  "Design 1 — Blueprint Tehnic → `/`" and "Design 2 — Atelier Cald → `/design-2`".
  It is written as a list rendered from a small local array so Designs 3–5 are
  one-line additions. It intentionally does not adopt either identity, so it never
  biases the owner's comparison.

## Design 2 visual implementation ("Atelier Cald")

Appended once to the `@theme` block in `src/styles/global.css`, consumed as
Tailwind utilities (`bg-d2-cream`, `text-d2-ink`, `font-d2-display`, …):

- **Color tokens**
  - `--color-d2-cream: #FBF7F1` — page base
  - `--color-d2-sand: #F2E8DA` — alternating band / soft surfaces
  - `--color-d2-sand-deep: #E7D8C4` — chips, dividers, hover surfaces
  - `--color-d2-clay: #C2703D` — primary accent (CTAs, links, `smart`? no — see below)
  - `--color-d2-clay-deep: #9A5228` — hover / pressed / emphasis text
  - `--color-d2-forest: #2F5D50` — secondary accent (panels, `smart` category)
  - `--color-d2-forest-deep: #1E3E35` — footer surface, deep text on sand
  - `--color-d2-ink: #33291F` — body/display text (warm brown-black)
  - `--color-d2-muted: #6B5D50` — secondary text
  - `--color-d2-line: rgba(51, 41, 31, 0.10)` — very soft dividers only
- **Category mapping**: `clasic` → clay/terracotta chips; `smart` → forest-green
  chips. (Design 1 used blue vs amber; the pairing must read differently.)
- **Fonts**: `--font-d2-display: "Fraunces", ui-serif, Georgia, serif`;
  `--font-d2-body: "Nunito Sans", ui-sans-serif, system-ui, sans-serif`.
  **No mono token is added and `font-mono` must not appear in Design 2.**
- **Radii & elevation**: `--radius-d2-card: 1.5rem` (24px),
  `--radius-d2-panel: 2rem` (32px), pill buttons via `rounded-full`.
  Two shadow tokens: `--shadow-d2-soft` (e.g.
  `0 8px 24px -12px rgba(51,41,31,.18)`) and `--shadow-d2-lift`
  (`0 20px 40px -20px rgba(51,41,31,.28)`) for hover. Borders are the exception,
  not the mechanism of depth — the inverse of Design 1.
- **Type scale**: eyebrow = `text-sm` body font, terracotta, letter-spacing
  `tracking-wide`, sentence case (never uppercase mono); headings = Fraunces
  `text-3xl` → `text-5xl/6xl` with `leading-tight`; body = `text-base/lg`
  `leading-relaxed` in `--color-d2-muted`. One scale, no one-off sizes.
- **Spacing rhythm**: sections `py-20 md:py-28 lg:py-32` (looser than Design 1's
  `py-16/24/28` — the page should *breathe* differently); container
  `mx-auto w-full max-w-6xl px-5 sm:px-8`; grid/row gaps `gap-8 md:gap-12`.
- **Texture utilities** (`@layer utilities`, additive):
  - `.d2-noise` — a very subtle warm grain via a tiny inline SVG/`radial-gradient`
    data URI at low opacity, used on the hero and the forest panel.
  - `.d2-glow` — a soft off-center radial `rgba(194,112,61,.20)` glow behind the
    hero visual. **No repeating-linear-gradient grid anywhere.**
- **Band rhythm**: cream → sand → cream → sand → cream, plus exactly one
  forest-green rounded panel (zone deservite) that floats *inside* a cream band
  with margin — never edge-to-edge. No section is full-bleed dark.
- **Section signatures** (what makes the layout read as a different studio):
  - Hero: 7/5 asymmetric split, text left, rounded image card right with a
    `.d2-glow` behind it and a small overlapping "Casă pasivă construită de noi"
    badge card offset over the image's bottom-left corner.
  - Servicii: full-width alternating rows (`lg:grid-cols-2`, image/illustrative
    panel and text swapping sides via `lg:order-*` on odd rows), each row with a
    category pill, serif title, summary, and rendered body.
  - Despre: text column plus a stacked pair of overlapping rounded fact cards.
  - Proiecte: featured project as a large rounded card spanning `lg:col-span-7`,
    remaining projects as compact horizontal cards in a `lg:col-span-5` stack.
  - Testimoniale: 3-up on `lg` with `lg:mt-10` applied to the middle card for a
    deliberate stagger; large serif quote glyph in sand-deep.
  - Zone: one forest-green `rounded-d2-panel` with county pills and the coverage
    line, contact CTA inside.
  - Contact: cream band, two rounded cards (telefon / email) with pill CTAs.
  - Footer: forest-deep surface, rounded top corners, no grid motif.

## Project Structure

### Documentation (this feature)

```text
specs/002-design-2-homepage/
├── spec.md              # Feature specification
├── plan.md              # This file
└── tasks.md             # Created by the tasks step (SpecKit), executed by Builder
```

research.md / data-model.md / contracts/ / quickstart.md are intentionally not
produced: decisions are inline in Phase 0, the data model is unchanged from
Design 1, and there are no APIs.

### Source Code (repository root) — **additions only**

```text
src/
├── content.config.ts            # UNCHANGED (reused)
├── content/**                   # UNCHANGED (reused)
├── data/site.ts                 # UNCHANGED (reused)
├── assets/projects/*            # UNCHANGED (reused)
├── styles/
│   └── global.css               # MODIFIED — additive only: d2-* tokens + .d2-noise/.d2-glow
├── layouts/
│   ├── BaseLayout.astro         # UNCHANGED (Design 1)
│   └── Design2Layout.astro      # NEW
├── components/
│   ├── *.astro                  # UNCHANGED (Design 1's flat set)
│   └── design2/                 # NEW — Design 2's own component vocabulary
│       ├── Container.astro
│       ├── SectionHeading.astro # eyebrow + serif h2 + lead (no index, no rule)
│       ├── Button.astro         # pill primary (clay) / ghost secondary
│       ├── Pill.astro           # category / county / tag chip
│       ├── Header.astro
│       ├── Hero.astro
│       ├── Services.astro       # alternating rows
│       ├── ServiceRow.astro
│       ├── About.astro
│       ├── Projects.astro       # featured + list
│       ├── ProjectFeature.astro
│       ├── ProjectListItem.astro
│       ├── Testimonials.astro   # staggered
│       ├── TestimonialCard.astro
│       ├── ServiceAreas.astro   # forest rounded panel
│       ├── Contact.astro
│       └── Footer.astro
└── pages/
    ├── index.astro              # UNCHANGED (Design 1)
    ├── design-2.astro           # NEW — composes design2/* in FR-005 order
    └── designs.astro            # NEW — neutral design index
```

**Structure Decision**: Additive sibling structure. One page per design, one
component folder per design, one shared content layer, one shared stylesheet with
namespaced tokens. This scales to Designs 3–5 by repetition (`design3/`,
`/design-3`, `d3-*` tokens) with zero refactoring and zero risk to shipped
designs — which directly serves the project's purpose of letting the owner
compare five finished designs and then pick one.

## Complexity Tracking

> No Constitution Check violations. Nothing to justify.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
