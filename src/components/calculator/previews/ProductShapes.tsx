import type { CalcTotals, CalcValues, UploadedImage } from "../../../types";

/*
 * Drawings of each product inside a box (x, y, w, h) in preview pixels.
 * The box is already at the correct scale; these only paint the product.
 */

export interface ShapeProps {
  x: number;
  y: number;
  w: number;
  h: number;
  v: CalcValues;
  t: CalcTotals;
  image: UploadedImage | null;
  /** Ground line in px, when the scene has one (for the flag pole). */
  groundY: number | null;
}

const hasImage = (img: UploadedImage | null): img is UploadedImage => !!img?.url;

function Artwork({ x, y, w, h, label, image, bg = "var(--red)", fg = "var(--red-ink)" }: { x: number; y: number; w: number; h: number; label: string; image: UploadedImage | null; bg?: string; fg?: string }) {
  if (hasImage(image)) return <image href={image.url} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />;
  const fs = Math.max(7, Math.min(h * 0.42, (w * 0.85) / Math.max(4, label.length) * 1.6));
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill={bg} />
      {label && <text x={x + w / 2} y={y + h / 2 + fs * 0.35} textAnchor="middle" fontFamily="Bricolage Grotesque,Arial Black,sans-serif" fontWeight="800" fontSize={fs} fill={fg}>{label}</text>}
    </>
  );
}

export function StickerShape({ x, y, w, h, v, image }: ShapeProps) {
  const text = String(v.text || "STICKERIE").toUpperCase();
  if (v.tip === "cut" && !hasImage(image)) {
    const fs = Math.min(h * 0.5, (w / Math.max(3, text.length)) * 1.6);
    const color = String(v.col);
    return (
      <>
        <rect x={x} y={y} width={w} height={h} rx="4" fill="none" stroke="var(--ink-2)" strokeDasharray="4 3" />
        <text
          x={x + w / 2} y={y + h / 2 + fs * 0.35} textAnchor="middle"
          fontFamily="Bricolage Grotesque,Arial Black,sans-serif" fontWeight="800" fontSize={fs}
          fill={v.folie === "crom" ? "url(#cromG)" : color}
          stroke={color === "#ffffff" ? "var(--ink)" : undefined} strokeWidth={color === "#ffffff" ? 0.8 : undefined}
        >
          {text}
        </text>
      </>
    );
  }
  return (
    <>
      <rect x={x - 3} y={y - 3} width={w + 6} height={h + 6} rx="6" fill="var(--plate)" stroke="var(--line)" strokeWidth="1.5" />
      <clipPath id="sticker-clip"><rect x={x} y={y} width={w} height={h} rx="4" /></clipPath>
      <g clipPath="url(#sticker-clip)"><Artwork x={x} y={y} w={w} h={h} label={text} image={image} /></g>
    </>
  );
}

export function BannerShape({ x, y, w, h, v, t, image }: ShapeProps) {
  const n = Math.max(2, Math.round(v.w / 50)) + 1;
  const r = Math.min(2.6, h / 14);
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="var(--plate)" stroke="var(--line)" strokeWidth="1.5" />
      <Artwork x={x + 2} y={y + 2} w={w - 4} h={h - 4} label="BANNERUL TĂU" image={image} />
      {t.grommets && Array.from({ length: n }, (_, i) => {
        const gx = x + 4 + ((w - 8) * i) / (n - 1);
        return (
          <g key={i}>
            <circle cx={gx} cy={y + 4} r={r} fill="var(--plate)" stroke="var(--line)" />
            <circle cx={gx} cy={y + h - 4} r={r} fill="var(--plate)" stroke="var(--line)" />
          </g>
        );
      })}
    </>
  );
}

export function CanvasShape({ x, y, w, h, v, t, image }: ShapeProps) {
  const scale = w / (t.w ?? v.w);
  const depth = Math.max(2, (v.sasiu === "4" ? 4 : 2) * scale * 1.6);
  const gap = Math.max(2, w * 0.02);
  return (
    <>
      <path d={`M${x + w} ${y} l${depth} ${depth} v${h} l-${depth} -${depth}z M${x} ${y + h} l${depth} ${depth} h${w} l-${depth} -${depth}z`} fill="var(--rule)" stroke="var(--line)" />
      {v.rama === true && <rect x={x - 4} y={y - 4} width={w + 8} height={h + 8} fill="none" stroke="var(--ink)" strokeWidth="5" />}
      {hasImage(image) ? (
        <image href={image.url} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
      ) : (
        <>
          <rect x={x} y={y} width={w} height={h} fill="#f1e7d6" />
          <path d={`M${x} ${y + h * 0.8}L${x + w * 0.3} ${y + h * 0.45}L${x + w * 0.52} ${y + h * 0.68}L${x + w * 0.68} ${y + h * 0.52}L${x + w} ${y + h * 0.85}V${y + h}H${x}Z`} fill="#5e7d6c" />
          <circle cx={x + w * 0.75} cy={y + h * 0.28} r={Math.min(w, h) * 0.1} fill="#e3262d" />
        </>
      )}
      {v.panouri === "3" && [1, 2].map((i) => <rect key={i} x={x + (w * i) / 3 - gap / 2} y={y - 1} width={gap} height={h + 2} fill="var(--paper)" />)}
      <rect x={x} y={y} width={w} height={h} fill="none" stroke="var(--line)" />
    </>
  );
}

export function FlagShape({ x, y, w, h, image, groundY }: ShapeProps) {
  const top = y - Math.max(6, h * 0.08);
  const bottom = groundY ?? y + h + 40;
  return (
    <>
      <line x1={x - 3} y1={top} x2={x - 3} y2={bottom} stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
      <circle cx={x - 3} cy={top} r="3" fill="var(--ink)" />
      <g className="flag-wave">
        {hasImage(image) ? (
          <image href={image.url} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
        ) : (
          <>
            <rect x={x} y={y} width={w / 3} height={h} fill="#1d3f9c" />
            <rect x={x + w / 3} y={y} width={w / 3} height={h} fill="#f4c400" />
            <rect x={x + (2 * w) / 3} y={y} width={w / 3} height={h} fill="#cf1f2b" />
          </>
        )}
        <rect x={x} y={y} width={w} height={h} fill="none" stroke="var(--line)" strokeWidth="1.5" />
      </g>
    </>
  );
}

export function RollupShape({ x, y, w, h, v, image }: ShapeProps) {
  const base = Math.max(4, h * 0.04);
  const bar = Math.max(2, h * 0.02);
  return (
    <>
      <rect x={x} y={y} width={w} height={h} fill="var(--plate)" stroke="var(--line)" strokeWidth="1.5" />
      {hasImage(image) ? (
        <image href={image.url} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />
      ) : (
        <>
          <rect x={x + w * 0.12} y={y + h * 0.07} width={w * 0.76} height={h * 0.17} fill="var(--red)" />
          <text x={x + w / 2} y={y + h * 0.19} textAnchor="middle" fontFamily="Bricolage Grotesque,sans-serif" fontWeight="800" fontSize={w * 0.17} fill="var(--red-ink)">LOGO</text>
          <rect x={x + w * 0.12} y={y + h * 0.33} width={w * 0.76} height={bar} fill="var(--ink-2)" />
          <rect x={x + w * 0.12} y={y + h * 0.38} width={w * 0.5} height={bar} fill="var(--ink-2)" />
          <rect x={x + w * 0.12} y={y + h * 0.5} width={w * 0.76} height={h * 0.32} fill="var(--rule)" />
        </>
      )}
      <rect x={x - w * 0.06} y={y + h} width={w * 1.12} height={base} rx="2" fill="var(--ink)" />
      {v.tip === "prem" && (
        <>
          <rect x={x - w * 0.14} y={y + h + base * 0.4} width={w * 0.1} height={base * 0.6} fill="var(--ink)" />
          <rect x={x + w * 1.04} y={y + h + base * 0.4} width={w * 0.1} height={base * 0.6} fill="var(--ink)" />
        </>
      )}
    </>
  );
}

export function WindowShape({ x, y, w, h, v, image }: ShapeProps) {
  const frame = Math.max(3, w * 0.02);
  let art;
  if (v.fol === "sabl") art = <rect x={x} y={y + h * 0.35} width={w} height={h * 0.3} fill="#ffffff" opacity=".8" />;
  else if (v.fol === "lit") {
    const fs = Math.min(h * 0.3, w / 6);
    art = <text x={x + w / 2} y={y + h / 2 + fs * 0.35} textAnchor="middle" fontFamily="Bricolage Grotesque,sans-serif" fontWeight="800" fontSize={fs} fill="#e3262d">DESCHIS</text>;
  } else if (hasImage(image)) art = <image href={image.url} x={x} y={y} width={w} height={h} preserveAspectRatio="xMidYMid slice" />;
  else art = <Artwork x={x} y={y + h * 0.58} w={w} h={h * 0.42} label="DESCHIS 9–18" image={null} />;
  return (
    <>
      <rect x={x - frame} y={y - frame} width={w + 2 * frame} height={h + 2 * frame} fill="var(--ink-2)" stroke="var(--line)" />
      <rect x={x} y={y} width={w} height={h} fill="#bfd9e6" />
      {art}
      {v.fol === "micro" && <rect x={x} y={y} width={w} height={h} fill="url(#dots)" />}
    </>
  );
}
