import { FONTS, FOIL_COLORS, foilName, vehicleColorName } from "../../data/design";
import { VEHICLES } from "../../data/vehicles";
import { contrastRatio, luminance } from "../../lib/color";
import { dec1, fmt } from "../../lib/format";
import { placeInZone } from "../../lib/studio";
import { foilLabel, stickerPrice, stickerSize, stickerSummary } from "../../lib/sticker";
import { useApp } from "../../state/AppContext";
import type { FontKey } from "../../types";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { Swatches } from "../ui/Swatches";
import { UploadField } from "../ui/UploadField";

export function StudioPanel() {
  const { design: d, updateDesign, studioImage: image, setStudioImage, addToCart, saveProject, showToast } = useApp();
  const v = VEHICLES[d.vehicle];
  const { w, h } = stickerSize(d, image);
  const price = stickerPrice(d, image);

  const onFile = (file: File) => {
    const url = URL.createObjectURL(file);
    const img = new Image();
    img.onload = () => {
      const next = { url, name: file.name, ratio: img.naturalHeight / Math.max(1, img.naturalWidth) };
      setStudioImage(next);
      updateDesign(placeInZone(d, next, d.zone >= 0 ? d.zone : 1));
      showToast("Grafica e pe mașină. Trage de ea ca s-o muți.");
    };
    img.onerror = () => showToast("Nu am putut citi imaginea. Încearcă PNG sau JPG.");
    img.src = url;
  };

  /* contrast warning for vinyl colors that disappear on the car */
  let warning: string | null = null;
  if (!image && contrastRatio(d.color, d.vehicleColor) < 1.7) {
    const suggestion = luminance(d.vehicleColor) > 0.35 ? "neagră sau roșie" : "albă sau galbenă";
    warning = `Folia ${foilName(d.color)} pe o mașină ${vehicleColorName(d.vehicleColor)} se va vedea greu. Încearcă folie ${suggestion}.`;
  }

  return (
    <div className="plate flex flex-col gap-4 p-5">
      <label className="flex flex-col gap-2">
        <span className="flex justify-between gap-2 text-sm font-bold">Text<span className="text-[13px] font-medium text-ink-2">sau încarcă grafica mai jos</span></span>
        <input
          className="w-full rounded-[10px] border-[1.5px] border-line bg-paper px-3 py-2.5 font-bold uppercase"
          maxLength={28}
          value={d.text}
          onChange={(e) => { setStudioImage(null); updateDesign({ text: e.target.value.toUpperCase() }); }}
        />
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Font</span>
        <div className="flex flex-wrap gap-1.5">
          {(Object.keys(FONTS) as FontKey[]).map((k) => (
            <button
              key={k}
              type="button"
              aria-pressed={d.font === k}
              onClick={() => { setStudioImage(null); updateDesign({ font: k }); }}
              className="cursor-pointer rounded-[10px] border-[1.5px] border-line bg-plate px-3 py-1.5 text-[17px] leading-tight aria-pressed:bg-ink aria-pressed:text-paper"
              style={{ fontFamily: FONTS[k].css, fontWeight: FONTS[k].weight }}
            >
              {FONTS[k].label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Culoare folie</span>
        <Swatches colors={FOIL_COLORS} value={d.color} labelPrefix="Folie" onChange={(c) => updateDesign({ color: c, reflective: c === "crom" ? false : d.reflective })} />
        <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
          <input type="checkbox" className="h-5 w-5 accent-[var(--red)]" checked={d.reflective && d.color !== "crom"} disabled={d.color === "crom"} onChange={(e) => updateDesign({ reflective: e.target.checked })} />
          Folie reflectorizantă (+50%), strălucește noaptea
        </label>
      </div>

      <div>
        <UploadField
          label="Grafica ta"
          hint="PNG, JPG, SVG"
          accept="image/*"
          fileName={image?.name}
          emptyText="Încarcă un logo sau o imagine"
          emptySub="Se tipărește color, cu laminare"
          onFile={onFile}
        />
        {image && <button className="mt-1.5 cursor-pointer p-0 text-[13px] text-brand underline" onClick={() => setStudioImage(null)}>Revino la text</button>}
      </div>

      {warning && (
        <div className="flex items-start gap-2.5 rounded-xl border-[1.5px] border-current bg-warn-bg px-3 py-2.5 text-sm font-semibold text-warn">
          <Icon name="warn" size={20} className="flex-none" />
          <span>{warning}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-sm font-bold">Zone recomandate</span>
        <div className="grid grid-cols-2 gap-2">
          {v.zones.map(([name, , , maxW], i) => (
            <button
              key={name}
              type="button"
              onClick={() => updateDesign(placeInZone(d, image, i))}
              className={`cursor-pointer rounded-[10px] border-[1.5px] bg-plate px-2.5 py-2 text-left text-sm font-semibold hover:bg-brand-soft ${
                d.zone === i ? "border-brand shadow-[inset_0_0_0_1.5px_var(--red)]" : "border-line"
              }`}
            >
              {name}
              <small className="block font-mono text-[11px] font-medium text-ink-2">max {maxW} cm</small>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {[["Lățime", w], ["Înălțime", h]].map(([k, val]) => (
          <div key={k as string} className="rounded-[10px] border-[1.5px] border-dashed border-ink-2 px-2.5 py-2">
            <span className="block text-xs text-ink-2">{k}</span>
            <b className="font-mono text-lg">{dec1(val as number)} cm</b>
          </div>
        ))}
      </div>

      <div className="flex items-end justify-between gap-2.5 border-t-[1.5px] border-rule pt-3.5">
        <div>
          <span className="text-[13px] text-ink-2">Preț pe bucată</span>
          <div className="font-display text-[38px] font-extrabold leading-none">{fmt(price)}<small className="ml-1 text-base">lei</small></div>
        </div>
        <span className="text-[13px] text-ink-2">{foilLabel(d, image)}</span>
      </div>

      <div className="flex flex-wrap gap-2.5">
        <Button variant="red" className="flex-1" onClick={() => addToCart({ name: "Sticker personalizat", details: stickerSummary(d, image), qty: 1, total: price, icon: "sticker" })}>
          Adaugă în coș
        </Button>
        <Button
          className="flex-1"
          onClick={() => saveProject({
            kind: "studio",
            title: image ? "Sticker cu grafică proprie" : `Sticker „${d.text}”`,
            summary: `${dec1(w)}×${dec1(h)} cm · ${v.name.toLowerCase()} ${vehicleColorName(d.vehicleColor)}`,
            total: price,
            design: d,
          })}
        >
          Salvează proiectul
        </Button>
      </div>
    </div>
  );
}
