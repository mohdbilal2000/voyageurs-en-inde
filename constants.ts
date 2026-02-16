
import { Trip, Theme, Region, Guide } from './types';

export const TRIPS: Trip[] = [
  {
    id: 'it-1',
    title: 'La Grande Boucle du Rajasthan',
    region: 'Rajasthan',
    theme: 'Culture',
    duration: '21 Jours',
    price: 4850,
    image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=2000&auto=format&fit=crop',
    description: 'Une odyssée complète à travers la terre des rois. Des forts majestueux de Jodhpur aux palais flottants d\'Udaipur.',
    highlights: ['Bundi', 'Udaipur', 'Jodhpur', 'Jaisalmer'],
    itinerary: [{ day: 1, title: 'Arrivée à Delhi', desc: 'Transfert privé vers votre hôtel de charme.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 27.1767, lng: 78.0081, label: 'Agra' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
      { lat: 25.4414, lng: 75.6375, label: 'Bundi' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' },
      { lat: 26.2389, lng: 73.0243, label: 'Jodhpur' },
      { lat: 26.9157, lng: 70.9160, label: 'Jaisalmer' }
    ]
  },
  {
    id: 'it-2',
    title: 'L\'Odyssée du Désert du Thar',
    region: 'Rajasthan',
    theme: 'Culture',
    duration: '18 Jours',
    price: 3950,
    image: 'https://images.unsplash.com/photo-1524226493460-d7833966b5ea?q=80&w=2000&auto=format&fit=crop',
    description: 'Explorez le Shekhawati et ses havelis peints avant de plonger dans le silence éternel du désert.',
    highlights: ['Mandawa', 'Bikaner', 'Jaisalmer', 'Nagaur'],
    itinerary: [{ day: 1, title: 'Delhi - Mandawa', desc: 'Départ pour la région du Shekhawati.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 28.0513, lng: 75.1504, label: 'Mandawa' },
      { lat: 28.0222, lng: 73.3119, label: 'Bikaner' },
      { lat: 26.9157, lng: 70.9160, label: 'Jaisalmer' },
      { lat: 26.2389, lng: 73.0243, label: 'Jodhpur' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' }
    ]
  },
  {
    id: 'it-3',
    title: 'Contrastes : Du Gange au Kerala',
    region: 'Inde du Sud',
    theme: 'Culture',
    duration: '15 Jours',
    price: 4200,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
    description: 'Le meilleur du Nord et du Sud. Des palais moghols d\'Agra aux backwaters tropicaux du Kerala.',
    highlights: ['Taj Mahal', 'Udaipur', 'Cochin', 'Munnar'],
    itinerary: [{ day: 1, title: 'Delhi', desc: 'Arrivée et accueil traditionnel.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 27.1767, lng: 78.0081, label: 'Agra' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' },
      { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
      { lat: 9.9312, lng: 76.2673, label: 'Cochin' },
      { lat: 10.0889, lng: 77.0595, label: 'Munnar' }
    ]
  },
  {
    id: 'it-4',
    title: 'Sur les Rives du Gange Sacré',
    region: 'Himalaya',
    theme: 'Spiritualité',
    duration: '12 Jours',
    price: 2650,
    image: 'https://images.unsplash.com/photo-1518644730709-0835104d9daa?q=80&w=2000&auto=format&fit=crop',
    description: 'Un pèlerinage du Temple d\'Or d\'Amritsar aux sources du Gange à Rishikesh.',
    highlights: ['Amritsar', 'Dharamsala', 'Rishikesh', 'Haridwar'],
    itinerary: [{ day: 1, title: 'Delhi - Amritsar', desc: 'Envol pour la cité sainte des Sikhs.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 31.6340, lng: 74.8723, label: 'Amritsar' },
      { lat: 32.2190, lng: 76.3234, label: 'Dharamsala' },
      { lat: 29.9457, lng: 78.1642, label: 'Haridwar' },
      { lat: 30.0869, lng: 78.2676, label: 'Rishikesh' }
    ]
  },
  {
    id: 'it-5',
    title: 'Villes Modernes & Plages de Goa',
    region: 'Inde du Sud',
    theme: 'Aventure',
    duration: '12 Jours',
    price: 3100,
    image: 'https://images.unsplash.com/photo-1512100356956-c1b47ca40115?q=80&w=2000&auto=format&fit=crop',
    description: 'Découvrez le dynamisme de Bombay et Hyderabad avant de vous relaxer sur les rivages de Goa.',
    highlights: ['Hyderabad', 'Goa', 'Bombay', 'Lucknow'],
    itinerary: [{ day: 1, title: 'Delhi - Lucknow', desc: 'Départ pour la cité des Nawabs.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 26.8467, lng: 80.9462, label: 'Lucknow' },
      { lat: 17.3850, lng: 78.4867, label: 'Hyderabad' },
      { lat: 15.2993, lng: 74.1240, label: 'Goa' },
      { lat: 19.0760, lng: 72.8777, label: 'Bombay' }
    ]
  },
  {
    id: 'it-6',
    title: 'Namaste Voyage : Le Cœur de l\'Inde',
    region: 'Nord',
    theme: 'Culture',
    duration: '10 Jours',
    price: 2350,
    image: 'https://images.unsplash.com/photo-1517244683847-7456b63c5969?q=80&w=2000&auto=format&fit=crop',
    description: 'Une boucle culturelle reliant les palais de Jaipur aux temples mystiques de Varanasi.',
    highlights: ['Jaipur', 'Agra', 'Khajuraho', 'Varanasi'],
    itinerary: [{ day: 1, title: 'Delhi - Neemrana', desc: 'Nuit dans le fort de Neemrana.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
      { lat: 27.1767, lng: 78.0081, label: 'Agra' },
      { lat: 24.8318, lng: 79.9199, label: 'Khajuraho' },
      { lat: 25.3176, lng: 82.9739, label: 'Varanasi' }
    ]
  },
  {
    id: 'it-7',
    title: 'Demeures Royales & Vie Rurale',
    region: 'Rajasthan',
    theme: 'Culture',
    duration: '19 Jours',
    price: 4800,
    image: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?q=80&w=2000&auto=format&fit=crop',
    description: 'Prenez le temps de vivre l\'Inde rurale dans des forts et palais méconnus hors des sentiers battus.',
    highlights: ['Nagaur', 'Narlai', 'Bundi', 'Udaipur'],
    itinerary: [{ day: 1, title: 'Delhi - Mandawa', desc: 'Immersion en terre Shekhawati.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 28.0513, lng: 75.1504, label: 'Mandawa' },
      { lat: 27.1983, lng: 73.7493, label: 'Nagaur' },
      { lat: 25.3188, lng: 73.5358, label: 'Narlai' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' }
    ]
  },
  {
    id: 'it-8',
    title: 'La Grande Traversée Sud-Nord',
    region: 'Inde du Sud',
    theme: 'Culture',
    duration: '21 Jours',
    price: 5900,
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?q=80&w=2000&auto=format&fit=crop',
    description: 'Une épopée monumentale de Bombay aux temples colorés du Tamil Nadu.',
    highlights: ['Udaipur', 'Bombay', 'Cochin', 'Madurai'],
    itinerary: [{ day: 1, title: 'Nord', desc: 'Patrimoine mondial.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' },
      { lat: 19.0760, lng: 72.8777, label: 'Bombay' },
      { lat: 9.9312, lng: 76.2673, label: 'Cochin' },
      { lat: 9.9252, lng: 78.1198, label: 'Madurai' },
      { lat: 11.9416, lng: 79.8083, label: 'Pondichery' }
    ]
  },
  {
    id: 'it-9',
    title: 'Couleurs du Tamil Nadu & Kerala',
    region: 'Inde du Sud',
    theme: 'Culture',
    duration: '12 Jours',
    price: 2950,
    image: 'https://images.unsplash.com/photo-1627581105151-6c2e71810508?q=80&w=2000&auto=format&fit=crop',
    description: 'L\'architecture dravidienne spectaculaire et la douceur de vivre du Kerala.',
    highlights: ['Mahabalipuram', 'Madurai', 'Periyar', 'Cochin'],
    itinerary: [{ day: 1, title: 'Chennai', desc: 'Accueil tamoul chaleureux.' }],
    mapPoints: [
      { lat: 13.0827, lng: 80.2707, label: 'Chennai' },
      { lat: 12.6208, lng: 80.1945, label: 'Mahabalipuram' },
      { lat: 11.9416, lng: 79.8083, label: 'Pondichery' },
      { lat: 9.9252, lng: 78.1198, label: 'Madurai' },
      { lat: 9.9312, lng: 76.2673, label: 'Cochin' }
    ]
  },
  {
    id: 'it-10',
    title: 'Royaumes Perdus du Karnataka',
    region: 'Inde du Sud',
    theme: 'Culture',
    duration: '20 Jours',
    price: 5100,
    image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2000&auto=format&fit=crop',
    description: 'De l\'incroyable site de Hampi aux stations de montagne de l\'Ooty.',
    highlights: ['Hampi', 'Mysore', 'Ooty', 'Cochin'],
    itinerary: [{ day: 1, title: 'Bangalore', desc: 'Arrivée dans la cité jardin.' }],
    mapPoints: [
      { lat: 12.9716, lng: 77.5946, label: 'Bangalore' },
      { lat: 15.3350, lng: 76.4600, label: 'Hampi' },
      { lat: 12.2958, lng: 76.6394, label: 'Mysore' },
      { lat: 11.4102, lng: 76.6950, label: 'Ooty' },
      { lat: 9.9312, lng: 76.2673, label: 'Cochin' }
    ]
  },
  {
    id: 'it-11',
    title: 'Cœur de l\'Inde & Grottes Sacrées',
    region: 'Nord',
    theme: 'Culture',
    duration: '16 Jours',
    price: 3950,
    image: 'https://images.unsplash.com/photo-1616190419596-e2839e9580a7?q=80&w=2000&auto=format&fit=crop',
    description: 'Découvrez les trésors cachés du Madhya Pradesh et les grottes d\'Ajanta & Ellora.',
    highlights: ['Sanchi', 'Bhopal', 'Ajanta', 'Ellora'],
    itinerary: [{ day: 1, title: 'Delhi - Agra', desc: 'Retrouvez le Taj Mahal.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 27.1767, lng: 78.0081, label: 'Agra' },
      { lat: 23.2599, lng: 77.4126, label: 'Bhopal' },
      { lat: 20.5519, lng: 75.7033, label: 'Ajanta' },
      { lat: 19.0760, lng: 72.8777, label: 'Mumbai' }
    ]
  },
  {
    id: 'it-12',
    title: 'Safari : Le Royaume du Tigre',
    region: 'Safari',
    theme: 'Nature',
    duration: '14 Jours',
    price: 5200,
    image: 'https://images.unsplash.com/photo-1550961811-94943f054790?q=80&w=2000&auto=format&fit=crop',
    description: 'Une expédition sauvage dans les meilleurs parcs nationaux d\'Inde Centrale.',
    highlights: ['Kanha', 'Bandhavgarh', 'Ranthambore', 'Jaipur'],
    itinerary: [{ day: 1, title: 'Delhi', desc: 'Vers les jungles du Madhya Pradesh.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 22.3331, lng: 80.6111, label: 'Kanha' },
      { lat: 23.7000, lng: 81.0333, label: 'Bandhavgarh' },
      { lat: 26.0173, lng: 76.5026, label: 'Ranthambore' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' }
    ]
  },
  {
    id: 'it-13',
    title: 'Sérénité Tropicale au Kerala',
    region: 'Inde du Sud',
    theme: 'Nature',
    duration: '7 Jours',
    price: 1850,
    image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=2000&auto=format&fit=crop',
    description: 'Une courte évasion entre lagunes tranquilles et plages de sable fin.',
    highlights: ['Cochin', 'Backwaters', 'Marari Beach'],
    itinerary: [{ day: 1, title: 'Cochin', desc: 'Accueil et transfert.' }],
    mapPoints: [
      { lat: 9.9312, lng: 76.2673, label: 'Cochin' },
      { lat: 9.4981, lng: 76.3388, label: 'Alleppey' },
      { lat: 9.5983, lng: 76.4299, label: 'Kumarakom' },
      { lat: 9.6100, lng: 76.3000, label: 'Marari' }
    ]
  },
  {
    id: 'it-14',
    title: 'Luxe & Vie Sauvage à l\'Aman',
    region: 'Safari',
    theme: 'Nature',
    duration: '10 Jours',
    price: 6500,
    image: 'https://images.unsplash.com/photo-1561361058-c24cecae35ca?q=80&w=2000&auto=format&fit=crop',
    description: 'Séjournez dans les plus beaux lodges d\'Asie alliant confort ultime et safari.',
    highlights: ['Ajabgarh', 'Ranthambore', 'Jaipur', 'Delhi'],
    itinerary: [{ day: 1, title: 'Delhi', desc: 'Service de conciergerie VIP.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 27.4124, lng: 76.2163, label: 'Ajabgarh' },
      { lat: 26.0173, lng: 76.5026, label: 'Ranthambore' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' }
    ]
  },
  {
    id: 'it-15',
    title: 'Le Triangle d\'Or & Samode',
    region: 'Nord',
    theme: 'Culture',
    duration: '8 Jours',
    price: 2150,
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?q=80&w=2000&auto=format&fit=crop',
    description: 'L\'essentiel de l\'Inde du Nord sublimé par une nuit dans le palais de Samode.',
    highlights: ['Delhi', 'Samode', 'Jaipur', 'Agra'],
    itinerary: [{ day: 1, title: 'Delhi', desc: 'Début du périple.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 27.3117, lng: 75.8169, label: 'Samode' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' },
      { lat: 27.1767, lng: 78.0081, label: 'Agra' }
    ]
  },
  {
    id: 'it-16',
    title: 'Palais d\'Exception : Udaipur & Devigarh',
    region: 'Rajasthan',
    theme: 'Culture',
    duration: '9 Jours',
    price: 4100,
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=2000&auto=format&fit=crop',
    description: 'Une immersion dans l\'Inde princière avec des séjours dans des palais forteresses.',
    highlights: ['Jodhpur', 'Udaipur', 'Devigarh', 'Jaipur'],
    itinerary: [{ day: 1, title: 'Delhi', desc: 'Envol vers le Rajasthan.' }],
    mapPoints: [
      { lat: 28.6139, lng: 77.2090, label: 'Delhi' },
      { lat: 26.2389, lng: 73.0243, label: 'Jodhpur' },
      { lat: 24.5854, lng: 73.7125, label: 'Udaipur' },
      { lat: 24.7500, lng: 73.7200, label: 'Devigarh' },
      { lat: 26.9124, lng: 75.7873, label: 'Jaipur' }
    ]
  }
];

export const THEMES: Theme[] = [
  { id: 'culture', name: 'Culture & Palais', icon: '🏛️', image: 'https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=1200&auto=format&fit=crop' },
  { id: 'nature', name: 'Nature & Zen', icon: '🌿', image: 'https://images.unsplash.com/photo-1502318217862-aa4e294ba657?q=80&w=1200&auto=format&fit=crop' },
  { id: 'aventure', name: 'Aventure & Trek', icon: '🏔️', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=1200&auto=format&fit=crop' },
  { id: 'spiritualite', name: 'Spiritualité', icon: '🕉️', image: 'https://images.unsplash.com/photo-1518644730709-0835104d9daa?q=80&w=1200&auto=format&fit=crop' }
];

export const REGIONS: Region[] = [
  { id: 'rajasthan', name: 'Rajasthan', image: 'https://images.unsplash.com/photo-1599661046289-e31897846e41?q=80&w=1200&auto=format&fit=crop' },
  { id: 'sud', name: 'Inde du Sud', image: 'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?q=80&w=1200&auto=format&fit=crop' },
  { id: 'himalaya', name: 'Himalaya', image: 'https://images.unsplash.com/photo-1518644730709-0835104d9daa?q=80&w=1200&auto=format&fit=crop' },
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
