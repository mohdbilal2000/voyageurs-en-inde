
import React from 'react';
import { useSiteData } from '../store/siteStore';

interface GuideSectionProps {
  fullPage?: boolean;
}

const GuideSection: React.FC<GuideSectionProps> = ({ fullPage = false }) => {
  const { guides: GUIDES } = useSiteData();
  return (
    <section className={`py-24 ${fullPage ? 'bg-white pt-32' : 'bg-slate-50'}`}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="max-w-lg mb-8 md:mb-0">
            <h2 className="text-4xl font-serif mb-4">Le Journal du Voyageur</h2>
            <p className="text-slate-500">Conseils, récits et inspirations de nos experts pour préparer votre prochain voyage en Inde.</p>
          </div>
          {!fullPage && (
            <button className="text-slate-900 font-bold border-b-2 border-slate-900 pb-1 uppercase text-xs tracking-widest hover:text-slate-600 hover:border-slate-300 transition-all">
              Voir tous les guides
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {GUIDES.map((guide) => (
            <article key={guide.id} className="group cursor-pointer">
              <div className="aspect-video overflow-hidden rounded-2xl mb-6 shadow-sm">
                <img 
                  src={guide.image} 
                  alt={guide.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                />
              </div>
              <div className="flex items-center space-x-3 mb-4">
                 <span className="px-3 py-1 bg-white text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-100 rounded-full">
                    {guide.category}
                 </span>
                 <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{guide.readTime}</span>
              </div>
              <h3 className="text-2xl font-serif mb-4 group-hover:text-slate-600 transition-colors">{guide.title}</h3>
              <p className="text-slate-500 leading-relaxed mb-6 line-clamp-2">
                {guide.excerpt}
              </p>
              <div className="inline-flex items-center text-slate-900 font-bold text-xs uppercase tracking-widest border-b border-transparent group-hover:border-slate-900 transition-all pb-1">
                Lire l'article
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GuideSection;
