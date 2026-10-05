import React, { useEffect, useMemo, useRef, useState } from 'react';
import { SiteData, Trip } from '../../types';
import {
  loadSiteData,
  saveSiteData,
  resetSiteData,
  hasLocalEdits,
  normalizeSiteData,
} from '../../store/siteStore';
import { ADMIN_PASSWORD, ADMIN_SESSION_KEY } from './config';
import { Button } from './ui';
import TripEditor from './TripEditor';
import { ThemesEditor, RegionsEditor, GuidesEditor } from './SimpleEditors';

type Tab = 'trips' | 'themes' | 'regions' | 'guides';

const TABS: { id: Tab; label: string }[] = [
  { id: 'trips', label: 'Circuits' },
  { id: 'themes', label: 'Thèmes' },
  { id: 'regions', label: 'Régions' },
  { id: 'guides', label: 'Guides' },
];

// ---------------------------------------------------------------------------
// Login gate
// ---------------------------------------------------------------------------
const Login: React.FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const [pwd, setPwd] = useState('');
  const [error, setError] = useState(false);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pwd === ADMIN_PASSWORD) {
      sessionStorage.setItem(ADMIN_SESSION_KEY, '1');
      onSuccess();
    } else {
      setError(true);
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f9fc] px-6">
      <form
        onSubmit={submit}
        className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl"
      >
        <div className="mb-6 text-center">
          <div className="text-3xl">🇫🇷</div>
          <h1 className="mt-2 font-serif text-2xl text-slate-900">Administration</h1>
          <p className="text-sm text-slate-400">Voyageurs en Inde</p>
        </div>
        <input
          type="password"
          autoFocus
          value={pwd}
          onChange={(e) => {
            setPwd(e.target.value);
            setError(false);
          }}
          placeholder="Mot de passe"
          className="w-full rounded-lg border border-slate-200 px-3 py-2.5 text-sm outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20"
        />
        {error && <p className="mt-2 text-[12px] text-fr-red">Mot de passe incorrect.</p>}
        <button
          type="submit"
          className="mt-4 w-full rounded-full bg-saffron py-2.5 text-[11px] font-bold uppercase tracking-widest text-white transition hover:bg-saffron/90"
        >
          Se connecter
        </button>
        <a
          href="/"
          className="mt-4 block text-center text-[11px] uppercase tracking-widest text-slate-400 hover:text-slate-600"
        >
          ← Retour au site
        </a>
      </form>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Publish instructions modal
// ---------------------------------------------------------------------------
const PublishModal: React.FC<{ onClose: () => void; onDownload: () => void }> = ({
  onClose,
  onDownload,
}) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
      <h3 className="font-serif text-xl text-slate-900">Publier les modifications</h3>
      <p className="mt-2 text-sm text-slate-500">
        Vos changements sont déjà visibles sur ce navigateur (aperçu). Pour les mettre en ligne
        pour tout le monde :
      </p>
      <ol className="mt-3 space-y-2 text-sm text-slate-600">
        <li>
          <strong>1.</strong> Téléchargez le fichier de données ci-dessous.
        </li>
        <li>
          <strong>2.</strong> Remplacez le fichier <code className="rounded bg-slate-100 px-1">data/site-data.json</code> du projet par celui téléchargé.
        </li>
        <li>
          <strong>3.</strong> Validez (commit) et poussez : le site se reconstruit et se met à jour
          automatiquement.
        </li>
      </ol>
      <div className="mt-6 flex justify-end gap-2">
        <Button variant="ghost" onClick={onClose}>
          Fermer
        </Button>
        <Button variant="primary" onClick={onDownload}>
          ⬇ Télécharger site-data.json
        </Button>
      </div>
    </div>
  </div>
);

// ---------------------------------------------------------------------------
// Main admin application
// ---------------------------------------------------------------------------
const AdminApp: React.FC = () => {
  const [authed, setAuthed] = useState(
    () => typeof window !== 'undefined' && sessionStorage.getItem(ADMIN_SESSION_KEY) === '1'
  );
  const [data, setData] = useState<SiteData>(() => normalizeSiteData(loadSiteData()));
  const [tab, setTab] = useState<Tab>('trips');
  const [dirty, setDirty] = useState(() => hasLocalEdits());
  const [savedAt, setSavedAt] = useState<string>('');
  const [quotaError, setQuotaError] = useState(false);
  const [showPublish, setShowPublish] = useState(false);
  const importRef = useRef<HTMLInputElement>(null);
  const firstRender = useRef(true);

  // Auto-save the working copy to localStorage (drives the live site preview).
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    const handle = setTimeout(() => {
      try {
        saveSiteData(data);
        setDirty(true);
        setQuotaError(false);
        const d = new Date();
        setSavedAt(d.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      } catch (err) {
        setQuotaError(true);
      }
    }, 500);
    return () => clearTimeout(handle);
  }, [data]);

  const regionSuggestions = useMemo(() => {
    const set = new Set<string>();
    data.regions.forEach((r) => r.name && set.add(r.name));
    data.trips.forEach((t) => t.region && set.add(t.region));
    return [...set];
  }, [data.regions, data.trips]);

  const themeSuggestions = useMemo(() => {
    const set = new Set<string>(['Safari']);
    data.themes.forEach((t) => t.name && set.add(t.name));
    data.trips.forEach((t) => t.theme && set.add(t.theme));
    return [...set];
  }, [data.themes, data.trips]);

  if (!authed) return <Login onSuccess={() => setAuthed(true)} />;

  const updateTrips = (trips: Trip[]) => setData((d) => ({ ...d, trips }));

  const addTrip = () => {
    const newTrip: Trip = {
      id: `it-${Date.now()}`,
      title: 'Nouveau circuit',
      region: '',
      theme: '',
      duration: '',
      price: 0,
      image: '',
      description: '',
      highlights: [],
      itinerary: [],
      mapPoints: [],
    };
    setData((d) => ({ ...d, trips: [newTrip, ...d.trips] }));
    setTab('trips');
  };

  const moveTrip = (index: number, dir: -1 | 1) => {
    const j = index + dir;
    if (j < 0 || j >= data.trips.length) return;
    const next = [...data.trips];
    [next[index], next[j]] = [next[j], next[index]];
    updateTrips(next);
  };

  const downloadJson = () => {
    const payload = JSON.stringify(normalizeSiteData(data), null, 2) + '\n';
    const blob = new Blob([payload], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'site-data.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const normalized = normalizeSiteData(parsed);
        setData(normalized);
        alert('Données importées. Pensez à vérifier puis publier.');
      } catch {
        alert('Fichier invalide : impossible de lire le JSON.');
      }
    };
    reader.readAsText(file);
    if (importRef.current) importRef.current.value = '';
  };

  const handleReset = () => {
    if (
      confirm(
        'Annuler toutes les modifications locales et revenir à la version publiée ? Cette action est irréversible.'
      )
    ) {
      resetSiteData();
      setData(normalizeSiteData(loadSiteData()));
      setDirty(false);
      setSavedAt('');
    }
  };

  const logout = () => {
    sessionStorage.removeItem(ADMIN_SESSION_KEY);
    setAuthed(false);
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] text-slate-900">
      {/* Top bar */}
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center gap-3 px-4 py-3">
          <div className="mr-auto flex items-center gap-2">
            <span className="text-xl">🇫🇷</span>
            <div>
              <div className="font-serif text-lg leading-none">Administration</div>
              <div className="text-[11px] text-slate-400">
                {dirty ? (
                  <span className="text-amber-600">
                    ● Modifications non publiées{savedAt ? ` · enregistré ${savedAt}` : ''}
                  </span>
                ) : (
                  <span>Aucune modification locale</span>
                )}
              </div>
            </div>
          </div>
          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="rounded-full px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:bg-slate-100"
          >
            ↗ Voir le site
          </a>
          <input
            ref={importRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => handleImport(e.target.files?.[0])}
          />
          <Button variant="ghost" onClick={() => importRef.current?.click()}>
            Importer
          </Button>
          <Button variant="ghost" onClick={handleReset}>
            Réinitialiser
          </Button>
          <Button variant="primary" onClick={() => setShowPublish(true)}>
            Publier
          </Button>
          <Button variant="ghost" onClick={logout}>
            Quitter
          </Button>
        </div>

        {/* Tabs */}
        <div className="mx-auto flex max-w-5xl gap-1 px-4">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`relative px-4 py-2.5 text-[11px] font-bold uppercase tracking-widest transition ${
                tab === t.id
                  ? 'text-saffron'
                  : 'text-slate-400 hover:text-slate-700'
              }`}
            >
              {t.label}
              <span className="ml-1 text-slate-300">
                {t.id === 'trips'
                  ? data.trips.length
                  : t.id === 'themes'
                  ? data.themes.length
                  : t.id === 'regions'
                  ? data.regions.length
                  : data.guides.length}
              </span>
              {tab === t.id && (
                <span className="absolute inset-x-2 bottom-0 h-0.5 rounded-full bg-saffron" />
              )}
            </button>
          ))}
        </div>
      </header>

      {quotaError && (
        <div className="mx-auto mt-3 max-w-5xl px-4">
          <div className="rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Stockage local saturé : trop d'images importées. Utilisez plutôt des <strong>URL
            d'images</strong> pour certaines, ou publiez puis réinitialisez pour libérer de l'espace.
            Vos dernières modifications ne sont peut-être pas enregistrées localement — pensez à
            publier (exporter) le fichier.
          </div>
        </div>
      )}

      {/* Content */}
      <main className="mx-auto max-w-5xl px-4 py-6">
        {tab === 'trips' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-slate-500">
                {data.trips.length} circuit{data.trips.length > 1 ? 's' : ''}. Cliquez sur un
                circuit pour le modifier.
              </p>
              <Button variant="primary" onClick={addTrip}>
                + Nouveau circuit
              </Button>
            </div>
            {data.trips.map((trip, i) => (
              <TripEditor
                key={trip.id + '-' + i}
                trip={trip}
                index={i}
                total={data.trips.length}
                regionSuggestions={regionSuggestions}
                themeSuggestions={themeSuggestions}
                onChange={(t) => updateTrips(data.trips.map((x, idx) => (idx === i ? t : x)))}
                onDelete={() => updateTrips(data.trips.filter((_, idx) => idx !== i))}
                onMove={(dir) => moveTrip(i, dir)}
              />
            ))}
          </div>
        )}

        {tab === 'themes' && (
          <ThemesEditor themes={data.themes} onChange={(themes) => setData((d) => ({ ...d, themes }))} />
        )}
        {tab === 'regions' && (
          <RegionsEditor
            regions={data.regions}
            onChange={(regions) => setData((d) => ({ ...d, regions }))}
          />
        )}
        {tab === 'guides' && (
          <GuidesEditor guides={data.guides} onChange={(guides) => setData((d) => ({ ...d, guides }))} />
        )}
      </main>

      {showPublish && (
        <PublishModal
          onClose={() => setShowPublish(false)}
          onDownload={() => {
            downloadJson();
            setShowPublish(false);
          }}
        />
      )}

      <footer className="border-t border-slate-200 py-6 text-center text-[11px] text-slate-400">
        Panneau d'administration · Voyageurs en Inde
      </footer>
    </div>
  );
};

export default AdminApp;
