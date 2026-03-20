
import React from 'react';

const SocialProof: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif italic">Pourquoi nous faire confiance ?</h2>
            <p className="text-slate-400 text-lg leading-relaxed font-light">Plus qu'une agence, nous sommes vos compagnons de voyage. Une expertise locale couplée à une exigence française.</p>
            <div className="flex space-x-6">
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-fr-red mb-1">98%</span>
                <span className="text-[9px] uppercase text-slate-500 font-bold tracking-widest">Satisfaction Client</span>
              </div>
              <div className="flex flex-col">
                <span className="text-4xl font-serif text-fr-red mb-1">15+</span>
                <span className="text-[9px] uppercase text-slate-500 font-bold tracking-widest">Ans d'Expertise</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-2 bg-white/5 p-12 rounded-[3rem] backdrop-blur border border-white/5 relative group hover:bg-white/10 transition-colors">
            <div className="absolute top-12 right-12 text-8xl font-serif leading-none" style={{color: 'rgba(0,85,164,0.1)'}}>{"\""}</div>
            <p className="text-2xl md:text-3xl font-serif italic mb-10 relative z-10 leading-relaxed">"Le voyage au Rajasthan était tout simplement féerique. Chaque détail était orchestré avec une précision rare, nous laissant libres de savourer chaque instant sans aucun stress logistique. Une expérience vraiment sur mesure."</p>
            <div className="flex items-center space-x-5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-fr-red">
                <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Client" />
              </div>
              <div>
                <p className="font-bold text-lg">Famille Dubois</p>
                <p className="text-slate-500 text-xs uppercase tracking-widest">Grand Tour du Rajasthan • Février 2024</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-24 flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
           <div className="flex items-center space-x-3">
             <span className="text-2xl">★</span>
             <span className="uppercase text-[9px] font-bold tracking-[0.3em]">Élu Meilleure Agence Locale 2023</span>
           </div>
           <div className="flex items-center space-x-3">
             <span className="text-2xl">🛡️</span>
             <span className="uppercase text-[9px] font-bold tracking-[0.3em]">Garantie Financière Totale</span>
           </div>
           <div className="flex items-center space-x-3">
             <span className="text-2xl">🌍</span>
             <span className="uppercase text-[9px] font-bold tracking-[0.3em]">Tourisme Éco-Responsable</span>
           </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
