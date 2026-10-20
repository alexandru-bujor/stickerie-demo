import { CALCULATORS } from "../../data/calculators";
import { HOME_CATEGORIES } from "../../data/categories";
import { useApp } from "../../state/AppContext";
import { Icon } from "../ui/Icon";
import { SectionHead } from "../ui/SectionHead";

/** Category shortcuts: each one opens its price calculator or the catalog. */
export function CategoryGrid() {
  const { navigate } = useApp();
  return (
    <section id="categorii" className="pb-14 pt-6">
      <div className="wrap">
        <SectionHead
          eyebrow="Ce producem"
          title="Alege produsul, vezi prețul"
          aside={<p className="max-w-[38em] text-ink-2">Fiecare categorie are calculatorul ei. Introduci dimensiunile și cantitatea și afli imediat cât costă.</p>}
        />
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 sm:gap-[18px] lg:grid-cols-5">
          {HOME_CATEGORIES.map((c) => {
            const isCalc = c.target.kind === "calculator";
            const from = c.target.kind === "calculator" ? CALCULATORS[c.target.product].from : null;
            return (
              <button
                key={c.key}
                type="button"
                onClick={() => navigate(c.target.kind === "calculator" ? { page: "calculator", product: c.target.product } : { page: "catalog", filter: c.target.filter })}
                className="plate peel flex cursor-pointer flex-col gap-2 p-3.5 text-left transition hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-sticker-lg"
              >
                <span className="grid aspect-[4/3] w-full place-items-center rounded-[10px] bg-brand-soft text-ink">
                  <Icon name={c.icon} size={64} className="h-auto w-[56%]" />
                </span>
                <h3 className="text-lg font-bold">{c.name}</h3>
                <span className="text-[13px] text-ink-2">
                  {from !== null ? <>de la <b className="font-mono text-brand">{from} lei</b> · {c.description}</> : c.description}
                </span>
                <span className="self-start rounded-full border-[1.5px] border-line px-2 font-mono text-[11px]">
                  {isCalc ? "calculator preț" : "catalog"}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
