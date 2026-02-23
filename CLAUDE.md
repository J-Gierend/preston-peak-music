*Inherits global rules (TDD, smoke testing, SRT, Ralph Loop, quality gates) from ~/.claude/CLAUDE.md.*

# Preston Peak Website

## Project Overview
Modern, animated portfolio website for Preston Peak, a post-classical composer.
Features dual aesthetics (classical elegance + retro gaming) with dramatic section transitions.

## Key Files
- `spec.md` - Full project specification
- `index.html` - Concept presentation page (for client review)
- `images/` - Generated background images

## Gemini API Policy

The Gemini API key in `.env` requires explicit user confirmation before any call. State intent, wait for "yes"/"confirmed", max 10 image generations per confirmation.

## Development Guidelines

### Tech Stack
- Vue 3 + Vite
- UnoCSS
- GSAP + ScrollTrigger
- VueUse

### Design System
See `spec.md` for full details.

**Classical Aesthetic:**
- Colors: Navy #0a1628, Gold #d4af37, Ivory #f5f0e6
- Font: Playfair Display (headings), Inter (body)
- Mood: Elegant, sophisticated, contemplative

**Gaming Aesthetic:**
- Colors: Black #0f0f0f, Cyan #00fff7, Magenta #ff00ff, Amber #ffaa00
- Font: Pixel font (headings), Inter (body)
- Mood: Retro, energetic, synthwave

### Content Policy
- Only use verified information from Preston's actual platforms
- Never hallucinate or fabricate content about his works
- When in doubt, leave placeholder text

### Commit Convention
```
[TYPE][SCOPE] Description

Co-Authored-By: Claude <noreply@anthropic.com>
```
