import type { CatalogProduct } from "../../types";

/** Product thumbnail drawn from the sticker text, so the demo needs no product photos. */
export function DieCutThumb({ product }: { product: CatalogProduct }) {
  const t = product.stickerText;
  if (product.category === "Protecții prag") {
    return (
      <div className="flex w-[86%] flex-col gap-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className="grid place-items-center rounded-md bg-[#151414] font-display text-[11px] font-extrabold tracking-[0.1em] text-white"
            style={{ height: i < 2 ? 22 : 18, width: i < 2 ? "100%" : "70%" }}
          >
            {t}
          </div>
        ))}
      </div>
    );
  }
  const n = t.length;
  const size = n <= 2 ? 64 : n <= 8 ? 30 : n <= 16 ? 22 : n <= 26 ? 17 : 13;
  const color = product.color === "#151414" ? "var(--ink)" : product.color;
  const tilt = (product.name.length % 5) - 2;
  return (
    <div className="diecut" style={{ color, fontSize: size, transform: `rotate(${tilt}deg)` }}>
      {t}
    </div>
  );
}
