import { Trip } from '../types';

export interface FaqItem {
  question: string;
  answer: string;
}

/** Generic, reusable FAQ content per trip — written for AEO/GEO (AI answer engines). */
export function generateTripFaq(trip: Trip): FaqItem[] {
  return [
    {
      question: `Quelle est la durée du circuit ${trip.title} ?`,
      answer: `Ce circuit dure ${trip.duration}. L'itinéraire ci-dessus est une base de travail que nous adaptons à vos dates et à votre rythme de voyage.`,
    },
    {
      question: `Quel est le prix du circuit ${trip.title} ?`,
      answer: `À partir de ${trip.price.toLocaleString()}€ par personne, hors vols internationaux. Le tarif final dépend de la saison, du niveau d'hébergement et du nombre de voyageurs.`,
    },
    {
      question: 'Les guides parlent-ils français ?',
      answer: "Oui. Chaque circuit Voyageurs en Inde est accompagné d'un guide francophone du premier au dernier jour, pour une immersion sans barrière de langue.",
    },
    {
      question: 'Peut-on personnaliser cet itinéraire ?',
      answer: "Absolument. Chaque étape — hébergements, activités, durée — peut être ajustée selon vos envies. Nos conseillers construisent avec vous une version sur mesure de ce circuit.",
    },
    {
      question: `Quelle est la meilleure période pour ce circuit en ${trip.region} ?`,
      answer: "La saison la plus agréable pour voyager en Inde se situe généralement entre octobre et mars, avec des températures plus clémentes. Nos conseillers vous aident à choisir les dates idéales selon les régions traversées.",
    },
  ];
}
