
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Hero from './Hero';
import TripGrid from './TripGrid';
import RegionalSection from './RegionalSection';
import ThemesSection from './ThemesSection';
import SocialProof from './SocialProof';
import GuideSection from './GuideSection';
import { Trip } from '../types';
import { useSiteData } from '../store/siteStore';
import { useSeo } from '../hooks/useSeo';

interface HomePageProps {
  onRequestQuote: () => void;
  onTripSelect: (trip: Trip) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onRequestQuote, onTripSelect }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'all';
  const { trips: TRIPS } = useSiteData();

  useSeo({
    title: "Voyageurs en Inde | Voyages Sur Mesure d'Exception en Inde",
    description: "Voyageurs en Inde, agence francophone de voyages sur mesure en Inde depuis 2008. Circuits privatifs au Rajasthan, Kerala, Himalaya. Guides francophones, hotels de charme, conciergerie 24/7. Devis gratuit.",
    path: '/',
  });

  const handleFilterChange = (filter: string) => {
    if (filter === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ filter });
    }
  };

  return (
    <div className="animate-in fade-in duration-700">
      <Hero onRequestQuote={onRequestQuote} />
      <div id="trips-grid" className="scroll-mt-24">
        <TripGrid
          trips={TRIPS}
          onTripSelect={onTripSelect}
          externalFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />
      </div>
      <RegionalSection onRegionSelect={handleFilterChange} />
      <ThemesSection onThemeSelect={handleFilterChange} />
      <SocialProof />
      <GuideSection />
    </div>
  );
};

export default HomePage;
