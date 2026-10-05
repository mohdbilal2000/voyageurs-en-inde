import React from 'react';
import { Link } from 'react-router-dom';
import { Trip } from '../types';

interface RelatedTripsProps {
  currentTrip: Trip;
  allTrips: Trip[];
}

const RelatedTrips: React.FC<RelatedTripsProps> = ({ currentTrip, allTrips }) => {
  const related = allTrips
    .filter((t) => t.id !== currentTrip.id && (t.region === currentTrip.region || t.theme === currentTrip.theme))
    .slice(0, 3);

  if (related.length === 0) return null;

  return (
    <section className="bg-white py-24 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-saffron text-xs font-black uppercase tracking-[0.4em] mb-4 block">À Découvrir Aussi</span>
        <h2 className="text-3xl font-serif mb-12 italic">Circuits Similaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {related.map((trip) => (
            <Link
              key={trip.id}
              to={`/circuits/${trip.slug}`}
              className="group block rounded-[1.5rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                <div className="absolute bottom-4 left-5 right-5 text-white">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fr-red">{trip.duration}</span>
                  <h3 className="font-serif text-lg leading-tight mt-1">{trip.title}</h3>
                </div>
              </div>
              <div className="p-4 flex items-center justify-between">
                <span className="text-sm font-serif">{trip.price.toLocaleString()}€</span>
                <span className="text-[9px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">Découvrir →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedTrips;
