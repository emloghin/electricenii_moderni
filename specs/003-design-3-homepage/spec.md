# Feature Specification: Design 3 — "Curent Premium" Homepage

**Feature Branch**: `003-design-3-homepage`

**Created**: 2026-09-07

**Status**: Draft

**Input**: User description: "Homepage design 3 of 5 for Romanian electrician/smart-home team presentation site — a new, visually distinct homepage at `/design-3`"

## Overview

Third of five distinct homepage designs for the presentation website of a
Romanian team of electricians. The content scope is **identical to Designs 1 and
2** — same business, same services (instalații electrice clasice conforme
normativului I7 + smart home integrat cu Home Assistant), same credibility story
(fondatorul și-a construit casa pasivă din Piatra Neamț și și-a executat singur
instalația electrică, apoi a integrat-o cu Home Assistant), the **one real
project**, the **one real testimonial**, same coverage (Neamț, Suceava, Iași,
Botoșani + restul țării), same contact model. Romanian only.

What changes is **everything visual and structural on the page**: a third visual
identity, a third layout rhythm, a third component vocabulary.

Design 3 **must coexist with Designs 1 and 2**, not replace either. Design 1
keeps `/`, Design 2 keeps `/design-2`, Design 3 gets its own route and its own
component folder, and the `/designs` index page lists all three.

### Visual identity for THIS design — "Design 3: Curent Premium"

A dark, premium, product-launch feel — the way a modern hardware or smart-home
*brand* presents itself, not the way a contractor or an architecture studio does.
Design 1 is a technical blueprint document on white paper. Design 2 is a warm
printed magazine. Design 3 is a **dark, glowing product page**: confident,
high-contrast, energetic — "curent" (electricity) as light in the dark.

- **Palette**: dark-first. The **entire page** is dark — obsidian near-black base
  with graphite elevated surfaces; there is no white/cream page background
  anywhere. A single high-voltage accent — **electric lime** — carries every
  primary action, active state and category highlight, supported by a cool
  cyan-tinted secondary used sparingly for the `smart` category. Text is
  near-white on dark with a muted cool grey for secondary copy.
  **Zero navy / blueprint blue / amber** (Design 1's DNA) and **zero cream /
  sand / terracotta / forest green** (Design 2's DNA). A viewer must never
  confuse a Design 3 screenshot with a Design 1 or Design 2 screenshot.
- **Shape language**: uniform medium radii ("soft-square", ~14–20px) on every
  tile — **not** Design 1's sharp 90° corners and **not** Design 2's oversized
  24/32px radii with pill buttons. Buttons are soft-square, never pills.
  Depth comes from **luminosity**: subtle light-from-above gradients on surfaces,
  faint 1px light-tinted top edges, and colored glow around the primary CTA —
  not from Design 1's hairline borders and not from Design 2's soft warm drop
  shadows.
- **Typography**: a geometric/expressive sans for display, set **large and tight**
  (tight tracking, tight leading, big jumps in scale), paired with a modern
  grotesque for body copy. Small uppercase micro-labels with wide letter-spacing
  act as eyebrows. **No monospace anywhere** (Design 1's DNA), **no serif
  anywhere** (Design 2's DNA), **no `01 / 02 / 03` section indices**.
- **Layout rhythm**: a **bento grid** — the page's signature pattern — instead of
  Design 1's uniform symmetric card grid and Design 2's alternating editorial
  rows:
  - hero is **centered**, with an oversized headline, a lime radial glow behind
    it, one primary CTA plus one quiet secondary CTA, and a compact "spec strip"
    of short factual capabilities beneath it (not a split layout, not a banner);
  - servicii are a **bento grid of unequal tiles** — the featured service spans
    two columns, the rest fill the grid — every tile a soft-square dark surface
    with a category micro-label;
  - despre echipă is a wide dark panel with the founder's story and a compact
    stack of honest, verifiable fact tiles (no invented statistics);
  - proiecte is a single **immersive flagship case-study panel**: full-width
    dark card, image bleeding to the panel edge, lime tag chips, location/year
    as micro-labels — deliberately built for exactly one real project;
  - testimoniale is a single **spotlight quote**: oversized display type,
    centered, attributed — deliberately built for exactly one real voice;
  - zone deservite is a dark tile grid of county chips with a lime-highlighted
    primary set and a nationwide line;
  - contact is the **only lime-filled band** on the page — the page's brightest
    element, so it is unmistakably the primary action;
  - footer is the deepest black surface on the page.
- **Texture**: soft radial neon glow(s) and a faint linear "sheen" gradient on
  elevated surfaces. **No blueprint grid lines** (Design 1) and **no warm
  grain/noise** (Design 2).

Designs 4–5 must diverge from all three shipped identities (remaining candidates
noted: bold brutalist, minimal Swiss/Scandinavian light, high-contrast
safety/industrial).

### Content honesty (hard project rule)

The business is brand new. There is exactly **one real completed project** (the
founder's own passive house in Piatra Neamț — full electrical install plus Home
Assistant automation, executed by him) and exactly **one real testimonial** (the
founder's own reflection on living in that house). Design 3 MUST NOT invent
additional projects, clients, testimonials, statistics, years of experience,
certifications, awards, team-size figures or "peste N lucrări" claims. Sections
that show collection content must read as *intentional and finished* with a
single entry — a flagship case study and a spotlight quote — never as a sparse
grid with empty slots.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homeowner evaluates the team in one scroll (Priority: P1)

A homeowner in Neamț finishing a new house lands on the Design 3 homepage from a
phone and, within one continuous scroll, understands what the team does (classic
electrical + smart home), that the work follows I7, who the team is, what they
have built, what living with that work is like, whether their county is served,
and how to get in touch.

**Why this priority**: This is the deliverable. Without it there is no Design 3.

**Independent Test**: Run `npm run dev`, open `/design-3` at 375px and 1440px,
scroll top to bottom. All bands render with real Romanian content, no layout
overflow, no empty blocks, contact details reachable.

**Acceptance Scenarios**:

1. **Given** the Design 3 page is open at 375px, **When** the visitor scrolls top
   to bottom, **Then** header, hero, servicii, despre echipă, proiect,
   testimonial, zone deservite, contact and footer render in that order with no
   horizontal scrollbar.
2. **Given** the page is open at 1440px, **When** the visitor looks at any band,
   **Then** content sits in a centered max-width container with consistent
   horizontal padding and a consistent vertical rhythm, and the bento grid reads
   as a deliberate composition (no orphan tile stranded on its own row).
3. **Given** the visitor is on a phone, **When** they tap the menu button,
   **Then** a navigation panel opens with anchor links to each section; tapping a
   link scrolls to that section and closes the panel.
4. **Given** the visitor wants to make contact, **When** they tap the phone
   number or the email, **Then** the device opens the dialer / mail client
   (`tel:` / `mailto:`).
5. **Given** any band of the page, **When** the visitor looks at it, **Then** the
   background is dark — the page never switches to a white or cream surface —
   and the single lime contact band is the brightest element on the page.

---

### User Story 2 - Owner compares Designs 1, 2 and 3 (Priority: P1)

The owner wants to look at all three finished designs and decide which one to
keep.

**Why this priority**: The entire five-design deliverable exists so the owner can
choose. A Design 3 that modified Design 1 or Design 2 would destroy the
comparison and violate the project's purpose.

**Independent Test**: Build the site; open `/` — Design 1 renders exactly as
before; open `/design-2` — Design 2 renders exactly as before; open `/design-3` —
Design 3 renders. All three work in the same build.

**Acceptance Scenarios**:

1. **Given** Design 3 is implemented, **When** the owner opens `/`, **Then**
   Design 1 ("Blueprint Tehnic") renders unchanged.
2. **Given** Design 3 is implemented, **When** the owner opens `/design-2`,
   **Then** Design 2 ("Atelier Cald") renders unchanged.
3. **Given** Design 3 is implemented, **When** the owner opens `/design-3`,
   **Then** Design 3 ("Curent Premium") renders.
4. **Given** the owner wants to switch between designs, **When** they open
   `/designs`, **Then** all three finished designs are listed with a short label
   and a link, and the page remains trivially extendable for Designs 4–5.
5. **Given** Design 3 is implemented, **When** `git status` / a diff is
   inspected, **Then** no Design 1 or Design 2 component, layout, page or content
   file has been modified — the only changes to pre-existing files are the
   additive `d3-*` tokens/utilities in the shared stylesheet and the additive
   one-entry addition to `/designs`.

---

### User Story 3 - Same content, no data-model churn (Priority: P1)

The owner adds a fourth service, a second project with a photo and a second
testimonial — and all three designs pick them up.

**Why this priority**: Content-as-data is a non-negotiable constitution
principle; duplicating the content model per design would break it.

**Independent Test**: Add one `.md` file to each of the three collections,
rebuild — the new items appear on Designs 1, 2 **and** 3, with zero edits to any
`.astro`, `.ts` or config file.

**Acceptance Scenarios**:

1. **Given** a new file in `src/content/services/`, **When** the site is rebuilt,
   **Then** a new tile appears in Design 3's servicii bento grid, ordered by
   `order`, and the grid composition still fills its rows sensibly.
2. **Given** a second file in `src/content/projects/`, **When** the site is
   rebuilt, **Then** Design 3's proiecte section renders the flagship project
   plus the additional project without leaving an empty or broken slot.
3. **Given** a second file in `src/content/testimonials/`, **When** the site is
   rebuilt, **Then** Design 3's testimonial section renders both quotes without
   breaking the spotlight composition.
4. **Given** a content file is missing a required frontmatter field, **When**
   `npm run build` runs, **Then** the build fails with a clear message naming the
   file and the field.

---

### User Story 4 - Visitor confirms coverage and credibility honestly (Priority: P2)

A homeowner in Botoșani confirms the team travels to their county; a skeptical
visitor looks for proof of competence and standards compliance — and finds
honest proof (one real, deeply documented project) rather than inflated claims.

**Why this priority**: Converts interest into a call, and protects the brand from
the credibility damage of fabricated proof. Secondary to the page existing and
coexisting with the other designs.

**Independent Test**: The zone deservite section names Neamț, Suceava, Iași and
Botoșani plus nationwide availability; the despre echipă band states the passive
house / Home Assistant story and I7 compliance; no section states a client count,
a project count greater than what the collection contains, years in business, or
a certification.

**Acceptance Scenarios**:

1. **Given** the zone deservite section, **When** the visitor reads it, **Then**
   the four primary counties are listed and a line states that projects are taken
   on in the rest of the country as well.
2. **Given** the despre echipă band, **When** the visitor reads it, **Then** the
   founder's own passive house wired as a smart home is described and I7
   compliance is stated in professional language.
3. **Given** the proiecte section with exactly one entry, **When** the visitor
   reads it, **Then** it reads as an intentional flagship case study ("proiectul
   nostru de referință"), not as a grid missing two cards.
4. **Given** the whole page, **When** it is read end to end, **Then** it contains
   no invented client name, no invented number presented as fact, no invented
   certification and no invented award.

---

### Edge Cases

- **A collection is empty**: the corresponding section is skipped entirely rather
  than rendering a heading over a blank band.
- **Exactly one project (today's reality)**: the proiecte section renders as a
  single full-width immersive case-study panel with honest singular copy — this
  is the *default, designed* state, not a degraded one.
- **Exactly one testimonial (today's reality)**: the testimonial section renders
  as a single centered spotlight quote — again the designed default.
- **More than one project / testimonial later**: the flagship panel keeps the
  first entry and the remaining entries render as smaller soft-square tiles below
  it; the spotlight becomes a two-up/three-up quote grid. No layout breaks and no
  code change beyond what the components already handle.
- **A project has no image**: a design-consistent dark fallback surface (graphite
  gradient + lime glow + project title in the display face) is rendered; the
  panel's radius and aspect ratio are preserved.
- **Odd number of service tiles**: the bento grid must not leave a lone stranded
  tile — the composition rule (e.g. featured tile spans two columns) must absorb
  odd counts at every breakpoint.
- **Very long service title or testimonial text**: text wraps; tiles keep their
  alignment; no overflow past the container; the oversized spotlight quote
  reduces gracefully rather than overflowing.
- **Diacritics**: all Romanian diacritics (ă â î ș ț) render correctly in the
  display face at large sizes; `lang="ro"`, UTF-8 without BOM.
- **Webfont fails to load**: system sans fallback keeps the layout intact — the
  design must not depend on the webfont.
- **JavaScript disabled**: all content is visible; the mobile menu degrades to
  visible/stacked navigation, never a dead button hiding the nav.
- **Dark-surface contrast**: muted secondary text must stay legible on the
  graphite surfaces; lime text must never be placed on a lime fill.
- **Design 1 / Design 2 regression**: any change that alters either shipped
  design's rendered output is a defect, even if Design 3 looks better for it.

## Requirements *(mandatory)*

### Functional Requirements

**Coexistence with Designs 1 and 2**

- **FR-001**: Design 3 MUST be served from its own route, distinct from `/` and
  `/design-2`, in the same static build as the other designs.
- **FR-002**: Design 3 MUST NOT modify, move or delete any existing Design 1 or
  Design 2 component, layout, page or content file. Changes to shared files (the
  global stylesheet, the `/designs` index) MUST be purely additive and MUST NOT
  change any token or entry the other designs consume.
- **FR-003**: Design 3's components MUST live in their own namespaced folder so
  the three designs' component sets never collide by filename.
- **FR-004**: The `/designs` index page MUST additionally list Design 3 with a
  short label and a link, added as a single new entry, leaving the existing two
  entries and the page's neutral styling untouched.

**Page structure**

- **FR-005**: The Design 3 page MUST contain, in this order: header/nav, hero,
  servicii, despre echipă (credibilitate), proiecte anterioare, testimoniale,
  zone deservite, contact, footer.
- **FR-006**: The header MUST be sticky and MUST include responsive navigation
  with anchor links to the sections plus a primary CTA ("Cere ofertă"), styled in
  the Design 3 identity (soft-square lime button on a dark, translucent header
  surface).
- **FR-007**: The hero MUST state the dual value proposition — instalații
  electrice pentru case noi + integrare smart home cu Home Assistant — with a
  primary CTA (contact/ofertă) and a secondary CTA (anchor to the project),
  laid out as a **centered** composition with an oversized display headline, a
  lime radial glow, and a compact capability "spec strip" beneath (NOT a
  two-column split, NOT a photo banner).
- **FR-008**: The servicii section MUST render one tile per entry in the services
  collection inside a bento grid of unequal tiles, visually distinguishing
  `clasic` from `smart` entries via the entry's `category` field using Design 3's
  own accent pair (lime vs cyan micro-labels), and MUST give the `featured` entry
  the larger tile.
- **FR-009**: The despre echipă section MUST present the founder's passive-house
  / self-installed smart-home story and MUST state compliance with the Romanian
  I7 electrical installation standard, supported only by honest, verifiable fact
  tiles (no invented statistics).
- **FR-010**: The proiecte anterioare section MUST render every entry of the
  projects collection, with the first entry as a full-width immersive flagship
  case-study panel showing image, title, location, year, summary and tags, and
  any further entries as smaller soft-square tiles below it. When an entry
  carries the optional `video` field, the flagship panel MUST render it through
  the shared `VideoEmbed` component, styled to Design 3's surface language.
- **FR-011**: The testimoniale section MUST render every entry of the
  testimonials collection, with a single entry presented as a centered oversized
  spotlight quote with author name, locality and role.
- **FR-012**: The zone deservite section MUST name Neamț, Suceava, Iași and
  Botoșani as primary coverage (highlighted chips) and state nationwide
  availability.
- **FR-013**: The contact section MUST show the phone as a `tel:` link, the email
  as a `mailto:` link, plus coverage/working info, rendered as the page's single
  lime-filled band. No fake form and no non-functional submit button.
- **FR-014**: The footer MUST include the business name, a short I7-compliance
  line, contact essentials and the current year, on the page's deepest surface.

**Content-as-data & honesty**

- **FR-015**: Design 3 MUST reuse the existing collections
  (`src/content/services|projects|testimonials`) and the existing site-data file
  **without changing their schemas**. If a purely presentational need arises, it
  MUST be solved in the component, not by adding a required frontmatter field.
- **FR-016**: Design 3 components MUST NOT hardcode any service, project or
  testimonial; they render whatever the collections contain, ordered by `order`
  (services, testimonials) and `year` desc then `order` (projects).
- **FR-017**: No new content files are created and no existing content file is
  edited. Narrative copy inside hero/despre/contact/footer is written fresh in
  Design 3's confident, product-brand voice.
- **FR-018**: No user-visible string may claim a project, client, testimonial,
  certification, award, team size, years of experience or completed-works count
  that is not backed by the content collections or `src/data/site.ts`. Singular
  content MUST be framed as intentional (flagship / reference project), never
  apologetically and never inflated.

**Design & responsiveness**

- **FR-019**: Design 3's visual tokens (colors, fonts, radii, glows) MUST be
  declared centrally in the shared Tailwind theme under a Design-3-specific
  namespace and reused; no ad-hoc hex color, one-off font size or arbitrary
  spacing value in any Design 3 component.
- **FR-020**: The page MUST be responsive and correct at 375px, 768px and 1440px
  with no horizontal overflow; the bento grid collapses to a single column on
  mobile without stranded tiles.
- **FR-021**: The design MUST follow the "Curent Premium" identity from the
  Overview: fully dark page, obsidian/graphite surfaces, electric-lime primary
  with a sparing cyan secondary, uniform medium radii, luminosity-based depth,
  geometric display + grotesque body, bento layout, glow texture — and MUST NOT
  use navy/blueprint blue/amber, cream/sand/terracotta/forest green, monospace,
  serif, pill buttons, sharp 90° cards, hairline-border depth, blueprint grid or
  warm grain.
- **FR-022**: All images MUST have Romanian alt text; the page MUST have exactly
  one `h1` with section `h2`s.
- **FR-023**: No UI kit / component-library dependency may be added; Tailwind
  utilities and local Astro components only. No client-side framework; only the
  minimal vanilla JS needed for the mobile menu.

### Key Entities

Unchanged from Designs 1 and 2 — the schemas in `src/content.config.ts` are
reused as-is:

- **Service (`src/content/services/*.md`)**: `title`, `category`
  (`clasic` | `smart`), `summary`, `icon?`, `order`, `featured?`; body = longer
  Romanian description.
- **Project (`src/content/projects/*.md`)**: `title`, `location`, `year`,
  `summary`, `image?`, `imageAlt?`, `tags[]`, `order`; body = optional case study.
- **Testimonial (`src/content/testimonials/*.md`)**: `author`, `location`,
  `role?`, `rating?`, `order`; body = the Romanian quote.
- **Site data (`src/data/site.ts`)**: business name, tagline, phone, email,
  counties, coverage line, working hours.

No new entity and no schema change is introduced by Design 3.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run build` completes with exit code 0 and produces a static
  `dist/` containing Design 1's `index.html`, Design 2's page HTML and Design 3's
  page HTML.
- **SC-002**: All nine required bands are present in Design 3's rendered HTML.
- **SC-003**: At 375px, 768px and 1440px the Design 3 page shows no horizontal
  scrollbar, no clipped or overlapping text and no stranded bento tile.
- **SC-004**: Design 1's and Design 2's rendered output is unchanged: no file
  under `src/components/*.astro` (Design 1's flat set), `src/components/design2/`,
  `src/pages/index.astro`, `src/pages/design-2.astro`,
  `src/layouts/BaseLayout.astro`, `src/layouts/Design2Layout.astro`,
  `src/content/**`, `src/content.config.ts` or `src/data/site.ts` is modified by
  this feature.
- **SC-005**: Adding one `.md` file to each of the three collections and
  rebuilding causes the new items to appear on **all three** designs with zero
  edits to any `.astro`, `.ts`, `.json` or config file.
- **SC-006**: 100% of user-visible strings are Romanian with correct diacritics;
  zero lorem ipsum, zero English placeholder text, zero "Coming soon".
- **SC-007**: Design 3's page explicitly mentions I7 and Home Assistant, and
  names Neamț, Suceava, Iași and Botoșani plus nationwide availability.
- **SC-008**: Zero occurrences of Design 1's tokens (`blueprint`, `accent-500`,
  `ink-900`, `font-mono`, `bg-blueprint-grid`, `hairline`, `rounded-none`) and
  zero occurrences of Design 2's tokens (`d2-`, `font-d2-*`, `rounded-full` on
  buttons, `.d2-noise`, `.d2-glow`) in any Design 3 component — verified by grep.
- **SC-009**: Zero UI-kit dependencies added to `package.json`; the dependency
  list is unchanged except (optionally) a font source.
- **SC-010**: Placing screenshots of Designs 1, 2 and 3 side by side, a
  non-designer can tell they are three different studios' work (different
  palette, different corner language, different type pairing, different section
  rhythm, different light/dark character).
- **SC-011**: A reader of the finished Design 3 page can identify exactly one
  project and exactly one testimonial, and finds no numeric or credential claim
  that is not backed by the content collections or `src/data/site.ts`.

## Assumptions

Resolved without blocking (per constitution: assume, record, continue):

- **A-001**: Design 3 lives at `/design-3` (a third Astro page), following the
  coexistence pattern established by Design 2. The final chosen design will later
  be promoted to `/`; that promotion is out of scope here.
- **A-002**: The `/designs` index page gains one entry for Design 3. It stays a
  plain, identity-neutral utility page so it does not bias the comparison.
- **A-003**: The same real content, business name, phone (`+40 700 000 000`) and
  email are reused; nothing in `src/data/site.ts` changes.
- **A-004**: The existing project placeholder SVG (drawn in Design 1's blueprint
  palette) is reused as-is rather than redrawn. Design 3 may render it inside a
  dark soft-square frame with a CSS-only dark/lime overlay treatment — no asset
  edits, no impact on Designs 1 or 2.
- **A-005**: Single page for this design; no separate servicii/contact subpages.
- **A-006**: No contact form backend; contact by `tel:` / `mailto:` only.
- **A-007**: Fonts come from the same standard web-font mechanism the other
  designs already use, with a full system fallback stack; no paid fonts. Concrete
  faces are chosen in plan.md.
- **A-008**: No analytics, cookie banner, GDPR or legal pages.
- **A-009**: Smoke testing is a separate agent's job; this feature's own
  verification is a successful build plus a manual responsive visual check and
  the impeccable-design gate.
- **A-010**: "Dark premium" is chosen over the other candidate identities
  (Scandinavian-minimal light, hazard-stripe industrial) because Designs 1 and 2
  are both light-background designs — a fully dark page is the single largest
  perceptual jump available, and a lime/cyan accent pair is the furthest point
  from both amber and terracotta. The remaining candidates stay available for
  Designs 4–5.
- **A-011**: The `featured` service flag (already in the schema, currently used by
  Design 1) drives which bento tile is enlarged. If no service is flagged
  `featured`, the first service by `order` takes the large tile.
- **A-012**: In-flight work in the working tree adds two **optional** project
  fields (`video`, `videoTitle`) and a design-neutral
  `src/components/shared/VideoEmbed.astro` used by Designs 1 and 2. Design 3
  treats these as part of the existing content model: it introduces no schema
  change of its own, reuses the shared embed component (the single permitted
  cross-folder import, because `shared/` belongs to no design), and renders the
  video only when a project provides one. If that work is not present when
  Design 3 is implemented, the video branch is simply omitted — nothing else in
  this spec depends on it.

## Out of Scope

- Designs 4–5 (separate features).
- Changing, fixing or restyling Designs 1 or 2.
- Changing the content collections' schemas or the site-data shape.
- Adding, editing or inventing content (projects, testimonials, services).
- Any backend, CMS, database, authentication or form-submission service.
- Automated tests, performance budgets, SEO campaigns, accessibility audits
  beyond semantic HTML, alt text and sane dark-mode contrast.
- Real photography, legal/GDPR pages, multi-language support.
- Promoting the chosen design to `/` and deleting the others.
