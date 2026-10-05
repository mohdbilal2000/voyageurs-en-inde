import React, { useState, useEffect } from 'react';
import { FaqItem } from '../utils/tripFaq';

interface FAQSectionProps {
  items: FaqItem[];
  schemaId?: string;
}

const FAQSection: React.FC<FAQSectionProps> = ({ items, schemaId = 'faq-schema' }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = schemaId;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer,
        },
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(schemaId)?.remove();
    };
  }, [items, schemaId]);

  return (
    <section className="bg-slate-50 py-24 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6">
        <span className="text-saffron text-xs font-black uppercase tracking-[0.4em] mb-6 block">Vos Questions</span>
        <h2 className="text-4xl font-serif mb-12 italic">Questions Fréquentes</h2>
        <div className="space-y-4">
          {items.map((item, i) => (
            <div key={i} className="border border-slate-100 rounded-[1.5rem] overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <span className="font-bold text-slate-900 pr-6">{item.question}</span>
                <span className={`transform transition-transform duration-300 flex-shrink-0 ${openIndex === i ? 'rotate-180' : ''}`}>
                  <svg className="w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-6 text-slate-500 leading-relaxed font-light animate-in slide-in-from-top-2 duration-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
