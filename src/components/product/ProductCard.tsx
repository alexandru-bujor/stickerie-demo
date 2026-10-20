import { canTryOn, sizeLabel, widthFromSize } from "../../data/catalog";
import { FOIL_COLORS } from "../../data/design";
import { lei } from "../../lib/format";
import { centerInZone } from "../../lib/studio";
import { useApp } from "../../state/AppContext";
import type { CatalogProduct } from "../../types";
import { Icon } from "../ui/Icon";
import { DieCutThumb } from "./DieCutThumb";

export function ProductCard({ product: p }: { product: CatalogProduct }) {
  const { addToCart, design, updateDesign, setStudioImage, navigate, showToast } = useApp();

  const tryOn = () => {
    const next = {
      ...design,
      text: p.stickerText.toUpperCase(),
      font: "brico" as const,
      color: FOIL_COLORS.some(([c]) => c === p.color) ? p.color : "#151414",
      reflective: false,
    };
    setStudioImage(null);
    updateDesign({ ...next, ...centerInZone(next, null, 0, widthFromSize(p.size)) });
    navigate({ page: "studio" });
    showToast(`„${p.name}” la mărimea reală: ${sizeLabel(p)}`);
  };

  return (
    <article className="plate peel flex flex-col">
      <div className="relative grid aspect-square place-items-center border-b-2 border-line bg-paper p-3.5">
        {p.oldPrice && (
          <span className="absolute left-2.5 top-2.5 rounded-full bg-brand px-2 py-0.5 font-mono text-xs font-semibold text-brand-ink">
            −{Math.round((1 - p.price / p.oldPrice) * 100)}%
          </span>
        )}
        <DieCutThumb product={p} />
        {canTryOn(p) && (
          <button
            onClick={tryOn}
            className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1 rounded-full border-[1.5px] border-line bg-plate px-2.5 py-1 text-xs font-bold hover:bg-ink hover:text-paper"
          >
            <Icon name="car" size={14} /> Probează pe mașină
          </button>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3.5 pb-3.5 pt-3">
        <span className="font-mono text-xs text-ink-2">{p.category}</span>
        <h3 className="font-sans text-base font-bold leading-tight tracking-normal">{p.name}</h3>
        <span className="font-mono text-[13px] text-ink-2">{sizeLabel(p)}</span>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <span className="font-mono text-[17px] font-semibold">
            {lei(p.price)}
            {p.oldPrice && <s className="ml-1 text-[13px] font-medium text-ink-2">{lei(p.oldPrice)}</s>}
          </span>
          <button
            aria-label={`Adaugă ${p.name} în coș`}
            onClick={() => addToCart({ name: p.name, details: `${sizeLabel(p)} · 1 buc`, qty: 1, total: p.price, icon: p.category === "Protecții prag" ? "prag" : "sticker" })}
            className="grid h-[38px] w-[38px] flex-none cursor-pointer place-items-center rounded-full border-2 border-line bg-brand text-brand-ink shadow-[2px_2px_0_var(--shadow)] active:translate-x-px active:translate-y-px"
          >
            <Icon name="plus" size={18} strokeWidth={2.8} />
          </button>
        </div>
      </div>
    </article>
  );
}
