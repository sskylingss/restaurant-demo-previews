from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter, ImageOps

project = Path(__file__).resolve().parents[3]
source = project / '03-素材' / '原始资料' / 'hawaii-dim-sum'
target = Path(__file__).resolve().parent / 'assets'
target.mkdir(exist_ok=True)


def make(name, source_name, size, quality=72, fit='cover', warmth=True):
    image = ImageOps.exif_transpose(Image.open(source / source_name)).convert('RGB')
    if fit == 'contain':
        image.thumbnail(size, Image.Resampling.LANCZOS)
    else:
        image = ImageOps.fit(image, size, Image.Resampling.LANCZOS, centering=(0.5, 0.5))
    if warmth:
        r, g, b = image.split()
        r = r.point(lambda x: min(255, x * 1.035))
        b = b.point(lambda x: x * 0.965)
        image = Image.merge('RGB', (r, g, b))
    image = ImageEnhance.Contrast(image).enhance(1.055)
    image = ImageEnhance.Color(image).enhance(1.04)
    image = image.filter(ImageFilter.UnsharpMask(radius=1.1, percent=72, threshold=3))
    image.save(target / name, 'WEBP', quality=quality, method=6)


make('hero-dim-sum-table.webp', '9371953a3bf7d446', (1600, 1000), 70)
make('story-lanterns.webp', '445ec2b0a79b9b41', (1080, 680), 68)
make('egg-tarts.webp', '6829aacc596dd267', (800, 800), 65)
make('siu-mai.webp', 'b1f656b1de56ebe8', (800, 800), 65)
make('sesame-balls.webp', 'c941ea18aa615766', (800, 800), 65)
make('roast-duck.webp', '7677f7bd72b78a45', (800, 800), 63)
make('beef-chow-fun.webp', '0fa1c2a27ccbb939', (800, 800), 63)
make('lobster-noodles.webp', 'fd40ed2b2a6068b5', (800, 800), 63)
make('dragon-mark.webp', '8fcb27f1479226b2', (320, 320), 70, fit='contain', warmth=False)

for path in sorted(target.glob('*.webp')):
    with Image.open(path) as image:
        print(f'{path.name}\t{image.width}x{image.height}\t{path.stat().st_size / 1024:.1f} KB')
