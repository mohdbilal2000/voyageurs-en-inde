import React from 'react';

interface HeroProps {
  onRequestQuote: () => void;
}

const Hero: React.FC<HeroProps> = ({ onRequestQuote }) => {
  return (
    <div className="relative h-screen min-h-[750px] flex items-center justify-center overflow-hidden">
      {/* Background with subtle Zoom Effect */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1548013146-72479768bbaa?q=80&w=2500&auto=format&fit=crop" 
          alt="Taj Mahal Sunrise"
          className="w-full h-full object-cover animate-in fade-in duration-1000 zoom-in-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-blur-[1px]"></div>
      </div>

      {/* Content Layer */}
      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="mb-8 overflow-hidden">
          <span className="inline-block text-saffron text-[11px] font-black tracking-[0.6em] uppercase animate-in slide-in-from-bottom-full duration-700">
            L'ÉVASION SUR MESURE EN INDE
          </span>
        </div>
        
        <h1 className="text-5xl md:text-8xl text-white font-serif leading-[1.1] mb-12 animate-in fade-in duration-1000 delay-300">
          Vivez l’Inde <br /> 
          <span className="italic font-normal">en toute liberté.</span>
        </h1>
        
        {/* Search Bar */}
        <div className="mt-12 p-3 bg-white/95 backdrop-blur shadow-2xl rounded-2xl md:rounded-full inline-flex flex-col md:flex-row items-stretch border border-white/20 animate-in slide-in-from-bottom-8 duration-1000 delay-500">
          <div className="flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-slate-100">
            <div className="px-10 py-5 text-left min-w-[240px]">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-2">Destination</p>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Rajasthan, Kerala, Ladakh..." 
                  className="bg-transparent text-slate-900 placeholder-slate-300 outline-none w-full font-serif text-lg"
                />
              </div>
            </div>
            <div className="px-10 py-5 text-left min-w-[200px]">
              <p className="text-[9px] text-slate-400 font-black uppercase tracking-widest mb-2">Voyageurs</p>
              <select className="bg-transparent text-slate-900 outline-none w-full font-serif text-lg appearance-none cursor-pointer">
                <option value="couple">Couple (2 pers.)</option>
                <option value="famille">Famille (3+)</option>
                <option value="solo">Solo</option>
                <option value="groupe">Groupe d'amis</option>
              </select>
            </div>
          </div>
          <button 
            onClick={onRequestQuote}
            className="w-full md:w-auto px-12 py-5 bg-saffron text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] hover:bg-slate-900 transition-all shadow-xl hover:shadow-saffron/20 active:scale-95 flex items-center justify-center"
          >
            CRÉER MON VOYAGE
          </button>
        </div>

        <div className="mt-16 flex items-center justify-center space-x-12">
           <div className="text-white/60 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest mb-2">100% Local</span>
              <div className="h-px w-8 bg-saffron/40"></div>
           </div>
           <div className="text-white/60 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest mb-2">Assistance 24/7</span>
              <div className="h-px w-8 bg-saffron/40"></div>
           </div>
           <div className="text-white/60 flex flex-col items-center">
              <span className="text-xs font-bold uppercase tracking-widest mb-2">Expertise Française</span>
              <div className="h-px w-8 bg-saffron/40"></div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 opacity-50">
        <span className="text-[8px] text-white font-bold uppercase tracking-[0.3em]">Découvrir</span>
        <div className="w-0.5 h-12 bg-gradient-to-b from-white to-transparent"></div>
      </div>
    </div>
  );
};

export default Hero;