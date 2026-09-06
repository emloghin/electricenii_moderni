# Implementation Plan: Design 1 — "Blueprint Tehnic" Homepage

**Branch**: `001-design-1-homepage` | **Date**: 2026-09-06 | **Spec**: [spec.md](./spec.md)

**Input**: Feature specification from `/specs/001-design-1-homepage/spec.md`

## Summary

Build a static Astro + Tailwind CSS site whose single Romanian homepage presents
an electrician / smart-home team. All editable content (services, projects,
testimonials, site data) lives in Markdown / data files consumed via Astro content
collections, so the owner adds content by dropping files. The homepage is composed
of one section component per band, each iterating over a collection. The visual
identity is "Blueprint Tehnic": navy + blueprint blue + white with a single amber
accent, hairline borders, sharp corners, blueprint grid motif, monospace section
indices. Done = `npm run build` succeeds and the page renders correctly at 375px /
768px / 1440px.

## Technical Context

**Language/Version**: TypeScript + Astro components; Node.js 20 LTS or newer

**Primary Dependencies**: `astro` (latest 5.x), `tailwindcss` v4 with
`@tailwindcss/vite` (Astro 5's supported Tailwind path; the legacy
`@astrojs/tailwind` integration is deprecated). No UI kit. Optional and only if
needed: `@astrojs/sitemap` — skip unless trivially free.

**Storage**: Filesystem only. Markdown content collections under `src/content/`,
site-wide values in `src/data/site.ts` (or `site.json`). No database, no CMS.

**Testing**: None automated (per constitution). Verification = `npm run build`
exit 0 + manual responsive visual check. Smoke test is another agent's job.

**Target Platform**: Static hosting; any modern browser, mobile-first.

**Project Type**: Static marketing/presentation site, single package at repo root.

**Performance Goals**: No formal budget. Practical targets: zero client-side
framework JS, only a few lines of vanilla JS for the mobile menu, images served at
sensible sizes via `astro:assets`.

**Constraints**: Romanian-only copy with correct diacritics; `lang="ro"`;
UTF-8 without BOM on all files; no horizontal overflow at 375px; content changes
must never require code changes.

**Scale/Scope**: 1 page, ~9 section components, 3 content collections, ~8 sample
content files, 1 layout, 1 global stylesheet.

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

| Principle | Status | Notes |
|-----------|--------|-------|
| I. Radical Simplicity (YAGNI) | PASS | Astro + Tailwind only; `output: 'static'`; no backend, no CMS, no UI kit. |
| II. Content-as-Data | PASS | Three Markdown collections + one site-data file; all section components map over collection entries; schemas via `defineCollection` + zod. |
| III. One Design at a Time | PASS | Only Design 1 is planned/implemented here; Designs 2–5 get their own specs after this ships. |
| IV. Romanian-Only, I7 Messaging | PASS | All copy Romanian; I7 referenced in hero/servicii/despre/footer; sample content plausible and replaceable. |
| V. DoD = builds and runs | PASS | Final task is `npm run build`; no test frameworks added. |
| Design Quality Bar | PASS | Theme tokens centralized in the Tailwind `@theme` block; mobile-first; no lorem ipsum; all required sections present; nav works with a ~10-line vanilla JS toggle that degrades gracefully. |

**Result**: No violations. Complexity Tracking section left empty.

Post-design re-check: the design below introduces no new dependency, no runtime,
no non-Markdown content source. Still PASS.

## Phase 0 — Decisions (research)

No open unknowns; these are the settled technical decisions.

- **D-001 Scaffold**: `npm create astro@latest . -- --template minimal --no-install
  --no-git --typescript strict --skip-houston`, run in the repo root, then
  `npm install`. Rationale: minimal template avoids demo cruft that would violate
  "no placeholder-looking sections". The repo already contains `.specify/`,
  `.squad/` and `specs/`; the scaffold must be created **in place** without
  deleting those directories — if the CLI refuses a non-empty directory, scaffold
  into a temp folder and move `package.json`, `astro.config.mjs`, `tsconfig.json`,
  `src/`, `public/` into the repo root.
- **D-002 Tailwind**: Tailwind v4 via `npx astro add tailwind` (installs
  `@tailwindcss/vite` and wires `astro.config.mjs`). Theme tokens are declared with
  `@theme` inside `src/styles/global.css`; `global.css` is imported once in the
  base layout. If `astro add tailwind` installs the legacy integration on the
  pinned Astro version, accept whatever the official command produces — do not
  hand-roll a different setup.
- **D-003 Content collections**: `src/content.config.ts` (Astro 5 location) using
  `defineCollection` + `glob` loader + zod schemas. Markdown files live in
  `src/content/{services,projects,testimonials}/`. Rejected: JSON collections
  (worse editing ergonomics for a non-developer), a CMS (constitution I).
- **D-004 Site data**: `src/data/site.ts` exporting a typed object (name, tagline,
  phone, phoneHref, email, counties[], coverageLine, workingHours). Chosen over
  a collection because there is exactly one record.
- **D-005 Images**: project images live in `src/assets/projects/` and are
  referenced from frontmatter as a relative path validated by `image()` from the
  content-collection schema, so `astro:assets` optimizes them and a bad path fails
  the build. Placeholder images are generated locally (simple blueprint-style SVG /
  solid-color JPGs); the owner replaces the file keeping the same filename. A
  project without an image renders the blueprint-grid fallback panel.
- **D-006 Fonts**: headings `Space Grotesk`, body `Inter`, indices/labels
  `JetBrains Mono` — loaded via Astro's built-in `experimental.fonts` or a single
  `<link>` to a web-font provider with a full system fallback stack. If font
  loading adds friction, fall back to a pure system stack (`ui-sans-serif`,
  `system-ui`) plus `ui-monospace` — the design must not depend on the webfont.
- **D-007 Interactivity**: mobile menu implemented with a small inline `<script>`
  toggling a class. No React/Vue/Svelte, no Alpine. With JS off, the nav links
  remain reachable (nav renders visible/stacked rather than hidden).
- **D-008 Section ordering**: services ordered by `order` asc; projects by `year`
  desc then `order`; testimonials by `order` asc. Empty collection → section is not
  rendered at all.

## Design 1 visual implementation ("Blueprint Tehnic")

Declared once in `src/styles/global.css` via `@theme`, consumed everywhere as
Tailwind utilities:

- **Color tokens**
  - `--color-blueprint-950: #0A1628` (page base / dark bands)
  - `--color-blueprint-800: #123A6B`
  - `--color-blueprint-600: #1D5FA8` (primary blue, links, rules)
  - `--color-blueprint-100: #E4EDF7` (tinted surfaces)
  - `--color-surface: #FFFFFF`
  - `--color-accent-500: #F5A524` (electric amber — CTAs, indices, underlines)
  - `--color-ink-900: #0D1420`, `--color-ink-600: #4A5568` (body text)
  - `--color-hairline: rgba(29,95,168,0.25)` (1px borders)
- **Type scale**: `text-xs` uppercase tracking-widest mono eyebrow →
  `text-4xl/5xl/6xl` display headings (Space Grotesk, tight leading) →
  `text-base/lg` body (Inter, `leading-relaxed`). One scale, no one-off sizes.
- **Spacing rhythm**: sections `py-16 md:py-24 lg:py-28`; container
  `mx-auto w-full max-w-6xl px-5 sm:px-8`; grid gaps `gap-6 md:gap-8`.
- **Motifs**:
  - Blueprint grid background: CSS `repeating-linear-gradient` utility class
    `.bg-blueprint-grid` defined in `global.css`, used in hero and fallback panels.
  - `rounded-none` everywhere; depth comes from `border border-hairline`, not
    shadows.
  - Monospace section index (`01`, `02`, …) above each section heading, amber.
  - Thin amber rule (`h-px w-12 bg-accent-500`) under headings.
  - Alternating band backgrounds: white → `blueprint-100` → white → `blueprint-950`
    (dark band for zone deservite/contact) for scroll rhythm.
- **Components**: cards are white with hairline border, top-left mono index, hover
  = border turns `blueprint-600` + slight translate-y, no shadow.

## Project Structure

### Documentation (this feature)

```text
specs/001-design-1-homepage/
├── spec.md              # Feature specification
├── plan.md              # This file
└── tasks.md             # Created by the tasks step (SpecKit), executed by Builder
```

research.md / data-model.md / contracts/ / quickstart.md are intentionally not
produced: decisions are inline in Phase 0, the data model is in the spec's Key
Entities, and there are no APIs.

### Source Code (repository root)

```text
astro.config.mjs
package.json
tsconfig.json
src/
├── content.config.ts            # collection definitions + zod schemas
├── content/
│   ├── services/                # *.md — one per service (clasic | smart)
│   ├── projects/                # *.md — one per completed job
│   └── testimonials/            # *.md — one per client quote
├── data/
│   └── site.ts                  # business name, phone, email, counties, coverage
├── assets/
│   └── projects/                # project images (optimized by astro:assets)
├── styles/
│   └── global.css               # Tailwind import + @theme tokens + .bg-blueprint-grid
├── layouts/
│   └── BaseLayout.astro         # <html lang="ro">, meta, font links, header+footer slots
├── components/
│   ├── Container.astro          # shared max-width wrapper
│   ├── SectionHeading.astro     # mono index + eyebrow + h2 + amber rule
│   ├── Button.astro             # primary (amber) / secondary (outline) CTA
│   ├── Header.astro             # sticky nav + mobile toggle
│   ├── Footer.astro
│   ├── Hero.astro
│   ├── Services.astro           # maps services collection
│   ├── ServiceCard.astro
│   ├── About.astro              # despre echipă / credibilitate / I7
│   ├── Projects.astro           # maps projects collection
│   ├── ProjectCard.astro        # image or blueprint fallback panel
│   ├── Testimonials.astro       # maps testimonials collection
│   ├── TestimonialCard.astro
│   ├── ServiceAreas.astro       # Neamț / Suceava / Iași / Botoșani + țară
│   └── Contact.astro            # tel: / mailto:
├── pages/
│   └── index.astro              # composes the sections in spec order
public/
└── favicon.svg
CONTENT.md                       # Romanian guide: how to add content
```

**Structure Decision**: Single Astro package at the repository root (no
`frontend/` or `backend/` split — there is no backend). Existing `.specify/`,
`.squad/` and `specs/` directories are preserved untouched by the scaffold.
Section components live flat in `src/components/`; each maps 1:1 to a homepage
band from FR-002, which keeps the Builder's task list unambiguous and makes
Designs 2–5 easy to diverge from without touching the content layer.

## Complexity Tracking

> No Constitution Check violations. Nothing to justify.

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| — | — | — |
