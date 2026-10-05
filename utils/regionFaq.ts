import { Region } from '../types';
import { FaqItem } from './tripFaq';

export function generateRegionFaq(region: Region, tripCount: number): FaqItem[] {
  return [
    {
      question: `Combien de circuits proposez-vous au ${region.name} ?`,
      answer: `Nous proposons actuellement ${tripCount} circuit${tripCount > 1 ? 's' : ''} sur mesure au ${region.name}, chacun adaptable à vos dates, votre budget et vos envies.`,
    },
    {
      question: `Les circuits au ${region.name} sont-ils accompagnés d'un guide francophone ?`,
      answer: "Oui. Chaque voyage Voyageurs en Inde est accompagné d'un guide francophone du premier au dernier jour.",
    },
    {
      question: `Peut-on combiner le ${region.name} avec une autre région d'Inde ?`,
      answer: "Absolument. Beaucoup de nos clients combinent plusieurs régions dans un même voyage. Parlez-nous de vos envies et nous construirons un itinéraire sur mesure.",
    },
    {
      question: 'Comment obtenir un devis personnalisé ?',
      answer: "Cliquez sur \"Devis Sur Mesure\" en haut de la page. Nos conseillers reviennent vers vous sous 24h avec une proposition adaptée à votre budget et vos dates.",
    },
  ];
}
