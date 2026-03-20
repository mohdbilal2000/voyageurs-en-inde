
import React from 'react';
import { REGIONS } from '../constants';

interface RegionalSectionProps {
  onRegionSelect: (region: string) => void;
}

const RegionalSection: React.FC<RegionalSectionProps> = ({ onRegionSelect }) => {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-4">Explorer les Régions</h2>
          <p className="text-slate-500 max-w-xl mx-auto italic font-light">Chaque coin de l'Inde est un univers à part entière. Choisissez votre porte d'entrée.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {REGIONS.map((region) => (
            <div 
              key={region.id} 
              onClick={() => onRegionSelect(region.name)}
              className="relative group overflow-hidden rounded-[2rem] aspect-[4/5] cursor-pointer shadow-lg active:scale-95 transition-transform"
            >
              <img 
                src={region.image} 
                alt={region.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="text-[9px] font-bold tracking-[0.3em] uppercase mb-2 text-fr-red">Destinations</p>
                <h3 className="text-3xl font-serif">{region.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RegionalSection;
