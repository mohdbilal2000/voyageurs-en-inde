
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#fdfbf7]">
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
            src="https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2000&auto=format&fit=crop" 
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

      {/* Team */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 italic">Vos Spécialistes</h2>
            <p className="text-slate-500 max-w-lg mx-auto">Une équipe d'experts passionnés par la richesse culturelle et spirituelle de l'Inde.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { name: "Marc Lefebvre", role: "Spécialiste Rajasthan & Nord", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=1000&auto=format&fit=crop" },
              { name: "Anjali Singh", role: "Experte Sud & Spiritualité", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1000&auto=format&fit=crop" },
              { name: "Julien Morel", role: "Expert Himalaya & Aventure", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1000&auto=format&fit=crop" }
            ].map((member, i) => (
              <div key={i} className="group text-center">
                <div className="aspect-[3/4] overflow-hidden rounded-[2.5rem] mb-8 shadow-2xl relative">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-saffron/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h4 className="text-2xl font-serif mb-1">{member.name}</h4>
                <p className="text-saffron uppercase text-[10px] font-black tracking-widest">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
