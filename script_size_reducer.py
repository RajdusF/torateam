import os
from PIL import Image, ImageOps

def compress_images(input_folder, output_folder, quality=80, max_size=(1920, 1080)):
    # Pokud složka pro výstup neexistuje, vytvoří se
    os.makedirs(output_folder, exist_ok=True)

    # Projdi všechny soubory ve složce
    for filename in os.listdir(input_folder):
        input_path = os.path.join(input_folder, filename)
        output_path = os.path.join(output_folder, filename)

        # Pokusíme se otevřít obrázek
        try:
            with Image.open(input_path) as img:
                # Automatické otočení podle EXIF
                img = ImageOps.exif_transpose(img)

                # Zmenšení při zachování poměru stran
                img.thumbnail(max_size)

                # Uložení se zadanou kvalitou
                img.save(output_path, optimize=True, quality=quality)
                print(f"✅ {filename} -> komprimováno")
        except Exception as e:
            print(f"⚠️ Přeskočeno: {filename} ({e})")

# Příklad použití
input_folder = "photos\\slider_index_photos"
output_folder = "photos\\slider_index_photos\\low_quality"
compress_images(input_folder, output_folder)
