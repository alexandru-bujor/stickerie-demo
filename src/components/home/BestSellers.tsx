import { BEST_SELLER_IDS, CATALOG } from "../../data/catalog";
import { useApp } from "../../state/AppContext";
import { buttonClass } from "../ui/Button";
import { SectionHead } from "../ui/SectionHead";
import { ProductCard } from "../product/ProductCard";

export function BestSellers() {
  const { navigate } = useApp();
  const items = CATALOG.filter((p) => BEST_SELLER_IDS.includes(p.id));
  return (
    <section className="pb-14 pt-3">
      <div className="wrap">
        <SectionHead
          eyebrow="Cele mai vândute"
          title="Stickere care pleacă zilnic"
          aside={<button className={buttonClass("default", "sm")} onClick={() => navigate({ page: "catalog" })}>Toate stickerele</button>}
        />
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-4">
          {items.map((p) => <ProductCard key={p.id} product={p} />)}
        </div>
      </div>
    </section>
  );
}
