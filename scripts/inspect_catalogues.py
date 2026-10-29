import fitz
import json

def inspect_pdf(pdf_path, name):
    print("=" * 60)
    print("PDF:", name)
    doc = fitz.open(pdf_path)
    print("Total pages:", len(doc))
    
    pages_summary = []
    for i in range(len(doc)):
        page = doc[i]
        txt = page.get_text("text").strip()
        lines = [l.strip() for l in txt.split("\n") if l.strip()]
        images = page.get_images(full=True)
        pages_summary.append({
            "page": i + 1,
            "image_count": len(images),
            "lines_preview": lines[:8]
        })
    return pages_summary

data = {}
for p, n in [
    ("public/Johnson Shobowal International Gallery Catalogue.pdf", "Johnson Shobowale"),
    ("public/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf", "Muyiwa Akinwolere")
]:
    data[n] = inspect_pdf(p, n)

with open("scripts/catalogues_summary.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("Saved summary to scripts/catalogues_summary.json")
