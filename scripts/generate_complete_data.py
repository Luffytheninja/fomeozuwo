import fitz
import re
import json
import os

def clean_txt(s):
    if not s:
        return ""
    # fix ligatures
    s = s.replace('\uf001', 'fi').replace('\uf002', 'fl')
    return s.strip()

def get_aspect(dim_str):
    if not dim_str:
        return "portrait"
    # match patterns like 24 x 16 or 24 × 16 or 12 × 10
    nums = re.findall(r'(\d+(?:\.\d+)?)', dim_str)
    if len(nums) >= 2:
        try:
            h = float(nums[0])
            w = float(nums[1])
            if w > h:
                return "landscape"
            elif abs(w - h) < 1.0:
                return "square"
            else:
                return "portrait"
        except:
            pass
    return "portrait"

def get_kelani_abass():
    return [
        {
            "id": "ka-01",
            "catalogueId": "KA-01",
            "title": "Village Passage",
            "artist": "Kelani Abass",
            "artistSlug": "kelani-abass",
            "year": "2006",
            "category": "painting",
            "collection": "The Early Patronage Collection",
            "medium": "Oil on canvas",
            "dimensions": "12 × 16 in | 30.5 × 40.6 cm",
            "description": "A solitary figure gives scale to this narrow passage between closely spaced buildings under pale sunlight.",
            "story": "A solitary figure gives scale to this narrow passage between closely spaced buildings. Pale light runs through the centre of the scene, held between the orange warmth of the wall at left and a deeply shadowed roofline above. The eye follows this illuminated route towards the more distant houses. In the foreground, broken strokes of green, ochre and grey keep the ground uneven and tactile. The contrast between these open marks and the enclosing architecture gives the scene its particular intimacy: a small, ordinary route becomes a study of how light changes the experience of a place.",
            "provenance": "Artist; acquired directly by Ozuwo Enifome through a patronage arrangement; private collection, Nigeria.",
            "image": "/images/paintings/early-patronage/KA-01_village-passage.webp",
            "aspectRatio": "landscape",
            "pdfPath": "/Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf",
            "pdfFilename": "Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf"
        },
        {
            "id": "ka-02",
            "catalogueId": "KA-02",
            "title": "The Historic Gateway",
            "artist": "Kelani Abass",
            "artistSlug": "kelani-abass",
            "year": "2006",
            "category": "painting",
            "collection": "The Early Patronage Collection",
            "medium": "Oil on canvas",
            "dimensions": "16 × 12 in | 40.6 × 30.5 cm",
            "description": "The pointed opening of a tall gateway frames a second architectural view beyond, creating a passage within a passage.",
            "story": "The pointed opening of a tall gateway frames a second architectural view beyond, creating a passage within a passage. Its reddish mass rises against a pale sky, while the converging ground draws attention towards the entrance. Small figures and a motorcyclist interrupt the monument’s stillness. The composition depends on differences of scale. Architecture occupies most of the canvas, yet the people moving around its base establish the setting as an active public space.",
            "provenance": "Artist; acquired directly by Ozuwo Enifome through a patronage arrangement; private collection, Nigeria.",
            "image": "/images/paintings/early-patronage/KA-02_the-historic-gateway.webp",
            "aspectRatio": "portrait",
            "pdfPath": "/Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf",
            "pdfFilename": "Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf"
        },
        {
            "id": "ka-03",
            "catalogueId": "KA-03",
            "title": "Traditional Musicians",
            "artist": "Kelani Abass",
            "artistSlug": "kelani-abass",
            "year": "2006",
            "category": "painting",
            "collection": "The Early Patronage Collection",
            "medium": "Oil on canvas",
            "dimensions": "16 × 12 in | 40.6 × 30.5 cm",
            "description": "A musician in a vivid yellow garment commands the foreground alongside a fellow drummer, performance conveyed through rhythmic brushwork.",
            "story": "A musician in a vivid yellow garment commands the foreground, his red headwear set against the darker tones around his face. Behind him, a second performer holds a drum. Their overlapping positions draw the figures together while maintaining the prominence of the leading performer. Long strokes carry the yellow fabric down through the composition, giving the garment a movement of its own. This broad handling contrasts with the concentrated dark marks of the faces and instruments.",
            "provenance": "Artist; acquired directly by Ozuwo Enifome through a patronage arrangement; private collection, Nigeria.",
            "image": "/images/paintings/early-patronage/KA-03_traditional-musicians.webp",
            "aspectRatio": "portrait",
            "pdfPath": "/Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf",
            "pdfFilename": "Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf"
        },
        {
            "id": "ka-04",
            "catalogueId": "KA-04",
            "title": "Courtyard with Chickens",
            "artist": "Kelani Abass",
            "artistSlug": "kelani-abass",
            "year": "2006",
            "category": "painting",
            "collection": "The Early Patronage Collection",
            "medium": "Oil on canvas",
            "dimensions": "12 × 16 in | 30.5 × 40.6 cm",
            "description": "A sunlit patch of ground opens between weathered buildings, with chickens providing subtle points of domestic movement.",
            "story": "A sunlit patch of ground opens between weathered buildings, with chickens providing small points of movement across the yard. Pink and mauve walls meet cooler passages of blue and grey, while green touches at the edges interrupt the earthen palette. The courtyard is organised through adjoining planes rather than fine architectural detail. Shadows break across the foreground, and the brighter ground leads the eye inward.",
            "provenance": "Artist; acquired directly by Ozuwo Enifome through a patronage arrangement; private collection, Nigeria.",
            "image": "/images/paintings/early-patronage/KA-04_courtyard-with-chickens.webp",
            "aspectRatio": "landscape",
            "pdfPath": "/Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf",
            "pdfFilename": "Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf"
        },
        {
            "id": "ka-05",
            "catalogueId": "KA-05",
            "title": "Rooftops and Settlement",
            "artist": "Kelani Abass",
            "artistSlug": "kelani-abass",
            "year": "2007",
            "category": "painting",
            "collection": "The Early Patronage Collection",
            "medium": "Oil on canvas",
            "dimensions": "26 × 36 in | 66.0 × 91.4 cm",
            "description": "Looking across interlocking patterns of rooftops towards an open horizon, balancing architectural density with diffuse atmospheric light.",
            "story": "The viewpoint looks across a close pattern of roofs towards an open horizon. Muted reds and dark, slanting roof planes crowd the foreground, while softer greens and greys carry the settlement into the distance. Above, a broad sky introduces a slower, more diffuse movement. The composition balances density below with openness above. Its interest lies in the meeting of built and atmospheric space: the roofs are distinct but interlocking, while the distant landscape dissolves into light.",
            "provenance": "Artist; acquired directly by Ozuwo Enifome through a patronage arrangement; private collection, Nigeria.",
            "image": "/images/paintings/early-patronage/KA-05_rooftops-and-settlement.webp",
            "aspectRatio": "landscape",
            "pdfPath": "/Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf",
            "pdfFilename": "Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf"
        },
        {
            "id": "ka-06",
            "catalogueId": "KA-06",
            "title": "The Quiet Road",
            "artist": "Kelani Abass",
            "artistSlug": "kelani-abass",
            "year": "2007",
            "category": "painting",
            "collection": "The Early Patronage Collection",
            "medium": "Oil and fabric collage on stretched canvas",
            "dimensions": "42 × 36 in | 106.7 × 91.4 cm",
            "description": "A road curves into a settlement beneath a broad canopy of trees, layered with tactile khaki cloth applied to the foreground.",
            "story": "A road curves into a settlement beneath a broad canopy of trees. Dark foliage gathers above the warm ground, with patches of sky opening between the branches. Buildings and a small distant figure establish scale and draw attention towards the bend in the road. The collector describes coarse khaki cloth applied sparingly to the lower foreground before priming and overpainting in oil. This treatment gives the ground a material texture alongside its painted colour.",
            "provenance": "Artist; acquired directly by Ozuwo Enifome through a patronage arrangement; private collection, Nigeria.",
            "image": "/images/paintings/early-patronage/KA-06_the-quiet-road.webp",
            "aspectRatio": "portrait",
            "pdfPath": "/Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf",
            "pdfFilename": "Kelani_Abass_Early_Patronage_Collection_2006-2007.pdf"
        }
    ]

def get_ozuwo_enifome():
    # 12 authenticated photographs from Ozuwo_Enifome_Humanised_Landscape_Gallery_Catalogue.pdf
    works = [
        ("OE-PH001", "The Hopelessness of Hope", "2016", "30 × 22 in", "portrait",
         "Two figures emerging through greys; endurance and quiet tension in an uncertain moment.",
         "Two figures come forward through a haze of greys. One remains upright; the other seems to fold into the weight of what is being carried. Their outlines are partly swallowed by the surrounding marks, making it difficult to separate the people from the hardship that the picture suggests. The emotional force of this work lies in that uncertainty. Enifome does not turn suffering into spectacle or offer the viewer an easy resolution. Instead, the almost erased faces and heavy tonal passages ask us to consider what it means to see someone in distress and still know so little about their life. The title carries a painful contradiction: hope survives here, but it is being tested.",
         "/images/photography/art-of-everyday-life/OE-PH001_the-hopelessness-of-hope.webp"),
        ("OE-PH002", "Three is Company", "2016", "16 × 22 in", "landscape",
         "An understated portrait of companionship, fatigue, and the comfort of simply having others nearby.",
         "Three men sit shoulder to shoulder, yet each seems enclosed in his own thoughts. Their pale clothing links them visually, while the different directions of their heads and hands give the photograph a quiet, unsettled rhythm. There is warmth in their closeness, but Enifome allows silence to remain part of the gathering. The picture recognises a familiar human truth: being together does not mean experiencing the same moment. By softening the background into flecks and washes, he gives the men room to be both a group and individuals.",
         "/images/photography/art-of-everyday-life/OE-PH002_three-is-company.webp"),
        ("OE-PH003", "Untitled", "2016", "22 × 16 in", "portrait",
         "A quiet portrait of rest, balancing the weight of daily labour with temporary respite.",
         "A seated figure rests against a mottled wall, shoulders rounded in an attitude of patience or exhaustion. The features remain indistinct, allowing posture to carry the emotional charge of the scene. What might have been a casual break in a working day becomes a study of stillness. The wall behind the subject carries a history of its own in stains, cracks and peeled surfaces, mirroring the endurance of the body before it.",
         "/images/photography/art-of-everyday-life/OE-PH003_untitled.webp"),
        ("OE-PH004", "Friends", "2018", "22 × 16 in", "portrait",
         "Companionship reduced to essentials: presence, proximity, and an ease that requires no performance.",
         "Companionship is here reduced to essentials: presence, proximity and an ease that needs no performance. Two figures sit together against a field of charcoal-like marks, their bodies turned slightly towards each other in an unspoken agreement of trust. Enifome withholds narrative detail. We do not learn where they are or what has brought them together. What remains is the quality of their attention: the way one leans slightly inward, the shared rhythm of their quietness.",
         "/images/photography/art-of-everyday-life/OE-PH004_friends.webp"),
        ("OE-PH005", "The Contrast of Life I", "2018", "16 × 22 in", "landscape",
         "Vivid yellow set against an inward posture, reminding us that colour alone does not describe a life.",
         "A burst of bright yellow dominates the centre of the image, carried by fabric that catches the eye before anything else is understood. Beneath this brilliant colour, however, the figure's posture suggests fatigue, hesitation or heavy thought. Enifome uses the contrast between outer brightness and inner withdrawal to ask a simple but uncomfortable question: how often do we mistake vibrant surfaces for ease? The photograph refuses that confusion.",
         "/images/photography/art-of-everyday-life/OE-PH005_the-contrast-of-life-1.webp"),
        ("OE-PH006", "Market Woman", "2018", "22 × 16 in", "portrait",
         "A monument of daily commerce, quiet authority, and enduring market life.",
         "Standing or seated among the tools of her trade, a market trader holds our attention with an air of settled authority. The surrounds are treated with painterly restraint, keeping the focus squarely on her posture, the tilt of her head and the practical details of her working environment. Enifome avoids both romanticising market labour and reducing it to mere hardship. Instead, he presents a woman who belongs entirely to her space, whose presence commands respect without demanding it.",
         "/images/photography/art-of-everyday-life/OE-PH006_market-woman.webp"),
        ("OE-PH007", "The Contrast of Life II", "2018", "16 × 22 in", "landscape",
         "Geometric light cuts across human form, exploring physical space and social complexity.",
         "Sharp diagonals of light and shadow divide the picture plane, cutting across walls, ground and human figures alike. The contrast here is spatial as well as social: bright sunlight creates geometric shapes that compete with the organic forms of the people passing through them. Enifome shows how urban spaces impose their own patterns on daily life. Figures must negotiate these sharp divisions, stepping from deep shadow into blinding light.",
         "/images/photography/art-of-everyday-life/OE-PH007_the-contrast-of-life-2.webp"),
        ("OE-PH008", "Fulani Woman", "2018", "22 × 16 in", "portrait",
         "Grace and poise rendered with monumental dignity amidst transient surroundings.",
         "A dignified portrait capturing grace, poise, and tradition. The woman carries herself with an upright calm that sets her apart from any incidental distraction in the frame. Her traditional attire and ornaments are rendered with careful attention, yet the photograph is not an ethnographic specimen; it is an encounter between two people, photographer and sitter, based on mutual regard.",
         "/images/photography/art-of-everyday-life/OE-PH008_fulani-woman.webp"),
        ("OE-PH009", "Light at the End of the Tunnel", "2018", "22 × 16 in", "portrait",
         "A human silhouette framed by architecture, turning a mundane passageway into an inquiry into hope.",
         "A lone figure moves towards an opening where light pours in, silhouetted against dark enclosing walls. The composition is stark, almost architectural in its simplicity. Enifome takes an ancient visual metaphor—the passage from darkness into light—and grounds it in the physical reality of a Nigerian pedestrian underpass or corridor. The figure's identity is obscured, making the movement outward universal.",
         "/images/photography/art-of-everyday-life/OE-PH009_light-at-the-end-of-the-tunnel.webp"),
        ("OE-PH010", "Face to Face Conversation", "2020", "16 × 22 in", "landscape",
         "Direct human engagement across a table, an exchange where listening is as active as speech.",
         "Two people lean across a narrow barrier, caught in the middle of an exchange that requires their complete attention. The background falls away into soft, washed tones, leaving only the gestures of hands, the angle of heads and the space between their faces. Enifome captures the choreography of conversation: the pause before responding, the physical weight of hearing what is said.",
         "/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp"),
        ("OE-PH011", "Kids Washing by the Banks", "2020", "16 × 22 in", "landscape",
         "Youth, water, and camaraderie along the Lagos shoreline, transforming chore into play.",
         "Children gather at the water’s edge, where daily washing dissolves into play. Reflections ripple across the water, mirroring their small bodies and multiplying their movements. Enifome treats the shoreline as a liminal space: between domestic obligation and childhood freedom, between the solid earth and the fluid lagoon. There is lightness here, but also a tender reminder of how much of life is lived in public view.",
         "/images/photography/art-of-everyday-life/OE-PH011_kids-washing-by-the-banks.webp"),
        ("OE-PH012", "Argungu Sprint", "2020", "16 × 22 in", "landscape",
         "Kinetic power and communal rush of fishermen racing toward the water at the historic Argungu festival.",
         "Bodies surge forward in a wave of kinetic energy, racing toward the riverbank during the historic Argungu fishing festival. Feet kick up dust and water; muscles strain under the excitement of the sprint. Enifome captures the collective heartbeat of the moment, where individual identity gives way to communal purpose. The artistic treatment enhances the sense of speed, turning the crowd into a dynamic current of life.",
         "/images/photography/art-of-everyday-life/OE-PH012_argungu-sprint.webp")
    ]
    
    results = []
    for cat_id, title, yr, dims, asp, desc, story, img in works:
        results.append({
            "id": cat_id.lower(),
            "catalogueId": cat_id,
            "title": title,
            "artist": "Ozuwo Enifome",
            "artistSlug": "ozuwo-enifome",
            "year": yr,
            "category": "photography",
            "collection": "The Art of Everyday Life",
            "medium": "Original photography; artistically interpreted digital image",
            "edition": "Unique 1/1 physical-print edition",
            "dimensions": dims,
            "description": desc,
            "story": story,
            "provenance": "Original work by Ozuwo Enifome; issued as unique 1/1 physical fine-art print with signed Certificate of Authenticity and Object Record.",
            "image": img,
            "aspectRatio": asp,
            "pdfPath": "/Ozuwo_Enifome_Humanised_Landscape_Gallery_Catalogue.pdf",
            "pdfFilename": "Ozuwo_Enifome_Humanised_Landscape_Gallery_Catalogue.pdf"
        })
    return results

def get_akinwolere_artworks():
    doc = fitz.open("public/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf")
    results = []
    for p in range(5, 18):
        page = doc[p]
        text = clean_txt(page.get_text("text"))
        lines = [l.strip() for l in text.split("\n") if l.strip()]
        
        m_id = re.search(r'(MA-\d+)\s*\|\s*(\d{4})', text)
        cat_id = m_id.group(1) if m_id else f"MA-{p-4:02d}"
        year = m_id.group(2) if m_id else "2013"
        
        idx = -1
        for i, l in enumerate(lines):
            if cat_id in l:
                idx = i
                break
                
        title = "Untitled"
        medium = "Acrylic on paper" if year == "2009" else "Gouache and ink on paper"
        dimensions = "12 × 10 in (30.5 × 25.4 cm)" if year == "2009" else "29 × 20 in (73.7 × 50.8 cm)"
        story_lines = []
        
        if idx != -1 and idx + 3 < len(lines):
            # Line after artist name is title
            cand_title = lines[idx + 2]
            if cand_title != "MUYIWA AKINWOLERE" and not re.match(r'^\d{4}$', cand_title):
                title = cand_title
            
            # Look for line with medium/dimensions
            for l in lines[idx + 3:idx + 7]:
                if any(m_word in l.lower() for m_word in ["acrylic", "gouache", "ink", "paper"]):
                    medium = l
                if "in" in l and ("(" in l or "×" in l or "x" in l):
                    dimensions = l
                    
            # Story
            start_story = False
            for l in lines[idx + 4:]:
                if "Collection:" in l or "Object particulars" in l or "See Collection" in l:
                    break
                if l in [title, medium, dimensions, year]:
                    continue
                story_lines.append(l)
                
        story = " ".join(story_lines)
        if not story:
            story = f"A work from Muyiwa Akinwolere's {year} series exploring figuration, line, and the living surface."
            
        desc = story[:160] + "..." if len(story) > 160 else story
        slug = cat_id.lower()
        image_path = f"/images/collections/akinwolere/{slug}.webp"
        aspect = get_aspect(dimensions)
        
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
            "provenance": "Collection of Ozuwo Enifome, Nigeria. Acquired directly from the artist.",
            "image": image_path,
            "aspectRatio": aspect,
            "pdfPath": "/Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf",
            "pdfFilename": "Muyiwa_Akinwolere_International_Gallery_Catalogue_Review.pdf"
        })
    return results

def get_shobowale_artworks():
    doc = fitz.open("public/Johnson Shobowal International Gallery Catalogue.pdf")
    results = []
    
    for p in range(len(doc)):
        page = doc[p]
        text = clean_txt(page.get_text("text"))
        if "ILLUSTRATED ARTWORK ENTRY" in text and "JBS-" in text:
            m_id = re.search(r'(JBS-\d+)', text)
            if not m_id:
                continue
            cat_id = m_id.group(1)
            
            # Extract title and year
            # Pattern: Title (Year)
            m_ty = re.search(r'(?:JBS-\d+\s*\n\s*)([^\n]+?)\s*\((\d{4})\)', text)
            title = "Untitled"
            year = "2014"
            if m_ty:
                title = m_ty.group(1).strip()
                year = m_ty.group(2).strip()
                
            # Medium and dimensions
            # Look for lines containing medium info and dimensions with "inches"
            med_dim_pattern = re.search(r'((?:Acrylic|Mixed media|Metal foil|Pastel)[^\n|]+)\|\s*([^\n]+(?:inches|in))', text)
            medium = "Mixed media on canvas"
            dimensions = "24 × 36 inches"
            if med_dim_pattern:
                medium = med_dim_pattern.group(1).replace("NIGERIA", "").strip()
                dimensions = med_dim_pattern.group(2).strip()
            else:
                # Fallback search
                m_dim = re.search(r'\|\s*([\d\s\.\,\×\x78\-]+(?:inches|in))', text)
                if m_dim:
                    dimensions = m_dim.group(1).strip()
                m_med = re.search(r'(Acrylic[^\n|]+|Mixed media[^\n|]+|Metal foil[^\n|]+|Pastel[^\n|]+)', text)
                if m_med:
                    medium = m_med.group(1).replace("NIGERIA", "").strip()
                    
            # Story: text between medium/dimensions and footer
            # Strip header
            cleaned_page = re.sub(r'^\d+\s*\n', '', text)
            cleaned_page = re.sub(r'ILLUSTRATED ARTWORK ENTRY\s*\n', '', cleaned_page)
            cleaned_page = re.sub(r'JBS-\d+\s*\n', '', cleaned_page)
            if title in cleaned_page:
                cleaned_page = cleaned_page.split(title, 1)[-1]
            if dimensions in cleaned_page:
                cleaned_page = cleaned_page.split(dimensions, 1)[-1]
                
            # Remove footer
            for stopper in ["JOHNSON BABATUNDE", "PRIVATE COLLECTION", "PROVENANCE:", "CERTIFICATE", "ILLUSTRATED"]:
                if stopper in cleaned_page:
                    cleaned_page = cleaned_page.split(stopper, 1)[0]
                    
            story_lines = [l.strip() for l in cleaned_page.split("\n") if l.strip() and not l.isdigit()]
            story = " ".join(story_lines)
            story = re.sub(r'\s+', ' ', story).strip()
            
            # Clean up residual artifacts
            story = re.sub(r'^\|\s*', '', story)
            story = re.sub(r'accompanying document.*$', '', story).strip()
            
            if not story or len(story) < 20:
                story = f"A work from Johnson Babatunde Shobowale's {year} collection exploring human presence, rhythm, and material texture."
                
            desc = story[:160] + "..." if len(story) > 160 else story
            slug = cat_id.lower()
            image_path = f"/images/collections/shobowale/{slug}.webp"
            aspect = get_aspect(dimensions)
            
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
                "provenance": "Acquired directly from the artist; collection of Ozuwo Enifome, Nigeria. Accompanied by signed artist Certificate of Authenticity.",
                "image": image_path,
                "aspectRatio": aspect,
                "pdfPath": "/Johnson Shobowal International Gallery Catalogue.pdf",
                "pdfFilename": "Johnson Shobowal International Gallery Catalogue.pdf"
            })
            
    # Deduplicate
    unique = []
    seen = set()
    for r in results:
        if r["catalogueId"] not in seen:
            seen.add(r["catalogueId"])
            unique.append(r)
    return unique

def main():
    ka = get_kelani_abass()
    oe = get_ozuwo_enifome()
    ma = get_akinwolere_artworks()
    sh = get_shobowale_artworks()
    
    all_works = ka + ma + sh + oe
    print(f"Total works: {len(all_works)}")
    print(f"  Kelani Abass: {len(ka)}")
    print(f"  Muyiwa Akinwolere: {len(ma)}")
    print(f"  Johnson Babatunde Shobowale: {len(sh)}")
    print(f"  Ozuwo Enifome: {len(oe)}")
    
    with open("scripts/all_projects.json", "w", encoding="utf-8") as f:
        json.dump(all_works, f, indent=2, ensure_ascii=False)
    print("Saved all works to scripts/all_projects.json")

if __name__ == "__main__":
    main()
