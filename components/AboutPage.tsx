
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#f8f9fc]">
      {/* Brand Hero */}
      <section className="relative py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
          <div className="lg:col-span-3">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron mb-6 block">Notre Expertise</span>
            <h1 className="text-6xl md:text-8xl font-serif mb-12 leading-tight">Architectes de <br/><span className="italic">vos émotions.</span></h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8 font-light">
              Voyageurs en Inde n'est pas une simple agence, c'est une conciergerie de luxe dédiée à l'exploration intime du sous-continent indien. Nous créons des ponts entre votre imaginaire et la réalité vibrante de l'Inde.
            </p>
          </div>
          <div className="lg:col-span-2 hidden lg:block">
            <div className="aspect-[3/4] rounded-[2.5rem] overflow-hidden shadow-2xl">
              <img
                src="/photos/agra-fort.jpg"
                className="h-full w-full object-cover"
                alt="Fort d'Agra, berceau de Voyageurs en Inde"
              />
            </div>
          </div>
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
            <p className="text-slate-500 leading-relaxed font-light">Basés à Agra, au cœur du Triangle d'Or, nous nous appuyons sur un réseau de chauffeurs, hôtes et guides de confiance dans tout le pays pour vous offrir le meilleur de chaque région.</p>
          </div>
          <div className="group">
            <span className="text-4xl mb-6 block group-hover:scale-110 transition-transform">🌿</span>
            <h3 className="text-2xl font-serif mb-4 italic text-slate-900">Engagement Durable</h3>
            <p className="text-slate-500 leading-relaxed font-light">Nous privilégions les circuits courts, les hébergements de charme responsables et le respect des traditions ancestrales.</p>
          </div>
        </div>
      </section>

      {/* Notre Histoire */}
      <section className="py-24 bg-[#f8f9fc]">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron mb-6 block">Notre Histoire</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 italic">Nee sur les marches du Taj Mahal.</h2>
            <p className="text-slate-500 leading-relaxed font-light mb-6">
              Tout commence en 1998, lorsque Shafiq devient guide touristique agree par le Gouvernement de l'Inde a Agra. Pendant plus de vingt-cinq ans, il accompagne des voyageurs du monde entier a travers le Taj Mahal, le Fort d'Agra et les routes du Rajasthan, affinant une connaissance intime du pays et de ce que recherchent vraiment les visiteurs francophones.
            </p>
            <p className="text-slate-500 leading-relaxed font-light">
              Voyageurs en Inde est ne de cette experience : transformer des annees de guidage sur le terrain en circuits sur mesure, penses pour des voyageurs exigeants qui veulent decouvrir l'Inde autrement qu'en groupe presse d'un site a l'autre.
            </p>
          </div>
          <div className="aspect-[4/3] rounded-[2.5rem] overflow-hidden shadow-xl">
            <img src="/photos/qutub-minar-delhi.jpg" alt="Qutub Minar, Delhi" className="w-full h-full object-cover" />
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="py-24 bg-white border-t border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron mb-6 block">Nos Terrains de Jeu</span>
            <h2 className="text-4xl md:text-5xl font-serif italic">Les Régions que Nous Aimons</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { src: '/photos/amber-fort-jaipur.jpg', label: 'Jaipur' },
              { src: '/photos/jodhpur-blue-city.jpg', label: 'Jodhpur' },
              { src: '/photos/mysore-palace.jpg', label: 'Inde du Sud' },
              { src: '/photos/ranthambore-tiger.jpg', label: 'Ranthambore' },
            ].map((photo) => (
              <div key={photo.label} className="relative aspect-[3/4] rounded-2xl overflow-hidden group shadow-sm">
                <img src={photo.src} alt={photo.label} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-4 text-white text-xs font-bold uppercase tracking-widest">{photo.label}</span>
              </div>
            ))}
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
              <h4 className="text-3xl font-serif mb-1">Shafiq Ahamad Khan</h4>
              <p className="text-fr-red uppercase text-[10px] font-black tracking-widest mb-6">Directeur d'Agence &amp; Guide Touristique Francophone</p>
              <p className="text-slate-500 leading-relaxed font-light">
                Guide touristique professionnel certifié et agréé PAN India (code FSG01), base a Agra depuis plus de 20 ans. Shafiq accompagne personnellement la conception de chaque circuit et reste votre interlocuteur direct, de la demande de devis jusqu'a votre retour. Specialites : Agra, Taj Mahal, Delhi, Jaipur, Rajasthan.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Guides */}
      <section className="py-24 bg-[#f8f9fc] border-t border-slate-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-[0.3em] text-saffron mb-6 block">Guides Certifies Gouvernement de l'Inde</span>
            <h2 className="text-4xl md:text-5xl font-serif italic">Notre Équipe sur le Terrain</h2>
            <p className="text-slate-500 max-w-lg mx-auto mt-4">Selon la disponibilité, votre circuit peut être accompagné par l'un de nos guides francophones certifiés.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full shadow-lg">
                <img src="/photos/naimuddin.jpg" alt="Naimuddin, guide touristique francophone" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xl font-serif mb-1">Naimuddin</h4>
                <p className="text-fr-red uppercase text-[9px] font-black tracking-widest mb-3">Guide Certifié · 20 ans d'expérience</p>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  Guide francophone certifié (code FSG05), spécialiste d'Agra, Delhi, Jaipur et du Rajasthan. Passionné par l'histoire et l'architecture de l'Inde, il propose des visites vivantes et personnalisées.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-full shadow-lg">
                <img src="/photos/nadir-hussain.jpg" alt="Nadir Hussain, guide touristique francophone" className="w-full h-full object-cover" />
              </div>
              <div>
                <h4 className="text-xl font-serif mb-1">Nadir Hussain</h4>
                <p className="text-fr-red uppercase text-[9px] font-black tracking-widest mb-3">Guide Certifié · 16 ans d'expérience</p>
                <p className="text-slate-500 text-sm leading-relaxed font-light">
                  Guide francophone certifié (code FSG07), spécialiste des circuits de plusieurs jours à travers le nord et le sud de l'Inde, pour une découverte authentique de la culture indienne.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
