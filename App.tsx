
import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './components/HomePage';
import TripDetailPage from './components/TripDetailPage';
import RegionPage from './components/RegionPage';
import ThemePage from './components/ThemePage';
import AboutPage from './components/AboutPage';
import LegalPage from './components/LegalPage';
import GuideSection from './components/GuideSection';
import GuidePage from './components/GuidePage';
import QuoteForm from './components/QuoteForm';
import { Page, Trip } from './types';
import { useSeo } from './hooks/useSeo';

const GuidesPage: React.FC = () => {
  useSeo({
    title: 'Conseils & Guides Voyage Inde | Voyageurs en Inde',
    description: "Nos guides pratiques pour preparer votre voyage en Inde : visa, meteo, culture et conseils d'experts francophones.",
    path: '/conseils',
  });
  return (
    <div className="animate-in fade-in duration-500 pt-20">
      <GuideSection fullPage />
    </div>
  );
};

const AboutRoute: React.FC = () => {
  useSeo({
    title: "L'Agence | Voyageurs en Inde",
    description: "Voyageurs en Inde, agence francophone de voyages sur mesure depuis 2008. Decouvrez notre histoire et notre expertise de l'Inde.",
    path: '/a-propos',
  });
  return (
    <div className="animate-in fade-in duration-500 pt-20">
      <AboutPage />
    </div>
  );
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isQuoteFormOpen, setIsQuoteFormOpen] = useState(false);

  // Disable the browser's native scroll restoration so it doesn't fight
  // with our own scroll-to-top below (most noticeable on back/forward).
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const handleTripClick = (trip: Trip) => {
    navigate(`/circuits/${trip.slug}`);
  };

  const handleNavigateHome = () => {
    navigate('/');
  };

  const handleRegionSelect = (regionId: string) => {
    navigate(`/destinations/${regionId}`);
  };

  const handleThemeSelect = (themeId: string) => {
    navigate(`/themes/${themeId}`);
  };

  const handleNavigate = (page: Page) => {
    if (page === Page.Guides) navigate('/conseils');
    else if (page === Page.About) navigate('/a-propos');
    else navigate('/');
  };

  const openQuoteForm = () => setIsQuoteFormOpen(true);
  const closeQuoteForm = () => setIsQuoteFormOpen(false);

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900 flex flex-col">
      <Header
        onNavigateHome={handleNavigateHome}
        onRequestQuote={openQuoteForm}
        onRegionSelect={handleRegionSelect}
        onThemeSelect={handleThemeSelect}
        onNavigate={handleNavigate}
      />

      <main className="flex-grow">
        <Routes>
          <Route
            path="/"
            element={<HomePage onRequestQuote={openQuoteForm} onTripSelect={handleTripClick} />}
          />
          <Route
            path="/circuits/:slug"
            element={
              <div className="pt-20">
                <TripDetailPage key={location.pathname} onRequestQuote={openQuoteForm} />
              </div>
            }
          />
          <Route path="/destinations/:regionId" element={<RegionPage key={location.pathname} onRequestQuote={openQuoteForm} />} />
          <Route path="/themes/:themeId" element={<ThemePage key={location.pathname} onRequestQuote={openQuoteForm} />} />
          <Route path="/conseils" element={<GuidesPage />} />
          <Route path="/conseils/:slug" element={<GuidePage key={location.pathname} />} />
          <Route path="/a-propos" element={<AboutRoute />} />
          <Route path="/politique-de-confidentialite" element={<LegalPage page="privacy" />} />
          <Route path="/conditions-generales-de-vente" element={<LegalPage page="cgv" />} />
          <Route path="/mentions-legales" element={<LegalPage page="mentions" />} />
        </Routes>
      </main>

      <Footer />

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
