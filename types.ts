
export enum Page {
  Home = 'home',
  TripDetail = 'trip-detail',
  Guides = 'guides',
  About = 'about'
}

export interface MapPoint {
  lat: number;
  lng: number;
  label: string;
}

export interface Trip {
  id: string;
  title: string;
  region: string;
  theme: string;
  duration: string;
  price: number;
  image: string;
  description: string;
  highlights: string[];
  itinerary: { day: number; title: string; desc: string }[];
  mapPoints?: MapPoint[];
}

export interface Theme {
  id: string;
  name: string;
  icon: string;
  image: string;
}

export interface Region {
  id: string;
  name: string;
  image: string;
}

export interface Guide {
  id: string;
  category: 'Visa' | 'Weather' | 'Culture' | 'Travel Tips';
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
}
