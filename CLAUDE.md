*Standard: jg-v1 | type: frontend*
*Inherits global rules from ~/.claude/CLAUDE.md. Project knowledge: brain_query("ppeakWebsite ...")*

# Preston Peak Website

Modern, animated portfolio website for Preston Peak, a post-classical composer (concert music + game soundtracks). Vue 3 + Vite + UnoCSS, deployed to GitHub Pages.

## Commands
- Dev: `npm run dev`
- Build: `npm run build`
- Typecheck: `npm run typecheck`
- Test (Playwright e2e): `npm test`

## Map
- `docs/spec.md` — full implementation specification
- `docs/session-status.md` — project status snapshot (Jan 2026, pre-implementation)
- `docs/guidelines/design.md` — design system + aesthetics rules (read before frontend work)
- `plans/` — active plans (archived/ when done)
- `src/` — Vue app: components/, pages/, composables/, layouts/, router/, styles/, data/ (content JSON + editing guide in src/data/README.md)
- `public/data/` — deployed content JSON (works, packs, bio, news, platforms)
- `public/images/`, `images/` — hero/backdrop imagery (images/ = generated originals)
- `tests/` — Playwright specs (testDir set in playwright.config.ts)
- `generate_images.py` — Gemini image generation script (key from gitignored `.env`)
- `concept-preview.html` — original standalone concept presentation

## Rules
- Gemini API key in `.env`: explicit user confirmation required before ANY call — state intent, wait for "yes"/"confirmed", max 10 image generations per confirmation.
- Content: only verified information from Preston's actual platforms. Never hallucinate or fabricate content about his works — when in doubt, leave placeholder text.
- Commit convention: `[TYPE][SCOPE] Description`
