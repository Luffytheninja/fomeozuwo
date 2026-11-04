import json
import re

# Read formatted Enifome paintings
with open('scripts/enifome_paintings_formatted.json', 'r', encoding='utf-8') as f:
    new_paintings = json.load(f)

# Read src/lib/data.ts
with open('src/lib/data.ts', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update artists array
old_artist = """  {
    name: 'Ozuwo Enifome',
    slug: 'ozuwo-enifome',
    role: 'Fine Art Photographer & Private Collector',
    period: '2016–2020 Collection',
    bio: 'Nigerian artist, photographer, and patron based in Lagos. Investigates humane encounters, pedestrian geometry, and everyday resilience. Original photographic captures reinterpreted through digital artistic treatments, issued strictly as unique 1/1 physical prints with Certificates of Authenticity.',
    category: 'photography',
    worksCount: 12,
    catalogueTitle: 'The Art of Everyday Life',
    coverImage: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp'
  }"""

new_artist = """  {
    name: 'Ozuwo Enifome',
    slug: 'ozuwo-enifome',
    role: 'Visual Artist, Painter & Fine Art Photographer',
    period: '2016–2025 Collection',
    bio: 'Nigerian multidisciplinary visual artist, painter, and fine art photographer based in Lagos. Working across mixed-media digitopainting on board and documentary fine art photography, Enifome investigates humane encounters, pedestrian geometry, coastal memory, and everyday urban resilience.',
    category: 'all',
    worksCount: 23,
    catalogueTitle: 'Paintings & Photography Catalogues',
    coverImage: '/images/paintings/enifome/oe-p001.webp'
  }"""

if old_artist in code:
    code = code.replace(old_artist, new_artist)
    print("Replaced artist definition.")
else:
    print("Warning: old_artist exact match not found; checking regex.")

# 2. Update catalogues array
old_enifome_catalogue = """  {
    id: 'ozuwo-enifome',
    artist: 'Ozuwo Enifome',
    artistSlug: 'ozuwo-enifome',
    title: 'The Art of Everyday Life',
    subtitle: 'Fine Art & Documentary Photography',
    alias: 'Humanised Landscape',
    period: '2016–2020',
    category: 'photography',
    worksCount: 12,
    contactEmail: 'fomeozuwobss@gmail.com',
    editionPolicy: 'Unique 1/1 physical-print editions with Certificate of Authenticity and Object Record',
    coverImage: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp',
    curatorialSummary: 'Twelve humane encounters across labour, belonging, solitude, companionship, and hope in urban and coastal Nigeria.'
  }"""

new_enifome_catalogues = """  {
    id: 'ozuwo-enifome-painting',
    artist: 'Ozuwo Enifome',
    artistSlug: 'ozuwo-enifome',
    title: 'Paintings and Digitopainting',
    subtitle: '11 Artworks spanning 2018–2025',
    period: '2018–2025',
    category: 'painting',
    worksCount: 11,
    contactEmail: 'fomeozuwobss@gmail.com',
    editionPolicy: 'Original physical works and unique compositions on board with Certificate of Authenticity',
    coverImage: '/images/paintings/enifome/oe-p001.webp',
    curatorialSummary: 'Eleven paintings exploring digitopainting, mixed media on board, and figuration across everyday Lagos narratives, labour, and coastal memory from 2018 to 2025.'
  },
  {
    id: 'ozuwo-enifome-photography',
    artist: 'Ozuwo Enifome',
    artistSlug: 'ozuwo-enifome',
    title: 'The Art of Everyday Life',
    subtitle: 'Fine Art & Documentary Photography',
    alias: 'Humanised Landscape',
    period: '2016–2020',
    category: 'photography',
    worksCount: 12,
    contactEmail: 'fomeozuwobss@gmail.com',
    editionPolicy: 'Unique 1/1 physical-print editions with Certificate of Authenticity and Object Record',
    coverImage: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp',
    curatorialSummary: 'Twelve humane encounters across labour, belonging, solitude, companionship, and hope in urban and coastal Nigeria.'
  }"""

if old_enifome_catalogue in code:
    code = code.replace(old_enifome_catalogue, new_enifome_catalogues)
    print("Replaced catalogues definition.")
else:
    print("Warning: old_enifome_catalogue exact match not found.")

# 3. Append the 11 paintings to projects array before the closing `];`
# Check if oe-p001 already in code
if '"id": "oe-p001"' not in code and "'id': 'oe-p001'" not in code and 'id: "oe-p001"' not in code:
    # Format new_paintings as ts objects
    paintings_ts = ",\n"
    for i, p in enumerate(new_paintings):
        paintings_ts += "  {\n"
        paintings_ts += f'    id: "{p["id"]}",\n'
        paintings_ts += f'    catalogueId: "{p["catalogueId"]}",\n'
        paintings_ts += f'    title: "{p["title"]}",\n'
        paintings_ts += f'    artist: "{p["artist"]}",\n'
        paintings_ts += f'    artistSlug: "{p["artistSlug"]}",\n'
        paintings_ts += f'    year: "{p["year"]}",\n'
        paintings_ts += f'    category: "painting",\n'
        paintings_ts += f'    collection: "{p["collection"]}",\n'
        paintings_ts += f'    medium: "{p["medium"]}",\n'
        paintings_ts += f'    dimensions: "{p["dimensions"]}",\n'
        desc_escaped = p["description"].replace('"', '\\"')
        story_escaped = p["story"].replace('"', '\\"')
        paintings_ts += f'    description: "{desc_escaped}",\n'
        paintings_ts += f'    story: "{story_escaped}",\n'
        paintings_ts += f'    provenance: "{p["provenance"]}",\n'
        paintings_ts += f'    image: "{p["image"]}",\n'
        paintings_ts += f'    aspectRatio: "{p["aspectRatio"]}",\n'
        paintings_ts += f'    edition: "{p["edition"]}"\n'
        paintings_ts += "  }"
        if i < len(new_paintings) - 1:
            paintings_ts += ",\n"

    last_bracket_idx = code.rfind('];')
    if last_bracket_idx != -1:
        code = code[:last_bracket_idx] + paintings_ts + "\n];\n"
        print("Appended 11 Enifome paintings to projects array.")
    else:
        print("Error: closing ]; not found.")

with open('src/lib/data.ts', 'w', encoding='utf-8') as f:
    f.write(code)

print("Updated src/lib/data.ts successfully!")
