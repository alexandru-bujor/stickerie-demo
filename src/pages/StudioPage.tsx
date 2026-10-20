import { StudioPanel } from "../components/studio/StudioPanel";
import { StudioStage } from "../components/studio/StudioStage";
import { Icon } from "../components/ui/Icon";
import { Segmented } from "../components/ui/Segmented";
import { Swatches } from "../components/ui/Swatches";
import { VEHICLE_COLORS } from "../data/design";
import { VEHICLE_KEYS, VEHICLES } from "../data/vehicles";
import { placeInZone } from "../lib/studio";
import { useApp } from "../state/AppContext";
import type { VehicleKey } from "../types";

export function StudioPage() {
  const { design: d, updateDesign, studioImage } = useApp();
  const v = VEHICLES[d.vehicle];

  const toggle = (night: boolean, icon: "sun" | "moon", label: string) => (
    <button
      type="button"
      aria-pressed={d.night === night}
      onClick={() => updateDesign({ night })}
      className="flex cursor-pointer items-center gap-1.5 bg-plate px-3.5 py-2 text-sm font-bold aria-pressed:bg-ink aria-pressed:text-paper"
    >
      <Icon name={icon} size={16} />
      {label}
    </button>
  );

  return (
    <>
      <div className="wrap pb-4 pt-8">
        <div className="eyebrow">Studio</div>
        <h2 className="mt-2 text-[clamp(28px,4vw,42px)] font-extrabold">Probează stickerul pe mașina ta</h2>
        <p className="mt-2.5 max-w-[44em] text-ink-2">
          Alege tipul și culoarea mașinii, apoi trage stickerul unde vrei și mărește-l din colț. Dimensiunea în centimetri se calculează după lungimea reală a mașinii.
        </p>
      </div>

      <div className="wrap grid items-start gap-[22px] pb-16 lg:grid-cols-[minmax(0,1.55fr)_minmax(0,1fr)]">
        <div className="plate flex flex-col gap-3 p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
            <Segmented
              label="Tip vehicul"
              tone="dark"
              value={d.vehicle}
              options={VEHICLE_KEYS.map((k) => [k, VEHICLES[k].name, `${VEHICLES[k].length} cm`])}
              onChange={(k) => {
                const next = { ...d, vehicle: k as VehicleKey };
                updateDesign({ vehicle: k as VehicleKey, ...placeInZone(next, studioImage, 1) });
              }}
            />
            <div role="group" aria-label="Lumină" className="inline-flex overflow-hidden rounded-full border-2 border-line">
              {toggle(false, "sun", "Zi")}
              {toggle(true, "moon", "Noapte")}
            </div>
          </div>

          <StudioStage />

          <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2.5">
            <Swatches colors={VEHICLE_COLORS} value={d.vehicleColor} labelPrefix="Mașină" size={30} onChange={(c) => updateDesign({ vehicleColor: c })} />
            <label className="flex cursor-pointer items-center gap-2.5 text-sm font-semibold">
              <input type="checkbox" className="h-5 w-5 accent-[var(--red)]" checked={d.showZones} onChange={(e) => updateDesign({ showZones: e.target.checked })} />
              Arată zonele recomandate
            </label>
          </div>
          <div className="flex flex-wrap justify-between gap-3 text-[13px] text-ink-2">
            <span>Trage stickerul cu mouse-ul sau degetul. Colțul roșu îl mărește.</span>
            <span className="font-mono">{v.name}: lungime {v.length} cm</span>
          </div>
        </div>

        <StudioPanel />
      </div>
    </>
  );
}
