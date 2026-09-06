# Implementation Plan: Design 4 — "Lumină Nordică" Homepage

**Branch**: `004-design-4-homepage` | **Date**: 2026-09-07 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/004-design-4-homepage/spec.md`

## Summary

Add a fourth, visually independent homepage design to the existing static
Astro + Tailwind site, served at `/design-4`, without touching Designs 1, 2 or 3.
Design 4 reuses the entire content layer unchanged (three Markdown collections +
`src/data/site.ts`) and only adds: a namespaced `d4-*` token set appended to the
shared stylesheet, a new base layout, a new `src/components/design4/` component
folder, a new page, plus one additive entry in the existing `/designs` index.

Visual identity is **"Lumină Nordică"**: Scandinavian/Swiss editorial minimalism —
a bright near-monochrome page (`snow` base, `paper` alternate bands) with a single
muted **sage** accent, *light-weight* Outfit display + DM Sans body, **no cards
and no shadows** (hairline rules + whitespace instead), and a **two-column
editorial index grid** with a roomy `py-28 md:py-40` rhythm.

Content honesty is a hard constraint: exactly one real project (full-section case
study) and one real testimonial (large pull-quote), with no fabricated projects,
clients, counts or credentials.

Done = `npm run build` exits 0; `/`, `/design-2`, `/design-3` render unchanged;
`/design-4` renders correctly at 375 / 768 / 1440px; impeccable-design gate passes.

## 🔒 Immutable files (DO NOT MODIFY)

This feature is **additions only**. The following are shipped output of Designs 1,
2 and 3 and are frozen for the duration of this feature. Modifying any of them is
a defect (spec FR-002/FR-003, SC-004), even if Design 4 would look better for it.

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
src/components/design2/**            (all files)
```

**Design 3 — frozen**

```text
src/pages/design-3.astro
src/layouts/Design3Layout.astro
src/components/design3/**            (all files)
```

> Design 3 may still be in flight while this plan is read. "Frozen" therefore
> also means **do not read, depend on, copy from, or refactor** Design 3's
> component internals — not even for inspiration on shared primitives. If a
> Design 3 file changes under you, leave it alone; it belongs to another agent.
> **Frozen ≠ revert**: never undo someone else's in-flight work.

**Shared content, assets & config — frozen**

```text
src/content.config.ts
src/content/services/*.md
src/content/projects/*.md
src/content/testimonials/*.md
src/data/site.ts
src/assets/projects/*                (reused as-is; no asset may be edited or replaced)
src/components/shared/VideoEmbed.astro   (design-neutral; consumed read-only, never edited)
astro.config.mjs
package.json                         (no new dependency; fonts load via <link>)
CONTENT.md                           (no schema change ⇒ no guide change)
```

**Existing files that MAY be touched — additively only**

| File | Allowed change | Forbidden |
|------|----------------|-----------|
| `src/styles/global.css` | Append new `--color-d4-*` / `--font-d4-*` / `--radius-d4-*` tokens inside the existing `@theme` block, and new `.d4-*` utilities inside the existing `@layer utilities` block. | Changing or removing any existing token/utility (Design 1's `blueprint`/`accent`/`ink`/`hairline`/`.bg-blueprint-grid`, Design 2's `d2-*`, Design 3's `d3-*`). |
| `src/pages/designs.astro` | Add exactly one entry `{ n: 4, name: 'Lumină Nordică', href: '/design-4', note: 'Luminos, minimal nordic, accent salvie, fără carduri' }` to the local `designs` array. | Restyling the page, changing existing entries, or adopting any design's identity. |

Design 4 imports **nothing** from `src/components/*.astro`,
`src/components/design2/`, `src/components/design3/`, or any existing layout —
not even a `Container`. The single exception is the design-neutral
`src/components/shared/VideoEmbed.astro` (D-014). Isolation is deliberate: a
later edit to any design's primitives can never regress another design.

## Technical Context

**Language/Version**: TypeScript + Astro components; Node.js 20 LTS or newer

**Primary Dependencies**: Already installed — `astro` 5.x, `tailwindcss` v4 via
`@tailwindcss/vite`. **No new runtime dependency.** The only permitted addition is
a webfont `<link>`; no UI kit, no client framework, no animation library, no icon
package.

**Storage**: Filesystem only. Existing `src/content/` collections and
`src/data/site.ts` consumed read-only. No schema change (FR-015).

**Testing**: None automated (constitution). Verification = `npm run build` exit 0,
`npm run preview`, a manual responsive visual check, a Designs 1/2/3 regression
check, a token-isolation grep audit, and the impeccable-design gate.

**Target Platform**: Static hosting; modern browsers, mobile-first.

**Project Type**: Static marketing/presentation site, single package at repo root.

**Performance Goals**: No formal budget. Zero client-side framework JS; one small
inline script for the mobile menu; images through `astro:assets`. All decoration
is CSS (hairlines, band fills) — no decorative image assets.

**Constraints**: Romanian-only copy with correct diacritics; `lang="ro"`; UTF-8
without BOM (matters for diacritics); no horizontal overflow at 375px;
**additions only**; content honesty — no invented project/client/number/credential.

**Scale/Scope**: 1 new page, ~16 new components, 1 new layout, ~13 new theme
tokens, 2 new utilities, 1 one-line edit to `/designs`, 0 new content files,
0 new dependencies.

## Constitution Check

*GATE: Must pass before Phase 0. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Radical Simplicity (YAGNI) | PASS | No new dependency, no backend, no CMS, no UI kit. A fourth page + component folder is the same minimal pattern Designs 2 and 3 established. |
| II. Content-as-Data | PASS | Collections and schemas reused verbatim; Design 4 maps over the same entries. Adding a `.md` updates all four designs. |
| III. One Design at a Time | PASS | Designs 1 and 2 ship; Design 3 is being implemented and is frozen to this feature. Only Design 4 is *planned* here — implementation starts after Design 3 is smoke-tested (see Sequencing gate below). Design 5 waits. |
| IV. Romanian-Only, I7 Messaging | PASS | All new copy is Romanian; I7 and Home Assistant appear in hero/servicii/despre/footer. |
| V. Content Honesty | PASS | FR-018/FR-019 forbid any invented project, client, testimonial, count, credential or award; the single project renders as a case study and the single testimonial as a pull-quote. |
| VI. DoD = builds and runs | PASS | Final tasks are `npm run build` + `npm run preview` + the impeccable-design gate; no test framework added. |
| Design Quality Bar | PASS | All tokens centralized under the `d4-*` namespace; mobile-first; no lorem ipsum; all required bands; nav degrades without JS. |

**Sequencing gate (Principle III)**: Builder MUST NOT start Design 4
implementation until Design 3 builds and has passed its own smoke test /
impeccable-design gate. Spec-kit artifacts (this plan, tasks.md) may be written
ahead of time — planning is not implementation.

**Result**: No violations. Complexity Tracking left empty.

Post-design re-check: the design below adds no dependency, no runtime, no new
content source, and no change to Designs 1–3. Still PASS.

## Phase 0 — Decisions (research)

No open unknowns; these are the settled technical decisions.

- **D-001 Coexistence strategy**: sibling page, exactly as Designs 2 and 3 —
  route `/design-4` via `src/pages/design-4.astro`. Rejected: (a) a prop-driven
  `theme` variant inside existing components — forces edits to frozen files and
  couples four diverging identities; (b) a second Astro project — duplicates the
  content layer, breaks Content-as-Data; (c) a "light mode" of Design 3 — Design 4
  is a different layout system, not a recolour.
- **D-002 Component namespacing**: all Design 4 components live in
  `src/components/design4/`. Filenames may repeat other designs' names because the
  folder disambiguates. Design 4 imports nothing from other designs' folders.
- **D-003 Token namespacing**: Design 4 tokens are appended to the existing
  `@theme` block in `src/styles/global.css` with a `d4-` prefix. No existing token
  value is changed or removed. Tailwind v4 reads a single `@theme`, so prefixing
  keeps designs isolated *and* keeps the SC-008 grep audit mechanical.
  Design-4-only utilities go into the same file's existing `@layer utilities`.
- **D-004 Layout**: `src/layouts/Design4Layout.astro` — a new file mirroring the
  head structure of the existing layouts (same Google-Fonts `<link>` mechanism)
  with Design 4's own body classes (`bg-d4-snow font-d4-body text-d4-ink
  antialiased`). No existing layout is modified or reused.
- **D-005 Fonts**: display = **Outfit** (geometric, excellent at weight 300),
  body = **DM Sans**. Neither collides with Space Grotesk/Inter/JetBrains Mono
  (D1), Fraunces/Nunito Sans (D2) or Sora/Manrope (D3). One Google-Fonts `<link>`
  with weights `Outfit:300,400,500` + `DM Sans:400,500`. Rejected variable-font
  self-hosting: adds build complexity for no DoD benefit.
- **D-006 Tokens** (exact values, appended to `@theme`):

  ```css
  --color-d4-snow: #FCFCFA;
  --color-d4-paper: #F1F2ED;
  --color-d4-mist: #E4E6DF;
  --color-d4-sage: #7C9885;
  --color-d4-sage-deep: #4F6B58;
  --color-d4-ink: #1C201D;
  --color-d4-slate: #5F665F;
  --color-d4-line: rgba(28, 32, 29, 0.10);

  --font-d4-display: "Outfit", ui-sans-serif, system-ui, sans-serif;
  --font-d4-body: "DM Sans", ui-sans-serif, system-ui, sans-serif;

  --radius-d4-plate: 1.25rem;   /* media plates only */
  --radius-d4-btn: 0.625rem;    /* buttons/inputs only */
  ```

  **Exactly two radii.** No third radius, no pills, no fully-square corners on
  media. No `--shadow-d4-*` token exists — Design 4 has no shadows by design
  (FR-017); if a shadow feels needed, the fix is more whitespace or a band change.
- **D-007 Utilities** (appended to `@layer utilities`):

  ```css
  .d4-rule { border-top: 1px solid var(--color-d4-line); }
  .d4-tint { background-image: linear-gradient(180deg, rgba(124,152,133,.08), transparent 60%); }
  ```

  `.d4-tint` is the *only* gradient in Design 4 and is used at most twice (hero
  backdrop, media plate). No noise, no grid motif, no glow — those belong to
  Designs 1/2/3.
- **D-008 Depth model**: contrast between `snow` and `paper` bands + full-bleed
  `.d4-rule` separators + whitespace. Explicitly **not**: hairline boxes (D1),
  drop shadows (D2), luminosity/glow (D3).
- **D-009 Grid system**: `Section.astro` renders
  `grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10`, with the label column at
  `md:col-span-3` and content at `md:col-start-5 md:col-span-8`. Every band uses
  it, which is what produces the strong vertical alignment spine that reads as
  "Swiss". Container max-width `max-w-6xl` with `px-6 md:px-10`.
- **D-010 Spacing scale**: sections `py-28 md:py-40`; intra-section vertical gaps
  from the set `{ 2, 4, 6, 10, 16 }` only. Deliberately roomier than D1/D2/D3 so
  the rhythm alone reads differently.
- **D-011 Type scale** (fixed, small set — impeccable-design point 2):
  - hero h1 `text-4xl md:text-6xl lg:text-7xl font-d4-display font-light tracking-tight`
  - section title `text-2xl md:text-3xl font-d4-display font-light`
  - item title `text-lg md:text-xl font-medium`
  - body `text-base md:text-lg text-d4-slate leading-relaxed`
  - eyebrow `text-xs uppercase tracking-[0.18em] text-d4-sage`
  - pull-quote `text-2xl md:text-4xl font-d4-display font-light leading-snug`

  No other sizes. Headings never go above `font-medium`.
- **D-012 Icons**: hand-written inline SVG, `stroke-width="1.5"`, `stroke=currentColor`
  in sage, 24×24, `fill="none"`, geometric primitives only (circle, line, polyline,
  rect). Kept in a single `Icon.astro` with a `name` prop mapping to the
  `services` collection's `icon` field, with a neutral fallback glyph so an
  unknown icon name never renders empty (a missing icon must not create the
  "placeholder feel" the QA gate rejects).
- **D-013 Project image treatment**: the existing blueprint SVG is reused
  untouched inside a `bg-d4-mist rounded-[--radius-d4-plate] p-6 md:p-10` plate,
  with a CSS-only cool desaturation (`opacity-90 mix-blend-multiply` or a
  `.d4-tint` overlay) so it sits calmly in the light palette. **No asset edit.**
- **D-014 Video**: if a project entry has `video`, render
  `src/components/shared/VideoEmbed.astro` inside the media plate instead of the
  image; otherwise render the image. Design 4 must build and look complete with
  neither field set. The shared component is consumed read-only.
- **D-015 Mobile nav**: `<details>`-free, one ~10-line inline script toggling a
  `hidden` class on a panel, mirroring the mechanism the other layouts use. Anchor
  links remain in the DOM so the page is navigable with JS disabled.
- **D-016 N = 1 composition rule (READ THIS)**: the site has exactly **one**
  project and **one** testimonial. Design 4's project and testimonial sections
  MUST be authored *for one entry as the intended state*:
  - `Projects.astro`: `const [flagship, ...rest] = sorted;` → render `flagship`
    via `ProjectCaseStudy.astro` (full-section, two-column, media plate + rich
    text + tags), then `rest.map(...)` via `ProjectRow.astro` (hairline row).
    With one entry, `rest` is empty and the section is *complete*, not sparse.
    **Never** render a `grid grid-cols-3` that holds a single card.
  - `Testimonials.astro`: `const [spotlight, ...rest] = sorted;` → render
    `spotlight` via `TestimonialQuote.astro` (large display-font pull-quote with a
    thin sage left rule + attribution), then `rest.map(...)` as further quote
    blocks separated by `.d4-rule`. No carousel, no dots, no counters, no avatar
    placeholder, no star row unless `rating` exists on the entry.
  - Section headings must not imply plurality that doesn't exist: use
    "Proiect de referință" and "Cuvântul fondatorului" (singular), which stay
    truthful today and still read correctly if entries are added.
  This is the mistake made on Designs 1 and 2 — a lone card in a multi-column grid
  looks unfinished. Do not repeat it.
- **D-017 Honesty in copy**: hero and despre may state *what the team does* and
  the founder's real passive-house experience. Forbidden: "peste N proiecte",
  "N ani de experiență", "N clienți mulțumiți", invented certifications, awards,
  partner logos, ratings or a fake team size. Any numeric-looking element in the
  hero must be a factual capability statement (e.g. "Normativ I7", "Home
  Assistant", "Neamț · Suceava · Iași · Botoșani"), never a fabricated count.
- **D-018 `/designs` update**: additive only — one array entry. The index page's
  own neutral styling is not touched.

## Phase 1 — Structure

### New files

```text
src/layouts/Design4Layout.astro
src/pages/design-4.astro
src/components/design4/
  Container.astro          max-w-6xl + px-6 md:px-10
  Section.astro            band (snow|paper) + py-28 md:py-40 + 12-col grid + optional top .d4-rule
  SectionLabel.astro       left column: eyebrow + light section title
  Eyebrow.astro            uppercase tracking sage micro-label
  Button.astro             variant: 'solid' (ink fill) | 'ghost' (mist border)
  Icon.astro               inline 1.5px line-art SVG set + fallback glyph
  Rule.astro               full-bleed hairline separator
  Header.astro             minimal wordmark + anchor nav + mobile toggle
  Hero.astro               light band, oversized light headline, 2 CTAs, factual capability line
  Services.astro           maps services, ordered
  ServiceRow.astro         hairline row: icon + title + summary + plain sage category tag
  About.astro              two-column text: who we are, I7, Home Assistant, honest founder story
  Projects.astro           flagship + rest split (D-016)
  ProjectCaseStudy.astro   full-section two-column case study w/ media plate (image or VideoEmbed)
  ProjectRow.astro         hairline row for additional projects (renders nothing today)
  Testimonials.astro       spotlight + rest split (D-016)
  TestimonialQuote.astro   large pull-quote, sage left rule, attribution
  ServiceAreas.astro       typographic county list + coverageLine, no chips/panel
  Contact.astro            paper band, phone/email/hours links + single solid CTA
  Footer.astro             quiet wordmark, counties line, contact, no dark band
```

### Modified files (additive only)

```text
src/styles/global.css      + d4-* tokens (D-006) and .d4-* utilities (D-007)
src/pages/designs.astro    + one array entry (D-018)
```

### Page composition (`src/pages/design-4.astro`)

```text
Design4Layout
  Header
  Hero                       band: snow
  Services      #servicii    band: paper
  About         #despre      band: snow
  Projects      #proiecte    band: snow   (rule-separated from About)
  Testimonials  #testimoniale band: paper
  ServiceAreas  #zone        band: snow
  Contact       #contact     band: paper  (single solid ink CTA — page's strongest element)
  Footer
```

Band alternation is `snow → paper → snow → snow(rule) → paper → snow → paper`,
so no two `paper` bands ever touch, and the two consecutive `snow` bands are
separated by an explicit `.d4-rule` (D-008).

## Complexity Tracking

*No constitution violations — table intentionally empty.*
