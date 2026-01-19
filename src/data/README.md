# Content Management

This folder contains all the editable content for the Preston Peak website.

## Files

### works.json
Classical compositions and concert works.

**Fields:**
- `slug`: URL-friendly identifier (no spaces, lowercase)
- `title`: Display title
- `year`: Year composed
- `duration`: Approximate duration
- `instrumentation`: What instruments/ensemble
- `awards`: Array of award strings (can be empty `[]`)
- `soundcloud`: Link to SoundCloud
- `bandcamp`: Link to Bandcamp
- `description`: 1-2 sentence description
- `featured`: `true` to show on homepage

### packs.json
Game music packs available on itch.io.

**Fields:**
- `slug`: URL-friendly identifier
- `title`: Display title
- `tracks`: Number of tracks
- `duration`: Total duration
- `style`: Array of style tags
- `price`: "FREE" or "$X"
- `itchUrl`: Link to itch.io page
- `preview`: SoundCloud preview link
- `description`: 1-2 sentence description
- `featured`: `true` to show on homepage

### bio.json
About page content.

### news.json
News posts and announcements.

### platforms.json
Social media and streaming platform links.

## Editing Tips

1. Always use valid JSON syntax
2. Test changes locally before deploying
3. Keep descriptions concise (1-2 sentences)
4. Use `featured: true` sparingly (2-3 items max)

## Troubleshooting

If the site shows old content after editing:
1. Check JSON syntax at https://jsonlint.com/
2. Clear browser cache
3. Visit site with `?admin=true` to see any errors
