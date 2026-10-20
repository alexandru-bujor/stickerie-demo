import type { ReactElement } from "react";
import { clamp, dec1 } from "../../../lib/format";
import type { CalcTotals, CalcValues, PreviewKind, UploadedImage } from "../../../types";
import { BannerShape, CanvasShape, FlagShape, RollupShape, StickerShape, WindowShape, type ShapeProps } from "./ProductShapes";

const SHAPES: Partial<Record<PreviewKind, (p: ShapeProps) => ReactElement>> = {
  rect: StickerShape, banner: BannerShape, canvas: CanvasShape, flag: FlagShape, rollup: RollupShape, window: WindowShape,
};

/* Preview area in px inside a 420×300 viewBox. */
const VB_W = 420, VB_H = 300;
const AX = 20, AY = 18, AW = 330, AH = 226;

interface Props { t: CalcTotals; v: CalcValues; image: UploadedImage | null }

/**
 * Draws the product to scale, optionally next to a reference (A4 sheet, a 175 cm person)
 * or in context (banner on a fence, canvas above a sofa, window foil on a shop front).
 * All scene sizes are in cm; one factor k converts cm → px for everything.
 */
export function ScenePreview({ t, v, image }: Props) {
  const kind = t.preview;
  const Shape = SHAPES[kind];
  if (!Shape) return null;

  const lw = t.w ?? v.w, lh = t.h ?? v.h, mode = v.ref;
  const ground = mode !== "none";
  const ref = mode === "a4" ? { w: 21, h: 29.7 } : mode === "om" ? { w: 55, h: 175 } : null;
  const flagTop = kind === "flag" ? Math.max(10, lh * 0.08) : 0;

  let sceneW = lw, sceneH = lh + flagTop, itemX = 0, lift = kind === "rollup" ? Math.max(6, lh * 0.04) : 0;
  let context: "fence" | "sofa" | "facade" | null = null;
  let sofaW = 0;

  if (mode === "context") {
    if (kind === "banner") { context = "fence"; lift = 40; itemX = 30; sceneW = lw + 60 + 70 + 55; sceneH = lh + 80; }
    else if (kind === "canvas") { context = "sofa"; sofaW = clamp(lw * 1.3, 180, 260); lift = 110; sceneW = Math.max(lw, sofaW) + 80; sceneH = Math.max(260, lift + lh + 30); itemX = (sceneW - lw) / 2; }
    else if (kind === "window") { context = "facade"; lift = 40; itemX = 40; sceneW = lw + 170; sceneH = Math.max(lift + lh, 210) + 70; }
  } else if (ref) {
    itemX = ref.w + Math.max(12, Math.min(lw, ref.w) * 0.4);
    if (kind === "flag") lift = Math.max(150, lh * 0.6);
    sceneW = itemX + lw;
    sceneH = Math.max(ref.h, lift + lh + flagTop);
  }

  const k = Math.min(AW / sceneW, AH / sceneH);
  const x0 = AX + (AW - sceneW * k) / 2;
  const gy = AY + AH;
  const X = x0 + itemX * k, w = lw * k, h = lh * k;
  const Y = ground ? gy - (lift + lh) * k : AY + (AH - h) / 2 + (flagTop * k) / 2;
  const cm = (n: number) => n * k;

  return (
    <svg viewBox={`0 0 ${VB_W} ${VB_H}`} className="block h-auto max-h-[380px] w-full" role="img" aria-label="Previzualizare la scară">
      <PreviewDefs />

      {context === "sofa" && <rect x={x0} y={gy - cm(sceneH)} width={cm(sceneW)} height={cm(sceneH)} fill="var(--rule)" opacity=".7" />}
      {context === "sofa" && <Sofa x={x0 + cm((sceneW - sofaW) / 2)} gy={gy} w={cm(sofaW)} k={k} />}
      {context === "fence" && <Fence x0={x0} gy={gy} k={k} lw={lw} height={lh + 80} />}
      {context === "fence" && <Person x={x0 + cm(lw + 130)} gy={gy} k={k} label />}
      {context === "facade" && <Facade x0={x0} gy={gy} k={k} lw={lw} w={sceneW} h={sceneH} />}

      {ref?.w === 21 && <A4 x={x0} gy={gy} k={k} />}
      {ref?.w === 55 && <Person x={x0} gy={gy} k={k} label />}

      <Shape x={X} y={Y} w={w} h={h} v={v} t={t} image={image} groundY={ground ? gy : null} />

      {ground && <line x1="0" y1={gy} x2={VB_W} y2={gy} stroke="var(--line)" strokeWidth="1.5" />}
      <DimensionLines x={X} y={Y} w={w} h={h} wLabel={dec1(lw)} hLabel={dec1(lh)} />
    </svg>
  );
}

export function PreviewDefs() {
  return (
    <defs>
      <linearGradient id="cromG" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#6f7377" /><stop offset=".42" stopColor="#f6f7f8" /><stop offset=".55" stopColor="#9ea2a6" /><stop offset="1" stopColor="#e9ebec" />
      </linearGradient>
      <pattern id="dots" width="6" height="6" patternUnits="userSpaceOnUse"><circle cx="3" cy="3" r="1.1" fill="#000" opacity=".35" /></pattern>
    </defs>
  );
}

function DimensionLines({ x, y, w, h, wLabel, hLabel }: { x: number; y: number; w: number; h: number; wLabel: string; hLabel: string }) {
  return (
    <g stroke="var(--ink-2)" strokeWidth="1.2" fill="var(--ink-2)" fontFamily="IBM Plex Mono,monospace" fontSize="12">
      <line x1={x} y1={y + h + 12} x2={x + w} y2={y + h + 12} />
      <line x1={x} y1={y + h + 7} x2={x} y2={y + h + 17} />
      <line x1={x + w} y1={y + h + 7} x2={x + w} y2={y + h + 17} />
      <text x={x + w / 2} y={y + h + 29} textAnchor="middle" stroke="none">{wLabel} cm</text>
      <line x1={x + w + 12} y1={y} x2={x + w + 12} y2={y + h} />
      <line x1={x + w + 7} y1={y} x2={x + w + 17} y2={y} />
      <line x1={x + w + 7} y1={y + h} x2={x + w + 17} y2={y + h} />
      <text x={x + w + 20} y={y + h / 2 + 4} stroke="none">{hLabel} cm</text>
    </g>
  );
}

const caption = { fontSize: 11, fontFamily: "IBM Plex Mono,monospace", fill: "var(--ink-2)", textAnchor: "middle" as const };

function A4({ x, gy, k }: { x: number; gy: number; k: number }) {
  const w = 21 * k, h = 29.7 * k;
  return (
    <>
      <rect x={x} y={gy - h} width={w} height={h} fill="#ffffff" stroke="var(--line)" />
      <text x={x + w / 2} y={gy - h / 2 + 4} textAnchor="middle" fontSize={Math.max(8, w * 0.3)} fontFamily="IBM Plex Mono,monospace" fill="#57524d">A4</text>
      <text x={x + w / 2} y={gy + 16} {...caption}>A4 · 21×29,7</text>
    </>
  );
}

/** A 175 cm person drawn in a 55×175 cm box. */
function Person({ x, gy, k, label }: { x: number; gy: number; k: number; label?: boolean }) {
  return (
    <>
      <g transform={`translate(${x} ${gy}) scale(${k} ${-k})`} fill="var(--ink-2)" opacity=".55">
        <circle cx="27.5" cy="162" r="11" />
        <path d="M10 148Q27.5 154 45 148L49 98L42 98L41 92L14 92L13 98L6 98Z" />
        <rect x="14" y="0" width="12" height="94" rx="5" />
        <rect x="29" y="0" width="12" height="94" rx="5" />
        <rect x="2" y="96" width="8" height="52" rx="4" />
        <rect x="45" y="96" width="8" height="52" rx="4" />
      </g>
      {label && <text x={x + 27.5 * k} y={gy + 16} {...caption}>175 cm</text>}
    </>
  );
}

function Fence({ x0, gy, k, lw, height }: { x0: number; gy: number; k: number; lw: number; height: number }) {
  const F = height * k;
  const left = x0 + 10 * k, right = x0 + (lw + 42) * k, end = x0 + (lw + 50) * k;
  return (
    <>
      {[left, right].map((px) => <rect key={px} x={px} y={gy - F} width={Math.max(3, 8 * k)} height={F} fill="var(--ink-2)" />)}
      <line x1={left} y1={gy - F + 6 * k} x2={end} y2={gy - F + 6 * k} stroke="var(--ink-2)" strokeWidth="2" />
      <line x1={left} y1={gy - 20 * k} x2={end} y2={gy - 20 * k} stroke="var(--ink-2)" strokeWidth="2" />
    </>
  );
}

function Sofa({ x, gy, w, k }: { x: number; gy: number; w: number; k: number }) {
  return (
    <g fill="var(--ink-2)" opacity=".75">
      <rect x={x + 8 * k} y={gy - 85 * k} width={w - 16 * k} height={45 * k} rx={8 * k} />
      <rect x={x} y={gy - 48 * k} width={w} height={38 * k} rx={6 * k} />
      <rect x={x} y={gy - 62 * k} width={18 * k} height={54 * k} rx={8 * k} />
      <rect x={x + w - 18 * k} y={gy - 62 * k} width={18 * k} height={54 * k} rx={8 * k} />
      <rect x={x + 10 * k} y={gy - 10 * k} width={5 * k} height={10 * k} />
      <rect x={x + w - 15 * k} y={gy - 10 * k} width={5 * k} height={10 * k} />
    </g>
  );
}

function Facade({ x0, gy, k, lw, w, h }: { x0: number; gy: number; k: number; lw: number; w: number; h: number }) {
  const fh = h * k;
  return (
    <>
      <rect x={x0} y={gy - fh} width={w * k} height={fh} fill="var(--rule)" stroke="var(--line)" />
      <rect x={x0} y={gy - fh} width={w * k} height={50 * k} fill="var(--ink)" />
      <text x={x0 + (w * k) / 2} y={gy - fh + 32 * k} textAnchor="middle" fontFamily="Bricolage Grotesque,sans-serif" fontWeight="800" fontSize={26 * k} fill="var(--paper)">MAGAZINUL TĂU</text>
      <rect x={x0 + (lw + 80) * k} y={gy - 210 * k} width={90 * k} height={210 * k} fill="var(--plate)" stroke="var(--line)" />
      <circle cx={x0 + (lw + 155) * k} cy={gy - 105 * k} r={3 * k} fill="var(--ink)" />
    </>
  );
}
