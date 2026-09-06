# Tasks: Design 4 — "Lumină Nordică" Homepage

**Feature**: `004-design-4-homepage`
**Spec**: [spec.md](./spec.md) · **Plan**: [plan.md](./plan.md)
**Input**: spec.md + plan.md (both approved)

## 🔒 Read before touching anything

**This feature is ADDITIONS ONLY.** These files are frozen — modifying any of them
is a defect, even if Design 4 would look better for it:

```text
src/pages/index.astro, src/layouts/BaseLayout.astro, src/components/*.astro   (Design 1)
src/pages/design-2.astro, src/layouts/Design2Layout.astro, src/components/design2/**
src/pages/design-3.astro, src/layouts/Design3Layout.astro, src/components/design3/**
src/content.config.ts, src/content/**, src/data/site.ts, src/assets/**
src/components/shared/VideoEmbed.astro   (consumed read-only, never edited)
astro.config.mjs, package.json, CONTENT.md
```

Only two pre-existing files may change, **additively**:
`src/styles/global.css` (append `d4-*` tokens/utilities) and
`src/pages/designs.astro` (add exactly one array entry).

**Frozen ≠ revert.** If you find in-flight changes by another agent (e.g. Design 3
files, video support), leave them exactly as found.

**Sequencing gate**: do not start T004 onwards until Design 3 builds and has
passed its own QA gate (constitution Principle III).

**Design 4 never imports from another design's folder or layout.** The only
permitted cross-design import is `src/components/shared/VideoEmbed.astro`.

---

## Phase 1 — Setup & guardrails

- [ ] **T001** Confirm the sequencing gate: `/design-3` exists, `npm run build`
      passes, and Design 3's QA gate is done. If not, stop and report.
- [ ] **T002** Baseline: run `npm run build` on the current tree and record that
      it exits 0. Save the emitted route list (`/`, `/design-2`, `/design-3`,
      `/designs`) for the regression check in T029.
- [ ] **T003** Run `git status` and note any pre-existing uncommitted work so it
      can be distinguished from this feature's changes (and left untouched).

## Phase 2 — Foundational (blocks everything else)

- [ ] **T004** Append the Design 4 token block to the existing `@theme` in
      `src/styles/global.css`, exactly as specified in plan D-006: the 8
      `--color-d4-*` values, `--font-d4-display` (Outfit), `--font-d4-body`
      (DM Sans), `--radius-d4-plate` (1.25rem), `--radius-d4-btn` (0.625rem).
      Add a comment header referencing `specs/004-design-4-homepage`.
      **No `--shadow-d4-*` token — Design 4 has no shadows.** Do not modify any
      existing token.
- [ ] **T005** Append the two Design 4 utilities to the existing
      `@layer utilities` in `src/styles/global.css` (plan D-007): `.d4-rule`
      and `.d4-tint`. Nothing else.
- [ ] **T006** Create `src/layouts/Design4Layout.astro` (plan D-004): `lang="ro"`,
      UTF-8, viewport meta, title/description props, the Google-Fonts `<link>` for
      `Outfit:wght@300;400;500` + `DM+Sans:wght@400;500`, import of
      `../styles/global.css`, body classes
      `bg-d4-snow font-d4-body text-d4-ink antialiased`, and a `<slot />`.
      Do not import or modify any existing layout.
- [ ] **T007 [P]** Create `src/components/design4/Container.astro` —
      `max-w-6xl mx-auto px-6 md:px-10`, `class` passthrough.
- [ ] **T008 [P]** Create `src/components/design4/Section.astro` — props
      `id`, `band` (`'snow' | 'paper'`, default `snow`), `rule` (boolean, adds a
      top `.d4-rule`). Renders `py-28 md:py-40`, wraps `Container`, and exposes the
      12-column grid from plan D-009 (`grid grid-cols-1 md:grid-cols-12
      gap-x-8 gap-y-10`) with named slots `label` and default content.
- [ ] **T009 [P]** Create `src/components/design4/Eyebrow.astro` —
      `text-xs uppercase tracking-[0.18em] text-d4-sage`. **Never numbered.**
- [ ] **T010 [P]** Create `src/components/design4/SectionLabel.astro` — left
      column (`md:col-span-3`): `Eyebrow` + section title at
      `text-2xl md:text-3xl font-d4-display font-light`.
- [ ] **T011 [P]** Create `src/components/design4/Rule.astro` — full-width
      `.d4-rule` separator element.
- [ ] **T012 [P]** Create `src/components/design4/Button.astro` — props `href`,
      `variant: 'solid' | 'ghost'`. `solid` = `bg-d4-ink text-d4-snow`, `ghost` =
      transparent with `border border-d4-mist text-d4-ink`. Both
      `rounded-[--radius-d4-btn] px-6 py-3 text-sm font-medium`, hover =
      subtle opacity/border shift. **No shadow, no pill radius.**
- [ ] **T013 [P]** Create `src/components/design4/Icon.astro` (plan D-012) —
      inline 24×24 SVG line art, `fill="none" stroke="currentColor"
      stroke-width="1.5"`, `name` prop mapping to the `icon` values used by the
      `services` collection, plus a neutral geometric fallback glyph so an unknown
      name never renders empty.

**Checkpoint**: tokens, layout and primitives exist; `npm run build` still exits 0.

## Phase 3 — User Story 1: homepage in one scroll (P1)

- [ ] **T014** Create `src/components/design4/Header.astro` — wordmark
      "Electricieni Moderni" in `font-d4-display font-light`, anchor nav
      (`#servicii #despre #proiecte #zone #contact`), a `ghost` CTA on desktop,
      and a mobile toggle using one small inline script (plan D-015). Sticky,
      `bg-d4-snow/90 backdrop-blur`, bottom `.d4-rule`. Must be usable without JS.
- [ ] **T015** Create `src/components/design4/Hero.astro` — `snow` band, oversized
      light headline (`text-4xl md:text-6xl lg:text-7xl font-d4-display font-light
      tracking-tight`), a short `text-d4-slate` subline sourced from
      `site.tagline`, two CTAs (solid "Cere ofertă" + ghost "Vezi serviciile"),
      and a **factual** capability line — "Normativ I7 · Home Assistant ·
      Neamț · Suceava · Iași · Botoșani" — separated by thin rules.
      **No fabricated counts or years** (plan D-017). Optional single `.d4-tint`
      backdrop; no image, no card.
- [ ] **T016 [P]** Create `src/components/design4/ServiceRow.astro` — a hairline
      row: `Icon` + title (`text-lg md:text-xl font-medium`) + summary
      (`text-d4-slate`) + category rendered as plain sage text
      ("Instalații clasice" / "Smart home"). **No card, no border box, no shadow.**
- [ ] **T017** Create `src/components/design4/Services.astro` — `getCollection('services')`,
      sorted by `order`, rendered as `ServiceRow`s separated by `.d4-rule`, inside
      a `paper` `Section` with `SectionLabel` ("Servicii" / "Ce facem").
- [ ] **T018** Create `src/components/design4/About.astro` — `snow` `Section`,
      label "Despre noi", content column with 2–3 short paragraphs: I7-compliant
      installations in new houses, Home Assistant integration, and the founder's
      real passive-house experience. Honest copy only (plan D-017) — no team size,
      no years, no certifications.
- [ ] **T019 [P]** Create `src/components/design4/ProjectCaseStudy.astro` — the
      **flagship** composition (plan D-016): two-column inside the content column;
      media plate (`bg-d4-mist rounded-[--radius-d4-plate] p-6 md:p-10`) holding
      the project image via `astro:assets`, or `shared/VideoEmbed.astro` when the
      entry has `video` (plan D-014); other column holds title
      (`text-2xl md:text-3xl font-d4-display font-light`), `location · year`
      meta line, summary, the rendered project body as short "ce am făcut" lines,
      and tags as plain sage text separated by thin dividers. Must look complete
      with no `image` and no `video`.
- [ ] **T020 [P]** Create `src/components/design4/ProjectRow.astro` — hairline
      list row for *additional* projects (title, location · year, summary).
      Renders nothing today (only one project exists) but must be correct.
- [ ] **T021** Create `src/components/design4/Projects.astro` — `getCollection('projects')`
      sorted by `order`, `const [flagship, ...rest] = sorted;`, render `flagship`
      via `ProjectCaseStudy` then `rest.map` via `ProjectRow` separated by
      `.d4-rule`. `snow` `Section` with `rule` on, label
      "Proiect de referință". **A one-item multi-column grid is forbidden**
      (plan D-016) — with one entry the section must read as a deliberate
      case-study spread, not a lonely card.
- [ ] **T022 [P]** Create `src/components/design4/TestimonialQuote.astro` — large
      pull-quote `text-2xl md:text-4xl font-d4-display font-light leading-snug`
      with a thin sage left rule (`border-l-2 border-d4-sage pl-6 md:pl-10`),
      attribution beneath in `text-sm text-d4-slate` (author, role, location).
      No card, no avatar placeholder, no quote-mark graphic bigger than the text,
      no star row unless the entry actually has `rating`.
- [ ] **T023** Create `src/components/design4/Testimonials.astro` — `getCollection('testimonials')`
      sorted by `order`, `const [spotlight, ...rest] = sorted;`, spotlight rendered
      large, `rest` stacked below separated by `.d4-rule`. `paper` `Section`,
      label "Cuvântul fondatorului". No carousel, no dots, no "1/1" counter.

**Checkpoint**: hero → testimonial renders end to end on `/design-4`.

## Phase 4 — User Story 4: coverage, contact, footer (P2)

- [ ] **T024 [P]** Create `src/components/design4/ServiceAreas.astro` — `snow`
      `Section`, label "Zone deservite"; renders `site.counties` as a typographic
      row/list separated by thin rules (**not** chips, **not** a coloured panel),
      plus `site.coverageLine` in `text-d4-slate`.
- [ ] **T025 [P]** Create `src/components/design4/Contact.astro` — `paper`
      `Section`, label "Contact"; `site.phone` (`tel:`), `site.email` (`mailto:`)
      and `site.workingHours` as a clean definition-style list, plus the single
      **solid ink CTA** — the page's most prominent element (impeccable-design
      point 6). No form.
- [ ] **T026 [P]** Create `src/components/design4/Footer.astro` — quiet footer on
      `snow` with a top `.d4-rule`: wordmark, counties line, phone/e-mail,
      current year. **No dark band** (that would read as Design 1/3 DNA).
- [ ] **T027** Create `src/pages/design-4.astro` — imports `Design4Layout` and
      composes the bands in the exact order and band alternation from plan Phase 1
      ("Page composition"). Title/description in Romanian.
- [ ] **T028** Add exactly one entry to the `designs` array in
      `src/pages/designs.astro`:
      `{ n: 4, name: 'Lumină Nordică', href: '/design-4', note: 'Luminos, minimal nordic, accent salvie, fără carduri' }`.
      Change nothing else on that page.

## Phase 5 — Proofs & audits

- [ ] **T029** **Designs 1/2/3 regression check**: `git status` + `git diff --stat`
      must show changes only under `src/components/design4/`,
      `src/layouts/Design4Layout.astro`, `src/pages/design-4.astro`, plus additive
      diffs in `src/styles/global.css` and `src/pages/designs.astro` (and any
      pre-existing work noted in T003). Load `/`, `/design-2`, `/design-3` and
      confirm they render exactly as before (SC-004).
- [ ] **T030** **Isolation grep audit** (SC-008): grep
      `src/components/design4/**`, `src/layouts/Design4Layout.astro` and
      `src/pages/design-4.astro` for `blueprint`, `accent-500`, `ink-900`,
      `hairline`, `font-mono`, `d2-`, `d3-`, `shadow-`, `rounded-full`. Expected:
      zero matches. Also grep for imports from `../`/`../../components/design2`,
      `design3` or the design-1 flat components — expected zero, except
      `shared/VideoEmbed.astro`.
- [ ] **T031** **Content-as-data + honesty proof** (SC-005, SC-011): temporarily
      add a throwaway `src/content/services/_tmp.md`, rebuild, confirm it appears
      on all four designs with no code change, then delete it and rebuild.
      Separately read the whole `/design-4` page and confirm: exactly one project,
      exactly one testimonial, and **zero** unbacked claims (no invented counts,
      years of experience, clients, certifications, awards or ratings).
- [ ] **T032** **N=1 composition check**: confirm the project section reads as an
      intentional case-study spread and the testimonial as an intentional
      spotlight quote — neither looks like a grid missing its siblings. If either
      looks sparse, fix the composition before proceeding (this is the lesson from
      Designs 1 and 2).
- [ ] **T033** **Responsive pass**: check `/design-4` at 375px, 768px and 1440px.
      No horizontal overflow, mobile menu works, the 12-column grid collapses
      cleanly to stacked label-above-content, media plate doesn't overflow, and
      the hero headline is neither cramped nor comically large (SC-002, FR-023).

## Phase 6 — Gate & Definition of Done

- [ ] **T034** **Impeccable-design gate** — read
      `.github/skills/impeccable-design/SKILL.md` and walk the 7 points on the
      rendered page, reporting in the skill's format:
      1. Spacing rhythm — one scale (`py-28 md:py-40` + the D-010 gap set)
      2. Type scale — only the six sizes from plan D-011
      3. Color system — ink + sage + neutrals only; no one-off colours
      4. No placeholder feel — every band finished; no empty icon, no lorem
      5. Responsive at 375px and 1280px+
      6. Visual hierarchy — the solid ink contact CTA is the single strongest element
      7. Consistency — one button set, one rule style, one plate radius throughout

      Plus two project-specific additions:
      8. **Distinct identity** — `/design-4` reads as a different studio from
         `/`, `/design-2` and `/design-3` (SC-010)
      9. **Content honesty** — one project, one testimonial, zero invented claims,
         both presented as intentional (SC-011)

      **Any ⚠️ blocks shipping until fixed.**
- [ ] **T035** **Definition of Done**: `npm run build` exits 0 and emits
      `/design-4`; `npm run preview` serves `/`, `/design-2`, `/design-3`,
      `/design-4` and `/designs` correctly. Report the result.

## Dependencies

- T001–T003 → everything (sequencing gate + baseline).
- T004–T006 → all component tasks (tokens, utilities, layout).
- T007–T013 (primitives) → T014–T026 (bands).
- T014–T026 → T027 (page composition) → T028.
- T027–T028 → T029–T033 (proofs) → T034 (gate) → T035 (DoD).

`[P]` = safe to do in parallel with other `[P]` tasks in the same phase (different
files, no shared state).
