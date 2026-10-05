
import React from 'react';
import { useSiteData } from '../store/siteStore';

interface ThemesSectionProps {
  onThemeSelect: (theme: string) => void;
}

const ThemesSection: React.FC<ThemesSectionProps> = ({ onThemeSelect }) => {
  const { themes: THEMES } = useSiteData();
  return (
    <section className="py-24 bg-[#f8f9fc]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="max-w-lg mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Voyager selon vos envies</h2>
            <p className="text-slate-500 font-light leading-relaxed">Que vous cherchiez la spiritualité, l'aventure ou la sérénité tropicale, nous créons le voyage qui vous ressemble.</p>
          </div>
          <button className="px-10 py-4 bg-white text-slate-900 border border-slate-100 rounded-full font-bold text-[10px] uppercase tracking-widest hover:bg-fr-red hover:text-white transition-all shadow-sm">
            Toutes nos inspirations
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {THEMES.map((theme) => (
            <div 
              key={theme.id} 
              onClick={() => onThemeSelect(theme.id)}
              className="relative group h-72 overflow-hidden rounded-[2.5rem] cursor-pointer shadow-xl active:scale-95 transition-transform"
            >
              <img 
                src={theme.image} 
                alt={theme.name}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/20 transition-all duration-500"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-8 text-center">
                <span className="text-5xl mb-4 group-hover:scale-125 transition-transform duration-500">{theme.icon}</span>
                <h3 className="text-4xl font-serif italic mb-4">{theme.name}</h3>
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 bg-fr-red text-white px-8 py-3 rounded-full text-[10px] font-black uppercase tracking-widest translate-y-4 group-hover:translate-y-0 shadow-xl">
                  Explorer ce thème
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ThemesSection;
