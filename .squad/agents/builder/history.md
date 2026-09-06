# Project Context

- **Project:** electricenii_moderni — Romanian electrician team presentation website
- **Created:** 2026-09-06
- **Stack:** Astro + Tailwind CSS. Content in Markdown (content collections). Static, no backend, no CMS.
- **What we're building:** 5 distinct homepage designs for a Romanian electrician/smart-home team (classic installations + Home Assistant smart integration). Ship one design fully before moving to the next. Site must be easy for a non-developer to maintain: add MD files for content, drop images for past work.
- **Audience:** Romanian homeowners, especially Neamt, Suceava, Iasi, Botosani. Must read as professional and I7-standards-compliant.
- **Inspiration:** domtech.ro, elektrosmart.ro.

## Core Context

Agent Builder initialized and ready for work. Implements only from SpecKit's tasks.md — no code before tasks exist.

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
