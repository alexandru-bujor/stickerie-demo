import { useState, type FormEvent } from "react";
import { useApp } from "../../state/AppContext";
import type { Route } from "../../types";
import { Icon } from "../ui/Icon";
import { Logo } from "./Logo";

const NAV: { label: string; route: Route; isNew?: boolean }[] = [
  { label: "Acasă", route: { page: "home" } },
  { label: "Studio", route: { page: "studio" }, isNew: true },
  { label: "Calculator preț", route: { page: "calculator", product: "sticker" } },
  { label: "Stickere", route: { page: "catalog" } },
  { label: "Contact", route: { page: "contact" } },
];

const iconBtn = "relative grid h-11 w-11 flex-none cursor-pointer place-items-center rounded-full border-2 border-line bg-plate";

export function Header() {
  const { route, navigate, cart, setCartOpen } = useApp();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const count = cart.reduce((n, i) => n + i.qty, 0);

  const go = (r: Route) => {
    navigate(r);
    setOpen(false);
  };
  const onSearch = (e: FormEvent) => {
    e.preventDefault();
    go({ page: "catalog", query: q.trim().toLowerCase() });
  };

  return (
    <header className="sticky top-[env(safe-area-inset-top,0px)] z-50 border-b-2 border-line bg-plate">
      <div className="wrap flex items-center justify-between gap-4 py-2.5 lg:justify-start">
        <button className={`${iconBtn} lg:hidden`} aria-label="Deschide meniul" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          <Icon name="menu" size={22} strokeWidth={2.4} />
        </button>

        <a href="#/" onClick={(e) => { e.preventDefault(); go({ page: "home" }); }} aria-label="Stickerie.ro, pagina principală">
          <Logo height={44} />
        </a>

        <nav
          aria-label="Meniu principal"
          className={`${open ? "flex" : "hidden"} absolute inset-x-0 top-full flex-col border-b-2 border-line bg-plate px-[max(16px,env(safe-area-inset-left,0px))] py-3
            lg:static lg:ml-1.5 lg:flex lg:flex-row lg:gap-0.5 lg:border-0 lg:p-0`}
        >
          {NAV.map((n) => {
            const current = n.route.page === route.page;
            return (
              <a
                key={n.label}
                href="#"
                aria-current={current ? "page" : undefined}
                onClick={(e) => { e.preventDefault(); go(n.route); }}
                className={`whitespace-nowrap rounded-full px-3.5 py-3 text-[17px] font-semibold no-underline lg:px-3 lg:py-2 lg:text-[15px] ${
                  current ? "bg-ink text-paper" : "hover:bg-brand-soft"
                }`}
              >
                {n.label}
                {n.isNew && <span className="ml-1.5 rounded-full bg-brand px-1.5 py-px align-[2px] font-mono text-[10px] text-brand-ink">NOU</span>}
              </a>
            );
          })}
        </nav>

        <form onSubmit={onSearch} role="search" className="ml-auto hidden min-w-0 max-w-[300px] flex-1 items-center rounded-full border-2 border-line bg-paper pl-3.5 pr-1.5 lg:flex">
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Caută stickere…"
            aria-label="Caută produse"
            className="min-w-0 flex-1 bg-transparent px-1 py-2 outline-none"
          />
          <button type="submit" aria-label="Caută" className="grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-brand text-brand-ink">
            <Icon name="search" size={16} strokeWidth={2.6} />
          </button>
        </form>

        <button className={iconBtn} aria-label="Coșul de cumpărături" onClick={() => setCartOpen(true)}>
          <Icon name="cart" size={22} />
          <span className="absolute -right-1.5 -top-1.5 grid h-[22px] min-w-[22px] place-items-center rounded-full border-2 border-plate bg-brand font-mono text-xs font-bold text-brand-ink">
            {count}
          </span>
        </button>
      </div>
    </header>
  );
}
