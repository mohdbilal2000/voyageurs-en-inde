
import React, { useState } from 'react';
import { Trip } from '../types';

interface TripDetailProps {
  trip: Trip;
  onRequestQuote: () => void;
}

const TripDetail: React.FC<TripDetailProps> = ({ trip, onRequestQuote }) => {
  const [activeDay, setActiveDay] = useState<number | null>(1);

  return (
    <div className="bg-white">
      {/* Hero Gallery */}
      <div className="relative h-[70vh] min-h-[500px] overflow-hidden">
        <img 
          src={trip.image} 
          alt={trip.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
        <div className="absolute bottom-12 left-0 right-0 px-6">
          <div className="max-w-5xl mx-auto text-white">
            <div className="flex items-center space-x-2 mb-4">
              <span className="bg-saffron text-white text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1.5 rounded shadow-lg">Disponibilités Limitées</span>
              <p className="uppercase text-sm tracking-widest font-bold opacity-80">{trip.region} • {trip.duration}</p>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif mb-6">{trip.title}</h1>
            <div className="flex flex-col md:flex-row md:items-center gap-6">
               <div className="flex flex-col">
                  <span className="text-xs uppercase tracking-widest text-white/60 mb-1">À partir de</span>
                  <span className="text-3xl font-bold">{trip.price.toLocaleString()}€ <span className="text-sm font-normal text-white/60">/ personne</span></span>
               </div>
               <button 
                onClick={onRequestQuote}
                className="bg-white text-slate-900 px-10 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-saffron hover:text-white transition-all shadow-xl text-[11px]"
               >
                 DEMANDER UN DEVIS SUR MESURE
               </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="mb-12">
              <h2 className="text-3xl font-serif mb-6">Une Expérience Hors du Commun</h2>
              <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light italic">"Un voyage méticuleusement orchestré où le luxe rencontre l'authenticité, conçu pour le voyageur qui cherche la profondeur plutôt que la distance."</p>
              <p className="text-lg text-slate-600 leading-relaxed">{trip.description}</p>
            </div>

            {/* Highlights */}
            <div className="mb-16">
              <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-l-4 border-saffron pl-4">Les Moments Forts</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {trip.highlights.map((h, i) => (
                  <div key={i} className="flex flex-col p-6 bg-slate-50 rounded-2xl border border-slate-100 group hover:bg-white hover:shadow-lg transition-all">
                    <span className="text-saffron font-serif italic text-3xl mb-4">0{i+1}</span>
                    <span className="font-semibold text-slate-900">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Itinerary Accordion */}
            <div className="mb-16">
               <h3 className="text-xl font-bold uppercase tracking-widest mb-8 border-l-4 border-saffron pl-4">Votre Itinéraire Sur Mesure</h3>
               <div className="space-y-4">
                 {trip.itinerary.map((day) => (
                   <div key={day.day} className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-300">
                     <button 
                        onClick={() => setActiveDay(activeDay === day.day ? null : day.day)}
                        className={`w-full flex items-center justify-between p-6 text-left transition-colors ${activeDay === day.day ? 'bg-slate-900 text-white' : 'hover:bg-slate-50'}`}
                     >
                        <div className="flex items-center space-x-6">
                           <span className={`text-2xl font-serif italic ${activeDay === day.day ? 'text-white/40' : 'text-slate-300'}`}>Jour {day.day}</span>
                           <h4 className="text-lg font-bold">{day.title}</h4>
                        </div>
                        <span className={`transform transition-transform ${activeDay === day.day ? 'rotate-180' : ''}`}>
                          ▼
                        </span>
                     </button>
                     {activeDay === day.day && (
                       <div className="p-8 text-slate-600 leading-relaxed border-t border-slate-100 bg-white">
                         <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1">
                              <p>{day.desc}</p>
                            </div>
                            <div className="md:w-1/3 bg-slate-50 p-4 rounded-xl text-sm">
                               <p className="font-bold uppercase tracking-widest text-[10px] mb-2 text-slate-400">Hébergement</p>
                               <p className="font-medium">Palais de Charme ou Boutique Hôtel de Luxe</p>
                            </div>
                         </div>
                       </div>
                     )}
                   </div>
                 ))}
               </div>
            </div>

            {/* Inclusions / Exclusions */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 py-12 border-t border-slate-100">
               <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-400">Ce qui est inclus</h4>
                  <ul className="space-y-3">
                    {['Vols internes & transferts de luxe privatisés', 'Hébergements 5* et Palais de Charme', 'Guides francophones experts locaux', 'Conciergerie personnalisée 24/7', 'Petits-déjeuners et dîners gastronomiques sélectionnés'].map(item => (
                      <li key={item} className="flex items-center space-x-3 text-slate-600 text-sm">
                        <span className="text-green-500 text-lg">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
               <div>
                  <h4 className="font-bold uppercase tracking-widest text-xs mb-6 text-slate-400">Ce qui n'est pas inclus</h4>
                  <ul className="space-y-3">
                    {['Vols internationaux', 'Assurance voyage (Obligatoire)', 'Pourboires pour les guides et chauffeurs', 'Dépenses personnelles'].map(item => (
                      <li key={item} className="flex items-center space-x-3 text-slate-400 text-sm">
                        <span className="text-slate-300 text-lg">✕</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
             <div className="sticky top-32 space-y-8">
               <div className="p-10 bg-slate-900 text-white rounded-[2rem] shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                 <h3 className="text-2xl font-serif mb-4 italic">Personnaliser ce voyage</h3>
                 <p className="text-slate-400 text-sm mb-8 leading-relaxed">Cet itinéraire est une source d'inspiration. Nous affinerons chaque instant pour qu'il corresponde parfaitement à votre style de voyage.</p>
                 
                 <div className="space-y-4 mb-8">
                    <div className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-xl">👤</div>
                      <div>
                        <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Expert Local</p>
                        <p className="text-sm">Parler avec Marc</p>
                      </div>
                    </div>
                 </div>

                 <button 
                  onClick={onRequestQuote}
                  className="w-full bg-saffron text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all mb-4 text-[10px]"
                 >
                   DEMANDER UNE PROPOSITION SUR MESURE
                 </button>
                 <div className="text-center">
                    <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Réponse sous 24 heures</p>
                 </div>
               </div>

               {/* Reassurance */}
               <div className="p-8 border border-slate-100 rounded-[2rem] bg-white text-center">
                  <h4 className="text-sm font-bold uppercase tracking-widest mb-6">Nos Garanties</h4>
                  <div className="space-y-6">
                    <div className="flex flex-col items-center">
                       <span className="text-3xl mb-2">🛡️</span>
                       <p className="text-xs font-bold uppercase tracking-tighter mb-1">Paiement Sécurisé</p>
                       <p className="text-[10px] text-slate-400 uppercase tracking-widest">Protection financière totale</p>
                    </div>
                    <div className="flex flex-col items-center">
                       <span className="text-3xl mb-2">📍</span>
                       <p className="text-xs font-bold uppercase tracking-tighter mb-1">Maîtrise Locale</p>
                       <p className="text-[10px] text-slate-400 uppercase tracking-widest">Support sur place 24/7</p>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {/* Final Reassurance Section */}
      <section className="bg-slate-50 py-24 border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-serif mb-6">Prêt à commencer l'aventure ?</h2>
          <p className="text-slate-500 mb-12 text-lg">Rejoignez les voyageurs exigeants qui font confiance à Voyageurs en Inde pour orchestrer leurs souvenirs les plus précieux.</p>
          <button 
            onClick={onRequestQuote}
            className="px-12 py-5 bg-slate-900 text-white rounded-full font-bold uppercase tracking-widest hover:bg-saffron transition-all shadow-xl"
          >
            COMMENCER MON VOYAGE SUR MESURE
          </button>
        </div>
      </section>
    </div>
  );
};

export default TripDetail;
