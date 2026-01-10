"""
Generate preview images for Preston Peak website concept using Gemini Nano Banana Pro.
AUTHORIZED: Max 10 images for concept presentation (2026-01-10)
"""

import os
import base64
import requests
import time
import json
from pathlib import Path

# Load API key from .env
def load_env():
    env_path = Path(__file__).parent / ".env"
    if env_path.exists():
        with open(env_path) as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, value = line.split("=", 1)
                    os.environ[key] = value

load_env()
API_KEY = os.environ.get("GEMINI_API_KEY")

if not API_KEY:
    print("[ERROR] GEMINI_API_KEY not found in .env")
    exit(1)

# Model - Nano Banana Pro for image generation
MODEL = "nano-banana-pro-preview"

# Output directory
OUTPUT_DIR = Path(__file__).parent / "images"
OUTPUT_DIR.mkdir(exist_ok=True)

# Image prompts - carefully selected for the concept
IMAGES = [
    {
        "filename": "01-hero-piano-starlight.png",
        "prompt": "Generate an image: Abstract dark composition featuring a grand piano silhouette dissolving into floating musical notes and starlight, deep navy blue (#0a1628) to black gradient, subtle golden light emanating from piano keys, ethereal and sophisticated mood, minimalist style, cinematic lighting, no text, no people, high quality, 16:9 aspect ratio"
    },
    {
        "filename": "02-classical-golden-waves.png",
        "prompt": "Generate an image: Elegant abstract visualization of sound waves transforming into delicate golden threads against deep midnight blue background, subtle sheet music notation fading in distance, romantic era inspired, warm ivory and gold accents, soft bokeh light particles, dreamy atmospheric quality, no text, no people, high quality, 16:9 aspect ratio"
    },
    {
        "filename": "03-gaming-synthwave-grid.png",
        "prompt": "Generate an image: Retro synthwave landscape at night with glowing neon grid lines extending to horizon, pixel art style mountains and stars, cyan and magenta neon color palette with warm amber accents, CRT monitor glow effect, nostalgic 80s arcade atmosphere, dark background, no text, no people, high quality, 16:9 aspect ratio"
    },
    {
        "filename": "04-liminal-horror-corridor.png",
        "prompt": "Generate an image: Liminal space aesthetic, empty dark corridor with flickering fluorescent lights, eerie fog, muted desaturated colors with occasional green glow, unsettling atmosphere, VHS grain texture, abandoned building interior, horror game aesthetic, no people, no text, high quality, 16:9 aspect ratio"
    },
    {
        "filename": "05-chiptune-pixel-adventure.png",
        "prompt": "Generate an image: Colorful 16-bit pixel art adventure landscape, fantasy scene with pixelated castle on distant hill, 8-bit style clouds and trees, warm sunset colors orange and purple, retro SNES era video game aesthetic, cheerful adventurous mood, clean pixel art style, no text, high quality, 16:9 aspect ratio"
    },
    {
        "filename": "06-about-portrait-backdrop.png",
        "prompt": "Generate an image: Abstract artistic background for portrait photo, soft gradient from warm cream to gentle sage green, subtle texture like fine art paper, elegant and understated, soft diffused light from left side, minimalist and refined, no text, portrait orientation, high quality"
    },
    {
        "filename": "07-contact-waveform-banner.png",
        "prompt": "Generate an image: Minimalist abstract sound wave visualization, single elegant golden waveform line across dark navy background, subtle particle effects like floating dust motes, professional and inviting, modern and clean, slight gradient lighting, wide banner format, no text, high quality, 16:9 aspect ratio"
    },
]

def generate_image(prompt: str, filename: str) -> bool:
    """Generate a single image using Gemini Nano Banana Pro."""

    url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEY}"

    headers = {
        "Content-Type": "application/json"
    }

    payload = {
        "contents": [
            {
                "parts": [
                    {"text": prompt}
                ]
            }
        ],
        "generationConfig": {
            "responseModalities": ["image", "text"],
            "temperature": 1.0
        }
    }

    try:
        print(f"  Generating: {filename}...")
        response = requests.post(url, headers=headers, json=payload, timeout=180)

        if response.status_code == 200:
            data = response.json()

            # Extract image from response
            if "candidates" in data and len(data["candidates"]) > 0:
                candidate = data["candidates"][0]
                if "content" in candidate and "parts" in candidate["content"]:
                    for part in candidate["content"]["parts"]:
                        if "inlineData" in part:
                            image_data = part["inlineData"].get("data")
                            mime_type = part["inlineData"].get("mimeType", "image/png")

                            if image_data:
                                # Determine file extension
                                ext = ".png"
                                if "jpeg" in mime_type or "jpg" in mime_type:
                                    ext = ".jpg"
                                elif "webp" in mime_type:
                                    ext = ".webp"

                                # Update filename extension if needed
                                output_filename = filename.rsplit(".", 1)[0] + ext
                                output_path = OUTPUT_DIR / output_filename

                                with open(output_path, "wb") as f:
                                    f.write(base64.b64decode(image_data))
                                print(f"  [OK] Saved: {output_path}")
                                return True

            print(f"  [WARN] No image data in response")
            # Print response structure for debugging
            print(f"  Response keys: {data.keys()}")
            if "candidates" in data:
                print(f"  Candidates: {len(data['candidates'])}")

        else:
            error_text = response.text[:500]
            print(f"  [ERROR] API returned {response.status_code}: {error_text}")

    except requests.exceptions.Timeout:
        print(f"  [ERROR] Timeout generating {filename}")
    except Exception as e:
        print(f"  [ERROR] {type(e).__name__}: {e}")

    return False

def main():
    print("=" * 60)
    print("Preston Peak Website - Image Generation")
    print(f"Using model: {MODEL}")
    print("=" * 60)
    print(f"Generating {len(IMAGES)} images...")
    print(f"Output directory: {OUTPUT_DIR}")
    print()

    success_count = 0

    for i, img in enumerate(IMAGES, 1):
        print(f"[{i}/{len(IMAGES)}] {img['filename']}")
        if generate_image(img["prompt"], img["filename"]):
            success_count += 1
        # Delay between requests
        if i < len(IMAGES):
            time.sleep(3)

    print()
    print("=" * 60)
    print(f"Complete! Generated {success_count}/{len(IMAGES)} images")
    print("=" * 60)

if __name__ == "__main__":
    main()
