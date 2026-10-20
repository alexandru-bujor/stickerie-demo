const FACTS = [
  { k: "0 lei", v: "personalizare și machetă la orice comandă" },
  { k: "2–3 zile", v: "livrare prin curier rapid, 19 lei" },
  { k: "UV", v: "folie PVC laminată, rezistentă la soare și spălătorie" },
  { k: "5+", v: "stickere în coș și primești unul de club gratuit" },
];

export function About() {
  return (
    <section className="py-14">
      <div className="wrap grid items-start gap-10 md:grid-cols-2">
        <div className="flex max-w-[36em] flex-col gap-4">
          <div className="eyebrow">Despre noi</div>
          <h2 className="text-[clamp(28px,4vw,42px)] font-extrabold">Pornit din pasiunea pentru mașini, crescut cu fiecare comandă</h2>
          <p className="text-[17px] text-ink-2">
            Stickerie.ro a început cu stickere auto și moto: mesaje haioase, siluete, însemne de club și „bebe la bord”. Între timp am adăugat bannere, tricouri, steaguri și tablouri, toate printate și decupate în atelierul nostru.
          </p>
          <p className="text-[17px] text-ink-2">Orice model se poate personaliza gratuit. Ne trimiți ideea, noi facem macheta și ți-o arătăm înainte de producție.</p>
          <span className="font-mono text-xs text-ink-2">Text demonstrativ, de înlocuit cu prezentarea reală a firmei.</span>
        </div>
        <div className="grid grid-cols-2 gap-3.5">
          {FACTS.map((f) => (
            <div key={f.k} className="plate p-[18px]">
              <div className="font-display text-[30px] font-extrabold leading-none text-brand">{f.k}</div>
              <div className="mt-1.5 text-sm text-ink-2">{f.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
