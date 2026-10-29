import fitz
import os

pdf_path = "public/Kelani_Abass_Early_Patronage_Collection_2006-2007 (1).pdf"
out_dir = "public/images/paintings/early-patronage"
os.makedirs(out_dir, exist_ok=True)

doc = fitz.open(pdf_path)

artworks = [
    (6, "KA-01", "village-passage"),
    (7, "KA-02", "the-historic-gateway"),
    (8, "KA-03", "traditional-musicians"),
    (9, "KA-04", "courtyard-with-chickens"),
    (10, "KA-05", "rooftops-and-settlement"),
    (11, "KA-06", "the-quiet-road")
]

for page_idx, ka_id, slug in artworks:
    page = doc[page_idx - 1]
    imgs = page.get_images(full=True)
    if imgs:
        xref = imgs[0][0]
        base_img = doc.extract_image(xref)
        ext = base_img["ext"]
        out_path = os.path.join(out_dir, f"{ka_id}_{slug}.{ext}")
        with open(out_path, "wb") as f:
            f.write(base_img["image"])
        print(f"Saved {out_path} ({base_img['width']}x{base_img['height']} {ext})")

        # Also save as webp
        from PIL import Image
        import io
        img_pil = Image.open(io.BytesIO(base_img["image"]))
        webp_path = os.path.join(out_dir, f"{ka_id}_{slug}.webp")
        img_pil.save(webp_path, "WEBP", quality=95)
        print(f"Saved {webp_path}")
    else:
        print(f"No image on page {page_idx} for {ka_id}")
