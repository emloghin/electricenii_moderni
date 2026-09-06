---
name: impeccable-design
description: >-
  Design-quality gate for shipping a homepage/landing page design (Astro + Tailwind or similar static sites). Use before declaring any visual design "done" — checks spacing/type/color consistency, responsive behavior, and that no section looks like a placeholder or wireframe. Trigger whenever the user asks for an "impeccable", "polished", "professional", or "production-ready" design, or when a Builder/implementer agent is about to mark a design as shipped.
allowedTools: []
---

## Why this exists

"It builds and the page loads" is not the same as "it looks impeccable." This is the second check, run once the happy-path smoke test already passes — it catches the visual sloppiness a functional test can't see: inconsistent spacing, an unstyled section, a design that only works at one screen width.

## The checklist

Before marking a design as shipped, walk through every point below on the actual rendered page (not just the code):

1. **Spacing rhythm.** Section padding and gaps follow one consistent scale (e.g. Tailwind's default spacing steps) — no section noticeably cramped or floating next to its neighbors.
2. **Type scale.** Headings, subheadings, and body text use a small, deliberate set of sizes/weights — not five different heading sizes improvised page to page.
3. **Color system.** One primary + one accent + neutrals, reused consistently (buttons, links, highlights). No one-off colors that don't appear anywhere else on the page.
4. **No placeholder feel.** Every section has real (or realistic sample) content — no "Lorem ipsum", no empty image boxes, no "Coming soon". If sample content is a stand-in for the user's real content, it must still look and read like a finished section.
5. **Responsive at both ends.** Check one mobile width (~375px) and one desktop width (~1280px+). Nav collapses sensibly on mobile, images don't overflow, text doesn't get cramped or comically large.
6. **Visual hierarchy.** The most important action (e.g. "Contact us" / "Cere ofertă") is the most visually prominent element on the page — not competing with five other buttons of equal weight.
7. **Consistency across sections.** Buttons, cards, and headings look like they belong to the same design system throughout the page, not stitched from different templates.

## How to use it

Run through the 7 points as a quick visual pass (in a browser or screenshot), not a formal test suite — this is a human-judgment checklist, not something to automate with assertions. Note any failing point and fix it before calling the design done. If a point doesn't apply (e.g., no images on this design), skip it and say why.

Report back in this shape:

```
Design QA: [name]
1. Spacing — ✅/⚠️ [note]
2. Type scale — ✅/⚠️
3. Color system — ✅/⚠️
4. No placeholder feel — ✅/⚠️
5. Responsive (mobile/desktop) — ✅/⚠️
6. Visual hierarchy — ✅/⚠️
7. Consistency — ✅/⚠️
```

Any ⚠️ blocks shipping until fixed.
