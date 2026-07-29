import { Project, TimelineEvent, TeamMember, StudioLocation } from '../types';

export const PROJECTS_DATA: Project[] = [
  {
    id: 'nexus-spire',
    title: 'NEXUS SPIRE V',
    category: 'Commercial',
    year: '2026',
    concept: 'Algorithmic aerodynamic shell reducing wind torque by 42%.',
    shortDescription: 'A 380m mixed-use vertical district engineered using computational fluid dynamics and kinetic solar facades.',
    fullDescription: 'Nexus Spire V represents the apex of generative structural design. Located in the Tokyo Financial District, its organic twisting silhouette is optimized for ambient wind dispersion and maximum natural daylight penetration. The double-skin facade dynamically adjusts louver angles based on sun position, reducing HVAC energy loads by 38% annually.',
    coverImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=1600&q=85'
    ],
    blueprintImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
    specs: {
      height: '380m / 84 Floors',
      area: '142,000 m²',
      location: 'Minato, Tokyo, JP',
      year: '2026',
      status: 'Under Construction',
      materiality: 'Carbon-reinforced Composite & Low-E Triple Glazing',
      sustainability: 'LEED Platinum / Net-Zero Energy Operational',
      typology: 'Vertical Mixed-Use & Innovation Hub'
    },
    modelType: 'tower',
    featured: true,
    awards: ['CTBUH Innovation Award 2025', 'International Parametric Design Gold']
  },
  {
    id: 'solaris-pavilion',
    title: 'SOLARIS BIOMIMETIC PAVILION',
    category: 'Pavilion',
    year: '2025',
    concept: 'Ultra-lightweight tensioned membrane informed by dragonfly wing cellular patterns.',
    shortDescription: 'A zero-footprint temporary pavilion constructed from self-healing bio-polymers and bamboo composite trusses.',
    fullDescription: 'Designed for the Venice Architecture Biennale, Solaris Pavilion explores ultra-lightweight structural efficiency. The canopy uses a tessellatedvoronoi geometry derived from dragonfly wing venation, yielding maximum structural stiffness with minimal material weight. Integrated transparent photovoltaic cells power night-time luminescent displays.',
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '18m Span',
      area: '2,800 m²',
      location: 'Giardini, Venice, IT',
      year: '2025',
      status: 'Completed',
      materiality: 'Bio-PV Membrane & CNC Milled Bamboo',
      sustainability: '100% Recyclable / Negative Carbon Footprint',
      typology: 'Cultural Exhibition Canopy'
    },
    modelType: 'pavilion',
    featured: true,
    awards: ['Mies van der Rohe Emerging Architecture Nominee']
  },
  {
    id: 'aether-residence',
    title: 'AETHER CLIFF RESIDENCE',
    category: 'Residential',
    year: '2025',
    concept: 'Cantilevered monolithic concrete volume anchored seamlessly into coastal basalt bedrock.',
    shortDescription: 'A minimalist sanctuary perched high over the Pacific ocean with subterranean geothermal climate regulation.',
    fullDescription: 'Aether Cliff Residence harmonizes raw structural drama with quiet spatial refinement. Hovering 60 meters above sea level, the primary living volume cantilevers 14 meters out over the sea cliffs. The structure utilizes high-performance basalt fiber concrete and smart thermal glass that modulates opacity on demand.',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '3 Levels',
      area: '850 m²',
      location: 'Big Sur, California, US',
      year: '2025',
      status: 'Completed',
      materiality: 'Off-shutter Basalt Concrete & Smoked Anodized Steel',
      sustainability: 'Off-grid Geothermal & Micro-hydro',
      typology: 'Private Coastal Residence'
    },
    modelType: 'complex',
    featured: true
  },
  {
    id: 'chronos-museum',
    title: 'CHRONOS DIGITAL ARCHIVE',
    category: 'Cultural',
    year: '2024',
    concept: 'Subterranean subterranean archive encased in a monolithic titanium geometric shell.',
    shortDescription: 'A national museum and digital artifact repository built inside a converted granite quarry.',
    fullDescription: 'Chronos Digital Archive bridges physical geology with digital persistence. Deep inside a former granite quarry in Zurich, the museum features three floating subterranean exhibition halls suspended by high-tensile steel cables. Visitors navigate between historical vaults and holographic art galleries via floating glass bridges.',
    coverImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '32m Sub-surface Depth',
      area: '24,500 m²',
      location: 'Zurich, Switzerland',
      year: '2024',
      status: 'Completed',
      materiality: 'Titanium-Zinc Facade & Exposed Mass Timber Core',
      sustainability: 'Subsurface Thermal Energy Storage (STES)',
      typology: 'National Museum & Media Archive'
    },
    modelType: 'complex',
    featured: false,
    awards: ['Swiss Architecture Award 2024']
  },
  {
    id: 'orbital-hub',
    title: 'NEO-SEOUL SKYWAY HUB',
    category: 'Urban Planning',
    year: '2026',
    concept: 'Multi-layered aerial transit bridge connecting four high-density towers.',
    shortDescription: 'An elevated pedestrian biosphere and autonomous drone vertiport bridging urban high-rises at +120m.',
    fullDescription: 'The Neo-Seoul Skyway Hub establishes a new 3D urban plane in high-density metropolitan spaces. Suspended 120 meters above ground level, the multi-tiered ring structure houses botanical gardens, public transit sky-docks, coworking pods, and rainwater harvesting biomes.',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '120m Elevation / 340m Ring',
      area: '38,000 m²',
      location: 'Yeouido, Seoul, KR',
      year: '2026',
      status: 'Parametric Proposal',
      materiality: 'Space-frame Titanium Truss & ETFE Cushions',
      sustainability: 'Vertical Wind Turbines & Rainwater Purification Biomes',
      typology: 'Urban Infrastructure & Aerial Transit'
    },
    modelType: 'bridge',
    featured: true
  },
  {
    id: 'helix-research-lab',
    title: 'HELIX SYNTHETIC BIOLOGY CENTER',
    category: 'Commercial',
    year: '2024',
    concept: 'Continuous double-helix circulation ribbon wrapping cleanroom laboratory clusters.',
    shortDescription: 'A state-of-the-art bio-tech research campus in Basel designed around spontaneous spatial collision.',
    fullDescription: 'Helix Center redefines research environments by surrounding isolated bio-secure cleanrooms with an open, naturally lit spiral circulation corridor. The atrium acts as a natural ventilation chimney, drawing fresh air upwards through internal living green walls.',
    coverImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '42m / 9 Floors',
      area: '28,000 m²',
      location: 'Basel, Switzerland',
      year: '2024',
      status: 'Completed',
      materiality: 'Recyclable Aluminum Louvers & Smart Electrochromic Glass',
      sustainability: 'BREEAM Outstanding',
      typology: 'Research Laboratories & Corporate HQ'
    },
    modelType: 'tower',
    featured: false
  },
  {
    id: 'hyperion-timber-tower',
    title: 'HYPERION MASS TIMBER TOWER',
    category: 'Residential',
    year: '2025',
    concept: '22-story mass timber structure sequestering over 4,500 tonnes of atmospheric carbon.',
    shortDescription: 'One of northern Europe’s tallest cross-laminated timber residential towers.',
    fullDescription: 'Hyperion demonstrates the viability of high-rise mass timber construction in cold climates. Built using regional spruce cross-laminated timber (CLT) panels and glue-laminated post-and-beam frames, Hyperion sequestrates carbon while providing warm acoustic interior environments.',
    coverImage: 'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1545558014-8692077e9b5c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '78m / 22 Floors',
      area: '19,200 m²',
      location: 'Stockholm, Sweden',
      year: '2025',
      status: 'Completed',
      materiality: 'Cross-Laminated Timber (CLT) & Burnt Cedar Cladding',
      sustainability: 'Carbon Negative Construction Phase',
      typology: 'Sustainable High-Density Housing'
    },
    modelType: 'tower',
    featured: false
  },
  {
    id: 'void-opera',
    title: 'THE VOID CONCERT HALL',
    category: 'Cultural',
    year: '2026',
    concept: 'Acoustically continuous timber soundwave shell enclosed in dark volcanic glass.',
    shortDescription: 'A 1,800-seat symphony hall designed with generative acoustic algorithms.',
    fullDescription: 'The Void Concert Hall combines ancient acoustic geometry with AI acoustic ray-tracing. The interior acoustic envelope consists of 8,400 unique CNC-carved oak sound panels that optimize sound diffusion without artificial amplification.',
    coverImage: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1600&q=85',
    galleryImages: [
      'https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1506158669146-619067262a00?auto=format&fit=crop&w=1600&q=85',
      'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1600&q=85'
    ],
    specs: {
      height: '28m',
      area: '16,000 m²',
      location: 'Reykjavik, Iceland',
      year: '2026',
      status: 'Under Construction',
      materiality: 'Basalt Glass & Acoustically Tuned Nordic Birch',
      sustainability: '100% Geothermal Powered',
      typology: 'Symphony Hall & Performing Arts'
    },
    modelType: 'complex',
    featured: false
  }
];

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    id: 't1',
    year: '2018',
    title: 'Studio Foundation in Zurich & Tokyo',
    category: 'Milestone',
    description: 'Aetheria was established as a computational design research lab merging architectural theory with algorithmic form generation.',
    metrics: '2 Founders / 1 Lab'
  },
  {
    id: 't2',
    year: '2020',
    title: 'First International Parametric Award',
    category: 'Award',
    description: 'Awarded Gold at the Venice Design Triennale for the Kinetic Canopy prototype.',
    metrics: '1st Prize / Global Entry'
  },
  {
    id: 't3',
    year: '2022',
    title: 'AI & Generative Structure Lab Launch',
    category: 'Research',
    description: 'Published landmark paper on Structural Optimization via Neural Topology Optimization in partnership with ETH Zurich.',
    metrics: '3 Peer-reviewed Papers'
  },
  {
    id: 't4',
    year: '2024',
    title: 'Completion of Chronos Archive',
    category: 'Milestone',
    description: 'Delivered our largest subterranean cultural project in Zurich, integrating geothermal thermal energy storage.',
    metrics: '24,500 m² Completed'
  },
  {
    id: 't5',
    year: '2025',
    title: 'Venice Architecture Biennale Installation',
    category: 'Exhibition',
    description: 'Unveiled the biomimetic dragonfly wing pavilion with integrated organic solar cells.',
    metrics: '250,000+ Visitors'
  },
  {
    id: 't6',
    year: '2026',
    title: 'Nexus Spire V Groundbreaking',
    category: 'Milestone',
    description: 'Commenced construction on our landmark 380-meter twisting tower in Tokyo Financial District.',
    metrics: '$420M Project Valuation'
  }
];

export const TEAM_MEMBERS: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Dr. Kenjiro Takahashi',
    role: 'Principal & Computational Design Director',
    location: 'Tokyo / Zurich',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80',
    bio: 'Former Senior Researcher at ETH Zurich. Pioneer in topology optimization and aerodynamic skyscraper geometry.',
    specialties: ['Parametric Physics', 'Wind Engineering', 'High-Rise Typography']
  },
  {
    id: 'team-2',
    name: 'Elena Vance, RIBA',
    role: 'Design Director & Studio Partner',
    location: 'Zurich / London',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80',
    bio: '20+ years leading transformative urban cultural hubs across Europe and Asia with a focus on net-zero carbon shells.',
    specialties: ['Cultural Architecture', 'Mass Timber Systems', 'Adaptive Reuse']
  },
  {
    id: 'team-3',
    name: 'Mateo Rossi',
    role: 'Lead Algorithmic Architect',
    location: 'Zurich',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80',
    bio: 'Specialist in robotic bio-fabrication, spatial graph neural networks, and kinetic facade engineering.',
    specialties: ['Robotic Fabrication', 'Neural Physics', 'Kinetic Facades']
  },
  {
    id: 'team-4',
    name: 'Sora Park',
    role: 'Director of Urban Futures',
    location: 'New York / Seoul',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=800&q=80',
    bio: 'Architectural theorist and urban strategist designing 3D aerial transit networks and vertical public biomes.',
    specialties: ['Sky-Bridge Systems', 'Urban Ecology', 'Advanced Mobility']
  }
];

export const STUDIO_LOCATIONS: StudioLocation[] = [
  {
    city: 'Tokyo',
    country: 'Japan',
    coordinates: '35.6762° N, 139.6503° E',
    timeZone: 'Asia/Tokyo',
    address: 'Level 42, Mori Tower, Roppongi Hills, Minato-ku, Tokyo',
    email: 'tokyo@aetheria-arch.studio'
  },
  {
    city: 'Zurich',
    country: 'Switzerland',
    coordinates: '47.3769° N, 8.5417° E',
    timeZone: 'Europe/Zurich',
    address: 'Gotthardstrasse 26, 8002 Zürich, Switzerland',
    email: 'zurich@aetheria-arch.studio'
  },
  {
    city: 'New York',
    country: 'United States',
    coordinates: '40.7128° N, 74.0060° W',
    timeZone: 'America/New_York',
    address: '520 West 28th St, Chelsea, New York, NY 10001',
    email: 'nyc@aetheria-arch.studio'
  }
];
