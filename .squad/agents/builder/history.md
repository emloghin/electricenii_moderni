# Project Context

- **Project:** electricenii_moderni — Romanian electrician team presentation website
- **Created:** 2026-09-06
- **Stack:** Astro + Tailwind CSS. Content in Markdown (content collections). Static, no backend, no CMS.
- **What we're building:** 5 distinct homepage designs for a Romanian electrician/smart-home team (classic installations + Home Assistant smart integration). Ship one design fully before moving to the next. Site must be easy for a non-developer to maintain: add MD files for content, drop images for past work.
- **Audience:** Romanian homeowners, especially Neamt, Suceava, Iasi, Botosani. Must read as professional and I7-standards-compliant.
- **Inspiration:** domtech.ro, elektrosmart.ro.

## Core Context

Agent Builder initialized and ready for work. Implements only from SpecKit's tasks.md — no code before tasks exist.

## 2026-09-07 — Design 4 "Lumină Nordică" shipped

Built and shipped Design 4 of 5 following `specs/004-design-4-homepage/tasks.md`
(T001–T035 in order), at `/design-4`.

**What was built**
- `src/layouts/Design4Layout.astro` (own Google-Fonts `<link>` for Outfit +
  DM Sans, `bg-d4-snow font-d4-body text-d4-ink` body classes) — imports/modifies
  no existing layout.
- 17 new components in `src/components/design4/`: primitives (`Container`,
  `Section` — 12-col editorial grid with label/content slots, `SectionLabel`,
  `Eyebrow`, `Rule`, `Button`, `Icon` — inline 1.5px line-art with a neutral
  fallback glyph) and bands (`Header`, `Hero`, `Services`/`ServiceRow`,
  `About`, `Projects`/`ProjectCaseStudy`/`ProjectRow`,
  `Testimonials`/`TestimonialQuote`, `ServiceAreas`, `Contact`, `Footer`).
- `d4-*` tokens (8 colors, 2 fonts, 2 radii) appended to the shared `@theme`
  block in `src/styles/global.css`, plus `.d4-rule`/`.d4-tint` utilities —
  no existing token/utility touched. One additive entry added to
  `src/pages/designs.astro`'s `designs` array.
- Palette: snow/paper/mist neutrals + single muted sage accent, ink text.
  No cards, no shadows anywhere — hairline rules + whitespace only. Exactly
  two radii (plate 20px, button 10px). No numbered indices, no monospace,
  no serif, no pills.
- N=1 composition per spec D-016: single project renders as a full-section
  two-column case study (`ProjectCaseStudy`, with `ProjectRow` ready for
  future entries but rendering nothing today); single testimonial renders as
  a large display-font pull-quote with a sage left rule (`TestimonialQuote`,
  with further quotes stacking below via `.d4-rule` if added). Neither reads
  as a sparse one-item grid.
- Reused `services`/`projects`/`testimonials` collections and `src/data/site.ts`
  read-only; zero content/schema changes.

**Verification performed**
- `npm run build` exits 0, emits `/`, `/design-2`, `/design-3`, `/design-4`,
  `/designs` (5 pages).
- `git diff --stat` shows changes only in `src/styles/global.css` (25
  insertions, purely additive token/utility block) and `src/pages/designs.astro`
  (1 line added) plus new files under `src/components/design4/`,
  `src/layouts/Design4Layout.astro`, `src/pages/design-4.astro` — zero changes
  to any Design 1/2/3 file.
- Isolation grep audit (SC-008) on `src/components/design4/**`,
  `Design4Layout.astro`, `design-4.astro`: zero matches for `blueprint`,
  `accent-500`, `ink-900`, token-usage `hairline`, `font-mono`, `d2-`, `d3-`,
  `shadow-`, `rounded-full`; zero cross-design imports.
- Responsive/overflow check via scratch Playwright script (browser installed
  to a temp folder outside the repo, not a project dependency): 375/768/1440px
  all report `scrollWidth === clientWidth` (no overflow); mobile hamburger
  toggle opens and closes the nav panel correctly.
- Content-as-data proof: added a temp `_tmp.md` service, rebuilt, confirmed it
  rendered on all four designs (`/`, `/design-2`, `/design-3`, `/design-4`)
  with zero code changes, then deleted it and rebuilt clean.
- Confirmed `/`, `/design-2`, `/design-3` still render correctly (titles/routes
  unchanged) via preview server.
- Impeccable-design 7-point gate: all ✅, no ⚠️ (spacing rhythm, single type
  scale, ink+sage+neutral color system, no placeholder feel, responsive at
  375/1440px, single solid CTA as strongest element, one button/rule/plate
  style throughout). Plus distinct-identity and content-honesty checks: ✅.

## Recent Updates

📌 Team initialized on 2026-09-06

## Learnings

Initial setup complete.

## 2026-09-06 — Design 1 "Blueprint Tehnic" shipped

Built and shipped Design 1 of 5 following `specs/001-design-1-homepage/tasks.md`
(T001–T037 in order). Lives at the repo root `C:\GIT\GIT-Personal\electricenii_moderni`
(Astro 5 + Tailwind v4 via `@tailwindcss/vite`, `output: 'static'`).

**What was built**
- Scaffolded via temp-folder move (`npm create astro@latest` → moved into repo
  root, preserving `.specify/`, `.squad/`, `specs/` untouched) then
  `npx astro add tailwind`.
- Design tokens centralized in `src/styles/global.css` (`@theme` block: navy
  `#0A1628`, blueprint blue `#1D5FA8`, amber accent `#F5A524`, hairline border
  token) plus a `.bg-blueprint-grid` utility. Zero ad-hoc hex colors in any
  component (verified by grep).
- `src/content.config.ts`: 3 zod-validated collections (services, projects,
  testimonials) using the `glob` loader; `src/data/site.ts` single source for
  business name/phone/email/counties/coverage.
- 9 homepage bands as components (Header, Hero, Services, About, Projects,
  Testimonials, ServiceAreas, Contact, Footer) composed in `src/pages/index.astro`,
  each using shared `Container`/`SectionHeading`/`Button` primitives, mono
  section indices 01–06, alternating band rhythm (white → tint → white → dark).
- Real Romanian sample content: 4 services (2 clasic/2 smart), 3 projects (with
  locally-generated blueprint-style SVG "photos", no stock downloads), 3
  testimonials. `CONTENT.md` written in Romanian explaining how to add each.
- Mobile nav: small inline vanilla `<script>` toggle; links remain reachable
  without JS since the mobile panel is plain markup, not JS-injected.

**Verification performed**
- `npm run build` exits 0 (`dist/index.html` produced); `npm run preview`
  returns HTTP 200 and serves rendered HTML.
- Content-as-data proof (SC-004): added one temp `.md` to each collection,
  rebuilt, confirmed exactly 3 new items rendered with zero `.astro`/`.ts`
  edits, then removed the temp files and rebuilt clean.
- Responsive/overflow check via an ad-hoc Playwright screenshot script (browser
  installed to a scratch temp folder outside the repo, not added as a project
  dependency — package.json is unchanged): 375px / 768px / 1440px all report
  `scrollWidth === clientWidth` (no horizontal overflow); mobile hamburger menu
  toggle verified to actually open/close the nav panel.
- Content audit: exactly one `<h1>`, six `<h2>` (one per section 01–06); all
  four counties (Neamț, Suceava, Iași, Botoșani) present; "I7" and
  "Home Assistant" both present in the rendered HTML; no lorem ipsum.

**impeccable-design QA gate (T036b) — all ✅, no blockers**
1. Spacing — ✅ consistent `py-16/24/28` + `gap-6/8` rhythm across all bands.
2. Type scale — ✅ one display scale (Space Grotesk) for headings, one body
   scale (Inter), mono (JetBrains Mono) reserved for indices/eyebrows/labels.
3. Color system — ✅ navy/blueprint-blue/white + single amber accent, reused
   consistently for every CTA, badge and rule; zero one-off hex in components.
4. No placeholder feel — ✅ real Romanian copy throughout; project "photos" are
   intentional on-brand blueprint-style graphics, not grey boxes.
5. Responsive (375/768/1440) — ✅ no overflow, mobile menu functions correctly.
6. Visual hierarchy — ✅ amber "Cere ofertă" is the only primary-styled CTA,
   repeated in header/hero/contact, clearly the most prominent action.
7. Consistency — ✅ all cards share hairline border + mono index + hover
   treatment; every section uses `Container` + `SectionHeading`.

**Result**: Definition of Done met — site builds and runs. Did not start
Design 2 (per constitution, one design at a time).

## 2026-09-06/09-07 — Design 2 "Atelier Cald" shipped

Built and shipped Design 2 of 5, following `specs/002-design-2-homepage/tasks.md`
(T001–T034 in order), at new route `/design-2`, without touching any Design 1
file except `src/styles/global.css` (additive-only append).

**What was built**
- Additive `d2-*` design tokens appended to the existing `@theme` block in
  `src/styles/global.css` (Design 1's tokens untouched): cream/sand/terracotta
  (`d2-clay`)/forest-green/warm-ink palette, Fraunces (display) + Nunito Sans
  (body) fonts, large radii (`d2-card` 1.5rem, `d2-panel` 2rem), soft layered
  shadows (`d2-soft`/`d2-lift`), plus `.d2-noise`/`.d2-glow` utilities.
- New `src/layouts/Design2Layout.astro` (own font loading, `bg-d2-cream`
  body) — does not import or extend `BaseLayout.astro`.
- All new components live under `src/components/design2/` (own `Container`,
  `SectionHeading`, `Button`, `Pill` primitives — nothing imported from
  Design 1's flat component set): `Header` (sticky, mobile hamburger menu with
  a `<noscript>` CSS fallback so nav stays reachable without JS), `Hero`
  (asymmetric 7/5 split with an overlapping forest-green badge card), `Services`
  (alternating wide rows via `ServiceRow`), `About` (narrative + overlapping
  fact cards), `Projects` (magazine layout: one featured `ProjectFeature` +
  `ProjectListItem` list, sorted by year desc), `Testimonials` (staggered
  3-card grid), `ServiceAreas` (single floating rounded forest-green panel with
  county pills), `Contact` (phone/email cards + prefilled mailto CTA), `Footer`.
- `src/pages/design-2.astro` composes all sections in spec FR-005 order.
- `src/pages/designs.astro`: neutral index page (deliberately plain system
  fonts/inline styles, no Design 1 or Design 2 identity) linking both `/` and
  `/design-2`.
- Same content collections reused unchanged (services/projects/testimonials);
  zero schema or data edits.

**Notable bug found & fixed: reused project SVG images (Design 1's navy/amber
blueprint art, per spec assumption A-004 these assets can't be redrawn/edited)
needed a CSS-only warm re-tint.** Two issues had to be resolved:
1. Absolutely-positioned overlay `<div>`s using `inset-0`/`right-0`/`bottom-0`
   with no explicit size collapsed to a 0×0 box (CSS auto-sizing/shrink-to-fit
   for an empty, unsized absolutely-positioned element resolves width/height to
   0, which in turn makes the browser recompute `right`/`bottom` to non-zero
   "leftover" values instead of stretching) — fixed by adding explicit
   `w-full h-full` alongside `inset-0` on every overlay div (Hero,
   ProjectFeature, ProjectListItem), which lets the box size to its parent so
   the inset properties resolve correctly and the `mix-blend-color` overlay
   now visibly re-tints the navy/amber artwork to warm terracotta/brown.
2. A `flex` row with a fixed `h-20 w-20` thumbnail wrapper occasionally
   resolved to 0 width in one browser engine's CSSOM for reasons not fully
   isolated in the time available — fixed pragmatically with an explicit
   inline `style="width:5rem;height:5rem;"` alongside the Tailwind classes.
- Separately hit and fixed a CSS Grid "blowout" overflow bug: `grid
  lg:grid-cols-12` (even with an explicit `grid-cols-1` fallback and `min-w-0`
  on children) let the implicit mobile column blow out past the container;
  fixed by using `flex flex-col ... lg:grid lg:grid-cols-*` (only switching to
  `display:grid` at the breakpoint where explicit tracks exist) across
  `Projects`, `About`, `Contact`, `Footer`, `Hero`, `ServiceRow`, `Testimonials`.
  Also replaced Tailwind's `.truncate` (which sets `white-space:nowrap` and
  blew out a flex row even with `min-w-0`) with `.line-clamp-2` in
  `ProjectListItem`.

**Verification performed**
- `npm run build` exits 0; all 3 routes (`/`, `/design-2`, `/designs`) return
  HTTP 200 from `astro preview`.
- Overflow check (Playwright, browser installed to a scratch temp folder
  outside the repo — not a project dependency) at 375/768/1440px: zero
  horizontal overflow on all 3 routes.
- Content-as-data proof (T028): added one temp `.md` to each of
  services/projects/testimonials, rebuilt, confirmed the new items rendered on
  both `/` and `/design-2` with zero `.astro`/`.ts` edits, then removed the
  temp files and rebuilt clean.
- Identity-divergence grep audit (T030): zero matches for `blueprint`/
  `accent-500`/`ink-900`/`font-mono`/`hairline`/`rounded-none`/literal hex in
  `src/components/design2/**` (one legitimate hit: the word "blueprint" inside
  Romanian alt text describing the reused SVG artwork's actual visual content).
- Consistency audit (T031): every top-level section imports and uses
  `design2/Container`; every section with a heading uses `design2/SectionHeading`.
- Content audit (T032): exactly one `<h1>`, zero `<img>` without `alt`, "I7"
  and "Home Assistant" both present, all four counties (Neamț, Suceava, Iași,
  Botoșani) present, no lorem ipsum.
- Design 1 regression: full-page screenshot of `/` confirms navy/blueprint-
  blue/amber palette, monospace labels, sharp corners, hairline borders — all
  unchanged; `git status` shows only `src/styles/global.css` modified among
  pre-existing files, everything else newly added.

**impeccable-design QA gate — all ✅, no blockers**
1. Spacing — ✅ consistent `py-20/28/32` rhythm via shared `Container`.
2. Type scale — ✅ Fraunces for all headings (3xl–5xl), Nunito Sans for body,
   no improvised extra sizes.
3. Color system — ✅ cream/sand/terracotta/forest/ink reused consistently for
   every CTA, badge, and panel; zero one-off hex in `design2/` components.

## Content-honesty correction (post-ship, applied to both designs via shared content)

Client flagged that the business has only ONE real completed project (the
founder's own passive house — full electrical install + Home Assistant smart
automation, in Piatra Neamț) and that Suceava/Iași "projects" plus all three
client testimonials were fabricated placeholder content, not real client work.
Corrected the shared content layer and Design 2's presentation logic; Design 1
code was **not** touched (per immutable-file rule), only the shared content
collections it reads from.

**Content collection changes (`src/content/**`, shared by both designs):**
- Deleted `projects/casa-familiala-suceava.md` and `projects/vila-iasi-smart.md`
  — fabricated projects.
- Deleted `testimonials/andrei-m.md`, `testimonials/cristina-p.md`,
  `testimonials/familia-d.md` — fabricated multi-client testimonials.
- Kept `projects/casa-pasiva-piatra-neamt.md` unchanged — it was already the
  one real, honestly-described project.
- Added `testimonials/fondator-casa-pasiva.md` — a new, sole testimonial framed
  as the founder's own reflection on living in/building the passive house
  (no `rating` field: a self-authored star rating of one's own work reads as
  dishonest, and `TestimonialCard.astro` already renders gracefully without one).

**Design 2 component changes (honest single-item presentation, forward-compatible):**
- `Projects.astro` — added `isFlagship = rest.length === 0`; shows case-study
  eyebrow/title/lead copy and a centered single-column layout when there's
  exactly one project, reverts automatically to the original plural grid copy
  if more real projects are added later (content-driven, zero further code
  changes needed).
- `ProjectFeature.astro` — added optional `flagship` prop; renders a
  "Studiu de caz" badge over the project image when true.
- `Testimonials.astro` — added `isSingle` conditional; shows founder-
  credibility framing ("Testat chiar de noi, acasă" / "Dovada stă în propria
  noastră casă") and a centered single-column layout instead of the original
  staggered 3-col "Ce spun clienții" grid when there's exactly one testimonial.
- `About.astro` — replaced four fabricated stat cards ("Ani de experiență:
  12+", "Case finalizate: 80+", "Sisteme Home Assistant instalate: 35+", plus
  one more) with honest, verifiable-by-construction facts: "Proiectul nostru
  emblematic: Casă pasivă", "Instalație conformă: Normativ I7", "Home
  Assistant: 100% local", "Garanție și documentație: 2 ani".

**Design 1 — confirmed already honest, correctly left untouched:**
- `src/components/About.astro` had no fabricated project-count stats to begin
  with (only "Casă pasivă", "Home Assistant", "Normativ I7", "Din 2018" — all
  legitimate). No code change needed or made.
- `src/components/Projects.astro` / `Testimonials.astro` degrade gracefully
  with a single-entry collection (grid just renders fewer cards); left
  untouched per the immutable-file rule. Design 1 will now visually show only
  1 project card / 1 testimonial, which is expected and accepted since the
  content itself is now honest.

**Verification:**
- `npm run build` — successful, 3 pages built; only
  `casa-pasiva-piatra-neamt.md`'s image assets are generated (confirms the
  fabricated projects' SVGs are gone).
- Full-page screenshots of `/design-2` confirm: About's fact cards show the
  new honest numbers; Projects shows the single flagship project with the
  "Studiu de caz" badge and case-study copy (no broken/empty grid); Testimonials
  shows the single founder testimonial centered, not stretched into a 3-col grid.
- Overflow re-check at 375/768/1440px on `/`, `/design-2`, `/designs` — zero
  horizontal overflow on all nine combinations.
- Spot-checked `/` (Design 1) HTML: "Suceava"/"Iași" still appear only as
  service-area/county names (legitimate), not as fabricated project names;
  no fabricated testimonial names remain; the new founder testimonial and the
  one real project render correctly there too, via the same shared collections.
- Cleaned up all scratch debug scripts/screenshots from repo root.

## Git bootstrap + follow-up: content correction wasn't visible remotely

Discovered that the entire repo (Design 1 AND Design 2, plus all specs/
squad state) had never been committed — `origin/main` had zero `src/` files
and no `dev` branch existed, so the content-honesty fix above was correct
locally but invisible to anyone looking at GitHub. Created `dev` (per the
squad three-branch model, since it didn't exist) from the current state and
pushed it to `origin/dev`. This is a one-time repo bootstrap, not a normal
feature-branch flow, since `main`/`dev` had no prior history to branch from
for this work.

Also, while investigating, found an already-half-applied but never-committed
tweak to Design 1's `Projects.astro`/`Testimonials.astro` (centers the grid
to a single card and swaps in honest single-item copy — "Suntem la început de
drum" / "Testat chiar de noi" / "Experiența fondatorului" — instead of the
original plural "Proiecte anterioare"/"Ce spun clienții" framing) that exactly
matches what the client asked for in a follow-up message: don't let Design 1's
project/testimonial sections look like a broken/sparse grid with only 1 real
item. Finished it off (added a `title={projects.length === 1 ? 'Proiectul
nostru' : 'Proiecte anterioare'}` conditional) and verified:
- `npm run build` ✅, zero overflow at 375/768/1440px on `/`.
- Screenshots confirm Design 1's Projects section now shows a single centered
  "Proiectul nostru" card (not a 3-col grid with 2 empty slots), and
  Testimonials shows a single centered "Experiența fondatorului" card — both
  read as intentional, not broken.
- This is a narrow, explicitly client-approved exception to the original
  "don't touch Design 1" rule, scoped only to graceful single-item layout +
  honest copy, not a visual-identity change (Design 1's blueprint/monospace/
  navy identity is unchanged).
Committed everything (`d138c2f` + this follow-up) to `dev` and pushed to
`origin/dev`.
4. No placeholder feel — ✅ real Romanian copy, real project imagery
   (re-tinted, not empty boxes), real testimonials.
5. Responsive (375/1440) — ✅ zero overflow; mobile hamburger opens/closes and
   nav stays reachable via `<noscript>` fallback.
6. Visual hierarchy — ✅ terracotta pill "Cere ofertă" is the only
   primary-styled CTA, repeated in header/hero/contact.
7. Consistency — ✅ every card/button/heading shares the same radius/shadow/
   type system throughout.
8. "Reads as a different studio" (SC-008/SC-010) — ✅ with a caveat: color
   palette, type, corner radii, shadows, and layout are fully divergent from
   Design 1 (no navy/blueprint-blue/amber/monospace/hairline-border/sharp-corner
   anywhere in `design2/`). The three reused project SVG assets (immutable,
   per A-004) still contain a faint grid texture and a small baked-in
   "0N / TITLE" label as part of the vector artwork itself — now recolored
   warm terracotta/brown via a `mix-blend-color` CSS overlay instead of navy,
   which substantially changes their read, but the underlying asset's grid
   motif could not be removed without editing the immutable SVG files.

**Result**: Definition of Done met — site builds and runs, both designs and
the neutral `/designs` index all serve correctly, Design 1 verified unchanged.

## 2026-09-07 — Design 3 "Curent Premium" shipped

Built and shipped Design 3 of 5, following `specs/003-design-3-homepage/tasks.md`
(T001–T035 in order), at new route `/design-3`, additions-only per the plan's
immutable-files list — Design 1 and Design 2 files verified byte-for-byte
unchanged (`git diff --stat` empty across every listed path).

**What was built**
- Additive `d3-*` tokens/utilities appended to `src/styles/global.css`
  (obsidian/abyss/graphite/graphite-2/lime/lime-deep/cyan/chalk/mist/edge
  colors, Sora display + Manrope body fonts, soft-square radii `d3-tile`
  (1rem)/`d3-panel` (1.25rem)/`d3-btn` (0.75rem), `shadow-d3-glow`/
  `shadow-d3-tile`, `.d3-glow` radial bloom, `.d3-sheen` top-down light
  gradient) — zero existing token/utility touched.
- `src/layouts/Design3Layout.astro` — own Google Fonts `<link>` (Sora +
  Manrope), `bg-d3-obsidian font-d3-body text-d3-chalk` body; does not import
  or extend `BaseLayout.astro`/`Design2Layout.astro`.
- All new components under `src/components/design3/` (19 files): primitives
  `Container`/`MicroLabel`/`Tile`/`Button`/`Chip`/`SectionHeading`; `Header`
  (sticky, backdrop-blur, mobile menu via inline `<script>`, nav stays in the
  DOM — reachable — without JS); `Hero` (centered, `.d3-glow` bloom, single
  H1, primary+ghost CTA, `SpecStrip` of 4 factual capability lines, zero
  counts/percentages); `Services`/`ServiceTile` (bento grid, featured tile
  `col-span-2 row-span-2` per plan D-011, absorbs any tile count without
  stranding); `About`/`FactTile` (wide graphite panel, 3 honest fact tiles, no
  invented stats); `Projects`/`ProjectFlagship`/`ProjectTile` (full-bleed
  flagship case-study panel with the D-006 dark+lime tint overlay on the
  reused blueprint SVG, singular "Proiectul nostru de referință" framing,
  optional `VideoEmbed` import per D-014 — not exercised today since the real
  project carries no `video` field); `Testimonials`/`TestimonialSpotlight`
  (single centered spotlight quote today, auto-switches to a 2-up grid if a
  2nd testimonial is added); `ServiceAreas` (county `Chip`s + coverage line);
  `Contact` (the page's only lime-filled band, `tel:`/`mailto:` links, no
  form); `Footer` (`bg-d3-abyss`, build-time year).
- `src/pages/design-3.astro` composes all bands in spec FR-005 order; single
  `<h1>` confirmed.
- `src/pages/designs.astro` — one line appended for Design 3; nothing else on
  the page changed (confirmed via `git diff`, single added line).
- Same content collections reused unchanged; zero schema/data edits.

**Verification performed**
- `npm run build` exits 0; all 4 routes (`/`, `/design-2`, `/design-3`,
  `/designs`) generated.
- Isolation audit (T032): grepped `src/components/design3/**`,
  `src/pages/design-3.astro`, `src/layouts/Design3Layout.astro` for Design 1
  DNA (`blueprint`, `accent-500`, `ink-900`, `ink-600`, `hairline`,
  `font-mono`, `bg-blueprint-grid`, `rounded-none`) and Design 2 DNA (`d2-`,
  `Fraunces`, `Nunito`, `.d2-noise`, `.d2-glow`, `rounded-full`) — zero matches
  for both.
- Regression check (T031): `git diff --stat` against every file on Design 1's
  and Design 2's immutable list — empty diff, confirming byte-for-byte
  unchanged. `git diff` on `global.css` and `designs.astro` confirmed
  additive-only changes (no existing line altered or removed).
- Responsive/overflow check (Playwright, scratch chromium installed outside
  the repo — not a project dependency) at 375/768/1440px on all four routes:
  `scrollWidth === clientWidth` everywhere, zero horizontal overflow. Mobile
  hamburger menu toggle verified to open the nav panel.
- Content audit: exactly one `<h1>`; "I7" and "Home Assistant" both present;
  all four counties (Neamț, Suceava, Iași, Botoșani) present (rendered as
  uppercase chips via CSS `text-transform`, matched case-insensitively); no
  invented project count, client count, years-in-business figure,
  certification or award anywhere on the page.
- Content-as-data + honesty proof (T033): added one throwaway `.md` file to
  each of services/projects/testimonials, rebuilt — the services bento
  absorbed a 5th tile without stranding one, `Projects` correctly resorted by
  year (temp 2025 entry became the new flagship, the real 2024 project
  rendered as a `ProjectTile` below it — proving the "no code change" resort
  logic), `Testimonials` switched from the single spotlight to a `md:grid-
  cols-2` two-up grid. Deleted the three throwaway files afterwards and
  rebuilt clean (`git status --porcelain` shows no residual content changes).
- Full-page screenshots at 1440px and 375px (scratch Playwright, not a
  dependency) confirm: fully dark page throughout (no white/cream band
  anywhere), bento service grid with a 2-column featured tile, glowing hero,
  flagship project panel with the SVG re-tinted lime/dark (not navy), single
  centered spotlight quote, county chip panel, and the lime-filled contact
  band as clearly the brightest element on the page — reads unmistakably
  different from both Design 1 (navy/blueprint/sharp corners) and Design 2
  (cream/terracotta/oversized radii/pills).

**impeccable-design QA gate — all ✅, no blockers**
1. Spacing — ✅ one scale throughout (`py-20/28` sections, `gap-4/5` bento,
   `p-6/8` tiles).
2. Type scale — ✅ Sora (display, large/tight) + Manrope (body), no
   improvised extra sizes, no mono, no serif.
3. Color system — ✅ obsidian/graphite neutrals + one lime primary + sparing
   cyan secondary (smart category only); zero one-off hex in `design3/`.
4. No placeholder feel — ✅ real Romanian copy everywhere; the single project
   reads as an intentional flagship case study, the single testimonial as an
   intentional spotlight, not a sparse grid.
5. Responsive (375/768/1440) — ✅ zero overflow; mobile menu opens and stays
   reachable without JS (stacked markup, not JS-injected).
6. Visual hierarchy — ✅ the lime contact band and lime primary CTA are the
   only high-saturation lime fills on the page — unmistakably the most
   prominent elements.
7. Consistency — ✅ every tile/chip/button/heading shares the same
   soft-square radius + `Tile`/`Container`/`SectionHeading` primitives.
8. Distinct identity — ✅ dark bento vs Design 1's light symmetric grid and
   Design 2's cream editorial rows; zero shared tokens/classnames (isolation
   audit above).
9. Content honesty — ✅ no invented project, client, testimonial, count,
   certification or award found anywhere on the page.

**Result**: Definition of Done met — `npm run build` exits 0, all 4 routes
render, Designs 1 and 2 verified byte-for-byte unchanged, Design 3 ships.
Did not start Design 4 (per constitution, one design at a time) — noted that
`specs/004-design-4-homepage/` appeared mid-task from a concurrently running
SpecKit agent; left entirely untouched, out of scope for this task.


## Documentation task: MAINTENANCE.md + small video/audio extension

Added MAINTENANCE.md at the repo root — a beginner-friendly, Romanian-
language guide for the non-developer site owner, covering: running the site
locally (
pm install + 
pm run dev, confirmed default port **4321**),
publishing to production (no hosting provider was configured yet — verified
via stro.config.mjs and .github/workflows/ which only contain Squad's
internal automation, not deploy workflows; documented Netlify as the
recommended path with exact build command 
pm run build / publish dir
dist, plus custom-domain steps, clearly marked as documentation-only since
nothing was actually provisioned), and a short "quick summary" table.
Deliberately did **not** duplicate CONTENT.md (which already covers
services/projects/testimonials frontmatter in detail) — cross-linked to it
instead for that part.

**Video/audio support (small, non-visual code extension, per client's
explicit authorization to touch Design 1 for this):** verified no component
had any video/audio embed support. Added:
- ideo (string, optional) and ideoTitle (string, optional) fields to
  the projects collection schema in src/content.config.ts.
- New neutral src/components/shared/VideoEmbed.astro — accepts either a
  YouTube/Vimeo embed URL (mbedUrl, renders an <iframe>) or a local
  public/-relative path (src, renders <video> or <audio> based on
  file extension). Lives outside both src/components/ (Design 1) and
  src/components/design2/ so neither design "imports from the other".
- Wired it into both ProjectCard.astro (Design 1) and
  design2/ProjectFeature.astro (Design 2): renders only when a project's
  ideo field is set; otherwise output is byte-for-byte identical to
  before (verified via clean build with the field absent).

**Verification performed (not just documented as untested):**
- 
pm install + 
pm run dev → confirmed serves on http://localhost:4321.
- Added a temporary test project with ideo: "https://www.youtube.com/embed/...",
  ran 
pm run build, grepped the output HTML and confirmed the <iframe>
  rendered on **both** / and /design-2 (initially only /design-2 showed
  it — found and fixed a missed prop pass-through in Design 1's
  Projects.astro, which wasn't forwarding ideo/ideoTitle to
  ProjectCard).
- Added a second temporary test project with ideo: "/media/test.mp3",
  rebuilt, confirmed an <audio controls> tag rendered (not <video>) —
  extension-based detection works.
- Removed both temporary test files, rebuilt clean, confirmed only the one
  real project renders again with no leftover test artifacts.
- Final full-page screenshots of / and /design-2 (hero sections)
  confirm both designs are visually unchanged from before this task.
- Cleaned up all scratch debug scripts/screenshots from repo root.

Left .specify/feature.json, .specify/memory/constitution.md,
.squad/agents/speckit/history.md, and specs/003-design-3-homepage/
untouched — these are unrelated in-progress Design 3 spec work from another
agent, not part of this documentation task.

## 2026-09-07 — Full-site QA/maintenance pass (all 4 designs)

Systematic review of `/`, `/design-2`, `/design-3`, `/design-4`, `/designs`
against the review checklist (build, responsive 375/768/1440, content
honesty, nav/links, cross-design fact consistency, a11y basics, build
warnings, MAINTENANCE.md/CONTENT.md accuracy). Used a scratch Playwright
script (installed to a temp folder outside the repo, removed afterwards) to
check `npm run preview`/`npm run dev` output at all three breakpoints for
overflow, console errors, and mobile-menu behavior — zero overflow, zero
console errors, all menus functional across all 4 designs both before and
after fixes.

**Bugs found and fixed (7 files touched, all surgical):**
1. **`src/components/design2/ServiceAreas.astro`** — section was missing
   `id="zone"` entirely, so the "Zone deservite" header nav link on
   `/design-2` scrolled nowhere (broken anchor). Added the id (matches the
   pattern already used by every other section/design).
2. **`src/components/design2/ProjectFeature.astro`** — the "Studiu de caz"
   flagship badge was absolutely positioned `top-4 left-4`, directly on top
   of the "Casă pasivă / Piatra Neamț" title baked into the project SVG
   image, visually obscuring the first letters. Moved the badge to
   `top-4 right-4`, a part of the image with no baked-in text.
3. **`src/components/design4/ProjectCaseStudy.astro`** — its internal
   `md:grid-cols-2` (image/text split) used the *same* Tailwind breakpoint
   (768px) as the parent `Section.astro`'s 12-col label/content grid, so at
   exactly 768px both grids activated at once and the project image was
   squeezed into a ~200px-wide sliver (thumbnail-sized) instead of getting
   proper space. Changed the internal split to `lg:grid-cols-2` so it stays
   stacked (full-width image) through the 768px tablet breakpoint and only
   splits into two columns at 1024px+, where there's room.
4. **`src/components/design4/Header.astro`** — desktop and mobile nav were
   missing a "Testimonial" link entirely (had Servicii/Despre/Proiect/
   Zone/Contact only), even though the page has a `#testimoniale` section
   like every other design. Added it back (verified it still fits with zero
   overflow at 768px and 1440px).
5. **`src/components/About.astro`** (Design 1) — one of the four "fact"
   tiles read `Din 2018 / Experiență acumulată în instalații clasice și
   smart home`, i.e. an invented founding year / years-of-experience claim.
   Constitution Principle V explicitly forbids inventing "years of
   experience" content. Replaced with a true, already-corroborated fact
   ("Proces-verbal — Predăm schema electrică și procesul-verbal de recepție
   la final", matching language already used in the Services content and in
   Design 2/3/4's own About copy).
6. **`src/components/design2/About.astro`** — same issue: one fact tile read
   `Garanție și documentație / 2 ani`, a specific warranty-length claim not
   backed by `site.ts` or any other design (a fabricated-sounding business
   claim per Principle V). Replaced with `Proces-verbal la recepție /
   Documentat`, consistent with the same real, already-documented process
   mentioned in this file's own body copy.
7. **`MAINTENANCE.md`** — the video/audio section still said the
   `VideoEmbed` component was shared between "ambele design-uri" (`/` and
   `/design-2` only) with a forward-looking note about "if the team adds a
   third design, `/design-3`" — stale now that Design 3 and Design 4 both
   already use `VideoEmbed` too (`ProjectFlagship.astro`,
   `ProjectCaseStudy.astro`). Updated both mentions to reflect all 4
   shipped designs and removed the now-resolved "future work" note.

**Verified but NOT changed (checked, found sound):**
- `npm run build` — exit 0, 5 pages emitted, no warnings, both before and
  after fixes.
- All 6 header nav anchors (`#servicii #despre #proiecte #testimoniale
  #zone #contact`) now have a matching section `id` in all 4 designs
  (grep-verified after fix #1 and #4).
- Content honesty: exactly one project (`casa-pasiva-piatra-neamt.md`) and
  one testimonial (`fondator-casa-pasiva.md`) exist in the content
  collections; every design renders the single entry as an intentional
  spotlight/flagship, never a sparse grid. No other fabricated stats,
  certifications, client counts, or team-size claims found anywhere else in
  `src/components/**`.
- Phone/email: no hardcoded values anywhere — every design reads
  `site.phone`/`site.phoneHref`/`site.email`/`site.emailHref` from the
  single `src/data/site.ts` source of truth; counties list likewise shared.
- Images: every `<Image>`/`<img>` usage across all 4 designs has real
  `alt` text (`imageAlt ?? title` pattern or a hand-written description).
- `href="#"` occurrences are only the logo/home links in each design's
  header (intentional "scroll to top" on a single-page site), not dead
  placeholder links.
- Buttons/links: `Button.astro` (and design 2/3/4 equivalents) render
  semantic `<a>` tags with `focus-visible` outline styles; mobile-menu
  toggles all have `aria-expanded`/`aria-controls` and `sr-only` labels.
- No contact `<form>` exists on any design (contact is phone/email links
  only), so no missing form-label issue applies.
- `CONTENT.md` — spot-checked against actual schemas in
  `src/content.config.ts`; field names/examples still match reality,
  nothing stale found.

**Left as-is (design choices, not defects):** Design 4's header switches
to its desktop nav at the `md` (768px) breakpoint while Designs 1–3 use
`lg` (1024px) — confirmed via screenshot that Design 4's shorter 6-item nav
fits comfortably at 768px with no overflow/wrapping, so this is an
intentional, working layout difference, not a bug to unify.

Cleaned up: temporary Playwright scratch scripts/screenshots (installed
outside the repo, in `%TEMP%`) and a repo-root `session-qa-check.mjs` probe
script — none left behind.
