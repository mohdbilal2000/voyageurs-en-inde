
import React from 'react';

const CLIENT_PHOTOS = [
  { src: '/photos/clients/group-taj-mahal-1.jpg', label: 'Taj Mahal' },
  { src: '/photos/clients/taj-mahal-with-guide.jpg', label: 'Taj Mahal' },
  { src: '/photos/clients/fatehpur-sikri.jpg', label: 'Fatehpur Sikri' },
  { src: '/photos/clients/family-trip.jpg', label: 'Agra' },
  { src: '/photos/clients/sikandra-tomb.jpg', label: 'Sikandra' },
  { src: '/photos/clients/group-taj-mahal-2.jpg', label: 'Taj Mahal' },
];

const SocialProof: React.FC = () => {
  return (
    <section className="bg-slate-900 text-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 items-center mb-20">
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

          <div className="md:col-span-2 grid grid-cols-3 gap-4">
            {CLIENT_PHOTOS.map((photo, i) => (
              <div
                key={i}
                className={`relative overflow-hidden rounded-2xl group ${i === 0 ? 'col-span-2 row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '1 / 1' : '1 / 1' }}
              >
                <img
                  src={photo.src}
                  alt={`Voyageurs en Inde - ${photo.label}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className="absolute bottom-2 left-3 text-[9px] font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  {photo.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-slate-500 text-xs uppercase tracking-[0.3em] mb-16">
          Nos voyageurs, sur le terrain en Inde
        </p>

        <div className="flex flex-wrap justify-center gap-16 opacity-30 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-700">
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
