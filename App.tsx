
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Hero from './components/Hero';
import TripGrid from './components/TripGrid';
import RegionalSection from './components/RegionalSection';
import ThemesSection from './components/ThemesSection';
import SocialProof from './components/SocialProof';
import TripDetail from './components/TripDetail';
import QuoteForm from './components/QuoteForm';
import AboutPage from './components/AboutPage';
import GuideSection from './components/GuideSection';
import { Page, Trip } from './types';
import { TRIPS } from './constants';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage, selectedTrip]);

  const handleTripClick = (trip: Trip) => {
    setSelectedTrip(trip);
    setCurrentPage(Page.TripDetail);
  };

  const handleNavigateHome = () => {
    setCurrentPage(Page.Home);
    setSelectedTrip(null);
    setActiveFilter('all');
  };

  const handleFilterSelect = (filter: string) => {
    setCurrentPage(Page.Home);
    setSelectedTrip(null);
    setActiveFilter(filter);
    
    // Smooth scroll to the trip grid
    setTimeout(() => {
      const gridElement = document.getElementById('trips-grid');
      if (gridElement) {
        gridElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const openQuoteForm = () => setIsQuoteFormOpen(true);
  const closeQuoteForm = () => setIsQuoteFormOpen(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 flex flex-col">
      <Header 
        onNavigateHome={handleNavigateHome} 
        onRequestQuote={openQuoteForm}
        onFilterSelect={handleFilterSelect}
        onNavigate={(page) => {
          setCurrentPage(page);
          setSelectedTrip(null);
        }}
      />

      <main className="flex-grow">
        {currentPage === Page.Home && (
          <div className="animate-in fade-in duration-700">
            <Hero onRequestQuote={openQuoteForm} />
            <div id="trips-grid" className="scroll-mt-24">
              <TripGrid 
                trips={TRIPS} 
                onTripSelect={handleTripClick} 
                externalFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>
            <RegionalSection onRegionSelect={handleFilterSelect} />
            <ThemesSection onThemeSelect={handleFilterSelect} />
            <SocialProof />
            <GuideSection />
          </div>
        )}

        {currentPage === Page.TripDetail && selectedTrip && (
          <div className="animate-in slide-in-from-bottom-4 duration-500 pt-20">
            <TripDetail 
              trip={selectedTrip} 
              onRequestQuote={openQuoteForm} 
            />
          </div>
        )}

        {currentPage === Page.Guides && (
          <div className="animate-in fade-in duration-500 pt-20">
            <GuideSection fullPage />
          </div>
        )}

        {currentPage === Page.About && (
          <div className="animate-in fade-in duration-500 pt-20">
            <AboutPage />
          </div>
        )}
      </main>

      <Footer onFilterSelect={handleFilterSelect} />

      {/* Persistent Mobile CTA */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-lg border-t border-slate-200 z-40">
        <button 
          onClick={openQuoteForm}
          className="w-full bg-fr-red text-white py-4 px-6 rounded-full font-black uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-transform"
        >
          DEMANDER UN DEVIS
        </button>
      </div>

      {isQuoteFormOpen && (
        <QuoteForm onClose={closeQuoteForm} />
      )}
    </div>
  );
};

export default App;
