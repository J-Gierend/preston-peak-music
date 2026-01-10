# Preston Peak Music - Website Specification

## Overview & Goals

### Project Summary
A modern, animated portfolio website for **Preston Peak**, a post-classical composer who creates both concert music and video game/TTRPG soundtracks. The site features a dramatic visual transformation between classical and gaming aesthetics, reflecting his dual artistic identity.

### Success Criteria
- Visitors can easily discover and listen to Preston's music across all genres
- Potential clients can inquire about commissions through a guided wizard
- Game developers can find and access his itch.io music packs
- Site loads fast despite multiple embedded players
- Works excellently on both desktop and mobile
- Looks modern, animated, and impressive enough to "wow" Preston

### Target Audience
1. **Industry Professionals** - Film/game studios seeking composers
2. **Indie Developers** - Game devs looking for music packs
3. **Classical Music Enthusiasts** - Fans of contemporary piano works
4. **TTRPG Community** - D&D players seeking ambient music

### Scope
**In Scope:**
- Full custom-built Vue 3 website
- 7 main pages/sections
- Dramatic dual-aesthetic design (classical ↔ retro gaming)
- Embedded music players (SoundCloud, Bandcamp, YouTube)
- Dark/light theme toggle
- Multi-language placeholder (future)
- Commission inquiry wizard
- Social feed integration
- GitHub Pages deployment (mockup phase)

**Out of Scope (Future):**
- Built-in e-commerce/payment processing
- CMS/admin panel for content updates
- User accounts/authentication
- Newsletter system (can be mocked)

---

## Verified Content (No Hallucination Policy)

All content must come from verified sources. **Never fabricate information.**

### About Preston Peak
| Field | Verified Value | Source |
|-------|---------------|--------|
| Birth Year | 1998 | prestonpeakmusic.com |
| Location | Houston, TX | prestonpeakmusic.com |
| Education | B.S. Biomedical Engineering, Texas A&M | prestonpeakmusic.com |
| Spouse | Hailey | prestonpeakmusic.com |
| Background | Mother is pianist; grew up with Beethoven, Mozart, Joplin, Chopin | prestonpeakmusic.com |
| Style | Post-classical, minimalist, timbral/harmonic experimentation | prestonpeakmusic.com |
| Interests | Video games, D&D, music history, theology, biblical themes | prestonpeakmusic.com, itch.io |
| AI Policy | "No AI is EVER used in my compositions" | itch.io |

### Classical Works (Verified)
| Work | Year | Duration | Instrumentation | Notes |
|------|------|----------|-----------------|-------|
| Sonata No. 1 | 2023 | 6-7 min | Solo Piano | Semi-finalist, NYC Contemporary Music Symposium 2023; romantic era dedication |
| Suite for Piano No. 1 - Songs for Winter | 2023 | TBD | Solo Piano | - |
| Overcast Skies | TBD | TBD | TBD | First shared composition that sparked his passion |

### Game Music Packs (Verified from itch.io)
| Pack | Tracks | Duration | Style | Price |
|------|--------|----------|-------|-------|
| "surpass your limits!" | 13 | 20+ min | Action chiptune, boss themes, adventure | FREE |
| "remnants" (Full) | 30 | 50+ min | Liminal, ambient, haunting piano, horror drones | Paid |
| "remnants" (Free) | 10 | TBD | Liminal, creepy, somber, ominous | FREE |

### Platform Links (Verified)
| Platform | URL | Status |
|----------|-----|--------|
| Website (current) | https://www.prestonpeakmusic.com/ | Active |
| SoundCloud | https://soundcloud.com/preston-peak-104023590 | Active |
| Bandcamp | https://prestonpeak.bandcamp.com/ | Active |
| itch.io | https://ppeak.itch.io/ | Active |
| YouTube | https://www.youtube.com/@prestonpeak2 | Active |
| Instagram | https://www.instagram.com/preston_peak_music/ | Active |
| Apple Music | https://music.apple.com/us/artist/preston-peak/1680020328 | Active |
| Solo Piano Directory | https://solopiano.com/artist/preston-peak/ | Listed |

---

## Technical Stack

### Core Framework
| Component | Choice | Rationale |
|-----------|--------|-----------|
| Framework | **Vue 3** (Composition API) | Modern, reactive, excellent animation support |
| Build Tool | **Vite** | Fast HMR, native ES modules, Vue ecosystem default |
| CSS | **UnoCSS** | 200x faster than Tailwind, full flexibility for custom design |
| Animation | **GSAP + ScrollTrigger** | Industry standard for complex scroll animations, timelines |
| Utilities | **VueUse** | useDark, useParallax, useIntersectionObserver |
| Router | **Vue Router 4** | SPA navigation with route transitions |

### Embed Strategy
| Platform | Implementation | Performance Approach |
|----------|---------------|---------------------|
| YouTube | **lite-youtube-embed** | Facade pattern, 224x faster than iframe |
| SoundCloud | Native iframe | Lazy load via Intersection Observer |
| Bandcamp | Native iframe or **bandcamp-player** web component | Lazy load, responsive wrapper |

### Build & Deploy
| Stage | Target |
|-------|--------|
| Development | `npm run dev` → localhost:5173 |
| Build | `npm run build` → dist/ |
| Preview | `npm run preview` |
| Deploy (Mockup) | GitHub Pages |
| Deploy (Production) | TBD (server with custom domain) |

---

## Site Architecture

### Page Structure
```
/ (Home)
├── /about
├── /classical
│   └── /classical/:work-slug (individual work pages)
├── /games
│   └── /games/:pack-slug (individual pack pages)
├── /listen
├── /news (Social Feed)
├── /contact
└── /commission (Guided Wizard)
```

### Component Architecture
```
src/
├── assets/
│   ├── images/
│   │   ├── backgrounds/     # AI-generated section backgrounds
│   │   ├── icons/          # Social icons, UI elements
│   │   └── portraits/      # Preston's photos (from YouTube/provided)
│   └── fonts/
├── components/
│   ├── common/
│   │   ├── TheNavigation.vue
│   │   ├── TheFooter.vue
│   │   ├── ThemeToggle.vue
│   │   ├── LanguageSwitcher.vue (placeholder)
│   │   └── SocialLinks.vue
│   ├── embeds/
│   │   ├── YouTubeEmbed.vue (lite-youtube wrapper)
│   │   ├── SoundCloudEmbed.vue (lazy-loaded)
│   │   ├── BandcampEmbed.vue (lazy-loaded)
│   │   └── EmbedFacade.vue (generic placeholder pattern)
│   ├── sections/
│   │   ├── HeroSection.vue
│   │   ├── WorkCard.vue
│   │   ├── MusicPackCard.vue
│   │   └── SocialFeed.vue
│   └── commission/
│       ├── WizardStep.vue
│       ├── ProjectTypeStep.vue
│       ├── ScopeStep.vue
│       ├── BudgetStep.vue
│       └── DetailsStep.vue
├── composables/
│   ├── useTheme.ts
│   ├── useScrollAnimation.ts
│   └── useLazyEmbed.ts
├── layouts/
│   ├── DefaultLayout.vue
│   ├── ClassicalLayout.vue (elegant aesthetic)
│   └── GamingLayout.vue (retro aesthetic)
├── pages/
│   ├── HomePage.vue
│   ├── AboutPage.vue
│   ├── ClassicalPage.vue
│   ├── GamesPage.vue
│   ├── ListenPage.vue
│   ├── NewsPage.vue
│   └── ContactPage.vue
├── router/
│   └── index.ts
├── stores/
│   └── theme.ts (if needed beyond VueUse)
├── styles/
│   ├── base.css
│   ├── themes/
│   │   ├── classical.css
│   │   └── gaming.css
│   └── transitions.css
├── App.vue
└── main.ts
```

---

## Design System

### Dual Aesthetic Approach

The site features two distinct visual identities that transform based on the current section:

#### Classical Aesthetic (Home, About, Classical Works, Listen, Contact)
| Element | Value |
|---------|-------|
| Primary BG | Deep Navy `#0a1628` |
| Secondary BG | Charcoal `#1a1a2e` |
| Accent | Warm Gold `#d4af37` |
| Text Primary | Ivory `#f5f0e6` |
| Text Secondary | Silver `#a0a0a0` |
| Font Headings | Playfair Display (serif) |
| Font Body | Inter (sans-serif) |
| Animations | Slow fades (0.6s), gentle parallax, floating particles |
| Mood | Sophisticated, elegant, contemplative |

#### Gaming Aesthetic (Game Music section)
| Element | Value |
|---------|-------|
| Primary BG | Deep Black `#0f0f0f` |
| Secondary BG | Dark Purple `#1a0a2e` |
| Accent Primary | Neon Cyan `#00fff7` |
| Accent Secondary | Neon Magenta `#ff00ff` |
| Accent Tertiary | Warm Amber `#ffaa00` |
| Text Primary | Pure White `#ffffff` |
| Font Headings | Press Start 2P or similar pixel font (headings only) |
| Font Body | Inter (keeps readability) |
| Effects | CRT scanlines (subtle), glow effects, grid patterns |
| Animations | Glitch transitions, pixel reveals |
| Mood | Retro, energetic, nostalgic |

### Light Mode Variants
Both aesthetics have light mode alternatives:
- Classical Light: Cream backgrounds, navy text, gold accents
- Gaming Light: White/light gray backgrounds, dark text, same neon accents

### Responsive Breakpoints
| Name | Width | Notes |
|------|-------|-------|
| Mobile | < 640px | Single column, hamburger nav |
| Tablet | 640-1024px | Two columns, condensed nav |
| Desktop | > 1024px | Full layout, expanded nav |

### Animation Principles
- **Elegant & Smooth** throughout
- Page transitions: Fade with subtle slide (0.4s ease-out)
- Scroll reveals: Staggered fade-up (0.3s per element)
- Hover states: Scale + glow (0.2s)
- Section transitions: Morphing background + color shift

---

## Page Specifications

### 1. Home Page (`/`)

**Purpose:** Dramatic first impression, portal to both worlds

**Layout:**
```
┌─────────────────────────────────────┐
│          HERO SECTION               │
│  "Preston Peak" (animated reveal)   │
│  "Composer • Pianist"               │
│  [Scroll indicator]                 │
├─────────────────────────────────────┤
│        DUAL PORTAL SECTION          │
│  ┌─────────────┐ ┌─────────────┐   │
│  │  CLASSICAL  │ │ GAME MUSIC  │   │
│  │   WORKS     │ │   & TTRPG   │   │
│  │  [Enter]    │ │  [Enter]    │   │
│  └─────────────┘ └─────────────┘   │
├─────────────────────────────────────┤
│       FEATURED WORK SECTION         │
│  Latest release with embed          │
├─────────────────────────────────────┤
│         QUICK LINKS                 │
│  [Commission] [Listen] [About]      │
└─────────────────────────────────────┘
```

**Features:**
- Animated name reveal on load (GSAP timeline)
- Dual portal cards with hover preview (aesthetic hint)
- Featured track with SoundCloud/YouTube embed (facade)
- Floating particle effect (subtle musical notes)

### 2. About Page (`/about`)

**Purpose:** Personal connection, bio, achievements

**Content Sections:**
1. **Hero** - Portrait (from YouTube) + tagline
2. **Bio** - Full biography (verified content only)
3. **Achievement Highlight** - NYC Contemporary Music Symposium 2023
4. **Philosophy** - "No AI" commitment badge
5. **Personal** - Mentions video games, D&D, wife Hailey

**Special Elements:**
- "No AI Used" badge/seal prominently displayed
- Timeline of musical journey (if more dates become available)
- Portrait with subtle parallax

### 3. Classical Works Page (`/classical`)

**Purpose:** Showcase concert/piano compositions

**Layout:**
- Grid of work cards with:
  - Title
  - Year
  - Duration (if known)
  - Instrumentation
  - Awards/recognition badges
  - Play button → opens modal or inline expand
- Detail view: Full program notes (if available), embedded player

**Works to Display:**
1. Sonata No. 1 (2023) - with NYC Symposium badge
2. Suite for Piano No. 1 - Songs for Winter (2023)
3. Overcast Skies

### 4. Game Music Page (`/games`)

**Purpose:** Showcase video game and TTRPG music packs

**Aesthetic:** Full transformation to gaming/retro style

**Layout:**
```
┌─────────────────────────────────────┐
│  HERO (pixel art background)        │
│  "Game & TTRPG Music"               │
├─────────────────────────────────────┤
│  FEATURED PACK (remnants)           │
│  Large card with preview player     │
├─────────────────────────────────────┤
│  ALL PACKS GRID                     │
│  ┌────┐ ┌────┐ ┌────┐              │
│  │Pack│ │Pack│ │Pack│              │
│  └────┘ └────┘ └────┘              │
├─────────────────────────────────────┤
│  CTA: "Browse on itch.io" button    │
└─────────────────────────────────────┘
```

**Pack Cards Display:**
- Pack artwork (or generated placeholder)
- Title
- Track count
- Duration
- Price (FREE badge if applicable)
- Style tags (chiptune, ambient, horror, etc.)
- "Preview" button → inline player
- "Get on itch.io" button → external link

### 5. Listen Page (`/listen`)

**Purpose:** Aggregated music discovery across all platforms

**Layout:**
```
┌─────────────────────────────────────┐
│  PLATFORM TABS                      │
│  [All] [SoundCloud] [Bandcamp] [YT] │
├─────────────────────────────────────┤
│  FEATURED PLAYLIST/TRACK            │
│  (Single prominent embed)           │
├─────────────────────────────────────┤
│  RECENT RELEASES                    │
│  Grid of track cards with facades   │
├─────────────────────────────────────┤
│  STREAMING PLATFORMS                │
│  [Spotify] [Apple] [Bandcamp] etc   │
└─────────────────────────────────────┘
```

**Implementation:**
- Use lite-youtube-embed for all YouTube
- Lazy load SoundCloud/Bandcamp via Intersection Observer
- Maximum 2-4 actual embeds loaded at once
- Rest use facade pattern (thumbnail + play button → load on click)

### 6. News/Social Feed Page (`/news`)

**Purpose:** Aggregate social media updates

**Implementation Options:**
1. **Instagram Feed** - Embed via official embed or service
2. **YouTube Feed** - Latest videos with lite-youtube
3. **Combined Feed** - Chronological mix

**Technical Approach:**
- For MVP: Manually curated or use embed widgets
- Future: API integration for auto-updates

### 7. Contact Page (`/contact`)

**Purpose:** Simple contact form for general inquiries

**Form Fields:**
- Name (required)
- Email (required)
- Subject (dropdown: General, Collaboration, Other)
- Message (required)

**Note:** Commission inquiries redirect to `/commission` wizard

### 8. Commission Wizard (`/commission`)

**Purpose:** Guided inquiry process for potential clients

**Steps:**
1. **Project Type**
   - Film/Video
   - Video Game
   - TTRPG/Tabletop
   - Live Performance
   - Other

2. **Scope**
   - Single Track
   - EP (3-5 tracks)
   - Full Soundtrack
   - Ongoing/Retainer

3. **Budget Range** (optional)
   - Just Exploring
   - $X - $Y
   - $Y - $Z
   - Prefer to discuss

4. **Project Details**
   - Project name
   - Description
   - Timeline/deadline
   - Reference tracks (optional)

5. **Contact Info**
   - Name
   - Email
   - Company/Project (optional)

**Submission:** Sends email to Preston (or stores for later if email not configured)

---

## Wow Factor Features

Based on the design aesthetic, include these enhanced features:

### 1. Particle Effects (Classical sections)
- Floating musical notes and stardust
- Subtle, non-distracting
- Responds slightly to mouse movement
- Implementation: Canvas or CSS animations

### 2. Section Transformation
- When navigating from Classical → Games section:
  - Background morphs/transitions
  - Color palette shifts
  - Typography changes
  - Sound effect (optional, off by default)

### 3. Audio Visualizer (Stretch Goal)
- When a track is playing, subtle waveform in header
- Responds to audio (if browser allows)
- Fallback: Animated sine wave

### 4. Scroll-Triggered Reveals
- Work cards stagger in as user scrolls
- Text reveals with elegant timing
- Parallax on background images

---

## AI Image Prompts for Assets

Generate these images using Gemini for the site backgrounds:

### 1. Homepage Hero Background
```
Prompt: Abstract dark composition featuring a grand piano silhouette
dissolving into floating musical notes and starlight, deep navy blue
(#0a1628) to black gradient, subtle golden light emanating from piano
keys, ethereal and sophisticated mood, minimalist style, cinematic
lighting, no text, no people

Size: 1920x1080px (16:9)
Style: Dark, ethereal, sophisticated
```

### 2. Classical Section Background
```
Prompt: Elegant abstract visualization of sound waves transforming into
delicate golden threads against deep midnight blue background, subtle
sheet music notation fading in distance, romantic era inspired, warm
ivory and gold accents, soft bokeh light particles, dreamy atmospheric
quality, no text, no people

Size: 1920x1200px (16:10)
Style: Romantic, warm, sophisticated
```

### 3. Game Music Section Background
```
Prompt: Retro synthwave landscape at night with glowing neon grid lines
extending to horizon, 16-bit pixel art style mountains and stars, cyan
and magenta color palette with warm amber accents, CRT monitor glow
effect, nostalgic 80s arcade atmosphere, dark background, no text,
no people

Size: 1920x1080px (16:9)
Style: Synthwave, retro, pixel art
```

### 4. Ambient/Horror Section Background
```
Prompt: Liminal space aesthetic, empty dark corridor with flickering
fluorescent lights, eerie fog, muted desaturated colors with occasional
sickly green glow, unsettling atmosphere, VHS grain texture, abandoned
building interior, no people, no text

Size: 1920x1080px (16:9)
Style: Liminal, horror, unsettling
```

### 5. Chiptune/Adventure Section Background
```
Prompt: Colorful 16-bit pixel art adventure landscape, fantasy scene
with pixelated castle on distant hill, 8-bit style clouds and trees,
warm sunset colors orange and purple, retro SNES era video game
aesthetic, cheerful adventurous mood, clean pixel art, no text

Size: 1920x1080px (16:9)
Style: 16-bit, cheerful, adventure
```

### 6. About Page Portrait Background
```
Prompt: Abstract artistic background for portrait photo overlay, soft
gradient from warm cream (#f5f0e6) to gentle sage green, subtle texture
like fine art paper, elegant and understated, soft diffused light from
left side, minimalist and refined, no text

Size: 1200x1600px (3:4 portrait)
Style: Elegant, minimal, portrait-friendly
```

### 7. Contact Section Banner
```
Prompt: Minimalist abstract sound wave visualization, single elegant
golden waveform line across dark navy background, subtle particle
effects, professional and inviting, modern and clean, slight gradient
lighting, no text

Size: 1920x600px (banner/wide)
Style: Modern, professional, minimal
```

---

## Mock-Up Indicators

The following features should be **clearly marked as mock-ups** for Preston to understand these are expandable:

1. **E-commerce widgets** - "Future: Direct purchase integration"
2. **Newsletter signup** - "Future: Email list integration"
3. **Blog/CMS** - "Future: Content management system"
4. **Multi-language** - Language switcher visible but non-functional
5. **Social feed auto-update** - May use static content initially

Display mock-ups with subtle "Coming Soon" or "Planned Feature" badges.

---

## Performance Requirements

| Metric | Target |
|--------|--------|
| First Contentful Paint | < 1.5s |
| Largest Contentful Paint | < 2.5s |
| Cumulative Layout Shift | < 0.1 |
| Total Blocking Time | < 200ms |
| Total JS Bundle | < 300KB |

### Optimization Strategies
- All YouTube embeds use lite-youtube-embed
- Audio embeds lazy load via Intersection Observer
- Images use modern formats (WebP) with fallbacks
- CSS is purged/tree-shaken via UnoCSS
- Fonts subset to used characters
- Background images use responsive srcset

---

## Accessibility Requirements

| Requirement | Implementation |
|-------------|---------------|
| Keyboard Navigation | Full tab support, visible focus states |
| Screen Readers | Semantic HTML, ARIA labels on embeds |
| Color Contrast | WCAG AA minimum (4.5:1 for text) |
| Reduced Motion | `prefers-reduced-motion` respected |
| Alt Text | All images have descriptive alt text |

---

## Development Phases

### Phase 1: Foundation
- [ ] Project scaffolding (Vite + Vue 3 + UnoCSS)
- [ ] Routing setup
- [ ] Theme system (dark/light)
- [ ] Base layout components
- [ ] Typography and color system

### Phase 2: Core Pages
- [ ] Home page with hero
- [ ] About page
- [ ] Classical works page
- [ ] Game music page
- [ ] Basic navigation

### Phase 3: Enhanced Features
- [ ] Embed components (YouTube, SoundCloud, Bandcamp)
- [ ] Listen aggregation page
- [ ] Contact form
- [ ] Commission wizard

### Phase 4: Polish
- [ ] GSAP scroll animations
- [ ] Section transitions
- [ ] Particle effects
- [ ] Performance optimization

### Phase 5: Deploy
- [ ] GitHub Pages deployment
- [ ] Testing across devices
- [ ] Final review with Preston

---

## File Naming Conventions

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `WorkCard.vue` |
| Pages | PascalCase + Page suffix | `HomePage.vue` |
| Composables | camelCase with use prefix | `useTheme.ts` |
| Styles | kebab-case | `theme-classical.css` |
| Assets | kebab-case | `hero-background.webp` |

---

## Git Commit Conventions

Per CLAUDE.md atomic commit workflow:

```
[FEAT][UI] Add hero section with animated reveal
[FEAT][EMBED] Implement lazy-loaded SoundCloud player
[FIX][THEME] Correct dark mode toggle persistence
[REFACTOR][LAYOUT] Extract navigation into component
[STYLE][GAMES] Add CRT scanline effect to gaming section
[DOCS] Update README with deployment instructions

Co-Authored-By: Claude <noreply@anthropic.com>
```

---

## Sources & References

- [Preston Peak Website](https://www.prestonpeakmusic.com/)
- [Preston Peak itch.io](https://ppeak.itch.io/)
- [Preston Peak Bandcamp](https://prestonpeak.bandcamp.com/)
- [Preston Peak SoundCloud](https://soundcloud.com/preston-peak-104023590)
- [Preston Peak YouTube](https://www.youtube.com/@prestonpeak2)
- [lite-youtube-embed](https://github.com/justinribeiro/lite-youtube)
- [GSAP ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/)
- [UnoCSS](https://unocss.dev/)
- [VueUse](https://vueuse.org/)
