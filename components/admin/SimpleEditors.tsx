import React from 'react';
import { Theme, Region, Guide } from '../../types';
import { Field, TextInput, TextArea, ImageInput, Button, IconBtn, Select } from './ui';

function move<T>(arr: T[], i: number, dir: -1 | 1): T[] {
  const j = i + dir;
  if (j < 0 || j >= arr.length) return arr;
  const next = [...arr];
  [next[i], next[j]] = [next[j], next[i]];
  return next;
}

const ItemShell: React.FC<{
  title: string;
  image?: string;
  onUp: () => void;
  onDown: () => void;
  onDelete: () => void;
  children: React.ReactNode;
}> = ({ title, image, onUp, onDown, onDelete, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="mb-3 flex items-center gap-3">
      <div className="h-12 w-16 shrink-0 overflow-hidden rounded-lg bg-slate-100">
        {image && <img src={image} alt="" className="h-full w-full object-cover" />}
      </div>
      <div className="flex-1 font-serif text-base text-slate-900">{title || '—'}</div>
      <div className="flex shrink-0 gap-1">
        <IconBtn title="Monter" onClick={onUp}>↑</IconBtn>
        <IconBtn title="Descendre" onClick={onDown}>↓</IconBtn>
        <IconBtn title="Supprimer" danger onClick={onDelete}>✕</IconBtn>
      </div>
    </div>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
export const ThemesEditor: React.FC<{
  themes: Theme[];
  onChange: (next: Theme[]) => void;
}> = ({ themes, onChange }) => {
  const update = (i: number, patch: Partial<Theme>) =>
    onChange(themes.map((t, idx) => (idx === i ? { ...t, ...patch } : t)));
  return (
    <div className="space-y-4">
      {themes.map((t, i) => (
        <ItemShell
          key={i}
          title={`${t.icon || ''} ${t.name}`}
          image={t.image}
          onUp={() => onChange(move(themes, i, -1))}
          onDown={() => onChange(move(themes, i, 1))}
          onDelete={() => confirm(`Supprimer le thème « ${t.name} » ?`) && onChange(themes.filter((_, idx) => idx !== i))}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <Field label="Nom">
              <TextInput value={t.name} onChange={(v) => update(i, { name: v })} />
            </Field>
            <Field label="Identifiant (id)">
              <TextInput value={t.id} onChange={(v) => update(i, { id: v })} />
            </Field>
            <Field label="Icône (emoji)" hint="Ex : 🏛️ 🌿 🏔️ 🕉️">
              <TextInput value={t.icon} onChange={(v) => update(i, { icon: v })} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Image">
              <ImageInput value={t.image} onChange={(v) => update(i, { image: v })} />
            </Field>
          </div>
        </ItemShell>
      ))}
      <Button
        variant="ghost"
        onClick={() =>
          onChange([...themes, { id: `theme-${themes.length + 1}`, name: '', icon: '', image: '' }])
        }
      >
        + Ajouter un thème
      </Button>
    </div>
  );
};

// ---------------------------------------------------------------------------
export const RegionsEditor: React.FC<{
  regions: Region[];
  onChange: (next: Region[]) => void;
}> = ({ regions, onChange }) => {
  const update = (i: number, patch: Partial<Region>) =>
    onChange(regions.map((r, idx) => (idx === i ? { ...r, ...patch } : r)));
  return (
    <div className="space-y-4">
      {regions.map((r, i) => (
        <ItemShell
          key={i}
          title={r.name}
          image={r.image}
          onUp={() => onChange(move(regions, i, -1))}
          onDown={() => onChange(move(regions, i, 1))}
          onDelete={() => confirm(`Supprimer la région « ${r.name} » ?`) && onChange(regions.filter((_, idx) => idx !== i))}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Nom">
              <TextInput value={r.name} onChange={(v) => update(i, { name: v })} />
            </Field>
            <Field label="Identifiant (id)">
              <TextInput value={r.id} onChange={(v) => update(i, { id: v })} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Image">
              <ImageInput value={r.image} onChange={(v) => update(i, { image: v })} />
            </Field>
          </div>
        </ItemShell>
      ))}
      <Button
        variant="ghost"
        onClick={() =>
          onChange([...regions, { id: `region-${regions.length + 1}`, name: '', image: '' }])
        }
      >
        + Ajouter une région
      </Button>
    </div>
  );
};

// ---------------------------------------------------------------------------
const GUIDE_CATEGORIES: Guide['category'][] = ['Visa', 'Météo', 'Culture', 'Conseils'];

export const GuidesEditor: React.FC<{
  guides: Guide[];
  onChange: (next: Guide[]) => void;
}> = ({ guides, onChange }) => {
  const update = (i: number, patch: Partial<Guide>) =>
    onChange(guides.map((g, idx) => (idx === i ? { ...g, ...patch } : g)));
  return (
    <div className="space-y-4">
      {guides.map((g, i) => (
        <ItemShell
          key={i}
          title={g.title}
          image={g.image}
          onUp={() => onChange(move(guides, i, -1))}
          onDown={() => onChange(move(guides, i, 1))}
          onDelete={() => confirm(`Supprimer le guide « ${g.title} » ?`) && onChange(guides.filter((_, idx) => idx !== i))}
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <Field label="Titre">
              <TextInput value={g.title} onChange={(v) => update(i, { title: v })} />
            </Field>
            <Field label="Identifiant (id)">
              <TextInput value={g.id} onChange={(v) => update(i, { id: v })} />
            </Field>
            <Field label="Catégorie">
              <Select
                value={g.category}
                onChange={(v) => update(i, { category: v as Guide['category'] })}
                options={GUIDE_CATEGORIES.map((c) => ({ value: c, label: c }))}
              />
            </Field>
            <Field label="Temps de lecture" hint="Ex : 8 min de lecture">
              <TextInput value={g.readTime} onChange={(v) => update(i, { readTime: v })} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Extrait">
              <TextArea value={g.excerpt} onChange={(v) => update(i, { excerpt: v })} rows={2} />
            </Field>
          </div>
          <div className="mt-4">
            <Field label="Image">
              <ImageInput value={g.image} onChange={(v) => update(i, { image: v })} />
            </Field>
          </div>
        </ItemShell>
      ))}
      <Button
        variant="ghost"
        onClick={() =>
          onChange([
            ...guides,
            {
              id: `g${guides.length + 1}`,
              category: 'Conseils',
              title: '',
              excerpt: '',
              image: '',
              readTime: '5 min de lecture',
            },
          ])
        }
      >
        + Ajouter un guide
      </Button>
    </div>
  );
};
