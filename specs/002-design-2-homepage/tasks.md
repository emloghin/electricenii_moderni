---
description: "Task list for Design 2 — Atelier Cald homepage"
---

# Tasks: Design 2 — "Atelier Cald" Homepage

**Input**: Design documents from `/specs/002-design-2-homepage/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required)

**Tests**: NOT included. Per the constitution, Definition of Done = the site
builds and runs. No test framework may be added. Verification is `npm run build`
plus a manual responsive visual check and the impeccable-design gate; a separate
agent performs the smoke test.

**Owner**: Builder implements every task below. SpecKit does not write site code.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 = homepage in one scroll, US2 = both designs coexist,
  US3 = same content/no data-model churn, US4 = coverage + credibility

## Path Conventions

Single Astro package at the repository root
(`C:\GIT\GIT-Personal\electricenii_moderni`). All Design 2 code is **additive**.

## 🔒 Immutable files — DO NOT EDIT in this feature

Editing any of these is a defect, even if Design 2 would look better for it
(spec FR-002, SC-004):

- `src/pages/index.astro`
- `src/layouts/BaseLayout.astro`
- every `src/components/*.astro` (Design 1's flat set — `Hero`, `Services`,
  `ServiceCard`, `About`, `Projects`, `ProjectCard`, `Testimonials`,
  `TestimonialCard`, `ServiceAreas`, `Contact`, `Header`, `Footer`,
  `Container`, `SectionHeading`, `Button`)
- `src/content.config.ts` and everything under `src/content/`
- `src/data/site.ts`
- `src/assets/projects/*`
- `.specify/`, `.squad/`, `specs/`

The **only** existing file this feature may touch is `src/styles/global.css`,
and only by **appending** new `d2-*` tokens and new utilities. No existing token
value may be changed, renamed or removed.

---

## Phase 1: Setup & Guardrails

**Purpose**: Establish a known-good baseline so any Design 1 regression is
detectable.

- [ ] **T001** Run `npm run build` on the current repo **before writing any
  code**. It must exit 0. Record the result. If it fails, stop and report — do
  not start Design 2 on a broken baseline.
- [ ] **T002** Record the baseline: run
  `git status --short` and note that Design 1's files are unmodified. At the end
  of this feature (T031) the same command must still show zero modifications to
  any file in the immutable list above.
- [ ] **T003** Read `src/layouts/BaseLayout.astro`, `src/data/site.ts` and
  `src/content.config.ts` (read-only) to confirm the exact site-data field names
  and the font-loading mechanism (Google Fonts `<link>` with `preconnect`).
  Design 2 mirrors that mechanism — do not introduce a second one.

**Checkpoint**: Baseline builds, Design 1 untouched, data shapes known.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design 2's token set, layout and primitives. **No Design 2 section
component may be built before this phase is complete.**

- [ ] **T004** **Append** to the existing `@theme` block in
  `src/styles/global.css` (do not touch the existing tokens) exactly the Design 2
  tokens from plan.md:
  `--color-d2-cream:#FBF7F1`, `--color-d2-sand:#F2E8DA`,
  `--color-d2-sand-deep:#E7D8C4`, `--color-d2-clay:#C2703D`,
  `--color-d2-clay-deep:#9A5228`, `--color-d2-forest:#2F5D50`,
  `--color-d2-forest-deep:#1E3E35`, `--color-d2-ink:#33291F`,
  `--color-d2-muted:#6B5D50`, `--color-d2-line:rgba(51,41,31,0.10)`,
  `--font-d2-display:"Fraunces", ui-serif, Georgia, "Times New Roman", serif`,
  `--font-d2-body:"Nunito Sans", ui-sans-serif, system-ui, sans-serif`,
  `--radius-d2-card:1.5rem`, `--radius-d2-panel:2rem`,
  `--shadow-d2-soft:0 8px 24px -12px rgba(51,41,31,.18)`,
  `--shadow-d2-lift:0 20px 40px -20px rgba(51,41,31,.28)`.
  **No `d2` mono font token** — Design 2 has no monospace.
  **After this task, no hex color may appear in any Design 2 component file.**
- [ ] **T005** In the same file's existing `@layer utilities` block, **add**
  (alongside, never replacing, `.bg-blueprint-grid` and `.hairline`):
  - `.d2-noise` — a very subtle warm grain: a small inline SVG `feTurbulence`
    data-URI background (or a low-opacity fine `radial-gradient` dot pattern) at
    ≤ 4% opacity. Must **not** be a repeating-linear-gradient grid.
  - `.d2-glow` — a soft off-center radial gradient
    `radial-gradient(60% 60% at 70% 30%, rgba(194,112,61,.20), transparent 70%)`.
  Verify `npm run build` still exits 0 and `/` (Design 1) looks unchanged.
- [ ] **T006** Create `src/layouts/Design2Layout.astro` — a **new** file (do not
  import or modify `BaseLayout.astro`): `<html lang="ro">`, `<meta charset>`,
  viewport, favicon, Romanian `title`/`description` props, import of
  `../styles/global.css`, and a Google Fonts `<link>` (with the same two
  `preconnect` links) loading **Fraunces** (wght 400;600;700, and the `SOFT`/
  `opsz` axes only if trivial) and **Nunito Sans** (wght 400;600;700).
  Body classes: `bg-d2-cream font-d2-body text-d2-ink antialiased`.
- [ ] **T007** [P] Create `src/components/design2/Container.astro` —
  `<div class="mx-auto w-full max-w-6xl px-5 sm:px-8"><slot /></div>`.
  Design 2 must **not** import Design 1's `Container.astro` (plan D-002).
- [ ] **T008** [P] Create `src/components/design2/SectionHeading.astro` — props
  `eyebrow`, `title`, optional `lead`, optional `tone: 'light' | 'onForest'`,
  optional `align: 'left' | 'center'`. Renders a small sentence-case terracotta
  eyebrow (`text-sm tracking-wide`, body font), a Fraunces `h2`
  (`text-3xl md:text-4xl lg:text-5xl leading-tight`), and an optional lead
  paragraph in `text-d2-muted`. **No numeric index, no monospace, no thin rule** —
  those are Design 1 signatures.
- [ ] **T009** [P] Create `src/components/design2/Button.astro` — props `href`,
  `variant: 'primary' | 'secondary'`, optional `tone: 'light' | 'onForest'`.
  Primary = `rounded-full bg-d2-clay text-d2-cream` with `shadow-d2-soft`, hover
  `bg-d2-clay-deep` + `shadow-d2-lift` + `-translate-y-0.5`. Secondary =
  `rounded-full` transparent with a soft `border-d2-line` and clay text.
  Both: `px-6 py-3`, min 44px tap height, sentence case (never uppercase),
  visible `focus-visible` ring.
- [ ] **T010** [P] Create `src/components/design2/Pill.astro` — props `label`,
  `tone: 'clay' | 'forest' | 'sand'`. `rounded-full px-3 py-1 text-sm`, soft tinted
  background. Used for service categories (`clasic` → clay, `smart` → forest),
  project tags (sand) and counties (sand on forest panel).

**Checkpoint**: Design 2 tokens, layout and primitives exist; `npm run build`
exits 0; Design 1 renders exactly as before.

---

## Phase 3: User Story 1 - Homepage in one scroll (Priority: P1) 🎯 MVP

**Goal**: `/design-2` renders all nine bands from FR-005 in order, in the
"Atelier Cald" identity, responsive at 375 / 768 / 1440px.

**Independent Test**: `npm run dev`, open `/design-2`, scroll at 375px and
1440px — every band renders with real Romanian content from the existing
collections, no horizontal scrollbar, contact links work.

All components below read content via `getCollection(...)` and `site` from
`src/data/site.ts`. **No service, project or testimonial may be hardcoded**
(FR-016).

- [ ] **T011** [US1] `src/components/design2/Header.astro` — sticky
  (`sticky top-0 z-50`), translucent cream background with `backdrop-blur` and a
  soft `shadow-d2-soft` (no hairline border); wordmark from `site.name` in
  Fraunces; desktop anchor nav (`#servicii`, `#despre`, `#proiecte`,
  `#testimoniale`, `#zone`, `#contact`) plus a primary pill "Cere ofertă" Button.
  Mobile: a rounded toggle button and a rounded panel with the same links,
  implemented with a small self-contained inline `<script>` toggling a class;
  tapping a link closes the panel. With JS disabled the nav links must remain
  reachable (never a dead button hiding the nav).
- [ ] **T012** [US1] `src/components/design2/Hero.astro` — cream band with
  `.d2-noise`; asymmetric split (`lg:grid-cols-12`, text `lg:col-span-7`, visual
  `lg:col-span-5`). Left: sentence-case terracotta eyebrow
  ("Instalații electrice · Smart home"), the page's only `h1` in Fraunces stating
  the dual value proposition (instalații electrice pentru case noi + integrare
  smart home cu Home Assistant), a warm supporting paragraph mentioning I7 and
  Neamț/Suceava/Iași/Botoșani, primary CTA "Cere ofertă" → `#contact` and
  secondary CTA "Vezi proiecte" → `#proiecte`, plus 3 soft trust chips
  ("Conform normativului I7", "Home Assistant, control local",
  "Casă pasivă construită de noi"). Right: a large `rounded-d2-panel`
  `overflow-hidden` visual card (reuse an existing project SVG from
  `src/assets/projects/` via `astro:assets`, with a warm `bg-d2-clay/15` overlay
  if it clashes) sitting on a `.d2-glow`, with a small overlapping badge card
  offset over its bottom-left corner. **No dark full-bleed banner.** Copy is
  written fresh in a warmer voice — do not copy Design 1's hero sentences
  verbatim.
- [ ] **T013** [US1] `src/components/design2/ServiceRow.astro` — props: the
  service entry plus `reversed: boolean`. Renders a full-width
  `lg:grid-cols-2 gap-8 md:gap-12` row: one side a `rounded-d2-panel` sand
  surface with a large decorative letterform/glyph or soft duotone panel, the
  other side a category `Pill` (`clasic` → clay, `smart` → forest), a Fraunces
  `h3`, the `summary`, and the rendered Markdown body. When `reversed`, the two
  sides swap on `lg` via `lg:order-*` only — **the mobile order must always be
  visual-then-text (or text-then-visual) consistently**, never scrambled.
- [ ] **T014** [US1] `src/components/design2/Services.astro` (`id="servicii"`) —
  sand band; `getCollection('services')` sorted by `order` asc; `SectionHeading`
  (eyebrow "Ce facem", Romanian title, lead); renders one `ServiceRow` per entry
  with `reversed={index % 2 === 1}` and vertical spacing `space-y-16 md:space-y-24`.
  Empty collection → render nothing at all.
- [ ] **T015** [US1] `src/components/design2/About.astro` (`id="despre"`) — cream
  band; `SectionHeading` (eyebrow "Despre echipă"). Two columns on `lg`: warm
  narrative Romanian copy covering the founder's own passive house wired as a
  smart home by himself and professional I7-compliance language; beside it a
  stack of 3–4 overlapping `rounded-d2-card` fact cards with `shadow-d2-soft`
  (e.g. ani de experiență, case finalizate, sisteme Home Assistant, garanție și
  documentație). This narrative copy lives in the component (allowed: it is
  narrative, not a repeated content item) and must be **newly written**, not
  copied from Design 1's About.
- [ ] **T016** [US1] [P] `src/components/design2/ProjectFeature.astro` — large
  `rounded-d2-panel` card: image via `astro:assets` `<Image>` with the frontmatter
  `imageAlt` inside an `overflow-hidden` rounded frame (fixed aspect ratio); below
  it `year · location` in `text-d2-muted`, a Fraunces `h3` title, the summary, and
  `Pill` tag chips. If `image` is missing, render a warm sand-gradient fallback
  panel showing the project title in Fraunces — same shape and aspect ratio.
- [ ] **T017** [US1] [P] `src/components/design2/ProjectListItem.astro` — compact
  horizontal card: small rounded thumbnail (or sand fallback) on the left, title +
  `year · location` + one-line summary on the right, `shadow-d2-soft`, hover
  `shadow-d2-lift` + `-translate-y-0.5`. Text must wrap without breaking the card.
- [ ] **T018** [US1] `src/components/design2/Projects.astro` (`id="proiecte"`) —
  sand band; `getCollection('projects')` sorted by `year` desc then `order`;
  `SectionHeading` (eyebrow "Proiecte anterioare"). Magazine layout on `lg`:
  `[0]` → `ProjectFeature` in `lg:col-span-7`, the rest → a stacked list of
  `ProjectListItem` in `lg:col-span-5`. With exactly one project, the feature
  spans the full width and the list column is omitted entirely (no empty column).
  Empty collection → render nothing.
- [ ] **T019** [US1] [P] `src/components/design2/TestimonialCard.astro` — cream
  `rounded-d2-card` with `shadow-d2-soft`, a large Fraunces quote glyph in
  `text-d2-sand-deep`, the quote body, author + location, and an optional star row
  from `rating` in clay. Long quotes wrap without breaking the grid.
- [ ] **T020** [US1] `src/components/design2/Testimonials.astro`
  (`id="testimoniale"`) — cream band; `getCollection('testimonials')` sorted by
  `order` asc; `SectionHeading` (eyebrow "Ce spun clienții");
  `md:grid-cols-2 lg:grid-cols-3 gap-8` with a deliberate stagger
  (`lg:mt-10` on the middle card, `lg:mt-20` on the third, or an equivalent
  intentional offset). Must still look intentional with one or two entries.
  Empty collection → render nothing.
- [ ] **T021** [US1] `src/components/design2/Footer.astro` — `bg-d2-forest-deep`
  surface with rounded top corners and `text-d2-cream`; `site.name` in Fraunces,
  a one-line I7-compliance statement, phone/email links, the county list, and
  `© {new Date().getFullYear()} {site.name}`. No grid motif, no hairline styling.
- [ ] **T022** [US1] `src/pages/design-2.astro` — wrap in `Design2Layout` with a
  Romanian title/description distinct from Design 1's, and compose in FR-005
  order: Header, `<main>` Hero, Services, About, Projects, Testimonials,
  ServiceAreas (Phase 4), Contact (Phase 4) `</main>`, Footer. Apply the band
  rhythm from plan.md (cream → sand → cream → sand → cream) and section padding
  `py-20 md:py-28 lg:py-32`.

**Checkpoint**: `/design-2` renders end to end (ServiceAreas/Contact land in
Phase 4); `/` still renders Design 1 unchanged; `npm run build` exits 0.

---

## Phase 4: User Story 4 - Coverage & contact (Priority: P2)

**Goal**: Visitors confirm the team serves their county and can reach the team in
one tap.

**Independent Test**: The zone deservite panel names Neamț, Suceava, Iași and
Botoșani plus nationwide availability; phone and email are tappable links.

- [ ] **T023** [US4] `src/components/design2/ServiceAreas.astro` (`id="zone"`) —
  a cream band containing **one floating** `rounded-d2-panel`
  `bg-d2-forest` panel with `.d2-noise`, inset by container padding (never
  edge-to-edge, never full-bleed dark). Inside: `SectionHeading`
  `tone="onForest"` (eyebrow "Zone deservite"), `site.counties` rendered as
  `Pill` chips (Neamț, Suceava, Iași, Botoșani), `site.coverageLine` stating that
  projects are taken on in the rest of the country as well, and a secondary
  `tone="onForest"` CTA to `#contact`. The county list comes from
  `src/data/site.ts`, never hardcoded here.
- [ ] **T024** [US4] `src/components/design2/Contact.astro` (`id="contact"`) —
  cream band; `SectionHeading` (eyebrow "Contact"). Two `rounded-d2-card` cards
  side by side on `md`: telefon (`site.phoneHref`, `tel:`) and email
  (`site.emailHref`, `mailto:`), each a large tap target (min 44px) with a pill
  CTA; below them working hours and the coverage note. Include a prominent
  "Cere ofertă" primary CTA that is a `mailto:` link with a Romanian prefilled
  subject. **No fake form, no non-functional submit button.**
- [ ] **T025** [US4] Wire T023 and T024 into `src/pages/design-2.astro` after
  Testimonials and before Footer, and verify every header/hero anchor resolves to
  a real section id on this page.

**Checkpoint**: All nine required bands present on `/design-2`.

---

## Phase 5: User Story 2 - Coexistence & comparison (Priority: P1)

**Goal**: The owner can open both finished designs and compare them.

**Independent Test**: `/` renders Design 1, `/design-2` renders Design 2,
`/designs` links to both, in one build.

- [ ] **T026** [US2] Create `src/pages/designs.astro` — a deliberately neutral
  utility page (system fonts, plain cards, no Design 1 and no Design 2 identity)
  listing the finished designs from a small local array, e.g.
  `[{ n: 1, name: 'Blueprint Tehnic', href: '/', note: 'Tehnic, albastru
  blueprint, colțuri drepte' }, { n: 2, name: 'Atelier Cald', href: '/design-2',
  note: 'Cald, terracotta și verde, colțuri rotunjite' }]`, so Designs 3–5 are a
  one-line addition each. Romanian copy, `lang="ro"`. It must not import
  components from either design.
- [ ] **T027** [US2] **Design 1 regression check**: run `npm run build`, then
  serve with `npm run preview` and open `/`. Design 1 must look and behave
  exactly as it did at T001/T002. Then run
  `git status --short` and confirm the **only** modified pre-existing file is
  `src/styles/global.css` (additive only) — everything else in this feature is a
  new file. Any other modification must be reverted.
- [ ] **T028** [US3] **Content-as-data proof** (spec SC-005): temporarily add one
  extra `.md` file to each of the three collections, run `npm run build`, confirm
  the new items appear on **both** `/` and `/design-2` with no edits to any
  `.astro`/`.ts`/config file, then delete the three temporary files and rebuild.

**Checkpoint**: Both designs live side by side, content shared, Design 1 intact.

---

## Phase 6: Polish & Verification

- [ ] **T029** Responsive pass on `/design-2` at 375px, 768px and 1440px: fix any
  horizontal overflow, clipped text, overlapping elements, broken stagger or
  mis-ordered alternating rows on mobile. The overlapping hero badge and the
  overlapping About fact cards must not clip or overflow at 375px — if they do,
  collapse them into a plain stack on mobile rather than hiding content. No
  `overflow-x` hacks that mask real layout bugs.
- [ ] **T030** **Identity-divergence audit** (spec SC-008, SC-010): grep
  `src/components/design2/`, `src/layouts/Design2Layout.astro` and
  `src/pages/design-2.astro` for `blueprint`, `accent-500`, `ink-900`, `surface`,
  `font-mono`, `hairline`, `rounded-none`, and any literal `#` hex value —
  **all must return zero matches**. Also confirm: no numeric section indices, no
  uppercase-mono eyebrows, no grid-pattern background, no dark full-bleed band.
  Fix any drift by replacing with `d2-*` tokens.
- [ ] **T031** Consistency audit: every Design 2 section uses `design2/Container`
  and `design2/SectionHeading`; section padding, container width, radii and
  shadows come from tokens only; no one-off font size or arbitrary spacing value.
  Re-run the immutable-file check from T027.
- [ ] **T032** Romanian/content audit on `/design-2`: all visible strings Romanian
  with correct diacritics (ă â î ș ț), zero lorem ipsum, zero English leftovers,
  zero "Coming soon". Confirm the page mentions I7 and Home Assistant and names
  all four counties plus nationwide coverage. Every image has Romanian alt text;
  exactly one `h1`; every section band uses `h2`. Confirm hero/About/footer copy
  is newly written, not Design 1's sentences pasted over.
- [ ] **T033** **Design QA gate** — run the **impeccable-design** skill
  (`.github/skills/impeccable-design/SKILL.md`) as a visual pass over the rendered
  `/design-2` page and report the 7-point result block (spacing rhythm, type
  scale, color system, no placeholder feel, responsive at 375px and 1280px+,
  visual hierarchy with "Cere ofertă" as the most prominent action, cross-section
  consistency). Add an 8th explicit check: **"reads as a different studio from
  Design 1"** — compare the two rendered pages side by side. Any ⚠️ blocks
  shipping and must be fixed before T034.
- [ ] **T034** **Final verification**: run `npm run build` — must exit 0 and
  produce `dist/index.html`, `dist/design-2/index.html` and
  `dist/designs/index.html`. Then run `npm run preview` and load `/`, `/design-2`
  and `/designs` to confirm all three serve correctly. Record all results. This
  task is the Definition of Done for Design 2.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup & guardrails)**: no dependencies — start here.
- **Phase 2 (Foundational)**: needs Phase 1. **BLOCKS everything after it.**
- **Phase 3 (US1 homepage)**: needs Phase 2.
- **Phase 4 (US4 coverage/contact)**: needs Phase 2; slots into the page created
  in T022.
- **Phase 5 (US2/US3 coexistence)**: needs Phases 3 and 4 (both designs must be
  complete to compare).
- **Phase 6 (Polish)**: needs Phase 5.

### Critical path

T001 → T004 → T006 → T011 → T022 → T025 → T027 → T033 → T034

### Parallel Opportunities

- T007, T008, T009, T010 — different files, parallel after T004.
- T016, T017, T019 — the three card components are independent of each other.
- T026 is independent of Phases 3–4 and can be written any time after T001.

---

## Implementation Strategy

1. Phase 1 → prove the baseline builds and Design 1 is clean.
2. Phase 2 → tokens, layout, primitives. Verify `/` is still pixel-identical.
3. Phase 3 → the MVP page. **Stop and look at `/design-2` at 375px and 1440px,
   then open `/` in a second tab and confirm they look like two different sites.**
4. Phase 4 → coverage + contact complete the page.
5. Phase 5 → the design index and the coexistence/content proofs.
6. Phase 6 → audits, the impeccable-design QA gate (T033) and the final
   build/preview verification (T034).

Commit after each phase. Do not start Design 3 — a separate spec is created only
after Design 2 ships and passes the smoke test (constitution, Principle III).

---

## Notes

- No test framework may be added (constitution, Principle V).
- No UI kit / component library and no client-side framework may be added
  (constitution, Principle I). The mobile menu is the only JavaScript.
- Components never hardcode a service, project or testimonial (Principle II);
  narrative copy inside Hero/About/Footer is allowed and expected.
- All files written as UTF-8 **without BOM** so diacritics render correctly.
- `.specify/`, `.squad/` and `specs/` are off-limits to Builder.
- If something in Design 2 seems to require editing a Design 1 file, it does not:
  copy the needed markup into `src/components/design2/` instead.
