import json

with open("scripts/all_projects.json", "r", encoding="utf-8") as f:
    projects = json.load(f)

# Detail crops for key works
crops_dict = {
    "ka-01": [
        {"label": "Passage Light & Shadow", "style": "object-[50%_45%] scale-[2.0]"},
        {"label": "Foreground Ochre Brushwork", "style": "object-[45%_80%] scale-[2.2]"}
    ],
    "ka-02": [
        {"label": "Gateway Arch & Sky", "style": "object-[50%_30%] scale-[2.0]"},
        {"label": "Pedestrian & Motorcyclist Scale", "style": "object-[50%_75%] scale-[2.3]"}
    ],
    "ka-03": [
        {"label": "Yellow Garment Brushstrokes", "style": "object-[50%_60%] scale-[2.1]"},
        {"label": "Performer Expression Detail", "style": "object-[45%_25%] scale-[2.2]"}
    ],
    "ka-04": [
        {"label": "Sunlit Yard & Chickens", "style": "object-[50%_65%] scale-[2.2]"},
        {"label": "Mauve & Grey Wall Planes", "style": "object-[75%_35%] scale-[1.8]"}
    ],
    "ka-05": [
        {"label": "Slanting Roof Patterns", "style": "object-[40%_65%] scale-[2.0]"},
        {"label": "Atmospheric Horizon & Sky", "style": "object-[60%_25%] scale-[1.8]"}
    ],
    "ka-06": [
        {"label": "Khaki Fabric Collage Texture", "style": "object-[50%_80%] scale-[2.3]"},
        {"label": "Tree Canopy & Light Opening", "style": "object-[50%_25%] scale-[1.8]"}
    ],
    "oe-ph001": [
        {"label": "Tonal Grey Dissolution", "style": "object-[50%_35%] scale-[2.2]"},
        {"label": "Submerged Figure Outline", "style": "object-[55%_70%] scale-[1.8]"}
    ],
    "oe-ph002": [
        {"label": "Shoulder-to-Shoulder Posture", "style": "object-[50%_55%] scale-[2.0]"},
        {"label": "Fleck and Wash Dissolution", "style": "object-[20%_25%] scale-[1.8]"}
    ],
    "oe-ph005": [
        {"label": "Brilliant Ochre Yellow Field", "style": "object-[50%_45%] scale-[2.0]"},
        {"label": "Inward Contemplative Posture", "style": "object-[45%_30%] scale-[2.2]"}
    ],
    "oe-ph010": [
        {"label": "Attentive Listening Choreography", "style": "object-[60%_35%] scale-[2.1]"},
        {"label": "Interpersonal Spatial Gap", "style": "object-[50%_55%] scale-[1.8]"}
    ],
    "ma-05": [
        {"label": "Enlarged Central Figure & Hand", "style": "object-[50%_35%] scale-[2.0]"},
        {"label": "Patterned Garment Layering", "style": "object-[50%_75%] scale-[2.2]"}
    ],
    "jbs-002": [
        {"label": "Sawdust-Primed Incised Texture", "style": "object-[50%_60%] scale-[2.2]"},
        {"label": "Three Royal Sister Queens", "style": "object-[50%_30%] scale-[2.0]"}
    ]
}

for p in projects:
    if p["id"] in crops_dict:
        p["detailCrops"] = crops_dict[p["id"]]
    # Strip any public pdf references to preserve owner privacy
    p.pop("pdfPath", None)
    p.pop("pdfFilename", None)

ts_code = '''export interface DetailCrop {
  label: string;
  style: string;
}

export interface Project {
  id: string;
  catalogueId?: string;
  title: string;
  artist: string;
  artistSlug: string;
  year: string;
  category: 'photography' | 'painting';
  collection: string;
  medium: string;
  dimensions: string;
  description: string;
  story: string;
  provenance?: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  detailCrops?: DetailCrop[];
  edition?: string;
}

export interface Artist {
  name: string;
  slug: string;
  role: string;
  period: string;
  bio: string;
  category: 'painting' | 'photography' | 'all';
  worksCount: number;
  catalogueTitle: string;
  coverImage: string;
}

export interface Catalogue {
  id: string;
  artist: string;
  artistSlug: string;
  title: string;
  subtitle: string;
  alias?: string;
  period: string;
  category: 'painting' | 'photography';
  worksCount: number;
  contactEmail: string;
  requestSubject: string;
  accessPolicy: string;
  editionPolicy: string;
  coverImage: string;
  curatorialSummary: string;
}

export const artists: Artist[] = [
  {
    name: 'Kelani Abass',
    slug: 'kelani-abass',
    role: 'Painter & Mixed Media Artist',
    period: '2006–2007 Collection',
    bio: 'Born 1979 in Abeokuta, Nigeria. Studied painting at Yaba College of Technology, graduating with distinction in 2007 with the Yusuf Grillo Award. Represented in the collections of MoMA New York and the Art Gallery of Ontario. Works in this collection represent direct student-era patronage by Ozuwo Enifome.',
    category: 'painting',
    worksCount: 6,
    catalogueTitle: 'The Early Patronage Collection',
    coverImage: '/images/paintings/early-patronage/KA-03_traditional-musicians.webp'
  },
  {
    name: 'Muyiwa Akinwolere',
    slug: 'muyiwa-akinwolere',
    role: 'Contemporary Painter & Draughtsman',
    period: '2009 & 2013 Collection',
    bio: 'Born 1976, Nigeria. Studied Fine Art at Obafemi Awolowo University, Ile-Ife, shaped by Osogbo artistic traditions. Renowned for liquid line, antique ink, gouache, and satirical figuration. Exhibited at Thought Pyramid Art Centre, Whitespace Gallery, French Institute, and Lagos Biennial.',
    category: 'painting',
    worksCount: 13,
    catalogueTitle: 'Figures, Line & the Living Surface',
    coverImage: '/images/collections/akinwolere/ma-05.webp'
  },
  {
    name: 'Johnson Babatunde Shobowale',
    slug: 'johnson-shobowale',
    role: 'Master Painter & Mixed-Media Pioneer',
    period: '2013–2024 Collection',
    bio: 'Born 1970, Nigeria. Practice moves between symbolic abstraction, figurative expression, and material experimentation across acrylic, sawdust-prepared surfaces, metal foil, and textiles. Formed through a longstanding direct collecting relationship spanning 2012–2024.',
    category: 'painting',
    worksCount: 36,
    catalogueTitle: 'Works from a Private Nigerian Collection',
    coverImage: '/images/collections/shobowale/jbs-002.webp'
  },
  {
    name: 'Ozuwo Enifome',
    slug: 'ozuwo-enifome',
    role: 'Fine Art Photographer & Private Collector',
    period: '2016–2020 Collection',
    bio: 'Nigerian artist, photographer, and patron based in Lagos. Investigates humane encounters, pedestrian geometry, and everyday resilience. Original photographic captures reinterpreted through digital artistic treatments, issued strictly as unique 1/1 physical prints with Certificates of Authenticity.',
    category: 'photography',
    worksCount: 12,
    catalogueTitle: 'The Art of Everyday Life',
    coverImage: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp'
  }
];

export const catalogues: Catalogue[] = [
  {
    id: 'kelani-abass',
    artist: 'Kelani Abass',
    artistSlug: 'kelani-abass',
    title: 'The Early Patronage Collection',
    subtitle: 'Six paintings from the collection of Ozuwo Enifome, Nigeria',
    period: '2006–2007',
    category: 'painting',
    worksCount: 6,
    contactEmail: 'fomeozuwobss@gmail.com',
    requestSubject: 'Catalogue Inquiry: Kelani Abass Early Patronage Collection',
    accessPolicy: 'Private catalogue dossier available to curators, institutions, and collectors upon request',
    editionPolicy: 'Original physical paintings, direct student patronage acquisition',
    coverImage: '/images/paintings/early-patronage/KA-03_traditional-musicians.webp',
    curatorialSummary: 'Six early paintings from the period around Kelani Abass’s graduation with distinction from Yaba College of Technology, capturing architecture, performance, and the everyday.'
  },
  {
    id: 'muyiwa-akinwolere',
    artist: 'Muyiwa Akinwolere',
    artistSlug: 'muyiwa-akinwolere',
    title: 'Figures, Line & the Living Surface',
    subtitle: 'Selected works from a Private Nigerian Collection',
    period: '2009 & 2013',
    category: 'painting',
    worksCount: 13,
    contactEmail: 'fomeozuwobss@gmail.com',
    requestSubject: 'Catalogue Inquiry: Muyiwa Akinwolere Collection',
    accessPolicy: 'Private catalogue dossier available to curators, institutions, and collectors upon request',
    editionPolicy: 'Original works on paper, direct collector acquisition',
    coverImage: '/images/collections/akinwolere/ma-05.webp',
    curatorialSummary: 'Thirteen works across gouache, acrylic, and ink exploring figuration, liquid line, and abstract invention in the Osogbo/Ife lineage.'
  },
  {
    id: 'johnson-shobowale',
    artist: 'Johnson Babatunde Shobowale',
    artistSlug: 'johnson-shobowale',
    title: 'Works from a Private Nigerian Collection',
    subtitle: '36 Artworks spanning 2013–2024',
    period: '2013–2024',
    category: 'painting',
    worksCount: 36,
    contactEmail: 'fomeozuwobss@gmail.com',
    requestSubject: 'Catalogue Inquiry: Johnson Babatunde Shobowale Collection',
    accessPolicy: 'Private catalogue dossier available to curators, institutions, and collectors upon request',
    editionPolicy: 'Original paintings, mixed media, and relief constructions with artist Certificates of Authenticity',
    coverImage: '/images/collections/shobowale/jbs-002.webp',
    curatorialSummary: 'A 12-year retrospective of direct patronage exploring sawdust-prepared surfaces, metal-foil reliefs, pastel studies, and cultural memory.'
  },
  {
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
    requestSubject: 'Catalogue Inquiry: The Art of Everyday Life Photography',
    accessPolicy: 'Private catalogue dossier available to curators, institutions, and collectors upon request',
    editionPolicy: 'Unique 1/1 physical-print editions with Certificate of Authenticity and Object Record',
    coverImage: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp',
    curatorialSummary: 'Twelve humane encounters across labour, belonging, solitude, companionship, and hope in urban and coastal Nigeria.'
  }
];

export const photographyCatalogue = {
  title: 'The Art of Everyday Life',
  subtitle: 'Fine Art & Documentary Photography',
  alias: 'Humanised Landscape',
  artist: 'Ozuwo Enifome',
  period: '2016–2020',
  contactEmail: 'fomeozuwobss@gmail.com',
  editionPolicy: 'Unique 1/1 physical-print editions',
  curatorialEssay: {
    title: 'The lives within the frame',
    paragraphs: [
      'There is a kind of encounter that lasts only a few seconds but refuses to disappear from memory. Someone bends beneath the weight of a thought. Two friends sit without speaking. A figure stands in a doorway, separated from the world by a thin rectangle of light. Ozuwo Enifome returns to such moments and asks us to look at them longer.',
      'The Art of Everyday Life brings together twelve works dated between 2016 and 2020. They share an interest in how people inhabit public spaces, work alongside one another and make room for private feelings within a crowded world. Yet these are not straightforward documentary records. Enifome treats the original photographs, at times dissolving surroundings into charcoal-like tones, at others allowing a flash of yellow or red to carry the image.',
      'It would be easy to assign every sitter a biography or to turn each picture into a lesson. The photographs are stronger for refusing that. Their feeling comes from what can genuinely be observed: the distance between bodies, a shared pause, an uncertain gesture, the fall of light. Enifome’s achievement is to make these modest details carry lasting emotional weight.',
      'What emerges is not a single account of Nigerian life, but a series of humane encounters. In their different ways, they speak about labour, belonging, solitude, companionship, movement and hope. Above all, they remind us that the ordinary is never without consequence.',
      'The treatments are most effective when they clarify what matters. In Friends, the surroundings fall quiet so that companionship can take centre stage. In The Contrast of Life I, colour shines while the subject’s inward posture complicates the brightness. Light at the End of the Tunnel leaves us with a human silhouette and a possibility we cannot yet see. Each work asks us to bring our own lived experience to the image.'
    ]
  },
  artistProfile: {
    title: 'Artist Profile',
    paragraphs: [
      'Ozuwo Enifome is a Nigerian artist whose photographs begin with people going about their lives. He is drawn to unremarkable but revealing moments: friends resting together, a woman attending to her work, figures at the water’s edge, someone standing alone where the light changes.',
      'The works in this catalogue offer a personal, attentive view of everyday life. They are photographs shaped by an artist who observes closely, and who recognises that a fleeting gesture can stay with us long after the moment has passed.',
      'His photographs are made from his own original images and then reinterpreted through digital artistic treatment. Some retain the directness of black-and-white photography; others use selective colour or wash-like textures that recall drawing and painting. These effects do not turn the photographs into physical paintings. They change the emotional distance between the viewer and what was seen.',
      'Enifome is interested in the quiet complexity of ordinary experience. His subjects are never simply illustrations of an idea. A bowed head can hold several possible meanings; people sitting close together can still feel far apart. His practice is most compelling when it allows such contradictions to remain visible.'
    ]
  },
  editionFramework: {
    title: 'Prints & Authentication: An Edition of One',
    summary: 'Each photograph is offered on the basis that only one physical saleable fine art print of the finished image will be produced: a unique edition of 1/1.',
    points: [
      'Single physical print issued per work as a unique 1/1 edition.',
      'Accompanied by a signed Certificate of Authenticity and Object Record.',
      'Object Record documents: Catalogue reference (OE-PH001–OE-PH012), original capture year, artistic treatment year, print date, printing process, paper/support, image size, sheet size, signature placement, certificate number, and initial ownership.',
      'Based on original photography made and artistically treated by Ozuwo Enifome.'
    ]
  }
};

export const projects: Project[] = ''' + json.dumps(projects, indent=2, ensure_ascii=False) + ';\n'

with open("src/lib/data.ts", "w", encoding="utf-8") as f:
    f.write(ts_code)

print("Generated src/lib/data.ts without public PDF downloads!")
