
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#f8f9fc]">
      {/* Brand Hero */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="max-w-3xl">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron mb-6 block">Notre Expertise</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">Architectes de <br/><span className="italic">vos émotions.</span></h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
              Voyageurs en Inde n'est pas une simple agence, c'est une conciergerie de luxe dédiée à l'exploration intime du sous-continent indien. Nous créons des ponts entre votre imaginaire et la réalité vibrante de l'Inde.
            </p>
          </div>
        </div>
        <div className="absolute right-0 top-0 bottom-0 w-1/3 hidden lg:block opacity-10">
           <img 
            src="/photos/agra-fort.jpg"
            className="h-full w-full object-cover grayscale" 
            alt="Atmosphère Inde"
           />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="group">
            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">💎</span>
            <h3 className="text-2xl font-serif mb-4 italic text-slate-900">Le Sur-Mesure Absolu</h3>
            <p className="text-slate-500 leading-relaxed font-light">De la sélection de votre guide francophone à la privatisation d'un palais au Rajasthan, chaque détail est ciselé avec précision.</p>
          </div>
          <div className="group">
            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">🤝</span>
            <h3 className="text-2xl font-serif mb-4 italic text-slate-900">Ancrage Local</h3>
            <p className="text-slate-500 leading-relaxed font-light">Nos équipes sont basées à Delhi, Jaipur et Cochin. Nous vivons l'Inde au quotidien pour vous offrir le meilleur de chaque instant.</p>
          </div>
          <div className="group">
            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">🌿</span>
            <h3 className="text-2xl font-serif mb-4 italic text-slate-900">Engagement Durable</h3>
            <p className="text-slate-500 leading-relaxed font-light">Nous privilégions les circuits courts, les hébergements de charme responsables et le respect des traditions ancestrales.</p>
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="py-24 bg-white">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 italic">Votre Guide & Fondateur</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Une présence locale, du premier contact jusqu'au dernier jour de votre voyage.</p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-12 md:gap-16">
            <div className="w-56 h-72 flex-shrink-0 overflow-hidden rounded-[2.5rem] shadow-2xl">
              <img src="/photos/shafiq-portrait.jpg" alt="Shafiq Khan, fondateur de Voyageurs en Inde" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h4 className="text-3xl font-serif mb-1">Shafiq Khan</h4>
              <p className="text-fr-red uppercase text-[10px] font-black tracking-widest mb-6">Fondateur &amp; Guide Principal</p>
              <p className="text-slate-500 leading-relaxed font-light">
                Guide touristique professionnel agréé par le Gouvernement de l'Inde, basé à Agra depuis 1998. Shafiq accompagne personnellement la conception de chaque circuit et reste votre interlocuteur direct, de la demande de devis jusqu'à votre retour.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
