# Squad Team

> electricenii_moderni

## Coordinator

| Name | Role | Notes |
|------|------|-------|
| Squad | Coordinator | Routes work, enforces handoffs and reviewer gates. |

## Members

| Name | Role | Charter | Status |
|------|------|---------|--------|
| SpecKit | Spec-Kit Expert | .squad/agents/speckit/charter.md | 🏗️ Active |
| Builder | Frontend/Astro Dev | .squad/agents/builder/charter.md | ⚛️ Active |
| Smoke | Tester | .squad/agents/smoke/charter.md | 🧪 Active |
| Scribe | Scribe | .squad/agents/scribe/charter.md | 📋 Active |
| Ralph | Work Monitor | .squad/agents/ralph/charter.md | 🔄 Active |
| Rai | RAI Reviewer | .squad/agents/Rai/charter.md | 🛡️ RAI |
| Fact Checker | Fact Checker | .squad/agents/fact-checker/charter.md | 🔍 Verifier |


## Coding Agent

<!-- copilot-auto-assign: false -->

| Name | Role | Charter | Status |
|------|------|---------|--------|
| @copilot | Coding Agent | — | 🤖 Coding Agent |

### Capabilities

**🟢 Good fit — auto-route when enabled:**
- Bug fixes with clear reproduction steps
- Test coverage (adding missing tests, fixing flaky tests)
- Lint/format fixes and code style cleanup
- Dependency updates and version bumps
- Small isolated features with clear specs
- Boilerplate/scaffolding generation
- Documentation fixes and README updates

**🟡 Needs review — route to @copilot but flag for squad member PR review:**
- Medium features with clear specs and acceptance criteria
- Refactoring with existing test coverage
- API endpoint additions following established patterns
- Migration scripts with well-defined schemas

**🔴 Not suitable — route to squad member instead:**
- Architecture decisions and system design
- Multi-system integration requiring coordination
- Ambiguous requirements needing clarification
- Security-critical changes (auth, encryption, access control)
- Performance-critical paths requiring benchmarking
- Changes requiring cross-team discussion

## Project Context

- **Project:** electricenii_moderni — presentation website for a Romanian electrician/smart-home installation team (classic electrical installs + Home Assistant smart integration), targeting customers nationwide with focus on Neamt, Suceava, Iasi, Botosani.
- **Stack:** Astro + Tailwind CSS, static, Markdown-driven content, easy for a non-developer to maintain.
- **Process:** spec-kit is mandatory for all work. SpecKit owns constitution → specify → plan → tasks → implement (clarify only when genuinely ambiguous, analyse always skipped). No planning before specs, no code before tasks.
- **Deliverable:** 5 distinct homepage designs, shipped one fully at a time; user picks a favorite then adds custom content.
- **Definition of done:** the website runs.
- **Requested by:** ELoghin
- **Created:** 2026-09-06
