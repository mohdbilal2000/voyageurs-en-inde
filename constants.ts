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
    description: 'Une parenthèse enchantée dans l’Inde tropicale. Entre canaux paisibles, plantations de thé et soins ayurvédiques.',
    highlights: ['Cochin', 'Munnar', 'Backwaters', 'Marari'],
    itinerary: [
      { day: 1, title: 'Bienvenue à Cochin', desc: 'Découverte du quartier colonial de Fort Kochi.' },
      { day: 2, title: 'Les Montagnes de Munnar', desc: 'Route panoramique vers les collines de thé.' }
    ],
    mapPoints: [
      { lat: 9.9312, lng: 76.2673, label: 'Cochin' },
      { lat: 10.0889, lng: 77.0595, label: 'Munnar' },
      { lat: 9.4981, lng: 76.3388, label: 'Alleppey' }
    ]
  },
  {
    id: 'nord-1',
    title: 'L\'Essentiel du Nord',
    region: 'Nord',
    theme: 'Culture',
    duration: '8 Jours',
    price: 825,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop',
    description: 'Le Triangle d\'Or revisité. De la majesté du Taj Mahal à la ferveur mystique de Varanasi.',
    highlights: ['Delhi', 'Agra', 'Varanasi'],
    itinerary: [
      { day: 1, title: 'Delhi historique', desc: 'Visite de Old Delhi et ses marchés colorés.' },
      { day: 2, title: 'Agra & Taj Mahal', desc: 'Lever de soleil sur le monument à l\'amour.' }
    ],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'New Delhi' },
      { lat: 27.1767, lng: 78.0081, label: 'Agra' },
      { lat: 25.3176, lng: 82.9739, label: 'Varanasi' }
    ]
  },
  {
    id: 'lad-1',
    title: 'Himalaya : Le Petit Tibet',
    region: 'Himalaya',
    theme: 'Aventure',
    duration: '12 Jours',
    price: 3400,
    image: 'https://images.unsplash.com/photo-1581793745862-99f57ae50a2a?q=80&w=2000&auto=format&fit=crop',
    description: 'Au-delà des nuages, découvrez le Ladakh. Entre monastères perchés et lacs turquoises.',
    highlights: ['Leh', 'Vallée de la Nubra', 'Lac Pangong'],
    itinerary: [
      { day: 1, title: 'Atterrissage à Leh', desc: 'Repos nécessaire pour l’acclimatation.' },
      { day: 2, title: 'La Vallée de l’Indus', desc: 'Premières visites de monastères ancestraux.' }
    ],
    mapPoints: [
      { lat: 34.1526, lng: 77.5771, label: 'Leh' },
      { lat: 34.6908, lng: 77.5619, label: 'Nubra' },
      { lat: 33.7500, lng: 78.6667, label: 'Pangong' }
    ]
  }
];

export const THEMES: Theme[] = [
  { id: 'culture', name: 'Culture & Palais', icon: '🏛️', image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=1200&auto=format&fit=crop' },
  { id: 'nature', name: 'Nature & Zen', icon: '🌿', image: 'https://images.unsplash.com/photo-1502318217862-aa4e294ba657?q=80&w=1200&auto=format&fit=crop' },
  { id: 'aventure', name: 'Aventure & Trek', icon: '🏔️', image: 'https://images.unsplash.com/photo-1581793745862-99f57ae50a2a?q=80&w=1200&auto=format&fit=crop' },
  { id: 'spiritualite', name: 'Spiritualité', icon: '🕉️', image: 'https://images.unsplash.com/photo-1518644730709-0835104d9daa?q=80&w=1200&auto=format&fit=crop' }
];

export const REGIONS: Region[] = [
  { id: 'rajasthan', name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop' },
  { id: 'sud', name: 'Inde du Sud', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop' },
  { id: 'himalaya', name: 'Himalaya', image: 'https://images.unsplash.com/photo-1581793745862-99f57ae50a2a?q=80&w=1200&auto=format&fit=crop' },
  { id: 'nord', name: 'Inde du Nord', image: 'https://images.unsplash.com/photo-1564507592333-c60657eaa0ae?q=80&w=1200&auto=format&fit=crop' }
];

export const GUIDES: Guide[] = [
  {
    id: 'g1',
    category: 'Travel Tips',
    title: 'Préparer son premier voyage en Inde',
    excerpt: 'Visas, vaccins et conseils de valise : tout ce qu’il faut savoir avant le départ.',
    image: 'https://images.unsplash.com/photo-1526749837599-b4efa9fd259e?q=80&w=1200&auto=format&fit=crop',
    readTime: '8 min read'
  },
  {
    id: 'g2',
    category: 'Culture',
    title: 'La cuisine indienne : un festival de saveurs',
    excerpt: 'Du thali du sud aux épices du Rajasthan, guide gastronomique pour gourmets.',
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=1200&auto=format&fit=crop',
    readTime: '6 min read'
  }
];