# Electricieni Moderni Constitution

Presentation website for a Romanian team of electricians doing classic house
electrical installations plus smart-home (Home Assistant) integration.

## Core Principles

### I. Radical Simplicity (YAGNI)
Static site only. No backend, no CMS, no database, no auth, no API routes, no
analytics pipelines, no e-commerce. Astro + Tailwind CSS, output `static`.
No heavy UI kit (no DaisyUI/Flowbite/Material); only Tailwind utility classes
and small local Astro components. A dependency is added only when a required
section cannot be built without it.

### II. Content-as-Data (NON-NEGOTIABLE)
All editable page content lives in Markdown files inside Astro content
collections (`src/content/services/`, `src/content/projects/`,
`src/content/testimonials/`, plus site-level data). Adding a service, a past
project, or a testimonial MUST require only dropping a `.md` file (and an image
into `public/` or `src/assets/`) — never a code change. Components iterate over
collections; they never hardcode content items. Frontmatter schemas stay small
and documented so a non-developer can copy an existing file and edit it.

### III. One Design at a Time
Five distinct homepage designs will be delivered. Design N+1 is never started
until Design N is shipped: it builds, it runs, and it passes a happy-path smoke
check. Each design has its own spec/plan/tasks in `specs/`, and each must be
visually distinct (different palette, type scale, layout rhythm) — not a recolor.

### IV. Romanian-Only, I7-Compliant Messaging
Every user-visible string is Romanian, with correct diacritics. Copy is
professional and references compliance with Romanian I7 electrical installation
standards where relevant (services, why-us, guarantees).

### V. Content Honesty (NON-NEGOTIABLE)
The business is new. The site shows only work that actually exists: at the time
of writing, exactly one real project (the founder's own passive house in Piatra
Neamț — full electrical installation plus Home Assistant automation, executed by
him) and exactly one real testimonial (his own account of living in it). No
design may invent projects, clients, testimonials, statistics, completed-works
counts, years of experience, team sizes, certifications or awards — not even as
"sample" content. Where a collection holds a single entry, the design presents it
as an intentional flagship case study or spotlight quote, never as a sparse grid
with empty slots. Only services (capabilities the team can genuinely perform) may
be described ahead of a delivered project.

### VI. Definition of Done = It Builds and It Runs
Done means `npm run build` succeeds and `npm run dev` / `npm run preview` serves
the homepage correctly on phone and laptop widths. No unit tests, no e2e suites,
no performance budgets, no accessibility audits beyond sane semantic HTML and
alt text. Scope beyond "modern, clean, responsive, attractive" is out of scope.

## Design Quality Bar

- One color system, one type scale, one spacing rhythm per design, defined in
  the Tailwind theme — no ad-hoc hex values scattered in components.
- Fully responsive: mobile-first, verified at ~375px and ~1440px.
- No placeholder-looking sections: no lorem ipsum, no grey boxes, no "Coming
  soon". Sample content is real Romanian copy.
- Required homepage sections: hero, servicii (clasice + smart/Home Assistant),
  despre echipă/credibilitate, proiecte anterioare, testimoniale, zone deservite
  (Neamț, Suceava, Iași, Botoșani + restul țării), contact, footer.
- Responsive navigation that works without a JavaScript framework.

## Development Workflow

Spec-Kit is mandatory for all work, in this order:
1. `spec.md` exists before any planning.
2. `plan.md` exists before any tasks.
3. `tasks.md` exists before any code is written.

Clarify and Analyze steps are skipped unless a genuine ambiguity blocks work; a
reasonable assumption is recorded in the spec instead of blocking.
SpecKit owns spec/plan/tasks. Builder owns implementation. Smoke testing is
owned by a separate agent. No agent writes site code before `tasks.md` exists.

## Governance

This constitution supersedes other practices for this repository. Any deviation
(new dependency, new runtime, non-Markdown content source) must be justified in
the relevant `plan.md` Complexity Tracking section and is rejected by default.
Amendments require a version bump and an update of the version line below.
Versioning: MAJOR = principle removed/redefined, MINOR = principle or section
added, PATCH = wording clarification.

**Version**: 1.1.0 | **Ratified**: 2026-09-06 | **Last Amended**: 2026-09-07

Changelog:
- **1.1.0** (2026-09-07) — Added Principle V (Content Honesty) as a standalone
  non-negotiable principle after the content-honesty correction that removed
  fabricated projects and testimonials; the previous Principle IV wording
  ("sample content is plausible and clearly replaceable") permitted exactly what
  the project now forbids. Former Principle V (Definition of Done) renumbered VI.
- **1.0.0** (2026-09-06) — Initial ratification.
