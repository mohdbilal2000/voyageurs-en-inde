
import React, { useEffect } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { useSiteData } from '../store/siteStore';
import { useSeo } from '../hooks/useSeo';
import Breadcrumb from './Breadcrumb';

const GuidePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { guides: GUIDES } = useSiteData();
  const guide = GUIDES.find((g) => g.slug === slug);

  useSeo({
    title: guide ? `${guide.title} | Voyageurs en Inde` : 'Voyageurs en Inde',
    description: guide?.excerpt,
    path: guide ? `/conseils/${guide.slug}` : '/conseils',
  });

  useEffect(() => {
    if (!guide) return;
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = 'guide-schema';
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: guide.title,
      description: guide.excerpt,
      image: guide.image,
      author: { '@type': 'Organization', name: 'Voyageurs en Inde' },
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById('guide-schema')?.remove();
    };
  }, [guide]);

  if (!guide) {
    return <Navigate to="/conseils" replace />;
  }

  const others = GUIDES.filter((g) => g.id !== guide.id).slice(0, 2);

  return (
    <div className="bg-white pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-6">
        <Breadcrumb
          items={[
            { label: 'Accueil', path: '/' },
            { label: 'Conseils', path: '/conseils' },
            { label: guide.title },
          ]}
        />

        <div className="flex items-center space-x-3 mt-6 mb-6">
          <span className="px-3 py-1 bg-slate-50 text-slate-500 text-[10px] font-bold uppercase tracking-widest border border-slate-100 rounded-full">
            {guide.category}
          </span>
          <span className="text-[10px] text-slate-400 font-medium uppercase tracking-widest">{guide.readTime}</span>
        </div>

        <h1 className="text-4xl md:text-5xl font-serif mb-10">{guide.title}</h1>

        <div className="aspect-video overflow-hidden rounded-2xl mb-12 shadow-sm">
          <img src={guide.image} alt={guide.title} className="w-full h-full object-cover" />
        </div>

        <div className="space-y-10">
          {(guide.content ?? []).map((section, i) => (
            <div key={i}>
              <h2 className="text-2xl font-serif mb-3 italic">{section.heading}</h2>
              <p className="text-slate-600 leading-relaxed font-light">{section.body}</p>
            </div>
          ))}
        </div>

        {others.length > 0 && (
          <div className="mt-20 pt-12 border-t border-slate-100">
            <span className="text-saffron text-xs font-black uppercase tracking-[0.4em] mb-6 block">À lire aussi</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {others.map((g) => (
                <Link key={g.id} to={`/conseils/${g.slug}`} className="group block">
                  <div className="aspect-video overflow-hidden rounded-2xl mb-4 shadow-sm">
                    <img src={g.image} alt={g.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <h3 className="text-lg font-serif group-hover:text-slate-600 transition-colors">{g.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GuidePage;
