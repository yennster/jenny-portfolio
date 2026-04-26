#!/usr/bin/env python3
"""
Processes a source portrait photo into the 4 optimised variants the site uses:
  images/jenny-340.jpg   images/jenny-340.webp
  images/jenny-680.jpg   images/jenny-680.webp

Usage:
  python3 process-photo.py <path-to-source-image>

The source can be any resolution; it is center-cropped to a square, then
scaled to 680 × 680 (2x) and 340 × 340 (1x).  Progressive JPEG and lossless-
free WebP are saved alongside the existing images, replacing them.
"""

import sys
from pathlib import Path
from PIL import Image

SIZES = [680, 340]

def main():
    if len(sys.argv) != 2:
        print(f"Usage: python3 {Path(sys.argv[0]).name} <source-image>")
        sys.exit(1)

    src_path = Path(sys.argv[1])
    if not src_path.exists():
        print(f"Error: file not found: {src_path}")
        sys.exit(1)

    out_dir = Path(__file__).parent / "images"
    out_dir.mkdir(exist_ok=True)

    img = Image.open(src_path).convert("RGB")

    # Center-crop to square
    w, h = img.size
    side = min(w, h)
    left = (w - side) // 2
    top  = (h - side) // 2
    img  = img.crop((left, top, left + side, top + side))

    for px in SIZES:
        resized = img.resize((px, px), Image.LANCZOS)

        jpg_path = out_dir / f"jenny-{px}.jpg"
        resized.save(jpg_path, "JPEG", quality=85, progressive=True, optimize=True)
        print(f"Saved {jpg_path}  ({jpg_path.stat().st_size // 1024} KB)")

        webp_path = out_dir / f"jenny-{px}.webp"
        resized.save(webp_path, "WEBP", quality=82, method=6)
        print(f"Saved {webp_path}  ({webp_path.stat().st_size // 1024} KB)")

    print("\nDone. Four image variants written to images/")

if __name__ == "__main__":
    main()
