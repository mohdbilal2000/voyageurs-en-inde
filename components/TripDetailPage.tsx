
import React, { useEffect } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import TripDetail from './TripDetail';
import { TRIPS } from '../constants';
import { useSeo } from '../hooks/useSeo';

interface TripDetailPageProps {
  onRequestQuote: () => void;
}

const TripDetailPage: React.FC<TripDetailPageProps> = ({ onRequestQuote }) => {
  const { slug } = useParams<{ slug: string }>();
  const trip = TRIPS.find((t) => t.slug === slug);

  useSeo({
    title: trip ? `${trip.title} | Voyageurs en Inde` : 'Voyageurs en Inde',
    description: trip?.description,
    path: trip ? `/circuits/${trip.slug}` : '/',
  });

  useEffect(() => {
    if (!trip) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'trip-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TouristTrip',
      name: trip.title,
      description: trip.description,
      touristType: trip.theme,
      offers: {
        '@type': 'Offer',
        price: trip.price,
        priceCurrency: 'EUR',
      },
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById('trip-schema')?.remove();
    };
  }, [trip]);

  if (!trip) {
    return <Navigate to="/" replace />;
  }

  return <TripDetail trip={trip} onRequestQuote={onRequestQuote} />;
};

export default TripDetailPage;
