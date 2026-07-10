# AI Token Global — Agent Team

Two complementary halves of one team.

## Builders — `.claude/agents/` (write code)

| Agent | Layer | Owns |
|---|---|---|
| `delivery-lead` | Coordination | Breaks down requests, routes to specialists, sequences work, closes the loop with the auditors. **Start here when unsure.** |
| `site-architect` | Architecture | Routing, IA, new-page-type decisions, scaffolding, scaling to 15 langs / 200+ articles |
| `frontend-designer` | Frontend | Design system, visual craft, responsive polish (invokes the `frontend-design` skill) |
| `astro-engineer` | Frontend | `.astro` components/layouts/pages, interactivity, a11y, build-green |
| `sanity-cms-engineer` | Backend | Sanity schemas (`studio/`), Studio config, content modeling, validation |
| `content-integration-engineer` | Backend | GROQ + interfaces in `src/lib/sanity.ts`, Portable Text, images, Sanity→i18n fallback |
| `content-pipeline-engineer` | Backend | `scripts/` NDJSON importers + Claude translator, bulk migration & AI translation (Task #6/#12) |
| `i18n-engineer` | Backend | `SUPPORTED_LANGS`/dictionaries, `[lang]` routing, hreflang inputs, language scale-up |
| `seo-engineer` | SEO | meta, hreflang/canonical, JSON-LD, sitemap, robots (implements what `seo-strategist` audits) |
| `deployment-engineer` | DevOps | Amplify build/webhook/CI, monitoring, backups (implements what `automation-engineer` audits) |

## Auditors — `.claude/skills/` (review, read-only)

| Skill | Reviews |
|---|---|
| `technical-auditor` | Code / schema / build correctness + doc drift |
| `seo-strategist` | International SEO readiness |
| `automation-engineer` | Pipeline / ops / migration leverage |
| `qa-mobile-specialist` | Responsive / a11y / visual QA |
| `project-supervisor` | Synthesizes the audits into a boss-ready go/no-go |

## The loop
`delivery-lead` plans → builders implement (build stays green) → auditors review → findings route back to the owning builder → re-audit → `project-supervisor` calls go/no-go.

## Ground rules every agent honors
- **Locked-in architecture:** AWS Amplify · Astro static · Sanity-first · `[lang]` routing · Portable Text. Argue inside these, never abandon them.
- **`npm run build` stays at 0 errors** between hand-offs (~28 routes across EN+ES today).
- **One owner per layer** — design values from `frontend-designer`, data shapes from `content-integration-engineer`, schema from `sanity-cms-engineer`.
- **Adding a language = 1 constant + content**, nothing per-page.
