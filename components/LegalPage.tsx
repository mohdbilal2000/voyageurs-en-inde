
import React from 'react';
import { PrivacyContent, CGVContent, MentionsContent, LegalPage as LegalPageType } from './LegalModal';
import { useSeo } from '../hooks/useSeo';
import Breadcrumb from './Breadcrumb';

const TITLES: Record<LegalPageType, string> = {
  privacy: 'Politique de Confidentialite',
  cgv: 'Conditions Generales de Vente',
  mentions: 'Mentions Legales',
};

const PATHS: Record<LegalPageType, string> = {
  privacy: '/politique-de-confidentialite',
  cgv: '/conditions-generales-de-vente',
  mentions: '/mentions-legales',
};

interface LegalPageProps {
  page: LegalPageType;
}

const LegalPage: React.FC<LegalPageProps> = ({ page }) => {
  useSeo({
    title: `${TITLES[page]} | Voyageurs en Inde`,
    description: `${TITLES[page]} de Voyageurs en Inde / Taj Routes.`,
    path: PATHS[page],
  });

  return (
    <div className="bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumb
          items={[
            { label: 'Accueil', path: '/' },
            { label: TITLES[page] },
          ]}
        />
        <h1 className="text-4xl font-serif font-bold text-slate-900 mt-6 mb-10">{TITLES[page]}</h1>
        <div className="text-sm text-slate-700 leading-relaxed legal-content">
          {page === 'privacy' && <PrivacyContent />}
          {page === 'cgv' && <CGVContent />}
          {page === 'mentions' && <MentionsContent />}
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
