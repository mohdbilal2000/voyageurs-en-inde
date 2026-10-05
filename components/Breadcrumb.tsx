import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const SITE_URL = 'https://www.voyageurseninde.fr';

export interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  dark?: boolean;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, dark = false }) => {
  const location = useLocation();
  // Scoped to the current path so two Breadcrumb instances (e.g. during a
  // route transition) can never fight over the same <script id>.
  const schemaId = `breadcrumb-schema-${location.pathname}`;
  const itemsKey = items.map((i) => `${i.label}|${i.path ?? ''}`).join(',');

  useEffect(() => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.id = schemaId;
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: items.map((item, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: item.label,
        item: item.path ? `${SITE_URL}${item.path}` : undefined,
      })),
    });
    document.head.appendChild(script);
    return () => {
      document.getElementById(schemaId)?.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [schemaId, itemsKey]);

  return (
    <nav
      aria-label="Fil d'Ariane"
      className={`text-[11px] font-bold uppercase tracking-widest flex items-center flex-wrap gap-x-2 gap-y-1 ${dark ? 'text-white/70' : 'text-slate-400'}`}
    >
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-x-2">
          {i > 0 && <span className="opacity-50">/</span>}
          {item.path ? (
            <Link to={item.path} className={`hover:underline ${dark ? 'hover:text-white' : 'hover:text-slate-900'}`}>
              {item.label}
            </Link>
          ) : (
            <span className={dark ? 'text-white' : 'text-slate-600'}>{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
};

export default Breadcrumb;
