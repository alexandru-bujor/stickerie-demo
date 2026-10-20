import type { Vehicle } from "../../types";

interface Props { vehicle: Vehicle; color: string; night: boolean }

/** Side view of a car or motorcycle in centimetre units. */
export function VehicleGraphic({ vehicle: v, color, night }: Props) {
  return (
    <g>
      {v.moto ? <Motorcycle color={color} /> : <Car vehicle={v} color={color} night={night} />}
      {v.wheels.map((x) => (
        <g key={x}>
          <circle cx={x} cy={v.wheelY} r={v.wheelR} fill="#1c1c1c" />
          <circle cx={x} cy={v.wheelY} r={v.wheelR * 0.56} fill="#a9adb2" stroke="#1c1c1c" strokeWidth="2" />
          <circle cx={x} cy={v.wheelY} r={v.wheelR * 0.18} fill="#5a5d61" />
        </g>
      ))}
    </g>
  );
}

function Car({ vehicle: v, color, night }: Props) {
  const [hx, hy, hw, hh] = v.headlight ?? [0, 0, 0, 0];
  const [tx, ty, tw, th] = v.taillight ?? [0, 0, 0, 0];
  return (
    <>
      <path d={v.body} fill={color} stroke="#1a1a1a" strokeWidth="1.6" strokeLinejoin="round" />
      {v.windows?.map((d) => <path key={d} d={d} fill={night ? "#0b1217" : "#2c3c47"} stroke="#1a1a1a" strokeWidth="1.2" />)}
      {v.doors && <path d={v.doors} stroke="#1a1a1a" strokeOpacity=".45" strokeWidth="1.2" fill="none" />}
      <rect x={hx} y={hy} width={hw} height={hh} rx="3" fill="#fff7c2" stroke="#1a1a1a" strokeWidth="1" />
      <rect x={tx} y={ty} width={tw} height={th} rx="2" fill="#c8141c" stroke="#1a1a1a" strokeWidth="1" />
    </>
  );
}

function Motorcycle({ color }: { color: string }) {
  return (
    <g stroke="#1a1a1a" strokeWidth="1.5" strokeLinejoin="round">
      <line x1="40" y1="88" x2="70" y2="36" strokeWidth="5" strokeLinecap="round" />
      <line x1="64" y1="32" x2="84" y2="24" strokeWidth="4" strokeLinecap="round" />
      <path d="M128 84L172 88" strokeWidth="6" strokeLinecap="round" />
      <path d="M108 88L188 76" stroke="#8d9196" strokeWidth="7" strokeLinecap="round" />
      <rect x="94" y="62" width="34" height="24" rx="4" fill="#3a3a3a" />
      <path d="M58 62Q62 36 88 34L100 40L104 38Q120 30 140 36L152 44L196 50Q206 52 200 62L150 66L128 84L92 84L78 70Z" fill={color} />
      <path d="M140 38Q168 38 196 48L194 54L150 50Z" fill="#222" />
      <path d="M50 50Q58 30 80 34L92 42L72 66Z" fill={color} />
      <circle cx="44" cy="44" r="3" fill="#fff7c2" />
    </g>
  );
}
