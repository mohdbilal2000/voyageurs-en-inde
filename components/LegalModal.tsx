
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

const CompanyIdentity = () => (
  <ul className="list-none space-y-1">
    <li><strong>Raison sociale :</strong> Taj Routes</li>
    <li><strong>Forme juridique :</strong> Entreprise individuelle (sole proprietorship)</li>
    <li><strong>Proprietaire :</strong> Shafiq Ahamad Khan</li>
    <li><strong>Siege social :</strong> 45 Sai Vihar, Pushpanjali Puram, Phase 1, Taj Nagar, Phase 2, Agra, Uttar Pradesh &ndash; 282001, Inde</li>
    <li><strong>Numero d'enregistrement de l'entreprise :</strong> 09AQGPK2354P3ZA</li>
    <li><strong>GSTIN :</strong> 09AQGPK2354P3ZA</li>
    <li><strong>PAN :</strong> AQGPK2354P</li>
    <li><strong>E-mail :</strong> <a href="mailto:voyageurseninde@gmail.com" className="text-saffron underline">voyageurseninde@gmail.com</a></li>
    <li><strong>Telephone :</strong> <a href="tel:+917505833393" className="text-saffron underline">+91 750 583 3393</a></li>
    <li><strong>Site internet :</strong> <a href="https://www.voyageurseninde.fr" className="text-saffron underline">www.voyageurseninde.fr</a></li>
  </ul>
);

const PrivacyContent = () => (
  <div>
    <p className="text-slate-500 mb-4">Derniere mise a jour : 5 octobre 2026</p>

    <p>Voyageurs en Inde, exploite par Taj Routes, s'engage a proteger la vie privee de ses utilisateurs. La presente politique de confidentialite explique quelles informations personnelles nous collectons, comment nous les utilisons et comment nous les protegeons.</p>

    <SectionTitle>1. Informations collectees</SectionTitle>
    <p>Nous collectons les informations personnelles que vous nous fournissez volontairement lorsque vous demandez un devis, nous contactez ou reservez un voyage avec Voyageurs en Inde / Taj Routes.</p>
    <p className="mt-2">Ces informations peuvent notamment comprendre :</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Nom et prenom</li>
      <li>Adresse e-mail</li>
      <li>Numero de telephone</li>
      <li>Pays de residence</li>
      <li>Informations relatives au paiement, telles que les coordonnees d'une carte bancaire ou d'un virement bancaire</li>
    </ul>
    <p className="mt-2">Pour l'organisation et la realisation de votre voyage, nous pouvons egalement collecter :</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Copie du passeport</li>
      <li>Dates et heures d'arrivee et de depart</li>
      <li>Informations concernant la compagnie aerienne et le vol</li>
    </ul>

    <SectionTitle>2. Utilisation des informations</SectionTitle>
    <p>Vos informations personnelles sont utilisees exclusivement pour repondre a vos demandes, preparer des devis, organiser et fournir les services de voyage, traiter les paiements et communiquer avec vous concernant votre voyage.</p>
    <p className="mt-2">Nous pouvons egalement utiliser ces informations lorsque cela est necessaire pour organiser les hotels, les transports, les vols interieurs, les guides touristiques, les billets d'entree ou tout autre service inclus dans votre itineraire.</p>
    <p className="mt-2">Voyageurs en Inde / Taj Routes ne vend ni ne loue vos informations personnelles a des tiers.</p>

    <SectionTitle>3. Protection des donnees</SectionTitle>
    <p>Nous prenons des mesures raisonnables pour proteger vos informations personnelles contre tout acces non autorise, toute perte, utilisation abusive ou divulgation.</p>

    <SectionTitle>4. Contact</SectionTitle>
    <p>Pour toute question relative a vos donnees personnelles, contactez-nous :</p>
    <ul className="list-none mt-2 space-y-1">
      <li>Email : <a href="mailto:voyageurseninde@gmail.com" className="text-saffron underline">voyageurseninde@gmail.com</a></li>
      <li>Telephone : <a href="tel:+917505833393" className="text-saffron underline">+91 750 583 3393</a></li>
    </ul>
  </div>
);

const CGVContent = () => (
  <div>
    <p className="text-slate-500 mb-4">Derniere mise a jour : 6 octobre 2026</p>

    <SectionTitle>Objet et statut de Taj Routes</SectionTitle>
    <p>Les presentes Conditions Generales de Vente regissent la relation entre Taj Routes (ci-apres &laquo; Taj Routes &raquo;) et ses clients concernant la conception, l'organisation et la fourniture de voyages et de prestations touristiques sur mesure en Inde.</p>
    <p className="mt-2">Taj Routes agit en qualite d'organisateur des prestations de voyage confirmees avec le client.</p>
    <p className="mt-2">Pour assurer la realisation des prestations, Taj Routes peut faire appel a des prestataires locaux independants, notamment des hotels, des societes de transport, des guides touristiques, des restaurants et d'autres partenaires touristiques.</p>
    <p className="mt-2">Le client conclut son contrat de voyage avec Taj Routes, qui coordonne les differentes prestations prevues dans l'itineraire confirme. Certaines prestations peuvent etre directement executees par des prestataires locaux selectionnes par Taj Routes.</p>

    <SectionTitle>Reservation et paiement</SectionTitle>
    <p>Toute reservation est confirmee apres reception d'un acompte de 30 % du montant total du voyage.</p>
    <p className="mt-2">Le solde de 70 % doit etre regle au plus tard 30 jours avant la date de depart.</p>
    <p className="mt-2">Pour toute reservation effectuee moins de 30 jours avant la date de depart, le paiement integral peut etre demande au moment de la confirmation.</p>
    <p className="mt-2">Les paiements peuvent etre effectues par virement bancaire ou par carte bancaire.</p>
    <p className="mt-2">Les eventuels frais bancaires, frais de conversion de devises ou frais de traitement factures par la banque ou le prestataire de paiement du client sont a la charge du client, sauf accord ecrit contraire.</p>
    <p className="mt-2">Toute prestation supplementaire demandee apres la confirmation de la reservation est soumise a disponibilite et peut entrainer des frais supplementaires.</p>

    <SectionTitle>Prix</SectionTitle>
    <p>Les prix indiques sur le site internet sont exprimes en euros par personne et sont calcules sur la base d'une occupation double, sauf indication contraire.</p>
    <p className="mt-2">Sauf mention contraire, les prix comprennent :</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>L'hebergement</li>
      <li>Les transferts prives</li>
      <li>Les services de guides francophones</li>
      <li>Les visites et prestations mentionnees dans l'itineraire confirme</li>
    </ul>
    <p className="mt-2">Sauf indication contraire, les vols internationaux, l'assurance voyage, les repas non mentionnes dans l'itineraire, les frais de visa et les depenses personnelles ne sont pas inclus dans le prix.</p>

    <SectionTitle>Modification et annulation par le client</SectionTitle>
    <p>Les conditions d'annulation sont calculees sur la base de l'acompte de 30 % verse lors de la reservation.</p>
    <ul className="list-disc pl-6 mt-2 space-y-1">
      <li>Plus de 60 jours avant le depart : l'acompte de 30 % est integralement remboursable.</li>
      <li>Entre 60 et 31 jours avant le depart : 50 % de l'acompte est conserve et 50 % est rembourse.</li>
      <li>30 jours ou moins avant le depart : l'acompte est non remboursable.</li>
    </ul>
    <p className="mt-2">Le solde de 70 % est du au plus tard 30 jours avant le depart. Une fois le solde devenu exigible, toute annulation effectuee dans les 30 jours precedant le depart entraine la non-remboursabilite de toutes les sommes deja versees.</p>
    <p className="mt-2">Toute modification de l'itineraire apres confirmation peut entrainer des frais supplementaires, en fonction de la nature de la modification demandee et des frais eventuellement factures par les prestataires locaux.</p>

    <SectionTitle>Responsabilite</SectionTitle>
    <p>Taj Routes est responsable de l'organisation et de la coordination des prestations de voyage incluses dans l'itineraire confirme, conformement aux presentes Conditions Generales de Vente et a la legislation applicable.</p>
    <p className="mt-2">En cas de probleme concernant une prestation fournie par un partenaire local, Taj Routes reste le principal interlocuteur du client et prendra, lorsque cela est approprie, contact avec le prestataire concerne afin de rechercher une solution adaptee.</p>
    <p className="mt-2">Taj Routes ne peut etre tenue responsable des dommages, retards, annulations, modifications ou interruptions resultant de circonstances exceptionnelles, inevitables ou imprevisibles echappant a son controle raisonnable, notamment les catastrophes naturelles, les conditions meteorologiques extremes, les guerres ou conflits armes, les troubles civils, les greves, les decisions ou restrictions imposees par les autorites publiques, la fermeture de sites touristiques, les epidemies, les perturbations importantes des transports ou tout autre evenement independant de la volonte raisonnable de Taj Routes.</p>
    <p className="mt-2">Taj Routes ne peut egalement etre tenue responsable des consequences resultant d'informations incorrectes ou incompletes fournies par le client, du non-respect des formalites ou conditions d'entree et de voyage, du non-respect des horaires ou du comportement personnel du client.</p>
    <p className="mt-2">Lorsqu'une prestation doit etre modifiee ou interrompue pour des raisons independantes de la volonte de Taj Routes, celle-ci s'efforcera, dans la mesure du raisonnablement possible, de proposer une solution alternative appropriee, sous reserve des disponibilites et des eventuels frais supplementaires applicables.</p>
    <p className="mt-2">Aucune disposition des presentes Conditions Generales de Vente n'a pour objet d'exclure ou de limiter les droits ou responsabilites qui ne peuvent legalement etre exclus ou limites en vertu de la legislation applicable.</p>

    <SectionTitle>Assurance voyage et assistance en cas d'urgence</SectionTitle>
    <p>Nous recommandons vivement a nos clients de souscrire une assurance voyage complete couvrant notamment l'annulation du voyage, les frais medicaux, les bagages et l'assistance au rapatriement. Taj Routes ne fournit pas d'assurance voyage.</p>
    <p className="mt-2">En cas de situation grave ou d'urgence immediate pendant le voyage, notamment en cas d'accident, de maladie grave, de blessure, d'incendie, de catastrophe naturelle ou de probleme de securite, le client doit rechercher immediatement l'assistance locale appropriee.</p>
    <p className="mt-2">Lorsque cela est possible, le client doit ensuite informer Taj Routes ou son representant local dans les meilleurs delais afin que Taj Routes puisse apporter son assistance a la coordination.</p>
    <p className="mt-2">En cas d'urgence medicale, le client doit immediatement contacter un hopital, un medecin ou un professionnel de sante qualifie. Taj Routes peut aider a faciliter l'acces aux soins medicaux, mais n'est pas responsable du traitement medical ni des decisions medicales.</p>
    <p className="mt-2">Si le client dispose d'une assurance voyage, il doit egalement contacter le service d'assistance d'urgence de son assureur et suivre les procedures prevues par son contrat d'assurance.</p>

    <SectionTitle>Reclamations</SectionTitle>
    <p>Si le client rencontre un probleme pendant le voyage concernant l'hebergement, le transport, un guide, une activite ou toute autre prestation incluse dans l'itineraire, il doit en informer Taj Routes ou son representant local dans les meilleurs delais, afin de permettre la recherche d'une solution pendant le voyage.</p>
    <p className="mt-2">Si le probleme ne peut pas etre resolu pendant le voyage, le client peut adresser une reclamation ecrite officielle a Taj Routes.</p>
    <p className="mt-2">Toute reclamation formulee apres le voyage doit etre envoyee dans un delai de 30 jours suivant la fin du voyage a l'adresse suivante : <a href="mailto:voyageurseninde@gmail.com" className="text-saffron underline">voyageurseninde@gmail.com</a></p>
    <p className="mt-2">La reclamation doit preciser les informations relatives a la reservation ou au voyage, la prestation concernee, une description du probleme rencontre et, lorsque cela est disponible, les documents ou elements justificatifs pertinents.</p>
    <p className="mt-2">Taj Routes examinera attentivement la reclamation et pourra, lorsque cela est approprie, contacter les prestataires locaux concernes afin de rechercher une reponse ou une solution appropriee.</p>
    <p className="mt-2">Le fait de ne pas signaler rapidement un probleme pendant le voyage peut affecter la capacite de Taj Routes a y remedier ou a en limiter les consequences, dans la mesure autorisee par la legislation applicable.</p>
    <p className="mt-2">La presente procedure de reclamation ne limite pas les droits legaux du client qui ne peuvent etre exclus ou restreints en vertu de la legislation applicable.</p>

    <SectionTitle>Identification de l'entreprise</SectionTitle>
    <CompanyIdentity />
    <p className="mt-2">Pour toute reservation, modification, annulation ou reclamation, Taj Routes est le principal interlocuteur du client.</p>
  </div>
);

const MentionsContent = () => (
  <div>
    <SectionTitle>Editeur du site</SectionTitle>
    <CompanyIdentity />

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
