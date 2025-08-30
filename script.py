from PIL import Image
import os

input_folder = "photos\\atletiky_loga"     # složka s obrázky
output_folder = "photos\\atletiky_loga\\resized"   # složka pro zmenšené obrázky
max_size = 350              # max šířka nebo výška

os.makedirs(output_folder, exist_ok=True)

for filename in os.listdir(input_folder):
    if filename.lower().endswith((".jpg", ".jpeg", ".png")):
        img_path = os.path.join(input_folder, filename)
        img = Image.open(img_path)

        # Zmenšení s udržením poměru stran
        img.thumbnail((max_size, max_size), Image.LANCZOS)

        output_path = os.path.join(output_folder, filename)
        img.save(output_path)

print("✅ Všechny obrázky zmenšeny, max rozměr 350 px (poměr stran zachován).")
