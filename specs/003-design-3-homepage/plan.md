# Implementation Plan: Design 3 — "Curent Premium" Homepage

**Branch**: `003-design-3-homepage` | **Date**: 2026-09-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/003-design-3-homepage/spec.md`

## Summary

Add a third, visually independent homepage design to the existing static
Astro + Tailwind site, served at `/design-3`, without touching Design 1 or
Design 2. Design 3 reuses the entire content layer unchanged (three Markdown
collections + `src/data/site.ts`) and only adds: a namespaced `d3-*` token set
appended to the shared stylesheet, a new base layout, a new
`src/components/design3/` component folder, a new page, plus one additive entry
in the existing `/designs` index.

Visual identity is "Curent Premium": a fully dark page (obsidian base, graphite
tiles), electric-lime primary with a sparing cyan secondary, uniform medium radii
("soft-square"), depth built from luminosity (sheen gradients + colored glow)
instead of borders or drop shadows, geometric display + grotesque body type, and
a **bento-grid** layout rhythm. Content honesty is a hard constraint: exactly one
real project (flagship case-study panel) and one real testimonial (spotlight
quote), with no fabricated projects, clients, counts or credentials.

Done = `npm run build` exits 0, `/` still renders Design 1 unchanged, `/design-2`
still renders Design 2 unchanged, `/design-3` renders correctly at 375 / 768 /
1440px, and the impeccable-design gate passes.

## 🔒 Immutable files (DO NOT MODIFY)

This feature is **additions only**. The following files are shipped output of
Designs 1 and 2 and are frozen for the duration of this feature. Modifying any of
them is a defect (spec FR-002, SC-004), even if Design 3 would look better for it.

**Design 1 — frozen**

```text
src/pages/index.astro
src/layouts/BaseLayout.astro
src/components/About.astro
src/components/Button.astro
src/components/Contact.astro
src/components/Container.astro
src/components/Footer.astro
src/components/Header.astro
src/components/Hero.astro
src/components/ProjectCard.astro
src/components/Projects.astro
src/components/SectionHeading.astro
src/components/ServiceAreas.astro
src/components/ServiceCard.astro
src/components/Services.astro
src/components/TestimonialCard.astro
src/components/Testimonials.astro
```

**Design 2 — frozen**

```text
src/pages/design-2.astro
src/layouts/Design2Layout.astro
src/components/design2/**            (all 15 files)
```

**Shared content & config — frozen**

```text
src/content.config.ts
src/content/services/*.md
src/content/projects/*.md
src/content/testimonials/*.md
src/data/site.ts
src/assets/projects/*                (reused as-is; no asset may be edited or replaced)
src/components/shared/VideoEmbed.astro   (design-neutral; consumed read-only, never edited)
astro.config.mjs
package.json                         (no new dependency; font loading uses a <link>, not a package)
CONTENT.md                           (no schema change ⇒ no guide change)
```

> **Working-tree note**: at the time this plan was written, uncommitted in-flight
> work had already modified `src/components/ProjectCard.astro`,
> `src/components/design2/ProjectFeature.astro` and `src/content.config.ts` to add
> optional project video support, and added `src/components/shared/VideoEmbed.astro`
> plus a temporary `src/content/projects/_test-video.md`. "Frozen" means **Design 3
> must not change those files further** — it does **not** mean Builder should revert
> that work. Leave it exactly as found (including the temporary test file, which
> belongs to whoever is running that test).

**Existing files that MAY be touched — additively only**

| File | Allowed change | Forbidden |
|------|----------------|-----------|
| `src/styles/global.css` | Append new `--color-d3-*` / `--font-d3-*` / `--radius-d3-*` / `--shadow-d3-*` tokens inside the existing `@theme` block, and new `.d3-*` utilities inside the existing `@layer utilities` block. | Changing or removing any existing token or utility (Design 1's `blueprint`/`accent`/`ink`/`hairline`/`.bg-blueprint-grid`, Design 2's `d2-*`/`.d2-noise`/`.d2-glow`). |
| `src/pages/designs.astro` | Add exactly one entry `{ n: 3, name: 'Curent Premium', href: '/design-3', note: '…' }` to the local `designs` array. | Restyling the page, changing the existing two entries, or adopting any design's identity. |

Design 3 imports **nothing** from `src/components/*.astro`, from
`src/components/design2/`, or from either existing layout — not even a
`Container`. The single exception is the design-neutral
`src/components/shared/VideoEmbed.astro` (D-014). Isolation is deliberate: a
later edit to any design's primitives can never regress another design.

## Technical Context

**Language/Version**: TypeScript + Astro components; Node.js 20 LTS or newer

**Primary Dependencies**: Already installed — `astro` 5.x, `tailwindcss` v4 via
`@tailwindcss/vite`. **No new runtime dependency.** The only permitted addition is
a webfont `<link>` (same mechanism the existing layouts use); no UI kit, no
client framework, no animation library.

**Storage**: Filesystem only. The existing `src/content/` collections and
`src/data/site.ts` are consumed read-only. No schema change (spec FR-015).

**Testing**: None automated (constitution). Verification = `npm run build` exit 0,
`npm run preview`, a manual responsive visual check, a Design 1 + Design 2
regression check, a token-isolation grep audit, and the impeccable-design gate.

**Target Platform**: Static hosting; modern browsers, mobile-first.

**Project Type**: Static marketing/presentation site, single package at repo root.

**Performance Goals**: No formal budget. Zero client-side framework JS; one small
inline script for the mobile menu; images through `astro:assets`. Glows are CSS
gradients, not images.

**Constraints**: Romanian-only copy with correct diacritics; `lang="ro"`; UTF-8
without BOM; no horizontal overflow at 375px; **additions only** (see the
immutable list); content honesty — no invented project/client/number/credential.

**Scale/Scope**: 1 new page, ~19 new components, 1 new layout, ~16 new theme
tokens, 3 new utilities, 1 one-line edit to `/designs`, 0 new content files,
0 new dependencies.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Radical Simplicity (YAGNI) | PASS | No new dependency, no backend, no CMS, no UI kit. A third page + component folder is the same minimal pattern Design 2 already established. |
| II. Content-as-Data | PASS | Collections and schemas reused verbatim; Design 3 maps over the same entries. Adding a `.md` file updates all three designs. |
| III. One Design at a Time | PASS | Designs 1 and 2 both ship, build and passed QA before this plan was written. Only Design 3 is planned here; Designs 4–5 wait. |
| IV. Romanian-Only, I7 Messaging | PASS | All new copy is Romanian; I7 and Home Assistant appear in hero/servicii/despre/footer. |
| V. Content Honesty | PASS | FR-018 forbids any invented project, client, testimonial, count, credential or award; the single project renders as a flagship case study and the single testimonial as a spotlight quote. |
| VI. DoD = builds and runs | PASS | Final tasks are `npm run build` + `npm run preview` + the impeccable-design gate; no test framework added. |
| Design Quality Bar | PASS | All tokens centralized in the `@theme` block under a `d3-*` namespace; mobile-first; no lorem ipsum; all required bands; nav degrades gracefully without JS. |

**Result**: No violations. Complexity Tracking left empty.

Post-design re-check: the design below adds no dependency, no runtime, no new
content source, and no change to Designs 1 or 2. Still PASS.

## Phase 0 — Decisions (research)

No open unknowns; these are the settled technical decisions.

- **D-001 Coexistence strategy**: Design 3 is a *sibling page*, exactly as Design 2
  was — route `/design-3` via `src/pages/design-3.astro`. Rejected alternatives:
  (a) a prop-driven `theme` variant inside existing components — would force edits
  to frozen files and couple three (soon five) diverging identities into one
  component set; (b) a second Astro project — duplicates the content layer and
  breaks Content-as-Data; (c) a Tailwind `dark:` variant layered onto Design 1 —
  Design 3 is not a dark recolor of Design 1, it is a different layout system.
- **D-002 Component namespacing**: all Design 3 components live in
  `src/components/design3/`. Filenames may repeat other designs' names because the
  folder disambiguates. Design 3 imports nothing from other designs' folders.
- **D-003 Token namespacing**: Design 3 tokens are appended to the existing
  `@theme` block in `src/styles/global.css` with a `d3-` prefix
  (`--color-d3-obsidian`, `--font-d3-display`, …). No existing token value is
  changed or removed. Rationale is unchanged from Design 2's D-003: Tailwind v4
  reads a single `@theme`, and prefixing keeps the SC-008 grep audit mechanical.
  Design-3-only utilities (`.d3-glow`, `.d3-sheen`, `.d3-grain-free-noise` — see
  D-009) go into the same file's existing `@layer utilities`.
- **D-004 Layout**: `src/layouts/Design3Layout.astro` — a new file mirroring the
  head structure of the existing layouts (same Google-Fonts `<link>` mechanism)
  with Design 3's own body classes (`bg-d3-obsidian font-d3-body text-d3-chalk`).
  Neither existing layout is modified or reused.
- **D-005 Fonts**: display = **Sora** (geometric, slightly technical, distinctly
  not Space Grotesk / not Fraunces), body = **Manrope** (modern grotesque, wider
  than Inter, no relation to Nunito Sans). Loaded via one Google-Fonts `<link>` in
  `Design3Layout.astro`. Fallbacks: display → `ui-sans-serif, system-ui,
  sans-serif`; body → `ui-sans-serif, system-ui, sans-serif`. **No mono token and
  no serif token is added** — Design 3 must contain neither.
- **D-006 Images**: the existing SVG in `src/assets/projects/` is reused via
  `astro:assets` (spec A-004). It is rendered inside a soft-square frame with
  `overflow-hidden`, sitting on a graphite surface with a lime glow behind it and,
  because the SVG is drawn in Design 1's blueprint palette, a dark multiply-style
  overlay (`bg-d3-obsidian/55`) plus a lime tint layer (`bg-d3-lime/10`) applied
  in the component. **No asset file is edited or replaced.**
- **D-007 Interactivity**: mobile menu via a small inline `<script>` toggling a
  class, self-contained in `design3/Header.astro`. No shared script file with the
  other designs. No framework. Optional `backdrop-blur` on the sticky header is
  pure CSS.
- **D-008 Ordering & empty states**: identical rules to the other designs —
  services by `order` asc, projects by `year` desc then `order`, testimonials by
  `order` asc; an empty collection renders nothing at all. Projects split as
  `[flagship, ...rest]` after sorting; when `rest` is empty the flagship panel is
  the whole section (the designed default today). Testimonials render as a single
  centered spotlight when `length === 1`, otherwise as a quote grid.
- **D-009 Texture**: two CSS-only utilities. `.d3-glow` — an off-center radial
  `rgba(200, 249, 78, .18)` bloom used behind the hero headline, the flagship
  project image and the contact band edge. `.d3-sheen` — a subtle top-down
  `linear-gradient(180deg, rgba(255,255,255,.06), transparent 40%)` applied to
  elevated tiles so they read as lit from above. **No repeating-gradient grid**
  (Design 1) and **no dotted warm grain** (Design 2).
- **D-010 Depth model**: tiles get `bg-d3-graphite` + `.d3-sheen` + a 1px
  `border-white/[0.06]` hairline **only as a surface edge**, never as the primary
  depth signal; hover raises to `bg-d3-graphite-2` and increases the sheen. The
  primary CTA is the only element with a colored glow shadow
  (`shadow-d3-glow`). This is deliberately neither Design 1's hairline-only nor
  Design 2's soft warm drop-shadow model.
- **D-011 Bento composition rule**: services render in a
  `grid-cols-1 md:grid-cols-2 lg:grid-cols-3` bento. The `featured` service (or,
  if none is flagged, the first by `order`) takes `lg:col-span-2 lg:row-span-2`;
  every other tile is 1×1. With today's 4 services this yields a filled 3-column
  composition; with 3, 5 or 6 services it still fills rows because the large tile
  absorbs the odd count (spec edge case). On `md` the large tile spans both
  columns; on mobile everything is a single column.
- **D-012 Honesty in copy**: hero/despre/contact copy may state only what is
  verifiable — the founder built and wired his own passive house, works to I7,
  integrates Home Assistant locally, covers four counties plus the rest of the
  country. Forbidden: any "N+ proiecte", "N ani experiență", "N clienți
  mulțumiți", star ratings the data doesn't carry, certification badges, or
  logos. The proiecte section's heading and lead frame the single project as
  *"proiectul nostru de referință"* (spec FR-018).
- **D-013 `/designs` index**: one entry appended to the local `designs` array in
  `src/pages/designs.astro`. Nothing else on that page changes; it stays neutral
  so it does not bias the owner's comparison.
- **D-014 Shared video embed**: `src/components/shared/VideoEmbed.astro` is the
  one **design-neutral** component in the tree (in-flight work; see spec A-012).
  Design 3's flagship project panel imports it when a project entry carries the
  optional `video` field, passing `embedUrl` for `http(s)` values and `src` for
  local files, with `title` from `videoTitle ?? title`. This is the single
  permitted cross-folder import and it does not weaken D-002: `shared/` belongs
  to no design, so editing it can never be a per-design regression — and Design 3
  must not edit it either. Design 3 styles only its own wrapper around the embed
  (`rounded-d3-tile overflow-hidden border border-d3-edge`).

## Design 3 visual implementation ("Curent Premium")

Appended once to the `@theme` block in `src/styles/global.css`, consumed as
Tailwind utilities (`bg-d3-obsidian`, `text-d3-chalk`, `font-d3-display`, …):

- **Color tokens**
  - `--color-d3-obsidian: #08090B` — page base (every band)
  - `--color-d3-abyss: #040406` — footer / deepest surface
  - `--color-d3-graphite: #12141A` — tiles, cards, panels
  - `--color-d3-graphite-2: #1A1E26` — hover / nested surfaces, chips
  - `--color-d3-lime: #C8F94E` — primary accent (CTA fill, active states, `clasic`)
  - `--color-d3-lime-deep: #A8DC24` — hover/pressed CTA fill
  - `--color-d3-cyan: #4FD6E8` — secondary accent, used sparingly (`smart`)
  - `--color-d3-chalk: #F2F4F7` — headings and primary text
  - `--color-d3-mist: #9BA3B0` — secondary/body text on dark
  - `--color-d3-edge: rgba(255, 255, 255, 0.07)` — surface edge only
- **Category mapping**: `clasic` → lime micro-label + lime chip outline;
  `smart` → cyan micro-label + cyan chip outline. (Design 1 used blue vs amber,
  Design 2 clay vs forest — the pairing must read differently again.)
- **Fonts**: `--font-d3-display: "Sora", ui-sans-serif, system-ui, sans-serif`;
  `--font-d3-body: "Manrope", ui-sans-serif, system-ui, sans-serif`.
  No mono, no serif.
- **Radii**: `--radius-d3-tile: 1rem` (16px), `--radius-d3-panel: 1.25rem` (20px),
  `--radius-d3-btn: 0.75rem` (12px). **Never `rounded-full` on a button** (that is
  Design 2's language) and **never `rounded-none`** (that is Design 1's).
  `rounded-full` is permitted only on tiny status dots.
- **Elevation**: `--shadow-d3-glow: 0 0 48px -12px rgba(200, 249, 78, 0.45)` —
  the primary CTA only; `--shadow-d3-tile: 0 24px 48px -32px rgba(0, 0, 0, 0.9)` —
  a barely-perceptible seat under tiles. Depth otherwise comes from `.d3-sheen`.
- **Type scale**: micro-label = `text-xs uppercase tracking-[0.18em]` in lime or
  cyan; display headings = Sora `text-4xl` → `text-6xl/7xl`, `tracking-tight`,
  `leading-[0.95]–[1.05]`; section `h2` = `text-3xl md:text-5xl`; lead =
  `text-lg md:text-xl text-d3-mist`; body = `text-base leading-relaxed
  text-d3-mist`. One scale, no one-off sizes. The hero `h1` is the largest type
  on the page; the spotlight quote is the second largest.
- **Spacing rhythm**: sections `py-24 md:py-32` (a third distinct rhythm — Design 1
  `py-16/24/28`, Design 2 `py-20/28/32`); container
  `mx-auto w-full max-w-6xl px-5 sm:px-8`; bento gaps `gap-4 md:gap-5`; tile
  padding `p-6 md:p-8`.
- **Band rhythm**: obsidian throughout — differentiation comes from tile density
  and glow placement, not from alternating background colors. Exactly two
  exceptions: the contact band (lime fill, `text-d3-obsidian`) and the footer
  (abyss). This gives the page a single unmistakable bright focal point
  (impeccable-design point 6).
- **Section signatures** (what makes the layout read as a third studio):
  - **Header**: sticky, `bg-d3-obsidian/80` + `backdrop-blur`, thin bottom edge,
    wordmark left, anchor links centered in `text-sm text-d3-mist`, soft-square
    lime CTA right; mobile = icon button toggling a stacked dark panel.
  - **Hero**: centered, `.d3-glow` bloom behind, micro-label eyebrow
    ("Instalații electrice · Smart home"), oversized `h1`, one-paragraph lead,
    primary lime CTA + quiet outlined secondary CTA, then a **spec strip**: a
    row of 3–4 short factual capability items separated by thin vertical rules
    (I7, Home Assistant local, tablouri & protecții, Neamț + toată țara) — text
    only, **no numbers**.
  - **Servicii**: bento grid per D-011; each tile = graphite surface, sheen,
    category micro-label, Sora title, summary in mist, and a small lime/cyan
    corner accent. The featured tile additionally renders the body text.
  - **Despre**: wide graphite panel spanning the container, text column left,
    a stacked column of three honest fact tiles right ("Casa pasivă a
    fondatorului", "Automatizare locală, fără cloud", "Execuție conform I7") —
    labels, not statistics.
  - **Proiecte**: `SectionHeading` + honest lead, then one full-width flagship
    panel: image bleeding to the panel edge on the left/top with the D-006
    overlay, content on the right — micro-labels for location and year, Sora
    title, summary, rendered body, lime tag chips. Any further projects render
    below as 1×2 soft-square tiles.
  - **Testimoniale**: centered spotlight — a large lime quotation mark, the quote
    in Sora `text-2xl md:text-4xl` with relaxed leading, then author, role and
    locality in micro-label styling. Multiple testimonials degrade to a
    `md:grid-cols-2` quote grid at the smaller quote size.
  - **Zone deservite**: a graphite panel with the four primary counties as
    lime-outlined chips and the nationwide coverage line in mist beneath, plus a
    quiet CTA anchor to contact.
  - **Contact**: the page's only lime-filled band — `bg-d3-lime
    text-d3-obsidian`, large Sora heading, phone and email as oversized links
    (`tel:` / `mailto:`), program and coverage in obsidian/70. Maximum contrast
    against everything above it.
  - **Footer**: abyss surface, wordmark, I7 line, contact essentials, current
    year, thin top edge. No grid motif, no rounded top corners (that is Design 2).

## Project Structure

### Documentation (this feature)

```text
specs/003-design-3-homepage/
├── spec.md              # Feature specification
├── plan.md              # This file
└── tasks.md             # Created by the tasks step (SpecKit), executed by Builder
```

research.md / data-model.md / contracts/ / quickstart.md are intentionally not
produced: decisions are inline in Phase 0, the data model is unchanged, and there
are no APIs.

### Source Code (repository root) — **additions only**

```text
src/
├── content.config.ts            # 🔒 UNCHANGED (reused)
├── content/**                   # 🔒 UNCHANGED (reused)
├── data/site.ts                 # 🔒 UNCHANGED (reused)
├── assets/projects/*            # 🔒 UNCHANGED (reused)
├── styles/
│   └── global.css               # MODIFIED — additive only: d3-* tokens + .d3-glow/.d3-sheen
├── layouts/
│   ├── BaseLayout.astro         # 🔒 UNCHANGED (Design 1)
│   ├── Design2Layout.astro      # 🔒 UNCHANGED (Design 2)
│   └── Design3Layout.astro      # NEW
├── components/
│   ├── *.astro                  # 🔒 UNCHANGED (Design 1's flat set)
│   ├── design2/**               # 🔒 UNCHANGED (Design 2)
│   ├── shared/VideoEmbed.astro  # 🔒 UNCHANGED (design-neutral, consumed read-only)
│   └── design3/                 # NEW — Design 3's own component vocabulary
│       ├── Container.astro
│       ├── MicroLabel.astro     # uppercase wide-tracking eyebrow (lime/cyan)
│       ├── SectionHeading.astro # micro-label + Sora h2 + lead (no index, no rule)
│       ├── Button.astro         # soft-square lime primary / outlined ghost secondary
│       ├── Chip.astro           # tag / county / category chip (soft-square)
│       ├── Tile.astro           # graphite + sheen + edge surface primitive
│       ├── Header.astro
│       ├── Hero.astro
│       ├── SpecStrip.astro      # factual capability row (no numbers)
│       ├── Services.astro       # bento grid (D-011)
│       ├── ServiceTile.astro
│       ├── About.astro
│       ├── FactTile.astro
│       ├── Projects.astro       # flagship + optional extra tiles
│       ├── ProjectFlagship.astro
│       ├── ProjectTile.astro
│       ├── Testimonials.astro   # spotlight, degrades to quote grid
│       ├── TestimonialSpotlight.astro
│       ├── ServiceAreas.astro
│       ├── Contact.astro        # the single lime band
│       └── Footer.astro
└── pages/
    ├── index.astro              # 🔒 UNCHANGED (Design 1)
    ├── design-2.astro           # 🔒 UNCHANGED (Design 2)
    ├── design-3.astro           # NEW — composes design3/* in FR-005 order
    └── designs.astro            # MODIFIED — one new array entry, nothing else
```

**Structure Decision**: The additive sibling structure established by Design 2 is
repeated verbatim — one page per design, one component folder per design, one
shared content layer, one shared stylesheet with namespaced tokens. This is the
third application of the pattern and requires zero refactoring; Designs 4–5
repeat it again (`design4/`, `/design-4`, `d4-*`).

## Complexity Tracking

> No Constitution Check violations. Nothing to justify.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
