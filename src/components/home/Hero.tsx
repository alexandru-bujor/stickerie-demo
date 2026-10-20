import type { ReactNode } from "react";
import { useApp } from "../../state/AppContext";
import { Button } from "../ui/Button";

/** Home hero: headline on the left, a collage of die-cut "stickers" on the right. */
export function Hero() {
  const { navigate } = useApp();
  return (
    <section className="relative overflow-hidden pb-10 pt-12">
      <div className="wrap grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
        <div>
          <div className="eyebrow">Atelier de print și colantare</div>
          <h1 className="mt-3.5 text-[clamp(42px,6.6vw,84px)] font-extrabold tracking-[-0.035em]">
            Le printăm noi.{" "}
            <span className="relative whitespace-nowrap text-brand after:absolute after:-inset-x-[2%] after:bottom-[0.04em] after:h-[0.14em] after:rounded after:bg-brand after:opacity-20 after:content-['']">
              Tu le lipești.
            </span>
          </h1>
          <p className="mt-5 max-w-[34em] text-[clamp(17px,1.6vw,20px)] text-ink-2">
            Stickere, bannere, tricouri, steaguri și tablouri canvas făcute pe măsura ta. Alegi dimensiunea, vezi prețul pe loc, iar noi ne ocupăm de rest.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button variant="red" onClick={() => navigate({ page: "calculator", product: "sticker" })}>Calculează prețul</Button>
            <Button onClick={() => document.getElementById("categorii")?.scrollIntoView({ behavior: "smooth" })}>Vezi ce producem</Button>
          </div>
          <div className="mt-7 flex flex-wrap gap-2.5">
            {["Machetă gratuită", "Expediere în 2–3 zile", "Folie cu laminare UV"].map((t) => (
              <span key={t} className="inline-flex items-center gap-2 rounded-full border-[1.5px] border-line bg-plate px-3 py-1.5 text-sm font-semibold">
                <span className="h-2 w-2 rounded-full bg-brand" />
                {t}
              </span>
            ))}
          </div>
        </div>
        <Collage />
      </div>
    </section>
  );
}

function Sticker({ className, label, children }: { className: string; label: string; children: ReactNode }) {
  return (
    <div className={`absolute grid place-items-center border-2 border-line bg-plate text-center shadow-[6px_6px_0_var(--shadow)] transition-transform duration-200 hover:!rotate-0 hover:scale-[1.03] ${className}`}>
      {children}
      <span className="absolute -bottom-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-ink px-2.5 py-0.5 font-mono text-[11px] text-paper">{label}</span>
    </div>
  );
}

function Collage() {
  return (
    <div className="relative mx-auto aspect-[1/0.92] w-full max-w-[520px] md:max-w-none" aria-hidden="true">
      <svg className="pointer-events-none absolute inset-0 h-full w-full text-ink" viewBox="0 0 100 92" fill="none" stroke="currentColor" strokeWidth=".5" strokeLinecap="round">
        <circle cx="72" cy="3" r="1.4" /><circle cx="3" cy="40" r="1.1" /><path d="M95 38l3 1.6-3 1.6z" /><path d="M2 86h18M6 89h10" /><path d="M58 90h20" /><path d="M48 2h14" /><path d="M97 70v12" />
      </svg>

      <Sticker className="left-[4%] top-[6%] h-[28%] w-[62%] -rotate-[4deg] rounded-lg" label="banner 300×100 cm">
        <div className="hatch grid h-[calc(100%-16px)] w-[calc(100%-16px)] place-items-center rounded font-display text-[clamp(18px,2.6vw,32px)] font-extrabold tracking-[-0.02em] text-brand-ink">
          DESCHIS NON-STOP
        </div>
        {["left-1 top-1", "right-1 top-1", "left-1 bottom-1", "right-1 bottom-1"].map((p) => (
          <span key={p} className={`absolute h-[9px] w-[9px] rounded-full border-2 border-line bg-plate ${p}`} />
        ))}
      </Sticker>

      <Sticker className="right-[6%] top-[2%] aspect-square w-[30%] rotate-[8deg] rounded-full" label="sticker decupat">
        <div>
          <span className="font-display text-[clamp(20px,2.8vw,34px)] font-extrabold leading-[0.9]">JDM<br />CREW</span>
          <small className="mt-1 block font-mono text-[11px] text-brand">Ø 10 cm</small>
        </div>
      </Sticker>

      <Sticker className="left-[10%] top-[42%] h-[46%] w-[40%] rotate-[3deg] rounded-[18px]" label="tricou · print A4">
        <svg viewBox="0 0 120 120" width="78%" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <path d="M40 14 22 22 8 46l16 8 8-12v66h56V42l8 12 16-8-14-24-18-8c-2 8-10 13-20 13S42 22 40 14Z" fill="var(--paper)" />
          <rect x="44" y="46" width="32" height="26" rx="3" fill="var(--red)" stroke="none" />
          <path d="M48 66l8-10 6 6 5-4 5 8" stroke="var(--red-ink)" strokeWidth="2.5" />
        </svg>
      </Sticker>

      <Sticker className="right-[4%] top-[40%] h-[30%] w-[40%] -rotate-[6deg] rounded-[10px]" label="steag 90×150 cm">
        <svg viewBox="0 0 160 100" width="88%" fill="none" stroke="currentColor" strokeWidth="3" strokeLinejoin="round">
          <path d="M14 6v92" />
          <path d="M14 10c22-8 40 8 66 0s44-6 66 0v52c-22-6-40-8-66 0s-44-8-66 0Z" fill="var(--red)" />
          <path d="M40 36h60" stroke="var(--red-ink)" strokeWidth="5" strokeLinecap="round" />
        </svg>
      </Sticker>

      <Sticker className="right-[12%] top-[74%] h-[22%] w-[30%] rotate-[5deg] rounded-md" label="canvas 60×40">
        <svg viewBox="0 0 100 60" width="86%" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinejoin="round">
          <rect x="4" y="4" width="92" height="52" rx="2" fill="var(--paper)" />
          <path d="M4 48l26-22 18 16 14-10 34 22" />
          <circle cx="74" cy="18" r="6" fill="var(--red)" stroke="none" />
        </svg>
      </Sticker>
    </div>
  );
}
