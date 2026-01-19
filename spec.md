# Preston Peak Website - Implementation Specification

## Overview

### Project Summary
A modern Vue 3 portfolio website for **Preston Peak**, a post-classical composer who creates concert music and video game soundtracks. The site features a dramatic visual transformation between classical and gaming aesthetics.

### Goals
- Visitors can discover and listen to Preston's music across all genres
- Potential clients can inquire about commissions through a guided wizard
- Game developers can find and access his itch.io music packs
- Site loads fast despite multiple embedded players
- Preston can easily update content by editing JSON files

### Scope Boundaries
**In Scope:**
- 7 main pages: Home, About, Classical, Games, Listen, News, Contact/Commission
- Dual aesthetic system (classical ↔ gaming) based on route
- Embedded music players (SoundCloud, Bandcamp, YouTube) with lazy loading
- Dark/light theme toggle
- Commission wizard with Formspree backend
- JSON-based content management
- Particle effects (floating musical notes)
- GitHub Pages deployment

**Out of Scope:**
- E-commerce/payment processing
- User accounts/authentication
- Newsletter system
- Multi-language support

---

## Technical Design

### Architecture

```
ppeakWebsite/
├── index.html
├── vite.config.ts
├── uno.config.ts
├── package.json
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── router/index.ts
│   ├── data/                    # Preston edits these
│   │   ├── works.json           # Classical compositions
│   │   ├── packs.json           # Game music packs
│   │   ├── bio.json             # About page content
│   │   ├── news.json            # News/updates (manual)
│   │   ├── platforms.json       # Social/streaming links
│   │   └── README.md            # Instructions for Preston
│   ├── composables/
│   │   ├── useTheme.ts          # Dark/light + aesthetic switching
│   │   ├── useScrollAnimation.ts # GSAP ScrollTrigger
│   │   ├── useLazyEmbed.ts      # Intersection Observer for embeds
│   │   ├── useContentLoader.ts  # JSON loading + caching + error handling
│   │   └── useParticles.ts      # Canvas particle effects
│   ├── components/
│   │   ├── common/
│   │   │   ├── TheNavigation.vue
│   │   │   ├── TheFooter.vue
│   │   │   ├── ThemeToggle.vue
│   │   │   ├── MobileMenu.vue
│   │   │   ├── AdminErrorPanel.vue  # Shows JSON errors when ?admin=true
│   │   │   └── ParticleCanvas.vue
│   │   ├── embeds/
│   │   │   ├── YouTubeEmbed.vue     # lite-youtube-embed wrapper
│   │   │   ├── SoundCloudEmbed.vue  # Lazy iframe
│   │   │   ├── BandcampEmbed.vue    # Lazy iframe
│   │   │   └── EmbedFallback.vue    # "Listen on X" placeholder
│   │   ├── sections/
│   │   │   ├── HeroSection.vue
│   │   │   ├── DualPortalSection.vue
│   │   │   ├── FeaturedWorkSection.vue
│   │   │   ├── WorkCard.vue
│   │   │   └── MusicPackCard.vue
│   │   ├── modals/
│   │   │   ├── WorkDetailModal.vue  # Classical work details
│   │   │   └── PackDetailModal.vue  # Game pack details
│   │   └── commission/
│   │       ├── CommissionWizard.vue
│   │       ├── WizardStep.vue
│   │       ├── ProjectTypeStep.vue
│   │       ├── ScopeStep.vue
│   │       └── DetailsStep.vue
│   ├── pages/
│   │   ├── HomePage.vue
│   │   ├── AboutPage.vue
│   │   ├── ClassicalPage.vue
│   │   ├── GamesPage.vue
│   │   ├── ListenPage.vue
│   │   ├── NewsPage.vue
│   │   └── ContactPage.vue
│   ├── layouts/
│   │   └── DefaultLayout.vue
│   └── styles/
│       ├── base.css
│       └── themes.css
└── public/
    └── images/
```

### Tech Stack
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | Vue 3 (Composition API) | Modern, reactive, excellent animation support |
| Build Tool | Vite | Fast HMR, native ES modules |
| CSS | UnoCSS | Fast, flexible, tree-shaking |
| Animation | GSAP + ScrollTrigger | Industry standard for scroll animations |
| Utilities | VueUse | useDark, useIntersectionObserver, etc. |
| Router | Vue Router 4 | SPA navigation with hash support |
| Form Backend | Formspree | Free tier, no server needed |

### Data Model

**works.json:**
```json
{
  "works": [
    {
      "slug": "sonata-no-1",
      "title": "Sonata No. 1",
      "year": 2023,
      "duration": "6-7 min",
      "instrumentation": "Solo Piano",
      "awards": ["Semi-finalist, NYC Contemporary Music Symposium 2023"],
      "soundcloud": "https://soundcloud.com/...",
      "bandcamp": "https://prestonpeak.bandcamp.com/...",
      "description": "A romantic era dedication to the classical masters...",
      "featured": false
    }
  ]
}
```

**packs.json:**
```json
{
  "packs": [
    {
      "slug": "surpass-your-limits",
      "title": "surpass your limits!",
      "tracks": 13,
      "duration": "20+ min",
      "style": ["Action chiptune", "Boss themes", "Adventure"],
      "price": "FREE",
      "itchUrl": "https://ppeak.itch.io/...",
      "preview": "https://soundcloud.com/...",
      "description": "High-energy action music...",
      "featured": true
    }
  ]
}
```

**news.json:**
```json
{
  "posts": [
    {
      "id": "1",
      "date": "2024-01-15",
      "title": "New Release: Marriage Suite",
      "content": "Excited to announce...",
      "type": "release",
      "link": "https://..."
    }
  ]
}
```

### Key Components

**useContentLoader.ts** - JSON loading with error handling:
- Fetches JSON files on app load
- Caches last-known-good version in localStorage
- If JSON fails to parse, uses cached version
- Tracks errors in reactive state
- AdminErrorPanel reads error state when ?admin=true

**useTheme.ts** - Dual aesthetic system:
- Manages dark/light mode via VueUse's useDark
- Watches route changes to detect /games/* paths
- Sets `data-aesthetic="gaming"` or `data-aesthetic="classical"` on root
- CSS variables switch based on data-aesthetic attribute

**useLazyEmbed.ts** - Lazy loading:
- Uses Intersection Observer
- Tracks which embeds are in viewport
- Only loads iframe when element is visible
- Shows placeholder/facade until loaded

---

## Edge Cases & Error Handling

### JSON Parsing Errors
**Scenario:** Preston edits works.json and breaks syntax.

**Solution:**
1. `useContentLoader` wraps JSON.parse in try-catch
2. On success: Store in localStorage as "works-cache"
3. On error:
   - Log error to `errors` reactive array
   - Load from localStorage cache
   - Site displays cached content normally
4. Admin mode (?admin=true) shows AdminErrorPanel with:
   - Which file failed
   - Line/character hint if possible
   - Raw error message

**Recovery:** Preston fixes JSON, refreshes, cache updates.

### Embed Load Failures
**Scenario:** SoundCloud URL is invalid or service is down.

**Solution:**
1. Embed component has `@error` handler
2. On error, swap to `<EmbedFallback>` component
3. EmbedFallback shows:
   - "Track unavailable"
   - Direct link: "Listen on SoundCloud →"
   - Styled consistently with site aesthetic

### Modal Deep Linking
**Scenario:** User shares link to /classical#sonata-no-1

**Solution:**
1. Router reads hash on page load
2. If hash matches a work slug, opens modal automatically
3. Modal updates URL hash when opened/closed
4. Browser back button closes modal (history.back())

### Mobile Navigation
**Scenario:** User on small screen needs to navigate.

**Solution:**
1. Hamburger icon visible below 640px breakpoint
2. Click opens full-screen MobileMenu overlay
3. Menu shows all nav links
4. Clicking link closes menu and navigates
5. Escape key also closes menu

---

## Tradeoffs & Decisions

### JSON Files vs CMS
**Decision:** JSON files in src/data/
**Why:**
- Preston has basic web experience, can edit JSON
- No external service dependency
- Git versioning tracks content changes
- Can migrate to CMS later if needed
**Tradeoff:** Manual file editing, must understand JSON syntax

### Route-Based Aesthetic vs Toggle
**Decision:** Aesthetic determined by route only
**Why:**
- Clearer mental model (/games = gaming look)
- Simpler state management
- Avoids confusing combinations (gaming aesthetic on classical page)
**Tradeoff:** Users can't choose aesthetic preference

### Modal vs Separate Pages for Works
**Decision:** Modal overlay (URL updates for sharing)
**Why:**
- Keeps user in context
- Faster perceived navigation
- Still shareable via URL hash
**Tradeoff:** More complex back-button handling, potential accessibility issues

### Formspree vs Custom Backend
**Decision:** Formspree only
**Why:**
- No server needed
- Free tier sufficient
- Emails go directly to Preston
**Tradeoff:** Less control, depends on external service

### Particles in Initial Release
**Decision:** Include particle effects now
**Why:**
- Part of the "wow factor" vision
- Canvas-based, performant
- Enhances classical aesthetic
**Tradeoff:** More initial development work

### No Reduced Motion Handling
**Decision:** Keep all animations regardless of user preference
**Why:** User explicitly chose this option
**Note:** This is an accessibility concern - consider adding an opt-in motion toggle in settings for users who want it

---

## Implementation Notes

### CSS Variables Strategy
```css
:root {
  /* Classical (default) */
  --bg-primary: #1a2a3a;
  --bg-secondary: #2a3a4a;
  --accent: #c9a85c;
  --text-primary: #f8f4ef;
  --text-secondary: #b8a8a0;
}

[data-aesthetic="gaming"] {
  --bg-primary: #181820;
  --bg-secondary: #252035;
  --accent: #70d4d0;
  --accent-secondary: #c580c5;
  --text-primary: #f0f0f5;
}

[data-theme="light"] {
  /* Light mode overrides */
  --bg-primary: #f8f4ef;
  --text-primary: #1a2a3a;
}
```

### Embed Facade Pattern
YouTube embeds use lite-youtube-embed:
```vue
<lite-youtube videoid="VIDEO_ID" playlabel="Play: Title">
  <button type="button" class="lty-playbtn">
    <span class="lyt-visually-hidden">Play</span>
  </button>
</lite-youtube>
```

SoundCloud/Bandcamp use Intersection Observer:
```ts
const { isVisible } = useLazyEmbed(embedRef)
// Only render iframe when isVisible is true
```

### Particle Effect Implementation
- Canvas element positioned behind content
- Particles: Musical notes (♪, ♫) and small dots
- Drift slowly upward with slight horizontal sway
- Respect current aesthetic colors
- Pause when tab is not visible (requestAnimationFrame)

### Form Validation
Commission wizard validates each step:
- Project type: Required selection
- Scope: Required selection
- Details: Name required, email required (format validated), message optional
- Submit to Formspree with hidden _subject field (form ID configured by Preston)

### Hash Navigation
Router config enables scroll behavior:
```ts
scrollBehavior(to, from, savedPosition) {
  if (to.hash) {
    return { el: to.hash, behavior: 'smooth' }
  }
  return savedPosition || { top: 0 }
}
```

---

## Verified Content Sources

All content from these verified sources only:
- https://www.prestonpeakmusic.com/
- https://ppeak.itch.io/
- https://prestonpeak.bandcamp.com/
- https://soundcloud.com/preston-peak-104023590
- https://www.youtube.com/@prestonpeak2

**Never fabricate information about Preston's works.**

---

## Interview Decisions (2026-01-19)

### Deployment
- **GitHub Account**: J-Gierend
- **Repository Name**: preston-peak-music
- **URL**: https://j-gierend.github.io/preston-peak-music

### Content Strategy
- **Data Source**: Minimal sample (2-3 works per category as examples, Preston expands)
- **Images**: Use AI-generated backgrounds from images/ folder
- **Formspree**: Placeholder - Preston configures form ID later

### Visual Effects
- **Particles**: Subtle (5-10 particles, slow drift, low opacity)
- **Portal Hover**: Aesthetic preview on hover (gold tint for Classical, cyan/magenta for Gaming)
- **Gaming FX**: Subtle scanlines overlay only
- **URL Format**: Hash-based modal linking (/classical#sonata-no-1)

### Commission Wizard Changes
- **Budget Step**: REMOVED - handle budget discussion in follow-up conversation
- **Steps**: Project Type → Scope → Details (3 steps instead of 4)

---

## Deployment

### GitHub Pages
1. Vite config sets `base: '/preston-peak-music/'` for correct asset paths
2. Build outputs to `dist/`
3. GitHub Actions workflow on push to main:
   - npm ci
   - npm run build
   - Deploy dist/ to gh-pages branch

### Testing Checklist
- [ ] All pages render without console errors
- [ ] Theme toggle works (dark/light)
- [ ] Navigate to /games → aesthetic changes
- [ ] Click work → modal opens, URL updates
- [ ] Edit JSON → content updates on refresh
- [ ] Break JSON → cached content shows, admin panel shows error
- [ ] Commission form submits to Formspree
- [ ] Embeds lazy load on scroll
- [ ] Mobile hamburger menu works
- [ ] Hash links scroll to sections
