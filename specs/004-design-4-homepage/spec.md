# Feature Specification: Design 4 — "Lumină Nordică" Homepage

**Feature Branch**: `004-design-4-homepage`
**Created**: 2026-09-07
**Status**: Ready for planning
**Input**: Add a fourth, visually distinct homepage design at route `/design-4`, without touching Designs 1, 2 or 3, reusing the same Markdown content layer.

## Overview

The site must present five clearly different homepage designs so the owner can
pick one. Designs 1 ("Blueprint Tehnic", `/`), 2 ("Atelier Cald", `/design-2`)
and 3 ("Curent Premium", `/design-3`) already exist. This feature adds **Design 4
at `/design-4`**, rendering the *same* Romanian content (services, the single
real project, the single real testimonial, coverage counties, contact details)
in a fourth, unmistakably different visual identity.

Nothing about Designs 1, 2 or 3 changes. No content file changes. No schema
changes. This is an **additive** feature.

## Visual concept (normative)

**Name**: "Lumină Nordică" — Scandinavian / Swiss editorial minimalism.
**Feeling**: calm, bright, uncluttered, quietly expensive. The visual argument is
*"we are precise, unhurried and trustworthy — look how much room we give every
statement."* Where Design 1 argues with technical density, Design 2 with warmth
and Design 3 with dark premium energy, Design 4 argues with **restraint and
negative space**.

### Palette (light, near-monochrome + one muted accent)

| Role | Value | Use |
|------|-------|-----|
| Page base — `snow` | `#FCFCFA` | Whole page background |
| Alternate band — `paper` | `#F1F2ED` | Every other section band |
| Surface line/tint — `mist` | `#E4E6DF` | Hairline rules, image plates, ghost-button borders |
| Accent — `sage` | `#7C9885` | Icon strokes, eyebrow labels, small rules, tints, active states |
| Accent deep — `sage-deep` | `#4F6B58` | Accent text on light, link hover |
| Primary ink — `ink` | `#1C201D` | Body text **and** the filled primary CTA |
| Muted text — `slate` | `#5F665F` | Secondary copy, captions |
| Rule colour — `line` | `rgba(28, 32, 29, 0.10)` | Full-bleed separators |

The *dominant impression* is near-monochrome (ink on snow) with sage as a single
quiet accent. Deliberately **not**: navy/blueprint blue + amber (Design 1),
cream/terracotta/forest green (Design 2), obsidian + electric lime/cyan
(Design 3). Sage is a pale, desaturated, cool green used mostly as a tint and a
stroke colour — never as a large saturated panel, which is what keeps it distinct
from Design 2's deep forest green.

### Type

- **Display**: **Outfit**, used at *light weights* (300/400) and large sizes with
  slightly tight tracking. Airy geometric sans.
- **Body**: **DM Sans**, 400/500.
- **No monospace** (Design 1 owns that), **no serif** (Design 2 owns that), and
  neither Sora nor Manrope (Design 3).
- Section eyebrows are small-caps-feel: `text-xs`, uppercase, `tracking-[0.18em]`,
  sage — but **never numbered** (numbered indices are Design 1's signature).
- Headings are *light*, not bold. Emphasis comes from size and space, not weight.

### Shape language

- **No cards.** This is the strongest differentiator. Services, coverage and
  contact information sit directly on the page, separated by **full-bleed 1px
  hairline rules** and whitespace — not inside bordered boxes (Design 1), rounded
  cards (Design 2) or bento tiles (Design 3).
- The only rounded shapes are **media plates**: images/video sit in a `20px`
  radius `mist` plate. One radius token for media, one small `10px` radius for
  buttons and inputs. **No pills, no 999px radii** (Design 2 owns pills).
- **No shadows anywhere.** Depth is created by band contrast (`snow` vs `paper`)
  and by whitespace — not hairline-boxes (D1), not soft warm shadows (D2), not
  luminosity/glow (D3).
- Iconography: **thin geometric line art**, 1.5px stroke, sage, drawn inline as
  SVG. No filled icon chips, no emoji.

### Layout pattern

**Two-column editorial index grid.** On desktop, each section is a 12-column
grid: columns 1–3 hold a left "label column" (eyebrow + short section title),
columns 5–12 hold the content. Sections are separated by full-bleed hairline
rules. On mobile the label column stacks above the content.

- Vertical rhythm: `py-28 md:py-40` — a fourth, distinctly roomier spacing scale.
- Services render as **hairline-separated rows** (title + summary + thin line
  icon + category tag as plain sage text), not as a card grid.
- Coverage counties render as a simple typographic list/row of names separated by
  thin rules — not chips, not a coloured panel.
- Contact is a calm final section on the `paper` band with the single filled ink
  CTA — the only solid-filled element on the whole page.

### N = 1 is designed as intentional (critical)

Exactly one real project and one real testimonial exist (constitution Principle
V). Design 4 must be built so this reads as a deliberate editorial choice, not a
sparse grid:

- **Project** → a full-section, two-column **case study**: a large media plate on
  one side; on the other the title, location, year, summary, tag list and the
  project's own body content rendered as short "ce am făcut" lines. It occupies a
  whole section with a `Proiect de referință` eyebrow. **A grid of one card is
  forbidden.**
- **Testimonial** → a large, quiet **pull-quote** set in the display font at
  ~`text-3xl md:text-4xl` light weight, in the content column, marked by a thin
  vertical sage rule, with attribution beneath. No card, no avatar placeholder,
  no carousel, no "1/1" counter, no star row unless the entry actually has a
  rating.
- Both must **degrade upward**: additional projects render as hairline-separated
  list rows beneath the flagship; additional testimonials stack as further quote
  blocks separated by rules. Nothing in the markup may assume exactly one entry.

## User Scenarios & Testing

### User Story 1 — A prospective customer understands the offer in one scroll (P1)

A homeowner near Piatra Neamț lands on `/design-4` on a phone and, in a single
scroll, learns who the team is, that they do I7-compliant electrical
installations in new houses plus Home Assistant smart-home integration, sees the
reference project, reads the founder's words, sees which counties are covered,
and finds a phone number / e-mail.

**Acceptance**
1. Given a visitor on `/design-4`, when the page loads, then hero, servicii,
   despre, proiect de referință, testimonial, zone deservite, contact and footer
   are all present in that order.
2. Given a visitor at 375px width, when they scroll, then no element overflows
   horizontally and all text stays legible.
3. Given a visitor, when they look for how to make contact, then the filled ink
   CTA is the single most prominent interactive element on the page.
4. Given a visitor, when they reach the contact section, then phone and e-mail
   are real links (`tel:` / `mailto:`) sourced from `src/data/site.ts`.

### User Story 2 — The owner compares four designs (P1)

The owner opens `/designs` and moves between `/`, `/design-2`, `/design-3` and
`/design-4` to choose one.

**Acceptance**
1. Given the owner on `/designs`, when the page loads, then four entries are
   listed, the fourth linking to `/design-4`.
2. Given the owner visits `/`, `/design-2` and `/design-3` after this feature
   ships, then those pages render exactly as before (no visual change).
3. Given the owner views all four pages, then Design 4 shares no palette, no type
   pairing, no shape language and no layout rhythm with the other three.

### User Story 3 — Same content, no data-model churn (P1)

**Acceptance**
1. Given a new `.md` file added to `src/content/services/`, when the site is
   rebuilt, then it appears on all four designs with no code change.
2. Given this feature ships, then `src/content.config.ts`, `src/content/**` and
   `src/data/site.ts` are byte-identical to their pre-feature state.

### User Story 4 — Coverage and honest credibility (P2)

**Acceptance**
1. Given a visitor in Suceava, when they reach "Zone deservite", then all four
   counties from `site.counties` are listed plus the nationwide coverage line.
2. Given a visitor, when they read the whole page, then every claim is backed by
   real content — no invented client counts, years of experience, project
   numbers, certifications, awards or ratings.

## Requirements

### Coexistence & immutability

- **FR-001**: Design 4 MUST be served at `/design-4` from a new
  `src/pages/design-4.astro`.
- **FR-002**: The feature MUST NOT modify any Design 1, Design 2 or Design 3
  file (pages, layouts, `src/components/*.astro`, `src/components/design2/**`,
  `src/components/design3/**`).
- **FR-003**: The feature MUST NOT modify `src/content.config.ts`,
  `src/content/**`, `src/data/site.ts` or any file in `src/assets/`.
- **FR-004**: The only pre-existing files that MAY change are
  `src/styles/global.css` (append `d4-*` tokens/utilities only) and
  `src/pages/designs.astro` (add exactly one entry to its `designs` array).
- **FR-005**: Design 4 components MUST NOT import from `src/components/*.astro`,
  `src/components/design2/**`, `src/components/design3/**`, `BaseLayout.astro`,
  `Design2Layout.astro` or `Design3Layout.astro`. The one permitted cross-design
  import is the design-neutral `src/components/shared/VideoEmbed.astro`.

### Structure & content

- **FR-006**: The page MUST include, in order: header/nav, hero, servicii,
  despre, proiect de referință, testimonial, zone deservite, contact, footer.
- **FR-007**: Servicii MUST render every entry of the `services` collection,
  ordered by `order`, showing title, summary and category, as hairline-separated
  rows (not cards).
- **FR-008**: The project section MUST render the `projects` collection ordered
  by `order`; the first entry renders as a full-section case study, any further
  entries as list rows.
- **FR-009**: The testimonial section MUST render the `testimonials` collection
  ordered by `order` as large pull-quotes; the first is the spotlight.
- **FR-010**: Zone deservite MUST render `site.counties` and `site.coverageLine`.
- **FR-011**: Contact MUST render `site.phone`, `site.email` and
  `site.workingHours` as real links, with one filled primary CTA.
- **FR-012**: The header MUST provide in-page anchor navigation and MUST collapse
  to a usable mobile menu at 375px.
- **FR-013**: All copy MUST be Romanian with correct diacritics; `<html lang="ro">`.
- **FR-014**: The page MUST reference the I7 normative and Home Assistant in at
  least the hero/servicii/despre area.

### Identity & quality

- **FR-015**: The content schema MUST remain unchanged; Design 4 consumes the
  collections read-only.
- **FR-016**: Design 4 tokens MUST be namespaced `d4-*` and appended to the
  single shared `@theme` block; no existing token may be edited or removed.
- **FR-017**: Design 4 MUST use no card containers for services, coverage or
  contact, no drop shadows, no pill radii, no monospace, no serif, and no
  numbered section indices.
- **FR-018**: Content honesty (constitution Principle V) — no invented projects,
  clients, testimonials, statistics, counts, years of experience, certifications
  or awards, not even as "sample" content.
- **FR-019**: The single project and single testimonial MUST be presented as
  intentional flagship/spotlight compositions, never as a one-item grid, and the
  markup MUST still render correctly with 2+ entries.
- **FR-020**: No new npm dependency. Fonts load via a `<link>`, matching the
  existing layouts' mechanism.
- **FR-021**: No client-side framework. At most one small inline script for the
  mobile menu; navigation must still be usable without JS.
- **FR-022**: `/designs` MUST list Design 4 as a fourth entry.
- **FR-023**: The page MUST render correctly at 375px, 768px and 1440px.

## Success Criteria

- **SC-001**: `npm run build` exits 0 with `/design-4` emitted.
- **SC-002**: `/design-4` shows all nine bands in order at all three widths with
  no horizontal overflow.
- **SC-003**: A first-time visitor can state what the team does and how to reach
  them within 30 seconds of landing.
- **SC-004**: `git diff` proves zero changes to Design 1, Design 2, Design 3,
  content, data and asset files.
- **SC-005**: Adding a throwaway service `.md` makes it appear on all four
  designs with no code edit; deleting it restores the previous output.
- **SC-006**: Every county in `site.counties` appears in Zone deservite.
- **SC-007**: Contact phone and e-mail are clickable and match `site.ts`.
- **SC-008**: A grep audit shows no `blueprint`/`accent-500`/`ink-900`/`hairline`
  /`font-mono`/`d2-`/`d3-` token usage inside `src/components/design4/**`,
  `src/layouts/Design4Layout.astro` or `src/pages/design-4.astro`.
- **SC-009**: The impeccable-design 7-point checklist passes with no ⚠️.
- **SC-010**: Viewing `/`, `/design-2`, `/design-3`, `/design-4` back to back,
  each reads as the work of a different studio.
- **SC-011**: The page shows exactly one project and one testimonial, each
  presented as a deliberate feature, with zero unbacked claims anywhere.

## Assumptions

- **A-001**: Design 4 is a fourth sibling design; the owner picks one later. No
  design is deleted as part of this feature.
- **A-002**: The coexistence pattern established by Designs 2 and 3 (page +
  component folder + token prefix) is reused verbatim; no refactoring.
- **A-003**: Fonts Outfit + DM Sans are loaded from Google Fonts via `<link>`,
  the same mechanism the three existing layouts use.
- **A-004**: The existing project SVG is reused as-is inside a `mist` media
  plate; no new asset is created or edited. A cool, low-opacity treatment may be
  applied with CSS only.
- **A-005**: `src/components/shared/VideoEmbed.astro` and the optional
  `video`/`videoTitle` project fields already exist. Design 4 MAY render a video
  through that shared component when the field is present, and MUST render
  correctly when it is absent. Using it is optional, not required.
- **A-006**: No contact form (no backend, per constitution) — contact is
  `tel:`/`mailto:` links only.
- **A-007**: Icons are hand-written inline SVG line art; no icon package.
- **A-008**: "No cards" is a design rule for Design 4's own sections; the media
  plate and the contact band are not considered cards.
- **A-009**: Section order matches the other three designs so the owner compares
  like with like.
- **A-010**: Sage is used sparingly (strokes, eyebrows, thin rules, faint tints)
  and never as a large saturated fill, keeping it clearly distinct from Design
  2's forest green.
- **A-011**: Design 5 remains unplanned; the last remaining candidate directions
  (bold brutalist, high-contrast safety/industrial) are noted but out of scope.

## Out of Scope

Interior/detail pages, blog, contact form/backend, CMS, i18n, analytics,
automated tests, SEO beyond title/description, changes to Designs 1–3, and any
change to the content schema or content files.
