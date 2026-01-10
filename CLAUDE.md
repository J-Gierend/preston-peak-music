# CLAUDE.md - Preston Peak Website Project

## Project Overview
Modern, animated portfolio website for Preston Peak, a post-classical composer.
Features dual aesthetics (classical elegance + retro gaming) with dramatic section transitions.

## Key Files
- `spec.md` - Full project specification
- `index.html` - Concept presentation page (for client review)
- `images/` - Generated background images

---

## CRITICAL: Gemini API Usage Policy

### MANDATORY CONFIRMATION REQUIRED

**The Gemini API key stored in `.env` must NEVER be used without explicit user confirmation.**

Before ANY Gemini API call (image generation, text, or other services), you MUST:

1. **State your intent clearly:**
   ```
   [GEMINI API] I want to use the Gemini API to: [specific purpose]
   This will consume API quota.
   ```

2. **Wait for explicit confirmation:**
   - User must say "yes", "confirmed", "go ahead", "approved", or similar
   - Silence or ambiguous responses = NO permission
   - "Maybe" or "I guess" = NO permission

3. **Never batch unlimited requests:**
   - Always specify exact number of API calls before asking
   - Maximum 10 image generations per confirmation
   - If more needed, ask again

### Prohibited Actions (without confirmation):
- Generating images
- Making test API calls
- Checking API status via actual requests
- Any action that consumes API quota

### Current Session Authorization:
- **Authorized:** Generate up to 10 preview images for concept presentation
- **Authorized by:** User on 2026-01-10
- **Purpose:** Create background images for Preston Peak website concept

---

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
