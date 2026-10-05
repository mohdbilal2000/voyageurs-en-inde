
import React, { useMemo } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useSiteData } from '../store/siteStore';
import { useSeo } from '../hooks/useSeo';
import { generateRegionFaq } from '../utils/regionFaq';
import Breadcrumb from './Breadcrumb';
import FAQSection from './FAQSection';

interface RegionPageProps {
  onRequestQuote: () => void;
}

const RegionPage: React.FC<RegionPageProps> = ({ onRequestQuote }) => {
  const { regionId } = useParams<{ regionId: string }>();
  const { regions: REGIONS, trips: TRIPS } = useSiteData();

  const region = REGIONS.find((r) => r.id === regionId);

  const regionTrips = useMemo(() => {
    if (!region) return [];
    return TRIPS.filter((t) => t.region.toLowerCase().includes(region.name.toLowerCase()));
  }, [region, TRIPS]);

  useSeo({
    title: region ? `Voyage ${region.name} Sur Mesure | Voyageurs en Inde` : 'Voyageurs en Inde',
    description: region
      ? `Découvrez nos circuits sur mesure au ${region.name} : itinéraires privatifs, guides francophones, hébergements de charme. Devis gratuit sous 24h.`
      : undefined,
    path: region ? `/destinations/${region.id}` : '/',
  });

  if (!region) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="bg-white pt-20">
      {/* Hero */}
      <div className="relative h-[55vh] min-h-[420px] overflow-hidden">
        <img src={region.image} alt={region.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />
        <div className="absolute top-8 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto">
            <Breadcrumb
              dark
              items={[
                { label: 'Accueil', path: '/' },
                { label: 'Destinations', path: '/' },
                { label: region.name },
              ]}
            />
          </div>
        </div>
        <div className="absolute bottom-16 left-0 right-0 px-6">
          <div className="max-w-7xl mx-auto text-white">
            <span className="text-fr-red text-xs font-black uppercase tracking-[0.4em] mb-4 block">Destination</span>
            <h1 className="text-5xl md:text-7xl font-serif">{region.name}</h1>
            <p className="mt-4 text-lg font-light max-w-2xl opacity-90">
              {regionTrips.length} circuit{regionTrips.length > 1 ? 's' : ''} sur mesure, accompagnés par nos guides francophones.
            </p>
          </div>
        </div>
      </div>

      {/* Trip Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {regionTrips.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regionTrips.map((trip) => (
              <Link
                key={trip.id}
                to={`/circuits/${trip.slug}`}
                className="group relative block overflow-hidden rounded-[1.5rem] shadow-sm hover:shadow-2xl transition-all duration-500 h-[420px]"
              >
                <img
                  src={trip.image}
                  alt={trip.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="flex items-center space-x-3 mb-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-fr-red">{trip.duration}</span>
                    <div className="w-1 h-1 bg-white/40 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/70">{trip.theme}</span>
                  </div>
                  <h3 className="text-2xl font-serif text-white mb-6 leading-tight">{trip.title}</h3>
                  <div className="flex items-center justify-between pt-6 border-t border-white/10">
                    <span className="text-white font-serif text-xl">{trip.price.toLocaleString()}€</span>
                    <span className="text-[9px] font-black uppercase tracking-widest text-white group-hover:translate-x-1 transition-transform">
                      Découvrir →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="max-w-3xl mx-auto text-center text-slate-500">
            Aucun circuit publié pour cette région pour le moment. Contactez-nous pour un itinéraire 100% sur mesure.
          </div>
        )}
      </section>

      <FAQSection items={generateRegionFaq(region, regionTrips.length)} schemaId="region-faq-schema" />

      <section className="bg-slate-900 py-24 text-center">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 italic">Envie d'un voyage sur mesure au {region.name} ?</h2>
          <button
            onClick={onRequestQuote}
            className="px-12 py-5 bg-fr-red text-white rounded-full font-black uppercase tracking-[0.2em] hover:bg-white hover:text-slate-900 transition-all text-[11px]"
          >
            DEVIS SUR MESURE
          </button>
        </div>
      </section>
    </div>
  );
};

export default RegionPage;
