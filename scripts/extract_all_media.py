import fitz
import os
import json
import re
from PIL import Image
import io

def extract_akinwolere():
    pdf_path = "public/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf"
    out_dir = "public/images/collections/akinwolere"
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    
    artworks = []
    # Pages 6 to 18 (index 5 to 17) correspond to MA-01 to MA-13
    for p in range(5, 18):
        page = doc[p]
        text = page.get_text("text").strip()
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        
        # Parse MA-xx
        ma_match = re.search(r'(MA-\d+)\s*\|\s*(\d{4})', text)
        cat_id = ma_match.group(1) if ma_match else f"MA-{p-4:02d}"
        year = ma_match.group(2) if ma_match else "2013"
        
        # Find images on page
        imgs = page.get_images(full=True)
        img_filename = None
        if imgs:
            # Usually the largest image on page
            best_img = None
            max_size = 0
            for im in imgs:
                xref = im[0]
                base_img = doc.extract_image(xref)
                sz = base_img["width"] * base_img["height"]
                if sz > max_size and base_img["width"] > 100:
                    max_size = sz
                    best_img = base_img
            
            if best_img:
                slug = cat_id.lower()
                webp_name = f"{slug}.webp"
                webp_path = os.path.join(out_dir, webp_name)
                pil_img = Image.open(io.BytesIO(best_img["image"]))
                pil_img.save(webp_path, "WEBP", quality=90)
                img_filename = f"/images/collections/akinwolere/{webp_name}"
        
        artworks.append({
            "page": p + 1,
            "catalogueId": cat_id,
            "year": year,
            "image": img_filename,
            "raw_text": text
        })
        
    with open("scripts/parsed_akinwolere.json", "w", encoding="utf-8") as f:
        json.dump(artworks, f, indent=2, ensure_ascii=False)
    print(f"Extracted {len(artworks)} Akinwolere artworks")

def extract_shobowale():
    pdf_path = "public/Johnson Shobowal International Gallery Catalogue.pdf"
    out_dir = "public/images/collections/shobowale"
    os.makedirs(out_dir, exist_ok=True)
    doc = fitz.open(pdf_path)
    
    artworks = []
    for p in range(len(doc)):
        page = doc[p]
        text = page.get_text("text")
        if "JBS-" in text:
            m = re.search(r'(JBS-\d+)', text)
            cat_id = m.group(1) if m else None
            if not cat_id:
                continue
            
            imgs = page.get_images(full=True)
            img_filename = None
            if imgs:
                best_img = None
                max_size = 0
                for im in imgs:
                    xref = im[0]
                    base_img = doc.extract_image(xref)
                    sz = base_img["width"] * base_img["height"]
                    if sz > max_size and base_img["width"] > 100:
                        max_size = sz
                        best_img = base_img
                
                if best_img:
                    slug = cat_id.lower()
                    webp_name = f"{slug}.webp"
                    webp_path = os.path.join(out_dir, webp_name)
                    pil_img = Image.open(io.BytesIO(best_img["image"]))
                    pil_img.save(webp_path, "WEBP", quality=90)
                    img_filename = f"/images/collections/shobowale/{webp_name}"
            
            artworks.append({
                "page": p + 1,
                "catalogueId": cat_id,
                "image": img_filename,
                "raw_text": text.strip()
            })
            
    with open("scripts/parsed_shobowale.json", "w", encoding="utf-8") as f:
        json.dump(artworks, f, indent=2, ensure_ascii=False)
    print(f"Extracted {len(artworks)} Shobowale artworks")

if __name__ == "__main__":
    extract_akinwolere()
    extract_shobowale()
