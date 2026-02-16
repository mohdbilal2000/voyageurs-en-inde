
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
        html: `<div class="w-3 h-3 bg-slate-900 border-2 border-white rounded-full shadow-lg"></div>`,
        iconSize: [12, 12],
        iconAnchor: [6, 6]
      });

      L.marker([p.lat, p.lng], { icon: customIcon }).addTo(map)
        .bindTooltip(`<span class="font-bold text-[8px] uppercase tracking-widest px-2 py-1">${p.label}</span>`, {
          permanent: true,
          direction: 'top',
          className: 'map-label-tooltip',
          offset: [0, -5]
        });
    });

    // Fit bounds with padding
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [40, 40] });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [points]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="leaflet-vignette" />
      <div className="absolute top-4 left-4 z-[500]">
        <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Google_Maps_Logo_2020.svg" className="w-6 h-6 opacity-40 grayscale" alt="Map Provider" />
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
    { label: 'Tous nos voyages', value: 'all' },
    { label: 'Nord', value: 'Nord' },
    { label: 'Rajasthan', value: 'Rajasthan' },
    { label: 'Sud', value: 'Sud' },
    { label: 'Himalaya', value: 'Himalaya' },
    { label: 'Culture', value: 'Culture' }
  ];

  const filteredTrips = useMemo(() => {
    if (externalFilter === 'all') return trips;
    return trips.filter(t =>
      t.region.toLowerCase().includes(externalFilter.toLowerCase()) ||
      t.theme.toLowerCase().includes(externalFilter.toLowerCase())
    );
  }, [externalFilter, trips]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      <div className="flex flex-col items-center mb-16 space-y-8">
        <div className="text-center space-y-4">
          <h2 className="text-4xl md:text-5xl font-serif">Inspirations Indiennes</h2>
          <p className="text-slate-500 max-w-2xl mx-auto italic">Des itinéraires d'exception personnalisables.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 border-b border-slate-100 pb-4">
          {filters.map(f => (
            <button
              key={f.value}
              onClick={() => onFilterChange(f.value)}
              className={`px-6 py-3 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all duration-300 ${externalFilter === f.value
                  ? 'bg-saffron text-white shadow-xl shadow-saffron/20'
                  : 'bg-transparent text-slate-400 hover:text-slate-900'
                }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 min-h-[500px]">
        {filteredTrips.map((trip) => (
          <div
            key={trip.id}
            className="group relative cursor-pointer bg-white overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-700 h-[450px]"
            onMouseEnter={() => setHoveredTripId(trip.id)}
            onMouseLeave={() => setHoveredTripId(null)}
            onClick={() => onTripSelect(trip)}
          >
            {/* --- DEFAULT STATE --- */}
            <div className={`absolute inset-0 z-10 flex flex-col justify-end transition-opacity duration-500 ${hoveredTripId === trip.id ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
              <div className="absolute inset-0">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
                <div className="absolute inset-0 backdrop-blur-[2px] opacity-20"></div>
              </div>

              <div className="relative p-10 text-white z-20">
                <div className="text-[11px] font-black uppercase tracking-[0.2em] mb-3 opacity-90">
                  {trip.duration} / {parseInt(trip.duration) - 1} NUITS
                </div>
                <h3 className="text-3xl md:text-4xl font-serif mb-6 leading-tight max-w-sm drop-shadow-sm">
                  {trip.title}
                </h3>
                <div className="flex items-center justify-between pt-6 border-t border-white/20">
                  <div className="text-lg">
                    <span className="text-xs uppercase font-bold opacity-60 mr-2">À partir de</span>
                    <span className="font-black font-serif text-2xl">{trip.price}€</span>
                  </div>
                  <div className="text-[11px] font-black uppercase tracking-widest flex items-center group-hover:translate-x-1 transition-transform">
                    &gt; DÉCOUVRIR
                  </div>
                </div>
              </div>
            </div>

            {/* --- HOVER STATE (REAL MAP) --- */}
            <div className={`absolute inset-0 z-20 transition-opacity duration-700 ${hoveredTripId === trip.id ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              {hoveredTripId === trip.id && trip.mapPoints && (
                <MapPreview points={trip.mapPoints} id={trip.id} />
              )}

              {/* VOIR LE DÉTAIL Button - Centered at bottom like image request */}
              <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[600] animate-in slide-in-from-bottom-4 duration-500 delay-200">
                <button className="bg-brown-btn text-white px-10 py-4 rounded-lg font-bold uppercase text-[11px] tracking-[0.2em] shadow-2xl hover:scale-105 active:scale-95 transition-all">
                  VOIR LE DÉTAIL
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .map-label-tooltip {
          background: white !important;
          border: 1px solid #e2e8f0 !important;
          border-radius: 4px !important;
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
