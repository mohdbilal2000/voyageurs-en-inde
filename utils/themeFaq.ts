import { Theme } from '../types';
import { FaqItem } from './tripFaq';

export function generateThemeFaq(theme: Theme, tripCount: number): FaqItem[] {
  return [
    {
      question: `Combien de circuits "${theme.name}" proposez-vous ?`,
      answer: `Nous proposons actuellement ${tripCount} circuit${tripCount > 1 ? 's' : ''} sur le thème ${theme.name}, chacun adaptable à vos dates, votre budget et vos envies.`,
    },
    {
      question: 'Ces circuits sont-ils accompagnés d\'un guide francophone ?',
      answer: "Oui. Chaque voyage Voyageurs en Inde est accompagné d'un guide francophone du premier au dernier jour.",
    },
    {
      question: 'Peut-on mélanger plusieurs thématiques dans un même voyage ?',
      answer: "Bien sûr. La plupart de nos circuits combinent déjà culture, nature et aventure. Parlez-nous de vos envies pour un itinéraire 100% sur mesure.",
    },
    {
      question: 'Comment obtenir un devis personnalisé ?',
      answer: "Cliquez sur \"Devis Sur Mesure\" en haut de la page. Nos conseillers reviennent vers vous sous 24h avec une proposition adaptée à votre budget et vos dates.",
    },
  ];
}
