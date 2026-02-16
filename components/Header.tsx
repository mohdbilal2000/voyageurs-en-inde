
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { REGIONS, THEMES } from '../constants';

interface HeaderProps {
  onNavigateHome: () => void;
  onRequestQuote: () => void;
  onNavigate: (page: Page) => void;
  onFilterSelect: (filter: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onRequestQuote, onNavigate, onFilterSelect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setActiveMenu(null);
  };

  const handleFilterClick = (filter: string) => {
    onFilterSelect(filter);
    setActiveMenu(null);
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/98 shadow-md py-2' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <button 
          onClick={onNavigateHome}
          className={`flex flex-col items-start transition-colors duration-300 ${
            isScrolled ? 'text-slate-900' : 'text-white'
          }`}
        >
          <span className="text-2xl font-serif font-black tracking-tighter leading-none">VOYAGEURS</span>
          <span className={`text-[10px] font-bold uppercase tracking-[0.4em] ml-0.5 text-saffron`}>EN INDE</span>
        </button>

        {/* Primary Navigation */}
        <nav className={`hidden lg:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
          isScrolled ? 'text-slate-600' : 'text-white'
        }`}>
          {/* Destinations Dropdown */}
          <div 
            className="relative h-12 flex items-center cursor-pointer group"
            onMouseEnter={() => setActiveMenu('regions')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="group-hover:text-saffron transition-colors">Destinations</span>
            {activeMenu === 'regions' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-8 text-slate-900 dropdown-animate grid grid-cols-2 gap-6">
                <div className="col-span-2 border-b border-slate-100 pb-2 mb-2">
                   <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Parcourir par région</p>
                </div>
                {REGIONS.map(r => (
                  <button 
                    key={r.id} 
                    onClick={() => handleFilterClick(r.name)} 
                    className="flex items-center space-x-4 p-2 hover:bg-slate-50 rounded-xl transition-all group/item"
                  >
                    <img src={r.image} className="w-16 h-12 object-cover rounded-lg shadow-sm" alt={r.name} />
                    <div className="text-left">
                       <p className="font-serif text-base capitalize group-hover/item:text-saffron transition-colors">{r.name}</p>
                       <p className="text-[8px] uppercase tracking-widest text-slate-400">Explorer l'itinéraire</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Themes Dropdown */}
          <div 
            className="relative h-12 flex items-center cursor-pointer group"
            onMouseEnter={() => setActiveMenu('themes')}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <span className="group-hover:text-saffron transition-colors">Vos Envies</span>
            {activeMenu === 'themes' && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-2xl border border-slate-100 p-4 text-slate-900 dropdown-animate flex flex-col space-y-1">
                {THEMES.map(t => (
                  <button 
                    key={t.id} 
                    onClick={() => handleFilterClick(t.name.split(' ')[0])} 
                    className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-between group/item"
                  >
                    <span className="font-serif text-sm group-hover/item:text-saffron transition-colors">{t.name}</span>
                    <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          <button onClick={() => handleNavClick(Page.Guides)} className="hover:text-saffron transition-colors">Conseils</button>
          <button onClick={() => handleNavClick(Page.About)} className="hover:text-saffron transition-colors">L'Agence</button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-6">
          <button className={`hidden xl:block text-[10px] font-bold uppercase tracking-widest transition-colors ${
            isScrolled ? 'text-slate-500 hover:text-slate-900' : 'text-white/80 hover:text-white'
          }`}>
            Espace Client
          </button>
          <button 
            onClick={onRequestQuote}
            className={`px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-95 ${
              isScrolled 
              ? 'bg-saffron text-white shadow-lg shadow-saffron/20 hover:bg-slate-900' 
              : 'bg-white text-slate-900 hover:bg-saffron hover:text-white'
            }`}
          >
            DEVIS SUR MESURE
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
