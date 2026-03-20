
import React, { useMemo, useEffect, useRef, useState } from 'react';
import { Trip, MapPoint } from '../types';

interface MapPreviewProps {
  points: MapPoint[];
  tripTitle: string;
}

const MapPreview: React.FC<MapPreviewProps> = ({ points, tripTitle }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);

  useEffect(() => {
    if (!mapContainerRef.current || !points.length) return;

    const L = (window as any).L;
    if (!L) return;

    if (mapRef.current) {
      mapRef.current.remove();
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: false,
      attributionControl: false,
      scrollWheelZoom: false,
      dragging: false,
      touchZoom: false,
      doubleClickZoom: false,
    });

    mapRef.current = map;

    // CartoDB Voyager – closest free alternative to Google Maps style
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      maxZoom: 19
    }).addTo(map);

    const latLngs = points.map(p => [p.lat, p.lng]);

    // Drop shadow / halo for route
    L.polyline(latLngs, {
      color: 'rgba(255,255,255,0.6)',
      weight: 6,
      opacity: 1,
    }).addTo(map);

    // Main Google Maps blue route
    L.polyline(latLngs, {
      color: '#4285F4',
      weight: 3.5,
      opacity: 0.95,
    }).addTo(map);

    // Add markers: green start, red end, blue intermediate
    points.forEach((p, i) => {
      const isFirst = i === 0;
      const isLast = i === points.length - 1;

      if (isFirst || isLast) {
        // Large pin markers for start/end (Google Maps style)
        const pinColor = isFirst ? '#34A853' : '#EA4335';
        const pinSvg = `
          <svg width="24" height="34" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
            <path d="M12 0C5.373 0 0 5.373 0 12C0 20.667 12 34 12 34C12 34 24 20.667 24 12C24 5.373 18.627 0 12 0Z" fill="${pinColor}"/>
            <circle cx="12" cy="12" r="6" fill="white"/>
          </svg>`;
        const icon = L.divIcon({
          className: '',
          html: `<div>${pinSvg}</div>`,
          iconSize: [24, 34],
          iconAnchor: [12, 34],
          popupAnchor: [0, -36]
        });
        const label = `<div class="gmaps-tooltip"><strong>${p.label}</strong></div>`;
        L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindTooltip(label, {
            permanent: true,
            direction: isFirst ? 'right' : 'left',
            className: 'gmaps-tip',
            offset: isFirst ? [6, -16] : [-6, -16]
          });
      } else {
        // Small circular markers for intermediate stops
        const icon = L.divIcon({
          className: '',
          html: `<div style="width:10px;height:10px;background:#4285F4;border:2px solid white;border-radius:50%;box-shadow:0 1px 3px rgba(0,0,0,0.3)"></div>`,
          iconSize: [10, 10],
          iconAnchor: [5, 5],
        });
        L.marker([p.lat, p.lng], { icon })
          .addTo(map)
          .bindTooltip(`<div class="gmaps-tooltip-sm">${p.label}</div>`, {
            permanent: false,
            direction: 'top',
            className: 'gmaps-tip-sm',
            offset: [0, -6]
          });
      }
    });

    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [42, 32] });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [points]);

  const visibleLabels = points.slice(0, 4);
  const overflow = points.length - 4;

  return (
    <div className="relative w-full h-full overflow-hidden bg-[#e8eaed]">
      {/* Google Maps-style search / header bar */}
      <div className="absolute top-0 left-0 right-0 z-[500] flex items-center bg-white shadow-md px-3 py-2 space-x-2" style={{ minHeight: 38 }}>
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" style={{ fill: '#4285F4' }}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className="text-[11px] font-medium text-slate-700 truncate flex-1">{tripTitle}</span>
        <span className="text-[10px] text-slate-400 flex-shrink-0">{points.length} étapes</span>
      </div>

      {/* Map canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 top-[38px] bottom-[32px]" />

      {/* Google Maps-style zoom controls */}
      <div className="absolute right-2 top-12 z-[500] bg-white rounded shadow-md overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
        <button className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12"><line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
        <div className="h-px bg-gray-200 mx-1"></div>
        <button className="w-7 h-7 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
          <svg width="12" height="12" viewBox="0 0 12 12"><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>

      {/* Google Maps-style legend / compass (bottom-right) */}
      <div className="absolute right-2 bottom-9 z-[500]">
        <div className="w-7 h-7 bg-white rounded-full shadow-md flex items-center justify-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#dadce0" strokeWidth="1"/>
            <path d="M7 2 L8.2 6H5.8L7 2Z" fill="#EA4335"/>
            <path d="M7 12 L5.8 8H8.2L7 12Z" fill="#4285F4" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Bottom strip – Google Maps location chips */}
      <div className="absolute bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-100 flex items-center px-3 py-1.5 space-x-1" style={{ minHeight: 32 }}>
        {/* Start dot */}
        <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#34A853' }}></div>
        {visibleLabels.slice(0, 1).map((p) => (
          <span key={p.label} className="text-[10px] font-semibold text-slate-700 flex-shrink-0">{p.label}</span>
        ))}
        {points.length > 1 && (
          <>
            <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(to right, #4285F4 0, #4285F4 4px, transparent 4px, transparent 8px)' }}></div>
            {visibleLabels.slice(1, 3).map((p, i) => (
              <React.Fragment key={p.label}>
                <span className="text-[9px] text-slate-500 flex-shrink-0">{p.label}</span>
                {i < 1 && points.length > 2 && <div className="h-3 w-px bg-gray-200 flex-shrink-0"></div>}
              </React.Fragment>
            ))}
            {overflow > 1 && <span className="text-[9px] text-slate-400 flex-shrink-0">+{overflow}</span>}
            <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(to right, #4285F4 0, #4285F4 4px, transparent 4px, transparent 8px)' }}></div>
            {/* End dot */}
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: '#EA4335' }}></div>
            <span className="text-[10px] font-semibold text-slate-700 flex-shrink-0">{points[points.length - 1].label}</span>
          </>
        )}
      </div>

      {/* Attribution */}
      <div className="absolute bottom-9 left-2 z-[500]">
        <span className="text-[7px] text-slate-400">© CartoDB · OpenStreetMap</span>
      </div>

      <style>{`
        .gmaps-tip .leaflet-tooltip,
        .gmaps-tip {
          background: white !important;
          border: none !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25) !important;
          padding: 4px 8px !important;
          color: #1a1a1a !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 11px !important;
          font-weight: 600 !important;
          pointer-events: none !important;
          white-space: nowrap !important;
        }
        .gmaps-tip:before { display: none !important; }
        .gmaps-tip-sm .leaflet-tooltip,
        .gmaps-tip-sm {
          background: white !important;
          border: none !important;
          border-radius: 3px !important;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2) !important;
          padding: 3px 6px !important;
          color: #333 !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 10px !important;
          font-weight: 500 !important;
        }
        .gmaps-tip-sm:before { display: none !important; }
      `}</style>
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
    { label: 'Safari', value: 'Safari' },
    { label: 'Nord', value: 'Nord' }
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
            {/* IMAGE LAYER */}
            <div className={`absolute inset-0 z-10 transition-all duration-700 ease-in-out ${hoveredTripId === trip.id ? 'opacity-0 scale-105' : 'opacity-100 scale-100'}`}>
              <img
                src={trip.image || `https://placehold.co/800x1200?text=${trip.title.replace(/ /g, '+')}`}
                alt={trip.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/800x1200/0055A4/ffffff?text=${trip.title.replace(/ /g, '+')}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
            </div>

            {/* MAP LAYER (Google Maps style) */}
            <div className={`absolute inset-0 z-0 transition-all duration-700 ease-in-out ${hoveredTripId === trip.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              {trip.mapPoints && hoveredTripId === trip.id && (
                <MapPreview points={trip.mapPoints} tripTitle={trip.title} />
              )}
            </div>

            {/* CONTENT LAYER */}
            <div className="absolute inset-0 z-20 flex flex-col justify-end p-8 pointer-events-none">
              <div className={`transition-all duration-500 ${hoveredTripId === trip.id ? 'translate-y-[-10px] opacity-0' : 'translate-y-0 opacity-100'}`}>
                <div className="flex items-center space-x-3 mb-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fr-red">{trip.duration}</span>
                  <div className="w-1 h-1 bg-white/40 rounded-full"></div>
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{trip.region}</span>
                </div>
                <h3 className="text-2xl font-serif text-white mb-6 leading-tight drop-shadow-lg">
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
    </section>
  );
};

export default TripGrid;
