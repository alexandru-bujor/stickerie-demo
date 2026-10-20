import { tierDiscount } from "../../data/calculators";
import { clamp, fmt, round2 } from "../../lib/format";

interface Props { unit: number; tiers: [number, number][]; qty: number }

/** Step chart: price per unit for each quantity tier, with the current quantity marked. */
export function PriceCurve({ unit, tiers, qty }: Props) {
  const breaks = [1, ...tiers.map((t) => t[0])];
  const end = tiers[tiers.length - 1][0] * 2;
  const W = 440, H = 150, padL = 8, padR = 12, padT = 22, padB = 28;
  const pw = W - padL - padR, ph = H - padT - padB, n = breaks.length;
  const xAt = (i: number) => padL + (pw * i) / n;
  const yAt = (price: number) => padT + ph * (1 - price / (unit * 1.04));

  let line = "";
  breaks.forEach((q, i) => {
    const y = yAt(unit * (1 - tierDiscount(tiers, q)));
    line += `${i ? "L" : "M"}${xAt(i)} ${y}L${xAt(i + 1)} ${y}`;
  });
  const area = `${line}L${xAt(n)} ${padT + ph}L${xAt(0)} ${padT + ph}Z`;

  let seg = 0;
  breaks.forEach((b, i) => { if (qty >= b) seg = i; });
  const lo = breaks[seg], hi = seg < n - 1 ? breaks[seg + 1] : end;
  const frac = clamp((qty - lo) / Math.max(1, hi - lo), 0, 0.92);
  const mx = xAt(seg) + (xAt(seg + 1) - xAt(seg)) * frac;
  const my = yAt(unit * (1 - tierDiscount(tiers, qty)));
  const next = tiers.find((t) => t[0] > qty);

  return (
    <div className="plate px-4 py-3.5">
      <div className="mb-2 flex flex-wrap items-center justify-between gap-2 text-[13px]">
        <span className="eyebrow !text-[11px]">Preț pe bucată după cantitate</span>
        <span className="font-mono text-ink-2">
          {next ? `încă ${next[0] - qty} buc până la −${Math.round(next[1] * 100)}%` : "ai reducerea maximă"}
        </span>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="block h-auto w-full" role="img" aria-label={`Prețul pe bucată scade la ${tiers.map((t) => t[0]).join(", ")} bucăți`} fontFamily="IBM Plex Mono,monospace">
        <path d={area} fill="var(--red-soft)" />
        <line x1={padL} y1={padT + ph} x2={W - padR} y2={padT + ph} stroke="var(--ink-2)" />
        {breaks.map((q, i) => {
          const price = unit * (1 - tierDiscount(tiers, q));
          return (
            <g key={q}>
              <text x={(xAt(i) + xAt(i + 1)) / 2} y={yAt(price) - 6} textAnchor="middle" fontSize="11" fill="var(--ink)" fontWeight="600">{fmt(round2(price))}</text>
              <line x1={xAt(i)} y1={padT} x2={xAt(i)} y2={padT + ph} stroke="var(--rule)" strokeDasharray="3 3" />
              <text x={xAt(i) + 3} y={H - 10} fontSize="11" fill="var(--ink-2)">{q}{i ? "+" : ""}</text>
            </g>
          );
        })}
        <path d={line} fill="none" stroke="var(--red)" strokeWidth="2.5" />
        <circle cx={mx} cy={my} r="6" fill="var(--red)" stroke="var(--plate)" strokeWidth="2.5" />
      </svg>
    </div>
  );
}
