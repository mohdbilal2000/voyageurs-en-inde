
import React, { useEffect } from 'react';

type LegalPage = 'privacy' | 'cgv' | 'mentions';

interface LegalModalProps {
  page: LegalPage;
  onClose: () => void;
}

const LegalModal: React.FC<LegalModalProps> = ({ page, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const handleEsc = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handleEsc);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-lg shadow-2xl w-full max-w-3xl max-h-[85vh] mx-4 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-200">
          <h2 className="text-lg font-serif font-bold text-slate-900">
            {page === 'privacy' && 'Politique de Confidentialite'}
            {page === 'cgv' && 'Conditions Generales de Vente'}
            {page === 'mentions' && 'Mentions Legales'}
          </h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-900 transition-colors text-2xl leading-none">&times;</button>
        </div>
        <div className="overflow-y-auto px-8 py-6 text-sm text-slate-700 leading-relaxed legal-content">
          {page === 'privacy' && <PrivacyContent />}
          {page === 'cgv' && <CGVContent />}
          {page === 'mentions' && <MentionsContent />}
        </div>
      </div>
    </div>
  );
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-base font-bold text-slate-900 mt-6 mb-3">{children}</h3>
);

const PrivacyContent = () => (
  <div>
    <p className="text-slate-500 mb-4">Derniere mise a jour : mars 2026</p>

    <p>Voyageurs en Inde, exploite par Taj Guides & Travel Services, s'engage a proteger la vie privee de ses utilisateurs. La presente politique decrit les informations que nous collectons et la maniere dont elles sont utilisees.</p>

    <SectionTitle>1. Informations collectees</SectionTitle>
    <p>Nous collectons les informations personnelles que vous nous fournissez volontairement lors de votre demande de devis ou de reservation :</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Nom complet</li>
      <li>Adresse email</li>
      <li>Numero de telephone</li>
      <li>Pays de residence</li>
      <li>Informations de paiement (carte bancaire ou virement)</li>
    </ul>
    <p className="mt-2">Pour l'organisation de votre voyage, nous pouvons egalement collecter :</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Numero de passeport et date de naissance</li>
      <li>Dates et horaires d'arrivee et de depart</li>
      <li>Compagnie aerienne et details de vol</li>
      <li>Preferences alimentaires ou medicales</li>
    </ul>

    <SectionTitle>2. Utilisation des informations</SectionTitle>
    <p>Vos informations sont utilisees exclusivement pour :</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Concevoir et organiser votre voyage sur mesure</li>
      <li>Effectuer les reservations d'hotels, transports et guides</li>
      <li>Vous contacter concernant votre itineraire</li>
      <li>Traiter les paiements de maniere securisee</li>
    </ul>

    <SectionTitle>3. Partage des donnees</SectionTitle>
    <p>Nous ne vendons jamais vos informations personnelles. Vos donnees peuvent etre partagees uniquement avec nos partenaires operationnels (hotels, transporteurs, guides locaux) dans le strict cadre de l'organisation de votre voyage.</p>

    <SectionTitle>4. Securite</SectionTitle>
    <p>Nous mettons en oeuvre des mesures de securite raisonnables pour proteger vos informations personnelles contre tout acces non autorise, modification ou divulgation.</p>

    <SectionTitle>5. Contact</SectionTitle>
    <p>Pour toute question relative a vos donnees personnelles, contactez-nous :</p>
    <ul className="list-none mt-2 space-y-1">
      <li>Email : <a href="mailto:tajguides@gmail.com" className="text-saffron underline">tajguides@gmail.com</a></li>
      <li>Telephone : <a href="tel:+917505833393" className="text-saffron underline">+91 750 583 3393</a></li>
    </ul>
  </div>
);

const CGVContent = () => (
  <div>
    <p className="text-slate-500 mb-4">Derniere mise a jour : mars 2026</p>

    <SectionTitle>1. Objet</SectionTitle>
    <p>Les presentes Conditions Generales de Vente regissent les relations entre Taj Guides & Travel Services (ci-apres "Voyageurs en Inde") et ses clients pour la fourniture de prestations de voyage sur mesure en Inde.</p>

    <SectionTitle>2. Reservation et paiement</SectionTitle>
    <p>Toute reservation est confirmee apres reception d'un acompte de 30% du montant total. Le solde est exigible 30 jours avant le depart. Les paiements peuvent etre effectues par virement bancaire ou carte de credit.</p>

    <SectionTitle>3. Prix</SectionTitle>
    <p>Les prix indiques sur le site sont en euros, par personne, sur la base d'une chambre double. Ils comprennent l'hebergement, les transferts prives, les guides francophones et les visites mentionnees dans l'itineraire. Les vols internationaux, les assurances voyage, les repas non mentionnes et les depenses personnelles ne sont pas inclus, sauf indication contraire.</p>

    <SectionTitle>4. Modification et annulation par le client</SectionTitle>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Plus de 60 jours avant le depart : remboursement integral de l'acompte</li>
      <li>Entre 30 et 60 jours : retenue de 50% de l'acompte</li>
      <li>Moins de 30 jours : aucun remboursement</li>
    </ul>
    <p className="mt-2">Toute modification d'itineraire apres confirmation peut entrainer des frais supplementaires.</p>

    <SectionTitle>5. Responsabilite</SectionTitle>
    <p>Voyageurs en Inde agit en qualite d'intermediaire entre le client et les prestataires locaux (hotels, transporteurs, guides). Nous ne saurions etre tenus responsables des evenements de force majeure, des retards de transport, des modifications imposees par les autorites locales ou des circonstances independantes de notre volonte.</p>

    <SectionTitle>6. Assurance voyage</SectionTitle>
    <p>Nous recommandons vivement a nos clients de souscrire une assurance voyage couvrant l'annulation, l'assistance rapatriement et les frais medicaux. Voyageurs en Inde ne fournit pas d'assurance voyage.</p>

    <SectionTitle>7. Reclamations</SectionTitle>
    <p>Toute reclamation doit etre adressee par ecrit a <a href="mailto:tajguides@gmail.com" className="text-saffron underline">tajguides@gmail.com</a> dans les 30 jours suivant la fin du voyage.</p>
  </div>
);

const MentionsContent = () => (
  <div>
    <SectionTitle>Editeur du site</SectionTitle>
    <ul className="list-none space-y-1">
      <li><strong>Raison sociale :</strong> Taj Guides & Travel Services</li>
      <li><strong>Nom commercial :</strong> Voyageurs en Inde</li>
      <li><strong>Adresse :</strong> 45 Sai Vihar, Pushpanjali Puram Ph-1, Near Hotel Marriott, Agra 282001, Uttar Pradesh, Inde</li>
      <li><strong>Directeur :</strong> Shafiq Khan</li>
      <li><strong>Telephone :</strong> <a href="tel:+917505833393" className="text-saffron underline">+91 750 583 3393</a></li>
      <li><strong>Email :</strong> <a href="mailto:tajguides@gmail.com" className="text-saffron underline">tajguides@gmail.com</a></li>
      <li><strong>Site :</strong> <a href="https://tajmahaltouristguide.com" target="_blank" rel="noopener noreferrer" className="text-saffron underline">tajmahaltouristguide.com</a></li>
    </ul>

    <SectionTitle>Statut</SectionTitle>
    <p>Agence de voyage agreee par le Ministere du Tourisme et de la Culture, Gouvernement de l'Inde. Guide touristique professionnel francophone et anglophone autorise a exercer aupres des visiteurs etrangers en Inde. En activite depuis 1998.</p>

    <SectionTitle>Hebergement du site</SectionTitle>
    <ul className="list-none space-y-1">
      <li><strong>Hebergeur :</strong> Vercel Inc.</li>
      <li><strong>Adresse :</strong> 340 S Lemon Ave #4133, Walnut, CA 91789, USA</li>
    </ul>

    <SectionTitle>Propriete intellectuelle</SectionTitle>
    <p>L'ensemble du contenu de ce site (textes, images, logos, mise en page) est protege par le droit d'auteur. Toute reproduction, meme partielle, est interdite sans autorisation prealable ecrite.</p>

    <SectionTitle>Donnees personnelles</SectionTitle>
    <p>Pour toute information relative a la collecte et au traitement de vos donnees personnelles, veuillez consulter notre Politique de Confidentialite.</p>
  </div>
);

export default LegalModal;
