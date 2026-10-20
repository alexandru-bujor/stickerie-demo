import { useEffect, useMemo, useState } from "react";
import { ProductCard } from "../components/product/ProductCard";
import { Button } from "../components/ui/Button";
import { CATALOG, CATALOG_CATEGORIES } from "../data/catalog";
import { useApp } from "../state/AppContext";

type Sort = "pop" | "asc" | "desc" | "az";

export function CatalogPage({ initialFilter, query }: { initialFilter?: string; query?: string }) {
  const { navigate } = useApp();
  const [chip, setChip] = useState(initialFilter ?? "Toate");
  const [sort, setSort] = useState<Sort>("pop");

  useEffect(() => { setChip(initialFilter ?? "Toate"); }, [initialFilter, query]);

  const list = useMemo(() => {
    const q = (query ?? "").toLowerCase();
    const items = CATALOG.filter((p) => (chip === "Toate" || p.category === chip) && (!q || `${p.name} ${p.category}`.toLowerCase().includes(q)));
    if (sort === "asc") items.sort((a, b) => a.price - b.price);
    if (sort === "desc") items.sort((a, b) => b.price - a.price);
    if (sort === "az") items.sort((a, b) => a.name.localeCompare(b.name, "ro"));
    return items;
  }, [chip, sort, query]);

  return (
    <div className="wrap pb-14 pt-8">
      <div className="eyebrow">Catalog</div>
      <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold">Stickere auto și moto</h2>

      <div className="mb-6 mt-[18px] flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {CATALOG_CATEGORIES.map((c) => (
            <button
              key={c}
              aria-pressed={c === chip}
              onClick={() => setChip(c)}
              className="cursor-pointer rounded-full border-[1.5px] border-line bg-plate px-3 py-1.5 text-sm font-semibold aria-pressed:bg-ink aria-pressed:text-paper"
            >
              {c}
            </button>
          ))}
        </div>
        <select aria-label="Sortează" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="rounded-full border-[1.5px] border-line bg-plate px-3 py-2 font-semibold">
          <option value="pop">Cele mai vândute</option>
          <option value="asc">Preț crescător</option>
          <option value="desc">Preț descrescător</option>
          <option value="az">Alfabetic</option>
        </select>
      </div>

      <p className="mb-3.5 font-mono text-[13px] text-ink-2">
        {list.length} produse{query ? ` pentru „${query}”` : ""} · demo cu {CATALOG.length} modele din catalogul actual
      </p>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-4">
        {list.length ? list.map((p) => <ProductCard key={p.id} product={p} />) : (
          <p className="col-span-full p-10 text-center text-ink-2">Niciun sticker pentru „{query}”. Încearcă alt cuvânt sau fă-l tu în Studio.</p>
        )}
      </div>

      <div className="plate mt-7 flex flex-wrap items-center justify-between gap-4 px-5 py-[18px]">
        <div>
          <h3 className="text-xl font-bold">Vrei un sticker cu textul tău?</h3>
          <p className="text-[15px] text-ink-2">Scrie mesajul și probează-l direct pe mașină.</p>
        </div>
        <Button variant="red" onClick={() => navigate({ page: "studio" })}>Deschide Studio</Button>
      </div>
    </div>
  );
}
