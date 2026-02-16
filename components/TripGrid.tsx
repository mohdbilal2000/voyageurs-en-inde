
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { Trip, MapPoint } from '../types';

interface MapPreviewProps {
  points: MapPoint[];
  id: string;
}

const MapPreview: React.FC<MapPreviewProps> = ({ points, id }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !points.length) return;

    // Initialize map
    const L = (window as any).L;
    if (!L) return;

    // Clear previous map if exists
    if (mapRef.current) {
      mapRef.current.remove();
    }

    // Create map instance
    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
    });

    mapRef.current = map;

    // Use a high-quality stylized tile layer (Positron/Light style)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    const latLngs = points.map(p => [p.lat, p.lng]);
    
    // Draw route
    L.polyline(latLngs, {
      color: '#B37012',
      weight: 2,
      opacity: 0.8,
      dashArray: '5, 10'
    }).addTo(map);

    // Add markers
    points.forEach((p) => {
      const customIcon = L.divIcon({
        className: 'custom-div-icon',
        html: `<div class="w-2.5 h-2.5 bg-slate-900 border-2 border-white rounded-full shadow-lg"></div>`,
        iconSize: [10, 10],
        iconAnchor: [5, 5]
      });

      L.marker([p.lat, p.lng], { icon: customIcon }).addTo(map)
        .bindTooltip(`<span class="font-bold text-[7px] uppercase tracking-widest px-1.5 py-0.5">${p.label}</span>`, {
          permanent: true,
          direction: 'top',
          className: 'map-label-tooltip',
          offset: [0, -4]
        });
    });

    // Fit bounds with padding
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [30, 30] });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [points]);

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#f8f9fa] animate-in fade-in duration-500">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="leaflet-vignette" />
      <div className="absolute top-4 left-4 z-[500] opacity-30 flex items-center space-x-2">
        <div className="w-2 h-2 bg-saffron rounded-full animate-pulse"></div>
        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-900">Itinéraire Interactif</span>
      </div>
    </div>
  );
};

interface TripGridProps {
  trips: Trip[];
  onTripSelect: (trip: Trip) => void;
  externalFilter?: string;
  onFilterChange: (filter: string) => void;
}

const TripGrid: React.FC<TripGridProps> = ({ trips, onTripSelect, externalFilter = 'all', onFilterChange }) => {
  const [hoveredTripId, setHoveredTripId] = useState<string | null>(null);

  const filters = [
    { label: 'Tout', value: 'all' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Inde du Sud', value: 'Inde du Sud' },
    { label: 'Himalaya', value: 'Himalaya' },
    { label: 'Safari', value: 'Safari' }
  ];

  const filteredTrips = useMemo(() => {
    if (externalFilter === 'all') return trips;
    return trips.filter(t => 
      t.region.toLowerCase().includes(externalFilter.toLowerCase()) || 
      t.theme.toLowerCase().includes(externalFilter.toLowerCase())
    );
  }, [externalFilter, trips]);

  return (
    <section id="nos-voyages" className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col items-center mb-16 space-y-8">
        <div className="text-center space-y-4">
          <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron">Nos Itinéraires</span>
          <h2 className="text-4xl md:text-5xl font-serif">Inspirations de Voyage</h2>
          <p className="text-slate-500 max-w-2xl mx-auto italic font-light">Architectes de l'évasion, nous avons conçu ces routes pour nourrir votre soif d'authenticité.</p>
        </div>
        
        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4">
          {filters.map(f => (
            <button 
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${
                externalFilter === f.value 
                ? 'bg-slate-900 text-white shadow-xl shadow-slate-900/10' 
                : 'bg-transparent text-slate-400 hover:text-slate-900'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[500px]">
        {filteredTrips.map((trip) => (
          <div 
            key={trip.id} 
            className="group relative cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 h-[480px] rounded-[1.5rem]"
            onMouseEnter={() => setHoveredTripId(trip.id)}
            onMouseLeave={() => setHoveredTripId(null)}
            onClick={() => onTripSelect(trip)}
          >
            {/* --- IMAGE LAYER --- */}
            <div className={`absolute inset-0 z-10 transition-all duration-700 ease-in-out ${hoveredTripId === trip.id ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
              <img 
                src={trip.image || `https://placehold.co/800x1200?text=${trip.title.replace(/ /g, '+')}`} 
                alt={trip.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x1200/db8b21/ffffff?text=${trip.title.replace(/ /g, '+')}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* --- MAP LAYER --- */}
            <div className={`absolute inset-0 z-0 transition-all duration-700 ease-in-out ${hoveredTripId === trip.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {trip.mapPoints && hoveredTripId === trip.id && (
                <MapPreview points={trip.mapPoints} id={trip.id} />
              )}
            </div>

            {/* --- CONTENT LAYER --- */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pointer-events-none">
              <div className={`transition-all duration-500 ${hoveredTripId === trip.id ? 'translate-y-[-10px] opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="flex items-center space-x-3 mb-3">
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-saffron">{trip.duration}</span>
                   <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{trip.region}</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-6 leading-tight group-hover:text-white transition-colors drop-shadow-lg">
                  {trip.title}
                </h3>
              </div>

              <div className="flex items-center justify-between pt-6 border-t border-white/10 mt-auto">
                <div className="text-white">
                  <span className="text-[9px] uppercase font-bold opacity-60 mr-2">Dès</span>
                  <span className="font-serif text-xl">{trip.price}€</span>
                </div>
                <div className={`pointer-events-auto flex items-center space-x-2 text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full transition-all duration-500 ${hoveredTripId === trip.id ? 'bg-slate-900 text-white translate-x-0' : 'text-white translate-x-2'}`}>
                  <span>{hoveredTripId === trip.id ? 'DÉTAILS' : 'DÉCOUVRIR'}</span>
                  <span>→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <style>{`
        .map-label-tooltip {
          background: white !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 3px !important;
          box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1) !important;
          color: #0f172a !important;
          font-family: 'Inter', sans-serif !important;
        }
        .leaflet-tooltip-top:before {
          border-top-color: white !important;
        }
      `}</style>
    </section>
  );
};

export default TripGrid;
