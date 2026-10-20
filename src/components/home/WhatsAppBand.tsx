import { PHONE } from "../../data/categories";

export function WhatsAppBand() {
  return (
    <div className="hatch border-y-2 border-line text-brand-ink">
      <div className="wrap flex flex-wrap items-center justify-between gap-5 py-9">
        <div>
          <h2 className="text-[clamp(24px,3.4vw,36px)] font-extrabold">Nu găsești modelul? Îl facem noi.</h2>
          <p className="mt-1.5 opacity-90">Trimite-ne ideea pe WhatsApp, primești macheta gratuit.</p>
        </div>
        <div className="select-all rounded-xl border-2 border-line bg-plate px-[18px] py-2.5 font-mono text-[clamp(22px,3vw,30px)] font-semibold text-ink shadow-[4px_4px_0_var(--shadow)]">
          {PHONE.display}
        </div>
      </div>
    </div>
  );
}
