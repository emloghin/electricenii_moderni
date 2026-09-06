---
description: "Task list for Design 1 — Blueprint Tehnic homepage"
---

# Tasks: Design 1 — "Blueprint Tehnic" Homepage

**Input**: Design documents from `/specs/001-design-1-homepage/`

**Prerequisites**: [plan.md](./plan.md) (required), [spec.md](./spec.md) (required)

**Tests**: NOT included. Per the constitution, Definition of Done = the site
builds and runs. No test framework may be added. Verification is `npm run build`
plus a manual responsive visual check; a separate agent performs the smoke test.

**Owner**: Builder implements every task below. SpecKit does not write site code.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: US1 = homepage in one scroll, US2 = owner edits content without
  code, US3 = coverage + credibility

## Path Conventions

Single Astro package at the repository root
(`C:\GIT\GIT-Personal\electricenii_moderni`). Source under `src/`, static assets
under `public/`. Never delete or modify `.specify/`, `.squad/` or `specs/`.

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Get a buildable Astro + Tailwind project in place.

- [ ] **T001** Scaffold Astro in the repo root:
  `npm create astro@latest . -- --template minimal --install --no-git --typescript strict --skip-houston`.
  If the CLI refuses because the directory is not empty, scaffold into
  `..\_astro-tmp` instead and move `package.json`, `package-lock.json`,
  `astro.config.mjs`, `tsconfig.json`, `src/`, `public/` into the repo root, then
  delete the temp folder. **Verify `.specify/`, `.squad/` and `specs/` still
  exist and are untouched afterwards.**
- [ ] **T002** Run `npx astro add tailwind --yes` and accept the official wiring
  (Tailwind v4 + `@tailwindcss/vite` in `astro.config.mjs`, or whatever the
  official command produces for the installed Astro version). Do not hand-roll an
  alternative Tailwind setup.
- [ ] **T003** In `astro.config.mjs` set `output: 'static'` and
  `site: 'https://example.ro'` (placeholder, single point of change later).
- [ ] **T004** Confirm/create `.gitignore` with at least `node_modules/`, `dist/`,
  `.astro/`, `.env*`. Do not commit `node_modules`.
- [ ] **T005** Sanity check: `npm run build` exits 0 on the bare scaffold before
  any custom code is written. Fix scaffold problems here, not later.

**Checkpoint**: A bare Astro + Tailwind project builds successfully.

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Design system + content layer. **No section component may be built
before this phase is complete.**

- [ ] **T006** Create `src/styles/global.css`: `@import "tailwindcss";` then an
  `@theme` block declaring exactly the Design 1 tokens from plan.md
  ("Design 1 visual implementation"):
  `--color-blueprint-950:#0A1628`, `--color-blueprint-800:#123A6B`,
  `--color-blueprint-600:#1D5FA8`, `--color-blueprint-100:#E4EDF7`,
  `--color-surface:#FFFFFF`, `--color-accent-500:#F5A524`,
  `--color-ink-900:#0D1420`, `--color-ink-600:#4A5568`,
  plus font-family tokens `--font-display`, `--font-body`, `--font-mono`.
  Also define a `.bg-blueprint-grid` utility using
  `repeating-linear-gradient` (thin `rgba(29,95,168,.18)` lines every 32px, both
  axes) and a `.hairline` border color helper.
  **No hex color may appear in any component file afterwards.**
- [ ] **T007** [P] Create `src/data/site.ts` exporting a typed `site` object:
  `name: "Electricieni Moderni"`, `tagline`, `phone: "+40 700 000 000"`,
  `phoneHref: "tel:+40700000000"`, `email: "contact@electricienimoderni.ro"`,
  `emailHref`, `counties: ["Neamț","Suceava","Iași","Botoșani"]`,
  `coverageLine` (Romanian, nationwide availability), `workingHours`.
  Every component reads contact info from here — never inline.
- [ ] **T008** Create `src/content.config.ts` defining three collections with the
  `glob` loader and zod schemas exactly as in spec.md "Key Entities":
  - `services`: `title`, `category: z.enum(['clasic','smart'])`, `summary`,
    `icon: z.string().optional()`, `order: z.number()`,
    `featured: z.boolean().default(false)`
  - `projects`: `title`, `location`, `year: z.number()`, `summary`,
    `image: image().optional()`, `imageAlt: z.string().optional()`,
    `tags: z.array(z.string()).default([])`, `order: z.number().default(0)`
  - `testimonials`: `author`, `location`, `role: z.string().optional()`,
    `rating: z.number().min(1).max(5).optional()`, `order: z.number()`
  Required fields must be required so a bad file fails the build with a readable
  error (spec US2 scenario 4).
- [ ] **T009** [P] Create `src/layouts/BaseLayout.astro`: `<html lang="ro">`,
  `<meta charset="utf-8">`, viewport meta, Romanian `<title>` and
  `<meta name="description">` props, favicon, import of `src/styles/global.css`,
  font loading per plan D-006 (with a full system fallback stack so the design
  never depends on the webfont), `<slot />`, and body classes
  `bg-surface text-ink-900 font-body antialiased`.
- [ ] **T010** [P] Create `src/components/Container.astro` — `<div class="mx-auto
  w-full max-w-6xl px-5 sm:px-8"><slot /></div>`.
- [ ] **T011** [P] Create `src/components/SectionHeading.astro` — props
  `index` (e.g. `"01"`), `eyebrow`, `title`, optional `subtitle`, optional
  `tone: 'light' | 'dark'`. Renders: mono amber index, uppercase tracking-widest
  eyebrow, display `h2`, thin amber rule (`h-px w-12 bg-accent-500`), optional
  lead paragraph. Used by every section for consistency.
- [ ] **T012** [P] Create `src/components/Button.astro` — props `href`,
  `variant: 'primary' | 'secondary'`, `tone`. Primary = amber background, ink
  text, `rounded-none`, uppercase mono label. Secondary = transparent with
  hairline border. Both with focus-visible ring.
- [ ] **T013** [P] Create `public/favicon.svg` — simple blueprint-blue mark
  (e.g. a lightning bolt on a grid square). No external asset download required.

**Checkpoint**: Design tokens, layout, primitives and content schemas exist.
`npm run build` still exits 0.

---

## Phase 3: User Story 2 - Content-as-data foundation (Priority: P1)

**Goal**: Real Romanian sample content exists as Markdown so every section below
has something genuine to render, and the owner can add more by copying a file.

**Independent Test**: Copy any `.md` file in a collection, edit its frontmatter,
rebuild → the new item appears with zero code changes.

- [ ] **T014** [P] [US2] Create 4 service files in `src/content/services/`
  (Romanian, real copy, no lorem ipsum):
  - `instalatii-electrice-case-noi.md` — `category: clasic`, `order: 1`.
    Body covers: proiectare și execuție tablou electric, trasee, circuite
    dedicate, prize/întrerupătoare, **conform normativului I7**, punere sub
    tensiune și verificări.
  - `tablouri-electrice-si-protectii.md` — `category: clasic`, `order: 2`.
    Siguranțe automate, diferențiale, protecție la supratensiune, etichetare,
    schemă electrică predată clientului.
  - `smart-home-home-assistant.md` — `category: smart`, `order: 3`.
    Integrare Home Assistant, module pe șină DIN, scenarii de iluminat, senzori,
    control local fără dependență de cloud.
  - `automatizari-si-eficienta-energetica.md` — `category: smart`, `order: 4`.
    Termostate inteligente, monitorizare consum, jaluzele/rulouri, integrare
    pompă de căldură / recuperator de căldură (casă pasivă).
- [ ] **T015** [P] [US2] Create 3 project files in `src/content/projects/`:
  - `casa-pasiva-piatra-neamt.md` — `location: "Piatra Neamț, Neamț"`,
    `year: 2024`, tags `["Casă pasivă","I7","Home Assistant"]`. Body tells the
    founder's own passive-house story (self-designed and self-wired smart home).
  - `casa-familiala-suceava.md` — `location: "Suceava"`, `year: 2023`,
    tags `["Instalație completă","I7"]`.
  - `vila-iasi-smart.md` — `location: "Iași"`, `year: 2025`,
    tags `["Smart home","Automatizări"]`.
  Each has `summary` (1–2 Romanian sentences), `image` and `imageAlt`.
- [ ] **T016** [P] [US2] Create 3 testimonial files in
  `src/content/testimonials/`: authors as first name + initial (e.g.
  "Andrei M.", "Cristina P.", "Familia D."), `location` in
  Neamț / Suceava / Iași, `order` 1–3, `rating: 5`. Body = a short, plausible
  Romanian quote mentioning punctualitate, curățenie, explicații clare, sau
  funcționarea sistemului smart. Do not present these as verified reviews.
- [ ] **T017** [US2] Add 3 project images to `src/assets/projects/` matching the
  `image` paths from T015. Generate them locally in the Design 1 palette (simple
  blueprint-style SVG or solid-color images with the grid motif) — do not
  download stock photos. Keep filenames obvious so the owner can replace them.
- [ ] **T018** [US2] Create `CONTENT.md` at the repo root, written in Romanian:
  how to add a serviciu, un proiect (inclusiv imaginea) și un testimonial, with a
  copy-pasteable frontmatter example per collection and a note that the site must
  be rebuilt afterwards.

**Checkpoint**: `npm run build` exits 0 and all collections validate.

---

## Phase 4: User Story 1 - Homepage in one scroll (Priority: P1) 🎯 MVP

**Goal**: The complete Romanian homepage renders all nine bands from FR-002, in
order, responsive at 375 / 768 / 1440px.

**Independent Test**: `npm run dev`, scroll the page at 375px and 1440px — all
sections render with real content, no horizontal scrollbar, contact links work.

- [ ] **T019** [US1] `src/components/Header.astro` — sticky (`sticky top-0 z-50`),
  hairline bottom border, backdrop blur on a near-white background; logo/wordmark
  from `site.name`; desktop anchor nav (`#servicii`, `#despre`, `#proiecte`,
  `#testimoniale`, `#zone`, `#contact`) plus a primary "Cere ofertă" Button.
  Mobile: a toggle button and a panel with the same links, implemented with a
  small inline `<script>` toggling a class. With JS disabled the nav links must
  still be reachable (do not hide them behind a dead button). Clicking a mobile
  link closes the panel.
- [ ] **T020** [US1] `src/components/Hero.astro` — full-width band with
  `bg-blueprint-950` + `.bg-blueprint-grid` overlay; mono amber eyebrow
  ("Instalații electrice · Smart home"); `h1` stating the dual value proposition
  (instalații electrice pentru case noi + integrare smart home cu Home Assistant);
  supporting paragraph mentioning I7 și zona Neamț/Suceava/Iași/Botoșani; primary
  CTA "Cere ofertă" → `#contact`, secondary CTA "Vezi proiecte" → `#proiecte`;
  a small 3-item trust strip (e.g. "Conform I7", "Home Assistant local",
  "Casă pasivă realizată de noi"). This is the only `h1` on the page.
- [ ] **T021** [US1] `src/components/ServiceCard.astro` — white card,
  `border border-[--color-blueprint-600]/25`, `rounded-none`, mono index in the
  corner, category badge that visually differs for `clasic` vs `smart`
  (blue vs amber), title, summary, rendered body. Hover: border →
  `blueprint-600` + `-translate-y-0.5`, no shadow. Equal height in a row.
- [ ] **T022** [US1] `src/components/Services.astro` (`id="servicii"`) — uses
  `getCollection('services')` sorted by `order` asc, SectionHeading index `01`,
  grid `sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8`. Renders every entry, no
  hardcoded services. If the collection is empty, render nothing.
- [ ] **T023** [US1] `src/components/About.astro` (`id="despre"`) — band with
  `bg-blueprint-100`, SectionHeading index `02`. Two-column on `lg`
  (text + a blueprint-grid panel with 3–4 key facts). Text covers the founder's
  passive house wired as a smart home by himself, and professional I7-compliance
  language. Facts pull nothing from collections — this is static Romanian copy
  in the component (allowed: it is narrative, not a repeated content item).
- [ ] **T024** [US1] `src/components/ProjectCard.astro` — image via
  `astro:assets` `<Image>` with the frontmatter `imageAlt`; if `image` is
  missing, render a `.bg-blueprint-grid` fallback panel showing the project
  title. Below: mono `year · location`, title, summary, tag chips.
- [ ] **T025** [US1] `src/components/Projects.astro` (`id="proiecte"`) — uses
  `getCollection('projects')` sorted by `year` desc then `order`, SectionHeading
  index `03`, grid `md:grid-cols-2 lg:grid-cols-3`. Layout must still look
  intentional with a single entry. Empty collection → render nothing.
- [ ] **T026** [US1] `src/components/TestimonialCard.astro` — hairline-bordered
  quote block, large amber quote mark, quote body, author + location, optional
  star row from `rating`. Long quotes must wrap without breaking the grid.
- [ ] **T027** [US1] `src/components/Testimonials.astro` (`id="testimoniale"`) —
  `getCollection('testimonials')` sorted by `order`, SectionHeading index `04`,
  grid `md:grid-cols-2 lg:grid-cols-3`. Empty collection → render nothing.
- [ ] **T028** [US1] `src/components/Footer.astro` — `bg-blueprint-950`, business
  name, one-line I7-compliance statement, phone/email links, county list, and
  `© {new Date().getFullYear()} {site.name}`.
- [ ] **T029** [US1] `src/pages/index.astro` — wrap in `BaseLayout` with Romanian
  title/description and compose in FR-002 order: Header, Hero, Services, About,
  Projects, Testimonials, ServiceAreas (Phase 5), Contact (Phase 5), Footer.
  Apply the alternating band rhythm from plan.md
  (white → blueprint-100 → white → dark) and section padding
  `py-16 md:py-24 lg:py-28`.

**Checkpoint**: The homepage renders end to end (ServiceAreas/Contact land in
Phase 5). `npm run build` exits 0.

---

## Phase 5: User Story 3 - Coverage & contact (Priority: P2)

**Goal**: Visitors confirm the team serves their county and can reach the team in
one tap.

**Independent Test**: The zone deservite section names Neamț, Suceava, Iași and
Botoșani plus nationwide availability; phone and email are tappable links.

- [ ] **T030** [US3] `src/components/ServiceAreas.astro` (`id="zone"`) — dark
  band (`bg-blueprint-950` + `.bg-blueprint-grid`), SectionHeading index `05` in
  `tone="dark"`. Renders `site.counties` as prominent cards/chips (Neamț,
  Suceava, Iași, Botoșani) plus `site.coverageLine` stating that projects are
  taken on in the rest of the country as well. County list comes from
  `src/data/site.ts`, not hardcoded here.
- [ ] **T031** [US3] `src/components/Contact.astro` (`id="contact"`) —
  SectionHeading index `06`. Shows `site.phone` as a `tel:` link and
  `site.email` as a `mailto:` link, both as large tap targets (min 44px), plus
  working hours and coverage note. Include a prominent "Cere ofertă" primary CTA
  that is a `mailto:` link with a Romanian prefilled subject. **No fake form and
  no non-functional submit button.**
- [ ] **T032** [US3] Wire T030 and T031 into `src/pages/index.astro` in the
  correct order (after Testimonials, before Footer) and verify every header/hero
  anchor resolves to a real section id.

**Checkpoint**: All nine required bands present; all user stories functional.

---

## Phase 6: Polish & Verification

- [ ] **T033** Responsive pass at 375px, 768px and 1440px (browser devtools):
  fix any horizontal overflow, clipped text, overlapping elements or uneven card
  heights. No `overflow-x` hacks that hide real layout bugs.
- [ ] **T034** Consistency audit: every section uses `Container` and
  `SectionHeading`; section indices run `01`–`06` without gaps; no hex color,
  no one-off font size and no arbitrary spacing value appears in any component
  (tokens only). Fix any drift.
- [ ] **T035** Romanian/content audit: all visible strings Romanian with correct
  diacritics (ă â î ș ț), zero lorem ipsum, zero English leftovers from the Astro
  scaffold, zero "Coming soon". Confirm the page mentions I7 and Home Assistant,
  and that all four counties appear in the zone section. Every image has
  Romanian alt text; exactly one `h1`; every section uses `h2`.
- [ ] **T036** Content-as-data proof (spec SC-004): temporarily add one extra
  `.md` file to each of the three collections, run `npm run build`, confirm
  exactly three new items appear with **no** edits to any `.astro`/`.ts`/config
  file, then delete the three temporary files and rebuild.
- [ ] **T036b** Run the **impeccable-design** quality gate
  (`.github/skills/impeccable-design/SKILL.md`) as a visual pass over the
  rendered page and report the 7-point result block (spacing rhythm, type scale,
  color system, no placeholder feel, responsive at 375px and 1280px+, visual
  hierarchy with "Cere ofertă" as the most prominent action, cross-section
  consistency). Any ⚠️ blocks shipping and must be fixed before T037.
- [ ] **T037** **Final verification**: run `npm run build` — must exit 0 and
  produce `dist/index.html`. Then run `npm run preview` and load the homepage to
  confirm it serves correctly. Record both results. This task is the Definition
  of Done for Design 1.

---

## Dependencies & Execution Order

### Phase Dependencies

- **Phase 1 (Setup)**: no dependencies — start here.
- **Phase 2 (Foundational)**: needs Phase 1. **BLOCKS everything after it.**
- **Phase 3 (US2 content)**: needs Phase 2 (schemas must exist first).
- **Phase 4 (US1 homepage)**: needs Phase 2 and Phase 3 (sections need real
  content to render and to be judged visually).
- **Phase 5 (US3)**: needs Phase 2; slots into `index.astro` created in T029.
- **Phase 6 (Polish)**: needs Phases 4 and 5.

### Critical path

T001 → T005 → T006 → T008 → T014/T015/T016 → T019 → T029 → T032 → T037

### Parallel Opportunities

- T007, T009, T010, T011, T012, T013 — different files, can be done together
  after T006.
- T014, T015, T016 — three different content folders, fully parallel.
- T021, T024, T026 (the three card components) are independent of each other.

---

## Implementation Strategy

1. Phase 1 + Phase 2 → a buildable, tokenized foundation. Verify `npm run build`.
2. Phase 3 → real Romanian content exists as data.
3. Phase 4 → the MVP homepage. **Stop and look at it at 375px and 1440px.**
4. Phase 5 → coverage + contact complete the page.
5. Phase 6 → audits, the impeccable-design QA gate (T036b) and the final
   build/preview verification (T037).

Commit after each phase. Do not start Design 2 — a separate spec is created only
after Design 1 ships and passes the smoke test (constitution, Principle III).

---

## Notes

- No test framework may be added (constitution, Principle V).
- No UI kit / component library may be added (constitution, Principle I).
- Components never hardcode a service, project or testimonial (Principle II);
  narrative copy inside Hero/About/Footer is allowed and expected.
- All files written as UTF-8 **without BOM** so diacritics render correctly.
- `.specify/`, `.squad/` and `specs/` are off-limits to Builder.
