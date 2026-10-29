import fitz
import json

def parse_catalogue(pdf_path, name):
    doc = fitz.open(pdf_path)
    res = {
        "name": name,
        "pages": len(doc),
        "intro_pages": {},
        "artworks": []
    }
    
    # First 5 pages text
    for p in range(min(6, len(doc))):
        res["intro_pages"][p + 1] = doc[p].get_text("text").strip()
        
    for p in range(len(doc)):
        page = doc[p]
        text = page.get_text("text")
        images = page.get_images(full=True)
        # Check if page is an artwork page
        res["artworks"].append({
            "page": p + 1,
            "images": [img[0] for img in images],
            "text": text.strip()
        })
    return res

shobowale = parse_catalogue("public/Johnson Shobowal International Gallery Catalogue.pdf", "Johnson Shobowale")
akinwolere = parse_catalogue("public/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf", "Muyiwa Akinwolere")

with open("scripts/shobowale_details.json", "w", encoding="utf-8") as f:
    json.dump(shobowale, f, indent=2, ensure_ascii=False)

with open("scripts/akinwolere_details.json", "w", encoding="utf-8") as f:
    json.dump(akinwolere, f, indent=2, ensure_ascii=False)

print("Parsed both catalogues!")
