import type { ReactNode } from "react";
import { CALCULATORS, CALCULATOR_ORDER } from "../../data/calculators";
import { PHONE, SHIPPING } from "../../data/categories";
import { useApp } from "../../state/AppContext";
import type { Route } from "../../types";
import { Logo } from "./Logo";

export function Footer() {
  const { navigate } = useApp();
  const link = (label: string, r: Route) => (
    <li key={label}>
      <a href="#" className="opacity-90 hover:underline hover:opacity-100" onClick={(e) => { e.preventDefault(); navigate(r); }}>
        {label}
      </a>
    </li>
  );

  return (
    <footer className="bg-ink text-paper">
      <div className="wrap pb-7 pt-12">
        <div className="grid grid-cols-1 gap-7 min-[480px]:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <div className="mb-3.5"><Logo /></div>
            <p className="max-w-[28em] text-[15px] opacity-75">
              Stickere, bannere, tricouri, steaguri și tablouri personalizate. Suport comenzi și livrare: <span className="font-mono">{PHONE.display}</span>
            </p>
          </div>
          <FooterCol title="Produse">
            {CALCULATOR_ORDER.map((id) => link(CALCULATORS[id].short, { page: "calculator", product: id }))}
          </FooterCol>
          <FooterCol title="Utile">
            {link("Studio", { page: "studio" })}
            {link("Contul meu", { page: "contact" })}
            {link("Cum se aplică", { page: "contact" })}
            {link("Revânzători", { page: "contact" })}
            {link("Termeni și condiții", { page: "contact" })}
          </FooterCol>
          <div>
            <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] opacity-70">Livrare</h4>
            <div className="flex flex-col gap-1.5 text-[15px]">
              <span>Curier rapid · <b className="font-mono">{SHIPPING.courier.price} lei</b> · {SHIPPING.courier.days}</span>
              <span>Poșta Română · <b className="font-mono">{SHIPPING.post.price} lei</b> · {SHIPPING.post.days}</span>
            </div>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap justify-between gap-2.5 border-t border-white/20 pt-4 text-[13px] opacity-65">
          <span>© {new Date().getFullYear()} Stickerie.ro · ANPC · SAL · SOL</span>
          <span>Demo de redesign, doar front-end</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="mb-3 font-mono text-xs uppercase tracking-[0.12em] opacity-70">{title}</h4>
      <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15px]">{children}</ul>
    </div>
  );
}
