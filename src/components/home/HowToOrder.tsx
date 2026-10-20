import { SectionHead } from "../ui/SectionHead";

const STEPS = [
  { title: "Alegi produsul", text: "Din catalog, din Studio sau din calculator, cu dimensiunile tale." },
  { title: "Încarci grafica", text: "Un logo, o poză sau doar un text. Dacă nu ai, o facem noi." },
  { title: "Aprobi macheta", text: "Primești previzualizarea pe WhatsApp înainte de print." },
  { title: "Primești coletul", text: "Curier în 2–3 zile sau Poșta Română în 4–5 zile." },
];

export function HowToOrder() {
  return (
    <section className="pb-14 pt-3">
      <div className="wrap">
        <SectionHead eyebrow="Cum comanzi" title="De la idee la colet în patru pași" />
        <ol className="m-0 grid list-none grid-cols-1 gap-[18px] p-0 min-[480px]:grid-cols-2 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s.title} className="plate relative p-5">
              <span className="absolute -top-4 left-4 grid h-[34px] w-[34px] place-items-center rounded-full border-2 border-line bg-brand font-mono font-semibold text-brand-ink">{i + 1}</span>
              <h3 className="mt-2.5 text-lg font-bold">{s.title}</h3>
              <p className="mt-1.5 text-[15px] text-ink-2">{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
