# Tasks: Design 3 — "Curent Premium" Homepage

**Feature**: `003-design-3-homepage` | **Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)

**Executed by**: Builder. **Do not start before reading `plan.md`** — especially
the 🔒 immutable-files section, which is repeated below.

**Definition of Done**: `npm run build` exits 0, `/`, `/design-2` and `/design-3`
all render correctly, and the impeccable-design gate (T034) passes with zero ⚠️.

---

## 🔒 Immutable files — DO NOT MODIFY

Touching any file below is a defect, even if Design 3 would look better for it.

```text
# Design 1
src/pages/index.astro
src/layouts/BaseLayout.astro
src/components/About.astro, Button.astro, Contact.astro, Container.astro,
  Footer.astro, Header.astro, Hero.astro, ProjectCard.astro, Projects.astro,
  SectionHeading.astro, ServiceAreas.astro, ServiceCard.astro, Services.astro,
  TestimonialCard.astro, Testimonials.astro

# Design 2
src/pages/design-2.astro
src/layouts/Design2Layout.astro
src/components/design2/**            (all 15 files)

# Shared content, assets & config
src/content.config.ts
src/content/**                       (no new content file, no edited content file)
src/data/site.ts
src/assets/projects/**               (reused as-is; never edited or replaced)
src/components/shared/VideoEmbed.astro   (design-neutral; import it, never edit it)
astro.config.mjs
package.json                         (no new dependency)
CONTENT.md
```

**Working-tree note**: uncommitted in-flight work already modified
`src/components/ProjectCard.astro`, `src/components/design2/ProjectFeature.astro`
and `src/content.config.ts` (optional `video` / `videoTitle` project fields) and
added `src/components/shared/VideoEmbed.astro` plus a temporary
`src/content/projects/_test-video.md`. "Frozen" means **do not change them
further** — it does **not** mean revert them. Leave that work exactly as found.

**Additive-only exceptions** (the ONLY pre-existing files you may edit):

- `src/styles/global.css` — append `d3-*` tokens inside the existing `@theme`
  block and `.d3-*` utilities inside the existing `@layer utilities` block.
  Never change or delete an existing token/utility.
- `src/pages/designs.astro` — add exactly one entry to the local `designs` array.
  Change nothing else on that page.

Design 3 components must import **nothing** from `src/components/*.astro`,
`src/components/design2/`, `BaseLayout.astro` or `Design2Layout.astro`. The only
permitted cross-folder import is the design-neutral
`src/components/shared/VideoEmbed.astro`.

**Content honesty (hard rule, spec FR-018)**: the business has exactly ONE real
project and ONE real testimonial. Do not invent projects, clients, testimonials,
statistics, "N+ lucrări", years of experience, certifications, awards or team
sizes. Singular content is framed as an intentional flagship / spotlight.

---

## Phase 1 — Setup & guardrails

- [ ] **T001** Read `specs/003-design-3-homepage/spec.md` and `plan.md` end to
      end, plus `.github/skills/impeccable-design/SKILL.md`. Confirm you can
      state Design 3's identity in one sentence and list the frozen paths.
- [ ] **T002** Record the pre-change baseline: run
      `git status --porcelain` (must be clean or contain only unrelated files)
      and `npm run build` to confirm the repo builds **before** your changes.
      If the baseline build fails, stop and report — do not build on a red base.
- [ ] **T003** Inspect `src/layouts/BaseLayout.astro` and
      `src/layouts/Design2Layout.astro` **read-only** to learn the existing
      webfont-`<link>` mechanism, the `global.css` import path and the head
      structure you will mirror. Do not edit either file.
- [ ] **T004** Inspect the content collections read-only
      (`src/content.config.ts`, the 4 services, 1 project, 1 testimonial,
      `src/data/site.ts`) and note the exact field names, the single project's
      tags, and the single testimonial's author/role/location so your components
      render real values, not assumptions.

## Phase 2 — Foundational (tokens, layout, primitives)

*Blocks every later phase. Nothing renders correctly until this is done.*

- [ ] **T005** Append the Design 3 token set to the **existing** `@theme` block in
      `src/styles/global.css`, under a clear comment
      `/* Design 3 — "Curent Premium" tokens (additive only, see specs/003-design-3-homepage) */`:
      colors `--color-d3-obsidian: #08090B`, `--color-d3-abyss: #040406`,
      `--color-d3-graphite: #12141A`, `--color-d3-graphite-2: #1A1E26`,
      `--color-d3-lime: #C8F94E`, `--color-d3-lime-deep: #A8DC24`,
      `--color-d3-cyan: #4FD6E8`, `--color-d3-chalk: #F2F4F7`,
      `--color-d3-mist: #9BA3B0`, `--color-d3-edge: rgba(255,255,255,0.07)`;
      fonts `--font-d3-display: "Sora", ui-sans-serif, system-ui, sans-serif`,
      `--font-d3-body: "Manrope", ui-sans-serif, system-ui, sans-serif`;
      radii `--radius-d3-tile: 1rem`, `--radius-d3-panel: 1.25rem`,
      `--radius-d3-btn: 0.75rem`; shadows
      `--shadow-d3-glow: 0 0 48px -12px rgba(200,249,78,0.45)`,
      `--shadow-d3-tile: 0 24px 48px -32px rgba(0,0,0,0.9)`.
      **Do not add a mono or serif token.** Verify with
      `git diff src/styles/global.css` that only additions appear.
- [ ] **T006** Append the two Design 3 utilities to the **existing**
      `@layer utilities` block in `src/styles/global.css`:
      `.d3-glow` (off-center radial `rgba(200,249,78,.18)` bloom fading to
      transparent) and `.d3-sheen`
      (`linear-gradient(180deg, rgba(255,255,255,.06), transparent 40%)`).
      No repeating-gradient grid, no dotted noise.
- [ ] **T007** Create `src/layouts/Design3Layout.astro`: props `title`,
      `description`; `lang="ro"`, UTF-8 meta, viewport, favicon; the same
      Google-Fonts `<link>` mechanism observed in T003, loading **Sora**
      (400/600/700) and **Manrope** (400/500/700); imports `../styles/global.css`;
      `<body class="bg-d3-obsidian font-d3-body text-d3-chalk antialiased">` with
      a `<slot />`. Do not import or extend the other layouts.
- [ ] **T008** Create `src/components/design3/Container.astro` —
      `mx-auto w-full max-w-6xl px-5 sm:px-8`, accepts a `class` prop and an
      optional `as` element. Design 3's own copy; do not import Design 1's or
      Design 2's container.
- [ ] **T009** Create `src/components/design3/MicroLabel.astro` — props `tone`
      (`lime` | `cyan` | `mist`, default `lime`); renders
      `text-xs uppercase tracking-[0.18em] font-d3-body font-semibold` in the
      chosen token color. This is Design 3's eyebrow; **never** a `01 / 02`
      index and **never** monospace.
- [ ] **T010** Create `src/components/design3/Tile.astro` — the surface primitive:
      `bg-d3-graphite rounded-d3-tile border border-d3-edge d3-sheen p-6 md:p-8`
      with an optional `hover` prop raising it to `bg-d3-graphite-2`. Accepts a
      `class` prop for grid spans. Depth is luminosity, not shadow.
- [ ] **T011** Create `src/components/design3/Button.astro` — props `href`,
      `variant` (`primary` | `ghost`), `class`. Primary =
      `bg-d3-lime text-d3-obsidian rounded-d3-btn shadow-d3-glow` with a
      `hover:bg-d3-lime-deep` state; ghost = transparent with
      `border border-d3-edge text-d3-chalk` and a `hover:bg-d3-graphite-2` state.
      **`rounded-full` is forbidden on buttons** (that is Design 2's language);
      `rounded-none` is forbidden (that is Design 1's).
- [ ] **T012** Create `src/components/design3/Chip.astro` — soft-square
      (`rounded-d3-btn`) outlined chip, props `tone` (`lime` | `cyan` | `mist`),
      used for service categories, project tags and county chips.

## Phase 3 — User Story 1: the Design 3 homepage (P1)

*Each task renders one band. Build after every 2–3 tasks to catch errors early.*

- [ ] **T013** Create `src/components/design3/SectionHeading.astro` — props
      `label`, `title`, `lead?`, `tone?`, `align?`; renders `MicroLabel` + a Sora
      `h2` (`text-3xl md:text-5xl tracking-tight`) + an optional lead paragraph in
      `text-d3-mist`. No rule line, no index, no serif.
- [ ] **T014** Create `src/components/design3/Header.astro` — sticky
      (`sticky top-0 z-50`), `bg-d3-obsidian/80 backdrop-blur`, bottom edge
      `border-b border-d3-edge`; wordmark from `site.name`; desktop anchor links
      (`#servicii`, `#despre`, `#proiecte`, `#testimoniale`, `#zone`, `#contact`)
      in `text-sm text-d3-mist` with a `hover:text-d3-chalk` state; primary
      "Cere ofertă" `Button` on the right; mobile icon button toggling a stacked
      dark panel via a small inline `<script>` (no framework). Without JS the nav
      must still be reachable — never a dead button hiding the nav.
- [ ] **T015** Create `src/components/design3/SpecStrip.astro` — a row of 3–4
      short **factual** capability items (e.g. "Conform normativului I7",
      "Home Assistant, local, fără cloud", "Tablouri și protecții",
      "Neamț · toată țara") separated by thin vertical rules, wrapping to a
      2-column grid on mobile. **No numbers, no counts, no percentages.**
- [ ] **T016** Create `src/components/design3/Hero.astro` — centered composition:
      `.d3-glow` bloom behind, `MicroLabel` eyebrow, the page's single `h1` in
      Sora `text-4xl md:text-6xl lg:text-7xl tracking-tight leading-[1.0]`
      stating the dual value proposition (instalații electrice case noi +
      integrare smart home cu Home Assistant), a one-paragraph lead in
      `text-d3-mist`, a primary CTA (`#contact`) plus a ghost CTA (`#proiecte`),
      then `<SpecStrip />`. Not a split layout, not a photo banner.
      Section padding `pt-20 pb-24 md:pt-28 md:pb-32`.
- [ ] **T017** Create `src/components/design3/ServiceTile.astro` — props
      `service` (collection entry) and `featured`; renders a `Tile` with a
      category `MicroLabel` (`clasic` → lime, `smart` → cyan), a Sora title, the
      summary in mist, and — only when `featured` — the rendered body content.
- [ ] **T018** Create `src/components/design3/Services.astro` (`id="servicii"`) —
      loads `getCollection('services')`, sorts by `order` asc, renders
      `SectionHeading` + the bento grid per plan D-011:
      `grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5`, with the
      `featured` entry (or, if none is flagged, the first by `order`) getting
      `md:col-span-2 lg:col-span-2 lg:row-span-2`. Renders nothing at all when the
      collection is empty. Verify at 375 / 768 / 1440px that no tile is stranded
      alone on a row.
- [ ] **T019** Create `src/components/design3/FactTile.astro` — a compact `Tile`
      with a `MicroLabel` and one line of honest text. **Label-only; it must not
      display a statistic.**
- [ ] **T020** Create `src/components/design3/About.astro` (`id="despre"`) — a
      wide graphite panel (`rounded-d3-panel`), text column left telling the
      founder's passive-house / self-executed installation / Home Assistant story
      and stating I7 compliance in professional Romanian; right column = three
      stacked `FactTile`s ("Casa pasivă a fondatorului", "Automatizare locală,
      fără cloud", "Execuție conform normativului I7"). Stacks to one column on
      mobile.
- [ ] **T021** Create `src/components/design3/ProjectFlagship.astro` — full-width
      panel (`rounded-d3-panel overflow-hidden bg-d3-graphite border
      border-d3-edge`): the project image via `astro:assets` bleeding to the panel
      edge (left on `lg`, top on mobile) with the plan D-006 treatment
      (`bg-d3-obsidian/55` darkening layer + `bg-d3-lime/10` tint + a `.d3-glow`
      behind); content side shows location and year as `MicroLabel`s, the Sora
      title, the summary, the rendered body and lime tag `Chip`s. When the entry
      has no image, render a graphite-gradient fallback with a `.d3-glow` and the
      title in Sora, preserving radius and aspect ratio. Romanian `alt` text from
      `imageAlt` (fall back to the title). If the entry carries the optional
      `video` field, render `src/components/shared/VideoEmbed.astro` (import it,
      never edit it) inside a Design 3 wrapper
      (`rounded-d3-tile overflow-hidden border border-d3-edge`), passing
      `embedUrl` for `http(s)` values, `src` for local paths, and
      `title={videoTitle ?? title}` — mirroring how `design2/ProjectFeature.astro`
      already does it. If that shared component does not exist in the working
      tree, skip the video branch entirely.
- [ ] **T022** Create `src/components/design3/ProjectTile.astro` — a compact
      `Tile` variant for additional projects (title, location · year, summary,
      tags), used only when the collection has more than one entry.
- [ ] **T023** Create `src/components/design3/Projects.astro` (`id="proiecte"`) —
      loads `getCollection('projects')`, sorts by `year` desc then `order` asc,
      splits `[flagship, ...rest]`, renders `SectionHeading` with **honest
      singular framing** ("Proiectul nostru de referință" / a lead describing it
      as the project the team's experience is built on — never "proiectele
      noastre" plural while one entry exists, never an invented count), then
      `ProjectFlagship` and, if `rest.length > 0`, a
      `md:grid-cols-2 gap-4 md:gap-5` grid of `ProjectTile`s. Renders nothing when
      the collection is empty. The heading/lead wording must stay correct if a
      second project is added later.
- [ ] **T024** Create `src/components/design3/TestimonialSpotlight.astro` — a
      centered spotlight: a large lime quotation glyph, the quote body rendered in
      Sora `text-2xl md:text-4xl leading-snug text-d3-chalk`, then author, role and
      locality in `MicroLabel` styling. Accepts a `compact` prop that reduces the
      quote size for multi-entry layouts.
- [ ] **T025** Create `src/components/design3/Testimonials.astro`
      (`id="testimoniale"`) — loads `getCollection('testimonials')`, sorts by
      `order` asc; with exactly one entry renders a single centered
      `TestimonialSpotlight`; with more, renders a `md:grid-cols-2` grid of
      `compact` spotlights. Honest framing — do not imply more voices than exist,
      and do not render a star rating the data does not carry. Renders nothing when
      the collection is empty.

## Phase 4 — User Story 4: coverage, contact, footer (P2)

- [ ] **T026** Create `src/components/design3/ServiceAreas.astro` (`id="zone"`) —
      a graphite `rounded-d3-panel` with `SectionHeading`, the four counties from
      `site.counties` as lime-outlined `Chip`s, `site.coverageLine` beneath in
      `text-d3-mist`, and a ghost CTA anchoring to `#contact`.
- [ ] **T027** Create `src/components/design3/Contact.astro` (`id="contact"`) —
      the page's **only** lime-filled band: `bg-d3-lime text-d3-obsidian`, a large
      Sora heading, `site.phone` as a `tel:` link and `site.email` as a `mailto:`
      link rendered as oversized links, plus `site.workingHours` and the coverage
      line in `text-d3-obsidian/70`. No form, no non-functional submit button.
- [ ] **T028** Create `src/components/design3/Footer.astro` — `bg-d3-abyss` with a
      `border-t border-d3-edge`: wordmark, a short I7-compliance line, phone/email,
      and the current year computed at build time. No grid motif, no rounded top
      corners, no invented credentials.

## Phase 5 — Page assembly & coexistence proofs

- [ ] **T029** Create `src/pages/design-3.astro` — imports `Design3Layout` and
      composes, in spec FR-005 order: `Header`, `<main>` with `Hero`, `Services`,
      `About`, `Projects`, `Testimonials`, `ServiceAreas`, `Contact`, `</main>`,
      `Footer`. Romanian `title` and `description` mentioning "Curent Premium",
      I7, Home Assistant and the covered counties. Verify exactly one `h1` on the
      page.
- [ ] **T030** Edit `src/pages/designs.astro` — append exactly one entry:
      `{ n: 3, name: 'Curent Premium', href: '/design-3', note: 'Întunecat, premium, accent lime, grilă bento' }`.
      Change nothing else; confirm with `git diff src/pages/designs.astro` that the
      diff is a single added line.
- [ ] **T031** **Regression check** — run
      `git status --porcelain` and `git diff --stat` and confirm the only
      pre-existing files touched **by you** are `src/styles/global.css` (additions
      only) and `src/pages/designs.astro` (one line). Pre-existing uncommitted
      changes from other work (the project video support) must be left untouched —
      neither extended nor reverted. Then open `/` and `/design-2` in the dev
      server and confirm both render exactly as before. Any other file you
      modified must be reverted.
- [ ] **T032** **Isolation audit (SC-008)** — grep `src/components/design3/`,
      `src/pages/design-3.astro` and `src/layouts/Design3Layout.astro` for
      Design 1 DNA (`blueprint`, `accent-500`, `ink-900`, `ink-600`, `hairline`,
      `font-mono`, `bg-blueprint-grid`, `rounded-none`) and Design 2 DNA (`d2-`,
      `Fraunces`, `Nunito`, `.d2-noise`, `.d2-glow`, `rounded-full` on buttons).
      Expected result: zero matches. Also confirm no Design 3 file imports from
      Design 1's or Design 2's components or layouts (the shared `VideoEmbed`
      import is the one allowed exception).
- [ ] **T033** **Content-as-data + honesty proof (SC-005, SC-011)** — temporarily
      add one throwaway `.md` file to each of the three collections, run
      `npm run build`, and confirm the new items appear on `/`, `/design-2` **and**
      `/design-3` with no code change (in particular: the services bento absorbs a
      5th tile without stranding one, `Projects` renders flagship + one tile, and
      `Testimonials` switches to the two-up quote grid). **Delete the three
      throwaway files afterwards** and rebuild. Then read the Design 3 page end to
      end and confirm it states no project count, client count, years of
      experience, certification, award or team size.

## Phase 6 — Verification gate (Definition of Done)

- [ ] **T034** **Impeccable-design gate** — following
      `.github/skills/impeccable-design/SKILL.md`, walk the rendered
      `/design-3` page at ~375px and ~1280px+ and report in the skill's format.
      All 7 points plus the two Design-3-specific additions must be ✅; any ⚠️
      blocks shipping and must be fixed before T035.

      ```text
      Design QA: Design 3 — Curent Premium
      1. Spacing rhythm — one scale (py-24/md:py-32 sections, gap-4/5 bento, p-6/8 tiles)
      2. Type scale — Sora display + Manrope body, one deliberate set of sizes, no improvised heading sizes
      3. Color system — obsidian/graphite neutrals + one lime primary + sparing cyan secondary; zero one-off hex
      4. No placeholder feel — every band has real Romanian content; the single project and single testimonial read as intentional flagship/spotlight, not as a half-empty grid
      5. Responsive (375 / 768 / 1280+) — no horizontal scroll, no stranded bento tile, image never overflows, oversized quote and h1 don't clip
      6. Visual hierarchy — the lime contact band and the primary CTA are the brightest, most prominent elements; nothing competes with them
      7. Consistency — every tile, chip, button and heading share the same soft-square radius language and surface treatment
      8. Distinct identity — reads as a different studio from both Design 1 and Design 2 (dark vs light, lime vs amber vs terracotta, bento vs grid vs editorial rows)
      9. Content honesty — no invented project, client, testimonial, count, certification or award anywhere on the page
      ```

- [ ] **T035** **Final verification (DoD)** — run `npm run build` (must exit 0) and
      `npm run preview`; open `/`, `/design-2`, `/design-3` and `/designs` and
      confirm all four routes render, `/designs` lists three designs, and Designs 1
      and 2 are unchanged. Report the result, the QA table from T034 and the list
      of files added/modified.

---

## Dependencies & parallelism

- **T001–T004** must complete first (guardrails and baseline).
- **T005–T007** block everything visual (tokens, utilities, layout).
- **T008–T012** (primitives) block Phases 3–4; they are independent of each other
  and may be written in one pass.
- Within Phase 3, **T017 → T018**, **T021/T022 → T023**, **T024 → T025** are
  ordered pairs; the band groups (services / about / projects / testimonials) are
  otherwise independent.
- **T029** requires every component from Phases 3–4.
- **T031–T033** require T029–T030.
- **T034** requires a green T031–T033; **T035** requires a clean T034.
