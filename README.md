# Preston Peak Website

Portfolio website for Preston Peak, a post-classical composer writing concert music and video game soundtracks. The site features a visual transformation between classical and gaming aesthetics, embedded players (SoundCloud, Bandcamp, YouTube), and a guided commission wizard.

## Stack
- Vue 3 + TypeScript + Vite
- UnoCSS (utilities), GSAP (animation), vue-router
- Playwright for e2e tests
- GitHub Pages deploy via `.github/workflows/deploy.yml`

## Develop

```bash
npm install
npm run dev        # local dev server
npm run build      # production build to dist/
npm run typecheck  # vue-tsc
npm test           # Playwright e2e (serves preview on port 4180)
```

## Content

Site content is plain JSON in `public/data/` (works, packs, bio, news, platforms) — field reference in `src/data/README.md`. Hero imagery is generated with `generate_images.py` (Gemini, API key in gitignored `.env` — usage policy in CLAUDE.md).
