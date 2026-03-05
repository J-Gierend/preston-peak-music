*Inherits global rules from ~/.claude/CLAUDE.md. Quality rules (TDD, verification, SRT) enforced by ship pipeline.*
*All project knowledge (stack, design system, aesthetics) lives in the Second Brain. Query it: `brain_query("ppeakWebsite ...", detail="full")`*

# Preston Peak Website

Modern, animated portfolio website for Preston Peak, a post-classical composer.

## Gemini API Policy

The Gemini API key in `.env` requires explicit user confirmation before any call. State intent, wait for "yes"/"confirmed", max 10 image generations per confirmation.

## Content Policy
- Only use verified information from Preston's actual platforms
- Never hallucinate or fabricate content about his works
- When in doubt, leave placeholder text

## Commit Convention
```
[TYPE][SCOPE] Description
```

## Brain Queries for This Project

brain_query("ppeakWebsite overview and design system")
