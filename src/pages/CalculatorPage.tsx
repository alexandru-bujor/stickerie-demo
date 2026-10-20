import { CalculatorForm } from "../components/calculator/CalculatorForm";
import { PreviewPanel } from "../components/calculator/PreviewPanel";
import { PriceCurve } from "../components/calculator/PriceCurve";
import { Receipt } from "../components/calculator/Receipt";
import { Button } from "../components/ui/Button";
import { Icon } from "../components/ui/Icon";
import { CALCULATORS, CALCULATOR_ORDER, computeTotals } from "../data/calculators";
import { PHONE } from "../data/categories";
import { copyText } from "../lib/clipboard";
import { lei, round2 } from "../lib/format";
import { useApp } from "../state/AppContext";
import type { ProductId } from "../types";

export function CalculatorPage({ productId }: { productId: ProductId }) {
  const { navigate, calcValues, setCalcValues, calcImage, addToCart, saveProject, showToast } = useApp();
  const product = CALCULATORS[productId];
  const values = calcValues[productId];
  const t = computeTotals(product, values);

  const cartItem = () => ({
    name: product.short,
    details: `${t.summary} · ${t.qty} buc${calcImage ? " · grafică atașată" : ""}`,
    qty: t.qty,
    total: round2(t.total),
    icon: product.icon,
  });

  const copyOffer = async () => {
    const text = [
      "Ofertă Stickerie.ro",
      `${product.name}: ${t.summary}`,
      `Cantitate: ${t.qty} buc${t.discountRate ? ` (reducere ${Math.round(t.discountRate * 100)}%)` : ""}`,
      `Total: ${lei(round2(t.total))} cu TVA`,
      `Comenzi: WhatsApp ${PHONE.display}`,
    ].join("\n");
    const ok = await copyText(text);
    showToast(ok ? "Oferta e copiată. O poți lipi pe WhatsApp." : "Copierea automată nu merge aici. Selectează textul manual.");
  };

  return (
    <div className="pb-24 lg:pb-0">
      <div className="wrap pb-2 pt-8">
        <div className="eyebrow">Calculator preț</div>
        <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold">Cât costă? Afli pe loc.</h2>
        <p className="mt-2.5 max-w-[40em] text-ink-2">
          Setează dimensiunea și cantitatea. Previzualizarea e la scară, iar graficul îți arată de la ce cantitate scade prețul pe bucată.
        </p>
      </div>

      <div className="wrap">
        <div role="tablist" aria-label="Produse" className="flex gap-2 overflow-x-auto px-0.5 pb-3.5 pt-1.5">
          {CALCULATOR_ORDER.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={id === productId}
              onClick={() => navigate({ page: "calculator", product: id })}
              className="flex flex-none cursor-pointer items-center gap-2 whitespace-nowrap rounded-full border-2 border-line bg-plate px-3.5 py-2 font-semibold aria-selected:bg-ink aria-selected:text-paper"
            >
              <Icon name={CALCULATORS[id].icon} size={20} />
              {CALCULATORS[id].short}
            </button>
          ))}
        </div>

        <div className="grid items-start gap-6 pb-16 lg:grid-cols-2">
          <div className="flex min-w-0 flex-col gap-5">
            <CalculatorForm product={product} values={values} onChange={(v) => setCalcValues(productId, v)} />
            <PriceCurve unit={t.unit} tiers={product.tiers} qty={t.qty} />
          </div>

          <div className="flex min-w-0 flex-col gap-5 lg:sticky lg:top-[calc(env(safe-area-inset-top,0px)+84px)]">
            <PreviewPanel product={product} totals={t} values={values} image={calcImage} onRefChange={(ref) => setCalcValues(productId, { ...values, ref })} />
            <Receipt totals={t} lead={product.lead} />
            <div className="flex flex-wrap gap-2.5">
              <Button variant="red" className="flex-[1_1_140px]" onClick={() => addToCart(cartItem())}>Adaugă în coș</Button>
              <Button
                className="flex-[1_1_140px]"
                onClick={() => saveProject({ kind: "calc", product: productId, title: product.name, summary: `${t.summary} · ${t.qty} buc`, total: round2(t.total), values })}
              >
                Salvează proiectul
              </Button>
              <Button className="flex-[1_1_140px]" onClick={copyOffer}>Copiază oferta</Button>
            </div>
          </div>
        </div>
      </div>

      {/* mobile: total always visible */}
      <div className="fixed inset-x-0 bottom-0 z-[45] flex items-center justify-between gap-3 border-t-2 border-line bg-plate px-[max(16px,env(safe-area-inset-left,0px))] pb-[calc(10px+env(safe-area-inset-bottom,0px))] pt-2.5 lg:hidden">
        <div className="font-display text-[26px] font-extrabold leading-none">
          <small className="block font-sans text-xs font-medium text-ink-2">{product.short} · {t.qty} buc</small>
          {lei(round2(t.total))}
        </div>
        <Button variant="red" onClick={() => addToCart(cartItem())}>Adaugă în coș</Button>
      </div>
    </div>
  );
}
