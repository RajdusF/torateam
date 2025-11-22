import os
from PIL import Image, ImageOps

def compress_images(input_folder, output_folder, quality=90, max_height=1000):
    # vytvoření výstupní složky
    os.makedirs(output_folder, exist_ok=True)

    # načti všechny obrázky a seřaď je (pro konzistentní 1,2,3…)
    files = sorted(os.listdir(input_folder))

    counter = 1

    for filename in files:
        input_path = os.path.join(input_folder, filename)

        # přeskoč složky
        if os.path.isdir(input_path):
            continue

        try:
            with Image.open(input_path) as img:
                # automatická korekce otočení z EXIF
                img = ImageOps.exif_transpose(img)

                # výpočet nových rozměrů při max. výšce
                w, h = img.size
                if h > max_height:
                    scale = max_height / h
                    new_size = (int(w * scale), max_height)
                    img = img.resize(new_size, Image.LANCZOS)

                # výstupní jméno → 1.jpg, 2.jpg, …
                output_filename = f"{counter}.png"
                output_path = os.path.join(output_folder, output_filename)

                # uložení
                img.save(output_path, optimize=True, quality=quality)
                print(f"✅ {filename} -> {output_filename}")

                counter += 1

        except Exception as e:
            print(f"⚠️ Přeskočeno: {filename} ({e})")
            
            
input_folder = "C:\\tora-stranky\\photos\\slider_athletics\\photoshop"
output_folder = "C:\\tora-stranky\\photos\\slider_athletics\\export"
compress_images(input_folder, output_folder)
