
import React, { useState } from 'react';

const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-50 border-t border-slate-200 pt-24 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand Reinforcement Statement */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
           <h2 className="text-3xl font-serif italic mb-6">"Le voyage est la seule chose que l'on achète et qui nous rend plus riche."</h2>
           <p className="text-slate-400 uppercase text-[10px] tracking-[0.4em] font-bold">La Philosophie Voyageurs en Inde</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-black mb-6 tracking-tighter">VOYAGEURS<br/><span className="text-saffron text-sm tracking-[0.4em]">EN INDE</span></h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">Architectes de voyages d'exception sur mesure depuis 2008. Une expertise française au service de l'Inde.</p>
            <div className="space-y-4">
               <p className="text-xs font-bold uppercase tracking-widest text-slate-900">Rejoindre le Cercle</p>
               <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
                 <div className="flex border-b border-slate-300 pb-2 group focus-within:border-slate-900 transition-colors">
                   <input 
                    type="email" 
                    placeholder="Votre adresse email" 
                    className="bg-transparent text-sm w-full outline-none" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                   />
                   <button type="submit" className="text-slate-900 font-bold ml-2 hover:translate-x-1 transition-transform">
                     {subscribed ? '✓' : '→'}
                   </button>
                 </div>
                 {subscribed && <p className="text-[10px] text-green-600 uppercase font-bold tracking-widest animate-fade-in">Bienvenue parmi nous.</p>}
               </form>
            </div>
          </div>

          {/* Nav - Regions */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-slate-400">Explorer les Régions</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">→</span>
                Rajasthan & Palais
              </li>
              <li className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">→</span>
                Kerala & Backwaters
              </li>
              <li className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">→</span>
                Himalaya & Ladakh
              </li>
              <li className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">→</span>
                Varanasi & Gange
              </li>
            </ul>
          </div>

          {/* Nav - Themes */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-slate-400">Thématiques</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li className="hover:text-saffron transition-colors cursor-pointer">Lunes de Miel d'Exception</li>
              <li className="hover:text-saffron transition-colors cursor-pointer">Expéditions Gastronomiques</li>
              <li className="hover:text-saffron transition-colors cursor-pointer">Retraites Spirituelles</li>
              <li className="hover:text-saffron transition-colors cursor-pointer">Aventures en Altitude</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-slate-400">La Conciergerie</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>Siège Paris, 14 Avenue Montaigne</li>
              <li className="text-slate-900 font-medium">+33 (0)1 45 67 89 00</li>
              <li className="text-slate-900 font-medium underline cursor-pointer">concierge@voyageurs-inde.com</li>
              <li className="pt-6 flex space-x-6">
                 <span className="cursor-pointer hover:text-saffron text-[10px] font-bold uppercase tracking-widest">IG</span>
                 <span className="cursor-pointer hover:text-saffron text-[10px] font-bold uppercase tracking-widest">LI</span>
                 <span className="cursor-pointer hover:text-saffron text-[10px] font-bold uppercase tracking-widest">FB</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-[9px] text-slate-400 font-bold uppercase tracking-widest space-y-4 md:space-y-0">
          <p>© 2024 Voyageurs en Inde. Tous droits réservés.</p>
          <div className="flex space-x-6">
            <span className="cursor-pointer hover:text-slate-900 transition-colors">Politique de Confidentialité</span>
            <span className="cursor-pointer hover:text-slate-900 transition-colors">CGV</span>
            <span className="cursor-pointer hover:text-slate-900 transition-colors">Mentions Légales</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
