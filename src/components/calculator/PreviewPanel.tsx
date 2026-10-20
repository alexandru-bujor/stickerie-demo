import { REF_LABELS } from "../../data/calculators";
import { dec1 } from "../../lib/format";
import type { CalcTotals, CalcValues, CalculatorProduct, RefMode, SegOption, UploadedImage } from "../../types";
import { Segmented } from "../ui/Segmented";
import { MugPreview } from "./previews/MugPreview";
import { ScenePreview } from "./previews/ScenePreview";
import { ShirtPreview } from "./previews/ShirtPreview";

interface Props {
  product: CalculatorProduct;
  totals: CalcTotals;
  values: CalcValues;
  image: UploadedImage | null;
  onRefChange: (ref: RefMode) => void;
}

export function PreviewPanel({ product, totals: t, values: v, image, onRefChange }: Props) {
  const w = t.w ?? v.w, h = t.h ?? v.h;
  const dims =
    t.preview === "shirt" ? `mărime ${v.marime}` :
    t.preview === "mug" ? "330 ml" :
    t.preview === "rect" ? `${dec1(w)}×${dec1(h)} cm` :
    `${dec1(w)}×${dec1(h)} cm · ${((w * h) / 1e4).toLocaleString("ro-RO", { maximumFractionDigits: 2 })} m²`;

  const refOptions: SegOption[] | null = product.refs
    ? product.refs.map((r) => [r, r === "context" ? product.contextLabel ?? "În context" : REF_LABELS[r]])
    : null;

  return (
    <div className="plate p-3.5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[13px]">
        <span className="eyebrow !text-[11px]">Previzualizare la scară</span>
        <span className="font-mono">{dims}</span>
      </div>
      {t.preview === "shirt" ? <ShirtPreview v={v} image={image} /> :
       t.preview === "mug" ? <MugPreview v={v} image={image} /> :
       <ScenePreview t={t} v={v} image={image} />}
      {refOptions && (
        <div className="mt-2.5">
          <Segmented label="Comparator de mărime" options={refOptions} value={v.ref} onChange={(r) => onRefChange(r as RefMode)} tone="dark" size="sm" />
        </div>
      )}
    </div>
  );
}
