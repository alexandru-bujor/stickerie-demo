import { useEffect, useRef, useState } from "react";
import { FOIL_COLORS } from "../../data/design";
import { clamp } from "../../lib/format";
import { useApp } from "../../state/AppContext";
import type { CalcField, CalcValues, CalculatorProduct } from "../../types";
import { Segmented } from "../ui/Segmented";
import { Swatches } from "../ui/Swatches";
import { UploadField } from "../ui/UploadField";

interface Props {
  product: CalculatorProduct;
  values: CalcValues;
  onChange: (v: CalcValues) => void;
}

const labelRow = "flex justify-between gap-2 text-sm font-bold";
const hint = "text-[13px] font-medium text-ink-2";
const inputBox = "flex items-center overflow-hidden rounded-[10px] border-[1.5px] border-line bg-paper focus-within:outline-3 focus-within:outline-offset-1 focus-within:outline-brand";

/** Renders a calculator's fields from its config in data/calculators.ts. */
export function CalculatorForm({ product, values, onChange }: Props) {
  const { calcImage, setCalcImage, showToast } = useApp();
  const set = (patch: Partial<CalcValues>) => onChange({ ...values, ...patch } as CalcValues);

  const field = (f: CalcField) => {
    if ("show" in f && f.show && !f.show(values)) return null;
    switch (f.type) {
      case "dims":
        return (
          <div key={f.id} className="flex flex-col gap-2">
            <span className={labelRow}>{f.label}<span className={hint}>{f.min}–{f.max} cm</span></span>
            <div className="grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-end gap-2.5">
              <NumberInput label="Lățime" value={values.w} min={f.min} max={f.max} onCommit={(n) => set({ w: n })} />
              <span className="pb-3 font-mono text-ink-2">×</span>
              <NumberInput label="Înălțime" value={values.h} min={f.min} max={f.max} onCommit={(n) => set({ h: n })} />
            </div>
          </div>
        );
      case "seg":
        return (
          <div key={f.id} className="flex flex-col gap-2">
            <span className={labelRow}>{f.label}</span>
            <Segmented label={f.label} options={f.opts} value={String(values[f.id])} onChange={(x) => set({ [f.id]: x })} />
          </div>
        );
      case "select":
        return (
          <label key={f.id} className="flex flex-col gap-2">
            <span className={labelRow}>{f.label}</span>
            <select className="w-full rounded-[10px] border-[1.5px] border-line bg-paper px-3 py-2.5 font-semibold" value={String(values[f.id])} onChange={(e) => set({ [f.id]: e.target.value })}>
              {f.opts.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
            </select>
          </label>
        );
      case "check":
        return (
          <label key={f.id} className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
            <input type="checkbox" className="h-5 w-5 accent-[var(--red)]" checked={values[f.id] === true} onChange={(e) => set({ [f.id]: e.target.checked })} />
            {f.label}
          </label>
        );
      case "text":
        return (
          <label key={f.id} className="flex flex-col gap-2">
            <span className={labelRow}>{f.label}<span className={hint}>{f.hint}</span></span>
            <input className="w-full rounded-[10px] border-[1.5px] border-line bg-paper px-3 py-2.5 font-semibold" maxLength={40} value={String(values[f.id])} onChange={(e) => set({ [f.id]: e.target.value })} />
          </label>
        );
      case "color":
        return (
          <div key={f.id} className="flex flex-col gap-2">
            <span className={labelRow}>{f.label}</span>
            <Swatches colors={FOIL_COLORS.filter(([c]) => c !== "crom")} value={String(values[f.id])} labelPrefix="Culoare" onChange={(c) => set({ [f.id]: c })} />
          </div>
        );
      case "upload":
        return (
          <UploadField
            key={f.id}
            label={f.label}
            fileName={calcImage?.name}
            onFile={(file) => {
              const isImage = file.type.startsWith("image/");
              setCalcImage({ name: file.name, url: isImage ? URL.createObjectURL(file) : "", ratio: 1 });
              showToast(isImage ? "Grafica apare în previzualizare" : "Fișier atașat. Îl verificăm la machetă.");
            }}
          />
        );
      case "qty":
        return (
          <div key={f.id} className="flex flex-col gap-2">
            <span className={labelRow}>{f.label}<span className={hint}>vezi graficul de mai jos</span></span>
            <div className="flex w-max items-center overflow-hidden rounded-full border-[1.5px] border-line bg-paper">
              <button type="button" aria-label="Scade" className="h-[42px] w-[42px] cursor-pointer text-xl font-bold" onClick={() => set({ qty: Math.max(1, values.qty - 1) })}>−</button>
              <NumberInput bare label="Cantitate" value={values.qty} min={1} max={100000} integer onCommit={(n) => set({ qty: n })} />
              <button type="button" aria-label="Crește" className="h-[42px] w-[42px] cursor-pointer text-xl font-bold" onClick={() => set({ qty: values.qty + 1 })}>+</button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="plate flex flex-col gap-5 p-[22px]">
      <div>
        <h3 className="text-[26px] font-bold">{product.name}</h3>
        <p className="mt-1 text-[15px] text-ink-2">{product.description}</p>
      </div>
      {product.fields.map(field)}
    </div>
  );
}

interface NumberProps {
  label: string;
  value: number;
  min: number;
  max: number;
  integer?: boolean;
  /** Compact version inside the quantity stepper. */
  bare?: boolean;
  onCommit: (n: number) => void;
}

/** Number input: commits while typing when the value is in range, clamps when the field loses focus. */
function NumberInput({ label, value, min, max, integer, bare, onCommit }: NumberProps) {
  const [text, setText] = useState(String(value));
  const focused = useRef(false);
  useEffect(() => {
    if (!focused.current) setText(String(value));
  }, [value]);

  const parse = (raw: string) => {
    const n = parseFloat(raw.replace(",", "."));
    return Number.isNaN(n) ? null : integer ? Math.round(n) : n;
  };

  const input = (
    <input
      type="text"
      inputMode={integer ? "numeric" : "decimal"}
      aria-label={label}
      value={text}
      onFocus={() => { focused.current = true; }}
      onChange={(e) => {
        setText(e.target.value);
        const n = parse(e.target.value);
        if (n !== null && n >= min && n <= max) onCommit(n);
      }}
      onBlur={() => {
        focused.current = false;
        const n = clamp(parse(text) ?? value, min, max);
        setText(String(n));
        onCommit(n);
      }}
      className={
        bare
          ? "h-[42px] w-[70px] border-x-[1.5px] border-line bg-plate text-center font-mono text-[17px] outline-none"
          : "min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-[17px] outline-none"
      }
    />
  );
  if (bare) return input;
  return (
    <div className="min-w-0">
      <span className="mb-1 block text-xs font-semibold text-ink-2">{label}</span>
      <div className={inputBox}>
        {input}
        <span className="px-3 font-mono text-sm text-ink-2">cm</span>
      </div>
    </div>
  );
}
