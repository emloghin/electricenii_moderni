# Feature Specification: Design 2 — "Atelier Cald" Homepage

**Feature Branch**: `002-design-2-homepage`

**Created**: 2026-09-06

**Status**: Draft

**Input**: User description: "Homepage design 2 of 5 for Romanian electrician/smart-home team presentation site"

## Overview

Second of five distinct homepage designs for the presentation website of a
Romanian team of electricians. The content scope is **identical to Design 1** —
same business, same services (instalații electrice clasice conform normativului
I7 + smart home integrat cu Home Assistant), same team credibility story
(fondatorul și-a construit o casă pasivă și și-a cablat singur sistemul smart),
same projects, same testimonials, same coverage (Neamț, Suceava, Iași, Botoșani
+ restul țării), same contact model. Romanian only.

What changes is **everything visual and structural on the page**: a different
visual identity, a different layout rhythm, a different component vocabulary.

Design 2 **must coexist with Design 1**, not replace it. Design 1 keeps `/`;
Design 2 gets its own route and its own component folder so the owner can open
both side by side and compare before choosing.

**Visual identity for THIS design — "Design 2: Atelier Cald"**

Warm, residential, lifestyle-oriented — as if a boutique architecture studio made
the site for a family home, not a technical contractor for a substation.

- **Palette**: warm cream / sand backgrounds instead of white; terracotta as the
  primary action color; deep forest green as the grounding secondary (passive
  house / energy-efficiency association); warm brown-black text instead of blue-
  black. Zero navy, zero blueprint blue, zero amber — a viewer must never
  confuse a Design 2 screenshot with a Design 1 screenshot.
- **Shape language**: generously rounded corners (large radii on cards, pill
  buttons and pill chips), soft layered shadows for depth, **no hairline-border
  aesthetic**, no sharp 90° card corners.
- **Typography**: a warm serif for display headings paired with a humanist sans
  for body copy. **No monospace anywhere** — no `01 / 02 / 03` section indices,
  no uppercase mono eyebrows. Eyebrows are small-caps/sentence-case serif or
  sans labels in terracotta.
- **Layout rhythm**: editorial and asymmetric instead of Design 1's strict
  symmetric 12-column grid of equal cards:
  - hero is a two-column split with a large rounded image/visual card and an
    overlapping "credibility" badge, not a full-bleed dark banner;
  - servicii are alternating wide rows (image/illustrative panel on one side,
    text on the other, sides swapping per row) rather than a uniform 3-up grid;
  - proiecte use a magazine layout — one large featured project plus a stacked
    list of the rest — rather than an even grid;
  - testimoniale are staggered soft cards of unequal vertical offset;
  - zone deservite is one big rounded warm panel with county pills, not a dark
    full-bleed band;
  - the page has **no dark full-bleed bands at all**; rhythm comes from
    cream → sand → cream alternation plus one forest-green rounded panel.
- **Texture**: subtle warm grain/noise or a soft radial glow instead of Design 1's
  blueprint grid lines. No grid motif of any kind.

Designs 3–5 must diverge from both Design 1 and Design 2 (remaining candidates
noted: dark premium/luxury, bold brutalist, minimal Swiss editorial).

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homeowner evaluates the team in one scroll (Priority: P1)

A homeowner in Neamț finishing a new house lands on the Design 2 homepage from a
phone and, within one continuous scroll, understands what the team does (classic
electrical + smart home), that the work follows I7, who the team is, what they
have built, what clients say, whether their county is served, and how to get in
touch.

**Why this priority**: This is the deliverable. Without it there is no Design 2.

**Independent Test**: Run `npm run dev`, open the Design 2 route at 375px and
1440px, scroll top to bottom. All bands render with real Romanian content, no
layout overflow, no empty blocks, contact details reachable.

**Acceptance Scenarios**:

1. **Given** the Design 2 page is open at 375px, **When** the visitor scrolls top
   to bottom, **Then** header, hero, servicii, despre echipă, proiecte,
   testimoniale, zone deservite, contact and footer render in that order with no
   horizontal scrollbar.
2. **Given** the page is open at 1440px, **When** the visitor looks at any band,
   **Then** content sits in a centered max-width container with consistent
   horizontal padding and consistent vertical rhythm, and the asymmetric
   layouts (alternating service rows, featured project) read as intentional.
3. **Given** the visitor is on a phone, **When** they tap the menu button,
   **Then** a navigation panel opens with anchor links to each section; tapping a
   link scrolls to that section and closes the panel.
4. **Given** the visitor wants to make contact, **When** they tap the phone
   number or the email, **Then** the device opens the dialer / mail client
   (`tel:` / `mailto:`).

---

### User Story 2 - Owner compares Design 1 and Design 2 (Priority: P1)

The owner wants to look at both finished designs and decide which one to keep.

**Why this priority**: The entire five-design deliverable exists so the owner can
choose. A Design 2 that overwrote Design 1 would destroy the comparison and
violate the project's purpose.

**Independent Test**: Build the site; open `/` — Design 1 renders exactly as
before, byte-for-byte unchanged in its own component files; open the Design 2
route — Design 2 renders. Both work in the same build.

**Acceptance Scenarios**:

1. **Given** Design 2 is implemented, **When** the owner opens `/`, **Then**
   Design 1 ("Blueprint Tehnic") renders unchanged.
2. **Given** Design 2 is implemented, **When** the owner opens the Design 2
   route, **Then** Design 2 ("Atelier Cald") renders.
3. **Given** the owner is on either design, **When** they look for a way to
   switch, **Then** a simple design-index page lists every finished design with a
   link, and both designs are reachable from it.
4. **Given** Design 2 is implemented, **When** `git status` / a diff is
   inspected, **Then** no Design 1 component, page or content file has been
   modified (additions only, plus purely additive tokens in the shared
   stylesheet).

---

### User Story 3 - Same content, no data-model churn (Priority: P1)

The owner adds a fourth service, a new project with a photo and a new
testimonial — and both designs pick it up.

**Why this priority**: Content-as-data is a non-negotiable constitution
principle, and duplicating the content model per design would break it.

**Independent Test**: Add one `.md` file to each of the three existing
collections, rebuild — the new items appear on **both** Design 1 and Design 2,
with zero edits to any `.astro`, `.ts` or config file.

**Acceptance Scenarios**:

1. **Given** a new file in `src/content/services/`, **When** the site is rebuilt,
   **Then** a new service row appears in Design 2's servicii section, ordered by
   `order`.
2. **Given** a new file in `src/content/projects/`, **When** the site is rebuilt,
   **Then** it appears in Design 2's proiecte section (as the featured item if it
   sorts first, otherwise in the list).
3. **Given** a new file in `src/content/testimonials/`, **When** the site is
   rebuilt, **Then** a new testimonial card appears in Design 2.
4. **Given** a content file is missing a required frontmatter field, **When**
   `npm run build` runs, **Then** the build fails with a clear message naming the
   file and the field.

---

### User Story 4 - Visitor confirms coverage and credibility (Priority: P2)

A homeowner in Botoșani confirms the team travels to their county; a skeptical
visitor looks for proof of competence and standards compliance.

**Why this priority**: Converts interest into a call. Secondary to the page
existing and coexisting with Design 1.

**Independent Test**: The zone deservite panel names Neamț, Suceava, Iași and
Botoșani plus nationwide availability; the despre echipă band states the passive
house / Home Assistant story and I7 compliance.

**Acceptance Scenarios**:

1. **Given** the zone deservite panel, **When** the visitor reads it, **Then**
   the four primary counties are listed and a line states that projects are taken
   on in the rest of the country as well.
2. **Given** the despre echipă band, **When** the visitor reads it, **Then** the
   founder's own passive house wired as a smart home is described and I7
   compliance is stated in professional language.

---

### Edge Cases

- **A collection is empty**: the corresponding section is skipped entirely rather
  than rendering a heading over a blank band.
- **Only one project exists**: the magazine layout must degrade gracefully — the
  single project becomes the featured item and the side list is omitted, without
  leaving an empty column.
- **A project has no image**: a design-consistent warm fallback panel (sand
  gradient + project title in the display serif) is rendered; the rounded card
  shape and aspect ratio are preserved.
- **Very long service title or testimonial text**: text wraps; alternating rows
  and staggered cards keep their alignment; no overflow past the container.
- **Diacritics**: all Romanian diacritics (ă â î ș ț) render correctly in the
  serif display face; `lang="ro"`, UTF-8 without BOM.
- **Webfont fails to load**: the system serif / system sans fallback stack keeps
  the layout intact — the design must not depend on the webfont.
- **JavaScript disabled**: all content is visible; the mobile menu degrades to
  visible/stacked navigation, never a dead button hiding the nav.
- **Design 1 regression**: any change that alters Design 1's rendered output is a
  defect, even if Design 2 looks better for it.

## Requirements *(mandatory)*

### Functional Requirements

**Coexistence with Design 1**

- **FR-001**: Design 2 MUST be served from its own route, distinct from `/`, in
  the same static build as Design 1.
- **FR-002**: Design 2 MUST NOT modify, move or delete any existing Design 1
  component, layout, page or content file. Changes to shared files (the global
  stylesheet) MUST be purely additive and MUST NOT change any token Design 1
  consumes.
- **FR-003**: Design 2's components MUST live in their own namespaced folder so
  the two designs' component sets never collide by filename.
- **FR-004**: A simple design-index page MUST list the finished designs with a
  short label and a link to each, so the owner can compare them. It MUST be
  trivially extendable when Designs 3–5 arrive.

**Page structure**

- **FR-005**: The Design 2 page MUST contain, in this order: header/nav, hero,
  servicii, despre echipă (credibilitate), proiecte anterioare, testimoniale,
  zone deservite, contact, footer.
- **FR-006**: The header MUST be sticky and MUST include responsive navigation
  with anchor links to the sections plus a primary CTA ("Cere ofertă"), styled in
  the Design 2 identity (pill button, warm palette).
- **FR-007**: The hero MUST state the dual value proposition — instalații
  electrice pentru case noi + integrare smart home cu Home Assistant — with a
  primary CTA (contact/ofertă) and a secondary CTA (anchor to proiecte), laid out
  as an asymmetric two-column split with a large rounded visual and an
  overlapping credibility badge (NOT a dark full-bleed banner).
- **FR-008**: The servicii section MUST render one item per entry in the services
  collection as alternating wide rows, visually distinguishing `clasic` from
  `smart` entries via the entry's `category` field using Design 2's own accent
  pair (terracotta vs forest green).
- **FR-009**: The despre echipă section MUST present the founder's passive-house
  / self-installed smart-home story and MUST state compliance with the Romanian
  I7 electrical installation standard.
- **FR-010**: The proiecte anterioare section MUST render every entry of the
  projects collection in a magazine layout (one featured entry + the rest as a
  stacked list), each showing image, title, location, year and summary.
- **FR-011**: The testimoniale section MUST render a quote per entry with author
  name and locality, as staggered soft cards.
- **FR-012**: The zone deservite section MUST name Neamț, Suceava, Iași and
  Botoșani as primary coverage and state nationwide availability, presented as a
  single large rounded panel with county pills.
- **FR-013**: The contact section MUST show the phone as a `tel:` link, the email
  as a `mailto:` link, plus coverage/working info. No fake form and no
  non-functional submit button.
- **FR-014**: The footer MUST include the business name, a short I7-compliance
  line, contact essentials and the current year.

**Content-as-data**

- **FR-015**: Design 2 MUST reuse the existing collections
  (`src/content/services|projects|testimonials`) and the existing site-data file
  **without changing their schemas**. If a purely presentational need arises, it
  MUST be solved in the component, not by adding a required frontmatter field.
- **FR-016**: Design 2 components MUST NOT hardcode any service, project or
  testimonial; they render whatever the collections contain, ordered by `order`
  (services, testimonials) and `year` desc then `order` (projects).
- **FR-017**: No new sample content files are required; Design 2 renders the
  existing Romanian sample content. Narrative copy inside hero/despre/footer is
  written fresh in Design 2's warmer voice.

**Design & responsiveness**

- **FR-018**: Design 2's visual tokens (colors, fonts, radii, shadows) MUST be
  declared centrally in the shared Tailwind theme under a Design-2-specific
  namespace and reused; no ad-hoc hex color, one-off font size or arbitrary
  spacing value in any Design 2 component.
- **FR-019**: The page MUST be responsive and correct at 375px, 768px and 1440px
  with no horizontal overflow; alternating rows stack cleanly on mobile.
- **FR-020**: The design MUST follow the "Atelier Cald" identity from the
  Overview: warm cream/sand base, terracotta primary, forest-green secondary,
  large radii, soft shadows, serif display + humanist sans, no monospace, no
  navy/blueprint/amber, no grid motif, no dark full-bleed bands.
- **FR-021**: All images MUST have Romanian alt text; the page MUST have exactly
  one `h1` with section `h2`s.
- **FR-022**: No UI kit / component-library dependency may be added; Tailwind
  utilities and local Astro components only. No client-side framework; only the
  minimal vanilla JS needed for the mobile menu.

### Key Entities

Unchanged from Design 1 — the schemas in `src/content.config.ts` are reused as-is:

- **Service (`src/content/services/*.md`)**: `title`, `category`
  (`clasic` | `smart`), `summary`, `icon?`, `order`, `featured?`; body = longer
  Romanian description.
- **Project (`src/content/projects/*.md`)**: `title`, `location`, `year`,
  `summary`, `image?`, `imageAlt?`, `tags[]`, `order`; body = optional case study.
- **Testimonial (`src/content/testimonials/*.md`)**: `author`, `location`,
  `role?`, `rating?`, `order`; body = the Romanian quote.
- **Site data (`src/data/site.ts`)**: business name, tagline, phone, email,
  counties, coverage line, working hours.

No new entity and no schema change is introduced by Design 2.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run build` completes with exit code 0 and produces a static
  `dist/` containing both Design 1's `index.html` and Design 2's page HTML.
- **SC-002**: All nine required bands are present in Design 2's rendered HTML.
- **SC-003**: At 375px, 768px and 1440px the Design 2 page shows no horizontal
  scrollbar and no clipped or overlapping text.
- **SC-004**: Design 1's rendered output is unchanged: no file under
  `src/components/*.astro` (Design 1's flat set), `src/pages/index.astro`,
  `src/layouts/BaseLayout.astro`, `src/content/**` or `src/data/site.ts` is
  modified by this feature.
- **SC-005**: Adding one `.md` file to each of the three collections and
  rebuilding causes the new items to appear on **both** designs with zero edits
  to any `.astro`, `.ts`, `.json` or config file.
- **SC-006**: 100% of user-visible strings are Romanian with correct diacritics;
  zero lorem ipsum, zero English placeholder text, zero "Coming soon".
- **SC-007**: Design 2's page explicitly mentions I7 and Home Assistant, and
  names Neamț, Suceava, Iași and Botoșani plus nationwide availability.
- **SC-008**: Zero occurrences of Design 1's color tokens (blueprint/navy/amber),
  of `font-mono`, of the blueprint-grid utility, or of `rounded-none` in any
  Design 2 component — verified by grep.
- **SC-009**: Zero UI-kit dependencies added to `package.json`; the dependency
  list is unchanged except (optionally) a font package.
- **SC-010**: Placing a Design 1 screenshot next to a Design 2 screenshot, a
  non-designer can tell they are two different studios' work (different palette,
  different corner language, different type pairing, different section rhythm).

## Assumptions

Resolved without blocking (per constitution: assume, record, continue):

- **A-001**: Design 2 lives at `/design-2` (a second Astro page). The final chosen
  design will later be promoted to `/`; that promotion is out of scope here.
- **A-002**: The design-index page lives at `/designs` and links to Design 1 (`/`)
  and Design 2 (`/design-2`). It is a plain, unstyled-by-identity utility page —
  it does not need to belong to either design's visual system.
- **A-003**: The same sample content, placeholder business name, phone
  (`+40 700 000 000`) and email are reused; nothing in `src/data/site.ts` changes.
- **A-004**: The existing project placeholder SVGs (drawn in Design 1's blueprint
  palette) are reused as-is rather than redrawn. If they clash badly with the warm
  palette, Design 2 may render them inside a warm rounded frame with a soft
  overlay/duotone treatment — a purely CSS-side fix, no asset edits, no Design 1
  impact.
- **A-005**: Single page for this design; no separate servicii/contact subpages.
- **A-006**: No contact form backend; contact by `tel:` / `mailto:` only.
- **A-007**: Fonts come from a self-hosted or standard web-font source with a full
  system fallback stack; no paid fonts. Concrete faces are chosen in plan.md.
- **A-008**: No analytics, cookie banner, GDPR or legal pages.
- **A-009**: Smoke testing is a separate agent's job; this feature's own
  verification is a successful build plus a manual visual check and the
  impeccable-design gate.
- **A-010**: The user's report that Design 1 "does not work" was not reproducible
  (`npm run build` succeeds); it is treated as a design-preference rejection.
  Design 2 therefore deliberately targets the opposite end of the style spectrum.

## Out of Scope

- Designs 3–5 (separate features).
- Changing, fixing or restyling Design 1.
- Changing the content collections' schemas or the site-data shape.
- Any backend, CMS, database, authentication or form-submission service.
- Automated tests, performance budgets, SEO campaigns, accessibility audits
  beyond semantic HTML and alt text.
- Real client content, real photography, legal/GDPR pages, multi-language support.
- Promoting the chosen design to `/` and deleting the others.
