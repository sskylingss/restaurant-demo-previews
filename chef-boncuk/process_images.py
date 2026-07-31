from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

ROOT = Path(__file__).resolve().parents[3]
SRC = ROOT / '03-素材' / '原始资料' / 'chef-boncuk'
OUT = Path(__file__).resolve().parent / 'assets'
OUT.mkdir(parents=True, exist_ok=True)

def make(source, target, size, quality=78, centering=(.5,.5)):
    image = Image.open(SRC / source).convert('RGB')
    image = ImageOps.fit(image, size, Image.Resampling.LANCZOS, centering=centering)
    image = ImageEnhance.Contrast(image).enhance(1.06)
    image = ImageEnhance.Color(image).enhance(1.05)
    image = image.filter(ImageFilter.UnsharpMask(radius=1.15, percent=55, threshold=4))
    image.save(OUT / target, 'WEBP', quality=quality, method=6)

make('f2db006999c8dfc2', 'hero-mixed-grill.webp', (1600, 1000), 66, (.52,.5))
make('ea53f1b28e96b1a0', 'story-storefront.webp', (1080, 620), 68)
make('c4931f595c9ba534', 'weekend-breakfast.webp', (800, 800), 55)
make('e2135d945304c762', 'lamb-skewers.webp', (800, 800), 72)
make('0009ecc9d31489f0', 'chicken-shish.webp', (800, 800), 63)
make('49c301c760d5eeea', 'adana-kebab.webp', (800, 800), 60)
make('aec550ab721a6377', 'grilled-fish.webp', (800, 800), 63)
make('ce445e41f56f9864', 'lentil-soup.webp', (800, 800), 68)
