export interface DetailCrop {
  label: string;
  style: string; // Tailwind crop styles (zoom + alignment)
}

export interface Project {
  id: string;
  title: string;
  year: string;
  category: 'photography' | 'painting';
  collection: 'Seeing' | 'Light Studies' | 'Portraits' | 'Canvas' | 'Color' | 'Memory' | 'People' | 'Landscapes';
  medium: string;
  dimensions: string;
  description: string;
  story: string;
  image: string;
  aspectRatio: 'portrait' | 'landscape' | 'square';
  detailCrops?: DetailCrop[];
}

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

  // PHOTOGRAPHY (2024 - 2026)
  {
    id: 'photo-1',
    title: 'Sunset Over Canoe Park',
    year: '2024',
    category: 'photography',
    collection: 'Light Studies',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '120 x 80 cm (Edition of 5 + 2AP)',
    description: 'Gradient light and stillness over the coastal canoe parks of Lagos.',
    story: 'A photographic study of ambient light and horizontal peace. The canoes rest in perfect rhythm, silhouetted against the gold and rose-tinted gradient of the evening lagoon, capturing a moment of profound local tranquility.',
    image: '/images/photography/SUNSET OVER CANOE  PARK.webp',
    aspectRatio: 'landscape',
  },
  {
    id: 'photo-2',
    title: 'The Contrast of Life I',
    year: '2024',
    category: 'photography',
    collection: 'Seeing',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '90 x 60 cm (Edition of 7 + 2AP)',
    description: 'First in a documentary series focusing on the spatial contrasts of Lagos.',
    story: 'Juxtaposing historical corrugated tin roofs with modern commercial architecture. This image exposes the layers of urban history and economic shifts coexisting within a single Lagos neighborhood.',
    image: '/images/photography/THE CONTRAST OF LIFE 1.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-3',
    title: 'The Contrast of Life II (Geometric Shadows)',
    year: '2024',
    category: 'photography',
    collection: 'Portraits',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '90 x 60 cm (Edition of 7 + 2AP)',
    description: 'Human shadows interacting with brutalist architectural forms.',
    story: 'Captured at noon on Broad Street. A pedestrian crosses a stark triangle of shadow cast by a concrete bank building, mapping the human scale against the imposing geometries of modernism.',
    image: '/images/photography/THE CONTRAST OF LIFE 2.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-4',
    title: 'The Contrast of Life III (The Elder)',
    year: '2024',
    category: 'photography',
    collection: 'People',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '90 x 60 cm (Edition of 7 + 2AP)',
    description: 'A black-and-white portrait study focusing on skin texture and architecture.',
    story: 'An editorial portrait that contrasts the organic, weathered textures of an elder’s face with the grid-like, smooth facade of a corporate headquarters. A meditation on age, history, and urban change.',
    image: '/images/photography/THE CONTRAST OF LIFE 3.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-5',
    title: 'The Contrast of Life IV (Lagoon Reflection)',
    year: '2024',
    category: 'photography',
    collection: 'Memory',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '90 x 60 cm (Edition of 7 + 2AP)',
    description: 'A high-contrast street reflection captured in an urban water puddle.',
    story: 'A reflection of daily commuter life, merging sky, water, and passing footsteps. It captures a fleeting, painterly moment in the middle of a bustling commercial district, turning concrete puddles into canvases.',
    image: '/images/photography/THE CONTRAST OF LIFE 4.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-11',
    title: 'The Contrast of Life V (Urban Canopy)',
    year: '2025',
    category: 'photography',
    collection: 'Color',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '90 x 60 cm (Edition of 7 + 2AP)',
    description: 'Further explorations of high-contrast light filtering through urban cables.',
    story: 'Looking up through the complex web of overhead electrical wiring in Lagos. The wires create an accidental, graphic partition of the sky, framing clouds like geometric paintings.',
    image: '/images/photography/THE CONSTRAST OF LIFE 2.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-12',
    title: 'The Contrast of Life VI (Broad Street Dust)',
    year: '2025',
    category: 'photography',
    collection: 'Landscapes',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '120 x 80 cm (Edition of 5 + 2AP)',
    description: 'A volumetric light study in the dusty afternoon of Broad Street.',
    story: 'Harmattan dust particles capturing beams of light between colonial-era buildings and mid-century blocks. The atmosphere is thick and tactile, turning a busy street into a romantic, soft-focused dreamscape.',
    image: '/images/photography/THE CONSTRAST OF LIFE 3.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-6',
    title: 'Window to My World I',
    year: '2026',
    category: 'photography',
    collection: 'Light Studies',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '120 x 90 cm (Edition of 5 + 2AP)',
    description: 'The studio window framing the Lagos horizon during harmattan.',
    story: 'Looking outwards from the dim, meditative space of the painting studio. The frame captures a single palm tree, suspended in a warm, dusty harmattan orange-gray sky—a bridge between inner studio practice and the external landscape.',
    image: '/images/photography/WINDOW TO MY WORLD 1.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-7',
    title: 'Window to My World II',
    year: '2026',
    category: 'photography',
    collection: 'Seeing',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '120 x 90 cm (Edition of 5 + 2AP)',
    description: 'A study of studio light beams and dust.',
    story: 'The afternoon light filters through the high studio window, cutting a clean path through the shadows. The dust motes appear like floating stars, capturing the patient, silent hours of creative solitude.',
    image: '/images/photography/WINDOW TO MY WORLD 2.webp',
    aspectRatio: 'portrait',
  },
  {
    id: 'photo-8',
    title: 'Window to Our World',
    year: '2026',
    category: 'photography',
    collection: 'Landscapes',
    medium: 'Archival Pigment Print on Cotton Rag',
    dimensions: '100 x 75 cm (Edition of 5 + 2AP)',
    description: 'A wide landscape view connecting indoor frame structures and outer horizons.',
    story: 'A collaborative image framing the outer harbor. The structural columns of a fishing pier frame the open Atlantic horizon, offering an invitation to witness the vastness and historical resonance of the sea.',
    image: '/images/photography/Window to our World.webp',
    aspectRatio: 'portrait',
  },
];
