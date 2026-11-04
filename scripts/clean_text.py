import json

with open('scripts/enifome_paintings_raw.json', 'r', encoding='utf-8') as f:
    items = json.load(f)

clean_items = []
for item in items:
    cid = item['cat_id']
    txt = item['text']
    # remove ligatures and strange unicode chars
    txt = txt.replace('\ufb00', 'ff').replace('\ufb01', 'fi').replace('\ufb02', 'fl').replace('\ufb03', 'ffi').replace('\ufb04', 'ffl')
    txt = txt.replace('\u2013', '-').replace('\u2014', '--').replace('\u2018', "'").replace('\u2019', "'").replace('\u201c', '"').replace('\u201d', '"')
    txt = txt.replace('\u00d7', 'x')
    
    lines = [l.strip() for l in txt.split('\n') if l.strip()]
    
    title = lines[2] if len(lines) > 2 else ''
    year = lines[3] if len(lines) > 3 else '2023'
    
    # parse medium and dimensions
    medium = 'Acrylic on digital print, mounted on board (mixed media)'
    dimensions = '36 x 36 inches'
    desc_start = 0
    for idx, l in enumerate(lines):
        if 'Dimensions' in l:
            dimensions = l.split('|')[-1].strip()
            desc_start = idx + 1
            break
            
    # skip any page number line if present
    while desc_start < len(lines) and lines[desc_start].isdigit():
        desc_start += 1
        
    full_desc = ' '.join(lines[desc_start:]).strip()
    
    clean_items.append({
        'id': cid.lower(),
        'catalogueId': cid,
        'title': title,
        'artist': 'Ozuwo Enifome',
        'artistSlug': 'ozuwo-enifome',
        'year': year,
        'category': 'painting',
        'collection': 'Paintings & Digitopainting',
        'medium': medium,
        'dimensions': dimensions,
        'description': full_desc,
        'story': full_desc,
        'provenance': 'Direct from the artist. Private Collection of Ozuwo Enifome, Lagos, Nigeria.',
        'image': item['image'],
        'aspectRatio': 'square' if '36 x 36' in dimensions or '36x36' in dimensions else ('landscape' if '48 x 36' in dimensions or '36 x 48' in dimensions or '36 x 42' in dimensions else 'portrait'),
        'edition': 'Original physical work on board with Certificate of Authenticity'
    })

with open('scripts/enifome_paintings_formatted.json', 'w', encoding='utf-8') as f:
    json.dump(clean_items, f, indent=2, ensure_ascii=False)

print(f"Successfully formatted {len(clean_items)} Enifome paintings!")
