export interface DetailCrop {
  label: string;
  style: string; // Tailwind crop styles (zoom + alignment)
}

export interface Project {
  id: string;
  catalogueId?: string;
  title: string;
  year: string;
  category: 'photography' | 'painting';
  collection: 'The Art of Everyday Life' | 'Seeing' | 'Light Studies' | 'Portraits' | 'Canvas' | 'Color' | 'Memory' | 'People' | 'Landscapes';
  medium: string;
  dimensions: string;
  description: string;
  story: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  detailCrops?: DetailCrop[];
  edition?: string;
}

export const photographyCatalogue = {
  title: 'The Art of Everyday Life',
  subtitle: 'Fine Art & Documentary Photography',
  alias: 'Humanised Landscape',
  artist: 'Ozuwo Enifome',
  period: '2016–2020',
  pdfPath: '/Ozuwo_Enifome_Humanised_Landscape_Gallery_Catalogue.pdf',
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

export const projects: Project[] = [
  // PAINTINGS (2018 - 2023)
  {
    id: 'paint-8',
    title: 'The Drummers',
    year: '2018',
    category: 'painting',
    collection: 'Color',
    medium: 'Oil on Canvas',
    dimensions: '160 x 120 cm',
    description: 'A study of movement, cadence, and texture in Yoruba drumming ceremonies.',
    story: 'A kinetic exploration of rhythm and community in Lagos. The heavy impasto captures the thrumming vibration of the gangan (talking drum), rendering sound as physical texture. This work marks the transition from agency creative direction back to the tactile canvas.',
    image: '/images/paintings/the drummers 2018 copy.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Talking Drum Canvas Grain', style: 'object-[45%_50%] scale-[2.2]' },
      { label: 'Impasto Hand Details', style: 'object-[75%_35%] scale-[1.8]' }
    ]
  },
  {
    id: 'paint-3',
    title: 'Daily Chores',
    year: '2019',
    category: 'painting',
    collection: 'Memory',
    medium: 'Mixed Media on Board',
    dimensions: '100 x 100 cm',
    description: 'An exploration of domesticity and repetition as a form of devotion.',
    story: 'Layered with newspaper clippings, local textiles, and heavy oil washes, this piece explores the beauty and gravity found in everyday tasks. It is a visual record of memory, depicting quiet maternal strength in the morning hours.',
    image: '/images/paintings/DAILY CHORES.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Textile Layering Detail', style: 'object-[50%_65%] scale-[2.0]' },
      { label: 'Textured Background Wash', style: 'object-[20%_20%] scale-[1.5]' }
    ]
  },
  {
    id: 'paint-2',
    title: 'Children of Makoko (Tales of Sadness)',
    year: '2020',
    category: 'painting',
    collection: 'People',
    medium: 'Oil on Canvas',
    dimensions: '200 x 150 cm',
    description: 'A poignant depiction of childhood in the stilt-city lagoon of Makoko.',
    story: 'Set against the water-logged streets of Makoko, this large-scale canvas captures the resilient gaze of children on the lagoon. The cool blue-grey color palette evokes the weight of water, reflection, and history, inviting a slow, deep engagement with the community’s reality.',
    image: '/images/paintings/children of Makoko-Tales of Sadness.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Gaze Portrait Crop', style: 'object-[30%_35%] scale-[2.5]' },
      { label: 'Lagoon Reflection Brushwork', style: 'object-[60%_80%] scale-[1.7]' }
    ]
  },
  {
    id: 'paint-4',
    title: 'Daily Hustle (Study I)',
    year: '2021',
    category: 'painting',
    collection: 'Canvas',
    medium: 'Acrylic on Canvas',
    dimensions: '110 x 110 cm',
    description: 'Capturing the kinetic energy and determination of daily Lagos life.',
    story: 'A study in speed and pedestrian transit. The sweeping, energetic brushstrokes capture the frantic choreography of morning commuters, presenting a city that never stops moving. The medium is treated with deliberate raw edges, letting the linen canvas show through.',
    image: '/images/paintings/Daily Hussle copyu.webp',
    aspectRatio: 'square',
    detailCrops: [
      { label: 'Commuter Silhouette Detail', style: 'object-[40%_45%] scale-[2.1]' },
      { label: 'Raw Linen Edge Texture', style: 'object-[10%_90%] scale-[1.6]' }
    ]
  },
  {
    id: 'paint-5',
    title: 'The Story of Iya Bimpe',
    year: '2022',
    category: 'painting',
    collection: 'Portraits',
    medium: 'Oil on Canvas',
    dimensions: '130 x 130 cm',
    description: 'A narrative portrait reflecting the resilience and history of market life.',
    story: 'Dedicated to the formidable matriarchs who anchor the markets of Lagos. Her posture and gaze hold decades of survival and pride. Rendered with deeply layered earth tones and high-contrast lighting to accentuate the passage of time on skin and fabric.',
    image: '/images/paintings/Daily hustle-The story of Iya Bimpe.webp',
    aspectRatio: 'square',
    detailCrops: [
      { label: 'Wrinkle and Expression Details', style: 'object-[50%_40%] scale-[2.4]' },
      { label: 'Traditional Headgear Indigo Pattern', style: 'object-[50%_15%] scale-[1.8]' }
    ]
  },
  {
    id: 'paint-6',
    title: 'Good Morning',
    year: '2022',
    category: 'painting',
    collection: 'Light Studies',
    medium: 'Oil on Canvas',
    dimensions: '140 x 110 cm',
    description: 'Quiet morning light filtering through wooden studio shutters.',
    story: 'An inquiry into light, dust, and atmosphere. A serene canvas depicting the brief moments of silence before Lagos wakes. The soft, volumetric light is painted with light glaze layers to produce an inner luminosity.',
    image: '/images/paintings/Good Morning.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Volumetric Light Glaze', style: 'object-[40%_30%] scale-[2.0]' },
      { label: 'Shadow Edge Brushstroke', style: 'object-[80%_70%] scale-[1.8]' }
    ]
  },
  {
    id: 'paint-7',
    title: 'My Boat, My Livelihood',
    year: '2023',
    category: 'painting',
    collection: 'Landscapes',
    medium: 'Oil on Canvas',
    dimensions: '160 x 120 cm',
    description: 'A tribute to the relationship between the lagoon fishermen and their vessels.',
    story: 'A landscape where the boat is treated as a extension of the fisherman. It floats in a liminal space where the water merges into the sky. The heavy horizontal strokes of the horizon create a grounding sense of peace.',
    image: '/images/paintings/My Boat, My livelihood.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Canoe Wood Grain Impasto', style: 'object-[50%_75%] scale-[2.2]' },
      { label: 'Sky-Water Horizon Blur', style: 'object-[50%_40%] scale-[1.6]' }
    ]
  },
  {
    id: 'paint-1',
    title: 'African Street Guitarist',
    year: '2023',
    category: 'painting',
    collection: 'Seeing',
    medium: 'Oil on Canvas',
    dimensions: '120 x 90 cm',
    description: 'A soulful portrait of a street musician in Yaba.',
    story: 'Capturing the deep concentration of a street performer amidst the visual noise of Yaba, Lagos. The contrast between his focused expression and the blurred, abstract background symbolizes the sanctuary found within creative expression.',
    image: '/images/paintings/African Street guitarist.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Guitar String Canvas Focus', style: 'object-[52%_60%] scale-[2.3]' },
      { label: 'Facial Expression Detail', style: 'object-[50%_25%] scale-[2.0]' }
    ]
  },

  // PHOTOGRAPHY: "THE ART OF EVERYDAY LIFE" (2016 - 2020)
  // Official Gallery Catalogue: Humanised Landscape / OE-PH001 - OE-PH012
  {
    id: 'oe-ph001',
    catalogueId: 'OE-PH001',
    title: 'The Hopelessness of Hope',
    year: '2016',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '30 × 22 in',
    description: 'Two figures emerging through greys; endurance and quiet tension in an uncertain moment.',
    story: 'Two figures come forward through a haze of greys. One remains upright; the other seems to fold into the weight of what is being carried. Their outlines are partly swallowed by the surrounding marks, making it difficult to separate the people from the hardship that the picture suggests. The emotional force of this work lies in that uncertainty. Enifome does not turn suffering into spectacle or offer the viewer an easy resolution. Instead, the almost erased faces and heavy tonal passages ask us to consider what it means to see someone in distress and still know so little about their life. The title carries a painful contradiction: hope survives here, but it is being tested.',
    image: '/images/photography/art-of-everyday-life/OE-PH001_the-hopelessness-of-hope.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Tonal Grey Dissolution', style: 'object-[50%_35%] scale-[2.2]' },
      { label: 'Submerged Figure Outline', style: 'object-[55%_70%] scale-[1.8]' }
    ]
  },
  {
    id: 'oe-ph002',
    catalogueId: 'OE-PH002',
    title: 'Three is Company',
    year: '2016',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '16 × 22 in',
    description: 'An understated portrait of companionship, fatigue, and the comfort of simply having others nearby.',
    story: 'Three men sit shoulder to shoulder, yet each seems enclosed in his own thoughts. Their pale clothing links them visually, while the different directions of their heads and hands give the photograph a quiet, unsettled rhythm. There is warmth in their closeness, but Enifome allows silence to remain part of the gathering. The picture recognises a familiar human truth: being together does not mean experiencing the same moment. By softening the background into flecks and washes, he gives the men room to be both a group and individuals. It is an understated portrait of companionship, fatigue and the comfort of simply having others nearby.',
    image: '/images/photography/art-of-everyday-life/OE-PH002_three-is-company.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Shoulder-to-Shoulder Posture', style: 'object-[50%_55%] scale-[2.0]' },
      { label: 'Fleck and Wash Dissolution', style: 'object-[20%_25%] scale-[1.8]' }
    ]
  },
  {
    id: 'oe-ph003',
    catalogueId: 'OE-PH003',
    title: 'Untitled',
    year: '2016',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '36 × 36 in',
    description: 'A small assembly of robed figures emerges from faint textured suggestions, carrying the feeling of a memory.',
    story: 'A small assembly of robed figures emerges from a light, textured setting. Their garments overlap, their heads incline towards one another, and the darker central forms hold the loose gathering together. The surrounding space is reduced to faint suggestions rather than a clearly described location. Enifome leaves the purpose of the gathering open, and that restraint is part of the picture’s humanity. We sense familiarity, perhaps a shared errand or a pause in the day, without being told what the people are saying. The delicate disappearance of edges gives the scene the feeling of a memory: recognisable enough to stir curiosity, but too fleeting to be fully recovered.',
    image: '/images/photography/art-of-everyday-life/OE-PH003_untitled.webp',
    aspectRatio: 'square',
    detailCrops: [
      { label: 'Robed Figure Incline', style: 'object-[50%_50%] scale-[2.1]' },
      { label: 'Textured Setting Boundary', style: 'object-[80%_40%] scale-[1.7]' }
    ]
  },
  {
    id: 'oe-ph004',
    catalogueId: 'OE-PH004',
    title: 'Friends',
    year: '2016',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '36 × 36 in',
    description: 'Friendship without performance: two seated men in the ease of companionship and comfortable silence.',
    story: 'Two seated men occupy the foreground. One leans into a long, relaxed posture; the other turns slightly forward, his hands gathered near his knees. Their clothing and headwear share a pale tonal range, against which the darker traces of the background become almost incidental. This is friendship without performance. There is no grand gesture, no demand that the sitters smile or explain themselves. Enifome finds tenderness in proximity and in the ease of two people who appear comfortable with silence. The softened edges lend the encounter a sense of time passing gently, as though the moment matters precisely because nothing extraordinary has to happen.',
    image: '/images/photography/art-of-everyday-life/OE-PH004_friends.webp',
    aspectRatio: 'square',
    detailCrops: [
      { label: 'Relaxed Hand Placement', style: 'object-[65%_65%] scale-[2.2]' },
      { label: 'Headwear and Gaze', style: 'object-[60%_35%] scale-[2.0]' }
    ]
  },
  {
    id: 'oe-ph005',
    catalogueId: 'OE-PH005',
    title: 'The Contrast of Life 1',
    year: '2018',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '40 × 36 in',
    description: 'A figure wrapped in brilliant red and gold bends forward against darkness, embodying guarded dignity.',
    story: 'A figure wrapped in brilliant red and gold bends forward against a nearly black field. The intensity of the cloth is striking, but the posture is guarded, drawing the body inward rather than outward. Colour commands our attention even as the person’s expression remains hidden. Enifome builds the work around that tension. The vivid garment suggests energy and presence; the bowed head speaks a quieter language of vulnerability or private reflection. Neither cancels the other. The photograph invites us to think about the distance between what a person reveals to the world and what they may be carrying within. It is a portrait of dignity that resists easy interpretation.',
    image: '/images/photography/art-of-everyday-life/OE-PH005_the-contrast-of-life-1.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Red-Gold Drapery Folds', style: 'object-[65%_50%] scale-[2.3]' },
      { label: 'Bowed Head Silhouette', style: 'object-[75%_35%] scale-[2.2]' }
    ]
  },
  {
    id: 'oe-ph006',
    catalogueId: 'OE-PH006',
    title: 'Market Woman',
    year: '2018',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '30.5 × 36 in',
    description: 'A moment of daily trade whose repetitive demands are suggested, not narrated, centered on human dignity.',
    story: 'A lone figure stands beside vessels and objects that seem connected with everyday trade. Her silhouette is dark, and much of the surrounding scene has been loosened into ink-like patches. What remains most legible is her upright presence and the small activity gathered around her hands. The work is attentive to labour without making a sentimental emblem of it. Enifome lets the woman hold the image, even as his treatment strips away many of the details by which a passer-by might ordinarily identify her. The result is intimate yet respectful: a moment of work whose repetitive demands are suggested, not narrated, and whose human value lies in the person at its centre.',
    image: '/images/photography/art-of-everyday-life/OE-PH006_market-woman.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Trade Vessel Gestures', style: 'object-[65%_60%] scale-[2.2]' },
      { label: 'Inked Upright Silhouette', style: 'object-[50%_40%] scale-[2.0]' }
    ]
  },
  {
    id: 'oe-ph007',
    catalogueId: 'OE-PH007',
    title: 'The Contrast of Life 2',
    year: '2018',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '40 × 36 in',
    description: 'Saturated yellow patterned fabric against grey street movement: visibility as an act of regard.',
    story: 'An older-looking figure stands in patterned yellow fabric and a white headwrap, surrounded by a street scene rendered largely in grey. The saturated cloth makes the subject immediately visible, while the hands and lowered gaze introduce an unusually quiet centre to a visually busy setting. The selective colour does more than decorate the scene. It makes us notice someone who might otherwise disappear into the movement of the crowd. There is dignity in the careful attention to clothing, but also a suggestion of the weariness of an ordinary day. Enifome brings these feelings together without forcing a single story onto the sitter. Visibility itself becomes an act of regard.',
    image: '/images/photography/art-of-everyday-life/OE-PH007_the-contrast-of-life-2.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Patterned Yellow Fabric', style: 'object-[65%_65%] scale-[2.3]' },
      { label: 'White Headwrap & Gaze', style: 'object-[65%_35%] scale-[2.2]' }
    ]
  },
  {
    id: 'oe-ph008',
    catalogueId: 'OE-PH008',
    title: 'Fulani Woman',
    year: '2018',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '24 × 16 in',
    description: 'A mood of endurance and reserve; dense black shapes honoring presence without reducing to symbol.',
    story: 'A dark standing figure is set against a restless, pale ground. A broad rounded form rises alongside her, while the figure’s clothing and the surrounding marks merge in places. The image gives us a strong bodily presence but very few details that would settle its setting or narrative. Its mood is one of endurance and reserve. Enifome’s dense black shapes give the woman a remarkable solidity, while the dissolved edges suggest the fragility of any passing encounter. The viewer is invited to look carefully rather than claim understanding. Whatever the subject’s particular circumstances, the work honours her presence without reducing her to a social category or a picturesque symbol.',
    image: '/images/photography/art-of-everyday-life/OE-PH008_fulani-woman.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Rounded Form Boundary', style: 'object-[50%_35%] scale-[2.0]' },
      { label: 'Bodily Silhouette Density', style: 'object-[50%_65%] scale-[1.8]' }
    ]
  },
  {
    id: 'oe-ph009',
    catalogueId: 'OE-PH009',
    title: 'Light at the End of the Tunnel',
    year: '2018',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '24 × 21 in',
    description: 'A silhouette at the threshold between darkness and opening light: the difficult moment before a step is taken.',
    story: 'Most of the image is consumed by blackness. A narrow opening of white light falls behind the silhouette of a person, who stands at the threshold between what can and cannot be seen. The surrounding walls retain just enough texture to make the darkness feel physical. There is a powerful emotional hesitation here. The title promises hope, yet Enifome does not show us what lies beyond the doorway. The figure could be pausing, arriving or preparing to leave. That uncertainty makes the light meaningful: not a guaranteed rescue, but the possibility of another direction. The image speaks to isolation, courage and the difficult moment before a step is taken.',
    image: '/images/photography/art-of-everyday-life/OE-PH009_light-at-the-end-of-the-tunnel.webp',
    aspectRatio: 'portrait',
    detailCrops: [
      { label: 'Doorway Light Threshold', style: 'object-[65%_45%] scale-[2.4]' },
      { label: 'Physical Wall Shadow Texture', style: 'object-[85%_65%] scale-[1.9]' }
    ]
  },
  {
    id: 'oe-ph010',
    catalogueId: 'OE-PH010',
    title: 'Face to Face Conversation',
    year: '2020',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '15 × 24 in',
    description: 'Two small silhouettes at opposite ends of a slender boat over reflective water expanse.',
    story: 'Two small silhouettes sit at opposite ends of a slender boat. Between them, the vessel forms a low dark line over reflective water, while the far bank stretches across a misty horizon. The figures are distant enough that their expressions cannot be read. What holds the photograph is the space between the people. Enifome places conversation within a broad expanse of water and air, allowing the scene to feel both intimate and exposed. Their separation invites us to imagine a shared exchange, but the work wisely withholds its content. Against the immensity of the landscape, the simple fact of two people being present with one another becomes unexpectedly moving.',
    image: '/images/photography/art-of-everyday-life/OE-PH010_face-to-face-conversation.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Slender Canoe Silhouettes', style: 'object-[50%_60%] scale-[2.2]' },
      { label: 'Misty Horizon Wash', style: 'object-[50%_35%] scale-[1.8]' }
    ]
  },
  {
    id: 'oe-ph011',
    catalogueId: 'OE-PH011',
    title: 'Kids washing By the Banks',
    year: '2020',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '15 × 24 in',
    description: 'Diminutive figures near the water’s edge, animated across warm gold and brown washes of light.',
    story: 'A band of dark, diminutive figures appears near the water’s edge, almost absorbed by the warm gold and brown washes spreading across the picture. The shoreline runs horizontally through a field of light, its detail interrupted by stains, drips and blurred passages. Enifome gives the scene the warmth of a remembered afternoon without erasing its everyday reality. The children are small against the wider environment, yet they animate it completely. There is an easy sense of activity and shared experience, accompanied by a quieter awareness of how quickly such moments pass. The painterly treatment makes recollection itself part of the image: imperfect, luminous and deeply human.',
    image: '/images/photography/art-of-everyday-life/OE-PH011_kids-washing-by-the-banks.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Diminutive Shoreline Figures', style: 'object-[60%_65%] scale-[2.3]' },
      { label: 'Luminous Amber Wash', style: 'object-[50%_40%] scale-[1.7]' }
    ]
  },
  {
    id: 'oe-ph012',
    catalogueId: 'OE-PH012',
    title: 'Argungu Sprint',
    year: '2020',
    category: 'photography',
    collection: 'The Art of Everyday Life',
    medium: 'Original photography; artistically interpreted digital image',
    edition: 'Unique 1/1 physical-print edition',
    dimensions: '24 × 32 in',
    description: 'Collective motion and raised nets cutting dark diagonals across a dust-filled expanse.',
    story: 'Figures move across a pale, dust-filled expanse, their bodies and raised objects cutting dark diagonals through the light. The image seems to catch a rush of collective motion at the point when individual gestures begin to merge into one driving current. Enifome brings excitement into the frame without flattening the participants into spectacle. The hurried silhouettes suggest effort, anticipation and the contagious energy of people moving towards a common purpose. His loose, almost airborne marks make the atmosphere feel charged. Rather than freeze a single heroic action, he lets us experience the vitality and uncertainty of the moment itself.',
    image: '/images/photography/art-of-everyday-life/OE-PH012_argungu-sprint.webp',
    aspectRatio: 'landscape',
    detailCrops: [
      { label: 'Raised Fishing Nets', style: 'object-[75%_55%] scale-[2.2]' },
      { label: 'Airborne Dust Current', style: 'object-[45%_55%] scale-[1.9]' }
    ]
  }
];
