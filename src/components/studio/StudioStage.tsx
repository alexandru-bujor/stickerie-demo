import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { VEHICLES } from "../../data/vehicles";
import { clamp, dec1 } from "../../lib/format";
import { stickerSize } from "../../lib/sticker";
import { useApp } from "../../state/AppContext";
import { StickerDefs, StickerGraphic } from "./StickerGraphic";
import { VehicleGraphic } from "./VehicleGraphic";

type Drag = { mode: "move" | "resize"; dx: number; dy: number } | null;

/**
 * The car with the sticker on it. 1 SVG unit = 1 cm, so the sticker size in cm is exact.
 * Drag the sticker to move it; drag the red corner to resize it.
 */
export function StudioStage() {
  const { design: d, updateDesign, studioImage: image } = useApp();
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<Drag>(null);

  const v = VEHICLES[d.vehicle];
  const { w, h } = stickerSize(d, image);
  const x = d.x ?? v.zones[1][1] - w / 2;
  const y = d.y ?? v.zones[1][2] - h / 2;

  const L = v.length, gy = v.groundY;
  const X0 = -30, Y0 = -40, W = L + 60, H = gy + 95;
  const night = d.night;
  const glows = night && (d.reflective || d.color === "crom") && !image;

  const toSvg = (e: ReactPointerEvent) => {
    const m = svgRef.current?.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    const p = new DOMPoint(e.clientX, e.clientY).matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  };

  const onDown = (mode: "move" | "resize") => (e: ReactPointerEvent<SVGElement>) => {
    e.preventDefault();
    const p = toSvg(e);
    drag.current = { mode, dx: p.x - x, dy: p.y - y };
    svgRef.current?.setPointerCapture(e.pointerId);
  };

  const onMove = (e: ReactPointerEvent<SVGSVGElement>) => {
    const g = drag.current;
    if (!g) return;
    const p = toSvg(e);
    if (g.mode === "move") {
      updateDesign({ x: clamp(p.x - g.dx, -10, L + 10 - w), y: clamp(p.y - g.dy, -30, gy - h), zone: -1 });
    } else {
      updateDesign({ width: clamp(Math.round((p.x - x) * 10) / 10, 4, L * 0.8), zone: -1 });
    }
  };
  const onUp = () => { drag.current = null; };

  const ink = night ? "#c9d2f0" : "#57524d";
  const label = `${dec1(w)} × ${dec1(h)} cm`;
  const labelW = label.length * 4.6 + 10;
  const labelY = Math.max(Y0 + 4, y - 18);
  const handleR = Math.max(4, L / 90);

  return (
    <svg
      ref={svgRef}
      viewBox={`${X0} ${Y0} ${W} ${H}`}
      role="img"
      aria-label="Mașina cu stickerul aplicat"
      className="block h-auto w-full touch-none select-none rounded-[10px] border-[1.5px] border-line"
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
    >
      <defs>
        <StickerDefs />
        <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={night ? "#0a1022" : "#dfe9ef"} />
          <stop offset="1" stopColor={night ? "#1b2440" : "#f3f1ec"} />
        </linearGradient>
      </defs>

      <rect x={X0} y={Y0} width={W} height={H} fill="url(#sky)" />
      <rect x={X0} y={gy} width={W} height={H} fill={night ? "#141821" : "#d6d1ca"} />
      <ellipse cx={L / 2} cy={gy} rx={L * 0.47} ry="7" fill="#000" opacity=".22" />

      {night && !v.moto && v.headlight && (
        <path d={`M${v.headlight[0]} ${v.headlight[1] + 4} L-30 ${v.headlight[1] - 30} L-30 ${v.headlight[1] + 40}Z`} fill="#fff7c2" opacity=".25" />
      )}

      <VehicleGraphic vehicle={v} color={d.vehicleColor} night={night} />

      {!glows && <StickerGraphic design={d} image={image} x={x} y={y} width={w} outlineWhite />}
      {night && <rect x={X0} y={Y0} width={W} height={gy - Y0} fill="#0a1430" opacity=".42" pointerEvents="none" />}
      {glows && <StickerGraphic design={d} image={image} x={x} y={y} width={w} filter="url(#glow)" />}

      {d.showZones && v.zones.map(([name, cx, cy, zw, zh]) => (
        <rect key={name} x={cx - zw / 2} y={cy - zh / 2} width={zw} height={zh} rx="3" fill="none" stroke={night ? "#9fb3ff" : "#e3262d"} strokeWidth="1" strokeDasharray="4 3" opacity=".7" />
      ))}

      {/* hit area for moving, plus the resize handle */}
      <rect
        x={x - 2} y={y - 2} width={w + 4} height={h + 4}
        fill="transparent" stroke={night ? "#ffffff" : "#151414"} strokeWidth=".8" strokeDasharray="3 2"
        style={{ cursor: "move" }}
        onPointerDown={onDown("move")}
      />
      <circle cx={x + w + 2} cy={y + h + 2} r={handleR} fill="#e3262d" stroke="#fff" strokeWidth="1.5" style={{ cursor: "nwse-resize" }} onPointerDown={onDown("resize")} />

      <g pointerEvents="none">
        <rect x={x + w / 2 - labelW / 2} y={labelY} width={labelW} height="13" rx="6.5" fill="#151414" />
        <text x={x + w / 2} y={labelY + 9.5} textAnchor="middle" fontSize="8" fontFamily="IBM Plex Mono,monospace" fill="#fff">{label}</text>
      </g>

      {/* ruler along the ground, with the sticker's span in red */}
      <g fontFamily="IBM Plex Mono,monospace" fontSize="8" fill={ink} stroke={ink}>
        <line x1="0" y1={gy + 22} x2={L} y2={gy + 22} strokeWidth=".8" />
        {Array.from({ length: Math.floor(L / 50) + 1 }, (_, i) => i * 50).map((c) => (
          <g key={c}>
            <line x1={c} y1={gy + 22} x2={c} y2={gy + (c % 100 ? 26 : 30)} strokeWidth=".8" />
            {c % 100 === 0 && <text x={c} y={gy + 40} textAnchor="middle" stroke="none">{c}</text>}
          </g>
        ))}
        <rect x={x} y={gy + 19} width={w} height="6" fill="#e3262d" stroke="none" opacity=".85" />
      </g>
    </svg>
  );
}
