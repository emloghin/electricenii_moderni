# Feature Specification: Design 1 — "Blueprint Tehnic" Homepage

**Feature Branch**: `001-design-1-homepage`

**Created**: 2026-09-06

**Status**: Draft

**Input**: User description: "Homepage design 1 of 5 for Romanian electrician/smart-home team presentation site"

## Overview

First of five distinct homepage designs for the presentation website of a Romanian
team of electricians. The team does classic house electrical installations
(instalații electrice pentru case noi, conform normativ I7) and also installs
smart-home systems integrated with Home Assistant. The founder built his own
passive house and wired it as a smart home himself — this hands-on credibility is
a core message.

This feature delivers a complete, buildable, responsive, Romanian-language
single-page homepage plus the Markdown content collections that feed it. The
owner will later pick one of five designs and replace the sample content.

**Visual identity for THIS design — "Design 1: Blueprint Tehnic"**
Technical / blueprint-inspired. Deep navy-to-blueprint-blue base, crisp white
surfaces, a single electric-amber accent for calls to action. Sharp corners and
thin 1px hairline borders instead of soft shadows. A subtle blueprint grid
pattern in the hero background. Geometric sans-serif headings, high-contrast
uppercase eyebrow labels, generous whitespace, strict 12-column grid alignment.
Content blocks read like clean technical drawings: numbered sections, monospace
section indices (01 / 02 / 03), thin rules separating bands. Designs 2–5 must be
visually distinct from this (e.g. warm editorial, dark premium, soft rounded
friendly, bold brutalist) — that distinction is tracked in their own specs.

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Homeowner evaluates the team in one scroll (Priority: P1)

A homeowner in Neamț is finishing a new house and needs an electrician. They land
on the homepage from a phone, and within one continuous scroll they understand
what the team does (classic electrical + smart home), that the work is done to I7
standards, who the team is, what they have built before, what other clients say,
whether the team serves their county, and how to make contact.

**Why this priority**: This is the entire product. Without it there is no site.

**Independent Test**: Run `npm run dev`, open the homepage at 375px and 1440px
width, scroll top to bottom. All sections render with real Romanian content, no
layout overflow, no empty blocks, and the contact details are reachable.

**Acceptance Scenarios**:

1. **Given** the homepage is open on a 375px-wide viewport, **When** the visitor
   scrolls from top to bottom, **Then** hero, servicii, despre echipă, proiecte,
   testimoniale, zone deservite, contact and footer all render in that order with
   no horizontal scrollbar.
2. **Given** the homepage is open on a 1440px-wide viewport, **When** the visitor
   looks at any section, **Then** content is constrained to a centered max-width
   container with consistent horizontal padding and consistent vertical rhythm.
3. **Given** the visitor is on a phone, **When** they tap the menu button in the
   header, **Then** a navigation panel opens with anchor links to each section and
   tapping a link scrolls to that section and closes the panel.
4. **Given** the visitor wants to make contact, **When** they tap the phone number
   or the email address, **Then** the device opens the dialer / mail client
   (`tel:` and `mailto:` links).

---

### User Story 2 - Owner adds content without touching code (Priority: P1)

The (non-developer) owner wants to add a fourth service, a new completed project
with a photo, and a new testimonial.

**Why this priority**: Explicit mandatory requirement; the site is useless to the
owner if adding a project needs a developer.

**Independent Test**: Copy an existing `.md` file in `src/content/projects/`,
change its frontmatter and body, drop an image into the images folder, run
`npm run build` — the new project appears on the homepage without any `.astro`,
`.ts` or config file being edited.

**Acceptance Scenarios**:

1. **Given** a new file `src/content/services/servicii-noi.md` with valid
   frontmatter, **When** the site is rebuilt, **Then** a new service card appears
   in the servicii section, ordered by its `order` field.
2. **Given** a new file in `src/content/testimonials/`, **When** the site is
   rebuilt, **Then** a new testimonial appears in the testimoniale section.
3. **Given** a new project `.md` referencing an image that exists, **When** the
   site is rebuilt, **Then** the project appears in the proiecte grid with that
   image and its alt text.
4. **Given** a content file has a missing required frontmatter field, **When**
   `npm run build` runs, **Then** the build fails with a clear message naming the
   file and the field (content collection schema validation).

---

### User Story 3 - Visitor confirms coverage and credibility (Priority: P2)

A homeowner in Botoșani wants to confirm the team travels to their county, and a
more skeptical visitor wants proof the team is competent and standards-compliant.

**Why this priority**: Converts interest into a call; differentiates from generic
competitors. Still secondary to the page existing and being editable.

**Independent Test**: View the zone deservite and despre echipă sections; they
name Neamț, Suceava, Iași, Botoșani explicitly plus nationwide availability, and
state the founder's passive-house/Home Assistant story and I7 compliance.

**Acceptance Scenarios**:

1. **Given** the zone deservite section, **When** the visitor reads it, **Then**
   Neamț, Suceava, Iași and Botoșani are listed as primary counties and a line
   states that projects are undertaken in the rest of the country as well.
2. **Given** the despre echipă section, **When** the visitor reads it, **Then**
   the founder's own passive house wired as a smart home is described, and I7
   compliance is stated in professional language.

---

### Edge Cases

- **A collection is empty** (owner deletes all testimonials): the section is
  skipped entirely rather than rendering an empty heading and a blank band.
- **A project has no image**: a design-consistent fallback block (blueprint grid
  panel with the project title) is rendered; layout must not collapse.
- **Very long service title or testimonial text**: text wraps; cards in a row keep
  equal height; no overflow past the container.
- **Only one project or one testimonial exists**: grid/row layout still looks
  intentional (items do not stretch full-width awkwardly).
- **Diacritics**: all Romanian diacritics (ă â î ș ț) render correctly; the page
  declares `lang="ro"` and UTF-8.
- **JavaScript disabled**: all content is visible and readable; only the mobile
  menu toggle degrades, so it must degrade to visible navigation or an anchor
  link, not a dead button hiding the nav.

## Requirements *(mandatory)*

### Functional Requirements

**Page structure**

- **FR-001**: The site MUST serve a single Romanian-language homepage at `/` as a
  static build with no server runtime.
- **FR-002**: The homepage MUST contain, in this order: header/nav, hero, servicii,
  despre echipă (credibilitate), proiecte anterioare, testimoniale, zone deservite,
  contact, footer.
- **FR-003**: The header MUST be sticky on desktop and MUST include a responsive
  navigation with anchor links to the sections plus a primary CTA ("Cere ofertă").
- **FR-004**: The hero MUST state the dual value proposition — instalații electrice
  pentru case noi + integrare smart home cu Home Assistant — with a primary CTA
  (contact/ofertă) and a secondary CTA (anchor to proiecte).
- **FR-005**: The servicii section MUST render one card per entry in the services
  collection, visually distinguishing "clasic" services from "smart" services via
  the entry's `category` field, and MUST include at least one classic and one
  smart/Home Assistant service in sample content.
- **FR-006**: The despre echipă section MUST present the founder's passive-house /
  self-installed smart-home story and MUST state compliance with the Romanian I7
  electrical installation standard.
- **FR-007**: The proiecte anterioare section MUST render a card per entry in the
  projects collection, showing image, title, location, year and a short summary.
- **FR-008**: The testimoniale section MUST render a quote per entry in the
  testimonials collection with author name and locality.
- **FR-009**: The zone deservite section MUST name Neamț, Suceava, Iași and
  Botoșani as primary coverage and state nationwide availability.
- **FR-010**: The contact section MUST show a phone number as a `tel:` link, an
  email as a `mailto:` link, and service-area/working info. No form submission
  backend is used; if a form is shown at all it MUST be a `mailto:`-based or
  static form, never a fake submit.
- **FR-011**: The footer MUST include the business name, a short I7-compliance
  line, contact essentials and the current year.

**Content-as-data**

- **FR-012**: Editable content MUST live in Astro content collections:
  `src/content/services/*.md`, `src/content/projects/*.md`,
  `src/content/testimonials/*.md`.
- **FR-013**: Site-wide values (business name, tagline, phone, email, counties,
  social links) MUST live in a single editable data file, not scattered in
  components.
- **FR-014**: Each collection MUST have a declared schema so invalid content fails
  the build with a readable error.
- **FR-015**: Components MUST NOT hardcode any service, project or testimonial;
  they render whatever the collections contain, ordered by an explicit `order`
  (services) or `date`/`year` (projects) field.
- **FR-016**: Sample content MUST ship in Romanian: at least 3 services (min. 1
  classic, min. 1 smart), at least 3 projects, at least 2 testimonials.
- **FR-017**: A short `README`/content guide in Romanian MUST explain how to add a
  service, a project (with image) and a testimonial.

**Design & responsiveness**

- **FR-018**: The visual system (colors, fonts, spacing scale) MUST be defined
  centrally in the Tailwind theme and reused; no ad-hoc hex colors in components.
- **FR-019**: The page MUST be responsive and correct at 375px, 768px and 1440px
  with no horizontal overflow.
- **FR-020**: The design MUST follow the "Blueprint Tehnic" identity described in
  the Overview (navy/blueprint blue + white + amber accent, hairline borders,
  sharp corners, blueprint grid motif, monospace section indices).
- **FR-021**: All images MUST have Romanian alt text; headings MUST follow a
  single `h1` + section `h2` semantic structure.
- **FR-022**: No UI kit / component-library dependency may be added; Tailwind
  utilities and local Astro components only.

### Key Entities

- **Service (`src/content/services/*.md`)**: one offered service.
  Frontmatter: `title`, `category` (`clasic` | `smart`), `summary`, `icon`
  (optional keyword), `order` (number), `featured` (boolean, optional).
  Body: optional longer Romanian description / bullet list.
- **Project (`src/content/projects/*.md`)**: one completed job.
  Frontmatter: `title`, `location` (e.g. "Piatra Neamț, Neamț"), `year` (number),
  `summary`, `image` (path), `imageAlt`, `tags` (array, e.g. `["I7","Home Assistant"]`),
  `order` or `date`. Body: optional case-study text.
- **Testimonial (`src/content/testimonials/*.md`)**: one client quote.
  Frontmatter: `author`, `location`, `role` (optional), `rating` (optional 1–5),
  `order`. Body: the quote text in Romanian.
- **Site data (single file)**: business name, tagline, phone, email, primary
  counties list, coverage line, optional social links.

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: `npm run build` completes with exit code 0 and produces a static
  `dist/` containing `index.html`.
- **SC-002**: `npm run dev` (or `preview`) serves the homepage and all nine
  required sections are present in the rendered HTML.
- **SC-003**: At 375px, 768px and 1440px the page shows no horizontal scrollbar
  and no clipped or overlapping text.
- **SC-004**: Adding one new `.md` file to each of the three collections and
  rebuilding causes exactly three new items to appear on the page, with zero edits
  to any `.astro`, `.ts`, `.json` or config file.
- **SC-005**: 100% of user-visible strings are Romanian with correct diacritics;
  zero lorem ipsum, zero English placeholder text, zero "Coming soon" blocks.
- **SC-006**: The homepage explicitly mentions I7 compliance and Home Assistant.
- **SC-007**: Neamț, Suceava, Iași and Botoșani each appear in the zone deservite
  section, alongside a nationwide-availability statement.
- **SC-008**: Zero UI-kit dependencies in `package.json` beyond Astro, Tailwind
  and their official integrations.

## Assumptions

Resolved without blocking (per constitution: assume, record, continue):

- **A-001**: Business name, real phone number, email and any real photos are not
  yet supplied. Sample placeholders are used: name "Electricieni Moderni", phone
  `+40 700 000 000`, email `contact@electricienimoderni.ro`. These live in the
  single site-data file so the owner can replace them in one place.
- **A-002**: Project photos are not yet supplied. Locally generated
  design-consistent placeholder images (or blueprint-grid fallback panels) are
  used, stored in the images folder so the owner replaces the files by name.
- **A-003**: Testimonials are illustrative sample content with first-name-plus-
  initial authors, clearly replaceable; they are not presented as verified reviews.
- **A-004**: Single page only for this design. Separate pages (servicii detail,
  blog, contact page) are out of scope for Design 1.
- **A-005**: No contact form backend. Contact is by `tel:` / `mailto:`.
- **A-006**: No i18n framework; Romanian is the only language, hardcoded `lang="ro"`.
- **A-007**: No analytics, cookie banner, GDPR page or legal pages in Design 1.
- **A-008**: Deployment target is unspecified; a plain static `dist/` is the
  deliverable and no hosting configuration is included.
- **A-009**: Fonts are loaded from a self-hosted or standard web-font source with
  a safe system fallback stack; no paid fonts.
- **A-010**: Smoke testing is performed by a separate agent; this feature's own
  verification is limited to a successful build and a manual visual check.

## Out of Scope

- Designs 2–5 (separate features, started only after Design 1 ships).
- Any backend, CMS, database, authentication or form-submission service.
- Automated tests, performance budgets, SEO campaigns, accessibility audits
  beyond semantic HTML and alt text.
- Real client content, real photography, legal/GDPR pages, multi-language support.
