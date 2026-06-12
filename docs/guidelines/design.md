# Preston Peak — Design Guidelines

## Brand Identity

**Preston Peak** is a post-classical composer who writes concert music and video game soundtracks. The site serves as his portfolio — a place for listeners, collaborators, and game developers to discover his work.

**Brand personality**: Confident, refined, serious about craft. Not flashy, not playful. The music speaks; the design steps back.

**Design philosophy**: Modern editorial. Think gallery exhibition, not concert poster. Clean negative space, sharp edges, type-driven hierarchy, color as accent not decoration.

**Core principle: Less is more.** Preston's explicit direction. Every element must earn its place. If something doesn't serve the music or the user, remove it. Favor restraint over decoration. A page with 3 perfect elements beats a page with 10 adequate ones.

---

## Less Is More — Rules

1. **No decorative complexity.** If a simpler version communicates the same thing, use it.
2. **Content density over visual weight.** Cards, grids, and lists should feel spacious, not cramped.
3. **Fewer visual layers.** One background color, one accent, one font weight hierarchy. Don't stack gradients, borders, and shadows.
4. **Images must be optimized.** Hero backgrounds: JPEG, 1920px wide, quality 80, under 200KB each. No 7MB PNGs.
5. **Earn every component.** Before adding a toggle, card, badge, or section — ask: does the user need this to find the music? If not, cut it.

---

## Two Worlds, One System

The site has two aesthetic modes — **Classical** and **Gaming** — toggled via the nav world toggle. The design system stays identical between them; only **colors change**. No layout differences, no font differences, no shadow differences, no animation differences between modes.

---

## Color Palette

### Classical (Default)

| Token              | Value     | Usage                            |
|---------------------|-----------|----------------------------------|
| `--bg-primary`      | `#1a2a3a` | Page background                  |
| `--bg-secondary`    | `#2a3a4a` | Cards, sections, nav             |
| `--bg-tertiary`     | `#3a4a5a` | Hover states, tertiary surfaces  |
| `--accent`          | `#c9a85c` | Gold — links, icons, borders     |
| `--accent-hover`    | `#d4b76a` | Accent hover state               |
| `--text-primary`    | `#f8f4ef` | Headings, body text              |
| `--text-secondary`  | `#b8a8a0` | Descriptions, metadata           |
| `--text-muted`      | `#8a8a8a` | Timestamps, low-emphasis text    |

### Gaming

| Token                | Value     | Usage                            |
|----------------------|-----------|----------------------------------|
| `--bg-primary`       | `#181820` | Page background                  |
| `--bg-secondary`     | `#252035` | Cards, sections, nav             |
| `--bg-tertiary`      | `#352845` | Hover states, tertiary surfaces  |
| `--accent`           | `#70d4d0` | Teal — links, icons, borders     |
| `--accent-hover`     | `#90e4e0` | Accent hover state               |
| `--accent-secondary` | `#c580c5` | Purple — decorative gradients    |
| `--text-primary`     | `#f0f0f5` | Headings, body text              |
| `--text-secondary`   | `#a0a0b0` | Descriptions, metadata           |
| `--text-muted`       | `#707080` | Timestamps, low-emphasis text    |

### Light Theme Overrides

Both classical and gaming modes support a light theme toggle. Light theme inverts backgrounds and text while preserving accent colors.

### Rules
- **Never** use raw hex colors in components. Always reference CSS custom properties (`var(--accent)`, etc.).
- Accent color is for interactive elements and emphasis only — not for large background fills.
- Gaming mode changes colors, nothing else. Same borders, same spacing, same fonts.

---

## Typography

### Font Stack
**One font: Inter.** No display fonts, no pixel fonts, no serif fallbacks.

```css
--font-display: 'Inter', sans-serif;
--font-body: 'Inter', sans-serif;
```

### Scale

| Element           | Size (mobile)  | Size (desktop) | Weight | Notes                       |
|-------------------|----------------|----------------|--------|-----------------------------|
| Hero title        | 3rem           | 5-6rem         | 700    | Homepage name               |
| Page title (h1)   | 2.5rem         | 5rem           | 700    | Section hero headings       |
| Section title (h2)| 2rem           | 2.5rem         | 700    | Content section headings    |
| Subsection (h3)   | 1.5rem         | 1.75rem        | 600    | Card titles, modal headings |
| Body              | 1rem           | 1rem           | 400    | Paragraph text              |
| Small / metadata  | 0.875rem       | 0.875rem       | 400-500| Tags, dates, captions       |
| Tiny              | 0.75rem        | 0.75rem        | 500-700| Badges, counts              |

### Rules
- Headings use `font-weight: 600-700`. Body uses `400`.
- Line height: `1.1-1.2` for headings, `1.6` for body text.
- Letter spacing: tight (`-0.02em`) for large titles, normal for body, wide (`0.1-0.2em`) for uppercase labels.
- **Never** add `'Playfair Display'`, `serif`, or any other font family as a fallback anywhere.

---

## Spacing

### Section Padding
```
Mobile:  padding: 4rem 1rem
Tablet:  padding: 6rem 2rem
Desktop: padding: 6rem 4rem
```

### Container
```
max-width: 80rem (1280px)
margin: 0 auto
```

### Component Spacing
- Card padding: `1.5rem` (p-6)
- Gap between cards: `1.5rem`
- Gap between sections: `0` (sections are flush, separated by border/color)
- Content margin-bottom between elements: `0.5rem` to `1.5rem` based on hierarchy

---

## Borders & Corners

### The Rule: Sharp Corners Everywhere
```css
border-radius: 0;
```

**No rounded corners.** Not on cards, not on buttons, not on badges, not on inputs, not on modals, not on embeds. Zero exceptions except:

- **Semantic circles**: Step indicators, avatar thumbnails, and numbered list markers that are inherently circular may use `border-radius: 9999px` (rounded-full).
- **Nothing else.**

### Borders
- Section top borders: `1px solid` with gradient fade (accent color, 30% opacity)
- Card borders: `1px solid` accent at 20% opacity, or `2px solid` accent for featured/active
- Input borders: `1px solid var(--bg-tertiary)`, accent on focus
- Dividers: `1px solid rgba(255, 255, 255, 0.1)`

---

## Shadows

### The Rule: No Decorative Shadows
No `box-shadow` for visual flair, glow effects, or depth illusion. No colored shadows. No blur halos.

**Allowed shadow usage** (functional only):
- **Modals**: `shadow-lg` — needed for z-depth separation from page content
- **Error panels**: `shadow-xl` — must visually separate from page for visibility
- **Mobile menu overlay**: functional depth shadow if needed

Everything else: no shadow.

---

## Motion & Animation

### The Rule: No Animations
No GSAP. No `@keyframes`. No `animation:` properties. No `transform: scale()` on hover. No `transform: translateY()` on hover.

**Allowed transitions** (color/opacity only):
- `transition: color 0.2s ease` — link and text color changes on hover
- `transition: background 0.2s ease` — background color changes on hover
- `transition: opacity 0.2s ease` — subtle hover feedback
- `transition: border-color 0.2s ease` — input/button focus states
- `transition: background-color 0.5s ease` — theme switching (dark/light, classical/gaming)

**Not allowed**:
- `transform: translateY(...)` on hover
- `transform: scale(...)` on hover
- `animation: fadeIn / slideUp / card-enter`
- GSAP `gsap.from()` / `gsap.to()` for entrance effects
- `@keyframes pulse` or any loading/attention animations
- Modal scale transitions — use opacity-only enter/leave

---

## Components

### Cards
```
Background: var(--bg-secondary)
Border: none by default, 2px solid var(--accent) for featured
Padding: 1.5rem
Border-radius: 0
Shadow: none
Hover: background changes to var(--bg-tertiary), or opacity shift
```

### Buttons
```
Primary:   bg var(--accent), text var(--bg-primary), hover opacity 0.9
Outline:   border 1px var(--accent), text var(--accent), hover fill
Ghost:     no border/bg, text var(--text-secondary), hover text var(--accent)
Padding:   0.5rem 1rem (sm), 0.75rem 1.5rem (md)
Radius:    0
Shadow:    none
Transform: none on hover
```

### Badges / Tags
```
Background: var(--accent) at 20% opacity, or var(--bg-tertiary)
Text:       var(--bg-primary) or var(--text-secondary)
Padding:    0.125rem 0.5rem (sm), 0.375rem 1rem (md)
Radius:     0
Font:       0.75rem, weight 500-700, uppercase for labels
```

### Inputs
```
Background: var(--bg-tertiary) or transparent
Border:     1px solid var(--bg-tertiary), var(--accent) on focus
Padding:    0.75rem 1rem
Radius:     0
Shadow:     none
```

### Modals
```
Background: var(--bg-secondary)
Border:     1px solid var(--accent) at 20%
Shadow:     shadow-lg (functional depth only)
Radius:     0
Transition: opacity-only enter/leave (no scale, no translate)
Backdrop:   rgba(0, 0, 0, 0.7)
```

### Navigation
```
Background: var(--bg-primary) at 90% + backdrop-blur
Border:     bottom 1px solid var(--accent) at 20%
Position:   fixed top
Height:     4rem (h-16)
```

---

## Grid & Layout

### Content Grids
```
1 column  at < 640px
2 columns at >= 640px
3 columns at >= 1024px
Gap: 1.5rem
```

### Homepage Nav Grid
```
1 column  at < 640px
2 columns at >= 640px
Gap: 1px (grid lines as dividers)
```

---

## Icons

Use **Carbon Icons** via UnoCSS icons preset (`i-carbon-*`). Keep icons at `1.25-2rem` depending on context. Icon color follows `var(--accent)` for decorative, `var(--text-secondary)` for functional.

---

## Embeds (YouTube, SoundCloud, Bandcamp)

```
Border-radius: 0
Shadow: none
Container: overflow hidden, no decorative borders
Aspect ratio: 16/9 for YouTube, native for audio players
Loading: intersection observer lazy-load, plain skeleton (no pulse animation)
```

---

## Do / Don't

### Do
- Use CSS custom properties for all colors
- Keep spacing consistent with the scale above
- Let content breathe — generous padding, no cramming
- Make the accent color meaningful — it highlights what matters
- Test both classical and gaming modes for every component

### Don't
- Add `border-radius` to anything (except semantic circles)
- Add `box-shadow` for decoration
- Add hover scale/translate transforms
- Add entrance animations or GSAP effects
- Use any font besides Inter
- Change layout or structure between classical/gaming modes
- Use raw hex colors in components
- Ship unoptimized images (PNGs where JPEG works, images over 200KB for backgrounds)
- Add components that don't directly serve user goals (finding and listening to music)

---

## Images

### Hero Backgrounds
```
Format:     JPEG
Width:      1920px (resize from source, maintain aspect ratio)
Quality:    80
Max size:   200KB per image
Location:   public/images/backgrounds/
```

### Content Images (Steam headers, thumbnails)
```
Format:     JPEG
Width:      920px for featured, 460px for thumbnails
Quality:    85
Max size:   150KB per image
Location:   public/images/
```

### Rules
- **Never** commit PNGs for photographic content. JPEG at quality 80 is indistinguishable and 50x smaller.
- Always resize to the maximum display size, not the source size. A 3168px image displayed at 1920px is wasted bandwidth.
- Verify every image loads correctly after adding it. Broken images are unacceptable.
