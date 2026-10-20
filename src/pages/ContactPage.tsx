import { useState, type FormEvent, type ReactNode } from "react";
import { Button } from "../components/ui/Button";
import { CALCULATORS, CALCULATOR_ORDER } from "../data/calculators";
import { PHONE, SHIPPING } from "../data/categories";
import { copyText } from "../lib/clipboard";
import { useApp } from "../state/AppContext";

const field = "rounded-[10px] border-[1.5px] border-line bg-paper px-3 py-2.5 font-medium";
const label = "flex flex-col gap-1.5 text-sm font-bold";

export function ContactPage() {
  const { showToast } = useApp();
  const [form, setForm] = useState({ name: "", phone: "", product: CALCULATORS.sticker.name, message: "" });

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const first = form.name.trim().split(" ")[0];
    showToast(`Mulțumim${first ? `, ${first}` : ""}! Demo: cererea nu se trimite încă.`);
    setForm({ name: "", phone: "", product: CALCULATORS.sticker.name, message: "" });
  };

  return (
    <div className="wrap pb-16 pt-8">
      <div className="eyebrow">Contact</div>
      <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold">Vorbim pe WhatsApp, răspundem repede</h2>
      <p className="mb-7 mt-2.5 max-w-[40em] text-ink-2">Pentru comenzi personalizate, oferte pentru firme sau întrebări despre livrare.</p>

      <div className="grid gap-[18px] md:grid-cols-3">
        <Card title="WhatsApp și telefon" big={PHONE.display} text="Suport comenzi și livrare">
          <Button size="sm" className="mt-3" onClick={async () => showToast((await copyText(PHONE.raw)) ? "Număr copiat" : "Copierea nu merge aici. Selectează numărul.")}>
            Copiază numărul
          </Button>
        </Card>
        <Card title="Livrare" big={`${SHIPPING.courier.price} lei`} text={`Curier rapid, ${SHIPPING.courier.days} lucrătoare. Poșta Română: ${SHIPPING.post.price} lei, ${SHIPPING.post.days}.`} />
        <Card title="Revânzători" big="Afiliere" text="Pentru magazine și service-uri auto care vor să vândă stickerele noastre." />
      </div>

      <form onSubmit={submit} className="plate mt-[22px] grid gap-3.5 p-[22px] sm:grid-cols-2">
        <div className="sm:col-span-2">
          <h3 className="text-xl font-bold">Cere o ofertă</h3>
          <p className="mt-1 text-[15px] text-ink-2">Răspundem în aceeași zi lucrătoare.</p>
        </div>
        <label className={label}>Nume<input required autoComplete="name" className={field} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
        <label className={label}>Telefon<input required type="tel" autoComplete="tel" className={field} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} /></label>
        <label className={`${label} sm:col-span-2`}>
          Produs
          <select className={field} value={form.product} onChange={(e) => setForm({ ...form, product: e.target.value })}>
            {CALCULATOR_ORDER.map((id) => <option key={id}>{CALCULATORS[id].name}</option>)}
            <option>Altceva</option>
          </select>
        </label>
        <label className={`${label} sm:col-span-2`}>
          Ce ai nevoie
          <textarea className={`${field} min-h-[110px] resize-y`} placeholder="Ex: 2 bannere 300×100 cm pentru gardul firmei, cu capse" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
        </label>
        <div className="sm:col-span-2"><Button type="submit" variant="red">Trimite cererea</Button></div>
      </form>
    </div>
  );
}

function Card({ title, big, text, children }: { title: string; big: string; text: string; children?: ReactNode }) {
  return (
    <div className="plate p-5">
      <div className="eyebrow">{title}</div>
      <div className="mt-1.5 select-all break-all font-mono text-xl font-semibold">{big}</div>
      <p className="mt-1.5 text-sm text-ink-2">{text}</p>
      {children}
    </div>
  );
}
