import fitz
import re
import json
import os

# Clean text from weird ligature characters like \uf001, \uf002
def clean_str(s):
    if not s:
        return ""
    return s.replace('\uf001', 'fi').replace('\uf002', 'fl').strip()

def parse_akinwolere_artworks():
    doc = fitz.open("public/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf")
    results = []
    
    # MA-01 to MA-13 are on pages 6 to 18 (index 5 to 17)
    for p in range(5, 18):
        page = doc[p]
        text = clean_str(page.get_text("text"))
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        
        # Match MA-xx
        m_id = re.search(r'(MA-\d+)\s*\|\s*(\d{4})', text)
        cat_id = m_id.group(1) if m_id else f"MA-{p-4:02d}"
        year = m_id.group(2) if m_id else "2013"
        
        # Find index of line matching cat_id | year
        idx_header = -1
        for i, l in enumerate(lines):
            if cat_id in l:
                idx_header = i
                break
        
        # Structure after header:
        # lines[idx_header + 1]: Artist name ('MUYIWA AKINWOLERE')
        # lines[idx_header + 2]: Title
        # lines[idx_header + 3]: Year
        # lines[idx_header + 4]: Medium
        # lines[idx_header + 5]: Dimensions
        title = "Untitled"
        medium = "Acrylic on paper"
        dimensions = "12 × 10 in (30.5 × 25.4 cm)"
        story_lines = []
        
        if idx_header != -1 and idx_header + 5 < len(lines):
            title = lines[idx_header + 2]
            # sometimes title is followed by year
            medium = lines[idx_header + 4]
            dimensions = lines[idx_header + 5]
            
            # Story starts at idx_header + 6 until "Collection:" or "Object particulars"
            for l in lines[idx_header + 6:]:
                if "Collection:" in l or "Object particulars" in l or "See Collection" in l:
                    break
                story_lines.append(l)
        
        story = " ".join(story_lines)
        if not story:
            story = f"A work from Muyiwa Akinwolere's {year} series exploring figuration, line, and the living surface."
            
        desc = story[:160] + "..." if len(story) > 160 else story
        
        slug = cat_id.lower()
        image_path = f"/images/collections/akinwolere/{slug}.webp"
        
        # Determine aspect ratio
        aspect = "portrait"
        if "×" in dimensions:
            parts = dimensions.split("×")
            try:
                h = float(re.findall(r'\d+', parts[0])[0])
                w = float(re.findall(r'\d+', parts[1])[0])
                if w > h:
                    aspect = "landscape"
                elif abs(w - h) < 1:
                    aspect = "square"
            except:
                pass
                
        results.append({
            "id": slug,
            "catalogueId": cat_id,
            "title": title,
            "artist": "Muyiwa Akinwolere",
            "artistSlug": "muyiwa-akinwolere",
            "year": year,
            "category": "painting",
            "collection": "Figures, Line & the Living Surface",
            "medium": medium,
            "dimensions": dimensions,
            "description": desc,
            "story": story,
            "provenance": "Collection: Ozuwo Enifome, Nigeria. Direct acquisition.",
            "image": image_path,
            "aspectRatio": aspect,
            "pdfPath": "/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf",
            "pdfFilename": "Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf"
        })
    return results

def parse_shobowale_artworks():
    doc = fitz.open("public/Johnson Shobowal International Gallery Catalogue.pdf")
    results = []
    
    # Collect pages that have artwork illustrations
    for p in range(len(doc)):
        page = doc[p]
        text = clean_str(page.get_text("text"))
        if "ILLUSTRATED ARTWORK ENTRY" in text and "JBS-" in text:
            lines = [l.strip() for l in text.split("\n") if l.strip()]
            
            m_id = re.search(r'(JBS-\d+)', text)
            cat_id = m_id.group(1) if m_id else None
            if not cat_id:
                continue
                
            # Find the line containing JBS-xxx
            jbs_idx = -1
            for i, l in enumerate(lines):
                if cat_id in l:
                    jbs_idx = i
                    break
                    
            title = "Untitled"
            year = "2014"
            medium = "Mixed media on canvas"
            dimensions = "24 × 36 inches"
            story_lines = []
            
            if jbs_idx != -1 and jbs_idx + 1 < len(lines):
                title_line = lines[jbs_idx + 1]
                # Format: Title (Year)
                m_title = re.search(r'^(.*?)\s*\((\d{4})\)', title_line)
                if m_title:
                    title = m_title.group(1).strip()
                    year = m_title.group(2).strip()
                else:
                    title = title_line
                    
                # Next line is usually medium | dimensions
                if jbs_idx + 2 < len(lines):
                    med_dim_line = lines[jbs_idx + 2]
                    # Sometimes medium and dimensions span 2 lines
                    if "|" in med_dim_line:
                        parts = med_dim_line.split("|")
                        medium = parts[0].strip()
                        dimensions = parts[1].strip()
                        story_start = jbs_idx + 3
                    else:
                        # check if next line has | or continuation
                        if jbs_idx + 3 < len(lines) and "|" in lines[jbs_idx + 3]:
                            parts = lines[jbs_idx + 3].split("|")
                            medium = (med_dim_line + " " + parts[0]).strip()
                            dimensions = parts[1].strip()
                            story_start = jbs_idx + 4
                        else:
                            medium = med_dim_line
                            story_start = jbs_idx + 3
                            
                    # Read story until standard footer keywords
                    for l in lines[story_start:]:
                        if any(kw in l for kw in ["JOHNSON BABATUNDE", "PRIVATE COLLECTION", "PROVENANCE:", "CERTIFICATE", "ILLUSTRATED"]):
                            continue
                        story_lines.append(l)
                        
            story = " ".join(story_lines)
            if not story:
                story = f"A work from Johnson Babatunde Shobowale's {year} collection exploring human presence, rhythm, and material texture."
            desc = story[:160] + "..." if len(story) > 160 else story
            
            slug = cat_id.lower()
            image_path = f"/images/collections/shobowale/{slug}.webp"
            
            # Determine aspect ratio
            aspect = "portrait"
            if "×" in dimensions:
                parts = dimensions.split("×")
                try:
                    h = float(re.findall(r'\d+', parts[0])[0])
                    w = float(re.findall(r'\d+', parts[1])[0])
                    if w > h:
                        aspect = "landscape"
                    elif abs(w - h) < 1:
                        aspect = "square"
                except:
                    pass
                    
            results.append({
                "id": slug,
                "catalogueId": cat_id,
                "title": title,
                "artist": "Johnson Babatunde Shobowale",
                "artistSlug": "johnson-shobowale",
                "year": year,
                "category": "painting",
                "collection": "Works from a Private Nigerian Collection (2013–2024)",
                "medium": medium,
                "dimensions": dimensions,
                "description": desc,
                "story": story,
                "provenance": "Acquired directly from the artist; collection of Ozuwo Enifome, Nigeria.",
                "image": image_path,
                "aspectRatio": aspect,
                "pdfPath": "/Johnson Shobowal International Gallery Catalogue.pdf",
                "pdfFilename": "Johnson Shobowal International Gallery Catalogue.pdf"
            })
            
    # Deduplicate by catalogueId just in case
    unique_results = []
    seen = set()
    for r in results:
        if r["catalogueId"] not in seen:
            seen.add(r["catalogueId"])
            unique_results.append(r)
    return unique_results

if __name__ == "__main__":
    ak = parse_akinwolere_artworks()
    sh = parse_shobowale_artworks()
    print(f"Parsed {len(ak)} Akinwolere artworks")
    print(f"Parsed {len(sh)} Shobowale artworks")
    
    with open("scripts/full_ak.json", "w", encoding="utf-8") as f:
        json.dump(ak, f, indent=2, ensure_ascii=False)
    with open("scripts/full_sh.json", "w", encoding="utf-8") as f:
        json.dump(sh, f, indent=2, ensure_ascii=False)
