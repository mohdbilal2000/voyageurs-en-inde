
import React, { useState } from 'react';

interface QuoteFormProps {
  onClose: () => void;
}

const QuoteForm: React.FC<QuoteFormProps> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    guests: '2',
    date: '',
    budget: '5000',
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  const WHATSAPP_NUMBER = '917505833393';

  const buildWhatsAppMessage = () => {
    const guestsLabel: Record<string, string> = {
      '1': 'Solo',
      '2': 'Couple (2 pers.)',
      family: 'Famille / Petit Groupe (3-6)',
      large: 'Grand Groupe (7+)',
    };
    const lines = [
      'Nouvelle demande de devis - Voyageurs en Inde',
      '',
      `Destination souhaitee : ${formData.destination || 'Non precisee'}`,
      `Voyageurs : ${guestsLabel[formData.guests] || formData.guests}`,
      `Date prevue : ${formData.date || 'Non precisee'}`,
      `Budget estime : ${Number(formData.budget).toLocaleString()}€+ par personne`,
      '',
      `Nom : ${formData.name}`,
      `Email : ${formData.email}`,
      formData.phone ? `Telephone : ${formData.phone}` : null,
      formData.notes ? `\nDetails : ${formData.notes}` : null,
    ].filter(Boolean);
    return lines.join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 2) {
      setStep(step + 1);
    } else {
      setIsSubmitting(true);
      const message = buildWhatsAppMessage();
      window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      await new Promise(resolve => setTimeout(resolve, 600));
      setIsSubmitting(false);
      setIsSubmitted(true);
    }
  };

  if (isSubmitted) {
    return (
      <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
        <div className="relative bg-white w-full max-w-lg rounded-[2.5rem] shadow-2xl p-12 text-center animate-in zoom-in duration-300">
           <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-8 animate-bounce">✓</div>
           <h2 className="text-3xl font-serif mb-4 italic">Demande Reçue</h2>
           <p className="text-slate-500 mb-8 leading-relaxed">Votre demande a été préparée sur WhatsApp dans un nouvel onglet — il ne vous reste plus qu'à l'envoyer. Notre équipe vous répond généralement sous 24 heures.</p>
           <button 
             onClick={onClose}
             className="w-full bg-fr-red text-white py-4 rounded-full font-bold uppercase tracking-widest hover:bg-slate-900 transition-all text-xs"
           >
             Fermer
           </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 overflow-y-auto">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white w-full max-w-xl rounded-[2.5rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">
        <div className="h-1 bg-slate-100 w-full absolute top-0">
          <div 
            className="h-full bg-saffron transition-all duration-500" 
            style={{ width: `${(step / 2) * 100}%` }}
          ></div>
        </div>

        <button 
          onClick={onClose}
          className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 transition-colors z-10"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="p-8 md:p-14">
          <header className="mb-10">
            <h2 className="text-3xl font-serif mb-2 italic">Votre Projet de Voyage</h2>
            <p className="text-slate-500 text-sm">Étape {step} de 2 — Personnalisez vos préférences</p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 gap-6">
                  <div className="group">
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400 group-focus-within:text-slate-900 transition-colors">Destination Souhaitée</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Où souhaitez-vous aller ?"
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all placeholder-slate-300"
                      value={formData.destination}
                      onChange={(e) => setFormData({...formData, destination: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Nombre de Voyageurs</label>
                    <div className="relative">
                      <select 
                        className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none cursor-pointer appearance-none"
                        value={formData.guests}
                        onChange={(e) => setFormData({...formData, guests: e.target.value})}
                      >
                        <option value="1">Solo</option>
                        <option value="2">Couple (2 pers.)</option>
                        <option value="family">Famille / Petit Groupe (3-6)</option>
                        <option value="large">Grand Groupe (7+)</option>
                      </select>
                      <span className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">▼</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Date Prévue</label>
                    <input 
                      type="date" 
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none outline-none cursor-pointer"
                      value={formData.date}
                      onChange={(e) => setFormData({...formData, date: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                   <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Budget Estimé (par personne)</label>
                   <div className="flex items-center space-x-4">
                     <input 
                        type="range" 
                        min="1000" 
                        max="15000" 
                        step="500"
                        className="flex-grow accent-blue-700 h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                        value={formData.budget}
                        onChange={(e) => setFormData({...formData, budget: e.target.value})}
                     />
                     <span className="font-bold text-slate-900 whitespace-nowrap min-w-[80px]">{Number(formData.budget).toLocaleString()}€+</span>
                   </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                <div className="grid grid-cols-1 gap-6">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Nom Complet</label>
                    <input 
                      required
                      type="text" 
                      placeholder="Jean Dupont"
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Adresse Email</label>
                      <input 
                        required
                        type="email" 
                        placeholder="jean@exemple.com"
                        className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Téléphone</label>
                      <input 
                        type="tel" 
                        placeholder="+33"
                        className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-widest mb-2 text-slate-400">Vos Envies / Détails Particuliers</label>
                    <textarea 
                      placeholder="Parlez-nous de vos centres d'intérêt, d'un événement à fêter, ou de demandes spécifiques..."
                      className="w-full p-5 bg-slate-50 rounded-2xl border-none focus:ring-2 focus:ring-blue-200 outline-none transition-all h-32 resize-none"
                      value={formData.notes}
                      onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    ></textarea>
                  </div>
                </div>
              </div>
            )}

            <div className="flex items-center gap-4">
              {step > 1 && (
                <button 
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="px-8 py-5 border border-slate-200 rounded-full font-bold uppercase tracking-widest hover:bg-slate-50 transition-all text-[10px]"
                >
                  Retour
                </button>
              )}
              <button 
                type="submit"
                disabled={isSubmitting}
                className="flex-grow bg-slate-900 text-white py-5 rounded-full font-bold uppercase tracking-widest hover:bg-fr-red transition-all shadow-xl disabled:opacity-50 text-[10px]"
              >
                {isSubmitting ? 'Envoi en cours...' : (step === 1 ? 'Étape Suivante' : 'Envoyer ma Demande')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteForm;
