"""Copy brand files and compress product / source photos for the site."""
from pathlib import Path
from shutil import copy2

from PIL import Image, ImageOps

ROOT = Path(r"E:\Lucodeprj\luciweb")
BRAND = Path(r"E:\Lucodeprj\brandlogo")
IMAGES = Path(r"E:\Lucodeprj\resource\images")
STOCK = IMAGES / "stock"

OUT_LOGO = ROOT / "assets" / "logo"
OUT_FONTS = ROOT / "assets" / "fonts"
OUT_CONTACT = ROOT / "assets" / "contact"
OUT_PRODUCTS = ROOT / "assets" / "products"
OUT_SOURCE = ROOT / "assets" / "source"
OUT_AVATARS = ROOT / "assets" / "avatars"

PRODUCTS = {
    "magsafe-wall": [
        STOCK / "2026-09-15_155546_573.png",
        IMAGES / "20260915120127_44_531.jpg",
        IMAGES / "20260915120141_50_531.jpg",
    ],
    "magsafe-neon": [
        STOCK / "2026-09-15_160045_992.png",
        STOCK / "2026-09-15_155743_054.png",
        IMAGES / "20260915120233_69_531.jpg",
    ],
    "magsafe-bulk": [
        STOCK / "2026-09-15_155918_271.png",
        STOCK / "2026-09-15_160114_621.png",
        IMAGES / "20260915120214_63_531.jpg",
    ],
    "metal-frame": [
        IMAGES / "20260915120132_46_531.jpg",
        IMAGES / "20260915120114_37_531.jpg",
        IMAGES / "20260915120116_38_531.jpg",
    ],
    "alpine-band": [
        STOCK / "20260915120040_25_531.jpg",
        STOCK / "20260915120042_26_531.jpg",
    ],
    "woven-band": [
        STOCK / "20260915160745_215_531.jpg",
        STOCK / "20260915161152_218_531.jpg",
        STOCK / "20260915161154_219_531.jpg",
    ],
    "cables": [
        IMAGES / "20260915120457_122_531.jpg",
    ],
    "care-stall": [
        STOCK / "2026-09-15_155827_400.png",
    ],
}

SOURCE = {
    "hero-hqb": IMAGES / "20260915115952_8_531.jpg",
    "seg-canopy": IMAGES / "20260915115940_4_531.jpg",
    "segcom": IMAGES / "20260915120256_78_531.jpg",
    "foreign-trade": STOCK / "20260915120317_86_531.jpg",
    "seg-atrium": IMAGES / "20260915120323_88_531.jpg",
    "fiber": IMAGES / "20260915120340_94_531.jpg",
    "cable-counter": IMAGES / "20260915120457_122_531.jpg",
    "welcome": IMAGES / "huaqiangbei.jpg",
}


def ensure_dirs():
    for d in (OUT_LOGO, OUT_FONTS, OUT_CONTACT, OUT_PRODUCTS, OUT_SOURCE, OUT_AVATARS):
        d.mkdir(parents=True, exist_ok=True)


def copy_brand():
    for name in (
        "lucilink-gold.svg",
        "lucilink-white.svg",
        "lucilink-dark.svg",
        "lucilink-wordmark.svg",
    ):
        copy2(BRAND / "logo" / name, OUT_LOGO / name)

    copy2(BRAND / "contact" / "wechat_large.png", OUT_CONTACT / "wechat_large.png")
    copy2(BRAND / "contact" / "whatsapp_large.png", OUT_CONTACT / "whatsapp_large.png")
    copy2(
        BRAND / "assets" / "avatars" / "avatar-gold-dark-circle.png",
        OUT_AVATARS / "avatar.png",
    )

    fonts = [
        BRAND / "fonts" / "barlow-sc" / "BarlowSemiCondensed-Regular.ttf",
        BRAND / "fonts" / "barlow-sc" / "BarlowSemiCondensed-Medium.ttf",
        BRAND / "fonts" / "barlow-sc" / "BarlowSemiCondensed-Bold.ttf",
        BRAND / "fonts" / "puhuiti2" / "AlibabaPuHuiTi-2-55-Regular.ttf",
        BRAND / "fonts" / "puhuiti2" / "AlibabaPuHuiTi-2-65-Medium.ttf",
        BRAND / "fonts" / "puhuiti2" / "AlibabaPuHuiTi-2-85-Bold.ttf",
    ]
    for src in fonts:
        copy2(src, OUT_FONTS / src.name)


def compress(src: Path, dest: Path, max_side: int = 1600, quality: int = 80):
    dest.parent.mkdir(parents=True, exist_ok=True)
    with Image.open(src) as im:
        im = ImageOps.exif_transpose(im)
        im = im.convert("RGB")
        im.thumbnail((max_side, max_side), Image.Resampling.LANCZOS)
        im.save(dest, "JPEG", quality=quality, optimize=True, progressive=True)
    print(f"{src.name} -> {dest.relative_to(ROOT)} ({dest.stat().st_size // 1024} KB)")


def main():
    ensure_dirs()
    copy_brand()
    print("Brand files copied.")

    for slug, files in PRODUCTS.items():
        for i, src in enumerate(files, start=1):
            if not src.exists():
                raise FileNotFoundError(src)
            compress(src, OUT_PRODUCTS / f"{slug}-{i}.jpg", 1400 if i == 1 else 1600, 82)

    for slug, src in SOURCE.items():
        if not src.exists():
            raise FileNotFoundError(src)
        compress(src, OUT_SOURCE / f"{slug}.jpg", 1600, 80)

    print("Done.")


if __name__ == "__main__":
    main()
