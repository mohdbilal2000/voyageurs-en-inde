
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LegalModal from './LegalModal';

type LegalPage = 'privacy' | 'cgv' | 'mentions';

interface FooterProps {
  onFilterSelect?: (filter: string) => void;
}

const Footer: React.FC<FooterProps> = ({ onFilterSelect }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [legalPage, setLegalPage] = useState<LegalPage | null>(null);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleFooterNav = (filter: string) => {
    if (onFilterSelect) {
      onFilterSelect(filter);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleFooterRegionNav = (regionId: string) => {
    navigate(`/destinations/${regionId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#f0f2f8] border-t border-slate-200 pt-24 pb-32 md:pb-12">
      <div className="max-w-7xl mx-auto px-6">
        {/* Brand Reinforcement Statement */}
        <div className="mb-20 text-center max-w-3xl mx-auto">
           <h2 className="text-3xl font-serif italic mb-6">"Le voyage est la seule chose que l'on achete et qui nous rend plus riche."</h2>
           <p className="text-slate-400 uppercase text-[10px] tracking-[0.4em] font-bold">La Philosophie Voyageurs en Inde</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-serif font-black mb-6 tracking-tighter">VOYAGEURS<br/><span className="text-fr-red text-sm tracking-[0.4em]">EN INDE</span></h3>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">Architectes de voyages d'exception sur mesure depuis 2008. Une expertise francaise au service de l'Inde.</p>
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
                     {subscribed ? '\u2713' : '\u2192'}
                   </button>
                 </div>
                 {subscribed && <p className="text-[10px] text-green-600 uppercase font-bold tracking-widest animate-fade-in">Bienvenue parmi nous.</p>}
               </form>
            </div>
          </div>

          {/* Nav - Regions */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-slate-400">Explorer les Regions</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li onClick={() => handleFooterRegionNav('rajasthan')} className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">&rarr;</span>
                Rajasthan & Palais
              </li>
              <li onClick={() => handleFooterRegionNav('sud')} className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">&rarr;</span>
                Kerala & Backwaters
              </li>
              <li onClick={() => handleFooterRegionNav('himalaya')} className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">&rarr;</span>
                Himalaya & Ladakh
              </li>
              <li onClick={() => handleFooterRegionNav('nord')} className="hover:text-saffron transition-colors cursor-pointer flex items-center group">
                <span className="w-0 group-hover:w-4 transition-all overflow-hidden mr-0 group-hover:mr-2">&rarr;</span>
                Varanasi & Gange
              </li>
            </ul>
          </div>

          {/* Nav - Themes */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-slate-400">Thematiques</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li onClick={() => handleFooterNav('Culture')} className="hover:text-saffron transition-colors cursor-pointer">Lunes de Miel d'Exception</li>
              <li onClick={() => handleFooterNav('Safari')} className="hover:text-saffron transition-colors cursor-pointer">Expeditions Gastronomiques</li>
              <li onClick={() => handleFooterNav('Nature')} className="hover:text-saffron transition-colors cursor-pointer">Retraites Spirituelles</li>
              <li onClick={() => handleFooterNav('Himalaya')} className="hover:text-saffron transition-colors cursor-pointer">Aventures en Altitude</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold uppercase tracking-widest text-[10px] mb-8 text-slate-400">Nous Contacter</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li>45 Sai Vihar, Pushpanjali Puram Ph-1</li>
              <li>Near Hotel Marriott, Agra 282001, Inde</li>
              <li>
                <a href="tel:+917505833393" className="text-slate-900 font-medium hover:text-saffron transition-colors">+91 750 583 3393</a>
              </li>
              <li>
                <a href="https://wa.me/917505833393" target="_blank" rel="noopener noreferrer" className="text-slate-900 font-medium hover:text-saffron transition-colors">WhatsApp</a>
              </li>
              <li>
                <a href="mailto:tajguides@gmail.com" className="text-slate-900 font-medium underline cursor-pointer hover:text-saffron transition-colors">tajguides@gmail.com</a>
              </li>
              <li className="pt-6 flex space-x-6">
                 <a href="https://www.tripadvisor.com/Attraction_Review-g797802-d33065332-Reviews-Heritage_Trail_of_Agra_Guided_Tour_of_Taj_Mahal_Agra_Fort_Fatehpur_Sikri_Local_W.html" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-saffron text-[10px] font-bold uppercase tracking-widest">TripAdvisor</a>
                 <a href="https://wa.me/917505833393" target="_blank" rel="noopener noreferrer" className="cursor-pointer hover:text-saffron text-[10px] font-bold uppercase tracking-widest">WhatsApp</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-slate-200 text-[9px] text-slate-400 font-bold uppercase tracking-widest space-y-4 md:space-y-0">
          <p>&copy; 2026 Voyageurs en Inde. Tous droits reserves.</p>
          <div className="flex space-x-6">
            <span className="cursor-pointer hover:text-slate-900 transition-colors" onClick={() => setLegalPage('privacy')}>Politique de Confidentialite</span>
            <span className="cursor-pointer hover:text-slate-900 transition-colors" onClick={() => setLegalPage('cgv')}>CGV</span>
            <span className="cursor-pointer hover:text-slate-900 transition-colors" onClick={() => setLegalPage('mentions')}>Mentions Legales</span>
          </div>
        </div>
      </div>
      {legalPage && <LegalModal page={legalPage} onClose={() => setLegalPage(null)} />}
    </footer>
  );
};

export default Footer;
