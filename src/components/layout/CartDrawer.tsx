import { useEffect, useRef } from "react";
import { SHIPPING } from "../../data/categories";
import { lei } from "../../lib/format";
import { useApp } from "../../state/AppContext";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";

export function CartDrawer() {
  const { cart, cartOpen, setCartOpen, removeFromCart, showToast } = useApp();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!cartOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setCartOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [cartOpen, setCartOpen]);

  if (!cartOpen) return null;
  const subtotal = cart.reduce((t, i) => t + i.total, 0);
  const shipping = cart.length ? SHIPPING.courier.price : 0;

  return (
    <>
      <div className="fixed inset-0 z-[70] bg-black/45" onClick={() => setCartOpen(false)} />
      <aside
        aria-label="Coș"
        className="fixed bottom-0 right-0 top-0 z-[80] flex w-full max-w-[420px] flex-col border-l-2 border-line bg-plate pb-[env(safe-area-inset-bottom,0px)] pr-[env(safe-area-inset-right,0px)] pt-[env(safe-area-inset-top,0px)]"
      >
        <div className="flex items-center justify-between border-b-2 border-line px-5 py-[18px]">
          <h3 className="text-xl font-bold">Coșul tău</h3>
          <button ref={closeRef} aria-label="Închide coșul" onClick={() => setCartOpen(false)} className="grid h-11 w-11 cursor-pointer place-items-center rounded-full border-2 border-line bg-plate">
            <Icon name="close" size={18} strokeWidth={2.6} />
          </button>
        </div>

        <div className="flex flex-1 flex-col overflow-auto px-5 py-2">
          {cart.length === 0 && (
            <p className="p-10 text-center text-ink-2">Coșul e gol. Fă un sticker în Studio sau calculează prețul unui produs.</p>
          )}
          {cart.map((item) => (
            <div key={item.id} className="grid grid-cols-[44px_1fr_auto] items-start gap-x-3 gap-y-0.5 border-b border-rule py-3.5">
              <span className="row-span-3 grid h-11 w-11 place-items-center rounded-[10px] bg-brand-soft"><Icon name={item.icon} size={28} /></span>
              <span className="font-bold">{item.name}</span>
              <span className="font-mono font-semibold">{lei(item.total)}</span>
              <span className="col-span-2 text-[13px] text-ink-2">{item.details}</span>
              <button className="cursor-pointer justify-self-start p-0 text-[13px] text-brand underline" onClick={() => removeFromCart(item.id)}>
                Șterge
              </button>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2.5 border-t-2 border-line px-5 py-[18px]">
          <Row label="Produse" value={lei(subtotal)} />
          <Row label="Transport curier" value={lei(shipping)} />
          <Row label="Total" value={lei(subtotal + shipping)} strong />
          <Button variant="red" disabled={!cart.length} onClick={() => showToast("Demo: finalizarea comenzii se leagă de back-end în etapa următoare")}>
            Finalizează comanda
          </Button>
        </div>
      </aside>
    </>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={`flex justify-between ${strong ? "text-lg font-bold" : "text-sm"}`}>
      <span>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}
