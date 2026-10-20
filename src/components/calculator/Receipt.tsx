import { SHIPPING } from "../../data/categories";
import { fmt, lei, round2, todayRo } from "../../lib/format";
import type { CalcTotals } from "../../types";

/** Price breakdown styled as a shop receipt. */
export function Receipt({ totals: t, lead }: { totals: CalcTotals; lead: string }) {
  return (
    <div className="drop-shadow-[5px_5px_0_var(--shadow)]">
      <div className="receipt px-[22px] pb-7 pt-[26px] font-mono text-[13.5px]">
        <div className="mb-2 border-b-[1.5px] border-dashed border-ink-2 pb-2.5 text-center">
          <b className="font-display text-xl tracking-[0.02em]">STICKERIE.RO</b>
          <span className="block text-xs text-ink-2">Ofertă · {todayRo()}</span>
        </div>
        <table className="w-full border-collapse">
          <tbody>
            {t.lines.map(([label, value]) => (
              <Line key={label} label={label} value={typeof value === "number" ? fmt(round2(value)) : value} />
            ))}
            <Line label="Cantitate" value={`× ${t.qty}`} separator />
            <Line label="Subtotal" value={fmt(round2(t.subtotal))} />
            {t.discountRate > 0 && (
              <Line label={`Reducere cantitate −${Math.round(t.discountRate * 100)}%`} value={`−${fmt(round2(t.discount))}`} discount />
            )}
            {t.fixed ? <Line label="Montaj" value={fmt(t.fixed)} /> : null}
          </tbody>
        </table>
        <div className="mt-2 flex items-end justify-between gap-2.5 border-t-2 border-ink pt-2.5">
          <div>
            <div className="text-[13px] text-ink-2">TOTAL CU TVA</div>
            <div className="font-display text-[40px] font-extrabold leading-none tracking-[-0.03em]">
              {fmt(round2(t.total))}<small className="ml-1 text-base">lei</small>
            </div>
          </div>
          {t.qty > 1 && <div className="text-right text-xs text-ink-2">{lei(round2(t.total / t.qty))}<br />pe bucată</div>}
        </div>
        <div className="mt-3 flex flex-col gap-0.5 text-xs text-ink-2">
          <span>{lead}</span>
          <span>Transport: curier {SHIPPING.courier.price} lei · Poșta Română {SHIPPING.post.price} lei</span>
          <span>Prețuri orientative pentru demo</span>
        </div>
        <div className="barcode mt-3.5 h-[34px] opacity-85" aria-hidden="true" />
      </div>
    </div>
  );
}

function Line({ label, value, separator, discount }: { label: string; value: string; separator?: boolean; discount?: boolean }) {
  const cell = `py-1 align-top ${separator ? "border-t-[1.5px] border-dashed border-ink-2 pt-2" : ""}`;
  return (
    <tr className={discount ? "font-semibold text-ok" : ""}>
      <td className={cell}>{label}</td>
      <td className={`${cell} whitespace-nowrap pl-3 text-right`}>{value}</td>
    </tr>
  );
}
