import React, { useState } from 'react';
import { Trip, ItineraryItem, MapPoint } from '../../types';
import {
  Field,
  TextInput,
  NumberInput,
  TextArea,
  StringListEditor,
  ImageInput,
  Button,
  IconBtn,
} from './ui';

const subInput =
  'w-full rounded-md border border-slate-200 bg-white px-2.5 py-1.5 text-sm outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition';

// ---------------------------------------------------------------------------
// Itinerary (day-by-day) editor
// ---------------------------------------------------------------------------
const ItineraryEditor: React.FC<{
  items: ItineraryItem[];
  onChange: (next: ItineraryItem[]) => void;
}> = ({ items, onChange }) => {
  const update = (i: number, patch: Partial<ItineraryItem>) => {
    const next = items.map((it, idx) => (idx === i ? { ...it, ...patch } : it));
    onChange(next);
  };
  const remove = (i: number) => onChange(items.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () =>
    onChange([
      ...items,
      { day: items.length + 1, title: '', desc: '', lat: undefined, lng: undefined },
    ]);

  return (
    <div className="space-y-3">
      {items.map((it, i) => (
        <div key={i} className="rounded-xl border border-slate-200 bg-slate-50/60 p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-saffron">
              Jour {it.day}
            </span>
            <div className="flex gap-1">
              <IconBtn title="Monter" onClick={() => move(i, -1)}>↑</IconBtn>
              <IconBtn title="Descendre" onClick={() => move(i, 1)}>↓</IconBtn>
              <IconBtn title="Supprimer" danger onClick={() => remove(i)}>✕</IconBtn>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-2">
            <div className="col-span-3 sm:col-span-2">
              <input
                type="number"
                className={subInput}
                value={it.day}
                title="Jour"
                onChange={(e) => update(i, { day: Number(e.target.value) })}
              />
            </div>
            <div className="col-span-9 sm:col-span-10">
              <input
                className={subInput}
                placeholder="Titre de l'étape"
                value={it.title}
                onChange={(e) => update(i, { title: e.target.value })}
              />
            </div>
            <div className="col-span-12">
              <textarea
                className={subInput + ' resize-y'}
                rows={2}
                placeholder="Description de la journée"
                value={it.desc}
                onChange={(e) => update(i, { desc: e.target.value })}
              />
            </div>
            <div className="col-span-6">
              <input
                type="number"
                step="any"
                className={subInput}
                placeholder="Latitude (optionnel)"
                value={it.lat ?? ''}
                onChange={(e) =>
                  update(i, { lat: e.target.value === '' ? undefined : Number(e.target.value) })
                }
              />
            </div>
            <div className="col-span-6">
              <input
                type="number"
                step="any"
                className={subInput}
                placeholder="Longitude (optionnel)"
                value={it.lng ?? ''}
                onChange={(e) =>
                  update(i, { lng: e.target.value === '' ? undefined : Number(e.target.value) })
                }
              />
            </div>
          </div>
        </div>
      ))}
      <Button variant="ghost" onClick={add}>
        + Ajouter une journée
      </Button>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Map points (route on the card hover map) editor
// ---------------------------------------------------------------------------
const MapPointsEditor: React.FC<{
  points: MapPoint[];
  onChange: (next: MapPoint[]) => void;
}> = ({ points, onChange }) => {
  const update = (i: number, patch: Partial<MapPoint>) =>
    onChange(points.map((p, idx) => (idx === i ? { ...p, ...patch } : p)));
  const remove = (i: number) => onChange(points.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= points.length) return;
    const next = [...points];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...points, { lat: 0, lng: 0, label: '' }]);

  return (
    <div className="space-y-2">
      {points.map((p, i) => (
        <div key={i} className="grid grid-cols-12 items-center gap-2">
          <div className="col-span-5">
            <input
              className={subInput}
              placeholder="Ville / étape"
              value={p.label}
              onChange={(e) => update(i, { label: e.target.value })}
            />
          </div>
          <div className="col-span-3">
            <input
              type="number"
              step="any"
              className={subInput}
              placeholder="Lat"
              value={p.lat}
              onChange={(e) => update(i, { lat: Number(e.target.value) })}
            />
          </div>
          <div className="col-span-3">
            <input
              type="number"
              step="any"
              className={subInput}
              placeholder="Lng"
              value={p.lng}
              onChange={(e) => update(i, { lng: Number(e.target.value) })}
            />
          </div>
          <div className="col-span-1 flex justify-end gap-1">
            <IconBtn title="Monter" onClick={() => move(i, -1)}>↑</IconBtn>
            <IconBtn title="Descendre" onClick={() => move(i, 1)}>↓</IconBtn>
            <IconBtn title="Supprimer" danger onClick={() => remove(i)}>✕</IconBtn>
          </div>
        </div>
      ))}
      <Button variant="ghost" onClick={add}>
        + Ajouter un point
      </Button>
      <p className="text-[11px] text-slate-400">
        Ces points dessinent l'itinéraire sur la mini-carte affichée au survol de la carte du
        circuit.
      </p>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Full trip editor
// ---------------------------------------------------------------------------
const TripEditor: React.FC<{
  trip: Trip;
  index: number;
  total: number;
  regionSuggestions: string[];
  themeSuggestions: string[];
  onChange: (trip: Trip) => void;
  onDelete: () => void;
  onMove: (dir: -1 | 1) => void;
}> = ({ trip, index, total, regionSuggestions, themeSuggestions, onChange, onDelete, onMove }) => {
  const [open, setOpen] = useState(false);
  const set = (patch: Partial<Trip>) => onChange({ ...trip, ...patch });

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      {/* Collapsed header row */}
      <div className="flex items-center gap-3 p-3">
        <div className="h-14 w-20 shrink-0 overflow-hidden rounded-lg bg-slate-100">
          {trip.image && (
            <img src={trip.image} alt="" className="h-full w-full object-cover" />
          )}
        </div>
        <button
          className="flex-1 text-left"
          onClick={() => setOpen((o) => !o)}
          title="Modifier ce circuit"
        >
          <div className="font-serif text-lg leading-tight text-slate-900">
            {trip.title || 'Nouveau circuit'}
          </div>
          <div className="mt-0.5 text-[11px] uppercase tracking-wider text-slate-400">
            {trip.region || '—'} · {trip.theme || '—'} · {trip.duration || '—'} · {trip.price}€
          </div>
        </button>
        <div className="flex shrink-0 items-center gap-1">
          <IconBtn title="Monter" onClick={() => onMove(-1)}>↑</IconBtn>
          <IconBtn title="Descendre" onClick={() => onMove(1)}>↓</IconBtn>
          <Button variant="ghost" onClick={() => setOpen((o) => !o)}>
            {open ? 'Fermer' : 'Modifier'}
          </Button>
        </div>
      </div>

      {open && (
        <div className="space-y-5 border-t border-slate-100 p-5">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Titre">
              <TextInput value={trip.title} onChange={(v) => set({ title: v })} />
            </Field>
            <Field label="Identifiant (id)" hint="Doit être unique. Évitez de le changer après publication.">
              <TextInput value={trip.id} onChange={(v) => set({ id: v })} />
            </Field>
            <Field label="Région" hint="Ex : Nord, Rajasthan, Inde du Sud, Himalaya">
              <input
                className={subInput}
                list="region-suggestions"
                value={trip.region}
                onChange={(e) => set({ region: e.target.value })}
              />
              <datalist id="region-suggestions">
                {regionSuggestions.map((r) => (
                  <option key={r} value={r} />
                ))}
              </datalist>
            </Field>
            <Field label="Thème" hint="Ex : Culture, Nature, Aventure, Spiritualité, Safari">
              <input
                className={subInput}
                list="theme-suggestions"
                value={trip.theme}
                onChange={(e) => set({ theme: e.target.value })}
              />
              <datalist id="theme-suggestions">
                {themeSuggestions.map((t) => (
                  <option key={t} value={t} />
                ))}
              </datalist>
            </Field>
            <Field label="Durée" hint="Ex : 10 Jours">
              <TextInput value={trip.duration} onChange={(v) => set({ duration: v })} />
            </Field>
            <Field label="Prix (à partir de, €)">
              <NumberInput value={trip.price} onChange={(v) => set({ price: v })} />
            </Field>
          </div>

          <Field label="Image principale">
            <ImageInput value={trip.image} onChange={(v) => set({ image: v })} />
          </Field>

          <Field label="Description">
            <TextArea value={trip.description} onChange={(v) => set({ description: v })} rows={3} />
          </Field>

          <Field label="Points forts">
            <StringListEditor
              values={trip.highlights}
              onChange={(v) => set({ highlights: v })}
              placeholder="Ex : Taj Mahal"
              addLabel="Ajouter un point fort"
            />
          </Field>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Itinéraire jour par jour
            </span>
            <ItineraryEditor
              items={trip.itinerary}
              onChange={(v) => set({ itinerary: v })}
            />
          </div>

          <div>
            <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
              Points de la carte
            </span>
            <MapPointsEditor
              points={trip.mapPoints ?? []}
              onChange={(v) => set({ mapPoints: v })}
            />
          </div>

          <div className="flex justify-end border-t border-slate-100 pt-4">
            <Button
              variant="danger"
              onClick={() => {
                if (confirm(`Supprimer le circuit « ${trip.title} » ?`)) onDelete();
              }}
            >
              Supprimer ce circuit
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripEditor;
