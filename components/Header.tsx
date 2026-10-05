
import React, { useState, useEffect } from 'react';
import { Page } from '../types';
import { useSiteData } from '../store/siteStore';

interface HeaderProps {
  onNavigateHome: () => void;
  onRequestQuote: () => void;
  onNavigate: (page: Page) => void;
  onRegionSelect: (regionId: string) => void;
  onThemeSelect: (themeId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onRequestQuote, onNavigate, onRegionSelect, onThemeSelect }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { regions: REGIONS, themes: THEMES } = useSiteData();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleRegionClick = (regionId: string) => {
    onRegionSelect(regionId);
    setActiveMenu(null);
    setMobileOpen(false);
  };

  const handleThemeClick = (themeId: string) => {
    onThemeSelect(themeId);
    setActiveMenu(null);
    setMobileOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled || mobileOpen ? 'bg-white shadow-md py-2' : 'py-4'
        }`}
        style={!isScrolled && !mobileOpen ? { background: 'linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.15) 70%, transparent 100%)' } : undefined}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={onNavigateHome}
            className={`flex flex-col items-start transition-colors duration-300 ${
              isScrolled || mobileOpen ? 'text-slate-900' : 'text-white'
            }`}
            style={!isScrolled && !mobileOpen ? { textShadow: '0 1px 4px rgba(0,0,0,0.4)' } : undefined}
          >
            <span className="text-2xl font-serif font-black tracking-tighter leading-none">VOYAGEURS</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] ml-0.5 text-fr-red">EN INDE</span>
          </button>

          {/* Desktop Navigation */}
          <nav className={`hidden lg:flex items-center space-x-10 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors duration-300 ${
            isScrolled ? 'text-slate-600' : 'text-white'
          }`}
            style={!isScrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.35)' } : undefined}
          >
            {/* Destinations Dropdown */}
            <div
              className="relative h-12 flex items-center cursor-pointer group"
              onMouseEnter={() => setActiveMenu('regions')}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <span className="group-hover:text-saffron transition-colors">Destinations</span>
              {activeMenu === 'regions' && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-[600px] bg-white shadow-2xl rounded-2xl border border-slate-100 p-8 text-slate-900 dropdown-animate grid grid-cols-2 gap-6" style={{ textShadow: 'none' }}>
                  <div className="col-span-2 border-b border-slate-100 pb-2 mb-2">
                     <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">Parcourir par region</p>
                  </div>
                  {REGIONS.map(r => (
                    <button
                      key={r.id}
                      onClick={() => handleRegionClick(r.id)}
                      className="flex items-center space-x-4 p-2 hover:bg-slate-50 rounded-xl transition-all group/item"
                    >
                      <img src={r.image} className="w-16 h-12 object-cover rounded-lg shadow-sm" alt={r.name} />
                      <div className="text-left">
                         <p className="font-serif text-base capitalize group-hover/item:text-saffron transition-colors">{r.name}</p>
                         <p className="text-[8px] uppercase tracking-widest text-slate-400">Explorer</p>
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-64 bg-white shadow-2xl rounded-2xl border border-slate-100 p-4 text-slate-900 dropdown-animate flex flex-col space-y-1" style={{ textShadow: 'none' }}>
                  {THEMES.map(t => (
                    <button
                      key={t.id}
                      onClick={() => handleThemeClick(t.id)}
                      className="w-full text-left px-4 py-3 hover:bg-slate-50 rounded-xl transition-all flex items-center justify-between group/item"
                    >
                      <span className="font-serif text-sm group-hover/item:text-saffron transition-colors">{t.name}</span>
                      <span className="opacity-0 group-hover/item:opacity-100 transition-opacity">&#8594;</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => handleNavClick(Page.Guides)} className="hover:text-saffron transition-colors">Conseils</button>
            <button onClick={() => handleNavClick(Page.About)} className="hover:text-saffron transition-colors">L'Agence</button>
          </nav>

          {/* Action Controls */}
          <div className="flex items-center space-x-4">
            <button className={`hidden xl:block text-[10px] font-bold uppercase tracking-widest transition-colors ${
              isScrolled ? 'text-slate-500 hover:text-slate-900' : 'text-white/90 hover:text-white'
            }`}
              style={!isScrolled ? { textShadow: '0 1px 3px rgba(0,0,0,0.35)' } : undefined}
            >
              Espace Client
            </button>
            <button
              onClick={onRequestQuote}
              className={`hidden sm:block px-7 py-3 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 transform active:scale-95 ${
                isScrolled
                ? 'bg-fr-red text-white shadow-lg hover:bg-slate-900'
                : 'bg-white text-slate-900 hover:bg-fr-red hover:text-white'
              }`}
            >
              DEVIS SUR MESURE
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`lg:hidden flex flex-col justify-center items-center w-10 h-10 rounded-lg transition-colors ${
                isScrolled || mobileOpen ? 'text-slate-900' : 'text-white'
              }`}
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3px] bg-slate-900' : isScrolled ? 'bg-slate-900' : 'bg-white'}`}></span>
              <span className={`block w-5 h-0.5 rounded-full mt-1 transition-all duration-300 ${mobileOpen ? 'opacity-0' : isScrolled ? 'bg-slate-900' : 'bg-white'}`}></span>
              <span className={`block w-5 h-0.5 rounded-full mt-1 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[5px] bg-slate-900' : isScrolled ? 'bg-slate-900' : 'bg-white'}`}></span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[49] bg-white flex flex-col pt-[72px] px-8 pb-8 overflow-y-auto animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-1">
            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-4 mt-4">Destinations</p>
            {REGIONS.map(r => (
              <button
                key={r.id}
                onClick={() => handleRegionClick(r.id)}
                className="flex items-center space-x-4 py-3 px-2 hover:bg-slate-50 rounded-xl transition-all text-left"
              >
                <img src={r.image} className="w-12 h-9 object-cover rounded-lg" alt={r.name} />
                <span className="font-serif text-lg">{r.name}</span>
              </button>
            ))}

            <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 mb-4 mt-8">Vos Envies</p>
            {THEMES.map(t => (
              <button
                key={t.id}
                onClick={() => handleThemeClick(t.id)}
                className="py-3 px-2 text-left font-serif text-lg hover:text-saffron transition-colors"
              >
                {t.name}
              </button>
            ))}

            <div className="border-t border-slate-100 mt-6 pt-6 space-y-4">
              <button onClick={() => handleNavClick(Page.Guides)} className="block w-full text-left py-3 px-2 font-bold text-sm uppercase tracking-widest hover:text-saffron transition-colors">
                Conseils
              </button>
              <button onClick={() => handleNavClick(Page.About)} className="block w-full text-left py-3 px-2 font-bold text-sm uppercase tracking-widest hover:text-saffron transition-colors">
                L'Agence
              </button>
            </div>
          </nav>

          <div className="mt-auto pt-8">
            <button
              onClick={() => { onRequestQuote(); setMobileOpen(false); }}
              className="w-full bg-fr-red text-white py-4 rounded-full font-black uppercase tracking-[0.2em] text-[11px] hover:bg-slate-900 transition-colors"
            >
              DEVIS SUR MESURE
            </button>
            <div className="mt-6 text-center">
              <a href="tel:+917505833393" className="text-sm text-slate-500 hover:text-saffron transition-colors">+91 750 583 3393</a>
              <span className="mx-3 text-slate-300">|</span>
              <a href="https://wa.me/917505833393" target="_blank" rel="noopener noreferrer" className="text-sm text-slate-500 hover:text-saffron transition-colors">WhatsApp</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
