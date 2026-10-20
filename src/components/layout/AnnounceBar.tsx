import { PHONE, SHIPPING } from "../../data/categories";

export function AnnounceBar() {
  return (
    <div className="hatch text-sm font-semibold text-brand-ink">
      <div className="wrap flex flex-wrap justify-center gap-x-7 gap-y-1.5 py-2 text-center">
        <span>Personalizare gratuită la orice comandă</span>
        <span>WhatsApp: <b className="font-mono">{PHONE.display}</b></span>
        <span>Livrare de la <b className="font-mono">{SHIPPING.post.price} lei</b></span>
      </div>
    </div>
  );
}
