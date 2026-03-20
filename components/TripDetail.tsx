
import React, { useState, useEffect, useRef } from 'react';
import { Trip, MapPoint, ItineraryItem } from '../types';

interface DetailMapProps {
  points: MapPoint[];
  activeLocation?: { lat: number, lng: number } | null;
}

const DetailMap: React.FC<DetailMapProps> = ({ points, activeLocation }) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());

  useEffect(() => {
    if (!mapContainerRef.current || !points.length) return;

    const L = (window as any).L;
    if (!L) return;

    if (!mapRef.current) {
      const map = L.map(mapContainerRef.current, {
        zoomControl: false,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      // CartoDB Voyager tiles — closest to Google Maps
      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      mapRef.current = map;

      const latLngs = points.map(p => [p.lat, p.lng]);

      // White halo behind route
      L.polyline(latLngs, {
        color: 'rgba(255,255,255,0.6)',
        weight: 7,
        opacity: 1,
      }).addTo(map);

      // Google Maps blue route
      L.polyline(latLngs, {
        color: '#4285F4',
        weight: 4,
        opacity: 0.95,
      }).addTo(map);

      points.forEach((p, idx) => {
        const isFirst = idx === 0;
        const isLast = idx === points.length - 1;

        if (isFirst || isLast) {
          // Google Maps teardrop pin for start/end
          const pinColor = isFirst ? '#34A853' : '#EA4335';
          const pinSvg = `
            <svg width="28" height="40" viewBox="0 0 24 34" xmlns="http://www.w3.org/2000/svg" style="filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35))">
              <path d="M12 0C5.373 0 0 5.373 0 12C0 20.667 12 34 12 34C12 34 24 20.667 24 12C24 5.373 18.627 0 12 0Z" fill="${pinColor}"/>
              <circle cx="12" cy="12" r="6" fill="white"/>
            </svg>`;
          const icon = L.divIcon({
            className: '',
            html: `<div>${pinSvg}</div>`,
            iconSize: [28, 40],
            iconAnchor: [14, 40],
            popupAnchor: [0, -42]
          });
          const marker = L.marker([p.lat, p.lng], { icon }).addTo(map)
            .bindTooltip(`<div class="gmaps-detail-label"><strong>${p.label}</strong></div>`, {
              permanent: true,
              direction: isFirst ? 'right' : 'left',
              className: 'gmaps-detail-tip',
              offset: isFirst ? [8, -20] : [-8, -20]
            });
          markersRef.current.set(`${p.lat}-${p.lng}`, marker);
        } else {
          // Small blue circle for intermediate stops
          const icon = L.divIcon({
            className: '',
            html: `<div class="marker-dot" style="width:12px;height:12px;background:#4285F4;border:2.5px solid white;border-radius:50%;box-shadow:0 1px 4px rgba(0,0,0,0.3);transition:all 0.4s ease"></div>`,
            iconSize: [12, 12],
            iconAnchor: [6, 6],
          });
          const marker = L.marker([p.lat, p.lng], { icon }).addTo(map)
            .bindTooltip(`<div class="gmaps-detail-label-sm">${p.label}</div>`, {
              permanent: false,
              direction: 'top',
              className: 'gmaps-detail-tip-sm',
              offset: [0, -8]
            });
          markersRef.current.set(`${p.lat}-${p.lng}`, marker);
        }
      });

      const bounds = L.latLngBounds(latLngs);
      map.fitBounds(bounds, { padding: [50, 50] });
    }

    if (activeLocation && mapRef.current) {
      mapRef.current.setView([activeLocation.lat, activeLocation.lng], 10, {
        animate: true,
        duration: 1.5
      });

      // Visual feedback on the active marker
      markersRef.current.forEach((marker, key) => {
        const markerEl = marker.getElement();
        if (markerEl) {
          const dot = markerEl.querySelector('.marker-dot');
          if (key === `${activeLocation.lat}-${activeLocation.lng}`) {
            if (dot) {
              dot.style.background = '#FBBC04';
              dot.style.transform = 'scale(1.8)';
              dot.style.boxShadow = '0 0 0 8px rgba(251,188,4,0.25)';
            }
          } else {
            if (dot) {
              dot.style.background = '#4285F4';
              dot.style.transform = 'scale(1)';
              dot.style.boxShadow = '0 1px 4px rgba(0,0,0,0.3)';
            }
          }
        }
      });
    }

  }, [points, activeLocation]);

  return (
    <div className="relative w-full h-full bg-[#e8eaed] rounded-2xl overflow-hidden shadow-lg border border-slate-200">
      {/* Google Maps style header */}
      <div className="absolute top-0 left-0 right-0 z-[500] flex items-center bg-white shadow-md px-4 py-2.5 space-x-2" style={{ minHeight: 42 }}>
        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" style={{ fill: '#4285F4' }}>
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
        </svg>
        <span className="text-[12px] font-medium text-slate-700 truncate flex-1">Carte du Voyage</span>
        <span className="text-[10px] text-slate-400 flex-shrink-0">{points.length} etapes</span>
      </div>

      {/* Map canvas */}
      <div ref={mapContainerRef} className="absolute inset-0 top-[42px] bottom-[36px]" />

      {/* Google Maps zoom controls */}
      <div className="absolute right-3 top-14 z-[500] bg-white rounded shadow-md overflow-hidden" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 12 12"><line x1="6" y1="1" x2="6" y2="11" stroke="currentColor" strokeWidth="1.5"/><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
        <div className="h-px bg-gray-200 mx-1"></div>
        <button className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-gray-50 transition-colors">
          <svg width="14" height="14" viewBox="0 0 12 12"><line x1="1" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.5"/></svg>
        </button>
      </div>

      {/* Compass */}
      <div className="absolute right-3 bottom-12 z-[500]">
        <div className="w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center" style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.3)' }}>
          <svg width="16" height="16" viewBox="0 0 14 14" fill="none">
            <circle cx="7" cy="7" r="6" stroke="#dadce0" strokeWidth="1"/>
            <path d="M7 2 L8.2 6H5.8L7 2Z" fill="#EA4335"/>
            <path d="M7 12 L5.8 8H8.2L7 12Z" fill="#4285F4" opacity="0.4"/>
          </svg>
        </div>
      </div>

      {/* Bottom strip with route summary */}
      <div className="absolute bottom-0 left-0 right-0 z-[500] bg-white border-t border-gray-100 flex items-center px-4 py-2 space-x-2" style={{ minHeight: 36 }}>
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#34A853' }}></div>
        <span className="text-[11px] font-semibold text-slate-700 flex-shrink-0">{points[0]?.label}</span>
        <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(to right, #4285F4 0, #4285F4 4px, transparent 4px, transparent 8px)' }}></div>
        <span className="text-[10px] text-slate-400 flex-shrink-0">{points.length} etapes</span>
        <div className="flex-1 h-px" style={{ background: 'repeating-linear-gradient(to right, #4285F4 0, #4285F4 4px, transparent 4px, transparent 8px)' }}></div>
        <span className="text-[11px] font-semibold text-slate-700 flex-shrink-0">{points[points.length - 1]?.label}</span>
        <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: '#EA4335' }}></div>
      </div>

      {/* Attribution */}
      <div className="absolute bottom-10 left-3 z-[500]">
        <span className="text-[8px] text-slate-400 bg-white/80 px-1 rounded">&copy; CartoDB &middot; OpenStreetMap</span>
      </div>

      <style>{`
        .gmaps-detail-tip, .gmaps-detail-tip .leaflet-tooltip {
          background: white !important;
          border: none !important;
          border-radius: 4px !important;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25) !important;
          padding: 5px 10px !important;
          color: #1a1a1a !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 12px !important;
          font-weight: 600 !important;
          pointer-events: none !important;
          white-space: nowrap !important;
        }
        .gmaps-detail-tip:before { display: none !important; }
        .gmaps-detail-tip-sm, .gmaps-detail-tip-sm .leaflet-tooltip {
          background: white !important;
          border: none !important;
          border-radius: 3px !important;
          box-shadow: 0 1px 4px rgba(0,0,0,0.2) !important;
          padding: 4px 8px !important;
          color: #333 !important;
          font-family: 'Inter', sans-serif !important;
          font-size: 11px !important;
          font-weight: 500 !important;
        }
        .gmaps-detail-tip-sm:before { display: none !important; }
      `}</style>
    </div>
  );
};

interface TripDetailProps {
  trip: Trip;
  onRequestQuote: () => void;
}

const TripDetail: React.FC<TripDetailProps> = ({ trip, onRequestQuote }) => {
  const [activeDay, setActiveDay] = useState<number | null>(1);
  const [activeLocation, setActiveLocation] = useState<{lat: number, lng: number} | null>(null);

  const handleDayToggle = (day: ItineraryItem) => {
    const isClosing = activeDay === day.day;
    setActiveDay(isClosing ? null : day.day);
    if (!isClosing && day.lat && day.lng) {
      setActiveLocation({ lat: day.lat, lng: day.lng });
    }
  };

  return (
    <div className="bg-white">
      {/* Hero Gallery */}
      <div className="relative h-[80vh] min-h-[600px] overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-black/30"></div>
        <div className="absolute bottom-20 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="max-w-3xl text-white">
              <div className="flex items-center space-x-3 mb-6">
                <span className="bg-fr-red text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-2xl">L'Évasion Absolue</span>
                <p className="uppercase text-xs tracking-[0.3em] font-bold opacity-80">{trip.region} • {trip.duration}</p>
              </div>
              <h1 className="text-6xl md:text-8xl font-serif mb-10 leading-[1.1]">{trip.title}</h1>
              <div className="flex flex-col md:flex-row md:items-center gap-10">
                 <div className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/60 mb-2 font-bold">Investissement Voyage</span>
                    <span className="text-4xl font-serif">{trip.price.toLocaleString()}€ <span className="text-base font-normal opacity-60">/ pers.</span></span>
                 </div>
                 <button 
                  onClick={onRequestQuote}
                  className="bg-white text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-fr-red hover:text-white transition-all shadow-2xl text-[11px] transform hover:-translate-y-1"
                 >
                   DÉBUTER LA CONCEPTION
                 </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Main Content (Itinerary) */}
          <div className="lg:col-span-7">
            <div className="mb-20">
              <span className="text-saffron text-xs font-black uppercase tracking-[0.4em] mb-6 block">Le Programme</span>

              <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">Votre Route Exclusive</h2>
              <p className="text-lg text-slate-500 leading-relaxed font-light mb-12">
                Chaque étape de ce voyage a été pensée pour équilibrer confort absolu et découvertes spontanées. Cet itinéraire n'est qu'une esquisse que nous adapterons à vos envies les plus secrètes.
              </p>
              
              {/* Itinerary Accordion */}
              <div className="space-y-6">
                {trip.itinerary.map((day) => (
                  <div key={day.day} className={`border border-slate-100 rounded-[2rem] overflow-hidden transition-all duration-500 ${activeDay === day.day ? 'shadow-2xl border-transparent bg-white ring-1 ring-slate-100' : 'hover:bg-slate-50'}`}>
                    <button 
                       onClick={() => handleDayToggle(day)}
                       className={`w-full flex items-center justify-between p-8 text-left transition-colors ${activeDay === day.day ? 'bg-slate-900 text-white' : ''}`}
                    >
                       <div className="flex items-center space-x-8">
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif italic text-xl border transition-all ${activeDay === day.day ? 'bg-fr-red border-transparent text-white' : 'bg-white border-slate-200 text-slate-300'}`}>
                            {day.day}
                          </div>
                          <div>
                            <h4 className="text-lg font-bold tracking-tight">{day.title}</h4>
                            <p className={`text-[10px] uppercase tracking-[0.2em] font-bold ${activeDay === day.day ? 'text-white/60' : 'text-slate-400'}`}>Étape du jour</p>
                          </div>
                       </div>
                       <span className={`transform transition-transform duration-500 ${activeDay === day.day ? 'rotate-180 opacity-100' : 'opacity-20'}`}>
                         <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                       </span>
                    </button>
                    {activeDay === day.day && (
                      <div className="p-10 text-slate-600 leading-relaxed bg-white animate-in slide-in-from-top-4 duration-500">
                        <div className="flex flex-col space-y-8">
                           <div className="text-lg font-light leading-relaxed">
                             <p>{day.desc}</p>
                           </div>
                           <div className="grid grid-cols-2 gap-6 pt-8 border-t border-slate-50">
                              <div className="bg-slate-50 p-6 rounded-2xl">
                                <p className="font-black uppercase tracking-[0.2em] text-[9px] mb-3 text-slate-400">Le Logis</p>
                                <p className="font-serif italic text-slate-900">Palais de Charme ou Heritage Hotel</p>
                              </div>
                              <div className="bg-slate-50 p-6 rounded-2xl">
                                <p className="font-black uppercase tracking-[0.2em] text-[9px] mb-3 text-slate-400">Expérience Locale</p>
                                <p className="font-serif italic text-slate-900">Rencontre privée ou visite exclusive</p>
                              </div>
                           </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Highlights (Smaller version) */}
            <div className="grid grid-cols-2 gap-6">
               {trip.highlights.map((h, i) => (
                 <div key={i} className="flex items-start space-x-4 p-6 border border-slate-100 rounded-2xl bg-white shadow-sm">
                   <span className="text-saffron font-bold">&#9670;</span>
                   <span className="text-sm font-medium text-slate-700">{h}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Sticky Map Sidebar */}
          <div className="lg:col-span-5 relative">
             <div className="sticky top-32 space-y-10">
               <div className="h-[500px] w-full">
                  <DetailMap points={trip.mapPoints || []} activeLocation={activeLocation} />
               </div>

               {/* Request Quote Card */}
               <div className="p-10 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                  <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/5 rounded-full group-hover:scale-150 transition-transform duration-1000"></div>
                  <h3 className="text-3xl font-serif mb-4 italic">Sur Mesure</h3>
                  <p className="text-slate-400 text-sm mb-10 leading-relaxed font-light">Nos conseillers sont à votre écoute pour sculpter cet itinéraire selon vos désirs. Réponse sous 24h.</p>
                  
                  <div className="space-y-4 mb-10">
                    <div className="flex items-center space-x-5 p-5 bg-white/5 rounded-2xl border border-white/10">
                       <img src="https://i.pravatar.cc/100?u=marc" className="w-12 h-12 rounded-full object-cover" alt="Expert" />
                       <div>
                         <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Votre Expert</p>
                         <p className="text-sm font-bold">Conseils de Marc Lefebvre</p>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={onRequestQuote}
                    className="w-full bg-fr-red text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all text-[10px] shadow-xl"
                  >
                    RECEVOIR MA PROPOSITION
                  </button>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Social Proof Integration */}
      <section className="bg-slate-50 py-32 border-t border-slate-100">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <span className="text-fr-red text-xs font-black uppercase tracking-[0.5em] mb-6 block">L'Exigence Voyageurs</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-10 italic">Prêt à vivre cette expérience ?</h2>
          <p className="text-slate-500 mb-12 text-lg font-light leading-relaxed">Chaque voyage est une pièce unique. Confiez-nous vos rêves, nous en ferons votre réalité.</p>
          <button 
            onClick={onRequestQuote}
            className="px-12 py-6 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-fr-red transition-all shadow-2xl transform active:scale-95"
          >
            COMMENCER MON PROJET
          </button>
        </div>
      </section>
    </div>
  );
};

export default TripDetail;
