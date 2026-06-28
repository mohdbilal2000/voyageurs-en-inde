import React, { useRef, useState } from 'react';
import { fileToCompressedDataUrl, approxKb } from './imageUtils';

// ---------------------------------------------------------------------------
// Small styled form primitives used across the admin editors.
// ---------------------------------------------------------------------------

export const Field: React.FC<{ label: string; hint?: string; children: React.ReactNode }> = ({
  label,
  hint,
  children,
}) => (
  <label className="block">
    <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
      {label}
    </span>
    {children}
    {hint && <span className="block text-[11px] text-slate-400 mt-1">{hint}</span>}
  </label>
);

const inputClass =
  'w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-900 outline-none focus:border-saffron focus:ring-2 focus:ring-saffron/20 transition';

export const TextInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}> = ({ value, onChange, placeholder, type = 'text' }) => (
  <input
    type={type}
    className={inputClass}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);

export const NumberInput: React.FC<{
  value: number;
  onChange: (v: number) => void;
  placeholder?: string;
  step?: string;
}> = ({ value, onChange, placeholder, step }) => (
  <input
    type="number"
    step={step}
    className={inputClass}
    value={Number.isFinite(value) ? value : ''}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value === '' ? 0 : Number(e.target.value))}
  />
);

export const TextArea: React.FC<{
  value: string;
  onChange: (v: string) => void;
  rows?: number;
  placeholder?: string;
}> = ({ value, onChange, rows = 3, placeholder }) => (
  <textarea
    className={inputClass + ' resize-y leading-relaxed'}
    rows={rows}
    value={value}
    placeholder={placeholder}
    onChange={(e) => onChange(e.target.value)}
  />
);

export const Select: React.FC<{
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
}> = ({ value, onChange, options }) => (
  <select className={inputClass} value={value} onChange={(e) => onChange(e.target.value)}>
    {options.map((o) => (
      <option key={o.value} value={o.value}>
        {o.label}
      </option>
    ))}
  </select>
);

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'ghost';
const buttonStyles: Record<ButtonVariant, string> = {
  primary: 'bg-saffron text-white hover:bg-saffron/90 shadow-sm',
  secondary: 'bg-slate-900 text-white hover:bg-slate-700',
  danger: 'bg-white text-fr-red border border-fr-red/30 hover:bg-fr-red hover:text-white',
  ghost: 'bg-transparent text-slate-500 hover:bg-slate-100',
};

export const Button: React.FC<{
  onClick?: () => void;
  children: React.ReactNode;
  variant?: ButtonVariant;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  title?: string;
}> = ({ onClick, children, variant = 'primary', type = 'button', disabled, className = '', title }) => (
  <button
    type={type}
    onClick={onClick}
    disabled={disabled}
    title={title}
    className={`inline-flex items-center justify-center gap-1.5 rounded-full px-4 py-2 text-[11px] font-bold uppercase tracking-widest transition disabled:opacity-40 disabled:cursor-not-allowed ${buttonStyles[variant]} ${className}`}
  >
    {children}
  </button>
);

// ---------------------------------------------------------------------------
// Editor for a list of plain strings (e.g. trip highlights).
// ---------------------------------------------------------------------------
export const StringListEditor: React.FC<{
  values: string[];
  onChange: (next: string[]) => void;
  placeholder?: string;
  addLabel?: string;
}> = ({ values, onChange, placeholder, addLabel = 'Ajouter' }) => {
  const update = (i: number, v: string) => {
    const next = [...values];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(values.filter((_, idx) => idx !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= values.length) return;
    const next = [...values];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  return (
    <div className="space-y-2">
      {values.map((v, i) => (
        <div key={i} className="flex items-center gap-2">
          <input
            className={inputClass}
            value={v}
            placeholder={placeholder}
            onChange={(e) => update(i, e.target.value)}
          />
          <div className="flex items-center gap-1 shrink-0">
            <IconBtn title="Monter" onClick={() => move(i, -1)}>↑</IconBtn>
            <IconBtn title="Descendre" onClick={() => move(i, 1)}>↓</IconBtn>
            <IconBtn title="Supprimer" danger onClick={() => remove(i)}>✕</IconBtn>
          </div>
        </div>
      ))}
      <Button variant="ghost" onClick={() => onChange([...values, ''])}>
        + {addLabel}
      </Button>
    </div>
  );
};

export const IconBtn: React.FC<{
  onClick: () => void;
  children: React.ReactNode;
  title?: string;
  danger?: boolean;
}> = ({ onClick, children, title, danger }) => (
  <button
    type="button"
    title={title}
    onClick={onClick}
    className={`flex h-8 w-8 items-center justify-center rounded-lg border text-sm transition ${
      danger
        ? 'border-slate-200 text-slate-400 hover:border-fr-red hover:text-fr-red'
        : 'border-slate-200 text-slate-500 hover:border-saffron hover:text-saffron'
    }`}
  >
    {children}
  </button>
);

// ---------------------------------------------------------------------------
// Image input: upload a file (auto-compressed to a data URL) OR paste a URL.
// ---------------------------------------------------------------------------
export const ImageInput: React.FC<{
  value: string;
  onChange: (v: string) => void;
}> = ({ value, onChange }) => {
  const fileRef = useRef<HTMLInputElement>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setBusy(true);
    setError('');
    try {
      const dataUrl = await fileToCompressedDataUrl(file);
      onChange(dataUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Échec du téléversement.');
    } finally {
      setBusy(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const isUpload = value.startsWith('data:');

  return (
    <div className="space-y-2">
      <div className="flex gap-3">
        <div className="relative h-24 w-32 shrink-0 overflow-hidden rounded-lg border border-slate-200 bg-slate-50">
          {value ? (
            <img
              src={value}
              alt="aperçu"
              className="h-full w-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.opacity = '0.2';
              }}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-400">
              Aucune image
            </div>
          )}
          {isUpload && (
            <span className="absolute bottom-1 right-1 rounded bg-black/60 px-1.5 py-0.5 text-[9px] font-bold text-white">
              {approxKb(value)} Ko
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <input
            className={inputClass}
            value={isUpload ? '' : value}
            placeholder="Coller une URL d'image (https://…)"
            onChange={(e) => onChange(e.target.value)}
            disabled={isUpload}
          />
          <div className="flex items-center gap-2">
            <Button variant="secondary" onClick={() => fileRef.current?.click()} disabled={busy}>
              {busy ? 'Traitement…' : '⬆ Téléverser'}
            </Button>
            {value && (
              <Button variant="ghost" onClick={() => onChange('')}>
                Effacer
              </Button>
            )}
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0])}
            />
          </div>
        </div>
      </div>
      {isUpload && (
        <p className="text-[11px] text-slate-400">
          Image importée (intégrée au site). Pour effacer et coller une URL, cliquez « Effacer ».
        </p>
      )}
      {error && <p className="text-[11px] text-fr-red">{error}</p>}
    </div>
  );
};

// Section card wrapper
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = '',
}) => (
  <div className={`rounded-2xl border border-slate-200 bg-white p-5 shadow-sm ${className}`}>
    {children}
  </div>
);
