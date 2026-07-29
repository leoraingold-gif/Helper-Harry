export type Category = 'All' | 'Commercial' | 'Residential' | 'Cultural' | 'Pavilion' | 'Urban Planning';

export interface ProjectSpec {
  height?: string;
  area: string;
  location: string;
  year: string;
  status: string;
  materiality: string;
  sustainability: string;
  typology: string;
}

export interface Project {
  id: string;
  title: string;
  category: Category;
  year: string;
  concept: string;
  shortDescription: string;
  fullDescription: string;
  coverImage: string;
  galleryImages: string[];
  blueprintImage?: string;
  specs: ProjectSpec;
  modelType: 'tower' | 'pavilion' | 'complex' | 'bridge';
  featured?: boolean;
  awards?: string[];
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  category: 'Milestone' | 'Award' | 'Research' | 'Exhibition';
  description: string;
  metrics?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  location: string;
  image: string;
  bio: string;
  specialties: string[];
}

export interface StudioLocation {
  city: string;
  country: string;
  coordinates: string;
  timeZone: string;
  address: string;
  email: string;
}

export interface AppSettings {
  scrollTrailEnabled: boolean;
  reducedMotion: boolean;
  accentColor: 'cyan' | 'gold' | 'dual';
  wireframeHero: boolean;
  heroAutoRotate: boolean;
}
