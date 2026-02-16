
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
        zoomControl: true,
        attributionControl: false,
        scrollWheelZoom: false,
      });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
        maxZoom: 19
      }).addTo(map);

      mapRef.current = map;

      const latLngs = points.map(p => [p.lat, p.lng]);
      L.polyline(latLngs, {
        color: '#B37012',
        weight: 3,
        opacity: 0.6,
        dashArray: '5, 10'
      }).addTo(map);

      points.forEach((p, idx) => {
        const markerIcon = L.divIcon({
          className: 'custom-detail-marker',
          html: `<div class="marker-dot w-3 h-3 bg-slate-900 border-2 border-white rounded-full shadow-lg"></div>`,
          iconSize: [12, 12],
          iconAnchor: [6, 6]
        });

        const marker = L.marker([p.lat, p.lng], { icon: markerIcon }).addTo(map)
          .bindTooltip(`<span class="font-bold text-[10px] uppercase tracking-widest px-2 py-1">${p.label}</span>`, {
            permanent: true,
            direction: 'top',
            offset: [0, -5],
            className: 'detail-map-tooltip'
          });
        
        markersRef.current.set(`${p.lat}-${p.lng}`, marker);
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
        if (key === `${activeLocation.lat}-${activeLocation.lng}`) {
          markerEl?.classList.add('marker-active');
        } else {
          markerEl?.classList.remove('marker-active');
        }
      });
    }

  }, [points, activeLocation]);

  return (
    <div className="relative w-full h-full bg-[#f8f9fa] rounded-[2rem] overflow-hidden shadow-inner border border-slate-100">
      <div ref={mapContainerRef} className="w-full h-full" />
      <div className="absolute top-6 left-6 z-[500]">
        <div className="bg-white/90 backdrop-blur px-4 py-2 rounded-full border border-slate-200 shadow-sm flex items-center space-x-2">
          <div className="w-2 h-2 bg-saffron rounded-full animate-pulse"></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-slate-900">Carte du Périple</span>
        </div>
      </div>
      <style>{`
        .detail-map-tooltip {
          background: white !important;
          border: none !important;
          border-radius: 8px !important;
          box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1) !important;
          padding: 0 !important;
        }
        .marker-active .marker-dot {
          background: #db8b21 !important;
          transform: scale(2);
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 0 0 10px rgba(219, 139, 33, 0.2);
        }
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
                <span className="bg-saffron text-white text-[10px] font-black uppercase tracking-[0.3em] px-4 py-2 rounded-full shadow-2xl">L'Évasion Absolue</span>
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
                  className="bg-white text-slate-900 px-12 py-5 rounded-full font-black uppercase tracking-[0.2em] hover:bg-saffron hover:text-white transition-all shadow-2xl text-[11px] transform hover:-translate-y-1"
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
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center font-serif italic text-xl border transition-all ${activeDay === day.day ? 'bg-saffron border-transparent text-white' : 'bg-white border-slate-200 text-slate-300'}`}>
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
                   <span className="text-saffron font-bold">✦</span>
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
                    className="w-full bg-saffron text-white py-5 rounded-full font-black uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all text-[10px] shadow-xl"
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
          <span className="text-saffron text-xs font-black uppercase tracking-[0.5em] mb-6 block">L'Exigence Voyageurs</span>
          <h2 className="text-4xl md:text-5xl font-serif mb-10 italic">Prêt à vivre cette expérience ?</h2>
          <p className="text-slate-500 mb-12 text-lg font-light leading-relaxed">Chaque voyage est une pièce unique. Confiez-nous vos rêves, nous en ferons votre réalité.</p>
          <button 
            onClick={onRequestQuote}
            className="px-12 py-6 bg-slate-900 text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-saffron transition-all shadow-2xl transform active:scale-95"
          >
            COMMENCER MON PROJET
          </button>
        </div>
      </section>
    </div>
  );
};

export default TripDetail;
