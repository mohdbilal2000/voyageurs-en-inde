import { Trip, Theme, Region, Guide } from './types';

export const TRIPS: Trip[] = [
  {
    id: 'raj-1',
    title: 'Les Palais du Rajasthan',
    region: 'Rajasthan',
    theme: 'Culture',
    duration: '14 Jours',
    price: 3850,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop',
    description: 'Une immersion royale au cœur de la terre des Rois. De Jaipur la rose à Udaipur la blanche, découvrez l’Inde éternelle entre forts majestueux et palais de contes de fées.',
    highlights: ['Jaipur', 'Jodhpur', 'Udaipur', 'Pushkar'],
    itinerary: [
      { day: 1, title: 'Arrivée à Delhi', desc: 'Transfert privé vers votre hôtel de luxe.' },
      { day: 2, title: 'Jaipur, la Ville Rose', desc: 'Découverte du City Palace et du Hawa Mahal.' },
      { day: 3, title: 'Udaipur, la Venise de l’Orient', desc: 'Envol pour Udaipur et installation au bord du lac.' }
    ],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'New Delhi' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
      { lat: 26.2389, lng: 73.0243, label: 'Jodhpur' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' }
    ]
  },
  {
    id: 'ker-1',
    title: 'Sérénité au Kerala',
    region: 'Sud',
    theme: 'Nature',
    duration: '10 Jours',
    price: 2900,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
    description: 'Une parenthèse enchantée dans l’Inde tropicale.',
    highlights: ['Cochin', 'Munnar', 'Thekkady', 'Alleppey'],
    itinerary: [
      { day: 1, title: 'Cochin', desc: 'Arrivée et découverte des filets de pêche chinois.' },
      { day: 2, title: 'Munnar', desc: 'Route vers les plantations de thé.' },
      { day: 3, title: 'Alleppey', desc: 'Croisière en Houseboat sur les backwaters.' }
    ]
  }
];

export const REGIONS: Region[] = [
  {
    id: 'north',
    name: 'Nord',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'south',
    name: 'Sud',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'east',
    name: 'Est',
    image: 'https://images.unsplash.com/photo-1626014909879-165f1262f02d?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'west',
    name: 'Ouest',
    image: 'https://images.unsplash.com/photo-1555952494-efd681c7e3f9?q=80&w=600&auto=format&fit=crop'
  }
];

export const THEMES: Theme[] = [
  {
    id: 'culture',
    name: 'Culture',
    icon: '🏛️',
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'nature',
    name: 'Nature',
    icon: '🌿',
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=600&auto=format&fit=crop'
  },
  {
    id: 'wellness',
    name: 'Bien-être',
    icon: '🧘',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?q=80&w=600&auto=format&fit=crop'
  }
];

export const GUIDES: Guide[] = [
  {
    id: 'visa',
    category: 'Visa',
    title: 'Comment obtenir son visa pour l\'Inde ?',
    excerpt: 'Tout ce qu\'il faut savoir sur les démarches administratives.',
    image: 'https://images.unsplash.com/photo-1578345710255-e45f9478f77d?q=80&w=600&auto=format&fit=crop',
    readTime: '5 min'
  },
  {
    id: 'weather',
    category: 'Weather',
    title: 'Quand partir en Inde ?',
    excerpt: 'Les meilleures saisons pour visiter chaque région.',
    image: 'https://images.unsplash.com/photo-1506461883276-594a12b11cf3?q=80&w=600&auto=format&fit=crop',
    readTime: '4 min'
  }
];